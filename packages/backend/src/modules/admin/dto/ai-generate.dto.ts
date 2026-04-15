import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class AIGenerateDto {
  @ApiProperty({ description: 'Prompt describing the blog post topic or request' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  prompt!: string

  @ApiPropertyOptional({ description: 'Additional context for the AI (e.g., resume snippet, bio)' })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  context?: string
}

export class AIGenerateResponseDto {
  title!: string
  content!: string
  excerpt!: string
  tags!: string[]
}
