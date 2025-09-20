import React from 'react';
import { Card } from "@components/UI/Card";
import CardContent from "./CardContent";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueByUnitTypeProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
    }[];
  };
}

const RevenueByUnitTypeChart: React.FC<RevenueByUnitTypeProps> = ({ data }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <Card>
      <CardContent>
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Unit Type</h3>
          
          <div className="h-64">
            <Line data={data} options={chartOptions} />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Residential Revenue</div>
              <div className="text-lg font-semibold text-blue-800">
                ${data.datasets[0]?.data.reduce((a, b) => a + b, 0).toLocaleString() || 0}
              </div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Commercial Revenue</div>
              <div className="text-lg font-semibold text-green-800">
                ${data.datasets[1]?.data.reduce((a, b) => a + b, 0).toLocaleString() || 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueByUnitTypeChart;
