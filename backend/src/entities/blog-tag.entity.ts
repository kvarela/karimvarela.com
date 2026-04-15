import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm'
import { BlogPost } from './blog-post.entity'

@Entity('blog_tags')
export class BlogTag {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', unique: true })
  name!: string

  @Column({ type: 'varchar', unique: true })
  slug!: string

  @ManyToMany(() => BlogPost, (post) => post.tags)
  posts!: BlogPost[]
}
