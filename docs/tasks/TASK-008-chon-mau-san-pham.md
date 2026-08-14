# TASK-008: Chọn màu sắc sản phẩm

## Mục tiêu

Bổ sung lựa chọn màu sắc cho sản phẩm. Task này không thay đổi thư viện ảnh đã làm trong TASK-007.

## Yêu cầu

- Mỗi sản phẩm có 2–4 màu mô phỏng khác nhau, xác định theo `product.id`.
- Cùng một sản phẩm luôn có cùng tập màu sau khi tải lại trang.
- Mỗi màu có tên và mã màu để hiển thị.
- Card sản phẩm hiển thị các màu có sẵn.
- Trang chi tiết cho chọn một màu tại một thời điểm.
- Ban đầu chưa chọn màu; khi đổi sản phẩm phải xóa lựa chọn cũ.
- Hiển thị rõ màu và tên màu đang chọn.
- Hỗ trợ chuột, bàn phím và giao diện responsive.
- Màu không thay đổi ảnh, giá hoặc tồn kho.

## Ngoài phạm vi

- Chưa thêm sản phẩm vào giỏ hàng.
- Không lưu lựa chọn màu sau khi rời trang.
- Không đổi ảnh theo màu.
- Không sửa thư viện ảnh của TASK-007.
- Không thêm dependency.

## Tiêu chí hoàn thành

- Card và trang chi tiết hiển thị cùng tập màu.
- Người dùng chọn và đổi được màu trên trang chi tiết.
- Màu đang chọn có trạng thái rõ ràng và accessibility phù hợp.
- Thư viện ảnh và các chức năng hiện có vẫn hoạt động.
- Lint và build thành công.
