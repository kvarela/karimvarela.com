'use client'
import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { Education } from '@karimvarela/shared'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'

const MotionBox = motion(Box)

interface EducationSectionProps {
  education: Education[]
}

function formatYear(dateStr: string | null): string {
  if (!dateStr) return 'Present'
  return new Date(dateStr).getFullYear().toString()
}

export function EducationSection({ education }: EducationSectionProps) {
  const sorted = [...education].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <Box as="section" id="education" py={20}>
      <SectionHeading number="04" title="Education" />

      <Flex direction="column" gap={4}>
        {sorted.length === 0 && (
          <Text color="rgba(204,255,204,0.4)" fontFamily="var(--font-mono), monospace" fontSize="sm">
            Loading education...
          </Text>
        )}

        {sorted.map((edu, index) => (
          <MotionBox
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlowCard>
              <Flex direction={{ base: 'column', sm: 'row' }} justify="space-between" gap={3}>
                <Box>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="md"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={1}
                  >
                    {edu.institution}
                  </Text>

                  <Text fontSize="sm" color="#00ff41" mb={1}>
                    {edu.degree}
                    {edu.field ? ` — ${edu.field}` : ''}
                  </Text>

                  {edu.description && (
                    <Text fontSize="sm" color="rgba(204,255,204,0.6)" lineHeight={1.6} mt={2}>
                      {edu.description}
                    </Text>
                  )}
                </Box>

                <Box flexShrink={0} textAlign={{ base: 'left', sm: 'right' }}>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    color="rgba(0,255,65,0.6)"
                    whiteSpace="nowrap"
                  >
                    {formatYear(edu.startDate)} — {formatYear(edu.endDate)}
                  </Text>
                </Box>
              </Flex>
            </GlowCard>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  )
}
