import { Select } from "antd";
import axios from "./../../../api/axiosConfig";
import { useEffect } from "react";
import { useState } from "react";
import DiaChiMacDinhKhachHang from "./../../admin/BanHangTaiQuay/DiaChiMacDinhKhachHang";
import ThongTinSPCT from "./../GioHang/component/ThongTinSPCT";
import LayANhTheoIDSP from "./../../admin/SanPham/Product/LayANhTheoIDSP";
import DiaCHiMacDinhKhachHang from "./../../admin/BanHangTaiQuay/DiaChiMacDinhKhachHang";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function DatHang() {
  const navigate = useNavigate();
  const [listIdGHCT, setListIdGHCT] = useState([]);
  const [email, setemail] = useState("");
  const [khachHang, setKhachHang] = useState({});
  const [idKH, setIdKH] = useState();
  const [listSP, setListSP] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [TienDuocGiam, setTienDuocGiam] = useState(0);
  const [thanhTien, setThanhTien] = useState(0);
  const [dieuKienGiam, setdieuKienGiam] = useState();

  // chon giao hang
  const [phiGiaoHang, setPhiGiaoHang] = useState(0);
  // const [giaoHang, setGiaoHang] = useState(true);
  const [ngayDuKien, setNgayDuKien] = useState(null);
  const [diaChiGiaoHang, setdiaChiGiaoHang] = useState("");
  const [listPhieuGiamGia, setListPhieuGiamGia] = useState([]);
  const [idPGGDangChon, setIdPhieuGiamGiaDangChon] = useState();
  const [phieuGiamGiaDangChon, setPhieuGiamGiaDangChon] = useState();

  const ApiLayTTGHCT = `http://localhost:8080/api/giohang/laygiohangchitiet`;
  let ApiLayPhieuGiamGia = `http://localhost:8080/api/phieugiamgia/trang-thai-true`; // Danh Sach Phiếu Giam giá
  let ApiLayThongTinPhieuGiamGiaDangChon = `http://localhost:8080/api/phieugiamgia`;
  let ApiDatHangonLine = `http://localhost:8080/api/giohang/dat-hang`;

  const LuuSPVaoList = async () => {
    const idGHCT = localStorage.getItem("sanPhamChon");
    const ids = JSON.parse(idGHCT);

    try {
      const promises = ids.map(async (id) => {
        const response = await axios.get(`${ApiLayTTGHCT}/${id}`);
        return response.data.result;
      });

      const results = await Promise.all(promises);
      setListSP(results);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const LayDanhSachPhieuGiamGia = async () => {
    try {
      const response = await axios.get(ApiLayPhieuGiamGia);
      setListPhieuGiamGia(response.data.result); // Giả sử dữ liệu trả về là mảng phiếu giảm giá
    } catch (error) {
      console.error("Error fetching discount coupons:", error);
    }
  };
  // Hàm lấy thông tin phiếu giảm giá
  const LayThongTinPhieuGiamGiaDangChon = async (idPGG) => {
    if (!idPGG) {
      setPhieuGiamGiaDangChon(null); // Reset nếu không có phiếu giảm giá được chọn
      return;
    }

    try {
      const response = await axios.get(
        `${ApiLayThongTinPhieuGiamGiaDangChon}/${idPGG}`,
      );
      setPhieuGiamGiaDangChon(response.data.result); // Giả sử dữ liệu trả về là object
      console.log("Thông tin phiếu giảm giá:", response.data.result);
      console.log("Thông tin phiếu giảm giá:", response.data.result.mucGiam);
      setdieuKienGiam(response.data.result.dieuKienGiamGia);
    } catch (error) {
      console.error("Error fetching selected discount coupon:", error);
    }
  };

  const DatHang = async (e) => {
    e.preventDefault();
    try {
      const chiTietSanPhams = listSP.map((item) => ({
        idSpct: item.idSanPhamChiTiet,
        soLuong: item.soLuong,
      }));

      await axios.post(ApiDatHangonLine, {
        chiTietSanPhams,
        idPhieuGiamGia: idPGGDangChon || null,
      });
      localStorage.removeItem("sanPhamChon");
      setTimeout(() => {
        navigate("/trangchu");
      }, 1000);
      toast.success("Đặt hàng thành công");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng");
    }
  };

  // Gọi hàm khi idPGGDangChon thay đổi
  useEffect(() => {
    LayThongTinPhieuGiamGiaDangChon(idPGGDangChon);
  }, [idPGGDangChon]);

  useEffect(() => {
    const ten = localStorage.getItem("email");
    setemail(ten);
    const ApiTimKhTheoEmail = `http://localhost:8080/client/khachhang/timtheoEmail?email=${email}`;

    async function fetchKhachHang() {
      try {
        const response = await axios.get(ApiTimKhTheoEmail);
        setKhachHang(response.data);
        setIdKH(response.data.id);
        console.log(response.data.id);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    if (email) {
      fetchKhachHang();
    }
  }, [email]);
  useEffect(() => {
    LuuSPVaoList();
    LayDanhSachPhieuGiamGia();
  }, []);

  useEffect(() => {
    const tong = listSP.reduce((acc, item) => {
      const donGia = formatCurrencyToNumber(item.donGia);
      return acc + donGia * item.soLuong;
    }, 0);

    setTongTien(tong);

    const tienGiam = tinhTienDuocGiam();
    setTienDuocGiam(tienGiam);

    const thanhTienMoi = tong + phiGiaoHang - tienGiam;
    setThanhTien(thanhTienMoi);
  }, [listSP, phiGiaoHang, phieuGiamGiaDangChon]);

  const tinhTienDuocGiam = () => {
    if (!phieuGiamGiaDangChon || !tongTien) {
      // console.log("Không có phiếu giảm giá hoặc tổng tiền là 0");
      return 0;
    }

    const { hinhThucGiam, mucGiam, dieuKienGiamGia, giamToiDa } =
      phieuGiamGiaDangChon;

    // console.log("Phiếu giảm giá đang chọn:", phieuGiamGiaDangChon);
    // console.log("Tổng tiền hiện tại:", tongTien);

    // Kiểm tra điều kiện hóa đơn tối thiểu
    const dieuKienGiamGiaValue = formatCurrencyToNumber(dieuKienGiamGia);
    if (tongTien < dieuKienGiamGiaValue) {
      console.log(
        `Không đủ điều kiện áp dụng: Tổng tiền (${tongTien}) < Điều kiện tối thiểu (${dieuKienGiamGiaValue})`,
      );
      return 0;
    }

    console.log("Đủ điều kiện áp dụng phiếu giảm giá");

    let tienGiam = 0;

    if (hinhThucGiam === "%") {
      // Nếu giảm theo %, tính toán giá trị giảm
      const mucGiamValue = formatMucGiam(mucGiam);
      tienGiam = (tongTien * mucGiamValue) / 100;
      console.log(
        `Giảm theo %: ${mucGiamValue}% của ${tongTien} = ${tienGiam}`,
      );
    } else if (hinhThucGiam === "VNĐ") {
      // Nếu giảm giá trực tiếp
      tienGiam = formatCurrencyToNumber(mucGiam);
      console.log(`Giảm trực tiếp: ${tienGiam} VNĐ`);
    }

    // Giới hạn giảm tối đa
    const giamToiDaValue = formatCurrencyToNumber(giamToiDa);
    if (tienGiam > giamToiDaValue) {
      console.log(
        `Giảm tối đa giới hạn: ${tienGiam} > ${giamToiDaValue}, áp dụng giảm tối đa`,
      );
      tienGiam = giamToiDaValue;
    }

    console.log("Tiền giảm sau khi áp dụng tối đa (nếu có):", tienGiam);

    setTienDuocGiam(tienGiam); // Cập nhật tiền được giảm
    return tienGiam;
  };

  useEffect(() => {
    const tinhThanhTien = () => {
      const thanhTienMoi = tongTien + phiGiaoHang - TienDuocGiam;
      setThanhTien(thanhTienMoi);
    };

    tinhThanhTien();
  }, [tongTien, phiGiaoHang, TienDuocGiam]);

  useEffect(() => {
    const tienDuocGiam = tinhTienDuocGiam();
    console.log("Tiền được giảm cuối cùng:", tienDuocGiam);
  }, [tongTien, phieuGiamGiaDangChon]);

  // hàm format lại định dạng khi gửi về be loai bo vnd
  const formatCurrencyToNumber = (value) => {
    return parseInt(value.replace(/[^\d]/g, ""));
  };

  //Them VND
  function formatTien(value) {
    // Loại bỏ dấu phân cách thập phân và chuyển thành số
    const parsedValue = parseFloat(value.toString().replace(",", "."));

    // Kiểm tra nếu không phải số hợp lệ
    if (isNaN(parsedValue)) {
      return "0 VNĐ"; // Giá trị mặc định nếu `value` không hợp lệ
    }

    // Định dạng số và thêm đơn vị VNĐ
    return parsedValue.toLocaleString("vi-VN") + " VNĐ";
  }

  // Hàm định dạng mức giảm và trả về số
  function formatMucGiam(mucGiam) {
    if (typeof mucGiam === "string") {
      const cleanedValue = mucGiam.replace("%", ""); // Loại bỏ ký hiệu %
      return parseFloat(cleanedValue); // Chuyển đổi sang số
    }
    return Number(mucGiam); // Đảm bảo trả về kiểu số nếu đã là number
  }

  return (
    <>
      <div className="my-5 flex">
        <div className="w-2/3">
          <div className="flex justify-center">
            <span className="text-3xl font-semibold">Đơn Hàng</span>
          </div>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Anh</th>
                  <th>San Pham</th>
                  <th>So luong</th>
                  <th>Don gia</th>
                  <th>Thanh tien</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {listSP.map((ghct, index) => (
                  <tr className="border-b-2">
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center">
                        <LayANhTheoIDSP
                          id={ghct.idSanPhamChiTiet}
                          className="h-[100px] w-[100px]"
                        />
                      </div>
                    </td>
                    <td>
                      <ThongTinSPCT id={ghct.idSanPhamChiTiet} />
                    </td>
                    <td>{ghct.soLuong}</td>
                    <td>{ghct.donGia}</td>
                    <td>
                      {formatTien(
                        formatCurrencyToNumber(ghct.donGia) * ghct.soLuong,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="ml-8 w-1/3">
          <div className="ml-1">
            <span>Chọn phiếu giảm giá và địa chỉ</span>
            <div className="my-4 flex gap-5">
              <span>Phieu giam gia</span>
              <Select
                style={{ width: 300, height: "35px" }}
                placeholder="Chọn phiếu giảm giá"
                value={idPGGDangChon || ""}
                optionLabelProp="label"
                onChange={(value) => setIdPhieuGiamGiaDangChon(value)}
              >
                <Select.Option value="" label="Không chọn phiếu">
                  <div>
                    <span>Không chọn phiếu giảm giá</span>
                  </div>
                </Select.Option>
                {listPhieuGiamGia.map((pgg) => (
                  <Select.Option
                    key={pgg.id}
                    value={pgg.id}
                    label={pgg.tenVoucher}
                    disabled={
                      tongTien < formatCurrencyToNumber(pgg.dieuKienGiamGia) ||
                      pgg.soLuong === 0
                    }
                  >
                    <div>
                      <span>Tên: {pgg.tenVoucher}</span> <br />
                      <span>
                        Mức giảm: {pgg.mucGiam} {pgg.hinhThucGiam}
                      </span>
                      <br />
                      <span>Hóa đơn tối thiểu: {pgg.dieuKienGiamGia}</span>
                      <br />
                      <span>Giảm tối đa: {pgg.giamToiDa} VNĐ</span>
                      <br />
                      <span className="text-red-600">
                        Còn: {pgg.soLuong} phiếu
                      </span>
                      <hr />
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </div>
            <br />
            {/* <DiaChiMacDinhKhachHang /> */}

            <div>
              <div className="flex gap-10">
                <span className="font-semibold">Tong tien: </span>
                <span className="ml-auto">{formatTien(tongTien)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Phi giao hang: </span>
                <span className="ml-auto">{formatTien(phiGiaoHang)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Tien duoc giam: </span>
                <span className="ml-auto"> {formatTien(TienDuocGiam)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Thanh tien: </span>
                <span className="ml-auto">{formatTien(thanhTien)}</span>
              </div>

              <div className="my-5 flex gap-10">
                <span className="font-semibold">Ngay nhan hang du kien: </span>
                <span className="ml-auto">{ngayDuKien}</span>
              </div>
            </div>
          </div>
          <div>
            <DiaCHiMacDinhKhachHang
              idKhachHang={idKH}
              giaoHang={true}
              setPhiGiaoHang={setPhiGiaoHang}
              setNgayDuKien={setNgayDuKien}
              setdiaChiGiaoHang={setdiaChiGiaoHang}
            />
          </div>
          <div className="my-8">
            <button
              onClick={DatHang}
              className="h-16 w-full rounded-lg border bg-orange-600 text-2xl font-semibold text-white transition duration-300 ease-in-out hover:bg-black"
            >
              Đặt Hàng
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" hideProgressBar />
    </>
  );
}
