import type { AuthSession } from '../types/auth'

const AUTH_STORAGE_KEY = 'ecommerce-auth-session'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!isRecord(value) || !isRecord(value.user)) {
    return false
  }

  const { user } = value

  return (
    typeof value.accessToken === 'string' &&
    value.accessToken.length > 0 &&
    typeof value.refreshToken === 'string' &&
    value.refreshToken.length > 0 &&
    typeof user.id === 'number' &&
    typeof user.username === 'string' &&
    typeof user.email === 'string' &&
    typeof user.firstName === 'string' &&
    typeof user.lastName === 'string' &&
    typeof user.gender === 'string' &&
    typeof user.image === 'string'
  )
}

export function loadAuthSession(): AuthSession | null {
  try {
    const storedValue = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    const session: unknown = JSON.parse(storedValue)

    if (!isAuthSession(session)) {
      removeAuthSession()
      return null
    }

    return session
  } catch {
    removeAuthSession()
    return null
  }
}

export function saveAuthSession(session: AuthSession): boolean {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    return true
  } catch {
    return false
  }
}

export function removeAuthSession() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch {
    // Redux state is still cleared when browser storage is unavailable.
  }
}
