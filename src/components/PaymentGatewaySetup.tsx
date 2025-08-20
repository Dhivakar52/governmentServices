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
  CreditCard,
  Smartphone,
  Building2,
  CheckCircle,
  AlertCircle,
  MapPin,
  DollarSign,
  Settings,
  Globe
} from 'lucide-react';

interface PaymentGatewaySetupProps {
  onBack: () => void;
}

interface PaymentGateway {
  id: string;
  name: string;
  type: 'mobile_money' | 'card' | 'bank_transfer' | 'crypto' | 'wallet';
  regionsEnabled: string[];
  status: 'active' | 'inactive' | 'testing';
  apiKey: string;
  apiSecret: string;
  transactionLimits: {
    min: number;
    max: number;
    daily: number;
  };
  fees: {
    percentage: number;
    fixed: number;
  };
  supportedCurrencies: string[];
  lastTransaction: string;
  monthlyVolume: number;
  successRate: number;
}

interface RegionalOverride {
  region: string;
  currency: string;
  limits: {
    min: number;
    max: number;
  };
  fees: {
    percentage: number;
    fixed: number;
  };
}

export function PaymentGatewaySetup({ onBack }: PaymentGatewaySetupProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [isAddGatewayOpen, setIsAddGatewayOpen] = useState(false);
  const [isEditGatewayOpen, setIsEditGatewayOpen] = useState(false);

  // Mock payment gateways data
  const gateways: PaymentGateway[] = [
    {
      id: '1',
      name: 'M-Pesa',
      type: 'mobile_money',
      regionsEnabled: ['Kenya', 'Uganda', 'Tanzania'],
      status: 'active',
      apiKey: 'mpesa_pk_live_8f4r93k2j1m6p8q9w2e5r7t0',
      apiSecret: 'mpesa_sk_live_y3u6i9o2p5s8d1f4g7h0j3k6',
      transactionLimits: {
        min: 10,
        max: 150000,
        daily: 300000
      },
      fees: {
        percentage: 1.5,
        fixed: 0
      },
      supportedCurrencies: ['KES', 'UGX', 'TZS'],
      lastTransaction: '2025-01-10 14:30',
      monthlyVolume: 2500000,
      successRate: 97.8
    },
    {
      id: '2',
      name: 'Visa',
      type: 'card',
      regionsEnabled: ['All Regions'],
      status: 'active',
      apiKey: 'visa_pk_live_a88d1c4f7e9b2g5h8i1j4k7l',
      apiSecret: 'visa_sk_live_0m3n6o9p2q5r8s1t4u7v0w3x',
      transactionLimits: {
        min: 1,
        max: 50000,
        daily: 100000
      },
      fees: {
        percentage: 2.9,
        fixed: 30
      },
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'KES', 'NGN'],
      lastTransaction: '2025-01-10 13:45',
      monthlyVolume: 8750000,
      successRate: 98.5
    },
    {
      id: '3',
      name: 'Zenith Bank',
      type: 'bank_transfer',
      regionsEnabled: ['Nigeria'],
      status: 'inactive',
      apiKey: 'zenith_pk_test_x1y4z7b0c3d6e9f2g5h8i1j4',
      apiSecret: 'zenith_sk_test_k7l0m3n6o9p2q5r8s1t4u7v0',
      transactionLimits: {
        min: 100,
        max: 1000000,
        daily: 5000000
      },
      fees: {
        percentage: 0.5,
        fixed: 50
      },
      supportedCurrencies: ['NGN'],
      lastTransaction: '2025-01-08 16:20',
      monthlyVolume: 0,
      successRate: 95.2
    },
    {
      id: '4',
      name: 'Orange Money',
      type: 'mobile_money',
      regionsEnabled: ['Senegal', 'Mali', 'Burkina Faso'],
      status: 'testing',
      apiKey: 'orange_pk_test_m3n6o9p2q5r8s1t4u7v0w3x6',
      apiSecret: 'orange_sk_test_y9z2a5b8c1d4e7f0g3h6i9j2',
      transactionLimits: {
        min: 500,
        max: 500000,
        daily: 1000000
      },
      fees: {
        percentage: 1.8,
        fixed: 25
      },
      supportedCurrencies: ['XOF'],
      lastTransaction: '2025-01-09 11:30',
      monthlyVolume: 150000,
      successRate: 94.1
    }
  ];

  const gatewayTypes = [
    { value: 'mobile_money', label: 'Mobile Money', icon: Smartphone },
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: Building2 },
    { value: 'crypto', label: 'Cryptocurrency', icon: DollarSign },
    { value: 'wallet', label: 'Digital Wallet', icon: CreditCard }
  ];

  const availableRegions = [
    'All Regions',
    'Nigeria',
    'Kenya',
    'Ghana',
    'South Africa',
    'Egypt',
    'Morocco',
    'Uganda',
    'Tanzania',
    'Ethiopia',
    'Senegal',
    'Mali',
    'Burkina Faso',
    'Ivory Coast',
    'Algeria',
    'Tunisia'
  ];

  const currencies = [
    'USD', 'EUR', 'GBP', 'NGN', 'KES', 'GHS', 'ZAR', 'EGP', 
    'MAD', 'UGX', 'TZS', 'ETB', 'XOF', 'DZD', 'TND'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      case 'testing':
        return <Badge className="d365-badge-warning"><Settings className="h-3 w-3 mr-1" />Testing</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    const gatewayType = gatewayTypes.find(t => t.value === type);
    if (!gatewayType) return CreditCard;
    return gatewayType.icon;
  };

  const filteredGateways = gateways.filter(gateway =>
    gateway.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gateway.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGatewayForm = (gateway?: PaymentGateway) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="gatewayName">Gateway Name</Label>
          <Input 
            id="gatewayName" 
            placeholder="e.g., M-Pesa"
            defaultValue={gateway?.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gatewayType">Type</Label>
          <Select defaultValue={gateway?.type}>
            <SelectTrigger>
              <SelectValue placeholder="Select gateway type" />
            </SelectTrigger>
            <SelectContent>
              {gatewayTypes.map((type) => {
                const TypeIcon = type.icon;
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Enabled Regions</Label>
        <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded p-3">
          {availableRegions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox 
                id={region}
                defaultChecked={gateway?.regionsEnabled.includes(region)}
              />
              <Label htmlFor={region} className="text-caption">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input 
            id="apiKey" 
            type="password"
            placeholder="Enter API key"
            defaultValue={gateway?.apiKey}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apiSecret">API Secret</Label>
          <Input 
            id="apiSecret" 
            type="password"
            placeholder="Enter API secret"
            defaultValue={gateway?.apiSecret}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Transaction Limits</Label>
        <div className="grid grid-cols-3 gap-4 p-4 bg-d365-surface-secondary rounded">
          <div className="space-y-2">
            <Label htmlFor="minLimit">Minimum Amount</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-d365-secondary" />
              <Input 
                id="minLimit" 
                type="number"
                placeholder="10"
                defaultValue={gateway?.transactionLimits.min}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxLimit">Maximum Amount</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-d365-secondary" />
              <Input 
                id="maxLimit" 
                type="number"
                placeholder="50000"
                defaultValue={gateway?.transactionLimits.max}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyLimit">Daily Limit</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-d365-secondary" />
              <Input 
                id="dailyLimit" 
                type="number"
                placeholder="100000"
                defaultValue={gateway?.transactionLimits.daily}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Fee Structure</Label>
        <div className="grid grid-cols-2 gap-4 p-4 bg-d365-surface-secondary rounded">
          <div className="space-y-2">
            <Label htmlFor="feePercentage">Percentage Fee (%)</Label>
            <Input 
              id="feePercentage" 
              type="number"
              step="0.1"
              placeholder="2.5"
              defaultValue={gateway?.fees.percentage}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feeFixed">Fixed Fee</Label>
            <Input 
              id="feeFixed" 
              type="number"
              placeholder="30"
              defaultValue={gateway?.fees.fixed}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Supported Currencies</Label>
        <div className="grid grid-cols-4 gap-2 max-h-24 overflow-y-auto border rounded p-3">
          {currencies.map((currency) => (
            <div key={currency} className="flex items-center space-x-2">
              <Checkbox 
                id={currency}
                defaultChecked={gateway?.supportedCurrencies.includes(currency)}
              />
              <Label htmlFor={currency} className="text-caption">
                {currency}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Regional Overrides (Optional)</Label>
        <Textarea 
          placeholder="JSON configuration for regional fee and limit overrides..."
          className="min-h-[80px]"
        />
        <p className="text-caption text-d365-secondary">
          Configure region-specific settings that override global defaults
        </p>
      </div>
    </div>
  );

  return (
    <AdminPageLayout
      title="Payment Gateway Setup"
      onBack={onBack}
      actionButton={{
        label: 'Add Gateway',
        onClick: () => setIsAddGatewayOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search gateways..."
      onSearch={setSearchQuery}
    >
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Payment Gateways ({filteredGateways.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gateway Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Regions Enabled</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Monthly Volume</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGateways.map((gateway) => {
                const TypeIcon = getTypeIcon(gateway.type);
                return (
                  <TableRow key={gateway.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-lg bg-d365-surface-secondary flex items-center justify-center">
                          <TypeIcon className="h-5 w-5 text-d365-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{gateway.name}</p>
                          <p className="text-caption text-d365-secondary">
                            Last transaction: {gateway.lastTransaction}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {gateway.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {gateway.regionsEnabled.slice(0, 2).map((region) => (
                          <div key={region} className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-d365-secondary" />
                            <span className="text-caption">{region}</span>
                          </div>
                        ))}
                        {gateway.regionsEnabled.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{gateway.regionsEnabled.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(gateway.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-caption">Success:</span>
                          <Badge className="d365-badge-success text-xs">
                            {gateway.successRate}%
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-caption">Fee:</span>
                          <span className="text-caption">
                            {gateway.fees.percentage}% + ${gateway.fees.fixed}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-3 w-3 text-d365-secondary" />
                        <span className="font-medium">
                          ${gateway.monthlyVolume.toLocaleString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedGateway(gateway);
                            setIsEditGatewayOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive"
                          disabled={gateway.status === 'active'}
                        >
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

      {/* Add Gateway Dialog */}
      <Dialog open={isAddGatewayOpen} onOpenChange={setIsAddGatewayOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Payment Gateway</DialogTitle>
            <DialogDescription>
              Configure a new payment gateway for processing transactions.
            </DialogDescription>
          </DialogHeader>
          {renderGatewayForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddGatewayOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddGatewayOpen(false)}>Add Gateway</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Gateway Dialog */}
      <Dialog open={isEditGatewayOpen} onOpenChange={setIsEditGatewayOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Payment Gateway</DialogTitle>
            <DialogDescription>
              Update gateway configuration and settings.
            </DialogDescription>
          </DialogHeader>
          {renderGatewayForm(selectedGateway || undefined)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGatewayOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditGatewayOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}