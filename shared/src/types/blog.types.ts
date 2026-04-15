export type BlogPostStatus = 'draft' | 'published' | 'archived'
export type BlogPostSource = 'manual' | 'imported' | 'ai_generated'

export interface BlogTag {
  id: string
  name: string
  slug: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImageUrl: string | null
  originalUrl: string | null
  status: BlogPostStatus
  source: BlogPostSource
  readTimeMinutes: number
  viewCount: number
  tags: BlogTag[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface BlogPostSummary {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImageUrl: string | null
  status: BlogPostStatus
  source: BlogPostSource
  readTimeMinutes: number
  viewCount: number
  tags: BlogTag[]
  publishedAt: string | null
  createdAt: string
}
