import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import axios from "./../../../../api/axiosConfig";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
);

const RevenueChart = () => {
  const [Data, setData] = useState([]);
  const [optionType, setOptionType] = useState(1);
  let Api = `http://localhost:8080/api/thongke/bieudo/cacngaytrongtuan`;

  const ThongKe = async () => {
    try {
      const result = await axios.get(Api);
      setData(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ThongKe();
  }, []);

  const data = {
    labels: Data.map((item) => item.ngayTrongTuan),
    datasets: [
      ...(optionType === 1
        ? [
            {
              label: "Doanh thu (VNĐ)",
              data: Data.map((item) => item.tongTien),
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ]
        : []),
      ...(optionType === 2
        ? [
            {
              label: "Số lượng sản phẩm đã bán",
              data: Data.map((item) => item.sanPhamBanDuoc),
              backgroundColor: "rgba(153, 102, 255, 0.5)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ]
        : []),
    ],
  };

  const options1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tổng tiền theo tuần",
      },
    },
  };

  const options2 = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.5)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượng sản phẩm bán được trong tuần",
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setOptionType(1)}
        >
          Doanh thu các ngày trong tuần
        </button>
        <button
          className="rounded bg-green-500 px-4 py-2 text-white"
          onClick={() => setOptionType(2)}
        >
          Lượng sản phảm các ngày trong tuần
        </button>
      </div>
      <div className="flex h-[500px] w-[700px] items-center justify-center">
        <div className="h-full w-full p-4">
          <Bar data={data} options={optionType === 1 ? options1 : options2} />
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
