import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Monitor, 
  Server, 
  Database,
  Cpu,
  HardDrive,
  Network,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw,
  Download,
  Settings,
  Zap,
  Globe,
  Shield
} from 'lucide-react';

export function SystemMonitoring() {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const systemStats = [
    {
      title: 'System Uptime',
      value: '99.97%',
      icon: Activity,
      color: 'bg-green-500',
      change: '+0.02%',
      period: 'last 30 days'
    },
    {
      title: 'API Response Time',
      value: '145ms',
      icon: Zap,
      color: 'bg-blue-500',
      change: '-12ms',
      period: 'avg last hour'
    },
    {
      title: 'Active Connections',
      value: '24,567',
      icon: Network,
      color: 'bg-purple-500',
      change: '+1,245',
      period: 'current users'
    },
    {
      title: 'Database Health',
      value: '98.5%',
      icon: Database,
      color: 'bg-orange-500',
      change: 'Optimal',
      period: 'performance score'
    }
  ];

  const serverMetrics = [
    {
      name: 'Web Server Cluster',
      status: 'healthy',
      cpu: '45%',
      memory: '62%',
      disk: '78%',
      uptime: '45 days',
      requests: '1.2M/hr',
      region: 'Primary DC'
    },
    {
      name: 'Database Cluster',
      status: 'healthy',
      cpu: '38%',
      memory: '71%',
      disk: '85%',
      uptime: '45 days',
      requests: '850K/hr',
      region: 'Primary DC'
    },
    {
      name: 'API Gateway',
      status: 'warning',
      cpu: '72%',
      memory: '89%',
      disk: '45%',
      uptime: '22 days',
      requests: '2.1M/hr',
      region: 'Primary DC'
    },
    {
      name: 'File Storage',
      status: 'healthy',
      cpu: '25%',
      memory: '45%',
      disk: '92%',
      uptime: '67 days',
      requests: '450K/hr',
      region: 'Secondary DC'
    },
    {
      name: 'Authentication Service',
      status: 'healthy',
      cpu: '55%',
      memory: '68%',
      disk: '34%',
      uptime: '12 days',
      requests: '750K/hr',
      region: 'Primary DC'
    }
  ];

  const alerts = [
    {
      id: 'ALT-001',
      severity: 'high',
      title: 'API Gateway CPU Usage High',
      description: 'CPU usage on API Gateway has exceeded 70% for the last 15 minutes',
      timestamp: '2025-01-08 14:30:15',
      status: 'active',
      affected: 'API Gateway Cluster'
    },
    {
      id: 'ALT-002',
      severity: 'medium',
      title: 'Database Storage Warning',
      description: 'Database storage usage has reached 85% capacity',
      timestamp: '2025-01-08 13:45:22',
      status: 'acknowledged',
      affected: 'Database Cluster'
    },
    {
      id: 'ALT-003',
      severity: 'low',
      title: 'Authentication Service Restart',
      description: 'Authentication service was automatically restarted due to memory leak',
      timestamp: '2025-01-08 02:15:30',
      status: 'resolved',
      affected: 'Authentication Service'
    },
    {
      id: 'ALT-004',
      severity: 'critical',
      title: 'Network Latency Spike',
      description: 'Network latency between data centers exceeded threshold',
      timestamp: '2025-01-07 23:12:45',
      status: 'resolved',
      affected: 'Network Infrastructure'
    }
  ];

  const performanceMetrics = [
    { metric: 'Page Load Time', value: '1.2s', target: '<2s', status: 'good' },
    { metric: 'API Success Rate', value: '99.8%', target: '>99%', status: 'excellent' },
    { metric: 'Error Rate', value: '0.2%', target: '<1%', status: 'excellent' },
    { metric: 'Concurrent Users', value: '24,567', target: '50K max', status: 'good' },
    { metric: 'Database Queries/sec', value: '8,450', target: '10K max', status: 'good' },
    { metric: 'Cache Hit Rate', value: '94.5%', target: '>90%', status: 'excellent' }
  ];

  const securityMetrics = [
    { metric: 'Failed Login Attempts', value: '1,245', period: 'last 24h', status: 'normal' },
    { metric: 'DDoS Attacks Blocked', value: '12', period: 'last 24h', status: 'normal' },
    { metric: 'Suspicious IPs Blocked', value: '456', period: 'last 24h', status: 'normal' },
    { metric: 'SSL Certificate Status', value: 'Valid', period: 'expires in 89 days', status: 'good' },
    { metric: 'Firewall Rules', value: '1,234 active', period: 'last updated 2h ago', status: 'good' },
    { metric: 'Security Patches', value: 'Up to date', period: 'last check 1h ago', status: 'good' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const getAlertStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800';
      case 'acknowledged': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const refreshData = () => {
    setLastRefresh(new Date());
    // Simulate data refresh
    console.log('Refreshing system monitoring data...');
  };

  const exportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      systemStats,
      serverMetrics,
      alerts,
      performanceMetrics,
      securityMetrics
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `system_monitoring_report_${new Date().toISOString().split('T')[0]}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            SYSTEM MONITORING
          </h1>
          <p className="text-gray-600">
            Real-time monitoring of system health, performance, and security infrastructure
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            REFRESH
          </Button>
          <Button onClick={exportReport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            EXPORT REPORT
          </Button>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
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

      <Tabs defaultValue="infrastructure" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="infrastructure">INFRASTRUCTURE</TabsTrigger>
          <TabsTrigger value="performance">PERFORMANCE</TabsTrigger>
          <TabsTrigger value="alerts">ALERTS</TabsTrigger>
          <TabsTrigger value="security">SECURITY</TabsTrigger>
        </TabsList>

        <TabsContent value="infrastructure" className="space-y-6">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">SERVER INFRASTRUCTURE</h3>
            <div className="space-y-4">
              {serverMetrics.map((server, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                        <Server className="h-5 w-5 text-[var(--government-green)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--government-green)]">{server.name}</h4>
                        <p className="text-sm text-gray-600">{server.region}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(server.status)}>
                      {server.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Cpu className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">CPU</span>
                      </div>
                      <p className="font-bold">{server.cpu}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Monitor className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Memory</span>
                      </div>
                      <p className="font-bold">{server.memory}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <HardDrive className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Disk</span>
                      </div>
                      <p className="font-bold">{server.disk}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Uptime</span>
                      </div>
                      <p className="font-bold">{server.uptime}</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <Activity className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Requests</span>
                      </div>
                      <p className="font-bold">{server.requests}</p>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">PERFORMANCE METRICS</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{metric.metric}</h4>
                    <Badge className={getMetricStatusColor(metric.status)}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[var(--government-green)]">{metric.value}</p>
                      <p className="text-sm text-gray-500">Target: {metric.target}</p>
                    </div>
                    <div className="text-right">
                      {metric.status === 'excellent' && <CheckCircle className="h-8 w-8 text-green-500" />}
                      {metric.status === 'good' && <CheckCircle className="h-8 w-8 text-blue-500" />}
                      {metric.status === 'warning' && <AlertTriangle className="h-8 w-8 text-yellow-500" />}
                      {metric.status === 'critical' && <AlertTriangle className="h-8 w-8 text-red-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card className="formal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--government-green)]">SYSTEM ALERTS</h3>
              <div className="flex space-x-2">
                <Badge className="bg-red-100 text-red-800">
                  {alerts.filter(a => a.status === 'active').length} ACTIVE
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {alerts.filter(a => a.status === 'acknowledged').length} ACKNOWLEDGED
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {alert.severity === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                        {alert.severity === 'high' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
                        {alert.severity === 'medium' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        {alert.severity === 'low' && <AlertTriangle className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--government-green)]">{alert.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                        <p className="text-xs text-gray-500 mt-2">Affected: {alert.affected}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Badge className={getAlertStatusColor(alert.status)} style={{ marginLeft: '8px' }}>
                        {alert.status.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                    </div>
                  </div>
                  
                  {alert.status === 'active' && (
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        ACKNOWLEDGE
                      </Button>
                      <Button variant="outline" size="sm">
                        RESOLVE
                      </Button>
                      <Button variant="outline" size="sm">
                        ESCALATE
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">SECURITY MONITORING</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {securityMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-[var(--government-green)]" />
                      <h4 className="font-medium">{metric.metric}</h4>
                    </div>
                    <Badge className={getMetricStatusColor(metric.status)}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[var(--government-green)]">{metric.value}</p>
                    <p className="text-sm text-gray-500">{metric.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-4">NETWORK SECURITY STATUS</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-800">FIREWALL</h4>
                <p className="text-sm text-green-600">Active & Updated</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-blue-800">DDoS PROTECTION</h4>
                <p className="text-sm text-blue-600">Monitoring Active</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-bold text-purple-800">INTRUSION DETECTION</h4>
                <p className="text-sm text-purple-600">Real-time Scanning</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}