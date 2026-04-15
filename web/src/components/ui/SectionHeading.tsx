import { Box, Flex, Text } from '@chakra-ui/react'

interface SectionHeadingProps {
  number: string
  title: string
}

export function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <Flex align="center" gap={3} mb={10}>
      <Text
        as="span"
        fontFamily="var(--font-mono), monospace"
        fontSize="sm"
        color="#00ff41"
        opacity={0.8}
      >
        {number}.
      </Text>
      <Text
        as="h2"
        fontFamily="var(--font-mono), monospace"
        fontSize={{ base: 'xl', md: '2xl' }}
        fontWeight="bold"
        color="#ccffcc"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Box
        flex={1}
        height="1px"
        style={{
          background:
            'linear-gradient(to right, rgba(0,255,65,0.4), transparent)',
        }}
        ml={2}
      />
    </Flex>
  )
}
