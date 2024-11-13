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
import SnaPhamBanChay from "./SnaPhamBanChay";
import TinTuc from "./TinTuc";

export default function TrangChu() {
  return (
    <>
      <div className="container">
        <Carousel />
        {/* San Pham ban chay */}
        <SnaPhamBanChay />

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