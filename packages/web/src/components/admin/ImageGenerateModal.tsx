'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { apiClient } from '@/lib/api-client'
import type { ImageGenerateDto } from '@karimvarela/shared'

interface ImageGenerateModalProps {
  onClose: () => void
  onSelected: (imageUrl: string) => void
}

interface ImageFormData {
  prompt: string
}

export function ImageGenerateModal({ onClose, onSelected }: ImageGenerateModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const { register, handleSubmit } = useForm<ImageFormData>()

  const onSubmit = async (data: ImageFormData) => {
    setLoading(true)
    setError(null)
    setGeneratedUrl(null)
    try {
      const payload: ImageGenerateDto = { prompt: data.prompt }
      const res = await apiClient.post<{ imageUrl: string }>('/admin/image/generate', payload)
      setGeneratedUrl(res.data.imageUrl)
    } catch {
      setError('Failed to generate image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopyUrl = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleUseCoverImage = () => {
    if (!generatedUrl) return
    onSelected(generatedUrl)
    onClose()
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
        maxWidth="580px"
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
              AI Image
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="white">
              Generate Cover Image
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
                Image Prompt *
              </Text>
              <Flex gap={2}>
                <Input
                  {...register('prompt', { required: true })}
                  placeholder="e.g. Abstract matrix code visualization, dark cyberpunk style"
                  bg="rgba(0,0,0,0.4)"
                  border="1px solid rgba(0,255,65,0.2)"
                  color="#ccffcc"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  _placeholder={{ color: 'rgba(204,255,204,0.25)' }}
                  _focus={{ borderColor: '#00ff41', boxShadow: '0 0 0 1px #00ff41', outline: 'none' }}
                  flex={1}
                />
                <Button
                  type="submit"
                  loading={loading}
                  loadingText="..."
                  bg="#00ff41"
                  color="#0a0a0a"
                  fontFamily="var(--font-mono), monospace"
                  fontSize="sm"
                  fontWeight="bold"
                  flexShrink={0}
                  _hover={{ bg: '#39ff14' }}
                >
                  Generate
                </Button>
              </Flex>
            </Box>

            {error && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" fontFamily="var(--font-mono), monospace">
                {error}
              </Text>
            )}

            {/* Generated image preview */}
            {generatedUrl && (
              <Box>
                <Text
                  fontFamily="var(--font-mono), monospace"
                  fontSize="xs"
                  color="rgba(0,255,65,0.7)"
                  mb={2}
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Generated Image
                </Text>
                <Box
                  position="relative"
                  width="100%"
                  height="220px"
                  borderRadius="lg"
                  overflow="hidden"
                  border="1px solid rgba(0,255,65,0.2)"
                  mb={3}
                >
                  <Image
                    src={generatedUrl}
                    alt="Generated cover image"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                {/* URL display */}
                <Box
                  bg="rgba(0,0,0,0.4)"
                  border="1px solid rgba(0,255,65,0.15)"
                  borderRadius="md"
                  px={3}
                  py={2}
                  mb={3}
                >
                  <Text
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    color="rgba(204,255,204,0.5)"
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {generatedUrl}
                  </Text>
                </Box>

                <Flex gap={3}>
                  <Button
                    size="sm"
                    variant="outline"
                    borderColor="rgba(0,255,65,0.3)"
                    color="#00ff41"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    _hover={{ bg: 'rgba(0,255,65,0.1)' }}
                    onClick={handleCopyUrl}
                  >
                    {copied ? 'Copied!' : 'Copy URL'}
                  </Button>
                  <Button
                    size="sm"
                    bg="#00ff41"
                    color="#0a0a0a"
                    fontFamily="var(--font-mono), monospace"
                    fontSize="xs"
                    fontWeight="bold"
                    _hover={{ bg: '#39ff14' }}
                    onClick={handleUseCoverImage}
                  >
                    Use as Cover Image
                  </Button>
                </Flex>
              </Box>
            )}

            {!generatedUrl && (
              <Flex justify="flex-end" mt={2}>
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
              </Flex>
            )}
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
