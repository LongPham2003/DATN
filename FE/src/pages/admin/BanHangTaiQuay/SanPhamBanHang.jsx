import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { Button, Input, Select } from "antd";
import ReactPaginate from "react-paginate";

export default function SanPhamBanTaiQuay() {
  const { id } = 3;

  const [SPCTBH, setSPCTBH] = useState([]);
  const [hangs, setHangs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [maSanPham, setMaSanPham] = useState();
  const [selectedIdHang, setSelectedIdHang] = useState(null);
  const [selectedIdMauSac, setSelectedIdMauSac] = useState(null);
  const [selectedIdChatLieu, setSelectedIdChatLieu] = useState(null);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState(null);
  const [selectedIdDeGiay, setSelectedIdDeGiay] = useState(null);

  let ApiLaySPCT = `http://localhost:8080/api/sanphamchitiet/getallSPCTBH`;

  const getallSPCTBH = async () => {
    const data = await axios.get(`${ApiLaySPCT}`, {
      params: {
        maSanPham: maSanPham,
        idMauSac: selectedIdMauSac,
        idkichThuoc: selectedIdKichThuoc,
        idChatLieu: selectedIdChatLieu,
        idThuongHieu: selectedIdHang,
        idDeGiay: selectedIdDeGiay,
      },
    });
    setSPCTBH(data.data.result);
  };

  useEffect(() => {
    getallSPCTBH();
    // layAnh();
  }, [
    maSanPham,
    selectedIdHang,
    selectedIdMauSac,
    selectedIdKichThuoc,
    selectedIdDeGiay,
    selectedIdChatLieu,
  ]);

  // const handlePageChange = (selectedPage) => {
  //   setTrangHienTai(selectedPage.selected + 1);
  // };

  // //lấy toàn bộ dữ liệu các thuộc tính
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/thuonghieu/getall")
      .then(async (response) => {
        setHangs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách hãng:", error);
      });

    axios
      .get("http://localhost:8080/api/mausac/getall")
      .then((response) => {
        setMauSacs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách màu sắc:", error);
      });
    axios
      .get("http://localhost:8080/api/chatlieu/getall")
      .then((response) => {
        setChatLieus(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách chất liệu:", error);
      });
    axios
      .get("http://localhost:8080/api/kichthuoc/getall")
      .then((response) => {
        setKichThuocs(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách kích thước:", error);
      });
    axios
      .get("http://localhost:8080/api/degiay/getall")
      .then((response) => {
        setDeGiays(response.data.result);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách đế giày:", error);
      });
  }, []);

  const handleResetSelectedChange = () => {
    setSelectedIdChatLieu(null);
    setSelectedIdDeGiay(null);
    setSelectedIdHang(null);
    setSelectedIdKichThuoc(null);
    setSelectedIdMauSac(null);
    setMaSanPham("");
  };

  return (
    <>
      <div className="h-[700px]">
        <div className="bg-slate-300 font-mono">
          <div className="flex justify-center gap-5">
            <div>
              <p className="font-bold">Mã sản phẩm</p>
              <Input
                className="h-[38px] w-[250px]"
                placeholder="Ma san pham ..."
                size="large"
                onChange={(e) => setMaSanPham(e.target.value)} // Gọi hàm khi có thay đổi
              />
            </div>
            <div>
              <p className="font-bold">Hãng</p>
              <Select
                className="h-[38px] w-[250px]"
                placeholder="Chọn thương hiệu ..."
                size="large"
                value={selectedIdHang} // Liên kết giá trị với state
                options={hangs.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => setSelectedIdHang(value)} // Gọi hàm khi có thay đổi
              />
            </div>
            <div>
              <p className="font-bold">Màu sắc</p>
              <Select
                className="h-[38px] w-[250px]"
                placeholder="Chọn màu sắc ..."
                size="large"
                value={selectedIdMauSac} // Liên kết giá trị với state
                options={mauSacs.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => setSelectedIdMauSac(value)}
              />
            </div>
          </div>
          <div className="flex justify-center gap-5 py-5">
            <div>
              <p className="font-bold">Chất liệu</p>
              <Select
                className="h-[38px] w-[250px]"
                placeholder="Chọn chất liệu ..."
                size="large"
                value={selectedIdChatLieu}
                options={chatLieus.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => setSelectedIdChatLieu(value)}
              />
            </div>
            <div>
              <p className="font-bold">Kích thước</p>
              <Select
                className="h-[38px] w-[250px]"
                placeholder="Chọn kích thước ..."
                size="large"
                value={selectedIdKichThuoc}
                options={kichThuocs.map((item) => ({
                  label: item.kichThuoc,
                  value: item.id,
                }))}
                onChange={(value) => setSelectedIdKichThuoc(value)}
              />
            </div>
            <div>
              <p className="font-bold">Đế giày</p>
              <Select
                className="h-[38px] w-[250px]"
                placeholder="Chọn đế giày ..."
                size="large"
                value={selectedIdDeGiay}
                options={deGiays.map((item) => ({
                  label: item.ten,
                  value: item.id,
                }))}
                onChange={(value) => setSelectedIdDeGiay(value)}
              />
            </div>
          </div>
          <div className="flex justify-center gap-8 pb-3">
            <button
              className="rounded bg-blue-500 px-2 py-1 text-white"
              onClick={handleResetSelectedChange}
            >
              Reset tất cả
            </button>
          </div>
        </div>
        <div className="mx-5 my-3 font-mono">
          <div className="my-5 flex">
            <span className="text-xl font-bold">
              Danh sách sản phẩm chi tiết của sản phẩm:
            </span>
          </div>
          <div className="flex justify-center">
            <div className="min-w-full">
              {/* Thêm max-height và overflow-y-auto để tạo thành cuộn */}
              <div className="max-h-[400px] overflow-y-auto">
                <table className="mb-[60px] min-w-full bg-white text-[20px]">
                  <thead>
                    <tr className="h-10 border-b-2 border-indigo-500 text-base">
                      <th className="w-20">Mã sản phẩm</th>
                      <th className="w-[230px]">Sản phẩm</th>
                      <th className="w-[100px] border-b">Ảnh</th>

                      <th className="w-[100px] border-b">Đơn giá</th>
                      <th className="w-[100px] border-b">Số lượng tồn</th>
                      <th className="w-[100px] border-b">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {SPCTBH.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-100">
                        <td className="border-b-[1px] border-indigo-500 px-4 py-2">
                          {index + 1}
                        </td>
                        <td className="border-b-[1px] border-indigo-500 px-4 py-2">
                          {item.tenSanPham} [ {item.kichThuoc}-{item.mauSac}]
                        </td>
                        <td className="border-b-[1px] border-indigo-500">
                          <div className="flex justify-center">
                            <LayAnhTheoIdSP
                              id={item.id}
                              className="h-[70px] w-[70px]"
                            />
                          </div>
                        </td>

                        <td className="border-b-[1px] border-indigo-500">
                          {item.donGia}
                        </td>
                        <td className="border-b-[1px] border-indigo-500">
                          {item.soLuong}
                        </td>
                        <td className="border-b-[1px] border-indigo-500">
                          <Button>Em là người được chọn</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />  */}
      </div>
    </>
  );
}
