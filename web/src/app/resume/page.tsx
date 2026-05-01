import type { PortfolioResponse } from '@karimvarela/shared'
import { ResumeContent } from './ResumeContent'

export const metadata = {
  title: 'Resume — Karim Varela',
  description: 'Professional experience, skills, and education of Karim Varela, Software Engineer & Entrepreneur.',
}

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

export default async function ResumePage() {
  const { jobs, education, skills } = await getPortfolioData()
  return <ResumeContent jobs={jobs} education={education} skills={skills} />
}
