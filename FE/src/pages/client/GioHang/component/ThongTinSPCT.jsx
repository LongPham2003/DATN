import { useEffect, useState } from "react";
import axios from "axios";

export default function ThongTinSPCT({ id }) {
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState(null);
  const ApiSPCT = `http://localhost:8080/api/sanphamchitiet/${id}`;

  useEffect(() => {
    const fetchSanPhamChiTiet = async () => {
      try {
        const response = await axios.get(ApiSPCT);
        setSanPhamChiTiet(response.data.result); // Kiểm tra cấu trúc dữ liệu trả về
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };
    fetchSanPhamChiTiet();
  }, [ApiSPCT]);

  return (
    <>
      <div>
        <h2 className="mt-2 font-bold">
          {sanPhamChiTiet && sanPhamChiTiet.tenSanPham
            ? sanPhamChiTiet.tenSanPham
            : "loading"}
        </h2>
        <p className="mt-2">
          {sanPhamChiTiet && sanPhamChiTiet.mauSac
            ? sanPhamChiTiet.mauSac
            : "loading"}
          -[
          {sanPhamChiTiet && sanPhamChiTiet.kichThuoc
            ? sanPhamChiTiet.kichThuoc
            : "loading"}
          ]
        </p>
      </div>
    </>
  );
}
