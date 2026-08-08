import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const data = await getProducts(controller.signal)
        setProducts(data.products)
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setError(
          'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [])

  let content

  if (isLoading) {
    content = (
      <p className="products-state" role="status">
        Đang tải sản phẩm...
      </p>
    )
  } else if (error) {
    content = (
      <p className="products-state products-state-error" role="alert">
        {error}
      </p>
    )
  } else if (products.length === 0) {
    content = (
      <p className="products-state" role="status">
        Không có sản phẩm để hiển thị.
      </p>
    )
  } else {
    content = (
      <div aria-label="Danh sách sản phẩm" className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <section>
      <h1>Cửa hàng</h1>
      {content}
    </section>
  )
}

export default ShopPage
