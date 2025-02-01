import React from "react";

interface ProgressProps {
  value: number;
  max: number;
}

export const Progress: React.FC<ProgressProps> = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
      <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};
