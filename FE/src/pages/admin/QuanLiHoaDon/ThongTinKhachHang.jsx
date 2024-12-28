import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const ThongTinKhachHang = ({ hoaDon, fillHoaDon, fillHoaDonChiTiet }) => {
  const [TP, setTP] = useState([]);
  const [QH, setQH] = useState([]);
  const [xa, setXa] = useState([]);
  const [idTP, setIdTP] = useState(null);
  const [tenTP, setTenTP] = useState(null);
  const [idQH, setIdQH] = useState(null);
  const [tenQH, setTenQH] = useState("");
  const [idXa, setIdXa] = useState("");
  const [tenXa, setTenXA] = useState("");
  const [soNha, setSoNha] = useState("");
  const [phiGiaoHang, setPhiGiaoHang] = useState(0);
  const [ngayDuKien, setNgayDuKien] = useState(null);
  const [diaChiGiaoHang, setDiaChiGiaoHang] = useState("");

  const [OpenModelCapNhatThongTin, setOpenModelCapNhatThongTin] =
    useState(false);
  const openModelCapNhatThongTin = () => {
    setOpenModelCapNhatThongTin(true);
  };
  const closeModelCapNhatThongTin = async () => {
    setOpenModelCapNhatThongTin(false);
  };
  const id = hoaDon.id;
  const handleSoNhaChange = (event) => {
    setSoNha(event.target.value); // Cập nhật giá trị khi người dùng nhập
  };

  const [formData, setFormData] = useState({
    hoTen: "",
    sdt: "",
  });

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

  useEffect(() => {
    if (OpenModelCapNhatThongTin) {
      setFormData({
        hoTen: hoaDon.tenKhachHang || "",
        sdt: hoaDon.soDienThoai || "",
      });
    }
  }, [OpenModelCapNhatThongTin, hoaDon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Kiểm tra chuỗi đầu vào
  useEffect(() => {
    const diaChi = hoaDon.diaChiGiaoHang;
    console.log(diaChi);
    // Kiểm tra chuỗi đầu vào
    if (!diaChi || typeof diaChi !== "string") {
      console.error("Địa chỉ không hợp lệ");
      return;
    }

    // Tách chuỗi thành các phần
    const parts = diaChi.split(" - ");
    setSoNha(parts[0] || "Không có số nhà");
    setTenXA(parts[1] || "Không có xã");
    setTenQH(parts[2] || "Không có huyện");
    setTenTP(parts[3] || "Không có tỉnh");
  }, [hoaDon]);

  // Lấy danh sách tỉnh/thành phố
  useEffect(() => {
    if (OpenModelCapNhatThongTin === true) {
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
          setTP(response.data.data); // Gán toàn bộ danh sách tỉnh/thành phố
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [OpenModelCapNhatThongTin]);
  // // Lấy danh sách quận/huyện dựa trên idTP
  useEffect(() => {
    if (OpenModelCapNhatThongTin === true && idTP !== undefined) {
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
          setQH(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [OpenModelCapNhatThongTin, idTP]);

  // // // Lấy danh sách xã/phường dựa trên idQH
  useEffect(() => {
    if (OpenModelCapNhatThongTin === true && idQH != undefined && idQH != "") {
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
          setXa(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [OpenModelCapNhatThongTin, idQH]);

  // // phí ship
  useEffect(() => {
    if (
      OpenModelCapNhatThongTin === true &&
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
              weight: 500, // cân nặng g
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
  }, [idQH, idTP, idXa]);

  // // thoi gian dự kiến giao hàng
  useEffect(() => {
    if (
      OpenModelCapNhatThongTin === true &&
      idTP !== undefined &&
      idQH !== undefined &&
      idXa !== undefined &&
      idTP !== "" &&
      idQH !== "" &&
      idXa !== ""
    ) {
      axios
        .get(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
          {
            params: {
              from_district_id: 1581,
              from_ward_code: "1B2912",
              to_district_id: idQH,
              to_ward_code: idXa,
              service_id: 53321,
            },
            headers: {
              "Content-Type": "application/json",
              Token: "0555d4e1-a37c-11ef-8e53-0a00184fe694",
              shop_id: 195353,
            },
          },
        )
        .then((response) => {
          const leadtime = new Date(response.data.data.leadtime * 1000);
          const day = leadtime.getDate();
          const month = leadtime.getMonth() + 1;
          const year = leadtime.getFullYear();
          const formattedLeadtime = `${day}/${month}/${year}`;
          setNgayDuKien(formattedLeadtime);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idQH, idTP, idXa]);
  // Khi thay đổi tỉnh/thành phố
  const handleChangeTP = (event) => {
    const selectedTP = event.target.value;
    setIdTP(selectedTP);
    console.log(TP);
    const tenTP =
      TP.find((tp) => tp.ProvinceID == selectedTP)?.ProvinceName || "Lỗi"; // Sử dụng `selectedTP` thay vì `idTP`
    setTenTP(tenTP);
    console.log("idtp" + selectedTP);
    console.log("long" + tenTP);
    // Xóa quận/huyện và xã/phường khi tỉnh/thành phố thay đổi
    setIdQH("");
    setQH([]);
    setIdXa("");
    setXa([]);
  };

  const handleChangeQH = (event) => {
    const selectedQH = event.target.value;
    setIdQH(selectedQH);
    console.log(QH);
    const tenQH =
      QH.find((qh) => qh.DistrictID == selectedQH)?.DistrictName || "Lỗi"; // Sử dụng `selectedQH` thay vì `idQH`
    setTenQH(tenQH);
    console.log("idtp" + selectedQH);
    console.log("long" + tenQH);
    // Xóa xã/phường khi quận/huyện thay đổi
    setIdXa("");
    setXa([]);
  };

  const handleChangeXa = (event) => {
    const selectedXa = event.target.value;
    setIdXa(selectedXa);
    console.log(xa);
    const tenXa = xa.find((x) => x.WardCode == selectedXa)?.WardName || ""; // Sử dụng `selectedXa` thay vì `idXa`
    setTenXA(tenXa);
    console.log("idtp" + selectedXa);
    console.log("long" + tenXa);
  };
  useEffect(() => {
    const tenTP = TP.find((tp) => tp.ProvinceID == idTP)?.ProvinceName || "";
    const tenQH = QH.find((qh) => qh.DistrictID == idQH)?.DistrictName || "";
    const tenXa = xa.find((x) => x.WardCode == idXa)?.WardName || "";

    const diaChiHoanChinh = [soNha, tenXa, tenQH, tenTP]
      .filter(Boolean)
      .join(" - "); // Chỉ thêm vào nếu giá trị không phải null
    setDiaChiGiaoHang(diaChiHoanChinh); // Cập nhật địa chỉ giao hàng trong state
  }, [idTP, idQH, idXa, soNha, TP, QH, xa, tenQH, tenTP, tenXa]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form

    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật hóa đơn này không?",
      onOk() {
        axios
          .post(`http://localhost:8080/api/hoadon/updateadmin/${id}`, {
            tenKhachHang: formData.hoTen,
            soDienThoai: formData.sdt,
            phiVanChuyen: phiGiaoHang,
            ngayDuKien: ngayDuKien,
            diaChiGiaoHang: diaChiGiaoHang,
          })
          .then((response) => {
            console.log("Cập nhật thành công:", response.data);
            toast.success("Thành công");
            closeModelCapNhatThongTin();
            fillHoaDonChiTiet();
            fillHoaDon();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      },
      onCancel() {
        // Nếu người dùng hủy, có thể không cần làm gì cả
      },
    });
  };
  return (
    <div>
      <div>
        <h3 className="text-[20px] font-bold text-pink-500">
          Thông Tin Khách Hàng
        </h3>
        <div className="mx-4 flex gap-10 text-lg">
          {/* Cột trái */}
          <div className="w-1/2 space-y-4 border-r pr-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Tên khách hàng:</span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.tenKhachHang}
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">Số điện thoại:</span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.soDienThoai}
              </h3>
            </div>
          </div>

          {/* Cột phải */}
          <div className="w-1/2 space-y-4 pl-4">
            <div className="flex items-center justify-end">
              <button
                onClick={openModelCapNhatThongTin}
                className="rounded bg-blue-500 px-2 text-white"
              >
                Cập nhật thông tin
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-600">
                Địa chỉ giao hàng:
              </span>
              <h3 className="font-semibold text-gray-800">
                {hoaDon.diaChiGiaoHang || "Không có"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      {OpenModelCapNhatThongTin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mt-[-400px] w-full max-w-[600px] rounded-lg bg-white p-6 shadow-lg">
            {/* Tiêu đề */}
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Cập nhật thông tin người dùng
            </h3>

            {/* Form cập nhật thông tin */}
            <form className="space-y-4">
              {/* Tên */}
              <div className="flex space-x-4 p-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tên người nhận
                  </label>
                  <input
                    type="text"
                    value={formData.hoTen}
                    onChange={handleChange}
                    name="hoTen"
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="Nhập tên người nhận"
                  />
                </div>

                {/* Số điện thoại */}
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={formData.sdt}
                    onChange={handleChange}
                    name="sdt"
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="w-full p-2 sm:w-1/2">
                  <label className="mb-1 block">Tỉnh/Thành Phố:</label>
                  <select
                    value={idTP}
                    onChange={handleChangeTP}
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {TP.map((thanhPho) => (
                      <option
                        key={thanhPho.ProvinceID}
                        value={thanhPho.ProvinceID}
                      >
                        {thanhPho.ProvinceName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full p-2 sm:w-1/2">
                  <label className="mb-1 block">Quận/Huyện:</label>
                  <select
                    value={idQH}
                    onChange={handleChangeQH}
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    required
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {QH.map((quanHuyen) => (
                      <option
                        key={quanHuyen.DistrictID}
                        value={quanHuyen.DistrictID}
                      >
                        {quanHuyen.DistrictName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex">
                <div className="w-full p-2 sm:w-1/2">
                  <label className="mb-1 block">Xã:</label>
                  <select
                    value={idXa}
                    onChange={handleChangeXa}
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    required
                  >
                    <option value="">Chọn xã</option>
                    {xa.map((xaItem) => (
                      <option key={xaItem.WardCode} value={xaItem.WardCode}>
                        {xaItem.WardName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full p-2 sm:w-1/2">
                  <label className="mb-1 block">Số Nhà :</label>
                  <input
                    type="text"
                    value={soNha}
                    onChange={handleSoNhaChange} // Cập nhật state khi người dùng nhập
                    className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <label className="mb-1 block">Địa chỉ giao hàng:</label>
                <input
                  type="text"
                  value={diaChiGiaoHang}
                  readOnly
                  className="w-full rounded border bg-gray-100 p-2"
                />
              </div>
              <div className="space-y-3 p-2">
                <h3>Phí giao hàng: {formatTien(phiGiaoHang)}</h3>
                <h3>Thời gian dự kiến: {ngayDuKien}</h3>
              </div>
              {/* Nút hành động */}
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeModelCapNhatThongTin}
                  className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Cập nhật
                </button>
              </div>
            </form>

            {/* Nút đóng modal */}
            <button
              onClick={closeModelCapNhatThongTin}
              className="absolute right-2 top-2 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ThongTinKhachHang;
