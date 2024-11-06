import html2pdf from "html2pdf.js"; // Thêm import html2pdf
import { useState } from "react";
import { useEffect } from "react";
import axios from "./../../../api/axiosConfig";

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

export const ExportPDF = ({ idHoaDon }) => {
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
      console.log("Dữ liệu sản phẩm nhận được:", sp.data.result);
      setDanhSachSP(sp.data.result);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error.message);
      if (error.response) {
        console.error("Dữ liệu lỗi:", error.response.data);
        console.error("Mã lỗi:", error.response.status);
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
      } else {
        console.error("Lỗi khác:", error.message);
      }
    }
  };

// Gọi fetchData từ một sự kiện khác, ví dụ khi một prop thay đổi
  useEffect(() => {
    if (idHoaDon) {
      fetchData(); // Gọi fetchData khi idHoaDon có giá trị
    }
  }, [idHoaDon]); // Chạy lại khi idHoaDon thay đổi
  return (
    <>
      <div
        className="p-4 font-mono"
        id="main"
        style={{ width: "620px", height: "800px" }}
      >
        <div className="text-center text-3xl font-bold uppercase">
          <span>Hóa đơn mua hàng</span>
        </div>
        <div className="my-2 text-center text-lg font-semibold">
          <p>Tòa nhà FPT Polytechnic- Phương Canh- Nam Từ Liêm- Hà Nội</p>
          <p>SDT: 0123456789</p>
        </div>
        <hr />
        <div className="my-3">
          <p>Nhân viên bán hàng:{hoadon.tenNhanVien}</p>
          <p>Mã hóa đơn : {hoadon.ma}</p>
          <p>Ngày mua hàng:{hoadon.ngayTao}</p>
          <p>Ten khach hàng:{hoadon.tenKhachHang}</p>

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
                Ten san pham
              </th>
              <th className="w-20 border-collapse border-2 border-solid border-gray-500 p-2">
                So luong
              </th>
              <th className="w-36 border-collapse border-2 border-solid border-gray-500 p-2">
                Don gia
              </th>
              <th className="w-28 border-collapse border-2 border-solid border-gray-500 p-2">
                Thanh tien
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
                <td colSpan="5" className="text-center">Không có sản phẩm nào.</td>
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
            <p>Tiền phải thanh toán: {hoadon.tienPhaiThanhToan}</p>
          </div>
          <hr />
          <div>
            <p>Thanh toán: {hoadon.phuongThucThanhToan}</p>
            <p>Giao hàng: {hoadon.phuongThucGiaoHang}</p>
            <p>Trạng thái: {hoadon.trangThai}</p>
            <p>Tiền khách đưa: {hoadon.tienKhachDua}</p>
            <p>Tiền thừa trả khách: {hoadon.tienThua}</p>
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
    </>
  );
};
