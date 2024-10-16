import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function KichThuoc() {
  const [kichthuoc, setKichThuoc] = useState([]);
  const [kichThuocMoi, setKichThuocMoi] = useState({
    kichThuoc: "",
    trangThai: true,
  });
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [danhSachTenKichThuoc, setDanhSachTenKichThuoc] = useState([]);
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [currentId, setCurrentId] = useState(null); // ID of the size being edited

  const itemsPerPage = 5;
  const totalRows = itemsPerPage;
  const emptyRows = totalRows - kichthuoc.length;

  const loadKichThuoc = async (page) => {
    let url = `http://localhost:8080/api/kichthuoc/list?pageNumber=${page}`;
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`;
    }

    try {
      const response = await axios.get(url);
      setKichThuoc(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Error fetching shoe size data", error);
    }
  };

  const layTenKichThuoc = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/kichthuoc/ten`,
      );
      setDanhSachTenKichThuoc(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const themMoiKichThuoc = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await capNhatKichThuoc();
    } else {
      await themKichThuoc();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setKichThuocMoi({ ...kichThuocMoi, [name]: value });
    if (name === "kichThuoc") {
      if (value.trim() === "") {
        setError("Tên kích thước không được để trống");
      } else {
        const tenDaTonTai = danhSachTenKichThuoc.includes(value);
        if (tenDaTonTai) {
          setError("Tên kích thước đã tồn tại");
        } else {
          setError("");
        }
      }
    }
  };

  const themKichThuoc = async () => {
    if (kichThuocMoi.kichThuoc.trim() === "") {
      setError("Tên kích thước không được để trống");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn thêm kích thước này không?")) {
      return;
    }
    try {
      await axios.post(`http://localhost:8080/api/kichthuoc/add`, kichThuocMoi);
      loadKichThuoc(trangHienTai);
      setKichThuocMoi({ kichThuoc: "", trangThai: true });
      toast.success("Thêm kích thước mới thành công", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });

      const addInput = document.querySelector('input[type="text"]');
      if (addInput) {
        addInput.value = "";
      }
    } catch (error) {
      console.error("Failed to add new shoe size", error);
      toast.error("Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });
    }
  };

  const capNhatKichThuoc = async () => {
    if (kichThuocMoi.kichThuoc.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/kichthuoc/update/${currentId}`,
        kichThuocMoi,
      );
      if (!window.confirm("Bạn có chắc chắn muốn sửa kích thước này không?")) {
        return;
      }
      toast.success("Cập nhật kích thước thành công", {
        position: "top-right",
        autoClose: 1000,
      });
      loadKichThuoc(trangHienTai);
      setKichThuocMoi({ kichThuoc: "", trangThai: true });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Cập nhật kích thước thất bại", error);
      toast.error("Cập nhật kích thước thất bại", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/kichthuoc/updatetrangthai/${id}`,
      );
      if (
        !window.confirm("Bạn có chắc chắn muốn cập nhật kích thước này không?")
      ) {
        return;
      }
      loadKichThuoc(trangHienTai);
      setKichThuocMoi({ kichThuoc: "", trangThai: true });
      setIsEditing(false);
      setCurrentId(null);
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
    loadKichThuoc(trangHienTai);
    layTenKichThuoc();
  }, [trangHienTai, tenTimKiem]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const handleSetTenTimKiem = () => {
    const tenTimKiemValue = document.querySelector(
      'input[name="tenTimKiem"]',
    ).value;
    setTenTimKiem(tenTimKiemValue);
    loadKichThuoc(trangHienTai);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setKichThuocMoi({ kichThuoc: "", trangThai: true });
    setIsEditing(false);
    setCurrentId(null);
    setError("");
  };

  const handleRowClick = (item) => {
    setKichThuocMoi({ kichThuoc: item.kichThuoc, trangThai: item.trangThai });
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="my-2 flex justify-around gap-3 rounded bg-white p-4 shadow drop-shadow-xl">
          <div className="mb-4 w-[500px] rounded bg-white p-4 shadow drop-shadow-xl">
            <h2 className="mb-2 text-xl font-bold">Thêm Kích Thước Mới</h2>
            <form onSubmit={themMoiKichThuoc} className="-mx-2 flex flex-wrap">
              <div className="mb-4 h-[150px] w-1/2 px-2">
                <label htmlFor="tenKichThuoc" className="mb-1">
                  Tên Kích Thước:
                </label>
                <input
                  type="text"
                  id="tenKichThuoc"
                  name="kichThuoc"
                  onChange={onInputChange}
                  value={kichThuocMoi.kichThuoc}
                  className="w-[400px] rounded border p-2"
                  placeholder="Nhập tên kích thước"
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
          <div className="mb-4 w-[500px] rounded bg-white p-4 shadow drop-shadow-xl">
            <h2 className="mb-2 text-xl font-bold">Tìm kiếm kích thước</h2>
            <div className="-mx-2 flex flex-wrap">
              <div className="mb-4 h-[150px] w-full">
                <input
                  type="text"
                  name="tenTimKiem"
                  placeholder="Nhập tên kích thước"
                  className="mt-6 w-[400px] rounded border p-2"
                />
              </div>
              <div className="">
                <button
                  onClick={handleSetTenTimKiem}
                  className="ml-[190px] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="rounded bg-white p-8">
          <h2 className="mb-2 text-xl font-bold">Danh Sách Kích Thước</h2>
          <div className="rounded">
            <table className="min-w-full table-auto border-collapse text-center">
              <thead>
                <tr className="border border-b-gray-300 bg-slate-300">
                  <th className="px-4 py-2">STT</th>
                  <th className="px-4 py-2">Tên Kích Thước</th>
                  <th className="px-4 py-2">Trạng Thái</th>
                  <th className="px-4 py-2">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {kichthuoc.length === 0 ? (
                  <tr>
                    <td colSpan="4">Không có dữ liệu</td>
                  </tr>
                ) : (
                  kichthuoc.map((item, index) => (
                    <tr
                      onClick={() => handleRowClick(item)}
                      key={item.id}
                      className="border border-b-gray-300 hover:bg-slate-100"
                    >
                      <td className="px-4 py-2">
                        {index + 1 + (trangHienTai - 1) * itemsPerPage}
                      </td>
                      <td className="px-4 py-2">{item.kichThuoc}</td>
                      <td className="px-4 py-2">
                        {item.trangThai ? "Đang sử dụng" : "Ngừng sử dụng"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => capNhatTrangThai(item.id)}
                          className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                          Cập nhật trạng thái
                        </button>
                      </td>
                    </tr>
                  ))
                )}
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
              </tbody>
            </table>

            <div className="flex justify-end p-4">
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
      </div>
      <ToastContainer />
    </>
  );
}
