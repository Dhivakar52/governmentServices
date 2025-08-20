import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { 
  Plus, 
  Edit, 
  X, 
  User, 
  MapPin,
  Workflow,
  Users,
  BarChart3,
  Eye
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
  DialogTrigger 
} from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';

interface OfficerRole {
  id: string;
  roleName: string;
  licenseTypes: string[];
  zonesAssigned: string[];
  workflowStage: string;
  substituteOfficer?: string;
  performanceMetrics: {
    processed: number;
    approved: number;
    rejected: number;
    avgProcessingTime: string;
  };
}

interface OfficerRoleMappingProps {
  onBack: () => void;
}

export function OfficerRoleMapping({ onBack }: OfficerRoleMappingProps) {
  const [officerRoles, setOfficerRoles] = useState<OfficerRole[]>([
    {
      id: '1',
      roleName: 'Verifier',
      licenseTypes: ['All'],
      zonesAssigned: ['District A', 'District B'],
      workflowStage: 'Document Check',
      substituteOfficer: 'John Smith',
      performanceMetrics: {
        processed: 245,
        approved: 210,
        rejected: 35,
        avgProcessingTime: '2.5 hours'
      }
    },
    {
      id: '2',
      roleName: 'Approver',
      licenseTypes: ['Commercial'],
      zonesAssigned: ['HQ Only'],
      workflowStage: 'Final Approval',
      performanceMetrics: {
        processed: 89,
        approved: 82,
        rejected: 7,
        avgProcessingTime: '1.2 hours'
      }
    },
    {
      id: '3',
      roleName: 'Test Examiner',
      licenseTypes: ['Learner', 'Full'],
      zonesAssigned: ['Zone A', 'Zone B', 'Zone C'],
      workflowStage: 'Practical Test',
      substituteOfficer: 'Sarah Wilson',
      performanceMetrics: {
        processed: 156,
        approved: 132,
        rejected: 24,
        avgProcessingTime: '3.1 hours'
      }
    }
  ]);

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<OfficerRole | null>(null);
  const [showMetrics, setShowMetrics] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    roleName: '',
    licenseTypes: [] as string[],
    zonesAssigned: [] as string[],
    workflowStage: '',
    substituteOfficer: ''
  });

  const licenseTypes = ['All', 'Learner', 'Full', 'Commercial', 'Heavy Vehicle', 'Motorcycle'];
  const zones = ['District A', 'District B', 'District C', 'Zone A', 'Zone B', 'Zone C', 'HQ Only'];
  const workflowStages = [
    'Document Check',
    'Initial Review',
    'Verification',
    'Practical Test',
    'Final Approval',
    'License Issuance'
  ];
  const officers = ['John Smith', 'Sarah Wilson', 'Mike Johnson', 'Emily Davis', 'Robert Brown'];

  const handleAdd = () => {
    setEditingRole(null);
    setFormData({
      roleName: '',
      licenseTypes: [],
      zonesAssigned: [],
      workflowStage: '',
      substituteOfficer: ''
    });
    setIsAddEditOpen(true);
  };

  const handleEdit = (role: OfficerRole) => {
    setEditingRole(role);
    setFormData({
      roleName: role.roleName,
      licenseTypes: role.licenseTypes,
      zonesAssigned: role.zonesAssigned,
      workflowStage: role.workflowStage,
      substituteOfficer: role.substituteOfficer || ''
    });
    setIsAddEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setOfficerRoles(prev => prev.filter(role => role.id !== id));
  };

  const handleSave = () => {
    if (editingRole) {
      setOfficerRoles(prev => prev.map(role => 
        role.id === editingRole.id 
          ? { ...role, ...formData }
          : role
      ));
    } else {
      const newRole: OfficerRole = {
        id: Date.now().toString(),
        ...formData,
        performanceMetrics: {
          processed: 0,
          approved: 0,
          rejected: 0,
          avgProcessingTime: '0 hours'
        }
      };
      setOfficerRoles(prev => [...prev, newRole]);
    }
    setIsAddEditOpen(false);
  };

  const handleLicenseTypeChange = (type: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      licenseTypes: checked 
        ? [...prev.licenseTypes, type]
        : prev.licenseTypes.filter(t => t !== type)
    }));
  };

  const handleZoneChange = (zone: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      zonesAssigned: checked 
        ? [...prev.zonesAssigned, zone]
        : prev.zonesAssigned.filter(z => z !== zone)
    }));
  };

  return (
    <AdminPageLayout
      title="Officer Role Mapping"
      onBack={onBack}
      actionButton={{
        label: 'Add Role',
        onClick: handleAdd,
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="space-y-6">

        {/* Roles Table */}
        <div className="d365-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left p-4 font-medium text-d365-text-primary">Officer Role</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">License Types</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Zones Assigned</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Workflow Stage</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Performance</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {officerRoles.map((role) => (
                  <React.Fragment key={role.id}>
                    <tr className="border-b border-d365-border hover:bg-d365-hover">
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-d365-text-secondary" />
                          <div>
                            <p className="font-medium">{role.roleName}</p>
                            {role.substituteOfficer && (
                              <p className="text-caption text-d365-text-secondary">
                                Substitute: {role.substituteOfficer}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {role.licenseTypes.map(type => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {role.zonesAssigned.map(zone => (
                            <Badge key={zone} variant="outline" className="text-xs">
                              <MapPin className="h-3 w-3 mr-1" />
                              {zone}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Workflow className="h-4 w-4 text-d365-text-secondary" />
                          <span className="text-sm">{role.workflowStage}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-sm">
                            <span className="font-medium">{role.performanceMetrics.processed}</span>
                            <span className="text-d365-text-secondary"> processed</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowMetrics(showMetrics === role.id ? null : role.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(role)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(role.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {/* Performance Metrics Row */}
                    {showMetrics === role.id && (
                      <tr className="border-b border-d365-border bg-d365-surface-secondary">
                        <td colSpan={6} className="p-4">
                          <div className="grid grid-cols-4 gap-4">
                            <div className="text-center">
                              <p className="text-title3 font-semibold text-green-600">
                                {role.performanceMetrics.approved}
                              </p>
                              <p className="text-caption text-d365-text-secondary">Approved</p>
                            </div>
                            <div className="text-center">
                              <p className="text-title3 font-semibold text-red-600">
                                {role.performanceMetrics.rejected}
                              </p>
                              <p className="text-caption text-d365-text-secondary">Rejected</p>
                            </div>
                            <div className="text-center">
                              <p className="text-title3 font-semibold text-blue-600">
                                {Math.round((role.performanceMetrics.approved / role.performanceMetrics.processed) * 100)}%
                              </p>
                              <p className="text-caption text-d365-text-secondary">Approval Rate</p>
                            </div>
                            <div className="text-center">
                              <p className="text-title3 font-semibold text-orange-600">
                                {role.performanceMetrics.avgProcessingTime}
                              </p>
                              <p className="text-caption text-d365-text-secondary">Avg Time</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">{officerRoles.length}</p>
                <p className="text-caption text-d365-text-secondary">Total Roles</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {officerRoles.reduce((sum, role) => sum + role.performanceMetrics.processed, 0)}
                </p>
                <p className="text-caption text-d365-text-secondary">Total Processed</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Workflow className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {new Set(officerRoles.map(r => r.workflowStage)).size}
                </p>
                <p className="text-caption text-d365-text-secondary">Workflow Stages</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {new Set(officerRoles.flatMap(r => r.zonesAssigned)).size}
                </p>
                <p className="text-caption text-d365-text-secondary">Covered Zones</p>
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
              {editingRole ? 'Edit Officer Role' : 'Add New Officer Role'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input
                id="roleName"
                value={formData.roleName}
                onChange={(e) => setFormData(prev => ({ ...prev, roleName: e.target.value }))}
                placeholder="e.g., Verifier, Approver, Test Examiner"
              />
            </div>
            
            <div className="space-y-2">
              <Label>License Types Covered</Label>
              <div className="grid grid-cols-3 gap-2">
                {licenseTypes.map(type => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.licenseTypes.includes(type)}
                      onCheckedChange={(checked) => handleLicenseTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={type} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Zones/Districts Assigned</Label>
              <div className="grid grid-cols-2 gap-2">
                {zones.map(zone => (
                  <div key={zone} className="flex items-center space-x-2">
                    <Checkbox
                      id={zone}
                      checked={formData.zonesAssigned.includes(zone)}
                      onCheckedChange={(checked) => handleZoneChange(zone, checked as boolean)}
                    />
                    <Label htmlFor={zone} className="text-sm">{zone}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workflowStage">Assigned Workflow Stage</Label>
                <Select 
                  value={formData.workflowStage} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, workflowStage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select workflow stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {workflowStages.map(stage => (
                      <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="substituteOfficer">Substitute Officer (Optional)</Label>
                <Select 
                  value={formData.substituteOfficer} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, substituteOfficer: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select substitute officer" />
                  </SelectTrigger>
                  <SelectContent>
                    {officers.map(officer => (
                      <SelectItem key={officer} value={officer}>{officer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="d365-button-primary">
                {editingRole ? 'Update Role' : 'Add Role'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}