import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsUrl,
  MaxLength,
  ArrayMaxSize,
  IsNotEmpty,
} from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { BlogPostStatus } from '../../../entities/blog-post.entity'

export class UpdateBlogPostDto {
  @ApiPropertyOptional({ description: 'Post title', maxLength: 255 })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title?: string

  @ApiPropertyOptional({ description: 'Full markdown / HTML content' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  content?: string

  @ApiPropertyOptional({ description: 'Short excerpt / summary', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  excerpt?: string

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsUrl()
  coverImageUrl?: string

  @ApiPropertyOptional({ enum: BlogPostStatus })
  @IsOptional()
  @IsEnum(BlogPostStatus)
  status?: BlogPostStatus

  @ApiPropertyOptional({ description: 'Existing tag UUIDs to attach', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20)
  tagIds?: string[]

  @ApiPropertyOptional({ description: 'Tag names to find-or-create and attach', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20)
  tagNames?: string[]
}
