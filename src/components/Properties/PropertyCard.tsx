import React from "react";
import { CiHome, CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  id: number;
  title: string;
  type: string;
  condition: string;
  location: string;
  units: string;
  image: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  type,
  condition,
  location,
  units,
  image,
}) => {
  const navigate = useNavigate();

  const handleViewProperty = () => {
    navigate(`/property/${id}`);
  };
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow p-4 min-h-[12rem] ">
      <img
        src={image}
        alt={title}
        className="w-full sm:w-48 sm:h-32 rounded-lg object-cover cursor-pointer"
        onClick={handleViewProperty}
      />
      <div
        className="mt-4 sm:mt-0 sm:ml-4 flex-1 cursor-pointer"
        onClick={handleViewProperty}
      >
        <p className="text-ms font-semibold text-purple-600">{type}</p>
        <h3 className="font-bold text-lg">{title}</h3>
        <p>
          Condition Status <span className="text-green-500">{condition}</span>
        </p>
        <div className="flex items-center space-x-4">
          <p className="text-gray-500 flex items-center">
            <CiLocationOn className="mr-1" /> {location}
          </p>
          <p className="text-gray-500 flex items-center">
            <CiHome className="mr-1 " /> {units}
          </p>
        </div>
      </div>
      <button
        className="mt-4 sm:mt-0 sm:ml-auto text-yellow-600 self-end"
        onClick={handleViewProperty}
      >
        View property
      </button>
    </div>
  );
};

export default PropertyCard;
