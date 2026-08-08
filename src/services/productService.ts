import type { Product, ProductsResponse } from '../types/product'

const PRODUCTS_ENDPOINT = 'https://dummyjson.com/products'

export async function getProducts(
  signal?: AbortSignal,
): Promise<ProductsResponse> {
  const response = await fetch(PRODUCTS_ENDPOINT, { signal })

  if (!response.ok) {
    throw new Error(`Không thể tải sản phẩm (${response.status})`)
  }

  const data = (await response.json()) as ProductsResponse

  if (!Array.isArray(data.products)) {
    throw new Error('Dữ liệu sản phẩm không hợp lệ')
  }

  return data
}

export async function getProduct(
  productId: string,
  signal?: AbortSignal,
): Promise<Product | null> {
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}/${encodeURIComponent(productId)}`,
    { signal },
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Không thể tải sản phẩm (${response.status})`)
  }

  const data = (await response.json()) as Product

  if (
    typeof data.id !== 'number' ||
    typeof data.title !== 'string' ||
    typeof data.price !== 'number'
  ) {
    throw new Error('Dữ liệu sản phẩm không hợp lệ')
  }

  return data
}
