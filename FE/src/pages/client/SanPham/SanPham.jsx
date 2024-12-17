import { Button, Card, Radio } from "antd";
import Meta from "antd/es/card/Meta";
import axios from "./../../../api/axiosConfig";
import { useState, useEffect } from "react";
import LayANhTheoIdSPCT from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import { Link } from "react-router-dom";
import Search from "antd/es/transfer/search";
import ReactPaginate from "react-paginate";

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
  const [trangHienTai, setTrangHienTai] = useState(1);
  const [tongSoTrang, setTongSoTrang] = useState(0);
  const handlePageChange = (selectedPage) => {
    setTrangHienTai(selectedPage.selected + 1);
  };

  // API endpoints
  const API = {
    MauSac: `http://localhost:8080/api/mausac/list?pageSize=99`,
    Loai: `http://localhost:8080/api/loai/getall`,
    KichThuoc: `http://localhost:8080/api/kichthuoc/list?pageSize=99`,
    ThuongHieu: `http://localhost:8080/api/thuonghieu/getall`,
    ChatLieu: `http://localhost:8080/api/chatlieu/list?pageSize=99`,
    DeGiay: `http://localhost:8080/api/degiay/list?pageSize=99`,
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
      setListMauSac(responses[0]?.data?.result.result || []);
      setListLoai(responses[1]?.data?.result || []);
      setListKichThuoc(responses[2]?.data?.result.result || []);
      setThuongHieu(responses[3]?.data?.result || []);
      setChatLieu(responses[4]?.data?.result.result || []);
      setDeGiay(responses[5]?.data?.result.result || []);
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
      params.pageNumber = trangHienTai;
      // Log the constructed URL with parameters
      const queryString = new URLSearchParams(params).toString();
      console.log("API URL:", `${API.SanPhamBanHang}?${queryString}`);

      const response = await axios.get(API.SanPhamBanHang, {
        params,
      });
      setListSanPham(response.data.result || []);
      setTongSoTrang(response.data.totalPages);
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
    trangHienTai,
  ]);
  return (
    <>
      {" "}
      <div className="my-5">
        <div className="my-5 grid grid-cols-12 gap-4">
          {/* Filter Section */}
          <div className="col-span-3 rounded-lg p-5 shadow-md">
            <span className="mb-4 text-2xl font-semibold">Bộ Lọc</span>
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
              <Card title={title} key={title} className="mb-5">
                <div className="grid grid-cols-3 gap-2">
                  {items.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() =>
                        toggleSelection(item.id, setSelected, selected)
                      }
                      className={`m-2 w-[90px] ${selected.includes(item.id) ? "bg-black text-white" : "bg-white"} transition-all duration-300 hover:bg-yellow-400`}
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
                <Radio value="0-999999999" className="hover:bg-gray-200">
                  Tất cả
                </Radio>{" "}
                <br />
                <Radio value="0-500000" className="hover:bg-gray-200">
                  0đ - 500.000đ
                </Radio>{" "}
                <br />
                <Radio value="500001-1000000" className="hover:bg-gray-200">
                  500.000đ - 1.000.000đ
                </Radio>{" "}
                <br />
                <Radio value="1000001-1500000" className="hover:bg-gray-200">
                  1.000.000đ - 1.500.000đ
                </Radio>{" "}
                <br />
                <Radio value="1500001-9999999" className="hover:bg-gray-200">
                  Từ 1.500.000đ
                </Radio>
              </Radio.Group>
            </Card>
          </div>

          {/* Product Section */}
          <div className="col-span-9 grid h-[250px] grid-cols-3 gap-6">
            {listSanPham.length > 0 ? (
              listSanPham.map((spct, index) => (
                <Card
                  key={spct.idSP}
                  hoverable
                  style={{
                    width: "100%",
                    position: "relative",
                    height: "420px",
                  }}
                  cover={
                    <Link to={`/chitiet/${spct.idSP}`}>
                      <div className="relative">
                        <div className="transition-transform duration-300 hover:scale-105">
                          <LayANhTheoIdSPCT
                            id={spct.idSPCT}
                            className="h-[300px] w-full object-cover"
                          />
                        </div>
                      </div>
                    </Link>
                  }
                >
                  <Meta
                    title={
                      <Link to={`/chitiet/${spct.idSP}`}>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold uppercase hover:text-orange-500">
                            {spct.tenSanPham}
                          </span>
                          <span className="text-sm text-gray-600">
                            {spct.tenThuongHieu}
                          </span>
                        </div>
                      </Link>
                    }
                    description={
                      <div className="mt-2">
                        <div className="text-2xl font-semibold text-red-500">
                          {formatCurrency(spct.donGia)}
                        </div>
                      </div>
                    }
                  />
                </Card>
              ))
            ) : (
              <div className="col-span-3 mt-52 flex justify-center text-center text-3xl font-semibold">
                Không có sản phẩm nào
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto mt-[-10px] flex justify-center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={tongSoTrang}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"flex items-center gap-2"}
            previousClassName={"mx-1"}
            previousLinkClassName="px-4 py-2  hover:text-orange-500 transition duration-200"
            nextClassName={"mx-1"}
            nextLinkClassName="px-4 py-2  hover:text-orange-500 transition duration-200"
            breakClassName={"mx-1"}
            breakLinkClassName="px-4 py-2 hover:text-orange-500 transition duration-200"
            pageClassName={"mx-1"}
            pageLinkClassName="px-4 py-2 hover:text-orange-500 transition duration-200"
            activeClassName={"text-orange-500"}
            activeLinkClassName={
              "text-orange-500 font-bold text-xl border border-orange-500 rounded-full"
            }
          />
        </div>
      </div>
    </>
  );
}
