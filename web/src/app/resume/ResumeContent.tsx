'use client'
import { Box, Flex, Grid, Text, chakra } from '@chakra-ui/react'
import type { Job, Education, Skill } from '@karimvarela/shared'
import { PageLayout } from '@/components/layout/PageLayout'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { Footer } from '@/components/layout/Footer'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { EducationSection } from '@/components/portfolio/EducationSection'
import { LinkedInIcon, GitHubIcon } from '@/components/ui/Icons'
import { SOCIAL_LINKS, EMAIL, RESUME_PDF_URL } from '@/lib/constants'

interface ResumeContentProps {
  jobs: Job[]
  education: Education[]
  skills: Skill[]
}

export function ResumeContent({ jobs, education, skills }: ResumeContentProps) {
  return (
    <PageLayout>
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
                href={`mailto:${EMAIL}`}
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(204,255,204,0.6)"
                _hover={{ color: '#00ff41' }}
                transition="color 0.2s"
              >
                {EMAIL}
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
                <LinkedInIcon size={16} />
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
                <GitHubIcon size={16} />
                github.com/kvarela
              </chakra.a>
            </Flex>

            <chakra.a
              href={RESUME_PDF_URL}
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
    </PageLayout>
  )
}
