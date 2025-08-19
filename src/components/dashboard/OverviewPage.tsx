import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { 
  FileText, 
  CheckCircle, 
  PenTool, 
  Shield,
  QrCode,
  User,
  Clock,
  Download
} from 'lucide-react';
import type { User as OverViewUser } from '../../App';

interface OverviewPageProps {
  user: OverViewUser;
}

export function OverviewPage({ user }: OverviewPageProps) {
  const stats = [
    {
      title: 'Total Documents',
      value: user.documents.length.toString(),
      icon: FileText,
      color: 'bg-blue-500',
      description: 'Official documents stored'
    },
    {
      title: 'Active Certificates',
      value: user.documents.filter(d => d.status === 'active').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500',
      description: 'Currently valid documents'
    },
    {
      title: 'Digital Signatures',
      value: '12',
      icon: PenTool,
      color: 'bg-purple-500',
      description: 'Signatures completed'
    },
    {
      title: 'Verification Score',
      value: '100%',
      icon: Shield,
      color: 'bg-orange-500',
      description: 'Identity verification status'
    }
  ];

  const recentActivities = [
    { action: 'Document Downloaded', item: 'Birth Certificate', time: '2 hours ago' },
    { action: 'Digital Signature', item: 'Property Agreement', time: '1 day ago' },
    { action: 'Profile Updated', item: 'Contact Information', time: '3 days ago' },
    { action: 'Service Access', item: 'Tax Portal', time: '1 week ago' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="microsoft-card bg-gradient-to-r from-[var(--microsoft-blue)] to-[var(--microsoft-blue-secondary)] text-white p-8 rounded-lg">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.fullName.split(' ')[0]}!</h1>
            <p className="text-blue-100 mb-4">
              Your digital identity is secure and verified. Access all government services seamlessly.
            </p>
            <div className="flex items-center space-x-4">
              <Badge className="bg-white text-[var(--microsoft-blue)] px-3 py-1">
                Citizen ID: {user.civId}
              </Badge>
              <Badge className="bg-green-500 text-white px-3 py-1">
                <Shield className="h-3 w-3 mr-1" />
                VERIFIED
              </Badge>
            </div>
          </div>
          <div className="bg-white/10 p-4 rounded-lg">
            <QrCode className="h-12 w-12 text-white" />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--microsoft-gray-900)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">{stat.title}</p>
                <p className="text-xs text-[var(--microsoft-gray-500)]">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="formal-card p-6 lg:col-span-2">
          <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4 flex items-center">
            <User className="h-5 w-5 mr-2" />
            PERSONAL INFORMATION
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Full Name</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)]">{user.fullName}</p>
              </div>
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Date of Birth</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)]">{user.dateOfBirth}</p>
              </div>
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Gender</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)] capitalize">{user.gender}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Email</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)]">{user.email}</p>
              </div>
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Mobile</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)]">{user.mobile}</p>
              </div>
              <div>
                <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Location</Label>
                <p className="font-medium text-[var(--microsoft-gray-900)]">
                  {user.address.city}, {user.address.state}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="formal-card p-6">
          <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            RECENT ACTIVITY
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-[var(--microsoft-blue)]/10 w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-[var(--microsoft-blue)] rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">{activity.action}</p>
                  <p className="text-xs text-[var(--microsoft-gray-700)]">{activity.item}</p>
                  <p className="text-xs text-[var(--microsoft-gray-500)]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="formal-card p-6">
        <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-6">QUICK ACCESS</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: 'View Documents', desc: 'Access official documents', icon: FileText, color: 'bg-blue-100 text-blue-600' },
            { title: 'Digital Signature', desc: 'Sign documents digitally', icon: PenTool, color: 'bg-purple-100 text-purple-600' },
            { title: 'Government Services', desc: 'Browse available services', icon: Shield, color: 'bg-green-100 text-green-600' },
            { title: 'Export Profile', desc: 'Download your data', icon: Download, color: 'bg-orange-100 text-orange-600' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-medium text-[var(--microsoft-gray-900)] mb-1">{action.title}</h4>
                <p className="text-xs text-[var(--microsoft-gray-700)]">{action.desc}</p>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}