import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Switch,
  Tabs,
  Modal,
  Popconfirm,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import SanPhamBanTaiQuay from "./SanPhamBanHang";
import axios from "../../../api/axiosConfig";
import { Bounce, toast, ToastContainer } from "react-toastify";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { XMarkIcon } from "@heroicons/react/16/solid/index.js";
import { TrashIcon } from "@heroicons/react/16/solid";
import DiaCHiMacDinhKhachHang from "./DiaChiMacDinhKhachHang";
import { tabPanel } from "@material-tailwind/react";
import { values } from "lodash";

export default function BanHangTaiQuay() {
  const [hoaDonFalse, setHoaDonFalse] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openThanhToan, setOpenThanhToan] = useState(false);
  const [SPCTChuaThanhToan, setSPCTChuaThanhToan] = useState([]);
  const [selectedHoaDonId, setSelectedHoaDonId] = useState(null); // State lưu trữ id hóa đơn được chọn

  const [danhSachPhieuGiamGia, setDanhSachPhieuGiamGia] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [tienPhaiThanhToan, setTienPhaiThanhToan] = useState(0);
  const [tienDuocGiam, setTienDuocGiam] = useState(0);
  const [tenKhachHang, setTenKhachHang] = useState("Khách lẻ");
  const [soDienThoai, setsoDienThoai] = useState("");
  const [diaChiGiaoHang, setdiaChiGiaoHang] = useState("");
  const [thaydoiSoLuongMua, setThayDoiSoLuongMua] = useState(0);
  const [idSPCTDangChon, setIdSPCTDangChon] = useState();
  const [soLuongTonCuaSPCT, setSoLuongTonCuaSPCT] = useState(0);
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [idPhieuGiamGiaDangChon, setIdPhieuGiamGiaDangChon] = useState();
  const [tienKhachDua, setTienKhachDua] = useState();
  const [tienThuaTraKhach, setTienThuaTraKhach] = useState();

  let ApiTaoHoaDon = `http://localhost:8080/banhangtaiquay/taodon`;
  let ApiLayHoaDonChuaThanhToan = `http://localhost:8080/api/hoadon/getall-chuathanhtoan`;
  let ApiLaySanPhamOHoaDon = `http://localhost:8080/api/hoadonchitiet/SPCTbyidHD`;
  let ApiUpdateSoLuongSPTrongHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/update`;
  let ApiLaySoLuongTonCuaSPCT = `http://localhost:8080/api/sanphamchitiet/${idSPCTDangChon}`;
  let ApiLayThongTinThanhToanTheoIdHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/gettheoid`;
  let ApiLayPhieuGiamGia = `http://localhost:8080/api/phieugiamgia/trang-thai-true`;
  let ApiHuyHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/delete/${selectedHoaDonId}`;
  let ApiLayTatCaKhachHang = `http://localhost:8080/api/khachhang/getall`;
  let ApiAddPhieuGiamGiaKhoiHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/${selectedHoaDonId}/voucher`;
  let ApiXoaPhieuGiamGiaKhoiHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/delete/${selectedHoaDonId}/voucher/${idPhieuGiamGiaDangChon}`;
  let ApiThanhToanHoaDon = `http://localhost:8080/banhangtaiquay/thanhtoan/${selectedHoaDonId}`;

  //Lấy danh sách hóa đơn
  const LayDanhSachHoaDonChuaThanhToan = async () => {
    try {
      const response = await axios.get(ApiLayHoaDonChuaThanhToan);
      const hoaDonList = response.data.result;
      setHoaDonFalse(hoaDonList);
      if (hoaDonList.length > 0) {
        setSelectedHoaDonId(hoaDonList[0].id); // Chọn id hóa đơn đầu tiên khi tải dữ liệu lần đầu
      }
    } catch (error) {
      console.log("Lấy hóa đơn lỗi:", error);
    }
  };

  //Lấy danh sách sản phẩm trong giỏ hàng
  const LayChiTietSanPham = async () => {
    try {
      const response = await axios.get(
        `${ApiLaySanPhamOHoaDon}/${selectedHoaDonId}`,
      );
      const danhSachSanPhamChiTiet = response.data.result;
      setSPCTChuaThanhToan(danhSachSanPhamChiTiet); // Cập nhật state với sản phẩm chi tiết của hóa đơn được chọn
    } catch (error) {
      console.log("Lấy chi tiết sản phẩm lỗi:", error);
    }
  };
  // Lấy số lượng tồn của sản phẩm
  const LaySoLuongTonCuaSPCT = async () => {
    const responseSoLuongTon = await axios.get(ApiLaySoLuongTonCuaSPCT);
    setSoLuongTonCuaSPCT(responseSoLuongTon.data.result.soLuong);
    console.log("soLuongTonCuaSPCT", responseSoLuongTon.data.result.soLuong);
  };

  //Lấy các kiểu tiền của hóa đơn
  const LayThongTinThanhToanCuaHoaDon = async () => {
    const ttThanhToan = await axios.get(
      `${ApiLayThongTinThanhToanTheoIdHoaDon}/${selectedHoaDonId}`,
    );
    setTongTien(ttThanhToan.data.result.tongTien);
    setTienPhaiThanhToan(ttThanhToan.data.result.tienPhaiThanhToan);
    setTienDuocGiam(ttThanhToan.data.result.tienDuocGiam);
    // console.log(ttThanhToan.data.result.tongTien);
  };

  const LayDanhSachPhieuGiamGia = async () => {
    const pgg = await axios.get(ApiLayPhieuGiamGia);
    setDanhSachPhieuGiamGia(pgg.data.result);
  };

  //Lay Danh Sach Khach Hang
  const LayDanhSachKhacHang = async () => {
    try {
      const khachHang = await axios.get(ApiLayTatCaKhachHang);
      setDanhSachKhachHang(khachHang.data.result);
      // console.log(khachHang.data.result.diaChi[0].diaChiChiTiet);
    } catch (error) {}
  };

  const XoaSPKhoiGioHang = async (idSPCT) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/hoadonchitiet/hoadon/${selectedHoaDonId}/spct/${idSPCT}`,
      );
      toast.success("Xóa thành công");
      await LayChiTietSanPham(); // Cập nhật giỏ hàng sau khi thêm sản phẩm
      await LayThongTinThanhToanCuaHoaDon(); // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền
    } catch (error) {
      toast.error("Có lỗi xẩy ra");
    }
  };

  const taoHoaDon = async () => {
    try {
      await axios.post(ApiTaoHoaDon);
      toast.success("Đã tạo hóa đơn mới");
      LayDanhSachHoaDonChuaThanhToan();
    } catch (error) {
      console.log("Có lỗi xảy ra:", error);
      toast.error("Tạo hóa đơn mới thất bại");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openthanhToan = () => {
    setOpenThanhToan(true);
  };

  const closethanhToan = () => {
    setOpenThanhToan(false);
  };

  // Hàm đóng modal và cập nhật giỏ hàng
  const closeModalAndReloadCart = async () => {
    await LayChiTietSanPham(); // Cập nhật giỏ hàng sau khi thêm sản phẩm
    await LayThongTinThanhToanCuaHoaDon(); // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền

    setTimeout(() => {
      closeModal(); // Đóng modal
    }, 1000);
  };

  const upDateSoLuongMua = async () => {
    try {
      await axios.put(`${ApiUpdateSoLuongSPTrongHoaDon}/${selectedHoaDonId}`, {
        idSpct: idSPCTDangChon,
        soLuong: thaydoiSoLuongMua,
      });

      await Promise.all([
        LayChiTietSanPham(), // Cập nhật giỏ hàng sau khi thêm sản phẩm
        LayThongTinThanhToanCuaHoaDon(), // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền
        LaySoLuongTonCuaSPCT(),
      ]);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  // Tăng số lượng mua lên 1
  const increment = async (idSpct, newQuantity) => {
    setIdSPCTDangChon(idSpct); // Cập nhật id của sản phẩm đang chọn
    await LaySoLuongTonCuaSPCT(); // Lấy số lượng tồn của sản phẩm đang chọn

    if (soLuongTonCuaSPCT > 0) {
      setThayDoiSoLuongMua(newQuantity); // Cập nhật ngay lập tức trên giao diện
      try {
        await axios.put(
          `${ApiUpdateSoLuongSPTrongHoaDon}/${selectedHoaDonId}`,
          {
            idSpct: idSpct,
            soLuong: newQuantity,
          },
        );

        await Promise.all([
          LayChiTietSanPham(), // Cập nhật giỏ hàng sau khi thêm sản phẩm
          LayThongTinThanhToanCuaHoaDon(), // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền
          LaySoLuongTonCuaSPCT(),
        ]);
        toast.success("Cập nhật thành công");
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thất bại");
      }
    } else {
      toast.warning("Sản phẩm đã hết hàng, không thể tăng số lượng");
    }
  };
  //Giam so luong mua di 1
  const decrement = async (idSpct, newQuantity) => {
    if (newQuantity > 0) {
      // Đảm bảo số lượng không âm
      setThayDoiSoLuongMua(newQuantity);
      setIdSPCTDangChon(idSpct); // Cập nhật id của sản phẩm đang chọn
      await LaySoLuongTonCuaSPCT(); // Gọi hàm lấy số lượng tồn của sản phẩm sau khi cập nhật id

      try {
        await axios.put(
          `${ApiUpdateSoLuongSPTrongHoaDon}/${selectedHoaDonId}`,
          {
            idSpct: idSpct,
            soLuong: newQuantity,
          },
        );
        toast.success("Cập nhật thành công");
        await Promise.all([
          LayChiTietSanPham(), // Cập nhật giỏ hàng sau khi thêm sản phẩm
          LayThongTinThanhToanCuaHoaDon(), // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền
          LaySoLuongTonCuaSPCT(),
        ]);
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thất bại");
      }
    }
  };

  //Huy Hoa Don
  const huyHoaDon = async () => {
    try {
      await axios.delete(ApiHuyHoaDon);
      toast.success("Hủy hóa đơn thành công");
      LayDanhSachHoaDonChuaThanhToan();
    } catch (error) {
      console.log(error);
      toast.error("Không thành công, có lỗi xảy ra");
    }
  };

  // add Phieu Giam Gia

  //Thanh toan
  const thanhToanTienMat = async () => {
    try {
      await axios.post(ApiThanhToanHoaDon, {
        tenPhuongThuc: "Tiền mặt",
      });
      toast.success("Thanh toán thành công");
      LayDanhSachHoaDonChuaThanhToan();
      closethanhToan();
    } catch (error) {
      toast.error("Thanh toán thất bại, có lỗi xảy ra!");
      console.log(error);
    }
  };

  useEffect(() => {
    LayDanhSachHoaDonChuaThanhToan();
    LayDanhSachPhieuGiamGia();
    LayDanhSachKhacHang();
  }, []);

  useEffect(() => {
    if (selectedHoaDonId) {
      LayChiTietSanPham(selectedHoaDonId); // Gọi hàm lấy chi tiết sản phẩm khi id của hóa đơn được chọn thay đổi
    }
  }, [selectedHoaDonId]);

  // useEffect sẽ chạy khi `selectedHoaDonId` hoặc `hoaDonFalse` thay đổi
  useEffect(() => {
    // Kiểm tra xem `selectedHoaDonId` đã được đặt và `hoaDonFalse` không rỗng
    if (selectedHoaDonId && hoaDonFalse.length > 0) {
      // Tìm hóa đơn trong `hoaDonFalse` có `id` khớp với `selectedHoaDonId`
      const selectedHoaDon = hoaDonFalse.find(
        (hoaDon) => hoaDon.id === Number(selectedHoaDonId), // Ép kiểu `selectedHoaDonId` thành số để so sánh
      );

      // Nếu tìm thấy `selectedHoaDon`, cập nhật `tongTien` và `tienPhaiThanhToan`
      if (selectedHoaDon) {
        setTongTien(selectedHoaDon.tongTien);
        setTienPhaiThanhToan(selectedHoaDon.tienPhaiThanhToan);
        setTienDuocGiam(selectedHoaDon.tienDuocGiam);
      } else {
        // Nếu không tìm thấy, đặt `tongTien` và `tienPhaiThanhToan` về 0
        setTongTien(0);
        setTienPhaiThanhToan(0);
        setTienDuocGiam(0);
      }
    }

    // Mảng phụ thuộc bao gồm `selectedHoaDonId` và `hoaDonFalse`
    // useEffect sẽ chạy lại mỗi khi một trong hai giá trị này thay đổi
  }, [selectedHoaDonId, hoaDonFalse]);

  return (
    <>
      <div className="mx-2 flex max-h-screen overflow-y-hidden font-mono">
        <div className="w-8/12">
          <span className="text-2xl">Bán hàng tại quầy</span>
          <div className="h-auto bg-slate-50">
            <div className="flex h-[94px] w-full items-center justify-between">
              <span className="text-xl">Danh sách hóa đơn</span>
              <div className="ml-auto mr-[20px] mt-3">
                {hoaDonFalse.length < 7 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      taoHoaDon();
                    }}
                  >
                    <PlusCircleOutlined /> Tạo hóa đơn
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Tabs
              activeKey={selectedHoaDonId} // Hiển thị tab tương ứng với hóa đơn được chọn
              onChange={(key) => setSelectedHoaDonId(key)} // Cập nhật id hóa đơn được chọn khi người dùng chọn tab mới
              defaultActiveKey={hoaDonFalse[0]?.id} // Chọn tab đầu tiên mặc định
              animated={{ inkBar: true, tabPane: true }} // Bật hiệu ứng chuyển tab
              items={hoaDonFalse.map((tab) => ({
                label: tab.ma, // Tên tab
                key: tab.id, // Khóa của tab
              }))}
            />
          </div>

          <div className="ml-[60px] mt-[30px]">
            <Button
              style={{
                borderRadius: "30px",
                height: "35px",
                backgroundColor: "yellow",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={openModal}
            >
              Chọn sản phẩm
            </Button>
          </div>

          <div className="mt-7">
            <h1>Giỏ hàng</h1>
            <div className="h-[610px]">
              {SPCTChuaThanhToan.length > 0 ? (
                <div className="max-h-[570px] overflow-y-auto">
                  <table className="min-w-full text-center text-sm font-light">
                    <thead className="sticky top-0 bg-blue-700 text-xl font-medium text-white">
                      <tr>
                        <th className="w-10 px-6 py-4">STT</th>
                        <th className="w-[130px] px-6 py-4">Ảnh</th>
                        <th className="w-52 px-6 py-4">Sản phẩm</th>
                        <th className="w-52 px-6 py-4">Số lượng</th>
                        <th className="w-52 px-6 py-4">Thành tiền</th>
                        <th className="px-6 py-4">Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SPCTChuaThanhToan.map((SPCT, index) => (
                        <tr
                          key={SPCT.id}
                          className="hover:bg-gray-100"
                          onMouseEnter={() => {
                            setIdSPCTDangChon(SPCT.idSpct);
                            setThayDoiSoLuongMua(SPCT.soLuong);
                          }}
                          onMouseLeave={() => {
                            setIdSPCTDangChon(null);
                          }}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <LayAnhTheoIdSP
                              id={SPCT.idSpct}
                              className="h-[120px] w-[120px]"
                            />
                          </td>
                          <td>
                            {SPCT.tenSanPham} <br />
                            {SPCT.maSPCT} [{SPCT.kichThuoc} - {SPCT.mauSac}]
                            <br />
                            {SPCT.donGia}
                          </td>

                          <td className="text-center">
                            <div className="flex h-full items-center justify-center">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIdSPCTDangChon(SPCT.idSpct);
                                    decrement(SPCT.idSpct, SPCT.soLuong - 1); // Giảm 1 số lượng
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-200"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  value={
                                    idSPCTDangChon === SPCT.idSpct
                                      ? thaydoiSoLuongMua
                                      : SPCT.soLuong
                                  }
                                  className="h-8 w-12 rounded border border-gray-300 text-center"
                                  onClick={() => {
                                    setIdSPCTDangChon(SPCT.idSpct);
                                    setThayDoiSoLuongMua(SPCT.soLuong);
                                  }}
                                  onChange={(event) => {
                                    setThayDoiSoLuongMua(
                                      Number(event.target.value),
                                    );
                                  }}
                                  onBlur={() => upDateSoLuongMua()} // Chỉ cập nhật khi số lượng thay đổi
                                />

                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setIdSPCTDangChon(SPCT.idSpct);
                                    increment(SPCT.idSpct, SPCT.soLuong + 1); // Tăng 1 số lượng
                                  }}
                                  className="flex h-8 w-8 items-center justify-center rounded bg-gray-200"
                                  // disabled={soLuongTonCuaSPCT === 0}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>

                          <td>{SPCT.donGia * SPCT.soLuong}</td>
                          <td>
                            <Popconfirm
                              title="Delete the task"
                              description="Are you sure to delete this task?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={(e) => {
                                e.preventDefault();
                                XoaSPKhoiGioHang(SPCT.idSpct);
                              }}
                            >
                              <Button type="primary" danger>
                                <TrashIcon className="h-5 w-5 text-white" />
                                khách k mua thì dã nó
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-4 text-center text-gray-500">
                  Không có sản phẩm nào
                </div>
              )}
            </div>
          </div>
        </div>
        <hr />
        <div className="w-4/12">
          <div className="mx-auto mt-5">
            <div className="text-lg font-bold">
              <span>Thông tin hóa đơn</span>
              {/* Mã giảm giá */}
              <div className="my-4 flex items-center justify-between">
                <div>Mã giảm giá</div>
                <div className="flex items-center">
                  <Select
                    showSearch
                    style={{ width: 300, height: "35px" }}
                    placeholder="Chọn phiếu giảm giá"
                    optionLabelProp="label" // Chỉ hiển thị 'label' sau khi chọn
                    options={[
                      { label: "Không chọn phiếu", value: "" }, // Option rỗng
                      ...danhSachPhieuGiamGia.map((pgg) => ({
                        label: `${pgg.tenVoucher}`, // Hiển thị tên sau khi chọn
                        value: pgg.id,
                        disabled: pgg.soLuong === 0, // Disable option nếu soLuong = 0
                        description: (
                          <>
                            <span>tên: {pgg.tenVoucher}</span> <br />
                            <span>
                              Mức giảm: {pgg.mucGiam} {pgg.hinhThucGiam}
                            </span>{" "}
                            <br />
                            <span>Giảm tối đa: {pgg.giamToiDa} VNĐ</span> <br />
                            <span className="text-red-600">
                              Còn: {pgg.soLuong} phiếu
                            </span>
                            <hr />
                          </>
                        ),
                      })),
                    ]}
                    fieldNames={{ label: "description", value: "value" }} // Hiển thị thông tin chi tiết khi mở dropdown
                    filterOption={
                      (input, option) =>
                        option.label.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm theo tên phiếu giảm giá (label)
                    }
                  />

                  <Button
                    color="danger"
                    variant="solid"
                    className="ml-2 flex h-[35px] items-center justify-center" // Đặt chiều cao cho nút bằng với <Select />
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div>Tiền hàng</div>
                <div>{tongTien} </div>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div>Tiền được giảm</div>
                <div>{tienDuocGiam}</div>
              </div>

              <div className="my-4 flex gap-4">
                <div>Giao hàng</div>
                <div>
                  <Switch />
                </div>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div>Thành tiền</div>
                <div className="text-red-500">{tienPhaiThanhToan} VND</div>
              </div>

              <div className="ml-7">
                <div className="my-2">
                  <Button
                    style={{ height: "50px", width: "450px" }}
                    className="ml-[10px] border-2 border-green-500 text-lg font-medium text-green-500"
                    onClick={openthanhToan}
                  >
                    Tiền mặt
                  </Button>
                </div>
                <div className="my-2">
                  <Button
                    style={{ height: "50px", width: "450px" }}
                    className="ml-[10px] border-2 border-yellow-500 text-lg font-medium text-yellow-500"
                  >
                    Chuyển khoản
                  </Button>
                </div>
                <div className="my-2">
                  <Button
                    style={{ height: "50px", width: "450px" }}
                    className="ml-[10px] border-2 border-red-500 text-lg font-medium text-red-500"
                    onClick={huyHoaDon}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            </div>
            <hr />
            <div className="mx-3 mt-2">
              <span className="text-xl font-semibold">Khach hang</span>
              <div>
                <span className="">Chọn khách hàng:&nbsp;</span>
                <Select
                  placeholder="Chọn khách hàng"
                  className="w-[300px]"
                  optionLabelProp="label" // Chỉ hiển thị 'label' sau khi chọn
                  options={[
                    { label: "Chọn khách hàng", value: "" }, // Option rỗng
                    ...danhSachKhachHang.map((kh) => ({
                      label: `${kh.hoTen}`, // Hiển thị tên khách hàng sau khi chọn
                      value: kh.id,
                      description: (
                        <>
                          <span>tên: {kh.hoTen}</span> <br />
                          <span>SĐT: {kh.sdt}</span>
                          <br />
                          <span>
                            Địa chỉ:{" "}
                            <DiaCHiMacDinhKhachHang idKhachHang={kh.id} />
                          </span>
                          <br />
                          <hr />
                        </>
                      ),
                    })),
                  ]}
                  fieldNames={{ label: "description", value: "value" }} // Hiển thị thông tin chi tiết khi mở dropdown
                  filterOption={
                    (input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase()) // Tìm kiếm theo tên  (label)
                  }
                />
              </div>
              <div>
                <span className="text-lg font-medium">Tên khách hàng: </span>
                <span>{tenKhachHang}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal cho SanPhamBanTaiQuay */}
      <Modal
        title="Chọn sản phẩm"
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={1200} // Điều chỉnh chiều rộng modal
        // Điều chỉnh chiều cao
      >
        <SanPhamBanTaiQuay
          id={selectedHoaDonId}
          onProductAdded={closeModalAndReloadCart}
        />
      </Modal>

      <Modal
        title={
          <>
            <InfoCircleOutlined style={{ marginRight: 8, color: "blue" }} />
            <span className="text-lg text-blue-700">Thanh toán</span>
          </>
        }
        open={openThanhToan}
        onCancel={closethanhToan}
        footer={[
          <Button key="cancel" onClick={closethanhToan}>
            Hủy
          </Button>,
          <Popconfirm
            key="confirm-payment"
            title="Bạn có chắc chắn muốn thanh toán và in hóa đơn không?"
            onConfirm={thanhToanTienMat}
            okText="Có"
            cancelText="Không"
          >
            <Button key="submit" type="primary">
              Thanh toán và in hóa đơn
            </Button>
          </Popconfirm>,
        ]}
      >
        <div className="my-4">
          <p>Tiền khách đưa</p>
          <InputNumber
            addonAfter={"VNĐ"}
            defaultValue={0}
            onChange={(value) => {
              setTienKhachDua(value), console.log(value);
            }}
          />
        </div>
        <div>
          <p>Tiền thừa</p>
          <InputNumber addonAfter={"VNĐ"} defaultValue={0} disabled />
        </div>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
