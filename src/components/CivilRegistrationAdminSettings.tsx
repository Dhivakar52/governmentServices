import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Settings, 
  FileText, 
  UserX,
  Gavel,
  Hospital,
  UserCheck,
  ArrowLeft,
  Baby,
  HeartHandshake,
  Scale,
} from 'lucide-react';

interface FeaturePanelProps {
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

const FeaturePanel: React.FC<FeaturePanelProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  actionButton, 
  children 
}) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-d365-primary" />
          <div>
            <CardTitle className="text-title3 font-medium">{title}</CardTitle>
            {description && (
              <p className="text-caption text-d365-text-secondary mt-1">{description}</p>
            )}
          </div>
        </div>
        {actionButton && (
          <Button onClick={actionButton.onClick} className="d365-button-primary btn-with-icon">
            <Plus className="w-4 h-4" />
            {actionButton.label}
          </Button>
        )}
      </div>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);

// Mock data for demonstration
const mockRegistrars = [
  { id: '1', name: 'Dr. Sarah Johnson', area: 'Central District', role: 'Senior Registrar', status: 'active' },
  { id: '2', name: 'Michael Brown', area: 'North District', role: 'Registrar', status: 'active' },
  { id: '3', name: 'Lisa Chen', area: 'South District', role: 'Deputy Registrar', status: 'inactive' }
];

const mockHospitals = [
  { id: '1', name: 'Central General Hospital', region: 'Central', type: 'Public', status: 'active' },
  { id: '2', name: 'City Medical Center', region: 'North', type: 'Private', status: 'active' },
  { id: '3', name: 'Regional Clinic', region: 'South', type: 'Public', status: 'active' }
];

// const mockFields = [
//   { id: '1', name: 'Full Name', type: 'Text', required: true, region: 'All' },
//   { id: '2', name: 'Date of Birth', type: 'Date', required: true, region: 'All' },
//   { id: '3', name: 'Place of Birth', type: 'Text', required: true, region: 'All' },
//   { id: '4', name: 'Father Name', type: 'Text', required: true, region: 'All' },
//   { id: '5', name: 'Mother Name', type: 'Text', required: true, region: 'All' }
// ];

interface CivilRegistrationAdminSettingsProps {
  onNavigateToSubmenu?: (submenu: string) => void;
  currentSubmenu?: string;
  onBack?: () => void;
}

// type FeatureLink = {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ComponentType<{ className?: string }>;
// };

export const CivilRegistrationAdminSettings: React.FC<CivilRegistrationAdminSettingsProps> = ({
  onNavigateToSubmenu,
  currentSubmenu,
  onBack
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<string>('');

  const openDialog = (dialogType: string) => {
    setCurrentDialog(dialogType);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
  };

  // Define control panel sections for Windows Control Panel style layout
  const controlPanelSections = [
    {
      id: 'birth-registration',
      title: 'Birth Registration',
      icon: Baby,
      iconColor: 'text-blue-600',
      features: [
        { id: 'birth-certificate-templates', title: 'Certificate Template Configuration' },
        { id: 'birth-hospital-management', title: 'Hospital Master Management' },
        { id: 'birth-registrar-assignment', title: 'Registrar Assignment' },
        { id: 'birth-field-settings', title: 'Record Field Settings' },
        { id: 'birth-correction-rules', title: 'Record Correction Rules' },
        { id: 'birth-sla-settings', title: 'SLA & Escalation Settings' },
        { id: 'birth-visibility-settings', title: 'Search & Visibility Settings' },
        { id: 'birth-language-configuration', title: 'Regional Language Configuration' }
      ]
    },
    {
      id: 'death-registration',
      title: 'Death Registration',
      icon: UserX,
      iconColor: 'text-red-600',
      features: [
        { id: 'death-certificate-templates', title: 'Certificate Template Configuration' },
        { id: 'death-verification-configuration', title: 'Death Verification Configuration' },
        { id: 'death-hospital-management', title: 'Hospital Master Management' },
        { id: 'death-registrar-assignment', title: 'Registrar Assignment' },
        { id: 'death-sla-settings', title: 'SLA & Escalation Settings' }
      ]
    },
    {
      id: 'marriage-registration',
      title: 'Marriage Registration',
      icon: HeartHandshake,
      iconColor: 'text-purple-600',
      features: [
        { id: 'marriage-certificate-templates', title: 'Certificate Template Configuration' },
        { id: 'marriage-officer-mapping', title: 'Marriage Officer Mapping' },
        { id: 'marriage-type-management', title: 'Marriage Type Management' },
        { id: 'marriage-document-requirements', title: 'Document Requirements Settings' },
        { id: 'marriage-appointment-slots', title: 'Appointment Slot Configuration' }
      ]
    },
    {
      id: 'divorce-registration',
      title: 'Divorce Registration',
      icon: Scale,
      iconColor: 'text-orange-600',
      features: [
        { id: 'divorce-certificate-templates', title: 'Certificate Template Configuration' },
        { id: 'divorce-court-mapping', title: 'Court Mapping' },
        { id: 'divorce-registrar-assignment', title: 'Registrar Assignment' },
        { id: 'divorce-visibility-settings', title: 'Sensitive Record Visibility' },
        { id: 'divorce-regional-rules', title: 'Regional Rules & Exceptions' }
      ]
    }
  ];

  const handleFeatureClick = (featureId: string) => {
    if (onNavigateToSubmenu) {
      onNavigateToSubmenu(featureId);
    }
  };

  const renderDataTable = (headers: string[], data: any[], actions: boolean = true) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-d365-border">
            {headers.map((header, index) => (
              <th key={index} className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">
                {header}
              </th>
            ))}
            {actions && (
              <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-d365-border hover:bg-d365-surface-secondary">
              {Object.keys(row).filter(key => key !== 'id').map((key, cellIndex) => (
                <td key={cellIndex} className="py-4 px-4">
                  {key === 'status' ? (
                    <Badge variant={row[key] === 'active' ? 'default' : 'secondary'}>
                      {row[key]}
                    </Badge>
                  ) : (
                    <span className="text-body text-d365-text-primary">{row[key]}</span>
                  )}
                </td>
              ))}
              {actions && (
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="sm" className="text-d365-primary hover:bg-d365-hover">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Windows Control Panel style main view
  const renderControlPanelView = () => (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Civil Registration Admin Settings</h1>
          <p className="d365-page-subtitle">
            Configure birth, death, marriage, and divorce registration processes
          </p>
        </div>
      </div>

      {/* Control Panel Sections - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {controlPanelSections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <Card key={section.id} className="d365-card h-fit">
              <CardHeader className="pb-4">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-d365-surface-secondary flex items-center justify-center">
                    <SectionIcon className={`w-5 h-5 ${section.iconColor}`} />
                  </div>
                  <h2 className="text-title2 font-semibold text-d365-text-primary">
                    {section.title}
                  </h2>
                </div>
                <div className="border-b border-d365-border"></div>
              </CardHeader>

              <CardContent className="pt-2">
                {/* Feature Links List */}
                <div className="space-y-3">
                  {section.features.map((feature) => (
                    <div key={feature.id}>
                      <button
                        onClick={() => handleFeatureClick(feature.id)}
                        className="text-d365-primary hover:text-d365-primary-light hover:underline text-left text-body cursor-pointer transition-colors duration-200 block w-full text-left"
                      >
                        {feature.title}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-d365-border">
        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <Baby className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">1,247</div>
                <div className="text-caption text-d365-text-secondary">Birth Registrations</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                <UserX className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">98</div>
                <div className="text-caption text-d365-text-secondary">Death Registrations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <HeartHandshake className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">324</div>
                <div className="text-caption text-d365-text-secondary">Marriage Registrations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">45</div>
                <div className="text-caption text-d365-text-secondary">Divorce Registrations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Get feature details for individual screen rendering
  const getFeatureDetails = (featureId: string) => {
    const allFeatures = controlPanelSections.flatMap(section => section.features);
    return allFeatures.find(feature => feature.id === featureId);
  };

  // Back button component for feature views
  const BackButton = ({ title }: { title: string }) => (
    <div className="d365-page-header">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="d365-button-secondary btn-with-icon"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="d365-page-title">{title}</h1>
          <p className="d365-page-subtitle">
            Configure this registration setting and its associated processes
          </p>
        </div>
      </div>
    </div>
  );

  // Render individual feature content
  const renderFeatureContent = (featureId: string) => {
    const featureDetails = getFeatureDetails(featureId);
    if (!featureDetails) return null;

    // Birth module specific content
    if (featureId === 'birth-certificate-templates') {
      return (
        <div className="space-y-6">
          <BackButton title={featureDetails.title} />
          <FeaturePanel
            title="Certificate Template Configuration"
            description="Configure birth certificate layout and design"
            icon={FileText}
            actionButton={{ label: 'Configure Template', onClick: () => openDialog('template') }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">Standard Template</h4>
                <p className="text-caption text-d365-text-secondary mb-3">Default birth certificate format</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">Bilingual Template</h4>
                <p className="text-caption text-d365-text-secondary mb-3">English & Swahili format</p>
                <Badge variant="secondary">Draft</Badge>
              </div>
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">International Template</h4>
                <p className="text-caption text-d365-text-secondary mb-3">For overseas use</p>
                <Badge variant="secondary">Inactive</Badge>
              </div>
            </div>
          </FeaturePanel>
        </div>
      );
    }

    if (featureId === 'birth-hospital-management') {
      return (
        <div className="space-y-6">
          <BackButton title={featureDetails.title} />
          <FeaturePanel
            title="Hospital Master Management"
            description="Manage hospitals and medical facilities for birth registration"
            icon={Hospital}
            actionButton={{ label: 'Add Hospital', onClick: () => openDialog('hospital') }}
          >
            {renderDataTable(
              ['Hospital Name', 'Region', 'Type', 'Status'],
              mockHospitals
            )}
          </FeaturePanel>
        </div>
      );
    }

    if (featureId === 'birth-registrar-assignment') {
      return (
        <div className="space-y-6">
          <BackButton title={featureDetails.title} />
          <FeaturePanel
            title="Registrar Assignment"
            description="Assign registrars to specific areas and roles"
            icon={UserCheck}
            actionButton={{ label: 'Add Registrar', onClick: () => openDialog('registrar') }}
          >
            {renderDataTable(
              ['Registrar Name', 'Assigned Area', 'Role', 'Status'],
              mockRegistrars
            )}
          </FeaturePanel>
        </div>
      );
    }

    if (featureId === 'marriage-certificate-templates') {
      return (
        <div className="space-y-6">
          <BackButton title={featureDetails.title} />
          <FeaturePanel
            title="Certificate Template Configuration"
            description="Configure marriage certificate layout and design"
            icon={FileText}
            actionButton={{ label: 'Configure Template', onClick: () => openDialog('template') }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">Civil Marriage Certificate</h4>
                <p className="text-caption text-d365-text-secondary mb-3">Standard civil ceremony format</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">Religious Marriage Certificate</h4>
                <p className="text-caption text-d365-text-secondary mb-3">Religious ceremony format</p>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="p-4 border border-d365-border rounded-lg">
                <h4 className="font-medium mb-2">Customary Marriage Certificate</h4>
                <p className="text-caption text-d365-text-secondary mb-3">Traditional ceremony format</p>
                <Badge variant="secondary">Draft</Badge>
              </div>
            </div>
          </FeaturePanel>
        </div>
      );
    }

    if (featureId === 'divorce-court-mapping') {
      return (
        <div className="space-y-6">
          <BackButton title={featureDetails.title} />
          <FeaturePanel
            title="Court Mapping"
            description="Map courts authorized for divorce proceedings"
            icon={Gavel}
            actionButton={{ label: 'Add Court', onClick: () => openDialog('court') }}
          >
            {renderDataTable(
              ['Court Name', 'Jurisdiction', 'Judge Name', 'Status'],
              [
                { name: 'High Court of Kenya', jurisdiction: 'National', judge: 'Hon. Justice Koome', status: 'active' },
                { name: 'Nairobi Family Court', jurisdiction: 'Nairobi', judge: 'Hon. Justice Ngugi', status: 'active' },
                { name: 'Mombasa Family Court', jurisdiction: 'Mombasa', judge: 'Hon. Justice Said', status: 'active' }
              ]
            )}
          </FeaturePanel>
        </div>
      );
    }

    // Default feature content for other modules
    return (
      <div className="space-y-6">
        <BackButton title={featureDetails.title} />
        <Card className="d365-card">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-d365-text-secondary" />
              </div>
              <h3 className="text-title2 font-semibold text-d365-text-primary mb-2">
                {featureDetails.title}
              </h3>
              <p className="text-body text-d365-text-secondary mb-6">
                Configure this registration setting and its associated processes
              </p>
              <Button
                onClick={() => openDialog('configure')}
                className="d365-button-primary btn-with-icon"
              >
                <Settings className="w-4 h-4" />
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Determine if we're showing a feature or the main view
  const isFeatureView = currentSubmenu && currentSubmenu !== 'civil-registration-admin';
  const featureId = isFeatureView ? currentSubmenu.replace('civil-registration-', '') : null;

  return (
    <div className="min-h-screen bg-d365-background">
      {!isFeatureView && renderControlPanelView()}
      
      {isFeatureView && featureId && renderFeatureContent(featureId)}

      {/* Generic Dialog for Configuration */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'template' && 'Configure Certificate Template'}
              {currentDialog === 'hospital' && 'Add Hospital'}
              {currentDialog === 'registrar' && 'Add Registrar'}
              {currentDialog === 'field' && 'Add Record Field'}
              {currentDialog === 'correction' && 'Add Correction Rule'}
              {currentDialog === 'sla' && 'Configure SLA Settings'}
              {currentDialog === 'visibility' && 'Configure Visibility Settings'}
              {currentDialog === 'language' && 'Add Language Support'}
              {!currentDialog && 'Configuration'}
            </DialogTitle>
            <DialogDescription>
              Configure the selected feature settings and options.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="configName">Name</Label>
              <Input id="configName" placeholder="Enter configuration name" />
            </div>
            
            <div>
              <Label htmlFor="configType">Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="template">Template</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="configDescription">Description</Label>
              <Textarea 
                id="configDescription" 
                placeholder="Enter description..." 
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="configActive">Active</Label>
              <Switch id="configActive" />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={closeDialog} className="d365-button-primary">
                Save Configuration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};