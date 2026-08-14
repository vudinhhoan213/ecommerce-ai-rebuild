import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  decreaseCartItem,
  increaseCartItem,
  removeCartItem,
} from '../app/cartSlice'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

function CartPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0,
  )
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  if (items.length === 0) {
    return (
      <section className="cart-page">
        <h1>Giỏ hàng</h1>
        <div className="cart-empty-state">
          <p>Giỏ hàng của bạn đang trống.</p>
          <Link to="/shop">Tiếp tục mua sắm</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h1>Giỏ hàng</h1>
      <div className="cart-layout">
        <ul aria-label="Sản phẩm trong giỏ" className="cart-list">
          {items.map((item) => (
            <li className="cart-item" key={item.id}>
              <Link className="cart-item-image-link" to={`/shop/${item.productId}`}>
                <img alt={item.title} src={item.thumbnail} />
              </Link>

              <div className="cart-item-content">
                <Link className="cart-item-title" to={`/shop/${item.productId}`}>
                  {item.title}
                </Link>
                <p className="cart-item-color">
                  <span
                    aria-hidden="true"
                    className="cart-item-color-swatch"
                    style={{ backgroundColor: item.color.value }}
                  />
                  Màu: {item.color.name}
                </p>
                <p className="cart-item-price">
                  Đơn giá: {priceFormatter.format(item.price)}
                </p>

                <div className="cart-item-quantity">
                  <span>Số lượng</span>
                  <div className="cart-quantity-controls">
                    <button
                      aria-label={`Giảm số lượng ${item.title} màu ${item.color.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() => dispatch(decreaseCartItem(item.id))}
                      type="button"
                    >
                      −
                    </button>
                    <span aria-live="polite">{item.quantity}</span>
                    <button
                      aria-label={`Tăng số lượng ${item.title} màu ${item.color.name}`}
                      disabled={item.quantity >= item.stock}
                      onClick={() => dispatch(increaseCartItem(item.id))}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                  {item.quantity >= item.stock && (
                    <span className="cart-stock-limit">Đã đạt giới hạn tồn kho</span>
                  )}
                </div>
              </div>

              <div className="cart-item-summary">
                <strong>{priceFormatter.format(item.price * item.quantity)}</strong>
                <button
                  className="cart-remove-button"
                  onClick={() => dispatch(removeCartItem(item.id))}
                  type="button"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>

        <aside aria-label="Tổng giỏ hàng" className="cart-summary">
          <h2>Tổng cộng</h2>
          <p>
            <span>Số lượng</span>
            <strong>{totalQuantity}</strong>
          </p>
          <p>
            <span>Tổng tiền</span>
            <strong>{priceFormatter.format(totalPrice)}</strong>
          </p>
        </aside>
      </div>
    </section>
  )
}

export default CartPage
