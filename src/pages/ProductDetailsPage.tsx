import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getProduct } from '../services/productService'
import type { Product } from '../types/product'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const visibleThumbnailCount = 3

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()
  const { search } = useLocation()
  const shopUrl = `/shop${search}`
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isNotFound, setIsNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resolvedProductId, setResolvedProductId] = useState(productId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0)

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
          setSelectedImageIndex(0)
          setThumbnailStartIndex(0)
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
        <Link className="product-details-back-link" to={shopUrl}>
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
        <Link className="product-details-back-link" to={shopUrl}>
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

  const productImages =
    product.images.length > 0 ? product.images : [product.thumbnail]
  const mainImage = productImages[selectedImageIndex] ?? product.thumbnail
  const lastThumbnailStartIndex = Math.max(
    0,
    productImages.length - visibleThumbnailCount,
  )
  const visibleImages = productImages.slice(
    thumbnailStartIndex,
    thumbnailStartIndex + visibleThumbnailCount,
  )
  const hasThumbnailNavigation = productImages.length > visibleThumbnailCount

  return (
    <section className="product-details">
      <div className="product-details-gallery">
        <div className="product-details-main-image-wrapper">
          <img
            alt={`${product.title} - ảnh ${selectedImageIndex + 1}`}
            className="product-details-main-image"
            src={mainImage}
          />
        </div>

        {productImages.length > 1 && (
          <div
            aria-label="Các ảnh sản phẩm"
            className={`product-details-gallery-controls${
              hasThumbnailNavigation ? '' : ' without-navigation'
            }`}
          >
            {hasThumbnailNavigation && (
              <button
                aria-label="Xem các ảnh trước"
                className="product-details-gallery-arrow"
                disabled={thumbnailStartIndex === 0}
                onClick={() =>
                  setThumbnailStartIndex((currentIndex) =>
                    Math.max(0, currentIndex - 1),
                  )
                }
                type="button"
              >
                <span aria-hidden="true">‹</span>
              </button>
            )}

            <div className="product-details-image-list">
              {visibleImages.map((image, visibleIndex) => {
                const imageIndex = thumbnailStartIndex + visibleIndex

                return (
                  <button
                    aria-label={`Xem ảnh ${imageIndex + 1} của ${product.title}`}
                    aria-pressed={selectedImageIndex === imageIndex}
                    className={`product-details-thumbnail-button${
                      selectedImageIndex === imageIndex ? ' selected' : ''
                    }`}
                    key={`${image}-${imageIndex}`}
                    onClick={() => setSelectedImageIndex(imageIndex)}
                    type="button"
                  >
                    <img
                      alt=""
                      className="product-details-thumbnail"
                      loading="lazy"
                      src={image}
                    />
                  </button>
                )
              })}
            </div>

            {hasThumbnailNavigation && (
              <button
                aria-label="Xem các ảnh tiếp theo"
                className="product-details-gallery-arrow"
                disabled={thumbnailStartIndex === lastThumbnailStartIndex}
                onClick={() =>
                  setThumbnailStartIndex((currentIndex) =>
                    Math.min(lastThumbnailStartIndex, currentIndex + 1),
                  )
                }
                type="button"
              >
                <span aria-hidden="true">›</span>
              </button>
            )}
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
