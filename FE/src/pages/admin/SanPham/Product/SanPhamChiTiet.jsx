import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownDetail from "../../../DropdownDetail";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { set } from "react-hook-form";
const SanPhamChiTiet = ({ productId, closeModal }) => {
  const id = productId;
  const [disable, setDisable] = useState(false);
  const [errorTen, setErrorTen] = useState("");
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [danhSachTenSP, setDanhSachTenSP] = useState("");
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

  let ApiGetAllten = `http://localhost:8080/api/sanpham/ten`;

  // const [anh, setAnh] = useState([]);

  const getById = async () => {
    try {
      const res = await axios.get(ApiGetById);
      const loai = await axios.get(ApiGetAllLoai);
      // console.log(res.data.result.tenSanPham);
      const SP = await axios.get(ApiGetAllten);
      setLoaiSelect(loai.data.result);
      // console.log(loai.data.result);
      setDanhSachTenSP(SP.data);
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

  const validateTenSanPhamtu3den50 = (ten) => {
    return ten.length >= 3 && ten.length <= 50; // Chỉ kiểm tra độ dài
  };

  const validateTenSanPhamkhongchuakytudacbiet = (ten) => {
    const regex = /^[a-zA-Z0-9\s]+$/; // Chỉ cho phép chữ cái, số và khoảng trắng
    return regex.test(ten); // Kiểm tra ký tự đặc biệt
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    const tenDaTonTai = danhSachTenSP.includes(e.target.value);
    if (tenDaTonTai) {
      setErrorTen("Tên đã tồn tại");
    } else {
      setErrorTen("");
    }

    // Xóa lỗi khi người dùng nhập giá trị hợp lệ
    if (name === "tenSanPham" && value.trim() !== "") {
      setErrorTen("");
    }

    const input = name === "tenSanPham" && value.trim();

    if (input === "") {
      setErrorTen("Tên sản phẩm không được để trống");
      setDisable(true);
      return;
    } else if (!validateTenSanPhamtu3den50(input)) {
      setErrorTen("Tên sản phẩm phải từ 3-50 ký tự");
      setDisable(true);
      return;
    } else if (!validateTenSanPhamkhongchuakytudacbiet(input)) {
      setErrorTen("Tên sản phẩm không dược chưa ký tự đặc biệt");
      setDisable(true);
      return;
    } else {
      setErrorTen("");
      setDisable(false);
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
    if (formData.tenSanPham.trim() === "") {
      setErrorTen("Không được để trống tên sản phẩm");
      return;
    }

    const tenDaTonTai = danhSachTenSP.includes(formData.tenSanPham);
    if (tenDaTonTai) {
      setErrorTen("Tên đã tồn tại, không thể cập nhật");
      return; // Ngăn không cho cập nhật nếu tên đã tồn tại
    }

    // Sử dụng Modal.confirm để hiển thị hộp thoại xác nhận
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật không?",
      okText: "Có",
      cancelText: "Không",
      onOk: async () => {
        try {
          const res = await axios.put(
            `http://localhost:8080/api/sanpham/update/${id}`,
            formData,
          );
          toast.success("Sửa thành công");
          closeModal();
        } catch (error) {
          console.log("Error during update:", error);
          toast.error("Có lỗi sảy ra");
        }
      },
      onCancel() {
        console.log("Cập nhật đã bị hủy");
      },
    });
  };
  useEffect(() => {
    getById();
    // getByIdSP();
    // layAnh();
  }, []);
  return (
    <div className="mx-auto mt-3 flex w-auto">
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
                Mã Sản Phẩm:
              </label>
              <input
                type="text"
                className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                value={formData.ma}
                name="tenSanPham"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tenSanPham" className="mb-1 block font-semibold">
                Tên Sản Phẩm:
              </label>
              <input
                type="text"
                className="w-[400px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                value={formData.tenSanPham}
                name="tenSanPham"
                onChange={handleChange}
              />
              {errorTen && <p className="text-red-500">{errorTen}</p>}
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="ngayTao" className="mb-1 block font-semibold">
                Ngày tạo:
              </label>
              <input
                disabled
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
          <button
            className="h-[40px] w-[100px] rounded-xl border-2 border-green-500 font-semibold shadow-inner duration-300 hover:bg-green-500"
            disabled={disable}
          >
            Sửa
          </button>
        </div>
      </form>
      {/* <ToastContainer
        position="top-center"
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
export default SanPhamChiTiet;
