import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Loai() {
  const [loai, setLoai] = useState([]); // Changed state name
  const [loaiMoi, setLoaiMoi] = useState({ ten: "", trangThai: true }); // Changed state name
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [danhSachTenLoai, setDanhSachTenLoai] = useState([]); // Changed state name
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const itemsPerPage = 5;
  const totalRows = itemsPerPage;
  const emptyRows = totalRows - loai.length; // Updated variable name

  const loadLoai = async (page) => {
    // Updated function name
    let url = `http://localhost:8080/api/loai/list?pageNumber=${page}`;
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`;
    }

    try {
      const response = await axios.get(url);
      setLoai(response.data.result.result); // Updated variable name

      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    }
  };

  const layTenLoai = async () => {
    // Updated function name
    try {
      const response = await axios.get(`http://localhost:8080/api/loai/ten`);
      setDanhSachTenLoai(response.data); // Updated variable name
    } catch (error) {
      console.log(error);
    }
  };

  const themMoiLoai = async (e) => {
    // Updated function name
    e.preventDefault();
    if (isEditing) {
      await capNhatLoai();
    } else {
      await themLoai();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLoaiMoi({ ...loaiMoi, [name]: value }); // Updated variable name
    if (name === "ten") {
      if (value.trim() === "") {
        setError("Tên loại không được để trống"); // Updated error message
      } else {
        const tenDaTonTai = danhSachTenLoai.includes(value); // Updated variable name
        if (tenDaTonTai) {
          setError("Tên loại đã tồn tại"); // Updated error message
        } else {
          setError("");
        }
      }
    }
  };

  const themLoai = async () => {
    // Updated function name
    if (loaiMoi.ten.trim() === "") {
      // Updated variable name
      setError("Tên loại không được để trống"); // Updated error message
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn thêm loại này không?")) {
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/loai/add`, loaiMoi); // Updated endpoint
      loadLoai(trangHienTai); // Updated function name
      setLoaiMoi({ ten: "", trangThai: true }); // Updated variable name
      toast.success("Thêm loại mới thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });

      const addInput = document.querySelector('input[type="text"]');
      if (addInput) {
        addInput.value = "";
      }
    } catch (error) {
      console.error("Thêm mới thất bại", error);
      toast.error("Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const capNhatLoai = async () => {
    // Updated function name
    if (loaiMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/loai/update/${currentId}`,
        loaiMoi,
      ); // Updated endpoint
      if (!window.confirm("Bạn có chắc chắn muốn sửa loại này không?")) {
        return;
      }
      toast.success("Cập nhật loại thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      loadLoai(trangHienTai);
      setLoaiMoi({ ten: "", trangThai: true });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Cập nhật loại thất bại", error);
      toast.error("Cập nhật loại thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/loai/updatetrangthai/${id}`); // Updated endpoint
      if (
        !window.confirm("Bạn có chắc chắn muốn cập nhật trạng thái này không?")
      ) {
        return;
      }
      loadLoai(trangHienTai);
      toast.success("Cập nhật trạng thái thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật trạng thái thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    loadLoai(trangHienTai);
    layTenLoai(); // Updated function name
  }, [trangHienTai, tenTimKiem]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const handleSetTenTimKiem = () => {
    // Lấy giá trị từ ô tìm kiếm
    const tenTimKiemValue = document.querySelector(
      'input[name="tenTimKiem"]',
    ).value; // Sử dụng name để lấy giá trị
    setTenTimKiem(tenTimKiemValue); // Lưu giá trị vào state tenTimKiem
    loadLoai(trangHienTai); // Tải lại danh sách màu sắc với từ khóa tìm kiếm
  };

  const resetForm = (e) => {
    e.preventDefault();
    setLoaiMoi({ ten: "", trangThai: true });
    setIsEditing(false);
    setCurrentId(null);
    setError("");
  };

  const handleRowClick = (item) => {
    console.log("Dữ liệu dòng được chọn:", item);
    setLoaiMoi({ ten: item.ten, trangThai: item.trangThai });
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  return (
    <>
      <div className="h-screen min-w-full overflow-auto">
        <div className="rounded bg-white p-4">
          <div className="mb-[20px] flex h-auto justify-around gap-5 shadow drop-shadow-xl">
            <div className="mb-7 w-[500px] rounded bg-white p-4 shadow drop-shadow-xl">
              <h2 className="mb-2 text-xl font-bold">Thêm Loại Mới</h2>
              <form onSubmit={themMoiLoai} className="-mx-2">
                <div className="mb-4 h-[150px] w-1/2 px-2">
                  <label htmlFor="tenLoai" className="mb-1 block">
                    Tên Loại:
                  </label>
                  <input
                    type="text"
                    id="tenLoai"
                    name="ten"
                    onChange={onInputChange}
                    value={loaiMoi.ten}
                    className="w-[400px] rounded border p-2"
                    placeholder="Nhập tên loại"
                  />
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="ml-4 flex items-center justify-center gap-2">
                  <button
                    type="submit"
                    className="mr-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
                  >
                    {isEditing ? "Cập Nhật" : "Thêm Mới"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="rounded border bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                  >
                    Nhập Lại
                  </button>
                </div>
              </form>
            </div>

            <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
              <h2 className="mb-2 text-xl font-bold">Danh Sách Các Loại</h2>
              <div className="h-[150px]">
                <input
                  type="text"
                  name="tenTimKiem"
                  // onChange={(e) => setTenTimKiem(e.target.value)}
                  className="mb-4 w-full rounded border p-2"
                  placeholder="Tìm kiếm theo tên loại"
                />
              </div>
              <button
                onClick={handleSetTenTimKiem}
                className="ml-[190px] rounded border bg-blue-500 p-2 text-white hover:bg-blue-600"
              >
                Tìm Kiếm
              </button>
            </div>
          </div>
          <div className="mx-3">
            <table className="w-full border-collapse">
              <thead className="h-[50px] text-lg">
                <tr className="rounded-t-lg border bg-gray-200">
                  <th className="w-10 border border-b-gray-300 p-2">STT</th>
                  <th className="w-1/3 border border-b-gray-300 p-2">Tên</th>
                  <th className="w-1/3 border border-b-gray-300 p-2">
                    Trạng thái
                  </th>
                  <th className="w-1/3 border border-gray-300 p-2">
                    Hành động
                  </th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {loai.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="border border-b-gray-300 hover:bg-slate-100"
                  >
                    {/* Thêm sự kiện nhấp chuột */}
                    <td className="p-2 text-center">
                      {index + 1 + (trangHienTai - 1) * itemsPerPage}
                    </td>
                    <td className="p-2 text-center">{item.ten}</td>
                    <td className="p-2 text-center">
                      {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-green-600"
                        onClick={() => capNhatTrangThai(item.id)} // Gọi hàm cập nhật trạng thái
                      >
                        {item.trangThai ? "Ngừng kinh doanh" : "Kinh doanh"}
                      </button>
                    </td>
                  </tr>
                ))}
                {emptyRows > 0 &&
                  Array.from({ length: emptyRows }).map((_, index) => (
                    <tr key={`empty-${index}`} style={{ height: "57px" }}>
                      {/* Đặt ộ cao hàng là 57px */}
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                      <td className=""></td>
                    </tr>
                  ))}
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="mr-14 mt-4 flex justify-end">
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={tongSoTrang} // Tổng số trang
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange} // Hàm xử lý khi người dùng chọn trang
              containerClassName={"flex"}
              previousClassName={"mx-1"}
              previousLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
              }
              nextClassName={"mx-1"}
              nextLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
              }
              breakClassName={"mx-1"}
              breakLinkClassName={
                "px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-200 transition duration-200"
              }
              pageClassName={"mx-1"}
              pageLinkClassName={
                "px-3 py-1 border-b border-green-300 rounded-full hover:bg-green-500 transition duration-200"
              }
              activeClassName={"bg-green-500 rounded-full text-white"}
              activeLinkClassName={
                "px-4 py-2 bg-green-500 text-white rounded-full"
              } // Đảm bảo nền đầy đủ cho nút đang hoạt động
            />
          </div>
        </div>
        {/* Modal */}

        <ToastContainer />
      </div>
    </>
  );
}
