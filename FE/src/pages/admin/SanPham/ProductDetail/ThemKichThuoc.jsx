import { useState } from "react";
import axios from "../../../../api/axiosConfig.js";
import { toast } from "react-toastify";
import { Modal } from "antd";

export default function ThemKichThuoc({ closeModel }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateTenSanPhamtu3den50 = (ten) => {
    return ten.length >= 2 && ten.length <= 50; // Chỉ kiểm tra độ dài
  };

  const validateTenSanPhamkhongchuakytudacbiet = (ten) => {
    const regex = /^[0-9\s]+$/; // Chỉ cho phép số và khoảng trắng
    return regex.test(ten); // Kiểm tra ký tự đặc biệt
  };
  const them = async (e) => {
    if (value === "") {
      setError("Tên kích thước không được để trống");
      return;
    } else if (!validateTenSanPhamtu3den50(value)) {
      setError("Tên kích thước từ 2 đến 50 ký tự");
      return;
    } else if (!validateTenSanPhamkhongchuakytudacbiet(value)) {
      setError("Tên kích thước không được chưa kí tự đặc biệt");
      return;
    }
    e.preventDefault();
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thêm kích thước mới mới?",
      content: "Vui lòng xác nhận trước khi tiếp tục.",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/kichthuoc/add",
            {
              kichThuoc: value,
              trangThai: true,
            },
          );

          if (response.status === 200) {
            // Nếu thành công, có thể xử lý thông báo hoặc reset form
            toast.success("Thành công");
            setValue("");
            closeModel();
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          setError(error.response?.data?.message || error.message);
        }
      },
      onCancel() {
        console.log("Hủy bỏ thao tác thêm kích thước");
      },
    });
  };

  return (
    <>
      <div className="my-auto items-center justify-items-center">
        <input
          type="text"
          className="bordered h-10 w-[200px] border pl-2"
          value={value}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, ""); // Loại bỏ ký tự không phải số
            setValue(rawValue); // Cập nhật giá trị hợp lệ vào state
          }}
          placeholder="Mời nhập tên kích thước"
        />
        <button
          onClick={them}
          className="bordered h-10 rounded-lg border bg-blue-400"
        >
          Thêm
        </button>
      </div>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}
