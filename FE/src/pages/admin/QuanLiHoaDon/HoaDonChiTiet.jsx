import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import axios from "../../../api/axiosConfig";
import { useEffect, useRef, useState } from "react";
import {
  FaBoxOpen,
  FaCar,
  FaCheck,
  FaCheckCircle,
  FaHourglassStart,
  FaRegTimesCircle,
  FaStackOverflow,
  FaTruck,
  FaUndoAlt,
} from "react-icons/fa";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ThongTinHoaDon from "./ThongTinHoaDon";
import ThongTinKhachHang from "./ThongTinKhachHang";
import XacNhanThanhToan from "./XacNhanThanhToan";
import { ExportPDF, generatePDF } from "../XuatFilePDF/ExportPDF";

const HoaDonChiTiet = () => {
  const { id } = useParams();
  const [hoaDon, setHoaDon] = useState([]);
  const [lichSuHoaDon, setLichSuHoaDon] = useState([]);
  const [hoaDonChiTiet, setHoaDonChiTiet] = useState([]);
  const [ghiChu, setGhiChu] = useState("");
  const [trangThaiThanhToan, setTrangThaiThanhToan] =
    useState("Chưa thanh toán");

  // model lịch sử hóa đơn
  const [OpenModelLSHD, setOpenModelLSHD] = useState(false);
  const openModalLSHD = () => {
    setOpenModelLSHD(true);
  };
  const closeModalLSHD = async () => {
    setOpenModelLSHD(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  // model xác nhận thanh toán
  const [OpenModelXNTT, setOpenModelXNTT] = useState(false);
  const openModalXNTT = () => {
    setOpenModelXNTT(true);
  };
  const closeModalXNTT = async () => {
    setOpenModelXNTT(false);
  };

  // model update huy
  const [OpenModelHuy, setOpenModelHuy] = useState(false);
  const openModalHuy = () => {
    setOpenModelHuy(true);
  };
  const closeModalHuy = async () => {
    setOpenModelHuy(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };
  // model hoàn hàng
  const [OpenModelHoanHang, setOpenModelHoanHang] = useState(false);
  const openModalHoanHang = () => {
    setOpenModelHoanHang(true);
  };
  const closeModalHoanHang = async () => {
    setOpenModelHoanHang(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  // model hoàn hàng thành công
  const [OpenModelHoanHangTC, setOpenModelHoanHangTC] = useState(false);
  const openModalHoanHangTC = () => {
    setOpenModelHoanHangTC(true);
  };
  const closeModalHoanHangTC = async () => {
    setOpenModelHoanHangTC(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  // model update chờ giao
  const [OpenModelXacNhan, setOpenModelXacNhan] = useState(false);
  const openModalXacNhan = () => {
    setOpenModelXacNhan(true);
  };
  const closeModalXacNhan = async () => {
    setOpenModelXacNhan(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };
  // model update chờ lấy hàng
  const [OpenModelChoLayHang, setOpenModelChoLayHang] = useState(false);
  const openModalChoLayHang = () => {
    setOpenModelChoLayHang(true);
  };
  const closeModalChoLayHang = async () => {
    setOpenModelChoLayHang(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };
  // model update chờ giao
  const [OpenModelChoGiao, setOpenModelChoGiao] = useState(false);
  const openModalChoGiao = () => {
    setOpenModelChoGiao(true);
  };
  const closeModalChoGiao = async () => {
    setOpenModelChoGiao(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };
  // model update  giao
  const [OpenModelGiao, setOpenModelGiao] = useState(false);
  const openModalGiao = () => {
    setOpenModelGiao(true);
  };
  const closeModalGiao = async () => {
    setOpenModelGiao(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  // model update  giao
  const [OpenModelHT, setOpenModelHT] = useState(false);
  const openModalHT = () => {
    setOpenModelHT(true);
  };
  const closeModalHT = async () => {
    setOpenModelHT(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  // model hoàn hàng thành công
  const [OpenModelQuayLaiTrangThaiTruoc, setOpenModelQuayLaiTrangThaiTruoc] =
    useState(false);
  const openModalQuayLai = () => {
    setOpenModelQuayLaiTrangThaiTruoc(true);
  };
  const closeModalQuayLai = async () => {
    setOpenModelQuayLaiTrangThaiTruoc(false);
    await fillHoaDon();
    await fillHoaDonChiTiet();
    await fillLichSuHoaDon();
  };

  const fillHoaDon = () => {
    axios
      .get(`http://localhost:8080/api/hoadon/${id}`)
      .then((res) => {
        setHoaDon(res.data.result);
        setTrangThaiThanhToan(res.data.result.trangThaiThanhToan);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fillLichSuHoaDon = () => {
    axios
      .get(`http://localhost:8080/api/lichsuhoadon/${id}`)
      .then((res) => {
        setLichSuHoaDon(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fillHoaDonChiTiet = () => {
    axios
      .get(`http://localhost:8080/api/hoadonchitiet/SPCTbyidHD/${id}`)
      .then((res) => {
        setHoaDonChiTiet(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fillHoaDon();
    fillHoaDonChiTiet();
    fillLichSuHoaDon();
  }, [id]);

  const thanhToan = lichSuHoaDon.filter(
    (item) => item.trangThai === "DA_THANH_TOAN",
  );

  // tính lại phí ship
  const [idTP, setIdTP] = useState(null);
  const [tenTP, setTenTP] = useState(null);
  const [idQH, setIdQH] = useState(null);
  const [tenQH, setTenQH] = useState("");
  const [idXa, setIdXa] = useState("");
  const [tenXa, setTenXA] = useState("");
  const [soNha, setSoNha] = useState("");
  const [soLuong, setSoLuong] = useState(1);
  const [phiGiaoHang, setPhiGiaoHang] = useState(0);

  // Kiểm tra chuỗi đầu vào
  useEffect(() => {
    const diaChi = hoaDon.diaChiGiaoHang;
    console.log(diaChi);
    // Kiểm tra chuỗi đầu vào
    if (!diaChi || typeof diaChi !== "string") {
      console.error("Địa chỉ không hợp lệ");
      return;
    }

    const totalQuantity = hoaDonChiTiet.reduce(
      (total, item) => total + item.soLuong,
      0,
    );
    setSoLuong(totalQuantity);

    // Tách chuỗi thành các phần
    const parts = diaChi.split(" - ");
    setSoNha(parts[0] || "Không có số nhà");
    setTenXA(parts[1] || "Không có xã");
    setTenQH(parts[2] || "Không có huyện");
    setTenTP(parts[3] || "Không có tỉnh");
  }, [hoaDon, hoaDonChiTiet]);

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    axios
      .get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            "Content-Type": "application/json",
            Token: "0555d4e1-a37c-11ef-8e53-0a00184fe694",
          },
        },
      )
      .then((response) => {
        const id_tp = response.data.data.find((item) => {
          // Kiểm tra nếu tenTP không hợp lệ thì không lọc, trả về undefined
          if (!tenTP || tenTP.trim() === "") return undefined;
          return item.NameExtension.some((extension) =>
            tenTP.includes(extension),
          );
        })?.ProvinceID;

        setIdTP(id_tp || null); // Nếu không tìm thấy, gán null
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tenTP]);

  // // Lấy danh sách quận/huyện dựa trên idTP
  useEffect(() => {
    axios
      .get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          params: { province_id: idTP },
          headers: {
            "Content-Type": "application/json",
            Token: "0555d4e1-a37c-11ef-8e53-0a00184fe694",
          },
        },
      )
      .then((response) => {
        const id_qh = response.data.data.find((item) =>
          item.NameExtension.some((extension) => tenQH.includes(extension)),
        )?.DistrictID;
        setIdQH(id_qh);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idTP, tenQH]);

  // // // Lấy danh sách xã/phường dựa trên idQH
  useEffect(() => {
    if (idQH != undefined && idQH != "") {
      axios
        .get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
          {
            params: { district_id: idQH },
            headers: {
              "Content-Type": "application/json",
              Token: "0555d4e1-a37c-11ef-8e53-0a00184fe694",
            },
          },
        )
        .then((response) => {
          const id_xa = response.data.data.find((item) =>
            item.NameExtension.some((extension) => tenXa.includes(extension)),
          )?.WardCode;
          setIdXa(id_xa);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idQH, tenXa]);

  useEffect(() => {
    if (
      idTP !== undefined &&
      idQH !== undefined &&
      idXa !== undefined &&
      idTP !== "" &&
      idQH !== "" &&
      idXa !== ""
    ) {
      axios
        .get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          {
            params: {
              service_id: 53321,
              insurance_value: 0,
              coupon: null,
              from_district_id: 1542,
              to_district_id: idQH,
              to_ward_code: idXa,
              height: 20, // chiều cao
              length: 30, //chiều dài cm
              weight: 300 * soLuong, // cân nặng g
              width: 40, // chiều rộng
            },
            headers: {
              "Content-Type": "application/json",
              Token: "0555d4e1-a37c-11ef-8e53-0a00184fe694",
              shop_id: 195353,
            },
          },
        )
        .then((response) => {
          // console.log("phí ship: " + response.data.data.total);

          setPhiGiaoHang(response.data.data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idQH, idTP, idXa, soLuong]);

  const isFirstRender = useRef(true); // Flag để kiểm tra lần render đầu tiên

  useEffect(() => {
    if (isFirstRender.current) {
      // Nếu là lần render đầu tiên, chỉ đổi giá trị flag mà không chạy API
      isFirstRender.current = false;
      return;
    }
    axios
      .post(`http://localhost:8080/api/hoadon/updatepvc/${id}`, {
        phiVanChuyen: phiGiaoHang,
      })
      .then(() => {
        fillHoaDonChiTiet();
        fillHoaDon();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [id, phiGiaoHang, soLuong]);

  console.log(thanhToan);
  console.log(lichSuHoaDon);
  console.log(hoaDon);
  console.log(soLuong);
  console.log(phiGiaoHang);

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmitUpdateHuy = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn hủy  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/huy/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalHuy();
          })
          .catch((error) => {
            closeModalHuy();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateHoanHang = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn hoàn hàng  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/hoanhang/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalHoanHang();
          })
          .catch((error) => {
            closeModalHoanHang();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateHoanHangTC = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn đơn hàng hoàn thành công không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/hoanhangtc/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalHoanHangTC();
          })
          .catch((error) => {
            closeModalHoanHangTC();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateChoLayHang = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật trạng thái chờ lấy hàng không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/cholayhang/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalChoLayHang();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateChoGiao = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content:
        "Bạn có chắc chắn muốn cập nhật sang trạng thái chờ giao hàng không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/chogiaohang/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalChoGiao();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateGiao = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content:
        "Bạn có chắc chắn muốn nhật cập sang trạng thái đang giao không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/danggiao/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalGiao();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật:", error);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };
  // xác nhận
  const handleSubmitUpdateXacNhan = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content:
        "Bạn có chắc chắn muốn cập nhật sang trạng thái đã xác nhận  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/xacnhan/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalXacNhan();
          })
          .catch((error) => {
            closeModalXacNhan();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  // quay lại trạng thái trước
  // xác nhận
  const handleSubmitUpdateQuayLai = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content:
        "Bạn có chắc chắn muốn cập nhật sang trạng thái đã xác nhận  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/quaylai/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalQuayLai();
          })
          .catch((error) => {
            closeModalXacNhan();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };

  const handleSubmitUpdateHoanThanh = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật hoàn thành đơn hàng không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/hoanthanh/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalHT();
          })
          .catch((error) => {
            closeModalHT();
            toast.error(error.response.data.message); // Hiển thị thông báo từ server
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };
  const handalePDF = () => {
    generatePDF();
  };

  return (
    <div className="mx-3 py-3">
      <div className="overflow-x-auto">
        <Timeline minEvents={6}>
          {lichSuHoaDon.map((item, index) => (
            <TimelineEvent
              key={index}
              icon={
                item.trangThai === "CHO_XAC_NHAN"
                  ? FaHourglassStart
                  : item.trangThai === "HUY_DON"
                    ? FaRegTimesCircle
                    : item.trangThai === "DA_XAC_NHAN"
                      ? FaCheck
                      : item.trangThai === "CHO_LAY_HANG"
                        ? FaBoxOpen
                        : item.trangThai === "CHO_GIAO_HANG"
                          ? FaCar
                          : item.trangThai === "DANG_GIAO"
                            ? FaTruck
                            : item.trangThai === "DA_THANH_TOAN"
                              ? FaStackOverflow
                              : item.trangThai === "HOAN_THANH"
                                ? FaCheckCircle
                                : item.trangThai === "HOAN_HANG"
                                  ? FaUndoAlt
                                  : item.trangThai === "HOAN_HANG_THANH_CONG"
                                    ? FaCheckCircle
                                    : ""
              }
              color={
                item.trangThai === "CHO_XAC_NHAN"
                  ? "#FFFF33"
                  : item.trangThai === "HUY_DON"
                    ? "#FF0000"
                    : item.trangThai === "DA_XAC_NHAN"
                      ? "#33FF33"
                      : item.trangThai === "CHO_LAY_HANG"
                        ? "#EE82EE"
                        : item.trangThai === "CHO_GIAO_HANG"
                          ? "#9999CC"
                          : item.trangThai === "DANG_GIAO"
                            ? "#6699FF"
                            : item.trangThai === "DA_THANH_TOAN"
                              ? "#99FF00"
                              : item.trangThai === "HOAN_THANH"
                                ? "#99FF00"
                                : item.trangThai === "HOAN_HANG"
                                  ? "#008080"
                                  : item.trangThai === "HOAN_HANG_THANH_CONG"
                                    ? "#99FF00"
                                    : ""
              }
              subtitle={formatDate(item.createAt)}
              title={
                item.trangThai === "CHO_XAC_NHAN"
                  ? "Chờ xác nhận"
                  : item.trangThai === "HUY_DON"
                    ? "Đã hủy đơn"
                    : item.trangThai === "DA_XAC_NHAN"
                      ? "Đã xác nhận"
                      : item.trangThai === "CHO_LAY_HANG"
                        ? "Chờ lấy hàng"
                        : item.trangThai === "CHO_GIAO_HANG"
                          ? "Chờ giao hàng"
                          : item.trangThai === "DANG_GIAO"
                            ? "Đang giao hàng"
                            : item.trangThai === "DA_THANH_TOAN"
                              ? "Đã thanh toán"
                              : item.trangThai === "HOAN_THANH"
                                ? "Hoàn thành"
                                : item.trangThai === "HOAN_HANG"
                                  ? "Hoàn hàng"
                                  : item.trangThai === "HOAN_HANG_THANH_CONG"
                                    ? "Hoàn hàng thành công"
                                    : ""
              }
            ></TimelineEvent>
          ))}
        </Timeline>
      </div>
      <hr className="mb-2" />
      <div className="mx-10 flex justify-between">
        <div className="flex">
          {hoaDon.phuongThucGiaoHang === "Tại quầy" ? (
            ""
          ) : (
            <div>
              {hoaDon.trangThaiDonHang === "Chờ Xác Nhận" && (
                <button
                  onClick={openModalXacNhan}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Xác nhận
                </button>
              )}

              {hoaDon.trangThaiDonHang === "Đã xác nhận đơn" && (
                <button
                  onClick={openModalChoLayHang}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Chờ lấy hàng
                </button>
              )}
              {hoaDon.trangThaiDonHang === "Chờ lấy hàng" && (
                <button
                  onClick={openModalChoGiao}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Chờ vận chuyển
                </button>
              )}
              {(hoaDon.trangThaiDonHang === "Chờ Xác Nhận" ||
                hoaDon.trangThaiDonHang === "Đã xác nhận đơn" ||
                hoaDon.trangThaiDonHang === "Chờ lấy hàng") && (
                <button
                  onClick={openModalHuy}
                  className="mx-5 rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Hủy Hóa Đơn
                </button>
              )}

              {hoaDon.trangThaiDonHang === "Chờ đơn vị vẫn chuyển" && (
                <button
                  onClick={openModalGiao}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Giao hàng
                </button>
              )}

              {hoaDon.trangThaiDonHang === "Đơn đang trên đường giao hàng" && (
                <button
                  onClick={openModalHT}
                  className="rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Hoàn thành
                </button>
              )}
            </div>
          )}
          {(hoaDon.trangThaiDonHang === "Chờ đơn vị vẫn chuyển" ||
            hoaDon.trangThaiDonHang === "Đơn đang trên đường giao hàng") && (
            <button
              onClick={openModalHoanHang}
              className="mx-5 rounded bg-blue-500 px-2 py-1 text-white"
            >
              Hoàn Hàng
            </button>
          )}

          {hoaDon.trangThaiDonHang === "Hoàn hàng" && (
            <button
              onClick={openModalHoanHangTC}
              className="mx-5 rounded bg-blue-500 px-2 py-1 text-white"
            >
              Hoàn Hàng Thành Công
            </button>
          )}

          <button
            className="ml-4 rounded bg-blue-500 px-2 py-1 text-white"
            onClick={handalePDF}
          >
            Xuất Hóa Đơn
          </button>
        </div>
        <div className="">
          <button
            className="mx-3 rounded bg-blue-500 px-2 py-1 text-white"
            onClick={openModalQuayLai}
          >
            Quay lại trạng thái trước
          </button>
          <button
            className="rounded bg-blue-500 px-2 py-1 text-white"
            onClick={openModalLSHD}
          >
            Lịch sử hóa đơn
          </button>
        </div>
      </div>
      <hr className="my-3" />
      <div className="my-3">
        <ThongTinKhachHang
          hoaDon={hoaDon}
          fillHoaDon={fillHoaDon}
          fillHoaDonChiTiet={fillHoaDonChiTiet}
        ></ThongTinKhachHang>
      </div>
      <hr className="my-2" />
      <div className="my-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-pink-500">
            Thời gian thanh toán
          </h2>
          {trangThaiThanhToan === "Chưa thanh toán" &&
            hoaDon.trangThaiDonHang === "Đơn đang trên đường giao hàng" && (
              <button
                onClick={openModalXNTT}
                className="rounded bg-blue-500 px-2 py-2 text-white"
              >
                Xác nhận thanh toán
              </button>
            )}
        </div>

        <div>
          <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500">
                  Nhân viên xác nhận
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500">
                  Ghi chú
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {thanhToan.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {hoaDon.tienPhaiThanhToan}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(item.createAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.nguoiThucHien}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-700">
                    {item.moTa}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <div className="my-3">
        <ThongTinHoaDon
          hoaDon={hoaDon}
          hoaDonChiTiet={hoaDonChiTiet}
          fillHoaDon={fillHoaDon}
          fillHoaDonChiTiet={fillHoaDonChiTiet}
          setSoLuong={setSoLuong}
        ></ThongTinHoaDon>
      </div>
      <hr className="border-s-pink-700" />
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      /> */}
      {OpenModelLSHD && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[525px] max-h-[600px] w-[450px] justify-between overflow-y-auto rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Lịch sử hóa đơn</h3>

              {lichSuHoaDon.map((item, index) => (
                <div key={index} className="my-2">
                  <div className="flex">
                    <h4>Trạng thái : </h4>
                    <span>
                      {item.trangThai === "CHO_XAC_NHAN"
                        ? "Chờ xác nhận"
                        : item.trangThai === "DA_XAC_NHAN"
                          ? "Đã xác nhận"
                          : item.trangThai === "CHO_GIAO_HANG"
                            ? "Chờ giao hàng"
                            : item.trangThai === "DANG_GIAO"
                              ? "Đang giao hàng"
                              : item.trangThai === "DA_THANH_TOAN"
                                ? "Đã thanh toán"
                                : item.trangThai === "HOAN_THANH"
                                  ? "Hoàn thành"
                                  : ""}
                    </span>
                  </div>
                  <div className="flex">
                    <h4>Thời gian :</h4>
                    <span>{formatDate(item.createAt)}</span>
                  </div>
                  <div className="flex">
                    <h4>Ghi chú:</h4>
                    <h4>{item.moTa}</h4>
                  </div>
                  <div className="flex">
                    <h4>Người thực hiện : </h4>
                    <span> {item.createBy}</span>
                  </div>
                  <hr className="border-orange-400" />
                </div>
              ))}
            </div>
            <button
              onClick={closeModalLSHD}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}
      {OpenModelXNTT && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <XacNhanThanhToan
            setGhiChu={setGhiChu}
            closeModalXNTT={closeModalXNTT}
            hoaDon={hoaDon}
            loadHoaDon={fillHoaDon}
            loadHoaDonCT={fillHoaDonChiTiet}
            loadLSHD={fillLichSuHoaDon}
          ></XacNhanThanhToan>
        </div>
      )}
      {OpenModelHuy && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalHuy}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChu"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChu"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateHuy}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelHoanHang && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalHoanHang}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>

              {/* Lý do hoàn hàng */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Lý do hoàn hàng
                </label>
                <div className="flex-wrap justify-between">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lyDoHoanHang"
                      value="Người nhận không nghe máy"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    Người nhận không nghe máy
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lyDoHoanHang"
                      value="Do sản phẩm bị lỗi"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    Do sản phẩm bị lỗi
                  </label>
                </div>
                <div className="flex-wrap justify-between">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lyDoHoanHang"
                      value="Khách hàng đặt nhầm kích thước"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                    />
                    Khách hàng đặt nhầm kích thước
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="lyDoHoanHang"
                      value="Lý do khác"
                      onChange={(e) => setGhiChu(e.target.value)}
                      className="mr-2"
                      checked
                    />
                    Lý do khác
                  </label>
                </div>
              </div>

              {/* Ghi chú */}
              <label
                htmlFor="ghiChuHoanHang"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuHoanHang"
                value={ghiChu} // Ghi chú sẽ hiển thị giá trị đã chọn từ radio button
                readOnly // Không cho phép chỉnh sửa ghi chú trực tiếp
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Ghi chú sẽ hiển thị tại đây..."
              ></textarea>
            </div>

            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateHoanHang}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelHoanHangTC && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalHoanHangTC}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuHoanHangTC"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuHoanHangTC"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateHoanHangTC}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelChoLayHang && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalChoLayHang}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuChoLayHang"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuChoLayHang"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateChoLayHang}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelChoGiao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalChoGiao}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuChoGiao"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuChoGiao"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateChoGiao}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelGiao && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalGiao}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuChoGiao"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuChoGiao"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateGiao}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelHT && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalHT}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuChoGiao"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuChoGiao"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateHoanThanh}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelXacNhan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            {/* Nút đóng modal */}
            <button
              onClick={closeModalXacNhan}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              X
            </button>
            {/* Nội dung modal */}
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Cập nhật hóa đơn
              </h3>
              <label
                htmlFor="ghiChuChoGiao"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChuChoGiao"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            {/* Nút cập nhật */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateXacNhan}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}
      {OpenModelQuayLaiTrangThaiTruoc && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[400px] rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={closeModalQuayLai}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              X
            </button>
            <div className="text-center">
              <h3 className="mb-4 text-lg font-bold text-gray-800">
                Quay lại trạng thái trước
              </h3>
              <label
                htmlFor="ghiChu"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ghi chú
              </label>
              <textarea
                id="ghiChu"
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full resize-none rounded border border-gray-300 p-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                rows="4"
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleSubmitUpdateQuayLai}
                className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}{" "}
      <div style={{ display: "none" }}>
        <ExportPDF idHoaDon={id} />
      </div>
    </div>
  );
};

export default HoaDonChiTiet;
