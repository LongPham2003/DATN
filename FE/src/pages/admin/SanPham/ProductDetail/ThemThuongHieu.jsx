import { useState } from "react";
import axios from "../../../../api/axiosConfig.js";
import { toast } from "react-toastify";
import { Modal } from "antd";

export default function ThemThuongHieu({ closeModel }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const them = async (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thêm thương hiệu này?",
      content: "Vui lòng xác nhận trước khi tiếp tục.",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/thuonghieu/add",
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
        console.log("Hủy bỏ thao tác thêm thương hiệu");
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
          placeholder="Mời nhập tên thương hiệu"
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
