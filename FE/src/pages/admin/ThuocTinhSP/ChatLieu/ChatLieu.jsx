import { Radio } from "@material-tailwind/react";
import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Modal } from "antd";

export default function chatlieu() {
  const [listchatlieu, setListchatlieu] = useState([]);
  const [tongSoTrang, setTongSoTrang] = useState(0); // Tổng số trang
  const [trangHienTai, setTrangHienTai] = useState(1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5
  const [chatlieuMoi, setchatlieuMoi] = useState({
    ten: "",
    trangThai: true,
  });
  const [error, setError] = useState("");
  const [tenchatlieu, setTenchatlieu] = useState("");
  const [tenTimKiem, setTenTimKiem] = useState("");
  const [isEditing, setIsEditing] = useState(false); //CHe do them moi
  const [currentId, setCurrentId] = useState(null); // State để lưu id của chất liệu đang sửa

  // Tính toán số dòng cần hiển thị
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang

  const emptyRows = totalRows - listchatlieu.length; // Số dòng trống cần thêm

  const loadchatlieu = async (page) => {
    let url = `http://localhost:8080/api/chatlieu/list?pageNumber=${page}`;
    // Kiểm tra và thêm tham số có điều kiện
    if (tenTimKiem) {
      url += `&keyword=${encodeURIComponent(tenTimKiem)}`; // Thêm từ khóa tìm kiếm nếu có sẵn
    }
    // console.log(url);
    try {
      const response = await axios.get(url);

      setListchatlieu(response.data.result.result);
      setTongSoTrang(response.data.result.totalPages); // Cập nhật tổng số trang
      // console.log(response.data.result.result);
    } catch (error) {
      console.error("Failed to fetch chat lieu data", error);
    }
  };

  const layTenchatlieu = async () => {
    try {
      let response = await axios.get(`http://localhost:8080/api/chatlieu/ten`);
      setTenchatlieu(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setchatlieuMoi({ ...chatlieuMoi, [name]: value });

    if (name === "ten") {
      const input = value.trim();

      // Check trong
      if (input === "") {
        setError("Tên chất liệu không được để trống");
        return;
      }

      // Check ton tai
      const tenDaTonTai = tenchatlieu.includes(input);
      if (tenDaTonTai) {
        setError("Chất liệu đã tồn tại");
        return;
      }

      setError("");
    }
  };

  const themchatlieu = async () => {  
    // Sử dụng Modal.confirm để xác nhận trước khi thêm chất liệu mới
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn thêm chất liệu mới?",
      onOk: async () => {
        try {
          // Gọi API để thêm chất liệu mới
          await axios.post(`http://localhost:8080/api/chatlieu/add`, chatlieuMoi);

          // Sau khi thêm thành công, gọi lại loadchatlieu để cập nhật bảng
          loadchatlieu(trangHienTai);

          // Hiển thị thông báo thành công
          toast.success("Thêm chất liệu mới thành công");

          // Reset form sau khi thêm mới thành công
          setchatlieuMoi({ ten: "", trangThai: true });

          // Đặt lại giá trị ô tìm kiếm
          const addInput = document.querySelector('input[type="text"]');
          if (addInput) {
            addInput.value = "";
          }
        } catch (error) {
          // Hiển thị thông báo lỗi nếu xảy ra lỗi trong quá trình thêm
          toast.error("Thêm mới thất bại");
        }
      },
      onCancel() {
        // Hành động khi người dùng chọn Cancel (không cần làm gì ở đây)
      },
    });
  };

  const capNhatchatlieu = async () => {
    if (chatlieuMoi.ten.trim() === "") {
      setError("Tên không được để trống");
      return; // Ngăn không cho tiếp tục nếu tên trống
    }

    if (tenchatlieu.includes(chatlieuMoi.ten)) {
      setError("Tên đã tồn tại");
      return;
    }

    // Sử dụng Modal.confirm để xác nhận trước khi cập nhật chất liệu
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn cập nhật chất liệu này?",
      onOk: async () => {
        try {
          await axios.put(
            `http://localhost:8080/api/chatlieu/update/${currentId}`,
            chatlieuMoi,
          );
          toast.success("Cập nhật chất liệu thành công");
          loadchatlieu(trangHienTai); // Tải lại danh sách chất liệu
          setchatlieuMoi({ ten: "", trangThai: true }); // Đặt lại giá trị ô nhập liệu
          setIsEditing(false); // Đặt lại chế độ về thêm mới
          setCurrentId(null); // Đặt lại id
        } catch (error) {
          console.error("C���p nhật chất liệu thất bại", error);
          toast.error("Cập nhật chất liệu thất bại");
        }
      },
      onCancel() {
        // Hành động khi người dùng chọn Cancel (không cần làm gì ở đây)
      },
    });
  };

  const themMoichatlieu = async (e) => {
    e.preventDefault();
    if (chatlieuMoi.ten.trim() === "") {
      setError("Tên chất liệu không được để trống");
      return;
    }
    if (isEditing) {
      // Nếu đang ở chế độ sửa, gọi hàm cập nhật
      await capNhatchatlieu(); // Gọi hàm cập nhật chất liệu
    } else {
      await themchatlieu();
    }
  };

  const capNhatTrangThai = async (id) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn cập nhật trạng thái này?",
      onOk: async () => {
        try {
          // Gửi yêu cầu cập nhật trạng thái trên server
          await axios.put(
            `http://localhost:8080/api/chatlieu/updatetrangthai/${id}`,
          );

          loadchatlieu(trangHienTai);
          setchatlieuMoi({ ten: "", trangThai: true }); // Reset the form to initial state
          setIsEditing(false); // Set editing mode to false
          setCurrentId(null); // Clear the current ID
          toast.success("Cập nhật trạng thái thành công");
        } catch (error) {
          console.log(error);
          toast.error("Cập nhật trạng thái thất bại");
        }
      },
      onCancel() {
        // Hành động khi người dùng chọn Cancel (không cần làm gì ở đây)
      },
    });
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
    loadchatlieu(trangHienTai); // Tải lại danh sách chất liệu với từ khóa tìm kiếm
  };

  const handleRowClick = (item) => {
    // console.log("Dữ liệu dòng được chọn:", item); // Log dữ liệu dòng được chọn
    setchatlieuMoi({ ten: item.ten, trangThai: item.trangThai }); // Lưu dữ liệu vào state chatlieuMoi
    setIsEditing(true);
    setCurrentId(item.id);
    setError("");
  };

  const resetForm = (e) => {
    e.preventDefault();
    setchatlieuMoi({ ten: "", trangThai: true }); // Reset the form to initial state
    setIsEditing(false); // Set editing mode to false
    setCurrentId(null); // Clear the current ID
    setError("");
  };
  useEffect(() => {
    layTenchatlieu();
    loadchatlieu(trangHienTai, tenTimKiem);
  }, [trangHienTai, tenTimKiem]);
  return (
    <>
      <div>
        <div className="overflow-none h-screen w-auto">
          <div className="mb-5 shadow drop-shadow-xl">
            <div className="flex justify-around gap-3 shadow drop-shadow-lg">
              <div className="mb-8 mt-4 w-[500px] rounded bg-white p-4 shadow">
                <h2 className="mb-2 text-xl font-bold">Thêm Chất liệu Mới</h2>
                <form
                  onSubmit={themMoichatlieu}
                  className="-mx-2 flex flex-wrap"
                >
                  <div className="mb-4 h-[150px] w-1/2 px-2">
                    <label htmlFor="tenchatlieu" className="mb-1 block">
                      Tên Chất liệu:
                    </label>
                    <input
                      onChange={onInputChange}
                      type="text"
                      id="tenchatlieuMoi"
                      name="ten"
                      value={chatlieuMoi.ten} // Sử dụng giá trị từ state chatlieuMoi
                      className="w-[450px] rounded border p-2 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                      placeholder="Nhập tên chất liệu"
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
                    <label htmlFor="tenchatlieu" className="mb-1 block">
                      Tên Chất Liệu:
                    </label>
                    <input
                      type="text"
                      id="tenchatlieu"
                      name="tenTimKiem"
                      className="w-[450px] rounded border p-2 hover:border-blue-500"
                      placeholder="Nhập tên chất liệu"
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
                {listchatlieu.map((item, index) => (
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

        {/* <ToastContainer /> */}
      </div>
    </>
  );
}
