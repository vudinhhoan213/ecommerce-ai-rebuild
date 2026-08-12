import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
} from '../types/auth'

const LOGIN_ENDPOINT = 'https://dummyjson.com/auth/login'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isLoginResponse(value: unknown): value is AuthUser & {
  accessToken: string
  refreshToken: string
} {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.id === 'number' &&
    typeof value.username === 'string' &&
    typeof value.email === 'string' &&
    typeof value.firstName === 'string' &&
    typeof value.lastName === 'string' &&
    typeof value.gender === 'string' &&
    typeof value.image === 'string' &&
    typeof value.accessToken === 'string' &&
    typeof value.refreshToken === 'string'
  )
}

export async function login(
  credentials: LoginCredentials,
  signal?: AbortSignal,
): Promise<AuthSession> {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
    signal,
  })

  if (response.status === 400 || response.status === 401) {
    throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.')
  }

  if (!response.ok) {
    throw new Error(`Không thể đăng nhập (${response.status})`)
  }

  const data: unknown = await response.json()

  if (!isLoginResponse(data)) {
    throw new Error('Dữ liệu đăng nhập không hợp lệ.')
  }

  const {
    accessToken,
    refreshToken,
    id,
    username,
    email,
    firstName,
    lastName,
    gender,
    image,
  } = data

  return {
    user: { id, username, email, firstName, lastName, gender, image },
    accessToken,
    refreshToken,
  }
}
