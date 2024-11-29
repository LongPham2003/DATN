import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ThongTinSPCT({ id }) {
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState(null);
  const [idSP, setIdSP] = useState(null);
  const ApiSPCT = `http://localhost:8080/api/sanphamchitiet/${id}`;

  useEffect(() => {
    const fetchSanPhamChiTiet = async () => {
      try {
        const response = await axios.get(ApiSPCT);
        setSanPhamChiTiet(response.data.result); // Kiểm tra cấu trúc dữ liệu trả về
        setIdSP(response.data.result.idSanPham);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    };
    fetchSanPhamChiTiet();
  }, [ApiSPCT]);
  // to={`/chitiet/${spct.idSP}`}
  return (
    <>
      <div>
        <Link to={`/chitiet/${idSP}`}>
          <h2 className="mt-2 font-bold text-black transition duration-500 hover:text-orange-500 hover:underline">
            {sanPhamChiTiet && sanPhamChiTiet.tenSanPham
              ? sanPhamChiTiet.tenSanPham
              : "loading"}
          </h2>
        </Link>

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
