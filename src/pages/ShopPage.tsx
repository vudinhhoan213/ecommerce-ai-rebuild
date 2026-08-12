import { FilterOutlined, SearchOutlined } from '@ant-design/icons'
import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'
import type { Product } from '../types/product'

const ratingOptions = [0, 1, 2, 3, 4]

function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [minPriceInput, setMinPriceInput] = useState(
    () => searchParams.get('minPrice') ?? '0',
  )
  const [maxPriceInput, setMaxPriceInput] = useState(
    () => searchParams.get('maxPrice') ?? '',
  )
  const [priceError, setPriceError] = useState<string | null>(null)

  const searchQuery = searchParams.get('q') ?? ''
  const ratingParam = Number(searchParams.get('rating') ?? '0')
  const minimumRating = ratingOptions.includes(ratingParam) ? ratingParam : 0

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const data = await getProducts(controller.signal)
        setProducts(data.products)
        const highestPrice = Math.max(
          0,
          ...data.products.map((product) => product.price),
        )
        setMaxPriceInput((currentValue) =>
          currentValue === '' ? String(highestPrice) : currentValue,
        )
      } catch (requestError) {
        if (
          requestError instanceof DOMException &&
          requestError.name === 'AbortError'
        ) {
          return
        }

        setError(
          'Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.',
        )
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void loadProducts()

    return () => controller.abort()
  }, [])

  const maximumProductPrice = useMemo(
    () => Math.max(0, ...products.map((product) => product.price)),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
    const parsedMinPrice = Number(searchParams.get('minPrice') ?? '0')
    const parsedMaxPrice = Number(
      searchParams.get('maxPrice') ?? String(maximumProductPrice),
    )
    const hasValidPriceRange =
      Number.isFinite(parsedMinPrice) &&
      Number.isFinite(parsedMaxPrice) &&
      parsedMinPrice >= 0 &&
      parsedMinPrice < parsedMaxPrice
    const minimumPrice = hasValidPriceRange ? parsedMinPrice : 0
    const maximumPrice = hasValidPriceRange
      ? parsedMaxPrice
      : maximumProductPrice

    return products.filter((product) => {
      const matchesSearch = product.title
        .toLocaleLowerCase()
        .includes(normalizedQuery)
      const matchesPrice =
        product.price >= minimumPrice && product.price <= maximumPrice
      const matchesRating = product.rating >= minimumRating

      return matchesSearch && matchesPrice && matchesRating
    })
  }, [maximumProductPrice, minimumRating, products, searchParams, searchQuery])

  function updateSearchParam(name: string, value: string, defaultValue = '') {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams)

        if (value === defaultValue) {
          nextParams.delete(name)
        } else {
          nextParams.set(name, value)
        }

        return nextParams
      },
      { replace: true },
    )
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    updateSearchParam('q', event.target.value)
  }

  function updatePriceRange(nextMinPrice: string, nextMaxPrice: string) {
    setMinPriceInput(nextMinPrice)
    setMaxPriceInput(nextMaxPrice)

    const minimumPrice = Number(nextMinPrice)
    const maximumPrice = Number(nextMaxPrice)

    if (
      nextMinPrice.trim() === '' ||
      nextMaxPrice.trim() === '' ||
      !Number.isFinite(minimumPrice) ||
      !Number.isFinite(maximumPrice)
    ) {
      setPriceError('Giá tối thiểu và tối đa phải là số.')
      return
    }

    if (minimumPrice < 0) {
      setPriceError('Giá tối thiểu không được nhỏ hơn 0.')
      return
    }

    if (minimumPrice >= maximumPrice) {
      setPriceError('Giá tối thiểu phải nhỏ hơn giá tối đa.')
      return
    }

    setPriceError(null)
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams)

        if (minimumPrice === 0) {
          nextParams.delete('minPrice')
        } else {
          nextParams.set('minPrice', String(minimumPrice))
        }

        if (maximumPrice === maximumProductPrice) {
          nextParams.delete('maxPrice')
        } else {
          nextParams.set('maxPrice', String(maximumPrice))
        }

        return nextParams
      },
      { replace: true },
    )
  }

  function handleMinPriceChange(event: ChangeEvent<HTMLInputElement>) {
    updatePriceRange(event.target.value, maxPriceInput)
  }

  function handleMaxPriceChange(event: ChangeEvent<HTMLInputElement>) {
    updatePriceRange(minPriceInput, event.target.value)
  }

  function resetPriceFilter() {
    setMinPriceInput('0')
    setMaxPriceInput(String(maximumProductPrice))
    setPriceError(null)
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams)
        nextParams.delete('minPrice')
        nextParams.delete('maxPrice')
        return nextParams
      },
      { replace: true },
    )
  }

  function handleRatingChange(event: ChangeEvent<HTMLSelectElement>) {
    updateSearchParam('rating', event.target.value, '0')
  }

  let content

  if (isLoading) {
    content = (
      <p className="products-state" role="status">
        Đang tải sản phẩm...
      </p>
    )
  } else if (error) {
    content = (
      <p className="products-state products-state-error" role="alert">
        {error}
      </p>
    )
  } else if (products.length === 0) {
    content = (
      <p className="products-state" role="status">
        Không có sản phẩm để hiển thị.
      </p>
    )
  } else if (filteredProducts.length === 0) {
    content = (
      <p className="products-state" role="status">
        Không tìm thấy sản phẩm phù hợp.
      </p>
    )
  } else {
    content = (
      <div aria-label="Danh sách sản phẩm" className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <section>
      <h1>Cửa hàng</h1>
      {!isLoading && !error && products.length > 0 && (
        <div aria-label="Tìm kiếm và lọc sản phẩm" className="shop-toolbar">
          <label className="shop-search-control">
            <span className="shop-control-label">
              <SearchOutlined aria-hidden="true" /> Tìm kiếm
            </span>
            <input
              className="shop-control-input"
              onChange={handleSearchChange}
              placeholder="Nhập tên sản phẩm"
              type="search"
              value={searchQuery}
            />
          </label>

          <fieldset className="shop-filter-panel">
            <legend className="shop-control-label">
              <FilterOutlined aria-hidden="true" /> Bộ lọc
            </legend>
            <div className="shop-filter-controls">
              <label>
                <span>Giá tối thiểu (USD)</span>
                <input
                  aria-describedby={priceError ? 'price-filter-error' : undefined}
                  aria-invalid={Boolean(priceError)}
                  className="shop-control-input"
                  min="0"
                  onChange={handleMinPriceChange}
                  step="0.01"
                  type="number"
                  value={minPriceInput}
                />
              </label>
              <label>
                <span>Giá tối đa (USD)</span>
                <input
                  aria-describedby={priceError ? 'price-filter-error' : undefined}
                  aria-invalid={Boolean(priceError)}
                  className="shop-control-input"
                  min="0"
                  onChange={handleMaxPriceChange}
                  step="0.01"
                  type="number"
                  value={maxPriceInput}
                />
              </label>
              <label>
                <span>Đánh giá tối thiểu</span>
                <select
                  className="shop-control-input"
                  onChange={handleRatingChange}
                  value={minimumRating}
                >
                  {ratingOptions.map((rating) => (
                    <option key={rating} value={rating}>
                      {rating === 0 ? 'Tất cả' : `Từ ${rating} sao`}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="price-filter-reset"
                onClick={resetPriceFilter}
                type="button"
              >
                Đặt lại giá
              </button>
            </div>
            {priceError && (
              <p className="price-filter-error" id="price-filter-error" role="alert">
                {priceError}
              </p>
            )}
          </fieldset>
          <p aria-live="polite" className="shop-results-summary">
            Hiển thị {filteredProducts.length} / {products.length} sản phẩm
          </p>
        </div>
      )}
      {content}
    </section>
  )
}

export default ShopPage
