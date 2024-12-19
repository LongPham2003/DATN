import { Radio } from "@material-tailwind/react";
import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function ThuongHieu() {
  const [listThuongHieu, setlistThuongHieu] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5
  const [thuongHieuMoi, setthuongHieuMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [error, setError] = useState("");
  const [tenThuongHieu, settenThuongHieu] = useState("");
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [isEditing, setIsEditing] = useState(false); //CHe do them moi
  const [currentId, setCurrentId] = useState(null); // State để lưu id của thương hiệu đang sửa

  // Tính toán số dòng cần hiển thị
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang

  const emptyRows = totalRows - listThuongHieu.length; // Số dòng trống cần thêm

  const loadThuongHieu = async (page) => {
    let url = `http://localhost:8080/api/thuonghieu/list?pageNumber=${page}`;
    // Kiểm tra và thêm tham số có điều kiện
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`; // Thêm từ khóa tìm kiếm nếu có sẵn
    }
    // console.log(url);
    try {
      const response = await axios.get(url);

      setlistThuongHieu(response.data.result.result);
      setTongSoTrang(response.data.result.totalPages); // Cập nhật tổng số trang
      // console.log(response.data.result.result);
    } catch (error) {
      console.error("Failed to fetch mau sac data", error);
    }
  };

  const laytenThuongHieu = async () => {
    try {
      let response = await axios.get(
        `http://localhost:8080/api/thuonghieu/ten`,
      );
      settenThuongHieu(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setthuongHieuMoi({ ...thuongHieuMoi, [name]: value });

    if (name === "ten") {
      const input = value.trim();

      // Check trong
      if (input === "") {
        setError("Tên thương hiệu không được để trống");
        return;
      }

      // Check ton tai
      const tenDaTonTai = tenThuongHieu.includes(input);
      if (tenDaTonTai) {
        setError("Tên thương hiệu đã tồn tại");
        return;
      }

      setError("");
    }
  };

  const themThuongHieu = async () => {
    // Nếu không, gọi hàm thêm mới

    // Xác nhận người dùng có muốn thêm thương hiệu mới hay không
    if (!window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này không?")) {
      return; // Nếu người dùng chọn Cancel, dừng thao tác
    }

    try {
      // Gọi API để thêm thương hiệu mới
      await axios.post(
        `http://localhost:8080/api/thuonghieu/add`,
        thuongHieuMoi,
      );

      // Sau khi thêm thành công, gọi lại loadThuongHieu để cập nhật bảng
      loadThuongHieu(trangHienTai);

      // Hiển thị thông báo thành công
      toast.success("Thêm thương hiệu mới thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
        style: {
          zIndex: 9999,
          overflowY: "hidden",
        },
      });

      // Reset form sau khi thêm mới thành công
      setthuongHieuMoi({ ten: "", trangThai: true });

      // Đặt lại giá trị ô tìm kiếm
      const addInput = document.querySelector('input[type="text"]');
      if (addInput) {
        addInput.value = "";
      }
    } catch (error) {
      // Hiển thị thông báo lỗi nếu xảy ra lỗi trong quá trình thêm
      toast.error("Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const capNhatThuongHieu = async () => {
    if (thuongHieuMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return; // Ngăn không cho tiếp tục nếu tên trống
    }

    if (tenThuongHieu.includes(thuongHieuMoi.ten)) {
      setError("Ten da ton tai");
      return;
    }
    // onInputChange();
    try {
      await axios.put(
        `http://localhost:8080/api/thuonghieu/update/${currentId}`,
        thuongHieuMoi,
      );
      if (!window.confirm("Bạn có chắc chắn muốn sửa sản phẩm này không?")) {
        return; // Nếu người dùng chọn Cancel, dừng thao tác
      }
      toast.success("Cập nhật thương hiệu thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      loadThuongHieu(trangHienTai); // Tải lại danh sách thương hiệu
      setthuongHieuMoi({ ten: "", trangThai: true }); // Đặt lại giá trị ô nhập liệu
      setIsEditing(false); // Đặt lại chế độ về thêm mới
      setCurrentId(null); // Đặt lại id
    } catch (error) {
      console.error("Cập nhật thương hiệu thất bại", error);
      toast.error("Cập nhật thương hiệu thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const themMoiThuongHieu = async (e) => {
    e.preventDefault();
    if (thuongHieuMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }
    if (isEditing) {
      // Nếu đang ở chế độ sửa, gọi hàm cập nhật
      await capNhatThuongHieu(); // Gọi hàm cập nhật thương hiệu
    } else {
      await themThuongHieu();
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      if (!window.confirm("Bạn có chắc chắn không?")) {
        return; // Nếu người dùng chọn Cancel, dừng thao tác
      }

      // Gửi yêu cầu cập nhật trạng thái trên server
      await axios.put(
        `http://localhost:8080/api/thuonghieu/updatetrangthai/${id}`,
      );

      loadThuongHieu(trangHienTai);
      setthuongHieuMoi({ ten: "", trangThai: true }); // Reset the form to initial state
      setIsEditing(false); // Set editing mode to false
      setCurrentId(null); // Clear the current ID
      toast.success("Cập nhật trạng thái thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error) {
      console.log(error);

      toast.error("Cập nhật trạng thái thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handlePageChange = (newPage) => {
    setTrangHienTai(+newPage.selected + 1);
  };

  const handleSetTenTimKiem = () => {
    // Lấy giá trị từ ô tìm kiếm
    const tenTimKiemValue = document.querySelector(
      'input[name="tenTimKiem"]',
    ).value; // Sử dụng name để lấy giá trị
    setTenTimKiem(tenTimKiemValue); // Lưu giá trị vào state tenTimKiem
    loadThuongHieu(trangHienTai); // Tải lại danh sách thương hiệu với từ khóa tìm kiếm
  };

  const handleRowClick = (item) => {
    // console.log("Dữ liệu dòng được chọn:", item); // Log dữ liệu dòng được chọn
    setthuongHieuMoi({ ten: item.ten, trangThai: item.trangThai }); // Lưu dữ liệu vào state thuongHieuMoi
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  const resetForm = (e) => {
    e.preventDefault();
    setthuongHieuMoi({ ten: "", trangThai: true }); // Reset the form to initial state
    setIsEditing(false); // Set editing mode to false
    setCurrentId(null); // Clear the current ID
    setError("");
  };
  useEffect(() => {
    laytenThuongHieu();
    loadThuongHieu(trangHienTai, tenTimKiem);
  }, [trangHienTai, tenTimKiem]);
  return (
    <>
      <div>
        <div className="overflow-none h-screen w-auto">
          <div className="mb-5 shadow drop-shadow-xl">
            <div className="flex justify-around gap-3 shadow drop-shadow-lg">
              <div className="mb-8 mt-4 w-[500px] rounded bg-white p-4 shadow">
                <h2 className="mb-2 text-xl font-bold">Thêm thương hiệu Mới</h2>
                <form
                  onSubmit={themMoiThuongHieu}
                  className="-mx-2 flex flex-wrap"
                >
                  <div className="mb-4 h-[150px] w-1/2 px-2">
                    <label htmlFor="tenThuongHieu" className="mb-1 block">
                      Tên Thương Hiệu:
                    </label>
                    <input
                      onChange={onInputChange}
                      type="text"
                      id="tenThuongHieuMoi"
                      name="ten"
                      value={thuongHieuMoi.ten} // Sử dụng giá trị từ state thuongHieuMoi
                      className="w-[450px] rounded border p-2 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
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
                            e.preventDefault(); // Ngăn chặn hành động nếu có lỗi
                            toast.error("Vui lòng sửa lỗi trước khi thêm mới."); // Hiển thị thông báo lỗi
                          }
                        }}
                      >
                        {isEditing ? "Sửa" : "Thêm Mới"}

                        {/* Thay đổi nội dung nút */}
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
              <div className="mb-8 mt-4 w-[500px] rounded bg-white p-4 shadow">
                <span className="mb-2 text-xl font-bold">Tìm kiếm</span>
                <div className="flex">
                  <div className="mb-4 h-[150px] px-2">
                    <label htmlFor="tenThuongHieu" className="mb-1 block">
                      Tên Thương Hiệu:
                    </label>
                    <input
                      type="text"
                      id="tenThuongHieu"
                      name="tenTimKiem"
                      className="w-[450px] rounded border p-2 hover:border-blue-500"
                      placeholder="Nhập tên thương hiệu"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={handleSetTenTimKiem}
                  >
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3">
            <table className="w-full border-collapse">
              <thead className="h-[50px] text-lg">
                <tr className="rounded-t-lg border bg-gray-200">
                  <th className="w-10 border border-b-gray-300 p-2">STT</th>
                  <th className="w-1/3 border border-b-gray-300 p-2">Tên</th>
                  <th className="w-1/3 border border-b-gray-300 p-2">
                    Trạng thái
                  </th>
                  <th className="w-1/3 border border-gray-300 p-2">
                    Hành động
                  </th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {listThuongHieu.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item)}
                    className="border border-b-gray-300 hover:bg-slate-100"
                  >
                    {/* Thêm sự kiện nhấp chuột */}
                    <td className="p-2 text-center">
                      {index + 1 + (trangHienTai - 1) * itemsPerPage}
                    </td>
                    <td className="p-2 text-center">{item.ten}</td>
                    <td className="p-2 text-center">
                      {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-green-600"
                        onClick={() => capNhatTrangThai(item.id)} // Gọi hàm cập nhật trạng thái
                      >
                        {item.trangThai ? "Ngừng kinh doanh" : "Kinh doanh"}
                      </button>
                    </td>
                  </tr>
                ))}
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
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="mr-14 mt-4 flex justify-end">
            <ReactPaginate
              previousLabel={"< Previous"}
              nextLabel={"Next >"}
              breakLabel={"..."}
              pageCount={tongSoTrang} // Tổng số trang
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageChange} // Hàm xử lý khi người dùng chọn trang
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
              } // Đảm bảo nền đầy đủ cho nút đang hoạt động
            />
          </div>
        </div>
        {/* Modal */}

        <ToastContainer />
      </div>
    </>
  );
}
