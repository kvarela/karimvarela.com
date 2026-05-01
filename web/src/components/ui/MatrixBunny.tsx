'use client'

import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionText = motion(Text)

interface MatrixBunnyProps {
  message?: string
}

// /\_/\
// (o . o)
//  > ^ <
// (__)(__)
const BUNNY = `  /\\_/\\  \n (o . o) \n  > ^ <  \n (__)(__)`

const HOP = {
  animate: {
    y: [0, -22, -24, -22, 0, 0, 0],
    scaleY: [1, 1.05, 1.08, 1.05, 0.85, 1.03, 1],
  },
  transition: {
    duration: 1.0,
    times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 0.7,
    ease: 'easeInOut',
  },
}

const SHADOW = {
  animate: {
    scaleX: [1, 0.4, 0.3, 0.4, 1, 1, 1],
    opacity: [0.5, 0.15, 0.1, 0.15, 0.5, 0.5, 0.5],
  },
  transition: {
    duration: 1.0,
    times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    repeat: Infinity,
    repeatDelay: 0.7,
    ease: 'easeInOut',
  },
}

export function MatrixBunny({ message = 'Loading...' }: MatrixBunnyProps) {
  return (
    <Flex direction="column" alignItems="center" gap={2} py={10}>
      <MotionBox
        animate={HOP.animate}
        transition={HOP.transition}
        style={{ transformOrigin: 'bottom center', display: 'inline-block' }}
      >
        <Text
          fontFamily="var(--font-mono), monospace"
          fontSize="sm"
          lineHeight="1.5"
          color="#00ff41"
          textShadow="0 0 10px rgba(0,255,65,0.5)"
          userSelect="none"
          whiteSpace="pre"
        >
          {BUNNY}
        </Text>
      </MotionBox>

      <MotionBox
        w="40px"
        h="3px"
        borderRadius="full"
        bg="rgba(0,255,65,0.25)"
        animate={SHADOW.animate}
        transition={SHADOW.transition}
      />

      <MotionText
        fontFamily="var(--font-mono), monospace"
        fontSize="xs"
        color="rgba(0,255,65,0.5)"
        letterSpacing="0.15em"
        mt={2}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        follow the white rabbit
      </MotionText>

      <Text
        fontFamily="var(--font-mono), monospace"
        fontSize="xs"
        color="rgba(204,255,204,0.4)"
      >
        {message}
      </Text>
    </Flex>
  )
}
