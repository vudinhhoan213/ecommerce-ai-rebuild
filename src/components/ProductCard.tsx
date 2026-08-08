import { Link } from 'react-router-dom'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        aria-label={`Xem chi tiết ${product.title}`}
        className="product-card-link"
        to={`/shop/${product.id}`}
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
        </div>
      </Link>
    </article>
  )
}

export default ProductCard
