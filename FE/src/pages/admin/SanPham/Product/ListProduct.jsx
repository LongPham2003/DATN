import { useEffect, useState } from "react";
import { Button, ButtonGroup, Radio } from "@material-tailwind/react";
import AddProduct from "../Product/AddProduct";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import CustomDropdown from "../../../CustomDropdown";
import DetailProduct from "../Product/DetailProduct"; // Import the DetailProduct component
import { Link } from "react-router-dom";

export default function ListProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [idLoai, setidLoai] = useState();
  const [tenTimKiem, setTenTimKiem] = useState("");

  const [trangThaiTimKiem, setTrangThaiTimKiem] = useState();
  const itemsPerPage = 5;

  const totalRows = itemsPerPage;
  const emptyRows = totalRows - danhSachSanPham.length;

  let ApiGetAllLoai = `http://localhost:8080/api/loai/getall`;

  const loadSanPham = async (page) => {
    try {
      // Tạo điều kiện để các giá trị có thể có hoặc không
      const queryParams = new URLSearchParams();
      queryParams.append("pageNumber", page); // Page là bắt buộc

      if (tenTimKiem) {
        queryParams.append("keyword", tenTimKiem); // Nếu có từ khóa tìm kiếm thì thêm vào query
      }

      if (idLoai) {
        queryParams.append("idLoai", idLoai); // Nếu có loại sản phẩm thì thêm vào query
      }

      if (trangThaiTimKiem !== undefined) {
        queryParams.append("trangThai", trangThaiTimKiem); // Nếu có trạng thái tìm kiếm thì thêm vào query
      }

      let url = `http://localhost:8080/api/sanpham/list?${queryParams.toString()}`;
      // console.log(url);

      const response = await axios.get(url);

      // Lấy dữ liệu danh mục loại sản phẩm
      const loai = await axios.get(ApiGetAllLoai);
      setLoaiSelect(loai.data.result);
      // setProduct(DetailPD.data);
      // Set danh sách sản phẩm và tổng số trang
      setDanhSachSanPham(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
      // console.log(DetailPD.data);
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

  // useEffect(() => {
  //   loadSanPham(trangHienTai);
  // }, [trangHienTai]);

  const handleOptionSelect = (selectedOption) => {
    // console.log(`Selected ID: ${selectedOption.ten}`); // In ID ra console
    setidLoai(selectedOption.id); // Cập nhật idLoai với ID đã chọn
  };

  const handleReset = () => {
    setTenTimKiem(""); // Đặt lại giá trị tìm kiếm
    setTrangThaiTimKiem(""); // Đặt lại trạng thái
    setidLoai(""); // Đặt lại loại nếu cần
    // setLoaiTimKiem(""); // Đặt lại loại tìm kiếm nếu cần
    // Bỏ chọn radio button
    const radioButtons = document.querySelectorAll('input[name="color"]');
    radioButtons.forEach((radio) => {
      radio.checked = false; // Bỏ chọn tất cả radio button
    });
    // Xóa nội dung ô tìm kiếm
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
      searchInput.value = ""; // Đặt lại giá trị ô tìm kiếm
    }

    loadSanPham(1);
  };

  useEffect(() => {
    loadSanPham(trangHienTai, tenTimKiem, trangThaiTimKiem, idLoai);
  }, [trangHienTai, tenTimKiem, trangThaiTimKiem, idLoai]);

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
              onChange={(e) => setTenTimKiem(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-7 flex">
          {/* <div className="items-center justify-start">
            <label htmlFor="">Danh mục:</label>
            <select className="ml-9 h-[44px] w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-yellow-500">
              {loaiSelect.map((loai) => (
                <option value={loai.id} key={loai.id}>
                  {loai.ten}
                </option>
              ))}
            </select>
          </div> */}
          <div className="ml-20 justify-center">
            <label htmlFor="Loai" className="mr-3 text-xl">
              Loại:
            </label>
            <CustomDropdown
              options={loaiSelect}
              onSelect={(e) => setidLoai(e.id)}
            />
          </div>
          <div className="ml-72 justify-center">
            <label className="mr-3 text-xl">Trạng thái:</label>
            Đang kinh doanh
            <Radio
              name="color"
              className="mr-14"
              value={true}
              onChange={(e) => setTrangThaiTimKiem(true)} // Cập nhật trực tiếp
            />
            Ngừng kinh doanh
            <Radio
              name="color"
              value={false}
              onChange={(e) => setTrangThaiTimKiem(false)} // Cập nhật trực tiếp
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <div onClick={handleReset}>
            <button
              type="button"
              className="mt-10 h-10 w-32 rounded-md bg-red-400 font-semibold text-white transition-colors duration-300 hover:bg-red-600 focus:bg-red-700 active:bg-red-300" // Thêm margin-left để tạo khoảng cách
              // Gọi hàm reset khi nhấn nút
            >
              Reset
            </button>
          </div>
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
                          {/* <button>Chi tiet</button> */}
                          {/* Xem detail */}
                          <div className="ml-5 flex gap-4">
                            <Link to={`/admin/chitietsanpham/${sp.id}`}>
                              <div className="flex gap-2 transition-transform duration-500 hover:scale-125">
                                <span>Chi tiết</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="size-6 cursor-pointer text-blue-500 transition-transform duration-500 hover:scale-150"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
                                    clipRule="evenodd"
                                  />
                                  <path
                                    fillRule="evenodd"
                                    d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            </Link>

                            {/* update trang thai */}
                          </div>
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
                {tongSoTrang > 1 && (
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
                )}
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
