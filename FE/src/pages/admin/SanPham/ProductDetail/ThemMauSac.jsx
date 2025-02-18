import { useState } from "react";
import axios from "../../../../api/axiosConfig.js";
import { toast } from "react-toastify";
import { Modal } from "antd";

export default function ThemMauSac({ closeModel }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateTenSanPhamtu3den50 = (ten) => {
    return ten.length >= 2 && ten.length <= 50; // Chỉ kiểm tra độ dài
  };

  const validateTenSanPhamkhongchuakytudacbiet = (ten) => {
    const regex = /^[\p{L}\p{M}\d\s]+$/u; // Cho phép tất cả các ký tự chữ (có dấu), số và khoảng trắng
    return regex.test(ten); // Kiểm tra ký tự đặc biệt
  };
  const them = async (e) => {
    if (value === "") {
      setError("Tên màu sắc không được để trống");
      return;
    } else if (!validateTenSanPhamtu3den50(value)) {
      setError("Tên màu sắc từ 2 đến 50 ký tự");
      return;
    } else if (!validateTenSanPhamkhongchuakytudacbiet(value)) {
      setError("Tên màu sắc không được chưa kí tự đặc biệt");
      return;
    }
    e.preventDefault();
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thêm màu sắc mới mới?",
      content: "Vui lòng xác nhận trước khi tiếp tục.",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/mausac/add",
            {
              ten: value,
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
        console.log("Hủy bỏ thao tác thêm màu sắc");
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
          onChange={(e) => setValue(e.target.value)}
          placeholder="Mời nhập tên màu sắc"
        />
        <button
          onClick={them}
          className="bordered h-10 rounded-lg border bg-blue-400"
        >
          Thêm
        </button>
        {/* <p>{error}</p> */}
      </div>
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
    </>
  );
}
