import html2pdf from "html2pdf.js"; // Thêm import html2pdf
import { useState } from "react";
import { useEffect } from "react";
import axios from "./../../../api/axiosConfig";
import { Link } from "react-router-dom";
// import anh from "./../../../../logo/logohd.png"

export const generatePDF = () => {
  // Tìm phần tử với ID 'main'
  const element = document.querySelector("#main");
  if (element) {
    // Tùy chọn cho html2pdf
    const opt = {
      margin: 1,
      filename: "download.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 8 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // Tạo PDF và mở cửa sổ in
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get("pdf")
      .then((pdf) => {
        pdf.autoPrint(); // Tự động mở cửa sổ in
        window.open(pdf.output("bloburl")); // Mở PDF trong cửa sổ mới
      });
  } else {
    console.error("Không tìm thấy phần tử với ID 'main'.");
  }
};

export const ExportPDF = ({ idHoaDon, tienKhachDua, tienThuaTraKhach }) => {
  const [hoadon, setHoaDon] = useState({});
  const [danhSachSP, setDanhSachSP] = useState([]);
  const [maHD, setMaHD] = useState("");

  let ApiLayThongTinHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/${idHoaDon}`;
  let ApiLayDanhSachSanPham = `http://localhost:8080/api/hoadonchitiet/SPCTbyidHD/${idHoaDon}`;
  const fetchData = async () => {
    try {
      // Gọi cả hai API đồng thời
      const [hd, sp] = await Promise.all([
        axios.get(ApiLayThongTinHoaDon),
        axios.get(ApiLayDanhSachSanPham),
      ]);

      setHoaDon(hd.data.result);
      setMaHD(hd.data.result.ma);
      // console.log("Dữ liệu sản phẩm nhận được:", sp.data.result);
      setDanhSachSP(sp.data.result);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error.message);
    }
  };

  // Gọi fetchData từ một sự kiện khác, ví dụ khi một prop thay đổi
  useEffect(() => {
    if (idHoaDon) {
      fetchData(); // Gọi fetchData khi idHoaDon có giá trị
    }
  }, [idHoaDon]); // Chạy lại khi idHoaDon thay đổi

  const formatCurrencyToNumber = (value) => {
    // Đảm bảo giá trị là chuỗi trước khi sử dụng replace
    const stringValue = String(value);

    // Loại bỏ tất c các ký tự không phải là số
    const formattedValue = stringValue.replace(/[^\d]/g, "");

    // Chuyển chuỗi thành số và trả về kết quả
    return parseInt(formattedValue, 10);
  };

  return (
    <>
      <div
        className="relative p-4 font-mono"
        id="main"
        style={{
          width: "620px",
          height: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "url('./../../../../logo/logohd.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.3,
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="text-center text-3xl font-bold uppercase">
            <span>Hóa đơn mua hàng</span>
          </div>
          <div className="my-2 text-center text-lg font-semibold">
            <p>Tòa nhà FPT Polytechnic- Phương Canh- Nam Từ Liêm- Hà Nội</p>
            <p>SDT: 0123456789</p>
          </div>
          <hr />
          <div className="my-3">
            {hoadon.tenNhanVien === null ? (
              ""
            ) : (
              <p>Nhân viên bán hàng:{hoadon.tenNhanVien}</p>
            )}

            <p>Mã hóa đơn : {hoadon.ma}</p>
            <p>
              Ngày mua hàng:{" "}
              <b className="text-xl">
                {new Date(hoadon.ngayTao).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </b>
            </p>
            <p>Tên khách hàng:{hoadon.tenKhachHang}</p>

            {hoadon.soDienThoai !== null ? <p>Sdt:{hoadon.soDienThoai}</p> : ""}
            {hoadon.diaChiGiaoHang !== null ? (
              <p>Địa chỉ:{hoadon.diaChiGiaoHang}</p>
            ) : (
              ""
            )}
          </div>
          {/* table */}
          <div className="my-3">
            <table className="border-collapse border-2 border-solid border-gray-500 text-center">
              <thead>
                <tr className="min-h-24 justify-center">
                  <th className="w-14 border-collapse border-2 border-solid border-gray-500 p-2 text-center">
                    STT
                  </th>
                  <th className="w-52 border-collapse border-2 border-solid border-gray-500 p-2">
                    Tên Sản Phẩm
                  </th>
                  <th className="w-20 border-collapse border-2 border-solid border-gray-500 p-2">
                    Số Lượng
                  </th>
                  <th className="w-36 border-collapse border-2 border-solid border-gray-500 p-2">
                    Đơn Giá
                  </th>
                  <th className="w-28 border-collapse border-2 border-solid border-gray-500 p-2">
                    Thành Tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {danhSachSP.length > 0 ? (
                  danhSachSP.map((sp, index) => (
                    <tr key={sp.idSpct}>
                      <td className="border-collapse border-2 border-solid border-gray-500 p-2">
                        {index + 1}
                      </td>
                      <td className="border-collapse border-2 border-solid border-gray-500 p-2">
                        {sp.tenSanPham} - {sp.maSPCT} <br />
                        {sp.kichThuoc} - {sp.mauSac}
                      </td>
                      <td className="border-collapse border-2 border-solid border-gray-500 p-2">
                        {sp.soLuong}
                      </td>
                      <td className="border-collapse border-2 border-solid border-gray-500 p-2">
                        {sp.donGia}
                      </td>
                      <td className="border-collapse border-2 border-solid border-gray-500 p-2">
                        {sp.soLuong * sp.donGia}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <p className="mt-3 font-bold">Tổng sản phẩm mua:</p>
          </div>
          <div className="my-2 text-left">
            <div className="my-2">
              <p>Tổng tiền: {hoadon.tongTien}</p>
              <p>Giảm giá: {hoadon.tienDuocGiam}</p>

              <p>Phí giao hàng: {hoadon.tienShip}</p>

              <p>Tiền phải thanh toán: {hoadon.tienPhaiThanhToan}</p>
            </div>
            <hr />
            <div>
              <p>Thanh toán: {hoadon.phuongThucThanhToan}</p>
              <p>
                Giao hàng:{" "}
                {formatCurrencyToNumber(hoadon.tienShip) > 0
                  ? "Giao Hàng"
                  : "Tại Quầy"}
              </p>
              <p>Trạng thái: {hoadon.trangThaiThanhToan}</p>
              <p>Tiền khách đưa: {tienKhachDua}</p>
              <p>Tiền thừa trả khách: {tienThuaTraKhach}</p>
            </div>
          </div>
          <div className="text-xs italic">
            <p className="text-center font-semibold">Lưu ý :</p>
            <p>
              Thời gian đổi trả: Cho phép đổi trả trong vòng 7 ngày kể từ ngày
              mua.
            </p>
            <p>
              Điều kiện đổi trả: Sản phẩm chưa qua sử dụng, còn nguyên tem, hộp,
              và hóa đơn.
            </p>
            <p>
              Chi phí đổi trả: Miễn phí đổi một lần hoặc có thể thu phí đổi trả
              tùy theo chính sách của cửa hàng.
            </p>
            <p>
              Lý do chấp nhận đổi trả: Đổi size, lỗi từ nhà sản xuất, hoặc giao
              nhầm sản phẩm.
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <button
          className="mr-5 w-[200px] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={generatePDF}
        >
          In Hóa Đơn
        </button>
        <button className="w-[200px] rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          <Link to={"/admin/banhangoff"}>Quay về bán hàng</Link>
        </button>
      </div>
    </>
  );
};
