/* eslint-disable no-unused-vars */

import { Modal } from "antd";
import axios from "../../../api/axiosConfig";
import { toast } from "react-toastify";
import { useState } from "react";

/* eslint-disable react/prop-types */
const XacNhanThanhToan = ({
  closeModalXNTT,
  hoaDon,
  loadHoaDon,
  loadHoaDonCT,
  loadLSHD,
}) => {
  const formatCurrencyToNumber = (value) => {
    // Đảm bảo giá trị là chuỗi trước khi sử dụng replace
    const stringValue = String(value);

    // Loại bỏ tất cả các ký tự không phải là số
    const formattedValue = stringValue.replace(/[^\d]/g, "");

    // Chuyển chuỗi thành số và trả về kết quả
    return parseInt(formattedValue, 10);
  };
  const [ghiChu, setGhiChu] = useState("");
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("Tiền mặt");
  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật nhân viên này không?",
      onOk() {
        axios
          .post(
            `http://localhost:8080/api/hoadon/xacnhanthanhtoan/${hoaDon.id}`,
            {
              tienKhachDua: formatCurrencyToNumber(hoaDon.tienPhaiThanhToan),
              phuongThucThanhToan: phuongThucThanhToan,
              tienPhaiThanhToan: formatCurrencyToNumber(
                hoaDon.tienPhaiThanhToan,
              ),
              moTa: ghiChu,
            },
          )
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalXNTT();
            loadHoaDon();
            loadHoaDonCT();
            loadLSHD();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };
  return (
    <div>
      {" "}
      <div className="relative h-[400px] w-[500px] rounded-lg bg-white p-4">
        <div className="font-bold">
          <h3 className="text-[20px]">Xác nhận thanh toán</h3>
        </div>
        <div className="my-3">
          <label className="text-[15px] font-bold">Tiền cần thanh toán:</label>
          <input
            type="text"
            value={hoaDon.tienPhaiThanhToan}
            className="w-full rounded border p-2"
            disabled
          />
          <label className="text-[15px] font-bold">Ghi chú</label>
          <textarea
            onChange={(e) => setGhiChu(e.target.value)}
            className="w-full rounded border p-2"
            rows="4" // Số dòng hiển thị
            placeholder="Nhập ghi chú ..."
          ></textarea>
        </div>
        <div className="mt-5 flex justify-around">
          <div
            onClick={() => setPhuongThucThanhToan("Tiền mặt")}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600"
          >
            <img
              className="w-[50px]"
              src="https://png.pngtree.com/png-vector/20240724/ourmid/pngtree-golden-money-bag-with-number-three-and-coins-symbolizing-wealth-prosperity-png-image_12932519.png"
              alt=""
            />
            <button className="rounded px-4 py-2 text-white">Tiền mặt</button>
          </div>
          <div
            onClick={() => setPhuongThucThanhToan("VNPAY")}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600"
          >
            <img
              className="w-[50px]"
              src="https://png.pngtree.com/png-clipart/20231220/original/pngtree-banking-card-icon-account-photo-png-image_13884863.png"
              alt=""
            />
            <button className="rounded px-4 py-2 text-white">
              Chuyển khoản
            </button>
          </div>
        </div>
        <div className="mt-5 flex">
          <button
            onClick={handleSubmit}
            className="mx-auto rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Thanh toán
          </button>
        </div>
        <button
          onClick={closeModalXNTT}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          X
        </button>
      </div>
    </div>
  );
};
export default XacNhanThanhToan;
