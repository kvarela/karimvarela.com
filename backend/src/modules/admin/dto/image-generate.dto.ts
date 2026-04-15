import { IsString, IsNotEmpty, MaxLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ImageGenerateDto {
  @ApiProperty({ description: 'Prompt describing the image to generate' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  prompt!: string
}

export class ImageGenerateResponseDto {
  imageUrl?: string
  base64?: string
  mimeType?: string
}
