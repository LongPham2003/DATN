import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { ExportPDF, generatePDF } from "../XuatFilePDF/ExportPDF.jsx";

export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPDF, setShowPDF] = useState(false); // Thêm state để hiển thị ExportPDF tạm thời

  const params = new URLSearchParams(location.search);
  const id = params.get("vnp_TxnRef");

  const chiTietSanPhams = JSON.parse(localStorage.getItem("chiTietSanPhams"));
  const idPhieuGiamGia = localStorage.getItem("idPhieuGiamGia");
  const soDienThoai = localStorage.getItem("soDienThoai");
  const phiVanChuyen = localStorage.getItem("phiVanChuyen");
  const diaChiChiTiet = localStorage.getItem("diaChiChiTiet");
  const ngayDuKien = localStorage.getItem("ngayDuKien");
  const tenKhachHang = localStorage.getItem("hoTen");
  const tienPhaiThanhToan = localStorage.getItem("tienPhaiThanhToan");

  const handleGeneratePDF = () => {
    setShowPDF(true); // Hiển thị ExportPDF để có thể tạo file PDF
    setTimeout(() => {
      generatePDF();
      setShowPDF(true); // Ẩn ExportPDF sau khi tạo file PDF
    }, 1000); // Đợi 1 giây để đảm bảo ExportPDF đã render
  };

  // const check = localStorage.getItem("check");

  useEffect(() => {
    async function checkPaymentStatus() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/paymentvnpay/payment-return",
          {
            params: {
              vnp_Amount: params.get("vnp_Amount"),
              vnp_BankCode: params.get("vnp_BankCode"),
              vnp_OrderInfo: params.get("vnp_OrderInfo"),
              vnp_ResponseCode: params.get("vnp_ResponseCode"),
            },
          },
        );

        if (response.data) {
          await axios.post("http://localhost:8080/api/giohang/dat-hang-vnpay", {
            // phuongThucThanhToan: check,
            chiTietSanPhams,
            idPhieuGiamGia: idPhieuGiamGia || null,
            soDienThoai: soDienThoai,
            tenKhachHang: tenKhachHang,
            phiVanChuyen: phiVanChuyen,
            diaChiChiTiet: diaChiChiTiet,
            ngayDuKien: ngayDuKien,
            tienPhaiThanhToan: tienPhaiThanhToan,
          });

          navigate("/trangChu");
          toast.success("Thành công ");
          //  handleGeneratePDF();
          localStorage.removeItem("chiTietSanPhams");
          localStorage.removeItem("idPhieuGiamGia");
          localStorage.removeItem("soDienThoai");
          localStorage.removeItem("phiVanChuyen");
          localStorage.removeItem("diaChiChiTiet");
          localStorage.removeItem("ngayDuKien");
          localStorage.removeItem("tienPhaiThanhToan");
          localStorage.removeItem("sanPhamChon");
          localStorage.removeItem("hoTen");
        } else {
          setTimeout(() => navigate("/gioHang"), 500);
          toast.error("Thất bại");
          localStorage.removeItem("chiTietSanPhams");
          localStorage.removeItem("idPhieuGiamGia");
          localStorage.removeItem("soDienThoai");
          localStorage.removeItem("phiVanChuyen");
          localStorage.removeItem("diaChiChiTiet");
          localStorage.removeItem("ngayDuKien");
          localStorage.removeItem("sanPhamChon");
          localStorage.removeItem("hoTen");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    checkPaymentStatus();
  }, [
    chiTietSanPhams,
    diaChiChiTiet,
    idPhieuGiamGia,
    location.search,
    navigate,
    ngayDuKien,
    params,
    phiVanChuyen,
    soDienThoai,
    tienPhaiThanhToan,
  ]);

  return (
    <div>
      {/* Thanh toán đã thành công bạn có muốn in hóa đơn không */}
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Bounce}
      /> */}
      {/* Hiển thị ExportPDF tạm thời khi showPDF là true
      {showPDF && <ExportPDF idHoaDon={id} />} */}
    </div>
  );
}
