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
import GiayMoiNhat from "./GiayMoiNhat";
import SnaPhamBanChay from "./SnaPhamBanChay";

export default function TrangChu() {
  useEffect(() => {
    localStorage.removeItem("soLuong");
    localStorage.removeItem("idSPCTCHon");
    // window.location.reload();
  }, []);

  return (
    <>
      <div className="container">
        <Carousel />
        {/* San Pham ban chay */}
        <div className="my-7">
          <SnaPhamBanChay></SnaPhamBanChay>
        </div>
        {/* {/* <div className="flex justify-center text-3xl font-bold">
            <span>------- Các Sản Phẩm khác -------</span>
          </div> */}
        {/* <div className="mb-7">
            <CacSanPham />
          </div> */}
        {/* <div className="flex justify-center text-3xl font-bold">
            <span>------- Tin tức nổi bật -------</span>
          </div>
  
          <TinTuc /> */}
        <div className="my-7">
          <GiayMoiNhat />
        </div>
      </div>
    </>
  );
}
