import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { DiaChiKhachHang } from "../../admin/KhachHang/DiaChiKhachHang";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
export default function ThongTinCaNhan() {
  const [email, setEmail] = useState("");
  const [khachHang, setKhachHang] = useState({});
  const [id, setId] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const ten = localStorage.getItem("email");
    setEmail(ten);
  }, []);
  useEffect(() => {
    const ApiTimKhTheoEmail = `http://localhost:8080/client/khachhang/timtheoEmail?email=${email}`;

    async function fetchKhachHang() {
      try {
        const response = await axios.get(ApiTimKhTheoEmail);
        setKhachHang(response.data);
        console.log(response.data);
        setId(response.data.id);
        console.log(id);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    if (email) {
      fetchKhachHang();
    }
  }, [email]);

  //

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
    soNhaDuongThonXom: "",
    province: "",
    district: "",
    ward: "",
    trangThai: null,
    ma: "",
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

  const handleUpdate = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật khách hàng này không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/khachhang/update/${id}`, {
            hoTen: formData.hoTen,
            email: formData.email,
            sdt: formData.sdt,
            ngaySinh: formData.ngaySinh,
            gioiTinh: formData.gioiTinh,
            ma: formData.ma,
            trangThai: true,
            soNhaDuongThonXom: formData.soNhaDuongThonXom,
            diaChiChiTiet: fullAddress, // Gửi địa chỉ đầy đủ
            tinhThanhPho: formData.province,
            huyenQuan: formData.district,
            xaPhuong: formData.ward,
          })
          // eslint-disable-next-line no-unused-vars
          .then((res) => {
            toast.success("Cập nhật thông tin thành công!");
            navigate(0);
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

  // Lấy thông tin khách hàng
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/khachhang/${id}`,
        );
        const customerData = response.data.result;

        // Lấy thông tin địa chỉ cos trangThai true trong mảng diaChis
        const addressData = customerData.diaChis.find(
          (diaChi) => diaChi.diaChiMacDinh === true,
        );

        if (addressData) {
          const provinceData = diaChiData.province.find(
            (province) => province.name === addressData.tinhThanhPho,
          );
          const districtData = diaChiData.district.find(
            (district) => district.name === addressData.huyenQuan,
          );
          const communeData = diaChiData.commune.find(
            (commune) => commune.name === addressData.xaPhuong,
          );

          // Cập nhật dữ liệu vào form
          setFormData({
            hoTen: customerData.hoTen,
            email: customerData.email,
            sdt: customerData.sdt,
            ngaySinh: customerData.ngaySinh,
            gioiTinh: customerData.gioiTinh,
            ma: customerData.ma,
            trangThai: customerData.trangThai,
            province: addressData.tinhThanhPho,
            district: addressData.huyenQuan,
            ward: addressData.xaPhuong,
            soNhaDuongThonXom: addressData.soNhaDuongThonXom,
            diaChiChiTiet: addressData.diaChiChiTiet,
          });

          // Cập nhật các giá trị cho dropdown
          setSelectedProvince(provinceData ? provinceData.idProvince : "");
          setSelectedDistrict(districtData ? districtData.idDistrict : "");
          setSelectedCommune(communeData ? communeData.idCommune : "");
          setFullAddress(addressData.diaChiChiTiet);
        }
      } catch (error) {
        setError("Không tìm thấy thông tin khách hàng.");
        console.error("Error fetching customer data", error);
      }
    };

    // Gọi fetchCustomerData mỗi khi diaChiData thay đổi
    if (diaChiData.province.length > 0) {
      fetchCustomerData();
    }
  }, [id, diaChiData]);
  return (
    <div className="flex h-auto items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg bg-white px-8 shadow-md">
        <div className="flex gap-3">
          <form className="w-2/4">
            <h1 className="mb-6 text-2xl font-bold">Thông tin cá nhân</h1>
            <div className="flex flex-wrap">
              {/* <div className="w-full p-2 sm:w-1/2">
                <label htmlFor="ma" className="mb-1 block">
                  Mã:
                </label>
                <input
                  type="text"
                  id="ma"
                  name="ma"
                  value={formData.ma}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div> */}
              <div className="w-full p-3 sm:w-1/2">
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
              <div className="w-full p-3 sm:w-1/2">
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
              <div className="w-full p-3 sm:w-1/2">
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
              <div className="w-full p-3 sm:w-1/2">
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
              <div className="w-full p-3 sm:w-1/2">
                <label className="mb-1 block">Giới Tính:</label>
                <select
                  name="gioiTinh"
                  value={formData.gioiTinh}
                  onChange={handleChange}
                  className="w-full rounded border p-3"
                  required
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>

              {/* <div className="w-full p-2 sm:w-1/2">
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
              </div> */}

              <div className="w-full p-3 sm:w-1/2">
                <label className="mb-1 block">Tỉnh/Thành Phố:</label>
                <select
                  name="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  className="w-full rounded border p-3"
                  required
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  {diaChiData.province.map((province) => (
                    <option
                      key={province.idProvince}
                      value={province.idProvince}
                    >
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full p-3 sm:w-1/2">
                <label className="mb-1 block">Quận/Huyện:</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full rounded border p-3"
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
              <div className="w-full p-3 sm:w-1/2">
                <label className="mb-1 block">Xã/Phường:</label>
                <select
                  name="ward"
                  value={selectedCommune}
                  onChange={handleCommuneChange}
                  className="w-full rounded border p-3"
                  required
                >
                  <option value="">Chọn xã/phường</option>
                  {selectedDistrict &&
                    diaChiData.commune
                      .filter(
                        (commune) => commune.idDistrict === selectedDistrict,
                      )
                      .map((commune) => (
                        <option
                          key={commune.idCommune}
                          value={commune.idCommune}
                        >
                          {commune.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="w-full p-3 sm:w-1/2">
                <label className="mb-1 block">Số Nhà, Làng :</label>
                <input
                  type="text"
                  value={formData.soNhaDuongThonXom}
                  className="w-full rounded border p-3"
                  onChange={handleChange}
                  name="soNhaDuongThonXom" // Đảm bảo có name để xử lý
                />
              </div>
              <div className="w-full p-3">
                <label className="mb-1 block">Địa Chỉ chi tiết:</label>
                <input
                  type="text"
                  value={fullAddress}
                  className="w-full rounded border p-2"
                  onChange={fullAddress}
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleUpdate}
              className="mx-auto flex h-[40px] w-[200px] items-center justify-center rounded bg-blue-500 p-2 text-white"
            >
              Cập Nhật
            </button>
          </form>

          <div className="my-4 w-2/4">
            <DiaChiKhachHang idKhachHang={id}></DiaChiKhachHang>
          </div>
        </div>
      </div>
      {/* <ToastContainer
        position="top-center"
        autoClose={3000}
        transition={Bounce}
      /> */}
    </div>
  );
}
