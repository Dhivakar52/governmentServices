import  { useState } from 'react';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2,
  Shield,

  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Settings,
  Fingerprint,
  CreditCard,
  User,
  FileCheck
} from 'lucide-react';

interface KYCIntegrationProps {
  onBack: () => void;
}

interface KYCProvider {
  id: string;
  name: string;
  country: string;
  region: string;
  apiKey: string;
  status: 'active' | 'inactive' | 'testing';
  endpoint: string;
  supportedFeatures: string[];
  lastSync: string;
  errorRate: number;
  responseTime: number;
}

interface KYCRule {
  id: string;
  name: string;
  requiredFields: string[];
  fallbackManualVerification: boolean;
  providerId: string;
  regions: string[];
  priority: number;
  status: 'active' | 'inactive';
}

export function KYCIntegration({ onBack }: KYCIntegrationProps) {
  const [activeTab, setActiveTab] = useState('providers');
  const [selectedProvider, setSelectedProvider] = useState<KYCProvider | null>(null);
  const [selectedRule, setSelectedRule] = useState<KYCRule | null>(null);
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [isEditProviderOpen, setIsEditProviderOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock KYC providers
  const providers: KYCProvider[] = [
    {
      id: '1',
      name: 'NIMC Nigeria',
      country: 'Nigeria',
      region: 'West Africa',
      apiKey: 'nmx_live_8f4r93k2j1m6p8q9w2e5r7t0y3u6i9o2p5s8d1f4g7h0j3k6l9',
      status: 'active',
      endpoint: 'https://api.nimc.gov.ng/v1',
      supportedFeatures: ['ID Verification', 'Biometric', 'Address Verification'],
      lastSync: '2025-01-10 14:30',
      errorRate: 2.1,
      responseTime: 850
    },
    {
      id: '2',
      name: 'Kenya National ID',
      country: 'Kenya',
      region: 'East Africa',
      apiKey: 'ken_live_a88d1c4f7e9b2g5h8i1j4k7l0m3n6o9p2q5r8s1t4u7v0w3x6y9',
      status: 'inactive',
      endpoint: 'https://api.hudumakenya.go.ke/v2',
      supportedFeatures: ['ID Verification', 'Address Verification'],
      lastSync: '2025-01-08 09:15',
      errorRate: 5.7,
      responseTime: 1200
    },
    {
      id: '3',
      name: 'Ghana Card',
      country: 'Ghana',
      region: 'West Africa',
      apiKey: 'gha_test_x1y4z7b0c3d6e9f2g5h8i1j4k7l0m3n6o9p2q5r8s1t4u7v0w3',
      status: 'testing',
      endpoint: 'https://api.ghanacard.gov.gh/v1',
      supportedFeatures: ['ID Verification', 'Biometric', 'Tax Verification'],
      lastSync: '2025-01-09 16:45',
      errorRate: 8.3,
      responseTime: 1450
    },
    {
      id: '4',
      name: 'South Africa HANIS',
      country: 'South Africa',
      region: 'Southern Africa',
      apiKey: 'rsa_live_m3n6o9p2q5r8s1t4u7v0w3x6y9z2a5b8c1d4e7f0g3h6i9j2k5',
      status: 'active',
      endpoint: 'https://api.dha.gov.za/hanis/v2',
      supportedFeatures: ['ID Verification', 'Biometric', 'Address Verification', 'Criminal Check'],
      lastSync: '2025-01-10 11:22',
      errorRate: 1.8,
      responseTime: 650
    }
  ];

  // Mock KYC rules
  const rules: KYCRule[] = [
    {
      id: '1',
      name: 'Standard ID Verification',
      requiredFields: ['ID Number', 'Full Name', 'Date of Birth'],
      fallbackManualVerification: true,
      providerId: '1',
      regions: ['West Africa', 'East Africa'],
      priority: 1,
      status: 'active'
    },
    {
      id: '2',
      name: 'Enhanced Biometric Check',
      requiredFields: ['ID Number', 'Full Name', 'Biometric Data', 'Photo'],
      fallbackManualVerification: false,
      providerId: '1',
      regions: ['West Africa'],
      priority: 2,
      status: 'active'
    },
    {
      id: '3',
      name: 'Address Verification',
      requiredFields: ['ID Number', 'Full Name', 'Address'],
      fallbackManualVerification: true,
      providerId: '4',
      regions: ['Southern Africa'],
      priority: 1,
      status: 'inactive'
    }
  ];

  const countries = [
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'kenya', label: 'Kenya' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'south-africa', label: 'South Africa' },
    { value: 'egypt', label: 'Egypt' },
    { value: 'morocco', label: 'Morocco' },
    { value: 'ethiopia', label: 'Ethiopia' },
    { value: 'tanzania', label: 'Tanzania' }
  ];

  const regions = [
    { value: 'west-africa', label: 'West Africa' },
    { value: 'east-africa', label: 'East Africa' },
    { value: 'north-africa', label: 'North Africa' },
    { value: 'southern-africa', label: 'Southern Africa' },
    { value: 'central-africa', label: 'Central Africa' }
  ];

  const availableFields = [
    { value: 'ID Number', label: 'National ID Number', icon: CreditCard },
    { value: 'Full Name', label: 'Full Name', icon: User },
    { value: 'Date of Birth', label: 'Date of Birth', icon: User },
    { value: 'Address', label: 'Address Verification', icon: MapPin },
    { value: 'Biometric Data', label: 'Biometric Data', icon: Fingerprint },
    { value: 'Photo', label: 'Photograph', icon: User },
    { value: 'Tax Verification', label: 'Tax Number', icon: FileCheck },
    { value: 'Criminal Check', label: 'Criminal Background', icon: Shield }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      case 'testing':
        return <Badge className="d365-badge-warning"><Clock className="h-3 w-3 mr-1" />Testing</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getPerformanceBadge = (value: number, type: 'error' | 'response') => {
    if (type === 'error') {
      if (value < 3) return <Badge className="d365-badge-success">{value}%</Badge>;
      if (value < 6) return <Badge className="d365-badge-warning">{value}%</Badge>;
      return <Badge className="d365-badge-error">{value}%</Badge>;
    } else {
      if (value < 1000) return <Badge className="d365-badge-success">{value}ms</Badge>;
      if (value < 2000) return <Badge className="d365-badge-warning">{value}ms</Badge>;
      return <Badge className="d365-badge-error">{value}ms</Badge>;
    }
  };

  const maskApiKey = (apiKey: string) => {
    if (apiKey.length < 8) return apiKey;
    return `${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 6)}`;
  };

  const filteredProviders = providers.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProvidersTable = () => (
    <Card className="d365-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>KYC Providers ({filteredProviders.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Features</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProviders.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{provider.name}</div>
                    <div className="text-caption text-d365-secondary flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{provider.country}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <code className="bg-d365-surface-secondary px-2 py-1 rounded text-caption">
                      {showApiKey === provider.id ? provider.apiKey : maskApiKey(provider.apiKey)}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowApiKey(showApiKey === provider.id ? null : provider.id)}
                    >
                      {showApiKey === provider.id ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{provider.region}</Badge>
                </TableCell>
                <TableCell>{getStatusBadge(provider.status)}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-caption">Error:</span>
                      {getPerformanceBadge(provider.errorRate, 'error')}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-caption">Response:</span>
                      {getPerformanceBadge(provider.responseTime, 'response')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {provider.supportedFeatures.slice(0, 2).map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs mr-1">
                        {feature}
                      </Badge>
                    ))}
                    {provider.supportedFeatures.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{provider.supportedFeatures.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setIsEditProviderOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
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
  );

  const renderRulesTable = () => (
    <Card className="d365-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>KYC Rules ({filteredRules.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Required Fields</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Regions</TableHead>
              <TableHead>Fallback</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRules.map((rule) => {
              const provider = providers.find(p => p.id === rule.providerId);
              return (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div className="font-medium">{rule.name}</div>
                    <div className="text-caption text-d365-secondary">
                      Priority: {rule.priority}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {rule.requiredFields.slice(0, 2).map((field) => (
                        <Badge key={field} variant="outline" className="text-xs mr-1">
                          {field}
                        </Badge>
                      ))}
                      {rule.requiredFields.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{rule.requiredFields.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-d365-secondary" />
                      <span>{provider?.name || 'Unknown'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {rule.regions.map((region) => (
                        <Badge key={region} variant="outline" className="text-xs mr-1">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {rule.fallbackManualVerification ? (
                      <Badge className="d365-badge-success">Enabled</Badge>
                    ) : (
                      <Badge className="d365-badge-error">Disabled</Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(rule.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedRule(rule);
                          setIsAddRuleOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <AdminPageLayout
      title="KYC / National ID Integration"
      onBack={onBack}
      actionButton={{
        label: activeTab === 'providers' ? 'Add Provider' : 'Add Rule',
        onClick: () => activeTab === 'providers' ? setIsAddProviderOpen(true) : setIsAddRuleOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder={activeTab === 'providers' ? "Search providers..." : "Search rules..."}
      onSearch={setSearchQuery}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="providers" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Providers</span>
          </TabsTrigger>
          <TabsTrigger value="rules" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Rules</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          {renderProvidersTable()}
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          {renderRulesTable()}
        </TabsContent>
      </Tabs>

      {/* Add Provider Dialog */}
      <Dialog open={isAddProviderOpen} onOpenChange={setIsAddProviderOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add KYC Provider</DialogTitle>
            <DialogDescription>
              Configure a new KYC verification provider for identity validation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="providerName">Provider Name</Label>
                <Input id="providerName" placeholder="e.g., NIMC Nigeria" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input id="apiKey" type="password" placeholder="Enter API key" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endpoint">API Endpoint</Label>
              <Input id="endpoint" placeholder="https://api.example.com/v1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProviderOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddProviderOpen(false)}>Add Provider</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Rule Dialog */}
      <Dialog open={isAddRuleOpen} onOpenChange={setIsAddRuleOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedRule ? 'Edit' : 'Add'} KYC Rule</DialogTitle>
            <DialogDescription>
              Configure verification requirements and validation rules.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ruleName">Rule Name</Label>
              <Input 
                id="ruleName" 
                placeholder="e.g., Standard ID Verification"
                defaultValue={selectedRule?.name}
              />
            </div>
            
            <div className="space-y-3">
              <Label>Required Fields</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableFields.map((field) => {
                  const FieldIcon = field.icon;
                  return (
                    <div key={field.value} className="flex items-center space-x-2 p-2 border rounded">
                      <Checkbox 
                        id={field.value}
                        defaultChecked={selectedRule?.requiredFields.includes(field.value)}
                      />
                      <FieldIcon className="h-4 w-4 text-d365-secondary" />
                      <Label htmlFor={field.value} className="text-caption">
                        {field.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">KYC Provider</Label>
              <Select defaultValue={selectedRule?.providerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name} ({provider.country})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Applicable Regions</Label>
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <div key={region.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={region.value}
                      defaultChecked={selectedRule?.regions.includes(region.label)}
                    />
                    <Label htmlFor={region.value} className="text-caption">
                      {region.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
              <div>
                <Label htmlFor="fallback" className="text-body font-medium">
                  Fallback Manual Verification
                </Label>
                <p className="text-caption text-d365-secondary mt-1">
                  Allow manual verification when automated checks fail
                </p>
              </div>
              <Switch 
                id="fallback" 
                defaultChecked={selectedRule?.fallbackManualVerification ?? true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRuleOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddRuleOpen(false)}>
              {selectedRule ? 'Save Changes' : 'Create Rule'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Provider Dialog */}
      <Dialog open={isEditProviderOpen} onOpenChange={setIsEditProviderOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit KYC Provider</DialogTitle>
            <DialogDescription>
              Update provider configuration and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editProviderName">Provider Name</Label>
                <Input 
                  id="editProviderName" 
                  defaultValue={selectedProvider?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editCountry">Country</Label>
                <Select defaultValue={selectedProvider?.country.toLowerCase().replace(' ', '-')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editApiKey">API Key</Label>
              <Input 
                id="editApiKey" 
                type="password" 
                defaultValue={selectedProvider?.apiKey}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEndpoint">API Endpoint</Label>
              <Input 
                id="editEndpoint" 
                defaultValue={selectedProvider?.endpoint}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editStatus">Status</Label>
              <Select defaultValue={selectedProvider?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProviderOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditProviderOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}