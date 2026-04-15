import { Box, Grid, Flex, Text } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { BlogPostSummary, BlogTag, PaginatedResponse } from '@karimvarela/shared'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { Footer } from '@/components/layout/Footer'
import { PostCard } from '@/components/blog/PostCard'

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
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />

      <Box position="relative" zIndex={1}>
        <Box
          as="main"
          px={{ base: 6, md: 12, lg: 20 }}
          py={{ base: 8, lg: 16 }}
          maxWidth="1200px"
          mx="auto"
        >
          {/* Back link */}
          <Box mb={8}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(0,255,65,0.5)"
                _hover={{ color: '#00ff41' }}
                transition="color 0.2s"
              >
                ← Home
              </Text>
            </Link>
          </Box>

          {/* Header */}
          <Box mb={12}>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              color="#00ff41"
              mb={2}
              letterSpacing="0.1em"
            >
              thoughts & ideas
            </Text>
            <Text
              as="h1"
              fontSize={{ base: '4xl', md: '5xl' }}
              fontWeight="bold"
              color="white"
              mb={4}
            >
              Blog
            </Text>
            <Text
              fontSize="lg"
              color="rgba(204,255,204,0.6)"
              maxWidth="500px"
            >
              Writing about software engineering, entrepreneurship, and life on the west side.
            </Text>
          </Box>

          {/* Tag filters */}
          {tags.length > 0 && (
            <Flex gap={2} flexWrap="wrap" mb={10}>
              <Link
                href="/blog"
                style={{ textDecoration: 'none' }}
              >
                <Box
                  px={3}
                  py={1}
                  fontSize="xs"
                  fontFamily="var(--font-mono), monospace"
                  borderRadius="md"
                  border="1px solid"
                  borderColor={!activeTag ? '#00ff41' : 'rgba(0,255,65,0.25)'}
                  color={!activeTag ? '#0a0a0a' : '#00ff41'}
                  bg={!activeTag ? '#00ff41' : 'transparent'}
                  _hover={{ borderColor: '#00ff41' }}
                  transition="all 0.2s"
                  cursor="pointer"
                >
                  All
                </Box>
              </Link>
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/blog?tag=${tag.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    px={3}
                    py={1}
                    fontSize="xs"
                    fontFamily="var(--font-mono), monospace"
                    borderRadius="md"
                    border="1px solid"
                    borderColor={activeTag === tag.slug ? '#00ff41' : 'rgba(0,255,65,0.25)'}
                    color={activeTag === tag.slug ? '#0a0a0a' : '#00ff41'}
                    bg={activeTag === tag.slug ? '#00ff41' : 'transparent'}
                    _hover={{ borderColor: '#00ff41' }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    {tag.name}
                  </Box>
                </Link>
              ))}
            </Flex>
          )}

          {/* Posts grid */}
          {posts.length > 0 ? (
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
              mb={12}
            >
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </Grid>
          ) : (
            <Box py={20} textAlign="center">
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(204,255,204,0.4)"
              >
                No posts found.
              </Text>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justify="center" gap={3} mb={12}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/blog?page=${p}${activeTag ? `&tag=${activeTag}` : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    px={4}
                    py={2}
                    fontFamily="var(--font-mono), monospace"
                    fontSize="sm"
                    borderRadius="md"
                    border="1px solid"
                    borderColor={page === p ? '#00ff41' : 'rgba(0,255,65,0.2)'}
                    color={page === p ? '#0a0a0a' : '#00ff41'}
                    bg={page === p ? '#00ff41' : 'transparent'}
                    _hover={{ borderColor: '#00ff41', bg: 'rgba(0,255,65,0.1)' }}
                    transition="all 0.2s"
                  >
                    {p}
                  </Box>
                </Link>
              ))}
            </Flex>
          )}

          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
