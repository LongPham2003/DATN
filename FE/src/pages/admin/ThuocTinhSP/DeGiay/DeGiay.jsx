import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function DeGiay() {
  const [degiay, setDeGiay] = useState([]);
  const [deGiayMoi, setDeGiayMoi] = useState({ ten: "", trangThai: true });
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [danhSachTenDeGiay, setDanhSachTenDeGiay] = useState([]);
  const [error, setError] = useState("");
  const itemsPerPage = 5;

  const loadDeGiay = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/degiay/list?pageNumber=${page}`,
      );
      setDeGiay(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Có lỗi xảy ra", error);
    }
  };

  const layTenDeGiay = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/degiay/ten`,
      );
      setDanhSachTenDeGiay(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const themMoiDeGiay = async (e) => {
    e.preventDefault();
    if (deGiayMoi.ten.trim() === "") {
      setError("Tên đế giày không được để trống");
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/degiay/add`, deGiayMoi);
      loadDeGiay();
      setDeGiayMoi({ ten: "", trangThai: true });
      toast.success("Thêm đế giày mới thành công", {
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
      console.error("Failed to add new de giay", error);
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
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDeGiayMoi({ ...deGiayMoi, [name]: value });
    if (name === "ten") {
      if (value.trim() === "") {
        setError("Tên đế giày không được để trống");
      } else {
        const tenDaTonTai = danhSachTenDeGiay.includes(value);
        if (tenDaTonTai) {
          setError("Tên đế giày đã tồn tại");
        } else {
          setError("");
        }
      }
    }
  };

  useEffect(() => {
    loadDeGiay(trangHienTai);
    layTenDeGiay();
  }, [trangHienTai]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const totalRows = itemsPerPage;
  const emptyRows = totalRows - degiay.length;

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="mb-4 rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-bold">Thêm Đế Giày Mới</h2>
          <form onSubmit={themMoiDeGiay} className="-mx-2 flex flex-wrap">
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="tenDeGiay" className="mb-1">
                Tên Đế Giày:
              </label>
              <input
                onChange={onInputChange}
                type="text"
                id="tenDeGiay"
                value={deGiayMoi.ten}
                name="ten"
                className="w-full rounded border p-2"
                placeholder="Nhập tên đế giày"
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
            {degiay.map((item, index) => (
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
