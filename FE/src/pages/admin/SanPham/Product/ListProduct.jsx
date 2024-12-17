import { useEffect, useState } from "react";
import { Radio } from "@material-tailwind/react";
import AddProduct from "../Product/AddProduct";
import ReactPaginate from "react-paginate";
import axios from "../../../../api/axiosConfig";
import CustomDropdown from "../../../CustomDropdown";
import { Link } from "react-router-dom";
import SanPhamChiTiet from "./SanPhamChiTiet.jsx";
import {
  EyeFilled,
  InfoCircleFilled,
  PlusCircleFilled,
  ReloadOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ListConsumer } from "antd/es/list/context.js";
import { ListBulletIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { BiRefresh } from "react-icons/bi";

export default function ListProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalSuaOpen, setIsModalSuaOpen] = useState(false);

  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [loaiSelect, setLoaiSelect] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [idLoai, setidLoai] = useState();
  const [tenTimKiem, setTenTimKiem] = useState("");

  const [selectedProductId, setSelectedProductId] = useState(null);

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
    setIsModalSuaOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSuaModal = (id) => {
    setSelectedProductId(id);
    setIsModalSuaOpen(true);
    setIsModalOpen(false);
  };

  const closeSuaModal = async () => {
    setSelectedProductId(null);
    setIsModalSuaOpen(false);
    await loadSanPham(trangHienTai); // Gọi lại danh sách sản phẩm sau khi sửa
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
        <span className="text-xl font-medium">Tìm kiếm sản phẩm:</span>
        <div className="flex">
          <div className="mx-10 my-5">
            <div className="w-auto">
              <label className="mr-2">Tên Sản Phẩm:</label>
              <input
                type="text"
                placeholder="Nhập tên Sản Phẩm"
                className="h-[38px] w-[500px] rounded-md border-2 border-gray-300 p-2 outline-none transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                onChange={(e) => setTenTimKiem(e.target.value)}
              />
            </div>
          </div>
          <div className="mx-10 my-5">
            <label htmlFor="Loai" className="mr-3 text-xl">
              Loại:
            </label>
            <CustomDropdown
              options={loaiSelect}
              selectedValue={
                idLoai
                  ? loaiSelect.find((loai) => loai.id === idLoai)
                  : { ten: "Mời bạn chọn loại", id: "" }
              }
              onSelect={(e) => setidLoai(e.id)}
            />
          </div>
        </div>

        <div className="mt-7 flex justify-center">
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

          <div className="flex items-center">
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
              className="mt-10 h-10 w-32 rounded-md bg-red-500 font-semibold text-white transition-colors duration-300 hover:bg-red-600 focus:bg-red-700 active:bg-red-300" // Thêm margin-left để tạo khoảng cách
              // Gọi hàm reset khi nhấn nút
            >
              <ReloadOutlined /> Làm mới
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
            <PlusCircleFilled /> <span> Thêm sản phẩm</span>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2">
              <div className="">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="bg-amber-600 text-xl font-medium text-white">
                    <tr>
                      <th className="w-10 px-6 py-4">STT</th>
                      <th className="w-14 px-6 py-4">Mã</th>
                      <th className="w-52 px-6 py-4">Tên</th>
                      <th className="w-52 px-6 py-4">Loại</th>
                      <th className="w-52 px-6 py-4">Ngày tạo</th>
                      <th className="w-52 px-6 py-4">Số lượng tồn</th>
                      <th className="w-64 px-6 py-4">Trạng thái</th>
                      <th className="px-6 py-4">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachSanPham.map((sp, index) => (
                      <tr
                        key={sp.id}
                        className="border-b border-neutral-950 text-xl font-medium"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{sp.ma}</td>
                        <td className="px-6 py-4">{sp.tenSanPham}</td>
                        <td className="px-6 py-4">{sp.tenLoai}</td>
                        <td className="px-6 py-4">{sp.ngayTao}</td>
                        <td className="px-6 py-4">{sp.soLuongTon}</td>
                        <td className="px-6 py-4">
                          {sp.trangThai
                            ? "Đang kinh doanh"
                            : "Ngừng Kinh Doanh"}
                        </td>
                        <td className="px-6 py-4">
                          {/* <button>Chi tiet</button> */}
                          {/* Xem detail */}
                          <div className="flex gap-4">
                            <button
                              className="rounded bg-violet-500 px-2 py-1 text-white"
                              onClick={() => openSuaModal(sp.id)}
                              title="Sửa thông tin sản phẩm"
                            >
                              <SettingOutlined />
                            </button>

                            <button className="rounded bg-yellow-500 px-2 py-1 text-white">
                              <Link to={`/admin/chitietsanpham/${sp.id}`}>
                                <div
                                  className="flex gap-2 transition-transform duration-500 hover:scale-125"
                                  title="Danh sách biến thể"
                                >
                                  <EyeFilled />
                                </div>
                              </Link>
                            </button>
                            <button
                              className="rounded bg-green-500 px-2 py-1 text-white"
                              title="Thêm mới biến thể"
                            >
                              <Link to={`/admin/themsanphamchitiet/${sp.id}`}>
                                <PlusCircleFilled />
                              </Link>
                            </button>
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
          <div className="h-[600px] w-[800px] rounded-lg bg-white p-8">
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

      {isModalSuaOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[750px] w-[800px] rounded-lg bg-white p-8">
            <SanPhamChiTiet
              productId={selectedProductId}
              closeModal={closeSuaModal}
            />
            <button
              onClick={closeSuaModal}
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
