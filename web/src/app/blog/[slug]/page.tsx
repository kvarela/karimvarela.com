import { Box, Flex, Text } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost, BlogPostSummary, PaginatedResponse } from '@karimvarela/shared'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { Footer } from '@/components/layout/Footer'
import { PostContent } from '@/components/blog/PostContent'
import { NeonBadge } from '@/components/ui/NeonBadge'

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

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  return (
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />

      <Box position="relative" zIndex={1}>
        <Box
          as="main"
          px={{ base: 6, md: 12, lg: 20 }}
          py={{ base: 8, lg: 16 }}
          maxWidth="860px"
          mx="auto"
        >
          {/* Back link */}
          <Box mb={8}>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(0,255,65,0.5)"
                _hover={{ color: '#00ff41' }}
                transition="color 0.2s"
              >
                ← All Posts
              </Text>
            </Link>
          </Box>

          {/* Article header */}
          <Box as="header" mb={10}>
            {/* Tags */}
            {post.tags.length > 0 && (
              <Flex gap={2} flexWrap="wrap" mb={4}>
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <NeonBadge>{tag.name}</NeonBadge>
                  </Link>
                ))}
              </Flex>
            )}

            {/* Title */}
            <Text
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="bold"
              color="white"
              lineHeight={1.2}
              mb={5}
            >
              {post.title}
            </Text>

            {/* Meta */}
            <Flex gap={4} align="center" flexWrap="wrap">
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(204,255,204,0.45)"
              >
                {formatDate(post.publishedAt)}
              </Text>
              <Text color="rgba(0,255,65,0.3)" fontSize="xs">•</Text>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(0,255,65,0.5)"
              >
                {post.readTimeMinutes} min read
              </Text>
              {post.originalUrl && (
                <>
                  <Text color="rgba(0,255,65,0.3)" fontSize="xs">•</Text>
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: '0.75rem',
                      color: 'rgba(204,255,204,0.35)',
                      textDecoration: 'none',
                    }}
                  >
                    Original post ↗
                  </a>
                </>
              )}
            </Flex>
          </Box>

          {/* Cover image */}
          {post.coverImageUrl && (
            <Box
              position="relative"
              width="100%"
              height={{ base: '240px', md: '400px' }}
              borderRadius="xl"
              overflow="hidden"
              mb={10}
              border="1px solid rgba(0,255,65,0.15)"
            >
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
          )}

          {/* Divider */}
          <Box
            height="1px"
            mb={10}
            style={{
              background: 'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
            }}
          />

          {/* Article content */}
          <Box as="article">
            <PostContent content={post.content} />
          </Box>

          {/* Footer divider */}
          <Box
            height="1px"
            my={12}
            style={{
              background: 'linear-gradient(to right, transparent, rgba(0,255,65,0.3), transparent)',
            }}
          />

          {/* Post footer */}
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4} mb={12}>
            <Link href="/blog" style={{ textDecoration: 'none' }}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                _hover={{ color: '#39ff14' }}
                transition="color 0.2s"
              >
                ← More Posts
              </Text>
            </Link>

            {post.tags.length > 0 && (
              <Flex gap={2} flexWrap="wrap">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <NeonBadge>{tag.name}</NeonBadge>
                  </Link>
                ))}
              </Flex>
            )}
          </Flex>

          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
