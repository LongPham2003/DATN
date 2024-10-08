import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function MauSac() {
  const [listMauSac, setListMauSac] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5
  const [mauSacMoi, setMauSacMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [error, setError] = useState("");
  const [tenMauSac, setTenMauSac] = useState("");
  // Tính toán số dòng cần hiển thị
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang
  const emptyRows = totalRows - listMauSac.length; // Số dòng trống cần thêm
  const loadMauSac = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/mausac/list?pageNumber=${page}`,
      );
      setListMauSac(response.data.result.result);
      setTongSoTrang(response.data.result.totalPages); // Cập nhật tổng số trang
    } catch (error) {
      console.error("Failed to fetch mau sac data", error);
    }
  };

  const layTenMauSac = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/mausac/ten`);
      setTenMauSac(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    layTenMauSac();
    loadMauSac(trangHienTai);
  }, [trangHienTai]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setMauSacMoi({ ...mauSacMoi, [e.target.name]: e.target.value }); // go den dau luu den day
    if (name === "ten") {
      if (value.trim() === "") {
        setError("Tên màu sắc không được để trống");
      } else {
        const tenDaTonTai = tenMauSac.includes(value);
        if (tenDaTonTai) {
          setError("Tên màu sắc đã tồn tại");
        } else {
          setError("");
        }
      }
    }
  };

  const themMoiMauSac = async (e) => {
    e.preventDefault();
    if (mauSacMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/mausac/add`, mauSacMoi);
      loadMauSac(trangHienTai);
      toast.success("Thêm màu sắc mới thành công", {
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
        style: {
          zIndex: 9999,
          overflowY: "hidden",
        },
      });

      setMauSacMoi({ ten: "", trangThai: true });
    } catch (error) {
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
            <h2 className="mb-2 text-xl font-bold">Thêm Màu Sắc Mới</h2>
            <form onSubmit={themMoiMauSac} className="-mx-2 flex flex-wrap">
              <div className="mb-4 w-1/2 px-2">
                <label htmlFor="tenMauSac" className="mb-1 block">
                  Tên Màu Sắc:
                </label>
                <input
                  onChange={onInputChange}
                  type="text"
                  id="tenMauSac"
                  name="ten"
                  className="w-full rounded border p-2"
                  placeholder="Nhập tên màu sắc"
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
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {listMauSac.map((item, index) => (
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
                    {/* Đặt ��ộ cao hàng là 57px */}
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr>
                ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
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
      </div>
    </>
  );
}
