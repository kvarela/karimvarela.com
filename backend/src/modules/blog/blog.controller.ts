import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'

import { BlogService } from './blog.service'
import { CreateBlogPostDto } from './dto/create-blog-post.dto'
import { UpdateBlogPostDto } from './dto/update-blog-post.dto'
import { BlogQueryDto } from './dto/blog-query.dto'
import { Public } from '../../common/decorators/public.decorator'
import { BlogPost } from '../../entities/blog-post.entity'
import { BlogTag } from '../../entities/blog-tag.entity'
import type { PaginatedResponse } from '@karimvarela/shared'

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  // ─── Public endpoints ───────────────────────────────────────────────────────

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated published blog posts' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'tag', required: false, type: String, description: 'Filter by tag slug' })
  async findAll(@Query() query: BlogQueryDto): Promise<PaginatedResponse<BlogPost>> {
    return this.blogService.findAll(query.page, query.limit, query.tag)
  }

  @Public()
  @Get('tags')
  @ApiOperation({ summary: 'Get all blog tags' })
  async findAllTags(): Promise<BlogTag[]> {
    return this.blogService.findAllTags()
  }

  @Public()
  @Get(':slug')
  @ApiOperation({ summary: 'Get a single blog post by slug and increment view count' })
  @ApiParam({ name: 'slug', type: String })
  async findOne(@Param('slug') slug: string): Promise<BlogPost> {
    const post = await this.blogService.findBySlug(slug)
    // Fire-and-forget view count increment
    void this.blogService.incrementViewCount(slug)
    return post
  }

  // ─── Protected endpoints ────────────────────────────────────────────────────

  @Post()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new blog post (admin)' })
  async create(@Body() dto: CreateBlogPostDto): Promise<BlogPost> {
    return this.blogService.create(dto)
  }

  @Patch(':id')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a blog post by ID (admin)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogService.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Archive (soft-delete) a blog post by ID (admin)' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<BlogPost> {
    return this.blogService.archive(id)
  }
}
