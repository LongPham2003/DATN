import axios from "../../../api/axiosConfig.js";
import { useEffect, useState } from "react";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { Button, Input, Modal, Select } from "antd";
import { Bounce, toast, ToastContainer } from "react-toastify";
// import { getAllSPCTBH } from "./SanPhamService.js";

export const getAllSPBH = async (params = {}) => {
  const ApiLaySPCT = `http://localhost:8080/api/sanphamchitiet/getallSPCTBH`;
  const data = await axios.get(ApiLaySPCT, { params });
  return data.data.result;
};

export default function SanPhamHoaDon({ id, fillHoaDon, fillHoaDonChiTiet }) {
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
  const [soLuongMua, setSoLuongMua] = useState(0);
  const [error, setError] = useState("");

  let ApiThemSPvaoHoaDon = `http://localhost:8080/api/giohang/addspct/${id}`;
  const getallSPCTBH = async () => {
    const params = {};

    if (maSanPham) params.maSanPham = maSanPham;
    if (selectedIdMauSac) params.idMauSac = selectedIdMauSac;
    if (selectedIdKichThuoc) params.idkichThuoc = selectedIdKichThuoc;
    if (selectedIdChatLieu) params.idChatLieu = selectedIdChatLieu;
    if (selectedIdHang) params.idThuongHieu = selectedIdHang;
    if (selectedIdDeGiay) params.idDeGiay = selectedIdDeGiay;

    const data = await getAllSPBH(params);
    setSPCTBH(data);
  };

  const ThemSP = async () => {
    try {
      const newSPCT = {
        idSpct: idSPCT,
        soLuong: soLuongMua,
      };

      await axios.post(ApiThemSPvaoHoaDon, newSPCT);
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 600,
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
      if (fillHoaDon) {
        fillHoaDon();
        fillHoaDonChiTiet();
      }

      getallSPCTBH();
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Thêm mới thất bại", {
        position: "top-right",
        autoClose: 600,
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
  const handleQuantityChange = (event) => {
    const value = event.target.value; // Lấy giá trị từ event

    // Nếu input là rỗng, xóa thông báo lỗi và đặt giá trị mặc định
    if (value === "") {
      setError(""); // Xóa thông báo lỗi
      setSoLuongMua(1); // Đặt giá trị mặc định
      return;
    }

    const regex = /^[0-9]*$/; // Biểu thức chính quy cho phép số nguyên dương (bao gồm cả chuỗi rỗng)
    if (!regex.test(value)) {
      setError("Vui lòng nhập một số hợp lệ."); // Hiển thị thông báo lỗi nếu không phải số
      return;
    }

    const numericValue = Number(value); // Chuyển đổi giá trị nhập vào thành số
    if (numericValue > soLuongTon) {
      setError(`Số lượng mua không thể lớn hơn ${soLuongTon}`); // Hiển thị thông báo lỗi
    } else {
      setError(""); // Xóa thông báo lỗi nếu số lượng hợp lệ
      setSoLuongMua(numericValue); // Cập nhật số lượng mua
    }
  };

  useEffect(() => {
    if (!modalVisible) {
      setSoLuongMua(1); // Reset về giá trị mặc định (ví dụ: 1)
      setError(""); // Reset lại lỗi nếu có
    }
  }, [modalVisible]);
  //lấy toàn bộ dữ liệu các thuộc tính
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
      <div className="h-[700px] bg-orange-500">
        <div className="font-mono">
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
              onClick={() => {
                handleResetSelectedChange();
                getallSPCTBH();
              }}
            >
              Reset bộ lọc & làm mới danh sách
            </button>
          </div>
        </div>
        <div className="mx-5 my-3 font-mono">
          <div className="my-5 flex">
            <span className="bg- text-xl font-bold">
              Danh sách sản phẩm chi tiết của sản phẩm:
            </span>
          </div>
          <div className="flex justify-center">
            <div className="min-w-full">
              {/* Thêm max-height và overflow-y-auto để tạo thành cuộn */}
              <div className="max-h-[400px] overflow-y-auto">
                <table className="mb-[60px] min-w-full bg-white text-[20px]">
                  <thead className="sticky top-0 z-10 bg-white">
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
                      <tr key={index} className="hover:bg-gray-100">
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
                            Thêm sản phẩm
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
        cancelText="Hủy"
        okText="Xác nhận"
      >
        <label>Số Lượng tồn: {soLuongTon}</label>
        <div>
          <Input
            min={1}
            max={soLuongTon}
            value={soLuongMua}
            className="min-w-full"
            onChange={handleQuantityChange} // Gọi hàm với event
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
