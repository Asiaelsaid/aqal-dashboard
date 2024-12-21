import React, { ReactNode } from "react";

interface IProps {
  child: ReactNode;
}
const PropertiesHeader: React.FC<IProps> = ({child}) => {
  return (
    <div className="py-4 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
        </div>
        {child}
       
      </div>
    </div>
  );
};

export default PropertiesHeader;
