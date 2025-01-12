import axios from "axios";
import { useEffect, useState } from "react";
import LayANhTheoIDSP from "./../../admin/SanPham/Product/LayANhTheoIDSP";
export default function SPMua({ idHD }) {
  const [listP, setListSP] = useState([]);
  let ApiDSSP = `http://localhost:8080/client/khachhang/SPCTbyidHD/${idHD}`;

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.get(ApiDSSP);
      // console.log(resp.data.result);
      setListSP(resp.data.result);
    };
    fetchData();
  }, [idHD]);
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
      {listP.map((sp, index) => (
        <div
          className="ml-10 flex max-h-[200px] gap-4 overflow-y-auto"
          key={index}
        >
          <div className="h-[100px] w-[100px]">
            <LayANhTheoIDSP id={sp.idSpct} />
          </div>
          <div className="w-[200px]">
            <b>{sp.maSPCT}</b> <br />
            <b>{sp.tenSanPham}</b> <br />
            {sp.thuongHieu} [{sp.mauSac} - {sp.kichThuoc}]
          </div>
          <div className="w-[100px]">x {sp.soLuong}</div>
          <div className="w-[100px]">{formatTien(sp.donGia)}</div>
        </div>
      ))}
    </>
  );
}
