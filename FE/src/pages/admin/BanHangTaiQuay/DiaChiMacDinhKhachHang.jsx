/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

export default function DiaCHiMacDinhKhachHang({
  idKhachHang,
  giaoHang,
  setPhiGiaoHang,
  setNgayDuKien,
}) {
  const [diaChi, setDiaChi] = useState([]);
  const [TP, setTP] = useState([]);
  const [QH, setQH] = useState([]);
  const [xa, setXa] = useState([]);
  const [idTP, setIdTP] = useState("");
  const [idQH, setIdQH] = useState("");
  const [idXa, setIdXa] = useState("");
  const [soNha, setSoNha] = useState("");

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
  console.log(diaChi);

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
        console.log(idTP);
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
          console.log(idQH);
          setQH(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [diaChi?.huyenQuan, idTP]);

  // Lấy danh sách xã/phường dựa trên idQH
  useEffect(() => {
    if (idQH !== undefined && idQH !== "") {
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
          console.log(idXa);
          setXa(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [diaChi?.xaPhuong, idQH, idXa]);

  // phí ship
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
          console.log("phí ship: " + response.data.data.total);
          setPhiGiaoHang(response.data.data.total);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [idQH, idTP, idXa, setPhiGiaoHang, setNgayDuKien]);

  // thoi gian dự kiến giao hàng
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
  }, [idQH, idTP, idXa, setNgayDuKien]);

  // Xử lý khi thay đổi tỉnh/thành phố
  const handleChangeTP = (event) => {
    const selectedTP = event.target.value;
    setIdTP(selectedTP);
    setQH([]); // Xóa danh sách quận/huyện
    setXa([]); // Xóa danh sách xã/phường
    setIdQH(""); // Xóa giá trị quận/huyện
    setIdXa(""); // Xóa giá trị xã/phường
  };

  // Xử lý khi thay đổi quận/huyện
  const handleChangeQH = (event) => {
    const selectedQH = event.target.value;
    setIdQH(selectedQH);
    setXa([]); // Xóa danh sách xã/phường
    setIdXa(""); // Xóa giá trị xã/phường
  };

  // Xử lý khi thay đổi xã/phường
  const handleChangeXa = (event) => {
    setIdXa(event.target.value);
  };

  const handleSoNhaChange = (event) => {
    setSoNha(event.target.value); // Cập nhật giá trị khi người dùng nhập
  };

  return (
    <>
      {giaoHang && (
        <div>
          <span className="text-lg font-medium">Địa chỉ: </span>
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
        </div>
      )}
    </>
  );
}
