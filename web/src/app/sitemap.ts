import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'

  let blogPosts: { slug: string; updatedAt: string }[] = []
  try {
    const res = await fetch(`${apiUrl}/api/blog?limit=1000&page=1`)
    const data = await res.json()
    blogPosts = data.data || []
  } catch {
    // ignore
  }

  const staticRoutes = [
    {
      url: 'https://karimvarela.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: 'https://karimvarela.com/personal',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://karimvarela.com/moto-venice',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: 'https://karimvarela.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  const blogRoutes = blogPosts.map((post) => ({
    url: `https://karimvarela.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
