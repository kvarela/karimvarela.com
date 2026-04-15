import { IsOptional, IsBoolean } from 'class-validator'
import { Transform } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PortfolioQueryDto {
  @ApiPropertyOptional({ description: 'Filter by visibility', default: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isVisible?: boolean
}
