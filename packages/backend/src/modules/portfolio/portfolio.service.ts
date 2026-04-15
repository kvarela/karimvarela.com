import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Job } from '../../entities/job.entity'
import { Education } from '../../entities/education.entity'
import { Skill } from '../../entities/skill.entity'
@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,

    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,

    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async findJobs(): Promise<Job[]> {
    return this.jobRepository.find({
      where: { isVisible: true },
      order: {
        sortOrder: 'ASC',
        startDate: 'DESC',
      },
    })
  }

  async findEducation(): Promise<Education[]> {
    return this.educationRepository.find({
      order: {
        sortOrder: 'ASC',
        startDate: 'DESC',
      },
    })
  }

  async findSkills(): Promise<Skill[]> {
    return this.skillRepository.find({
      where: { isVisible: true },
      order: {
        category: 'ASC',
        sortOrder: 'ASC',
      },
    })
  }

  async findAll(): Promise<{ jobs: Job[]; education: Education[]; skills: Skill[] }> {
    const [jobs, education, skills] = await Promise.all([
      this.findJobs(),
      this.findEducation(),
      this.findSkills(),
    ])

    return { jobs, education, skills }
  }
}
