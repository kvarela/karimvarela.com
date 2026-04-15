import { Module } from '@nestjs/common'

import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'
import { BlogModule } from '../blog/blog.module'
import { ScraperModule } from '../scraper/scraper.module'

@Module({
  imports: [BlogModule, ScraperModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
