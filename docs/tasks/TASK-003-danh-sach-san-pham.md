# TASK-003: Xây dựng trang danh sách sản phẩm

## Mục tiêu

Xây dựng trang `/products` để người dùng có thể xem danh sách sản phẩm
được lấy từ DummyJSON API.

## Yêu cầu

- Lấy danh sách sản phẩm từ:

  `https://dummyjson.com/products`

- Hiển thị danh sách sản phẩm tại `/products`.

- Mỗi sản phẩm hiển thị tối thiểu:
  - Ảnh
  - Tên
  - Giá

- Sử dụng dữ liệu từ các trường:
  - `id`
  - `title`
  - `price`
  - `thumbnail`

- Tạo component có thể tái sử dụng để hiển thị một sản phẩm.

- Khi nhấn vào một sản phẩm, điều hướng tới:

  `/products/:productId`

- Xử lý các trạng thái:
  - Đang tải dữ liệu
  - Tải dữ liệu thành công
  - Không có sản phẩm
  - Lỗi khi tải dữ liệu

- Giao diện hiển thị hợp lý trên desktop và mobile ở mức cơ bản.

## Ngoài phạm vi

- Chưa làm tìm kiếm.
- Chưa làm lọc sản phẩm.
- Chưa làm phân trang.
- Chưa làm giỏ hàng.
- Chưa hoàn thiện trang chi tiết sản phẩm.
- Không tạo backend riêng.
- Không sử dụng mock data local thay cho DummyJSON.

## Tiêu chí hoàn thành

- Truy cập `/products` có thể tải dữ liệu từ DummyJSON.
- Trong lúc chờ API có trạng thái loading.
- Khi API thành công, danh sách sản phẩm được hiển thị.
- Mỗi sản phẩm hiển thị đúng ảnh, tên và giá.
- Click sản phẩm chuyển tới `/products/:productId`.
- Có xử lý trường hợp API lỗi.
- Có xử lý trường hợp danh sách rỗng.
- Không có lỗi nghiêm trọng trên console.
- `npm run lint` thành công.
- `npm run build` thành công.
