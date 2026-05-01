'use client'
import { Box, Grid } from '@chakra-ui/react'
import type { Job, Education, Skill } from '@karimvarela/shared'
import { PageLayout } from '@/components/layout/PageLayout'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { EducationSection } from '@/components/portfolio/EducationSection'

interface HomeContentProps {
  jobs: Job[]
  education: Education[]
  skills: Skill[]
}

export function HomeContent({ jobs, education, skills }: HomeContentProps) {
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
          py={{ base: 8, lg: 0 }}
          maxWidth="900px"
        >
          <HeroSection />
          <AboutSection />
          <ExperienceSection jobs={jobs} />
          <SkillsSection skills={skills} />
          <EducationSection education={education} />
          <Footer />
        </Box>
      </Grid>
    </PageLayout>
  )
}
