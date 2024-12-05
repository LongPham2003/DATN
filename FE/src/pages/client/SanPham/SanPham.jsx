import { Button, Card, Radio } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "./../../../api/axiosConfig";
import { useState, useEffect } from "react";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import { Link } from "react-router-dom";
import Search from "antd/es/transfer/search";

export default function SanPham() {
  // State definitions
  const [listMauSac, setListMauSac] = useState([]);
  const [listKichThuoc, setListKichThuoc] = useState([]);
  const [listLoai, setListLoai] = useState([]);
  const [listSanPham, setListSanPham] = useState([]);
  const [tenSP, setTenSP] = useState(null);
  const [chatLieu, setChatLieu] = useState([]);
  const [thuongHieu, setThuongHieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);
  const [selectedIdChatLieu, setSelectedIdChatLieu] = useState([]);
  const [selectedIdThuongHieu, setSelectedIdThuongHieu] = useState([]);
  const [selectedIdDeGiay, setSelectedIdDeGiay] = useState([]);
  const [selectedIdMauSac, setSelectedIdMauSac] = useState([]);
  const [selectedIdLoai, setSelectedIdLoai] = useState([]);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState([]);
  const [donGiaMin, setMinGia] = useState(null);
  const [donGiaMax, setMaxGia] = useState(null);

  // API endpoints
  const API = {
    MauSac: `http://localhost:8080/api/mausac/getall`,
    Loai: `http://localhost:8080/api/loai/getall`,
    KichThuoc: `http://localhost:8080/api/kichthuoc/getall`,
    ThuongHieu: `http://localhost:8080/api/thuonghieu/getall`,
    ChatLieu: `http://localhost:8080/api/chatlieu/getall`,
    DeGiay: `http://localhost:8080/api/degiay/getall`,
    SanPhamBanHang: `http://localhost:8080/api/sanpham/trangchu`,
  };

  // Fetching product attributes
  const fetchAttributes = async () => {
    try {
      const responses = await Promise.all([
        axios.get(API.MauSac),
        axios.get(API.Loai),
        axios.get(API.KichThuoc),
        axios.get(API.ThuongHieu),
        axios.get(API.ChatLieu),
        axios.get(API.DeGiay),
      ]);

      // Update state based on API response
      setListMauSac(responses[0]?.data?.result || []);
      setListLoai(responses[1]?.data?.result || []);
      setListKichThuoc(responses[2]?.data?.result || []);
      setThuongHieu(responses[3]?.data?.result || []);
      setChatLieu(responses[4]?.data?.result || []);
      setDeGiay(responses[5]?.data?.result || []);
    } catch (error) {
      console.error("Error fetching attributes:", error);
    }
  };

  // Fetching products based on filters
  const fetchProducts = async () => {
    try {
      const params = {};

      if (selectedIdMauSac.length > 0)
        params.idMauSac = selectedIdMauSac.join(",");
      if (selectedIdLoai.length > 0) params.idLoai = selectedIdLoai.join(",");
      if (selectedIdKichThuoc.length > 0)
        params.idKichThuoc = selectedIdKichThuoc.join(",");
      if (selectedIdThuongHieu.length > 0)
        params.idThuongHieu = selectedIdThuongHieu.join(",");
      if (selectedIdChatLieu.length > 0)
        params.idChatLieu = selectedIdChatLieu.join(",");
      if (selectedIdDeGiay.length > 0)
        params.idDeGiay = selectedIdDeGiay.join(",");
      if (tenSP) params.tenSP = tenSP;
      if (donGiaMin !== null) params.donGiaMin = donGiaMin;
      if (donGiaMax !== null) params.donGiaMax = donGiaMax;

      // Log the constructed URL with parameters
      const queryString = new URLSearchParams(params).toString();
      console.log("API URL:", `${API.SanPhamBanHang}?${queryString}`);

      const response = await axios.get(API.SanPhamBanHang, { params });
      setListSanPham(response.data.result || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return typeof value === "number"
      ? `${value.toLocaleString("vi-VN")} VNĐ`
      : "0 VNĐ";
  };

  // Handle range selection
  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split("-").map(Number);
    setMinGia(min || 0);
    setMaxGia(max || 99999999999);
  };

  // Toggle selection helper
  const toggleSelection = (id, setSelected, selected) => {
    setSelected(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id],
    );
  };

  // Fetch data on component load and filter updates
  useEffect(() => {
    fetchAttributes();
    fetchProducts();
  }, [
    selectedIdMauSac,
    selectedIdLoai,
    selectedIdKichThuoc,
    selectedIdThuongHieu,
    selectedIdChatLieu,
    selectedIdDeGiay,
    donGiaMin,
    donGiaMax,
    tenSP,
  ]);
  console.log(listSanPham);
  return (
    <div className="my-5 grid grid-cols-12 gap-4">
      {/* Filter Section */}
      <div className="col-span-3">
        <span className="mb-4 block text-2xl font-semibold">Bộ Lọc</span>
        <Search
          placeholder="Nhập từ khóa tìm kiếm"
          allowClear
          enterButton="Tìm kiếm"
          size="large"
          onChange={(e) => setTenSP(e.target.value)}
        />
        {/* Filters */}
        {[
          {
            title: "Loại giày",
            items: listLoai,
            selected: selectedIdLoai,
            setSelected: setSelectedIdLoai,
          },
          {
            title: "Thương Hiệu",
            items: thuongHieu,
            selected: selectedIdThuongHieu,
            setSelected: setSelectedIdThuongHieu,
          },
          {
            title: "Đế giày",
            items: deGiay,
            selected: selectedIdDeGiay,
            setSelected: setSelectedIdDeGiay,
          },
          {
            title: "Chất Liệu",
            items: chatLieu,
            selected: selectedIdChatLieu,
            setSelected: setSelectedIdChatLieu,
          },
          {
            title: "Màu Sắc",
            items: listMauSac,
            selected: selectedIdMauSac,
            setSelected: setSelectedIdMauSac,
          },
          {
            title: "Size",
            items: listKichThuoc,
            selected: selectedIdKichThuoc,
            setSelected: setSelectedIdKichThuoc,
          },
        ].map(({ title, items, selected, setSelected }) => (
          <Card title={title} key={title} style={{ marginBottom: "20px" }}>
            <div className="grid grid-cols-3 gap-2">
              {items.map((item) => (
                <Button
                  key={item.id}
                  onClick={() =>
                    toggleSelection(item.id, setSelected, selected)
                  }
                  className={`m-2 ${selected.includes(item.id) ? "bg-blue-500" : ""}`}
                >
                  {item.ten || item.kichThuoc}
                </Button>
              ))}
            </div>
          </Card>
        ))}
        {/* Price Range */}
        <Card title="Khoảng Giá">
          <Radio.Group onChange={handlePriceChange}>
            <Radio value="0-999999999">Tất cả</Radio>
            <Radio value="0-500000">0đ - 500.000đ</Radio>
            <Radio value="500001-1000000">500.000đ - 1.000.000đ</Radio>
            <Radio value="1000001-1500000">1.000.000đ - 1.500.000đ</Radio>
            <Radio value="1500001-9999999">Từ 1.500.000đ</Radio>
          </Radio.Group>
        </Card>
      </div>
      {/* Product Section */}
      <div className="col-span-9 grid grid-cols-3 gap-6">
        {listSanPham.map((spct) => (
          <Card
            key={spct.idSpct}
            hoverable
            style={{ height: "400px" }}
            cover={
              <Link to={`/chitiet/${spct.id}`}>
                <div className="transition-transform duration-300 hover:scale-110">
                  <LayANhTheoIdSPCT
                    id={spct.idSpct}
                    className="h-[200px] w-auto justify-center object-cover"
                  />
                </div>
              </Link>
            }
          >
            <Meta
              title={spct.tenSanPham}
              description={
                <div className="flex flex-col gap-2">
                  <div className="text-red-500">
                    {formatCurrency(spct.donGia)}
                  </div>
                  <Link to={`/chitiet/${spct.id}`}>
                    <p className="mt-10 w-full text-center text-xl">
                      Xem chi tiết
                    </p>
                  </Link>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
