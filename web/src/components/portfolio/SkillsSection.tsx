'use client'
import { Box, Grid, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { Skill, SkillCategory } from '@karimvarela/shared'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { MatrixBunny } from '@/components/ui/MatrixBunny'

const MotionBox = motion(Box)

interface SkillsSectionProps {
  skills: Skill[]
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  languages: 'Languages',
  frameworks: 'Frameworks & Libraries',
  databases: 'Databases',
  devops: 'DevOps & Infrastructure',
  tools: 'Tools & Platforms',
  other: 'Other',
}

const CATEGORY_ORDER: SkillCategory[] = [
  'languages',
  'frameworks',
  'databases',
  'devops',
  'tools',
  'other',
]

export function SkillsSection({ skills }: SkillsSectionProps) {
  const visibleSkills = skills.filter((s) => s.isVisible)

  const grouped = CATEGORY_ORDER.reduce<Record<SkillCategory, Skill[]>>(
    (acc, cat) => {
      acc[cat] = visibleSkills
        .filter((s) => s.category === cat)
        .sort((a, b) => a.sortOrder - b.sortOrder)
      return acc
    },
    {} as Record<SkillCategory, Skill[]>,
  )

  const nonEmptyCategories = CATEGORY_ORDER.filter((cat) => grouped[cat].length > 0)

  return (
    <Box as="section" id="skills" py={20}>
      <SectionHeading number="03" title="Skills" />

      {nonEmptyCategories.length === 0 ? (
        <MatrixBunny message="Loading skills..." />
      ) : (
        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={8}>
          {nonEmptyCategories.map((category, index) => (
            <MotionBox
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              bg="rgba(10,10,10,0.6)"
              border="1px solid rgba(0,255,65,0.1)"
              borderRadius="lg"
              p={5}
            >
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                color="rgba(0,255,65,0.7)"
                mb={4}
                letterSpacing="0.12em"
                textTransform="uppercase"
              >
                {CATEGORY_LABELS[category]}
              </Text>

              <Box display="flex" flexWrap="wrap" gap={2}>
                {grouped[category].map((skill) => (
                  <NeonBadge key={skill.id}>{skill.name}</NeonBadge>
                ))}
              </Box>
            </MotionBox>
          ))}
        </Grid>
      )}
    </Box>
  )
}
