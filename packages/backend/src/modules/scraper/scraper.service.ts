import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { XMLParser } from 'fast-xml-parser'
import TurndownService from 'turndown'

import { Job } from '../../entities/job.entity'
import { Education } from '../../entities/education.entity'
import { Skill, SkillCategory } from '../../entities/skill.entity'
import { BlogPost, BlogPostSource } from '../../entities/blog-post.entity'
import { BlogTag } from '../../entities/blog-tag.entity'
import { BlogService } from '../blog/blog.service'

// ─── Medium RSS types ─────────────────────────────────────────────────────────

interface MediumRssItem {
  title: string
  link: string
  'content:encoded'?: string
  description?: string
  pubDate?: string
  category?: string | string[]
  guid?: string | { '#text'?: string; __cdata?: string }
}

interface MediumRssFeed {
  rss?: {
    channel?: {
      item?: MediumRssItem | MediumRssItem[]
    }
  }
}

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class ScraperService implements OnModuleInit {
  private readonly logger = new Logger(ScraperService.name)
  private readonly turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  })

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,

    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,

    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,

    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,

    private readonly blogService: BlogService,
    private readonly configService: ConfigService,
  ) {}

  // ─── Lifecycle ───────────────────────────────────────────────────────────

  async onModuleInit(): Promise<void> {
    const jobCount = await this.jobRepository.count()
    if (jobCount === 0) {
      this.logger.log('Jobs table is empty — running initial resume scrape...')
      await this.scrapeResume()
    } else {
      this.logger.log(`Jobs table has ${jobCount} records — skipping initial resume scrape`)
    }
  }

  // ─── Resume scraping ─────────────────────────────────────────────────────

  async scrapeResume(force = false): Promise<void> {
    const docId = this.configService.get<string>('RESUME_GOOGLE_DOC_ID')
    if (!docId) {
      this.logger.warn('RESUME_GOOGLE_DOC_ID not set — skipping resume scrape')
      return
    }

    const url = `https://docs.google.com/document/d/${docId}/export?format=html`
    this.logger.log(`Fetching resume from: ${url}`)

    let html: string
    try {
      const response = await axios.get<string>(url, {
        timeout: 30_000,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KarimVarelaBot/1.0)' },
      })
      html = response.data
    } catch (err) {
      this.logger.error('Failed to fetch Google Doc HTML', err)
      return
    }

    const $ = cheerio.load(html)

    await this.parseAndSaveJobs($, force)
    await this.parseAndSaveEducation($, force)
    await this.parseAndSaveSkills($, force)

    this.logger.log('Resume scrape completed')
  }

  // ─── Jobs parsing ─────────────────────────────────────────────────────────

  private async parseAndSaveJobs($: cheerio.CheerioAPI, force: boolean): Promise<void> {
    const headings = $('h1, h2, h3, h4').toArray()

    let experienceHeadingIdx = -1
    for (let i = 0; i < headings.length; i++) {
      const text = $(headings[i]).text().trim().toLowerCase()
      if (text.includes('experience') || text === 'work') {
        experienceHeadingIdx = i
        break
      }
    }

    if (experienceHeadingIdx === -1) {
      this.logger.warn('Could not find Experience section in resume HTML')
      return
    }

    // Collect all content between Experience heading and next same-level heading
    const experienceHeading = headings[experienceHeadingIdx]
    const headingTag = (experienceHeading as cheerio.Element).tagName
    const sectionElements: cheerio.Element[] = []

    let current = (experienceHeading as cheerio.Element).next
    while (current) {
      if (current.type === 'tag' && (current as cheerio.Element).tagName === headingTag) {
        break
      }
      sectionElements.push(current as cheerio.Element)
      current = current.next as cheerio.Element
    }

    // Look for job blocks — typically each job starts with a company/title line
    // We'll parse bold lines as company+title and bullet lists as highlights
    let currentJob: Partial<{
      company: string
      title: string
      startDate: string
      endDate: string | null
      location: string
      highlights: string[]
    }> | null = null

    const jobs: typeof currentJob[] = []

    for (const el of sectionElements) {
      const tag = (el as cheerio.Element).tagName
      const elCheerio = $(el)
      const text = elCheerio.text().trim()

      if (!text) continue

      // Detect job header lines — bold text typically signals company/title
      const boldText = elCheerio.find('b, strong').first().text().trim()
      const isLikelyJobHeader =
        (tag === 'p' || tag === 'h3' || tag === 'h4') &&
        boldText.length > 0 &&
        text.length < 200

      if (isLikelyJobHeader) {
        if (currentJob?.company) {
          jobs.push({ ...currentJob })
        }

        // Try to split "Company — Title" or "Title at Company"
        const parsed = this.parseJobHeader(text)
        currentJob = {
          ...parsed,
          highlights: [],
        }

        // Try to parse dates from same paragraph or next sibling
        const dateMatch = text.match(
          /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*(Present|Current|Now|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})/i,
        )
        if (dateMatch) {
          currentJob.startDate = this.normalizeDate(dateMatch[1])
          const endRaw = dateMatch[2].trim()
          currentJob.endDate = /present|current|now/i.test(endRaw) ? null : this.normalizeDate(endRaw)
        }
      } else if (tag === 'ul' || tag === 'ol') {
        if (currentJob) {
          elCheerio.find('li').each((_, li) => {
            const bullet = $(li).text().trim()
            if (bullet && currentJob!.highlights) {
              currentJob!.highlights.push(bullet)
            }
          })
        }
      } else if (tag === 'p' && currentJob && !currentJob.startDate) {
        // May contain just the date range
        const dateMatch = text.match(
          /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*(Present|Current|Now|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})/i,
        )
        if (dateMatch) {
          currentJob.startDate = this.normalizeDate(dateMatch[1])
          const endRaw = dateMatch[2].trim()
          currentJob.endDate = /present|current|now/i.test(endRaw) ? null : this.normalizeDate(endRaw)
        }
      }
    }

    if (currentJob?.company) {
      jobs.push({ ...currentJob })
    }

    this.logger.log(`Parsed ${jobs.length} job(s) from resume`)

    for (let i = 0; i < jobs.length; i++) {
      const jobData = jobs[i]
      if (!jobData?.company || !jobData.title) continue

      try {
        const existing = await this.jobRepository.findOne({
          where: { company: jobData.company, title: jobData.title },
        })

        if (existing && !force) {
          // Update highlights if they changed
          existing.highlights = jobData.highlights ?? []
          await this.jobRepository.save(existing)
          continue
        }

        const job = this.jobRepository.create({
          company: jobData.company,
          title: jobData.title,
          startDate: jobData.startDate ?? this.currentYearDateString(),
          endDate: jobData.endDate ?? null,
          location: jobData.location ?? null,
          highlights: jobData.highlights ?? [],
          sortOrder: i,
          isVisible: true,
        })

        await this.jobRepository.save(job)
        this.logger.log(`Saved job: ${job.title} at ${job.company}`)
      } catch (err) {
        this.logger.error(`Error saving job ${jobData.company}/${jobData.title}`, err)
      }
    }
  }

  private parseJobHeader(text: string): { company: string; title: string; location?: string } {
    // Remove date ranges from text first
    const cleaned = text
      .replace(
        /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}\s*[-–—]\s*(?:Present|Current|Now|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})/gi,
        '',
      )
      .replace(/\d{4}\s*[-–—]\s*(?:Present|\d{4})/gi, '')
      .trim()

    // Pattern: "Company — Title" or "Company | Title" or "Title, Company"
    const separators = [' — ', ' – ', ' | ', ' · ', '  ']
    for (const sep of separators) {
      if (cleaned.includes(sep)) {
        const parts = cleaned.split(sep).map((p) => p.trim()).filter(Boolean)
        if (parts.length >= 2) {
          return { company: parts[0], title: parts.slice(1).join(sep) }
        }
      }
    }

    // Fallback: assume entire line is "Title at Company" or just company
    const atMatch = cleaned.match(/^(.+?)\s+at\s+(.+)$/i)
    if (atMatch) {
      return { company: atMatch[2].trim(), title: atMatch[1].trim() }
    }

    // Last resort: whole line = company, title = "Software Engineer"
    return { company: cleaned, title: 'Software Engineer' }
  }

  private normalizeDate(raw: string): string {
    const cleaned = raw.trim()
    // Try "Month Year" → YYYY-MM-01
    const monthYearMatch = cleaned.match(
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})$/i,
    )
    if (monthYearMatch) {
      const monthNames: Record<string, string> = {
        jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
        jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
      }
      const month = monthNames[monthYearMatch[1].toLowerCase().slice(0, 3)]
      return `${monthYearMatch[2]}-${month}-01`
    }

    // Try bare year → YYYY-01-01
    const yearMatch = cleaned.match(/^(\d{4})$/)
    if (yearMatch) {
      return `${yearMatch[1]}-01-01`
    }

    // Fallback: today
    return new Date().toISOString().slice(0, 10)
  }

  private currentYearDateString(): string {
    return `${new Date().getFullYear()}-01-01`
  }

  // ─── Education parsing ────────────────────────────────────────────────────

  private async parseAndSaveEducation($: cheerio.CheerioAPI, _force: boolean): Promise<void> {
    const headings = $('h1, h2, h3, h4').toArray()

    let educationIdx = -1
    for (let i = 0; i < headings.length; i++) {
      const text = $(headings[i]).text().trim().toLowerCase()
      if (text === 'education' || text.startsWith('education')) {
        educationIdx = i
        break
      }
    }

    if (educationIdx === -1) {
      this.logger.warn('Could not find Education section in resume HTML')
      return
    }

    const educationHeading = headings[educationIdx]
    const headingTag = (educationHeading as cheerio.Element).tagName

    const sectionElements: cheerio.Element[] = []
    let current = (educationHeading as cheerio.Element).next as cheerio.Element | null
    while (current) {
      if (current.type === 'tag' && current.tagName === headingTag) break
      sectionElements.push(current)
      current = current.next as cheerio.Element | null
    }

    interface EducationEntry {
      institution: string
      degree: string
      field: string | null
      startDate: string | null
      endDate: string | null
    }

    const entries: EducationEntry[] = []
    let current_entry: Partial<EducationEntry> | null = null

    for (const el of sectionElements) {
      const tag = (el as cheerio.Element).tagName
      const elCheerio = $(el)
      const text = elCheerio.text().trim()
      if (!text) continue

      const boldText = elCheerio.find('b, strong').first().text().trim()
      const isHeader = (tag === 'p' || tag === 'h3' || tag === 'h4') && boldText.length > 0

      if (isHeader) {
        if (current_entry?.institution) {
          entries.push(current_entry as EducationEntry)
        }

        // Try to detect institution and degree
        const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
        current_entry = {
          institution: lines[0] ?? text,
          degree: lines[1] ?? 'Bachelor\'s Degree',
          field: null,
          startDate: null,
          endDate: null,
        }

        // Parse dates
        const dateMatch = text.match(
          /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*(Present|Current|Now|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{4})/i,
        )
        if (dateMatch && current_entry) {
          current_entry.startDate = this.normalizeDate(dateMatch[1])
          const endRaw = dateMatch[2].trim()
          current_entry.endDate = /present|current|now/i.test(endRaw)
            ? null
            : this.normalizeDate(endRaw)
        }
      }
    }

    if (current_entry?.institution) {
      entries.push(current_entry as EducationEntry)
    }

    this.logger.log(`Parsed ${entries.length} education record(s) from resume`)

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      try {
        const existing = await this.educationRepository.findOne({
          where: { institution: entry.institution },
        })

        if (existing) continue

        const edu = this.educationRepository.create({
          institution: entry.institution,
          degree: entry.degree,
          field: entry.field,
          startDate: entry.startDate,
          endDate: entry.endDate,
          sortOrder: i,
        })

        await this.educationRepository.save(edu)
        this.logger.log(`Saved education: ${edu.degree} at ${edu.institution}`)
      } catch (err) {
        this.logger.error(`Error saving education for ${entry.institution}`, err)
      }
    }
  }

  // ─── Skills parsing ───────────────────────────────────────────────────────

  private async parseAndSaveSkills($: cheerio.CheerioAPI, _force: boolean): Promise<void> {
    const headings = $('h1, h2, h3, h4').toArray()

    let skillsIdx = -1
    for (let i = 0; i < headings.length; i++) {
      const text = $(headings[i]).text().trim().toLowerCase()
      if (text === 'skills' || text.startsWith('technical skill') || text.startsWith('skill')) {
        skillsIdx = i
        break
      }
    }

    if (skillsIdx === -1) {
      this.logger.warn('Could not find Skills section in resume HTML')
      return
    }

    const skillsHeading = headings[skillsIdx]
    const headingTag = (skillsHeading as cheerio.Element).tagName

    const sectionElements: cheerio.Element[] = []
    let current = (skillsHeading as cheerio.Element).next as cheerio.Element | null
    while (current) {
      if (current.type === 'tag' && current.tagName === headingTag) break
      sectionElements.push(current)
      current = current.next as cheerio.Element | null
    }

    const skillNames = new Set<string>()

    for (const el of sectionElements) {
      const elCheerio = $(el)
      const tag = (el as cheerio.Element).tagName

      if (tag === 'ul' || tag === 'ol') {
        elCheerio.find('li').each((_, li) => {
          const text = $(li).text().trim()
          if (text) skillNames.add(text)
        })
      } else {
        const text = elCheerio.text().trim()
        if (text) {
          // Skills might be comma or pipe separated
          const items = text.split(/[,|•·]/).map((s) => s.trim()).filter((s) => s.length > 0 && s.length < 60)
          items.forEach((item) => skillNames.add(item))
        }
      }
    }

    this.logger.log(`Parsed ${skillNames.size} skill(s) from resume`)

    let sortOrder = 0
    for (const name of skillNames) {
      try {
        const existing = await this.skillRepository.findOne({ where: { name } })
        if (existing) continue

        const category = this.inferSkillCategory(name)
        const skill = this.skillRepository.create({
          name,
          category,
          sortOrder: sortOrder++,
          isVisible: true,
          proficiencyLevel: 70, // default
        })

        await this.skillRepository.save(skill)
      } catch (err) {
        this.logger.error(`Error saving skill "${name}"`, err)
      }
    }
  }

  private inferSkillCategory(name: string): SkillCategory {
    const lower = name.toLowerCase()

    const languages = ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'c++', 'c#', 'ruby', 'swift', 'kotlin', 'scala', 'php', 'r', 'matlab', 'bash', 'shell', 'sql']
    const frameworks = ['react', 'next', 'vue', 'angular', 'nestjs', 'express', 'fastapi', 'django', 'flask', 'spring', 'rails', 'laravel', 'svelte', 'nuxt', 'remix', 'gatsby', 'tailwind', 'bootstrap', 'material']
    const databases = ['postgres', 'postgresql', 'mysql', 'mongodb', 'redis', 'sqlite', 'dynamodb', 'cassandra', 'elasticsearch', 'neo4j', 'supabase', 'firestore', 'typeorm', 'prisma', 'sequelize']
    const devops = ['docker', 'kubernetes', 'k8s', 'aws', 'azure', 'gcp', 'google cloud', 'terraform', 'ansible', 'jenkins', 'github actions', 'gitlab ci', 'ci/cd', 'nginx', 'linux']
    const tools = ['git', 'github', 'gitlab', 'bitbucket', 'jira', 'figma', 'vscode', 'postman', 'grafana', 'prometheus', 'datadog', 'sentry']

    if (languages.some((l) => lower.includes(l))) return SkillCategory.LANGUAGES
    if (frameworks.some((f) => lower.includes(f))) return SkillCategory.FRAMEWORKS
    if (databases.some((d) => lower.includes(d))) return SkillCategory.DATABASES
    if (devops.some((d) => lower.includes(d))) return SkillCategory.DEVOPS
    if (tools.some((t) => lower.includes(t))) return SkillCategory.TOOLS

    return SkillCategory.OTHER
  }

  // ─── Blog scraping ────────────────────────────────────────────────────────

  async scrapeBlogs(): Promise<void> {
    this.logger.log('Starting blog scrape...')
    await Promise.allSettled([this.scrapeMedium(), this.scrapeKarimVarela()])
    this.logger.log('Blog scrape completed')
  }

  // ─── Medium RSS ───────────────────────────────────────────────────────────

  private async scrapeMedium(): Promise<void> {
    const feedUrl = 'https://medium.com/feed/@karim.varela'
    this.logger.log(`Fetching Medium RSS feed: ${feedUrl}`)

    let xml: string
    try {
      const response = await axios.get<string>(feedUrl, {
        timeout: 30_000,
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KarimVarelaBot/1.0)' },
      })
      xml = response.data
    } catch (err) {
      this.logger.error('Failed to fetch Medium RSS feed', err)
      return
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      cdataPropName: '__cdata',
      allowBooleanAttributes: true,
    })

    let feed: MediumRssFeed
    try {
      feed = parser.parse(xml) as MediumRssFeed
    } catch (err) {
      this.logger.error('Failed to parse Medium RSS XML', err)
      return
    }

    const items = feed?.rss?.channel?.item
    if (!items) {
      this.logger.warn('No items found in Medium RSS feed')
      return
    }

    const itemArray = Array.isArray(items) ? items : [items]
    this.logger.log(`Found ${itemArray.length} Medium post(s)`)

    for (const item of itemArray) {
      try {
        const title = this.extractText(item.title)
        const link = this.extractText(item.link)
        const htmlContent = this.extractCdata(item['content:encoded']) ?? this.extractCdata(item.description) ?? ''
        const pubDate = item.pubDate ? new Date(String(item.pubDate)) : new Date()

        // Extract categories/tags
        const categories = item.category
          ? Array.isArray(item.category)
            ? item.category.map((c) => this.extractText(c))
            : [this.extractText(item.category)]
          : []

        if (!title || !link) continue

        // Convert HTML to Markdown
        let markdown = ''
        if (htmlContent) {
          try {
            markdown = this.turndown.turndown(htmlContent)
          } catch {
            // fallback: strip tags
            markdown = cheerio.load(htmlContent).text()
          }
        }

        // Extract excerpt from first paragraph
        const excerptMatch = markdown.match(/^(?!#)(.{50,300}?)(?:\n\n|$)/m)
        const excerpt = excerptMatch ? excerptMatch[1].trim() : undefined

        await this.blogService.upsertImportedPost({
          title,
          content: markdown || title,
          excerpt,
          originalUrl: link,
          source: BlogPostSource.IMPORTED,
          publishedAt: pubDate,
          tagNames: categories.filter(Boolean),
        })
      } catch (err) {
        this.logger.error(`Error processing Medium item: ${String(item.title)}`, err)
      }
    }
  }

  // ─── karimvarela.com scraping ─────────────────────────────────────────────

  private async scrapeKarimVarela(): Promise<void> {
    const baseUrl = 'https://karimvarela.com'
    this.logger.log(`Scraping blog posts from ${baseUrl}`)

    // Try to get blog listing without Puppeteer first (faster, less resource-intensive)
    try {
      await this.scrapeKarimVarelaWithAxios(baseUrl)
    } catch (err) {
      this.logger.warn('Axios scrape failed, trying Puppeteer', err)
      await this.scrapeKarimVarelaWithPuppeteer(baseUrl)
    }
  }

  private async scrapeKarimVarelaWithAxios(baseUrl: string): Promise<void> {
    const response = await axios.get<string>(`${baseUrl}/blog`, {
      timeout: 30_000,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KarimVarelaBot/1.0)' },
    })

    const $ = cheerio.load(response.data)
    const links = this.extractBlogLinks($, baseUrl)

    if (links.length === 0) {
      throw new Error('No blog links found via Axios — may require JS rendering')
    }

    this.logger.log(`Found ${links.length} blog link(s) on karimvarela.com`)
    await this.scrapeBlogPages(links)
  }

  private async scrapeKarimVarelaWithPuppeteer(baseUrl: string): Promise<void> {
    // Dynamically import puppeteer to keep startup fast
    let browser
    try {
      const puppeteer = await import('puppeteer')
      browser = await puppeteer.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      })

      const page = await browser.newPage()
      await page.setUserAgent('Mozilla/5.0 (compatible; KarimVarelaBot/1.0)')
      await page.goto(`${baseUrl}/blog`, { waitUntil: 'networkidle2', timeout: 30_000 })

      const html = await page.content()
      const $ = cheerio.load(html)
      const links = this.extractBlogLinks($, baseUrl)

      this.logger.log(`Found ${links.length} blog link(s) via Puppeteer`)
      await this.scrapeBlogPages(links)
    } catch (err) {
      this.logger.error('Puppeteer scrape failed', err)
    } finally {
      if (browser) {
        await (browser as { close: () => Promise<void> }).close()
      }
    }
  }

  private extractBlogLinks($: cheerio.CheerioAPI, baseUrl: string): string[] {
    const links = new Set<string>()

    // Common selectors for blog post links
    $('a[href*="/blog/"]').each((_, el) => {
      const href = $(el).attr('href')
      if (!href) return

      const fullUrl = href.startsWith('http') ? href : `${baseUrl}${href}`

      // Filter out the listing page itself and non-post links
      if (
        fullUrl !== `${baseUrl}/blog` &&
        fullUrl !== `${baseUrl}/blog/` &&
        !fullUrl.includes('?') &&
        !fullUrl.includes('#')
      ) {
        links.add(fullUrl)
      }
    })

    return Array.from(links)
  }

  private async scrapeBlogPages(links: string[]): Promise<void> {
    for (const link of links) {
      try {
        const response = await axios.get<string>(link, {
          timeout: 20_000,
          headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KarimVarelaBot/1.0)' },
        })

        const $ = cheerio.load(response.data)
        const title = this.extractPageTitle($)
        const contentHtml = this.extractMainContent($)

        if (!title || !contentHtml) {
          this.logger.warn(`Could not extract content from ${link}`)
          continue
        }

        let markdown = ''
        try {
          markdown = this.turndown.turndown(contentHtml)
        } catch {
          markdown = $.text()
        }

        const excerptMatch = markdown.match(/^(?!#)(.{50,300}?)(?:\n\n|$)/m)
        const excerpt = excerptMatch ? excerptMatch[1].trim() : undefined

        await this.blogService.upsertImportedPost({
          title,
          content: markdown,
          excerpt,
          originalUrl: link,
          source: BlogPostSource.IMPORTED,
          publishedAt: new Date(),
        })
      } catch (err) {
        this.logger.error(`Error scraping blog page ${link}`, err)
      }
    }
  }

  private extractPageTitle($: cheerio.CheerioAPI): string {
    return (
      $('article h1').first().text().trim() ||
      $('main h1').first().text().trim() ||
      $('h1').first().text().trim() ||
      $('title').text().trim().replace(/\s*[|–-].*$/, '').trim()
    )
  }

  private extractMainContent($: cheerio.CheerioAPI): string {
    // Try common content containers in order of preference
    const selectors = [
      'article',
      '[class*="post-content"]',
      '[class*="blog-content"]',
      '[class*="article-body"]',
      'main',
      '.content',
      '#content',
    ]

    for (const selector of selectors) {
      const el = $(selector).first()
      if (el.length && el.html()) {
        return el.html() ?? ''
      }
    }

    return $('body').html() ?? ''
  }

  // ─── Utility helpers ──────────────────────────────────────────────────────

  private extractText(value: unknown): string {
    if (typeof value === 'string') return value.trim()
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>
      if (typeof obj['__cdata'] === 'string') return obj['__cdata'].trim()
      if (typeof obj['#text'] === 'string') return obj['#text'].trim()
    }
    return ''
  }

  private extractCdata(value: unknown): string | null {
    if (typeof value === 'string') return value
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>
      if (typeof obj['__cdata'] === 'string') return obj['__cdata']
      if (typeof obj['#text'] === 'string') return obj['#text']
    }
    return null
  }
}
