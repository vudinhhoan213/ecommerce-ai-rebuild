import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

const initialState = {
  initialized: true,
}

function appReducer(state = initialState) {
  return state
}

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
