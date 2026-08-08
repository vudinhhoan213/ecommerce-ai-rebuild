# TASK-004: Xây dựng trang chi tiết sản phẩm

## Mục tiêu

Xây dựng trang `/products/:productId` để người dùng có thể xem
thông tin chi tiết của một sản phẩm được lấy từ DummyJSON API.

## Yêu cầu

- Lấy `productId` từ URL.

- Lấy thông tin sản phẩm tương ứng từ DummyJSON:

  `https://dummyjson.com/products/:productId`

- Hiển thị thông tin chi tiết sản phẩm tại:

  `/products/:productId`

- Trang sản phẩm hiển thị tối thiểu:
  - Ảnh sản phẩm
  - Tên sản phẩm
  - Giá
  - Mô tả
  - Đánh giá

- Sử dụng các trường dữ liệu phù hợp từ DummyJSON:
  - `id`
  - `title`
  - `price`
  - `description`
  - `rating`
  - `stock`
  - `thumbnail`
  - `images`

- Hiển thị nút:
  - Mua ngay
  - Thêm vào giỏ hàng

- Trong TASK này, hai nút trên chỉ cần hiển thị giao diện,
  chưa triển khai chức năng mua hàng hoặc thêm vào giỏ.

- Xử lý các trạng thái:
  - Đang tải dữ liệu
  - Tải dữ liệu thành công
  - Không tìm thấy sản phẩm
  - Lỗi khi tải dữ liệu

- Giao diện hiển thị hợp lý trên desktop và mobile ở mức cơ bản.

## Ngoài phạm vi

- Chưa triển khai chức năng thêm vào giỏ hàng.
- Chưa triển khai chức năng mua ngay.
- Chưa làm tìm kiếm.
- Chưa làm lọc sản phẩm.
- Chưa làm đặt hàng.
- Không tạo backend riêng.
- Không sử dụng mock data thay cho DummyJSON.
- Không thay đổi chức năng trang danh sách sản phẩm ngoài phần cần thiết
  để hỗ trợ điều hướng tới trang chi tiết.

## Tiêu chí hoàn thành

- Truy cập `/products/1` tải được thông tin sản phẩm có id `1`.
- Truy cập một `productId` khác hiển thị đúng sản phẩm tương ứng.
- Trong lúc chờ API có trạng thái loading.
- Khi API thành công, thông tin chi tiết sản phẩm được hiển thị.
- Hiển thị đúng ảnh, tên, giá, mô tả, đánh giá.
- Có nút `Mua ngay` và `Thêm vào giỏ hàng` ở mức giao diện.
- Khi sản phẩm không tồn tại có thông báo phù hợp.
- Khi API gặp lỗi có trạng thái lỗi phù hợp.
- Không có lỗi nghiêm trọng trên console.
- `npm run lint` thành công.
- `npm run build` thành công.
