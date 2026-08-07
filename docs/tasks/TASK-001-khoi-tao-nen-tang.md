# TASK-001: Khởi tạo nền tảng dự án

## Mục tiêu

Khởi tạo frontend React cho website thương mại điện tử.

Sau nhiệm vụ này, ứng dụng phải chạy được, có routing cơ bản
và Redux Toolkit được cấu hình.

## Yêu cầu

- Khởi tạo React bằng Vite trong repository hiện tại.
- Sử dụng TypeScript.
- Cài đặt React Router.
- Cài đặt Redux Toolkit và React Redux.
- Tạo Redux store bằng `configureStore`.
- Bọc ứng dụng bằng Redux `Provider`.
- Tạo các trang tạm cho các route:
  - `/`
  - `/shop`
  - `/products`
  - `/products/:productId`
  - `/cart`
  - `/login`
  - `*` cho trang không tồn tại
- Trang chi tiết sản phẩm phải đọc được `productId` từ URL.
- Viết hướng dẫn chạy project trong `README.md`.

## Ngoài phạm vi

- Chưa làm giao diện sản phẩm hoàn chỉnh.
- Chưa làm giỏ hàng.
- Chưa làm đăng nhập.
- Chưa gọi API.
- Không có trang hoặc vai trò Admin.
- Không tạo backend hoặc database.

## Tiêu chí hoàn thành

- `npm run dev` khởi động được ứng dụng.
- Các route tạm đều truy cập được.
- `/products/123` hiển thị được mã sản phẩm `123`.
- Redux store và `Provider` hoạt động không báo lỗi.
- Đường dẫn không tồn tại hiển thị trang Not Found.
- `npm run lint` thành công.
- `npm run build` thành công.
