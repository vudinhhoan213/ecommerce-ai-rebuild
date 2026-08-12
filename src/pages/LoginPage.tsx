import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { saveAuthSession } from '../app/authStorage'
import { setAuthSession } from '../app/authSlice'
import { login } from '../services/authService'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getReturnUrl(locationState: unknown): string {
  if (!isRecord(locationState) || !isRecord(locationState.from)) {
    return '/shop'
  }

  const { pathname, search, hash } = locationState.from

  if (pathname !== '/cart' && pathname !== '/profile') {
    return '/shop'
  }

  return `${pathname}${typeof search === 'string' ? search : ''}${
    typeof hash === 'string' ? hash : ''
  }`
}

function LoginPage() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(
    (state) => state.auth.session !== null,
  )
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isAuthenticated) {
    return <Navigate replace to="/shop" />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const session = await login({
        username: username.trim(),
        password,
      })

      if (!saveAuthSession(session)) {
        setError('Không thể lưu phiên đăng nhập trên trình duyệt này.')
        return
      }

      dispatch(setAuthSession(session))
      navigate(getReturnUrl(location.state), { replace: true })
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Không thể đăng nhập. Vui lòng thử lại sau.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="login-page">
      <h1>Đăng nhập</h1>
      <p className="login-introduction">
        Sử dụng tài khoản người dùng DummyJSON để tiếp tục.
      </p>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          <span>Tên đăng nhập</span>
          <input
            autoComplete="username"
            disabled={isSubmitting}
            onChange={(event) => setUsername(event.target.value)}
            required
            type="text"
            value={username}
          />
        </label>
        <label>
          <span>Mật khẩu</span>
          <input
            autoComplete="current-password"
            disabled={isSubmitting}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <button className="login-submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </section>
  )
}

export default LoginPage
