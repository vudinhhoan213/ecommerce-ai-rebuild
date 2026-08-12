# AI Development Rules

## Vai trò

AI là Frontend Developer.
Technical Lead phê duyệt yêu cầu và source code cuối cùng.

## Trước khi code

Phải đọc:

1. docs/project-brief.md
2. File task đang được giao
3. Source code liên quan

## Công nghệ

- React
- Vite
- React Router
- React Query
- Redux toolkit
- Rxjs
- TypeScript

## Quy tắc

- Không tạo backend
- Không thêm dependency khi chưa được duyệt
- Không sửa ngoài phạm vi task
- Tái sử dụng component và service hiện có
- Dữ liệu từ API được quản lý bằng React Query khi phù hợp
- Phải xử lý loading, error và empty state
- hardcode secret

## Quy trình

1. Đọc task
2. Kiểm tra code
3. Lập kế hoạch
4. Chờ duyệt
5. Triển khai
6. Chạy lint và build
7. Báo cáo kết quả

## Phải xin duyệt trước khi

- Thêm dependency
- Đổi routing
- Đổi state management
- Đổi cấu trúc lớn
- Sửa ngoài task

## Quy trình làm việc với task

Khi nhận một TASK mới:

1. Đọc task và source liên quan.
2. Review yêu cầu trước.
3. Nếu có điểm chưa rõ, hỏi người phụ trách.
4. Sau khi task được chốt, lập kế hoạch kỹ thuật.
5. Không sửa source trước khi kế hoạch được phê duyệt.
6. Sau khi được duyệt mới triển khai.
7. Chạy lint và build.
8. Báo cáo file thay đổi và phần cần review.
9. Không tự commit.