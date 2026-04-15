import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Job } from '../../entities/job.entity'
import { Education } from '../../entities/education.entity'
import { Skill } from '../../entities/skill.entity'
import { BlogPost } from '../../entities/blog-post.entity'
import { BlogTag } from '../../entities/blog-tag.entity'
import { BlogModule } from '../blog/blog.module'
import { ScraperService } from './scraper.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Job, Education, Skill, BlogPost, BlogTag]),
    BlogModule,
  ],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
