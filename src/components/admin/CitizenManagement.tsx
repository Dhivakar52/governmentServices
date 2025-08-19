import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Shield,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Clock,
  Smartphone,
  Globe,
  TrendingUp,
  Settings,
  RefreshCw
} from 'lucide-react';

export function CitizenManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCitizenDetails, setShowCitizenDetails] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState<any>(null);
  const [selectedCitizens, setSelectedCitizens] = useState<string[]>([]);

  const citizenStats = [
    {
      title: 'Total Registered Citizens',
      value: '7,834,456',
      icon: Users,
      color: 'bg-blue-500',
      change: '+3,245',
      period: 'last 24h'
    },
    {
      title: 'Verified Citizens',
      value: '5,890,321',
      icon: UserCheck,
      color: 'bg-green-500',
      change: '+1,850',
      period: 'last 24h'
    },
    {
      title: 'Pending Verification',
      value: '1,944,135',
      icon: Clock,
      color: 'bg-yellow-500',
      change: '+1,395',
      period: 'pending review'
    },
    {
      title: 'Suspended Accounts',
      value: '12,890',
      icon: UserX,
      color: 'bg-red-500',
      change: '+45',
      period: 'security reviews'
    }
  ];

  const citizens = [
    {
      id: 'CIV-2025-001234',
      fullName: 'Ahmed Ben Ali',
      email: 'ahmed.benali@email.com',
      mobile: '+212-6-12-34-56-78',
      registrationDate: '2025-01-08',
      lastLogin: '2025-01-08 14:30',
      status: 'verified',
      location: 'Casablanca',
      documentsCount: 5,
      biometricStatus: 'enrolled',
      riskScore: 'low'
    },
    {
      id: 'CIV-2025-005678',
      fullName: 'Fatima El Mansouri',
      email: 'fatima.elmansouri@email.com',
      mobile: '+212-6-87-65-43-21',
      registrationDate: '2025-01-07',
      lastLogin: '2025-01-08 09:15',
      status: 'verified',
      location: 'Rabat',
      documentsCount: 3,
      biometricStatus: 'enrolled',
      riskScore: 'low'
    },
    {
      id: 'CIV-2025-009012',
      fullName: 'Omar Benali',
      email: 'omar.benali@email.com',
      mobile: '+212-6-11-22-33-44',
      registrationDate: '2025-01-06',
      lastLogin: '2025-01-07 16:45',
      status: 'pending',
      location: 'Marrakech',
      documentsCount: 2,
      biometricStatus: 'pending',
      riskScore: 'medium'
    },
    {
      id: 'CIV-2025-003456',
      fullName: 'Aicha Amrani',
      email: 'aicha.amrani@email.com',
      mobile: '+212-6-99-88-77-66',
      registrationDate: '2025-01-05',
      lastLogin: '2025-01-08 11:20',
      status: 'verified',
      location: 'Fès',
      documentsCount: 4,
      biometricStatus: 'enrolled',
      riskScore: 'low'
    },
    {
      id: 'CIV-2025-007890',
      fullName: 'Youssef Idrissi',
      email: 'youssef.idrissi@email.com',
      mobile: '+212-6-55-44-33-22',
      registrationDate: '2025-01-04',
      lastLogin: '2025-01-06 08:30',
      status: 'suspended',
      location: 'Tanger',
      documentsCount: 1,
      biometricStatus: 'failed',
      riskScore: 'high'
    }
  ];

  const verificationQueue = [
    {
      id: 'VER-2025-001',
      citizenId: 'CIV-2025-009012',
      citizenName: 'Omar Benali',
      verificationType: 'Document Review',
      submittedDate: '2025-01-08',
      priority: 'normal',
      assignedTo: 'Review Team A',
      estimatedCompletion: '2025-01-10'
    },
    {
      id: 'VER-2025-002',
      citizenId: 'CIV-2025-011111',
      citizenName: 'Zahra Chakir',
      verificationType: 'Biometric Verification',
      submittedDate: '2025-01-08',
      priority: 'urgent',
      assignedTo: 'Review Team B',
      estimatedCompletion: '2025-01-09'
    },
    {
      id: 'VER-2025-003',
      citizenId: 'CIV-2025-022222',
      citizenName: 'Hassan Alami',
      verificationType: 'Address Verification',
      submittedDate: '2025-01-07',
      priority: 'normal',
      assignedTo: 'Review Team C',
      estimatedCompletion: '2025-01-11'
    }
  ];

  const filteredCitizens = citizens.filter(citizen => {
    const matchesSearch = citizen.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         citizen.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || citizen.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewCitizenDetails = (citizen: any) => {
    setSelectedCitizen(citizen);
    setShowCitizenDetails(true);
  };

  const toggleCitizenSelection = (citizenId: string) => {
    setSelectedCitizens(prev => 
      prev.includes(citizenId) 
        ? prev.filter(id => id !== citizenId)
        : [...prev, citizenId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on citizens:`, selectedCitizens);
    setSelectedCitizens([]);
    setShowBulkActions(false);
    alert(`${action} applied to ${selectedCitizens.length} citizens`);
  };

  const exportCitizenData = () => {
    const csvData = [
      ['Citizen ID', 'Full Name', 'Email', 'Status', 'Registration Date', 'Location'],
      ...filteredCitizens.map(citizen => [
        citizen.id, citizen.fullName, citizen.email, citizen.status, citizen.registrationDate, citizen.location
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `citizens_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            CITIZENS & ID MANAGEMENT
          </h1>
          <p className="text-gray-600">
            Manage citizen registrations, verification processes, and digital identity statuses
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportCitizenData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            EXPORT DATA
          </Button>
          {selectedCitizens.length > 0 && (
            <Button 
              onClick={() => setShowBulkActions(true)}
              className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
            >
              BULK ACTIONS ({selectedCitizens.length})
            </Button>
          )}
        </div>
      </div>

      {/* Citizen Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {citizenStats.map((stat, index) => {
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

      <Tabs defaultValue="citizens" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="citizens">CITIZEN REGISTRY</TabsTrigger>
          <TabsTrigger value="verification">VERIFICATION QUEUE</TabsTrigger>
        </TabsList>

        <TabsContent value="citizens" className="space-y-6">
          {/* Filters */}
          <Card className="formal-card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search citizens by name, ID, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[var(--government-green)]/30 focus:border-[var(--government-green)]"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-[var(--government-green)]/30 focus:border-[var(--government-green)]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Citizens Table */}
          <Card className="formal-card">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedCitizens.length === filteredCitizens.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCitizens(filteredCitizens.map(c => c.id));
                        } else {
                          setSelectedCitizens([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">CITIZEN ID</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">FULL NAME</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">EMAIL</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">STATUS</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">LOCATION</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">RISK SCORE</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">LAST LOGIN</TableHead>
                  <TableHead className="text-right font-bold text-[var(--government-green)]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCitizens.map((citizen) => (
                  <TableRow key={citizen.id} className="hover:bg-gray-50">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedCitizens.includes(citizen.id)}
                        onChange={() => toggleCitizenSelection(citizen.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{citizen.id}</TableCell>
                    <TableCell>{citizen.fullName}</TableCell>
                    <TableCell>{citizen.email}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(citizen.status)}>
                        {citizen.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{citizen.location}</TableCell>
                    <TableCell>
                      <Badge className={getRiskColor(citizen.riskScore)}>
                        {citizen.riskScore.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{citizen.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewCitizenDetails(citizen)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card className="formal-card">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--government-green)]">VERIFICATION QUEUE</h3>
                <Badge className="bg-yellow-100 text-yellow-800">
                  {verificationQueue.length} PENDING REVIEWS
                </Badge>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>VERIFICATION ID</TableHead>
                  <TableHead>CITIZEN</TableHead>
                  <TableHead>TYPE</TableHead>
                  <TableHead>PRIORITY</TableHead>
                  <TableHead>ASSIGNED TO</TableHead>
                  <TableHead>SUBMITTED</TableHead>
                  <TableHead>EST. COMPLETION</TableHead>
                  <TableHead>ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verificationQueue.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.citizenName}</p>
                        <p className="text-sm text-gray-500">{item.citizenId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{item.verificationType}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>{item.submittedDate}</TableCell>
                    <TableCell>{item.estimatedCompletion}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Citizen Details Modal */}
      <Dialog open={showCitizenDetails} onOpenChange={setShowCitizenDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              CITIZEN DETAILS: {selectedCitizen?.fullName}
            </DialogTitle>
            <DialogDescription>
              Complete profile and verification information for this citizen.
            </DialogDescription>
          </DialogHeader>
          {selectedCitizen && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CITIZEN ID</Label>
                  <p className="font-medium">{selectedCitizen.id}</p>
                </div>
                <div>
                  <Label>REGISTRATION DATE</Label>
                  <p className="font-medium">{selectedCitizen.registrationDate}</p>
                </div>
                <div>
                  <Label>EMAIL ADDRESS</Label>
                  <p className="font-medium">{selectedCitizen.email}</p>
                </div>
                <div>
                  <Label>MOBILE NUMBER</Label>
                  <p className="font-medium">{selectedCitizen.mobile}</p>
                </div>
                <div>
                  <Label>CURRENT STATUS</Label>
                  <Badge className={getStatusColor(selectedCitizen.status)}>
                    {selectedCitizen.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>BIOMETRIC STATUS</Label>
                  <Badge className={selectedCitizen.biometricStatus === 'enrolled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                    {selectedCitizen.biometricStatus.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>DOCUMENTS COUNT</Label>
                  <p className="font-medium">{selectedCitizen.documentsCount} uploaded</p>
                </div>
                <div>
                  <Label>RISK ASSESSMENT</Label>
                  <Badge className={getRiskColor(selectedCitizen.riskScore)}>
                    {selectedCitizen.riskScore.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <Smartphone className="h-8 w-8 text-[var(--government-green)] mx-auto mb-2" />
                  <h4 className="font-bold">MOBILE VERIFIED</h4>
                  <p className="text-sm text-green-600">✓ Confirmed</p>
                </Card>
                <Card className="p-4 text-center">
                  <Shield className="h-8 w-8 text-[var(--government-green)] mx-auto mb-2" />
                  <h4 className="font-bold">IDENTITY VERIFIED</h4>
                  <p className="text-sm text-green-600">✓ Government ID</p>
                </Card>
                <Card className="p-4 text-center">
                  <Globe className="h-8 w-8 text-[var(--government-green)] mx-auto mb-2" />
                  <h4 className="font-bold">ADDRESS VERIFIED</h4>
                  <p className="text-sm text-green-600">✓ Proof Document</p>
                </Card>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  REVERIFY
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  MANAGE ACCOUNT
                </Button>
                <Button onClick={() => setShowCitizenDetails(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Bulk Actions Modal */}
      <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              BULK ACTIONS
            </DialogTitle>
            <DialogDescription>
              Apply actions to {selectedCitizens.length} selected citizens.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('Verify')}
                className="h-16 flex flex-col items-center justify-center"
              >
                <CheckCircle className="h-6 w-6 mb-2" />
                VERIFY CITIZENS
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('Suspend')}
                className="h-16 flex flex-col items-center justify-center"
              >
                <Ban className="h-6 w-6 mb-2" />
                SUSPEND ACCOUNTS
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('Export')}
                className="h-16 flex flex-col items-center justify-center"
              >
                <Download className="h-6 w-6 mb-2" />
                EXPORT DATA
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleBulkAction('Review')}
                className="h-16 flex flex-col items-center justify-center"
              >
                <Eye className="h-6 w-6 mb-2" />
                MARK FOR REVIEW
              </Button>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowBulkActions(false)}>
                CANCEL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}