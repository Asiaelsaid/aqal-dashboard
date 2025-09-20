import React from 'react';
import { Card } from "@components/UI/Card";
import CardContent from "./CardContent";

interface UnitTypeDistributionProps {
  data: {
    residential: number;
    commercial: number;
    bought: number;
    vacant: number;
    occupied: number;
  };
}

const UnitTypeDistributionChart: React.FC<UnitTypeDistributionProps> = ({ data }) => {
  const totalUnits = data.residential + data.commercial;
  const residentialPercentage = totalUnits > 0 ? (data.residential / totalUnits * 100).toFixed(1) : '0';
  const commercialPercentage = totalUnits > 0 ? (data.commercial / totalUnits * 100).toFixed(1) : '0';

  return (
    <Card>
      <CardContent>
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Unit Type Distribution</h3>
          
          {/* Pie Chart Visualization */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                {/* Residential Units */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeDasharray={`${residentialPercentage}, 100`}
                  className="transition-all duration-500"
                />
                {/* Commercial Units */}
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray={`${commercialPercentage}, 100`}
                  strokeDashoffset={`-${residentialPercentage}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">{totalUnits}</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Residential</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">{data.residential}</div>
                <div className="text-xs text-gray-500">{residentialPercentage}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Commercial</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">{data.commercial}</div>
                <div className="text-xs text-gray-500">{commercialPercentage}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Bought</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">{data.bought}</div>
              </div>
            </div>
          </div>

          {/* Status Breakdown */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Status Breakdown</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-700">{data.occupied}</div>
                <div className="text-xs text-yellow-600">Occupied</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-gray-700">{data.vacant}</div>
                <div className="text-xs text-gray-600">Vacant</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnitTypeDistributionChart;
