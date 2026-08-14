# TASK-007: Thư viện ảnh sản phẩm

## Mục tiêu

Hiển thị thư viện ảnh sản phẩm giống các website bán hàng: ảnh lớn phía trên và các ảnh thu nhỏ phía dưới.

## Yêu cầu

- Sử dụng danh sách `images` của sản phẩm từ DummyJSON.
- Hiển thị một ảnh lớn và tối đa 3 ảnh thu nhỏ bên dưới.
- Chọn ảnh thu nhỏ sẽ hiển thị ảnh đó ở khu vực ảnh lớn.
- Ảnh đang chọn phải có trạng thái rõ ràng.
- Nếu có hơn 3 ảnh, hiển thị mũi tên trái/phải để xem các ảnh còn lại.
- Mũi tên bị vô hiệu hóa khi ở đầu hoặc cuối danh sách.
- Khi chuyển sản phẩm, ảnh đầu tiên được chọn mặc định.
- Hỗ trợ chuột, bàn phím và giao diện responsive.
- Nếu `images` rỗng, sử dụng `thumbnail` làm ảnh chính.

## Ngoài phạm vi

- Không thêm, xóa hoặc chỉnh sửa ảnh.
- Không triển khai phóng to hoặc toàn màn hình.
- Không thay đổi màu, giá, tồn kho hoặc giỏ hàng.
- Không thêm dependency.

## Tiêu chí hoàn thành

- Chọn thumbnail đổi đúng ảnh lớn.
- Chỉ hiển thị tối đa 3 thumbnail cùng lúc.
- Có thể duyệt hơn 3 ảnh bằng hai mũi tên.
- Trạng thái ảnh và mũi tên hiển thị chính xác.
- Chức năng hiện có vẫn hoạt động.
- Lint và build thành công.
