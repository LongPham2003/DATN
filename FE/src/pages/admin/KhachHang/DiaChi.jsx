import axios from "axios";
import { useEffect, useState } from "react";

export default function DiaChi() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [diaChiData, setDiaChiData] = useState({
    province: [],
    district: [],
    commune: [],
  });
  const [formData, setFormData] = useState({
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

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setSelectedProvince(selectedProvinceId);
    setSelectedDistrict("");
    setSelectedCommune("");

    const selectedProvinceData = diaChiData.province.find(
      (province) => province.idProvince === selectedProvinceId,
    );
    if (selectedProvinceData) {
      setFormData({
        province: selectedProvinceData.name,
        district: "",
        ward: "",
      });
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
      setFormData((prevFormData) => ({
        ...prevFormData,
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
      setFormData((prevFormData) => ({
        ...prevFormData,
        ward: selectedCommuneData.name,
      }));
    }
  };

  const handleDetailAddressChange = (event) => {
    setDetailAddress(event.target.value);
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <label htmlFor="province" className="mb-1 block">
          Chọn Tỉnh:
        </label>
        <select
          id="province"
          name="province"
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="w-full rounded border p-2"
          required
        >
          <option value="">-- Chọn tỉnh --</option>
          {diaChiData.province.map((province, index) => (
            <option key={index} value={province.idProvince}>
              {province.name}
            </option>
          ))}
        </select>

        <label htmlFor="district" className="mb-1 mt-4 block">
          Chọn Quận/Huyện:
        </label>
        <select
          id="district"
          name="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="w-full rounded border p-2"
          required
        >
          <option value="">-- Chọn quận/huyện --</option>
          {diaChiData.district
            .filter((district) => district.idProvince === selectedProvince)
            .map((district, index) => (
              <option key={index} value={district.idDistrict}>
                {district.name}
              </option>
            ))}
        </select>

        <label htmlFor="commune" className="mb-1 mt-4 block">
          Chọn Xã/Phường:
        </label>
        <select
          id="commune"
          name="commune"
          value={selectedCommune}
          onChange={handleCommuneChange}
          className="w-full rounded border p-2"
          required
        >
          <option value="">-- Chọn xã/phường --</option>
          {diaChiData.commune
            .filter((commune) => commune.idDistrict === selectedDistrict)
            .map((commune, index) => (
              <option key={index} value={commune.idCommune}>
                {commune.name}
              </option>
            ))}
        </select>

        <label htmlFor="detailAddress" className="mb-1 mt-4 block">
          Địa chỉ chi tiết:
        </label>
        <input
          type="text"
          id="detailAddress"
          name="detailAddress"
          value={detailAddress}
          onChange={handleDetailAddressChange}
          className="w-full rounded border p-2"
          placeholder="Nhập địa chỉ cụ thể..."
        />

        {selectedCommune && (
          <div className="mt-4">
            <p>
              Địa chỉ của bạn là :{detailAddress}-{formData.ward}-
              {formData.district}-{formData.province}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
