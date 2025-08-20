import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Phone, 
  CheckCircle, 
  AlertTriangle,
  Info,
  X,
  Settings,
  Send,
  Filter
} from 'lucide-react';

const notifications = [
  {
    id: 'NOTIF-001',
    type: 'success',
    title: 'Application Approved',
    message: 'Your driver\'s license renewal application (DL-2025-001) has been approved.',
    timestamp: '2 minutes ago',
    read: false,
    category: 'Application Update'
  },
  {
    id: 'NOTIF-002',
    type: 'warning',
    title: 'Document Required',
    message: 'Additional medical certificate needed for application VR-2025-002.',
    timestamp: '15 minutes ago',
    read: false,
    category: 'Document Request'
  },
  {
    id: 'NOTIF-003',
    type: 'info',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Sunday, January 20th from 2:00 AM to 6:00 AM.',
    timestamp: '1 hour ago',
    read: true,
    category: 'System Alert'
  },
  {
    id: 'NOTIF-004',
    type: 'success',
    title: 'Payment Processed',
    message: 'Payment of ₦7,000 for application DL-2025-001 has been successfully processed.',
    timestamp: '2 hours ago',
    read: true,
    category: 'Payment'
  },
  {
    id: 'NOTIF-005',
    type: 'info',
    title: 'New Feature Available',
    message: 'Mobile document scanning is now available in the mobile app.',
    timestamp: '1 day ago',
    read: true,
    category: 'Feature Update'
  }
];

const messageTemplates = [
  {
    name: 'Application Approved',
    subject: 'Your application has been approved',
    content: 'Dear {applicant_name}, your application {application_id} has been approved...'
  },
  {
    name: 'Document Required',
    subject: 'Additional documents needed',
    content: 'Dear {applicant_name}, we need additional documents for your application...'
  },
  {
    name: 'Payment Reminder',
    subject: 'Payment reminder for your application',
    content: 'Dear {applicant_name}, this is a reminder that payment is due...'
  },
  {
    name: 'Application Rejected',
    subject: 'Application status update',
    content: 'Dear {applicant_name}, unfortunately your application has been rejected...'
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
    case 'error':
      return <X className="h-5 w-5 text-red-600" />;
    default:
      return <Info className="h-5 w-5 text-blue-600" />;
  }
};

const getNotificationBadge = (category: string) => {
  switch (category) {
    case 'Application Update':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Application</Badge>;
    case 'Document Request':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Document</Badge>;
    case 'Payment':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Payment</Badge>;
    case 'System Alert':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">System</Badge>;
    default:
      return <Badge variant="secondary">{category}</Badge>;
  }
};

export function NotificationCenter() {
  const [selectedTab, setSelectedTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(notif =>
    notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notif.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notification Center</h1>
          <p className="text-muted-foreground">Manage notifications and communication</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList>
          <TabsTrigger value="inbox" className="relative">
            <Bell className="h-4 w-4 mr-2" />
            Inbox
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="compose">
            <Send className="h-4 w-4 mr-2" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="templates">
            <MessageSquare className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Phone className="h-4 w-4 mr-2" />
            Channels
          </TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Bell className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline">
              Mark All Read
            </Button>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Recent system and application notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex items-start space-x-4 p-4 rounded-lg border ${
                      !notif.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                    }`}
                  >
                    {getNotificationIcon(notif.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`font-medium ${!notif.read ? 'text-blue-900' : 'text-gray-900'}`}>
                          {notif.title}
                        </p>
                        {getNotificationBadge(notif.category)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notif.timestamp}</span>
                        <div className="flex space-x-2">
                          {!notif.read && (
                            <Button variant="ghost" size="sm">
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compose" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Create and send notifications to users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Type</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>All Users</option>
                    <option>Citizens Only</option>
                    <option>Officers Only</option>
                    <option>Specific Department</option>
                    <option>Individual User</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Type</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>Application Update</option>
                    <option>System Alert</option>
                    <option>Maintenance Notice</option>
                    <option>Feature Update</option>
                    <option>General Announcement</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Enter notification subject" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea
                  className="w-full border rounded-md px-3 py-2 h-32"
                  placeholder="Enter your message here..."
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <label className="text-sm">Send via Email</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <label className="text-sm">Send via SMS</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <label className="text-sm">In-app Notification</label>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-defined templates for common notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {messageTemplates.map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.subject}</p>
                      <p className="text-xs text-gray-500 mt-1">{template.content.substring(0, 80)}...</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Use Template</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4">
                <MessageSquare className="h-4 w-4 mr-2" />
                Create New Template
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  Email Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Provider</span>
                    <span className="text-sm font-medium">SendGrid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Limit</span>
                    <span className="text-sm font-medium">10,000</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                  SMS Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Provider</span>
                    <span className="text-sm font-medium">Twilio</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Limit</span>
                    <span className="text-sm font-medium">5,000</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-purple-600" />
                  Chatbot Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Development</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform</span>
                    <span className="text-sm font-medium">WhatsApp</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Integration</span>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Configure</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}