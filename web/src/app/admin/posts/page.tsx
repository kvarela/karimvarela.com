'use client'
import { useEffect, useState } from 'react'
import { Box, Flex, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import type { BlogPostSummary, PaginatedResponse } from '@karimvarela/shared'
import { apiClient } from '@/lib/api-client'
import { NeonBadge } from '@/components/ui/NeonBadge'

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; color: string; border: string }> = {
    published: {
      bg: 'rgba(0,255,65,0.1)',
      color: '#00ff41',
      border: 'rgba(0,255,65,0.3)',
    },
    draft: {
      bg: 'rgba(255,200,0,0.08)',
      color: 'rgba(255,200,0,0.9)',
      border: 'rgba(255,200,0,0.25)',
    },
    archived: {
      bg: 'rgba(150,150,150,0.08)',
      color: 'rgba(150,150,150,0.7)',
      border: 'rgba(150,150,150,0.2)',
    },
  }
  const style = colors[status] ?? colors.draft

  return (
    <Box
      as="span"
      display="inline-block"
      px={2}
      py={0.5}
      fontSize="xs"
      fontFamily="var(--font-mono), monospace"
      borderRadius="md"
      border="1px solid"
      style={{ background: style.bg, color: style.color, borderColor: style.border }}
    >
      {status}
    </Box>
  )
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.get<PaginatedResponse<BlogPostSummary>>('/blog?limit=100&page=1')
      setPosts(res.data.data)
    } catch {
      setError('Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await apiClient.delete(`/blog/${id}`)
      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch {
      alert('Failed to delete post.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Box p={{ base: 6, md: 10 }}>
      <Flex justify="space-between" align="center" mb={8} flexWrap="wrap" gap={4}>
        <Box>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="xs"
            color="rgba(0,255,65,0.6)"
            mb={1}
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            Content
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            Blog Posts
          </Text>
        </Box>
        <Link href="/admin/posts/new" style={{ textDecoration: 'none' }}>
          <Button
            bg="#00ff41"
            color="#0a0a0a"
            fontFamily="var(--font-mono), monospace"
            fontSize="sm"
            fontWeight="bold"
            _hover={{ bg: '#39ff14', boxShadow: '0 0 15px rgba(0,255,65,0.4)' }}
          >
            + New Post
          </Button>
        </Link>
      </Flex>

      {loading && (
        <Text fontFamily="var(--font-mono), monospace" fontSize="sm" color="rgba(204,255,204,0.4)">
          Loading posts...
        </Text>
      )}

      {error && (
        <Text fontFamily="var(--font-mono), monospace" fontSize="sm" color="rgba(255,100,100,0.8)">
          {error}
        </Text>
      )}

      {!loading && !error && posts.length === 0 && (
        <Box
          py={20}
          textAlign="center"
          border="1px dashed rgba(0,255,65,0.15)"
          borderRadius="lg"
        >
          <Text fontFamily="var(--font-mono), monospace" fontSize="sm" color="rgba(204,255,204,0.4)">
            No posts yet.{' '}
            <Link href="/admin/posts/new" style={{ color: '#00ff41' }}>
              Create your first post →
            </Link>
          </Text>
        </Box>
      )}

      {!loading && posts.length > 0 && (
        <Box
          bg="rgba(10,10,10,0.8)"
          border="1px solid rgba(0,255,65,0.12)"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box overflowX="auto">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr
                  style={{
                    borderBottom: '1px solid rgba(0,255,65,0.12)',
                    background: 'rgba(0,255,65,0.04)',
                  }}
                >
                  {['Title', 'Status', 'Source', 'Published', 'Actions'].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: '11px',
                        color: 'rgba(0,255,65,0.7)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        fontWeight: 600,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {posts.map((post, i) => (
                  <tr
                    key={post.id}
                    style={{
                      borderBottom: i < posts.length - 1 ? '1px solid rgba(0,255,65,0.06)' : 'none',
                    }}
                  >
                    <td style={{ padding: '12px 16px', maxWidth: '360px' }}>
                      <Text
                        fontSize="sm"
                        color="#ccffcc"
                        fontWeight="medium"
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '340px',
                          display: 'block',
                        }}
                      >
                        {post.title}
                      </Text>
                      {post.tags.length > 0 && (
                        <Flex gap={1} mt={1} flexWrap="wrap">
                          {post.tags.slice(0, 3).map((t) => (
                            <NeonBadge key={t.id} fontSize="10px" px={1.5} py={0}>
                              {t.name}
                            </NeonBadge>
                          ))}
                        </Flex>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <StatusBadge status={post.status} />
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <Text
                        fontSize="xs"
                        fontFamily="var(--font-mono), monospace"
                        color="rgba(204,255,204,0.45)"
                      >
                        {post.source}
                      </Text>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <Text
                        fontSize="xs"
                        fontFamily="var(--font-mono), monospace"
                        color="rgba(204,255,204,0.45)"
                      >
                        {formatDate(post.publishedAt)}
                      </Text>
                    </td>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                      <Flex gap={3}>
                        <Link href={`/admin/posts/${post.id}`} style={{ textDecoration: 'none' }}>
                          <Text
                            fontSize="xs"
                            fontFamily="var(--font-mono), monospace"
                            color="#00ff41"
                            cursor="pointer"
                            _hover={{ color: '#39ff14' }}
                            transition="color 0.2s"
                          >
                            Edit
                          </Text>
                        </Link>
                        <Text
                          fontSize="xs"
                          fontFamily="var(--font-mono), monospace"
                          color={deletingId === post.id ? 'rgba(255,100,100,0.4)' : 'rgba(255,100,100,0.6)'}
                          cursor={deletingId === post.id ? 'not-allowed' : 'pointer'}
                          _hover={{ color: 'rgba(255,80,80,1)' }}
                          transition="color 0.2s"
                          onClick={() => deletingId !== post.id && handleDelete(post.id)}
                        >
                          {deletingId === post.id ? 'Deleting...' : 'Delete'}
                        </Text>
                      </Flex>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Box>
  )
}
