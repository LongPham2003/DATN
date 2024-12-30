import { useEffect, useState } from "react";
import TheMoiNhanVien from "./TheMoiNhanVien";
import ReactPaginate from "react-paginate";
import axios from "../../../api/axiosConfig";
import { Link } from "react-router-dom";
import { EyeFilled, PlusCircleFilled, ReloadOutlined } from "@ant-design/icons";

export default function DanhSachNhanVien() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [added, setAdded] = useState(false);

  const [nhanvien, setNhanVien] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [trangThai, setTrangThai] = useState(null);
  const pageSize = 5;
  const totalRows = pageSize;
  const emptyRows = totalRows - nhanvien.length;

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/nhanvien/search", {
        params: {
          pageNumber: trangHienTai,
          keyword: keyword,
          trangThai: trangThai !== null ? trangThai : undefined, // Nếu trangThai là null, không gửi tham số
        },
      })
      .then(async (res) => {
        const data = res.data;
        setNhanVien(data.result.result);
        setTongSoTrang(data.result.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi" + error);
      });
  }, [trangHienTai, keyword, added, trangThai]);

  const handleLamMoi = () => {
    setKeyword("");
    setTrangThai("");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Quản Lý Nhân Viên</h1>

      {/* Modal Thêm Mới Nhân Viên */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-4">
            <button
              onClick={closeModal}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 transition-colors duration-200 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <TheMoiNhanVien button={closeModal} onAdd={() => setAdded(true)} />
          </div>
        </div>
      )}

      {/* Ô tìm kiếm tách biệt */}

      <div className="flex gap-10">
        <div className="mb-6 w-[50%] rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Tìm Kiếm Nhân Viên</h2>
          <input
            type="text"
            placeholder="Nhập tên hoặc mã nhân viên..."
            className="w-full rounded border border-gray-300 p-2"
            onChange={(event) => setKeyword(event.target.value)}
            value={keyword}
          />
        </div>

        <div className="mb-6 w-[50%] rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-semibold">Trạng Thái Nhân Viên</h2>
          <select
            name="trangThai"
            id="trangThai"
            className="w-full rounded border border-gray-300 p-2"
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : e.target.value === "true";
              setTrangThai(value);
            }}
            value={trangThai}
          >
            <option value="">Tất cả</option>
            <option value="true">Đang làm</option>
            <option value="false">Nghỉ</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleLamMoi}
        className="mx-auto flex items-center gap-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
      >
        <ReloadOutlined /> Làm mới
      </button>

      {/* Danh sách nhân viên */}
      <div className="rounded bg-white p-4 shadow">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-semibold">Danh Sách Nhân Viên</h2>
          {/* Nút thêm mới nhân viên */}
          <div className="mb-4">
            <button
              type="button"
              onClick={openModal}
              className="mr-16 h-10 rounded-md bg-green-500 px-4 font-semibold text-white transition-colors duration-300 hover:bg-green-600 focus:bg-green-700 active:bg-green-400"
            >
              <PlusCircleFilled /> <span> Thêm Mới Nhân Viên</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b px-4 py-2">STT</th>
                <th className="border-b px-4 py-2">Mã</th>
                <th className="border-b px-4 py-2">Họ tên</th>
                <th className="border-b px-4 py-2">Tài khoản</th>
                <th className="border-b px-4 py-2">SDT</th>
                <th className="border-b px-4 py-2">Ngày Sinh</th>
                <th className="border-b px-4 py-2">Giới Tính</th>
                <th className="border-b px-4 py-2">Trạng Thái</th>
                <th className="border-b px-4 py-2">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {nhanvien.map((item, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">
                    {index + 1 + (trangHienTai - 1) * pageSize}
                  </td>
                  <td className="border-b px-4 py-2">{item.ma}</td>
                  <td className="border-b px-4 py-2">{item.hoTen}</td>
                  <td className="border-b px-4 py-2">{item.email}</td>
                  <td className="border-b px-4 py-2">{item.sdt}</td>
                  <td className="border-b px-4 py-2">{item.ngaySinh}</td>
                  <td className="border-b px-4 py-2">{item.gioiTinh}</td>
                  <td className="mx-auto flex justify-center border-b px-4 py-2 text-center">
                    <button
                      className={`rounded border-2 px-4 py-2 ${
                        item.trangThai
                          ? "border-green-400 text-green-400"
                          : "border-red-600 text-red-600"
                      }`}
                    >
                      {item.trangThai ? "Đang Làm" : "Nghỉ"}
                    </button>
                  </td>
                  <td>
                    <button className="rounded bg-yellow-500 px-2 py-1 text-white">
                      <Link to={`/admin/nhanvien/${item.id}`}>
                        <div
                          className="flex gap-2 transition-transform duration-500 hover:scale-125"
                          title="Chi tiết nhân viên"
                        >
                          <EyeFilled />
                        </div>
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
              {emptyRows > 0 &&
                Array.from({ length: emptyRows }).map((_, index) => (
                  <tr key={`empty-${index}`} style={{ height: "61px" }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mr-14 mt-4 flex justify-end">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
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
  );
}
