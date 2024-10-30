import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export const DiaChiKhachHang = ({ idKhachHang }) => {
  const [diaChiKhachHang, setDiaChiByKhachHang] = useState([]);
  const navigate = useNavigate();
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
    diaChi: "",
    soNhaDuongThonXom: "",
    province: "",
    district: "",
    ward: "",
    trangThai: null,
  });

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
        soNhaDuongThonXom: "", // Reset địa chỉ khi thay đổi tỉnh
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

  const [error, setError] = useState("");

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/diachi/allbyidkhachhang", {
        params: {
          idKhachHang: idKhachHang,
        },
      })
      .then(async (res) => {
        const data = res.data;
        setDiaChiByKhachHang(data.result);
      })
      .catch((error) => {
        console.error("Lỗi" + error);
      });
  }, [
    idKhachHang,
    diaChiData.province,
    diaChiData.district,
    diaChiData.commune,
  ]);

  // update nhanh trạng thái địa chỉ
  const handleUpdateTrangThaiDiaChi = (idDiaChi, event) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định

    axios
      .put(`http://localhost:8080/diachi/setDefault/${idDiaChi}`, null, {
        params: { idKhachHang }, // Đảm bảo params nằm ở đây
      })
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        // Sau khi API thành công, gọi lại API để lấy danh sách địa chỉ cập nhật
        return axios.get("http://localhost:8080/diachi/allbyidkhachhang", {
          params: { idKhachHang },
        });
      })
      .then((res) => {
        setDiaChiByKhachHang(res.data.result); // Cập nhật lại danh sách địa chỉ
        window.location.reload(); // Tải lại trang
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật trạng thái:", error);
      });
  };

  //

  useEffect(() => {
    if (
      formData.soNhaDuongThonXom &&
      formData.ward &&
      formData.district &&
      formData.province
    ) {
      const fullAddr = `${formData.soNhaDuongThonXom} - ${formData.ward} - ${formData.district} - ${formData.province}`;
      setFullAddress(fullAddr);
    } else {
      setFullAddress("");
    }
  }, [
    formData.soNhaDuongThonXom,
    formData.ward,
    formData.district,
    formData.province,
  ]);

  const handleAddDiaChi = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn thêm địa chỉ này không?",
      onOk() {
        axios
          .post(
            `http://localhost:8080/diachi/addbyidkhachhang/${idKhachHang}`,
            {
              soNhaDuongThonXom: formData.soNhaDuongThonXom,
              diaChiChiTiet: fullAddress, // Gửi địa chỉ đầy đủ
              tinhThanhPho: formData.province,
              huyenQuan: formData.district,
              xaPhuong: formData.ward,
            },
          )
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            toast.success("Cập nhật thông tin thành công!");
            navigate("/admin/khachhang");
          })

          .catch((error) => {
            toast.error("Cập nhật thông tin không thành công.");
            console.error("Error updating customer data", error);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  return (
    <div>
      <form
        action=""
        style={{
          maxHeight: "300px", // Thiết lập chiều cao tối đa
          overflowY: "auto", // Thêm thanh cuộn dọc
          border: "1px solid #ccc", // Tùy chọn: thêm đường viền
          padding: "5px", // Tùy chọn: thêm khoảng cách bên trong
          borderRadius: "5px", // Tùy chọn: bo góc
        }}
      >
        {diaChiKhachHang.map((item, index) => (
          <div key={item.id} className="mb-4">
            <p className="font-bold">+ Địa chỉ thứ {index + 1}:</p>
            <div className="mt-5 flex gap-3">
              <p className="pl-2">{item.diaChiChiTiet}</p>
              <button
                className={`relative flex h-6 w-[50px] items-center rounded-full bg-blue-500 transition-all duration-300 ${
                  item.diaChiMacDinh ? "justify-end" : "justify-start"
                }`}
                onClick={(event) => handleUpdateTrangThaiDiaChi(item.id, event)} // Gọi sự kiện với event
              >
                <div
                  className={`h-6 w-6 transform rounded-full shadow-md ${
                    item.diaChiMacDinh
                      ? "translate-x bg-green-400"
                      : "translate-x bg-red-600"
                  } transition-transform duration-300`}
                ></div>
              </button>
            </div>
            <hr className="my-3" />
          </div>
        ))}
      </form>
      <p className="mx-3 my-5 font-bold"> Thêm địa chỉ mới:</p>
      <form action="">
        <div className="flex">
          <div className="w-full p-2 sm:w-1/2">
            <label className="mb-1 block">Tỉnh/Thành Phố:</label>
            <select
              name="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full rounded border p-2 "
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
        </div>

        <div className="flex">
          {" "}
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
                  .filter((commune) => commune.idDistrict === selectedDistrict)
                  .map((commune) => (
                    <option key={commune.idCommune} value={commune.idCommune}>
                      {commune.name}
                    </option>
                  ))}
            </select>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <label className="mb-1 block">Số Nhà, Làng :</label>
            <input
              type="text"
              value={formData.soNhaDuongThonXom}
              className="w-full rounded border p-2"
              onChange={handleChange}
              name="soNhaDuongThonXom" // Đảm bảo có name để xử lý
            />
          </div>
        </div>
        <div className="w-full p-2">
          <label className="mb-1 block">Địa Chỉ chi tiết:</label>
          <input
            type="text"
            value={fullAddress}
            className="w-full rounded border p-2"
            onChange={fullAddress}
            disabled
          />
        </div>

        <button
          type="submit"
          onClick={handleAddDiaChi}
          className="w-full rounded bg-blue-500 p-2 text-white"
        >
          Thêm địa chỉ mới
        </button>
      </form>
    </div>
  );
};
