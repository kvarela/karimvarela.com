import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar' })
  institution!: string

  @Column({ type: 'varchar' })
  degree!: string

  @Column({ type: 'varchar', nullable: true })
  field!: string | null

  @Column({ type: 'date', nullable: true })
  startDate!: string | null

  @Column({ type: 'date', nullable: true })
  endDate!: string | null

  @Column({ type: 'varchar', nullable: true })
  logoUrl!: string | null

  @Column({ type: 'text', nullable: true })
  description!: string | null

  @Column({ type: 'int', default: 0 })
  sortOrder!: number

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
