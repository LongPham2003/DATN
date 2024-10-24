import axios from "../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { Modal } from "antd";

const ChiTietPhieuGiamGia = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [phieuGiamGia, setPhieuGiamGia] = useState();
  const [formData, setFormData] = useState({
    tenVoucher: "",
    dieuKienGiamGia: "",
    hinhThucGiam: "",
    mucGiam: "",
    giamToiDa: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    trangThai: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // update phiếu giảm giá
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật voucher này không?",
      onOk() {
        // Nếu người dùng xác nhận, gửi yêu cầu cập nhật
        axios
          .post(`http://localhost:8080/api/phieugiamgia/update/${id}`, {
            tenVoucher: formData.tenVoucher,
            dieuKienGiamGia: formData.dieuKienGiamGia,
            hinhThucGiam: formData.hinhThucGiam,
            mucGiam: formData.mucGiam,
            giamToiDa: formData.giamToiDa,
            soLuong: formData.soLuong,
            ngayBatDau: formData.ngayBatDau,
            ngayKetThuc: formData.ngayKetThuc,
            trangThai: formData.trangThai,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            setError("");
            toast.success("Cập nhật thành công");
            navigate("/admin/phieugiamgia");
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

  // chi tiết nhân viên

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/phieugiamgia/${id}`)
      .then((response) => {
        const resData = response.data.result;

        setPhieuGiamGia(resData);
        setFormData({
          tenVoucher: resData.tenVoucher,
          dieuKienGiamGia: resData.dieuKienGiamGia,
          hinhThucGiam: resData.hinhThucGiam,
          mucGiam: resData.mucGiam,
          giamToiDa: resData.giamToiDa,
          soLuong: resData.soLuong,
          ngayBatDau: resData.ngayBatDau,
          ngayKetThuc: resData.ngayKetThuc,
          trangThai: resData.trangThai,
          ngayTao: resData.ngayTao,
          ngayCapNhat: resData.ngayCapNhat,
          nguoiTao: resData.nguoiTao,
          nguoiCapNhat: resData.nguoiCapNhat,
        });
      })
      .catch((error) => {
        console.error("Lỗi: " + error);
        setError("Không thể tải thông tin.");
      });
  }, [id]);

  return (
    <div className="mt-2 flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-3 text-center text-2xl font-bold">
          Chi Tiết Nhân Viên
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap">
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Tên khuyến mãi:</label>
              <input
                name="tenVoucher"
                value={formData.tenVoucher}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Tên voucher..."
                type="text"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Điều kiện giảm:</label>
              <input
                name="dieuKienGiamGia"
                value={formData.dieuKienGiamGia}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Điều kiện giảm..."
                type="text"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Hình thức giảm:</label>
              <input
                name="hinhThucGiam"
                value={formData.hinhThucGiam}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Hình thức giảm..."
                type="text"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Mức giảm:</label>
              <input
                name="mucGiam"
                value={formData.mucGiam}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Mức giảm..."
                type="text"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Giảm tối đa:</label>
              <input
                name="giamToiDa"
                value={formData.giamToiDa}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Giảm tối đa..."
                type="text"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Số lượng:</label>
              <input
                name="soLuong"
                value={formData.soLuong}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Số lượng..."
                type="number"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Ngày bắt đầu:</label>
              <input
                name="ngayBatDau"
                value={formData.ngayBatDau}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Ngày kết thúc:</label>
              <input
                name="ngayKetThuc"
                value={formData.ngayKetThuc}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
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
                <option value="true">Còn</option>
                <option value="false">Hết</option>
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
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
            <div className="w-full p-2">
              <button
                type="submit"
                className="mx-auto flex rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cập nhật phiếu giảm giá
              </button>
            </div>
          </div>
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
export default ChiTietPhieuGiamGia;
