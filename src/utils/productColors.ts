export interface ProductColor {
  id: string
  name: string
  value: string
}

const colorPalette: ProductColor[] = [
  { id: 'black', name: 'Đen', value: '#111827' },
  { id: 'white', name: 'Trắng', value: '#f8fafc' },
  { id: 'blue', name: 'Xanh dương', value: '#2563eb' },
  { id: 'red', name: 'Đỏ', value: '#dc2626' },
  { id: 'green', name: 'Xanh lá', value: '#16a34a' },
  { id: 'purple', name: 'Tím', value: '#7c3aed' },
  { id: 'pink', name: 'Hồng', value: '#db2777' },
  { id: 'yellow', name: 'Vàng', value: '#eab308' },
]

export function getProductColors(productId: number): ProductColor[] {
  const colorCount = 2 + (Math.abs(productId) % 3)
  const startIndex = Math.abs(productId * 3) % colorPalette.length

  return Array.from({ length: colorCount }, (_, index) => {
    const paletteIndex = (startIndex + index * 3) % colorPalette.length
    return colorPalette[paletteIndex]
  })
}
