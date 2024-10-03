import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import ThongKe from "./pages/admin/ThongKe/ThongKe";
import ChatLieu from "./pages/admin/ThuocTinhSP/ChatLieu/ChatLieu";
import DeGiay from "./pages/admin/ThuocTinhSP/DeGiay/DeGiay";
import KichThuoc from "./pages/admin/ThuocTinhSP/KichThuoc/KichThuoc";
import LoaiGiay from "./pages/admin/ThuocTinhSP/LoaiGiay/LoaiGiay";
import MauSac from "./pages/admin/ThuocTinhSP/MauSac/MauSac";
import Voucher from "./pages/admin/Voucher/Voucher";
import SanPham from "./pages/admin/SanPham/SanPham";
import ThuongHieu from "./pages/admin/ThuocTinhSP/ThuongHieu/ThuongHieu";
import Login from "./pages/client/auth/Login";
import SignUp from "./pages/client/auth/SignUp";
import DoiMatKhau from "./pages/client/auth/DoiMatKhau";
import ResetPass from "./pages/client/auth/QuenMatKhau";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/doimatkhau" element={<DoiMatKhau></DoiMatKhau>}></Route>
          <Route path="/resetpass" element={<ResetPass></ResetPass>}></Route>
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
