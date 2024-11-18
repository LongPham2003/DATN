import axios from "axios";
import { useEffect, useState } from "react";

export default function DiaCHiMacDinhKhachHang({ idKhachHang }) {
  const [diaChi, setDiaChi] = useState({});
  let ApiLayDiaChi = `http://localhost:8080/diachi/diachimacdinh/${idKhachHang}`;
  useEffect(() => {
    axios
      .get(ApiLayDiaChi)
      .then((response) => {
        setDiaChi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <span>
        {diaChi.soNhaDuongThonXom} - {diaChi.xaPhuong}
      </span>
      <br />
      <span>
        {diaChi.huyenQuan} - {diaChi.tinhThanhPho}
      </span>
    </>
  );
}
