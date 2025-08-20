
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Car,
  DollarSign,
  FileText,
  Users,
  Calendar,
  School,
  AlertTriangle,
  CreditCard,
  Workflow,
  MapPin,
  Settings
} from 'lucide-react';

interface TransportAdminSettingsProps {
  onNavigateToSubmenu: (submenu: string) => void;
}

export function TransportAdminSettings({ onNavigateToSubmenu }: TransportAdminSettingsProps) {
  const adminModules = [
    {
      id: 'license-type-management',
      title: 'License Type Management',
      description: 'Configure license types, eligibility rules, validity periods, and renewal cycles',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'fee-penalty-configuration',
      title: 'Fee & Penalty Configuration',
      description: 'Set base fees, renewal fees, penalty rules, and grace periods for each license type',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'document-requirements',
      title: 'Document Requirements Settings',
      description: 'Define required documents, formats, file sizes, and expiration rules',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'officer-role-mapping',
      title: 'Officer Role Mapping',
      description: 'Assign officers to license types, zones, and specific workflow stages',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'appointment-slots',
      title: 'Appointment Slot Configuration',
      description: 'Manage test center schedules, time slots, capacity, and availability',
      icon: Calendar,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'driving-school-integration',
      title: 'Driving School/Test Center Integration',
      description: 'Approve institutions, track performance, and manage accreditation',
      icon: School,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'suspension-revoke-rules',
      title: 'Suspension/Revoke Rules',
      description: 'Configure automatic suspension triggers, reinstatement policies, and notifications',
      icon: AlertTriangle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'license-template',
      title: 'License Template Configuration',
      description: 'Design license layout, fields, multilingual support, and output formats',
      icon: CreditCard,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'license-workflow',
      title: 'License Workflow Setup',
      description: 'Visual workflow builder for license processing stages and conditional logic',
      icon: Workflow,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'region-specific-rules',
      title: 'Region-Specific Rules',
      description: 'Configure regional overrides, local language support, and zone-specific policies',
      icon: MapPin,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Transport Department Admin Settings</h1>
          <p className="d365-page-subtitle">
            Configure transport services, license management, and processing workflows
          </p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">License Types</p>
                <p className="text-title2 font-semibold">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">Active Officers</p>
                <p className="text-title2 font-semibold">147</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <School className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-caption text-d365-secondary">Test Centers</p>
                <p className="text-title2 font-semibold">23</p>
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
                <p className="text-caption text-d365-secondary">System Status</p>
                <p className="text-title2 font-semibold text-green-600">Active</p>
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