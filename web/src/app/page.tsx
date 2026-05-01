import type { PortfolioResponse } from '@karimvarela/shared'
import { HomeContent } from './HomeContent'

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
  return <HomeContent jobs={jobs} education={education} skills={skills} />
}
