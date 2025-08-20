import { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2,
  Key,
  RotateCcw,
  Eye,
  EyeOff,
  Calendar,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Copy,
  Network
} from 'lucide-react';

interface APIAccessManagementProps {
  onBack: () => void;
}

interface APIKey {
  id: string;
  label: string;
  keyValue: string;
  createdOn: string;
  expiresOn: string;
  status: 'active' | 'expired' | 'revoked';
  ipWhitelist: string[];
  rateLimit: number;
  accessScope: string[];
  lastUsed: string;
  requestCount: number;
  monthlyUsage: number;
  usageLimit: number;
}

interface UsageData {
  date: string;
  requests: number;
  errors: number;
}

export function APIAccessManagement({ onBack }: APIAccessManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState<APIKey | null>(null);
  const [isGenerateKeyOpen, setIsGenerateKeyOpen] = useState(false);
  const [isEditKeyOpen, setIsEditKeyOpen] = useState(false);
  const [showKeyValue, setShowKeyValue] = useState<string | null>(null);

  // Mock API keys data
  const apiKeys: APIKey[] = [
    {
      id: '1',
      label: 'Partner API',
      keyValue: 'civility_live_pk_8f4r93k2j1m6p8q9w2e5r7t0y3u6i9o2p5s8d1f4g7h0j3k6l9m2n5o8p1q4',
      createdOn: '2025-01-01',
      expiresOn: '2025-12-31',
      status: 'active',
      ipWhitelist: ['203.0.113.1', '203.0.113.2', '198.51.100.0/24'],
      rateLimit: 1000,
      accessScope: ['applications.read', 'applications.create', 'documents.read', 'status.read'],
      lastUsed: '2025-01-10 14:30',
      requestCount: 45230,
      monthlyUsage: 8500,
      usageLimit: 10000
    },
    {
      id: '2',
      label: 'Mobile Team',
      keyValue: 'civility_live_pk_a88d1c4f7e9b2g5h8i1j4k7l0m3n6o9p2q5r8s1t4u7v0w3x6y9z2a5b8c1d4',
      createdOn: '2025-07-15',
      expiresOn: '2025-10-15',
      status: 'expired',
      ipWhitelist: ['192.168.1.0/24'],
      rateLimit: 500,
      accessScope: ['applications.read', 'status.read'],
      lastUsed: '2025-10-10 09:15',
      requestCount: 12450,
      monthlyUsage: 0,
      usageLimit: 5000
    },
    {
      id: '3',
      label: 'Internal Dashboard',
      keyValue: 'civility_live_pk_x1y4z7b0c3d6e9f2g5h8i1j4k7l0m3n6o9p2q5r8s1t4u7v0w3x6y9z2a5b8c1',
      createdOn: '2024-12-01',
      expiresOn: '2025-06-01',
      status: 'active',
      ipWhitelist: ['10.0.0.0/8', '172.16.0.0/12'],
      rateLimit: 2000,
      accessScope: ['applications.read', 'applications.create', 'applications.update', 'documents.read', 'documents.create', 'users.read', 'reports.read'],
      lastUsed: '2025-01-10 13:45',
      requestCount: 78920,
      monthlyUsage: 15600,
      usageLimit: 20000
    },
    {
      id: '4',
      label: 'Test Environment',
      keyValue: 'civility_test_pk_m3n6o9p2q5r8s1t4u7v0w3x6y9z2a5b8c1d4e7f0g3h6i9j2k5l8m1n4o7p0q3',
      createdOn: '2025-01-05',
      expiresOn: '2025-07-05',
      status: 'revoked',
      ipWhitelist: ['*'],
      rateLimit: 100,
      accessScope: ['applications.read'],
      lastUsed: '2025-01-08 16:20',
      requestCount: 890,
      monthlyUsage: 0,
      usageLimit: 1000
    }
  ];

  // Mock usage data for charts
  const usageData: UsageData[] = [
    { date: '2025-01-04', requests: 1200, errors: 15 },
    { date: '2025-01-05', requests: 1450, errors: 8 },
    { date: '2025-01-06', requests: 980, errors: 12 },
    { date: '2025-01-07', requests: 1680, errors: 22 },
    { date: '2025-01-08', requests: 1320, errors: 6 },
    { date: '2025-01-09', requests: 1590, errors: 18 },
    { date: '2025-01-10', requests: 1750, errors: 9 }
  ];

  const availableScopes = [
    { value: 'applications.read', label: 'Applications - Read', description: 'View application data' },
    { value: 'applications.create', label: 'Applications - Create', description: 'Submit new applications' },
    { value: 'applications.update', label: 'Applications - Update', description: 'Modify application status' },
    { value: 'documents.read', label: 'Documents - Read', description: 'Access document files' },
    { value: 'documents.create', label: 'Documents - Create', description: 'Upload documents' },
    { value: 'users.read', label: 'Users - Read', description: 'View user profiles' },
    { value: 'users.create', label: 'Users - Create', description: 'Create user accounts' },
    { value: 'reports.read', label: 'Reports - Read', description: 'Access analytics data' },
    { value: 'status.read', label: 'Status - Read', description: 'Check application status' },
    { value: 'payments.read', label: 'Payments - Read', description: 'View payment information' },
    { value: 'notifications.send', label: 'Notifications - Send', description: 'Send notifications' }
  ];

  const rateLimits = [
    { value: 100, label: '100 requests/minute' },
    { value: 500, label: '500 requests/minute' },
    { value: 1000, label: '1,000 requests/minute' },
    { value: 2000, label: '2,000 requests/minute' },
    { value: 5000, label: '5,000 requests/minute' },
    { value: 10000, label: '10,000 requests/minute' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'expired':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Expired</Badge>;
      case 'revoked':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Revoked</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const maskApiKey = (key: string) => {
    if (key.length < 16) return key;
    return `${key.substring(0, 12)}...${key.substring(key.length - 8)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real implementation, show a toast notification
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysUntilExpiry <= 30;
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const filteredKeys = apiKeys.filter(key =>
    key.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.keyValue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderKeyForm = (key?: APIKey) => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="keyLabel">API Key Label</Label>
        <Input 
          id="keyLabel" 
          placeholder="e.g., Partner Integration"
          defaultValue={key?.label}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiration Date</Label>
        <Input 
          id="expiryDate" 
          type="date"
          defaultValue={key?.expiresOn}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rateLimit">Rate Limit</Label>
        <Select defaultValue={key?.rateLimit.toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Select rate limit" />
          </SelectTrigger>
          <SelectContent>
            {rateLimits.map((limit) => (
              <SelectItem key={limit.value} value={limit.value.toString()}>
                {limit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>IP Whitelist</Label>
        <Textarea 
          placeholder="Enter IP addresses or CIDR ranges, one per line&#10;203.0.113.1&#10;198.51.100.0/24&#10;* (Allow all)"
          className="min-h-[100px]"
          defaultValue={key?.ipWhitelist.join('\n')}
        />
        <p className="text-caption text-d365-secondary">
          Leave empty or use '*' to allow all IP addresses
        </p>
      </div>

      <div className="space-y-3">
        <Label>Access Scope</Label>
        <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto border rounded p-3">
          {availableScopes.map((scope) => (
            <div key={scope.value} className="flex items-start space-x-3 p-2 hover:bg-d365-surface-secondary rounded">
              <Checkbox 
                id={scope.value}
                defaultChecked={key?.accessScope.includes(scope.value)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor={scope.value} className="text-body font-medium">
                  {scope.label}
                </Label>
                <p className="text-caption text-d365-secondary">
                  {scope.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminPageLayout
      title="API Access Management"
      onBack={onBack}
      actionButton={{
        label: 'Generate API Key',
        onClick: () => setIsGenerateKeyOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search API keys..."
      onSearch={setSearchQuery}
    >
      <div className="space-y-6">
        {/* API Keys Table */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>API Keys ({filteredKeys.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key Label</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Expires On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-d365-surface-secondary flex items-center justify-center">
                          <Key className="h-5 w-5 text-d365-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{key.label}</p>
                          <p className="text-caption text-d365-secondary">
                            {key.requestCount.toLocaleString()} total requests
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <code className="bg-d365-surface-secondary px-2 py-1 rounded text-caption">
                          {showKeyValue === key.id ? key.keyValue : maskApiKey(key.keyValue)}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setShowKeyValue(showKeyValue === key.id ? null : key.id)}
                        >
                          {showKeyValue === key.id ? (
                            <EyeOff className="h-3 w-3" />
                          ) : (
                            <Eye className="h-3 w-3" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => copyToClipboard(key.keyValue)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-d365-secondary" />
                        <span className="text-caption">{key.createdOn}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-d365-secondary" />
                        <span className={`text-caption ${isExpiringSoon(key.expiresOn) ? 'text-orange-600' : ''}`}>
                          {key.expiresOn}
                        </span>
                        {isExpiringSoon(key.expiresOn) && key.status === 'active' && (
                          <Clock className="h-3 w-3 text-orange-600" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(key.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Activity className="h-3 w-3 text-d365-secondary" />
                          <span className="text-caption">
                            {key.monthlyUsage.toLocaleString()} / {key.usageLimit.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-d365-surface-secondary rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              getUsagePercentage(key.monthlyUsage, key.usageLimit) > 80 
                                ? 'bg-red-500' 
                                : getUsagePercentage(key.monthlyUsage, key.usageLimit) > 60 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(getUsagePercentage(key.monthlyUsage, key.usageLimit), 100)}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedKey(key);
                            setIsEditKeyOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {key.status === 'expired' && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          disabled={key.status === 'revoked'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Usage Analytics */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>API Usage Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Total Requests</span>
                </div>
                <p className="text-title2 font-semibold text-blue-900 mt-1">
                  {usageData.reduce((sum, day) => sum + day.requests, 0).toLocaleString()}
                </p>
                <p className="text-caption text-blue-700">Last 7 days</p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Success Rate</span>
                </div>
                <p className="text-title2 font-semibold text-green-900 mt-1">98.7%</p>
                <p className="text-caption text-green-700">Average</p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-900">Total Errors</span>
                </div>
                <p className="text-title2 font-semibold text-orange-900 mt-1">
                  {usageData.reduce((sum, day) => sum + day.errors, 0)}
                </p>
                <p className="text-caption text-orange-700">Last 7 days</p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                <div className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-900">Active Keys</span>
                </div>
                <p className="text-title2 font-semibold text-purple-900 mt-1">
                  {apiKeys.filter(key => key.status === 'active').length}
                </p>
                <p className="text-caption text-purple-700">Currently active</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Daily Request Volume</h4>
              <div className="grid grid-cols-7 gap-2">
                {usageData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-d365-surface-secondary rounded p-2 mb-1">
                      <div 
                        className="bg-d365-primary rounded"
                        style={{ 
                          height: `${Math.max((day.requests / 2000) * 60, 4)}px`,
                          marginTop: `${60 - Math.max((day.requests / 2000) * 60, 4)}px`
                        }}
                      />
                    </div>
                    <p className="text-caption text-d365-secondary">
                      {new Date(day.date).getDate()}/{new Date(day.date).getMonth() + 1}
                    </p>
                    <p className="text-caption font-medium">{day.requests}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate API Key Dialog */}
      <Dialog open={isGenerateKeyOpen} onOpenChange={setIsGenerateKeyOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate New API Key</DialogTitle>
            <DialogDescription>
              Create a new API key with specific permissions and access controls.
            </DialogDescription>
          </DialogHeader>
          {renderKeyForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGenerateKeyOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsGenerateKeyOpen(false)}>Generate Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit API Key Dialog */}
      <Dialog open={isEditKeyOpen} onOpenChange={setIsEditKeyOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
            <DialogDescription>
              Update API key settings and permissions.
            </DialogDescription>
          </DialogHeader>
          {renderKeyForm(selectedKey || undefined)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditKeyOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditKeyOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}