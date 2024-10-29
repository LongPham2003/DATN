import axios from "../../../api/axiosConfig.js";
import { useEffect, useState } from "react";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { Button, Input, InputNumber, Modal, Select } from "antd";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function SanPhamBanTaiQuay({ id,onProductAdded  }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [SPCTBH, setSPCTBH] = useState([]);
  const [hangs, setHangs] = useState([]);
  const [mauSacs, setMauSacs] = useState([]);
  const [chatLieus, setChatLieus] = useState([]);
  const [kichThuocs, setKichThuocs] = useState([]);
  const [deGiays, setDeGiays] = useState([]);
  const [maSanPham, setMaSanPham] = useState();
  const [soLuongTon, setSoLuongTon] = useState(0);
  const [selectedIdHang, setSelectedIdHang] = useState(null);
  const [selectedIdMauSac, setSelectedIdMauSac] = useState(null);
  const [selectedIdChatLieu, setSelectedIdChatLieu] = useState(null);
  const [selectedIdKichThuoc, setSelectedIdKichThuoc] = useState(null);
  const [selectedIdDeGiay, setSelectedIdDeGiay] = useState(null);
  const [idSPCT, setIdSPCT] = useState();
  const [soLuongMua, setSoLuongMua] = useState(1);
  const [error, setError] = useState('');

  let ApiLaySPCT = `http://localhost:8080/api/sanphamchitiet/getallSPCTBH`;
  let ApiThemSPvaoHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/addspct/${id}`;

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

  const ThemSP = async () => {
    try {
      const newSPCT = {
        idSpct: idSPCT,
        soLuong: soLuongMua
      }

      await  axios.post(ApiThemSPvaoHoaDon, newSPCT);
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "light",
        transition: Bounce,
      });

      // Gọi hàm onProductAdded để báo cho component cha biết và cập nhật giỏ hàng
      if (onProductAdded) {
        onProductAdded();
      }

      setModalVisible(false);
    }catch (error) {
      console.log(error);
      toast.error(error.message || "Thêm mới thất bại", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleButtonClick = (id) => {
    // Tìm sản phẩm với ID đã chọn trong danh sách SPCTBH
    const selectedProduct = SPCTBH.find((item) => item.id === id);

    // Nếu tìm thấy sản phẩm, cập nhật số lượng tồn vào state soLuongTon
    if (selectedProduct) {
      setSoLuongTon(selectedProduct.soLuong);
    }

    // Lưu ID sản phẩm chi tiết và mở Modal
    setIdSPCT(id);
    setModalVisible(true);
  };

  const handleQuantityChange = (value) => {
    if (value === null || value === undefined) return;
    if (value > soLuongTon) {
      setError(`Số lượng mua không thể lớn hơn ${soLuongTon}`);
    } else {
      setError('');
      setSoLuongMua(value);
    }
  };

  useEffect(() => {
    if (!modalVisible) {
      setSoLuongMua(1); // Reset về giá trị mặc định (ví dụ: 1)
      setError('');     // Reset lại lỗi nếu có
    }
  }, [modalVisible]);
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

  useEffect(() => {
    getallSPCTBH();

  }, [
    maSanPham,
    selectedIdHang,
    selectedIdMauSac,
    selectedIdKichThuoc,
    selectedIdDeGiay,
    selectedIdChatLieu,
  ]);

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
                  <thead className="sticky top-0 bg-white z-10">
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
                          {item.maSPCT}
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
                          <Button
                            onClick={() => {
                              handleButtonClick(item.id);
                              openModal();
                            }}
                            disabled={item.soLuong === 0}
                          >
                            Em là người được chọn
                          </Button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Nhập số lượng"
        open={modalVisible}
        onCancel={closeModal}
        onOk={ThemSP}
        cancelText="Hủy" // Replace with your desired text
        okText="Xác nhận" // Replace with your desired text
      >
        <label>Số Lượng tồn :{soLuongTon} </label>

          <div>
            <InputNumber
              min={1}
              max={soLuongTon}
              value={soLuongMua}
              className="min-w-full"
              onChange={handleQuantityChange}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>

      </Modal>
      <ToastContainer/>
    </>
  );
}
