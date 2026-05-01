'use client'
import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@karimvarela/shared'
import { PageLayout } from '@/components/layout/PageLayout'
import { Footer } from '@/components/layout/Footer'
import { PostContent } from '@/components/blog/PostContent'
import { NeonBadge } from '@/components/ui/NeonBadge'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

interface BlogPostContentProps {
  post: BlogPost
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <PageLayout>
      <Box
        as="main"
        px={{ base: 6, md: 12, lg: 20 }}
        py={{ base: 8, lg: 16 }}
        maxWidth="860px"
        mx="auto"
      >
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

        <Box as="header" mb={10}>
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

        <Box
          height="1px"
          mb={10}
          style={{
            background: 'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
          }}
        />

        <Box as="article">
          <PostContent content={post.content} />
        </Box>

        <Box
          height="1px"
          my={12}
          style={{
            background: 'linear-gradient(to right, transparent, rgba(0,255,65,0.3), transparent)',
          }}
        />

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
    </PageLayout>
  )
}
