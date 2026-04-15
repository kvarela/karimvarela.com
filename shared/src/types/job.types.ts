export interface Job {
  id: string
  company: string
  title: string
  description: string | null
  highlights: string[]
  location: string | null
  startDate: string // ISO date string
  endDate: string | null // null = current job
  logoUrl: string | null
  companyUrl: string | null
  sortOrder: number
  isVisible: boolean
  createdAt: string
  updatedAt: string
}
