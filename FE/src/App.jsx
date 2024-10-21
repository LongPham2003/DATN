import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import ThongKe from "./pages/admin/ThongKe/ThongKe";
import ChatLieu from "./pages/admin/ThuocTinhSP/ChatLieu/ChatLieu";
import DeGiay from "./pages/admin/ThuocTinhSP/DeGiay/DeGiay";
import KichThuoc from "./pages/admin/ThuocTinhSP/KichThuoc/KichThuoc";
import LoaiGiay from "./pages/admin/ThuocTinhSP/LoaiGiay/LoaiGiay";
import MauSac from "./pages/admin/ThuocTinhSP/MauSac/MauSac";
import Voucher from "./pages/admin/Voucher/Voucher";
import ThuongHieu from "./pages/admin/ThuocTinhSP/ThuongHieu/ThuongHieu";
import ListProduct from "./pages/admin/SanPham/Product/ListProduct";

import { Helmet } from "react-helmet";
import DanhSachNhanVien from "./pages/admin/NhanVien/DanhSachNhanVien";
import ChiTietNhanVien from "./pages/admin/NhanVien/ChiTietNhanVien";
import ChiTietKhachHang from "./pages/admin/KhachHang/ChiTietKhachHang";
import DanhSachKhachHang from "./pages/admin/KhachHang/DanhSachKhachHang";
import Login from "./pages/client/auth/Login";
import SignUp from "./pages/client/auth/SignUp";
import DoiMatKhau from "./pages/client/auth/DoiMatKhau";
import ResetPass from "./pages/client/auth/QuenMatKhau";
import DiaChi from "./pages/admin/KhachHang/DiaChi";
import DetailProduct from "./pages/admin/SanPham/Product/DetailProduct";
import AddProductDetail from "./pages/admin/SanPham/ProductDetail/AddProductDetail";
import ListPhieuGiamGia from "./pages/admin/Voucher/ListPhieuGiamGia";
import ChiTietPhieuGiamGia from "./pages/admin/Voucher/ChiTietPhieuGiamGia";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* router login */}
          <Route
            path="/login"
            element={
              <>
                <Helmet>
                  <title>Đăng nhập</title>
                </Helmet>
                <Login />
              </>
            }
          />
          <Route
            path="/doimatkhau"
            element={
              <>
                <Helmet>
                  <title>Đổi mật khẩu</title>
                </Helmet>
                <DoiMatKhau />
              </>
            }
          />
          <Route
            path="/SignUp"
            element={
              <>
                <Helmet>
                  <title>Đăng ký</title>
                </Helmet>
                <SignUp />
              </>
            }
          />
          <Route
            path="/resetpass"
            element={
              <>
                <Helmet>
                  <title>Reset pass</title>
                </Helmet>
                <ResetPass />
              </>
            }
          />
          {/* roter dashboard */}

          <Route path="/admin" element={<Dashboard />}>
            <Route
              path="phieugiamgia"
              element={
                <>
                  <Helmet>
                    <title>Thống kê</title>
                  </Helmet>
                  <ListPhieuGiamGia />
                </>
              }
            />
            <Route
              path="phieugiamgia/:id"
              element={
                <>
                  <Helmet>
                    <title>Thống kê</title>
                  </Helmet>
                  <ChiTietPhieuGiamGia />
                </>
              }
            />
            <Route
              path="diachi"
              element={
                <>
                  <Helmet>
                    <title>Thống kê</title>
                  </Helmet>
                  <DiaChi />
                </>
              }
            />
            {/* roter thong ke */}
            <Route
              path="thongke"
              element={
                <>
                  <Helmet>
                    <title>Thống kê</title>
                  </Helmet>
                  <ThongKe />
                </>
              }
            />
            {/* roter chat lieu */}
            <Route
              path="chatlieu"
              element={
                <>
                  <Helmet>
                    <title>Chất liệu</title>
                  </Helmet>
                  <ChatLieu />
                </>
              }
            />
            {/* roter de giay */}
            <Route
              path="degiay"
              element={
                <>
                  <Helmet>
                    <title>Đế giày</title>
                  </Helmet>
                  <DeGiay />
                </>
              }
            />
            {/* roter kich thuoc */}
            <Route
              path="kichthuoc"
              element={
                <>
                  <Helmet>
                    <title>Kích thước</title>
                  </Helmet>
                  <KichThuoc />
                </>
              }
            />
            {/* roter loai giay */}
            <Route
              path="loaigiay"
              element={
                <>
                  <Helmet>
                    <title>Loại giày</title>
                  </Helmet>
                  <LoaiGiay />
                </>
              }
            />
            {/* roter mau sac */}
            <Route
              path="mausac"
              element={
                <>
                  <Helmet>
                    <title>Màu sắc</title>
                  </Helmet>
                  <MauSac />
                </>
              }
            />
            {/* roter thuong hieu */}
            <Route
              path="thuonghieu"
              element={
                <>
                  <Helmet>
                    <title>Thương hiệu</title>
                  </Helmet>
                  <ThuongHieu />
                </>
              }
            />
            {/* roter voucher */}
            <Route
              path="voucher"
              element={
                <>
                  <Helmet>
                    <title>Voucher</title>
                  </Helmet>
                  <Voucher />
                </>
              }
            />
            {/* roter san pham */}
            <Route
              path="sanpham"
              element={
                <>
                  <Helmet>
                    <title>Sản phẩm</title>
                  </Helmet>
                  <ListProduct />
                </>
              }
            />
            <Route
              path="chitietsanpham/:id"
              element={
                <>
                  <Helmet>
                    <title>Chi tiết sản phẩm</title>
                  </Helmet>
                  <DetailProduct />
                </>
              }
            />
            {/* roter san pham */}
            <Route
              path="themsanphamchitiet/:id"
              element={
                <>
                  <Helmet>
                    <title>Thêm sản phẩm chi tiết</title>
                  </Helmet>
                  <AddProductDetail />
                </>
              }
            />

            {/* roter danh sach nhan vien */}
            <Route
              path="nhanvien"
              element={
                <>
                  <Helmet>
                    <title>Danh sách nhân viên</title>
                  </Helmet>
                  <DanhSachNhanVien />
                </>
              }
            />
            <Route
              path="nhanvien/:id"
              element={
                <>
                  <Helmet>
                    <title>Chi tiết nhân viên</title>
                  </Helmet>
                  <ChiTietNhanVien />
                </>
              }
            />
            {/* roter danh sach khach hang */}
            <Route
              path="khachhang"
              element={
                <>
                  <Helmet>
                    <title>Danh sách khách hàng</title>
                  </Helmet>
                  <DanhSachKhachHang />
                </>
              }
            />
            <Route
              path="khachhang/:id"
              element={
                <>
                  <Helmet>
                    <title>Chi tiết khách hàng</title>
                  </Helmet>
                  <ChiTietKhachHang />
                </>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
