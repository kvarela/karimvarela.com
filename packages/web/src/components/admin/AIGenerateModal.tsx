'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Flex, Text, Input, Button, Textarea } from '@chakra-ui/react'
import { apiClient } from '@/lib/api-client'
import type { AIGenerateDto } from '@karimvarela/shared'

interface AIGenerateResult {
  title: string
  content: string
  excerpt: string
  tags: string[]
}

interface AIGenerateModalProps {
  onClose: () => void
  onGenerated: (result: AIGenerateResult) => void
}

interface AIFormData {
  prompt: string
  context?: string
}

export function AIGenerateModal({ onClose, onGenerated }: AIGenerateModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit } = useForm<AIFormData>()

  const onSubmit = async (data: AIFormData) => {
    setLoading(true)
    setError(null)
    try {
      const payload: AIGenerateDto = { prompt: data.prompt, context: data.context }
      const res = await apiClient.post<AIGenerateResult>('/admin/ai/generate', payload)
      onGenerated(res.data)
      onClose()
    } catch {
      setError('Failed to generate content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={9000}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      {/* Backdrop */}
      <Box
        position="absolute"
        inset={0}
        bg="rgba(0,0,0,0.8)"
        onClick={onClose}
      />

      {/* Modal */}
      <Box
        position="relative"
        zIndex={1}
        width="100%"
        maxWidth="540px"
        bg="#0d0d0d"
        border="1px solid rgba(0,255,65,0.25)"
        borderRadius="xl"
        p={7}
        style={{ boxShadow: '0 0 50px rgba(0,255,65,0.1)' }}
      >
        <Flex justify="space-between" align="center" mb={6}>
          <Box>
            <Text
              fontFamily="var(--font-mono), monospace"
              fontSize="xs"
              color="rgba(0,255,65,0.6)"
              mb={0.5}
              letterSpacing="0.12em"
              textTransform="uppercase"
            >
              AI Assistant
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="white">
              Generate Post Content
            </Text>
          </Box>
          <Box
            cursor="pointer"
            color="rgba(204,255,204,0.4)"
            _hover={{ color: '#ccffcc' }}
            fontSize="xl"
            lineHeight={1}
            onClick={onClose}
          >
            ×
          </Box>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Flex direction="column" gap={4}>
            <Box>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                color="rgba(0,255,65,0.7)"
                mb={1.5}
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Topic / Prompt *
              </Text>
              <Input
                {...register('prompt', { required: true })}
                placeholder="e.g. Building scalable APIs with NestJS and TypeScript"
                bg="rgba(0,0,0,0.4)"
                border="1px solid rgba(0,255,65,0.2)"
                color="#ccffcc"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                _placeholder={{ color: 'rgba(204,255,204,0.25)' }}
                _focus={{ borderColor: '#00ff41', boxShadow: '0 0 0 1px #00ff41', outline: 'none' }}
              />
            </Box>

            <Box>
              <Text
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                color="rgba(0,255,65,0.7)"
                mb={1.5}
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Additional Context (optional)
              </Text>
              <Textarea
                {...register('context')}
                placeholder="Any specific angles, personal experiences, or talking points to include..."
                bg="rgba(0,0,0,0.4)"
                border="1px solid rgba(0,255,65,0.2)"
                color="#ccffcc"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                rows={4}
                resize="vertical"
                _placeholder={{ color: 'rgba(204,255,204,0.25)' }}
                _focus={{ borderColor: '#00ff41', boxShadow: '0 0 0 1px #00ff41', outline: 'none' }}
              />
            </Box>

            {error && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" fontFamily="var(--font-mono), monospace">
                {error}
              </Text>
            )}

            <Flex gap={3} justify="flex-end" mt={2}>
              <Button
                type="button"
                variant="ghost"
                color="rgba(204,255,204,0.5)"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                _hover={{ color: '#ccffcc', bg: 'rgba(255,255,255,0.05)' }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                loadingText="Generating..."
                bg="#00ff41"
                color="#0a0a0a"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                fontWeight="bold"
                _hover={{ bg: '#39ff14', boxShadow: '0 0 15px rgba(0,255,65,0.4)' }}
              >
                Generate Content
              </Button>
            </Flex>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
