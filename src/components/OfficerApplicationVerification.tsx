import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  Eye,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Settings,
  FileText,
  User,
  Calendar
} from 'lucide-react';

const mockApplications = [
  {
    id: 'APP-00123',
    citizenName: 'John Doe',
    nationalId: '1234567890123',
    status: 'Pending',
    submittedDate: '2025-01-15',
    applicationType: "Driver's License",
    documents: ['ID Copy', 'Medical Certificate', 'Photo'],
    assignedOfficer: 'Sarah Johnson'
  },
  {
    id: 'APP-00124',
    citizenName: 'Jane Smith',
    nationalId: '9876543210987',
    status: 'Clarified',
    submittedDate: '2025-01-14',
    applicationType: 'Birth Certificate',
    documents: ['Birth Record', 'Parent ID', 'Hospital Certificate'],
    assignedOfficer: 'Mike Wilson'
  },
  {
    id: 'APP-00125',
    citizenName: 'Robert Johnson',
    nationalId: '5555666677778',
    status: 'Under Review',
    submittedDate: '2025-01-16',
    applicationType: 'Marriage Certificate',
    documents: ['Marriage Record', 'Witness IDs', 'Photos'],
    assignedOfficer: 'Sarah Johnson'
  }
];

export function OfficerApplicationVerification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const openDialog = (dialogType: string, application?: any) => {
    setCurrentDialog(dialogType);
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
    setSelectedApplication(null);
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.citizenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.nationalId.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
      case 'Clarified':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Clarified</Badge>;
      case 'Under Review':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Under Review</Badge>;
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Application Verification Screen</h1>
          <p className="d365-page-subtitle">
            Interface to verify submitted citizen applications and attached documents
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            Configure Settings
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card className="d365-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-d365-text-secondary" />
              <Input
                placeholder="Search by application ID, citizen name, or national ID..."
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
                <option value="Pending">Pending</option>
                <option value="Clarified">Clarified</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Verification Table */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Application Verification Queue</CardTitle>
          <CardDescription>Review submitted citizen applications and attached documents with side-by-side verification interface</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Application ID</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Citizen Name</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Submitted</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Documents</th>
                  <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b border-d365-border hover:bg-d365-surface-secondary transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-d365-text-primary">{app.id}</div>
                      <div className="text-caption text-d365-text-secondary">ID: {app.nationalId}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-d365-primary text-white flex items-center justify-center text-caption">
                          {app.citizenName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-d365-text-primary">{app.citizenName}</div>
                          <div className="text-caption text-d365-text-secondary">Officer: {app.assignedOfficer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body text-d365-text-primary">{app.applicationType}</td>
                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-caption text-d365-text-secondary">
                        <Calendar className="w-3 h-3" />
                        {app.submittedDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => openDialog('view-docs', app)}
                        className="btn-with-icon"
                      >
                        <Eye className="w-4 h-4" />
                        View ({app.documents.length})
                      </Button>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => openDialog('verify-app', app)}
                        className="btn-with-icon"
                      >
                        {app.status === 'Clarified' ? 'Re-Verify ➤' : 'Verify ➤'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-d365-text-secondary" />
              </div>
              <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">No applications found</h3>
              <p className="text-body text-d365-text-secondary">
                {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No applications available for verification at this time.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Verification Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'verify-app' && `Application Verification - ${selectedApplication?.id}`}
              {currentDialog === 'view-docs' && `Documents - ${selectedApplication?.id}`}
            </DialogTitle>
            <DialogDescription>
              {currentDialog === 'verify-app' && 'Side-by-side view of application form data and uploaded documents'}
              {currentDialog === 'view-docs' && 'View all submitted documents for this application'}
            </DialogDescription>
          </DialogHeader>
          
          {currentDialog === 'verify-app' && selectedApplication && (
            <div className="space-y-6">
              {/* Two-pane layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Pane: Application Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-d365-primary" />
                    <h3 className="font-semibold text-d365-text-primary">Application Information</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">Application ID</Label>
                        <div className="text-body text-d365-text-primary mt-1">{selectedApplication.id}</div>
                      </div>
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">Citizen Name</Label>
                        <div className="text-body text-d365-text-primary mt-1">{selectedApplication.citizenName}</div>
                      </div>
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">National ID</Label>
                        <div className="text-body text-d365-text-primary mt-1">{selectedApplication.nationalId}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">Application Type</Label>
                        <div className="text-body text-d365-text-primary mt-1">{selectedApplication.applicationType}</div>
                      </div>
                      <div>
                        <Label className="text-caption font-medium text-d365-text-secondary">Submitted Date</Label>
                        <div className="text-body text-d365-text-primary mt-1">{selectedApplication.submittedDate}</div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-caption font-medium text-d365-text-secondary">Assigned Officer</Label>
                      <div className="text-body text-d365-text-primary mt-1">{selectedApplication.assignedOfficer}</div>
                    </div>
                  </div>
                </div>

                {/* Right Pane: Documents */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-d365-primary" />
                    <h3 className="font-semibold text-d365-text-primary">Uploaded Documents</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {selectedApplication.documents.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-d365-border rounded-lg bg-d365-surface">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-d365-text-secondary" />
                          <span className="text-body text-d365-text-primary">{doc}</span>
                        </div>
                        <Button size="sm" variant="outline" className="btn-with-icon">
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Panel */}
              <div className="border-t border-d365-border pt-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="verification-notes">Verification Notes</Label>
                    <Textarea 
                      id="verification-notes" 
                      placeholder="Add any comments or notes about the verification process..."
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify-citizen" />
                    <Label htmlFor="notify-citizen">Send notification to citizen about verification status</Label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button 
                  variant="outline" 
                  className="btn-with-icon"
                  onClick={() => {
                    // Handle request clarification
                    closeDialog();
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Request Clarification
                </Button>
                <Button 
                  variant="destructive"
                  className="btn-with-icon"
                  onClick={() => {
                    // Handle rejection
                    closeDialog();
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </Button>
                <Button 
                  className="d365-button-primary btn-with-icon"
                  onClick={() => {
                    // Handle approval
                    closeDialog();
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </Button>
              </div>
            </div>
          )}

          {currentDialog === 'view-docs' && selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedApplication.documents.map((doc: string, index: number) => (
                  <div key={index} className="border border-d365-border rounded-lg p-4 bg-d365-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-d365-primary-light rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-d365-text-primary">{doc}</h4>
                        <p className="text-caption text-d365-text-secondary">PDF Document</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={closeDialog}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}