import { Card } from "@components/UI/Card";
import CardContent from "./CardContent";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon?: string;
  badgeColor?: 'blue' | 'green' | 'yellow' | 'gray' | 'purple' | 'red';
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  badgeColor,
  trend,
  trendLabel,
  subtitle,
}) => {
  const getBadgeClasses = () => {
    switch (badgeColor) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'gray': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'red': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendClasses = () => {
    if (!trend) return '';
    return trend > 0 
      ? 'text-green-700 bg-green-100 border-green-200' 
      : 'text-red-700 bg-red-100 border-red-200';
  };

  return (
    <Card>
      <CardContent>
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500 font-semibold">{title}</p>
            {icon && (
              <span className="text-2xl">{icon}</span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-semibold text-gray-700">
                {value}
              </span>
              {subtitle && (
                <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-1">
              {badgeColor && (
                <span className={`text-xs border rounded-full px-2 py-1 ${getBadgeClasses()}`}>
                  {badgeColor.charAt(0).toUpperCase() + badgeColor.slice(1)}
                </span>
              )}
              
              {trend !== undefined && (
                <span className={`text-xs border rounded-full px-2 py-1 ${getTrendClasses()}`}>
                  {trend > 0 ? `↑ ${trend}%` : `↓ ${Math.abs(trend)}%`}
                  {trendLabel && <span className="ml-1">{trendLabel}</span>}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <hr />
        <div className="p-2 md:p-4 flex items-center justify-end">
          <p className="text-sm text-blue-600 font-medium cursor-pointer hover:text-blue-800 transition-colors">
            View details
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
