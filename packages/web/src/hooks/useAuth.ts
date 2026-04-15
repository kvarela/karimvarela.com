import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isAuthenticated as checkAuth } from '@/lib/auth'

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: (token: string) => {
        set({ token, isAuthenticated: true })
      },
      logout: () => {
        set({ token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // After rehydration, verify the token is still valid
        if (state?.token && !checkAuth()) {
          state.token = null
          state.isAuthenticated = false
        }
      },
    },
  ),
)
