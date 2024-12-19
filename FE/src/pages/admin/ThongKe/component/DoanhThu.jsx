import { Button, DatePicker } from "antd";
import axios from "../../../../api/axiosConfig";
import { useEffect, useState } from "react";

export default function DoanhThu() {
  const [theoNgay, setTheoNgay] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [theoTuan, setTheoTuan] = useState();
  const [theoThang, setTheoThang] = useState();
  const [theoNam, setTheoNam] = useState();
  const [title, setTitle] = useState("Hôm Nay");

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
      setTitle("Hôm Nay");
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
    if (number == null) {
      return "0 VNĐ"; // Giá trị mặc định nếu `number` là null hoặc undefined
    }
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ`;
  };

  const handleDateChange = (date) => {
    if (date) {
      const localDate = date.toDate(); // Chuyển từ moment sang Date cục bộ
      const formattedDate = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;
      setSelectedDate(date);
      setTitle(`Ngày: ${formattedDate}`);
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
          className="rounded-md border-blue-600 shadow-md"
          onChange={handleDateChange}
          value={selectedDate}
        />
        <Button
          className="rounded-md bg-blue-600 text-white shadow-md hover:bg-blue-700"
          onClick={DoanhThu}
        >

          Hôm nay
        </Button>
      </div>
      {/* <div className="mx-10 flex h-auto gap-6">
        <div className="w-1/2">
          Theoo Ngay
          <div className="mb-4 h-[180px] rounded-md bg-gradient-to-r from-green-400 to-green-600 text-lg font-semibold text-white shadow-lg drop-shadow-2xl">
            <div className="flex justify-center">{title}</div>
            <div className="flex justify-center">
              {theoNgay ? formatTien(theoNgay.tongTien) : "Loading..."}
              {theoNgay.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">

              <div className="text-gray-200">San pham da ban</div>
              <div className="text-gray-200">Khach hang</div>
              <div className="text-gray-200">Khach le</div>
              <div className="text-gray-200">Don thanh cong</div>
              <div className="text-gray-200">Hoa don huy</div>

            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div className="text-gray-300">
                {" "}
                {theoNgay ? theoNgay.sanPhamBanDuoc : "Loading..."}
              </div>
              <div className="text-gray-300">
                {" "}
                {theoNgay ? theoNgay.tongKhachHang : "Loading..."}
              </div>
              <div className="text-gray-300">
                {" "}
                {theoNgay ? theoNgay.khachLe : "Loading..."}
              </div>
              <div className="text-gray-300">
                {" "}
                {theoNgay ? theoNgay.donThanhCong : "Loading..."}
              </div>
              <div className="text-gray-300">
                {" "}
                {theoNgay ? theoNgay.donHuy : "Loading..."}
              </div>
            </div>
          </div>

          Theo Tuan
          <div className="mb-4 h-[180px] rounded-md bg-gradient-to-r from-blue-400 to-blue-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Tuan Nay</div>
            <div className="flex justify-center">
              {theoTuan ? formatTien(theoTuan.tongTien) : "Loading..."}
              {theoTuan.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>Sản phẩm đã bán</div>
              <div>Khách hàng</div>
              <div>Khách lẻ</div>
              <div>Đơn thành công</div>
              <div>Hóa đơn hủy</div>
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
          Theoo Ngay
          <div className="mb-4 h-[180px] rounded-md bg-gradient-to-r from-yellow-400 to-yellow-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Thang Nay</div>
            <div className="flex justify-center">
              {theoThang ? formatTien(theoThang.tongTien) : "Loading..."}
              {theoThang.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>Sản phẩm đã bán</div>
              <div>Khách hàng</div>
              <div>Khách lẻ</div>
              <div>Đơn thành công</div>
              <div>Hóa đơn hủy</div>
            </div>
            <div className="mx-2 mt-2 flex justify-around gap-5">
              <div> {theoThang ? theoThang.sanPhamBanDuoc : "Loading..."}</div>
              <div> {theoThang ? theoThang.tongKhachHang : "Loading..."}</div>
              <div> {theoThang ? theoThang.khachLe : "Loading..."}</div>
              <div> {theoThang ? theoThang.donThanhCong : "Loading..."}</div>
              <div> {theoThang ? theoThang.donHuy : "Loading..."}</div>
            </div>
          </div>

          Theo Tuan
          <div className="mb-4 h-[180px] rounded-md bg-gradient-to-r from-red-400 to-red-600 text-lg font-semibold text-white shadow drop-shadow-2xl">
            <div className="flex justify-center">Nam Nay</div>
            <div className="flex justify-center">
              {" "}
              {theoNam ? formatTien(theoNam.tongTien) : "Loading..."}
              {theoNam.tongTien}
            </div>
            <div className="mx-2 mt-12 flex justify-between gap-5">
              <div>Sản phẩm đã bán</div>
              <div>Khách hàng</div>
              <div>Khách lẻ</div>
              <div>Đơn thành công</div>
              <div>Hóa đơn hủy</div>
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
      </div>  */}

      <div className="mb-10 flex justify-center rounded-md bg-gray-100 p-4 shadow-md">
        <div className="w-[300px] transition-shadow duration-500 hover:shadow-xl">
          <div className="card h-24 rounded-lg border-l-4 border-l-amber-500 bg-white shadow-lg">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-1 text-xs font-bold uppercase text-green-500">
                    Sản phẩm bán trong tháng
                  </div>
                  <div className="text-xl font-bold text-gray-800">
                    {theoThang ? theoThang.sanPhamBanDuoc : "Loading..."}
                  </div>
                </div>
                <div className="text-gray-300">
                  <i className="fas fa-dollar-sign text-3xl"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-10 flex h-auto gap-10">
          <div className="w-[300px] transition-shadow duration-300 hover:shadow-xl">
            <div className="card duration-s00 h-24 rounded-lg border-l-4 border-l-purple-500 bg-white shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1 text-xs font-bold uppercase text-purple-500">
                      Doanh Thu Ngày {title}
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {theoNgay ? formatTien(theoNgay.tongTien) : "0 VNĐ"}
                    </div>
                    <div className="text-sm">
                      {theoNgay ? theoNgay.donThanhCong : "Loading..."} đơn hàng
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <i className="fas fa-calendar text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[300px] transition-shadow duration-500 hover:shadow-xl">
            <div className="card h-24 rounded-lg border-l-4 border-l-green-500 bg-white shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1 text-xs font-bold uppercase text-green-500">
                      Doanh Thu Tháng
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {theoThang ? formatTien(theoThang.tongTien) : "0 VNĐ"}
                    </div>
                    <div className="text-sm">
                      {theoThang ? theoThang.donThanhCong : "Loading..."} đơn
                      hàng
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <i className="fas fa-dollar-sign text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[300px] transition-shadow duration-500 hover:shadow-xl">
            <div className="card h-24 rounded-lg border-l-4 border-l-yellow-500 bg-white shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="mb-1 text-xs font-bold uppercase text-yellow-500">
                      Doanh Thu Năm
                    </div>
                    <div className="text-xl font-bold text-gray-800">
                      {theoNam ? formatTien(theoNam.tongTien) : "0 VNĐ"}
                    </div>
                    <div className="text-sm">
                      {theoNam ? theoNam.donThanhCong : "Loading..."} đơn hàng
                    </div>
                  </div>
                  <div className="text-gray-300">
                    <i className="fas fa-chart-line text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
