'use client'
import { useState } from 'react'
import { Box, Grid, Flex, Text, Button } from '@chakra-ui/react'
import Link from 'next/link'
import { apiClient } from '@/lib/api-client'

interface ActionState {
  loading: boolean
  success: string | null
  error: string | null
}

const initialActionState: ActionState = { loading: false, success: null, error: null }

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <Box
      bg="rgba(10,10,10,0.8)"
      border="1px solid rgba(0,255,65,0.12)"
      borderRadius="lg"
      p={5}
    >
      <Text fontSize="2xl" mb={2}>{icon}</Text>
      <Text
        fontFamily="var(--font-mono), monospace"
        fontSize="2xl"
        fontWeight="bold"
        color="#00ff41"
        mb={1}
      >
        {value}
      </Text>
      <Text
        fontFamily="var(--font-mono), monospace"
        fontSize="xs"
        color="rgba(204,255,204,0.5)"
        textTransform="uppercase"
        letterSpacing="0.1em"
      >
        {label}
      </Text>
    </Box>
  )
}

export default function AdminDashboardPage() {
  const [scrapeBlogs, setScrapeBlogs] = useState<ActionState>(initialActionState)
  const [scrapeResume, setScrapeResume] = useState<ActionState>(initialActionState)

  const handleScrapeBlogs = async () => {
    setScrapeBlogs({ loading: true, success: null, error: null })
    try {
      await apiClient.post('/admin/scrape/blogs')
      setScrapeBlogs({ loading: false, success: 'Blog import triggered successfully!', error: null })
    } catch {
      setScrapeBlogs({ loading: false, success: null, error: 'Failed to trigger blog import.' })
    }
  }

  const handleScrapeResume = async () => {
    setScrapeResume({ loading: true, success: null, error: null })
    try {
      await apiClient.post('/admin/scrape/resume')
      setScrapeResume({ loading: false, success: 'Resume import triggered successfully!', error: null })
    } catch {
      setScrapeResume({ loading: false, success: null, error: 'Failed to trigger resume import.' })
    }
  }

  return (
    <Box p={{ base: 6, md: 10 }}>
      <Box mb={8}>
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="xs"
          color="rgba(0,255,65,0.6)"
          mb={1}
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          Dashboard
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="white">
          Welcome back
        </Text>
      </Box>

      {/* Stats */}
      <Grid templateColumns={{ base: '1fr 1fr', md: 'repeat(4, 1fr)' }} gap={4} mb={10}>
        <StatCard label="Total Posts" value="—" icon="📝" />
        <StatCard label="Published" value="—" icon="✅" />
        <StatCard label="Drafts" value="—" icon="📋" />
        <StatCard label="Views" value="—" icon="👁" />
      </Grid>

      {/* Quick Actions */}
      <Box mb={8}>
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="xs"
          color="rgba(0,255,65,0.6)"
          mb={4}
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          Quick Actions
        </Text>

        <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {/* New Post */}
          <Box
            bg="rgba(10,10,10,0.8)"
            border="1px solid rgba(0,255,65,0.15)"
            borderRadius="lg"
            p={5}
          >
            <Text fontFamily="var(--font-mono), monospace" fontSize="md" fontWeight="bold" color="#ccffcc" mb={2}>
              New Post
            </Text>
            <Text fontSize="sm" color="rgba(204,255,204,0.5)" mb={4}>
              Create a new blog post with the markdown editor.
            </Text>
            <Link href="/admin/posts/new" style={{ textDecoration: 'none' }}>
              <Button
                size="sm"
                bg="#00ff41"
                color="#0a0a0a"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                fontWeight="bold"
                _hover={{ bg: '#39ff14', boxShadow: '0 0 15px rgba(0,255,65,0.4)' }}
              >
                Create Post →
              </Button>
            </Link>
          </Box>

          {/* Import Blogs */}
          <Box
            bg="rgba(10,10,10,0.8)"
            border="1px solid rgba(0,255,65,0.15)"
            borderRadius="lg"
            p={5}
          >
            <Text fontFamily="var(--font-mono), monospace" fontSize="md" fontWeight="bold" color="#ccffcc" mb={2}>
              Import from Medium
            </Text>
            <Text fontSize="sm" color="rgba(204,255,204,0.5)" mb={4}>
              Scrape and import posts from Medium/karimvarela.com.
            </Text>
            {scrapeBlogs.success && (
              <Text fontSize="xs" color="#00ff41" mb={2} fontFamily="var(--font-mono), monospace">
                {scrapeBlogs.success}
              </Text>
            )}
            {scrapeBlogs.error && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" mb={2} fontFamily="var(--font-mono), monospace">
                {scrapeBlogs.error}
              </Text>
            )}
            <Button
              size="sm"
              variant="outline"
              borderColor="rgba(0,255,65,0.4)"
              color="#00ff41"
              fontFamily="var(--font-mono), monospace"
              fontSize="xs"
              loading={scrapeBlogs.loading}
              loadingText="Importing..."
              _hover={{ bg: 'rgba(0,255,65,0.1)' }}
              onClick={handleScrapeBlogs}
            >
              Run Import
            </Button>
          </Box>

          {/* Reimport Resume */}
          <Box
            bg="rgba(10,10,10,0.8)"
            border="1px solid rgba(0,255,65,0.15)"
            borderRadius="lg"
            p={5}
          >
            <Text fontFamily="var(--font-mono), monospace" fontSize="md" fontWeight="bold" color="#ccffcc" mb={2}>
              Re-import Resume
            </Text>
            <Text fontSize="sm" color="rgba(204,255,204,0.5)" mb={4}>
              Scrape LinkedIn and update experience/skills data.
            </Text>
            {scrapeResume.success && (
              <Text fontSize="xs" color="#00ff41" mb={2} fontFamily="var(--font-mono), monospace">
                {scrapeResume.success}
              </Text>
            )}
            {scrapeResume.error && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" mb={2} fontFamily="var(--font-mono), monospace">
                {scrapeResume.error}
              </Text>
            )}
            <Button
              size="sm"
              variant="outline"
              borderColor="rgba(0,255,65,0.4)"
              color="#00ff41"
              fontFamily="var(--font-mono), monospace"
              fontSize="xs"
              loading={scrapeResume.loading}
              loadingText="Importing..."
              _hover={{ bg: 'rgba(0,255,65,0.1)' }}
              onClick={handleScrapeResume}
            >
              Run Import
            </Button>
          </Box>
        </Grid>
      </Box>

      {/* Recent Posts shortcut */}
      <Flex justify="flex-end">
        <Link href="/admin/posts" style={{ textDecoration: 'none' }}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="sm"
            color="#00ff41"
            _hover={{ color: '#39ff14' }}
            transition="color 0.2s"
          >
            View all posts →
          </Text>
        </Link>
      </Flex>
    </Box>
  )
}
