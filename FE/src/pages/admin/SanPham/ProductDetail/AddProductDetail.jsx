import { UserOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function AddProductDetail() {
  let { id } = useParams();
  const [tenSP, SetTenSP] = useState("");
  const [listMauSac, setListMauSac] = useState([]);
  const [listDeGiay, setListDeGiay] = useState([]);
  const [listChatLieu, setListChatLieu] = useState([]);
  const [listKichThuoc, setListKichThuoc] = useState([]);
  const [listThuongHieu, setListThuongHieu] = useState([]);
  const [getIdDeGiay, setGetIdDeGiay] = useState(0);
  const [getIdThuongHieu, setGetIdThuongHieu] = useState(0);
  const [getIdChatLieu, setGetIdChatLieu] = useState(0);
  const [getIdMauSac, setGetIdMauSac] = useState([]);
  const [getIdKichThuoc, setGetIdKichThuoc] = useState([]);
  const [listSPCT, setListSPCT] = useState([]);

  // Các API URLs
  let ApiGetSPById = `http://localhost:8080/api/sanpham/${id}`;
  let ApiGetAllDeGiay = `http://localhost:8080/api/degiay/getall`;
  let ApiGetAllMauSac = `http://localhost:8080/api/mausac/getall`;
  let ApiGetAllChatLieu = `http://localhost:8080/api/chatlieu/getall`;
  let ApiGetAllKichThuoc = `http://localhost:8080/api/kichthuoc/getall`;
  let ApiGetAllThuongHieu = `http://localhost:8080/api/thuonghieu/getall`;

  // Lấy dữ liệu sản phẩm
  const layTenSP = async () => {
    const response = await axios.get(ApiGetSPById);
    SetTenSP(response.data.result.tenSanPham);
  };

  const layMauSac = async () => {
    let response = await axios.get(ApiGetAllMauSac);
    setListMauSac(response.data.result);
  };

  const layThuongHieu = async () => {
    let response = await axios.get(ApiGetAllThuongHieu);
    setListThuongHieu(response.data.result);
  };

  const layChatLieu = async () => {
    let response = await axios.get(ApiGetAllChatLieu);
    setListChatLieu(response.data.result);
  };

  const layKichThuoc = async () => {
    let response = await axios.get(ApiGetAllKichThuoc);
    setListKichThuoc(response.data.result);
  };

  const layDeGiay = async () => {
    let response = await axios.get(ApiGetAllDeGiay);
    setListDeGiay(response.data.result);
  };

  // Xử lý render danh sách sản phẩm chi tiết khi chọn kích thước và màu sắc
  useEffect(() => {
    if (getIdKichThuoc.length > 0 && getIdMauSac.length > 0) {
      const listSPCTForAdd = [];
      getIdKichThuoc.forEach((kt) => {
        getIdMauSac.forEach((ms) => {
          listSPCTForAdd.push({
            mauSac: ms.label, // Lưu tên màu
            kichThuoc: kt.label, // Lưu tên kích thước
          });
        });
      });
      setListSPCT(listSPCTForAdd);
    } else {
      setListSPCT([]);
    }
  }, [getIdKichThuoc, getIdMauSac]);

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    layTenSP();
    layChatLieu();
    layDeGiay();
    layKichThuoc();
    layMauSac();
    layThuongHieu();
  }, []);

  return (
    <>
      <div className="h-auto overflow-y-auto rounded-lg">
        <div>
          <div className="mx-auto my-2 h-[420px] w-[1000px] rounded-sm">
            <div className="mt-5 text-center">
              <span className="mt-3 font-mono text-2xl font-bold">
                Thêm sản phẩm chi tiết
              </span>
            </div>
            <div className="h-[300px] rounded-lg shadow drop-shadow-2xl">
              <div className="mx-5 mt-9">
                <div className="mt-5 grid grid-cols-2 gap-6">
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Sản Phẩm
                    </span>
                    <Input
                      className="h-[38px] w-[384px]"
                      prefix={<UserOutlined />}
                      size="large"
                      value={tenSP}
                      disabled
                    />
                  </div>
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Thương hiệu
                    </span>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn thương hiệu"
                      size="large"
                      options={listThuongHieu.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdThuongHieu(value)}
                    />
                  </div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Chất liệu
                    </span>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn chất liệu"
                      size="large"
                      options={listChatLieu.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdChatLieu(value)}
                    />
                  </div>
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Đế Giày
                    </span>
                    <Select
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn đế giày"
                      size="large"
                      options={listDeGiay.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value) => setGetIdDeGiay(value)}
                    />
                  </div>
                </div>
                <div className="mb-10 mt-10 grid grid-cols-2 gap-6">
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Kích Thước
                    </span>
                    <Select
                      mode="multiple"
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn kích thước"
                      size="large"
                      options={listKichThuoc.map((item) => ({
                        label: item.kichThuoc,
                        value: item.id,
                      }))}
                      onChange={(value, option) => setGetIdKichThuoc(option)}
                    />
                  </div>
                  <div>
                    <span className="mb-9 text-xl font-semibold text-blue-500">
                      Màu Sắc
                    </span>
                    <Select
                      mode="multiple"
                      className="h-[38px] w-[384px]"
                      placeholder="Chọn màu sắc"
                      size="large"
                      options={listMauSac.map((item) => ({
                        label: item.ten,
                        value: item.id,
                      }))}
                      onChange={(value, option) => setGetIdMauSac(option)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Render danh sách sản phẩm chi tiết dưới dạng bảng */}
        <div className="h-[500px] rounded-lg p-4">
          {listSPCT.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-400">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Kích Thước
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Màu Sắc</th>
                </tr>
              </thead>
              <tbody>
                {listSPCT.map((SPCT, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {SPCT.kichThuoc}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {SPCT.mauSac}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Bạn chưa chọn kích thước và màu sắc</p>
          )}
        </div>
      </div>
    </>
  );
}
