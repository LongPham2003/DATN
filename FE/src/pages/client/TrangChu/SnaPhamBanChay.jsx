import {
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function SnaPhamBanChay() {
  const [sanPhamBC, setSanPhamBC] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/sanpham/top3-ban-chay")
      .then(async (res) => {
        const sp = res.data.result;
        setSanPhamBC(sp);
        console.log(sanPhamBC);
      })
      .catch((error) => {
        console.error("Lỗi" + error);
      });
  }, []);

  function formatTien(value) {
    if (typeof value !== "number" || isNaN(value)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }
    return value.toLocaleString("vi-VN") + " VNĐ";
  }
  return (
    <>
      <div className="my-7 pb-[70px]">
        {" "}
        <div>
          <div className="my-5 flex">
            <div className="mx-auto">
              <p className="mt-3 text-center font-mono text-[50px] font-bold">
                Giày Bán Chạy Nhất
              </p>
              <p className="mt-3 text-center leading-8">
                Khám phá bộ sưu tập giày bán chạy nhất của cửa hàng chúng tôi
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto flex items-center justify-center gap-20">
          {sanPhamBC.map((spct, index) => (
            <Card
              key={index}
              hoverable
              className="h-[450px] w-[400px]"
              cover={
                <Link to={`/chitiet/${spct.idSP}`}>
                  <div className="transition-transform duration-300 hover:scale-110">
                    <LayANhTheoIdSPCT
                      id={spct.idSPCT}
                      className="h-[300px] w-auto justify-center object-cover"
                    />
                  </div>
                </Link>
              }
            >
              <Meta
                title={spct.tenSanPham}
                description={
                  <div className="text-red-500">{formatTien(spct.donGia)}</div>
                }
                className="text-lg"
              />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
