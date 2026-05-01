import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { BlogPost, BlogPostSummary, PaginatedResponse } from '@karimvarela/shared'
import { BlogPostContent } from './BlogPostContent'

interface BlogPostPageProps {
  params: { slug: string }
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/api/blog/${slug}`, {
      next: { revalidate: 3600 },
    })
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch post')
    return res.json()
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/api/blog?limit=1000&page=1`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data = (await res.json()) as PaginatedResponse<BlogPostSummary>
    return (data.data ?? []).map((post) => ({ slug: post.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return <BlogPostContent post={post} />
}
