import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { BlogTag } from './blog-tag.entity'

export enum BlogPostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum BlogPostSource {
  MANUAL = 'manual',
  IMPORTED = 'imported',
  AI_GENERATED = 'ai_generated',
}

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'varchar', unique: true })
  slug!: string

  @Column({ type: 'text', nullable: true })
  excerpt!: string | null

  @Column({ type: 'text' })
  content!: string

  @Column({ type: 'varchar', nullable: true })
  coverImageUrl!: string | null

  @Column({ type: 'varchar', nullable: true })
  originalUrl!: string | null

  @Column({
    type: 'enum',
    enum: BlogPostStatus,
    default: BlogPostStatus.DRAFT,
  })
  status!: BlogPostStatus

  @Column({
    type: 'enum',
    enum: BlogPostSource,
    default: BlogPostSource.MANUAL,
  })
  source!: BlogPostSource

  @Column({ type: 'int', default: 0 })
  readTimeMinutes!: number

  @Column({ type: 'int', default: 0 })
  viewCount!: number

  @Column({ type: 'timestamp', nullable: true })
  publishedAt!: Date | null

  @ManyToMany(() => BlogTag, (tag) => tag.posts, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'blog_posts_tags',
    joinColumn: { name: 'blog_post_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'blog_tag_id', referencedColumnName: 'id' },
  })
  tags!: BlogTag[]

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
