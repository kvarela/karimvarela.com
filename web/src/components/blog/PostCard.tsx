'use client'
import { Box, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostSummary } from '@karimvarela/shared'
import { NeonBadge } from '@/components/ui/NeonBadge'

interface PostCardProps {
  post: BlogPostSummary
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <Box
        bg="rgba(10,10,10,0.8)"
        border="1px solid rgba(0,255,65,0.12)"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s ease"
        height="100%"
        display="flex"
        flexDirection="column"
        _hover={{
          borderColor: 'rgba(0,255,65,0.35)',
          boxShadow: '0 0 20px rgba(0,255,65,0.12)',
          transform: 'translateY(-3px)',
        }}
      >
        {/* Cover Image */}
        {post.coverImageUrl && (
          <Box position="relative" width="100%" height="200px" overflow="hidden">
            <Image
              src={post.coverImageUrl}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
            />
            <Box
              position="absolute"
              inset={0}
              style={{
                background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.8))',
              }}
            />
          </Box>
        )}

        {/* Content */}
        <Flex direction="column" p={5} flex={1}>
          {/* Tags */}
          {post.tags.length > 0 && (
            <Flex gap={2} flexWrap="wrap" mb={3}>
              {post.tags.slice(0, 3).map((tag) => (
                <NeonBadge key={tag.id}>{tag.name}</NeonBadge>
              ))}
            </Flex>
          )}

          {/* Title */}
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="md"
            fontWeight="bold"
            color="#ccffcc"
            mb={2}
            lineHeight={1.4}
            _groupHover={{ color: '#00ff41' }}
          >
            {post.title}
          </Text>

          {/* Excerpt */}
          {post.excerpt && (
            <Text
              fontSize="sm"
              color="rgba(204,255,204,0.6)"
              lineHeight={1.7}
              mb={4}
              flex={1}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {post.excerpt}
            </Text>
          )}

          {/* Meta */}
          <Flex
            justify="space-between"
            align="center"
            mt="auto"
            pt={3}
            borderTop="1px solid rgba(0,255,65,0.08)"
          >
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="xs"
              color="rgba(204,255,204,0.4)"
            >
              {formatDate(post.publishedAt)}
            </Text>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="xs"
              color="rgba(0,255,65,0.5)"
            >
              {post.readTimeMinutes} min read
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  )
}
