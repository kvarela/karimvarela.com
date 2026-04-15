export interface Education {
  id: string
  institution: string
  degree: string
  field: string | null
  startDate: string | null
  endDate: string | null
  logoUrl: string | null
  description: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}
