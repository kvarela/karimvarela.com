import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_GUARD } from '@nestjs/core'

import { AuthModule } from './modules/auth/auth.module'
import { PortfolioModule } from './modules/portfolio/portfolio.module'
import { BlogModule } from './modules/blog/blog.module'
import { AdminModule } from './modules/admin/admin.module'
import { ScraperModule } from './modules/scraper/scraper.module'
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard'

import { Job } from './entities/job.entity'
import { Education } from './entities/education.entity'
import { Skill } from './entities/skill.entity'
import { BlogPost } from './entities/blog-post.entity'
import { BlogTag } from './entities/blog-tag.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow<string>('DATABASE_URL'),
        entities: [Job, Education, Skill, BlogPost, BlogTag],
        migrations: [__dirname + '/migrations/**/*.{ts,js}'],
        synchronize: false,
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    PortfolioModule,
    BlogModule,
    AdminModule,
    ScraperModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
