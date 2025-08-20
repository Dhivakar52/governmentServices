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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2,
  DollarSign,
  Calendar,

  Clock,
  Calculator,
  TrendingUp
} from 'lucide-react';

interface FeePenaltyConfigurationProps {
  onBack: () => void;
}

interface FeeConfiguration {
  id: string;
  licenseType: string;
  baseFee: number;
  renewalFee: number;
  lateFee: number;
  penaltyType: 'fixed' | 'percentage' | 'daily' | 'compound';
  penaltyAmount: number;
  gracePeriod: number;
  gracePeriodUnit: 'days' | 'weeks' | 'months';
  maxPenalty?: number;
  suspensionThreshold?: number;
  autoSuspend: boolean;
  paymentMethods: string[];
  currency: string;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'pending';
}

export function FeePenaltyConfiguration({ onBack }: FeePenaltyConfigurationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeeConfig, setSelectedFeeConfig] = useState<FeeConfiguration | null>(null);
  const [isAddFeeOpen, setIsAddFeeOpen] = useState(false);
  const [isEditFeeOpen, setIsEditFeeOpen] = useState(false);

  // Mock fee configurations data
  const feeConfigurations: FeeConfiguration[] = [
    {
      id: '1',
      licenseType: 'Learner\'s Permit',
      baseFee: 25,
      renewalFee: 10,
      lateFee: 5,
      penaltyType: 'fixed',
      penaltyAmount: 5,
      gracePeriod: 30,
      gracePeriodUnit: 'days',
      maxPenalty: 50,
      suspensionThreshold: 100,
      autoSuspend: true,
      paymentMethods: ['Cash', 'Card', 'Mobile Money'],
      currency: 'USD',
      lastUpdated: '2025-01-08',
      status: 'active'
    },
    {
      id: '2',
      licenseType: 'Regular Driver\'s License',
      baseFee: 75,
      renewalFee: 50,
      lateFee: 15,
      penaltyType: 'percentage',
      penaltyAmount: 10,
      gracePeriod: 60,
      gracePeriodUnit: 'days',
      maxPenalty: 200,
      suspensionThreshold: 300,
      autoSuspend: true,
      paymentMethods: ['Cash', 'Card', 'Mobile Money', 'Bank Transfer'],
      currency: 'USD',
      lastUpdated: '2025-01-09',
      status: 'active'
    },
    {
      id: '3',
      licenseType: 'Commercial Driver\'s License',
      baseFee: 120,
      renewalFee: 90,
      lateFee: 25,
      penaltyType: 'daily',
      penaltyAmount: 2,
      gracePeriod: 15,
      gracePeriodUnit: 'days',
      maxPenalty: 500,
      suspensionThreshold: 600,
      autoSuspend: true,
      paymentMethods: ['Card', 'Bank Transfer', 'Check'],
      currency: 'USD',
      lastUpdated: '2025-01-07',
      status: 'active'
    },
    {
      id: '4',
      licenseType: 'Motorcycle License',
      baseFee: 45,
      renewalFee: 30,
      lateFee: 8,
      penaltyType: 'fixed',
      penaltyAmount: 8,
      gracePeriod: 45,
      gracePeriodUnit: 'days',
      maxPenalty: 150,
      suspensionThreshold: 200,
      autoSuspend: false,
      paymentMethods: ['Cash', 'Card', 'Mobile Money'],
      currency: 'USD',
      lastUpdated: '2025-01-06',
      status: 'active'
    },
    {
      id: '5',
      licenseType: 'International Driving Permit',
      baseFee: 35,
      renewalFee: 35,
      lateFee: 10,
      penaltyType: 'percentage',
      penaltyAmount: 15,
      gracePeriod: 30,
      gracePeriodUnit: 'days',
      maxPenalty: 100,
      autoSuspend: false,
      paymentMethods: ['Card', 'Bank Transfer'],
      currency: 'USD',
      lastUpdated: '2025-01-05',
      status: 'active'
    },
    {
      id: '6',
      licenseType: 'Heavy Vehicle License',
      baseFee: 200,
      renewalFee: 150,
      lateFee: 40,
      penaltyType: 'compound',
      penaltyAmount: 5,
      gracePeriod: 10,
      gracePeriodUnit: 'days',
      maxPenalty: 1000,
      suspensionThreshold: 1200,
      autoSuspend: true,
      paymentMethods: ['Bank Transfer', 'Check'],
      currency: 'USD',
      lastUpdated: '2025-01-04',
      status: 'pending'
    }
  ];

  const licenseTypes = [
    'Learner\'s Permit',
    'Regular Driver\'s License',
    'Commercial Driver\'s License',
    'Motorcycle License',
    'International Driving Permit',
    'Heavy Vehicle License'
  ];

  const penaltyTypes = [
    { value: 'fixed', label: 'Fixed Amount', description: 'Set penalty amount per violation' },
    { value: 'percentage', label: 'Percentage', description: 'Percentage of base fee' },
    { value: 'daily', label: 'Daily Rate', description: 'Amount per day overdue' },
    { value: 'compound', label: 'Compound Interest', description: 'Compounding penalty over time' }
  ];

  const paymentMethods = [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Mobile Money',
    'Bank Transfer',
    'Check',
    'Online Payment'
  ];

  const currencies = [
    { value: 'USD', label: 'USD ($)' },
    { value: 'EUR', label: 'EUR (€)' },
    { value: 'KES', label: 'KES (KSh)' },
    { value: 'NGN', label: 'NGN (₦)' },
    { value: 'GHS', label: 'GHS (₵)' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success">Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error">Inactive</Badge>;
      case 'pending':
        return <Badge className="d365-badge-warning">Pending</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getPenaltyTypeIcon = (type: string) => {
    switch (type) {
      case 'fixed':
        return <DollarSign className="h-4 w-4" />;
      case 'percentage':
        return <Calculator className="h-4 w-4" />;
      case 'daily':
        return <Calendar className="h-4 w-4" />;
      case 'compound':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const formatPenalty = (config: FeeConfiguration) => {
    switch (config.penaltyType) {
      case 'fixed':
        return `$${config.penaltyAmount} fixed`;
      case 'percentage':
        return `${config.penaltyAmount}% of base fee`;
      case 'daily':
        return `$${config.penaltyAmount}/day`;
      case 'compound':
        return `${config.penaltyAmount}% compound`;
      default:
        return `$${config.penaltyAmount}`;
    }
  };

  const filteredConfigurations = feeConfigurations.filter(config =>
    config.licenseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFeeForm = (config?: FeeConfiguration) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="licenseType">License Type</Label>
          <Select defaultValue={config?.licenseType}>
            <SelectTrigger>
              <SelectValue placeholder="Select license type" />
            </SelectTrigger>
            <SelectContent>
              {licenseTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select defaultValue={config?.currency || 'USD'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="baseFee">Base Fee</Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-d365-secondary" />
            <Input 
              id="baseFee" 
              type="number"
              min="0"
              step="0.01"
              placeholder="75.00"
              defaultValue={config?.baseFee}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="renewalFee">Renewal Fee</Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-d365-secondary" />
            <Input 
              id="renewalFee" 
              type="number"
              min="0"
              step="0.01"
              placeholder="50.00"
              defaultValue={config?.renewalFee}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lateFee">Late Fee</Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-d365-secondary" />
            <Input 
              id="lateFee" 
              type="number"
              min="0"
              step="0.01"
              placeholder="15.00"
              defaultValue={config?.lateFee}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Penalty Configuration</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="penaltyType">Penalty Type</Label>
            <Select defaultValue={config?.penaltyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select penalty type" />
              </SelectTrigger>
              <SelectContent>
                {penaltyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      {getPenaltyTypeIcon(type.value)}
                      <div>
                        <span>{type.label}</span>
                        <p className="text-caption text-d365-secondary">{type.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="penaltyAmount">Penalty Amount</Label>
            <Input 
              id="penaltyAmount" 
              type="number"
              min="0"
              step="0.01"
              placeholder="10"
              defaultValue={config?.penaltyAmount}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Grace Period</Label>
          <div className="flex space-x-2">
            <Input 
              type="number"
              min="0"
              placeholder="30"
              defaultValue={config?.gracePeriod}
              className="flex-1"
            />
            <Select defaultValue={config?.gracePeriodUnit || 'days'}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxPenalty">Maximum Penalty (Optional)</Label>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-d365-secondary" />
            <Input 
              id="maxPenalty" 
              type="number"
              min="0"
              step="0.01"
              placeholder="No limit"
              defaultValue={config?.maxPenalty}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Suspension Rules</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="suspensionThreshold">Suspension Threshold</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-d365-secondary" />
              <Input 
                id="suspensionThreshold" 
                type="number"
                min="0"
                step="0.01"
                placeholder="300.00"
                defaultValue={config?.suspensionThreshold}
              />
            </div>
            <p className="text-caption text-d365-secondary">
              Auto-suspend license when penalty exceeds this amount
            </p>
          </div>
          <div className="flex items-center justify-between p-4 bg-d365-surface-secondary rounded">
            <div>
              <Label htmlFor="autoSuspend" className="text-body font-medium">
                Auto Suspension
              </Label>
              <p className="text-caption text-d365-secondary mt-1">
                Automatically suspend license when threshold is reached
              </p>
            </div>
            <Switch 
              id="autoSuspend" 
              defaultChecked={config?.autoSuspend}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Accepted Payment Methods</Label>
        <div className="grid grid-cols-2 gap-2 border rounded p-3">
          {paymentMethods.map((method) => (
            <div key={method} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={method}
                defaultChecked={config?.paymentMethods.includes(method)}
                className="rounded border-d365-border"
              />
              <Label htmlFor={method} className="text-caption">
                {method}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <AdminPageLayout
      title="Fee & Penalty Configuration"
      onBack={onBack}
      actionButton={{
        label: 'Configure Fee',
        onClick: () => setIsAddFeeOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search license types..."
      onSearch={setSearchQuery}
    >
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Fee Configurations ({filteredConfigurations.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Type</TableHead>
                <TableHead>Base Fee</TableHead>
                <TableHead>Renewal Fee</TableHead>
                <TableHead>Penalty Type</TableHead>
                <TableHead>Grace Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConfigurations.map((config) => (
                <TableRow key={config.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{config.licenseType}</p>
                      <p className="text-caption text-d365-secondary">
                        Updated: {config.lastUpdated}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-d365-secondary" />
                      <span className="font-medium">{config.baseFee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3 text-d365-secondary" />
                      <span className="font-medium">{config.renewalFee}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPenaltyTypeIcon(config.penaltyType)}
                      <div>
                        <p className="font-medium capitalize">{config.penaltyType}</p>
                        <p className="text-caption text-d365-secondary">
                          {formatPenalty(config)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-d365-secondary" />
                      <span>
                        {config.gracePeriod} {config.gracePeriodUnit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(config.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedFeeConfig(config);
                          setIsEditFeeOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive"
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

      {/* Add Fee Configuration Dialog */}
      <Dialog open={isAddFeeOpen} onOpenChange={setIsAddFeeOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Configure License Fees</DialogTitle>
            <DialogDescription>
              Set up fee structure and penalty rules for a license type.
            </DialogDescription>
          </DialogHeader>
          {renderFeeForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddFeeOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddFeeOpen(false)}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Fee Configuration Dialog */}
      <Dialog open={isEditFeeOpen} onOpenChange={setIsEditFeeOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Fee Configuration</DialogTitle>
            <DialogDescription>
              Update fee structure and penalty rules.
            </DialogDescription>
          </DialogHeader>
          {renderFeeForm(selectedFeeConfig || undefined)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditFeeOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditFeeOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}