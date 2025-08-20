
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Users, 
  Building2, 
  Settings, 
  BarChart3, 
  Shield, 
  Database,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Server
} from 'lucide-react';
import civilityLogo from '../assets/dummy_logo.jpg';

const systemStats = {
  totalUsers: 15840,
  activeOfficers: 234,
  departments: 12,
  applicationsToday: 156,
  systemUptime: 99.8,
  serverLoad: 45,
  pendingApprovals: 23,
  activeServices: 8
};

const recentActivities = [
  {
    action: 'New Department Created',
    details: 'Health Department - Lagos State',
    user: 'System Admin',
    timestamp: '2 minutes ago',
    type: 'success'
  },
  {
    action: 'User Role Updated',
    details: 'Officer promoted to Senior Officer',
    user: 'HR Admin',
    timestamp: '15 minutes ago',
    type: 'info'
  },
  {
    action: 'System Backup Completed',
    details: 'Daily backup completed successfully',
    user: 'System',
    timestamp: '1 hour ago',
    type: 'success'
  },
  {
    action: 'High Server Load Alert',
    details: 'Server load reached 85%',
    user: 'System Monitor',
    timestamp: '2 hours ago',
    type: 'warning'
  }
];

const departments = [
  { name: 'Transport Department', users: 45, applications: 234, status: 'Active' },
  { name: 'Civil Registry', users: 32, applications: 189, status: 'Active' },
  { name: 'Health Department', users: 28, applications: 156, status: 'Active' },
  { name: 'Education Department', users: 23, applications: 98, status: 'Active' },
  { name: 'Tax Department', users: 19, applications: 67, status: 'Maintenance' }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    case 'info':
      return <Shield className="h-4 w-4 text-blue-600" />;
    default:
      return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

export function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="d365-page-header">
        <div className="flex items-center space-x-4">
          <img 
            src={civilityLogo} 
            alt="Civility" 
            className="h-12 w-auto object-contain"
          />
          <div>
            <h1 className="d365-page-title">System Administration</h1>
            <p className="d365-page-subtitle">Central command for Civility eServices Platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="d365-button d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            <span className="text-body font-medium">System Settings</span>
          </Button>
          <Button className="d365-button d365-button-secondary btn-with-icon">
            <Database className="w-4 h-4" />
            <span className="text-body font-medium">Backup Now</span>
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% from last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Active Officers</p>
                <p className="text-2xl font-bold">{systemStats.activeOfficers}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Departments</p>
                <p className="text-2xl font-bold">{systemStats.departments}</p>
                <p className="text-xs text-blue-600">All systems operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Applications Today</p>
                <p className="text-2xl font-bold">{systemStats.applicationsToday}</p>
                <p className="text-xs text-orange-600 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  -8.3% from yesterday
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Health &amp; Performance</CardTitle>
            <CardDescription>Real-time system monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>System Uptime</span>
                  <span className="font-medium">{systemStats.systemUptime}%</span>
                </div>
                <Progress value={systemStats.systemUptime} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Server Load</span>
                  <span className="font-medium">{systemStats.serverLoad}%</span>
                </div>
                <Progress value={systemStats.serverLoad} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Database Performance</span>
                  <span className="font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>API Response Time</span>
                  <span className="font-medium">156ms avg</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <Server className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Primary Server</p>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge>
              </div>
              <div className="text-center">
                <Database className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">Database Cluster</p>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Healthy</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Administrative shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Building2 className="mr-2 h-4 w-4" />
              Department Settings
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Configuration
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Backup &amp; Restore
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Security Audit
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Monitor all government departments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dept.users} users • {dept.applications} applications
                    </p>
                  </div>
                  <Badge 
                    className={dept.status === 'Active' 
                      ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                    }
                  >
                    {dept.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activities</CardTitle>
            <CardDescription>Latest administrative actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.details}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">By {activity.user}</span>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>System Alerts &amp; Notifications</CardTitle>
          <CardDescription>Important system messages requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <p className="font-medium text-yellow-900">Pending Approvals</p>
              </div>
              <p className="text-sm text-yellow-700">
                {systemStats.pendingApprovals} administrative actions awaiting approval
              </p>
              <Button size="sm" variant="outline" className="mt-2 text-yellow-700 border-yellow-300">
                Review Now
              </Button>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <p className="font-medium text-blue-900">Security Status</p>
              </div>
              <p className="text-sm text-blue-700">
                All security protocols are active and functioning
              </p>
              <Button size="sm" variant="outline" className="mt-2 text-blue-700 border-blue-300">
                View Details
              </Button>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="font-medium text-green-900">System Health</p>
              </div>
              <p className="text-sm text-green-700">
                All systems operational with {systemStats.systemUptime}% uptime
              </p>
              <Button size="sm" variant="outline" className="mt-2 text-green-700 border-green-300">
                View Metrics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}