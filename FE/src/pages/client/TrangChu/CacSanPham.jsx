import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Checkbox, Dropdown, Menu, Select } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "./../../../api/axiosConfig";
import { useState } from "react";
import { useEffect } from "react";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import { Link } from "react-router-dom";

export default function CacSanPham() {
  const [selectedIdMauSac, setSelectedIdMauSac] = useState(null);
  const [listMauSac, setListMauSac] = useState([]);
  const [selectedIdThuongHieu, setSelectedIdThuongHieu] = useState(null);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState(null);
  const [listKichThuoc, setListKichThuoc] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);

  let ApiMauSac = `http://localhost:8080/api/mausac/getall`;
  let ApiThuongHieu = `http://localhost:8080/api/thuonghieu/getall`;
  let ApiKichThuoc = `http://localhost:8080/api/kichthuoc/getall`;

  let ApiSanPhamBanHang = `http://localhost:8080/api/sanphamchitiet/getallSPCTBH`;

  const LayThuocTinh = async () => {
    try {
      const [MauSac, ThuongHieu, KichThuoc] = await Promise.all([
        axios.get(ApiMauSac),
        axios.get(ApiThuongHieu),
        axios.get(ApiKichThuoc),
      ]);
      setListMauSac(MauSac.data.result);
      setListThuongHieu(ThuongHieu.data.result);
      setListKichThuoc(KichThuoc.data.result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const LaySanPham = async () => {
    try {
      const sanPham = await axios.get(ApiSanPhamBanHang);
      setListSanPham(sanPham.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LayThuocTinh();
    LaySanPham();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 mr-[60px] flex justify-center">
          <span className="text-3xl font-semibold">Bộ Lọc</span>
        </div>
        <div className="col-span-3 col-start-1 col-end-3 h-auto">
          <div className="my-2">
            <Card
              title="Thương Hiệu"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                {listThuongHieu.map((th) => (
                  <Button
                    className={`m-2 ${selectedIdThuongHieu === th.id ? "bg-blue-500" : ""}`}
                    onClick={() => {
                      if (selectedIdThuongHieu !== th.id) {
                        setSelectedIdThuongHieu(th.id);
                        console.log(th.id);
                      } else {
                        setSelectedIdThuongHieu(null);
                      }
                    }}
                  >
                    {th.ten}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Màu Sắc"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                {listMauSac.map((ms) => (
                  <Button
                    className={`m-2 ${selectedIdMauSac === ms.id ? "bg-blue-500" : ""}`}
                    onClick={() => {
                      if (selectedIdMauSac !== ms.id) {
                        setSelectedIdMauSac(ms.id);
                        console.log(ms.id);
                      } else {
                        setSelectedIdMauSac(null);
                      }
                    }}
                  >
                    {ms.ten}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Size"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-3">
                {listKichThuoc.map((sz) => (
                  <Button
                    className={`m-2 ${selectedIdKichThuoc === sz.id ? "bg-blue-500" : ""}`}
                    onClick={() => {
                      if (selectedIdKichThuoc !== sz.id) {
                        setSelectedIdKichThuoc(sz.id);
                        console.log(sz.id);
                      } else {
                        setSelectedIdKichThuoc(null);
                      }
                    }}
                  >
                    {sz.kichThuoc}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
          <div className="my-2">
            <Card
              title="Khoảng Giá"
              style={{
                width: 340,
              }}
              headStyle={{
                backgroundColor: "#f0f0f0",
                color: "black",
                fontSize: "20px",
              }}
            >
              <div className="grid grid-cols-1">
                <div className="mb-2 text-lg font-semibold">
                  <Checkbox
                    style={{ transform: "scale(1.3)", marginLeft: "14px" }}
                  >
                    0đ - 500.000đ
                  </Checkbox>
                </div>
                <div className="mb-2 text-lg font-semibold">
                  <Checkbox
                    style={{ transform: "scale(1.3)", marginLeft: "21px" }}
                  >
                    500.000đ - 1.000.000đ
                  </Checkbox>
                </div>
                <div className="mb-2 text-lg font-semibold">
                  <Checkbox
                    style={{ transform: "scale(1.3)", marginLeft: "22px" }}
                  >
                    1.000.000đ - 1.500.000đ
                  </Checkbox>
                </div>
                <div className="text-lg font-semibold">
                  <Checkbox
                    style={{ transform: "scale(1.3)", marginLeft: "13px" }}
                  >
                    Từ 1.500.000đ
                  </Checkbox>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="col-span-9 col-start-4 col-end-12 flex justify-between">
          <div className="grid w-full grid-cols-3 gap-8">
            {listSanPham.map((spct, index) => (
              <Card
                key={index}
                hoverable
                cover={
                  <div className="transition-transform duration-300 hover:scale-110">
                    <LayANhTheoIdSPCT
                      id={spct.id}
                      className="h-[200px] w-auto justify-center object-cover"
                    />
                  </div>
                }
                actions={[
                  <div className="flex justify-center transition duration-500 hover:scale-105">
                    <img src="./../../../../logo/add-to-cart.png" alt="" />
                  </div>,
                  <div>
                    <Link>
                      <button className="text-base">Mua ngay</button>
                    </Link>
                  </div>,
                ]}
              >
                <Meta
                  title={spct.thuongHieu + " - " + spct.tenSanPham}
                  description={spct.mauSac}
                  className="text-lg"
                />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
