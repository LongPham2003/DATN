import { useState } from "react";
import axios from "../../../../api/axiosConfig.js";
import { toast } from "react-toastify";
import { Modal } from "antd";

export default function ThemKichThuoc({ closeModel }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const them = async (e) => {
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
          className="bordered h-10 w-[200px] border"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
