'use client'
import { Box, Flex, Text, IconButton, chakra } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants'
import { motion } from 'framer-motion'
import { LinkedInIcon, GitHubIcon, InstagramIcon } from '@/components/ui/Icons'

const MotionBox = motion(Box)

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
        <chakra.a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </chakra.a>
        <chakra.a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="GitHub"
        >
          <GitHubIcon />
        </chakra.a>
        <chakra.a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(204,255,204,0.5)"
          _hover={{ color: '#00ff41' }}
          transition="color 0.2s"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </chakra.a>
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
