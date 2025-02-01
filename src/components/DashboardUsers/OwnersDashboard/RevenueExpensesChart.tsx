import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import RevenueExpensesFilter from "./RevenueExpensesFilter";

const RevenueExpensesChart: React.FC = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 300,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: [
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
      labels: {
        style: {
          colors: " #475467",
          fontWeight: "500",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 1000,
      tickAmount: 5,
      labels: {
        formatter: (value: number) => `$${value}`,
        style: {
          colors: " #475467",
          fontWeight: "500",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (value: number) => `$${value}` },
    },
    colors: ["#7C3AED", "#A78BFA"],
    responsive: [
      {
        breakpoint: 768,
        options: { chart: { height: 250 } },
      },
    ],
  };

  const chartSeries = [
    {
      name: "Revenue",
      data: [200, 400, 600, 800, 1000, 600, 500, 400, 200, 400, 600, 800],
    },
    {
      name: "Expenses",
      data: [100, 300, 500, 600, 700, 500, 400, 300, 100, 300, 500, 700],
    },
  ];

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold text-gray-800">
          Revenue VS Expenses
        </p>
        <button className="px-4 py-2 font-semibold shadow-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
          View report
        </button>
      </div>
      <div className="w-full">
        <RevenueExpensesFilter />
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={300}
          width="100%"
        />
      </div>
    </div>
  );
};

export default RevenueExpensesChart;
