import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Key, 
  Activity, 
  Globe,
  Shield,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  Ban,
  CheckCircle,
  Clock,
  Lock,
  Zap
} from 'lucide-react';

export function ApiAccessLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('24h');
  const [showApiKeyDetails, setShowApiKeyDetails] = useState(false);
  const [selectedApiKey, setSelectedApiKey] = useState<any>(null);

  const apiStats = [
    {
      title: 'Total API Requests',
      value: '2.4M',
      icon: Activity,
      color: 'bg-blue-500',
      change: '+125K',
      period: 'last 24h'
    },
    {
      title: 'Active API Keys',
      value: '1,247',
      icon: Key,
      color: 'bg-green-500',
      change: '+23',
      period: 'this week'
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      icon: CheckCircle,
      color: 'bg-purple-500',
      change: '+0.3%',
      period: 'improvement'
    },
    {
      title: 'Rate Limit Violations',
      value: '1,456',
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '+234',
      period: 'blocked requests'
    }
  ];

  const apiEndpoints = [
    { endpoint: '/api/v1/citizens/verify', requests: '425,670', avgResponse: '120ms', successRate: '99.8%', status: 'healthy' },
    { endpoint: '/api/v1/documents/upload', requests: '234,890', avgResponse: '850ms', successRate: '98.9%', status: 'healthy' },
    { endpoint: '/api/v1/auth/login', requests: '189,340', avgResponse: '95ms', successRate: '99.5%', status: 'healthy' },
    { endpoint: '/api/v1/wallet/transaction', requests: '156,780', avgResponse: '200ms', successRate: '97.2%', status: 'warning' },
    { endpoint: '/api/v1/healthcare/sync', requests: '98,450', avgResponse: '340ms', successRate: '99.1%', status: 'healthy' },
    { endpoint: '/api/v1/voting/verify', requests: '45,230', avgResponse: '180ms', successRate: '99.9%', status: 'healthy' }
  ];

  const recentLogs = [
    {
      id: 'LOG-001',
      timestamp: '2025-01-08 14:30:25',
      method: 'POST',
      endpoint: '/api/v1/citizens/verify',
      clientIp: '192.168.1.45',
      apiKey: 'ak_live_***4567',
      responseCode: 200,
      responseTime: '125ms',
      userAgent: 'DigitalID-Mobile/2.1.0',
      dataTransfer: '1.2KB'
    },
    {
      id: 'LOG-002',
      timestamp: '2025-01-08 14:30:23',
      method: 'GET',
      endpoint: '/api/v1/documents/list',
      clientIp: '10.0.0.12',
      apiKey: 'ak_live_***8901',
      responseCode: 200,
      responseTime: '89ms',
      userAgent: 'DigitalID-Web/1.5.2',
      dataTransfer: '3.4KB'
    },
    {
      id: 'LOG-003',
      timestamp: '2025-01-08 14:30:21',
      method: 'POST',
      endpoint: '/api/v1/wallet/transaction',
      clientIp: '172.16.0.8',
      apiKey: 'ak_live_***2345',
      responseCode: 429,
      responseTime: '15ms',
      userAgent: 'WalletApp/3.0.1',
      dataTransfer: '0.5KB'
    },
    {
      id: 'LOG-004',
      timestamp: '2025-01-08 14:30:19',
      method: 'PUT',
      endpoint: '/api/v1/citizens/update',
      clientIp: '203.0.113.5',
      apiKey: 'ak_live_***6789',
      responseCode: 200,
      responseTime: '234ms',
      userAgent: 'AdminPortal/2.0.0',
      dataTransfer: '2.1KB'
    },
    {
      id: 'LOG-005',
      timestamp: '2025-01-08 14:30:17',
      method: 'GET',
      endpoint: '/api/v1/healthcare/records',
      clientIp: '198.51.100.3',
      apiKey: 'ak_live_***3456',
      responseCode: 403,
      responseTime: '12ms',
      userAgent: 'HealthSync/1.8.0',
      dataTransfer: '0.3KB'
    }
  ];

  const apiKeys = [
    {
      id: 'ak_live_1234567890abcdef',
      name: 'Mobile App Production',
      organization: 'Ministry of Digital Services',
      created: '2024-12-01',
      lastUsed: '2025-01-08 14:30:25',
      requests24h: '125,670',
      rateLimit: '10,000/hour',
      status: 'active',
      permissions: ['citizens:read', 'documents:upload', 'auth:login']
    },
    {
      id: 'ak_live_2345678901bcdefg',
      name: 'Healthcare Integration',
      organization: 'National Health Authority',
      created: '2024-11-15',
      lastUsed: '2025-01-08 14:28:12',
      requests24h: '89,340',
      rateLimit: '5,000/hour',
      status: 'active',
      permissions: ['healthcare:read', 'healthcare:write', 'citizens:read']
    },
    {
      id: 'ak_live_3456789012cdefgh',
      name: 'Banking Integration',
      organization: 'Bank Al-Maghrib',
      created: '2024-10-20',
      lastUsed: '2025-01-08 14:15:45',
      requests24h: '234,890',
      rateLimit: '15,000/hour',
      status: 'active',
      permissions: ['wallet:read', 'wallet:write', 'citizens:verify']
    },
    {
      id: 'ak_live_4567890123defghi',
      name: 'Third Party Developer',
      organization: 'TechCorp Solutions',
      created: '2024-09-10',
      lastUsed: '2025-01-07 16:22:33',
      requests24h: '12,456',
      rateLimit: '1,000/hour',
      status: 'suspended',
      permissions: ['citizens:read']
    }
  ];

  const securityEvents = [
    {
      id: 'SEC-001',
      type: 'Rate Limit Exceeded',
      description: 'API key ak_live_***2345 exceeded rate limit for /api/v1/wallet/transaction',
      severity: 'medium',
      timestamp: '2025-01-08 14:30:21',
      clientIp: '172.16.0.8',
      action: 'Request blocked'
    },
    {
      id: 'SEC-002',
      type: 'Invalid API Key',
      description: 'Request with invalid API key attempted to access /api/v1/citizens/verify',
      severity: 'high',
      timestamp: '2025-01-08 14:25:15',
      clientIp: '203.0.113.100',
      action: 'Request rejected'
    },
    {
      id: 'SEC-003',
      type: 'Suspicious Activity',
      description: 'Multiple failed authentication attempts from single IP',
      severity: 'high',
      timestamp: '2025-01-08 14:20:30',
      clientIp: '198.51.100.50',
      action: 'IP temporarily blocked'
    },
    {
      id: 'SEC-004',
      type: 'Privilege Escalation Attempt',
      description: 'API key attempted to access unauthorized endpoint',
      severity: 'critical',
      timestamp: '2025-01-08 14:10:45',
      clientIp: '192.0.2.25',
      action: 'API key suspended'
    }
  ];

  const filteredLogs = recentLogs.filter(log => {
    const matchesSearch = log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.clientIp.includes(searchTerm) ||
                         log.apiKey.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'success' && log.responseCode < 400) ||
                         (statusFilter === 'error' && log.responseCode >= 400);
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResponseCodeColor = (code: number) => {
    if (code < 300) return 'bg-green-100 text-green-800';
    if (code < 400) return 'bg-blue-100 text-blue-800';
    if (code < 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEndpointStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewApiKeyDetails = (apiKey: any) => {
    setSelectedApiKey(apiKey);
    setShowApiKeyDetails(true);
  };

  const exportLogs = () => {
    const csvData = [
      ['Timestamp', 'Method', 'Endpoint', 'Client IP', 'API Key', 'Response Code', 'Response Time'],
      ...filteredLogs.map(log => [
        log.timestamp, log.method, log.endpoint, log.clientIp, log.apiKey, log.responseCode, log.responseTime
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `api_access_logs_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            API ACCESS LOGS
          </h1>
          <p className="text-gray-600">
            Monitor API usage, access patterns, and security events across all government services
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportLogs} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            EXPORT LOGS
          </Button>
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            SECURITY REPORT
          </Button>
        </div>
      </div>

      {/* API Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apiStats.map((stat, index) => {
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
                <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="logs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="logs">ACCESS LOGS</TabsTrigger>
          <TabsTrigger value="endpoints">ENDPOINTS</TabsTrigger>
          <TabsTrigger value="keys">API KEYS</TabsTrigger>
          <TabsTrigger value="security">SECURITY</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-6">
          {/* Filters */}
          <Card className="formal-card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by endpoint, IP, or API key..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[var(--government-green)]/30 focus:border-[var(--government-green)]"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-[var(--government-green)]/30 focus:border-[var(--government-green)]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Requests</SelectItem>
                    <SelectItem value="success">Success (2xx)</SelectItem>
                    <SelectItem value="error">Errors (4xx/5xx)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="sm:w-32">
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger>
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">Last Hour</SelectItem>
                    <SelectItem value="24h">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Access Logs Table */}
          <Card className="formal-card">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-bold text-[var(--government-green)]">TIMESTAMP</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">METHOD</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">ENDPOINT</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">CLIENT IP</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">API KEY</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">RESPONSE</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">TIME</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">SIZE</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} className="hover:bg-gray-50">
                    <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {log.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm max-w-xs truncate">{log.endpoint}</TableCell>
                    <TableCell className="font-mono text-sm">{log.clientIp}</TableCell>
                    <TableCell className="font-mono text-sm">{log.apiKey}</TableCell>
                    <TableCell>
                      <Badge className={getResponseCodeColor(log.responseCode)}>
                        {log.responseCode}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.responseTime}</TableCell>
                    <TableCell>{log.dataTransfer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">API ENDPOINT PERFORMANCE</h3>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                        <Globe className="h-5 w-5 text-[var(--government-green)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--government-green)] font-mono">{endpoint.endpoint}</h4>
                      </div>
                    </div>
                    <Badge className={getEndpointStatusColor(endpoint.status)}>
                      {endpoint.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Activity className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Requests (24h)</span>
                      </div>
                      <p className="font-bold">{endpoint.requests}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Zap className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Avg Response</span>
                      </div>
                      <p className="font-bold">{endpoint.avgResponse}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <CheckCircle className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Success Rate</span>
                      </div>
                      <p className="font-bold">{endpoint.successRate}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        DETAILS
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-6">
          <Card className="formal-card">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--government-green)]">API KEY MANAGEMENT</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {apiKeys.filter(k => k.status === 'active').length} ACTIVE KEYS
                </Badge>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>API KEY</TableHead>
                  <TableHead>NAME</TableHead>
                  <TableHead>ORGANIZATION</TableHead>
                  <TableHead>REQUESTS (24H)</TableHead>
                  <TableHead>RATE LIMIT</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>LAST USED</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell className="font-mono text-sm">{apiKey.id.substring(0, 16)}...</TableCell>
                    <TableCell className="font-medium">{apiKey.name}</TableCell>
                    <TableCell>{apiKey.organization}</TableCell>
                    <TableCell className="font-bold">{apiKey.requests24h}</TableCell>
                    <TableCell>{apiKey.rateLimit}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(apiKey.status)}>
                        {apiKey.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{apiKey.lastUsed}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewApiKeyDetails(apiKey)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="formal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--government-green)]">SECURITY EVENTS</h3>
              <Badge className="bg-red-100 text-red-800">
                {securityEvents.filter(e => e.severity === 'critical' || e.severity === 'high').length} HIGH PRIORITY
              </Badge>
            </div>
            
            <div className="space-y-4">
              {securityEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <Shield className="h-5 w-5 text-[var(--government-green)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--government-green)]">{event.type}</h4>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>IP: {event.clientIp}</span>
                          <span>Action: {event.action}</span>
                          <span>{event.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(event.severity)}>
                      {event.severity.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="formal-card p-6 text-center">
              <Lock className="h-12 w-12 text-[var(--government-green)] mx-auto mb-4" />
              <h4 className="font-bold text-[var(--government-green)] mb-2">AUTHENTICATION</h4>
              <p className="text-2xl font-bold mb-1">99.8%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </Card>
            <Card className="formal-card p-6 text-center">
              <Shield className="h-12 w-12 text-[var(--government-green)] mx-auto mb-4" />
              <h4 className="font-bold text-[var(--government-green)] mb-2">RATE LIMITING</h4>
              <p className="text-2xl font-bold mb-1">1,456</p>
              <p className="text-sm text-gray-600">Blocked Requests</p>
            </Card>
            <Card className="formal-card p-6 text-center">
              <AlertTriangle className="h-12 w-12 text-[var(--government-green)] mx-auto mb-4" />
              <h4 className="font-bold text-[var(--government-green)] mb-2">THREAT DETECTION</h4>
              <p className="text-2xl font-bold mb-1">23</p>
              <p className="text-sm text-gray-600">Blocked IPs</p>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* API Key Details Modal */}
      <Dialog open={showApiKeyDetails} onOpenChange={setShowApiKeyDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              API KEY DETAILS
            </DialogTitle>
            <DialogDescription>
              Comprehensive information and usage statistics for this API key.
            </DialogDescription>
          </DialogHeader>
          {selectedApiKey && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>API KEY ID</Label>
                  <p className="font-mono text-sm">{selectedApiKey.id}</p>
                </div>
                <div>
                  <Label>KEY NAME</Label>
                  <p className="font-medium">{selectedApiKey.name}</p>
                </div>
                <div>
                  <Label>ORGANIZATION</Label>
                  <p className="font-medium">{selectedApiKey.organization}</p>
                </div>
                <div>
                  <Label>STATUS</Label>
                  <Badge className={getStatusColor(selectedApiKey.status)}>
                    {selectedApiKey.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>CREATED</Label>
                  <p className="font-medium">{selectedApiKey.created}</p>
                </div>
                <div>
                  <Label>LAST USED</Label>
                  <p className="font-medium">{selectedApiKey.lastUsed}</p>
                </div>
                <div>
                  <Label>REQUESTS (24H)</Label>
                  <p className="font-medium">{selectedApiKey.requests24h}</p>
                </div>
                <div>
                  <Label>RATE LIMIT</Label>
                  <p className="font-medium">{selectedApiKey.rateLimit}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-[var(--government-green)]">PERMISSIONS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedApiKey.permissions?.map((permission: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  REGENERATE KEY
                </Button>
                <Button variant="outline">
                  MODIFY PERMISSIONS
                </Button>
                <Button onClick={() => setShowApiKeyDetails(false)}>
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