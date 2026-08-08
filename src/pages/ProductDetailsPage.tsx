import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import type { Product } from '../types/product'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resolvedProductId, setResolvedProductId] = useState(productId)

  useEffect(() => {
    const controller = new AbortController()

    if (!productId) {
      return () => controller.abort()
    }

    const requestedProductId = productId

    async function loadProduct() {
      try {
        const data = await getProduct(requestedProductId, controller.signal)

        if (data === null) {
          setProduct(null)
          setError(null)
          setIsNotFound(true)
        } else {
          setProduct(data)
          setError(null)
          setIsNotFound(false)
        }
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setProduct(null)
        setIsNotFound(false)
        setError(
          'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setResolvedProductId(requestedProductId)
          setIsLoading(false)
        }
      }
    }

    void loadProduct()

    return () => controller.abort()
  }, [productId])

  if (!productId) {
    return (
      <section>
        <h1>Không tìm thấy sản phẩm</h1>
        <p className="products-state" role="status">
          Sản phẩm bạn đang tìm không tồn tại.
        </p>
        <Link className="product-details-back-link" to="/shop">
          Quay lại danh sách sản phẩm
        </Link>
      </section>
    )
  }

  if (isLoading || resolvedProductId !== productId) {
    return (
      <section>
        <h1>Chi tiết sản phẩm</h1>
        <p className="products-state" role="status">
          Đang tải thông tin sản phẩm...
        </p>
      </section>
    )
  }

  if (isNotFound) {
    return (
      <section>
        <h1>Không tìm thấy sản phẩm</h1>
        <p className="products-state" role="status">
          Sản phẩm bạn đang tìm không tồn tại.
        </p>
        <Link className="product-details-back-link" to="/shop">
          Quay lại danh sách sản phẩm
        </Link>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>Chi tiết sản phẩm</h1>
        <p className="products-state products-state-error" role="alert">
          {error}
        </p>
      </section>
    )
  }

  if (!product) {
    return null
  }

  const mainImage = product.images[0] ?? product.thumbnail

  return (
    <section className="product-details">
      <div className="product-details-gallery">
        <div className="product-details-main-image-wrapper">
          <img
            alt={product.title}
            className="product-details-main-image"
            src={mainImage}
          />
        </div>

        {product.images.length > 1 && (
          <div
            aria-label="Các ảnh sản phẩm"
            className="product-details-image-list"
          >
            {product.images.map((image) => (
              <img
                alt={`Hình ảnh ${product.title}`}
                className="product-details-thumbnail"
                key={image}
                loading="lazy"
                src={image}
              />
            ))}
          </div>
        )}
      </div>

      <div className="product-details-content">
        <p className="product-details-id">Mã sản phẩm: {product.id}</p>
        <h1>{product.title}</h1>
        <p className="product-details-price">
          {priceFormatter.format(product.price)}
        </p>
        <p
          aria-label={`Đánh giá ${product.rating} trên 5`}
          className="product-details-rating"
        >
          <span aria-hidden="true">★</span> {product.rating} / 5
        </p>
        <p className="product-details-stock">Còn {product.stock} sản phẩm</p>
        <p className="product-details-description">{product.description}</p>

        <div className="product-details-actions">
          <button
            className="product-action-button product-action-button-primary"
            type="button"
          >
            Mua ngay
          </button>
          <button
            className="product-action-button product-action-button-secondary"
            type="button"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
