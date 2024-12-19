import { Button, Card, Radio } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "./../../../api/axiosConfig";
import { useState } from "react";
import { useEffect } from "react";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import { Link } from "react-router-dom";
import Search from "antd/es/transfer/search";

export default function CacSanPham() {
  const [listMauSac, setListMauSac] = useState([]);
  const [listKichThuoc, setListKichThuoc] = useState([]);
  const [listLoai, setListLoai] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [selectedIdMauSac, setSelectedIdMauSac] = useState(null);
  const [selectedIdLoai, setSelectedIdLoai] = useState(null);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState(null);
  const [tenSP, setTenSP] = useState(null);

  const [donGiaMin, setMinGia] = useState(null);
  const [donGiaMax, setMaxGia] = useState(null);

  let ApiMauSac = `http://localhost:8080/api/mausac/list?pageSize=99`;
  let ApiLoai = `http://localhost:8080/api/loai/list?pageSize=99`;
  let ApiKichThuoc = `http://localhost:8080/api/kichthuoc/list?pageSize=99`;

  let ApiSanPhamBanHang = `http://localhost:8080/api/sanpham/trangchu`;

  const LayThuocTinh = async () => {
    try {
      const [MauSac, Loai, KichThuoc] = await Promise.all([
        axios.get(ApiMauSac),
        axios.get(ApiLoai),
        axios.get(ApiKichThuoc),
      ]);
      setListMauSac(MauSac.data.result.result);
      setListLoai(Loai.data.result.result);
      setListKichThuoc(KichThuoc.data.result.result);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  const LaySanPham = async () => {
    try {
      const params = {};

      // Thêm các tham số vào params nếu không null
      if (selectedIdMauSac) params.idMauSac = selectedIdMauSac;
      if (selectedIdLoai) params.idLoai = selectedIdLoai;
      if (selectedIdKichThuoc) params.idKichThuoc = selectedIdKichThuoc;
      if (tenSP) params.tenSP = tenSP;
      if (donGiaMin !== null) params.donGiaMin = donGiaMin;
      if (donGiaMax !== null) params.donGiaMax = donGiaMax;

      // Tạo URL đầy đủ để log
      const queryString = new URLSearchParams(params).toString();
      const fullUrl = queryString
        ? `${ApiSanPhamBanHang}?${queryString}`
        : ApiSanPhamBanHang;

      // Log ra URL
      // console.log("Generated URL:", fullUrl);

      // Gọi API
      const sanPham = await axios.get(ApiSanPhamBanHang, { params });
      setListSanPham(sanPham.data);

      // console.log("Fetched products:", sanPham.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleRadioChange = (e) => {
    if (e.target.checked) {
      // Tách chuỗi value để lấy giá trị min và max
      const [min, max] = e.target.value.split("-").map(Number);
      setMinGia(min);
      setMaxGia(max);
      console.log(min);
      console.log(max);
    } else {
      // Reset giá trị khi bỏ chọn
      setMinGia(null);
      setMaxGia(null);
    }
  };

  function formatTien(value) {
    if (typeof value !== "number" || isNaN(value)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }
    return value.toLocaleString("vi-VN") + " VNĐ";
  }
  useEffect(() => {
    LayThuocTinh();
    LaySanPham();
  }, [
    selectedIdKichThuoc,
    selectedIdLoai,
    selectedIdMauSac,
    donGiaMin,
    donGiaMax,
    tenSP,
  ]);

  return (
    <>
      <div className="gap-4">
        {/* <div className="col-span-3 mr-[60px] flex justify-center">
          <span className="text-3xl font-semibold">Bộ Lọc</span>
        </div>
        <div className="col-span-3 col-start-1 col-end-3 h-auto">
          <div className="my-2 flex">
            <Search
              placeholder="Nhập từ khóa tìm kiếm"
              allowClear
              enterButton="Tìm kiếm"
              size="large"
              onChange={(e) => setTenSP(e.target.value)} // Cập nhật state
              style={{
                width: "50%",
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
              }}
            />
          </div>
          <div className="my-2">
            <Card
              title="Loại giày"
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
                {listLoai.map((th) => (
                  <Button
                    className={`m-2 ${selectedIdLoai === th.id ? "bg-blue-500" : ""}`}
                    key={th.id}
                    onClick={() => {
                      if (selectedIdLoai !== th.id) {
                        setSelectedIdLoai(th.id);
                        console.log(th.id);
                      } else {
                        setSelectedIdLoai(null);
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
                    key={ms.id}
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
                    key={sz.id}
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
                  <Radio.Group onChange={handleRadioChange}>
                    <div className="mb-2 text-lg font-semibold">
                      <Radio
                        style={{ transform: "scale(1.3)", marginLeft: "8px" }}
                        value="0-999999999"
                      >
                        Tất cả
                      </Radio>
                    </div>
                    <div className="mb-2 text-lg font-semibold">
                      <Radio
                        style={{ transform: "scale(1.3)", marginLeft: "14px" }}
                        value="0-5000000"
                      >
                        0đ - 500.000đ
                      </Radio>
                    </div>
                    <div className="mb-2 text-lg font-semibold">
                      <Radio
                        style={{ transform: "scale(1.3)", marginLeft: "21px" }}
                        value="500001-1000000"
                      >
                        500.000đ - 1.000.000đ
                      </Radio>
                    </div>
                    <div className="mb-2 text-lg font-semibold">
                      <Radio
                        style={{ transform: "scale(1.3)", marginLeft: "22px" }}
                        value="1000001-1500000"
                      >
                        1.000.000đ - 1.500.000đ
                      </Radio>
                    </div>
                    <div className="text-lg font-semibold">
                      <Radio
                        style={{ transform: "scale(1.3)", marginLeft: "13px" }}
                        value="1500001-9999999"
                      >
                        Từ 1.500.000đ
                      </Radio>
                    </div>
                  </Radio.Group>
                </div>
              </div>
            </Card>
          </div>
        </div> */}

        <div className="flex justify-between">
          <div className="grid w-full grid-cols-3 gap-8">
            {listSanPham.map((spct, index) => (
              <Card
                key={index}
                hoverable
                className="h-[460px]"
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
                actions={[
                  <div>
                    <Link to={`/chitiet/${spct.idSP}`}>
                      <button className="text-base">Xem chi tiet</button>
                    </Link>
                  </div>,
                ]}
              >
                <Meta
                  title={spct.tenThuongHieu + " - " + spct.tenSanPham}
                  description={
                    <div className="text-red-500">
                      {formatTien(spct.donGia)}
                    </div>
                  }
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
