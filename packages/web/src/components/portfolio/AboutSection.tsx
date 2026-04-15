'use client'
import { Box, Grid, Text, chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const MotionBox = motion(Box)

export function AboutSection() {
  return (
    <Box as="section" id="about" py={20}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <SectionHeading number="01" title="About Me" />

        <Grid templateColumns={{ base: '1fr', md: '3fr 2fr' }} gap={12} alignItems="start">
          {/* Bio text */}
          <Box>
            <Text
              color="rgba(204,255,204,0.75)"
              lineHeight={1.8}
              mb={4}
              fontSize="md"
            >
              I&apos;m a software engineer and entrepreneur based in{' '}
              <Box as="span" color="#00ff41">Venice, California</Box>. I love building
              products that genuinely improve people&apos;s lives — clean code, thoughtful
              architecture, and delightful user experiences are what I care about most.
            </Text>

            <Text
              color="rgba(204,255,204,0.75)"
              lineHeight={1.8}
              mb={4}
              fontSize="md"
            >
              Over the years I&apos;ve worked across the full stack — from distributed backend
              services to polished React frontends — and I&apos;ve led engineering teams at
              startups and growth-stage companies alike. I have a particular fondness for
              TypeScript, NestJS, and anything that makes developer experience genuinely better.
            </Text>

            <Text
              color="rgba(204,255,204,0.75)"
              lineHeight={1.8}
              mb={6}
              fontSize="md"
            >
              Outside of work you&apos;ll find me surfing at{' '}
              <Box as="span" color="#00ff41">Sunset Beach</Box>, training MMA at a local
              gym, or exploring what makes the Venice community so special. I also run{' '}
              <chakra.a
                href="/personal/moto-venice"
                color="#00ff41"
                _hover={{ color: '#39ff14' }}
              >
                Moto Venice
              </chakra.a>
              , a motorcycle rental experience right here in the neighborhood.
            </Text>

            <Box>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                mb={3}
              >
                Technologies I&apos;ve been working with:
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={1}>
                {[
                  'TypeScript',
                  'Node.js / NestJS',
                  'React / Next.js',
                  'PostgreSQL',
                  'Redis',
                  'Docker / K8s',
                ].map((tech) => (
                  <Text
                    key={tech}
                    fontFamily="var(--font-mono), monospace"
                    fontSize="sm"
                    color="rgba(204,255,204,0.6)"
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Box as="span" color="#00ff41" mr={2}>▹</Box>
                    {tech}
                  </Text>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Photo placeholder */}
          <Box>
            <Box
              position="relative"
              display="inline-block"
              width="100%"
            >
              {/* Photo frame with glow */}
              <Box
                width="100%"
                paddingBottom="100%"
                position="relative"
                borderRadius="lg"
                overflow="hidden"
                border="2px solid rgba(0,255,65,0.25)"
                style={{
                  boxShadow: '0 0 30px rgba(0,255,65,0.1), inset 0 0 30px rgba(0,0,0,0.5)',
                }}
              >
                <Box
                  position="absolute"
                  inset={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{
                    background: 'linear-gradient(135deg, #0d1a0d 0%, #0a0a0a 100%)',
                  }}
                >
                  {/* Placeholder avatar */}
                  <Box textAlign="center">
                    <Text fontSize="5xl" mb={2}>
                      👨‍💻
                    </Text>
                    <Text
                      fontFamily="var(--font-mono), monospace"
                      fontSize="xs"
                      color="rgba(0,255,65,0.4)"
                    >
                      Venice, CA
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Decorative offset border */}
              <Box
                position="absolute"
                top="12px"
                left="12px"
                right="-12px"
                bottom="-12px"
                border="2px solid rgba(0,255,65,0.15)"
                borderRadius="lg"
                zIndex={-1}
              />
            </Box>
          </Box>
        </Grid>
      </MotionBox>
    </Box>
  )
}
