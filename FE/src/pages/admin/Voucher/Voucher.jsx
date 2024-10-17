import { toast } from 'react-toastify';
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import ReactPaginate from "react-paginate";


export default function Voucher() {
  const [showModal, setShowModal] = useState(false);

  //edit
  const [showDetailModal, setShowDetailModal] = useState(false); 
  
  //detail
  const [showDetailModal1, setShowDetailModal1] = useState(false);

  const [vouchers, setVouchers] = useState([]);// danh sách voucher

  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5

  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang
  const emptyRows = totalRows - vouchers.length; // Số dòng trống cần thêm

  const [selectedVoucher, setSelectedVoucher] = useState({
    tenVoucher: "",
    dieuKienGiamGia: "",
    hinhThucGiam: "",
    mucGiam: "",
    giamToiDa: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    trangThai: "",
  });


  // Các trường nhập liệu cho voucher
  const [newVoucher, setNewVoucher] = useState({
    maVoucher: "",
    tenVoucher: "",
    dieuKienGiamGia: "",
    hinhThucGiam: "",
    mucGiam: "",
    giamToiDa: "",
    soLuong: "",
    ngayBatDau: "",
    ngayKetThuc: "",
    trangThai: true,
  });

  const handleOpenDetailModal = (voucher) => {
    setSelectedVoucher(voucher);
    console.log("Voucher to edit:", voucher);
    loadVoucherDetails(voucher);
    setShowDetailModal(true);
  };


  const handleOpenDetailModal1 = (voucher) => {
    setSelectedVoucher(voucher);
    console.log("Voucher to edit:", voucher);
    loadVoucherDetails(voucher);
    setShowDetailModal1(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const handleCloseDetailModal1 = () => {
    setShowDetailModal1(false);
  };

  // Hàm để cập nhật selectedVoucher với dữ liệu chi tiết voucher
  const loadVoucherDetails = (voucher) => {
    setSelectedVoucher({
      id: voucher.id || "",
      tenVoucher: voucher.tenVoucher || "",
      dieuKienGiamGia: voucher.dieuKienGiamGia || "",
      hinhThucGiam: voucher.hinhThucGiam || "",
      mucGiam: voucher.mucGiam || "",
      giamToiDa: voucher.giamToiDa || "",
      soLuong: voucher.soLuong || "",
      ngayBatDau: voucher.ngayBatDau || "",
      ngayKetThuc: voucher.ngayKetThuc || "",
      trangThai: voucher.trangThai || ""
    });
  };
  // Hàm để xử lý thay đổi trong các trường nhập liệu khi chỉnh sửa voucher
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedVoucher((prev) => ({
      ...prev, // Giữ lại tất cả các trường hiện tại
      [name]: value // Cập nhật trường hiện tại
    }));
  };

  // Hàm lưu lại các thay đổi sau khi chỉnh sửa voucher
  const handleSaveEdit = async () => {
    console.log("Selected voucher before save:", selectedVoucher);

    // Kiểm tra xem selectedVoucher có tồn tại và có ID hay không
    if (!selectedVoucher || !selectedVoucher.id) {
      console.error("Selected voucher is undefined or does not have a valid ID.");
      toast.error("Không thể lưu thay đổi. Vui lòng kiểm tra lại dữ liệu.");
      return; // Thoát khỏi hàm nếu không có ID
    }

    try {
      const response = await fetch(`http://localhost:8080/api/phieugiamgia/update/${selectedVoucher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedVoucher),
      });

      const data = await response.json();

      if (data.code === 1000) {
        // Cập nhật lại danh sách vouchers sau khi chỉnh sửa
        const updatedVouchers = vouchers.map(voucher =>
          voucher.id === selectedVoucher.id ? selectedVoucher : voucher
        );
        setVouchers(updatedVouchers);
        handleCloseDetailModal();
        toast.success("Chỉnh sửa voucher thành công!");
      } else {
        console.error("Error updating voucher:", data);
        toast.error("Chỉnh sửa voucher thất bại!");
      }
    } catch (error) {
      console.error("Error updating voucher:", error);
      toast.error("Đã xảy ra lỗi trong quá trình cập nhật voucher.");
    }
  };

  // Hàm để mở modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Hàm để đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Hàm để lấy danh sách voucher từ API
  const fetchVouchers = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/phieugiamgia/list?pageNumber=${page}`);
      const data = await response.json();
      if (data.code === 1000) {
        setVouchers(data.result.result); // Lưu dữ liệu voucher vào state
        setTongSoTrang(data.result.totalPages);
      } else {
        console.error("Error fetching vouchers:", data);
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    }
  };

  // Gọi fetchVouchers khi component được mount
  useEffect(() => {

    fetchVouchers(trangHienTai);

  }, [trangHienTai]);

  // Hàm để xử lý thay đổi trong các trường nhập liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/phieugiamgia/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVoucher),
      });

      const data = await response.json();

      if (data.code === 1000) {

        window.location.reload(); // Tải lại trang

        // fetchVouchers();
        setVouchers([...vouchers, newVoucher]);
        handleCloseModal();
      } else {
        console.error("Error adding voucher:", data);
      }
    } catch (error) {
      console.error("Error adding voucher:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setTrangHienTai(+newPage.selected + 1);
  };

  const handleChangeStatus = async (voucher) => {
    // Kiểm tra xem voucher có hợp lệ không
    if (!voucher || !voucher.id) {
      console.error("Selected voucher is undefined or does not have a valid ID.");
      return;
    }
  
    const updatedVoucher = {
      ...voucher,
      trangThai: !voucher.trangThai, // Đổi trạng thái
    };
  
    try {
      const response = await fetch(`http://localhost:8080/api/phieugiamgia/update/${updatedVoucher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVoucher),
      });
  
      const data = await response.json();
  
      if (data.code === 1000) {
        // Cập nhật lại danh sách vouchers nếu cần
        const updatedVouchers = vouchers.map(v => (v.id === updatedVoucher.id ? updatedVoucher : v));
        setVouchers(updatedVouchers);
        toast.success("Trạng thái đã được thay đổi!");
      } else {
        console.error("Error changing status:", data);
      }
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  
  

  return (
    <>
      <div className="mx-4 h-full bg-stone-100 py-4">
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Quản lý voucher
        </span>
        <div className="mx-4 py-4">
          <div className="mb-12 h-48 rounded-lg border-2 border-gray-400 bg-white drop-shadow-xl p-4">
            {/* Các bộ lọc */}
            <div className="flex">
              <svg
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="ml-2 font-semibold">Bộ lọc</span>
            </div>
            <hr />
            <div className="ml-10 grid grid-cols-3 gap-4">
              {/* Các bộ lọc ở đây */}
              <div className="flex py-2">
                <label className="mr-2">Mã khuyến mãi: </label>
                <input
                  className="block w-48 rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Mã voucher..."
                  type="text"
                />
              </div>
              <div className="flex py-2">
                <label className="mr-2">Tên khuyến mãi: </label>
                <input
                  className="block w-48 rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Tên voucher..."
                  type="text"
                />
              </div>
              <div className="flex py-2">
                <label className="mr-2">Ngày bắt đầu: </label>
                <input
                  className="block w-48 rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="date"
                />
              </div>
              <div className="flex py-2">
                <label className="mr-2">Điều kiện giảm: </label>
                <input
                  className="block w-48 rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                />
              </div>
              <div className="flex py-2">
                <label className="mr-2">Trạng thái: </label>
                <select className="block w-48 rounded border border-gray-300 bg-white px-2 pr-2 leading-tight text-gray-700 focus:border-sky-500 focus:outline-none">
                  <option>Tất cả</option>
                  <option>Đang kích hoạt</option>
                  <option>Ngừng kích hoạt</option>
                </select>
              </div>
              <div className="flex py-2">
                <label className="mr-2">Ngày kết thúc: </label>
                <input
                  className="block w-48 rounded-md border border-slate-300 bg-white py-2 pl-2 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="date"
                />
              </div>
            </div>
            <div className="pt-4 text-center">
              <button className="h-[35px] w-40 rounded-full border-2 bg-sky-500 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:text-black">
                Làm mới
              </button>
            </div>
          </div>
          {/* Danh sách voucher */}
          <div className="rounded-lg bg-white drop-shadow-xl">
            <div className="grid grid-cols-6 gap-4 py-4">
              <span className="col-start-1 col-end-3 ml-3 text-2xl">
                Danh Sách Voucher
              </span>
              <button
                type="button"
                className="col-span-1 col-end-7 mr-5 h-11 w-44 rounded-full border-2 border-green-700 bg-white text-black hover:bg-green-600 hover:text-white"
                onClick={handleOpenModal}
              >
                Thêm mới Voucher
              </button>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2">
                  <div className="overflow-auto">
                    <table className="min-w-full text-left text-sm font-light">

                      <thead className="bg-green-300 text-base font-medium">
                        <tr>
                          <th className="px-3 py-1">#</th>
                          <th className="px-3 py-1">Mã</th>
                          <th className="px-3 py-1">Tên</th>
                          <th className="px-3 py-1">Điều kiện giảm</th>
                          <th className="px-3 py-1">Hình Thức giảm</th>
                          <th className="px-3 py-1">Mức giảm</th>
                          <th className="px-3 py-1">Giảm tối đa</th>
                          <th className="px-3 py-1">Số lượng</th>
                          <th className="px-3 py-1">Ngày bắt đầu</th>
                          <th className="px-3 py-1">Ngày kết thúc</th>
                          <th className="px-3 py-1">Trạng thái</th>
                          <th className="px-3 py-1">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vouchers.map((voucher, index) => (
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100" key={index}>
                            <td className="border border-gray-300 p-2 text-center">
                              {index + 1 + (trangHienTai - 1) * itemsPerPage}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{"PGG" + voucher.id}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.tenVoucher}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.dieuKienGiamGia}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.hinhThucGiam}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.mucGiam}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.giamToiDa}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.soLuong}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.ngayBatDau}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.ngayKetThuc}</td>
                            <td className="whitespace-nowrap px-6 py-4">{voucher.trangThai ? 'Đang kích hoạt' : 'Ngưng kích hoạt'}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <button onClick={() => handleOpenDetailModal(voucher)} className="text-yellow-500 hover:text-blue-700">EDIT</button>
                              <button onClick={() => handleOpenDetailModal1(voucher)} className="text-blue-500 hover:text-red-700 ml-2">Detail</button>
                              <button  onClick={() => handleChangeStatus(voucher)} className="text-red-500 hover:text-red-700 ml-2">Change</button>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal thêm voucher */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">Thêm Voucher</Dialog.Title>
            <div className="mt-4">
              <label className="block">Tên khuyến mãi:</label>
              <input
                name="tenVoucher"
                value={newVoucher.tenVoucher}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Tên voucher..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Điều kiện giảm:</label>
              <input
                name="dieuKienGiamGia"
                value={newVoucher.dieuKienGiamGia}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Điều kiện giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Hình thức giảm:</label>
              <input
                name="hinhThucGiam"
                value={newVoucher.hinhThucGiam}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Hình thức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Mức giảm:</label>
              <input
                name="mucGiam"
                value={newVoucher.mucGiam}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Mức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Giảm tối đa:</label>
              <input
                name="giamToiDa"
                value={newVoucher.giamToiDa}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Giảm tối đa..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Số lượng:</label>
              <input
                name="soLuong"
                value={newVoucher.soLuong}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Số lượng..."
                type="number"
              />
            </div>
            <div className="mt-4">
              <label className="block">Ngày bắt đầu:</label>
              <input
                name="ngayBatDau"
                value={newVoucher.ngayBatDau}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-4">
              <label className="block">Ngày kết thúc:</label>
              <input
                name="ngayKetThuc"
                value={newVoucher.ngayKetThuc}
                onChange={handleChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleSave}
              >
                Lưu
              </button>
              <button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-black hover:bg-gray-300"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>



      {/* modal EDIT*/}
      <Dialog
        open={showDetailModal}
        onClose={handleCloseDetailModal}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">Chỉnh sửa Voucher</Dialog.Title>
            <div className="mt-4">
              <label className="block">Tên khuyến mãi:</label>
              <input
                name="tenVoucher"
                value={selectedVoucher.tenVoucher}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Tên voucher..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Điều kiện giảm:</label>
              <input
                name="dieuKienGiamGia"
                value={selectedVoucher.dieuKienGiamGia}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Điều kiện giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Hình thức giảm:</label>
              <input
                name="hinhThucGiam"
                value={selectedVoucher.hinhThucGiam}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Hình thức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Mức giảm:</label>
              <input
                name="mucGiam"
                value={selectedVoucher.mucGiam}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Mức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Giảm tối đa:</label>
              <input
                name="giamToiDa"
                value={selectedVoucher.giamToiDa}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Giảm tối đa..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Số lượng:</label>
              <input
                name="soLuong"
                value={selectedVoucher.soLuong}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Số lượng..."
                type="number"
              />
            </div>
            <div className="mt-4">
              <label className="block">Ngày bắt đầu:</label>
              <input
                name="ngayBatDau"
                value={selectedVoucher.ngayBatDau}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-4">
              <label className="block">Ngày kết thúc:</label>
              <input
                name="ngayKetThuc"
                value={selectedVoucher.ngayKetThuc}
                onChange={handleEditChange}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveEdit}
                className="rounded-md bg-green-500 px-4 py-2 text-white"
              >
                Lưu
              </button>
              <button
                onClick={handleCloseDetailModal}
                className="ml-2 rounded-md border border-gray-300 px-4 py-2"
              >
                Hủy
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>


      {/* modal DETAIL*/}
      <Dialog
        open={showDetailModal1}
        onClose={handleCloseDetailModal1}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-bold">Chỉnh sửa Voucher</Dialog.Title>
            <div className="mt-4">
              <label className="block">Tên khuyến mãi:</label>
              <input
              disabled
                name="tenVoucher"
                value={selectedVoucher.tenVoucher}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Tên voucher..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Điều kiện giảm:</label>
              <input
              disabled
                name="dieuKienGiamGia"
                value={selectedVoucher.dieuKienGiamGia}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Điều kiện giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Hình thức giảm:</label>
              <input
              disabled
                name="hinhThucGiam"
                value={selectedVoucher.hinhThucGiam}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Hình thức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Mức giảm:</label>
              <input
              disabled
                name="mucGiam"
                value={selectedVoucher.mucGiam}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Mức giảm..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Giảm tối đa:</label>
              <input
              disabled
                name="giamToiDa"
                value={selectedVoucher.giamToiDa}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Giảm tối đa..."
                type="text"
              />
            </div>
            <div className="mt-4">
              <label className="block">Số lượng:</label>
              <input
              disabled
                name="soLuong"
                value={selectedVoucher.soLuong}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                placeholder="Số lượng..."
                type="number"
              />
            </div>
            <div className="mt-4">
              
              <label className="block">Ngày bắt đầu:</label>
              <input
              disabled
                name="ngayBatDau"
                value={selectedVoucher.ngayBatDau}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-4">
              <label className="block">Ngày kết thúc:</label>
              <input
              disabled
                name="ngayKetThuc"
                value={selectedVoucher.ngayKetThuc}
                className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-2 shadow-sm"
                type="date"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseDetailModal1}
                className="rounded-md bg-green-500 px-4 py-2 text-white"
              >
                Back
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}