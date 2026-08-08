# Tổng quan kiến trúc Frontend

## Công nghệ

Project hiện sử dụng:

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- TypeScript

React Query và RxJS nằm trong định hướng công nghệ của project nhưng chưa được
cài đặt hoặc sử dụng trong source code sau TASK-001.

## Điểm khởi động

Trình duyệt tải `index.html`. File này chứa phần tử `#root` và tải entry point
`src/main.tsx`.

`src/main.tsx` sử dụng `createRoot` để render ứng dụng React vào `#root`.
Ứng dụng được bọc bằng `StrictMode`, Redux `Provider` và `BrowserRouter` trước
khi render component `App`.

## Redux

Redux store được cấu hình tại:

`src/app/store.ts`

Store được tạo bằng `configureStore` của Redux Toolkit. Store hiện có reducer
`app` với state ban đầu:

```ts
{
  initialized: true;
}
```

File store cũng export các type `RootState` và `AppDispatch` để sử dụng với
TypeScript.

Redux `Provider` được cấu hình tại `src/main.tsx`. Vì `App` nằm bên trong
`Provider`, các component và page bên dưới có thể truy cập Redux store.
Chưa có page nào sử dụng state `app.initialized` sau khi bỏ `HomePage`.

## Routing

React Router được sử dụng để quản lý điều hướng phía client.

Router được cấu hình tại hai vị trí:

- `src/main.tsx` đặt `BrowserRouter` bao quanh `App`.
- `src/App.tsx` khai báo `Routes`, các `Route` và thanh điều hướng bằng
  `NavLink`.

Các route hiện tại:

- `/`
- `/shop`
- `/shop/:productId`
- `/cart`
- `/profile`
- `/login`
- `*`

Route `/` sử dụng `Navigate` để chuyển hướng thay thế lịch sử đến `/shop`.
Logo của website cũng liên kết trực tiếp đến `/shop`.

Ba route điều hướng chính là `/shop`, `/cart` và `/profile`. Route
`/shop/:productId`, `/login` và `*` là các route hỗ trợ, không hiển thị
thành mục riêng trên thanh điều hướng.

`ProductDetailsPage` sử dụng `useParams` để đọc `productId` từ URL. Route `*`
hiển thị `NotFoundPage` khi URL không khớp các route còn lại.

## Pages

Các trang được đặt tại:

`src/pages/`

Các page hiện tại:

- `ShopPage.tsx`
- `ProductDetailsPage.tsx`
- `CartPage.tsx`
- `ProfilePage.tsx`
- `LoginPage.tsx`
- `NotFoundPage.tsx`

`ShopPage` hiển thị danh sách sản phẩm. `ProductDetailsPage` hiển thị chi
tiết sản phẩm dưới route của Shop. `CartPage`, `ProfilePage` và `LoginPage`
hiện vẫn là placeholder.

## Phân quyền dự kiến

Các route xem sản phẩm, chi tiết sản phẩm và tìm kiếm được phép truy
cập công khai.

Các route sau chỉ dành cho Customer đã đăng nhập:

- `/cart`
- `/profile`

Khi Guest truy cập route được bảo vệ, ứng dụng chuyển Guest đến `/login`.
Thao tác thêm sản phẩm vào giỏ hàng cũng phải kiểm tra trạng thái đăng
nhập và chuyển Guest đến `/login`.

Sau khi đăng nhập thành công, ứng dụng chuyển Customer đến `/shop`.

Cơ chế phân quyền và chuyển hướng này chưa được triển khai trong source code
hiện tại. Việc đăng nhập chỉ được mô phỏng trên frontend, không thay thế
cho xác thực hoặc bảo mật phía server.

## Luồng ứng dụng

Luồng cơ bản:

`index.html`
→ `src/main.tsx`
→ `createRoot`
→ `StrictMode`
→ Redux `Provider`
→ `BrowserRouter`
→ `App`
→ `Routes`
→ Page phù hợp

Ví dụ, khi người dùng truy cập `/shop/123`, `BrowserRouter` đọc URL,
`Routes` khớp với route `/shop/:productId` và render
`ProductDetailsPage`. Page này dùng `useParams` để lấy `productId` có giá trị
`123`.

## Cấu hình nền tảng

Các file cấu hình chính tại repository root:

- `vite.config.ts`: cấu hình Vite và React plugin.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: cấu hình
  TypeScript.
- `eslint.config.js`: cấu hình ESLint.
- `package.json`: scripts và dependency của project.

CSS toàn cục nằm tại `src/index.css` và được import bởi `src/main.tsx`.

## Trạng thái hiện tại

Project đã hoàn thành danh sách và chi tiết sản phẩm bằng dữ liệu
từ DummyJSON API.

Chưa triển khai:

- Giỏ hàng
- Trang thông tin cá nhân
- Đăng nhập
- Tìm kiếm và lọc sản phẩm
