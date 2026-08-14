import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CartItem, NewCartItem } from '../types/cart'
import { loadCartItems } from './cartStorage'

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: loadCartItems(),
}

function createCartItemId(productId: number, colorId: string) {
  return `${productId}:${colorId}`
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<NewCartItem>) {
      const itemId = createCartItemId(
        action.payload.productId,
        action.payload.color.id,
      )
      const existingItem = state.items.find((item) => item.id === itemId)

      if (existingItem) {
        existingItem.stock = action.payload.stock
        existingItem.quantity = Math.min(
          existingItem.quantity + 1,
          action.payload.stock,
        )
        return
      }

      if (action.payload.stock < 1) {
        return
      }

      state.items.push({
        ...action.payload,
        id: itemId,
        quantity: 1,
      })
    },
    increaseCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload)

      if (item && item.quantity < item.stock) {
        item.quantity += 1
      }
    },
    decreaseCartItem(state, action: PayloadAction<string>) {
      const item = state.items.find((cartItem) => cartItem.id === action.payload)

      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const {
  addCartItem,
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} = cartSlice.actions
export default cartSlice.reducer
