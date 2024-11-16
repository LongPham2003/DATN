import axios from "../../../api/axiosConfig.js";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ThanhToanCKTM({ maHoaDon, tienPhaiThanhToan = 0 }) {
  // thanh toán vnpay
  const [tienKhachDua, setTienKhachDua] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const formatCurrencyToNumber = (value) => {
    // Đảm bảo rằng `value` là chuỗi trước khi gọi `replace`
    if (typeof value === "string") {
      return parseInt(value.replace(/[^\d]/g, ""), 10) || 0;
    }
    return parseInt(value, 10) || 0;
  };

  // Ngăn không cho nhập dấu "-"
  const handleKeyDown = (e) => {
    if (e.key === '-') {
      e.preventDefault(); // Ngừng sự kiện nếu người dùng cố gắng nhập dấu trừ
    }
  };

  const handlePaymentClick = async () => {
    const soTienThanhToan = tienPhaiThanhToan - tienKhachDua; // Tính số tiền cần thanh toán
    if (tienKhachDua >= tienPhaiThanhToan) {
      setErrorMessage("Số tiền khách đưa phải nhỏ hơn số tiền phải thanh toán!");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8080/api/paymentvnpay/create-payment",
        {
          params: {
            maHoaDon: maHoaDon,
            amount: formatCurrencyToNumber(soTienThanhToan.toString())
          }
        }
      );

      if (response.data) {
        window.location.href = response.data;
        localStorage.setItem("check", "VNPAY+Tiền Mặt");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center justify-center w-full">
        <h2 className="w-[120px]">Tiền Khách Đưa:</h2>
        <input
          value={tienKhachDua}
          onChange={(e) => setTienKhachDua(e.target.value)}
          type="number"
          className="rounded w-[300px] border border-gray-300 p-2"
          onKeyDown={handleKeyDown}
        />
        <span className="rounded w-[45px] border border-gray-300 p-2">VND</span>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
      <div className="flex gap-2 py-6 items-center justify-center w-full">
        <h2 className="w-[120px]">Tiền Chuyển khoản :</h2>
        <button
          className="rounded w-[300px] border border-gray-300 p-2 bg-blue-500 hover:bg-pink-600"
          onClick={handlePaymentClick}
        >
          Chuyển khoản
        </button>
      </div>
    </>
  );
}
