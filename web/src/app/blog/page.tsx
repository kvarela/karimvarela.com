import type { Metadata } from 'next'
import type { BlogPostSummary, BlogTag, PaginatedResponse } from '@karimvarela/shared'
import { BlogContent } from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on software engineering, entrepreneurship, and life in Venice, CA.',
}

interface BlogPageProps {
  searchParams: { page?: string; tag?: string }
}

async function getBlogPosts(
  page: number,
  tag?: string,
): Promise<PaginatedResponse<BlogPostSummary>> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  const params = new URLSearchParams({ page: String(page), limit: '12' })
  if (tag) params.set('tag', tag)

  try {
    const res = await fetch(`${apiUrl}/api/blog?${params}`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('Failed to fetch blog posts')
    return res.json()
  } catch {
    return { data: [], total: 0, page: 1, limit: 12, totalPages: 0 }
  }
}

async function getAllTags(): Promise<BlogTag[]> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/api/blog/tags`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed to fetch tags')
    return res.json()
  } catch {
    return []
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page ?? '1')
  const activeTag = searchParams.tag

  const [postsData, tags] = await Promise.all([getBlogPosts(page, activeTag), getAllTags()])

  const { data: posts, totalPages } = postsData

  return (
    <BlogContent
      posts={posts}
      tags={tags}
      totalPages={totalPages}
      page={page}
      activeTag={activeTag}
    />
  )
}
