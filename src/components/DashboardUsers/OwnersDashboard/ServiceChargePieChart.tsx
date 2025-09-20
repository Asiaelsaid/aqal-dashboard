import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ServiceChargeData {
  name: string;
  value: number;
  color: string;
}

interface ServiceChargeAnalysis {
  pie_chart_data: ServiceChargeData[];
  total_service_charge_due: number;
  total_service_charge_paid: number;
  service_charge_collection_rate: number;
}

interface ServiceChargePieChartProps {
  data: ServiceChargeAnalysis;
}

const ServiceChargePieChart: React.FC<ServiceChargePieChartProps> = ({ data }) => {
  // Filter out zero values for cleaner visualization
  const chartData = data?.pie_chart_data?.filter(item => item.value > 0) || [];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((sum: number, val: number) => sum + val, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                
                return {
                  text: `${label}: $${value.toLocaleString()} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  lineWidth: 0,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((sum: number, val: number) => sum + val, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  const pieChartData = {
    labels: chartData.map(item => item.name),
    datasets: [
      {
        data: chartData.map(item => item.value),
        backgroundColor: chartData.map(item => item.color),
        borderColor: chartData.map(item => item.color),
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Service Charge Distribution</h3>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {data?.service_charge_collection_rate || 0}% Collection Rate
          </span>
        </div>
      </div>

      {chartData.length > 0 ? (
        <>
          <div style={{ width: '100%', height: '300px' }}>
            <Pie data={pieChartData} options={chartOptions} />
          </div>

          {/* Summary Statistics */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Due</p>
              <p className="text-lg font-semibold text-gray-800">
                ${(data?.total_service_charge_due || 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-lg font-semibold text-green-600">
                ${(data?.total_service_charge_paid || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <p className="text-gray-500">No service charge data available</p>
            <p className="text-sm text-gray-400 mt-1">
              Service charges will appear here once units are configured
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceChargePieChart;
