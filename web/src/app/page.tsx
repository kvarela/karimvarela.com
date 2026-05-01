import { Suspense } from 'react'
import type { PortfolioResponse } from '@karimvarela/shared'
import { HomeContent } from './HomeContent'
import { ExperienceSection } from '@/components/portfolio/ExperienceSection'
import { SkillsSection } from '@/components/portfolio/SkillsSection'
import { EducationSection } from '@/components/portfolio/EducationSection'
import { MatrixBunny } from '@/components/ui/MatrixBunny'

async function getPortfolioData(): Promise<PortfolioResponse> {
  const apiUrl = process.env.API_URL || 'http://localhost:4000'
  const res = await fetch(`${apiUrl}/api/portfolio`, { next: { revalidate: 3600 } })
  if (!res.ok) throw new Error('Failed to fetch portfolio data')
  return res.json() as Promise<PortfolioResponse>
}

async function ExperienceLoader() {
  const { jobs } = await getPortfolioData()
  return <ExperienceSection jobs={jobs} />
}

async function SkillsLoader() {
  const { skills } = await getPortfolioData()
  return <SkillsSection skills={skills} />
}

async function EducationLoader() {
  const { education } = await getPortfolioData()
  return <EducationSection education={education} />
}

export default function HomePage() {
  return (
    <HomeContent>
      <Suspense fallback={<MatrixBunny message="Loading experience..." />}>
        <ExperienceLoader />
      </Suspense>
      <Suspense fallback={<MatrixBunny message="Loading skills..." />}>
        <SkillsLoader />
      </Suspense>
      <Suspense fallback={<MatrixBunny message="Loading education..." />}>
        <EducationLoader />
      </Suspense>
    </HomeContent>
  )
}
