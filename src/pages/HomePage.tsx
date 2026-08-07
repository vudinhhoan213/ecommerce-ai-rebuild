import { useSelector } from 'react-redux'
import type { RootState } from '../app/store'

function HomePage() {
  const isInitialized = useSelector(
    (state: RootState) => state.app.initialized,
  )

  return (
    <section>
      <h1>Trang chủ</h1>
      <p>Nền tảng cửa hàng đã {isInitialized ? 'sẵn sàng' : 'chưa sẵn sàng'}.</p>
    </section>
  )
}

export default HomePage
