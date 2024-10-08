import { useEffect, useState } from "react";
import TheMoiNhanVien from "./TheMoiNhanVien";
import ReactPaginate from "react-paginate";
import axios from "axios";

export default function DanhSachNhanVien() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [nhanvien, setNhanVien] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [keyword, setKeyword] = useState("");
  const pageSize = 5;

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/nhanvien/search", {
        params: {
          pageNumber: trangHienTai,
          keyword: keyword,
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
  }, [trangHienTai, keyword]);

  console.log({ nhanvien });

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Quản Lý Nhân Viên</h1>

      {/* Nút thêm mới nhân viên */}
      <div className="mb-4">
        <button
          onClick={openModal}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          Thêm Mới Nhân Viên
        </button>
      </div>

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
            <TheMoiNhanVien button={closeModal} />
          </div>
        </div>
      )}

      {/* Ô tìm kiếm tách biệt */}
      <div className="mb-6 rounded bg-white p-4 shadow">
        <h2 className="mb-2 text-xl font-semibold">Tìm Kiếm Nhân Viên</h2>
        <input
          type="text"
          placeholder="Nhập tên hoặc mã nhân viên..."
          className="w-full rounded border border-gray-300 p-2"
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      {/* Danh sách nhân viên */}
      <div className="rounded bg-white p-4 shadow">
        <h2 className="mb-4 text-xl font-semibold">Danh Sách Nhân Viên</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b px-4 py-2">STT</th>
                <th className="border-b px-4 py-2">Họ tên</th>
                <th className="border-b px-4 py-2">Ngày Sinh</th>
                <th className="border-b px-4 py-2">Giới Tính</th>
                <th className="border-b px-4 py-2">Địa Chỉ</th>
                <th className="border-b px-4 py-2">Chức Vụ</th>
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
                  <td className="border-b px-4 py-2">{item.hoTen}</td>
                  <td className="border-b px-4 py-2">{item.ngaySinh}</td>
                  <td className="border-b px-4 py-2">{item.gioiTinh}</td>
                  <td className="border-b px-4 py-2">{item.diaChi}</td>
                  <td className="border-b px-4 py-2">{item.taiKhoan.roles}</td>
                  <td className="mx-auto flex justify-center border-b px-4 py-2 text-center">
                    <button
                      className={`relative flex h-6 w-[50px] items-center rounded-full bg-blue-500 transition-all duration-300 ${
                        item.taiKhoan.trangThai
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`h-6 w-6 transform rounded-full shadow-md ${
                          item.taiKhoan.trangThai
                            ? "translate-x bg-green-400"
                            : "translate-x bg-red-600"
                        } transition-transform duration-300`}
                      ></div>
                    </button>
                  </td>
                  <td>Actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mr-14 mt-4 flex justify-center">
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
  );
}
