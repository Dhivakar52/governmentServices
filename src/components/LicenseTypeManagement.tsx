import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2,
  Car,
  Calendar,
  MapPin,
  FileText,
  Users
} from 'lucide-react';

interface LicenseTypeManagementProps {
  onBack: () => void;
}

interface LicenseType {
  id: string;
  name: string;
  category: 'personal' | 'commercial' | 'special';
  minAge: number;
  maxAge?: number;
  validityPeriod: number;
  validityUnit: 'months' | 'years';
  renewalCycle: number;
  renewalUnit: 'months' | 'years';
  testRequired: boolean;
  testTypes: string[];
  regionsAllowed: string[];
  prerequisites: string[];
  status: 'active' | 'inactive' | 'draft';
  createdDate: string;
  applicationsCount: number;
}

export function LicenseTypeManagement({ onBack }: LicenseTypeManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLicenseType, setSelectedLicenseType] = useState<LicenseType | null>(null);
  const [isAddLicenseOpen, setIsAddLicenseOpen] = useState(false);
  const [isEditLicenseOpen, setIsEditLicenseOpen] = useState(false);

  // Mock license types data
  const licenseTypes: LicenseType[] = [
    {
      id: '1',
      name: 'Learner\'s Permit',
      category: 'personal',
      minAge: 18,
      validityPeriod: 6,
      validityUnit: 'months',
      renewalCycle: 6,
      renewalUnit: 'months',
      testRequired: true,
      testTypes: ['Written Theory', 'Vision Test'],
      regionsAllowed: ['All Regions'],
      prerequisites: ['Valid National ID', 'Medical Certificate'],
      status: 'active',
      createdDate: '2024-06-15',
      applicationsCount: 1247
    },
    {
      id: '2',
      name: 'Regular Driver\'s License',
      category: 'personal',
      minAge: 18,
      validityPeriod: 3,
      validityUnit: 'years',
      renewalCycle: 3,
      renewalUnit: 'years',
      testRequired: true,
      testTypes: ['Written Theory', 'Practical Driving', 'Vision Test'],
      regionsAllowed: ['All Regions'],
      prerequisites: ['Valid Learner\'s Permit', 'Medical Certificate', 'Driving School Certificate'],
      status: 'active',
      createdDate: '2024-06-15',
      applicationsCount: 3892
    },
    {
      id: '3',
      name: 'Commercial Driver\'s License',
      category: 'commercial',
      minAge: 21,
      maxAge: 65,
      validityPeriod: 3,
      validityUnit: 'years',
      renewalCycle: 3,
      renewalUnit: 'years',
      testRequired: true,
      testTypes: ['Written Theory', 'Practical Driving', 'Medical Examination', 'Background Check'],
      regionsAllowed: ['State Zones Only'],
      prerequisites: ['Regular Driver\'s License (2+ years)', 'Commercial Driving Course', 'Clean Driving Record'],
      status: 'active',
      createdDate: '2024-07-20',
      applicationsCount: 456
    },
    {
      id: '4',
      name: 'Motorcycle License',
      category: 'personal',
      minAge: 18,
      validityPeriod: 5,
      validityUnit: 'years',
      renewalCycle: 5,
      renewalUnit: 'years',
      testRequired: true,
      testTypes: ['Written Theory', 'Practical Riding', 'Vision Test'],
      regionsAllowed: ['All Regions'],
      prerequisites: ['Valid National ID', 'Medical Certificate', 'Motorcycle Safety Course'],
      status: 'active',
      createdDate: '2024-08-10',
      applicationsCount: 789
    },
    {
      id: '5',
      name: 'International Driving Permit',
      category: 'special',
      minAge: 18,
      validityPeriod: 1,
      validityUnit: 'years',
      renewalCycle: 1,
      renewalUnit: 'years',
      testRequired: false,
      testTypes: [],
      regionsAllowed: ['All Regions'],
      prerequisites: ['Valid Regular Driver\'s License', 'Passport', 'Travel Documents'],
      status: 'active',
      createdDate: '2024-09-05',
      applicationsCount: 234
    },
    {
      id: '6',
      name: 'Heavy Vehicle License',
      category: 'commercial',
      minAge: 25,
      maxAge: 60,
      validityPeriod: 2,
      validityUnit: 'years',
      renewalCycle: 2,
      renewalUnit: 'years',
      testRequired: true,
      testTypes: ['Written Theory', 'Practical Driving', 'Medical Examination', 'Hazmat Certification'],
      regionsAllowed: ['Industrial Zones Only'],
      prerequisites: ['Commercial Driver\'s License (3+ years)', 'Heavy Vehicle Training', 'Safety Certification'],
      status: 'draft',
      createdDate: '2024-12-01',
      applicationsCount: 0
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'special', label: 'Special' }
  ];

  const availableRegions = [
    'All Regions',
    'State Zones Only',
    'Industrial Zones Only',
    'Urban Areas Only',
    'Rural Areas Only',
    'Northern Region',
    'Southern Region',
    'Eastern Region',
    'Western Region',
    'Central Region'
  ];

  const availableTestTypes = [
    'Written Theory',
    'Practical Driving',
    'Practical Riding',
    'Vision Test',
    'Medical Examination',
    'Background Check',
    'Hazmat Certification',
    'Safety Assessment'
  ];

  const validityUnits = [
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success">Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error">Inactive</Badge>;
      case 'draft':
        return <Badge className="d365-badge-warning">Draft</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'personal':
        return <Car className="h-4 w-4" />;
      case 'commercial':
        return <Users className="h-4 w-4" />;
      case 'special':
        return <FileText className="h-4 w-4" />;
      default:
        return <Car className="h-4 w-4" />;
    }
  };

  const filteredLicenseTypes = licenseTypes.filter(license => {
    const matchesSearch = license.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || license.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderLicenseForm = (license?: LicenseType) => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="licenseName">License Type Name</Label>
          <Input 
            id="licenseName" 
            placeholder="e.g., Regular Driver's License"
            defaultValue={license?.name}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select defaultValue={license?.category}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="special">Special</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minAge">Minimum Age</Label>
          <Input 
            id="minAge" 
            type="number"
            min="16"
            max="70"
            placeholder="18"
            defaultValue={license?.minAge}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxAge">Maximum Age (Optional)</Label>
          <Input 
            id="maxAge" 
            type="number"
            min="18"
            max="80"
            placeholder="No limit"
            defaultValue={license?.maxAge}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={license?.status || 'draft'}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Validity Period</Label>
          <div className="flex space-x-2">
            <Input 
              type="number"
              min="1"
              max="10"
              placeholder="3"
              defaultValue={license?.validityPeriod}
              className="flex-1"
            />
            <Select defaultValue={license?.validityUnit || 'years'}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validityUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Renewal Cycle</Label>
          <div className="flex space-x-2">
            <Input 
              type="number"
              min="1"
              max="10"
              placeholder="3"
              defaultValue={license?.renewalCycle}
              className="flex-1"
            />
            <Select defaultValue={license?.renewalUnit || 'years'}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {validityUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Label>Test Requirements</Label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-3">
          {availableTestTypes.map((testType) => (
            <div key={testType} className="flex items-center space-x-2">
              <Checkbox 
                id={testType}
                defaultChecked={license?.testTypes.includes(testType)}
              />
              <Label htmlFor={testType} className="text-caption">
                {testType}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Regions Allowed</Label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-3">
          {availableRegions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox 
                id={region}
                defaultChecked={license?.regionsAllowed.includes(region)}
              />
              <Label htmlFor={region} className="text-caption">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="prerequisites">Prerequisites (one per line)</Label>
        <textarea
          id="prerequisites"
          className="w-full p-3 border border-d365-border rounded-md min-h-[100px] font-segoe text-body"
          placeholder="Valid National ID&#10;Medical Certificate&#10;Previous license requirement"
          defaultValue={license?.prerequisites.join('\n')}
        />
      </div>
    </div>
  );

  return (
    <AdminPageLayout
      title="License Type Management"
      onBack={onBack}
      actionButton={{
        label: 'Add License Type',
        onClick: () => setIsAddLicenseOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search license types..."
      onSearch={setSearchQuery}
      filters={[
        {
          id: 'category',
          placeholder: 'Filter by Category',
          options: categories,
          onSelect: setSelectedCategory
        }
      ]}
    >
      <Card className="d365-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>License Types ({filteredLicenseTypes.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>License Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Eligibility (Age)</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Region Availability</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLicenseTypes.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-lg bg-d365-surface-secondary flex items-center justify-center">
                        {getCategoryIcon(license.category)}
                      </div>
                      <div>
                        <p className="font-medium">{license.name}</p>
                        <p className="text-caption text-d365-secondary">
                          Created: {license.createdDate}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {license.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-d365-secondary" />
                      <span>
                        {license.minAge}+
                        {license.maxAge && ` - ${license.maxAge}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-d365-secondary" />
                      <span>
                        {license.validityPeriod} {license.validityUnit}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {license.regionsAllowed.slice(0, 2).map((region, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-d365-secondary" />
                          <span className="text-caption">{region}</span>
                        </div>
                      ))}
                      {license.regionsAllowed.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{license.regionsAllowed.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(license.status)}</TableCell>
                  <TableCell>
                    <span className="font-medium">{license.applicationsCount.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedLicenseType(license);
                          setIsEditLicenseOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive"
                        disabled={license.applicationsCount > 0}
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

      {/* Add License Type Dialog */}
      <Dialog open={isAddLicenseOpen} onOpenChange={setIsAddLicenseOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New License Type</DialogTitle>
            <DialogDescription>
              Configure a new license type with eligibility rules and requirements.
            </DialogDescription>
          </DialogHeader>
          {renderLicenseForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLicenseOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddLicenseOpen(false)}>Add License Type</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit License Type Dialog */}
      <Dialog open={isEditLicenseOpen} onOpenChange={setIsEditLicenseOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit License Type</DialogTitle>
            <DialogDescription>
              Update license type configuration and requirements.
            </DialogDescription>
          </DialogHeader>
          {renderLicenseForm(selectedLicenseType || undefined)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLicenseOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditLicenseOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}