import {
  PlusCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TrashIcon } from "@heroicons/react/16/solid";
import { Button, Input, InputNumber, Select } from "antd";
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
  let ApiAddSPCT = `http://localhost:8080/api/sanphamchitiet/add`;
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
            mauSac: ms, // Lưu màu
            kichThuoc: kt, // Lưu kích thước
            soLuong: 1,
            donGia: 1000,
          });
        });
      });
      setListSPCT(listSPCTForAdd);
    } else {
      setListSPCT([]);
    }
  }, [getIdKichThuoc, getIdMauSac]);

  // Hàm xử lý khi thay đổi số lượng
  const handleChangeSoLuongSPCT = (index, value) => {
    let newSetListSPCT = [...listSPCT];
    newSetListSPCT[index].soLuong = value || 0; // Không cần parseInt, vì InputNumber đã trả về số
    setListSPCT(newSetListSPCT);
    console.log(value);
    console.log(newSetListSPCT);
  };

  // Hàm xử lý khi thay đổi giá bán
  const handleChangeGiaBanSPCT = (index, value) => {
    let newSetListSPCT = [...listSPCT];
    newSetListSPCT[index].donGia = value || 0; // Không cần parseInt, vì InputNumber đã trả về số
    setListSPCT(newSetListSPCT);
    console.log(value);
    console.log(newSetListSPCT);
  };

  const handleRemoveRenderSPCT = (index) => {
    let newSetListSPCT = [...listSPCT];
    newSetListSPCT.splice(index, 1);
    setListSPCT(newSetListSPCT);
  };

  //Add SPCT
  const AddSPCT = async (e) => {
    e.preventDefault();

    let request = listSPCT.map((item) => {
      const newSPCT = {
        idSanPham: id,
        idChatLieu: getIdChatLieu,
        idMauSac: item.mauSac.value,
        idKichThuoc: item.kichThuoc.value,
        idThuongHieu: getIdThuongHieu,
        idDeGiay: getIdDeGiay,
        donGia: item.donGia,
        soLuong: item.soLuong,
        trangThai: true,
      };
      return axios.post(`${ApiAddSPCT}`, newSPCT);
    });
    try {
      await Promise.all(request);
      console.log("them thanh cong:", request);
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="rounded-lg font-mono">
        <div>
          <div className="mx-auto my-2 h-[420px] w-[1000px] rounded-sm">
            <div className="mt-5 text-center">
              <span className="mt-3 text-2xl font-bold">
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
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Chất liệu
                      </span>
                    </div>
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
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Đế Giày
                      </span>
                    </div>
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
                      onChange={(value, option) => {
                        setGetIdKichThuoc(option);
                      }}
                    />
                  </div>
                  <div>
                    <div>
                      <span className="mb-9 text-xl font-semibold text-blue-500">
                        Màu Sắc
                      </span>
                    </div>
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
          <div className="max-h-[400px] overflow-y-auto">
            {listSPCT.length > 0 ? (
              <>
                <div className="mb-4 mr-10 flex justify-end gap-5">
                  <Button
                    size="large"
                    variant="solid"
                    color="primary"
                    onClick={AddSPCT}
                  >
                    <PlusCircleOutlined /> Lưu
                  </Button>
                  <Button size="large" variant="outlined" color="primary">
                    <SettingOutlined /> Sửa chung
                  </Button>
                </div>

                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="h-[60px] bg-orange-500 text-2xl text-white">
                      <th className="w-[20px] px-4 py-2">#</th>
                      <th className="w-[280px] px-4 py-2">Tên Sản Phẩm</th>
                      <th className="w-[150px] px-4 py-2">Số Lượng</th>
                      <th className="w-[150px] px-4 py-2">Giá Bán</th>
                      <th className="px-4 py-2">Hành động</th>
                      <th className="px-4 py-2">Ảnh Sản Phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSPCT.map((SPCT, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          {tenSP +
                            " " +
                            [
                              "[" +
                                " " +
                                SPCT.kichThuoc.label +
                                "-" +
                                SPCT.mauSac.label +
                                " " +
                                "]",
                            ]}
                        </td>
                        <td className="px-4 py-2">
                          <InputNumber
                            value={SPCT.soLuong}
                            className="w-[150px]"
                            onChange={(value) =>
                              handleChangeSoLuongSPCT(index, value)
                            } // Nhận trực tiếp giá trị
                          />
                        </td>
                        <td className="px-4 py-2">
                          <InputNumber
                            value={SPCT.donGia}
                            className="w-[150px]"
                            onChange={(value) =>
                              handleChangeGiaBanSPCT(index, value)
                            } // Nhận trực tiếp giá trị
                          />
                        </td>

                        <td className="px-4 py-2">
                          <TrashIcon
                            className="mx-auto w-[30px] text-red-600"
                            onClick={() => handleRemoveRenderSPCT(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="flex justify-center text-2xl font-semibold">
                <p>Bạn chưa chọn kích thước và màu sắc</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
