import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

const ChiTietNhanVien = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [nhanVien, setNhanVien] = useState();
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    trangThai: null,
    chucVu: "",
    ma: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Hàm xử lý khi gửi form
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật voucher này không?",
      onOk() {
        axios
          .post(`http://localhost:8080/nhanvien/update/${id}`, {
            hoTen: formData.hoTen,
            ma: formData.ma,
            email: formData.email,
            sdt: formData.sdt,
            ngaySinh: formData.ngaySinh,
            gioiTinh: formData.gioiTinh,
            diaChi: formData.diaChi,
            trangThai: formData.trangThai,
            chucVu: formData.roles,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            setError("");
            toast.success("Thành công");
            navigate("/admin/nhanvien");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
            setError("Cập nhật thất bại. Vui lòng thử lại.");
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/nhanvien/${id}`)
      .then((response) => {
        const nhanVienData = response.data.result;

        setNhanVien(nhanVienData);
        setFormData({
          hoTen: nhanVienData.hoTen,
          ma: nhanVienData.ma,
          email: nhanVienData.email,
          sdt: nhanVienData.sdt,
          ngaySinh: nhanVienData.ngaySinh,
          gioiTinh: nhanVienData.gioiTinh,
          diaChi: nhanVienData.diaChi,
          trangThai: nhanVienData.trangThai,
          chucVu: nhanVienData.taiKhoan.roles,
          ngayTao: nhanVienData.createdAt,
          ngayCapNhat: nhanVienData.updatedAt,
          nguoiTao: nhanVienData.createdBy,
          nguoiCapNhat: nhanVienData.updatedBy,
        });
      })
      .catch((error) => {
        console.error("Lỗi: " + error);
        setError("Không thể tải thông tin nhân viên.");
      });
  }, [id]);

  console.log({ nhanVien });

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="h-full w-full max-w-4xl rounded-lg bg-white px-8 py-2 shadow-md">
        <h1 className="mb-3 text-center text-2xl font-bold">
          Chi Tiết Nhân Viên
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-wrap">
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="ma" className="mb-1 block">
                Họ Tên:
              </label>
              <input
                type="text"
                id="ma"
                name="ma"
                value={formData.ma}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
                disabled
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
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
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="email" className="mb-1 block">
                Email:
              </label>
              <input
                type="email"
                disabled
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
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
            <div className="w-full p-2 sm:w-1/2">
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
            <div className="w-full p-2 sm:w-1/2">
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
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="diaChi" className="mb-1 block">
                Địa Chỉ:
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
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Trạng Thái:</label>
              <select
                id="trangThai"
                name="trangThai"
                value={formData.trangThai}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn trạng thái</option>
                <option value="true">Hoạt Động</option>
                <option value="false">Nghỉ</option>
              </select>
            </div>

            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Chức Vụ:</label>
              <select
                id="chucVu"
                name="chucVu"
                value={formData.chucVu}
                className="w-full rounded border p-2"
                required
              >
                <option value="ROLE_NHANVIEN">Nhân Viên</option>
                <option value="ROLE_ADMIN">ADMIN</option>
              </select>
            </div>

            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="ngayTao" className="mb-1 block">
                Ngày Tạo:
              </label>
              <input
                type="date"
                id="ngayTao"
                name="ngayTao"
                disabled
                value={formData.ngayTao}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="nguoiTao" className="mb-1 block">
                Người Tạo:
              </label>
              <input
                type="text"
                id="nguoiTao"
                disabled
                name="nguoiTao"
                value={formData.nguoiTao}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="ngayCapNhat" className="mb-1 block">
                Ngày Cập Nhật:
              </label>
              <input
                type="date"
                id="ngayCapNhat"
                disabled
                name="ngayCapNhat"
                value={formData.ngayCapNhat}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label htmlFor="nguoiCapNhat" className="mb-1 block">
                Người Cập Nhật:
              </label>
              <input
                type="text"
                id="nguoiCapNhat"
                name="nguoiCapNhat"
                disabled
                value={formData.nguoiCapNhat}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>

          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Cập Nhật Nhân Viên
          </button>
        </form>
      </div>
      <ToastContainer
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
      />
    </div>
  );
};

export default ChiTietNhanVien;
