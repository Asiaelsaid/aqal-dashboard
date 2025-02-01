import { Card } from "@components/UI/Card";
import CardContent from "./CardContent";

interface OverviewCardProps {
  title: string;
  value: string | number;
  change: number;
}
const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  change,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="p-4 md:p-6 ">
          <p className="text-sm text-gray-500 font-semibold">{title}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-semibold text-gray-700">
              {value}
            </span>
            <span
              className={`text-sm border rounded-s-2xl rounded-e-2xl px-2 ${
                change > 0
                  ? "text-green-700 bg-green-100 border-green-200 "
                  : "text-red-700 bg-red-100 border-red-200"
              }`}
            >
              {change > 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`}
            </span>
          </div>
        </div>
        <hr />
        <div className="p-2 md:p-4 flex items-center justify-end">
          <p className="text-sm text-amber-600 font-medium">View details</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
