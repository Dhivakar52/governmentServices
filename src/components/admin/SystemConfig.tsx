import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { 
  Settings, 
  Shield,
  Database,
  // Server,
  Bell,
  // Mail,

  Zap,
  HardDrive,

  Clock,
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw,
  Upload,
  Download,
  // Eye,
  // EyeOff
} from 'lucide-react';

export function SystemConfig() {
  const [activeTab, setActiveTab] = useState('general');
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  // const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  // const [showPasswordField, setShowPasswordField] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // System Configuration State
  const [config, setConfig] = useState({
    // General Settings
    general: {
      systemName: 'Digital Identity Platform',
      systemVersion: '2.1.4',
      maintenanceMode: false,
      maxConcurrentUsers: 50000,
      sessionTimeout: 30,
      apiRateLimit: 1000,
      systemTimezone: 'Africa/Casablanca',
      systemLanguage: 'en',
      debugMode: false
    },
    // Security Settings
    security: {
      passwordMinLength: 8,
      passwordComplexity: true,
      mfaRequired: true,
      sessionEncryption: true,
      ipWhitelisting: false,
      maxLoginAttempts: 5,
      loginLockoutDuration: 15,
      sslEnforcement: true,
      certificateExpiry: '2025-12-31',
      encryptionLevel: 'AES-256'
    },
    // Database Settings
    database: {
      connectionPool: 100,
      queryTimeout: 30,
      backupFrequency: 'daily',
      retentionPeriod: 90,
      compression: true,
      encryption: true,
      replicationEnabled: true,
      maintenanceWindow: '02:00-04:00'
    },
    // Notification Settings
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: false,
      systemAlerts: true,
      maintenanceNotices: true,
      securityAlerts: true,
      smtpServer: 'smtp.gov.ma',
      smtpPort: 587,
      smtpEncryption: 'TLS'
    },
    // Performance Settings
    performance: {
      cacheEnabled: true,
      cacheTtl: 3600,
      compressionEnabled: true,
      cdnEnabled: true,
      loadBalancing: true,
      autoScaling: false,
      cpuThreshold: 80,
      memoryThreshold: 85,
      diskThreshold: 90
    }
  });

  const systemStatus = [
    {
      component: 'Web Application',
      status: 'healthy',
      uptime: '99.98%',
      lastCheck: '2025-01-08 14:30',
      details: 'All services operational'
    },
    {
      component: 'Database Cluster',
      status: 'healthy',
      uptime: '99.95%',
      lastCheck: '2025-01-08 14:29',
      details: 'Primary and replica healthy'
    },
    {
      component: 'Authentication Service',
      status: 'warning',
      uptime: '99.87%',
      lastCheck: '2025-01-08 14:28',
      details: 'High response time detected'
    },
    {
      component: 'File Storage',
      status: 'healthy',
      uptime: '100%',
      lastCheck: '2025-01-08 14:30',
      details: '15.2TB available (78% used)'
    },
    {
      component: 'Backup System',
      status: 'healthy',
      uptime: '99.99%',
      lastCheck: '2025-01-08 14:25',
      details: 'Last backup: 2025-01-08 03:00'
    }
  ];

  const configurationGroups = [
    {
      id: 'general',
      name: 'General Settings',
      icon: Settings,
      description: 'System-wide configuration and basic settings',
      count: 9
    },
    {
      id: 'security',
      name: 'Security & Authentication',
      icon: Shield,
      description: 'Security policies, authentication, and access control',
      count: 10
    },
    {
      id: 'database',
      name: 'Database Configuration',
      icon: Database,
      description: 'Database connections, backup, and performance settings',
      count: 8
    },
    {
      id: 'notifications',
      name: 'Notifications & Alerts',
      icon: Bell,
      description: 'Email, SMS, and system notification configuration',
      count: 9
    },
    {
      id: 'performance',
      name: 'Performance & Optimization',
      icon: Zap,
      description: 'Caching, load balancing, and performance tuning',
      count: 9
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Clock;
    }
  };

  const updateConfig = (section: string, key: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const saveConfiguration = () => {
    console.log('Saving configuration:', config);
    setUnsavedChanges(false);
    alert('Configuration saved successfully!');
  };

  const resetConfiguration = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset logic would go here
      alert('Configuration reset to defaults');
    }
  };

  const exportConfiguration = () => {
    const configData = JSON.stringify(config, null, 2);
    const blob = new Blob([configData], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `system_config_${new Date().toISOString().split('T')[0]}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const importConfiguration = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedConfig = JSON.parse(event.target?.result as string);
            setConfig(importedConfig);
            setUnsavedChanges(true);
            alert('Configuration imported successfully!');
          } catch (error) {
            alert('Invalid configuration file format');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const createBackup = () => {
    console.log('Creating system backup...');
    setShowBackupDialog(false);
    alert('System backup initiated. You will be notified when complete.');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--microsoft-gray-900)] mb-2">
            SYSTEM CONFIGURATION
          </h1>
          <p className="text-[var(--microsoft-gray-700)]">
            Manage system settings, security policies, and platform configuration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {unsavedChanges && (
            <Badge className="bg-orange-100 text-orange-800">
              UNSAVED CHANGES
            </Badge>
          )}
          <Button variant="outline" onClick={importConfiguration}>
            <Upload className="h-4 w-4 mr-2" />
            IMPORT
          </Button>
          <Button variant="outline" onClick={exportConfiguration}>
            <Download className="h-4 w-4 mr-2" />
            EXPORT
          </Button>
          <Button 
            onClick={saveConfiguration}
            disabled={!unsavedChanges}
            className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            SAVE CHANGES
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <Card className="formal-card p-6">
        <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">SYSTEM STATUS</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {systemStatus.map((item, index) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <div key={index} className="text-center p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                <StatusIcon className={`h-8 w-8 mx-auto mb-2 ${
                  item.status === 'healthy' ? 'text-green-500' : 
                  item.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                }`} />
                <h4 className="font-medium text-[var(--microsoft-gray-900)] mb-1">{item.component}</h4>
                <Badge className={getStatusColor(item.status)} style={{ marginBottom: '8px' }}>
                  {item.status.toUpperCase()}
                </Badge>
                <p className="text-sm text-[var(--microsoft-gray-700)] mb-1">Uptime: {item.uptime}</p>
                <p className="text-xs text-[var(--microsoft-gray-500)]">{item.details}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Configuration Categories */}
        <div className="lg:col-span-1">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">CONFIGURATION</h3>
            <nav className="space-y-2">
              {configurationGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <button
                    key={group.id}
                    onClick={() => setActiveTab(group.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeTab === group.id
                        ? 'bg-[var(--microsoft-blue)] text-white'
                        : 'hover:bg-[var(--microsoft-gray-100)] text-[var(--microsoft-gray-700)]'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{group.name}</p>
                        <p className={`text-xs ${
                          activeTab === group.id ? 'text-blue-100' : 'text-[var(--microsoft-gray-500)]'
                        }`}>
                          {group.count} settings
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-[var(--microsoft-gray-200)]">
              <Button 
                variant="outline" 
                className="w-full mb-2"
                onClick={() => setShowBackupDialog(true)}
              >
                <HardDrive className="h-4 w-4 mr-2" />
                CREATE BACKUP
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={resetConfiguration}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                RESET TO DEFAULTS
              </Button>
            </div>
          </Card>
        </div>

        {/* Configuration Content */}
        <div className="lg:col-span-3">
          <Card className="formal-card p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">GENERAL SETTINGS</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>SYSTEM NAME</Label>
                    <Input
                      value={config.general.systemName}
                      onChange={(e) => updateConfig('general', 'systemName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>SYSTEM VERSION</Label>
                    <Input
                      value={config.general.systemVersion}
                      onChange={(e) => updateConfig('general', 'systemVersion', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>TIMEZONE</Label>
                    <Select 
                      value={config.general.systemTimezone} 
                      onValueChange={(value) => updateConfig('general', 'systemTimezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Casablanca">Africa/Casablanca (GMT+1)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>DEFAULT LANGUAGE</Label>
                    <Select 
                      value={config.general.systemLanguage} 
                      onValueChange={(value) => updateConfig('general', 'systemLanguage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>MAX CONCURRENT USERS</Label>
                    <Input
                      type="number"
                      value={config.general.maxConcurrentUsers}
                      onChange={(e) => updateConfig('general', 'maxConcurrentUsers', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>SESSION TIMEOUT (MINUTES)</Label>
                    <Input
                      type="number"
                      value={config.general.sessionTimeout}
                      onChange={(e) => updateConfig('general', 'sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label>API RATE LIMIT (REQUESTS/MINUTE)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[config.general.apiRateLimit]}
                      onValueChange={(value) => updateConfig('general', 'apiRateLimit', value[0])}
                      min={100}
                      max={5000}
                      step={100}
                    />
                    <p className="text-sm text-[var(--microsoft-gray-500)]">
                      Current limit: {config.general.apiRateLimit} requests/minute
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>MAINTENANCE MODE</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Enable maintenance mode to restrict system access
                      </p>
                    </div>
                    <Switch
                      checked={config.general.maintenanceMode}
                      onCheckedChange={(checked) => updateConfig('general', 'maintenanceMode', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>DEBUG MODE</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Enable detailed logging and debug information
                      </p>
                    </div>
                    <Switch
                      checked={config.general.debugMode}
                      onCheckedChange={(checked) => updateConfig('general', 'debugMode', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">SECURITY & AUTHENTICATION</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>MIN PASSWORD LENGTH</Label>
                    <Input
                      type="number"
                      value={config.security.passwordMinLength}
                      onChange={(e) => updateConfig('security', 'passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>MAX LOGIN ATTEMPTS</Label>
                    <Input
                      type="number"
                      value={config.security.maxLoginAttempts}
                      onChange={(e) => updateConfig('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>LOCKOUT DURATION (MINUTES)</Label>
                    <Input
                      type="number"
                      value={config.security.loginLockoutDuration}
                      onChange={(e) => updateConfig('security', 'loginLockoutDuration', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>ENCRYPTION LEVEL</Label>
                    <Select 
                      value={config.security.encryptionLevel} 
                      onValueChange={(value) => updateConfig('security', 'encryptionLevel', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AES-128">AES-128</SelectItem>
                        <SelectItem value="AES-256">AES-256</SelectItem>
                        <SelectItem value="RSA-2048">RSA-2048</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>SSL CERTIFICATE EXPIRY</Label>
                  <Input
                    type="date"
                    value={config.security.certificateExpiry}
                    onChange={(e) => updateConfig('security', 'certificateExpiry', e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>PASSWORD COMPLEXITY</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Require uppercase, lowercase, numbers, and special characters
                      </p>
                    </div>
                    <Switch
                      checked={config.security.passwordComplexity}
                      onCheckedChange={(checked) => updateConfig('security', 'passwordComplexity', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>MULTI-FACTOR AUTHENTICATION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Require MFA for all admin users
                      </p>
                    </div>
                    <Switch
                      checked={config.security.mfaRequired}
                      onCheckedChange={(checked) => updateConfig('security', 'mfaRequired', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SESSION ENCRYPTION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Encrypt all session data
                      </p>
                    </div>
                    <Switch
                      checked={config.security.sessionEncryption}
                      onCheckedChange={(checked) => updateConfig('security', 'sessionEncryption', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>IP WHITELISTING</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Restrict access to whitelisted IP addresses
                      </p>
                    </div>
                    <Switch
                      checked={config.security.ipWhitelisting}
                      onCheckedChange={(checked) => updateConfig('security', 'ipWhitelisting', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SSL ENFORCEMENT</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Force HTTPS for all connections
                      </p>
                    </div>
                    <Switch
                      checked={config.security.sslEnforcement}
                      onCheckedChange={(checked) => updateConfig('security', 'sslEnforcement', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Database Settings */}
            {activeTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">DATABASE CONFIGURATION</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>CONNECTION POOL SIZE</Label>
                    <Input
                      type="number"
                      value={config.database.connectionPool}
                      onChange={(e) => updateConfig('database', 'connectionPool', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label>QUERY TIMEOUT (SECONDS)</Label>
                    <Input
                      type="number"
                      value={config.database.queryTimeout}
                      onChange={(e) => updateConfig('database', 'queryTimeout', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>BACKUP FREQUENCY</Label>
                    <Select 
                      value={config.database.backupFrequency} 
                      onValueChange={(value) => updateConfig('database', 'backupFrequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>RETENTION PERIOD (DAYS)</Label>
                    <Input
                      type="number"
                      value={config.database.retentionPeriod}
                      onChange={(e) => updateConfig('database', 'retentionPeriod', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label>MAINTENANCE WINDOW</Label>
                  <Input
                    value={config.database.maintenanceWindow}
                    onChange={(e) => updateConfig('database', 'maintenanceWindow', e.target.value)}
                    placeholder="HH:MM-HH:MM"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>BACKUP COMPRESSION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Compress backup files to save storage space
                      </p>
                    </div>
                    <Switch
                      checked={config.database.compression}
                      onCheckedChange={(checked) => updateConfig('database', 'compression', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>DATABASE ENCRYPTION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Encrypt database files at rest
                      </p>
                    </div>
                    <Switch
                      checked={config.database.encryption}
                      onCheckedChange={(checked) => updateConfig('database', 'encryption', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>REPLICATION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Enable database replication for redundancy
                      </p>
                    </div>
                    <Switch
                      checked={config.database.replicationEnabled}
                      onCheckedChange={(checked) => updateConfig('database', 'replicationEnabled', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">NOTIFICATIONS & ALERTS</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>SMTP SERVER</Label>
                    <Input
                      value={config.notifications.smtpServer}
                      onChange={(e) => updateConfig('notifications', 'smtpServer', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>SMTP PORT</Label>
                    <Input
                      type="number"
                      value={config.notifications.smtpPort}
                      onChange={(e) => updateConfig('notifications', 'smtpPort', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <Label>SMTP ENCRYPTION</Label>
                  <Select 
                    value={config.notifications.smtpEncryption} 
                    onValueChange={(value) => updateConfig('notifications', 'smtpEncryption', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">None</SelectItem>
                      <SelectItem value="TLS">TLS</SelectItem>
                      <SelectItem value="SSL">SSL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>EMAIL NOTIFICATIONS</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Send system notifications via email
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateConfig('notifications', 'emailNotifications', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS NOTIFICATIONS</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Send critical alerts via SMS
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateConfig('notifications', 'smsNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>PUSH NOTIFICATIONS</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Send browser push notifications
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateConfig('notifications', 'pushNotifications', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SYSTEM ALERTS</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Send notifications for system events
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.systemAlerts}
                      onCheckedChange={(checked) => updateConfig('notifications', 'systemAlerts', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SECURITY ALERTS</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Send notifications for security events
                      </p>
                    </div>
                    <Switch
                      checked={config.notifications.securityAlerts}
                      onCheckedChange={(checked) => updateConfig('notifications', 'securityAlerts', checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Performance Settings */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">PERFORMANCE & OPTIMIZATION</h3>
                </div>

                <div>
                  <Label>CACHE TTL (SECONDS)</Label>
                  <Input
                    type="number"
                    value={config.performance.cacheTtl}
                    onChange={(e) => updateConfig('performance', 'cacheTtl', parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>CPU THRESHOLD (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[config.performance.cpuThreshold]}
                        onValueChange={(value) => updateConfig('performance', 'cpuThreshold', value[0])}
                        min={50}
                        max={100}
                        step={5}
                      />
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Alert when CPU usage exceeds {config.performance.cpuThreshold}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label>MEMORY THRESHOLD (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[config.performance.memoryThreshold]}
                        onValueChange={(value) => updateConfig('performance', 'memoryThreshold', value[0])}
                        min={50}
                        max={100}
                        step={5}
                      />
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Alert when memory usage exceeds {config.performance.memoryThreshold}%
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label>DISK THRESHOLD (%)</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[config.performance.diskThreshold]}
                        onValueChange={(value) => updateConfig('performance', 'diskThreshold', value[0])}
                        min={70}
                        max={100}
                        step={5}
                      />
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Alert when disk usage exceeds {config.performance.diskThreshold}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>CACHE ENABLED</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Enable system-wide caching for better performance
                      </p>
                    </div>
                    <Switch
                      checked={config.performance.cacheEnabled}
                      onCheckedChange={(checked) => updateConfig('performance', 'cacheEnabled', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>COMPRESSION</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Enable response compression to reduce bandwidth
                      </p>
                    </div>
                    <Switch
                      checked={config.performance.compressionEnabled}
                      onCheckedChange={(checked) => updateConfig('performance', 'compressionEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>CDN</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Use Content Delivery Network for static assets
                      </p>
                    </div>
                    <Switch
                      checked={config.performance.cdnEnabled}
                      onCheckedChange={(checked) => updateConfig('performance', 'cdnEnabled', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>LOAD BALANCING</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Distribute traffic across multiple servers
                      </p>
                    </div>
                    <Switch
                      checked={config.performance.loadBalancing}
                      onCheckedChange={(checked) => updateConfig('performance', 'loadBalancing', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>AUTO SCALING</Label>
                      <p className="text-sm text-[var(--microsoft-gray-500)]">
                        Automatically scale resources based on demand
                      </p>
                    </div>
                    <Switch
                      checked={config.performance.autoScaling}
                      onCheckedChange={(checked) => updateConfig('performance', 'autoScaling', checked)}
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Backup Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)]">
              CREATE SYSTEM BACKUP
            </DialogTitle>
            <DialogDescription>
              Create a complete backup of the system configuration and data.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>BACKUP TYPE</Label>
              <Select defaultValue="full">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full System Backup</SelectItem>
                  <SelectItem value="config">Configuration Only</SelectItem>
                  <SelectItem value="data">Data Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>BACKUP LOCATION</Label>
              <Select defaultValue="primary">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary Storage</SelectItem>
                  <SelectItem value="secondary">Secondary Storage</SelectItem>
                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>BACKUP DESCRIPTION</Label>
              <Textarea placeholder="Optional description for this backup..." rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={createBackup}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                <HardDrive className="h-4 w-4 mr-2" />
                CREATE BACKUP
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}