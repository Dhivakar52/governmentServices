import  { useState } from 'react';
import { 
  Bell, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Info,
  FileText
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'application' | 'alert' | 'reminder' | 'info';
  priority: 'high' | 'medium' | 'low';
  timestamp: Date;
  isRead: boolean;
  applicationId?: string;
  actionRequired?: boolean;
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Application Status Update',
      message: 'Your driver\'s license application DL-2024-001234 has been approved and is ready for collection.',
      type: 'application',
      priority: 'high',
      timestamp: new Date('2024-01-15T10:30:00'),
      isRead: false,
      applicationId: 'DL-2024-001234',
      actionRequired: true
    },
    {
      id: '2',
      title: 'Payment Reminder',
      message: 'Your application fee for birth certificate BC-2024-001234 is due in 2 days.',
      type: 'reminder',
      priority: 'medium',
      timestamp: new Date('2024-01-14T14:20:00'),
      isRead: false,
      applicationId: 'BC-2024-001234',
      actionRequired: true
    },
    {
      id: '3',
      title: 'Document Upload Required',
      message: 'Additional documents are required for your death certificate application. Please upload the missing police report.',
      type: 'alert',
      priority: 'high',
      timestamp: new Date('2024-01-13T09:15:00'),
      isRead: true,
      applicationId: 'DC-2024-001234',
      actionRequired: true
    },
    {
      id: '4',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur on January 20th from 2:00 AM to 4:00 AM. Services may be temporarily unavailable.',
      type: 'info',
      priority: 'low',
      timestamp: new Date('2024-01-12T16:45:00'),
      isRead: true,
      actionRequired: false
    },
    {
      id: '5',
      title: 'Appointment Confirmation',
      message: 'Your driving test appointment is confirmed for January 18th at 10:00 AM at Kampala Central Office.',
      type: 'reminder',
      priority: 'medium',
      timestamp: new Date('2024-01-11T11:30:00'),
      isRead: true,
      applicationId: 'DL-2024-001234',
      actionRequired: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'application' | 'alert' | 'reminder' | 'info'>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const notificationTypes = [
    { value: 'all', label: 'All Notifications' },
    { value: 'application', label: 'Applications' },
    { value: 'alert', label: 'Alerts' },
    { value: 'reminder', label: 'Reminders' },
    { value: 'info', label: 'Information' }
  ];

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string, priority: string) => {
    const iconProps = { 
      className: `w-5 h-5 ${
        priority === 'high' ? 'text-red-500' : 
        priority === 'medium' ? 'text-orange-500' : 
        'text-blue-500'
      }` 
    };

    switch (type) {
      case 'application':
        return <FileText {...iconProps} />;
      case 'alert':
        return <AlertTriangle {...iconProps} />;
      case 'reminder':
        return <Clock {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-orange-500 bg-orange-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (notif.applicationId && notif.applicationId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || notif.type === filterType;
    
    const matchesRead = filterRead === 'all' || 
                       (filterRead === 'read' && notif.isRead) ||
                       (filterRead === 'unread' && !notif.isRead);
    
    return matchesSearch && matchesType && matchesRead;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderNotificationCard = (notification: Notification) => (
    <div
      key={notification.id}
      className={`bg-white rounded-lg border-l-4 border border-d365-border p-4 transition-all hover:shadow-md ${
        getPriorityColor(notification.priority)
      } ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          {getNotificationIcon(notification.type, notification.priority)}
          <div className="flex-1">
            <h3 className={`font-medium text-d365-text-primary ${!notification.isRead ? 'font-semibold' : ''}`}>
              {notification.title}
              {!notification.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full inline-block ml-2"></span>}
            </h3>
            <p className="text-caption text-d365-text-secondary mt-1">
              {notification.timestamp.toLocaleDateString()} at {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {notification.actionRequired && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-caption rounded-full">
              Action Required
            </span>
          )}
          <div className="flex gap-1">
            {!notification.isRead && (
              <button
                className="p-1 text-d365-text-secondary hover:text-d365-primary"
                onClick={() => markAsRead(notification.id)}
                title="Mark as read"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}
            <button
              className="p-1 text-d365-text-secondary hover:text-red-500"
              onClick={() => deleteNotification(notification.id)}
              title="Delete notification"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-body text-d365-text-primary mb-3">
        {notification.message}
      </p>

      {notification.applicationId && (
        <div className="flex items-center gap-2 text-caption text-d365-text-secondary">
          <span>Application ID:</span>
          <span className="font-medium text-d365-primary">{notification.applicationId}</span>
        </div>
      )}
    </div>
  );

  const renderNotificationList = (notification: Notification) => (
    <div
      key={notification.id}
      className={`bg-white rounded-lg border border-d365-border p-4 ${
        !notification.isRead ? 'bg-blue-50 border-blue-200' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {getNotificationIcon(notification.type, notification.priority)}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium text-d365-text-primary truncate ${!notification.isRead ? 'font-semibold' : ''}`}>
                {notification.title}
              </h3>
              {!notification.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>}
              {notification.actionRequired && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-caption rounded-full flex-shrink-0">
                  Action Required
                </span>
              )}
            </div>
            <p className="text-caption text-d365-text-secondary truncate">
              {notification.message}
            </p>
          </div>
          
          <div className="text-right flex-shrink-0">
            <div className="text-caption text-d365-text-secondary">
              {notification.timestamp.toLocaleDateString()}
            </div>
            <div className="text-caption text-d365-text-secondary">
              {notification.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {!notification.isRead && (
            <button
              className="p-2 text-d365-text-secondary hover:text-d365-primary"
              onClick={() => markAsRead(notification.id)}
              title="Mark as read"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            className="p-2 text-d365-text-secondary hover:text-red-500"
            onClick={() => deleteNotification(notification.id)}
            title="Delete notification"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Notifications Center</h1>
          <p className="d365-page-subtitle">
            Stay updated with your applications and important announcements
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-caption rounded-full">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            className="d365-button-secondary flex items-center gap-2"
            onClick={markAllAsRead}
          >
            <CheckCircle className="w-4 h-4" />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="d365-input pl-10"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-d365-text-secondary" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              className="d365-input min-w-40"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
            >
              {notificationTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <select
              className="d365-input min-w-32"
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>

            <div className="flex border border-d365-border rounded">
              <button
                className={`px-3 py-2 text-caption ${viewMode === 'card' ? 'bg-d365-primary text-white' : 'text-d365-text-secondary'}`}
                onClick={() => setViewMode('card')}
              >
                Card
              </button>
              <button
                className={`px-3 py-2 text-caption ${viewMode === 'list' ? 'bg-d365-primary text-white' : 'text-d365-text-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Display */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-lg border border-d365-border p-12 text-center">
          <Bell className="w-12 h-12 text-d365-text-secondary mx-auto mb-4" />
          <h3 className="font-medium text-d365-text-primary mb-2">No Notifications Found</h3>
          <p className="text-body text-d365-text-secondary">
            {searchQuery || filterType !== 'all' || filterRead !== 'all'
              ? 'No notifications match your current filters.'
              : 'You\'re all caught up! New notifications will appear here.'
            }
          </p>
        </div>
      ) : (
        <div>
          {viewMode === 'card' ? (
            <div className="space-y-4">
              {filteredNotifications.map(renderNotificationCard)}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map(renderNotificationList)}
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {filteredNotifications.length > 0 && (
        <div className="bg-white rounded-lg border border-d365-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-body text-d365-text-secondary">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </span>
            <div className="flex gap-2">
              <button className="d365-button-secondary text-caption">
                Export All
              </button>
              <button className="d365-button-secondary text-caption">
                Delete All Read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}