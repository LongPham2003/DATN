/* eslint-disable react/prop-types */
import axios from "../../../api/axiosConfig";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";

export default function TheMoiNhanVien({ button, onAdd }) {
  const { confirm } = Modal;
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Xử lý logic gửi dữ liệu form ở đây
    confirm({
      title: "Bạn có chắc chắn muốn thêm nhân viên này?",
      content: "Vui lòng xác nhận trước khi tiếp tục.",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/nhanvien/add",
            {
              hoTen: formData.hoTen,
              email: formData.email,
              sdt: formData.sdt,
              ngaySinh: formData.ngaySinh,
              gioiTinh: formData.gioiTinh,
              diaChi: formData.diaChi,
            },
          );

          if (response.status === 200) {
            // Nếu thành công, có thể xử lý thông báo hoặc reset form
            toast.success("Thành công");

            // Reset form về trạng thái ban đầu
            setFormData({
              hoTen: "",
              email: "",
              sdt: "",
              ngaySinh: "",
              gioiTinh: "",
              diaChi: "",
            });
            button();
            onAdd();
          }
        } catch (error) {
          // Xử lý lỗi nếu có
          setError(error.response?.data?.message || error.message);
        }
      },
      onCancel() {
        console.log("Hủy bỏ thao tác thêm nhân viên");
      },
    });
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Thêm Mới Nhân Viên
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="hoTen" className="mb-1 block">
              Họ Tên:
            </label>
            <input
              type="text"
              id="hoTen"
              name="hoTen"
              value={formData.hoTen}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="hoTen" className="mb-1 block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="sdt" className="mb-1 block">
              Số Điện Thoại:
            </label>
            <input
              type="tel"
              id="sdt"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="ngaySinh" className="mb-1 block">
              Ngày Sinh:
            </label>
            <input
              type="date"
              id="ngaySinh"
              name="ngaySinh"
              value={formData.ngaySinh}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="gioiTinh" className="mb-1 block">
              Giới Tính:
            </label>
            <select
              id="gioiTinh"
              name="gioiTinh"
              value={formData.gioiTinh}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <label htmlFor="diaChi" className="mb-1 block">
              Địa chỉ:
            </label>
            <input
              type="text"
              id="diaChi"
              name="diaChi"
              value={formData.diaChi}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Thêm Mới Nhân Viên
          </button>
        </form>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
    </div>
  );
}
