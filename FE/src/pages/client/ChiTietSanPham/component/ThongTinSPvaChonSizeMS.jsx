import { Button, InputNumber } from "antd";

import axios from "./../../../../api/axiosConfig";
import { useContext, useEffect, useState } from "react";
import { Bounce, toast, ToastContainer, Zoom } from "react-toastify";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../GlobalProvider";

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

  const { reload, setReload } = useContext(ThemeContext);

  const ApiLayDanhSachSizeCuaSP = `http://localhost:8080/api/kichthuoc/kichthuoctheoidsp/${id}`;
  const ApiLayDanhMauSacCuaSP = `http://localhost:8080/api/mausac/mausactheoidsp/${id}`;
  const ApiLocLaySPCT = `http://localhost:8080/api/sanphamchitiet/loc?idSanPham=${id}`;

  const ApiLaySp = `http://localhost:8080/api/sanpham/SPClient?idSP=${id}`;

  const ApiThemSPCTVaoGioHang = `http://localhost:8080/api/giohang/themvaogiohangchitiet/${idSPCT}`;

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
      // if (data === null)

      if (Array.isArray(data) && data.length > 0) {
        setIdSPCT(data[0].id); // Lấy `id` của phần tử đầu tiên
        setDonGia(data[0].donGia);
        setChatLieu(data[0].chatLieu);

        setDeGiay(data[0].deGiay);
        setThuongHieu(data[0].thuongHieu);
        setMa(data[0].ma);
        setIdSPCTvaoLocal(data[0].id);

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

  const [error, setError] = useState(""); // Biến lưu trạng thái lỗi

  const handleChange = (value) => {
    if (value <= SoLuongTon) {
      setSoLuongMua(value); // Cập nhật số lượng mua
      setluuSLvaoLocal(value);
      setError(""); // Xóa lỗi nếu hợp lệ
    } else if (SoLuongTon !== null) {
      setError(`Số lượng mua không được vượt quá ${SoLuongTon}.`);
    }
  };

  const themSpVaoGioHang = async () => {
    if (idSPCT === null || idSPCT === undefined) {
      toast.error("Bạn chưa chọn kích thước hoặc màu hoặc số lượng", {
        autoClose: 2000,
      });
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/giohang/themvaogiohangchitiet/${idSPCT}`,
        { soLuong: soLuongMua },
      );
      toast.success("Thêm thành công");
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const [luuSLvaoLocal, setluuSLvaoLocal] = useState(1);
  const [IdSPCTvaoLocal, setIdSPCTvaoLocal] = useState(
    localStorage.getItem("idSPCt") || "",
  );

  const muaNgay = () => {
    if (idMauSac === null || idSize === null) {
      toast("Bạn chưa chọn size và màu");
      return;
    }
  };

  useEffect(() => {
    localStorage.setItem("idSPCTCHon", JSON.stringify(IdSPCTvaoLocal));
    localStorage.setItem("soLuong", JSON.stringify(luuSLvaoLocal));
  }, [IdSPCTvaoLocal, luuSLvaoLocal]);

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
        <span>Chọn kích thước:</span>
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
        <span>Chọn màu sắc:</span>
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
        <span>Nhập số lượng mua:</span>
        <br />
        <InputNumber
          min={1}
          value={soLuongMua} // Sử dụng `value` để đồng bộ với `soLuongMua`
          size="large"
          className="mx-2 w-[200px]"
          onChange={handleChange} // Giữ logic xử lý thay đổi
        />
        {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
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
                onClick={themSpVaoGioHang}
              >
                Thêm vào giỏ hàng
              </button>
              <Link
                to="/muangay"
                onClick={(e) => {
                  if (idMauSac === null || idSize === null) {
                    e.preventDefault(); // Ngăn chặn chuyển hướng nếu chưa chọn
                    toast.error(
                      "Bạn chưa chọn kích thước hoặc màu hoặc số lượng",
                      { autoClose: 2000 },
                    );
                  }
                }}
              >
                <button className="h-[50px] w-[250px] rounded bg-orange-500 px-4 py-2 text-xl text-white hover:bg-orange-600">
                  Mua ngay
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-3 gap-4">
        {/* {idSize && idMauSac ? (
          // Ma !== null ||
          // ThuongHieu !== null ||
          // ChatLieu !== null ||
          // DeGiay !== null ||
          // SoLuongTon !== null
          idSPCT ? (
            <> */}
        {Ma !== null && <div>Mã: {Ma}</div>}
        {ThuongHieu !== null && <div>Thương Hiệu: {ThuongHieu}</div>}
        {ChatLieu !== null && <div>Chất Liệu: {ChatLieu}</div>}
        {DeGiay !== null && <div>Đế Giày: {DeGiay}</div>}
        {SoLuongTon !== null && <div>Số Lượng Còn: {SoLuongTon}</div>}
        {/* </>
          ) : (
            <div className="font-bold text-red-500">Sản phẩm hết hàng</div>
          )
        ) : null} */}
      </div>

      {/* <ToastContainer
        position="top-center"
        autoClose={1000}
        transition={Zoom}
        hideProgressBar={true}
         className="custom-toast"
      /> */}
    </>
  );
}
