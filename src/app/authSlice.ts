import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthSession } from '../types/auth'
import { loadAuthSession } from './authStorage'

interface AuthState {
  session: AuthSession | null
}

const initialState: AuthState = {
  session: loadAuthSession(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSession(state, action: PayloadAction<AuthSession>) {
      state.session = action.payload
    },
    clearAuthSession(state) {
      state.session = null
    },
  },
})

export const { clearAuthSession, setAuthSession } = authSlice.actions
export default authSlice.reducer
