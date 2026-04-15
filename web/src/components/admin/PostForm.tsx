'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Box, Flex, Text, Input, Button, Textarea } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import type { BlogPost, BlogPostStatus } from '@karimvarela/shared'
import { apiClient } from '@/lib/api-client'
import { AIGenerateModal } from './AIGenerateModal'
import { ImageGenerateModal } from './ImageGenerateModal'

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface PostFormData {
  title: string
  excerpt: string
  content: string
  tags: string
  status: BlogPostStatus
  coverImageUrl: string
}

interface PostFormProps {
  initialData?: Partial<BlogPost>
  postId?: string
}

function StatusSelect({
  value,
  onChange,
}: {
  value: BlogPostStatus
  onChange: (v: BlogPostStatus) => void
}) {
  const options: BlogPostStatus[] = ['draft', 'published', 'archived']
  return (
    <Box position="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as BlogPostStatus)}
        style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid rgba(0,255,65,0.2)',
          borderRadius: '6px',
          color: '#ccffcc',
          fontFamily: 'var(--font-mono), monospace',
          fontSize: '13px',
          padding: '8px 12px',
          width: '100%',
          cursor: 'pointer',
          outline: 'none',
          appearance: 'none',
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#111' }}>
            {opt}
          </option>
        ))}
      </select>
    </Box>
  )
}

export function PostForm({ initialData, postId }: PostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: initialData?.title ?? '',
      excerpt: initialData?.excerpt ?? '',
      content: initialData?.content ?? '',
      tags: initialData?.tags?.map((t) => t.name).join(', ') ?? '',
      status: initialData?.status ?? 'draft',
      coverImageUrl: initialData?.coverImageUrl ?? '',
    },
  })

  const contentValue = watch('content')

  const onSubmit = async (data: PostFormData) => {
    setLoading(true)
    setError(null)
    try {
      const payload = {
        title: data.title,
        excerpt: data.excerpt || undefined,
        content: data.content,
        tagNames: data.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        status: data.status,
        coverImageUrl: data.coverImageUrl || undefined,
      }

      if (postId) {
        await apiClient.patch(`/blog/${postId}`, payload)
      } else {
        await apiClient.post('/blog', payload)
      }

      router.push('/admin/posts')
    } catch {
      setError('Failed to save post. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAIGenerated = (result: {
    title: string
    content: string
    excerpt: string
    tags: string[]
  }) => {
    setValue('title', result.title)
    setValue('content', result.content)
    setValue('excerpt', result.excerpt)
    setValue('tags', result.tags.join(', '))
  }

  const handleImageSelected = (imageUrl: string) => {
    setValue('coverImageUrl', imageUrl)
  }

  const fieldLabel = (label: string) => (
    <Text
      fontFamily="var(--font-mono), monospace"
      fontSize="xs"
      color="rgba(0,255,65,0.7)"
      mb={1.5}
      letterSpacing="0.08em"
      textTransform="uppercase"
    >
      {label}
    </Text>
  )

  const inputStyles = {
    bg: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(0,255,65,0.2)',
    color: '#ccffcc',
    fontFamily: 'var(--font-mono), monospace',
    fontSize: 'sm',
    _placeholder: { color: 'rgba(204,255,204,0.25)' },
    _focus: { borderColor: '#00ff41', boxShadow: '0 0 0 1px #00ff41', outline: 'none' },
    _hover: { borderColor: 'rgba(0,255,65,0.35)' },
  } as const

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Flex direction="column" gap={6}>
          {/* Top actions bar */}
          <Flex
            justify="space-between"
            align="center"
            pb={4}
            borderBottom="1px solid rgba(0,255,65,0.1)"
            flexWrap="wrap"
            gap={3}
          >
            <Flex gap={3}>
              <Button
                type="button"
                size="sm"
                variant="outline"
                borderColor="rgba(0,255,65,0.3)"
                color="#00ff41"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                _hover={{ bg: 'rgba(0,255,65,0.1)' }}
                onClick={() => setShowAIModal(true)}
              >
                ✦ Generate with AI
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                borderColor="rgba(0,255,65,0.3)"
                color="#00ff41"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                _hover={{ bg: 'rgba(0,255,65,0.1)' }}
                onClick={() => setShowImageModal(true)}
              >
                🖼 Generate Image
              </Button>
            </Flex>
            <Flex gap={3}>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                color="rgba(204,255,204,0.5)"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                _hover={{ color: '#ccffcc', bg: 'rgba(255,255,255,0.05)' }}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                loading={loading}
                loadingText="Saving..."
                bg="#00ff41"
                color="#0a0a0a"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                fontWeight="bold"
                _hover={{ bg: '#39ff14', boxShadow: '0 0 15px rgba(0,255,65,0.4)' }}
              >
                {postId ? 'Update Post' : 'Create Post'}
              </Button>
            </Flex>
          </Flex>

          {error && (
            <Box
              bg="rgba(255,50,50,0.08)"
              border="1px solid rgba(255,50,50,0.3)"
              borderRadius="md"
              px={3}
              py={2}
            >
              <Text fontSize="sm" color="rgba(255,120,120,0.9)" fontFamily="var(--font-mono), monospace">
                {error}
              </Text>
            </Box>
          )}

          {/* Title */}
          <Box>
            {fieldLabel('Title *')}
            <Input
              {...register('title', { required: 'Title is required' })}
              placeholder="Post title..."
              {...inputStyles}
              fontSize="lg"
              fontWeight="bold"
            />
            {errors.title && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" mt={1} fontFamily="var(--font-mono), monospace">
                {errors.title.message}
              </Text>
            )}
          </Box>

          {/* Excerpt */}
          <Box>
            {fieldLabel('Excerpt')}
            <Textarea
              {...register('excerpt')}
              placeholder="Short description of the post..."
              rows={3}
              resize="vertical"
              {...inputStyles}
            />
          </Box>

          {/* Content (Markdown Editor) */}
          <Box>
            {fieldLabel('Content (Markdown) *')}
            <Box
              border="1px solid rgba(0,255,65,0.2)"
              borderRadius="lg"
              overflow="hidden"
              style={{ background: '#0d1a0d' }}
            >
              <Controller
                name="content"
                control={control}
                rules={{ required: 'Content is required' }}
                render={({ field }) => (
                  <MDEditor
                    value={field.value}
                    onChange={(val) => field.onChange(val ?? '')}
                    height={500}
                    data-color-mode="dark"
                    style={{
                      background: '#0d1a0d',
                      borderRadius: '8px',
                    }}
                  />
                )}
              />
            </Box>
            {errors.content && (
              <Text fontSize="xs" color="rgba(255,100,100,0.8)" mt={1} fontFamily="var(--font-mono), monospace">
                {errors.content.message}
              </Text>
            )}
          </Box>

          {/* Two-column row for tags, status, cover image */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={5}>
            {/* Tags */}
            <Box flex={1}>
              {fieldLabel('Tags (comma-separated)')}
              <Input
                {...register('tags')}
                placeholder="typescript, nestjs, react"
                {...inputStyles}
              />
            </Box>

            {/* Status */}
            <Box width={{ base: '100%', md: '160px' }}>
              {fieldLabel('Status')}
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <StatusSelect value={field.value} onChange={field.onChange} />
                )}
              />
            </Box>
          </Flex>

          {/* Cover Image URL */}
          <Box>
            {fieldLabel('Cover Image URL')}
            <Flex gap={2}>
              <Input
                {...register('coverImageUrl')}
                placeholder="https://..."
                {...inputStyles}
                flex={1}
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                borderColor="rgba(0,255,65,0.3)"
                color="#00ff41"
                fontFamily="var(--font-mono), monospace"
                fontSize="xs"
                flexShrink={0}
                _hover={{ bg: 'rgba(0,255,65,0.1)' }}
                onClick={() => setShowImageModal(true)}
              >
                Generate
              </Button>
            </Flex>
          </Box>

          {/* Bottom save button */}
          <Flex justify="flex-end">
            <Button
              type="submit"
              loading={loading}
              loadingText="Saving..."
              bg="#00ff41"
              color="#0a0a0a"
              fontFamily="var(--font-mono), monospace"
              fontWeight="bold"
              _hover={{ bg: '#39ff14', boxShadow: '0 0 20px rgba(0,255,65,0.4)' }}
            >
              {postId ? 'Update Post' : 'Create Post'}
            </Button>
          </Flex>
        </Flex>
      </form>

      {showAIModal && (
        <AIGenerateModal
          onClose={() => setShowAIModal(false)}
          onGenerated={handleAIGenerated}
        />
      )}

      {showImageModal && (
        <ImageGenerateModal
          onClose={() => setShowImageModal(false)}
          onSelected={handleImageSelected}
        />
      )}
    </>
  )
}
