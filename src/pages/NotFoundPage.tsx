import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h1>404 - Không tìm thấy trang</h1>
      <p>Đường dẫn bạn truy cập không tồn tại.</p>
      <Link to="/shop">Quay về cửa hàng</Link>
    </section>
  )
}

export default NotFoundPage
