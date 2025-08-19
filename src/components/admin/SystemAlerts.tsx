import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle,
  CheckCircle,

  Shield,
  Server,

  Database,
  Wifi,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Settings,
  Eye,

  RefreshCw,
  Send
} from 'lucide-react';

export function SystemAlerts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [newAlert, setNewAlert] = useState({
    title: '',
    message: '',
    severity: 'medium',
    category: 'system',
    recipients: 'all'
  });

  const alertStats = [
    {
      title: 'Active Alerts',
      value: '23',
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '+5',
      period: 'last hour'
    },
    {
      title: 'Critical Issues',
      value: '3',
      icon: AlertCircle,
      color: 'bg-orange-500',
      change: '+1',
      period: 'needs attention'
    },
    {
      title: 'Resolved Today',
      value: '47',
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+12',
      period: 'resolved'
    },
    {
      title: 'System Health',
      value: '94%',
      icon: Shield,
      color: 'bg-blue-500',
      change: '+2%',
      period: 'overall status'
    }
  ];

  const systemAlerts = [
    {
      id: 'ALT-2025-001',
      title: 'High CPU Usage Detected',
      message: 'Server cluster experiencing CPU usage above 85% for the past 15 minutes. Immediate attention required.',
      severity: 'critical',
      category: 'performance',
      status: 'active',
      timestamp: '2025-01-08 14:30:15',
      source: 'Performance Monitor',
      affectedSystems: ['Web Server', 'API Gateway'],
      assignedTo: 'DevOps Team',
      escalated: true
    },
    {
      id: 'ALT-2025-002',
      title: 'Database Connection Pool Full',
      message: 'Database connection pool has reached maximum capacity. New connections are being queued.',
      severity: 'high',
      category: 'database',
      status: 'active',
      timestamp: '2025-01-08 14:15:30',
      source: 'Database Monitor',
      affectedSystems: ['Primary Database'],
      assignedTo: 'Database Team',
      escalated: false
    },
    {
      id: 'ALT-2025-003',
      title: 'SSL Certificate Expiring Soon',
      message: 'SSL certificate for api.digitalid.gov will expire in 7 days. Renewal required to maintain service.',
      severity: 'medium',
      category: 'security',
      status: 'acknowledged',
      timestamp: '2025-01-08 09:45:22',
      source: 'Security Scanner',
      affectedSystems: ['API Gateway'],
      assignedTo: 'Security Team',
      escalated: false
    },
    {
      id: 'ALT-2025-004',
      title: 'Unusual Login Pattern Detected',
      message: 'Multiple failed login attempts detected from IP range 192.168.100.x. Potential security threat.',
      severity: 'high',
      category: 'security',
      status: 'investigating',
      timestamp: '2025-01-08 08:30:15',
      source: 'Security Monitor',
      affectedSystems: ['Authentication Service'],
      assignedTo: 'Security Team',
      escalated: true
    },
    {
      id: 'ALT-2025-005',
      title: 'Backup Process Completed',
      message: 'Daily system backup completed successfully. All data backed up to secondary storage.',
      severity: 'info',
      category: 'system',
      status: 'resolved',
      timestamp: '2025-01-08 03:00:00',
      source: 'Backup Service',
      affectedSystems: ['Backup System'],
      assignedTo: 'System Admin',
      escalated: false
    }
  ];

  const alertRules = [
    {
      id: 'RULE-001',
      name: 'CPU Usage Threshold',
      condition: 'CPU > 80% for 5 minutes',
      severity: 'high',
      enabled: true,
      category: 'performance',
      actions: ['email', 'sms', 'slack']
    },
    {
      id: 'RULE-002',
      name: 'Failed Login Attempts',
      condition: 'Failed logins > 10 in 1 minute',
      severity: 'critical',
      enabled: true,
      category: 'security',
      actions: ['email', 'block_ip']
    },
    {
      id: 'RULE-003',
      name: 'Database Response Time',
      condition: 'DB response > 2 seconds',
      severity: 'medium',
      enabled: true,
      category: 'database',
      actions: ['email']
    },
    {
      id: 'RULE-004',
      name: 'Storage Space Warning',
      condition: 'Disk usage > 85%',
      severity: 'medium',
      enabled: false,
      category: 'system',
      actions: ['email', 'slack']
    }
  ];

  const filteredAlerts = systemAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'info': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'investigating': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return Shield;
      case 'performance': return TrendingUp;
      case 'database': return Database;
      case 'system': return Server;
      case 'network': return Wifi;
      default: return Bell;
    }
  };

  const viewAlertDetails = (alert: any) => {
    setSelectedAlert(alert);
    setShowAlertDetails(true);
  };

  const handleCreateAlert = () => {
    console.log('Creating alert:', newAlert);
    setNewAlert({ title: '', message: '', severity: 'medium', category: 'system', recipients: 'all' });
    setShowCreateAlert(false);
    alert('System alert created successfully!');
  };

  const acknowledgeAlert = (alertId: string) => {
    console.log('Acknowledging alert:', alertId);
    alert('Alert acknowledged successfully!');
  };

  const resolveAlert = (alertId: string) => {
    console.log('Resolving alert:', alertId);
    alert('Alert resolved successfully!');
  };

  const escalateAlert = (alertId: string) => {
    console.log('Escalating alert:', alertId);
    alert('Alert escalated to senior team!');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--microsoft-gray-900)] mb-2">
            SYSTEM ALERTS
          </h1>
          <p className="text-[var(--microsoft-gray-700)]">
            Real-time system monitoring, alerts, and incident management dashboard
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            REFRESH
          </Button>
          <Button 
            onClick={() => setShowCreateAlert(true)}
            className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            CREATE ALERT
          </Button>
        </div>
      </div>

      {/* Alert Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {alertStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--microsoft-gray-900)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">{stat.title}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">ACTIVE ALERTS</TabsTrigger>
          <TabsTrigger value="rules">ALERT RULES</TabsTrigger>
          <TabsTrigger value="history">ALERT HISTORY</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Filters */}
          <Card className="formal-card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search alerts by title or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="sm:w-40">
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:w-40">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Active Alerts */}
          <div className="space-y-4">
            {filteredAlerts.map((alert) => {
              const CategoryIcon = getCategoryIcon(alert.category);
              return (
                <Card key={alert.id} className="formal-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[var(--microsoft-blue)]/10 p-3 rounded-lg">
                        <CategoryIcon className="h-6 w-6 text-[var(--microsoft-blue)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">
                            {alert.title}
                          </h3>
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(alert.status)}>
                            {alert.status.toUpperCase()}
                          </Badge>
                          {alert.escalated && (
                            <Badge className="bg-red-100 text-red-800">
                              ESCALATED
                            </Badge>
                          )}
                        </div>
                        <p className="text-[var(--microsoft-gray-700)] mb-3">{alert.message}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--microsoft-gray-500)]">
                          <div>
                            <span className="font-medium">ID:</span> {alert.id}
                          </div>
                          <div>
                            <span className="font-medium">Source:</span> {alert.source}
                          </div>
                          <div>
                            <span className="font-medium">Assigned:</span> {alert.assignedTo}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {alert.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {alert.affectedSystems.map((system, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewAlertDetails(alert)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {alert.status === 'active' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          ACKNOWLEDGE
                        </Button>
                      )}
                      {alert.status !== 'resolved' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          RESOLVE
                        </Button>
                      )}
                      {!alert.escalated && alert.severity !== 'info' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => escalateAlert(alert.id)}
                        >
                          ESCALATE
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card className="formal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">ALERT RULES CONFIGURATION</h3>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                ADD RULE
              </Button>
            </div>
            
            <div className="space-y-4">
              {alertRules.map((rule) => (
                <div key={rule.id} className="border border-[var(--microsoft-gray-200)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-[var(--microsoft-gray-900)]">{rule.name}</h4>
                      <Badge className={getSeverityColor(rule.severity)}>
                        {rule.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {rule.category.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {rule.enabled ? 'ENABLED' : 'DISABLED'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-[var(--microsoft-gray-700)] mb-3">{rule.condition}</p>
                  <div className="flex items-center space-x-4 text-sm text-[var(--microsoft-gray-500)]">
                    <span className="font-medium">Actions:</span>
                    {rule.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {action.replace('_', ' ').toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="formal-card">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>ALERT ID</TableHead>
                  <TableHead>TITLE</TableHead>
                  <TableHead>SEVERITY</TableHead>
                  <TableHead>CATEGORY</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>CREATED</TableHead>
                  <TableHead>RESOLVED</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>{alert.title}</TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">{alert.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(alert.status)}>
                        {alert.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{alert.timestamp}</TableCell>
                    <TableCell>
                      {alert.status === 'resolved' ? alert.timestamp : '-'}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => viewAlertDetails(alert)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Alert Modal */}
      <Dialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)]">
              CREATE SYSTEM ALERT
            </DialogTitle>
            <DialogDescription>
              Create a new system alert or notification for administrators.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>ALERT TITLE</Label>
              <Input
                value={newAlert.title}
                onChange={(e) => setNewAlert(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter alert title"
              />
            </div>
            <div>
              <Label>MESSAGE</Label>
              <Textarea
                value={newAlert.message}
                onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter detailed alert message..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>SEVERITY</Label>
                <Select 
                  value={newAlert.severity} 
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, severity: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>CATEGORY</Label>
                <Select 
                  value={newAlert.category} 
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>RECIPIENTS</Label>
                <Select 
                  value={newAlert.recipients} 
                  onValueChange={(value) => setNewAlert(prev => ({ ...prev, recipients: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Admins</SelectItem>
                    <SelectItem value="ops">Operations Team</SelectItem>
                    <SelectItem value="security">Security Team</SelectItem>
                    <SelectItem value="devops">DevOps Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateAlert(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleCreateAlert}
                disabled={!newAlert.title || !newAlert.message}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                CREATE ALERT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Details Modal */}
      <Dialog open={showAlertDetails} onOpenChange={setShowAlertDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)]">
              ALERT DETAILS: {selectedAlert?.title}
            </DialogTitle>
            <DialogDescription>
              Complete information and response history for this system alert.
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label>ALERT ID</Label>
                  <p className="font-medium">{selectedAlert.id}</p>
                </div>
                <div>
                  <Label>TIMESTAMP</Label>
                  <p className="font-medium">{selectedAlert.timestamp}</p>
                </div>
                <div>
                  <Label>SEVERITY</Label>
                  <Badge className={getSeverityColor(selectedAlert.severity)}>
                    {selectedAlert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>STATUS</Label>
                  <Badge className={getStatusColor(selectedAlert.status)}>
                    {selectedAlert.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>CATEGORY</Label>
                  <p className="font-medium capitalize">{selectedAlert.category}</p>
                </div>
                <div>
                  <Label>SOURCE</Label>
                  <p className="font-medium">{selectedAlert.source}</p>
                </div>
              </div>
              
              <div>
                <Label>MESSAGE</Label>
                <p className="text-[var(--microsoft-gray-700)] bg-gray-50 p-3 rounded-lg">
                  {selectedAlert.message}
                </p>
              </div>

              <div>
                <Label>AFFECTED SYSTEMS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAlert.affectedSystems?.map((system: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  ADD COMMENT
                </Button>
                <Button variant="outline">
                  EXPORT DETAILS
                </Button>
                <Button onClick={() => setShowAlertDetails(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}