import { button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
// index.js hoặc App.js
// import "bootstrap/dist/css/bootstrap.min.css";
// import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";

export default function ChatLieu() {
  // Trạng thái để lưu trữ danh sách chất liệu
  const [chatlieu, setChatLieu] = useState([]);

  // Trạng thái để lưu trữ chất liệu mới
  const [chatLieuMoi, setChatLieuMoi] = useState({
    ten: "",
    trangThai: true,
  });

  const [trangHienTai, setTrangHienTai] = useState(1);

  const [tongSoTrang, setTongSoTrang] = useState(0);
  const pages = Array.from({ length: tongSoTrang }, (_, index) => index + 1);
  const itemsPerPage = 5; // Đặt số mục trên mỗi trang là 5

  // Hàm để tải danh sách chất liệu
  const loadChatLieu = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/chatlieu/list?pageNumber=${page}`,
      );
      setChatLieu(response.data.result.result);
      setTongSoTrang(
        response.data.result.totalPages === undefined
          ? 0
          : response.data.result.totalPages,
      );
      console.log("Total pages: ", response.data.result.totalPages);
    } catch (error) {
      console.error("có lỗi xảy ra", error);
    }
  };

  const themMoiChatLieu = async () => {
    try {
      await axios.post(`http://localhost:8080/api/chatlieu/add`, chatLieuMoi);
      loadChatLieu();
      setChatLieuMoi({ ten: "", trangThai: true });
      alert("Thêm chất liệu mới thành công!");
    } catch (error) {
      console.error("Failed to add new chat lieu", error);
      alert("Thêm chất liệu mới thất bại!");
    }
  };

  const onInputChange = (e) => {
    setChatLieuMoi({ ...chatLieuMoi, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadChatLieu(trangHienTai);
  }, [trangHienTai]);
  const handlePageChange = (selectedPage) => {
    console.log(selectedPage);

    setTrangHienTai(selectedPage.selected + 1);
  };
  // const nextPage = (e) => {
  //   // console.log(e);
  //   loadChatLieu(+e.selected + 1);
  // };
  // Tính toán số dòng cần hiển thị
  const totalRows = itemsPerPage; // Số dòng cần hiển thị trên mỗi trang
  const emptyRows = totalRows - chatlieu.length; // Số dòng trống cần thêm

  return (
    <>
      <div className="h-screen w-full overflow-auto">
        <div className="mb-4 rounded bg-white p-4 shadow">
          <h2 className="mb-2 text-xl font-bold">Thêm Chất Liệu Mới</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Ngăn chặn hành vi mặc định
              themMoiChatLieu(); // Gọi hàm thêm mới chất liệu}}
            }}
            className="-mx-2 flex flex-wrap"
          >
            <div className="mb-4 w-1/2 px-2">
              <label htmlFor="tenChatLieu" className="mb-1">
                Tên Chất Liệu:
              </label>
              <input
                type="text"
                id="tenChatLieu"
                name="ten"
                onChange={(e) => onInputChange(e)}
                className="w-full rounded border p-2"
                placeholder="Nhập tên chất liệu"
              />
            </div>
            <div className="w-full px-2">
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Thêm Mới
              </button>
            </div>
          </form>
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
            {chatlieu.map((item, index) => (
              <tr key={item.id}>
                <td className="w-10 border border-gray-300 p-2 text-center">
                  {item.id}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  {item.ten}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  {item.trangThai ? "Kinh doanh" : "Ngừng kinh doanh"}
                </td>
                <td className="w-1/3 border border-gray-300 p-2 text-center">
                  <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
            {/* Thêm các dòng trống nếu cần */}
            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <tr key={`empty-${index}`} style={{ height: "57px" }}>
                  {" "}
                  {/* Đặt độ cao hàng là 57px */}
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                  <td className="border border-gray-300 p-2"></td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Giữ ReactPaginate ở nguyên một vị trí */}
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
              "px-3 py-1 border-b border-green-300 rounded-full hover:bg-gray-200 transition duration-200"
            }
            activeClassName={"bg-green-500 rounded-full text-white"}
            activeLinkClassName={
              "px-4 py-2 bg-green-500 text-white rounded-full"
            } // Đảm bảo nền đầy đủ cho nút đang hoạt động
          />
        </div>
        {/* <button> First </button>
        {pages.map((trang, index) => (
          <button key={trang}>{trang}</button>
        ))}
        <button> Last </button> */}
      </div>
    </>
  );
}
