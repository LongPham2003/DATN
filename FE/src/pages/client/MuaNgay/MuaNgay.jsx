import axios from "./../../../api/axiosConfig";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DiaCHiMacDinhKhachHang from "../../admin/BanHangTaiQuay/DiaChiMacDinhKhachHang";
import { Popconfirm, Select } from "antd";
import LayAnhTheoIdSP from "../../admin/SanPham/Product/LayANhTheoIDSP";

export default function MuaNgay() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [idKH, setIdKH] = useState();
  const [IdSPCt, setIdSPCt] = useState();
  const [soLuongMua, setSoLuongMua] = useState();
  const [tenSP, setTenSp] = useState();
  const [size, setSize] = useState();
  const [mauSac, setMauSac] = useState();
  const [donGia, setDonGia] = useState();
  const [khachHang, setKhachHang] = useState({});
  const [tongTien, setTongTien] = useState(0);
  const [TienDuocGiam, setTienDuocGiam] = useState(0);
  const [thanhTien, setThanhTien] = useState(0);
  const [soLuongSanPham, setSoLuongSanPham] = useState(0);
  // chon giao hang
  const [phiGiaoHang, setPhiGiaoHang] = useState(0);
  // const [giaoHang, setGiaoHang] = useState(true);
  const [ngayDuKien, setNgayDuKien] = useState(null);
  const [diaChiGiaoHang, setdiaChiGiaoHang] = useState("");
  const [listPhieuGiamGia, setListPhieuGiamGia] = useState([]);
  const [idPGGDangChon, setIdPhieuGiamGiaDangChon] = useState();
  const [phieuGiamGiaDangChon, setPhieuGiamGiaDangChon] = useState();
  const [phuongThucThanhToan, setPhuongThucThanhToan] = useState("Tiền mặt");

  const [tenKhachHang, setTenKhachHang] = useState("");
  const [sdt, setSdt] = useState("");

  let ApiLayPhieuGiamGia = `http://localhost:8080/api/phieugiamgia/trang-thai-true`; // Danh Sach Phiếu Giam giá
  let ApiLayThongTinPhieuGiamGiaDangChon = `http://localhost:8080/api/phieugiamgia`;
  let ApiDatHangonLine = `http://localhost:8080/api/giohang/dat-hang`;
  let ApiTTSPCT = `http://localhost:8080/api/sanphamchitiet`;

  const LayDanhSachPhieuGiamGia = async () => {
    try {
      const response = await axios.get(ApiLayPhieuGiamGia);
      setListPhieuGiamGia(response.data.result); // Giả sử dữ liệu trả về là mảng phiếu giảm giá
    } catch (error) {
      console.error("Error fetching discount coupons:", error);
    }
  };

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
      // console.log("Thông tin phiếu giảm giá:", response.data.result);
      // console.log("Thông tin phiếu giảm giá:", response.data.result.mucGiam);
    } catch (error) {
      console.error("Error fetching selected discount coupon:", error);
    }
  };

  const LayThongTinSPCT = async () => {
    try {
      // Gọi API với idSPCT đã lấy
      const response = await axios.get(
        `${ApiTTSPCT}/${Number(localStorage.getItem("idSPCTCHon"))}`,
      );
      setDonGia(response.data.result.donGia);
      setMauSac(response.data.result.mauSac);
      setSize(response.data.result.kichThuoc);
      setTenSp(response.data.result.tenSanPham);
      // console.log(response.data.result.donGia);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const tinhTienDuocGiam = () => {
    if (!phieuGiamGiaDangChon || !tongTien) {
      // console.log("Không có phiếu giảm giá hoặc tổng tiền là 0");
      return 0;
    }

    const { hinhThucGiam, mucGiam, dieuKienGiamGia, giamToiDa } =
      phieuGiamGiaDangChon;

    // Kiểm tra điều kiện hóa đơn tối thiểu
    const dieuKienGiamGiaValue = formatCurrencyToNumber(dieuKienGiamGia);
    if (tongTien < dieuKienGiamGiaValue) {
      // console.log(
      //   `Không đủ điều kiện áp dụng: Tổng tiền (${tongTien}) < Điều kiện tối thiểu (${dieuKienGiamGiaValue})`,
      // );
      return 0;
    }

    // console.log("Đủ điều kiện áp dụng phiếu giảm giá");

    let tienGiam = 0;

    if (hinhThucGiam === "%") {
      // Nếu giảm theo %, tính toán giá trị giảm
      const mucGiamValue = formatMucGiam(mucGiam);
      tienGiam = (tongTien * mucGiamValue) / 100;
      // console.log(
      //   `Giảm theo %: ${mucGiamValue}% của ${tongTien} = ${tienGiam}`,
      // );
    } else if (hinhThucGiam === "VND") {
      // Nếu giảm giá trực tiếp
      tienGiam = formatCurrencyToNumber(mucGiam);
      // console.log(`Giảm trực tiếp: ${tienGiam} VNĐ`);
    }

    // Giới hạn giảm tối đa
    const giamToiDaValue = formatCurrencyToNumber(giamToiDa);
    if (tienGiam > giamToiDaValue) {
      // console.log(
      //   `Giảm tối đa giới hạn: ${tienGiam} > ${giamToiDaValue}, áp dụng giảm tối đa`,
      // );
      tienGiam = giamToiDaValue;
    }

    // console.log("Tiền giảm sau khi áp dụng tối đa (nếu có):", tienGiam);

    setTienDuocGiam(tienGiam); // Cập nhật tiền được giảm
    return tienGiam;
  };

  const chiTietSanPhams = [
    {
      idSpct: IdSPCt,
      soLuong: soLuongMua,
    },
  ];

  const DatHang = async (e) => {
    e.preventDefault();
    try {
      await axios.post(ApiDatHangonLine, {
        phuongThucThanhToan: "Tiền mặt",
        chiTietSanPhams,
        idPhieuGiamGia: idPGGDangChon || null,
        soDienThoai: sdt,
        tenKhachHang: tenKhachHang,
        phiVanChuyen: phiGiaoHang,
        diaChiChiTiet: diaChiGiaoHang,
        ngayDuKien: ngayDuKien,
        tienPhaiThanhToan: thanhTien,
      });

      setTimeout(() => {
        navigate("/trangchu");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 1000);
      toast.success("Đặt hàng thành công");
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng");
    }
  };

  useEffect(() => {
    LayThongTinPhieuGiamGiaDangChon(idPGGDangChon);
  }, [idPGGDangChon]);

  useEffect(() => {
    const ten = localStorage.getItem("email");
    setemail(ten);

    // setIdSPCt(Number(idSPCT));

    // setSoLuongMua(Number(soluong));

    const ApiTimKhTheoEmail = `http://localhost:8080/client/khachhang/timtheoEmail?email=${email}`;

    async function fetchKhachHang() {
      try {
        const response = await axios.get(ApiTimKhTheoEmail);
        setKhachHang(response.data);
        setIdKH(response.data.id);
        setTenKhachHang(response.data.hoTen);
        setSdt(response.data.sdt);
        // console.log(response.data.id);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    }

    if (email) {
      fetchKhachHang();
    }
    // Lấy giá trị từ localStorage
    const idSPCT = formatCurrencyToNumber(localStorage.getItem("idSPCTCHon"));
    const soluong = formatCurrencyToNumber(localStorage.getItem("soLuong"));

    // Cập nhật state và đồng thời sử dụng biến tạm để gọi API
    setIdSPCt(Number(idSPCT));
    setSoLuongMua(Number(soluong));
    LayDanhSachPhieuGiamGia();
    LayThongTinSPCT();
  }, [email]);

  useEffect(() => {
    setTongTien(formatCurrencyToNumber(donGia) * soLuongMua);
    const tong = formatCurrencyToNumber(donGia) * soLuongMua;
    const tienGiam = tinhTienDuocGiam();
    setTienDuocGiam(tienGiam);

    const thanhTienMoi = tong + phiGiaoHang - tienGiam;
    setThanhTien(thanhTienMoi);
  }, [phiGiaoHang, phieuGiamGiaDangChon]);

  // hàm format lại định dạng khi gửi về be loai bo vnd
  const formatCurrencyToNumber = (value) => {
    if (!value) return 0; // Trả về 0 nếu giá trị là null hoặc undefined
    return parseInt(value.replace(/[^\d]/g, "")); // Loại bỏ tất cả ký tự không phải số
  };

  // lấy số lương sản phẩm để tính ship
  useEffect(() => {
    if (chiTietSanPhams && Array.isArray(chiTietSanPhams)) {
      const total = chiTietSanPhams.reduce(
        (sum, item) => sum + (item.soLuong || 0),
        0,
      );
      setSoLuongSanPham(total);
    }
  }, [chiTietSanPhams]);

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

  // thanh toán vnpay
  const handlePaymentClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/paymentvnpay/create-payment",
        {
          params: {
            amount: thanhTien,
          },
        },
      );

      if (response.data) {
        window.location.href = response.data;
        // localStorage.setItem("check", "VNPAY");
        localStorage.setItem(
          "chiTietSanPhams",
          JSON.stringify(chiTietSanPhams),
        );
        localStorage.setItem("idPhieuGiamGia", idPGGDangChon || null);
        localStorage.setItem("soDienThoai", khachHang.sdt);
        localStorage.setItem("phiVanChuyen", phiGiaoHang);
        localStorage.setItem("diaChiChiTiet", diaChiGiaoHang);
        localStorage.setItem("ngayDuKien", ngayDuKien);
        localStorage.setItem("tienPhaiThanhToan", thanhTien);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

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
                  <th>Ảnh</th>
                  <th>Sản Phẩm</th>
                  <th>Số lựơng</th>
                  <th>Đơn giá</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td>1</td>
                  <td>
                    <div className="flex justify-center">
                      <LayAnhTheoIdSP id={IdSPCt} className="w-[130px]" />
                    </div>
                  </td>
                  <td>
                    <b> {tenSP} </b>
                    <br />
                    {mauSac} - {size}
                  </td>
                  <td>{soLuongMua}</td>
                  <td>{donGia}</td>
                  <td>
                    {formatTien(
                      formatCurrencyToNumber(donGia) *
                        Number(localStorage.getItem("soLuong")),
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="ml-8 w-1/3">
          <div className="ml-1">
            <span>Chọn phiếu giảm giá và địa chỉ</span>
            <div className="my-4 flex gap-5">
              <span>Phiếu giảm giá</span>
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
                      <span>Mức giảm: {pgg.mucGiam}</span>
                      <br />
                      <span>Hóa đơn tối thiểu: {pgg.dieuKienGiamGia}</span>
                      <br />
                      <span>Giảm tối đa: {pgg.giamToiDa} </span>
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
                <span className="font-semibold">Tổng tiền: </span>
                <span className="ml-auto">{formatTien(tongTien)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Phí giao hàng: </span>
                <span className="ml-auto">{formatTien(phiGiaoHang)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Tiền  dược giảm: </span>
                <span className="ml-auto"> {formatTien(TienDuocGiam)}</span>
              </div>
              <div className="flex gap-10">
                <span className="font-semibold">Thành tiền: </span>
                <span className="ml-auto">{formatTien(thanhTien)}</span>
              </div>

              <div className="my-5 flex gap-10">
                <span className="font-semibold">Ngày nhận hàng dự kiến: </span>
                <span className="ml-auto">{ngayDuKien}</span>
              </div>
            </div>
          </div>
          <div className="my-3">
            <span className="font-bold">Thông tin người đặt:</span>
            <div>
              <label>
                Họ Tên:
                <input
                  type="text"
                  value={tenKhachHang}
                  onChange={(e) => {
                    setTenKhachHang(e.target.value);
                    console.log(e.target.value);
                  }}
                  className="rounded border p-1"
                />
              </label>
            </div>
            <div>
              <label>
                Số điện thoại:
                <input
                  type="text"
                  value={sdt}
                  placeholder="Bạn chưa thêm số điện thoại"
                  onChange={(e) => setSdt(e.target.value)}
                  className="rounded border p-1"
                />
              </label>
            </div>
          </div>
          <div>
            <DiaCHiMacDinhKhachHang
              idKhachHang={idKH}
              giaoHang={true}
              setPhiGiaoHang={setPhiGiaoHang}
              setNgayDuKien={setNgayDuKien}
              setdiaChiGiaoHang={setdiaChiGiaoHang}
              soLuongSanPham={soLuongSanPham}
              tongTien={tongTien}
            />
          </div>
          <div>
            <p>Phương thức thanh toán:</p>
            <div className="flex gap-5">
              <input name="phuongThucThanhToan" defaultChecked type="radio" />{" "}
              Thanh toán khi nhận hàng
              <input
                onClick={() => setPhuongThucThanhToan("Chuyển khoản")}
                name="phuongThucThanhToan"
                type="radio"
              />{" "}
              Chuyển khoản
            </div>
          </div>
          {phuongThucThanhToan === "Tiền mặt" && (
            <div className="my-8">
              <Popconfirm
                title="Bạn có chắc chắn muốn đặt hàng không?"
                onConfirm={DatHang}
                okText="Có"
                cancelText="Không"
              >
                <button
                  className="h-16 w-full rounded-lg border bg-orange-600 text-2xl font-semibold text-white transition duration-300 ease-in-out hover:bg-black">
                  Đặt Hàng
                </button>
              </Popconfirm>
            </div>
          )}

          {phuongThucThanhToan === "Chuyển khoản" && (
            <div className="my-8">
              <Popconfirm
                title="Bạn có chắc chắn muốn đặt hàng không?"
                onConfirm={handlePaymentClick}
                okText="Có"
                cancelText="Không"
              >
                <button
                  className="h-16 w-full rounded-lg border bg-orange-600 text-2xl font-semibold text-white transition duration-300 ease-in-out hover:bg-black">
                  Đặt Hàng
                </button>
              </Popconfirm>
            </div>
          )}
        </div>
      </div>
      {/* <ToastContainer position="top-center" hideProgressBar /> */}
    </>
  );
}
