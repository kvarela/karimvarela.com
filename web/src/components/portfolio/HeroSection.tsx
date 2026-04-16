'use client'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS, EMAIL } from '@/lib/constants'
import { LinkedInIcon, GitHubIcon, InstagramIcon } from '@/components/ui/Icons'

const MotionBox = motion(Box)

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
              href={`mailto:${EMAIL}`}
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
