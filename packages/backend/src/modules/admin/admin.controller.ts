import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AdminService } from './admin.service'
import { ScraperService } from '../scraper/scraper.service'
import { AIGenerateDto, AIGenerateResponseDto } from './dto/ai-generate.dto'
import { ImageGenerateDto, ImageGenerateResponseDto } from './dto/image-generate.dto'

@ApiTags('admin')
@ApiBearerAuth('JWT')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly scraperService: ScraperService,
  ) {}

  // ─── AI ─────────────────────────────────────────────────────────────────────

  @Post('ai/generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate a blog post draft using Claude AI (admin)' })
  async generateBlogPost(@Body() dto: AIGenerateDto): Promise<AIGenerateResponseDto> {
    return this.adminService.generateBlogPost(dto.prompt, dto.context)
  }

  @Post('image/generate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate an image using Google Imagen (admin)' })
  async generateImage(@Body() dto: ImageGenerateDto): Promise<ImageGenerateResponseDto> {
    return this.adminService.generateImage(dto.prompt)
  }

  // ─── Scraping ────────────────────────────────────────────────────────────────

  @Post('scrape/resume')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Re-scrape resume from Google Docs and update portfolio (admin)' })
  async scrapeResume(): Promise<{ message: string }> {
    await this.scraperService.scrapeResume()
    return { message: 'Resume scrape completed' }
  }

  @Post('scrape/blogs')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Scrape blogs from Medium RSS and karimvarela.com (admin)' })
  async scrapeBlogs(): Promise<{ message: string }> {
    await this.scraperService.scrapeBlogs()
    return { message: 'Blog scrape completed' }
  }
}
