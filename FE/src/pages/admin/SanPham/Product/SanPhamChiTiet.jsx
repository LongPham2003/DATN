import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownDetail from "../../../DropdownDetail";
import { Bounce, toast, ToastContainer } from "react-toastify";

const SanPhamChiTiet = ({productId,closeModal}) => {

  const  id  = productId;
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [formData, setFormData] = useState({
    ma: "",
    tenSanPham: "",
    ngayTao: "",
    idLoai: 0,
    moTa: "",
    trangThai: true,
  });

  let ApiGetById = `http://localhost:8080/api/sanpham/${id}`;

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;

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
        idLoai: res.data.result.idLoai,
        ngayTao: res.data.result.ngayTao || "",
        moTa: res.data.result.moTa || "",
        trangThai: res.data.result.trangThai || false,
      });
    } catch (error) {
      console.log(error);
    }
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
  const handleOptionSelect = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      idLoai: selectedOption.id,
    }));
  };
  // eslint-disable-next-line no-unused-vars
  const update = async (e) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/sanpham/update/${id}`,
        formData,
      );
      toast.success("Sửa thành công");
      navigate("/admin/sanpham");
      closeModal();
      console.log("Update response:", res);

    } catch (error) {
      console.log("Error during update:", error);
      toast.error("Có lỗi sảy ra");
    }
  };
  useEffect(() => {
    getById();
    // getByIdSP();
    // layAnh();
  }, []);
  return (
    <div className="flex mx-auto mt-3 w-auto">
      <form
        action=""
        className="mx-auto my-2"
        onSubmit={(e) => {
          e.preventDefault();
          update();
        }}
      >
        <span className="my-3 text-xl font-bold">Chi tiết Sản phẩm</span>
        <div className="gap-9">
          <div>
            <div className="my-4">
              <label htmlFor="tenSanPham" className="mb-1 block font-semibold">
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
              <label htmlFor="tenSanPham" className="mb-1 block font-semibold">
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
            <div className="mb-4 flex justify-center gap-5">
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
        <div className="flex justify-center">
          <button className="h-[40px] w-[100px] rounded-xl border-2 border-green-500 font-semibold shadow-inner duration-300 hover:bg-green-500">
            Sửa
          </button>
        </div>
      </form>
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
export default SanPhamChiTiet;
