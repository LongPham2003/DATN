import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DropdownDetail from "../../../DropdownDetail";
import { Bounce, toast, ToastContainer } from "react-toastify";
import LayAnhTheoIdSP from "./LayANhTheoIDSP";

export default function DetailProduct() {
  const { id } = useParams();

  const [idLoai] = useState();

  const [loaiSelect, setLoaiSelect] = useState([]);
  const [SPCTbyIdSP, setSPCTbyIdSP] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    ma: "",
    tenSanPham: "",
    ngayTao: "",
    idLoai: 0,
    moTa: "",
    trangThai: true,
  });
  const navigate = useNavigate();
  let ApiGetById = `http://localhost:8080/api/sanpham/${id}`;

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;

  let ApiLaySPCTTheoIdSP = `http://localhost:8080/api/sanphamchitiet/getidsanpham/${id}`;

  // const [anh, setAnh] = useState([]);

  const getById = async () => {
    try {
      const res = await axios.get(ApiGetById);
      const loai = await axios.get(ApiGetAllLoai);
      // console.log(res.data.result.tenSanPham);

      setLoaiSelect(loai.data.result);
      // console.log(loai.data.result);

      setFormData({
        ma: res.data.result.ma || "",
        tenSanPham: res.data.result.tenSanPham || "",
        idLoai: res.data.result.idLoai || idLoai,
        ngayTao: res.data.result.ngayTao || "",
        moTa: res.data.result.moTa || "",
        trangThai: res.data.result.trangThai || false,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const update = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/sanpham/update/${id}`,
        formData,
      );
      toast.success("Sửa thành công");
      navigate("/admin/sanpham");
      console.log("Update response:", res);
    } catch (error) {
      console.log("Error during update:", error);
      toast.error("Có lỗi sảy ra");
    }
  };

  const getByIdSP = async () => {
    const data = await axios.get(ApiLaySPCTTheoIdSP);
    setSPCTbyIdSP(data.data.result);
    console.log(data.data.result);
  };

  const handleOptionSelect = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      idLoai: selectedOption.id,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng nhập giá trị hợp lệ
    if (name === "tenSanPham" && value.trim() !== "") {
      setError("");
    }
  };

  useEffect(() => {
    getById();
    getByIdSP();
    // layAnh();
  }, []);
  return (
    <>
      <div className="mx-5 mt-2 rounded-xl border drop-shadow-2xl">
        <form
          action=""
          className="mx-5 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            update();
          }}
        >
          <span className="text-xl font-bold">Chi tiết Sản phẩm</span>
          <div className="flex gap-9">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="tenSanPham"
                  className="mb-1 block font-semibold"
                >
                  Ma San Phẩm:
                </label>
                <input
                  type="text"
                  className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                  value={formData.ma}
                  name="tenSanPham"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tenSanPham"
                  className="mb-1 block font-semibold"
                >
                  Tên San Phẩm:
                </label>
                <input
                  type="text"
                  className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                  value={formData.tenSanPham}
                  name="tenSanPham"
                  onChange={handleChange}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="ngayTao" className="mb-1 block font-semibold">
                  Ngày tạo:
                </label>
                <input
                  type="date"
                  value={formData.ngayTao}
                  name="ngayTao"
                  onChange={handleChange}
                  readOnly={true}
                  className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="loai" className="mb-1 block font-semibold">
                  Loại:
                </label>
                <DropdownDetail
                  options={loaiSelect}
                  onSelect={handleOptionSelect}
                  selectedValue={formData.idLoai} // Truyền giá trị đã chọn
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label htmlFor="moTa" className="mb-1 block font-semibold">
                  Mô tả:
                </label>
                <textarea
                  value={formData.moTa}
                  name="moTa"
                  className="h-[70px] w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="trangThai" className="mb-1 block font-semibold">
                  Trạng thái:
                </label>
                <div className="flex gap-4">
                  <div>
                    <input
                      type="radio"
                      name="trangThai"
                      value="true"
                      checked={formData.trangThai === true}
                      onChange={() =>
                        setFormData({ ...formData, trangThai: true })
                      }
                      className="radio radio-primary"
                    />
                    <span>Kinh doanh</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="trangThai"
                      value="false"
                      checked={formData.trangThai === false}
                      onChange={() =>
                        setFormData({ ...formData, trangThai: false })
                      }
                      className="radio radio-primary"
                    />
                    <span>Ngừng kinh doanh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="h-[40px] w-[100px] rounded-xl border-2 border-green-500 font-semibold shadow-inner duration-300 hover:bg-green-500">
            Sua
          </button>
        </form>
      </div>
      <div className="mx-5 my-5">
        <span className="mb-5 text-xl font-bold">
          Danh sách sản phẩm chi tiết của sản phẩm
        </span>
        <div className="flex justify-center">
          <div className="min-w-full">
            {/* Thêm max-height và overflow-y-auto để tạo thành cuộn */}
            <div className="max-h-[500px] overflow-y-auto">
              <table className="min-w-full text-center">
                <thead>
                  <tr className="h-10 rounded-2xl border-b-2 text-base shadow-inner">
                    <th className="w-10">STT</th>
                    <th className="w-[100px]">Ảnh</th>
                    <th className="w-[100px]">Chất liệu</th>
                    <th className="w-[100px]">Màu</th>
                    <th className="w-[100px]">Kích thước</th>
                    <th className="w-[100px]">Thương Hiệu</th>
                    <th className="w-[100px]">Đế giày</th>
                    <th className="w-[100px]">Đơn giá</th>
                    <th className="w-[100px]">Số lượng</th>
                    <th className="w-[100px]">Trạng thái</th>
                    <th className="w-[100px]">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {SPCTbyIdSP.map((item, index) => (
                    <tr key={item.id}>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {index + 1}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        <LayAnhTheoIdSP
                          id={item.id}
                          className="h-[90px] w-[90px]"
                        />
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.chatLieu}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.mauSac}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.kichThuoc}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.thuongHieu}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.deGiay}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.donGia}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.soLuong}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        {item.trangThai ? "ban" : "deo ban nua"}
                      </td>
                      <td className="h-[100px] border-b-[1px] border-indigo-500">
                        1
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
    </>
  );
}
