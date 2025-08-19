import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Textarea } from '../../ui/textarea';
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  ArrowLeft,
  Plus,
  Download,
  Building,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface BusinessLicensingProps {
  onBack: () => void;
}

export function BusinessLicensing({ onBack }: BusinessLicensingProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [applicationForm, setApplicationForm] = useState({
    businessName: '',
    businessType: '',
    address: '',
    description: '',
    expectedEmployees: '',
    estimatedRevenue: ''
  });

  // Mock business licensing data
  const activeLicenses = [
    {
      id: 'BL-2024-001',
      businessName: 'Springfield Consulting LLC',
      licenseType: 'Professional Services',
      issuedDate: '2024-01-15',
      expirationDate: '2025-01-15',
      status: 'Active',
      fee: 250,
      renewalFee: 200
    },
    {
      id: 'BL-2023-045',
      businessName: 'Tech Solutions Inc',
      licenseType: 'Technology Services',
      issuedDate: '2023-06-10',
      expirationDate: '2024-06-10',
      status: 'Expired',
      fee: 300,
      renewalFee: 250
    }
  ];

  const licenseApplications = [
    {
      id: 'APP-2025-012',
      businessName: 'Green Energy Solutions',
      licenseType: 'Environmental Services',
      submittedDate: '2025-01-10',
      status: 'Under Review',
      estimatedCompletion: '2025-02-15',
      fee: 450
    },
    {
      id: 'APP-2025-003',
      businessName: 'Downtown Cafe',
      licenseType: 'Food Service',
      submittedDate: '2024-12-20',
      status: 'Approved',
      estimatedCompletion: '2025-01-20',
      fee: 350
    }
  ];

  const licenseTypes = [
    {
      type: 'Professional Services',
      description: 'Consulting, legal, accounting, and other professional services',
      fee: 250,
      processingTime: '7-14 business days',
      requirements: ['Business registration', 'Professional liability insurance', 'Background check']
    },
    {
      type: 'Food Service',
      description: 'Restaurants, cafes, food trucks, and catering services',
      fee: 350,
      processingTime: '14-21 business days',
      requirements: ['Health department approval', 'Food safety certification', 'Zoning compliance']
    },
    {
      type: 'Retail',
      description: 'Retail stores, shops, and commercial sales',
      fee: 200,
      processingTime: '5-10 business days',
      requirements: ['Business registration', 'Sales tax permit', 'Zoning compliance']
    },
    {
      type: 'Technology Services',
      description: 'IT services, software development, and technology consulting',
      fee: 300,
      processingTime: '7-14 business days',
      requirements: ['Business registration', 'Professional liability insurance', 'Data protection compliance']
    }
  ];

  const renewalReminders = [
    {
      businessName: 'Springfield Consulting LLC',
      licenseType: 'Professional Services',
      expirationDate: '2025-01-15',
      daysUntilExpiry: 2,
      renewalFee: 200
    }
  ];

  const totalActiveLicenses = activeLicenses.filter(license => license.status === 'Active').length;
  const totalAnnualFees = activeLicenses.reduce((sum, license) => sum + license.renewalFee, 0);

  return (
    <div className="h-full flex flex-col bg-[var(--microsoft-gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--microsoft-gray-200)] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              BACK TO SERVICES
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">BUSINESS LICENSING</h1>
                <p className="text-sm text-[var(--microsoft-gray-700)]">Manage business licenses and permits</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="microsoft-badge-success">
              {totalActiveLicenses} ACTIVE
            </Badge>
            <Button className="microsoft-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              NEW APPLICATION
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Active Licenses</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">{totalActiveLicenses}</p>
                  <p className="text-xs text-blue-600">Current</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Annual Fees</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">${totalAnnualFees}</p>
                  <p className="text-xs text-green-600">Renewal Cost</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Pending Applications</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">
                    {licenseApplications.filter(app => app.status === 'Under Review').length}
                  </p>
                  <p className="text-xs text-orange-600">In Review</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Expiring Soon</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">{renewalReminders.length}</p>
                  <p className="text-xs text-red-600">Action Needed</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="licenses">MY LICENSES</TabsTrigger>
              <TabsTrigger value="applications">APPLICATIONS</TabsTrigger>
              <TabsTrigger value="apply">NEW APPLICATION</TabsTrigger>
              <TabsTrigger value="types">LICENSE TYPES</TabsTrigger>
              <TabsTrigger value="renewals">RENEWALS</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Active Licenses Summary */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">ACTIVE BUSINESS LICENSES</h3>
                    </div>
                    <div className="space-y-4">
                      {activeLicenses.filter(license => license.status === 'Active').map((license, index) => (
                        <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-purple-100 p-2 rounded-lg">
                                <Briefcase className="h-5 w-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--microsoft-gray-900)]">{license.businessName}</p>
                                <p className="text-sm text-[var(--microsoft-gray-700)]">{license.licenseType}</p>
                              </div>
                            </div>
                            <Badge className="microsoft-badge-success">
                              {license.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">License ID</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">{license.id}</p>
                            </div>
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">Expires</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">{new Date(license.expirationDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">Renewal Fee</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">${license.renewalFee}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Recent Applications */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">RECENT APPLICATIONS</h3>
                    </div>
                    <div className="space-y-3">
                      {licenseApplications.slice(0, 2).map((application, index) => (
                        <div key={index} className="p-4 bg-[var(--microsoft-gray-100)] rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">{application.businessName}</p>
                              <p className="text-sm text-[var(--microsoft-gray-700)]">{application.licenseType}</p>
                            </div>
                            <Badge className={
                              application.status === 'Approved' ? 'microsoft-badge-success' :
                              application.status === 'Under Review' ? 'microsoft-badge-warning' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {application.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <p className="text-[var(--microsoft-gray-700)]">Submitted: {application.submittedDate}</p>
                            <p className="text-[var(--microsoft-gray-700)]">Est. Completion: {application.estimatedCompletion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Renewal Reminders */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">RENEWAL REMINDERS</h3>
                    </div>
                    <div className="space-y-3">
                      {renewalReminders.map((reminder, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <p className="font-medium text-red-900">{reminder.businessName}</p>
                          </div>
                          <p className="text-sm text-red-700 mb-1">{reminder.licenseType}</p>
                          <p className="text-sm text-red-700 mb-2">
                            Expires in {reminder.daysUntilExpiry} days
                          </p>
                          <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                            RENEW NOW - ${reminder.renewalFee}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">QUICK ACTIONS</h3>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Apply for New License
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Inspection
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        View Requirements
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificates
                      </Button>
                    </div>
                  </Card>

                  {/* Support Contact */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">LICENSING SUPPORT</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-[var(--microsoft-blue)]" />
                        <span className="text-sm">(555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-[var(--microsoft-blue)]" />
                        <span className="text-sm">licensing@city.gov</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-[var(--microsoft-blue)]" />
                        <span className="text-sm">Mon-Fri 8AM-5PM</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="licenses" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">MY BUSINESS LICENSES</h3>
                <Button className="microsoft-button-primary">
                  <Download className="h-4 w-4 mr-2" />
                  EXPORT ALL
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>BUSINESS NAME</TableHead>
                      <TableHead>LICENSE TYPE</TableHead>
                      <TableHead>LICENSE ID</TableHead>
                      <TableHead>ISSUED DATE</TableHead>
                      <TableHead>EXPIRATION DATE</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLicenses.map((license, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{license.businessName}</TableCell>
                        <TableCell>{license.licenseType}</TableCell>
                        <TableCell className="font-mono text-sm">{license.id}</TableCell>
                        <TableCell>{new Date(license.issuedDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(license.expirationDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={
                            license.status === 'Active' ? 'microsoft-badge-success' :
                            license.status === 'Expired' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {license.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              CERTIFICATE
                            </Button>
                            {license.status === 'Active' && (
                              <Button variant="outline" size="sm">
                                RENEW
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">LICENSE APPLICATIONS</h3>
                <Button className="microsoft-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  NEW APPLICATION
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>APPLICATION ID</TableHead>
                      <TableHead>BUSINESS NAME</TableHead>
                      <TableHead>LICENSE TYPE</TableHead>
                      <TableHead>SUBMITTED DATE</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>EST. COMPLETION</TableHead>
                      <TableHead>FEE</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {licenseApplications.map((application, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono text-sm">{application.id}</TableCell>
                        <TableCell className="font-medium">{application.businessName}</TableCell>
                        <TableCell>{application.licenseType}</TableCell>
                        <TableCell>{application.submittedDate}</TableCell>
                        <TableCell>
                          <Badge className={
                            application.status === 'Approved' ? 'microsoft-badge-success' :
                            application.status === 'Under Review' ? 'microsoft-badge-warning' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {application.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{application.estimatedCompletion}</TableCell>
                        <TableCell>${application.fee}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              VIEW DETAILS
                            </Button>
                            {application.status === 'Under Review' && (
                              <Button variant="outline" size="sm">
                                TRACK
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="apply" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">NEW BUSINESS LICENSE APPLICATION</h3>
              
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h4 className="font-semibold text-[var(--microsoft-gray-900)]">BUSINESS INFORMATION</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>BUSINESS NAME *</Label>
                      <Input 
                        value={applicationForm.businessName}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Enter your business name"
                        className="microsoft-form-input"
                      />
                    </div>
                    <div>
                      <Label>BUSINESS TYPE *</Label>
                      <select 
                        value={applicationForm.businessType}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, businessType: e.target.value }))}
                        className="microsoft-form-input"
                      >
                        <option value="">Select business type</option>
                        <option value="professional">Professional Services</option>
                        <option value="food">Food Service</option>
                        <option value="retail">Retail</option>
                        <option value="technology">Technology Services</option>
                      </select>
                    </div>
                    <div>
                      <Label>BUSINESS ADDRESS *</Label>
                      <Input 
                        value={applicationForm.address}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter business address"
                        className="microsoft-form-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>EXPECTED NUMBER OF EMPLOYEES</Label>
                      <Input 
                        type="number"
                        value={applicationForm.expectedEmployees}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, expectedEmployees: e.target.value }))}
                        placeholder="Number of employees"
                        className="microsoft-form-input"
                      />
                    </div>
                    <div>
                      <Label>ESTIMATED ANNUAL REVENUE</Label>
                      <Input 
                        type="number"
                        value={applicationForm.estimatedRevenue}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, estimatedRevenue: e.target.value }))}
                        placeholder="Estimated revenue"
                        className="microsoft-form-input"
                      />
                    </div>
                    <div>
                      <Label>BUSINESS DESCRIPTION *</Label>
                      <Textarea 
                        value={applicationForm.description}
                        onChange={(e) => setApplicationForm(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe your business activities"
                        rows={3}
                        className="microsoft-form-input"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <Button className="microsoft-button-primary">
                    <FileText className="h-4 w-4 mr-2" />
                    SUBMIT APPLICATION
                  </Button>
                  <Button variant="outline">
                    SAVE DRAFT
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="types" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">AVAILABLE LICENSE TYPES</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {licenseTypes.map((licenseType, index) => (
                  <Card key={index} className="microsoft-card">
                    <div className="microsoft-card-header">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-[var(--microsoft-gray-900)]">{licenseType.type}</h4>
                        <Badge className="microsoft-badge-primary">
                          ${licenseType.fee}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm text-[var(--microsoft-gray-700)]">{licenseType.description}</p>
                      <div>
                        <Label className="text-xs text-[var(--microsoft-gray-700)]">PROCESSING TIME</Label>
                        <p className="text-sm text-[var(--microsoft-gray-900)]">{licenseType.processingTime}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-[var(--microsoft-gray-700)]">REQUIREMENTS</Label>
                        <ul className="text-sm text-[var(--microsoft-gray-900)] list-disc list-inside space-y-1">
                          {licenseType.requirements.map((req, reqIndex) => (
                            <li key={reqIndex}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <Button className="w-full microsoft-button-primary">
                        APPLY FOR THIS LICENSE
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="renewals" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">LICENSE RENEWALS</h3>
              
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h4 className="font-semibold text-[var(--microsoft-gray-900)]">RENEWAL SCHEDULE</h4>
                </div>
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>BUSINESS NAME</TableHead>
                      <TableHead>LICENSE TYPE</TableHead>
                      <TableHead>EXPIRATION DATE</TableHead>
                      <TableHead>DAYS UNTIL EXPIRY</TableHead>
                      <TableHead>RENEWAL FEE</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeLicenses.filter(license => license.status === 'Active').map((license, index) => {
                      const expiryDate = new Date(license.expirationDate);
                      const today = new Date();
                      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{license.businessName}</TableCell>
                          <TableCell>{license.licenseType}</TableCell>
                          <TableCell>{expiryDate.toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge className={daysUntilExpiry <= 30 ? 'bg-red-100 text-red-800' : 'microsoft-badge-success'}>
                              {daysUntilExpiry} days
                            </Badge>
                          </TableCell>
                          <TableCell>${license.renewalFee}</TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              className={daysUntilExpiry <= 30 ? 'bg-red-600 hover:bg-red-700 text-white' : 'microsoft-button-primary'}
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              RENEW
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}