import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import { Sidebar } from "./pages/admin/Sidebar";
import ThongKe from "./pages/admin/ThongKe/ThongKe";
import ChatLieu from "./pages/admin/ThuocTinhSP/ChatLieu/ChatLieu";
import DeGiay from "./pages/admin/ThuocTinhSP/DeGiay/DeGiay";
import KichThuoc from "./pages/admin/ThuocTinhSP/KichThuoc/KichThuoc";
import LoaiGiay from "./pages/admin/ThuocTinhSP/LoaiGiay/LoaiGiay";
import MauSac from "./pages/admin/ThuocTinhSP/MauSac/MauSac";
import Voucher from "./pages/admin/Voucher/Voucher";
import SanPham from "./pages/admin/SanPham/SanPham";
import ThuongHieu from "./pages/admin/ThuocTinhSP/ThuongHieu/ThuongHieu";
import { Helmet } from "react-helmet";
import DanhSachNhanVien from "./pages/admin/NhanVien/DanhSachNhanVien";
import TheMoiNhanVien from "./pages/admin/NhanVien/TheMoiNhanVien";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* roter dashboard */}
          <Route path="/admin" element={<Dashboard />}>
          {/* roter thong ke */}
            <Route path="thongke" element={<>
              <Helmet><title>Thống kê</title></Helmet>
              <ThongKe />
            </>} />
            {/* roter chat lieu */}
            <Route path="chatlieu" element={<>
              <Helmet><title>Chất liệu</title></Helmet>
              <ChatLieu />
            </>} />
            {/* roter de giay */}
            <Route path="degiay" element={<>
              <Helmet><title>Đế giày</title></Helmet>
              <DeGiay />
            </>} />
            {/* roter kich thuoc */}
              <Route path="kichthuoc" element={<>
              <Helmet><title>Kích thước</title></Helmet>
              <KichThuoc />
            </>} />
            {/* roter loai giay */}
            <Route path="loaigiay" element={<>
              <Helmet><title>Loại giày</title></Helmet>
              <LoaiGiay />
            </>} />
            {/* roter mau sac */}
            <Route path="mausac" element={<>
              <Helmet><title>Màu sắc</title></Helmet>
              <MauSac />
            </>} />
            {/* roter thuong hieu */}
            <Route path="thuonghieu" element={<>
              <Helmet><title>Thương hiệu</title></Helmet>
              <ThuongHieu />
            </>} />
            {/* roter voucher */}
            <Route path="voucher" element={<>
              <Helmet><title>Voucher</title></Helmet>
              <Voucher />
            </>} />
            {/* roter san pham */}
            <Route path="sanpham" element={<>
              <Helmet><title>Sản phẩm</title></Helmet>
              <SanPham />
            </>} />
            {/* roter danh sach nhan vien */}
            <Route path="nhanvien" element={<>
              <Helmet><title>Danh sách nhân viên</title></Helmet>
              <DanhSachNhanVien />
            </>} />
            {/* roter them moi nhan vien */}
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
