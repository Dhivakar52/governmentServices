
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Users, 
  Building2, 
  GitBranch, 
  Bell, 
  ShieldCheck, 
  FileSearch,
  CreditCard,
  Settings,
  Key,
  Palette,

  BarChart3,
  Download,
  FolderOpen,
  FormInput
} from 'lucide-react';

interface CentralAdminSettingsProps {
  onNavigateToSubmenu: (submenu: string) => void;
}

export function CentralAdminSettings({ onNavigateToSubmenu }: CentralAdminSettingsProps) {
  const adminModules = [
    {
      id: 'user-role-management',
      title: 'User & Role Management',
      description: 'Manage users, roles, and permissions across the platform',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'organization-hierarchy',
      title: 'Organization Hierarchy Mapping',
      description: 'Configure government structure and regional mappings',
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'workflow-designer',
      title: 'Workflow Designer',
      description: 'Design and customize approval workflows',
      icon: GitBranch,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'notification-settings',
      title: 'Notification Settings',
      description: 'Configure email, SMS, and push notification templates',
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'kyc-integration',
      title: 'KYC / National ID Integration',
      description: 'Manage identity verification and KYC providers',
      icon: ShieldCheck,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'audit-logs',
      title: 'Audit Logs & Activity Tracking',
      description: 'Monitor system activities and generate audit reports',
      icon: FileSearch,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'payment-gateway',
      title: 'Payment Gateway Setup',
      description: 'Configure payment providers and transaction settings',
      icon: CreditCard,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'system-configuration',
      title: 'System Configuration',
      description: 'Global system settings and environment configuration',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'api-access',
      title: 'API Access Management',
      description: 'Manage API keys, rate limits, and integrations',
      icon: Key,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'theme-language',
      title: 'Theme & Language Settings',
      description: 'Customize branding, themes, and localization',
      icon: Palette,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },

    {
      id: 'dashboard-configuration',
      title: 'Dashboard Configuration',
      description: 'Customize dashboards and reporting widgets',
      icon: BarChart3,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50'
    },
    {
      id: 'data-export',
      title: 'Data Export Settings',
      description: 'Configure data export formats and schedules',
      icon: Download,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'document-center',
      title: 'Document Center',
      description: 'Manage documents, templates, and file storage settings',
      icon: FolderOpen,
      color: 'text-slate-600',
      bgColor: 'bg-slate-50'
    },
    {
      id: 'civility-dashboard-data-bi-center',
      title: 'Civility Dashboard – Data & BI Center',
      description: 'Business intelligence, reporting, and analytics dashboard with real-time insights',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'form-builder',
      title: 'Form Builder',
      description: 'Create and manage dynamic forms with drag-and-drop interface and workflow configuration',
      icon: FormInput,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Central Admin Settings</h1>
          <p className="d365-page-subtitle">
            Configure platform-wide settings and manage system components
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">Total Users</p>
                <p className="text-title2 font-semibold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">Active Regions</p>
                <p className="text-title2 font-semibold">36</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <GitBranch className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">Active Workflows</p>
                <p className="text-title2 font-semibold">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Settings className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">System Health</p>
                <p className="text-title2 font-semibold text-green-600">Optimal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Card 
              key={module.id}
              className="d365-card cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              onClick={() => onNavigateToSubmenu(module.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-3 rounded-lg ${module.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${module.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-subtitle font-semibold line-clamp-2">
                      {module.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-caption text-d365-secondary line-clamp-2">
                  {module.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}