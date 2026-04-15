import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Job } from '../../entities/job.entity'
import { Education } from '../../entities/education.entity'
import { Skill } from '../../entities/skill.entity'
import { PortfolioController } from './portfolio.controller'
import { PortfolioService } from './portfolio.service'

@Module({
  imports: [TypeOrmModule.forFeature([Job, Education, Skill])],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
