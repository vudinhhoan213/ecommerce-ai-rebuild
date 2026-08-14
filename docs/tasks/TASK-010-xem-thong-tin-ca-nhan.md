# TASK-010: Xem thông tin cá nhân

## Mục tiêu

Cho phép Customer xem thông tin cá nhân lấy từ DummyJSON.

## Yêu cầu

- Chỉ Customer đã đăng nhập được truy cập `/profile`.
- Guest truy cập `/profile` được chuyển đến `/login` và quay lại sau khi đăng nhập.
- Gọi `GET https://dummyjson.com/auth/me` với `accessToken` hiện tại.
- Hiển thị ảnh đại diện, họ tên, email, số điện thoại và địa chỉ.
- Địa chỉ gồm thông tin có sẵn như số nhà, thành phố, bang và quốc gia.
- Có trạng thái loading, error và không có dữ liệu.
- Cho phép thử tải lại khi API gặp lỗi.
- Giao diện responsive.

## Ngoài phạm vi

- Không chỉnh sửa thông tin cá nhân.
- Không tải ảnh đại diện mới.
- Không đổi mật khẩu hoặc làm mới token.
- Không tạo backend và không thêm dependency.

## Tiêu chí hoàn thành

- Customer xem được đúng thông tin tài khoản đang đăng nhập.
- Guest được chuyển đến đăng nhập và quay lại `/profile`.
- Loading, error, retry và empty state hoạt động đúng.
- Không hiển thị password hoặc token trên giao diện.
- Các chức năng hiện có vẫn hoạt động.
- Lint và build thành công.
