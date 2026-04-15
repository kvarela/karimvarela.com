import { Box, Flex, Text } from '@chakra-ui/react'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box
      as="footer"
      borderTop="1px solid rgba(0,255,65,0.1)"
      py={6}
      px={8}
      mt={20}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align="center"
        gap={2}
      >
        <Text
          fontSize="xs"
          fontFamily="var(--font-mono), monospace"
          color="rgba(204,255,204,0.4)"
        >
          Built with Next.js, NestJS, and ☕
        </Text>
        <Text
          fontSize="xs"
          fontFamily="var(--font-mono), monospace"
          color="rgba(204,255,204,0.4)"
        >
          © {year} Karim Varela
        </Text>
      </Flex>
    </Box>
  )
}
