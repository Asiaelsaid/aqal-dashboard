import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ButtonsFiter from "../OwnersDashboard/ButtonsFiter";

// interface RentAmountChartProps {
//   data: { name: string; collected: number; toBeCollected: number }[];
// }

// const RentAmountChart: React.FC<RentAmountChartProps> = ({ data }) => {
//   console.log(data);
//   const [filter, setFilter] = useState<"1month" | "3months">("3months");

//   // Filter data based on selection
//   const filteredData = filter === "1month" ? data.slice(-1) : data;
//   const options: ApexOptions = {
//     chart: { type: "bar", height: "auto", toolbar: { show: false } },
//     plotOptions: {
//       bar: { columnWidth: "60%", borderRadius: 5 },
//     },
//     colors: ["#8B5CF6", "#E5E7EB"],
//     dataLabels: { enabled: false },
//     xaxis: {
//       categories: filteredData.map((unit) => unit.name),
//       labels: {
//         rotate: -30,
//         rotateAlways: true,
//         style: {
//           fontSize: "12px",
//           fontFamily: "inherit",
//         },
//         offsetY: 8,

//       },

//     },

//     yaxis: { labels: { formatter: (val: number) => `$${val}` } },
//     legend: { position: "top" },
//   };

//   const series = [
//     { name: "Rent collected", data: data?.map((unit) => unit.collected) },
//     {
//       name: "Rent to be collected",
//       data: data?.map((unit) => unit.toBeCollected),
//     },
//   ];

//   return (
//     <div className=" p-5 rounded-lg shadow mt-5 ">
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-lg font-semibold">Rent Amount</h2>
//       </div>
//       <ButtonsFiter filter={filter} setFilter={setFilter} />
//         {/* Render Chart */}
//       <Chart
//         options={options}
//         series={series}
//         type="bar"
//         height={300}
//         className="mt-4"
//       />
//     </div>
//   );
// };

// export default RentAmountChart;
interface RentAmountChartProps {
  data: {
    labels: string[];
    units: Array<{
      unit_id: number;
      unit_number: string;
      property_name: string;
      series: Array<{
        name: string;
        data: number[];
      }>;
    }>;
  };
}

const RentAmountChart: React.FC<RentAmountChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<"1" | "3">("3");

  // Process data based on selected timeframe
  // const processedData = data.units.map(unit => {
  //   const collectedSeries = unit.series.find(s => s.name === "Rent Collected");
  //   const dueSeries = unit.series.find(s => s.name === "Rent Due");

  //   const getValues = (data: number[]) =>
  //     timeframe === '3' ? data : [data[0]];

  //   return {
  //     name: `${unit.property_name}-Unit ${unit.unit_number}`,
  //     collected: getValues(collectedSeries?.data || []).reduce((a, b) => a + b, 0),
  //     toBeCollected: getValues(dueSeries?.data || []).reduce((a, b) => a + b, 0)
  //   };
  // });
  const processedData = data.units.map((unit) => {
    const collectedSeries = unit.series.find(
      (s) => s.name === "Rent Collected"
    );
    const dueSeries = unit.series.find((s) => s.name === "Rent Due");

    const getValues = (data: number[]) =>
      timeframe === "3" ? data : [data[0]];

    return {
      name: `Unit ${unit.unit_number}`, // Only show unit_number in x-axis
      fullName: `${unit.property_name} - Unit ${unit.unit_number}`, // Used for tooltip
      collected: getValues(collectedSeries?.data || []).reduce(
        (a, b) => a + b,
        0
      ),
      toBeCollected: getValues(dueSeries?.data || []).reduce(
        (a, b) => a + b,
        0
      ),
    };
  });

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: "auto",
      toolbar: { show: false },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 5,
      },
    },
    colors: ["#8B5CF6", "#E5E7EB"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: processedData.map((unit) => unit.name),
      labels: {
        rotate: -30,
        rotateAlways: true,
        style: {
          fontSize: "12px",
          fontFamily: "inherit",
        },
        offsetY: 5,
      },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${val}`,
      },
    },
    legend: { position: "top" },
    grid: {
      padding: {
        bottom: 30,
      },
    },
    tooltip: {
      custom: ({ dataPointIndex }) => `
        <div class="px-2 py-1 bg-white shadow rounded text-black">
          <span class="font-semibold">${processedData[dataPointIndex].fullName}</span>
        </div>
      `, // Show property_name in tooltip
    },
  };

  const series = [
    {
      name: "Rent collected",
      data: processedData.map((unit) => unit.collected),
    },
    {
      name: "Rent to be collected",
      data: processedData.map((unit) => unit.toBeCollected),
    },
  ];

  return (
    <div className="p-5 rounded-lg shadow mt-5 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Rent Amount</h2>
        <ButtonsFiter selectedTimeframe={timeframe} onSelect={setTimeframe} />
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Chart options={options} series={series} type="bar" height={400} />
        </div>
      </div>
    </div>
  );
};
export default RentAmountChart;
