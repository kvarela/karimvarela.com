'use client'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/constants'

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

export function HeroSection() {
  return (
    <Box as="section" id="hero" minHeight="100vh" display="flex" alignItems="center" py={20}>
      <Box maxWidth="700px">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="sm"
            color="#00ff41"
            mb={4}
            letterSpacing="0.1em"
          >
            Hi, I&apos;m
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Text
            as="h1"
            fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
            fontWeight="bold"
            color="white"
            lineHeight={1.1}
            mb={2}
            fontFamily="var(--font-sans), Inter, sans-serif"
          >
            Karim Varela
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Text
            fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
            color="rgba(204,255,204,0.7)"
            mb={6}
            fontWeight="medium"
            lineHeight={1.4}
          >
            Software Engineer &amp; Entrepreneur building things at the intersection of code and
            community in Venice, CA
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Text
            fontSize="md"
            color="rgba(204,255,204,0.5)"
            mb={8}
            maxWidth="560px"
            lineHeight={1.7}
          >
            I build elegant, scalable software and love the craft of clean architecture. When
            I&apos;m not shipping code, you&apos;ll find me in the water at Sunset or on the mats
            at a local gym.
          </Text>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Flex gap={4} mb={8} flexWrap="wrap">
            <chakra.a
              href="/resume"
              display="inline-flex"
              alignItems="center"
              px={6}
              py={2}
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              color="#00ff41"
              border="1px solid #00ff41"
              borderRadius="md"
              letterSpacing="0.05em"
              transition="all 0.2s"
              _hover={{ bg: 'rgba(0,255,65,0.1)', boxShadow: '0 0 20px rgba(0,255,65,0.3)' }}
            >
              View Resume
            </chakra.a>
            <chakra.a
              href="mailto:karim@karimvarela.com"
              display="inline-flex"
              alignItems="center"
              px={6}
              py={2}
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              bg="#00ff41"
              color="#0a0a0a"
              fontWeight="bold"
              borderRadius="md"
              letterSpacing="0.05em"
              transition="all 0.2s"
              _hover={{ bg: '#39ff14', boxShadow: '0 0 20px rgba(0,255,65,0.4)' }}
            >
              Contact
            </chakra.a>
          </Flex>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Flex gap={5}>
            <chakra.a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              color="rgba(204,255,204,0.4)"
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
              color="rgba(204,255,204,0.4)"
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
              color="rgba(204,255,204,0.4)"
              _hover={{ color: '#00ff41' }}
              transition="color 0.2s"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </chakra.a>
          </Flex>
        </MotionBox>
      </Box>
    </Box>
  )
}
