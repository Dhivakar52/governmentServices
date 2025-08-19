import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { 
  Wallet, 
  TrendingUp, 
  Users, 
  Plus,
  Settings,
  Eye,
  Pause,
  MessageCircle,
  MapPin,
  DollarSign,
  Activity,
  Building,


} from 'lucide-react';

export function SmartWallet() {
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showProviderDetails, setShowProviderDetails] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: '',
    apiEndpoint: '',
    contactEmail: ''
  });

  const walletStats = [
    {
      title: 'Total Wallet Users',
      value: '3,428,110',
      icon: Users,
      color: 'bg-blue-500',
      change: '+5.2%',
      period: 'vs last month'
    },
    {
      title: 'Daily Transaction Volume',
      value: '$220K',
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+12.8%',
      period: 'vs yesterday'
    },
    {
      title: 'Active Providers',
      value: '3',
      icon: Building,
      color: 'bg-purple-500',
      change: 'Stable',
      period: 'operational'
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      icon: Activity,
      color: 'bg-orange-500',
      change: '+0.3%',
      period: 'this week'
    }
  ];

  const walletProviders = [
    {
      id: 1,
      name: 'Orange Money',
      type: 'Mobile Money',
      status: 'active',
      users: '1,450,000',
      dailyVolume: '$125K',
      successRate: '99.2%',
      lastSync: '2 minutes ago',
      apiHealth: 'excellent',
      region: 'National',
      integration: 'API v2.1'
    },
    {
      id: 2,
      name: 'Inwi Pay',
      type: 'Mobile Money',
      status: 'active',
      users: '980,000',
      dailyVolume: '$75K',
      successRate: '98.8%',
      lastSync: '5 minutes ago',
      apiHealth: 'good',
      region: 'National',
      integration: 'API v1.8'
    },
    {
      id: 3,
      name: 'Barid Cash',
      type: 'Digital Wallet',
      status: 'warning',
      users: '998,110',
      dailyVolume: '$20K',
      successRate: '96.1%',
      lastSync: '45 minutes ago',
      apiHealth: 'degraded',
      region: 'National',
      integration: 'API v1.5'
    }
  ];

  const recentTransactions = [
    { id: 'TXN-001', user: 'CIV-2025-001234', amount: '$25.00', provider: 'Orange Money', status: 'completed', time: '2 min ago' },
    { id: 'TXN-002', user: 'CIV-2025-005678', amount: '$150.00', provider: 'Inwi Pay', status: 'completed', time: '3 min ago' },
    { id: 'TXN-003', user: 'CIV-2025-009012', amount: '$75.50', provider: 'Barid Cash', status: 'failed', time: '5 min ago' },
    { id: 'TXN-004', user: 'CIV-2025-003456', amount: '$200.00', provider: 'Orange Money', status: 'pending', time: '8 min ago' },
    { id: 'TXN-005', user: 'CIV-2025-007890', amount: '$45.25', provider: 'Inwi Pay', status: 'completed', time: '12 min ago' }
  ];

  const regionalData = [
    { region: 'Casablanca-Settat', users: '890,000', volume: '$85K', percentage: '26%' },
    { region: 'Rabat-Salé-Kénitra', users: '720,000', volume: '$68K', percentage: '21%' },
    { region: 'Marrakech-Safi', users: '610,000', volume: '$42K', percentage: '18%' },
    { region: 'Fès-Meknès', users: '480,000', volume: '$35K', percentage: '14%' },
    { region: 'Tanger-Tétouan-Al Hoceïma', users: '728,110', volume: '$25K', percentage: '21%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProvider = () => {
    console.log('Adding new provider:', newProvider);
    setNewProvider({ name: '', type: '', apiEndpoint: '', contactEmail: '' });
    setShowAddProvider(false);
    // Show success message
    alert('Wallet provider added successfully!');
  };

  const viewProviderDetails = (provider: any) => {
    setSelectedProvider(provider);
    setShowProviderDetails(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            SMART WALLET INTEGRATION
          </h1>
          <p className="text-gray-600">
            Monitor and manage digital wallet providers and transaction flows
          </p>
        </div>
        <Button 
          onClick={() => setShowAddProvider(true)}
          className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          ADD WALLET PROVIDER
        </Button>
      </div>

      {/* Wallet Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {walletStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Wallet Providers */}
        <div className="lg:col-span-2">
          <Card className="formal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[var(--government-green)]">PARTNER PROVIDERS</h3>
              <Badge className="bg-blue-100 text-blue-800">
                {walletProviders.length} ACTIVE INTEGRATIONS
              </Badge>
            </div>
            
            <div className="space-y-4">
              {walletProviders.map((provider) => (
                <div key={provider.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                        <Wallet className="h-5 w-5 text-[var(--government-green)]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--government-green)]">{provider.name}</h4>
                        <p className="text-sm text-gray-600">{provider.type} • {provider.integration}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(provider.status)}>
                      {provider.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Users</p>
                      <p className="font-bold text-[var(--government-green)]">{provider.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Daily Volume</p>
                      <p className="font-bold text-[var(--government-green)]">{provider.dailyVolume}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Success Rate</p>
                      <p className="font-bold text-[var(--government-green)]">{provider.successRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Last Sync</p>
                      <p className="font-bold text-[var(--government-green)]">{provider.lastSync}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked={provider.status === 'active'} />
                      <span className="text-sm">Enable/Disable Access</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewProviderDetails(provider)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        VIEW
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        CONFIG
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        SUPPORT
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Regional Usage Map */}
        <div>
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-4">
              WALLET USAGE BY REGION
            </h3>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{region.region}</span>
                    <span className="text-sm text-gray-600">{region.percentage}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[var(--government-green)] h-2 rounded-full" 
                      style={{ width: region.percentage }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{region.users} users</span>
                    <span>{region.volume} daily</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <MapPin className="h-4 w-4 mr-2" />
              VIEW DETAILED MAP
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">RECENT TRANSACTIONS</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              VIEW TRANSACTION LOG
            </Button>
            <Button variant="outline" size="sm">
              <Pause className="h-4 w-4 mr-2" />
              FREEZE WALLET
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TRANSACTION ID</TableHead>
              <TableHead>CITIZEN ID</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>PROVIDER</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-medium">{txn.id}</TableCell>
                <TableCell>{txn.user}</TableCell>
                <TableCell className="font-bold">{txn.amount}</TableCell>
                <TableCell>{txn.provider}</TableCell>
                <TableCell>
                  <Badge className={getTransactionStatusColor(txn.status)}>
                    {txn.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{txn.time}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Provider Modal */}
      <Dialog open={showAddProvider} onOpenChange={setShowAddProvider}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              ADD NEW WALLET PROVIDER
            </DialogTitle>
            <DialogDescription>
              Configure a new digital wallet provider integration for the national system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>PROVIDER NAME</Label>
              <Input
                value={newProvider.name}
                onChange={(e) => setNewProvider(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter provider name"
              />
            </div>
            <div>
              <Label>PROVIDER TYPE</Label>
              <select 
                className="w-full p-2 border rounded"
                value={newProvider.type}
                onChange={(e) => setNewProvider(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">Select provider type</option>
                <option value="Mobile Money">Mobile Money</option>
                <option value="Digital Wallet">Digital Wallet</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
              </select>
            </div>
            <div>
              <Label>API ENDPOINT</Label>
              <Input
                value={newProvider.apiEndpoint}
                onChange={(e) => setNewProvider(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                placeholder="https://api.provider.com/v1"
              />
            </div>
            <div>
              <Label>CONTACT EMAIL</Label>
              <Input
                type="email"
                value={newProvider.contactEmail}
                onChange={(e) => setNewProvider(prev => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="integration@provider.com"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddProvider(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleAddProvider}
                disabled={!newProvider.name || !newProvider.type}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                ADD PROVIDER
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Provider Details Modal */}
      <Dialog open={showProviderDetails} onOpenChange={setShowProviderDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              PROVIDER DETAILS: {selectedProvider?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed information and management options for this wallet provider.
            </DialogDescription>
          </DialogHeader>
          {selectedProvider && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>PROVIDER STATUS</Label>
                  <Badge className={getStatusColor(selectedProvider.status)}>
                    {selectedProvider.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>API HEALTH</Label>
                  <Badge className="bg-green-100 text-green-800">
                    {selectedProvider.apiHealth.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>TOTAL USERS</Label>
                  <p className="font-bold">{selectedProvider.users}</p>
                </div>
                <div>
                  <Label>DAILY VOLUME</Label>
                  <p className="font-bold">{selectedProvider.dailyVolume}</p>
                </div>
                <div>
                  <Label>SUCCESS RATE</Label>
                  <p className="font-bold">{selectedProvider.successRate}</p>
                </div>
                <div>
                  <Label>COVERAGE</Label>
                  <p className="font-bold">{selectedProvider.region}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  CONFIGURE SETTINGS
                </Button>
                <Button variant="outline">
                  VIEW FULL LOGS
                </Button>
                <Button onClick={() => setShowProviderDetails(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}