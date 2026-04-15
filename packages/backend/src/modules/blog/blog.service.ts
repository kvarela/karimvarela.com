import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsWhere } from 'typeorm'
import slugify from 'slugify'

import { BlogPost, BlogPostStatus, BlogPostSource } from '../../entities/blog-post.entity'
import { BlogTag } from '../../entities/blog-tag.entity'
import { CreateBlogPostDto } from './dto/create-blog-post.dto'
import { UpdateBlogPostDto } from './dto/update-blog-post.dto'
import type { PaginatedResponse } from '@karimvarela/shared'

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name)

  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,

    @InjectRepository(BlogTag)
    private readonly blogTagRepository: Repository<BlogTag>,
  ) {}

  // ─── Tag helpers ─────────────────────────────────────────────────────────────

  async findOrCreateTag(name: string): Promise<BlogTag> {
    const slug = slugify(name, { lower: true, strict: true })
    let tag = await this.blogTagRepository.findOne({ where: { slug } })

    if (!tag) {
      tag = this.blogTagRepository.create({ name: name.trim(), slug })
      tag = await this.blogTagRepository.save(tag)
    }

    return tag
  }

  async resolveTags(dto: { tagIds?: string[]; tagNames?: string[] }): Promise<BlogTag[]> {
    const tags: BlogTag[] = []

    if (dto.tagIds?.length) {
      const byId = await Promise.all(
        dto.tagIds.map((id) => this.blogTagRepository.findOne({ where: { id } })),
      )
      tags.push(...(byId.filter(Boolean) as BlogTag[]))
    }

    if (dto.tagNames?.length) {
      const byName = await Promise.all(dto.tagNames.map((name) => this.findOrCreateTag(name)))
      // Deduplicate by id
      for (const t of byName) {
        if (!tags.find((existing) => existing.id === t.id)) {
          tags.push(t)
        }
      }
    }

    return tags
  }

  // ─── Slug helpers ─────────────────────────────────────────────────────────────

  private async generateUniqueSlug(title: string, excludeId?: string): Promise<string> {
    const base = slugify(title, { lower: true, strict: true })
    let slug = base
    let counter = 1

    while (true) {
      const where: FindOptionsWhere<BlogPost> = { slug }
      const existing = await this.blogPostRepository.findOne({ where })

      if (!existing || existing.id === excludeId) {
        return slug
      }

      slug = `${base}-${counter}`
      counter++
    }
  }

  // ─── Read ──────────────────────────────────────────────────────────────────

  async findAll(
    page = 1,
    limit = 10,
    tagSlug?: string,
  ): Promise<PaginatedResponse<BlogPost>> {
    const qb = this.blogPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.tags', 'tag')
      .where('post.status = :status', { status: BlogPostStatus.PUBLISHED })
      .orderBy('post.publishedAt', 'DESC')
      .addOrderBy('post.createdAt', 'DESC')

    if (tagSlug) {
      qb.andWhere('tag.slug = :tagSlug', { tagSlug })
    }

    const total = await qb.getCount()
    const data = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany()

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  }

  async findAllTags(): Promise<BlogTag[]> {
    return this.blogTagRepository.find({ order: { name: 'ASC' } })
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({
      where: { slug },
      relations: ['tags'],
    })

    if (!post) {
      throw new NotFoundException(`Blog post with slug "${slug}" not found`)
    }

    return post
  }

  async findById(id: string): Promise<BlogPost> {
    const post = await this.blogPostRepository.findOne({
      where: { id },
      relations: ['tags'],
    })

    if (!post) {
      throw new NotFoundException(`Blog post with id "${id}" not found`)
    }

    return post
  }

  async incrementViewCount(slug: string): Promise<void> {
    await this.blogPostRepository.increment({ slug }, 'viewCount', 1)
  }

  // ─── Write ─────────────────────────────────────────────────────────────────

  async create(dto: CreateBlogPostDto): Promise<BlogPost> {
    const slug = await this.generateUniqueSlug(dto.title)
    const tags = await this.resolveTags(dto)
    const readTimeMinutes = this.estimateReadTime(dto.content)

    const post = this.blogPostRepository.create({
      title: dto.title,
      slug,
      content: dto.content,
      excerpt: dto.excerpt ?? null,
      coverImageUrl: dto.coverImageUrl ?? null,
      status: dto.status ?? BlogPostStatus.DRAFT,
      source: BlogPostSource.MANUAL,
      tags,
      readTimeMinutes,
      publishedAt: dto.status === BlogPostStatus.PUBLISHED ? new Date() : null,
    })

    return this.blogPostRepository.save(post)
  }

  async update(id: string, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findById(id)

    if (dto.title && dto.title !== post.title) {
      post.slug = await this.generateUniqueSlug(dto.title, id)
      post.title = dto.title
    }

    if (dto.content !== undefined) {
      post.content = dto.content
      post.readTimeMinutes = this.estimateReadTime(dto.content)
    }

    if (dto.excerpt !== undefined) post.excerpt = dto.excerpt ?? null
    if (dto.coverImageUrl !== undefined) post.coverImageUrl = dto.coverImageUrl ?? null

    if (dto.status !== undefined && dto.status !== post.status) {
      if (dto.status === BlogPostStatus.PUBLISHED && !post.publishedAt) {
        post.publishedAt = new Date()
      }
      post.status = dto.status
    }

    if (dto.tagIds !== undefined || dto.tagNames !== undefined) {
      post.tags = await this.resolveTags(dto)
    }

    return this.blogPostRepository.save(post)
  }

  async archive(id: string): Promise<BlogPost> {
    const post = await this.findById(id)
    post.status = BlogPostStatus.ARCHIVED
    return this.blogPostRepository.save(post)
  }

  // ─── Import helpers (used by scraper) ────────────────────────────────────

  async upsertImportedPost(data: {
    title: string
    content: string
    excerpt?: string
    originalUrl: string
    source: BlogPostSource
    publishedAt?: Date
    tagNames?: string[]
    coverImageUrl?: string
  }): Promise<BlogPost | null> {
    try {
      const existing = await this.blogPostRepository.findOne({
        where: { originalUrl: data.originalUrl },
      })

      if (existing) {
        this.logger.debug(`Skipping already-imported post: ${data.originalUrl}`)
        return existing
      }

      const slug = await this.generateUniqueSlug(data.title)
      const tags = await this.resolveTags({ tagNames: data.tagNames })
      const readTimeMinutes = this.estimateReadTime(data.content)

      const post = this.blogPostRepository.create({
        title: data.title,
        slug,
        content: data.content,
        excerpt: data.excerpt ?? null,
        coverImageUrl: data.coverImageUrl ?? null,
        originalUrl: data.originalUrl,
        status: BlogPostStatus.PUBLISHED,
        source: data.source,
        tags,
        readTimeMinutes,
        publishedAt: data.publishedAt ?? new Date(),
      })

      return this.blogPostRepository.save(post)
    } catch (err) {
      if (
        err instanceof ConflictException ||
        (err as NodeJS.ErrnoException).message?.includes('unique constraint')
      ) {
        this.logger.warn(`Duplicate detected for: ${data.originalUrl}`)
        return null
      }
      throw err
    }
  }

  // ─── Utility ───────────────────────────────────────────────────────────────

  private estimateReadTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.trim().split(/\s+/).length
    return Math.max(1, Math.round(wordCount / wordsPerMinute))
  }
}
