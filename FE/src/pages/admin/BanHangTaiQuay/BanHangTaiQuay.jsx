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
import { Fragment, useEffect, useState } from "react";
import SanPhamBanTaiQuay, { getAllSPBH } from "./SanPhamBanHang";
import axios from "../../../api/axiosConfig";
import { Bounce, toast, ToastContainer } from "react-toastify";
import LayAnhTheoIdSP from "../SanPham/Product/LayANhTheoIDSP";
import { XMarkIcon } from "@heroicons/react/16/solid/index.js";
import { TrashIcon } from "@heroicons/react/16/solid";
import DiaCHiMacDinhKhachHang from "./DiaChiMacDinhKhachHang";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { ExportPDF, generatePDF } from "../XuatFilePDF/ExportPDF";
import { getAllSPCTBH } from "./SanPhamService";
import ThemMauSac from "../SanPham/ProductDetail/ThemMauSac.jsx";
import ThanhToanCKTM from "./ThanhToanCKTM.jsx";
import ThemKH from "./ThemKH.jsx";
import { useNavigate } from "react-router-dom";

export default function BanHangTaiQuay() {
  const [hoaDonFalse, setHoaDonFalse] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openThanhToan, setOpenThanhToan] = useState(false);
  const [SPCTChuaThanhToan, setSPCTChuaThanhToan] = useState([]);
  const [selectedHoaDonId, setSelectedHoaDonId] = useState(null); // State lưu trữ id hóa đơn được chọn

  const navigate = useNavigate();

  // chon giao hang
  const [phiGiaoHang, setPhiGiaoHang] = useState(0);
  const [giaoHang, setGiaoHang] = useState(false);
  const [ngayDuKien, setNgayDuKien] = useState(null);

  // model showqr chuyển khoản
  const [openThanhToanQR, setOpenThanhToanQR] = useState(false);

  const openModalThanhToanQR = () => {
    setOpenThanhToanQR(true);
  };
  const closeModalThanhToanQR = async () => {
    setOpenThanhToanQR(false);
  };

  // model thanh toán 50 50
  // const [openThanhToanCKTM, setOpenThanhToanCKTM] = useState(false);

  // const openModalThanhToanCKTM = () => {
  //   setOpenThanhToanCKTM(true);
  // };
  // const closeModalThanhToanCKTM = async () => {
  //   setOpenThanhToanCKTM(false);
  // };

  // model thêm khách hàng
  const [openThemKH, setOpenThemKH] = useState(false);

  const openModalThemKH = () => {
    setOpenThemKH(true);
  };
  const closeModalThemKH = async () => {
    setOpenThemKH(false);
  };

  const [danhSachPhieuGiamGia, setDanhSachPhieuGiamGia] = useState([]);
  const [tongTien, setTongTien] = useState(0);
  const [tienPhaiThanhToan, setTienPhaiThanhToan] = useState(0);
  const [tienDuocGiam, setTienDuocGiam] = useState(0);
  const [tenKhachHang, setTenKhachHang] = useState(null);
  const [idKhachHang, setIdKhachHangDangChon] = useState();
  const [soDienThoai, setsoDienThoai] = useState(null);
  const [diaChiGiaoHang, setdiaChiGiaoHang] = useState("");
  const [thaydoiSoLuongMua, setThayDoiSoLuongMua] = useState(0);
  const [idSPCTDangChon, setIdSPCTDangChon] = useState();
  const [soLuongTonCuaSPCT, setSoLuongTonCuaSPCT] = useState(0);
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [idPhieuGiamGiaDangChon, setIdPhieuGiamGiaDangChon] = useState();
  const [tienKhachDua, setTienKhachDua] = useState();
  const [tienThuaTraKhach, setTienThuaTraKhach] = useState();
  const [error, setError] = useState("");

  const [disableSelctKhachHang, setDisableSelectKhachHang] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false); // State để quản lý disable

  let ApiTaoHoaDon = `http://localhost:8080/banhangtaiquay/taodon`; // Tao Hoa DOn
  let ApiLayHoaDonChuaThanhToan = `http://localhost:8080/api/hoadon/getall-chuathanhtoan`; // Danh Sach Hoa DOn CHo
  let ApiLaySanPhamOHoaDon = `http://localhost:8080/api/hoadonchitiet/SPCTbyidHD`; // Gio Hang
  let ApiUpdateSoLuongSPTrongHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/update`; //Update So Luong San Pham trong gio hang
  let ApiLaySoLuongTonCuaSPCT = `http://localhost:8080/api/sanphamchitiet`; // Lấy số lượng tồn  để valid
  let ApiLayThongTinThanhToanTheoIdHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/gettheoid`; // Lay các thông tin tiền , voucher, khách hàng của hóa đơn
  let ApiLayPhieuGiamGia = `http://localhost:8080/api/phieugiamgia/trang-thai-true`; // Danh Sach Phiếu Giam giá
  let ApiHuyHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/delete/${selectedHoaDonId}`; // Hủy Hóa đơn
  let ApiLayTatCaKhachHang = `http://localhost:8080/api/khachhang/getall`; // Danh sách khách hàng
  let ApiAddPhieuGiamGiaVaoHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/${selectedHoaDonId}/voucher`; // thêm phiếu giam giá vào hóa đơn
  let ApiXoaPhieuGiamGiaKhoiHoaDon = `http://localhost:8080/banhangtaiquay/hoadon/delete/${selectedHoaDonId}/voucher`; // Xóa phiếu giam giá
  let ApiThanhToanHoaDon = `http://localhost:8080/banhangtaiquay/thanhtoan/${selectedHoaDonId}`; // thanh toán tiền mặt
  let ApiXoaKhachHangKhoiHoaDon = `http://localhost:8080/api/hoadon/${selectedHoaDonId}/deletekhachhang`; // Xoa khach hanng khoi hoa don
  let ApiThemKhachHangVaoHoaDon = `http://localhost:8080/api/hoadon/${selectedHoaDonId}/addkhachhang`; // Them khach hang vao hoa don
  let ApiLayThongTinKhachHang = `http://localhost:8080/api/khachhang`;

  //day la cai m can
  const [maHD, setMaHD] = useState("");

  let ApiLayThongTinHoaDon = `http://localhost:8080/banhangtaiquay/hoadon`;

  const [tempHoaDonId, setTempHoaDonId] = useState(null); // State tạm thời để lưu id hóa đơn

  //Lấy danh sách hóa đơn
  const LayDanhSachHoaDonChuaThanhToan = async () => {
    try {
      const response = await axios.get(ApiLayHoaDonChuaThanhToan);

      const hoaDonList = response.data.result;
      console.log(response.data.result);

      setHoaDonFalse(hoaDonList);
      if (hoaDonList.length > 0) {
        setSelectedHoaDonId(hoaDonList[0].id); // Chọn id hóa đơn đầu tiên khi tải dữ liệu lần đầu
        const hd = await axios.get(
          `${ApiLayThongTinHoaDon}/${hoaDonList[0].id}`,
        );
        // setMaHD(hd.data.result.ma);
      }

      // console.log(hd.data.result.ma);
    } catch (error) {
      console.log("Lấy hóa đơn lỗi:", error);
    }
  };

  //Lấy danh sách hóa đơn
  const LayMaHoaDon = async () => {
    try {
      const hd = await axios.get(`${ApiLayThongTinHoaDon}/${selectedHoaDonId}`);

      setMaHD(hd.data.result.ma);
    } catch (error) {
      console.log("Lấy hóa đơn lỗi:", error);
    }
  };

  //Lấy các kiểu tiền của hóa đơn
  const LayThongTinThanhToanCuaHoaDon = async () => {
    const ttThanhToan = await axios.get(
      `${ApiLayThongTinThanhToanTheoIdHoaDon}/${selectedHoaDonId}`,
    );
    if (ttThanhToan.data.result) {
      setTongTien(ttThanhToan.data.result.tongTien);
      setTienPhaiThanhToan(ttThanhToan.data.result.tienPhaiThanhToan);
      setTienDuocGiam(ttThanhToan.data.result.tienDuocGiam);
      setIdPhieuGiamGiaDangChon(ttThanhToan.data.result.idVoucher);
      setIdKhachHangDangChon(ttThanhToan.data.result.idKhachHang);
      if (ttThanhToan.data.result.idKhachHang != null) {
        try {
          const khachHang = await axios.get(
            `${ApiLayThongTinKhachHang}/${ttThanhToan.data.result.idKhachHang}`,
          );
          // console.log(khachHang);
          setTenKhachHang(khachHang.data.result.hoTen || "Khách lẻ");
          setsoDienThoai(khachHang.data.result.sdt || "");
        } catch (error) {
          console.log(error);
        }
      } else {
        setTenKhachHang("Khách lẻ");
        setsoDienThoai(null);
      }
    } else {
      console.log("Dữ liệu trả về không có trường 'result'"); // Log nếu `result` không tồn tại
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
    const responseSoLuongTon = await axios.get(
      `${ApiLaySoLuongTonCuaSPCT}/${idSPCTDangChon}`,
    );
    setSoLuongTonCuaSPCT(responseSoLuongTon.data.result.soLuong);
    console.log("soLuongTonCuaSPCT", responseSoLuongTon.data.result.soLuong);
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
    } catch (error) {
      console.log(error);
    }
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
      console.error("Error:", error);
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
  // Mở modal chọn SP
  const openModal = () => {
    setModalVisible(true);
  };
  // Đóng modal chọn SP
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
    const responseSoLuongTon = await axios.get(
      `${ApiLaySoLuongTonCuaSPCT}/${idSPCTDangChon}`,
    );
    const SLT = responseSoLuongTon.data.result.soLuong;
    const previousQuantity = thaydoiSoLuongMua; // Store the previous quantity
    try {
      // Check if the quantity to update exceeds the available stock
      if (thaydoiSoLuongMua > SLT) {
        console.log(SLT);
        toast.error(
          `Số lượng tồn của sản phẩm còn ${SLT} sản phẩm. Không thể cập nhật!`,
        );
        return; // Exit the function if the condition is met
      }

      await axios.put(`${ApiUpdateSoLuongSPTrongHoaDon}/${selectedHoaDonId}`, {
        idSpct: idSPCTDangChon,
        soLuong: thaydoiSoLuongMua,
      });

      // Check if SLT is -1 after the update
      const updatedResponseSoLuongTon = await axios.get(
        `${ApiLaySoLuongTonCuaSPCT}/${idSPCTDangChon}`,
      );
      const updatedSLT = updatedResponseSoLuongTon.data.result.soLuong;
      if (updatedSLT === -1) {
        toast.error("Cập nhật không thành công, số lượng tồn không hợp lệ!");
        setThayDoiSoLuongMua(previousQuantity); // Restore previous quantity
        return; // Exit the function if SLT is -1
      }

      await Promise.all([
        LayChiTietSanPham(), // Cập nhật giỏ hàng sau khi thêm sản phẩm
        LayThongTinThanhToanCuaHoaDon(), // Cập nhật thông tin hóa đơn mới, bao gồm tổng tiền
        LaySoLuongTonCuaSPCT(),
      ]);
      toast.success("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      setThayDoiSoLuongMua(previousQuantity); // Restore previous quantity on error
      toast.error("Cập nhật thất bại");
    }
  };

  // Tăng số lượng mua lên 1
  const increment = async (idSpct, newQuantity) => {
    try {
      // Đợi lấy số lượng tồn trước khi kiểm tra
      const responseSoLuongTon = await axios.get(
        `http://localhost:8080/api/sanphamchitiet/${idSpct}`,
      );
      const soLuongTon = responseSoLuongTon.data.result.soLuong;

      if (soLuongTon > 0) {
        setThayDoiSoLuongMua(newQuantity);
        await axios.put(
          `${ApiUpdateSoLuongSPTrongHoaDon}/${selectedHoaDonId}`,
          {
            idSpct: idSpct,
            soLuong: newQuantity,
          },
        );
        await Promise.all([
          LayChiTietSanPham(),
          LayThongTinThanhToanCuaHoaDon(),
        ]);
        toast.success("Cập nhật thành công");
      } else {
        toast.warning(
          "Sản phẩm đã hết hàng, không thể tăng số lượng"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  //Giam so luong mua di 1
  const decrement = async (idSpct, newQuantity) => {
    if (newQuantity > 0) {
      setThayDoiSoLuongMua(newQuantity);
      setIdSPCTDangChon(idSpct); // Cập nhật id của sản phẩm đang chọn
      // await LaySoLuongTonCuaSPCT(); // Gọi hàm lấy số lượng tồn của sản phẩm sau khi cập nhật id

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
          // LaySoLuongTonCuaSPCT(),
        ]);
        toast.success("Cập nhật thành công");
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật thất bại");
      }
    }
  };

  //Huy Hoa Don
  const huyHoaDon = async () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn hủy hóa đơn này không?",
      onOk: async () => {
        try {
          await axios.put(ApiHuyHoaDon);
          toast.success("Hủy hóa đơn thành công");
          LayDanhSachHoaDonChuaThanhToan();
        } catch (error) {
          console.log(error);
          toast.error("Không thành công, có lỗi xảy ra");
        }
      },
      onCancel() {
        // Do nothing if the user cancels
      },
    });
  };

  // add Phieu Giam Gia
  const addPhieuGiamGia = async () => {
    try {
      await axios.post(
        `${ApiAddPhieuGiamGiaVaoHoaDon}/${idPhieuGiamGiaDangChon}`,
      );
      toast.success("Áp dụng thành công");
      LayThongTinThanhToanCuaHoaDon();
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra");
      setIsSelectDisabled(false);
      idPhieuGiamGiaDangChon(null);
    }
  };

  const addVoucher = async () => {
    if (idPhieuGiamGiaDangChon) {
      await addPhieuGiamGia(); // Gọi hàm addPhieuGiamGia khi mất focus
      setIsSelectDisabled(true); // Disable Select sau khi gọi hàm
    }
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

  //Xoa Phieu Giam Gia
  const XoaPhieuGiamGiaKhoiHoaDon = async () => {
    console.log("ID phiếu giảm giá đang chọn:", idPhieuGiamGiaDangChon);
    try {
      await axios.delete(
        `${ApiXoaPhieuGiamGiaKhoiHoaDon}/${idPhieuGiamGiaDangChon}`,
      );
      toast.success("Không áp dụng voucher tahnfh công");
      LayThongTinThanhToanCuaHoaDon();
      setIsSelectDisabled(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra!");
      console.log(error);
    }
  };

  // const addKhachHangVaoHoaDon = async () => {
  //   try {
  //     await axios.post(`${ApiThemKhachHangVaoHoaDon}/${idKhachHang}`);
  //     toast.success("Thêm khach hàng thành công");
  //     LayThongTinThanhToanCuaHoaDon();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Co loi xay ra!");
  //   }
  // };

  // const ThemKhachHang = async () => {
  //   if (idKhachHang) {
  //     await addKhachHangVaoHoaDon();
  //     setDisableSelectKhachHang(true); // Disable Select sau khi gọi hàm
  //   }
  // };

  const XoaKhachHangKhoiHoaDon = async () => {
    try {
      await axios.post(`${ApiXoaKhachHangKhoiHoaDon}/${idKhachHang}`);
      await LayThongTinThanhToanCuaHoaDon();
      toast.success("Thanh cong");
      setDisableSelectKhachHang(false);
      setGiaoHang(false);
      setPhiGiaoHang(0);
      setNgayDuKien(null);
    } catch (error) {
      console.log(error);
      toast.error("Không có khách hàng");
    }
  };

  const tinhTienThua = (value) => {
    // Loại bỏ "VNĐ" và dấu chấm, sau đó chuyển thành số
    const tienPhaiThanhToanNum = Number(
      tienPhaiThanhToan.replace(/[.VNĐ]/g, "").trim(),
    );

    console.log(tienPhaiThanhToanNum);

    setTienKhachDua(value);

    // Tính tiền trả lại khách
    const tienTraLaiKhach = value - tienPhaiThanhToanNum;

    if (tienTraLaiKhach >= 0) {
      setTienThuaTraKhach(tienTraLaiKhach);
      setError(""); // Xóa lỗi nếu đủ tiền thanh toán
    } else {
      setError("không đủ tiền thanh toán"); // Báo lỗi nếu không đủ tiền
    }
  };

  //Thanh toan
  const thanhToanTienMat = async () => {
    try {
      // Thực hiện gọi API thanh toán và lấy phản hồi
      const response = await axios.post(ApiThanhToanHoaDon, {
        phuongThucThanhToan: "Tiền mặt",
        tienKhachDua: tienKhachDua,
      });

      // Lưu selectedHoaDonId vào state tạm thời
      setTempHoaDonId(selectedHoaDonId); // Lưu ID hóa đơn được chọn vào state tạm thời

      // Hiển thị thông báo thành công
      toast.success("Thanh toán thành công");

      // Gọi các hàm cập nhật danh sách hóa đơn và đóng modal
      await LayDanhSachHoaDonChuaThanhToan();
      closethanhToan();

      // Gọi hàm lấy ID lớn nhất sau khi thanh toán đã hoàn tất
      // await LayIdLonNhat(); // Gọi hàm này sau khi thanh toán thành công
      // Gọi hàm tạo PDF với ID hóa đơn

      setTimeout(() => {
        handleGeneratePDF();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 900);
      // Xóa ID tạm thời sau 1 phút
      setTimeout(() => {
        setTempHoaDonId(null); // Xóa ID tạm thời sau 1 phút
      }, 5000); // 60000 ms = 1 phút
    } catch (error) {
      // Hiển thị thông báo lỗi
      toast.error("Thanh toán thất bại, có lỗi xảy ra!");
      console.log(error);
    }
  };
  const handleGeneratePDF = () => {
    generatePDF();
  };

  useEffect(() => {
    Promise.all([
      LayDanhSachHoaDonChuaThanhToan(),
      LayDanhSachPhieuGiamGia(),
      LayDanhSachKhacHang(),
    ]);

    // LayThongTinThanhToanCuaHoaDon();
  }, []);

  useEffect(() => {
    if (selectedHoaDonId) {
      // Gọi API lấy chi tiết sản phẩm và thông tin thanh toán cho hóa đơn đã chọn
      Promise.all([
        LayChiTietSanPham(selectedHoaDonId),
        LayThongTinThanhToanCuaHoaDon(selectedHoaDonId),
        LayMaHoaDon(),
        // LayIdLonNhat(),
      ]);

      // Tìm hóa đơn trong `hoaDonFalse` có `id` khớp với `selectedHoaDonId`
      const selectedHoaDon = hoaDonFalse.find(
        (hoaDon) => hoaDon.id === Number(selectedHoaDonId), // Ép kiểu `selectedHoaDonId` thành số để so sánh
      );

      // Nếu tìm thấy `selectedHoaDon`, cập nhật `tongTien`, `tienPhaiThanhToan` và `tienDuocGiam`
      if (selectedHoaDon) {
        setTongTien(selectedHoaDon.tongTien);
        setTienPhaiThanhToan(selectedHoaDon.tienPhaiThanhToan);
        setTienDuocGiam(selectedHoaDon.tienDuocGiam);
      } else {
        // Nếu không tìm thấy, đặt `tongTien`, `tienPhaiThanhToan` và `tienDuocGiam` về 0
        setTongTien(0);
        setTienPhaiThanhToan(0);
        setTienDuocGiam(0);
      }
    }
  }, [selectedHoaDonId, hoaDonFalse]);

  // useEffect(() => {
  //   if (idLonNhat) {
  //     handleGeneratePDF(); // Gọi hàm tạo PDF khi idLonNhat đã được cập nhật
  //   }
  // }, [idLonNhat]);

  // hàm format lại định dạng khi gửi về be
  const formatCurrencyToNumber = (value) => {
    // Đảm bảo giá trị là chuỗi trước khi sử dụng replace
    const stringValue = String(value);

    // Loại bỏ tất cả các ký tự không phải là số
    const formattedValue = stringValue.replace(/[^\d]/g, "");

    // Chuyển chuỗi thành số và trả về kết quả
    return parseInt(formattedValue, 10);
  };

  // thanh toán vnpay
  // const handlePaymentClick = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8080/api/paymentvnpay/create-payment",
  //       {
  //         params: {
  //           maHoaDon: selectedHoaDonId,
  //           amount: formatCurrencyToNumber(tienPhaiThanhToan),
  //         },
  //       },
  //     );

  //     if (response.data) {
  //       window.location.href = response.data;
  //       localStorage.setItem("check", "VNPAY");
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi gọi API:", error);
  //   }
  // };

  // khách đặt giao hàng ở tại quầy
  const handleDatHang = async () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn đặt hàng này không?",
      onOk() {
        // Nếu người dùng xác nhận, gửi yêu cầu cập nhật
        axios
          .post(
            `http://localhost:8080/api/hoadon/dathang/${selectedHoaDonId}`,
            {
              phiVanChuyen: phiGiaoHang,
              diaChiChiTiet: diaChiGiaoHang,
              ngayDuKien: ngayDuKien,
              soDienThoai: soDienThoai,
              tenKhachHang: tenKhachHang,
              tienPhaiThanhToan:
                formatCurrencyToNumber(tienPhaiThanhToan) + phiGiaoHang,
            },
          )
          .then((response) => {
            console.log("Cập nhật thành công 111:", response.data);
            setError("");
            toast.success("Cập nhật thành công");
            LayDanhSachHoaDonChuaThanhToan();
            setGiaoHang(false);
            navigate(0);
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  // xác nhận thanh toán
  const handleXacNhanThanhToan = async () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn đồng ý xác nhận thanh toán?",
      onOk() {
        // Nếu người dùng xác nhận, gửi yêu cầu cập nhật
        axios
          .post(
            `http://localhost:8080/api/hoadon/thanh-toan/tc-vnpay/${selectedHoaDonId}`,
            {
              phuongThucThanhToan: "Chuyển khoản",
              tienKhachDua: formatCurrencyToNumber(tienPhaiThanhToan),
            },
          )
          .then((response) => {
            console.log("Cập nhật thành công 111:", response.data);
            setError("");
            toast.success("Cập nhật thành công");
            LayDanhSachHoaDonChuaThanhToan();
            setGiaoHang(false);
            // navigate(0);
            setTempHoaDonId(selectedHoaDonId);
            setTimeout(() => {
              handleGeneratePDF();
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }, 900);
            // Xóa ID tạm thời sau 1 phút
            setTimeout(() => {
              setTempHoaDonId(null); // Xóa ID tạm thời sau 1 phút
            }, 5000); // 60000 ms = 1 phút
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

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
              onClick={() => setGiaoHang(false)}
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
                            {formatTien(SPCT.donGia)}
                          </td>

                          <td className="text-center">
                            <div className="flex h-full items-center justify-center">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();

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
                                    // LaySoLuongTonCuaSPCT();
                                  }}
                                  onChange={(event) => {
                                    setThayDoiSoLuongMua(
                                      Number(event.target.value),
                                    );
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      upDateSoLuongMua();
                                    }
                                  }} // Chỉ cập nhật khi số lượng thay đổi
                                />

                                <button
                                  onMouseOver={() => {
                                    setIdSPCTDangChon(SPCT.idSpct);
                                  }}
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

                          <td>{formatTien(SPCT.donGia * SPCT.soLuong)}</td>
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
                                Xóa
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
                  <div className="text-4xl text-black">
                    Không có sản phẩm nào
                  </div>
                  <div className="">
                    <ShoppingCartIcon className="mx-auto h-72 text-black" />
                  </div>
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
                    value={idPhieuGiamGiaDangChon}
                    // onChange={handleVoucherChange} // Cập nhật idPhieuGiamGiaDangChon khi chọn
                    onClick={addVoucher} // Gọi addPhieuGiamGia khi mất focus
                    disabled={isSelectDisabled} // Disable Select khi isSelectDisabled là true
                    options={[
                      { label: "Không chọn phiếu", value: "" }, // Option rỗng
                      ...danhSachPhieuGiamGia.map((pgg) => ({
                        label: `${pgg.tenVoucher}`, // Hiển thị tên sau khi chọn
                        value: pgg.id,
                        disabled: pgg.soLuong === 0, // Disable option nếu soLuong = 0
                        description: (
                          <>
                            <div
                              onMouseEnter={() =>
                                setIdPhieuGiamGiaDangChon(pgg.id)
                              }
                            >
                              <span>tên: {pgg.tenVoucher}</span> <br />
                              <span>
                                Mức giảm: {pgg.mucGiam} {pgg.hinhThucGiam}
                              </span>{" "}
                              <br />
                              <span>Giảm tối đa: {pgg.giamToiDa} VNĐ</span>
                              <br />
                              <span className="text-red-600">
                                Còn: {pgg.soLuong} phiếu
                              </span>
                              <hr />
                            </div>
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
                    onClick={XoaPhieuGiamGiaKhoiHoaDon}
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

              <div className="my-4 flex justify-between gap-4">
                <div className="flex gap-3">
                  <div>Giao hàng</div>
                  <div>
                    <Switch
                      value={giaoHang}
                      onClick={() => {
                        setGiaoHang(!giaoHang);
                        setPhiGiaoHang(0);
                      }}
                    />
                  </div>
                </div>
                <div>{giaoHang && <div>{formatTien(phiGiaoHang)}</div>}</div>
              </div>

              <div className="my-4 flex items-center justify-between">
                <div>Thành tiền</div>
                <div className="text-red-500">
                  {formatTien(
                    formatCurrencyToNumber(tienPhaiThanhToan) + phiGiaoHang,
                  )}{" "}
                </div>
              </div>

              <div className="mx-3 mt-2">
                <div>
                  <span className="text-xl font-semibold">Khách hàng:</span>
                  <button
                    className="ml-[10px] w-[60px] border-2 border-blue-400 text-lg font-medium text-blue-400"
                    onClick={openModalThemKH}
                  >
                    Chọn
                  </button>
                  <button
                    className="ml-[10px] w-[60px] border-2 border-red-400 text-lg font-medium text-red-400"
                    onClick={XoaKhachHangKhoiHoaDon}
                  >
                    Xóa
                  </button>
                </div>
                <div className="my-3">
                  {tenKhachHang && (
                    <div className="my-1">
                      <span className="text-lg font-medium">
                        Tên khách hàng:{" "}
                      </span>
                      <span>{tenKhachHang}</span>
                    </div>
                  )}
                  {soDienThoai && (
                    <div className="my-1">
                      <span className="text-lg font-medium">
                        Số điện thoại:{" "}
                      </span>
                      <span>{soDienThoai}</span>
                    </div>
                  )}
                  {idKhachHang && (
                    <div className="my-1">
                      <span>
                        <DiaCHiMacDinhKhachHang
                          idKhachHang={idKhachHang}
                          giaoHang={giaoHang}
                          setPhiGiaoHang={setPhiGiaoHang}
                          setNgayDuKien={setNgayDuKien}
                          setdiaChiGiaoHang={setdiaChiGiaoHang}
                        />
                      </span>
                    </div>
                  )}
                </div>
                {giaoHang && (
                  <div>
                    <div className="mx-3 flex items-center gap-4">
                      {" "}
                      <img
                        className="w-[60px]"
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-GHN-Orange.png"
                        alt=""
                      />
                      <div>Ngày giao hàng dự kiến:{ngayDuKien}</div>
                    </div>
                    <div className="flex justify-center">
                      {" "}
                      <button
                        onClick={handleDatHang}
                        style={{ height: "50px", width: "220px" }}
                        className="ml-[10px] border-2 border-green-500 text-lg font-medium text-green-500"
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!giaoHang && (
                <div className="ml-7">
                  <div className="my-2 flex">
                    <Button
                      style={{ height: "50px", width: "220px" }}
                      className="ml-[10px] border-2 border-green-500 text-lg font-medium text-green-500"
                      onClick={openthanhToan}
                    >
                      Tiền mặt
                    </Button>
                    <Button
                      style={{ height: "50px", width: "220px" }}
                      className="ml-[10px] border-2 border-yellow-500 text-lg font-medium text-yellow-500"
                      // onClick={handlePaymentClick}
                      onClick={openModalThanhToanQR}
                    >
                      Chuyển khoản
                    </Button>
                  </div>
                  {/* <div className="my-2">
                    <Button
                      style={{ height: "50px", width: "450px" }}
                      className="ml-[10px] border-2 border-orange-600 text-lg font-medium text-orange-700"
                      onClick={openModalThanhToanCKTM}
                    >
                      Tiền mặt & Chuyển khoản
                    </Button>
                  </div> */}
                  <div className="my-2">
                    <Button
                      style={{ height: "50px", width: "450px" }}
                      className="ml-[10px] border-2 border-red-700 text-lg font-medium text-red-700"
                      onClick={huyHoaDon}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <hr />
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
          thayDoiSoLuong={upDateSoLuongMua}
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
              tinhTienThua(value), console.log(value);
            }}
          />
        </div>
        <div>
          <p>Tiền thừa</p>
          <InputNumber
            value={tienThuaTraKhach}
            addonAfter={"VNĐ"}
            defaultValue={0}
            disabled
            formatter={(value) =>
              `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </Modal>

      {openThanhToanQR && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[600px] w-[600px] justify-between rounded-lg bg-white p-8">
            <div className="">
              <img
                src="https://kalite.vn/wp-content/uploads/2021/09/maqrkalite.jpg"
                alt=""
              />
            </div>
            <div className="flex justify-center gap-5">
              <button
                onClick={closeModalThanhToanQR}
                className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
              >
                Hủy
              </button>
              <button
                onClick={handleXacNhanThanhToan}
                className="h-10 rounded bg-blue-500 px-4 text-white hover:bg-blue-600"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {openThanhToanCKTM && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[200px] w-[600px] justify-between rounded-lg bg-white p-8">
            <div className="">
              <ThanhToanCKTM
                closeModel={closeModalThanhToanCKTM}
                maHoaDon={selectedHoaDonId}
                tienPhaiThanhToan={formatCurrencyToNumber(tienPhaiThanhToan)}
              />
            </div>
            <button
              onClick={closeModalThanhToanCKTM}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )} */}

      {openThemKH && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[90%] w-[80%] justify-between rounded-lg bg-white p-8">
            <div className="">
              <ThemKH
                idHoaDon={selectedHoaDonId}
                onadd={LayThongTinThanhToanCuaHoaDon}
              />
            </div>
            <button
              onClick={closeModalThemKH}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
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
      <div style={{ display: "none" }}>
        <ExportPDF idHoaDon={tempHoaDonId} />
      </div>
    </>
  );
}
