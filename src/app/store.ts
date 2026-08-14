import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import { saveCartItems } from './cartStorage'

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
    cart: cartReducer,
  },
})

let currentCartItems = store.getState().cart.items

store.subscribe(() => {
  const nextCartItems = store.getState().cart.items

  if (nextCartItems !== currentCartItems) {
    currentCartItems = nextCartItems
    saveCartItems(nextCartItems)
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
