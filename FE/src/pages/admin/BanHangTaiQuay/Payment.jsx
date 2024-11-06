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

  const handleGeneratePDF = () => {
    setShowPDF(true); // Hiển thị ExportPDF để có thể tạo file PDF
    setTimeout(() => {
      generatePDF();
      setShowPDF(true); // Ẩn ExportPDF sau khi tạo file PDF
    }, 1000); // Đợi 1 giây để đảm bảo ExportPDF đã render
  };

  useEffect(() => {
    async function checkPaymentStatus() {
      try {
        const response = await axios.get("http://localhost:8080/api/paymentvnpay/payment-return", {
          params: {
            vnp_Amount: params.get("vnp_Amount"),
            vnp_BankCode: params.get("vnp_BankCode"),
            vnp_OrderInfo: params.get("vnp_OrderInfo"),
            vnp_ResponseCode: params.get("vnp_ResponseCode"),
          },
        });

        if (response.data) {
          await axios.post(`http://localhost:8080/api/hoadon/thanh-toan/tc-vnpay/${id}`, {
            phuongThucThanhToan: "VNPAY",
            tienKhachDua: 0
          });

           // navigate("/admin/banhangoff");
          toast.success("Thành công ");
          handleGeneratePDF();

        } else {
          setTimeout(() => navigate("/admin/banhangoff"), 500);
          toast.error("Thất bại");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    checkPaymentStatus();

  }, [location.search, navigate]);

  return (
    <div>
      Thanh toán đã thành công bạn có muốn in hóa đơn không
      <ToastContainer
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
      />

      {/* Hiển thị ExportPDF tạm thời khi showPDF là true */}
      {showPDF && <ExportPDF idHoaDon={id} />}
    </div>
  );
}
