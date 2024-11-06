import { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    async function checkPaymentStatus() {
      try {
        const params = new URLSearchParams(location.search);
        const id = params.get("vnp_TxnRef");
        const response = await axios.get("http://localhost:8080/api/paymentvnpay/payment-return", {
          params: {
            vnp_Amount: params.get("vnp_Amount"),
            vnp_BankCode: params.get("vnp_BankCode"),
            vnp_OrderInfo: params.get("vnp_OrderInfo"),
            vnp_ResponseCode: params.get("vnp_ResponseCode"),
          },
        });

        // console.log(id)
        // console.log(params);
        // console.log("long");

          if (response.data) {
            const response = await axios.post(`http://localhost:8080/api/hoadon/thanh-toan/tc-vnpay/${id}`, {
              phuongThucThanhToan: "VNPAY",
              tienKhachDua: 0
            });

            setTimeout(() => navigate("/admin/banhangoff"), 2000);
            toast.success("Thành công ");
          } else {
            setTimeout(() => navigate("/admin/banhangoff"), 2000);
            toast.error("Thất bại");
          }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    checkPaymentStatus();

  }, [location.search, navigate]);



  return <div>
    long
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
    /></div>;
}
