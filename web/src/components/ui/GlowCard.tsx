import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

interface GlowCardProps extends BoxProps {
  children: React.ReactNode
}

export function GlowCard({ children, ...props }: GlowCardProps) {
  return (
    <Box
      bg="rgba(10, 10, 10, 0.8)"
      border="1px solid rgba(0, 255, 65, 0.15)"
      borderRadius="lg"
      p={6}
      transition="all 0.3s ease"
      _hover={{
        borderColor: 'rgba(0, 255, 65, 0.4)',
        boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)',
        transform: 'translateY(-2px)',
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
