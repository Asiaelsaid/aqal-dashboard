import { useState } from "react";
import RequestsTable from "./RequestsTable";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Tenant {
  id: number;
  name: string;
  email: string;
}

interface Request {
  id: number;
  req_code: string;
  category: string;
  description: string;
  status: string;
  urgency: string;
  preferred_service_date: string;
}

interface Unit {
  id: number;
  unit_number: string;
  unit_level: number;
  status: string;
  tenant: Tenant | null;
  requests: Request[];
}

const UnitAccordion = ({ unit }: { unit: Unit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="p-5 bg-purple-200 hover:bg-purple-300 cursor-pointer rounded-lg shadow-md transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold text-lg text-gray-800">
              Unit {unit.unit_number} - Level {unit.unit_level}
            </p>
            <p className="text-gray-600">Status: {unit.status}</p>
            {unit.tenant && (
              <p className="text-gray-600">Tenant: {unit.tenant.name}</p>
            )}
          </div>
          <button className="text-gray-600 transition-transform">
            {isOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          {unit.requests.length > 0 ? (
            <RequestsTable requests={unit.requests} unitId={unit.id} />
          ) : (
            <p className="text-gray-600">No requests for this unit</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitAccordion;
