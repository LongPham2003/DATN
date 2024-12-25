/* eslint-disable no-unused-vars */

import { Button, Popconfirm } from "antd";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { TrashIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import SanPhamHoaDon from "./SanPhamHoaDon";

/* eslint-disable react/prop-types */
const ThongTinHoaDon = ({
  hoaDon,
  hoaDonChiTiet,
  fillHoaDon,
  fillHoaDonChiTiet,
}) => {
  console.log(hoaDonChiTiet);
  const [OpenModelSP, setOpenModelSP] = useState(false);
  const openModalSP = () => {
    setOpenModelSP(true);
  };
  const closeModalSP = async () => {
    setOpenModelSP(false);
  };
  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
  //Them VND
  function formatTien(value) {
    // Loại bỏ dấu phân cách thập phân và chuyển thành số
    const parsedValue = parseFloat(value.toString().replace(",", "."));

    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(parsedValue)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }

    // Định dạng số và thêm đơn vị VNĐ
    return parsedValue.toLocaleString("vi-VN") + " VNĐ";
  }

  const XoaSPKhoiGioHang = async (idSPCT) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/giohang/${hoaDon.id}/spct/${idSPCT}`,
      );
      toast.success("Xóa thành công");
      await fillHoaDon();
      await fillHoaDonChiTiet();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h3 className="text-[20px] font-bold text-pink-500">
        Thông Tin Đơn Hàng
      </h3>
      <div className="mx-4 flex gap-10 text-lg">
        {/* Cột trái */}
        <div className="w-1/2 space-y-4 border-r pr-4">
          {/* <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Trạng thái:</span>
            <h3 className="font-semibold text-blue-600">
              {hoaDon.trangThaiDonHang}
            </h3>
          </div> */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Mã đơn hàng:</span>
            <h3 className="font-semibold text-gray-800">{hoaDon.ma}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Loại đơn:</span>
            <h3 className="font-semibold text-gray-800">
              {hoaDon.phuongThucGiaoHang}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Ngày tạo:</span>
            <h3 className="font-semibold text-gray-800">
              {formatDate(hoaDon.ngayTao)}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">
              Mã phiếu giảm giá:
            </span>
            <h3 className="font-semibold text-gray-800">
              {hoaDon.phieuGiamGia}
            </h3>
          </div>
        </div>

        {/* Cột phải */}
        <div className="w-1/2 space-y-4 pl-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Tổng tiền:</span>
            <h3 className="font-semibold text-gray-800">{hoaDon.tongTien}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Tiền được giảm:</span>
            <h3 className="font-semibold text-gray-800">
              {hoaDon.tienDuocGiam}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">Phí vận chuyển:</span>
            <h3 className="font-semibold text-gray-800">{hoaDon.tienShip}</h3>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-600">
              Tiền phải thanh toán:
            </span>
            <h3 className="font-semibold text-green-600">
              {hoaDon.tienPhaiThanhToan}
            </h3>
          </div>
        </div>
      </div>
      <hr />
      <div className="mx-4 py-4">
        <div className="mx-5 flex justify-between py-3">
          <h3 className="text-[20px] font-bold">Sản phẩm</h3>
          {hoaDon.trangThaiDonHang === "Chờ Xác Nhận" &&
          hoaDon.trangThaiThanhToan === "Chưa thanh toán" &&
          hoaDon.phuongThucGiaoHang !== "Tại quầy" ? (
            <button
              onClick={openModalSP}
              className="rounded bg-blue-500 px-2 py-2 text-white"
            >
              Sửa hóa đơn
            </button>
          ) : (
            ""
          )}
        </div>

        <table className="min-w-full text-center text-sm font-light">
          <thead className="top-0 bg-blue-700 text-xl font-medium text-white">
            <tr>
              <th className="px-6 py-4">STT</th>
              <th className="px-6 py-4">Ảnh</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Đơn giá</th>
              <th className="px-6 py-4">Số lượng</th>
              <th className="px-6 py-4">Thành tiền</th>
              {hoaDon.trangThaiDonHang === "Chờ Xác Nhận" &&
              hoaDon.trangThaiThanhToan === "Chưa thanh toán" ? (
                <th className="px-6 py-4">Hành động</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {hoaDonChiTiet.map((SPCT, index) => (
              <tr key={SPCT.id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>
                  <LayAnhTheoIdSP
                    id={SPCT.idSpct}
                    className="h-[120px] w-[120px]"
                  />
                </td>
                <td>
                  {SPCT.tenSanPham} <br />
                  {SPCT.maSPCT} [{SPCT.kichThuoc} - {SPCT.mauSac}]
                  <br />
                </td>
                <td>{formatTien(SPCT.donGia)}</td>
                <td>{SPCT.soLuong}</td>
                <td>{formatTien(SPCT.donGia * SPCT.soLuong)}</td>
                {hoaDon.trangThaiDonHang === "Chờ Xác Nhận" &&
                hoaDon.trangThaiThanhToan === "Chưa thanh toán" ? (
                  <td>
                    <Popconfirm
                      title="Xóa Sản phẩm"
                      description="Bạn có muốn xóa sản phẩm không?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={(e) => {
                        e.preventDefault();
                        XoaSPKhoiGioHang(SPCT.idSpct);
                      }}
                    >
                      <Button type="primary" danger>
                        <TrashIcon className="h-5 w-5 text-white" />
                        Xóa
                      </Button>
                    </Popconfirm>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {OpenModelSP && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-[1150px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nội dung của modal */}
            <SanPhamHoaDon
              id={hoaDon.id}
              fillHoaDon={fillHoaDon}
              fillHoaDonChiTiet={fillHoaDonChiTiet}
            />

            {/* Nút đóng modal */}
            <button
              onClick={closeModalSP}
              className="absolute right-2 top-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongTinHoaDon;
