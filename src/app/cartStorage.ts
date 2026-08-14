import type { CartItem } from '../types/cart'

const CART_STORAGE_KEY = 'ecommerce-cart'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isCartItem(value: unknown): value is CartItem {
  if (!isRecord(value) || !isRecord(value.color)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    typeof value.productId === 'number' &&
    typeof value.title === 'string' &&
    typeof value.price === 'number' &&
    value.price >= 0 &&
    typeof value.thumbnail === 'string' &&
    typeof value.quantity === 'number' &&
    Number.isInteger(value.quantity) &&
    typeof value.stock === 'number' &&
    Number.isInteger(value.stock) &&
    value.quantity >= 1 &&
    value.quantity <= value.stock &&
    typeof value.color.id === 'string' &&
    typeof value.color.name === 'string' &&
    typeof value.color.value === 'string'
  )
}

export function loadCartItems(): CartItem[] {
  try {
    const storedValue = localStorage.getItem(CART_STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    const items: unknown = JSON.parse(storedValue)

    if (!Array.isArray(items) || !items.every(isCartItem)) {
      removeStoredCart()
      return []
    }

    return items
  } catch {
    removeStoredCart()
    return []
  }
}

export function saveCartItems(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // The in-memory cart remains usable when browser storage is unavailable.
  }
}

function removeStoredCart() {
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch {
    // Storage can be unavailable in restricted browser contexts.
  }
}
