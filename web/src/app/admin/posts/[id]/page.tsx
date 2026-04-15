'use client'
import { useEffect, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import type { BlogPost } from '@karimvarela/shared'
import { apiClient } from '@/lib/api-client'
import { PostForm } from '@/components/admin/PostForm'

interface EditPostPageProps {
  params: { id: string }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = params
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await apiClient.get<BlogPost>(`/blog/id/${id}`)
        setPost(res.data)
      } catch {
        setError('Failed to load post.')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id])

  return (
    <Box p={{ base: 6, md: 10 }}>
      <Box mb={8}>
        <Link href="/admin/posts" style={{ textDecoration: 'none' }}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="sm"
            color="rgba(0,255,65,0.5)"
            _hover={{ color: '#00ff41' }}
            transition="color 0.2s"
            mb={4}
            display="block"
          >
            ← All Posts
          </Text>
        </Link>
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="xs"
          color="rgba(0,255,65,0.6)"
          mb={1}
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          Edit
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          {loading ? 'Loading...' : post?.title ?? 'Edit Post'}
        </Text>
      </Box>

      {loading && (
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="sm"
          color="rgba(204,255,204,0.4)"
        >
          Loading post...
        </Text>
      )}

      {error && (
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="sm"
          color="rgba(255,100,100,0.8)"
        >
          {error}
        </Text>
      )}

      {!loading && !error && post && (
        <PostForm initialData={post} postId={id} />
      )}
    </Box>
  )
}
