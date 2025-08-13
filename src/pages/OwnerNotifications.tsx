import React, { useState } from 'react';
import { BsBell, BsCheck, BsExclamationTriangle, BsInfoCircle } from 'react-icons/bs';
import { FiRefreshCw, FiFilter } from 'react-icons/fi';
import useCustomQuery from '@hooks/useCustomQuery';
import useAxios from '@config/axios.config';

interface Notification {
  id: number;
  title: string;
  description: string;
  message?: string;
  notification_type: 'info' | 'warning' | 'success' | 'error';
  is_read: boolean;
  created_at: string;
  sender: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
}

const OwnerNotifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const axiosInstance = useAxios();
  const {
    data,
    // isLoading: loading,
    error,
    refetch: fetchNotifications
  } = useCustomQuery({
    queryKey: ['owner-notifications'],
    url: '/managers/notifications/',
  });
  const notifications: Notification[] = data?.data || [];

  const markAsRead = async (notificationId: number) => {
    try {
      await axiosInstance.patch(`/managers/notifications/${notificationId}/mark-read/`);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <BsCheck className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <BsExclamationTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <BsExclamationTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <BsInfoCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBorder = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      default:
        return 'border-l-blue-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.is_read;
    if (filter === 'read') return notification.is_read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-red-500 mb-4">
                <BsExclamationTriangle className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Notifications</h3>
              <p className="text-gray-500 mb-4">{error instanceof Error ? error.message : String(error)}</p>
              <button
                onClick={() => fetchNotifications()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {unreadCount} unread
                </span>
              )}
              <button
                onClick={() => fetchNotifications()}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <FiFilter className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === 'unread'
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  filter === 'read'
                    ? 'bg-blue-100 text-blue-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Read ({notifications.length - unreadCount})
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BsBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? "You don't have any notifications yet."
                  : filter === 'unread'
                  ? "You don't have any unread notifications."
                  : "You don't have any read notifications."
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border-l-4 transition-colors cursor-pointer ${
                    getNotificationBorder(notification.notification_type)
                  } ${
                    notification.is_read 
                      ? 'bg-gray-50 border-gray-200' 
                      : 'bg-blue-50 border-blue-200 shadow-sm'
                  }`}
                  onClick={() => !notification.is_read && markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.notification_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm font-medium ${
                            notification.is_read ? 'text-gray-700' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h4>
                          {!notification.is_read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          notification.is_read ? 'text-gray-500' : 'text-gray-700'
                        }`}>
                          {notification.message || notification.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">
                            {new Date(notification.created_at).toLocaleString()}
                          </span>
                          {notification.sender && (
                            <span className="text-xs text-gray-400">
                              From: {notification.sender.first_name} {notification.sender.last_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!notification.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                        className="flex-shrink-0 text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerNotifications;
