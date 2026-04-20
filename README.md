# Modelix Mobile

Ứng dụng mobile bán mô hình thiết kế theo phong cách e-commerce chuyên nghiệp, phù hợp bài tập môn **Lập trình trên thiết bị di động**.

## Điểm chính
- Bố cục lấy cảm hứng từ mẫu bạn gửi: Login, Home, Product Detail.
- Tổng cộng **9+ layout** để chia cho nhóm 3 người.
- Dùng **Expo + React Native + React Navigation**.
- Có dữ liệu mẫu, giao diện đẹp, chạy demo được ngay.

## Phân chia đề xuất cho nhóm
### Thành viên 1
1. Onboarding / Splash
2. Login
3. Register

### Thành viên 2
4. Home
5. Category
6. Search

### Thành viên 3
7. Product Detail
8. Cart
9. Checkout
10. Profile / Orders / Wishlist (phần cộng thêm)

## Cách chạy
```bash
npm install
npm start
```

Sau đó:
- bấm `a` để chạy Android emulator
- hoặc quét QR bằng Expo Go

## Cấu trúc
- `App.js`: entry chính
- `src/navigation`: điều hướng stack + tab
- `src/screens`: toàn bộ layout
- `src/components`: component tái sử dụng
- `src/data`: dữ liệu mẫu sản phẩm

## Ghi chú
- Ảnh sản phẩm đang là ảnh local mockup để nộp bài dễ hơn.
- Bạn có thể thay text, giá, banner, icon hoặc thêm API thật sau.
