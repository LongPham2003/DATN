import { useEffect, useState } from "react";
import { Button, ButtonGroup, Radio } from "@material-tailwind/react";
import AddProduct from "../Product/AddProduct";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export default function ListProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5;

  const totalRows = itemsPerPage;
  const emptyRows = totalRows - danhSachSanPham.length;

  const loadSanPham = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/sanpham/list?pageNumber=${page}`,
      );
      setDanhSachSanPham(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
    } catch (error) {
      console.error("có lỗi xảy ra", error);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  useEffect(() => {
    loadSanPham(trangHienTai);
  }, [trangHienTai]);
  return (
    <>
      <div>
        <span className="text-xl font-medium">Tìm kiếm sản phẩm</span>
        <div className="ml-96">
          <div className="w-auto">
            <label className="mr-2">Tên Sản Phẩm:</label>
            <input
              type="text"
              placeholder="Nhập tên Sản Phẩm"
              className="w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mt-7 flex">
          <div className="items-center justify-start">
            <label htmlFor="">Danh mục:</label>
            <select className="ml-9 h-[44px] w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-yellow-500">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>
          <div className="ml-72 justify-center">
            <label className="mr-3 text-xl">Trạng thái:</label>
            Đang kinh doanh
            <Radio name="color" className="mr-14" />
            Ngừng kinh doanh
            <Radio name="color" />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="mt-10 h-10 w-32 rounded-md bg-blue-400 font-semibold text-black transition-colors duration-300 hover:bg-blue-600 focus:bg-blue-700 active:bg-blue-300"
          >
            Tìm kiếm
          </button>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-3xl font-semibold uppercase">
            Danh sách sản phẩm
          </span>
          <button
            type="button"
            onClick={openModal}
            className="mr-16 h-10 rounded-md bg-green-500 px-4 font-semibold text-white transition-colors duration-300 hover:bg-green-600 focus:bg-green-700 active:bg-green-400"
          >
            Thêm sản phẩm
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
              <div className="">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="bg-green-300 text-xl font-medium">
                    <tr>
                      <th className="w-10 px-6 py-4">STT</th>
                      <th className="w-80 px-6 py-4">Ten</th>
                      <th className="w-96 px-6 py-4">Loai</th>
                      <th className="w-72 px-6 py-4">Ngay Tao</th>
                      <th className="w-72 px-6 py-4">Trang Thai</th>
                      <th className="px-6 py-4">Hanh DOng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachSanPham.map((sp, index) => (
                      <tr
                        key={sp.id}
                        className="border-b border-neutral-950 text-xl font-medium"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{sp.tenSanPham}</td>
                        <td className="px-6 py-4">{sp.tenLoai}</td>
                        <td className="px-6 py-4">{sp.ngayTao}</td>
                        <td className="px-6 py-4">
                          {sp.trangThai ? "Kinh doanh" : "Ngung kinh doanh"}
                        </td>
                        <td className="px-6 py-4">
                          <button>Chi tiet</button>
                        </td>
                      </tr>
                    ))}{" "}
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
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8">
            <AddProduct />
            <button
              onClick={closeModal}
              className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
