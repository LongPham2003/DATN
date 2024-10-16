import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ThuongHieu() {
  const [thuonghieu, setThuongHieu] = useState([]);
  const [thuongHieuMoi, setThuongHieuMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [danhSachTenThuongHieu, setDanhSachTenThuongHieu] = useState([]);
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Edit mode
  const [currentId, setCurrentId] = useState(null); // ID of the brand being edited

  const itemsPerPage = 5;
  const totalRows = itemsPerPage;
  const emptyRows = totalRows - thuonghieu.length;

  const loadThuongHieu = async (page) => {
    let url = `http://localhost:8080/api/thuonghieu/list?pageNumber=${page}`;
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`;
    }

    try {
      const response = await axios.get(url);
      setThuongHieu(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("Error fetching brand data", error);
    }
  };

  const layTenThuongHieu = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/thuonghieu/ten`,
      );
      setDanhSachTenThuongHieu(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const themMoiThuongHieu = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await capNhatThuongHieu();
    } else {
      await themThuongHieu();
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setThuongHieuMoi({ ...thuongHieuMoi, [name]: value });
    if (name === "ten") {
      if (value.trim() === "") {
        setError("Tên thương hiệu không được để trống");
      } else {
        const tenDaTonTai = danhSachTenThuongHieu.includes(value);
        if (tenDaTonTai) {
          setError("Tên thương hiệu đã tồn tại");
        } else {
          setError("");
        }
      }
    }
  };

  const themThuongHieu = async () => {
    if (thuongHieuMoi.ten.trim() === "") {
      setError("Tên thương hiệu không được để trống");
      return;
    }
    if (!window.confirm("Bạn có chắc chắn muốn thêm thương hiệu này không?")) {
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/thuonghieu/add`,
        thuongHieuMoi,
      );
      loadThuongHieu(trangHienTai);
      setThuongHieuMoi({ ten: "", trangThai: true });
      toast.success("Thêm thương hiệu mới thành công", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });

      const addInput = document.querySelector('input[type="text"]');
      if (addInput) {
        addInput.value = "";
      }
    } catch (error) {
      console.error("Failed to add new brand", error);
      toast.error("Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        transition: Bounce,
      });
    }
  };

  const capNhatThuongHieu = async () => {
    if (thuongHieuMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/api/thuonghieu/update/${currentId}`,
        thuongHieuMoi,
      );
      if (!window.confirm("Bạn có chắc chắn muốn sửa thương hiệu này không?")) {
        return;
      }
      toast.success("Cập nhật thương hiệu thành công", {
        position: "top-right",
        autoClose: 1000,
      });
      loadThuongHieu(trangHienTai);
      setThuongHieuMoi({ ten: "", trangThai: true });
      setIsEditing(false);
      setCurrentId(null);
    } catch (error) {
      console.error("Cập nhật thương hiệu thất bại", error);
      toast.error("Cập nhật thương hiệu thất bại", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/thuonghieu/updatetrangthai/${id}`,
      );
      if (
        !window.confirm("Bạn có chắc chắn muốn cập nhật thương hiệu này không?")
      ) {
        return;
      }
      loadThuongHieu(trangHienTai);
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
    loadThuongHieu(trangHienTai);
    layTenThuongHieu();
  }, [trangHienTai, tenTimKiem]);

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  const handleSetTenTimKiem = () => {
    const tenTimKiemValue = document.querySelector(
      'input[name="tenTimKiem"]',
    ).value;
    setTenTimKiem(tenTimKiemValue);
    loadThuongHieu(trangHienTai);
  };

  const resetForm = (e) => {
    e.preventDefault();
    setThuongHieuMoi({ ten: "", trangThai: true });
    setIsEditing(false);
    setCurrentId(null);
    setError("");
  };

  const handleRowClick = (item) => {
    setThuongHieuMoi({ ten: item.ten, trangThai: item.trangThai });
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="my-2 flex justify-around gap-3 rounded bg-white p-4 shadow">
          <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">Thêm Thương Hiệu Mới</h2>
            <form onSubmit={themMoiThuongHieu} className="-mx-2 flex flex-wrap">
              <div className="mb-4 h-[150px] w-1/2 px-2">
                <label htmlFor="tenThuongHieu" className="mb-1">
                  Tên Thương Hiệu:
                </label>
                <input
                  type="text"
                  id="tenThuongHieu"
                  name="ten"
                  onChange={onInputChange}
                  value={thuongHieuMoi.ten}
                  className="w-[400px] rounded border p-2"
                  placeholder="Nhập tên thương hiệu"
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
          <div className="mb-4 w-[400px] rounded bg-white p-4 shadow">
            <h2 className="mb-2 text-xl font-bold">Tìm kiếm thương hiệu</h2>
            <div className="-mx-2 flex flex-wrap">
              <div className="mb-4 w-full">
                <input
                  type="text"
                  name="tenTimKiem"
                  placeholder="Nhập tên thương hiệu"
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
          <h2 className="mb-2 text-xl font-bold">Danh Sách Thương Hiệu</h2>
          <div className="rounded">
            <table className="min-w-full table-auto border-collapse text-center">
              <thead>
                <tr>
                  <th className="border border-gray-400 px-4 py-2">STT</th>
                  <th className="border border-gray-400 px-4 py-2">
                    Tên Thương Hiệu
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
                {thuonghieu.length === 0 ? (
                  <tr>
                    <td colSpan="4">Không có dữ liệu</td>
                  </tr>
                ) : (
                  thuonghieu.map((item, index) => (
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
