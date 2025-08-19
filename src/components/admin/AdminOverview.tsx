import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Users, 
  Shield, 
  Globe, 
  TrendingUp, 
  Smartphone,
  FileText,
  MessageSquare,
  Wallet,
  Vote,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export function AdminOverview() {
  const citizenStats = [
    {
      title: 'Total Citizens with Digital ID',
      value: '7,834,456',
      icon: Users,
      color: 'bg-blue-500',
      change: '+3.2%',
      trend: 'up'
    },
    {
      title: 'Verified Biometrically',
      value: '5,890,321',
      icon: Shield,
      color: 'bg-green-500',
      percentage: '75.2%',
      trend: 'up'
    },
    {
      title: 'Diaspora Accounts Registered',
      value: '812,490',
      icon: Globe,
      color: 'bg-purple-500',
      change: '+1.8%',
      trend: 'up'
    },
    {
      title: 'Monthly Growth Rate',
      value: '+3.2%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+0.3%',
      trend: 'up'
    },
    {
      title: 'Mobile ID Active Users',
      value: '5,032,110',
      icon: Smartphone,
      color: 'bg-indigo-500',
      percentage: '64.2%',
      trend: 'up'
    }
  ];

  const serviceStats = [
    {
      title: 'Documents Digitally Signed',
      value: '1,384,220',
      icon: FileText,
      color: 'bg-cyan-500',
      period: 'This Month',
      trend: 'up'
    },
    {
      title: 'GovChat Inquiries',
      value: '95,102',
      icon: MessageSquare,
      color: 'bg-pink-500',
      period: 'Last 30 Days',
      trend: 'up'
    },
    {
      title: 'Smart Wallet Transactions',
      value: '$4.2M',
      icon: Wallet,
      color: 'bg-green-600',
      period: 'This Month',
      trend: 'up'
    },
    {
      title: 'Diaspora Votes (Pilot)',
      value: '13,582',
      icon: Vote,
      color: 'bg-violet-500',
      period: 'Ongoing',
      trend: 'neutral'
    }
  ];

  const systemAlerts = [
    {
      type: 'warning',
      message: 'Smart Wallet integration with Barid Cash experiencing intermittent delays',
      time: '15 minutes ago',
      priority: 'medium'
    },
    {
      type: 'info',
      message: 'Scheduled maintenance for Healthcare Sync module at 2:00 AM',
      time: '1 hour ago',
      priority: 'low'
    },
    {
      type: 'success',
      message: 'GovChat AI model successfully updated with 500+ new FAQ entries',
      time: '2 hours ago',
      priority: 'low'
    },
    {
      type: 'error',
      message: 'API rate limit exceeded for external voter verification service',
      time: '45 minutes ago',
      priority: 'high'
    }
  ];

  const recentActivity = [
    {
      action: 'New citizen registration completed',
      user: 'CIV-2025-007834456',
      time: '2 minutes ago',
      type: 'registration'
    },
    {
      action: 'Bulk document verification processed',
      user: 'System Automated',
      time: '5 minutes ago',
      type: 'system'
    },
    {
      action: 'Diaspora voter eligibility verified',
      user: 'VOTE-2025-013582',
      time: '8 minutes ago',
      type: 'voting'
    },
    {
      action: 'Smart Wallet provider Orange Money connected',
      user: 'ADM-2025-002',
      time: '12 minutes ago',
      type: 'wallet'
    },
    {
      action: 'Healthcare record sync completed',
      user: 'HSP-2025-1932114',
      time: '15 minutes ago',
      type: 'healthcare'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            NATIONAL DIGITAL IDENTITY OVERVIEW
          </h1>
          <p className="text-gray-600">
            Real-time monitoring and analytics for the National Digital Identity System
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            GENERATE REPORT
          </Button>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            SYSTEM HEALTH
          </Button>
        </div>
      </div>

      {/* Row 1: Citizen Data Overview */}
      <div>
        <h2 className="text-xl font-bold text-[var(--government-green)] mb-4">
          CITIZEN DATA OVERVIEW
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {citizenStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="formal-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  {stat.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  {stat.change && (
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {stat.change} vs last month
                    </Badge>
                  )}
                  {stat.percentage && (
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {stat.percentage} of total
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Row 2: Service Usage */}
      <div>
        <h2 className="text-xl font-bold text-[var(--government-green)] mb-4">
          SERVICE USAGE ANALYTICS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="formal-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {stat.period}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Row 3: System Status and Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--government-green)]">SYSTEM ALERTS</h3>
            <Badge className="bg-orange-100 text-orange-800">
              {systemAlerts.filter(alert => alert.priority === 'high').length} HIGH PRIORITY
            </Badge>
          </div>
          <div className="space-y-3">
            {systemAlerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="mt-0.5">
                  {alert.type === 'error' && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  {alert.type === 'warning' && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                  {alert.type === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {alert.type === 'info' && (
                    <Activity className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{alert.time}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        alert.priority === 'high' ? 'border-red-200 text-red-700' :
                        alert.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-gray-200 text-gray-700'
                      }`}
                    >
                      {alert.priority.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            VIEW ALL ALERTS
          </Button>
        </Card>

        {/* Recent Activity */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[var(--government-green)]">RECENT ACTIVITY</h3>
            <Button variant="ghost" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              LIVE
            </Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="mt-0.5">
                  {activity.type === 'registration' && (
                    <Users className="h-4 w-4 text-blue-500" />
                  )}
                  {activity.type === 'system' && (
                    <Activity className="h-4 w-4 text-green-500" />
                  )}
                  {activity.type === 'voting' && (
                    <Vote className="h-4 w-4 text-purple-500" />
                  )}
                  {activity.type === 'wallet' && (
                    <Wallet className="h-4 w-4 text-orange-500" />
                  )}
                  {activity.type === 'healthcare' && (
                    <Activity className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            VIEW ACTIVITY LOG
          </Button>
        </Card>
      </div>

      {/* Quick Access Modules */}
      <div>
        <h2 className="text-xl font-bold text-[var(--government-green)] mb-4">
          QUICK ACCESS TO ADMIN MODULES
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Smart Wallet', icon: Wallet, color: 'bg-green-500', users: '3.4M' },
            { name: 'GovChat', icon: MessageSquare, color: 'bg-blue-500', users: '21.5K Daily' },
            { name: 'Diaspora Voting', icon: Vote, color: 'bg-purple-500', users: '110K Eligible' },
            { name: 'Healthcare Sync', icon: Activity, color: 'bg-red-500', users: '2.3M Linked' }
          ].map((module, index) => {
            const Icon = module.icon;
            return (
              <Card key={index} className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center">
                  <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-bold text-[var(--government-green)] mb-1">{module.name}</h4>
                  <p className="text-sm text-gray-600">{module.users}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}