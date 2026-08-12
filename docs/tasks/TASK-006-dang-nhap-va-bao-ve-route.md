# TASK-006: Đăng nhập và bảo vệ route dành cho Customer

## Mục tiêu

Triển khai đăng nhập mô phỏng bằng DummyJSON để Guest có thể trở thành Customer.

Sau task này, trạng thái đăng nhập được duy trì khi tải lại trang, các route chỉ dành
cho Customer được bảo vệ và người dùng được đưa trở lại trang họ định truy cập sau
khi đăng nhập thành công.

## Quyết định sản phẩm đã chốt

- Sử dụng dữ liệu người dùng và API đăng nhập của DummyJSON.
- Sau khi đăng nhập thành công, người dùng quay lại trang họ định truy cập.
- Nếu người dùng truy cập trực tiếp `/login`, sau khi đăng nhập thành công hệ thống
  chuyển đến `/shop`.
- Trạng thái đăng nhập được lưu trên trình duyệt; tải lại trang không yêu cầu đăng
  nhập lại.

## Yêu cầu

### API đăng nhập

- Gửi yêu cầu `POST` đến:

  `https://dummyjson.com/auth/login`

- Request body gồm:
  - `username`
  - `password`

- Cho phép sử dụng thông tin đăng nhập của bất kỳ người dùng hợp lệ nào trong dữ
  liệu DummyJSON.
- Không hardcode username, password hoặc secret trong source code.
- Xử lý response không thành công và dữ liệu response không hợp lệ.
- Không lưu password sau khi gửi yêu cầu đăng nhập.

### Trạng thái đăng nhập

- Quản lý trạng thái đăng nhập bằng Redux Toolkit hiện có.
- Trạng thái tối thiểu gồm:
  - Thông tin Customer đang đăng nhập.
  - Trạng thái đã đăng nhập hoặc chưa đăng nhập.
  - Dữ liệu phiên cần thiết do DummyJSON trả về.
- Lưu phiên đăng nhập vào `localStorage` sau khi đăng nhập thành công.
- Khôi phục phiên đăng nhập từ `localStorage` khi ứng dụng được tải lại.
- Dữ liệu trong `localStorage` phải được kiểm tra cấu trúc trước khi sử dụng. Nếu dữ
  liệu thiếu hoặc không hợp lệ, hệ thống xóa phiên lỗi và xem người dùng là Guest.
- Việc lưu token trong `localStorage` chỉ phục vụ mô phỏng frontend của project,
  không được xem là cơ chế xác thực an toàn cho production.

### Trang đăng nhập

- Thay placeholder hiện tại tại `/login` bằng form đăng nhập.
- Form có các trường:
  - Username.
  - Password.
- Các trường phải có label rõ ràng và bắt buộc nhập.
- Có nút đăng nhập.
- Trong khi đang gửi request:
  - Hiển thị trạng thái đang đăng nhập.
  - Ngăn gửi form lặp lại.
- Khi thông tin đăng nhập không hợp lệ hoặc API gặp lỗi, hiển thị thông báo lỗi phù
  hợp trên form.
- Không hiển thị lỗi cũ sau khi một lần đăng nhập mới thành công.
- Giao diện phải sử dụng được trên desktop và mobile.

### Điều hướng sau đăng nhập

- Khi Guest truy cập `/cart` hoặc `/profile`, chuyển đến `/login` và ghi nhớ đầy đủ
  địa chỉ họ định truy cập, bao gồm pathname, query string và hash nếu có.
- Sau khi đăng nhập thành công từ luồng trên, chuyển Customer trở lại đúng địa chỉ
  đã ghi nhớ.
- Khi truy cập trực tiếp `/login` mà không có địa chỉ cần quay lại, đăng nhập thành
  công chuyển đến `/shop`.
- Không chấp nhận địa chỉ quay lại từ query string hoặc dữ liệu tùy ý có thể dẫn tới
  website bên ngoài; chỉ sử dụng location nội bộ do React Router truyền trong phiên
  điều hướng hiện tại.
- Nếu Customer đã đăng nhập truy cập `/login`, chuyển đến `/shop`.

### Bảo vệ route

- `/shop` và `/shop/:productId` tiếp tục cho phép Guest và Customer truy cập.
- `/cart` và `/profile` chỉ cho phép Customer đã đăng nhập truy cập.
- Tạo cơ chế bảo vệ route có thể tái sử dụng cho các route chỉ dành cho Customer.
- Việc bảo vệ route chỉ là mô phỏng phía frontend, không thay thế phân quyền phía
  server.

### Đăng xuất

- Customer có thể đăng xuất từ khu vực điều hướng chính.
- Khi đăng xuất:
  - Xóa trạng thái đăng nhập trong Redux.
  - Xóa phiên đăng nhập đã lưu trong `localStorage`.
  - Chuyển người dùng đến `/shop`.
- Sau khi đăng xuất, truy cập `/cart` hoặc `/profile` phải chuyển lại đến `/login`.

## Ngoài phạm vi

- Không tạo backend hoặc database.
- Không triển khai đăng ký tài khoản, quên mật khẩu hoặc đổi mật khẩu.
- Không triển khai xác thực OAuth hoặc đăng nhập mạng xã hội.
- Không triển khai cơ chế refresh token tự động.
- Không triển khai bảo mật xác thực dành cho production.
- Không triển khai nội dung trang giỏ hàng.
- Không triển khai nội dung trang thông tin cá nhân.
- Không triển khai chức năng thêm sản phẩm vào giỏ hàng hoặc mua ngay.
- Không thay đổi chức năng danh sách, chi tiết, tìm kiếm hoặc lọc sản phẩm.
- Không thêm dependency mới nếu chưa được phê duyệt.

## Tiêu chí hoàn thành

- Guest truy cập `/login` thấy form username và password.
- Đăng nhập bằng tài khoản DummyJSON hợp lệ thành công và người dùng trở thành
  Customer.
- Đăng nhập không hợp lệ hiển thị thông báo lỗi phù hợp.
- Có trạng thái loading và không thể gửi form lặp lại trong khi request đang chạy.
- Đăng nhập trực tiếp từ `/login` chuyển đến `/shop`.
- Guest truy cập `/cart` được chuyển đến `/login`; đăng nhập thành công quay lại
  `/cart`.
- Guest truy cập `/profile` được chuyển đến `/login`; đăng nhập thành công quay lại
  `/profile`.
- Query string và hash của địa chỉ cần quay lại được giữ nguyên.
- Customer đã đăng nhập có thể truy cập trực tiếp `/cart` và `/profile`.
- Customer truy cập `/login` được chuyển đến `/shop`.
- Tải lại trang sau khi đăng nhập vẫn giữ trạng thái Customer.
- Dữ liệu phiên không hợp lệ trong `localStorage` không làm ứng dụng bị lỗi và được
  xử lý như phiên Guest.
- Đăng xuất xóa phiên đã lưu, chuyển đến `/shop` và các route được bảo vệ không còn
  truy cập trực tiếp được.
- Các chức năng Shop, Product Detail, tìm kiếm và lọc hiện có vẫn hoạt động.
- Không có lỗi nghiêm trọng trên console.
- `npm run lint` thành công.
- `npm run build` thành công.
