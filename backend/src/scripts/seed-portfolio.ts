import 'reflect-metadata'
import { AppDataSource } from '../data-source'
import { Job } from '../entities/job.entity'
import { Education } from '../entities/education.entity'
import { Skill, SkillCategory } from '../entities/skill.entity'

const JOB_DATA: Partial<Job>[] = [
  {
    company: 'Space Runners / Ablo.ai',
    title: 'CTO & Director of Security',
    description: 'Led distributed engineering team building AI-powered fashion design platform.',
    highlights: [
      'Led distributed team across web, backend, ML, and technical roles',
      'Architected and built custom AI image generation pipelines trained and fine-tuned on fashion styles',
      'Reduced AWS costs by 90% while expanding product scope',
      'Launched B2B API within 3 months',
      'Developed SaaS platform for external developers',
    ],
    location: 'Remote',
    startDate: '2023-01-01',
    endDate: '2026-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 1,
    isVisible: true,
  },
  {
    company: 'The Guide App',
    title: 'Fractional CTO & AI Consultant',
    description: 'Architected and launched product infrastructure, integrating AI and hiring engineering teams.',
    highlights: [
      'Architected initial backend and mobile applications to get product launched',
      'Hired team for minimum viable product development',
      'Implemented agile processes for predictable delivery',
      'Built authentication systems with Okta integration',
      'Trained AI chatbot for community forums',
    ],
    location: 'Remote',
    startDate: '2022-01-01',
    endDate: null,
    logoUrl: null,
    companyUrl: null,
    sortOrder: 2,
    isVisible: true,
  },
  {
    company: 'MetaLink Labs',
    title: 'Vice President, Engineering',
    description: 'Built and scaled engineering team for Web3 and NFT data infrastructure.',
    highlights: [
      'Architected and built real-time NFT floor price ingestor into time-series DB',
      'Halved team size while doubling productivity through agile practices',
      'Cut infrastructure costs by 50%',
      'Launched mobile app within 3 months',
      'Recruited and mentored distributed engineering team',
    ],
    location: 'Remote',
    startDate: '2022-01-01',
    endDate: '2023-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 3,
    isVisible: true,
  },
  {
    company: 'Reddit',
    title: 'Director of Engineering',
    description: 'Led large engineering organization through structural transformation.',
    highlights: [
      'Recruited and managed 50+ person engineering team',
      'Led engineering managers and functional leads',
      'Transitioned org from functional team reporting to feature team reporting (matrix)',
    ],
    location: 'San Francisco, CA',
    startDate: '2021-01-01',
    endDate: '2021-12-31',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 4,
    isVisible: true,
  },
  {
    company: 'Fan.ai',
    title: 'Chief Technology Officer & Chief Infosec Officer',
    description: 'Built big data pipelines and scaled engineering for gaming analytics platform.',
    highlights: [
      'Doubled productivity through agile transformation',
      'Scaled organization from 6 to 12 engineers',
      'Architected big data pipelines in Google Cloud for Twitch, Twitter, and demographics data',
      'Enforced data security and GDPR compliance',
    ],
    location: 'Los Angeles, CA',
    startDate: '2019-01-01',
    endDate: '2021-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 5,
    isVisible: true,
  },
  {
    company: 'Safara.Travel',
    title: 'Chief Technology Officer & Co-Founder',
    description: 'Co-founded and built travel agency platform with modern serverless architecture.',
    highlights: [
      'Built travel agency platform in 4 months',
      'Architected and built modern GraphQL, serverless Node.js backend in AWS',
      'Recruited and mentored global engineering team',
    ],
    location: 'San Francisco, CA',
    startDate: '2018-01-01',
    endDate: '2019-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 6,
    isVisible: true,
  },
  {
    company: 'Coffee Meets Bagel',
    title: 'Chief Technology Officer',
    description: 'Led technology organization for top dating platform, scaling team and modernizing architecture.',
    highlights: [
      'Released CMB Android application within 3 months',
      'Led data science team on recommendation algorithms',
      'Transitioned monolithic Python app to microservices',
      'Scaled platform from 10 to 25 engineers',
    ],
    location: 'San Francisco, CA',
    startDate: '2014-01-01',
    endDate: '2017-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 7,
    isVisible: true,
  },
  {
    company: 'Tinder',
    title: 'Director of Engineering',
    description: 'Led engineering to build and launch Tinder Android at massive scale.',
    highlights: [
      'Led Android engineers, designers, and QA',
      'Led cross-functional team to build and release the Tinder Android application in 3 months',
      'Scaled platform from tens of thousands to tens of millions of users',
      'Won Crunchie for Best New Startup of 2013',
    ],
    location: 'West Hollywood, CA',
    startDate: '2013-01-01',
    endDate: '2014-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 8,
    isVisible: true,
  },
  {
    company: 'Beachbody',
    title: 'Lead Android Architect',
    description: null,
    highlights: [],
    location: 'Santa Monica, CA',
    startDate: '2012-01-01',
    endDate: '2013-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 9,
    isVisible: true,
  },
  {
    company: 'AT&T / Muve Music',
    title: 'Mobile Support Lead & Android Developer',
    description: null,
    highlights: [],
    location: null,
    startDate: '2010-01-01',
    endDate: '2012-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 10,
    isVisible: true,
  },
  {
    company: 'HandsOn Mobile',
    title: 'Lead Software Engineer',
    description: null,
    highlights: [],
    location: null,
    startDate: '2008-01-01',
    endDate: '2010-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 11,
    isVisible: true,
  },
  {
    company: 'Fandango',
    title: 'Senior Developer',
    description: null,
    highlights: [],
    location: 'Beverly Hills, CA',
    startDate: '2006-01-01',
    endDate: '2008-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 12,
    isVisible: true,
  },
  {
    company: 'Infospace',
    title: 'Software Engineer',
    description: null,
    highlights: [],
    location: null,
    startDate: '2004-01-01',
    endDate: '2006-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 13,
    isVisible: true,
  },
  {
    company: 'Electronic Arts',
    title: 'Language Integration Technician',
    description: null,
    highlights: [],
    location: null,
    startDate: '2002-01-01',
    endDate: '2004-01-01',
    logoUrl: null,
    companyUrl: null,
    sortOrder: 14,
    isVisible: true,
  },
]

const EDUCATION_DATA: Partial<Education>[] = [
  {
    institution: 'University of Florida',
    degree: 'Master of Business Administration',
    field: 'Business Administration',
    startDate: null,
    endDate: null,
    logoUrl: null,
    description: null,
    sortOrder: 1,
  },
  {
    institution: 'University of California',
    degree: "Bachelor of Science",
    field: 'Computer Science',
    startDate: null,
    endDate: null,
    logoUrl: null,
    description: 'Honors graduate. 4-year Division I NCAA swimmer.',
    sortOrder: 2,
  },
]

const SKILL_DATA: Partial<Skill>[] = [
  // Leadership & Management
  { name: 'Coaching & Mentoring', category: SkillCategory.OTHER, proficiencyLevel: 95, sortOrder: 1 },
  { name: 'Lean & Agile Methodologies', category: SkillCategory.OTHER, proficiencyLevel: 95, sortOrder: 2 },
  { name: 'Engineering Operations', category: SkillCategory.OTHER, proficiencyLevel: 90, sortOrder: 3 },
  { name: 'Product Management', category: SkillCategory.OTHER, proficiencyLevel: 90, sortOrder: 4 },
  { name: 'Cost Control & Budgeting', category: SkillCategory.OTHER, proficiencyLevel: 85, sortOrder: 5 },
  { name: 'Competitive Analysis', category: SkillCategory.OTHER, proficiencyLevel: 85, sortOrder: 6 },

  // DevOps & Infrastructure
  { name: 'Cloud Architecture (AWS, GCP)', category: SkillCategory.DEVOPS, proficiencyLevel: 90, sortOrder: 1 },
  { name: 'System Monitoring & Operations', category: SkillCategory.DEVOPS, proficiencyLevel: 85, sortOrder: 2 },

  // Databases
  { name: 'NoSQL Databases', category: SkillCategory.DATABASES, proficiencyLevel: 85, sortOrder: 1 },
  { name: 'Relational Databases (SQL)', category: SkillCategory.DATABASES, proficiencyLevel: 85, sortOrder: 2 },
  { name: 'Time-Series Databases', category: SkillCategory.DATABASES, proficiencyLevel: 80, sortOrder: 3 },

  // Frameworks & Architecture
  { name: 'Microservices / SOA', category: SkillCategory.FRAMEWORKS, proficiencyLevel: 90, sortOrder: 1 },
  { name: 'GraphQL', category: SkillCategory.FRAMEWORKS, proficiencyLevel: 85, sortOrder: 2 },
  { name: 'Mobile & Web Development', category: SkillCategory.FRAMEWORKS, proficiencyLevel: 90, sortOrder: 3 },
  { name: 'Serverless Architecture', category: SkillCategory.FRAMEWORKS, proficiencyLevel: 85, sortOrder: 4 },

  // Tools & Platforms
  { name: 'AI / ML / Data Science', category: SkillCategory.TOOLS, proficiencyLevel: 85, sortOrder: 1 },
  { name: 'Big Data / ETL', category: SkillCategory.TOOLS, proficiencyLevel: 85, sortOrder: 2 },
  { name: 'Blockchain / Web3 / NFTs', category: SkillCategory.TOOLS, proficiencyLevel: 80, sortOrder: 3 },
  { name: 'Data Security & Privacy', category: SkillCategory.TOOLS, proficiencyLevel: 85, sortOrder: 4 },
]

async function seed(): Promise<void> {
  console.log('[seed-portfolio] Initializing data source...')
  await AppDataSource.initialize()

  const jobRepo = AppDataSource.getRepository(Job)
  const educationRepo = AppDataSource.getRepository(Education)
  const skillRepo = AppDataSource.getRepository(Skill)

  console.log('[seed-portfolio] Clearing existing data...')
  await jobRepo.clear()
  await educationRepo.clear()
  await skillRepo.clear()

  console.log('[seed-portfolio] Seeding jobs...')
  await jobRepo.save(JOB_DATA.map((j) => jobRepo.create(j)))

  console.log('[seed-portfolio] Seeding education...')
  await educationRepo.save(EDUCATION_DATA.map((e) => educationRepo.create(e)))

  console.log('[seed-portfolio] Seeding skills...')
  await skillRepo.save(SKILL_DATA.map((s) => skillRepo.create(s)))

  console.log('[seed-portfolio] Done.')
  await AppDataSource.destroy()
}

void seed().catch((err) => {
  console.error('[seed-portfolio] Fatal error:', err)
  process.exit(1)
})
