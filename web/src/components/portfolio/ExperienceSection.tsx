'use client'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { Job } from '@karimvarela/shared'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { MatrixBunny } from '@/components/ui/MatrixBunny'

const MotionBox = motion(Box)

interface ExperienceSectionProps {
  jobs: Job[]
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}

export function ExperienceSection({ jobs }: ExperienceSectionProps) {
  const visibleJobs = jobs.filter((j) => j.isVisible).sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <Box as="section" id="experience" py={20}>
      <SectionHeading number="02" title="Experience" />

      <Flex direction="column" gap={6}>
        {visibleJobs.length === 0 && (
          <MatrixBunny message="Loading experience..." />
        )}

        {visibleJobs.map((job, index) => (
          <MotionBox
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlowCard>
              <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 6 }}>
                {/* Date range */}
                <Box flexShrink={0} width={{ base: 'auto', md: '140px' }}>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    color="rgba(0,255,65,0.6)"
                    whiteSpace="nowrap"
                    letterSpacing="0.05em"
                  >
                    {formatDate(job.startDate)} — {formatDate(job.endDate)}
                  </Text>
                </Box>

                {/* Content */}
                <Box flex={1}>
                  <Flex align="baseline" gap={2} mb={1} flexWrap="wrap">
                    <Text
                      fontFamily="var(--font-mono), monospace"
                      fontSize="md"
                      fontWeight="bold"
                      color="#ccffcc"
                    >
                      {job.title}
                    </Text>
                    <Text fontFamily="var(--font-mono), monospace" fontSize="md" color="#00ff41">
                      @{' '}
                      {job.companyUrl ? (
                        <chakra.a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="#00ff41"
                          _hover={{ color: '#39ff14', textDecoration: 'underline' }}
                        >
                          {job.company}
                        </chakra.a>
                      ) : (
                        job.company
                      )}
                    </Text>
                  </Flex>

                  {job.location && (
                    <Text
                      fontSize="xs"
                      color="rgba(204,255,204,0.4)"
                      fontFamily="var(--font-mono), monospace"
                      mb={3}
                    >
                      {job.location}
                    </Text>
                  )}

                  {job.description && (
                    <Text fontSize="sm" color="rgba(204,255,204,0.7)" lineHeight={1.7} mb={3}>
                      {job.description}
                    </Text>
                  )}

                  {job.highlights.length > 0 && (
                    <Box mb={4}>
                      {job.highlights.map((highlight, i) => (
                        <Flex key={i} gap={2} mb={1} align="flex-start">
                          <Text color="#00ff41" fontSize="xs" mt={1} flexShrink={0}>
                            ▹
                          </Text>
                          <Text fontSize="sm" color="rgba(204,255,204,0.65)" lineHeight={1.6}>
                            {highlight}
                          </Text>
                        </Flex>
                      ))}
                    </Box>
                  )}
                </Box>
              </Flex>
            </GlowCard>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  )
}
