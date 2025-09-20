import React from 'react';
import { Card } from "@components/UI/Card";
import CardContent from "./CardContent";

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
}

interface DashboardAlertsProps {
  alerts?: Alert[];
  occupancyRate?: number;
  outstandingPayments?: number;
  maintenanceRequests?: number;
}

const DashboardAlerts: React.FC<DashboardAlertsProps> = ({ 
  alerts = [], 
  occupancyRate = 0, 
  outstandingPayments = 0, 
  maintenanceRequests = 0 
}) => {
  const generateSystemAlerts = (): Alert[] => {
    const systemAlerts: Alert[] = [];

    // Low occupancy alert
    if (occupancyRate < 70) {
      systemAlerts.push({
        id: 'low-occupancy',
        type: 'warning',
        title: 'Low Occupancy Rate',
        message: `Current occupancy rate is ${occupancyRate}%. Consider marketing strategies to attract more tenants.`,
        timestamp: new Date().toISOString(),
      });
    }

    // High outstanding payments alert
    if (outstandingPayments > 10000) {
      systemAlerts.push({
        id: 'high-outstanding',
        type: 'error',
        title: 'High Outstanding Payments',
        message: `$${outstandingPayments.toLocaleString()} in outstanding payments. Review payment collection strategies.`,
        timestamp: new Date().toISOString(),
      });
    }

    // Pending maintenance requests alert
    if (maintenanceRequests > 5) {
      systemAlerts.push({
        id: 'maintenance-requests',
        type: 'info',
        title: 'Pending Maintenance Requests',
        message: `${maintenanceRequests} maintenance requests pending. Review and prioritize urgent requests.`,
        timestamp: new Date().toISOString(),
      });
    }

    return [...systemAlerts, ...alerts];
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return '⚠️';
      case 'error':
        return '🚨';
      case 'info':
        return 'ℹ️';
      case 'success':
        return '✅';
      default:
        return '📢';
    }
  };

  const getAlertClasses = (type: Alert['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const allAlerts = generateSystemAlerts();

  if (allAlerts.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts & Notifications</h3>
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-gray-600">All systems are running smoothly!</p>
              <p className="text-sm text-gray-500 mt-1">No alerts at this time.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Alerts & Notifications</h3>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {allAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getAlertClasses(alert.type)}`}
              >
                <div className="flex items-start">
                  <span className="text-lg mr-2">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {allAlerts.length > 3 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all alerts ({allAlerts.length})
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAlerts;
