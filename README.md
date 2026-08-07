# E-Commerce Frontend

Nền tảng frontend React cho website thương mại điện tử. Dự án hiện chỉ bao gồm
các trang tạm, routing cơ bản và Redux Toolkit; chưa triển khai chức năng nghiệp
vụ, backend hoặc database.

## Yêu cầu

- Node.js
- npm

## Cài đặt

```bash
npm install
```

## Chạy môi trường phát triển

```bash
npm run dev
```

Mở địa chỉ được Vite hiển thị trên terminal, mặc định là
`http://localhost:5173`.

## Kiểm tra mã nguồn

```bash
npm run lint
```

## Build production

```bash
npm run build
```

## Các route hiện có

- `/` - Trang chủ
- `/shop` - Cửa hàng
- `/products` - Danh sách sản phẩm
- `/products/:productId` - Chi tiết sản phẩm
- `/cart` - Giỏ hàng
- `/login` - Đăng nhập
- Các đường dẫn khác hiển thị trang Not Found
