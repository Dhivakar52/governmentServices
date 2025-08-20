import { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Download, 
  FileSearch,
  User,
  Calendar,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Bot
} from 'lucide-react';

interface AuditLogsTrackingProps {
  onBack: () => void;
}

interface AuditLog {
  id: string;
  user: string;
  userType: 'user' | 'system' | 'admin';
  module: string;
  action: string;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  details?: string;
  status: 'success' | 'failed' | 'warning';
  avatar?: string;
}

export function AuditLogsTracking({ onBack }: AuditLogsTrackingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState('all');
  const [selectedModule, setSelectedModule] = useState('all');
  const [dateRange, setDateRange] = useState('7days');

  // Mock audit logs data
  const auditLogs: AuditLog[] = [
    {
      id: '1',
      user: 'Jane Doe',
      userType: 'admin',
      module: 'Users',
      action: 'Edited User Profile',
      timestamp: '2025-01-10 14:32:15',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      details: 'Updated user role from Officer to Senior Officer',
      status: 'success',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b156c4d1?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      user: 'System Bot',
      userType: 'system',
      module: 'Payments',
      action: 'Created Payment Record',
      timestamp: '2025-01-10 13:50:42',
      ipAddress: '10.0.0.1',
      details: 'Automated payment processing for application #APP-2025-001234',
      status: 'success'
    },
    {
      id: '3',
      user: 'A. Kure',
      userType: 'admin',
      module: 'Workflow',
      action: 'Deployed Workflow',
      timestamp: '2025-01-10 13:20:18',
      ipAddress: '192.168.1.150',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      details: 'Deployed "Transport License Application" workflow v2.1',
      status: 'success'
    },
    {
      id: '4',
      user: 'Michael Chen',
      userType: 'user',
      module: 'Applications',
      action: 'Approved Application',
      timestamp: '2025-01-10 12:45:33',
      ipAddress: '192.168.1.200',
      details: 'Approved birth certificate application #BC-2025-5678',
      status: 'success',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '5',
      user: 'Sarah Johnson',
      userType: 'user',
      module: 'Documents',
      action: 'Failed Document Upload',
      timestamp: '2025-01-10 11:30:27',
      ipAddress: '192.168.1.250',
      details: 'Upload failed: File size exceeds 10MB limit',
      status: 'failed',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '6',
      user: 'David Wilson',
      userType: 'admin',
      module: 'System',
      action: 'Updated Configuration',
      timestamp: '2025-01-10 10:15:45',
      ipAddress: '192.168.1.101',
      details: 'Changed session timeout from 30 to 60 minutes',
      status: 'success'
    },
    {
      id: '7',
      user: 'Integration Service',
      userType: 'system',
      module: 'KYC',
      action: 'ID Verification Warning',
      timestamp: '2025-01-10 09:22:11',
      ipAddress: '10.0.0.5',
      details: 'ID verification took longer than expected (>5 seconds)',
      status: 'warning'
    },
    {
      id: '8',
      user: 'Lisa Rodriguez',
      userType: 'user',
      module: 'Reports',
      action: 'Generated Report',
      timestamp: '2025-01-10 08:45:20',
      ipAddress: '192.168.1.175',
      details: 'Generated monthly transport applications report',
      status: 'success'
    }
  ];

  const users = [
    { value: 'all', label: 'All Users' },
    { value: 'jane.doe', label: 'Jane Doe' },
    { value: 'system.bot', label: 'System Bot' },
    { value: 'a.kure', label: 'A. Kure' },
    { value: 'michael.chen', label: 'Michael Chen' },
    { value: 'sarah.johnson', label: 'Sarah Johnson' },
    { value: 'david.wilson', label: 'David Wilson' },
    { value: 'integration.service', label: 'Integration Service' },
    { value: 'lisa.rodriguez', label: 'Lisa Rodriguez' }
  ];

  const modules = [
    { value: 'all', label: 'All Modules' },
    { value: 'users', label: 'User Management' },
    { value: 'payments', label: 'Payment Processing' },
    { value: 'workflow', label: 'Workflow Engine' },
    { value: 'applications', label: 'Applications' },
    { value: 'documents', label: 'Document Management' },
    { value: 'system', label: 'System Configuration' },
    { value: 'kyc', label: 'KYC Integration' },
    { value: 'reports', label: 'Reports & Analytics' },
    { value: 'notifications', label: 'Notifications' }
  ];

  const dateRanges = [
    { value: '1day', label: 'Last 24 hours' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'warning':
        return <Badge className="d365-badge-warning"><Clock className="h-3 w-3 mr-1" />Warning</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case 'system':
        return <Bot className="h-4 w-4" />;
      case 'admin':
        return <Shield className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesUser = selectedUser === 'all' || log.user.toLowerCase().replace(' ', '.') === selectedUser;
    const matchesModule = selectedModule === 'all' || log.module.toLowerCase() === selectedModule;
    
    // Simple date filtering (would be more sophisticated in real implementation)
    const logDate = new Date(log.timestamp);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 3600 * 24));
    
    let matchesDate = true;
    switch (dateRange) {
      case '1day':
        matchesDate = daysDiff <= 1;
        break;
      case '7days':
        matchesDate = daysDiff <= 7;
        break;
      case '30days':
        matchesDate = daysDiff <= 30;
        break;
      case '90days':
        matchesDate = daysDiff <= 90;
        break;
    }
    
    return matchesSearch && matchesUser && matchesModule && matchesDate;
  });

  const handleExportLogs = () => {
    // In a real implementation, this would trigger a CSV/Excel download
    const csvContent = [
      ['User', 'Module', 'Action', 'Timestamp', 'Status', 'IP Address', 'Details'],
      ...filteredLogs.map(log => [
        log.user,
        log.module,
        log.action,
        log.timestamp,
        log.status,
        log.ipAddress || '',
        log.details || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <AdminPageLayout
      title="Audit Logs & Activity Tracking"
      onBack={onBack}
      actionButton={{
        label: 'Export Logs',
        onClick: handleExportLogs,
        icon: <Download className="h-4 w-4" />
      }}
      searchPlaceholder="Search logs by user, module, or action..."
      onSearch={setSearchQuery}
      filters={[
        {
          id: 'user',
          placeholder: 'Filter by User',
          options: users,
          onSelect: setSelectedUser
        },
        {
          id: 'module',
          placeholder: 'Filter by Module',
          options: modules,
          onSelect: setSelectedModule
        },
        {
          id: 'dateRange',
          placeholder: 'Date Range',
          options: dateRanges,
          onSelect: setDateRange
        }
      ]}
    >
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSearch className="h-5 w-5" />
            <span>System Activity Logs ({filteredLogs.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {log.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={log.avatar} alt={log.user} />
                          <AvatarFallback>{log.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-d365-surface-secondary flex items-center justify-center">
                          {getUserIcon(log.userType)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{log.user}</p>
                        <p className="text-caption text-d365-secondary capitalize">{log.userType}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.module}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{log.action}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-d365-secondary" />
                      <span className="text-caption">{log.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>
                    <code className="bg-d365-surface-secondary px-2 py-1 rounded text-caption">
                      {log.ipAddress || 'N/A'}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-caption text-d365-secondary line-clamp-2">
                        {log.details || 'No additional details'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileSearch className="h-16 w-16 mx-auto mb-4 text-d365-secondary opacity-50" />
              <p className="text-d365-secondary">No audit logs found for the selected criteria</p>
              <p className="text-caption text-d365-secondary mt-1">Try adjusting your filters or search terms</p>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminPageLayout>
  );
}