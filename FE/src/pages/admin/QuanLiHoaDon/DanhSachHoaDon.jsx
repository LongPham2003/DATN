import { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig.js";
import ReactPaginate from "react-paginate";


export default function DanhSachHoaDon() {

  const [hoaDon, setHoaDon] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [soPhanTu, setSoPhanTu] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [phuongThucGiaoHang, setPhuongThucGiaoHang] = useState(null);
  const [trangThai, setTrangThai] = useState(null);
  const [tongSoTrang, setTongSoTrang] = useState(0);

  //
  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };
  const handleReset = () => {
    setKeyword("");
    setPhuongThucGiaoHang(null);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/api/hoadon/getall", {
      params: {
        pageNumber: trangHienTai,
        pageSize: soPhanTu,
        phuongThucGiaoHang: phuongThucGiaoHang !== null ? phuongThucGiaoHang : null,
        keyword: keyword,
        trangThai: trangThai

      }
    }).then(async (response) => {
      const data = response.data;
      setHoaDon(data.result.result);
      setTongSoTrang(data.result.totalPages);
    })
      .catch((error) => {
        console.log(error);
      });
  }, [trangHienTai, soPhanTu, phuongThucGiaoHang, keyword, trangThai]);

  return (
    <>
      <div className="p-4">
        <h1 className="mb-2 text-2xl font-bold">Quản Lý Hóa Đơn </h1>
      </div>
      <div>
        <div className="flex gap-10 px-10">
          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">
              Tìm Kiếm Hóa Đơn
            </h2>
            <input
              type="text"
              placeholder="Nhập Mã Hoá Đơn Tên Khách Hàng Hoặc SDT"
              value={keyword}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>

          <div className="mb-6 w-[50%] rounded bg-white p-2 shadow">
            <h2 className="mb-2 text-xl font-semibold">
              Loại đơn hàng
            </h2>
            <select
              name="trangThai"
              id="trangThai"
              value={phuongThucGiaoHang || ""}
              className="w-full rounded border border-gray-300 p-2"
              onChange={(event) => {
                event.target.value === "" ? setPhuongThucGiaoHang(null)
                  : setPhuongThucGiaoHang(event.target.value);
              }}
            >
              <option value="">Tất cả</option>
              <option value="online">Online</option>
              <option value="Tại quầy ">Tại Quầy</option>
            </select>
          </div>
        </div>
        <button className="flex mx-auto rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                onClick={handleReset}>Làm mới
        </button>
      </div>
      <div className="rounded bg-white p-4 shadow">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-semibold">Danh Sách Hóa Đơn</h2>
          <div className=" mb-4 text-xl font-semibold">
            <select name="" id="" onChange={(e) => setSoPhanTu(e.target.value)}>
              <option value="">chọn số phần tử</option>
              <option value="10">10</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4 p-2">
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={()=>setTrangThai(null)}
            >
              Tất cả
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={()=>setTrangThai('CHO_XAC_NHAN_DON')}
            >
              Chờ xác nhận
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={()=>setTrangThai('DA_XAC_NHAN_DON')}
            >
              Chờ giao
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={()=>setTrangThai('DA_THANH_TOAN')}
            >
              Hoàn thành
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-500 text-white"
              onClick={()=>setTrangThai('HUY_DON')}
            >
              Đã hủy
            </button>
          </div>

        </div>
        <div></div>
        <div className=" max-h-[500px] overflow-y-auto ">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-4 py-2">STT</th>
              <th className="border-b px-4 py-2">Mã</th>
              <th className="border-b px-4 py-2">Tên Khách Hàng</th>
              <th className="border-b px-4 py-2">SDT</th>
              <th className="border-b px-4 py-2">Tổng Tiền</th>
              <th className="border-b px-4 py-2">Loại Đơn Hàng</th>
              <th className="border-b px-4 py-2">Ngày Tạo</th>
              <th className="border-b px-4 py-2">Trạng Thái</th>
              <th className="border-b px-4 py-2">Hành Động</th>
            </tr>
            </thead>
            <tbody className="text-center">
            {hoaDon.map((item, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">
                  {index + 1 + (trangHienTai - 1) * soPhanTu}
                </td>
                <td className="border-b px-4 py-2">{item.ma}</td>
                <td className="border-b px-4 py-2">{item.tenKhachHang}</td>
                <td className="border-b px-4 py-2">{item.soDienThoai}</td>
                <td className="border-b px-4 py-2">{item.tongTien}</td>
                <td className="mx-auto flex justify-center border-b px-4 py-2 text-center">
                  <button
                    className={`px-4 py-2 rounded border-2 ${
                      item.phuongThucGiaoHang === "online" ? "border-green-400 text-green-400"
                        : "border-orange-400 text-orange-400"
                    }`}
                  >

                    {item.phuongThucGiaoHang === "online" ? "Online" : "Tại Quầy"}

                  </button>
                </td>
                <td className="border-b px-4 py-2">{item.ngayTao}</td>
                <td className="border-b px-4 py-2">{item.trangThai}</td>
                <td>
                  <button className="rounded bg-blue-500 px-2 py-1 text-white">
                    Chi Tiết
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

    </>
  );
}