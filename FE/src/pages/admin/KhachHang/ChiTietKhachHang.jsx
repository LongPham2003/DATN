import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ChiTietKhachHang() {
  const { id } = useParams();
  const [error, setError] = useState("");

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [diaChiData, setDiaChiData] = useState({
    province: [],
    district: [],
    commune: [],
  });

  const [fullAddress, setFullAddress] = useState("");
  const [formData, setFormData] = useState({
    hoTen: "",
    email: "",
    sdt: "",
    ngaySinh: "",
    gioiTinh: "",
    diaChi: "",
    province: "",
    district: "",
    ward: "",
    trangThai: null,
  });

  // API địa chỉ
  useEffect(() => {
    const fetchDiaChi = async () => {
      try {
        const response = await axios.get("/Diachi.json");
        console.log("Dữ liệu nhận được:", response.data);
        setDiaChiData(response.data);
      } catch (error) {
        console.error("Error loading diachi.json", error);
      }
    };
    fetchDiaChi();
  }, []);

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
    } else {
      setError("Không tìm thấy tỉnh/thành phố.");
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
    } else {
      setError("Không tìm thấy quận/huyện.");
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
    } else {
      setError("Không tìm thấy xã/phường.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Lấy thông tin khách hàng
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/khachhang/${id}`,
        );
        const customerData = response.data.result;
        setFormData({
          hoTen: customerData.hoTen,
          email: customerData.email,
          sdt: customerData.sdt,
          ngaySinh: customerData.ngaySinh,
          gioiTinh: customerData.gioiTinh,
          trangThai: customerData.trangThai,
          province: customerData.tinhThanhPho,
          district: customerData.huyenQuan,
          ward: customerData.xaPhuong,
          diaChi: customerData.diaChiChiTiet,
        });
        setFullAddress(customerData.diaChiChiTiet);
      } catch (error) {
        setError("Không tìm thấy thông tin khách hàng.");
        console.error("Error fetching customer data", error);
      }
    };
    fetchCustomerData();
  }, [id]);

  useEffect(() => {
    if (
      formData.diaChi &&
      formData.ward &&
      formData.district &&
      formData.province
    ) {
      const fullAddr = `${formData.diaChi} - ${formData.ward} - ${formData.district} - ${formData.province}`;
      setFullAddress(fullAddr);
    } else {
      setFullAddress("");
    }
  }, [formData.diaChi, formData.ward, formData.district, formData.province]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/khachhang/update/${id}`,
        {
          hoTen: formData.hoTen,
          email: formData.email,
          sdt: formData.sdt,
          ngaySinh: formData.ngaySinh,
          gioiTinh: formData.gioiTinh,
          trangThai: formData.trangThai,
          diaChiChiTiet: fullAddress, // Gửi địa chỉ đầy đủ
          tinhThanhPho: formData.province,
          huyenQuan: formData.district,
          xaPhuong: formData.ward,
        },
      );
      toast.success("Cập nhật thông tin thành công!");
      console.log("Cập nhật thành công:", response.data);
    } catch (error) {
      toast.error("Cập nhật thông tin không thành công.");
      console.error("Error updating customer data", error);
    }
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Chi Tiết Khách Hàng
        </h1>
        <form className="space-y-4">
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
              />
            </div>
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded border p-2"
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
                <option value="false">Ngừng Hoạt Động</option>
              </select>
            </div>

            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Tỉnh/Thành Phố:</label>
              <select
                name="province"
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
                name="district"
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
                name="ward"
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
                value={formData.diaChi}
                className="w-full rounded border p-2"
                onChange={handleChange}
                name="diaChi" // Đảm bảo có name để xử lý
              />
            </div>
            <div className="w-full p-2">
              <label className="mb-1 block">Địa Chỉ chi tiết:</label>
              <input
                type="text"
                value={fullAddress}
                className="w-full rounded border p-2"
                readOnly
              />
            </div>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            onClick={handleUpdate}
            className="w-full rounded bg-blue-500 p-2 text-white"
          >
            Cập Nhật
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
      />
    </div>
  );
}
