'use client'
import { Box, Grid } from '@chakra-ui/react'
import { PageLayout } from '@/components/layout/PageLayout'
import { SidebarNav } from '@/components/layout/SidebarNav'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/portfolio/HeroSection'
import { AboutSection } from '@/components/portfolio/AboutSection'

interface HomeContentProps {
  children: React.ReactNode
}

export function HomeContent({ children }: HomeContentProps) {
  return (
    <PageLayout>
      <Grid templateColumns={{ base: '1fr', lg: '280px 1fr' }} minHeight="100vh">
        <SidebarNav />
        <Box
          as="main"
          px={{ base: 6, md: 10, lg: 16 }}
          py={{ base: 8, lg: 0 }}
          maxWidth="900px"
        >
          <HeroSection />
          <AboutSection />
          {children}
          <Footer />
        </Box>
      </Grid>
    </PageLayout>
  )
}
