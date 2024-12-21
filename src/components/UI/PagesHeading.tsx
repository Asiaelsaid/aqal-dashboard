import React, { ReactNode } from "react";

interface IProps {
  heading: string;
  child: ReactNode;
}
const PagesHeading: React.FC<IProps> = ({ heading, child }) => {
  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{heading}</h1>
        </div>
        {child}
      </div>
    </div>
  );
};

export default PagesHeading;
