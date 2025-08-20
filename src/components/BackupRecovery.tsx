import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Progress } from './ui/progress';
import { 
  Save, 
  Download,
  Database,
  Clock,
  Cloud,
  HardDrive,
  Play,
  CheckCircle,
  AlertCircle,
  Calendar,
  FileArchive,
  Zap,
  Settings,
  RefreshCw,
  Archive
} from 'lucide-react';

interface BackupRecoveryProps {
  onBack: () => void;
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

export function BackupRecovery({ onBack }: BackupRecoveryProps) {
  const [config, setConfig] = useState<BackupConfig>({
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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock backup history
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
      case 'failed':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
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

  const updateConfig = <K extends keyof BackupConfig>(
    key: K, 
    value: BackupConfig[K]
  ) => {
    setConfig(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSaveConfig = () => {
    console.log('Saving backup configuration:', config);
    setHasUnsavedChanges(false);
    alert('Backup configuration saved successfully!');
  };

  return (
    <AdminPageLayout
      title="Backup and Recovery"
      onBack={onBack}
      actionButton={{
        label: 'Save Configuration',
        onClick: handleSaveConfig,
        icon: <Save className="h-4 w-4" />,
      
      }}
    >
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
                    value={config.frequency} 
                    onValueChange={(value: any) => updateConfig('frequency', value)}
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
                    value={config.storageType} 
                    onValueChange={(value: any) => updateConfig('storageType', value)}
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
                    value={config.retentionPeriod}
                    onChange={(e) => updateConfig('retentionPeriod', parseInt(e.target.value))}
                    className="w-24"
                  />
                  <Select 
                    value={config.retentionUnit} 
                    onValueChange={(value: any) => updateConfig('retentionUnit', value)}
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
                  value={config.notificationEmail}
                  onChange={(e) => updateConfig('notificationEmail', e.target.value)}
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
                    checked={config.autoBackup}
                    onCheckedChange={(checked) => updateConfig('autoBackup', checked)}
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
                    checked={config.compressionEnabled}
                    onCheckedChange={(checked) => updateConfig('compressionEnabled', checked)}
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
                    checked={config.encryptionEnabled}
                    onCheckedChange={(checked) => updateConfig('encryptionEnabled', checked)}
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

              <div className="pt-4 border-t border-d365">
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
      <Card className="d365-card mt-6">
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
                  <TableCell>{getStatusBadge(backup.status)}</TableCell>
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

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Unsaved Changes</p>
              <p className="text-caption text-yellow-700">
                Your backup configuration changes haven't been saved
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleSaveConfig}
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