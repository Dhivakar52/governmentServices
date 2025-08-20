import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Bell, 
  Plus, 
  Search, 
  Eye, 
  RotateCcw, 
  Trash2, 
  Mail,
  MessageSquare,
  Smartphone,

  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'email' | 'sms' | 'in-app';
  targetRole: 'admin' | 'officer' | 'citizen' | 'all';
  sentOn: string;
  status: 'sent' | 'scheduled' | 'failed' | 'draft';
  recipient: string;
  priority: 'low' | 'medium' | 'high';
  readCount?: number;
  totalRecipients?: number;
}

export function NotificationManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof Notification>('sentOn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Mock data for notifications
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'System Maintenance Scheduled',
      content: 'The system will undergo maintenance on Sunday from 2:00 AM to 6:00 AM. Please plan accordingly.',
      type: 'email',
      targetRole: 'all',
      sentOn: '2025-01-15 09:30:00',
      status: 'sent',
      recipient: 'All Users',
      priority: 'high',
      readCount: 847,
      totalRecipients: 1250
    },
    {
      id: '2',
      title: 'New Application Received',
      content: 'A new driver\'s license application has been submitted and requires review.',
      type: 'in-app',
      targetRole: 'officer',
      sentOn: '2025-01-15 11:45:00',
      status: 'sent',
      recipient: 'Transport Officers',
      priority: 'medium',
      readCount: 23,
      totalRecipients: 45
    },
    {
      id: '3',
      title: 'Document Upload Reminder',
      content: 'Please upload your required documents to complete your application.',
      type: 'sms',
      targetRole: 'citizen',
      sentOn: '2025-01-15 14:20:00',
      status: 'sent',
      recipient: 'John Doe (+256-XXX-1234)',
      priority: 'medium'
    },
    {
      id: '4',
      title: 'Weekly Performance Report',
      content: 'Your weekly performance summary is ready for review.',
      type: 'email',
      targetRole: 'admin',
      sentOn: '2025-01-16 08:00:00',
      status: 'scheduled',
      recipient: 'System Administrators',
      priority: 'low',
      totalRecipients: 8
    },
    {
      id: '5',
      title: 'Payment Confirmation',
      content: 'Your payment for application #APP-2025-0123 has been processed successfully.',
      type: 'sms',
      targetRole: 'citizen',
      sentOn: '2025-01-14 16:30:00',
      status: 'failed',
      recipient: 'Sarah Johnson (+256-XXX-5678)',
      priority: 'high'
    },
    {
      id: '6',
      title: 'Security Alert',
      content: 'Multiple failed login attempts detected from your account.',
      type: 'email',
      targetRole: 'admin',
      sentOn: '2025-01-15 13:15:00',
      status: 'sent',
      recipient: 'admin@civility.gov.uto',
      priority: 'high',
      readCount: 1,
      totalRecipients: 1
    },
    {
      id: '7',
      title: 'Application Status Update',
      content: 'Your birth certificate application has been approved and is ready for collection.',
      type: 'in-app',
      targetRole: 'citizen',
      sentOn: '2025-01-15 10:00:00',
      status: 'sent',
      recipient: 'Mary Williams',
      priority: 'medium',
      readCount: 1,
      totalRecipients: 1
    },
    {
      id: '8',
      title: 'Training Session Reminder',
      content: 'Reminder: Advanced workflow training session tomorrow at 10:00 AM.',
      type: 'email',
      targetRole: 'officer',
      sentOn: '2025-01-16 17:00:00',
      status: 'scheduled',
      recipient: 'All Officers',
      priority: 'medium',
      totalRecipients: 78
    },
    {
      id: '9',
      title: 'System Update Available',
      content: 'A new system update is available. Please schedule installation during off-peak hours.',
      type: 'in-app',
      targetRole: 'admin',
      sentOn: '2025-01-15 07:45:00',
      status: 'sent',
      recipient: 'IT Administrators',
      priority: 'low',
      readCount: 3,
      totalRecipients: 5
    },
    {
      id: '10',
      title: 'Holiday Schedule Notice',
      content: 'Please note the updated holiday schedule for the upcoming month.',
      type: 'email',
      targetRole: 'all',
      sentOn: '2025-01-14 12:00:00',
      status: 'sent',
      recipient: 'All Staff',
      priority: 'low',
      readCount: 956,
      totalRecipients: 1250
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      case 'in-app':
        return <Bell className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge className="d365-badge-success">
            <CheckCircle className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge className="d365-badge-warning">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="d365-badge-error">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="d365-badge-secondary">
            <AlertCircle className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{priority}</Badge>;
    }
  };

  const handleSort = (field: keyof Notification) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           notification.recipient.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || notification.type === selectedType;
      const matchesRole = selectedRole === 'all' || notification.targetRole === selectedRole;
      const matchesStatus = selectedStatus === 'all' || notification.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesRole && matchesStatus;
    })
    // .sort((a, b) => {
    //   const aValue = a[sortField];
    //   const bValue = b[sortField];
      
      // if (sortDirection === 'asc') {
      //   return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      // } else {
      //   return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      // }
    // });

  const totalPages = Math.ceil(filteredAndSortedNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNotifications = filteredAndSortedNotifications.slice(startIndex, startIndex + itemsPerPage);

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    setIsViewModalOpen(true);
  };

  const handleResendNotification = (notification: Notification) => {
    console.log('Resending notification:', notification.id);
    // Implementation for resending notification
  };

  const handleDeleteNotification = (notification: Notification) => {
    console.log('Deleting notification:', notification.id);
    // Implementation for deleting notification
  };

  const renderComposeModal = () => (
    <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Compose New Notification</span>
          </DialogTitle>
          <DialogDescription>
            Create and send a new notification to users
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notification-type">Notification Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="target-role">Target Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="officer">Officers</SelectItem>
                  <SelectItem value="citizen">Citizens</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="schedule">Schedule</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Send immediately" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Send Immediately</SelectItem>
                  <SelectItem value="schedule">Schedule for Later</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="title">Notification Title</Label>
            <Input 
              id="title"
              placeholder="Enter notification title"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Message Content</Label>
            <Textarea 
              id="content"
              placeholder="Enter your message content here..."
              rows={5}
              className="mt-1"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsComposeOpen(false)}>
            Cancel
          </Button>
          <Button className="d365-button-primary">
            Send Notification
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const renderViewModal = () => (
    <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Notification Details</span>
          </DialogTitle>
        </DialogHeader>
        
        {selectedNotification && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-caption font-semibold">Type</Label>
                <div className="flex items-center space-x-2 mt-1">
                  {getTypeIcon(selectedNotification.type)}
                  <span className="capitalize">{selectedNotification.type}</span>
                </div>
              </div>
              
              <div>
                <Label className="text-caption font-semibold">Target Role</Label>
                <p className="mt-1 capitalize">{selectedNotification.targetRole}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-caption font-semibold">Status</Label>
                <div className="mt-1">{getStatusBadge(selectedNotification.status)}</div>
              </div>
              
              <div>
                <Label className="text-caption font-semibold">Priority</Label>
                <div className="mt-1">{getPriorityBadge(selectedNotification.priority)}</div>
              </div>
            </div>
            
            <div>
              <Label className="text-caption font-semibold">Sent On</Label>
              <p className="mt-1">{new Date(selectedNotification.sentOn).toLocaleString()}</p>
            </div>
            
            <div>
              <Label className="text-caption font-semibold">Recipient</Label>
              <p className="mt-1">{selectedNotification.recipient}</p>
            </div>
            
            <div>
              <Label className="text-caption font-semibold">Title</Label>
              <p className="mt-1 font-medium">{selectedNotification.title}</p>
            </div>
            
            <div>
              <Label className="text-caption font-semibold">Content</Label>
              <p className="mt-1 text-body">{selectedNotification.content}</p>
            </div>
            
            {selectedNotification.readCount !== undefined && selectedNotification.totalRecipients && (
              <div>
                <Label className="text-caption font-semibold">Read Statistics</Label>
                <p className="mt-1">
                  {selectedNotification.readCount} of {selectedNotification.totalRecipients} recipients 
                  ({Math.round((selectedNotification.readCount / selectedNotification.totalRecipients) * 100)}% read rate)
                </p>
              </div>
            )}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
            Close
          </Button>
          {selectedNotification?.status === 'failed' && (
            <Button 
              onClick={() => handleResendNotification(selectedNotification)}
              className="d365-button-primary btn-with-icon"
            >
              <RotateCcw className="h-4 w-4" />
              Resend
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="d365-page-title">Notifications</h1>
            <p className="d365-page-subtitle">
              Manage and monitor system notifications across all channels
            </p>
          </div>
          <Button
            onClick={() => setIsComposeOpen(true)}
            className="d365-button d365-button-primary btn-with-icon"
          >
            <Plus className="h-4 w-4" />
            Compose New Notification
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="d365-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="d365-input-with-icon">
                <Search className="input-icon h-4 w-4" />
                <Input
                  placeholder="Search notifications by title, content, or recipient..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="in-app">In-App</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="officer">Officer</SelectItem>
                  <SelectItem value="citizen">Citizen</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Table */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification History ({filteredAndSortedNotifications.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-d365-surface-secondary"
                    onClick={() => handleSort('title')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Notification Title</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target Role</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-d365-surface-secondary"
                    onClick={() => handleSort('sentOn')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Sent On</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedNotifications.map((notification) => (
                  <TableRow key={notification.id} className="hover:bg-d365-surface-secondary">
                    <TableCell>
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-caption text-d365-secondary line-clamp-1">
                          {notification.content}
                        </p>
                        <p className="text-caption text-d365-secondary mt-1">
                          To: {notification.recipient}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(notification.type)}
                        <span className="capitalize">{notification.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="d365-badge-secondary capitalize">
                        {notification.targetRole}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-d365-secondary" />
                        <span>{new Date(notification.sentOn).toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(notification.status)}</TableCell>
                    <TableCell>{getPriorityBadge(notification.priority)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewNotification(notification)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {notification.status === 'failed' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResendNotification(notification)}
                            title="Resend"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDeleteNotification(notification)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-caption text-d365-secondary">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedNotifications.length)} of {filteredAndSortedNotifications.length} notifications
              </p>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      {renderComposeModal()}
      {renderViewModal()}
    </div>
  );
}