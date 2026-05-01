'use client'
import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

interface NeonBadgeProps extends BoxProps {
  children: React.ReactNode
}

export function NeonBadge({ children, ...props }: NeonBadgeProps) {
  return (
    <Box
      as="span"
      display="inline-block"
      px={3}
      py={1}
      fontSize="xs"
      fontFamily="var(--font-mono), monospace"
      color="#00ff41"
      bg="rgba(0, 255, 65, 0.08)"
      border="1px solid rgba(0, 255, 65, 0.25)"
      borderRadius="md"
      transition="all 0.2s"
      _hover={{
        bg: 'rgba(0, 255, 65, 0.15)',
        borderColor: 'rgba(0, 255, 65, 0.5)',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
