import axios from "axios";
import { useEffect, useState } from "react";

export default function DC() {
  const [thanhPho, setThanhPho] = useState([]);
  const [quanHuyen, setQuanHuyen] = useState([]);
  const [phuongXa, setPhuongXa] = useState([]);


  useEffect(() => {
    axios.get("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province", {
      headers: {
        "Token": "d6e3dccb-6289-11ea-8b85-c60e4edfe802",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        setThanhPho(res.data.data);
      });
  }, []);

  return (
    <>
      <label htmlFor="province" className="mb-1 block">
        Chọn Tỉnh:
      </label>
      <select
        id="province"
        name="province"
        className="w-full rounded border p-2"
        required
      >
        <option value="">-- Chọn tỉnh --</option>
        {thanhPho.map((thanhPho, index) => (
          <option key={index} value={thanhPho.ProvinceID}>
            {thanhPho.ProvinceName}
          </option>
        ))}
      </select>
    </>
  );
}

export const getProvinces = async () => {
  const res = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`);
  return res.data;
};

export const getDistricts = async () => {
  const res = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`);
  return res.data;
};

export const getWards = async () => {
  const res = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/province`);
  return res.data;
};

