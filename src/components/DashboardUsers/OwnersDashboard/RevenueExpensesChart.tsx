// import React from "react";
// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import RevenueExpensesFilter from "./RevenueExpensesFilter";

// interface Props {
//   revenueExpenses?: {
//     labels: string[];
//     datasets: { label: string; data: number[]; borderColor: string }[];
//   };
// }
// const RevenueExpensesChart: React.FC<Props> = ({ revenueExpenses }) => {
// const chartOptions: ApexOptions = {
//   chart: {
//     type: "line",
//     height: 300,
//     toolbar: { show: false },
//   },
//   stroke: {
//     curve: "smooth",
//     width: 2,
//   },
//   xaxis: {
//     categories: revenueExpenses?.labels || [],
//     labels: {
//       style: {
//         colors: " #475467",
//         fontWeight: "500",
//       },
//     },
//   },
//   yaxis: {
//     min: 0,
//     max: 1000,
//     tickAmount: 5,
//     labels: {
//       formatter: (value: number) => `$${value}`,
//       style: {
//         colors: " #475467",
//         fontWeight: "500",
//       },
//     },
//   },
//   tooltip: {
//     shared: true,
//     intersect: false,
//     y: { formatter: (value: number) => `$${value}` },
//   },
//   colors: ["#7C3AED", "#A78BFA"],
//   responsive: [
//     {
//       breakpoint: 768,
//       options: { chart: { height: 250 } },
//     },
//   ],
// };

// const chartSeries =
//   revenueExpenses?.datasets?.map((dataset) => ({
//     name: dataset.label,
//     data: dataset.data,
//   })) || [];
//   return (
//     <div className="p-6 border rounded-lg">
//       <div className="flex justify-between mb-4">
//         <p className="text-lg font-semibold text-gray-800">
//           Revenue VS Expenses
//         </p>
//       </div>
//       <div className="w-full">
//         <RevenueExpensesFilter />
//         <ReactApexChart
//           options={chartOptions}
//           series={chartSeries}
//           type="line"
//           height={300}
//           width="100%"
//         />
//       </div>
//     </div>
//   );
// };

// export default RevenueExpensesChart;
// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";
// import RevenueExpensesFilter from "./RevenueExpensesFilter";
// interface Props {
//   revenueExpenses?: {
//     labels: string[];
//     datasets: { label: string; data: number[]; borderColor: string }[];
//   };
// }
// const RevenueExpensesChart: React.FC<Props> = ({ revenueExpenses }) => {
//   const [filteredData, setFilteredData] = useState(revenueExpenses);
//   const [selectedFilter, setSelectedFilter] = useState("12 months");
//   useEffect(() => {
//     if (!revenueExpenses) return;
//     let filteredLabels = revenueExpenses.labels;
//     let filteredDatasets = revenueExpenses.datasets.map((dataset) => ({
//       ...dataset,
//       data: dataset.data,
//     }));
//     switch (selectedFilter) {
//       case "30 days":
//         filteredLabels = revenueExpenses.labels.slice(-1);
//         filteredDatasets = revenueExpenses.datasets.map((dataset) => ({
//           ...dataset,
//           data: dataset.data.slice(-1),
//         }));
//         break;
//       case "7 days":
//         filteredLabels = revenueExpenses.labels.slice(-3);
//         filteredDatasets = revenueExpenses.datasets.map((dataset) => ({
//           ...dataset,
//           data: dataset.data.slice(-3),
//         }));
//         break;
//       case "24 hours":
//         filteredLabels = revenueExpenses.labels.slice(-1);
//         filteredDatasets = revenueExpenses.datasets.map((dataset) => ({
//           ...dataset,
//           data: [dataset.data[dataset.data.length - 1] || 0],
//         }));
//         break;
//       default:
//         break;
//     }
//     setFilteredData({
//       labels: filteredLabels,
//       datasets: filteredDatasets,
//     });
//   }, [selectedFilter, revenueExpenses]);
//   const chartOptions: ApexOptions = {
//     chart: {
//       type: "line",
//       height: 300,
//       toolbar: { show: false },
//     },
//     stroke: {
//       curve: "smooth",
//       width: 2,
//     },
//     xaxis: {
//       categories: filteredData?.labels || [],
//       labels: {
//         style: {
//           colors: " #475467",
//           fontWeight: "500",
//         },
//       },
//     },
//     yaxis: {
//       min: 0,
//       max: 1000,
//       tickAmount: 5,
//       labels: {
//         formatter: (value: number) => `$${value}`,
//         style: {
//           colors: " #475467",
//           fontWeight: "500",
//         },
//       },
//     },
//     tooltip: {
//       shared: true,
//       intersect: false,
//       y: { formatter: (value: number) => `$${value}` },
//     },
//     colors: ["#7C3AED", "#A78BFA"],
//     responsive: [
//       {
//         breakpoint: 768,
//         options: { chart: { height: 250 } },
//       },
//     ],
//   };
//   const chartSeries =
//     filteredData?.datasets?.map((dataset) => ({
//       name: dataset.label,
//       data: dataset.data,
//     })) || [];
//   return (
//     <div className="p-6 border rounded-lg">
//       <div className="flex justify-between mb-4">
//         <p className="text-lg font-semibold text-gray-800">
//           Revenue VS Expenses
//         </p>
//       </div>
//       <div className="w-full">
//         <RevenueExpensesFilter onFilterChange={setSelectedFilter} />
//         <ReactApexChart
//           options={chartOptions}
//           series={chartSeries}
//           type="line"
//           height={300}
//           width="100%"
//         />
//       </div>
//     </div>
//   );
// };
// export default RevenueExpensesChart;
import React, { useEffect, useState } from "react";
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
  const [filteredData, setFilteredData] = useState(revenueExpenses);
  const [selectedFilter, setSelectedFilter] = useState("12 months");

  useEffect(() => {
    if (!revenueExpenses) return;

    let monthsToShow = 12;
    switch (selectedFilter) {
      case "6 months":
        monthsToShow = 6;
        break;
      case "3 months":
        monthsToShow = 3;
        break;
      case "1 month":
        monthsToShow = 1;
        break;
      default:
        monthsToShow = 12;
        break;
    }

    const filteredLabels = revenueExpenses.labels?.slice(-monthsToShow);
    const filteredDatasets = revenueExpenses.datasets?.map((dataset) => ({
      ...dataset,
      data: dataset?.data?.slice(-monthsToShow),
    }));

    setFilteredData({
      labels: filteredLabels,
      datasets: filteredDatasets,
    });
  }, [selectedFilter, revenueExpenses]);

  // const chartOptions: ApexOptions = {
  //   chart: {
  //     type: "line",
  //     height: 300,
  //     toolbar: { show: false },
  //   },
  //   stroke: {
  //     curve: "smooth",
  //     width: 2,
  //   },
  //   xaxis: {
  //     categories: filteredData?.labels || [],
  //     labels: {
  //       style: {
  //         colors: "#475467",
  //         fontWeight: "500",
  //       },
  //     },
  //   },
  //   yaxis: {
  //     min: 0,
  //     max: Math.max(
  //       ...(filteredData?.datasets.flatMap((d) => d.data) || [1000])
  //     ),
  //     tickAmount: 5,
  //     labels: {
  //       formatter: (value: number) => `$${value}`,
  //       style: {
  //         colors: "#475467",
  //         fontWeight: "500",
  //       },
  //     },
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: { formatter: (value: number) => `$${value}` },
  //   },
  //   colors: ["green", "red"],
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       options: { chart: { height: 250 } },
  //     },
  //   ],
  // };

  // const chartSeries =
  //   filteredData?.datasets?.map((dataset) => ({
  //     name: dataset.label,
  //     data: dataset.data,
  //   })) || [];
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
      categories: filteredData?.labels || [],
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
    filteredData?.datasets?.map((dataset) => ({
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
        <RevenueExpensesFilter onFilterChange={setSelectedFilter} />
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
