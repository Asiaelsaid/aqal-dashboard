
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import RevenueExpensesFilter from "./RevenueExpensesFilter";

interface Props {
  revenueExpenses?: {
    labels: string[];
    datasets: { label: string; data: number[]; borderColor: string }[];
  };
}
const RevenueExpensesChart: React.FC<Props> = ({ revenueExpenses }) => {
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
      categories: revenueExpenses?.labels || [],
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

  const chartSeries =
    revenueExpenses?.datasets?.map((dataset) => ({
      name: dataset.label,
      data: dataset.data,
    })) || [];
  return (
    <div className="p-6 border rounded-lg">
      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold text-gray-800">
          Revenue VS Expenses
        </p>
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
