import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "../../../api/axiosConfig";
import { Link } from "react-router-dom";
import ThemMoiPhieuGiamGia from "./ThemMoiPhieuGiamGia";

export default function ListPhieuGiamGia() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [added, setAdded] = useState(false);

  const [nhanvien, setNhanVien] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [tenVoucher, setTenVoucher] = useState("");
  const [trangThai, setTrangThai] = useState(null);
  const pageSize = 5;

  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");

  // Hàm xử lý thay đổi cho Ngày Bắt Đầu
  const handleNgayBatDauChange = (event) => {
    setNgayBatDau(event.target.value); // Cập nhật giá trị Ngày Bắt Đầu
  };

  // Hàm xử lý thay đổi cho Ngày Kết Thúc
  const handleNgayKetThucChange = (event) => {
    setNgayKetThuc(event.target.value); // Cập nhật giá trị Ngày Kết Thúc
  };

  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/phieugiamgia/list", {
        params: {
          pageNumber: trangHienTai,
          tenVoucher: tenVoucher,
          trangThai: trangThai !== null ? trangThai : undefined, // Nếu trangThai là null, không gửi tham số
          ngayBatDau: ngayBatDau,
          ngayKetThuc: ngayKetThuc,
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
  }, [trangHienTai, tenVoucher, added, trangThai, ngayBatDau, ngayKetThuc]);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Quản Lý Phiếu Giảm Giá</h1>

      {/* Ô tìm kiếm tách biệt */}

      <div>
        <div className="flex gap-10">
          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">
              Tìm Kiếm Phiếu Giảm Giá
            </h2>
            <input
              type="text"
              placeholder="Nhập tên hoặc mã Phiếu Giảm Giá..."
              className="w-full rounded border border-gray-300 p-2"
              onChange={(event) => setTenVoucher(event.target.value)}
            />
          </div>

          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">
              Trạng Thái Phiếu Giảm Giá
            </h2>
            <select
              name="trangThai"
              id="trangThai"
              className="w-full rounded border border-gray-300 p-2"
              onChange={(e) => {
                const value =
                  e.target.value === "" ? null : e.target.value === "true";
                setTrangThai(value);
              }}
            >
              <option value="">Tất cả</option>
              <option value="true">Hoạt động</option>
              <option value="false">Không hoạt động</option>
            </select>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">Ngày Bắt Đầu</h2>
            <input
              type="date"
              placeholder="Nhập tên hoặc mã Phiếu Giảm Giá..."
              className="w-full rounded border border-gray-300 p-2"
              onChange={handleNgayBatDauChange}
            />
          </div>

          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">Ngày Kết Thúc</h2>
            <input
              type="date"
              placeholder="Nhập tên hoặc mã Phiếu Giảm Giá..."
              className="w-full rounded border border-gray-300 p-2"
              onChange={handleNgayKetThucChange}
            />
          </div>
        </div>
      </div>

      {/* Danh sách nhân viên */}
      <div className="rounded bg-white p-4 shadow">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-semibold">
            Danh Sách Phiếu Giảm Giá
          </h2>
          <div>
            {/* Nút thêm mới */}
            <div className="mb-4">
              <button
                onClick={openModal}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                Thêm Mới Phiếu Giảm Giá
              </button>
            </div>
            {/* Modal Thêm Mới */}
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-3xl rounded-lg bg-white p-4">
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
                  <ThemMoiPhieuGiamGia
                    button={closeModal}
                    onAdd={() => setAdded(true)}
                  />
                </div>
              </div>
            )}{" "}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b px-4 py-2 text-[12px]">STT</th>
                <th className="border-b px-4 py-2 text-[12px]">Tên Phiếu</th>
                <th className="border-b px-4 py-2 text-[12px]">
                  Điều Kiện Giảm
                </th>
                <th className="border-b px-4 py-2 text-[12px]">Hình Thức</th>
                <th className="border-b px-4 py-2 text-[12px]">Mức Giảm</th>
                <th className="border-b px-4 py-2 text-[12px]">Giảm Tối Đa</th>
                <th className="border-b px-4 py-2 text-[12px]">Số Lượng</th>
                <th className="border-b px-4 py-2 text-[12px]">Ngày Bắt Đầu</th>
                <th className="border-b px-4 py-2 text-[12px]">
                  Ngày Kết Thúc
                </th>
                <th className="border-b px-4 py-2 text-[12px]">Trạng Thái</th>
                <th className="border-b px-4 py-2 text-[12px]">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {nhanvien.map((item, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">
                    {index + 1 + (trangHienTai - 1) * pageSize}
                  </td>
                  <td className="border-b px-4 py-2">{item.tenVoucher}</td>
                  <td className="border-b px-4 py-2">{item.dieuKienGiamGia}</td>
                  <td className="border-b px-4 py-2">{item.hinhThucGiam}</td>
                  <td className="border-b px-4 py-2">{item.mucGiam}</td>
                  <td className="border-b px-4 py-2">{item.giamToiDa}</td>
                  <td className="border-b px-4 py-2">{item.soLuong}</td>
                  <td className="border-b px-4 py-2">{item.ngayBatDau}</td>
                  <td className="border-b px-4 py-2">{item.ngayKetThuc}</td>
                  <td className="mx-auto flex justify-center border-b px-4 py-2 text-center">
                    <button
                      className={`relative flex h-6 w-[50px] items-center rounded-full bg-blue-500 transition-all duration-300 ${
                        item.trangThai ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`h-6 w-6 transform rounded-full shadow-md ${
                          item.trangThai
                            ? "translate-x bg-green-400"
                            : "translate-x bg-red-600"
                        } transition-transform duration-300`}
                      ></div>
                    </button>
                  </td>
                  <td>
                    <button className="rounded bg-blue-500 px-2 py-1 text-white">
                      <Link to={`/admin/phieugiamgia/${item.id}`}>
                        Chi Tiết
                      </Link>
                    </button>
                  </td>
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
