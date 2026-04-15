import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { PortfolioService } from './portfolio.service'
import { Public } from '../../common/decorators/public.decorator'
import { Job } from '../../entities/job.entity'
import { Education } from '../../entities/education.entity'
import { Skill } from '../../entities/skill.entity'
@ApiTags('portfolio')
@Public()
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOperation({ summary: 'Get full portfolio — jobs, education, and skills' })
  async findAll(): Promise<{ jobs: Job[]; education: Education[]; skills: Skill[] }> {
    return this.portfolioService.findAll()
  }

  @Get('jobs')
  @ApiOperation({ summary: 'Get all visible jobs ordered by sortOrder then startDate' })
  async findJobs(): Promise<Job[]> {
    return this.portfolioService.findJobs()
  }

  @Get('education')
  @ApiOperation({ summary: 'Get all education records ordered by sortOrder' })
  async findEducation(): Promise<Education[]> {
    return this.portfolioService.findEducation()
  }

  @Get('skills')
  @ApiOperation({ summary: 'Get all visible skills ordered by category then sortOrder' })
  async findSkills(): Promise<Skill[]> {
    return this.portfolioService.findSkills()
  }
}
