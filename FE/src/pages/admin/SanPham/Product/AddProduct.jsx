import { Modal } from "antd";
import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function AddProduct() {
  const [tenSanPham, settenSanPham] = useState("");
  const [idLoai, setidLoai] = useState(0);
  const [moTa, setmota] = useState("");
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [errorTenSP, setErrorTenSP] = useState("");
  const [errorLoai, setErrorLoai] = useState("");
  const [danhSachTenSP, setDanhSachTenSP] = useState("");
  const [trangThai] = useState(true); // Sử dụng giá trị mặc định true cho trạng thái

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;
  let ApiAddSPMoi = `http://localhost:8080/api/sanpham/add`;
  let ApiGetAllten = `http://localhost:8080/api/sanpham/ten`;

  const getAllLoai = async () => {
    try {
      const data = await axios.get(ApiGetAllLoai);
      const SP = await axios.get(ApiGetAllten);
      setLoaiSelect(data.data.result);
      setDanhSachTenSP(SP.data);
    } catch (error) {
      console.log(error);
    }
  };
  const newProduct = {
    tenSanPham,
    idLoai,
    moTa,
    trangThai, // Mặc định true
  };

  const add = async (newProduct) => {
    try {
      await axios.post(ApiAddSPMoi, newProduct); // Gửi dữ liệu sản phẩm mới

      return true; // Trả về true khi thêm thành công
    } catch (error) {
      console.log(error);
      return false; // Trả về false khi có lỗi
    }
  };

  useEffect(() => {
    getAllLoai();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tenSanPham.trim() === "") {
        setErrorTenSP("Tên sản phẩm không được để trống");
        return;
      } else if (idLoai === 0) {
        setErrorLoai("Bạn phải chọn một loại sản phẩm");
        return;
      }

      // Sử dụng Modal.confirm để hiển thị hộp thoại xác nhận
      Modal.confirm({
        title: "Xác nhận thêm sản phẩm",
        content: "Bạn có chắc chắn muốn thêm sản phẩm này không?",
        okText: "Có",
        cancelText: "Không",
        onOk: async () => {
          try {
            const result = await add(newProduct); // Chờ kết quả từ hàm add
            // Hiển thị thông báo thành công
            if (result) {
              toast.success("Thêm sản phẩm mới thành công");
              // Load lại trang sau 1 giây
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              throw new Error("Thêm mới thất bại");
            }
          } catch (error) {
            console.log(newProduct);
            console.log(error);

            toast.error("Thêm mới thất bại");
          }
        },
        onCancel() {
          console.log("Thao tác thêm sản phẩm đã bị hủy");
        },
      });
    } catch (error) {
      console.log(newProduct);
      toast.error("Thêm mới thất bại");
    }
  };

  const handelInput = (e) => {
    settenSanPham(e.target.value);
    const tenDaTonTai = danhSachTenSP.includes(e.target.value);
    if (tenDaTonTai) {
      setErrorTenSP("Ten Da Ton Tai");
    } else {
      setErrorTenSP("");
    }
  };

  return (
    <div className="mx-auto mt-10 w-auto">
      <h1 className="mb-5 text-2xl font-bold">Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="tenSanPham" className="mb-1 block">
            Tên sản phẩm:
          </label>
          <input
            type="text"
            id="tenSanPham"
            value={tenSanPham}
            name="tenSanPham"
            onChange={handelInput}
            className="w-full rounded-md border px-3 py-2"
          />
          {errorTenSP && <p className="text-red-500">{errorTenSP}</p>}
        </div>
        <div>
          <label htmlFor="idLoai" className="mb-1 block">
            Loại:
          </label>
          <select
            id="idLoai"
            onChange={(e) => {
              setidLoai(e.target.value), setErrorLoai("");
            }}
            value={idLoai}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Chọn danh mục</option>
            {loaiSelect.map((loai) => (
              <option value={loai.id} key={loai.id}>
                {loai.ten}
              </option>
            ))}
          </select>
          {errorLoai && <p className="text-red-500">{errorLoai}</p>}
        </div>
        <div>
          <label htmlFor="moTa" className="mb-1 block">
            Mô tả:
          </label>
          <textarea
            id="moTa"
            value={moTa}
            name="moTa"
            onChange={(e) => setmota(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            rows="4"
          ></textarea>
        </div>
        {/* {error && <p className="text-red-500">{error}</p>} */}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
      </form>
      {/* <ToastContainer /> */}
    </div>
  );
}
