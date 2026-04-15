'use client'
import { Box, Flex, Text, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

const sectionIds = NAV_ITEMS.filter((item) => item.href.startsWith('#')).map((item) =>
  item.href.slice(1),
)

function NavContent({
  activeSection,
  onClose,
}: {
  activeSection: string
  onClose?: () => void
}) {
  return (
    <Flex direction="column" height="100%" justify="space-between" py={8} px={6}>
      <Box>
        {/* Name & tagline */}
        <Box mb={10}>
          <Link href="/" onClick={onClose}>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="xl"
              fontWeight="bold"
              color="#00ff41"
              mb={1}
              style={{ textDecoration: 'none' }}
            >
              Karim Varela
            </Text>
          </Link>
          <Text fontSize="xs" color="rgba(204,255,204,0.5)" fontFamily="var(--font-mono), monospace">
            Software Engineer & Entrepreneur
          </Text>
        </Box>

        {/* Nav items */}
        <nav>
          <Flex direction="column" gap={1}>
            {NAV_ITEMS.map((item) => {
              const isAnchor = item.href.startsWith('#')
              const sectionId = isAnchor ? item.href.slice(1) : ''
              const isActive = isAnchor && activeSection === sectionId

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  style={{ textDecoration: 'none' }}
                >
                  <Flex
                    align="center"
                    gap={3}
                    px={3}
                    py={2}
                    borderRadius="md"
                    transition="all 0.2s"
                    style={{
                      background: isActive ? 'rgba(0,255,65,0.07)' : 'transparent',
                    }}
                    _hover={{ background: 'rgba(0,255,65,0.07)' }}
                  >
                    {/* Active indicator */}
                    <MotionBox
                      height="2px"
                      borderRadius="full"
                      bg="#00ff41"
                      animate={{ width: isActive ? '24px' : '8px', opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.2 }}
                      style={{ flexShrink: 0 }}
                    />
                    <Text
                      fontFamily="var(--font-mono), monospace"
                      fontSize="sm"
                      color={isActive ? '#00ff41' : 'rgba(204,255,204,0.6)'}
                      fontWeight={isActive ? 'semibold' : 'normal'}
                      transition="color 0.2s"
                      letterSpacing="0.08em"
                      textTransform="uppercase"
                    >
                      {item.label}
                    </Text>
                  </Flex>
                </Link>
              )
            })}
          </Flex>
        </nav>
      </Box>

      {/* Social links */}
      <Flex gap={4} mt={8}>
        <Box
          as="a"
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </Box>
        <Box
          as="a"
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </Box>
        <Box
          as="a"
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </Box>
      </Flex>
    </Flex>
  )
}

export function SidebarNav() {
  const activeSection = useActiveSection(sectionIds)
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <Box
        as="aside"
        position="sticky"
        top={0}
        height="100vh"
        width="100%"
        overflowY="auto"
        display={{ base: 'none', lg: 'block' }}
        style={{
          borderRight: '1px solid rgba(0,255,65,0.08)',
        }}
      >
        <NavContent activeSection={activeSection} />
      </Box>

      {/* Mobile hamburger button */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        position="fixed"
        top={4}
        right={4}
        zIndex={1000}
      >
        <IconButton
          aria-label="Open navigation"
          onClick={() => setDrawerOpen(true)}
          variant="ghost"
          color="#00ff41"
          _hover={{ bg: 'rgba(0,255,65,0.1)' }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={2000}
          style={{ display: 'flex' }}
        >
          {/* Backdrop */}
          <Box
            position="absolute"
            inset={0}
            bg="rgba(0,0,0,0.7)"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <Box
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            width="280px"
            style={{
              background: '#0d0d0d',
              borderRight: '1px solid rgba(0,255,65,0.2)',
              zIndex: 1,
            }}
          >
            <Box position="absolute" top={4} right={4}>
              <IconButton
                aria-label="Close navigation"
                onClick={() => setDrawerOpen(false)}
                variant="ghost"
                color="#00ff41"
                _hover={{ bg: 'rgba(0,255,65,0.1)' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <NavContent activeSection={activeSection} onClose={() => setDrawerOpen(false)} />
          </Box>
        </Box>
      )}
    </>
  )
}
