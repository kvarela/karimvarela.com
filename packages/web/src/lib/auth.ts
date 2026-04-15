const TOKEN_KEY = 'auth_token'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(TOKEN_KEY)
}

interface JWTPayload {
  exp?: number
  sub?: string
  [key: string]: unknown
}

function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1]
    // Pad base64 if needed
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    const decoded = atob(padded)
    return JSON.parse(decoded) as JWTPayload
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  const token = getToken()
  if (!token) return false

  const payload = decodeJWT(token)
  if (!payload) return false

  // Check expiry if exp claim exists
  if (payload.exp) {
    const nowSeconds = Math.floor(Date.now() / 1000)
    if (nowSeconds >= payload.exp) {
      clearToken()
      return false
    }
  }

  return true
}
