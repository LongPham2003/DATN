import { Button } from "antd";
import axios from "./../../../api/axiosConfig";
import { useEffect, useState } from "react";
import DoanhThu from "./component/DoanhThu";
import SanPhamBanChay from "./component/SanPhamBanChay";
import RevenueChart from "./component/BieuDo";

export default function ThongKe() {
  return (
    <>
      <div className="h-auto overflow-y-auto">
        <div className="mb-5 mt-2 flex justify-center font-mono text-2xl font-bold">
          Thống kê doanh thu
        </div>
        <div>
          <DoanhThu />
        </div>

        <div className="mx-2 flex gap-3">
          <div className="w-1/2">
            <SanPhamBanChay />
          </div>
          <div className="w-1/2">
            <div>
              <RevenueChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
