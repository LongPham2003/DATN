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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="thongke" element={<ThongKe />} />
            <Route path="chatlieu" element={<ChatLieu />} />
            <Route path="degiay" element={<DeGiay />} />
            <Route path="kichthuoc" element={<KichThuoc />} />
            <Route path="loaigiay" element={<LoaiGiay />} />
            <Route path="mausac" element={<MauSac />} />
            <Route path="thuonghieu" element={<ThuongHieu />} />
            <Route path="voucher" element={<Voucher />} />
            <Route path="sanpham" element={<SanPham />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
