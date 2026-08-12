import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { removeAuthSession } from './app/authStorage'
import { clearAuthSession } from './app/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const session = useAppSelector((state) => state.auth.session)

  function handleLogout() {
    removeAuthSession()
    dispatch(clearAuthSession())
    navigate('/shop', { replace: true })
  }

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
            {!session && (
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'navigation-link active' : 'navigation-link'
                  }
                  to="/login"
                >
                  Đăng nhập
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {session && (
          <div className="account-navigation">
            <span>
              {session.user.firstName} {session.user.lastName}
            </span>
            <button onClick={handleLogout} type="button">
              Đăng xuất
            </button>
          </div>
        )}
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/shop" />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductDetailsPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
