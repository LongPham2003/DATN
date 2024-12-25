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
    ma: "",
    tenVoucher: "",
    dieuKienGiamGia: "",
    hinhThucGiam: "VND",
    mucGiam: "",
    giamToiDa: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    trangThai: "",
  });

  const formatCurrency = (value) => {
    if (!value) return "";
    // Xóa ký tự không phải số và định dạng lại
    const numberValue = value.replace(/[^0-9]/g, "");
    return new Intl.NumberFormat("vi-VN").format(numberValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "dieuKienGiamGia" || name === "mucGiam" || name === "giamToiDa"
          ? formatCurrency(value) // Format trực tiếp
          : value,
    }));
  };

  // hàm format lại định dạng khi gửi về be
  const formatCurrencyToNumber = (value) => {
    return parseInt(value.replace(/(?!^-)\D/g, ""));
  };

  // update phiếu giảm giá
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật phiếu giảm giá này không ?",
      onOk() {
        // Nếu người dùng xác nhận, gửi yêu cầu cập nhật
        axios
          .post(`http://localhost:8080/api/phieugiamgia/update/${id}`, {
            tenVoucher: formData.tenVoucher,
            dieuKienGiamGia: formatCurrencyToNumber(formData.dieuKienGiamGia),
            hinhThucGiam: formData.hinhThucGiam,
            mucGiam: formatCurrencyToNumber(formData.mucGiam),
            giamToiDa:
              formData.hinhThucGiam === "%"
                ? formatCurrencyToNumber(formData.giamToiDa)
                : formatCurrencyToNumber(formData.mucGiam),
            soLuong: formData.soLuong,
            ngayBatDau: formData.ngayBatDau,
            ngayKetThuc: formData.ngayKetThuc,
            trangThai: formData.trangThai,
            ma: formData.ma,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            setError("");
            toast.success("Cập nhật thành công");
            navigate("/admin/phieugiamgia");
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
            setError(error.response.data.message);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  // chi tiết  phiếu giảm giá

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/phieugiamgia/${id}`)
      .then((response) => {
        const resData = response.data.result;

        setPhieuGiamGia(resData);
        setFormData({
          ma: resData.ma,
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
          Chi Tiết Phiếu Giảm Giá
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap">
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Mã</label>
              <input
                name="tenVoucher"
                value={formData.ma}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Tên voucher..."
                type="text"
                readOnly
              />
            </div>
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

              <select
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                name="hinhThucGiam"
                value={formData.hinhThucGiam}
                onChange={handleChange}
                disabled
              >
                <option value="VND">Tiền mặt</option>

                <option value="%">Phần trăm</option>
              </select>
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
            {formData.hinhThucGiam === "%" && (
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
            )}
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
                type="datetime-local"
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="block">Ngày kết thúc:</label>
              <input
                name="ngayKetThuc"
                value={formData.ngayKetThuc}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="datetime-local"
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
                disabled
              >
                <option value="">Chọn trạng thái</option>
                <option value="Sắp Hoạt Động">Sắp Hoạt Động</option>
                <option value="Hoạt Động">Hoạt Động</option>
                <option value="Ngừng Hoạt Động">Ngừng Hoạt Động</option>
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
          <div className="text-center">
            {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          </div>
          <div className="w-full p-2">
            <button
              type="submit"
              className="mx-auto flex h-10 w-[225px] rounded-md border border-transparent bg-blue-500 px-4 py-2 text-center text-white hover:bg-blue-600"
            >
              Cập nhật phiếu giảm giá
            </button>
          </div>
        </form>
      </div>
      {/* <ToastContainer
        position="top-center"
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
};
export default ChiTietPhieuGiamGia;
