import { Button, DatePicker, Input, Modal, Pagination, Select } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import SPMua from "./SPMua";
import { toast } from "react-toastify";

export default function TheoDoiDonHang() {
  // const [idKH, setIdKH] = useState();
  const [listHoaDon, setListHoaDon] = useState([]);
  const [maHD, setmaHD] = useState();
  const [trangThaiDonHang, setTrangThaiDonHang] = useState("CHO_XAC_NHAN");
  const [ngay, setngay] = useState();
  const [idHD, setIdHD] = useState();
  // const [HDkhongthanhcong, setHDkhongthanhcong] = useState([]);

  const laydsHD = async () => {
    let idkh = Number(localStorage.getItem("idKH"));
    // setIdKH(idkh);

    // Khởi tạo URL cơ bản
    let url = `http://localhost:8080/api/hoadon/getAllHDTheoIDKH?idKhachHang=${idkh}`;
    let urlKhongThanhCong =`http://localhost:8080/api/hoadon/HDkhongthanhcong?idKhachHang=${idkh}`;

    // Thêm `maHD` nếu khác null
    if (maHD) {
      url += `&maHD=${maHD}`;
      urlKhongThanhCong += `&maHD=${maHD}`;
    }

    if (trangThaiDonHang) {
      url += `&trangThaiDonHang=${trangThaiDonHang}`;
    }

    if (ngay) {
      url += `&ngay=${ngay}`;
      urlKhongThanhCong += `&ngay=${ngay}`;
    }

    try {
      const resp = await axios.get(url);
      setListHoaDon(resp.data.result);
      // console.log(resp.data.result);
      if (trangThaiDonHang === "KhongThanhCong") {
        const respKhongThanhCong = await axios.get(urlKhongThanhCong);
        setListHoaDon(respKhongThanhCong.data.result);

        // Xử lý dữ liệu từ respKhongThanhCong nếu cần
    }
      // console.log(resp.data.result); // Log dữ liệu trả về
      
      // setHDkhongthanhcong(respKhongThanhCong.data.result);
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
  const [OpenModelHuy, setOpenModelHuy] = useState(false);
  const openModalHuy = () => {
    setOpenModelHuy(true);
  };
  const closeModalHuy = async () => {
    setOpenModelHuy(false);
  };
  const [ghiChu, setGhiChu] = useState("");
  const handleSubmitUpdateHuy = (id) => {
    // e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/huy/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            // console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");

            // fillHoaDon();
            // fillHoaDonChiTiet();
            // fillLichSuHoaDon();
            closeModalHuy();
            laydsHD();
          })
          .catch((error) => {
            console.log(error);
            laydsHD();

            // toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const mapTrangThaiDonHang = (trangThai) => {
    const trangThaiMapping = {
      CHO_XAC_NHAN: "Chờ xác nhận",
      DA_XAC_NHAN: "Đã xác nhận",
      CHO_GIAO_HANG: "Chờ giao hàng",
      DANG_GIAO: "Đang giao",
      HOAN_THANH: "Hoàn thành",
      HUY_DON: "Hủy đơn",
      HOAN_HANG : "Giao hàng không thành công",
      HOAN_HANG_THANH_CONG:"Giao hàng không thành công"
    };

    return trangThaiMapping[trangThai] || "Không xác định";
  };

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
            <Select.Option value="CHO_LAY_HANG">Chờ lấy hàng</Select.Option>
            <Select.Option value="CHO_GIAO_HANG">Chờ giao hàng</Select.Option>
            <Select.Option value="DANG_GIAO">Đang giao</Select.Option>
            <Select.Option value="HOAN_THANH">Hoàn thành</Select.Option>
            <Select.Option value="HUY_DON">Hủy đơn</Select.Option>
            <Select.Option value="KhongThanhCong">Giao hàng không thành công</Select.Option>
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
            className="mx-auto mt-9 h-[420px] w-[1000px] rounded-3xl shadow-lg shadow-gray-500/50"
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
                            ? "text-yellow-600"
                            : hd.trangThaiDonHang === "HOAN_THANH"
                              ? "text-green-500"
                              : hd.trangThaiDonHang === "HUY_DON"
                                ? "text-red-500"
                                : hd.trangThaiDonHang === "KhongThanhCong"
                                  ? "text-red-600"
                                  : ""
                    } text-lg`}
                  >
                      {mapTrangThaiDonHang(hd.trangThaiDonHang)}
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
            <hr  className="hr"/>
            <div className="flex gap-2">
              <div className="ml-5">
                <div className="mt-4">
                  <span className="font-bold"> Ngày đặt hàng:</span>
                  {hd.ngayDatHang}
                </div>
                {trangThaiDonHang !== "KhongThanhCong" ? (
                  <div className="mt-4">

                    {hd.trangThaiDonHang === "HOAN_THANH"
                      ? "Ngày giao:"
                      : "Ngày nhận hàng dự kiến:"}
                    {hd.ngayGiaoHang}
                  </div>) : ("")}

                <div className="mt-4">
                  <span className="font-bold"> Tổng tiền hàng:</span>{" "}
                  {formatTien(hd.tongTienHang)}
                </div>
                <div className="mt-4">
                  <span className="font-bold">
             
                    Tiền giảm từ phiếu giảm giá:
                  </span>{" "}
                  {formatTien(hd.tienDuocGiam)}
                </div>
                <div className="mt-4">
                  <span className="font-bold"> Phí vận chuyển:</span>
                  {formatTien(hd.phiVanChuyen)}
                </div>
                <div className="mt-4">

                  <span className="font-bold"> Tiền phải thành toán:</span>{" "}
                  {formatTien(hd.tienPhaiThanhToan)}
                </div>
                <div className="mt-4">

                  <span className="font-bold"> Ghi chú:</span>{" "}
                  {hd.ghiChu ? hd.ghiChu : "Không có ghi chú"}
                </div>
                <div className="mt-10">
                  {hd.trangThaiDonHang === "CHO_XAC_NHAN" ? (
                    <Button
                      color="danger"
                      variant="outlined"
                      onClick={() => {
                        setIdHD(hd.idHoaDon), openModalHuy();
                      }}
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
      {OpenModelHuy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-auto w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Hủy đơn hàng</h3>

              {/* Thêm radio buttons cho lý do hủy */}
              <div className="mb-4">
                <div className="mb-2">Chọn lý do hủy:</div>
                <div className="space-y-2">
                  <div>
                    <input
                      type="radio"
                      id="reason1"
                      name="cancelReason"
                      value="Muốn thay đổi sản phẩm"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="reason1">Muốn thay đổi sản phẩm</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="reason2"
                      name="cancelReason"
                      value="Thay đổi địa chỉ giao hàng"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="reason2">Thay đổi địa chỉ giao hàng</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="reason3"
                      name="cancelReason"
                      value="Đổi ý không muốn mua nữa"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    <label htmlFor="reason3">Đổi ý không muốn mua nữa</label>
                  </div>
                </div>
              </div>

              <label className="pt-3">Ghi chú khác</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4"
                placeholder="Nhập ghi chú khác tại đây (nếu có)..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault(), handleSubmitUpdateHuy(idHD);
                  }}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Hủy đơn
                </button>
              </div>
            </div>
            <button
              onClick={closeModalHuy}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
