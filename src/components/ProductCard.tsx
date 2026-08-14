import { Link, useLocation } from 'react-router-dom'
import type { Product } from '../types/product'
import { getProductColors } from '../utils/productColors'

interface ProductCardProps {
  product: Product
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductCard({ product }: ProductCardProps) {
  const { search } = useLocation()
  const productColors = getProductColors(product.id)
  const colorNames = productColors.map((color) => color.name).join(', ')

  return (
    <article className="product-card">
      <Link
        aria-label={`Xem chi tiết ${product.title}. Màu có sẵn: ${colorNames}`}
        className="product-card-link"
        to={`/shop/${product.id}${search}`}
      >
        <div className="product-card-image-wrapper">
          <img
            alt={product.title}
            className="product-card-image"
            loading="lazy"
            src={product.thumbnail}
          />
        </div>
        <div className="product-card-content">
          <h2 className="product-card-title">{product.title}</h2>
          <p className="product-card-price">
            {priceFormatter.format(product.price)}
          </p>
          <div aria-hidden="true" className="product-card-colors">
            {productColors.map((color) => (
              <span
                className="product-card-color-swatch"
                key={color.id}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
