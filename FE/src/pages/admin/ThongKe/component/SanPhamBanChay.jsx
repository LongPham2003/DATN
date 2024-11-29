import { Button, DatePicker } from "antd";
import axios from "./../../../../api/axiosConfig";
import { useEffect, useState } from "react";
import LayANhTheoIDSP from "./../../SanPham/Product/LayANhTheoIDSP";
export default function SanPhamBanChay() {
  const [ListSP, setListSP] = useState([]);
  const [activeButton, setActiveButton] = useState("homNay");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  let APISPBanChayHomNay = `http://localhost:8080/api/thongke/spbanchay/homnay`;
  let APISPBanChayTuanNay = `http://localhost:8080/api/thongke/spbanchay/tuannay`;
  let APISPBanChayThangNay = `http://localhost:8080/api/thongke/spbanchay/thangnay`;
  let APISPBanChayNamNay = `http://localhost:8080/api/thongke/spbanchay/namnay`;
  let ApiTheoNgay = `http://localhost:8080/api/thongke/sanphambanchay/khoangngay`;

  const LaySP = async (type, startDateString, endDateString) => {
    let apiUrl;
    switch (type) {
      case "homNay":
        apiUrl = APISPBanChayHomNay;
        break;
      case "tuanNay":
        apiUrl = APISPBanChayTuanNay;
        break;
      case "thangNay":
        apiUrl = APISPBanChayThangNay;
        break;
      case "namNay":
        apiUrl = APISPBanChayNamNay;
        break;
      case "khoangngay":
        apiUrl = `${ApiTheoNgay}?startDate=${startDateString}&endDate=${endDateString}`;
        break;
      default:
        return;
    }

    try {
      const response = await axios.get(apiUrl);
      console.log("API Response:", response.data); // Log phản hồi từ API
      switch (type) {
        case "homNay":
          setListSP(response.data);
          break;
        case "tuanNay":
          setListSP(response.data);
          break;
        case "thangNay":
          setListSP(response.data);
          break;
        case "namNay":
          setListSP(response.data);
          break;
        case "khoangngay":
          setListSP(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatTien = (number) => {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`;
  };

  const handleDateChange = (dates, dateStrings) => {
    console.log("Date Strings:", dateStrings); // Log dateStrings

    // Chuyển đổi sang đối tượng Date, nếu không hợp lệ thì gán null
    const startDate = dateStrings[0] ? new Date(dateStrings[0]) : null;
    const endDate = dateStrings[1] ? new Date(dateStrings[1]) : null;

    // Kiểm tra xem startDate và endDate có hợp lệ không
    if (startDate && endDate && !isNaN(startDate) && !isNaN(endDate)) {
      setTimeout(() => {
        // Chuyển đổi lại thành chuỗi ISO để truyền vào URL
        const startDateString = startDate.toISOString().split("T")[0]; // Chỉ lấy phần ngày
        const endDateString = endDate.toISOString().split("T")[0]; // Chỉ lấy phần ngày

        // Kiểm tra nếu ngày bắt đầu và ngày kết thúc là cùng một ngày
        if (startDateString === endDateString) {
          // Nếu cùng ngày, gọi API với tham số "homNay"
          LaySP("homNay");
        } else {
          LaySP("khoangngay", startDateString, endDateString); // Gọi hàm với tham số "khoangngay" và các ngày
        }
      }, 500); // Thời gian chờ 500ms
    }
  };

  useEffect(() => {
    LaySP("homNay");
  }, []);
  return (
    <>
      <div className="mb-2 text-center text-xl font-semibold">
        San pham ban chay
      </div>
      <div className="flex gap-2">
        <Button
          className={`focus:bg-yellow-500 ${activeButton === "homNay" ? "bg-yellow-500 text-white" : "text-black"}`}
          onClick={() => {
            LaySP("homNay");
            setActiveButton("homNay");
          }}
        >
          Hôm nay
        </Button>
        <Button
          className={`focus:bg-yellow-500 ${activeButton === "tuanNay" ? "bg-yellow-500 text-white" : "text-black"}`}
          onClick={() => {
            LaySP("tuanNay");
            setActiveButton("tuanNay");
          }}
        >
          Tuần này
        </Button>
        <Button
          className={`focus:bg-yellow-500 ${activeButton === "thangNay" ? "bg-yellow-500 text-white" : "text-black"}`}
          onClick={() => {
            LaySP("thangNay");
            setActiveButton("thangNay");
          }}
        >
          Tháng này
        </Button>
        <Button
          className={`focus:bg-yellow-500 ${activeButton === "namNay" ? "bg-yellow-500 text-white" : "text-black"}`}
          onClick={() => {
            LaySP("namNay");
            setActiveButton("namNay");
          }}
        >
          Năm nay
        </Button>

        <DatePicker.RangePicker
          format="YYYY-MM-DD"
          onChange={handleDateChange}
        />
      </div>
      <div className="mt-2">
        <table>
          <thead className="h-10 border-b-2 bg-slate-100">
            <tr className="drop-shadow-2xl">
              <th className="w-12 border-r-[1px]">STT</th>
              <th className="w-[230px] border-r-[1px]">Anh</th>
              <th className="w-[360px] border-r-[1px]">San Pham</th>
              <th className="w-[170px]">So Luong Ban Duoc</th>
            </tr>
          </thead>
          <tbody>
            {ListSP
              ? ListSP.map((item, index) => (
                  <tr key={index} className="border-b-2 text-center">
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex justify-center">
                        <LayANhTheoIDSP
                          id={item.idSPCTBanChayNhat}
                          className="h-[130px] w-[130px]"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="ml-[100px] text-left">
                        <b>
                          {item.tenSanPham}
                          <div className="text-red-500">
                            {formatTien(item.giaThapNhat)} -{" "}
                            {formatTien(item.giaCaoNhat)}
                          </div>
                        </b>
                        <div className="font-light">Loại: {item.tenLoai}</div>
                        <div className="font-light">
                          Thương hiệu: {item.tenThuongHieuBanChay}
                        </div>
                      </div>
                    </td>
                    <td>{item.tongSoLuongBanDuoc}</td>
                  </tr>
                ))
              : "Hôm nay chưa bán gì"}
          </tbody>
        </table>
      </div>
    </>
  );
}
