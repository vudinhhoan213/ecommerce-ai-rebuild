# TASK-002: Bỏ trang chủ

## Mục tiêu

Dùng trang Shop làm điểm vào chính của website và loại bỏ trang chủ không còn
cần thiết.

## Yêu cầu

- Route `/` chuyển hướng đến `/shop` bằng `Navigate` và `replace`.
- Logo của website liên kết trực tiếp đến `/shop`.
- Bỏ mục điều hướng Trang chủ.
- Xóa `HomePage` và các import không còn sử dụng.
- Cập nhật tài liệu kiến trúc theo routing mới.

## Ngoài phạm vi

- Chưa triển khai xác thực đăng nhập.
- Chưa triển khai bảo vệ route.
- Chưa triển khai trang thông tin cá nhân.
- Không thay đổi Redux store.

## Tiêu chí hoàn thành

- Truy cập `/` chuyển sang `/shop`.
- `/shop` hiển thị `ShopPage`.
- Thanh điều hướng không còn mục Trang chủ.
- Source code không còn `HomePage`.
- `npm run lint` thành công.
- `npm run build` thành công.
