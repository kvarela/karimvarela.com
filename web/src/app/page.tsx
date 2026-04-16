import { Box, Grid } from '@chakra-ui/react'
import type { PortfolioResponse } from '@karimvarela/shared'
import { PageLayout } from '@/components/layout/PageLayout'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { EducationSection } from '@/components/portfolio/EducationSection'

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

export default async function HomePage() {
  const { jobs, education, skills } = await getPortfolioData()

  return (
    <PageLayout>
      <Grid
        templateColumns={{ base: '1fr', lg: '280px 1fr' }}
        minHeight="100vh"
      >
        {/*
         * SidebarNav contains both the desktop sticky sidebar
         * (display: none on mobile, block on lg+) and the mobile
         * hamburger button (position: fixed, visible on mobile only).
         * A single instance handles both breakpoints.
         */}
        <SidebarNav />

        {/* Main content */}
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
