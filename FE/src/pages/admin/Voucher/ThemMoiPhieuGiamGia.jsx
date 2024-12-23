import { useState } from "react";
import axios from "../../../api/axiosConfig";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";

// eslint-disable-next-line react/prop-types
const ThemMoiPhieuGiamGia = ({ button, onAdd }) => {
  const { confirm } = Modal;

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
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

  const validateTentu3den50 = (ten) => {
    return ten.length >= 10 && ten.length <= 50; // Chỉ kiểm tra độ dài
  };

  const validateTenSanPhamkhongchuakytudacbiet = (ten) => {
    const regex = /^[\p{L}\p{M}\d\s]+$/u; // Cho phép tất cả các ký tự chữ (có dấu), số và khoảng trắng
    return regex.test(ten); // Kiểm tra ký tự đặc biệt
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

    const input = value.trim();
    if (input === "") {
      setError("Tên phiếu giảm giá không được để trống");
      setDisabled(true);
      return;
    } else if (!validateTentu3den50(input)) {
      setError("Tên phiếu giảm giá từ 10 đến 50 ký tự");
      setDisabled(true);
      return;
    } else if (!validateTenkhongchuakytudacbiet(input)) {
      setError("Tên phiếu giảm giá không chứa kí tự đặc biệt");
      setDisabled(true);
      return;
    } else {
      setError("");
      setDisabled(false);
    }
  };

  // hàm format lại định dạng khi gửi về be
  const formatCurrencyToNumber = (value) => {
    if (!value) return 0; // Trả về 0 nếu giá trị rỗng
    return parseInt(value.replace(/\./g, ""), 10); // Loại bỏ dấu "." và chuyển thành số
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Xử lý logic gửi dữ liệu form ở đây
    confirm({
      title: "Bạn có chắc chắn muốn thêm phiếu giảm giá này ?",
      content: "Vui lòng xác nhận trước khi tiếp tục.",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/phieugiamgia/add",
            {
              tenVoucher: formData.tenVoucher,
              dieuKienGiamGia: formatCurrencyToNumber(formData.dieuKienGiamGia),
              hinhThucGiam: formData.hinhThucGiam,
              mucGiam: formatCurrencyToNumber(formData.mucGiam),
              giamToiDa:
                formData.hinhThucGiam === "%"
                  ? formatCurrencyToNumber(formData.giamToiDa)
                  : formatCurrencyToNumber(formData.mucGiam),
              soLuong: parseInt(formData.soLuong),
              ngayBatDau: formData.ngayBatDau,
              ngayKetThuc: formData.ngayKetThuc,
              // trangThai: true
            },
            console.log(formData),
          );

          if (response.status === 200) {
            toast.success("Thành công");

            // Reset form về trạng thái ban đầu
            setFormData({
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
            button();
            onAdd();
          }
        } catch (error) {
          setError(error.response?.data?.message || error.message);
        }
      },
      onCancel() {
        console.log("Hủy bỏ thao tác thêm phiếu giảm giá");
      },
    });
  };
  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-3 text-center text-2xl font-bold">
          Thêm Mới Phiếu giảm giá
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

              <select
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                name="hinhThucGiam"
                value={formData.hinhThucGiam}
                onChange={handleChange}
              >
                <option value="VND">Tiền mặt</option>
                <option value="%">Phần trăm</option>
              </select>
              {/*<input*/}
              {/*  name="hinhThucGiam"*/}
              {/*  value={formData.hinhThucGiam}*/}
              {/*  onChange={handleChange}*/}
              {/*  className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"*/}
              {/*  placeholder="Hình thức giảm..."*/}
              {/*  type="text"*/}
              {/*/>*/}
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

            <div className="w-full p-2">
              <button
                type="submit"
                className="mx-auto flex rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                disabled={disabled}
              >
                Thêm
              </button>
              {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
            </div>
          </div>
        </form>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
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
export default ThemMoiPhieuGiamGia;
