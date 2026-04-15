'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Posts', href: '/admin/posts' },
  { label: 'New Post', href: '/admin/posts/new' },
]

function AdminSidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname()

  return (
    <Box
      as="aside"
      width="240px"
      minHeight="100vh"
      flexShrink={0}
      style={{
        background: '#0d0d0d',
        borderRight: '1px solid rgba(0,255,65,0.12)',
      }}
      py={8}
      px={4}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Box mb={8} px={2}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="sm"
            fontWeight="bold"
            color="#00ff41"
            mb={1}
          >
            Admin
          </Text>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="xs"
            color="rgba(204,255,204,0.4)"
          >
            karimvarela.com
          </Text>
        </Box>

        <nav>
          <Flex direction="column" gap={1}>
            {ADMIN_NAV.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Box
                    px={3}
                    py={2}
                    borderRadius="md"
                    fontSize="sm"
                    fontFamily="var(--font-mono), monospace"
                    color={isActive ? '#00ff41' : 'rgba(204,255,204,0.6)'}
                    bg={isActive ? 'rgba(0,255,65,0.08)' : 'transparent'}
                    _hover={{ bg: 'rgba(0,255,65,0.06)', color: '#ccffcc' }}
                    transition="all 0.2s"
                  >
                    {item.label}
                  </Box>
                </Link>
              )
            })}
          </Flex>
        </nav>
      </Box>

      <Box px={2}>
        <Box
          height="1px"
          mb={4}
          bg="rgba(0,255,65,0.1)"
        />
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="xs"
            color="rgba(204,255,204,0.4)"
            _hover={{ color: '#00ff41' }}
            transition="color 0.2s"
            mb={2}
            display="block"
          >
            ← View Site
          </Text>
        </Link>
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="xs"
          color="rgba(255,80,80,0.6)"
          cursor="pointer"
          _hover={{ color: 'rgba(255,80,80,1)' }}
          transition="color 0.2s"
          onClick={onLogout}
        >
          Logout
        </Text>
      </Box>
    </Box>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [mounted, isAuthenticated, pathname, router])

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  // Always render the login page directly
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Show nothing until mounted (avoids hydration mismatch)
  if (!mounted) {
    return (
      <Box minHeight="100vh" style={{ background: '#0a0a0a' }} display="flex" alignItems="center" justifyContent="center">
        <Text fontFamily="var(--font-mono), monospace" fontSize="sm" color="rgba(0,255,65,0.5)">
          Loading...
        </Text>
      </Box>
    )
  }

  // Not authenticated — redirect will happen via useEffect
  if (!isAuthenticated) {
    return null
  }

  return (
    <Flex minHeight="100vh" style={{ background: '#0a0a0a' }}>
      <AdminSidebar onLogout={handleLogout} />
      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Flex>
  )
}
