'use client'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { PostForm } from '@/components/admin/PostForm'

export default function NewPostPage() {
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
          Create
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          New Post
        </Text>
      </Box>

      <PostForm />
    </Box>
  )
}
