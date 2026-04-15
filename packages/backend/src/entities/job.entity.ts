import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  company!: string

  @Column({ type: 'varchar' })
  title!: string

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({ type: 'text', array: true, default: () => "'{}'", nullable: false })
  highlights!: string[]

  @Column({ type: 'varchar', nullable: true })
  location!: string | null

  @Column({ type: 'date' })
  startDate!: string

  @Column({ type: 'date', nullable: true })
  endDate!: string | null

  @Column({ type: 'varchar', nullable: true })
  logoUrl!: string | null

  @Column({ type: 'varchar', nullable: true })
  companyUrl!: string | null

  @Column({ type: 'int', default: 0 })
  sortOrder!: number

  @Column({ type: 'boolean', default: true })
  isVisible!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
