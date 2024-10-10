import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function AddProduct() {
  const [tenSanPham, settenSanPham] = useState("");
  const [idLoai, setidLoai] = useState(0);
  const [mota, setmota] = useState("");
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [error, setError] = useState("");
  const [trangThai] = useState(true); // Sử dụng giá trị mặc định true cho trạng thái
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;
  let ApiAddSPMoi = `http://localhost:8080/api/sanpham/add`;

  const getAllLoai = async () => {
    try {
      const data = await axios.get(ApiGetAllLoai);
      setLoaiSelect(data.data.result);
    } catch (error) {
      console.log(error);
    }
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
        setError("Bạn chưa nhập tên sản phẩm");
        return;
      }
      if (!window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này không?")) {
        return; // Nếu người dùng chọn Cancel, dừng thao tác
      }
      const newProduct = {
        tenSanPham,
        idLoai,
        mota,
        trangThai, // Mặc định true
      };

      const result = await add(newProduct); // Chờ kết quả từ hàm add

      // Hiển thị hộp thoại xác nhận
      if (result) {
        toast.success("Thêm sản phẩm mới thành công", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          window.location.reload(); // Load lại trang sau 1 giây
        }, 1700);
      } else {
        throw new Error("Thêm mới thất bại");
      }
    } catch (error) {
      toast.error(error.message || "Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="mx-auto mt-10 w-72">
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
            onChange={(e) => settenSanPham(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="idLoai" className="mb-1 block">
            Danh mục:
          </label>
          <select
            id="idLoai"
            onChange={(e) => setidLoai(e.target.value)}
            value={idLoai}
            className="w-full rounded-md border px-3 py-2"
            required
          >
            <option value="">Chọn danh mục</option>
            {loaiSelect.map((loai) => (
              <option value={loai.id} key={loai.id}>
                {loai.ten}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="mota" className="mb-1 block">
            Mô tả:
          </label>
          <textarea
            id="mota"
            value={mota}
            name="mota"
            onChange={(e) => setmota(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            rows="4"
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
