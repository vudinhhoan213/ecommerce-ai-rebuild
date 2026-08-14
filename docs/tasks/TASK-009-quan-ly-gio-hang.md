# TASK-009: Quản lý giỏ hàng

## Mục tiêu

Cho phép Customer thêm sản phẩm đã chọn màu vào giỏ và quản lý giỏ hàng ở frontend.

## Yêu cầu

- Quản lý giỏ hàng bằng Redux Toolkit.
- Lưu giỏ vào `localStorage` để không mất dữ liệu sau khi F5.
- Chỉ Customer đã đăng nhập được xem và thêm sản phẩm vào giỏ.
- Guest bấm `Thêm vào giỏ hàng` được chuyển đến `/login`, sau đăng nhập quay lại trang sản phẩm.
- Customer phải chọn màu trước khi thêm sản phẩm.
- Cùng sản phẩm và cùng màu sẽ tăng số lượng; màu khác tạo mục riêng.
- Số lượng không được nhỏ hơn 1 hoặc vượt quá `stock`.
- Trang `/cart` hiển thị ảnh, tên, giá, màu, số lượng và thành tiền.
- Cho phép tăng, giảm và xóa sản phẩm.
- Hiển thị tổng số lượng và tổng tiền.
- Hiển thị trạng thái giỏ hàng trống.
- Hiển thị số lượng sản phẩm trên thanh điều hướng.
- Đăng xuất không xóa giỏ hàng; Guest chỉ không được phép truy cập `/cart`.
- Khi đăng nhập lại, Customer tiếp tục thấy giỏ hàng đã lưu.
- Giao diện responsive.

## Ngoài phạm vi

- Không triển khai thanh toán hoặc đặt hàng.
- Không gọi API giỏ hàng của DummyJSON.
- Không thay đổi giá hoặc tồn kho theo màu.
- Không triển khai nút `Mua ngay`.
- Không thêm dependency.

## Tiêu chí hoàn thành

- Thêm đúng sản phẩm và màu đã chọn vào giỏ.
- Sản phẩm trùng màu tăng số lượng, khác màu tạo mục mới.
- Không thể tăng số lượng vượt tồn kho.
- Thay đổi giỏ được giữ sau khi tải lại trang.
- Tổng số lượng, thành tiền và tổng tiền tính đúng.
- Xóa sản phẩm và trạng thái giỏ trống hoạt động đúng.
- Guest được chuyển đến đăng nhập và quay lại đúng trang sản phẩm.
- Đăng xuất không làm mất giỏ hàng; đăng nhập lại vẫn xem được dữ liệu cũ.
- Các chức năng hiện có vẫn hoạt động.
- Lint và build thành công.
