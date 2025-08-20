import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Eye,
  Download,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  ArrowLeft,
  Settings,
  Bell,
  Shield,
  Plus,

  PenTool,
  Workflow,
  Database
} from 'lucide-react';
import civilityLogo from '../assets/dummy_logo.jpg';

const mockApplications = [
  {
    id: 'DL-2025-001',
    applicantName: 'John Doe',
    type: 'Driver\'s License Renewal',
    status: 'Pending Review',
    submittedDate: '2025-01-15',
    nationalId: '1234567890123',
    priority: 'Normal',
    documentsStatus: 'Complete',
    assignedOfficer: 'Sarah Johnson'
  },
  {
    id: 'VR-2025-002',
    applicantName: 'Jane Smith',
    type: 'Vehicle Registration',
    status: 'Under Review',
    submittedDate: '2025-01-14',
    nationalId: '9876543210987',
    priority: 'High',
    documentsStatus: 'Missing Medical Certificate',
    assignedOfficer: 'Mike Wilson'
  },
  {
    id: 'BC-2025-003',
    applicantName: 'David Brown',
    type: 'Birth Certificate',
    status: 'Approved',
    submittedDate: '2025-01-10',
    nationalId: '5555666677778',
    priority: 'Normal',
    documentsStatus: 'Complete',
    assignedOfficer: 'Sarah Johnson'
  },
  {
    id: 'DL-2025-004',
    applicantName: 'Mary Johnson',
    type: 'New Driver\'s License',
    status: 'Rejected',
    submittedDate: '2025-01-12',
    nationalId: '1111222233334',
    priority: 'Normal',
    documentsStatus: 'Invalid Eye Test',
    assignedOfficer: 'Tom Davis'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Approved':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
    case 'Under Review':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Under Review</Badge>;
    case 'Pending Review':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Review</Badge>;
    case 'Rejected':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case 'High':
      return <Badge variant="destructive">High</Badge>;
    case 'Normal':
      return <Badge variant="secondary">Normal</Badge>;
    case 'Low':
      return <Badge variant="outline">Low</Badge>;
    default:
      return <Badge variant="secondary">{priority}</Badge>;
  }
};

interface OfficerDashboardProps {
  onNavigateToSubmenu?: (submenu: string) => void;
  currentSubmenu?: string;
  onBack?: () => void;
}

type SubModuleInfo = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function OfficerDashboard({ onNavigateToSubmenu, currentSubmenu, onBack }: OfficerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [_selectedApplication, _setSelectedApplication] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<string>('');
  const [_selectedDocument, _setSelectedDocument] = useState<any>(null);

  // Define sub-modules for officer portal
  const applicationProcessingModules: SubModuleInfo[] = [
    { id: 'application-verification', title: 'Application Verification Screen', description: 'Interface to verify submitted citizen applications and attached documents', icon: CheckCircle },
    { id: 'document-review', title: 'Document Review Interface', description: 'Full-width document viewer with annotation tools and validation', icon: FileText },
    { id: 'approval-workflow', title: 'Approval / Rejection Workflow', description: 'List of pending applications with inline decision options', icon: Settings }
  ];

  const managementModules: SubModuleInfo[] = [
    { id: 'appointment-scheduling', title: 'Appointment Scheduling Panel', description: 'Calendar layout with slot management grid', icon: Calendar },
    { id: 'license-issuance', title: 'License / Certificate Issuance', description: 'Generate and download documents for approved applications', icon: Download },
    { id: 'notification-manager', title: 'Notification Manager', description: 'Manage past messages and create new notifications', icon: Bell }
  ];

  const reportingModules: SubModuleInfo[] = [
    { id: 'audit-trail', title: 'Audit Trail Viewer', description: 'Timestamp-based action tracking with export functionality', icon: Shield },
    { id: 'reports-panel', title: 'Reports Panel', description: 'Report generation with scheduling capabilities', icon: BarChart3 },
    { id: 'data-export', title: 'Data Export Interface', description: 'Service-based data export with field selection', icon: Database }
  ];

  const systemModules: SubModuleInfo[] = [
    { id: 'form-builder', title: 'Form Builder & Workflow Editor', description: 'Visual drag-and-drop workflow design interface', icon: Workflow }
  ];

  const handleSubModuleClick = (submenuId: string) => {
    if (onNavigateToSubmenu) {
      onNavigateToSubmenu(submenuId);
    }
  };

  const openDialog = (dialogType: string) => {
    setCurrentDialog(dialogType);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.nationalId.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalApplications: mockApplications.length,
    pendingReview: mockApplications.filter(app => app.status === 'Pending Review').length,
    underReview: mockApplications.filter(app => app.status === 'Under Review').length,
    approved: mockApplications.filter(app => app.status === 'Approved').length,
    rejected: mockApplications.filter(app => app.status === 'Rejected').length
  };

  // Sub-module list component
  const SubModuleList = ({ modules, moduleColor }: { modules: SubModuleInfo[], moduleColor: string }) => (
    <div className="space-y-2 mt-4">
      {modules.map((module) => {
        const IconComponent = module.icon;
        return (
          <div
            key={module.id}
            className="flex items-center justify-between p-3 rounded-lg border border-d365-border bg-d365-surface hover:bg-d365-surface-secondary cursor-pointer transition-all duration-200 hover:shadow-sm"
            onClick={() => handleSubModuleClick(module.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${moduleColor}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-body font-medium text-d365-text-primary">{module.title}</h4>
                <p className="text-caption text-d365-text-secondary">{module.description}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-d365-text-secondary" />
          </div>
        );
      })}
    </div>
  );

  // Get submenu details for individual screen rendering
  const getSubmenuDetails = (submenuId: string) => {
    const allSubModules = [
      ...applicationProcessingModules,
      ...managementModules,
      ...reportingModules,
      ...systemModules
    ];
    
    return allSubModules.find(module => module.id === submenuId);
  };

  // Back button component for sub-module views
  const BackButton = ({ title }: { title: string }) => (
    <div className="d365-page-header">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="d365-button-secondary btn-with-icon"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h1 className="d365-page-title">{title}</h1>
          <p className="d365-page-subtitle">
            Manage this officer portal feature and its associated processes
          </p>
        </div>
      </div>
    </div>
  );

  // Determine if we're showing a submenu or the main view
  const isSubmenuView = currentSubmenu && currentSubmenu !== 'officer-dashboard';
  const submenuId = isSubmenuView ? currentSubmenu.replace('officer-', '') : null;

  // Render individual submenu content
  const renderSubmenuContent = (submenuId: string) => {
    const submenuDetails = getSubmenuDetails(submenuId);
    if (!submenuDetails) return null;

    const IconComponent = submenuDetails.icon;

    if (submenuId === 'application-verification') {
      return (
        <div className="space-y-6">
          <BackButton title={submenuDetails.title} />
          
          {/* Application Verification Table */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle>Application Verification Queue</CardTitle>
              <CardDescription>Review submitted citizen applications and attached documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Application ID</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Citizen Name</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Documents</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">APP-00123</td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">John Doe</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" onClick={() => openDialog('view-docs')}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => openDialog('verify-app')}>
                          Verify ➤
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">APP-00124</td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Jane Smith</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Clarified</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" onClick={() => openDialog('view-docs')}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => openDialog('verify-app')}>
                          Re-Verify ➤
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (submenuId === 'document-review') {
      return (
        <div className="space-y-6">
          <BackButton title={submenuDetails.title} />
          
          {/* Document Review Interface */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle>Document Review Interface</CardTitle>
              <CardDescription>Full-width document viewer with annotation tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Doc Type</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">File</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Comments</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">ID Proof</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" onClick={() => openDialog('view-pdf')}>
                          <FileText className="w-4 h-4 mr-1" />
                          View PDF
                        </Button>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Clarification</Badge>
                      </td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Signature mismatch</td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => openDialog('annotate')}>
                          <PenTool className="w-4 h-4 mr-1" />
                          Annotate ➤
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">Insurance Doc</td>
                      <td className="py-4 px-4">
                        <Button variant="ghost" size="sm" onClick={() => openDialog('view-image')}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Image
                        </Button>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Valid</Badge>
                      </td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Verified</td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Mark Complete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (submenuId === 'approval-workflow') {
      return (
        <div className="space-y-6">
          <BackButton title={submenuDetails.title} />
          
          {/* Approval/Rejection Workflow */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle>Approval / Rejection Workflow</CardTitle>
              <CardDescription>List of pending applications with inline decision options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Application ID</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Submitted By</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Reason Required?</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">APP-34521</td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Alice P.</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Review</Badge>
                      </td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Yes</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => openDialog('approve')}>
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => openDialog('reject')}>
                            Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (submenuId === 'appointment-scheduling') {
      return (
        <div className="space-y-6">
          <BackButton title={submenuDetails.title} />
          
          {/* Appointment Scheduling Panel */}
          <Card className="d365-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointment Scheduling Panel</CardTitle>
                <CardDescription>Calendar layout with slot management grid</CardDescription>
              </div>
              <Button onClick={() => openDialog('create-slot')} className="d365-button-primary btn-with-icon">
                <Plus className="w-4 h-4" />
                Create Slot
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Calendar tabs */}
                <Tabs defaultValue="daily" className="w-full">
                  <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="daily" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-d365-border">
                            <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Date</th>
                            <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Time</th>
                            <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Center</th>
                            <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Officer</th>
                            <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                            <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                            <td className="py-4 px-4 text-body text-d365-text-primary">2025-08-10</td>
                            <td className="py-4 px-4 text-body text-d365-text-primary">10:00 AM</td>
                            <td className="py-4 px-4 text-body text-d365-text-primary">Center A</td>
                            <td className="py-4 px-4 text-body text-d365-text-primary">Officer Raj</td>
                            <td className="py-4 px-4">
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
                            </td>
                            <td className="py-4 px-4 text-center">
                              <Button variant="outline" size="sm" onClick={() => openDialog('assign-slot')}>
                                Assign ➤
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (submenuId === 'license-issuance') {
      return (
        <div className="space-y-6">
          <BackButton title={submenuDetails.title} />
          
          {/* License/Certificate Issuance */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle>License / Certificate Issuance</CardTitle>
              <CardDescription>Generate and download documents for approved applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">App ID</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Name</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Doc Type</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4 text-body text-d365-text-primary">LIC-7788</td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Sunil Kumar</td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">Driving License</td>
                      <td className="py-4 px-4">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ready</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => openDialog('generate-pdf')}>
                            Generate PDF
                          </Button>
                          <Button size="sm" variant="outline">
                            Preview
                          </Button>
                          <Button size="sm" variant="outline">
                            Push to Email
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // Default submenu content for other modules
    return (
      <div className="space-y-6">
        <BackButton title={submenuDetails.title} />
        <Card className="d365-card">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-8 h-8 text-d365-text-secondary" />
              </div>
              <h3 className="text-title2 font-semibold text-d365-text-primary mb-2">
                {submenuDetails.title}
              </h3>
              <p className="text-body text-d365-text-secondary mb-6">
                {submenuDetails.description}
              </p>
              <Button
                onClick={() => openDialog('configure')}
                className="d365-button-primary btn-with-icon"
              >
                <Settings className="w-4 h-4" />
                Configure Feature
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  // Main view showing existing dashboard + new modules
  const renderMainView = () => (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="d365-page-header">
        <div className="flex items-center space-x-4">
          <img 
            src={civilityLogo} 
            alt="Civility" 
            className="h-12 w-auto object-contain"
          />
          <div>
            <h1 className="d365-page-title">Officer Dashboard</h1>
            <p className="d365-page-subtitle">Officer: Sarah Johnson | Transport Department</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="d365-button d365-button-secondary btn-with-icon">
            <Download className="w-4 h-4" />
            <span className="text-body font-medium">Export Report</span>
          </Button>
          <Button className="d365-button d365-button-secondary btn-with-icon">
            <Calendar className="w-4 h-4" />
            <span className="text-body font-medium">Schedule</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Applications</p>
                <p className="text-2xl font-bold">{stats.totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Pending Review</p>
                <p className="text-2xl font-bold">{stats.pendingReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Under Review</p>
                <p className="text-2xl font-bold">{stats.underReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Officer Portal Modules */}
      <div className="space-y-8">
        {/* Application Processing Module */}
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-title2 font-semibold text-d365-text-primary">Application Processing</h2>
                <p className="text-body text-d365-text-secondary">Verify applications, review documents, and manage approval workflows</p>
              </div>
            </div>
            <SubModuleList modules={applicationProcessingModules} moduleColor="bg-blue-50 text-blue-600" />
          </CardContent>
        </Card>

        {/* Management Module */}
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-title2 font-semibold text-d365-text-primary">Management & Services</h2>
                <p className="text-body text-d365-text-secondary">Schedule appointments, issue licenses, and manage notifications</p>
              </div>
            </div>
            <SubModuleList modules={managementModules} moduleColor="bg-green-50 text-green-600" />
          </CardContent>
        </Card>

        {/* Reporting Module */}
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-title2 font-semibold text-d365-text-primary">Reporting & Analytics</h2>
                <p className="text-body text-d365-text-secondary">Track audit trails, generate reports, and export data</p>
              </div>
            </div>
            <SubModuleList modules={reportingModules} moduleColor="bg-purple-50 text-purple-600" />
          </CardContent>
        </Card>

        {/* System Configuration Module */}
        <Card className="d365-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Workflow className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-title2 font-semibold text-d365-text-primary">System Configuration</h2>
                <p className="text-body text-d365-text-secondary">Build forms and design workflows with visual tools</p>
              </div>
            </div>
            <SubModuleList modules={systemModules} moduleColor="bg-orange-50 text-orange-600" />
          </CardContent>
        </Card>
      </div>

      {/* Legacy Application Management */}
      <Tabs defaultValue="applications" className="w-full">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="verification">Document Verification</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, ID, or National ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select 
                className="border rounded-md px-3 py-2 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <Card>
            <CardHeader>
              <CardTitle>Application Queue</CardTitle>
              <CardDescription>Manage and review submitted applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-8 bg-blue-500 rounded"></div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{app.applicantName}</p>
                          {getPriorityBadge(app.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{app.type}</p>
                        <p className="text-xs text-muted-foreground">ID: {app.id} | National ID: {app.nationalId}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Documents</p>
                      <p className={`text-xs ${app.documentsStatus === 'Complete' ? 'text-green-600' : 'text-red-600'}`}>
                        {app.documentsStatus}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Assigned Officer</p>
                      <p className="text-xs text-muted-foreground">{app.assignedOfficer}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Submitted</p>
                      <p className="text-xs text-muted-foreground">{app.submittedDate}</p>
                    </div>
                    <div className="text-center">
                      {getStatusBadge(app.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Verification Center</CardTitle>
              <CardDescription>Review and verify submitted documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Pending Verification</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">John Doe - DL-2025-001</span>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Documents: Photo, Signature, Medical Certificate</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Docs
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Jane Smith - VR-2025-002</span>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Missing Docs</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Missing: Medical Certificate</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Request Docs
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Verification Guidelines</h4>
                  <Card className="bg-blue-50">
                    <CardContent className="p-4">
                      <h5 className="font-medium mb-2">Document Verification Checklist</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Photo: Clear, recent, passport-style</li>
                        <li>• Signature: Matches application signature</li>
                        <li>• Medical Certificate: Valid, from registered center</li>
                        <li>• Eye Test: Current within 6 months</li>
                        <li>• Birth Certificate: Original or certified copy</li>
                        <li>• Proof of Residence: Recent utility bill</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail &amp; Process Feedback</CardTitle>
              <CardDescription>Track all actions and system changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Application DL-2025-001 Approved</p>
                      <p className="text-sm text-muted-foreground">By Sarah Johnson • Today, 2:30 PM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Document verification started for VR-2025-002</p>
                      <p className="text-sm text-muted-foreground">By Mike Wilson • Today, 1:15 PM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Application DL-2025-004 Rejected</p>
                      <p className="text-sm text-muted-foreground">By Tom Davis • Yesterday, 4:45 PM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Additional documents requested for BC-2025-003</p>
                      <p className="text-sm text-muted-foreground">By Sarah Johnson • Yesterday, 2:20 PM</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Applications Processed This Week</span>
                    <span className="font-bold">24</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Processing Time</span>
                    <span className="font-bold">3.2 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Approval Rate</span>
                    <span className="font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-bold text-blue-600">4.6/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Weekly Performance</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-bold text-green-600">+12%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Processing Speed</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-bold text-green-600">+8%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Error Rate</span>
                    <div className="flex items-center space-x-1">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="font-bold text-green-600">-15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-d365-background">
      {!isSubmenuView && renderMainView()}
      
      {isSubmenuView && submenuId && renderSubmenuContent(submenuId)}

      {/* Generic Dialog for Actions */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'verify-app' && 'Application Verification'}
              {currentDialog === 'approve' && 'Approve Application'}
              {currentDialog === 'reject' && 'Reject Application'}
              {currentDialog === 'view-docs' && 'View Documents'}
              {currentDialog === 'annotate' && 'Annotate Document'}
              {currentDialog === 'create-slot' && 'Create Appointment Slot'}
              {currentDialog === 'assign-slot' && 'Assign Appointment Slot'}
              {currentDialog === 'generate-pdf' && 'Generate Document'}
              {!currentDialog && 'Officer Action'}
            </DialogTitle>
            <DialogDescription>
              {currentDialog === 'verify-app' && 'Side-by-side view of application form data and uploaded documents'}
              {currentDialog === 'approve' && 'Provide approval details and comments'}
              {currentDialog === 'reject' && 'Provide rejection reason (mandatory)'}
              {currentDialog === 'view-docs' && 'View all submitted documents for this application'}
              {currentDialog === 'annotate' && 'Add annotations and comments to the document'}
              {currentDialog === 'create-slot' && 'Create a new appointment slot'}
              {currentDialog === 'assign-slot' && 'Assign this slot to a citizen'}
              {currentDialog === 'generate-pdf' && 'Generate the official document'}
              {!currentDialog && 'Configure the selected officer portal feature'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {currentDialog === 'verify-app' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Application Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>ID:</strong> APP-00123</div>
                    <div><strong>Name:</strong> John Doe</div>
                    <div><strong>Type:</strong> Driver's License Renewal</div>
                    <div><strong>Status:</strong> Pending Review</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Uploaded Documents</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>Photo ID</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <span>Medical Certificate</span>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(currentDialog === 'approve' || currentDialog === 'reject') && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reason">Reason {currentDialog === 'reject' ? '(Required)' : '(Optional)'}</Label>
                  <Textarea 
                    id="reason" 
                    placeholder={currentDialog === 'reject' ? 'Please provide a reason for rejection...' : 'Add any comments...'}
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify" />
                  <Label htmlFor="notify">Send notification to applicant</Label>
                </div>
              </div>
            )}

            {currentDialog === 'create-slot' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="center">Center</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center-a">Center A</SelectItem>
                      <SelectItem value="center-b">Center B</SelectItem>
                      <SelectItem value="center-c">Center C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="officer">Assigned Officer</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select officer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="officer-raj">Officer Raj</SelectItem>
                      <SelectItem value="officer-priya">Officer Priya</SelectItem>
                      <SelectItem value="officer-kumar">Officer Kumar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button onClick={closeDialog} className="d365-button-primary">
                {currentDialog === 'approve' && 'Approve Application'}
                {currentDialog === 'reject' && 'Reject Application'}
                {currentDialog === 'create-slot' && 'Create Slot'}
                {currentDialog === 'generate-pdf' && 'Generate PDF'}
                {!['approve', 'reject', 'create-slot', 'generate-pdf'].includes(currentDialog) && 'Confirm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}