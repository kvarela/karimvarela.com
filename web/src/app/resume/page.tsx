import { Box, Flex, Grid, Text, chakra } from '@chakra-ui/react'
import type { PortfolioResponse } from '@karimvarela/shared'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { Footer } from '@/components/layout/Footer'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { EducationSection } from '@/components/portfolio/EducationSection'
import { SOCIAL_LINKS } from '@/lib/constants'

async function getPortfolioData(): Promise<PortfolioResponse> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/api/portfolio`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch portfolio')
    return res.json() as Promise<PortfolioResponse>
  } catch {
    return { jobs: [], education: [], skills: [] }
  }
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export const metadata = {
  title: 'Resume — Karim Varela',
  description: 'Professional experience, skills, and education of Karim Varela, Software Engineer & Entrepreneur.',
}

export default async function ResumePage() {
  const { jobs, education, skills } = await getPortfolioData()

  return (
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />

      <Box position="relative" zIndex={1}>
        <Grid
          templateColumns={{ base: '1fr', lg: '280px 1fr' }}
          minHeight="100vh"
        >
          <SidebarNav />

          <Box
            as="main"
            px={{ base: 6, md: 10, lg: 16 }}
            py={{ base: 8, lg: 16 }}
            maxWidth="900px"
          >
            {/* Resume header */}
            <Box as="section" id="resume-header" py={16} borderBottom="1px solid rgba(0,255,65,0.1)" mb={4}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                color="#00ff41"
                letterSpacing="0.15em"
                textTransform="uppercase"
                mb={3}
              >
                Resume
              </Text>

              <Text
                as="h1"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="bold"
                color="white"
                lineHeight={1.1}
                mb={2}
                fontFamily="var(--font-sans), Inter, sans-serif"
              >
                Karim Varela
              </Text>

              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="rgba(204,255,204,0.7)"
                mb={6}
                fontWeight="medium"
              >
                Software Engineer &amp; Entrepreneur
              </Text>

              <Flex gap={6} flexWrap="wrap" mb={6} align="center">
                <chakra.a
                  href="mailto:karim@karimvarela.com"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  color="rgba(204,255,204,0.6)"
                  _hover={{ color: '#00ff41' }}
                  transition="color 0.2s"
                >
                  karim@karimvarela.com
                </chakra.a>

                <Text
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  color="rgba(204,255,204,0.4)"
                >
                  Venice, CA
                </Text>

                <chakra.a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  color="rgba(204,255,204,0.6)"
                  _hover={{ color: '#00ff41' }}
                  transition="color 0.2s"
                >
                  <LinkedInIcon />
                  linkedin.com/in/karimvarela
                </chakra.a>

                <chakra.a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  color="rgba(204,255,204,0.6)"
                  _hover={{ color: '#00ff41' }}
                  transition="color 0.2s"
                >
                  <GitHubIcon />
                  github.com/kvarela
                </chakra.a>
              </Flex>

              <chakra.a
                href="https://docs.google.com/document/d/1jV6xFhvbxmpQYsl_ara-9Yr-5XhnBLruDCnbjoYRo0E"
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                px={5}
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
                Download PDF ↗
              </chakra.a>
            </Box>

            <ExperienceSection jobs={jobs} />
            <SkillsSection skills={skills} />
            <EducationSection education={education} />
            <Footer />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
