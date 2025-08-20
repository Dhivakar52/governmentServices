import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { 
  Save, 
  Globe,
  Calendar,
  Clock,
  Shield,
  Server,
  Settings,
  CheckCircle,
  AlertTriangle,
  Download,
  Database,
  Cloud,
  HardDrive,
  Play,
  FileArchive,
  Zap,
  RefreshCw,
  Archive
} from 'lucide-react';

interface SystemConfigurationProps {
  onBack: () => void;
}

interface SystemSettings {
  timezone: string;
  dateFormat: string;
  numberFormat: string;
  calendarType: string;
  sessionTimeout: number;
  environmentMode: 'sandbox' | 'production';
  maintenanceMode: boolean;
  debugMode: boolean;
  maxFileSize: number;
  defaultLanguage: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

interface BackupRecord {
  id: string;
  date: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'success' | 'failed' | 'running' | 'scheduled';
  storage: 'cloud' | 'local';
  size: string;
  duration: string;
  location: string;
}

interface BackupConfig {
  frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  retentionPeriod: number;
  retentionUnit: 'months' | 'years';
  storageType: 'local' | 'cloud' | 'hybrid';
  autoBackup: boolean;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  notificationEmail: string;
}

export function SystemConfiguration({ onBack }: SystemConfigurationProps) {
  const [settings, setSettings] = useState<SystemSettings>({
    timezone: 'Africa/Lagos',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1,000.00',
    calendarType: 'gregorian',
    sessionTimeout: 60,
    environmentMode: 'production',
    maintenanceMode: false,
    debugMode: false,
    maxFileSize: 10,
    defaultLanguage: 'English',
    emailNotifications: true,
    smsNotifications: true
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Backup-related state
  const [backupConfig, setBackupConfig] = useState<BackupConfig>({
    frequency: 'daily',
    retentionPeriod: 12,
    retentionUnit: 'months',
    storageType: 'cloud',
    autoBackup: true,
    compressionEnabled: true,
    encryptionEnabled: true,
    notificationEmail: 'admin@gov.utopia'
  });
  
  const [isBackupRunning, setIsBackupRunning] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [hasUnsavedBackupChanges, setHasUnsavedBackupChanges] = useState(false);

  const timezones = [
    { value: 'Africa/Lagos', label: 'West Africa Time (WAT) - Lagos' },
    { value: 'Africa/Nairobi', label: 'East Africa Time (EAT) - Nairobi' },
    { value: 'Africa/Cairo', label: 'Egypt Standard Time (EET) - Cairo' },
    { value: 'Africa/Casablanca', label: 'Western European Time (WET) - Casablanca' },
    { value: 'Africa/Johannesburg', label: 'South Africa Standard Time (SAST) - Johannesburg' },
    { value: 'UTC', label: 'Coordinated Universal Time (UTC)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT) - London' },
    { value: 'America/New_York', label: 'Eastern Standard Time (EST) - New York' }
  ];

  const dateFormats = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (31/12/2025)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (12/31/2025)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2025-12-31)' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY (31-12-2025)' },
    { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY (Dec 31, 2025)' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY (31 Dec 2025)' }
  ];

  const numberFormats = [
    { value: '1,000.00', label: '1,000.00 (Western)' },
    { value: '1.000,00', label: '1.000,00 (European)' },
    { value: '1 000,00', label: '1 000,00 (French)' },
    { value: '1\'000.00', label: '1\'000.00 (Swiss)' }
  ];

  const calendarTypes = [
    { value: 'gregorian', label: 'Gregorian Calendar' },
    { value: 'islamic', label: 'Islamic (Hijri) Calendar' },
    { value: 'ethiopian', label: 'Ethiopian Calendar' }
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'Français' },
    { value: 'Arabic', label: 'العربية' },
    { value: 'Swahili', label: 'Kiswahili' },
    { value: 'Portuguese', label: 'Português' },
    { value: 'Spanish', label: 'Español' }
  ];

  // Backup-related data
  const backupHistory: BackupRecord[] = [
    {
      id: '1',
      date: '2025-01-10 02:00:00',
      type: 'incremental',
      status: 'success',
      storage: 'cloud',
      size: '1.2 GB',
      duration: '18 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: '2',
      date: '2025-01-09 02:00:00',
      type: 'incremental',
      status: 'success',
      storage: 'cloud',
      size: '890 MB',
      duration: '14 minutes',
      location: 'AWS S3 - us-east-1'
    },
    {
      id: '3',
      date: '2025-01-08 02:00:00',
      type: 'full',
      status: 'success',
      storage: 'local',
      size: '15.4 GB',
      duration: '2 hours 35 minutes',
      location: '/backup/full/2025-01-08'
    },
    {
      id: '4',
      date: '2025-01-07 02:00:00',
      type: 'incremental',
      status: 'failed',
      storage: 'cloud',
      size: '-',
      duration: '5 minutes',
      location: 'AWS S3 - Error'
    },
    {
      id: '5',
      date: '2025-01-06 02:00:00',
      type: 'incremental',
      status: 'success',
      storage: 'cloud',
      size: '1.1 GB',
      duration: '16 minutes',
      location: 'AWS S3 - us-east-1'
    }
  ];

  const frequencies = [
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const storageTypes = [
    { value: 'local', label: 'Local Storage', icon: HardDrive },
    { value: 'cloud', label: 'Cloud Storage', icon: Cloud },
    { value: 'hybrid', label: 'Hybrid (Local + Cloud)', icon: Database }
  ];

  const retentionUnits = [
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];

  const updateSetting = <K extends keyof SystemSettings>(
    key: K, 
    value: SystemSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    // In a real implementation, this would save to the backend
    console.log('Saving settings:', settings);
    setHasUnsavedChanges(false);
    
    // Show success notification (could use toast)
    alert('Settings saved successfully!');
  };

  const getEnvironmentBadge = () => {
    return settings.environmentMode === 'production' ? (
      <Badge className="d365-badge-success">
        <CheckCircle className="h-3 w-3 mr-1" />
        Production
      </Badge>
    ) : (
      <Badge className="d365-badge-warning">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Sandbox
      </Badge>
    );
  };

  // Backup-related functions
  const getBackupStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge className="d365-badge-error"><AlertTriangle className="h-3 w-3 mr-1" />Failed</Badge>;
      case 'running':
        return <Badge className="d365-badge-warning"><RefreshCw className="h-3 w-3 mr-1 animate-spin" />Running</Badge>;
      case 'scheduled':
        return <Badge className="d365-badge-secondary"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'full':
        return <Database className="h-4 w-4" />;
      case 'incremental':
        return <Zap className="h-4 w-4" />;
      case 'differential':
        return <Archive className="h-4 w-4" />;
      default:
        return <FileArchive className="h-4 w-4" />;
    }
  };

  const getStorageIcon = (storage: string) => {
    return storage === 'cloud' ? (
      <Cloud className="h-4 w-4 text-blue-600" />
    ) : (
      <HardDrive className="h-4 w-4 text-gray-600" />
    );
  };

  const handleManualBackup = async () => {
    setIsBackupRunning(true);
    setBackupProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBackupRunning(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const updateBackupConfig = <K extends keyof BackupConfig>(
    key: K, 
    value: BackupConfig[K]
  ) => {
    setBackupConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedBackupChanges(true);
  };

  const handleSaveBackupConfig = () => {
    console.log('Saving backup configuration:', backupConfig);
    setHasUnsavedBackupChanges(false);
    alert('Backup configuration saved successfully!');
  };

  return (
    <AdminPageLayout
      title="System Configuration"
      onBack={onBack}
      actionButton={{
        label: 'Save All Settings',
        onClick: () => {
          handleSaveSettings();
          handleSaveBackupConfig();
        },
        icon: <Save className="h-4 w-4" />,
        // disabled: !hasUnsavedChanges && !hasUnsavedBackupChanges
      }}
    >
      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>System Configuration</span>
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Backup & Recovery</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Regional & Localization Settings */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Regional & Localization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">System Timezone</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => updateSetting('timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select 
                    value={settings.dateFormat} 
                    onValueChange={(value) => updateSetting('dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dateFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberFormat">Number Format</Label>
                  <Select 
                    value={settings.numberFormat} 
                    onValueChange={(value) => updateSetting('numberFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {numberFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calendarType">Calendar Type</Label>
                  <Select 
                    value={settings.calendarType} 
                    onValueChange={(value) => updateSetting('calendarType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {calendarTypes.map((calendar) => (
                        <SelectItem key={calendar.value} value={calendar.value}>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{calendar.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select 
                    value={settings.defaultLanguage} 
                    onValueChange={(value) => updateSetting('defaultLanguage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Security & Session Settings */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security & Session</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-d365-secondary" />
                    <Input 
                      id="sessionTimeout"
                      type="number"
                      min="5"
                      max="480"
                      value={settings.sessionTimeout}
                      onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-caption text-d365-secondary">
                    Users will be automatically logged out after this period of inactivity
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Maximum File Upload Size (MB)</Label>
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-d365-secondary" />
                    <Input 
                      id="maxFileSize"
                      type="number"
                      min="1"
                      max="100"
                      value={settings.maxFileSize}
                      onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                  <div>
                    <Label htmlFor="environmentMode" className="text-body font-medium">
                      Environment Mode
                    </Label>
                    <p className="text-caption text-d365-secondary mt-1">
                      {settings.environmentMode === 'production' 
                        ? 'Live production environment with real data' 
                        : 'Testing environment with sandbox data'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getEnvironmentBadge()}
                    <Switch 
                      id="environmentMode" 
                      checked={settings.environmentMode === 'production'}
                      onCheckedChange={(checked) => 
                        updateSetting('environmentMode', checked ? 'production' : 'sandbox')
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                  <div>
                    <Label htmlFor="maintenanceMode" className="text-body font-medium">
                      Maintenance Mode
                    </Label>
                    <p className="text-caption text-d365-secondary mt-1">
                      Temporarily disable public access for system maintenance
                    </p>
                  </div>
                  <Switch 
                    id="maintenanceMode" 
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                  <div>
                    <Label htmlFor="debugMode" className="text-body font-medium">
                      Debug Mode
                    </Label>
                    <p className="text-caption text-d365-secondary mt-1">
                      Enable detailed error logging for troubleshooting
                    </p>
                  </div>
                  <Switch 
                    id="debugMode" 
                    checked={settings.debugMode}
                    onCheckedChange={(checked) => updateSetting('debugMode', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                  <div>
                    <Label htmlFor="emailNotifications" className="text-body font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-caption text-d365-secondary mt-1">
                      Send system notifications via email
                    </p>
                  </div>
                  <Switch 
                    id="emailNotifications" 
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                  <div>
                    <Label htmlFor="smsNotifications" className="text-body font-medium">
                      SMS Notifications
                    </Label>
                    <p className="text-caption text-d365-secondary mt-1">
                      Send critical alerts via SMS
                    </p>
                  </div>
                  <Switch 
                    id="smsNotifications" 
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => updateSetting('smsNotifications', checked)}
                  />
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <div className="flex items-start space-x-2">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Regional Compliance</h4>
                      <p className="text-caption text-blue-700 mt-1">
                        These settings ensure compliance with regional data protection laws including 
                        GDPR (Europe), POPIA (South Africa), and local privacy regulations.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Status Overview */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-d365-surface-secondary rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Database</span>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      Connection: Healthy
                    </p>
                    <p className="text-caption text-d365-secondary">
                      Response: 12ms
                    </p>
                  </div>

                  <div className="p-3 bg-d365-surface-secondary rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Storage</span>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      Used: 2.4GB / 10GB
                    </p>
                    <p className="text-caption text-d365-secondary">
                      Available: 76%
                    </p>
                  </div>

                  <div className="p-3 bg-d365-surface-secondary rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Cache</span>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      Hit Rate: 94.2%
                    </p>
                    <p className="text-caption text-d365-secondary">
                      Memory: 256MB
                    </p>
                  </div>

                  <div className="p-3 bg-d365-surface-secondary rounded">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium">Backup</span>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      Last: 2 hours ago
                    </p>
                    <p className="text-caption text-d365-secondary">
                      Next: In 22 hours
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">System Healthy</span>
                  </div>
                  <p className="text-caption text-green-700 mt-1">
                    All systems operational. Last health check: 2 minutes ago
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="d365-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Backup Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Backup Frequency</Label>
                      <Select 
                        value={backupConfig.frequency} 
                        onValueChange={(value: any) => updateBackupConfig('frequency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencies.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>{freq.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="storage">Storage Type</Label>
                      <Select 
                        value={backupConfig.storageType} 
                        onValueChange={(value: any) => updateBackupConfig('storageType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {storageTypes.map((storage) => {
                            const StorageIcon = storage.icon;
                            return (
                              <SelectItem key={storage.value} value={storage.value}>
                                <div className="flex items-center space-x-2">
                                  <StorageIcon className="h-4 w-4" />
                                  <span>{storage.label}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Retention Period</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={backupConfig.retentionPeriod}
                        onChange={(e) => updateBackupConfig('retentionPeriod', parseInt(e.target.value))}
                        className="w-24"
                      />
                      <Select 
                        value={backupConfig.retentionUnit} 
                        onValueChange={(value: any) => updateBackupConfig('retentionUnit', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {retentionUnits.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      How long to keep backup files before automatic deletion
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">Notification Email</Label>
                    <Input
                      id="notificationEmail"
                      type="email"
                      value={backupConfig.notificationEmail}
                      onChange={(e) => updateBackupConfig('notificationEmail', e.target.value)}
                      placeholder="admin@gov.utopia"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                      <div>
                        <Label htmlFor="autoBackup" className="text-body font-medium">
                          Automatic Backup
                        </Label>
                        <p className="text-caption text-d365-secondary mt-1">
                          Enable scheduled automatic backups
                        </p>
                      </div>
                      <Switch 
                        id="autoBackup" 
                        checked={backupConfig.autoBackup}
                        onCheckedChange={(checked) => updateBackupConfig('autoBackup', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                      <div>
                        <Label htmlFor="compression" className="text-body font-medium">
                          Compression
                        </Label>
                        <p className="text-caption text-d365-secondary mt-1">
                          Compress backup files to save storage space
                        </p>
                      </div>
                      <Switch 
                        id="compression" 
                        checked={backupConfig.compressionEnabled}
                        onCheckedChange={(checked) => updateBackupConfig('compressionEnabled', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
                      <div>
                        <Label htmlFor="encryption" className="text-body font-medium">
                          Encryption
                        </Label>
                        <p className="text-caption text-d365-secondary mt-1">
                          Encrypt backup files for enhanced security
                        </p>
                      </div>
                      <Switch 
                        id="encryption" 
                        checked={backupConfig.encryptionEnabled}
                        onCheckedChange={(checked) => updateBackupConfig('encryptionEnabled', checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Status Panel */}
            <div className="space-y-6">
              <Card className="d365-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>Backup Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-d365-secondary">Last Backup</span>
                      <span className="font-medium">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-d365-secondary">Next Backup</span>
                      <span className="font-medium">In 22 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-d365-secondary">Storage Used</span>
                      <span className="font-medium">42.8 GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-caption text-d365-secondary">Success Rate</span>
                      <Badge className="d365-badge-success">94.2%</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-d365-border">
                    <Button 
                      className="w-full"
                      onClick={handleManualBackup}
                      disabled={isBackupRunning}
                    >
                      {isBackupRunning ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Running Backup...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Backup Now
                        </>
                      )}
                    </Button>
                    
                    {isBackupRunning && (
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-caption">
                          <span>Progress</span>
                          <span>{Math.round(backupProgress)}%</span>
                        </div>
                        <Progress value={backupProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="d365-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileArchive className="h-5 w-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded text-center">
                      <p className="text-title2 font-semibold text-green-900">127</p>
                      <p className="text-caption text-green-700">Total Backups</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded text-center">
                      <p className="text-title2 font-semibold text-blue-900">8</p>
                      <p className="text-caption text-blue-700">Failed Backups</p>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-d365-surface-secondary rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium">System Healthy</span>
                    </div>
                    <p className="text-caption text-d365-secondary">
                      All backup systems operational
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Backup History */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Backup History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backupHistory.map((backup) => (
                    <TableRow key={backup.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 text-d365-secondary" />
                          <span className="text-caption">{backup.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(backup.type)}
                          <span className="capitalize">{backup.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getBackupStatusBadge(backup.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStorageIcon(backup.storage)}
                          <span className="capitalize">{backup.storage}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-caption">{backup.size}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-caption">{backup.duration}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {backup.status === 'success' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Confirmation */}
      {(hasUnsavedChanges || hasUnsavedBackupChanges) && (
        <div className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Unsaved Changes</p>
              <p className="text-caption text-yellow-700">
                You have unsaved {hasUnsavedChanges && hasUnsavedBackupChanges ? 'system and backup' : hasUnsavedChanges ? 'system' : 'backup'} configuration changes
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={() => {
                handleSaveSettings();
                handleSaveBackupConfig();
              }}
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