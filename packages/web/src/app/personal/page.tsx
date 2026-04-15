import { Box, Grid, Text, Flex } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { Footer } from '@/components/layout/Footer'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/GlowCard'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { PERSONAL_NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Personal',
  description: 'Life in Venice, CA — surfing, MMA, gaming, and more from Karim Varela.',
}

function PersonalSidebarNav() {
  return (
    <Box
      position="sticky"
      top={0}
      height="100vh"
      borderRight="1px solid rgba(0,255,65,0.08)"
      py={8}
      px={6}
      display={{ base: 'none', lg: 'flex' }}
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Box mb={10}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="xl"
              fontWeight="bold"
              color="#00ff41"
              mb={1}
            >
              Karim Varela
            </Text>
          </Link>
          <Text
            fontSize="xs"
            color="rgba(204,255,204,0.5)"
            fontFamily="var(--font-mono), monospace"
          >
            Venice Life
          </Text>
        </Box>

        <nav>
          <Flex direction="column" gap={1}>
            {PERSONAL_NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <Flex
                  align="center"
                  gap={3}
                  px={3}
                  py={2}
                  borderRadius="md"
                  _hover={{ background: 'rgba(0,255,65,0.07)' }}
                  transition="all 0.2s"
                >
                  <Box width="8px" height="2px" bg="#00ff41" opacity={0.4} borderRadius="full" />
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="sm"
                    color="rgba(204,255,204,0.6)"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    {item.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </Flex>
        </nav>
      </Box>

      <Box>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="xs"
            color="rgba(0,255,65,0.5)"
            _hover={{ color: '#00ff41' }}
            transition="color 0.2s"
          >
            ← Back to Portfolio
          </Text>
        </Link>
      </Box>
    </Box>
  )
}

export default function PersonalPage() {
  return (
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />

      <Box position="relative" zIndex={1}>
        <Grid
          templateColumns={{ base: '1fr', lg: '280px 1fr' }}
          minHeight="100vh"
        >
          <PersonalSidebarNav />

          <Box
            as="main"
            px={{ base: 6, md: 10, lg: 16 }}
            py={{ base: 8, lg: 12 }}
            maxWidth="900px"
          >
            {/* Hero */}
            <Box as="section" id="venice" py={16}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                mb={3}
                letterSpacing="0.1em"
              >
                Life in
              </Text>
              <Text
                as="h1"
                fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
                fontWeight="bold"
                color="white"
                mb={4}
                lineHeight={1.1}
              >
                Venice, California
              </Text>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color="rgba(204,255,204,0.7)"
                mb={6}
                maxWidth="600px"
                lineHeight={1.7}
              >
                Venice isn&apos;t just where I live — it&apos;s who I am. The surf culture, the
                creative energy, the community of builders and artists and athletes — it all
                shapes how I think about work and life.
              </Text>
              <Text
                fontSize="md"
                color="rgba(204,255,204,0.55)"
                maxWidth="560px"
                lineHeight={1.8}
              >
                From morning sessions at Sunset Beach to late-night coding sprints, Venice
                provides the rhythm. There&apos;s something about living steps from the ocean
                that keeps perspective in check — the best ideas come when you step away from
                the screen and let your mind wander in the salt air.
              </Text>
            </Box>

            {/* MMA Section */}
            <Box as="section" id="mma" py={16}>
              <SectionHeading number="01" title="MMA & BJJ" />
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <GlowCard>
                  <Text
                    fontSize="3xl"
                    mb={3}
                  >
                    🥊
                  </Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="lg"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={3}
                  >
                    Training MMA
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.8}
                    mb={4}
                  >
                    I&apos;ve been training MMA and Brazilian Jiu-Jitsu for years. There&apos;s
                    a clarity you get from stepping on the mats — every problem from the day
                    dissolves into pure focus on the present moment. It&apos;s the ultimate
                    debugging session.
                  </Text>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <NeonBadge>BJJ</NeonBadge>
                    <NeonBadge>Muay Thai</NeonBadge>
                    <NeonBadge>Wrestling</NeonBadge>
                    <NeonBadge>Strength & Conditioning</NeonBadge>
                  </Box>
                </GlowCard>

                <GlowCard>
                  <Text fontSize="3xl" mb={3}>🥋</Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="lg"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={3}
                  >
                    The Mental Game
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.8}
                  >
                    What I love most about grappling is that it&apos;s essentially a live
                    problem-solving exercise — you have to adapt, stay calm under pressure, and
                    think several moves ahead. Sound familiar? The parallels to engineering are
                    uncanny. The gym is my second home in Venice.
                  </Text>
                </GlowCard>
              </Grid>
            </Box>

            {/* Surfing Section */}
            <Box as="section" id="surfing" py={16}>
              <SectionHeading number="02" title="Surfing" />
              <GlowCard mb={6}>
                <Flex gap={6} direction={{ base: 'column', md: 'row' }} align="flex-start">
                  <Text fontSize="5xl" flexShrink={0}>🏄</Text>
                  <Box>
                    <Text
                      fontFamily="var(--font-mono), monospace"
                      fontSize="lg"
                      fontWeight="bold"
                      color="#ccffcc"
                      mb={3}
                    >
                      Chasing Waves
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(204,255,204,0.65)"
                      lineHeight={1.8}
                      mb={4}
                    >
                      Living in Venice means the Pacific is a short walk away, and I take full
                      advantage. I surf Venice Beach and make regular pilgrimages up to Malibu
                      when the swell is right. There&apos;s nothing like a dawn patrol session
                      before opening the laptop — it resets everything.
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(204,255,204,0.65)"
                      lineHeight={1.8}
                    >
                      Surfing teaches patience in a way nothing else does. You can&apos;t force
                      a good wave — you read the ocean, position yourself, and wait. Then you
                      commit completely. That&apos;s a pretty good framework for most things
                      in life.
                    </Text>
                    <Box display="flex" flexWrap="wrap" gap={2} mt={4}>
                      <NeonBadge>Venice Beach</NeonBadge>
                      <NeonBadge>Malibu</NeonBadge>
                      <NeonBadge>El Porto</NeonBadge>
                      <NeonBadge>Dawn Patrol</NeonBadge>
                    </Box>
                  </Box>
                </Flex>
              </GlowCard>
            </Box>

            {/* Gaming Section */}
            <Box as="section" id="gaming" py={16}>
              <SectionHeading number="03" title="Gaming" />
              <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
                <GlowCard>
                  <Text fontSize="3xl" mb={3}>🎮</Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="lg"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={3}
                  >
                    What I Play
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.8}
                    mb={4}
                  >
                    Games are where I unplug — competitive strategy games, immersive RPGs,
                    and the occasional battle royale when I need to burn off some energy.
                    I&apos;m a fan of games with deep systems and meaningful choices.
                  </Text>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <NeonBadge>Strategy</NeonBadge>
                    <NeonBadge>RPG</NeonBadge>
                    <NeonBadge>FPS</NeonBadge>
                    <NeonBadge>Indie</NeonBadge>
                  </Box>
                </GlowCard>

                <GlowCard>
                  <Text fontSize="3xl" mb={3}>🕹️</Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="lg"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={3}
                  >
                    Games that Shaped Me
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.8}
                  >
                    StarCraft II taught me multitasking and macro-level thinking. Dark Souls
                    taught me that persistence through failure is its own skill. Factorio
                    scratches the same itch as system architecture — build it clean, optimize
                    later, then optimize again.
                  </Text>
                </GlowCard>
              </Grid>
            </Box>

            {/* Family Section */}
            <Box as="section" id="family" py={16}>
              <SectionHeading number="04" title="Family & Community" />
              <GlowCard>
                <Flex gap={6} direction={{ base: 'column', md: 'row' }} align="flex-start">
                  <Text fontSize="5xl" flexShrink={0}>🌊</Text>
                  <Box>
                    <Text
                      fontFamily="var(--font-mono), monospace"
                      fontSize="lg"
                      fontWeight="bold"
                      color="#ccffcc"
                      mb={3}
                    >
                      Rooted in Venice
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(204,255,204,0.65)"
                      lineHeight={1.8}
                      mb={4}
                    >
                      Venice is a small town inside a big city, and that&apos;s what makes it
                      special. My family is my anchor here — the reason why all the work
                      matters, and the reason why stepping away from it matters just as much.
                    </Text>
                    <Text
                      fontSize="sm"
                      color="rgba(204,255,204,0.65)"
                      lineHeight={1.8}
                    >
                      The community around me — neighbors, gym partners, fellow surfers,
                      local entrepreneurs — keeps me grounded and inspired. There&apos;s an
                      electricity in Venice that&apos;s hard to describe. Once you&apos;re
                      here, you understand.
                    </Text>
                  </Box>
                </Flex>
              </GlowCard>
            </Box>

            {/* CTA */}
            <Box
              py={16}
              textAlign="center"
              borderTop="1px solid rgba(0,255,65,0.1)"
            >
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="rgba(0,255,65,0.6)"
                mb={4}
                letterSpacing="0.1em"
              >
                Check out my moto business
              </Text>
              <Link href="/personal/moto-venice" style={{ textDecoration: 'none' }}>
                <Box
                  display="inline-block"
                  px={8}
                  py={3}
                  border="1px solid #00ff41"
                  borderRadius="md"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  color="#00ff41"
                  letterSpacing="0.08em"
                  transition="all 0.2s"
                  _hover={{
                    bg: 'rgba(0,255,65,0.1)',
                    boxShadow: '0 0 20px rgba(0,255,65,0.3)',
                  }}
                >
                  Moto Venice →
                </Box>
              </Link>
            </Box>

            <Footer />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
