import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

export enum SkillCategory {
  LANGUAGES = 'languages',
  FRAMEWORKS = 'frameworks',
  DATABASES = 'databases',
  DEVOPS = 'devops',
  TOOLS = 'tools',
  OTHER = 'other',
}

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  name!: string

  @Column({
    type: 'enum',
    enum: SkillCategory,
    default: SkillCategory.OTHER,
  })
  category!: SkillCategory

  @Column({ type: 'varchar', nullable: true })
  iconUrl!: string | null

  @Column({ type: 'int', default: 0 })
  proficiencyLevel!: number

  @Column({ type: 'int', default: 0 })
  sortOrder!: number

  @Column({ type: 'boolean', default: true })
  isVisible!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
