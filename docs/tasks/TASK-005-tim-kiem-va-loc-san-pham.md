# TASK-005: Tìm kiếm và lọc sản phẩm

## Mục tiêu

Sau task này người dùng có thể tìm kiếm sản phẩm bằng tên, lọc sản phẩm bằng giá tiền và tỉ lệ đánh giá

## Yêu cầu

- Tìm kiếm bằng từ khóa ví dụ: "phone"
- Lọc theo danh mục theo giá tiền và tỉ lệ đánh giá
- Search và filter tách riêng và nằm gần nhau để người dùng có thể chọn một hoặc chọn cả 2. Bên với tìm kiếm thì có icon tìm kiếm bên cạnh, bộ lọc cũng có icon, icon lấy ở thư viện ant cho tôi
- Sau khi tìm kiếm hoặc lọc thì sẽ trả về sản phẩm phù hợp. Sau khi bỏ chọn thì sẽ quay lại và hiện tất cả.
- Nếu không có kết quả thì hiện trang rỗng cho tôi
- Các chức năng Product List và Product Detail cũ vẫn phải hoạt động

## Ngoài phạm vi

- Chưa làm sắp xếp sản phẩm theo giá, tên hoặc đánh giá.
- Chưa làm phân trang.
- Chưa lọc theo danh mục, thương hiệu, tồn kho hoặc giảm giá.
- Chưa làm bộ lọc nâng cao ngoài giá tiền và tỉ lệ đánh giá.
- Không thay đổi chức năng của Product Detail.
- Chưa triển khai giỏ hàng, đăng nhập hoặc đặt hàng.

## Tiêu chí hoàn thành

- Khi nhập từ khóa tìm kiếm, danh sách chỉ hiển thị các sản phẩm
  phù hợp theo tên.
- Khi chọn bộ lọc giá, chỉ các sản phẩm nằm trong khoảng giá được chọn
  được hiển thị.
- Khi chọn mức đánh giá, chỉ các sản phẩm đáp ứng mức đánh giá tối thiểu
  được hiển thị.
- Search, bộ lọc giá và bộ lọc đánh giá có thể hoạt động đồng thời.
- Khi sử dụng nhiều điều kiện cùng lúc, chỉ các sản phẩm thỏa mãn tất cả
  điều kiện đang chọn được hiển thị.
- Khi xóa từ khóa tìm kiếm và bỏ tất cả bộ lọc, toàn bộ danh sách sản phẩm
  được hiển thị lại.
- Nếu không có sản phẩm phù hợp, hiển thị trạng thái
  "Không tìm thấy sản phẩm phù hợp".
- Sau khi tìm kiếm hoặc lọc, người dùng vẫn có thể nhấn vào sản phẩm
  và được điều hướng đúng tới `/shop/:productId`.
- Không có lỗi nghiêm trọng trên console.
- `npm run lint` thành công.
- `npm run build` thành công.
