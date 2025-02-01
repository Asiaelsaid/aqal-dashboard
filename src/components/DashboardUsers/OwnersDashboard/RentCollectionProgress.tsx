import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IProps {}

const RentCollectionProgress: React.FC<IProps> = () => {
  const collected = 240;
  const goal = 300;
  const progress = (collected / goal) * 100;

  const chartOptions: ApexOptions = {
    chart: {
      type: "radialBar",
      offsetY: -20,
      width: 800,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "50%",
        },
        track: {
          background: "#E5E7EB", 
          strokeWidth: "100%", 
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "24px",
            fontWeight: 600,
            offsetY: 10,
            color: "#000",
            // formatter: () => `${Math.round(progress)}%`,
            formatter: () => "240$",
          },
        },
      },
    },
    colors: ["#7F56D9"],
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };

  const chartSeries = [progress];

  return (
    <div className="p-4 sm:p-6 border rounded-lg">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-gray-800">
          Rent collection progress
        </p>
        <p className="text-gray-500 text-sm my-2">
          View how much you collected from clients
        </p>
        <div className="my-4">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="radialBar"
            height={150}
            width="100%"
          />
        </div>
        <p className=" text-md font-semibold">Your are almost there!</p>
        {/* <p className="text-gray-500">
          You need to collect ${goal - collected} from your tenants to reach
          your goal
        </p> */}
        <p className="text-gray-500">
        You need to collect to $300 from your tenants to reach your goal
        </p>
      </div>
    </div>
  );
};

export default RentCollectionProgress;
