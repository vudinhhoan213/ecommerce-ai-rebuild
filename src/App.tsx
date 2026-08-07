import { NavLink, Route, Routes } from 'react-router-dom'
import CartPage from './pages/CartPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'
import ShopPage from './pages/ShopPage'

const navigationItems = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/shop', label: 'Cửa hàng' },
  { to: '/products', label: 'Sản phẩm' },
  { to: '/cart', label: 'Giỏ hàng' },
  { to: '/login', label: 'Đăng nhập' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/">
          E-Commerce
        </NavLink>
        <nav aria-label="Điều hướng chính">
          <ul className="navigation-list">
            {navigationItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navigation-link active' : 'navigation-link'
                  }
                  end={end}
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
