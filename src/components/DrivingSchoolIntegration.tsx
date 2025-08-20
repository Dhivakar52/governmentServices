import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { 
  Plus, 
  Edit, 
  X, 
  Building2, 
  MapPin,
  Upload,
  FileText,
  BarChart3,
  CheckCircle,
  
  Eye,
  Ban,
  AlertTriangle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from './ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from './ui/dialog';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';

interface Institution {
  id: string;
  name: string;
  type: 'School' | 'Test Center';
  region: string;
  address: string;
  status: 'Active' | 'Suspended' | 'Pending' | 'Revoked';
  accreditationDoc: string;
  passFailRatio: {
    passed: number;
    failed: number;
    total: number;
  };
  contactPerson: string;
  phone: string;
  email: string;
  registrationDate: string;
  lastAudit: string;
}

interface DrivingSchoolIntegrationProps {
  onBack: () => void;
}

export function DrivingSchoolIntegration({ onBack }: DrivingSchoolIntegrationProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([
    {
      id: '1',
      name: 'ABC Driving School',
      type: 'School',
      region: 'District A',
      address: '123 Main Street, District A',
      status: 'Active',
      accreditationDoc: 'accreditation_abc_2024.pdf',
      passFailRatio: {
        passed: 145,
        failed: 23,
        total: 168
      },
      contactPerson: 'John Smith',
      phone: '+1-555-0123',
      email: 'admin@abcdriving.com',
      registrationDate: '2023-01-15',
      lastAudit: '2024-06-15'
    },
    {
      id: '2',
      name: 'Gov Test Center',
      type: 'Test Center',
      region: 'Zone B',
      address: '456 Government Ave, Zone B',
      status: 'Suspended',
      accreditationDoc: 'accreditation_gov_2024.pdf',
      passFailRatio: {
        passed: 89,
        failed: 45,
        total: 134
      },
      contactPerson: 'Sarah Wilson',
      phone: '+1-555-0456',
      email: 'manager@govtest.org',
      registrationDate: '2022-08-20',
      lastAudit: '2024-03-10'
    },
    {
      id: '3',
      name: 'Elite Driving Academy',
      type: 'School',
      region: 'District C',
      address: '789 Training Blvd, District C',
      status: 'Active',
      accreditationDoc: 'accreditation_elite_2024.pdf',
      passFailRatio: {
        passed: 234,
        failed: 12,
        total: 246
      },
      contactPerson: 'Mike Johnson',
      phone: '+1-555-0789',
      email: 'director@elitedriving.com',
      registrationDate: '2023-03-10',
      lastAudit: '2024-09-20'
    }
  ]);

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null);
  const [viewingInstitution, setViewingInstitution] = useState<Institution | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'School' as 'School' | 'Test Center',
    region: '',
    address: '',
    status: 'Pending' as 'Active' | 'Suspended' | 'Pending' | 'Revoked',
    accreditationDoc: '',
    contactPerson: '',
    phone: '',
    email: ''
  });

  const regions = ['District A', 'District B', 'District C', 'Zone A', 'Zone B', 'Zone C'];

  const handleAdd = () => {
    setEditingInstitution(null);
    setFormData({
      name: '',
      type: 'School',
      region: '',
      address: '',
      status: 'Pending',
      accreditationDoc: '',
      contactPerson: '',
      phone: '',
      email: ''
    });
    setIsAddEditOpen(true);
  };

  const handleEdit = (institution: Institution) => {
    setEditingInstitution(institution);
    setFormData({
      name: institution.name,
      type: institution.type,
      region: institution.region,
      address: institution.address,
      status: institution.status,
      accreditationDoc: institution.accreditationDoc,
      contactPerson: institution.contactPerson,
      phone: institution.phone,
      email: institution.email
    });
    setIsAddEditOpen(true);
  };

  const handleView = (institution: Institution) => {
    setViewingInstitution(institution);
    setIsViewOpen(true);
  };

  const handleDelete = (id: string) => {
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
  };

  const handleSave = () => {
    if (editingInstitution) {
      setInstitutions(prev => prev.map(inst => 
        inst.id === editingInstitution.id 
          ? { 
              ...inst, 
              ...formData,
              lastAudit: new Date().toISOString().split('T')[0]
            }
          : inst
      ));
    } else {
      const newInstitution: Institution = {
        id: Date.now().toString(),
        ...formData,
        passFailRatio: {
          passed: 0,
          failed: 0,
          total: 0
        },
        registrationDate: new Date().toISOString().split('T')[0],
        lastAudit: new Date().toISOString().split('T')[0]
      };
      setInstitutions(prev => [...prev, newInstitution]);
    }
    setIsAddEditOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: 'Active' | 'Suspended' | 'Revoked') => {
    setInstitutions(prev => prev.map(inst => 
      inst.id === id ? { ...inst, status: newStatus } : inst
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-orange-100 text-orange-800">Suspended</Badge>;
      case 'Pending':
        return <Badge className="bg-blue-100 text-blue-800">Pending</Badge>;
      case 'Revoked':
        return <Badge className="bg-red-100 text-red-800">Revoked</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPassRate = (ratio: Institution['passFailRatio']) => {
    if (ratio.total === 0) return '0';
    return ((ratio.passed / ratio.total) * 100).toFixed(1);
  };

  return (
    <AdminPageLayout
      title="Driving School/Test Center Integration"
      onBack={onBack}
      actionButton={{
        label: 'Approve Institution',
        onClick: handleAdd,
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="space-y-6">

        {/* Institutions Table */}
        <div className="d365-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left p-4 font-medium text-d365-text-primary">Name</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Type</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Region</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Pass Rate</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Status</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Last Audit</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {institutions.map((institution) => (
                  <tr key={institution.id} className="border-b border-d365-border hover:bg-d365-hover">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-d365-text-secondary" />
                        <div>
                          <p className="font-medium">{institution.name}</p>
                          <p className="text-caption text-d365-text-secondary">{institution.contactPerson}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={institution.type === 'School' ? 'default' : 'secondary'}>
                        {institution.type}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-d365-text-secondary" />
                        <span className="text-sm">{institution.region}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className={`text-sm font-medium ${
                          parseFloat(getPassRate(institution.passFailRatio)) >= 80 ? 'text-green-600' :
                          parseFloat(getPassRate(institution.passFailRatio)) >= 60 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {getPassRate(institution.passFailRatio)}%
                        </div>
                        <span className="text-caption text-d365-text-secondary">
                          ({institution.passFailRatio.passed}/{institution.passFailRatio.total})
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(institution.status)}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-d365-text-secondary">{institution.lastAudit}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(institution)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(institution)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(institution.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">{institutions.length}</p>
                <p className="text-caption text-d365-text-secondary">Total Institutions</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {institutions.filter(inst => inst.status === 'Active').length}
                </p>
                <p className="text-caption text-d365-text-secondary">Active</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {institutions.filter(inst => inst.status === 'Suspended').length}
                </p>
                <p className="text-caption text-d365-text-secondary">Suspended</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {(institutions.reduce((sum, inst) => sum + parseFloat(getPassRate(inst.passFailRatio)), 0) / institutions.length).toFixed(1)}%
                </p>
                <p className="text-caption text-d365-text-secondary">Avg Pass Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingInstitution ? 'Edit Institution' : 'Add New Institution'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Institution Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., ABC Driving School"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'School' | 'Test Center') => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="School">Driving School</SelectItem>
                    <SelectItem value="Test Center">Test Center</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select 
                  value={formData.region} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'Active' | 'Suspended' | 'Pending' | 'Revoked') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Revoked">Revoked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Full address including district"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accreditationDoc">Accreditation Document</Label>
              <Input
                id="accreditationDoc"
                value={formData.accreditationDoc}
                onChange={(e) => setFormData(prev => ({ ...prev, accreditationDoc: e.target.value }))}
                placeholder="Document filename or upload reference"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+1-555-0123"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="d365-button-primary">
                {editingInstitution ? 'Update Institution' : 'Add Institution'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Institution Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Institution Profile - {viewingInstitution?.name}</DialogTitle>
          </DialogHeader>
          
          {viewingInstitution && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-d365-text-primary mb-2">Basic Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Type:</span> {viewingInstitution.type}</p>
                      <p><span className="font-medium">Region:</span> {viewingInstitution.region}</p>
                      <p><span className="font-medium">Registration Date:</span> {viewingInstitution.registrationDate}</p>
                      <p><span className="font-medium">Last Audit:</span> {viewingInstitution.lastAudit}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-d365-text-primary mb-2">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Contact Person:</span> {viewingInstitution.contactPerson}</p>
                      <p><span className="font-medium">Phone:</span> {viewingInstitution.phone}</p>
                      <p><span className="font-medium">Email:</span> {viewingInstitution.email}</p>
                      <p><span className="font-medium">Address:</span> {viewingInstitution.address}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-d365-text-primary mb-2">Performance Metrics</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-title3 font-semibold text-green-600">
                          {viewingInstitution.passFailRatio.passed}
                        </p>
                        <p className="text-caption text-green-600">Passed</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-title3 font-semibold text-red-600">
                          {viewingInstitution.passFailRatio.failed}
                        </p>
                        <p className="text-caption text-red-600">Failed</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-title3 font-semibold text-blue-600">
                          {getPassRate(viewingInstitution.passFailRatio)}%
                        </p>
                        <p className="text-caption text-blue-600">Pass Rate</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-d365-text-primary mb-2">Actions</h3>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          // Handle batch upload
                          alert('Batch upload functionality would be implemented here');
                        }}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Batch Upload Results
                      </Button>
                      
                      {viewingInstitution.status === 'Active' && (
                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={() => {
                            handleStatusChange(viewingInstitution.id, 'Suspended');
                            setIsViewOpen(false);
                          }}
                        >
                          <Ban className="h-4 w-4 mr-2" />
                          Suspend Institution
                        </Button>
                      )}
                      
                      {viewingInstitution.status === 'Suspended' && (
                        <Button 
                          className="w-full d365-button-primary"
                          onClick={() => {
                            handleStatusChange(viewingInstitution.id, 'Active');
                            setIsViewOpen(false);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Reactivate Institution
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-d365-text-primary mb-2">Accreditation</h3>
                <div className="flex items-center space-x-2 p-3 bg-d365-surface-secondary rounded-lg">
                  <FileText className="h-4 w-4 text-d365-text-secondary" />
                  <span className="text-sm">{viewingInstitution.accreditationDoc}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}