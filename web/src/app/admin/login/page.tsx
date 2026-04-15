'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Box, Flex, Text, Input, Button } from '@chakra-ui/react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api-client'

interface LoginForm {
  username: string
  password: string
}

export default function AdminLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError(null)
    try {
      const res = await apiClient.post<{ access_token: string }>('/auth/login', data)
      login(res.data.access_token)
      router.push('/admin')
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minHeight="100vh"
      style={{ background: '#0a0a0a' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        width="100%"
        maxWidth="400px"
        bg="rgba(10,10,10,0.9)"
        border="1px solid rgba(0,255,65,0.2)"
        borderRadius="xl"
        p={8}
        style={{
          boxShadow: '0 0 40px rgba(0,255,65,0.08)',
        }}
      >
        <Box textAlign="center" mb={8}>
          <Text
            fontFamily="var(--font-mono), monospace"
            fontSize="xs"
            color="rgba(0,255,65,0.6)"
            mb={2}
            letterSpacing="0.15em"
            textTransform="uppercase"
          >
            Admin Access
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            fontFamily="var(--font-mono), monospace"
          >
            karimvarela.com
          </Text>
        </Box>

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
                Username
              </Text>
              <Input
                {...register('username', { required: 'Username is required' })}
                placeholder="username"
                autoComplete="username"
                bg="rgba(0,0,0,0.4)"
                border="1px solid rgba(0,255,65,0.2)"
                color="#ccffcc"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                _placeholder={{ color: 'rgba(204,255,204,0.25)' }}
                _focus={{
                  borderColor: '#00ff41',
                  boxShadow: '0 0 0 1px #00ff41',
                  outline: 'none',
                }}
                _hover={{ borderColor: 'rgba(0,255,65,0.4)' }}
              />
              {errors.username && (
                <Text fontSize="xs" color="rgba(255,80,80,0.8)" mt={1} fontFamily="var(--font-mono), monospace">
                  {errors.username.message}
                </Text>
              )}
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
                Password
              </Text>
              <Input
                {...register('password', { required: 'Password is required' })}
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                bg="rgba(0,0,0,0.4)"
                border="1px solid rgba(0,255,65,0.2)"
                color="#ccffcc"
                fontFamily="var(--font-mono), monospace"
                fontSize="sm"
                _placeholder={{ color: 'rgba(204,255,204,0.25)' }}
                _focus={{
                  borderColor: '#00ff41',
                  boxShadow: '0 0 0 1px #00ff41',
                  outline: 'none',
                }}
                _hover={{ borderColor: 'rgba(0,255,65,0.4)' }}
              />
              {errors.password && (
                <Text fontSize="xs" color="rgba(255,80,80,0.8)" mt={1} fontFamily="var(--font-mono), monospace">
                  {errors.password.message}
                </Text>
              )}
            </Box>

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

            <Button
              type="submit"
              loading={loading}
              loadingText="Authenticating..."
              width="100%"
              bg="#00ff41"
              color="#0a0a0a"
              fontFamily="var(--font-mono), monospace"
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="0.08em"
              _hover={{
                bg: '#39ff14',
                boxShadow: '0 0 20px rgba(0,255,65,0.4)',
              }}
              _active={{ bg: '#00cc34' }}
              mt={2}
            >
              Access Admin
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  )
}
