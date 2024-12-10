/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export default function DiaCHiMacDinhKhachHang({
  idKhachHang,
  giaoHang,
  setPhiGiaoHang,
  setNgayDuKien,
  setdiaChiGiaoHang,
  soLuongSanPham,
  tongTien,
}) {
  const [diaChi, setDiaChi] = useState([]);
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
  const [diaChiGiaoHang, setDiaChiGiaoHang] = useState("");

  const ApiLayDiaChi = `http://localhost:8080/diachi/diachimacdinh/${idKhachHang}`;

  // Lấy địa chỉ mặc định của khách hàng
  useEffect(() => {
    axios
      .get(ApiLayDiaChi)
      .then((response) => {
        setDiaChi(response.data.result);
        setSoNha(response.data.result.soNhaDuongThonXom);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ApiLayDiaChi, idKhachHang]);
  // console.log(diaChi);

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
        const id_tp = response.data.data.find((item) =>
          item.NameExtension.some((extension) =>
            diaChi?.tinhThanhPho?.includes(extension),
          ),
        )?.ProvinceID;
        setIdTP(id_tp);
        setTP(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [diaChi?.tinhThanhPho]);
  // Lấy danh sách quận/huyện dựa trên idTP
  useEffect(() => {
    if (idTP !== undefined) {
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
            item.NameExtension.some((extension) =>
              diaChi?.huyenQuan?.includes(extension),
            ),
          )?.DistrictID;
          setIdQH(id_qh);
          setQH(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [diaChi?.huyenQuan, idTP]);

  // Lấy danh sách xã/phường dựa trên idQH
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
            item.NameExtension.some((extension) =>
              diaChi?.xaPhuong?.includes(extension),
            ),
          )?.WardCode;
          setIdXa(id_xa);
          setXa(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [diaChi?.xaPhuong, idQH]);

  // phí ship
  useEffect(() => {
    if (
      giaoHang === true &&
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
              weight: 300 * soLuongSanPham, // cân nặng g
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
          setPhiGiaoHang(response.data.data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idQH, idTP, idXa, setPhiGiaoHang, giaoHang, soLuongSanPham, tongTien]);

  // thoi gian dự kiến giao hàng
  useEffect(() => {
    if (
      giaoHang === true &&
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
  }, [idQH, idTP, idXa, setNgayDuKien, giaoHang]);

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

  const handleSoNhaChange = (event) => {
    setSoNha(event.target.value); // Cập nhật giá trị khi người dùng nhập
  };

  useEffect(() => {
    const tenTP = TP.find((tp) => tp.ProvinceID == idTP)?.ProvinceName || "";
    const tenQH = QH.find((qh) => qh.DistrictID == idQH)?.DistrictName || "";
    const tenXa = xa.find((x) => x.WardCode == idXa)?.WardName || "";

    const diaChiHoanChinh = `${soNha} - ${tenXa} - ${tenQH} - ${tenTP}`;
    setDiaChiGiaoHang(diaChiHoanChinh); // Cập nhật địa chỉ giao hàng trong state
    setdiaChiGiaoHang(diaChiHoanChinh); // Cập nhật địa chỉ giao hàng trong props
  }, [
    idTP,
    idQH,
    idXa,
    soNha,
    TP,
    QH,
    xa,
    setdiaChiGiaoHang,
    tenQH,
    tenTP,
    tenXa,
  ]);

  return (
    <>
      {giaoHang && (
        <div className="font-medium">
          <span className="text-lg font-bold">Địa chỉ: </span>
          <div className="flex">
            <div className="w-full p-2 sm:w-1/2">
              <label className="mb-1 block">Tỉnh/Thành Phố:</label>
              <select
                value={idTP}
                onChange={handleChangeTP}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                {TP.map((thanhPho) => (
                  <option key={thanhPho.ProvinceID} value={thanhPho.ProvinceID}>
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
                className="w-full rounded border p-2"
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
                className="w-full rounded border p-2"
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
                className="w-full rounded border p-2"
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
        </div>
      )}
    </>
  );
}
