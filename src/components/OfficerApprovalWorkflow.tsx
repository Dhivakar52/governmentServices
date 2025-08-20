import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Clock,
  FileText,
  Settings
} from 'lucide-react';

const mockApplications = [
  {
    id: 'APP-34521',
    submittedBy: 'Alice P.',
    fullName: 'Alice Peterson',
    applicationType: "Driver's License",
    status: 'Review',
    priority: 'Normal',
    submittedDate: '2025-01-15',
    reasonRequired: true,
    documentsComplete: true,
    assignedOfficer: 'Sarah Johnson'
  },
  {
    id: 'APP-34522',
    submittedBy: 'Robert K.',
    fullName: 'Robert Kumar',
    applicationType: 'Birth Certificate',
    status: 'Review',
    priority: 'High',
    submittedDate: '2025-01-14',
    reasonRequired: true,
    documentsComplete: false,
    assignedOfficer: 'Mike Wilson'
  },
  {
    id: 'APP-34523',
    submittedBy: 'Maria S.',
    fullName: 'Maria Santos',
    applicationType: 'Marriage Certificate',
    status: 'Pending Approval',
    priority: 'Normal',
    submittedDate: '2025-01-16',
    reasonRequired: false,
    documentsComplete: true,
    assignedOfficer: 'Tom Davis'
  },
  {
    id: 'APP-34524',
    submittedBy: 'David L.',
    fullName: 'David Lopez',
    applicationType: 'Vehicle Registration',
    status: 'Review',
    priority: 'Low',
    submittedDate: '2025-01-13',
    reasonRequired: true,
    documentsComplete: true,
    assignedOfficer: 'Sarah Johnson'
  }
];

export function OfficerApprovalWorkflow() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [reason, setReason] = useState('');

  const openDialog = (dialogType: string, application?: any) => {
    setCurrentDialog(dialogType);
    setSelectedApplication(application);
    setReason('');
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
    setSelectedApplication(null);
    setReason('');
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || app.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Review</Badge>;
      case 'Pending Approval':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending Approval</Badge>;
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'High':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'Normal':
        return <Badge variant="secondary" className="text-xs">Normal</Badge>;
      case 'Low':
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{priority}</Badge>;
    }
  };

  const handleApproval = () => {
    // Handle approval logic
    console.log('Approved application:', selectedApplication?.id, 'Reason:', reason);
    closeDialog();
  };

  const handleRejection = () => {
    // Handle rejection logic
    console.log('Rejected application:', selectedApplication?.id, 'Reason:', reason);
    closeDialog();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Approval / Rejection Workflow</h1>
          <p className="d365-page-subtitle">
            List of pending applications with inline decision options and mandatory reason fields
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            Workflow Settings
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">
                  {filteredApplications.filter(app => app.status === 'Review').length}
                </div>
                <div className="text-caption text-d365-text-secondary">Pending Review</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">
                  {filteredApplications.filter(app => app.priority === 'High').length}
                </div>
                <div className="text-caption text-d365-text-secondary">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">
                  {filteredApplications.filter(app => app.documentsComplete).length}
                </div>
                <div className="text-caption text-d365-text-secondary">Complete Docs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="d365-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-title2 font-semibold text-d365-text-primary">
                  {filteredApplications.filter(app => !app.documentsComplete).length}
                </div>
                <div className="text-caption text-d365-text-secondary">Missing Docs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Controls */}
      <Card className="d365-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-d365-text-secondary" />
              <Input
                placeholder="Search by application ID, citizen name, or type..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-d365-text-secondary" />
              <select 
                className="border border-d365-border rounded-md px-3 py-2 text-sm bg-d365-surface"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Review">Review</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <select 
                className="border border-d365-border rounded-md px-3 py-2 text-sm bg-d365-surface"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priority</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval/Rejection Workflow Table */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Application Workflow Queue</CardTitle>
          <CardDescription>Manage approval and rejection decisions with inline actions and mandatory reason capture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Application ID</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Submitted By</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Priority</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Reason Required?</th>
                  <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b border-d365-border hover:bg-d365-surface-secondary transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-d365-text-primary">{app.id}</div>
                      <div className="text-caption text-d365-text-secondary">
                        Submitted: {app.submittedDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-d365-primary text-white flex items-center justify-center text-caption">
                          {app.submittedBy.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-d365-text-primary">{app.submittedBy}</div>
                          <div className="text-caption text-d365-text-secondary">{app.fullName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-d365-text-secondary" />
                        <span className="text-body text-d365-text-primary">{app.applicationType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(app.priority)}
                        {!app.documentsComplete && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500"  />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        {app.reasonRequired ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-caption text-d365-text-secondary">
                          {app.reasonRequired ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white btn-with-icon"
                          onClick={() => openDialog('approve', app)}
                          disabled={!app.documentsComplete}
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="btn-with-icon"
                          onClick={() => openDialog('reject', app)}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-d365-text-secondary" />
              </div>
              <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">No applications found</h3>
              <p className="text-body text-d365-text-secondary">
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'No applications available for approval at this time.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approval/Rejection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'approve' && `Approve Application - ${selectedApplication?.id}`}
              {currentDialog === 'reject' && `Reject Application - ${selectedApplication?.id}`}
            </DialogTitle>
            <DialogDescription>
              {currentDialog === 'approve' && 'Provide approval details and comments for the application'}
              {currentDialog === 'reject' && 'Provide mandatory rejection reason and feedback'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedApplication && (
              <div className="bg-d365-surface-secondary p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Application:</span> {selectedApplication.id}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedApplication.applicationType}
                  </div>
                  <div>
                    <span className="font-medium">Citizen:</span> {selectedApplication.fullName}
                  </div>
                  <div>
                    <span className="font-medium">Priority:</span> {getPriorityBadge(selectedApplication.priority)}
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="reason">
                {currentDialog === 'reject' ? 'Rejection Reason (Required)' : 'Comments (Optional)'}
              </Label>
              <Textarea 
                id="reason" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  currentDialog === 'reject' 
                    ? 'Please provide a detailed reason for rejection...' 
                    : 'Add any comments or notes about the approval...'
                }
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="notify-citizen" defaultChecked />
              <Label htmlFor="notify-citizen">
                Send notification to applicant about the decision
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="log-audit" defaultChecked />
              <Label htmlFor="log-audit">
                Log this action in the audit trail
              </Label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              {currentDialog === 'approve' && (
                <Button 
                  onClick={handleApproval}
                  className="bg-green-600 hover:bg-green-700 text-white btn-with-icon"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Application
                </Button>
              )}
              {currentDialog === 'reject' && (
                <Button 
                  onClick={handleRejection}
                  variant="destructive"
                  className="btn-with-icon"
                  disabled={!reason.trim()}
                >
                  <XCircle className="w-4 h-4" />
                  Reject Application
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}