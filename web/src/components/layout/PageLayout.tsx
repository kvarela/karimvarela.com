'use client'
import { Box } from '@chakra-ui/react'
import { MatrixRain } from '@/components/ui/MatrixRain'

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Box minHeight="100vh" position="relative" style={{ background: '#0a0a0a' }}>
      <MatrixRain />
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  )
}
