import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProfilePage from './pages/ProfilePage'
import ShopPage from './pages/ShopPage'

const navigationItems = [
  { to: '/shop', label: 'Cửa hàng' },
  { to: '/cart', label: 'Giỏ hàng' },
  { to: '/profile', label: 'Hồ sơ' },
]

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/shop">
          E-Commerce
        </NavLink>
        <nav aria-label="Điều hướng chính">
          <ul className="navigation-list">
            {navigationItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navigation-link active' : 'navigation-link'
                  }
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
          <Route path="/" element={<Navigate replace to="/shop" />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
