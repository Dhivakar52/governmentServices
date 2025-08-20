import  { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  FileText,
  Eye,
  PenTool,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Download,
  Settings,
  Highlighter,
  MessageSquare
} from 'lucide-react';

const mockDocuments = [
  {
    id: 'DOC-001',
    applicationId: 'APP-00123',
    docType: 'ID Proof',
    fileName: 'national_id.pdf',
    fileType: 'PDF',
    status: 'Needs Clarification',
    comments: 'Signature mismatch detected',
    uploadedDate: '2025-01-15',
    reviewedBy: 'Sarah Johnson',
    annotations: 3
  },
  {
    id: 'DOC-002',
    applicationId: 'APP-00123',
    docType: 'Insurance Document',
    fileName: 'insurance_certificate.jpg',
    fileType: 'Image',
    status: 'Valid',
    comments: 'Document verified successfully',
    uploadedDate: '2025-01-15',
    reviewedBy: 'Sarah Johnson',
    annotations: 0
  },
  {
    id: 'DOC-003',
    applicationId: 'APP-00124',
    docType: 'Medical Certificate',
    fileName: 'medical_report.pdf',
    fileType: 'PDF',
    status: 'Under Review',
    comments: 'Awaiting doctor verification',
    uploadedDate: '2025-01-14',
    reviewedBy: 'Mike Wilson',
    annotations: 1
  },
  {
    id: 'DOC-004',
    applicationId: 'APP-00125',
    docType: 'Birth Certificate',
    fileName: 'birth_cert.pdf',
    fileType: 'PDF',
    status: 'Invalid',
    comments: 'Document appears to be altered',
    uploadedDate: '2025-01-16',
    reviewedBy: 'Tom Davis',
    annotations: 5
  }
];

export function OfficerDocumentReview() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);

  const openDialog = (dialogType: string, document?: any) => {
    setCurrentDialog(dialogType);
    setSelectedDocument(document);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
    setSelectedDocument(null);
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.docType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Valid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Valid</Badge>;
      case 'Needs Clarification':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Clarification</Badge>;
      case 'Under Review':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Under Review</Badge>;
      case 'Invalid':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Invalid</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <FileText className="w-4 h-4 text-red-600" />;
      case 'Image':
        return <Eye className="w-4 h-4 text-blue-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Document Review Interface</h1>
          <p className="d365-page-subtitle">
            Full-width document viewer with annotation tools and validation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            Review Settings
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
                placeholder="Search by document type, application ID, or file name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter" className="text-caption">Status:</Label>
              <select 
                id="status-filter"
                className="border border-d365-border rounded-md px-3 py-2 text-sm bg-d365-surface"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="Valid">Valid</option>
                <option value="Needs Clarification">Needs Clarification</option>
                <option value="Under Review">Under Review</option>
                <option value="Invalid">Invalid</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Review Table */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Document Review Interface</CardTitle>
          <CardDescription>Review documents with annotation tools, highlight issues, and mark validation status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Doc Type</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">File</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Application</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Comments</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Annotations</th>
                  <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-d365-border hover:bg-d365-surface-secondary transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getFileIcon(doc.fileType)}
                        <span className="font-medium text-d365-text-primary">{doc.docType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => openDialog('view-document', doc)}
                          className="btn-with-icon p-0 h-auto text-d365-primary hover:text-d365-primary-light"
                        >
                          <Eye className="w-4 h-4" />
                          {doc.fileName}
                        </Button>
                      </div>
                      <div className="text-caption text-d365-text-secondary">{doc.fileType} • {doc.uploadedDate}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-d365-text-primary">{doc.applicationId}</div>
                      <div className="text-caption text-d365-text-secondary">By: {doc.reviewedBy}</div>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(doc.status)}</td>
                    <td className="py-4 px-4">
                      <div className="max-w-xs">
                        <p className="text-body text-d365-text-primary line-clamp-2">{doc.comments}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <PenTool className="w-3 h-3 text-d365-text-secondary" />
                        <span className="text-caption text-d365-text-secondary">{doc.annotations}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openDialog('annotate', doc)}
                          className="btn-with-icon"
                        >
                          <PenTool className="w-4 h-4" />
                          Annotate ➤
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-d365-text-secondary" />
              </div>
              <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">No documents found</h3>
              <p className="text-body text-d365-text-secondary">
                {searchTerm || filterStatus !== 'all' ? 'Try adjusting your search or filter criteria.' : 'No documents available for review at this time.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Review Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'view-document' && `Document Viewer - ${selectedDocument?.fileName}`}
              {currentDialog === 'annotate' && `Annotate Document - ${selectedDocument?.fileName}`}
            </DialogTitle>
            <DialogDescription>
              {currentDialog === 'view-document' && 'Full-width document viewer with review tools'}
              {currentDialog === 'annotate' && 'Add annotations, highlights, and comments to the document'}
            </DialogDescription>
          </DialogHeader>
          
          {currentDialog === 'view-document' && selectedDocument && (
            <div className="space-y-4">
              {/* Document Viewer Mock */}
              <div className="border border-d365-border rounded-lg p-6 bg-gray-50 min-h-96 flex items-center justify-center">
                <div className="text-center space-y-4">
                  {getFileIcon(selectedDocument.fileType)}
                  <div>
                    <h3 className="font-semibold text-d365-text-primary">{selectedDocument.fileName}</h3>
                    <p className="text-body text-d365-text-secondary">Document viewer would be displayed here</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" className="btn-with-icon">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" className="btn-with-icon">
                      <PenTool className="w-4 h-4" />
                      Annotate
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Document Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-body font-medium">Status:</span>
                  {getStatusBadge(selectedDocument.status)}
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="btn-with-icon"
                    onClick={() => {
                      // Mark as valid
                      closeDialog();
                    }}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Valid
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="btn-with-icon"
                    onClick={() => {
                      // Mark as invalid
                      closeDialog();
                    }}
                  >
                    <XCircle className="w-4 h-4" />
                    Mark Invalid
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="btn-with-icon"
                    onClick={() => {
                      // Needs clarification
                      closeDialog();
                    }}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Needs Clarification
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentDialog === 'annotate' && selectedDocument && (
            <div className="space-y-4">
              {/* Annotation Tools */}
              <div className="flex items-center gap-4 p-4 bg-d365-surface-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Highlighter className="w-4 h-4 text-d365-primary" />
                  <span className="text-body font-medium">Annotation Tools:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="btn-with-icon">
                    <Highlighter className="w-4 h-4" />
                    Highlight
                  </Button>
                  <Button variant="outline" size="sm" className="btn-with-icon">
                    <MessageSquare className="w-4 h-4" />
                    Comment
                  </Button>
                  <Button variant="outline" size="sm" className="btn-with-icon">
                    <PenTool className="w-4 h-4" />
                    Draw
                  </Button>
                </div>
              </div>

              {/* Document with Annotations Mock */}
              <div className="border border-d365-border rounded-lg p-6 bg-gray-50 min-h-96">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    {getFileIcon(selectedDocument.fileType)}
                  </div>
                  <h3 className="font-semibold text-d365-text-primary">{selectedDocument.fileName}</h3>
                  <p className="text-body text-d365-text-secondary">
                    Interactive document annotation interface would be displayed here
                  </p>
                  <div className="text-caption text-d365-text-secondary">
                    Click and drag to create highlights • Right-click to add comments • Use drawing tools for markup
                  </div>
                </div>
              </div>

              {/* Annotation Comments */}
              <div className="space-y-3">
                <h4 className="font-medium text-d365-text-primary">Review Comments</h4>
                <div>
                  <Label htmlFor="new-comment">Add Comment</Label>
                  <Textarea 
                    id="new-comment" 
                    placeholder="Add your review comments here..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="validation-status">Validation Status</Label>
                  <Select>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select validation status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valid">Valid</SelectItem>
                      <SelectItem value="needs-clarification">Needs Clarification</SelectItem>
                      <SelectItem value="invalid">Invalid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button 
                  className="d365-button-primary btn-with-icon"
                  onClick={() => {
                    // Save annotations
                    closeDialog();
                  }}
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Annotations
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}