/* eslint-disable react/prop-types */
import { Modal } from "antd";
import axios from "../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ThemMoiKhachHang({ button, onAdd }) {
  const [error, setError] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [diaChiData, setDiaChiData] = useState({
    province: [],
    district: [],
    commune: [],
  });

  const [fullAddress, setFullAddress] = useState(""); // Biến lưu địa chỉ đầy đủ
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    soNhaDuongThonXom: "",
    province: "",
    district: "",
    ward: "",
  });

  // API địa chỉ
  useEffect(() => {
    axios
      .get("/Diachi.json")
      .then((response) => {
        console.log("Dữ liệu nhận được:", response.data);
        setDiaChiData(response.data);
      })
      .catch((error) => {
        console.error("Error loading diachi.json", error);
      });
  }, []);

  useEffect(() => {
    if (
      detailAddress &&
      formData.ward &&
      formData.district &&
      formData.province
    ) {
      const fullAddr = `${detailAddress} - ${formData.ward} - ${formData.district} - ${formData.province}`;
      console.log("Cập nhật địa chỉ đầy đủ:", fullAddr);
      setFullAddress(fullAddr);
    } else {
      setFullAddress("");
    }
  }, [detailAddress, formData.ward, formData.district, formData.province]);

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict("");
    setSelectedCommune("");

    const selectedProvinceData = diaChiData.province.find(
      (province) => province.idProvince === selectedProvinceId,
    );
    if (selectedProvinceData) {
      setFormData((prevState) => ({
        ...prevState,
        province: selectedProvinceData.name,
        district: "",
        ward: "",
        diaChi: "", // Reset địa chỉ khi thay đổi tỉnh
      }));
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);
    setSelectedCommune("");

    const selectedDistrictData = diaChiData.district.find(
      (district) => district.idDistrict === selectedDistrictId,
    );
    if (selectedDistrictData) {
      setFormData((prevState) => ({
        ...prevState,
        district: selectedDistrictData.name,
        ward: "",
      }));
    }
  };

  const handleCommuneChange = (event) => {
    const selectedCommuneId = event.target.value;
    setSelectedCommune(selectedCommuneId);

    const selectedCommuneData = diaChiData.commune.find(
      (commune) => commune.idCommune === selectedCommuneId,
    );
    if (selectedCommuneData) {
      setFormData((prevState) => ({
        ...prevState,
        ward: selectedCommuneData.name,
      }));
    }
  };

  const handleDetailAddressChange = (event) => {
    const newDetailAddress = event.target.value;
    setDetailAddress(newDetailAddress);
    setFormData((prevState) => ({
      ...prevState,
      soNhaDuongThonXom: newDetailAddress, // Cập nhật soNhaDuongThonXom
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường bắt buộc
    if (
      !formData.hoTen ||
      !formData.email ||
      !formData.sdt ||
      !formData.ngaySinh ||
      !formData.gioiTinh ||
      !detailAddress ||
      !formData.province ||
      !formData.district ||
      !formData.ward
    ) {
      setError("Tất cả các trường đều phải được điền.");
      return; // Dừng việc gửi dữ liệu nếu có trường không hợp lệ
    }

    // Tạo địa chỉ đầy đủ
    const fullAddress = `${detailAddress} - ${formData.ward} - ${formData.district} - ${formData.province}`;

    // Cập nhật formData với địa chỉ đầy đủ
    setFormData((prevState) => ({
      ...prevState,
      diaChiChiTiet: fullAddress, // Cập nhật địa chỉ đầy đủ vào formData
    }));

    Modal.confirm({
      title: "Xác nhận thêm khách hàng",
      content: "Bạn có chắc chắn muốn thêm khách hàng này không?",
      onOk: async () => {
        try {
          const response = await axios.post(
            "http://localhost:8080/api/khachhang/add",
            {
              hoTen: formData.hoTen,
              email: formData.email,
              sdt: formData.sdt,
              ngaySinh: formData.ngaySinh,
              soNhaDuongThonXom: formData.soNhaDuongThonXom,
              gioiTinh: formData.gioiTinh,
              diaChiChiTiet: fullAddress, // Gửi địa chỉ đầy đủ
              tinhThanhPho: formData.province,
              huyenQuan: formData.district,
              xaPhuong: formData.ward,
            },
          );

          console.log(formData);
          if (response.status === 200) {
            // Nếu thành công, có thể xử lý thông báo hoặc reset form
            toast.success("Thành công");

            // Reset form về trạng thái ban đầu
            setFormData({
              hoTen: "",
              email: "",
              sdt: "",
              ngaySinh: "",
              gioiTinh: "",
              diaChi: "",
              province: "",
              district: "",
              ward: "",
              soNhaDuongThonXom: "",
            });
            setDetailAddress("");
            setSelectedProvince("");
            setSelectedDistrict("");
            setSelectedCommune("");
          }
          button();
          onAdd();
        } catch (error) {
          // Xử lý lỗi nếu có
          setError(error.response?.data?.message || error.message);
        }
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Thêm Mới Khách Hàng
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap">
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
              <label className="mb-1 block">Tài khoản:</label>
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
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Số Điện Thoại:</label>
              <input
                type="text"
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
              <label className="mb-1 block">Giới Tính:</label>
              <select
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
              <label className="mb-1 block">Tỉnh/Thành Phố:</label>
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {diaChiData.province.map((province) => (
                  <option key={province.idProvince} value={province.idProvince}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Quận/Huyện:</label>
              <select
                value={selectedDistrict}
                onChange={handleDistrictChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn quận/huyện</option>
                {selectedProvince &&
                  diaChiData.district
                    .filter(
                      (district) => district.idProvince === selectedProvince,
                    )
                    .map((district) => (
                      <option
                        key={district.idDistrict}
                        value={district.idDistrict}
                      >
                        {district.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Xã/Phường:</label>
              <select
                value={selectedCommune}
                onChange={handleCommuneChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn xã/phường</option>
                {selectedDistrict &&
                  diaChiData.commune
                    .filter(
                      (commune) => commune.idDistrict === selectedDistrict,
                    )
                    .map((commune) => (
                      <option key={commune.idCommune} value={commune.idCommune}>
                        {commune.name}
                      </option>
                    ))}
              </select>
            </div>
            <div className="w-full p-2">
              <label className="mb-1 block">Số Nhà, Làng :</label>
              <input
                type="text"
                value={detailAddress}
                onChange={handleDetailAddressChange}
                className="w-full rounded border p-2"
                required
              />
            </div>
            <div className="w-full p-2">
              <label className="mb-1 block">Địa chỉ chi tiết:</label>
              <input
                type="text"
                value={fullAddress}
                onChange={fullAddress}
                className="w-full rounded border p-2"
                required
              />
            </div>
          </div>
          {error && <div className="text-center text-red-600">{error}</div>}
          <button
            type="submit"
            className="mt-4 w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            Thêm Khách Hàng
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          transition={Bounce}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
