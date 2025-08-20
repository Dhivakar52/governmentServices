import React , { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Save, 
  Download,
  FileSpreadsheet,
  FileText,
  File,
  Mail,
  Clock,
  Calendar,
  Shield,
  CheckCircle,
  AlertCircle,
  Eye,
} from 'lucide-react';

interface DataExportSettingsProps {
  onBack: () => void;
}

interface ExportConfig {
  formats: string[];
  scheduleType: 'none' | 'daily' | 'weekly' | 'monthly';
  scheduleTime: string;
  emailNotifications: boolean;
  notificationEmails: string[];
  includeMetadata: boolean;
  encryptExports: boolean;
  retentionDays: number;
}

interface FieldPermission {
  fieldName: string;
  description: string;
  admin: boolean;
  officer: boolean;
  registrar: boolean;
  category: string;
}

export function DataExportSettings({ onBack }: DataExportSettingsProps) {
  const [config, setConfig] = useState<ExportConfig>({
    formats: ['csv', 'excel'],
    scheduleType: 'weekly',
    scheduleTime: '02:00',
    emailNotifications: true,
    notificationEmails: ['admin@gov.utopia', 'data@gov.utopia'],
    includeMetadata: true,
    encryptExports: true,
    retentionDays: 90
  });

  const [fieldPermissions, setFieldPermissions] = useState<FieldPermission[]>([
    {
      fieldName: 'Full Name',
      description: 'Complete name of the applicant',
      admin: true,
      officer: true,
      registrar: true,
      category: 'Personal Information'
    },
    {
      fieldName: 'Email Address',
      description: 'Contact email address',
      admin: true,
      officer: false,
      registrar: true,
      category: 'Contact Information'
    },
    {
      fieldName: 'Phone Number',
      description: 'Primary contact phone number',
      admin: true,
      officer: true,
      registrar: true,
      category: 'Contact Information'
    },
    {
      fieldName: 'National ID',
      description: 'Government issued identification number',
      admin: true,
      officer: true,
      registrar: true,
      category: 'Identification'
    },
    {
      fieldName: 'Date of Birth',
      description: 'Applicant date of birth',
      admin: true,
      officer: false,
      registrar: true,
      category: 'Personal Information'
    },
    {
      fieldName: 'Address',
      description: 'Residential address information',
      admin: true,
      officer: true,
      registrar: false,
      category: 'Contact Information'
    },
    {
      fieldName: 'Application ID',
      description: 'Unique application identifier',
      admin: true,
      officer: true,
      registrar: true,
      category: 'System Fields'
    },
    {
      fieldName: 'Submission Date',
      description: 'Date when application was submitted',
      admin: true,
      officer: true,
      registrar: true,
      category: 'System Fields'
    },
    {
      fieldName: 'Status',
      description: 'Current application status',
      admin: true,
      officer: true,
      registrar: true,
      category: 'System Fields'
    },
    {
      fieldName: 'Processing Officer',
      description: 'Officer assigned to process application',
      admin: true,
      officer: true,
      registrar: false,
      category: 'System Fields'
    },
    {
      fieldName: 'Payment Amount',
      description: 'Amount paid for the service',
      admin: true,
      officer: false,
      registrar: false,
      category: 'Financial Information'
    },
    {
      fieldName: 'Payment Method',
      description: 'Method used for payment',
      admin: true,
      officer: false,
      registrar: false,
      category: 'Financial Information'
    }
  ]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: FileText, description: 'Comma-separated values' },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { value: 'pdf', label: 'PDF', icon: File, description: 'Portable document format' },
    { value: 'json', label: 'JSON', icon: FileText, description: 'JavaScript object notation' }
  ];

  const scheduleOptions = [
    { value: 'none', label: 'No Schedule' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const roles = ['admin', 'officer', 'registrar'] as const;

  const updateConfig = <K extends keyof ExportConfig>(
    key: K, 
    value: ExportConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const toggleFormat = (format: string) => {
    const newFormats = config.formats.includes(format)
      ? config.formats.filter(f => f !== format)
      : [...config.formats, format];
    updateConfig('formats', newFormats);
  };

  const updateFieldPermission = (fieldName: string, role: typeof roles[number], value: boolean) => {
    setFieldPermissions(prev => 
      prev.map(field => 
        field.fieldName === fieldName 
          ? { ...field, [role]: value }
          : field
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving export settings:', { config, fieldPermissions });
    setHasUnsavedChanges(false);
    alert('Data export settings saved successfully!');
  };

  const filteredFields = fieldPermissions.filter(field =>
    field.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    field.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFields = filteredFields.reduce((groups, field) => {
    const category = field.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(field);
    return groups;
  }, {} as Record<string, FieldPermission[]>);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'officer':
        return <CheckCircle className="h-4 w-4" />;
      case 'registrar':
        return <FileText className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  // const getRoleLabel = (role: string) => {
  //   switch (role) {
  //     case 'admin':
  //       return 'Administrator';
  //     case 'officer':
  //       return 'Officer';
  //     case 'registrar':
  //       return 'Registrar';
  //     default:
  //       return role;
  //   }
  // };

  return (
    <AdminPageLayout
      title="Data Export Settings"
      onBack={onBack}
      actionButton={{
        label: 'Save Settings',
        onClick: handleSaveSettings,
        icon: <Save className="h-4 w-4" />,
        // disabled: !hasUnsavedChanges
      }}
      searchPlaceholder="Search fields..."
      onSearch={setSearchQuery}
    >
      <div className="space-y-6">
        {/* Export Configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Download className="h-5 w-5" />
                <span>Export Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Export Formats</Label>
                <div className="grid grid-cols-2 gap-3">
                  {exportFormats.map((format) => {
                    const FormatIcon = format.icon;
                    const isSelected = config.formats.includes(format.value);
                    return (
                      <div
                        key={format.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-d365-primary bg-d365-hover' 
                            : 'border-d365 hover:border-d365-primary'
                        }`}
                        onClick={() => toggleFormat(format.value)}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox checked={isSelected}  />
                          <FormatIcon className="h-4 w-4" />
                          <div>
                            <p className="font-medium text-body">{format.label}</p>
                            <p className="text-caption text-d365-secondary">{format.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="scheduleType">Schedule Export</Label>
                <Select 
                  value={config.scheduleType} 
                  onValueChange={(value: any) => updateConfig('scheduleType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {scheduleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {config.scheduleType !== 'none' && (
                <div className="space-y-3">
                  <Label htmlFor="scheduleTime">Schedule Time</Label>
                  <Input
                    id="scheduleTime"
                    type="time"
                    value={config.scheduleTime}
                    onChange={(e) => updateConfig('scheduleTime', e.target.value)}
                  />
                  <p className="text-caption text-d365-secondary">
                    Time when automated exports will be generated
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="retentionDays">Retention Period (Days)</Label>
                <Input
                  id="retentionDays"
                  type="number"
                  min="1"
                  max="365"
                  value={config.retentionDays}
                  onChange={(e) => updateConfig('retentionDays', parseInt(e.target.value))}
                />
                <p className="text-caption text-d365-secondary">
                  How long to keep exported files before automatic deletion
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                <div>
                  <Label htmlFor="emailNotifications" className="text-body font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-caption text-d365-secondary mt-1">
                    Send notifications when exports are completed
                  </p>
                </div>
                <Switch 
                  id="emailNotifications" 
                  checked={config.emailNotifications}
                  onCheckedChange={(checked) => updateConfig('emailNotifications', checked)}
                />
              </div>

              {config.emailNotifications && (
                <div className="space-y-3">
                  <Label htmlFor="notificationEmails">Notification Recipients</Label>
                  <Input
                    id="notificationEmails"
                    placeholder="admin@gov.utopia, data@gov.utopia"
                    value={config.notificationEmails.join(', ')}
                    onChange={(e) => updateConfig('notificationEmails', e.target.value.split(', '))}
                  />
                  <p className="text-caption text-d365-secondary">
                    Comma-separated list of email addresses
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                <div>
                  <Label htmlFor="includeMetadata" className="text-body font-medium">
                    Include Metadata
                  </Label>
                  <p className="text-caption text-d365-secondary mt-1">
                    Add export timestamp and configuration details
                  </p>
                </div>
                <Switch 
                  id="includeMetadata" 
                  checked={config.includeMetadata}
                  onCheckedChange={(checked) => updateConfig('includeMetadata', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                <div>
                  <Label htmlFor="encryptExports" className="text-body font-medium">
                    Encrypt Exports
                  </Label>
                  <p className="text-caption text-d365-secondary mt-1">
                    Password-protect exported files
                  </p>
                </div>
                <Switch 
                  id="encryptExports" 
                  checked={config.encryptExports}
                  onCheckedChange={(checked) => updateConfig('encryptExports', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Field-Level Permissions */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Field-Level Permissions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRoleIcon('admin')}
                      <span>Admin</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRoleIcon('officer')}
                      <span>Officer</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {getRoleIcon('registrar')}
                      <span>Registrar</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(groupedFields).map(([category, fields]) => (
                  <React.Fragment key={category}>
                    {/* Category Header */}
                    <TableRow>
                      <TableCell colSpan={5} className="bg-d365-surface-secondary font-medium">
                        {category}
                      </TableCell>
                    </TableRow>
                    
                    {/* Fields in Category */}
                    {fields.map((field) => (
                      <TableRow key={field.fieldName}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{field.fieldName}</p>
                            <p className="text-caption text-d365-secondary">{field.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{field.category}</Badge>
                        </TableCell>
                        {roles.map((role) => (
                          <TableCell key={role} className="text-center">
                            <Checkbox
                              checked={field[role]}
                              onCheckedChange={(checked) => 
                                updateFieldPermission(field.fieldName, role, checked as boolean)
                              }
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>

            {filteredFields.length === 0 && (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 mx-auto mb-4 text-d365-secondary opacity-50" />
                <p className="text-d365-secondary">No fields found matching your search</p>
                <p className="text-caption text-d365-secondary mt-1">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Export Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded text-center">
                <p className="text-title2 font-semibold text-blue-900">
                  {config.formats.length}
                </p>
                <p className="text-caption text-blue-700">Active Formats</p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded text-center">
                <p className="text-title2 font-semibold text-green-900">
                  {fieldPermissions.filter(f => f.admin).length}
                </p>
                <p className="text-caption text-green-700">Admin Fields</p>
              </div>
              
              <div className="p-4 bg-orange-50 border border-orange-200 rounded text-center">
                <p className="text-title2 font-semibold text-orange-900">
                  {fieldPermissions.filter(f => f.officer).length}
                </p>
                <p className="text-caption text-orange-700">Officer Fields</p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded text-center">
                <p className="text-title2 font-semibold text-purple-900">
                  {fieldPermissions.filter(f => f.registrar).length}
                </p>
                <p className="text-caption text-purple-700">Registrar Fields</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Unsaved Changes</p>
              <p className="text-caption text-yellow-700">
                Your export configuration changes haven't been saved
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleSaveSettings}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Save Now
            </Button>
          </div>
        </div>
      )}
    </AdminPageLayout>
  );
}