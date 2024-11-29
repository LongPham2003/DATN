import { Button, Input, Pagination } from "antd";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import SPMua from "./SPMua";

export default function TheoDoiDonHang() {
  const [idKH, setIdKH] = useState();
  const [listHoaDon, setListHoaDon] = useState([]);
  const [maHD, setmaHD] = useState();
  useEffect(() => {
    const laydsHD = async () => {
      let idkh = Number(localStorage.getItem("idKH"));
      setIdKH(idkh);

      // Khởi tạo URL cơ bản
      let url = `http://localhost:8080/api/hoadon/getAllHDTheoIDKH?idKhachHang=${idkh}`;

      // Thêm `maHD` nếu khác null
      if (maHD) {
        url += `&maHD=${maHD}`;
      }

      try {
        const resp = await axios.get(url);
        console.log(resp.data.result); // Log dữ liệu trả về
        setListHoaDon(resp.data.result);
      } catch (error) {
        console.error("Error fetching data:", error); // Log lỗi
      }
    };

    laydsHD(); // Gọi API
  }, [maHD]);
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

    // Định dạng số và thêm đơn vị VNĐ
    return parsedValue.toLocaleString("vi-VN") + " VNĐ";
  }
  return (
    <>
      <div className="my-10">
        <div className="text-center font-mono text-3xl font-semibold">
          <span>Danh Sách Đơn Hàng</span>
        </div>
        <div className="ml-[220px]">
          <span className="text-xl"> Tìm kiếm đơn hàng:</span>
          <Input
            style={{ width: "900px" }}
            placeholder="Nhập mã đơn hàng"
            size="large"
            onChange={(e) => setmaHD(e.target.value)}
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
                  Ngày nhận hàng dự kiến:{hd.ngayGiaoHang}
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
                    <Button color="danger" variant="outlined">
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
    </>
  );
}
