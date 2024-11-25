import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import axios from "../../../api/axiosConfig";
import { useEffect, useState } from "react";
import {
  FaCar,
  FaCheck,
  FaCheckCircle,
  FaHourglassStart,
  FaStackOverflow,
  FaTruck,
} from "react-icons/fa";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import ThongTinHoaDon from "./ThongTinHoaDon";
import ThongTinKhachHang from "./ThongTinKhachHang";
import XacNhanThanhToan from "./XacNhanThanhToan";
const HoaDonChiTiet = () => {
  const { id } = useParams();
  const [hoaDon, setHoaDon] = useState([]);
  const [lichSuHoaDon, setLichSuHoaDon] = useState([]);
  const [hoaDonChiTiet, setHoaDonChiTiet] = useState([]);
  const [ghiChu, setGhiChu] = useState("");

  // model lịch sử hóa đơn
  const [OpenModelLSHD, setOpenModelLSHD] = useState(false);
  const openModalLSHD = () => {
    setOpenModelLSHD(true);
  };
  const closeModalLSHD = async () => {
    setOpenModelLSHD(false);
  };

  // model xác nhận thanh toán
  const [OpenModelXNTT, setOpenModelXNTT] = useState(false);
  const openModalXNTT = () => {
    setOpenModelXNTT(true);
  };
  const closeModalXNTT = async () => {
    setOpenModelXNTT(false);
  };

  // model update chờ giao
  const [OpenModelXacNhan, setOpenModelXacNhan] = useState(false);
  const openModalXacNhan = () => {
    setOpenModelXacNhan(true);
  };
  const closeModalXacNhan = async () => {
    setOpenModelXacNhan(false);
  };

  // model update chờ giao
  const [OpenModelChoGiao, setOpenModelChoGiao] = useState(false);
  const openModalChoGiao = () => {
    setOpenModelChoGiao(true);
  };
  const closeModalChoGiao = async () => {
    setOpenModelChoGiao(false);
  };
  // model update  giao
  const [OpenModelGiao, setOpenModelGiao] = useState(false);
  const openModalGiao = () => {
    setOpenModelGiao(true);
  };
  const closeModalGiao = async () => {
    setOpenModelGiao(false);
  };

  // model update  giao
  const [OpenModelHT, setOpenModelHT] = useState(false);
  const openModalHT = () => {
    setOpenModelHT(true);
  };
  const closeModalHT = async () => {
    setOpenModelHT(false);
  };

  const fillHoaDon = () => {
    axios
      .get(`http://localhost:8080/api/hoadon/${id}`)
      .then((res) => {
        setHoaDon(res.data.result);
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

  console.log(thanhToan);
  console.log(lichSuHoaDon);
  console.log(hoaDon);

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

  const handleSubmitUpdateChoGiao = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/chogiaohang/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalChoGiao();
            fillHoaDon();
            fillHoaDonChiTiet();
            fillLichSuHoaDon();
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
      content: "Bạn có chắc chắn muốn cập  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/danggiao/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalGiao();
            fillHoaDon();
            fillHoaDonChiTiet();
            fillLichSuHoaDon();
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
      content: "Bạn có chắc chắn muốn cập  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/xacnhan/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalXacNhan();
            fillHoaDon();
            fillHoaDonChiTiet();
            fillLichSuHoaDon();
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
      content: "Bạn có chắc chắn muốn cập  không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/hoanthanh/${id}`, {
            ghiChu: ghiChu,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModalHT();
            fillHoaDon();
            fillHoaDonChiTiet();
            fillLichSuHoaDon();
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

  return (
    <div className="mx-3 py-3">
      <Timeline minEvents={6} placeholder>
        {lichSuHoaDon.map((item, index) => (
          <TimelineEvent
            key={index}
            icon={
              item.trangThai === "CHO_XAC_NHAN"
                ? FaHourglassStart
                : item.trangThai === "DA_XAC_NHAN"
                  ? FaCheck
                  : item.trangThai === "CHO_GIAO_HANG"
                    ? FaCar
                    : item.trangThai === "DANG_GIAO"
                      ? FaTruck
                      : item.trangThai === "DA_THANH_TOAN"
                        ? FaStackOverflow
                        : item.trangThai === "HOAN_THANH"
                          ? FaCheckCircle
                          : ""
            }
            color={
              item.trangThai === "CHO_XAC_NHAN"
                ? "#FFFF33"
                : item.trangThai === "DA_XAC_NHAN"
                  ? "#33FF33"
                  : item.trangThai === "CHO_GIAO_HANG"
                    ? "#9999CC"
                    : item.trangThai === "DANG_GIAO"
                      ? "#6699FF"
                      : item.trangThai === "DA_THANH_TOAN"
                        ? "#99FF00"
                        : item.trangThai === "HOAN_THANH"
                          ? "#99FF00"
                          : ""
            }
            subtitle={formatDate(item.createAt)}
            title={
              item.trangThai === "CHO_XAC_NHAN"
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
                          : ""
            }
          ></TimelineEvent>
        ))}
      </Timeline>
      <hr className="mb-2" />
      <div className="mx-10 flex justify-between">
        <div>
          {hoaDon.trangThai === "Chờ Xác Nhận" && (
            <button
              onClick={openModalXacNhan}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Xác nhận
            </button>
          )}
          {hoaDon.trangThai === "Đã xác nhận đơn" && (
            <button
              onClick={openModalChoGiao}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Chờ vẫn chuyển
            </button>
          )}
          {hoaDon.trangThai === "Chờ đơn vị vẫn chuyển" && (
            <button
              onClick={openModalGiao}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Giao hàng
            </button>
          )}

          {hoaDon.trangThai === "Đơn đang trên đường giao hàng" && (
            <button
              onClick={openModalHT}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Hoàn thành
            </button>
          )}

          {hoaDon.trangThai === "Hoàn thành" && (
            <button className="rounded bg-blue-500 px-2 py-1 text-white">
              Xuất Hóa Đơn
            </button>
          )}
          {hoaDon.trangThai === "Đã thanh toán" && (
            <button
              onClick={openModalHT}
              className="rounded bg-blue-500 px-2 py-1 text-white"
            >
              Hoàn thành
            </button>
          )}
        </div>
        <button
          className="rounded bg-blue-500 px-2 py-1 text-white"
          onClick={openModalLSHD}
        >
          Lịch sử hóa đơn
        </button>
      </div>
      <hr className="my-2" />
      <div className="my-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-pink-500">
            Lịch sử thanh toán
          </h2>

          <button
            onClick={openModalXNTT}
            className="rounded bg-blue-500 px-2 py-2 text-white"
          >
            Xác nhận thanh toán
          </button>
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
        ></ThongTinHoaDon>
      </div>
      <hr className="border-s-pink-700" />
      <div className="my-3">
        <ThongTinKhachHang hoaDon={hoaDon}></ThongTinKhachHang>
      </div>
      <ToastContainer
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
      />
      {OpenModelLSHD && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[525px] max-h-[600px] w-[400px] justify-between overflow-y-auto rounded-lg bg-white p-8">
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
      {OpenModelChoGiao && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[300px] w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Cập nhật hóa đơn</h3>
              <label className="pt-3">Ghi chú</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4" // Số dòng hiển thị
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={handleSubmitUpdateChoGiao}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <button
              onClick={closeModalChoGiao}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}
      {OpenModelGiao && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[300px] w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Cập nhật hóa đơn</h3>
              <label className="pt-3">Ghi chú</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4" // Số dòng hiển thị
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={handleSubmitUpdateGiao}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <button
              onClick={closeModalGiao}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}{" "}
      {OpenModelHT && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[300px] w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Cập nhật hóa đơn</h3>
              <label className="pt-3">Ghi chú</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4" // Số dòng hiển thị
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={handleSubmitUpdateHoanThanh}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <button
              onClick={closeModalHT}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}
      {OpenModelXacNhan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex h-[300px] w-[400px] justify-between rounded-lg bg-white p-8">
            <div className="font-bold">
              <h3 className="mb-3">Cập nhật hóa đơn</h3>
              <label className="pt-3">Ghi chú</label>
              <textarea
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full rounded border p-2"
                rows="4" // Số dòng hiển thị
                placeholder="Nhập ghi chú tại đây..."
              ></textarea>
              <div className="mx-auto my-3 flex justify-center">
                <button
                  onClick={handleSubmitUpdateXacNhan}
                  className="rounded bg-blue-500 px-2 py-2 text-white"
                >
                  Cập nhật
                </button>
              </div>
            </div>
            <button
              onClick={closeModalXacNhan}
              className="h-10 rounded bg-red-500 px-4 text-white hover:bg-red-600"
            >
              X
            </button>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default HoaDonChiTiet;
