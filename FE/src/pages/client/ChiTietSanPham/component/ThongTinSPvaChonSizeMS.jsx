import { Button, InputNumber } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ThongTinKhac from "./CacThongTinKhac";

export default function ChonSizeVSMauSac({ id }) {
  const [listSize, setListSize] = useState([]);
  const [ListMauSac, setListMauSac] = useState([]);
  const [idSize, setIdSize] = useState(null);
  const [idMauSac, setIdMauSac] = useState(null);
  const [SPCT, setSPCT] = useState();
  const [SP, setSP] = useState({});
  const [idSPCT, setIdSPCT] = useState(null);
  const [donGia, setDonGia] = useState(null);
  const [SoLuongTon, setSoLuongTon] = useState(null);
  const [Ma, setMa] = useState(null);
  const [ThuongHieu, setThuongHieu] = useState(null);
  const [DeGiay, setDeGiay] = useState(null);
  const [ChatLieu, setChatLieu] = useState(null);
  const [soLuongMua, setSoLuongMua] = useState(1);
  const [Disable, setDisable] = useState(false);

  const ApiLayDanhSachSizeCuaSP = `http://localhost:8080/api/kichthuoc/kichthuoctheoidsp/${id}`;
  const ApiLayDanhMauSacCuaSP = `http://localhost:8080/api/mausac/mausactheoidsp/${id}`;
  const ApiLocLaySPCT = `http://localhost:8080/api/sanphamchitiet/loc?idSanPham=${id}`;

  const ApiLaySp = `http://localhost:8080/api/sanpham/SPClient?idSP=${id}`;

  const LayData = async () => {
    try {
      const [size, mausac, responSPCT, respSP] = await Promise.all([
        axios.get(ApiLayDanhSachSizeCuaSP),
        axios.get(ApiLayDanhMauSacCuaSP),
        axios.get(ApiLocLaySPCT),
        axios.get(ApiLaySp),
      ]);
      setListSize(size.data.result);
      setListMauSac(mausac.data.result);
      setSPCT(responSPCT.data.result);
      setSP(respSP.data); // Cập nhật SP
      console.log(responSPCT.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const timSPCT = async () => {
    try {
      const params = {};
      if (idSize) params.idKichThuoc = idSize;
      if (idMauSac) params.idMauSac = idMauSac;

      const responSPCT = await axios.get(ApiLocLaySPCT, { params });

      const data = responSPCT.data.result;
      setSPCT(data); // Lưu toàn bộ dữ liệu SPCT
      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        setIdSPCT(data[0].id); // Lấy `id` của phần tử đầu tiên
        setDonGia(data[0].donGia);
        setChatLieu(data[0].chatLieu);
        setDeGiay(data[0].deGiay);
        setThuongHieu(data[0].thuongHieu);
        setMa(data[0].ma);

        const slt = data[0].soLuong;
        setSoLuongTon(slt);

        // Disable nút nếu không còn hàng
        setDisable(slt === 0);
      } else {
        setIdSPCT(null); // Không tìm thấy `id`
        setDonGia(null);
        setChatLieu(null);
        setDeGiay(null);
        setMa(null);
        setSoLuongTon(null);
        setThuongHieu(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function formatTien(value) {
    if (typeof value !== "number" || isNaN(value)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }
    return value.toLocaleString("vi-VN") + " VNĐ";
  }

  useEffect(() => {
    LayData();
  }, []);

  useEffect(() => {
    if (idSize !== null && idMauSac !== null) {
      timSPCT();
    }
  }, [idSize, idMauSac]);

  return (
    <>
      <span className="text-[60px] font-normal">
        {SP.tenSanPham || "Đang tải..."}
      </span>
      <div className="my-3">
        <span className="text-xl text-red-500">
          {idSize && idMauSac && donGia !== null
            ? donGia // Hiển thị `donGia` trực tiếp
            : SP.donGia !== undefined && SP.donGia !== null
              ? formatTien(SP.donGia) // Hiển thị giá mặc định từ sản phẩm
              : "Đang tải..."}
        </span>
      </div>

      <div className="my-3">
        <span>Chon kich thuoc:</span>
        <br />
        {listSize.map((sz) => (
          <Button
            key={sz.id}
            className={`mx-2 ${idSize === sz.id ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setIdSize(sz.id)}
          >
            {sz.kichThuoc}
          </Button>
        ))}
      </div>

      <div className="my-3">
        <span>Chon màu sắc:</span>
        <br />
        {ListMauSac.map((ms) => (
          <Button
            key={ms.id}
            className={`mx-2 ${idMauSac === ms.id ? "bg-yellow-500 text-white" : ""}`}
            onClick={() => setIdMauSac(ms.id)}
          >
            {ms.ten}
          </Button>
        ))}
      </div>

      <div className="my-3">
        <span>Nhap so luong mua:</span>
        <br />
        <InputNumber
          min={1}
          defaultValue={1}
          size="large"
          className="mx-2 w-[200px]"
          onChange={(value) => {
            setSoLuongMua(value);
            console.log(value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <div className="flex gap-2">
          {SoLuongTon === 0 ? (
            <span className="text-xl font-bold text-red-500">
              Sản phẩm đã hết hàng
            </span>
          ) : (
            <>
              <button
                className="h-[50px] w-[250px] rounded bg-blue-500 px-4 py-2 text-xl text-white hover:bg-blue-600"
                onClick={() => console.log("Thêm vào giỏ hàng")}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className="h-[50px] w-[250px] rounded bg-orange-500 px-4 py-2 text-xl text-white hover:bg-orange-600"
                onClick={() => console.log("Mua ngay")}
              >
                Mua ngay
              </button>
            </>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-3 gap-4">
        {Ma !== null && <div>Ma: {Ma}</div>}
        {ThuongHieu !== null && <div>Thuong hieu: {ThuongHieu}</div>}
        {ChatLieu !== null && <div>Chat lieu: {ChatLieu}</div>}
        {DeGiay !== null && <div>De giay: {DeGiay}</div>}
        {SoLuongTon !== null && <div>So luong con: {SoLuongTon}</div>}
      </div>
    </>
  );
}
