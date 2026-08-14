import type { ProductColor } from '../utils/productColors'

export interface CartItem {
  id: string
  productId: number
  title: string
  price: number
  thumbnail: string
  color: ProductColor
  quantity: number
  stock: number
}

export type NewCartItem = Omit<CartItem, 'id' | 'quantity'>
