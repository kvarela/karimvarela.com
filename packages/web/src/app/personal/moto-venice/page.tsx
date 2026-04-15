import { Box, Grid, Flex, Text, chakra } from '@chakra-ui/react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MatrixRain } from '@/components/ui/MatrixRain'
import { Footer } from '@/components/layout/Footer'
import { GlowCard } from '@/components/ui/GlowCard'
import { NeonBadge } from '@/components/ui/NeonBadge'
import { SOCIAL_LINKS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Moto Venice',
  description:
    'Moto Venice — motorcycle rentals in Venice, CA. Explore Los Angeles on two wheels with our curated fleet.',
  openGraph: {
    title: 'Moto Venice — Motorcycle Rentals in Venice, CA',
    description:
      'Rent a motorcycle in Venice and explore LA. Experience the Pacific Coast Highway the way it was meant to be ridden.',
    url: 'https://karimvarela.com/personal/moto-venice',
  },
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

const BIKES = [
  {
    name: 'Royal Enfield Classic 350',
    type: 'Cruiser',
    emoji: '🏍️',
    description:
      'The quintessential Venice beach cruiser. Effortless to ride, beautiful to look at, and perfect for the PCH at sunrise.',
    tags: ['Beginner Friendly', 'Iconic', 'City + Highway'],
  },
  {
    name: 'Honda CB500F',
    type: 'Naked',
    emoji: '⚡',
    description:
      'Sporty, nimble, and comfortable for longer rides. This one handles Malibu twisties like it was born there.',
    tags: ['Sporty', 'Versatile', 'Great Range'],
  },
  {
    name: 'Kawasaki Z400',
    type: 'Naked Sport',
    emoji: '🟢',
    description:
      'For riders who want a little more punch. The Z400 is a serious machine that still handles urban riding beautifully.',
    tags: ['Performance', 'Experienced', 'Urban Shredder'],
  },
  {
    name: 'Vespa Primavera 150',
    type: 'Scooter',
    emoji: '🛵',
    description:
      'Classic Italian style meets Venice Beach. Ideal for getting around the neighborhood and Abbot Kinney in effortless style.',
    tags: ['Easy Riding', 'Style Icon', 'City Perfect'],
  },
]

const EXPERIENCES = [
  {
    title: 'PCH Sunrise Ride',
    emoji: '🌅',
    description:
      'Hit the Pacific Coast Highway as the sun comes up. Malibu, Point Dume, and back before the traffic hits. Pure magic.',
  },
  {
    title: 'Venice Neighborhood Loop',
    emoji: '🏖️',
    description:
      'Abbot Kinney, the Boardwalk, Muscle Beach, the Canals — experience the real Venice on two wheels at your own pace.',
  },
  {
    title: 'Santa Monica to Malibu',
    emoji: '🛣️',
    description:
      'A classic So-Cal run. Ocean on your left, Santa Monica Mountains on your right. The route that makes Instagram jealous.',
  },
  {
    title: 'Mulholland Scenic Highway',
    emoji: '🏔️',
    description:
      'For the riders who want elevation and drama. Mulholland delivers sweeping LA views and satisfying curves.',
  },
]

export default function MotoVenicePage() {
  return (
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />

      <Box position="relative" zIndex={1}>
        {/* Back link */}
        <Box px={{ base: 6, md: 12 }} pt={6}>
          <Link href="/personal" style={{ textDecoration: 'none' }}>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              color="rgba(0,255,65,0.5)"
              _hover={{ color: '#00ff41' }}
              transition="color 0.2s"
              display="inline-flex"
              alignItems="center"
              gap={2}
            >
              ← Back
            </Text>
          </Link>
        </Box>

        <Box
          as="main"
          px={{ base: 6, md: 12, lg: 20 }}
          py={{ base: 8, lg: 12 }}
          maxWidth="1100px"
          mx="auto"
        >
          {/* Hero */}
          <Box as="section" py={16} textAlign="center">
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              color="#00ff41"
              mb={3}
              letterSpacing="0.15em"
              textTransform="uppercase"
            >
              Venice, California
            </Text>
            <Text
              as="h1"
              fontSize={{ base: '5xl', md: '7xl', lg: '8xl' }}
              fontWeight="bold"
              color="white"
              mb={4}
              lineHeight={0.95}
              letterSpacing="-0.02em"
            >
              Moto
              <Box as="span" color="#00ff41">
                {' '}
                Venice
              </Box>
            </Text>
            <Text
              fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }}
              color="rgba(204,255,204,0.7)"
              mb={8}
              maxWidth="600px"
              mx="auto"
              lineHeight={1.5}
            >
              Motorcycle rentals in the heart of Venice Beach. Explore Los Angeles the way it
              was meant to be experienced — on two wheels, ocean air in your face.
            </Text>

            <Flex justify="center" gap={4} flexWrap="wrap" mb={6}>
              <chakra.a
                href={SOCIAL_LINKS.motoVeniceWebsite}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={6}
                py={3}
                bg="#00ff41"
                color="#0a0a0a"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                fontWeight="bold"
                borderRadius="md"
                letterSpacing="0.08em"
                _hover={{
                  bg: '#39ff14',
                  boxShadow: '0 0 25px rgba(0,255,65,0.5)',
                }}
                transition="all 0.2s"
                style={{ textDecoration: 'none' }}
              >
                Book a Ride
                <ExternalLinkIcon />
              </chakra.a>

              <chakra.a
                href={SOCIAL_LINKS.motoVeniceInstagram}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={6}
                py={3}
                border="1px solid #00ff41"
                color="#00ff41"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                borderRadius="md"
                letterSpacing="0.08em"
                _hover={{
                  bg: 'rgba(0,255,65,0.1)',
                  boxShadow: '0 0 20px rgba(0,255,65,0.3)',
                }}
                transition="all 0.2s"
                style={{ textDecoration: 'none' }}
              >
                <InstagramIcon />
                @moto_venice
              </chakra.a>
            </Flex>

            {/* Stats */}
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
              gap={4}
              mt={16}
              mb={4}
            >
              {[
                { value: '4+', label: 'Bikes Available' },
                { value: '100%', label: 'Venice Local' },
                { value: 'PCH', label: 'Our Backyard' },
                { value: '24/7', label: 'Booking Online' },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  p={5}
                  bg="rgba(0,255,65,0.04)"
                  border="1px solid rgba(0,255,65,0.12)"
                  borderRadius="lg"
                  textAlign="center"
                >
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="2xl"
                    fontWeight="bold"
                    color="#00ff41"
                    mb={1}
                  >
                    {stat.value}
                  </Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    color="rgba(204,255,204,0.5)"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                  >
                    {stat.label}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* About Section */}
          <Box as="section" py={12}>
            <Flex align="center" gap={3} mb={8}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                opacity={0.8}
              >
                01.
              </Text>
              <Text
                as="h2"
                fontFamily="var(--font-mono), monospace"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                color="#ccffcc"
              >
                The Story
              </Text>
              <Box
                flex={1}
                height="1px"
                style={{
                  background: 'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
                }}
                ml={2}
              />
            </Flex>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
              <Box>
                <Text
                  fontSize="md"
                  color="rgba(204,255,204,0.7)"
                  lineHeight={1.8}
                  mb={4}
                >
                  Moto Venice started the way all good Venice ideas do — with a conversation on
                  the boardwalk. I&apos;d been riding motorcycles for years and kept noticing
                  tourists and locals alike who wanted to explore LA on two wheels but had no
                  easy way to do it.
                </Text>
                <Text
                  fontSize="md"
                  color="rgba(204,255,204,0.7)"
                  lineHeight={1.8}
                >
                  So I built something. A small fleet of well-maintained bikes, a simple
                  booking experience, and a genuine love for helping people discover the joy of
                  riding PCH or cruising Abbot Kinney on a beautiful California day.
                </Text>
              </Box>
              <Box>
                <Text
                  fontSize="md"
                  color="rgba(204,255,204,0.7)"
                  lineHeight={1.8}
                  mb={4}
                >
                  Every bike in our fleet is personally maintained and inspected. We provide
                  helmets, basic gear, and a map of the best routes — so you can focus on the
                  ride, not the logistics.
                </Text>
                <Text
                  fontSize="md"
                  color="rgba(204,255,204,0.7)"
                  lineHeight={1.8}
                >
                  Whether you&apos;re a seasoned rider or just curious, we&apos;ll set you up
                  with the right bike and make sure you leave with a story to tell.
                </Text>
              </Box>
            </Grid>
          </Box>

          {/* Fleet Section */}
          <Box as="section" py={12}>
            <Flex align="center" gap={3} mb={8}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                opacity={0.8}
              >
                02.
              </Text>
              <Text
                as="h2"
                fontFamily="var(--font-mono), monospace"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                color="#ccffcc"
              >
                The Fleet
              </Text>
              <Box
                flex={1}
                height="1px"
                style={{
                  background: 'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
                }}
                ml={2}
              />
            </Flex>

            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={5}>
              {BIKES.map((bike) => (
                <GlowCard key={bike.name}>
                  <Flex justify="space-between" align="flex-start" mb={3}>
                    <Text fontSize="3xl">{bike.emoji}</Text>
                    <NeonBadge>{bike.type}</NeonBadge>
                  </Flex>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="md"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={2}
                  >
                    {bike.name}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.7}
                    mb={4}
                  >
                    {bike.description}
                  </Text>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    {bike.tags.map((tag) => (
                      <NeonBadge key={tag}>{tag}</NeonBadge>
                    ))}
                  </Box>
                </GlowCard>
              ))}
            </Grid>
          </Box>

          {/* Experiences Section */}
          <Box as="section" py={12}>
            <Flex align="center" gap={3} mb={8}>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                color="#00ff41"
                opacity={0.8}
              >
                03.
              </Text>
              <Text
                as="h2"
                fontFamily="var(--font-mono), monospace"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                color="#ccffcc"
              >
                Rides Worth Taking
              </Text>
              <Box
                flex={1}
                height="1px"
                style={{
                  background: 'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
                }}
                ml={2}
              />
            </Flex>

            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={5}>
              {EXPERIENCES.map((exp) => (
                <Box
                  key={exp.title}
                  p={5}
                  bg="rgba(10,10,10,0.6)"
                  border="1px solid rgba(0,255,65,0.12)"
                  borderRadius="lg"
                  transition="all 0.3s"
                  _hover={{
                    borderColor: 'rgba(0,255,65,0.3)',
                    boxShadow: '0 0 15px rgba(0,255,65,0.1)',
                  }}
                >
                  <Text fontSize="2xl" mb={3}>{exp.emoji}</Text>
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="md"
                    fontWeight="bold"
                    color="#ccffcc"
                    mb={2}
                  >
                    {exp.title}
                  </Text>
                  <Text
                    fontSize="sm"
                    color="rgba(204,255,204,0.65)"
                    lineHeight={1.7}
                  >
                    {exp.description}
                  </Text>
                </Box>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <Box
            as="section"
            py={16}
            textAlign="center"
            borderTop="1px solid rgba(0,255,65,0.1)"
            mt={8}
          >
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              color="rgba(0,255,65,0.6)"
              mb={3}
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              Ready to ride?
            </Text>
            <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color="white"
              mb={4}
              lineHeight={1.2}
            >
              Book your Venice adventure
            </Text>
            <Text
              fontSize="md"
              color="rgba(204,255,204,0.6)"
              mb={8}
              maxWidth="500px"
              mx="auto"
              lineHeight={1.7}
            >
              Visit{' '}
              <chakra.a
                href={SOCIAL_LINKS.motoVeniceWebsite}
                color="#00ff41"
                _hover={{ color: '#39ff14' }}
              >
                motovenice.com
              </chakra.a>{' '}
              to check availability and reserve your bike online. Questions? Hit us up on Instagram.
            </Text>

            <Flex justify="center" gap={4} flexWrap="wrap">
              <chakra.a
                href={SOCIAL_LINKS.motoVeniceWebsite}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={8}
                py={4}
                bg="#00ff41"
                color="#0a0a0a"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                fontWeight="bold"
                borderRadius="md"
                letterSpacing="0.08em"
                _hover={{
                  bg: '#39ff14',
                  boxShadow: '0 0 30px rgba(0,255,65,0.5)',
                }}
                transition="all 0.2s"
                style={{ textDecoration: 'none' }}
              >
                Visit motovenice.com
                <ExternalLinkIcon />
              </chakra.a>
              <chakra.a
                href={SOCIAL_LINKS.motoVeniceInstagram}
                target="_blank"
                rel="noopener noreferrer"
                display="inline-flex"
                alignItems="center"
                gap={2}
                px={8}
                py={4}
                border="1px solid rgba(0,255,65,0.5)"
                color="#00ff41"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                borderRadius="md"
                letterSpacing="0.08em"
                _hover={{
                  bg: 'rgba(0,255,65,0.08)',
                  borderColor: '#00ff41',
                }}
                transition="all 0.2s"
                style={{ textDecoration: 'none' }}
              >
                <InstagramIcon />
                Follow on Instagram
              </chakra.a>
            </Flex>
          </Box>

          <Footer />
        </Box>
      </Box>
    </Box>
  )
}
