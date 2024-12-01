import {
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Carousel from "../Carousel/Carousel";
import CacSanPham from "./CacSanPham";
import TinTuc from "./TinTuc";
import { useEffect } from "react";

export default function TrangChu() {
  useEffect(() => {
    localStorage.removeItem("soLuong");
    localStorage.removeItem("idSPCTCHon");
  }, []);
  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: "2,500,000",
      image: "/images/nike-air-max.jpg",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: "3,200,000",
      image: "/images/adidas-ultraboost.jpg",
    },
    {
      id: 3,
      name: "Converse Classic",
      price: "1,500,000",
      image: "/images/converse-classic.jpg",
    },
    {
      id: 4,
      name: "Vans Old Skool",
      price: "1,800,000",
      image: "/images/vans-old-skool.jpg",
    },
  ];
  return (
    <>
      <div className="container">
        <Carousel />
        {/* San Pham ban chay */}
        {/* <SnaPhamBanChay /> */}

        <div className="flex justify-center text-3xl font-bold">
          <span>------- Các Sản Phẩm khác -------</span>
        </div>

        <div className="mb-7">
          <CacSanPham />
        </div>

        <div className="flex justify-center text-3xl font-bold">
          <span>------- Tin tức nổi bật -------</span>
        </div>

        <TinTuc />
      </div>
    </>
  );
}
