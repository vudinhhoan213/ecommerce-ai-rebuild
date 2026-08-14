export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface UserAddress {
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface UserProfile extends AuthUser {
  phone: string
  address: UserAddress
}
