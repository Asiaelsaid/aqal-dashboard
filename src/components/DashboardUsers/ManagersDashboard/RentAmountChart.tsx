import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ButtonsFiter from "../OwnersDashboard/ButtonsFiter";

interface RentAmountChartProps {
  data: { name: string; collected: number; toBeCollected: number }[];
}

const RentAmountChart: React.FC<RentAmountChartProps> = ({ data }) => {
  console.log(data);
  
  const options: ApexOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: { columnWidth: "50%", borderRadius: 5 },
    },
    colors: ["#8B5CF6", "#E5E7EB"],
    dataLabels: { enabled: false },
    xaxis: { categories: data.map((unit) => unit.name) },
    yaxis: { labels: { formatter: (val: number) => `$${val}` } },
    legend: { position: "top" },
  };

  const series = [
    { name: "Rent collected", data: data?.map((unit) => unit.collected) },
    {
      name: "Rent to be collected",
      data: data?.map((unit) => unit.toBeCollected),
    },
  ];

  return (
    <div className=" p-5 rounded-lg shadow mt-5">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Rent Amount</h2>
      </div>
      <ButtonsFiter/>
      {/* Render Chart */}
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
};

export default RentAmountChart;
