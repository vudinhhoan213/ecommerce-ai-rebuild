import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { getCurrentUserProfile } from '../services/authService'
import type { UserProfile } from '../types/auth'

function ProfilePage() {
  const accessToken = useAppSelector(
    (state) => state.auth.session?.accessToken ?? null,
  )
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    if (!accessToken) {
      return () => controller.abort()
    }

    const currentAccessToken = accessToken

    async function loadProfile() {
      try {
        const data = await getCurrentUserProfile(
          currentAccessToken,
          controller.signal,
        )
        setProfile(data)
        setError(null)
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setProfile(null)
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'Không thể tải thông tin cá nhân.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProfile()

    return () => controller.abort()
  }, [accessToken, requestVersion])

  function retryLoadingProfile() {
    setProfile(null)
    setError(null)
    setIsLoading(true)
    setRequestVersion((version) => version + 1)
  }

  if (!accessToken) {
    return (
      <section className="profile-page">
        <h1>Hồ sơ</h1>
        <p className="profile-state">Không có thông tin cá nhân để hiển thị.</p>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section className="profile-page">
        <h1>Hồ sơ</h1>
        <p className="profile-state" role="status">
          Đang tải thông tin cá nhân...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="profile-page">
        <h1>Hồ sơ</h1>
        <div className="profile-state profile-state-error" role="alert">
          <p>{error}</p>
          <button onClick={retryLoadingProfile} type="button">
            Thử lại
          </button>
        </div>
      </section>
    )
  }

  if (!profile) {
    return (
      <section className="profile-page">
        <h1>Hồ sơ</h1>
        <p className="profile-state" role="status">
          Không có thông tin cá nhân để hiển thị.
        </p>
      </section>
    )
  }

  const fullName = `${profile.firstName} ${profile.lastName}`.trim()
  const fullAddress = [
    profile.address.address,
    profile.address.city,
    profile.address.state,
    profile.address.postalCode,
    profile.address.country,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <section className="profile-page">
      <h1>Hồ sơ</h1>
      <div className="profile-card">
        <img
          alt={`Ảnh đại diện của ${fullName}`}
          className="profile-avatar"
          src={profile.image}
        />
        <div className="profile-content">
          <h2>{fullName}</h2>
          <dl className="profile-details">
            <div>
              <dt>Email</dt>
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>Số điện thoại</dt>
              <dd>{profile.phone}</dd>
            </div>
            <div>
              <dt>Địa chỉ</dt>
              <dd>{fullAddress}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
