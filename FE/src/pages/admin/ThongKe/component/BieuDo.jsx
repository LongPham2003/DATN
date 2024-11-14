// RevenueChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const RevenueChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Doanh thu (USD)",
        data: [
          1200, 1900, 3000, 5000, 2500, 4200, 3800, 4600, 5200, 4300, 4100,
          5300,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Số lượng khách hàng",
        data: [150, 200, 250, 300, 220, 275, 290, 310, 330, 320, 315, 340],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu và Số lượng khách hàng theo tháng",
      },
    },
  };

  return (
    <div className="flex h-[500px] w-[700px] items-center justify-center">
      <div className="h-full w-full p-4">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
