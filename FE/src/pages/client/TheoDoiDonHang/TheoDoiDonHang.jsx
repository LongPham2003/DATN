import { Button, DatePicker, Input, Modal, Pagination, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import SPMua from "./SPMua";

export default function TheoDoiDonHang() {
  const [idKH, setIdKH] = useState();
  const [listHoaDon, setListHoaDon] = useState([]);
  const [maHD, setmaHD] = useState();
  const [trangThaiDonHang, setTrangThaiDonHang] = useState("CHO_XAC_NHAN");
  const [ngay, setngay] = useState();

  const laydsHD = async () => {
    let idkh = Number(localStorage.getItem("idKH"));
    setIdKH(idkh);

    // Khởi tạo URL cơ bản
    let url = `http://localhost:8080/api/hoadon/getAllHDTheoIDKH?idKhachHang=${idkh}`;

    // Thêm `maHD` nếu khác null
    if (maHD) {
      url += `&maHD=${maHD}`;
    }

    if (trangThaiDonHang) {
      url += `&trangThaiDonHang=${trangThaiDonHang}`;
    }

    if (ngay) {
      url += `&ngay=${ngay}`;
    }

    try {
      const resp = await axios.get(url);
      console.log(resp.data.result); // Log dữ liệu trả về
      setListHoaDon(resp.data.result);
    } catch (error) {
      console.error("Error fetching data:", error); // Log lỗi
    }
  };

  useEffect(() => {
    laydsHD(); // Gọi API
  }, [maHD, ngay, trangThaiDonHang]);
  //Them VND
  function formatTien(value) {
    if (value === null) {
      return 0;
    }
    // Loại bỏ dấu phân cách thập phân và chuyển thành số
    const parsedValue = parseFloat(value.toString().replace(",", "."));

    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(parsedValue)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }

  //   // Định dạng số và thêm đơn vị VNĐ
    return parsedValue.toLocaleString("vi-VN") + " VNĐ";
  }
  // const [OpenModelHuy, setOpenModelHuy] = useState(false);
  // const openModalHuy = () => {
  //   setOpenModelHuy(true);
  // };
  // const closeModalHuy = async () => {
  //   setOpenModelHuy(false);
  // };
  // const [ghiChu, setGhiChu] = useState("");
  // const handleSubmitUpdateHuy = (id) => {
  //   // e.preventDefault(); // Ngăn chặn hành động mặc định của form
  //   Modal.confirm({
  //     title: "Xác nhận cập nhật",
  //     content: "Bạn có chắc chắn muốn cập  không?",
  //     onOk() {
  //       axios
  //         .post(`http://localhost:8080/api/hoadon/huy/${id}`, {
  //           ghiChu: ghiChu,
  //         })
  //         .then((response) => {
  //           console.log("Cập nhật thành công:", response.data);
  //           // toast.success("Thành công");
  //           openModalHuy();
  //           // fillHoaDon();
  //           // fillHoaDonChiTiet();
  //           // fillLichSuHoaDon();
  //           laydsHD();
  //         })
  //         .catch((error) => {
  //           openModalHuy();
  //           // toast.error(error.response.data.message); // Hiển thị thông báo từ server
  //         });
  //     },
  //     onCancel() {
  //       // Nếu người dùng hủy, có thể không cần làm gì cả
  //     },
  //   });
  // };
  return (
    <>
      <div className="my-10">
        <div className="text-center font-mono text-3xl font-semibold">
          <span>Danh Sách Đơn Hàng</span>
        </div>

        <div className="flex items-center">
          <span className="text-xl"> Tìm kiếm đơn hàng:</span>
          <Select
            style={{ width: "400px", marginLeft: "10px" }}
            placeholder="Chọn trạng thái"
            size="large"
            onChange={(value) => setTrangThaiDonHang(value)}
            value={trangThaiDonHang || "CHO_XAC_NHAN"} // Set default value here
          >
            <Select.Option value="CHO_XAC_NHAN">Chờ xác nhận</Select.Option>
            <Select.Option value="DA_XAC_NHAN">Đã xác nhận</Select.Option>
            <Select.Option value="DA_LAY_HANG">Chờ lấy hàng</Select.Option>
            <Select.Option value="CHO_GIAO_HANG">Chờ giao hàng</Select.Option>
            <Select.Option value="DANG_GIAO">Đang giao</Select.Option>
            <Select.Option value="HOAN_THANH">Hoàn thành</Select.Option>
            <Select.Option value="HUY_DON">Hủy đơn</Select.Option>
          </Select>

          <Input
            style={{ width: "400px", marginLeft: "10px" }}
            placeholder="Nhập mã đơn hàng"
            size="large"
            onChange={(e) => setmaHD(e.target.value)}
          />
          <DatePicker
            style={{ width: "400px", marginLeft: "10px" }}
            placeholder="Chọn ngày"
            size="large"
            onChange={(date, dateString) => setngay(dateString)}
            format="YYYY/MM/DD"
          />
        </div>
        {listHoaDon.map((hd, index) => (
          <div
            className="mx-auto mt-9 h-[400px] w-[1000px] rounded-3xl shadow-lg shadow-gray-500/50"
            key={index}
          >
            <div className="flex w-full justify-between">
              <div className="ml-5 text-left">
                <div>
                  <b>Mã đơn hàng:</b>
                  {hd.maHoaDon}{" "}
                </div>
                <div>Địa chỉ nhận hàng:{hd.diaChiGiaoHang}</div>
              </div>
              <div className="mr-5 text-right">
                <div>
                  <span> Trạng thái đơn hàng:</span>
                  <span
                    className={` ${
                      hd.trangThaiDonHang === "CHO_XAC_NHAN"
                        ? "text-gray-500"
                        : hd.trangThaiDonHang === "DA_XAC_NHAN"
                          ? "text-orange-500"
                          : hd.trangThaiDonHang === "CHO_GIAO_HANG" ||
                              hd.trangThaiDonHang === "DANG_GIAO"
                            ? "text-yellow-500"
                            : hd.trangThaiDonHang === "HOAN_THANH"
                              ? "text-green-500"
                              : hd.trangThaiDonHang === "HUY_DON"
                                ? "text-red-500"
                                : ""
                    } text-lg`}
                  >
                    {hd.trangThaiDonHang}
                  </span>
                </div>

                <div>
                  <span
                    className={
                      hd.trangThaiThanhToan ? "text-green-500" : "text-red-500"
                    }
                  >
                    {hd.trangThaiThanhToan
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="ml-5">
                <div className="mt-4">
                  <span className="font-bold"> Ngày đặt hàng:</span>
                  {hd.ngayDatHang}
                </div>
                <div className="mt-4">
                  {hd.trangThaiDonHang === "HOAN_THANH"
                    ? "Ngày giao:"
                    : "Ngày nhận hàng dự kiến:"}
                  {hd.ngayGiaoHang}
                </div>
                <div className="mt-4">
                  <span className="font-bold"> Tổng tiền hàng:</span>{" "}
                  {formatTien(hd.tongTienHang)}
                </div>
                <div className="mt-4">
                  <span className="font-bold">
                    {" "}
                    Tiền giảm từ phiếu giảm giá:
                  </span>{" "}
                  {formatTien(hd.tienDuocGiam)}
                </div>
                <div className="mt-4">
                  <span className="font-bold"> Phí vận chuyển:</span>
                  {formatTien(hd.phiVanChuyen)}
                </div>
                <div className="mt-4">
                  {" "}
                  <span className="font-bold"> Tiền phải thành toán:</span>{" "}
                  {formatTien(hd.tienPhaiThanhToan)}
                </div>
                <div className="mt-10">
                  {hd.trangThaiDonHang === "CHO_XAC_NHAN" ? (
                    <Button
                      color="danger"
                      variant="outlined"
                      // onClick={() => handleSubmitUpdateHuy(hd.idHoaDon)}
                    >
                      Hủy đơn
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <SPMua idHD={hd.idHoaDon} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div></div>
      {/* {OpenModelHuy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[300px] w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Cập nhật hóa đơn</h3>
              <label className="pt-3">Ghi chú</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4" // Số dòng hiển thị
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={handleSubmitUpdateHuy}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <button
              onClick={closeModalHuy}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}
