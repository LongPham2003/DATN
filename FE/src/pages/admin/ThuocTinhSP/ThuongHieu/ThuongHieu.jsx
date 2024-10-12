import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ThuongHieu() {
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5
  const [thuongHieuMoi, setThuongHieuMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [error, setError] = useState("");
  const [tenThuongHieu, setTenThuongHieu] = useState("");
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang
  const emptyRows = totalRows - listThuongHieu.length; // Số dòng trống cần thêm
  
  const loadThuongHieu = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/thuonghieu/list?pageNumber=${page}`,
      );
      setListThuongHieu(response.data.result.result);
      setTongSoTrang(response.data.result.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      console.error("Failed to fetch thuong hieu data", error);
    }
  };

  const layTenThuongHieu = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/thuonghieu/ten`);
      setTenThuongHieu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    layTenThuongHieu();
    loadThuongHieu(trangHienTai);
  }, [trangHienTai]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setThuongHieuMoi({ ...thuongHieuMoi, [e.target.name]: e.target.value });
    if (name === "ten") {
      if (value.trim() === "") {
        setError("Tên thương hiệu không được để trống");
      } else {
        const tenDaTonTai = tenThuongHieu.includes(value);
        if (tenDaTonTai) {
          setError("Tên thương hiệu đã tồn tại");
        } else {
          setError("");
        }
      }
    }
  };

  const themMoiThuongHieu = async (e) => {
    e.preventDefault();

    const trimmedTen = thuongHieuMoi.ten.trim().toLowerCase();
    const tenDaTonTai = tenThuongHieu.some((ten) => ten.toLowerCase().trim() === trimmedTen);

    if (trimmedTen === "") {
      setError("Tên không được để trống");
      return;
    }

    if (tenDaTonTai) {
      setError("Tên thương hiệu đã tồn tại");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/thuonghieu/add`, thuongHieuMoi);
      
      toast.success("Thêm thương hiệu mới thành công", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
        style: {
          zIndex: 9999,
          overflowY: "hidden",
        },
      });

      // Tải lại trang sau khi thông báo hiển thị
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
      setThuongHieuMoi({ ten: "", trangThai: true });
      
    } catch (error) {
      console.log("Lỗi:", error);
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

  const handlePageChange = (newPage) => {
    setTrangHienTai(+newPage.selected + 1);
  };

  return (
    <>
      <div>
        <div className="h-screen w-full overflow-auto">
          <div className="mb-4 rounded bg-white p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">Thêm Thương Hiệu Mới</h2>
            <form onSubmit={themMoiThuongHieu} className="-mx-2 flex flex-wrap">
              <div className="mb-4 w-1/2 px-2">
                <label htmlFor="tenThuongHieu" className="mb-1 block">
                  Tên Thương Hiệu:
                </label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="tenThuongHieu"
                  name="ten"
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên thương hiệu"
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
                <th className="w-1/3 border border-gray-300 p-2">Tên</th>
                <th className="w-1/3 border border-gray-300 p-2">Trạng thái</th>
                <th className="w-1/3 border border-gray-300 p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listThuongHieu.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1 + (trangHienTai - 1) * itemsPerPage}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.ten}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
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
      </div>
    </>
  );
}
