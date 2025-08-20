
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

import { 
  Plus, 
  FileText, 

  Calendar, 
  Clock, 
  CheckCircle, 

  TrendingUp,
  Activity,
  Eye,
  CarFront,
  Baby,
  Truck,
  HeartHandshake
} from 'lucide-react';
import civilityLogo from '../assets/dummy_logo.jpg';

const recentApplications = [
  {
    id: 'DL-2025-001',
    type: 'Driver\'s License Renewal',
    status: 'In Review',
    statusType: 'warning' as const,
    submittedDate: '2025-01-15',
    expectedDate: '2025-01-22'
  },
  {
    id: 'BC-2025-002', 
    type: 'Birth Certificate',
    status: 'Approved',
    statusType: 'success' as const,
    submittedDate: '2025-01-10',
    expectedDate: '2025-01-17'
  },
  {
    id: 'VR-2025-003',
    type: 'Vehicle Registration',
    status: 'Pending Documents',
    statusType: 'error' as const,
    submittedDate: '2025-01-12',
    expectedDate: '2025-01-25'
  }
];

const quickServices = [
  {
    title: 'Driver\'s License',
    description: 'Apply for new license or renewal',
    icon: CarFront,
    estimatedTime: '7-10 days',
    popularity: 'Most Popular',
    navigationId: 'apply-drivers-license'
  },
  {
    title: 'Birth Certificate',
    description: 'Request official birth certificate',
    icon: Baby,
    estimatedTime: '3-5 days',
    popularity: 'Fast Processing',
    navigationId: 'apply-birth-certificate'
  },
  {
    title: 'Vehicle Registration',
    description: 'Register new or transfer vehicle',
    icon: Truck,
    estimatedTime: '5-7 days',
    popularity: 'Required Document',
    navigationId: 'apply-vehicle-registration'
  },
  {
    title: 'Marriage Certificate',
    description: 'Apply for marriage certificate',
    icon: HeartHandshake,
    estimatedTime: '14-21 days',
    popularity: 'Civil Registry',
    navigationId: 'apply-marriage-certificate'
  }
];


interface CitizenDashboardProps {
  onNavigate?: (view: string) => void;
}

export function CitizenDashboard({ onNavigate }: CitizenDashboardProps = {}) {
  const getStatusBadge = (status: string, type: 'success' | 'warning' | 'error' | 'secondary') => {
    const badgeClass = `d365-badge d365-badge-${type}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div className="flex items-center space-x-4">
          <img 
            src={civilityLogo} 
            alt="Civility" 
            className="h-12 w-auto object-contain"
          />
          <div>
            <h1 className="d365-page-title">Welcome back, John</h1>
            <p className="d365-page-subtitle">
              Manage your government services and track your applications
            </p>
          </div>
        </div>
        <Button 
          className="d365-button d365-button-primary btn-with-icon"
          onClick={() => onNavigate?.('apply-drivers-license')}
        >
          <Plus className="w-4 h-4" />
          <span className="text-body font-medium">New Application</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-primary">3</div>
                <div className="text-body text-d365-secondary">Active Applications</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-primary">8</div>
                <div className="text-body text-d365-secondary">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-primary">5</div>
                <div className="text-body text-d365-secondary">Avg. Days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-primary">12</div>
                <div className="text-body text-d365-secondary">This Year</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="text-title3 font-semibold text-d365-primary icon-text">
              <Activity className="w-5 h-5" />
              <span>Recent Applications</span>
            </CardTitle>
            <CardDescription className="text-body text-d365-secondary">
              Track the status of your submitted applications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.map((app) => (
              <div 
                key={app.id} 
                className="flex items-center justify-between p-4 border border-d365 rounded-lg hover:bg-d365-hover transition-colors cursor-pointer"
                onClick={() => onNavigate?.('track-application')}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-d365-surface-secondary rounded-lg">
                    <FileText className="w-5 h-5 text-d365-primary" />
                  </div>
                  <div>
                    <div className="text-body font-medium text-d365-primary">{app.type}</div>
                    <div className="text-caption text-d365-secondary">
                      ID: {app.id} • Submitted {app.submittedDate}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(app.status, app.statusType)}
                  <div className="text-caption text-d365-secondary mt-1">
                    Expected: {app.expectedDate}
                  </div>
                </div>
              </div>
            ))}
            <Button 
              className="d365-button d365-button-secondary w-full btn-with-icon"
              onClick={() => onNavigate?.('track-application')}
            >
              <Eye className="w-4 h-4" />
              <span className="text-body font-medium">View All Applications</span>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Services */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="text-title3 font-semibold text-d365-primary icon-text">
              <Plus className="w-5 h-5" />
              <span>Quick Services</span>
            </CardTitle>
            <CardDescription className="text-body text-d365-secondary">
              Start a new application for popular services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quickServices.map((service, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 border border-d365 rounded-lg hover:bg-d365-hover transition-colors cursor-pointer"
                onClick={() => onNavigate?.(service.navigationId)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-d365-surface-secondary rounded-lg">
                    <service.icon className="w-5 h-5 text-d365-primary" />
                  </div>
                  <div>
                    <div className="text-body font-medium text-d365-primary">{service.title}</div>
                    <div className="text-caption text-d365-secondary">{service.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="d365-badge d365-badge-secondary">{service.popularity}</div>
                  <div className="text-caption text-d365-secondary mt-1">
                    {service.estimatedTime}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="text-title3 font-semibold text-d365-primary icon-text">
            <Calendar className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription className="text-body text-d365-secondary">
            Your recent interactions with government services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-d365-hover transition-colors">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-body font-medium text-d365-primary">
                  Birth Certificate application approved
                </div>
                <div className="text-caption text-d365-secondary">
                  Your birth certificate is ready for collection • 2 hours ago
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-d365-hover transition-colors">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-body font-medium text-d365-primary">
                  Driver's License under review
                </div>
                <div className="text-caption text-d365-secondary">
                  Officer reviewing your documents • 1 day ago
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-d365-hover transition-colors">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <div className="text-body font-medium text-d365-primary">
                  Additional documents requested
                </div>
                <div className="text-caption text-d365-secondary">
                  Vehicle Registration requires additional proof • 3 days ago
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}