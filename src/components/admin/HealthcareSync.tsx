import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { 
  Heart, 
  Users, 
  Shield, 
  Building2,
  Stethoscope,
  Pill,

  Plus,
  Settings,
  Eye,
  CheckCircle,


  Activity,
  Database,
  Link2,
  TrendingUp
} from 'lucide-react';

export function HealthcareSync() {
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showProviderDetails, setShowProviderDetails] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [newProvider, setNewProvider] = useState({
    name: '',
    type: '',
    location: '',
    contactEmail: '',
    apiEndpoint: ''
  });

  const healthcareStats = [
    {
      title: 'Citizens Linked with Health ID',
      value: '2,320,000',
      icon: Users,
      color: 'bg-blue-500',
      change: '+45,200',
      period: 'new linkages this month'
    },
    {
      title: 'Vaccination Records Synced',
      value: '1,932,114',
      icon: Shield,
      color: 'bg-green-500',
      change: '+12,850',
      period: 'updated this week'
    },
    {
      title: 'Insurance Providers Connected',
      value: '14',
      icon: Building2,
      color: 'bg-purple-500',
      change: '+2',
      period: 'new partnerships'
    },
    {
      title: 'Compliance Score (WHO/HL7)',
      value: '98.5%',
      icon: CheckCircle,
      color: 'bg-orange-500',
      change: '+1.2%',
      period: 'improvement'
    }
  ];

  const connectedProviders = [
    {
      id: 1,
      name: 'Mohammed V University Hospital',
      type: 'Public Hospital',
      location: 'Rabat',
      status: 'active',
      patients: '45,230',
      recordsSync: '41,850',
      lastSync: '2 minutes ago',
      compliance: '99.2%',
      services: ['Emergency Care', 'Vaccinations', 'Surgery', 'Outpatient'],
      integration: 'HL7 FHIR'
    },
    {
      id: 2,
      name: 'Cheikh Khalifa Hospital',
      type: 'Public Hospital',
      location: 'Casablanca',
      status: 'active',
      patients: '52,100',
      recordsSync: '48,920',
      lastSync: '5 minutes ago',
      compliance: '98.8%',
      services: ['Cardiology', 'Oncology', 'Pediatrics', 'ICU'],
      integration: 'HL7 FHIR'
    },
    {
      id: 3,
      name: 'Clinique Internationale',
      type: 'Private Clinic',
      location: 'Marrakech',
      status: 'warning',
      patients: '12,800',
      recordsSync: '11,940',
      lastSync: '45 minutes ago',
      compliance: '96.1%',
      services: ['General Practice', 'Diagnostics', 'Pharmacy'],
      integration: 'Custom API'
    },
    {
      id: 4,
      name: 'CNSS (Social Security)',
      type: 'Insurance Provider',
      location: 'National',
      status: 'active',
      patients: '1,850,000',
      recordsSync: '1,785,200',
      lastSync: '1 minute ago',
      compliance: '99.5%',
      services: ['Health Insurance', 'Claims Processing', 'Coverage Verification'],
      integration: 'HL7 FHIR'
    }
  ];

  const recordTypes = [
    { type: 'Vaccination Records', count: '1,932,114', percentage: '83.3%', growth: '+2.1%' },
    { type: 'Medical Consultations', count: '3,856,320', percentage: '95.2%', growth: '+5.8%' },
    { type: 'Laboratory Results', count: '2,145,780', percentage: '78.9%', growth: '+3.4%' },
    { type: 'Prescription History', count: '4,250,160', percentage: '89.1%', growth: '+4.2%' },
    { type: 'Insurance Claims', count: '1,654,890', percentage: '72.4%', growth: '+1.9%' },
    { type: 'Emergency Records', count: '245,670', percentage: '98.7%', growth: '+0.8%' }
  ];

  const pilotPrograms = [
    {
      id: 'PILOT-001',
      name: 'E-Prescription Integration',
      description: 'Digital prescription system with 3 major hospitals',
      status: 'in_progress',
      participants: '3 hospitals',
      coverage: '125,000 patients',
      completionRate: '67%',
      startDate: '2024-10-01',
      expectedEnd: '2025-03-31'
    },
    {
      id: 'PILOT-002',
      name: 'Telemedicine Platform',
      description: 'Remote consultation platform for rural areas',
      status: 'planning',
      participants: '8 rural clinics',
      coverage: '45,000 patients',
      completionRate: '15%',
      startDate: '2025-02-01',
      expectedEnd: '2025-08-31'
    },
    {
      id: 'PILOT-003',
      name: 'AI Diagnostic Support',
      description: 'AI-powered diagnostic assistance for radiologists',
      status: 'completed',
      participants: '2 diagnostic centers',
      coverage: '12,000 scans',
      completionRate: '100%',
      startDate: '2024-06-01',
      expectedEnd: '2024-12-31'
    }
  ];

  const recentActivity = [
    {
      id: 'ACT-001',
      action: 'Vaccination record updated',
      provider: 'Mohammed V University Hospital',
      citizenId: 'CIV-2025-001234',
      recordType: 'COVID-19 Booster',
      timestamp: '2 min ago',
      status: 'synced'
    },
    {
      id: 'ACT-002',
      action: 'Insurance claim processed',
      provider: 'CNSS (Social Security)',
      citizenId: 'CIV-2025-005678',
      recordType: 'Dental Treatment',
      timestamp: '5 min ago',
      status: 'synced'
    },
    {
      id: 'ACT-003',
      action: 'Lab results synchronized',
      provider: 'Clinique Internationale',
      citizenId: 'CIV-2025-009012',
      recordType: 'Blood Test',
      timestamp: '8 min ago',
      status: 'failed'
    },
    {
      id: 'ACT-004',
      action: 'Emergency admission recorded',
      provider: 'Cheikh Khalifa Hospital',
      citizenId: 'CIV-2025-003456',
      recordType: 'Emergency Care',
      timestamp: '12 min ago',
      status: 'synced'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPilotStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'synced': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddProvider = () => {
    console.log('Adding new healthcare provider:', newProvider);
    setNewProvider({ name: '', type: '', location: '', contactEmail: '', apiEndpoint: '' });
    setShowAddProvider(false);
    alert('Healthcare provider added successfully! Integration process will begin shortly.');
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
            HEALTHCARE SYNC INTEGRATION
          </h1>
          <p className="text-gray-600">
            Health ID linkage and medical record synchronization across healthcare providers
          </p>
        </div>
        <Button 
          onClick={() => setShowAddProvider(true)}
          className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          ADD HEALTH SERVICE PROVIDER
        </Button>
      </div>

      {/* Healthcare Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthcareStats.map((stat, index) => {
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

      {/* E-Prescription Pilot Status */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-[var(--government-green)]">
            E-PRESCRIPTION INTEGRATION (PILOT)
          </h3>
          <Badge className="bg-blue-100 text-blue-800">IN PILOT PHASE</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Building2 className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">3 HOSPITALS CONNECTED</h4>
            <p className="text-sm text-gray-600">Mohammed V, Cheikh Khalifa, Ibn Sina</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Pill className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">12,850 PRESCRIPTIONS</h4>
            <p className="text-sm text-gray-600">Digital prescriptions issued this month</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Activity className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">95.2% SUCCESS RATE</h4>
            <p className="text-sm text-gray-600">Successful prescription synchronization</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Connected Healthcare Providers */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--government-green)]">CONNECTED PROVIDERS</h3>
            <Badge className="bg-blue-100 text-blue-800">
              {connectedProviders.length} ACTIVE INTEGRATIONS
            </Badge>
          </div>
          
          <div className="space-y-4">
            {connectedProviders.map((provider) => (
              <div key={provider.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                      {provider.type.includes('Hospital') ? (
                        <Heart className="h-5 w-5 text-[var(--government-green)]" />
                      ) : provider.type.includes('Insurance') ? (
                        <Shield className="h-5 w-5 text-[var(--government-green)]" />
                      ) : (
                        <Stethoscope className="h-5 w-5 text-[var(--government-green)]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--government-green)]">{provider.name}</h4>
                      <p className="text-sm text-gray-600">{provider.type} • {provider.location}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(provider.status)}>
                    {provider.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Patients</p>
                    <p className="font-bold text-[var(--government-green)]">{provider.patients}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Records Synced</p>
                    <p className="font-bold text-[var(--government-green)]">{provider.recordsSync}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Compliance</p>
                    <p className="font-bold text-[var(--government-green)]">{provider.compliance}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {provider.services.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {provider.services.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{provider.services.length - 2} more
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewProviderDetails(provider)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    VIEW
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Record Synchronization Stats */}
        <Card className="formal-card p-6">
          <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">
            RECORD SYNCHRONIZATION BY TYPE
          </h3>
          <div className="space-y-4">
            {recordTypes.map((record, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{record.type}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{record.percentage}</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {record.growth}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[var(--government-green)] h-2 rounded-full" 
                    style={{ width: record.percentage }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{record.count} records synchronized</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Pilot Programs */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">PILOT PROGRAMS</h3>
          <Badge className="bg-purple-100 text-purple-800">
            INNOVATION INITIATIVES
          </Badge>
        </div>
        
        <div className="space-y-4">
          {pilotPrograms.map((pilot) => (
            <div key={pilot.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-[var(--government-green)]">{pilot.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{pilot.description}</p>
                </div>
                <Badge className={getPilotStatusColor(pilot.status)}>
                  {pilot.status.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Participants:</span>
                  <p className="font-medium">{pilot.participants}</p>
                </div>
                <div>
                  <span className="text-gray-500">Coverage:</span>
                  <p className="font-medium">{pilot.coverage}</p>
                </div>
                <div>
                  <span className="text-gray-500">Progress:</span>
                  <p className="font-medium">{pilot.completionRate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Timeline:</span>
                  <p className="font-medium">{new Date(pilot.startDate).toLocaleDateString()} - {new Date(pilot.expectedEnd).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[var(--government-green)] h-2 rounded-full" 
                  style={{ width: pilot.completionRate }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Sync Activity */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">RECENT SYNCHRONIZATION ACTIVITY</h3>
          <Button variant="outline" size="sm">
            <Database className="h-4 w-4 mr-2" />
            VIEW SYNC LOGS
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ACTION</TableHead>
              <TableHead>PROVIDER</TableHead>
              <TableHead>CITIZEN ID</TableHead>
              <TableHead>RECORD TYPE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.action}</TableCell>
                <TableCell>{activity.provider}</TableCell>
                <TableCell>{activity.citizenId}</TableCell>
                <TableCell>{activity.recordType}</TableCell>
                <TableCell>
                  <Badge className={getActivityStatusColor(activity.status)}>
                    {activity.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Provider Modal */}
      <Dialog open={showAddProvider} onOpenChange={setShowAddProvider}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              ADD HEALTH SERVICE PROVIDER
            </DialogTitle>
            <DialogDescription>
              Connect a new healthcare provider to the national health ID system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>PROVIDER NAME</Label>
              <Input
                value={newProvider.name}
                onChange={(e) => setNewProvider(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter healthcare provider name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>PROVIDER TYPE</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newProvider.type}
                  onChange={(e) => setNewProvider(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="">Select provider type</option>
                  <option value="Public Hospital">Public Hospital</option>
                  <option value="Private Hospital">Private Hospital</option>
                  <option value="Public Clinic">Public Clinic</option>
                  <option value="Private Clinic">Private Clinic</option>
                  <option value="Insurance Provider">Insurance Provider</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>
              <div>
                <Label>LOCATION</Label>
                <Input
                  value={newProvider.location}
                  onChange={(e) => setNewProvider(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City/Region"
                />
              </div>
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
            <div>
              <Label>API ENDPOINT (Optional)</Label>
              <Input
                value={newProvider.apiEndpoint}
                onChange={(e) => setNewProvider(prev => ({ ...prev, apiEndpoint: e.target.value }))}
                placeholder="https://api.provider.com/fhir"
              />
            </div>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <p className="text-sm text-blue-700">
                <CheckCircle className="h-4 w-4 inline mr-2" />
                <strong>Compliance Note:</strong> All healthcare integrations must comply with WHO/HL7 standards and national health data protection regulations.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddProvider(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleAddProvider}
                disabled={!newProvider.name || !newProvider.type || !newProvider.contactEmail}
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
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              PROVIDER DETAILS: {selectedProvider?.name}
            </DialogTitle>
            <DialogDescription>
              Comprehensive information and management options for this healthcare provider.
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
                  <Label>INTEGRATION TYPE</Label>
                  <Badge className="bg-blue-100 text-blue-800">
                    {selectedProvider.integration}
                  </Badge>
                </div>
                <div>
                  <Label>TOTAL PATIENTS</Label>
                  <p className="font-bold">{selectedProvider.patients}</p>
                </div>
                <div>
                  <Label>RECORDS SYNCHRONIZED</Label>
                  <p className="font-bold">{selectedProvider.recordsSync}</p>
                </div>
                <div>
                  <Label>COMPLIANCE SCORE</Label>
                  <p className="font-bold">{selectedProvider.compliance}</p>
                </div>
                <div>
                  <Label>LAST SYNC</Label>
                  <p className="font-bold">{selectedProvider.lastSync}</p>
                </div>
              </div>
              
              <div>
                <Label className="text-[var(--government-green)]">AVAILABLE SERVICES</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProvider.services?.map((service: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  CONFIGURE INTEGRATION
                </Button>
                <Button variant="outline">
                  <Link2 className="h-4 w-4 mr-2" />
                  TEST CONNECTION
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