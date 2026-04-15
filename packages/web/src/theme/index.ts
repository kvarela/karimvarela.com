import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        neonGreen: {
          50: { value: '#e6fff0' },
          100: { value: '#b3ffd1' },
          200: { value: '#80ffb2' },
          300: { value: '#4dff93' },
          400: { value: '#1aff74' },
          500: { value: '#00ff41' }, // primary
          600: { value: '#00cc34' },
          700: { value: '#009926' },
          800: { value: '#006619' },
          900: { value: '#00330c' },
        },
        matrixBg: {
          50: { value: '#2a2a2a' },
          100: { value: '#1a1a1a' },
          200: { value: '#111111' },
          300: { value: '#0d0d0d' },
          400: { value: '#0a0a0a' }, // main bg
        },
      },
      fonts: {
        heading: { value: 'var(--font-mono), "JetBrains Mono", monospace' },
        body: { value: 'var(--font-sans), "Inter", sans-serif' },
        mono: { value: 'var(--font-mono), "JetBrains Mono", monospace' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.neonGreen.500}' },
          muted: { value: '{colors.neonGreen.700}' },
          subtle: { value: 'rgba(0, 255, 65, 0.1)' },
          text: { value: '#ccffcc' },
        },
        surface: {
          DEFAULT: { value: '{colors.matrixBg.400}' },
          raised: { value: '{colors.matrixBg.100}' },
          overlay: { value: '{colors.matrixBg.200}' },
        },
      },
    },
  },
  globalCss: {
    'html, body': {
      bg: '#0a0a0a',
      color: '#ccffcc',
      fontFamily: 'var(--font-sans), Inter, sans-serif',
    },
    '::selection': {
      bg: '#00ff41',
      color: '#0a0a0a',
    },
    '::-webkit-scrollbar': { width: '6px' },
    '::-webkit-scrollbar-track': { bg: '#0a0a0a' },
    '::-webkit-scrollbar-thumb': { bg: '#00b32c', borderRadius: '3px' },
    a: { color: '#00ff41', transition: 'all 0.2s' },
    'a:hover': { color: '#39ff14', textDecoration: 'none' },
  },
})

export const system = createSystem(defaultConfig, config)
