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
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [currentId, setCurrentId] = useState(null); // ID of the sole being edited

  const itemsPerPage = 5;
  const totalRows = itemsPerPage;
  const emptyRows = totalRows - degiay.length;

  const loadDeGiay = async (page) => {
    let url = `http://localhost:8080/api/degiay/list?pageNumber=${page}`;
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`;
    }

    try {
      const response = await axios.get(url);
      setDeGiay(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Error fetching shoe sole data", error);
    }
  };

  const layTenDeGiay = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/degiay/ten`);
      setDanhSachTenDeGiay(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const themMoiDeGiay = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await capNhatDeGiay();
    } else {
      await themDeGiay();
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

  const themDeGiay = async () => {
    if (deGiayMoi.ten.trim() === "") {
      setError("Tên đế giày không được để trống");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này không?")) {
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/degiay/add`, deGiayMoi);
      loadDeGiay(trangHienTai);
      setDeGiayMoi({ ten: "", trangThai: true });
      toast.success("Thêm đế giày mới thành công", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });

      const addInput = document.querySelector('input[type="text"]');
      if (addInput) {
        addInput.value = "";
      }
    } catch (error) {
      console.error("Failed to add new shoe sole", error);
      toast.error("Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });
    }
  };

  const capNhatDeGiay = async () => {
    if (deGiayMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/degiay/update/${currentId}`,
        deGiayMoi,
      );
      if (!window.confirm("Bạn có chắc chắn muốn sửa sản phẩm này không?")) {
        return;
      }
      toast.success("Cập nhật đế giày thành công", {
        position: "top-right",
        autoClose: 1000,
      });
      loadDeGiay(trangHienTai);
      setDeGiayMoi({ ten: "", trangThai: true });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Cập nhật đế giày thất bại", error);
      toast.error("Cập nhật đế giày thất bại", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/degiay/updatetrangthai/${id}`);
      if (
        !window.confirm("Bạn có chắc chắn muốn cập nhật sản phẩm này không?")
      ) {
        return;
      }
      loadDeGiay(trangHienTai);
      toast.success("Cập nhật trạng thái thành công", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật trạng thái thất bại", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    loadDeGiay(trangHienTai);
    layTenDeGiay();
  }, [trangHienTai, tenTimKiem]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const handleSetTenTimKiem = () => {
    const tenTimKiemValue = document.querySelector(
      'input[name="tenTimKiem"]',
    ).value;
    setTenTimKiem(tenTimKiemValue);
    loadDeGiay(trangHienTai);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setDeGiayMoi({ ten: "", trangThai: true });
    setIsEditing(false);
    setCurrentId(null);
    setError("");
  };

  const handleRowClick = (item) => {
    setDeGiayMoi({ ten: item.ten, trangThai: item.trangThai });
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="my-2 flex justify-around gap-3 rounded bg-white p-4 shadow">
          <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">Thêm Đế Giày Mới</h2>
            <form onSubmit={themMoiDeGiay} className="-mx-2 flex flex-wrap">
              <div className="mb-4 h-[150px] w-1/2 px-2">
                <label htmlFor="tenDeGiay" className="mb-1">
                  Tên Đế Giày:
                </label>
                <input
                  type="text"
                  id="tenDeGiay"
                  name="ten"
                  onChange={onInputChange}
                  value={deGiayMoi.ten}
                  className="w-[400px] rounded border p-2"
                  placeholder="Nhập tên đế giày"
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
              <div className="flex w-full justify-center px-2">
                <div className="w-[150px]">
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={(e) => {
                      if (error) {
                        e.preventDefault();
                        toast.error("Vui lòng sửa lỗi trước khi thêm mới.");
                      }
                    }}
                  >
                    {isEditing ? "Sửa" : "Thêm Mới"}
                  </button>
                </div>
                <div>
                  <button
                    className="ml-7 rounded bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-600"
                    onClick={resetForm}
                  >
                    Làm Mới
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Search Section */}
          <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
            <span className="mb-2 text-xl font-bold">Tìm kiếm</span>
            <div className="flex flex-wrap">
              <div className="mb-4 w-full">
                <input
                  type="text"
                  name="tenTimKiem"
                  placeholder="Nhập tên đế giày"
                  className="w-[300px] rounded border p-2"
                />
                <button
                  onClick={handleSetTenTimKiem}
                  className="ml-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="mx-5 rounded bg-white p-8 shadow">
          <h2 className="mb-2 text-xl font-bold">Danh Sách Đế Giày</h2>
          <div className="rounded">
            <table className="min-w-full table-auto border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">STT</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Tên Đế Giày
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Trạng Thái
                  </th>
                  <th className="border border-gray-400 px-4 py-2">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {degiay.length === 0 ? (
                  <tr>
                    <td colSpan="4">Không có dữ liệu</td>
                  </tr>
                ) : (
                  degiay.map((item, index) => (
                    <tr key={item.id}>
                      <td className="border border-gray-400 px-4 py-2">
                        {index + 1}
                      </td>
                      <td
                        className="cursor-pointer border border-gray-400 px-4 py-2"
                        onClick={() => handleRowClick(item)}
                      >
                        {item.ten}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {item.trangThai ? "Đang sử dụng" : "Ngừng sử dụng"}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <button
                          onClick={() => capNhatTrangThai(item.id)}
                          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                        >
                          Cập nhật trạng thái
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                {emptyRows > 0 &&
                  Array(emptyRows)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2">
                          &nbsp;
                        </td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                        <td className="border border-gray-400 px-4 py-2"></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center p-4">
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
      <ToastContainer />
    </>
  );
}
