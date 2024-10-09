
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function LoaiGiay() {
  const [loaiGiay, setLoaiGiay] = useState([]);
  const [loaiGiayMoi, setLoaiGiayMoi] = useState({ ten: "", trangThai: true });
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [danhSachLoaiGiay, setDanhSachLoaiGiay] = useState([]);
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  // Load danh sách loại giày từ server
  const loadLoaiGiay = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/loai/list?pageNumber=${page}`,
      );      
      setLoaiGiay(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    }
  };

  // Lấy danh sách tên loại giày
  const layTenLoaiGiay = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/loai/ten`,
      );
      setDanhSachLoaiGiay(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  // Thêm mới loại giày
  const themMoiLoaiGiay = async (e) => {
    e.preventDefault();
    if (loaiGiayMoi.ten.trim() === "") {
      setError("Loại giày không được để trống");
      return;
    }

    // Kiểm tra xem loại giày đã tồn tại chưa
    if (danhSachLoaiGiay.includes(loaiGiayMoi.ten.trim())) {
      setError("Loại giày đã tồn tại");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/loai/add`, loaiGiayMoi);
      loadLoaiGiay(trangHienTai); // Đảm bảo rằng truyền trang hiện tại
      setLoaiGiayMoi({ ten: "", trangThai: true });
      toast.success("Thêm loại giày mới thành công", {
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
    } catch (error) {
      console.error("Failed to add new loai giay", error);
      toast.error("Thêm mới thất bại", {
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

  // Cập nhật khi người dùng thay đổi input
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLoaiGiayMoi({ ...loaiGiayMoi, [name]: value });

    // Xóa lỗi khi người dùng nhập lại tên loại giày
    if (name === "ten") {
      setError(""); // Reset error khi có sự thay đổi
    }
  };

  useEffect(() => {
    loadLoaiGiay(trangHienTai);
    layTenLoaiGiay();
  }, [trangHienTai]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const totalRows = itemsPerPage;
  const emptyRows = totalRows - loaiGiay.length;

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="mb-4 rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-bold">Thêm Loại Giày Mới</h2>
          <form onSubmit={themMoiLoaiGiay} className="-mx-2 flex flex-wrap">
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="tenLoaiGiay" className="mb-1">
                Loại Giày:
              </label>
              <input
                type="text"
                id="tenLoaiGiay"
                name="ten"
                onChange={onInputChange}
                className="w-full rounded border p-2"
                placeholder="Nhập loại giày"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="w-full px-2">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Thêm Mới
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-10 border border-gray-300 p-2">STT</th>
              <th className="w-1/3 border border-gray-300 p-2">Loại Giày</th>
              <th className="w-1/3 border border-gray-300 p-2">Trạng thái</th>
              <th className="w-1/3 border border-gray-300 p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loaiGiay.map((item, index) => (
              <tr key={item.id}>
                <td className="w-10 border border-gray-300 p-2 text-center">
                  {index + 1 + (trangHienTai - 1) * itemsPerPage}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  {item.ten}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`} style={{ height: "57px" }}>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="mr-14 mt-4 flex justify-end">
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            pageCount={tongSoTrang}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
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
            }
          />
        </div>
      </div>
    </>
  );
}
