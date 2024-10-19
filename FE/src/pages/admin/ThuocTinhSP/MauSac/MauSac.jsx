import { Radio } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";
import UpdateMauSac from "./UpdateMauSac";
import { useNavigate } from "react-router-dom";

export default function MauSac() {
  const [listMauSac, setListMauSac] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5
  const [mauSacMoi, setMauSacMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [error, setError] = useState("");
  const [tenMauSac, setTenMauSac] = useState("");
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null); // State để lưu id của màu sắc đang sửa

  // Tính toán số dòng cần hiển thị
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang

  const navigate = useNavigate();
  const emptyRows = totalRows - listMauSac.length; // Số dòng trống cần thêm

  const loadMauSac = async (page) => {
    let url = `http://localhost:8080/api/mausac/list?pageNumber=${page}`;
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`; // Thêm từ khóa tìm kiếm nếu có sẵn
    }
    // console.log(url);
    try {
      const response = await axios.get(url);
      // Kiểm tra và thêm tham số có điều kiện

      setListMauSac(response.data.result.result);
      setTongSoTrang(response.data.result.totalPages); // Cập nhật tổng số trang
      // console.log(response.data.result.result);
    } catch (error) {
      console.error("Failed to fetch mau sac data", error);
    }
  };

  const layTenMauSac = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/mausac/ten`);
      setTenMauSac(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    layTenMauSac();
    loadMauSac(trangHienTai, tenTimKiem);
  }, [trangHienTai, tenTimKiem]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setMauSacMoi({ ...mauSacMoi, [e.target.name]: e.target.value }); // go den dau luu den day
    // console.log(e.target.value);

    if (name === "ten") {
      if (value.trim() !== "") {
        setError("");
      } else if (value.trim() === "") {
        setError("Tên màu sắc không được để trống");
      } else {
        const tenDaTonTai = tenMauSac.includes(value);
        if (tenDaTonTai) {
          setError("Tên màu sắc đã tồn tại");
          return;
        } else {
          setError("");
        }
      }
    }
  };

  
  const themMauSac = async (e) => {
    e.preventDefault();
    // Nếu không, gọi hàm thêm mới

    if (mauSacMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return;
    }

    // Xác nhận người dùng có muốn thêm màu sắc mới hay không
    if (!window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này không?")) {
      return; // Nếu người dùng chọn Cancel, dừng thao tác
    }

    try {
      // Gọi API để thêm màu sắc mới
      await axios.post(`http://localhost:8080/api/mausac/add`, mauSacMoi);

      // Sau khi thêm thành công, gọi lại loadMauSac để cập nhật bảng
      loadMauSac(trangHienTai);

      // Hiển thị thông báo thành công
      toast.success("Thêm màu sắc mới thành công", {
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
      setMauSacMoi({ ten: "", trangThai: true });

      // Đặt lại giá trị ô tìm kiếm
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) {
        searchInput.value = "";
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

  const capNhatMauSac = async () => {
    if (mauSacMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return; // Ngăn không cho tiếp tục nếu tên trống
    }
    try {
      await axios.put(
        `http://localhost:8080/api/mausac/update/${currentId}`,
        mauSacMoi,
      );
      if (!window.confirm("Bạn có chắc chắn muốn sửa sản phẩm này không?")) {
        return; // Nếu người dùng chọn Cancel, dừng thao tác
      }
      toast.success("Cập nhật màu sắc thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      loadMauSac(trangHienTai); // Tải lại danh sách màu sắc
      setMauSacMoi({ ten: "", trangThai: true }); // Đặt lại giá trị ô nhập liệu
      setIsEditing(false); // Đặt lại chế độ về thêm mới
      setCurrentId(null); // Đặt lại id
    } catch (error) {
      console.error("Cập nhật màu sắc thất bại", error);
      toast.error("Cập nhật màu sắc thất bại", {
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

  const themMoiMauSac = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Nếu đang ở chế độ sửa, gọi hàm cập nhật
      await capNhatMauSac(); // Gọi hàm cập nhật màu sắc
    } else {
      await themMauSac();
    }
  };

  const capNhatTrangThai = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/mausac/updatetrangthai/${id}`);
      if (!window.confirm("Bạn có chắc chắn muốn thêm sản phẩm này không?")) {
        return; // Nếu người dùng chọn Cancel, dừng thao tác
      }
      loadMauSac(trangHienTai); // Tải lại danh sách màu sắc
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
    loadMauSac(trangHienTai); // Tải lại danh sách màu sắc với từ khóa tìm kiếm
  };

  const handleRowClick = (item) => {
    console.log("Dữ liệu dòng được chọn:", item); // Log dữ liệu dòng được chọn
    setMauSacMoi({ ten: item.ten, trangThai: item.trangThai }); // Lưu dữ liệu vào state mauSacMoi
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  const resetForm = () => {
    setMauSacMoi({ ten: "", trangThai: true }); // Reset the form to initial state
    setIsEditing(false); // Set editing mode to false
    setCurrentId(null); // Clear the current ID
    setError("");
  };

  return (
    <>
      <div>
        <div className="h-screen w-full overflow-auto">
          <div className="flex gap-3">
            <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
              <h2 className="mb-2 text-xl font-bold">Thêm Màu Sắc Mới</h2>
              <form onSubmit={themMoiMauSac} className="-mx-2 flex flex-wrap">
                <div className="mb-4 h-[150px] w-1/2 px-2">
                  <label htmlFor="tenMauSac" className="mb-1 block">
                    Tên Màu Sắc:
                  </label>
                  <input
                    onChange={onInputChange}
                    type="text"
                    id="tenMauSac"
                    name="ten"
                    value={mauSacMoi.ten} // Sử dụng giá trị từ state mauSacMoi
                    className="w-[450px] rounded border p-2 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                    placeholder="Nhập tên màu sắc"
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
            <div className="mb-4 w-[500px] rounded bg-white p-4 shadow">
              <span className="mb-2 text-xl font-bold">Tìm kiếm</span>
              <div className="flex">
                <div className="mb-4 h-[150px] px-2">
                  <label htmlFor="tenMauSac" className="mb-1 block">
                    Tên Màu Sắc:
                  </label>
                  <input
                    type="text"
                    id="tenMauSac"
                    name="tenTimKiem"
                    className="w-[450px] rounded border p-2 hover:border-blue-500"
                    placeholder="Nhập tên màu sắc"
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
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="w-10 border border-gray-300 p-2">STT</th>
                <th className="w-1/3 border border-gray-300 p-2">Tên</th>
                <th className="w-1/3 border border-gray-300 p-2">Trạng thái</th>
                <th className="w-1/3 border border-gray-300 p-2">Hành động</th>
                {/* Add more headers as needed */}
              </tr>
            </thead>
            <tbody>
              {listMauSac.map((item, index) => (
                <tr key={item.id} onClick={() => handleRowClick(item)}>
                  {" "}
                  {/* Thêm sự kiện nhấp chuột */}
                  <td className="border border-gray-300 p-2 text-center">
                    {index + 1 + (trangHienTai - 1) * itemsPerPage}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.ten}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                  </td>
                  <td className="border border-gray-300 p-2 text-center">
                    <button
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                    <td className="border border-gray-300 p-2"></td>
                  </tr>
                ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
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
