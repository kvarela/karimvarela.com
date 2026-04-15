/**
 * Standalone script to scrape blog posts.
 * Usage: npm run scrape:blogs
 *
 * This bootstraps a minimal NestJS application context to access the
 * ScraperService, then tears it down after scraping completes.
 */
import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from '../app.module'
import { ScraperService } from '../modules/scraper/scraper.service'

async function main(): Promise<void> {
  console.log('[scrape-blogs] Bootstrapping application context...')

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  })

  try {
    const scraperService = app.get(ScraperService)

    console.log('[scrape-blogs] Starting blog scrape...')
    await scraperService.scrapeBlogs()

    console.log('[scrape-blogs] Done.')
  } catch (err) {
    console.error('[scrape-blogs] Fatal error:', err)
    process.exit(1)
  } finally {
    await app.close()
  }
}

void main()
