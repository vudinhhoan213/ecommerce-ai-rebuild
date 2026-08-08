# Danh sách chức năng

Tài liệu này mô tả các chức năng chính của website thương mại điện tử

## Giới hạn triển khai

Project chỉ triển khai frontend.

- Dữ liệu sản phẩm và người dùng được lấy từ nguồn dữ liệu có sẵn hoặc
  dữ liệu mô phỏng.
- Tìm kiếm và lọc được thực hiện trên dữ liệu sản phẩm ở frontend.
- Đăng nhập chỉ được mô phỏng, không thực hiện xác thực phía server.
- Giỏ hàng chỉ được quản lý trên frontend.
- Thông tin cá nhân không được lưu vào database thật.
- Không thực hiện thanh toán thật.

## Quyền truy cập

### Guest

Guest có thể xem danh sách, xem chi tiết, tìm kiếm sản phẩm và đăng nhập.

Khi Guest xem giỏ hàng, thêm sản phẩm vào giỏ hàng hoặc xem thông tin
cá nhân, hệ thống chuyển Guest đến trang đăng nhập.

### Customer

Customer đã đăng nhập có thể sử dụng tất cả chức năng của website.

## F01 - Xem danh sách sản phẩm

Người dùng có thể xem danh sách các sản phẩm.

Mỗi sản phẩm hiển thị các thông tin cơ bản:

- Ảnh
- Tên
- Giá
- Điểm đánh giá
- Các màu có sẵn

Người dùng có thể chọn một sản phẩm để xem chi tiết

## F02 - Xem chi tiết sản phẩm

Người dùng có thể xem thông tin chi tiết của một sản phẩm

Thông tin bao gồm

- Ảnh
- Tên
- Giá
- Điểm đánh giá
- Mô tả
- Các màu có sẵn

Người dùng có thể chọn một màu trước khi thêm sản phẩm vào giỏ hàng.

## F03 - Tìm kiếm và lọc sản phẩm

Guest và Customer có thể tìm kiếm sản phẩm theo tên.

Guest và Customer có thể lọc sản phẩm theo:

- Khoảng giá
- Mức đánh giá tối thiểu

Người dùng có thể kết hợp từ khóa tìm kiếm với các điều kiện lọc.

Hệ thống hiển thị các sản phẩm thỏa mãn tất cả điều kiện đã chọn.

Các trạng thái cần xử lý:

- Đang tải sản phẩm
- Không tải được sản phẩm
- Không có sản phẩm phù hợp

## F04 - Quản lý giỏ hàng

Chức năng này chỉ dành cho Customer đã đăng nhập.

Customer có thể:

- Thêm sản phẩm vào giỏ hàng
- Xem các sản phẩm trong giỏ
- Thay đổi số lượng
- Xóa sản phẩm
- Xem tổng tiền

Mỗi sản phẩm trong giỏ hàng hiển thị:

- Tên sản phẩm
- Ảnh
- Giá
- Màu đã chọn
- Số lượng
- Thành tiền

Khi thêm lại cùng một sản phẩm với cùng màu, hệ thống tăng số lượng
của mục đã có trong giỏ hàng.

Các màu khác nhau của cùng một sản phẩm được quản lý như các mục riêng
biệt trong giỏ hàng.

Màu sản phẩm không làm thay đổi giá và không được quản lý tồn kho riêng.

Khi giỏ hàng không có sản phẩm, hệ thống hiển thị trạng thái giỏ hàng
trống.

Khi Guest xem giỏ hàng hoặc thêm sản phẩm vào giỏ hàng, hệ thống
chuyển Guest đến trang đăng nhập.

## F05 - Đăng nhập

Guest có thể đăng nhập để trở thành Customer.

Khi đăng nhập thành công, hệ thống chuyển Customer đến trang Shop.
Customer có thể sử dụng tất cả chức năng của website.

Khi đăng nhập không thành công, hệ thống hiển thị thông báo lỗi phù hợp.

## F06 - Xem thông tin cá nhân

Chức năng này chỉ dành cho Customer đã đăng nhập.

Customer có thể xem các thông tin cá nhân:

- Họ và tên
- Email
- Số điện thoại
- Địa chỉ

Các trạng thái cần xử lý:

- Đang tải thông tin cá nhân
- Không tải được thông tin cá nhân
- Không có thông tin cá nhân để hiển thị

Khi Guest xem thông tin cá nhân, hệ thống chuyển Guest đến trang đăng
nhập.
