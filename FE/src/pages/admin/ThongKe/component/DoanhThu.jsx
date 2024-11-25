import { Button, DatePicker } from "antd";
import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";

export default function DoanhThu() {
  const [theoNgay, setTheoNgay] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [theoTuan, setTheoTuan] = useState();
  const [theoThang, setTheoThang] = useState();
  const [theoNam, setTheoNam] = useState();

  const ApiNgayTuyChinh = `http://localhost:8080/api/thongke/ngay-tuy-chinh`;
  const ApiTheoNgay = `http://localhost:8080/api/thongke/ngay-hom-nay`;
  const ApiTheoTuan = `http://localhost:8080/api/thongke/tuan`;
  const ApiTheoThang = `http://localhost:8080/api/thongke/thang`;
  const ApiTheoNam = `http://localhost:8080/api/thongke/nam`;

  const DoanhThu = async () => {
    try {
      const [ngay, tuan, thang, nam] = await Promise.all([
        axios.get(ApiTheoNgay),
        axios.get(ApiTheoTuan),
        axios.get(ApiTheoThang),
        axios.get(ApiTheoNam),
      ]);

      setTheoNgay(ngay.data);
      setTheoTuan(tuan.data);
      setTheoThang(thang.data);
      setTheoNam(nam.data);
      setSelectedDate("");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const formatTien = (number) => {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      fetchData(formattedDate);
    }
  };

  const fetchData = async (date) => {
    try {
      const response = await axios.get(`${ApiNgayTuyChinh}?date=${date}`);
      setTheoNgay(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    DoanhThu();
  }, []);
  return (
    <>
      <div className="mb-4 ml-10 flex gap-3">
        <DatePicker
          className="border-blue-600"
          onChange={handleDateChange}
          value={selectedDate}
        />
        <Button className="border-blue-600" onClick={DoanhThu}>
          Hôm nay
        </Button>
      </div>
      <div className="mx-10 flex h-auto gap-6">
        <div className="w-1/2">
          {/* Theoo Ngay */}
          <div className="mb-4 h-[180px] rounded-md bg-blue-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Hom Nay</div>
            <div className="flex justify-center">
              {/* {theoNgay ? formatTien(theoNgay.tongTien) : "Loading..."} */}
              {/* {theoNgay.tongTien} */}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>San pham da ban</div>
              <div>Khach hang</div>
              <div>Khach le</div>
              <div>Don thanh cong</div>
              <div>Hoa don huy</div>
            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div> {theoNgay ? theoNgay.sanPhamBanDuoc : "Loading..."}</div>
              <div> {theoNgay ? theoNgay.tongKhachHang : "Loading..."}</div>
              <div> {theoNgay ? theoNgay.khachLe : "Loading..."}</div>
              <div> {theoNgay ? theoNgay.donThanhCong : "Loading..."}</div>
              <div> {theoNgay ? theoNgay.donHuy : "Loading..."}</div>
            </div>
          </div>

          {/* Theo Tuan */}
          <div className="mb-4 h-[180px] rounded-md bg-blue-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Tuan Nay</div>
            <div className="flex justify-center">
              {/* {theoTuan ? formatTien(theoTuan.tongTien) : "Loading..."} */}
              {theoTuan.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>San pham da ban</div>
              <div>Khach hang</div>
              <div>Khach le</div>
              <div>Don thanh cong</div>
              <div>Hoa don huy</div>
            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div> {theoTuan ? theoTuan.sanPhamBanDuoc : "Loading..."}</div>
              <div> {theoTuan ? theoTuan.tongKhachHang : "Loading..."}</div>
              <div> {theoTuan ? theoTuan.khachLe : "Loading..."}</div>
              <div> {theoTuan ? theoTuan.donThanhCong : "Loading..."}</div>
              <div> {theoTuan ? theoTuan.donHuy : "Loading..."}</div>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          {/* Theoo Ngay */}
          <div className="mb-4 h-[180px] rounded-md bg-blue-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Thang Nay</div>
            <div className="flex justify-center">
              {/* {theoThang ? formatTien(theoThang.tongTien) : "Loading..."} */}
              {theoThang.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>San pham da ban</div>
              <div>Khach hang</div>
              <div>Khach le</div>
              <div>Don thanh cong</div>
              <div>Hoa don huy</div>
            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div> {theoThang ? theoThang.sanPhamBanDuoc : "Loading..."}</div>
              <div> {theoThang ? theoThang.tongKhachHang : "Loading..."}</div>
              <div> {theoThang ? theoThang.khachLe : "Loading..."}</div>
              <div> {theoThang ? theoThang.donThanhCong : "Loading..."}</div>
              <div> {theoThang ? theoThang.donHuy : "Loading..."}</div>
            </div>
          </div>

          {/* Theo Tuan */}
          <div className="mb-4 h-[180px] rounded-md bg-blue-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Nam Nay</div>
            <div className="flex justify-center">
              {" "}
              {/* {theoNam ? formatTien(theoNam.tongTien) : "Loading..."} */}
              {theoNam.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>San pham da ban</div>
              <div>Khach hang</div>
              <div>Khach le</div>
              <div>Don thanh cong</div>
              <div>Hoa don huy</div>
            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div> {theoNam ? theoNam.sanPhamBanDuoc : "Loading..."}</div>
              <div> {theoNam ? theoNam.tongKhachHang : "Loading..."}</div>
              <div> {theoNam ? theoNam.khachLe : "Loading..."}</div>
              <div> {theoNam ? theoNam.donThanhCong : "Loading..."}</div>
              <div> {theoNam ? theoNam.donHuy : "Loading..."}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
