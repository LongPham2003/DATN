import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import ThongKe from "./pages/admin/ThongKe/ThongKe";
import ChatLieu from "./pages/admin/ThuocTinhSP/ChatLieu/ChatLieu";
import DeGiay from "./pages/admin/ThuocTinhSP/DeGiay/DeGiay";
import KichThuoc from "./pages/admin/ThuocTinhSP/KichThuoc/KichThuoc";
import LoaiGiay from "./pages/admin/ThuocTinhSP/LoaiGiay/LoaiGiay";
import MauSac from "./pages/admin/ThuocTinhSP/MauSac/MauSac";
import ThuongHieu from "./pages/admin/ThuocTinhSP/ThuongHieu/ThuongHieu";
import ListProduct from "./pages/admin/SanPham/Product/ListProduct";
import TheoDoiDonHang from "./pages/client/TheoDoiDonHang/TheoDoiDonHang.jsx";
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
import SanPhamChiTiet from "./pages/admin/SanPham/Product/SanPhamChiTiet";
import UpdateProductDetail from "./pages/admin/SanPham/ProductDetail/UpdateProductDetail";
import Forbidden403 from "./pages/Forbidden403";
import NotFound404 from "./pages/NotFound404";
import ProtectedRoute from "./pages/ProtectedRoute";
import BanHangTaiQuay from "./pages/admin/BanHangTaiQuay/BanHangTaiQuay";
import HomePage from "./pages/client/Home/homePage.jsx";
import PaymentResult from "./pages/admin/BanHangTaiQuay/Payment.jsx";
import DanhSachHoaDon from "./pages/admin/QuanLiHoaDon/DanhSachHoaDon.jsx";
import SanPham from "./pages/client/SanPham/SanPham.jsx";
import LienHe from "./pages/client/LienHe/LienHe.jsx";
import TrangChu from "./pages/client/TrangChu/TrangChu.jsx";
import GioHang from "./pages/client/GioHang/GioHang.jsx";

import ChiTietSanPham from "./pages/client/ChiTietSanPham/ChiTietSanPham.jsx";
import HoaDonChiTiet from "./pages/admin/QuanLiHoaDon/HoaDonChiTiet.jsx";
import ThongTinCaNhan from "./pages/client/ThongTinCaNhan/ThongTinCaNhan.jsx";
import DatHang from "./pages/client/DatHang/DatHang.jsx";
import MuaNgay from "./pages/client/MuaNgay/MuaNgay.jsx";
import TraCuuDonHang from "./pages/client/ThongTinCaNhan/TraCuuDonHang.jsx";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route
              path="SanPham"
              element={
                <>
                  <Helmet>
                    <title>Sản Phẩm</title>
                  </Helmet>
                  <SanPham />
                </>
              }
            />
            <Route
              path="LienHe"
              element={
                <>
                  <Helmet>
                    <title>Liên Hệ</title>
                  </Helmet>
                  <LienHe />
                </>
              }
            />
            <Route
              path="TrangChu"
              element={
                <>
                  <Helmet>
                    <title>Trang Chủ</title>
                  </Helmet>
                  <TrangChu />
                </>
              }
            />{" "}
            <Route
              path="/chitiet/:id"
              element={
                <>
                  <Helmet>
                    <title>Sản Phẩm</title>
                  </Helmet>
                  <ChiTietSanPham />
                </>
              }
            />
            <Route
              path="GioHang"
              element={
                <>
                  <Helmet>
                    <title>Giỏ hàng</title>
                  </Helmet>
                  <GioHang />
                </>
              }
            />
            <Route
              path="dathang"
              element={
                <>
                  <Helmet>
                    <title>Đặt hàng</title>
                  </Helmet>
                  <DatHang />
                </>
              }
            />
            <Route
              path="tracuudonhang"
              element={
                <>
                  <Helmet>
                    <title>Đơn hàng</title>
                  </Helmet>
                  <TraCuuDonHang />
                </>
              }
            />
            <Route
              path="muangay"
              element={
                <>
                  <Helmet>
                    <title>Mua ngay</title>
                  </Helmet>
                  <MuaNgay />
                </>
              }
            />
            <Route
              path="thongtin"
              element={
                <>
                  <Helmet>
                    <title>Thông tin cá nhân</title>
                  </Helmet>
                  <ThongTinCaNhan />
                </>
              }
            />
            <Route
              path="theodoidonhang"
              element={
                <>
                  <Helmet>
                    <title>Theo dõi đơn hàng</title>
                  </Helmet>
                  <TheoDoiDonHang />
                </>
              }
            />
          </Route>
          <Route
            path="/403"
            element={
              <>
                <Forbidden403 />
              </>
            }
          />
          <Route
            path="*" // tất cả đường dẫn không hợp lệ
            element={
              <>
                <NotFound404 />
              </>
            }
          />
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
              path="payment"
              element={
                <>
                  <PaymentResult />
                </>
              }
            />
            <Route
              path="hoadon"
              element={
                <>
                  <DanhSachHoaDon />
                </>
              }
            />
            <Route
              path="hoadon/:id"
              element={
                <>
                  <HoaDonChiTiet />
                </>
              }
            />
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
                <ProtectedRoute requiredRoles="ROLE_ADMIN">
                  <>
                    <Helmet>
                      <title>Thống kê</title>
                    </Helmet>
                    <ThongKe />
                  </>
                </ProtectedRoute>
              }
            />
            {/* bán hàng */}
            <Route
              path="banhangoff"
              element={
                <>
                  <Helmet>
                    <title>Bán hàng tại quầy</title>
                  </Helmet>
                  <BanHangTaiQuay />
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
            {/* <Route
              path="voucher"
              element={
                <>
                  <Helmet>
                    <title>Voucher</title>
                  </Helmet>
                  <Voucher />
                </>
              }
            /> */}
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
              path="sanpham/:id"
              element={
                <>
                  <Helmet>
                    <title>Sản phẩm</title>
                  </Helmet>
                  <SanPhamChiTiet />
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
            {/* roter add san pham chi tiet  */}
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
            {/* roter update san pham chi tiet*/}
            <Route
              path="Update-DetailProduct/:id"
              element={
                <>
                  <Helmet>
                    <title>Thêm sản phẩm chi tiết</title>
                  </Helmet>
                  <UpdateProductDetail />
                </>
              }
            />
            {/* roter danh sach nhan vien */}
            <Route
              path="nhanvien"
              element={
                <ProtectedRoute requiredRoles="ROLE_ADMIN">
                  <>
                    <Helmet>
                      <title>Danh sách nhân viên</title>
                    </Helmet>
                    <DanhSachNhanVien />
                  </>
                </ProtectedRoute>
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
                <ProtectedRoute requiredRoles={["ROLE_NHANVIEN", "ROLE_ADMIN"]}>
                  <>
                    <Helmet>
                      <title>Danh sách khách hàng</title>
                    </Helmet>
                    <DanhSachKhachHang />
                  </>
                </ProtectedRoute>
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
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
