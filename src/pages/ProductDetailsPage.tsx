import { useParams } from 'react-router-dom'

function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>()

  return (
    <section>
      <h1>Chi tiết sản phẩm</h1>
      <p>Mã sản phẩm: {productId}</p>
    </section>
  )
}

export default ProductDetailsPage
