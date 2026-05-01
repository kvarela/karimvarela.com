'use client'
import { useState } from 'react'
import { Box, Grid, Text, chakra } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const MotionBox = motion(Box)

const techDescriptions: Record<string, string> = {
  'TypeScript': 'A strongly-typed superset of JavaScript that compiles to plain JS. Static type checking catches bugs at compile time, improves IDE support, and makes large codebases easier to maintain.',
  'Node.js / NestJS': 'Node.js is a V8-based JavaScript runtime for server-side code. NestJS is a TypeScript framework built on top of it, bringing Angular-inspired modules, controllers, and dependency injection to backend development.',
  'React / Next.js': 'React is a declarative UI library for building component-based interfaces. Next.js extends it with server-side rendering, static generation, file-based routing, and API routes — making full-stack development seamless.',
  'PostgreSQL': 'A powerful open-source relational database renowned for its reliability, ACID compliance, and rich feature set — including JSONB, full-text search, and advanced indexing for complex data workloads.',
  'Redis': 'An ultra-fast in-memory data store used for caching, session management, pub/sub messaging, and rate limiting. Its sub-millisecond response times make it ideal for reducing database load.',
  'Docker / K8s': 'Docker packages applications into portable, reproducible containers. Kubernetes (K8s) orchestrates those containers at scale — handling deployment, autoscaling, load balancing, and self-healing across clusters.',
}

function TechItem({ tech }: { tech: string }) {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Text
        fontFamily="var(--font-mono), monospace"
        fontSize="sm"
        color={isHovered ? 'rgba(204,255,204,0.9)' : 'rgba(204,255,204,0.6)'}
        display="flex"
        alignItems="center"
        gap={2}
        cursor="default"
        style={{ transition: 'color 0.2s' }}
      >
        <Box as="span" color="#00ff41" mr={2}>▹</Box>
        {tech}
      </Text>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: 0,
              zIndex: 100,
              width: '260px',
              padding: '10px 14px',
              background: 'rgba(10, 20, 10, 0.97)',
              border: '1px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '6px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 0 12px rgba(0,255,65,0.08)',
              color: 'rgba(204,255,204,0.8)',
              fontSize: '12px',
              lineHeight: '1.6',
              fontFamily: 'var(--font-mono), monospace',
              pointerEvents: 'none',
            }}
          >
            {techDescriptions[tech]}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

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

        <Box>
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
                href="/moto-venice"
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
                  <TechItem key={tech} tech={tech} />
                ))}
              </Grid>
            </Box>
          </Box>

        </Box>
      </MotionBox>
    </Box>
  )
}
