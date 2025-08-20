import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import type { UserDocument } from '../../App';
import { 
  FileText, 
  Download, 
  Eye, 
  Upload, 
  Search, 
  Filter, 
  Shield,
  CheckCircle,
  X,
  AlertTriangle,
  FileCheck,
  Plus
} from 'lucide-react';

interface Document {
  id: string;
  type: string;
  dateIssued: string;
  status: 'active' | 'expired' | 'pending';
}

interface DocumentsPageProps {
  documents: UserDocument[];
}

interface DocumentDetails {
  id: string;
  type: string;
  dateIssued: string;
  status: 'active' | 'expired' | 'pending';
  issuingAuthority: string;
  documentNumber: string;
  validUntil: string;
  securityLevel: string;
  digitalSignature: string;
  fileSize: string;
  downloadCount: number;
}

export function DocumentsPage({ documents }: DocumentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDocument,_setSelectedDocument] = useState<DocumentDetails | null>(null);
  const [requestForm, setRequestForm] = useState({
    documentType: '',
    reason: '',
    urgency: 'normal'
  });
  const [verifyFile, setVerifyFile] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<'pending' | 'valid' | 'invalid' | null>(null);

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const downloadDocument = (doc: Document) => {
    const blob = new Blob([`${doc.type} - ${doc.id}\nIssued: ${doc.dateIssued}\nStatus: ${doc.status}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = `${doc.type.replace(/\s+/g, '_')}_${doc.id}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const bulkDownload = () => {
    // Create a zip-like structure simulation
    const allDocuments = filteredDocuments.map(doc => ({
      filename: `${doc.type.replace(/\s+/g, '_')}_${doc.id}.txt`,
      content: `Official Document: ${doc.type}\nDocument ID: ${doc.id}\nIssued: ${doc.dateIssued}\nStatus: ${doc.status}\nAuthority: Ministry of Digital Services\n\nThis is an official government document.`
    }));

    // Create a manifest file
    const manifest = {
      downloadDate: new Date().toISOString(),
      totalDocuments: allDocuments.length,
      documents: allDocuments.map(doc => ({ filename: doc.filename })),
      digitalSignature: 'SHA256:' + Math.random().toString(36).substring(7).toUpperCase()
    };

    const blob = new Blob([JSON.stringify({ manifest, documents: allDocuments }, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `official_documents_bulk_${new Date().toISOString().split('T')[0]}.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  // const viewDocument = (doc: Document) => {
  //   // Simulate detailed document information
  //   const details: DocumentDetails = {
  //     ...doc,
  //     issuingAuthority: 'Ministry of Digital Services',
  //     documentNumber: `DOC-${doc.id}-${Math.random().toString(36).substring(7).toUpperCase()}`,
  //     validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5).toLocaleDateString(),
  //     securityLevel: 'Government Classified',
  //     digitalSignature: `SHA256:${Math.random().toString(36).substring(7).toUpperCase()}`,
  //     fileSize: `${Math.floor(Math.random() * 500 + 100)} KB`,
  //     downloadCount: Math.floor(Math.random() * 10)
  //   };
    
  //   setSelectedDocument(details);
  //   setShowViewModal(true);
  // };

  const handleRequestSubmit = () => {
    // Simulate certificate request
    console.log('Certificate requested:', requestForm);
    setRequestForm({ documentType: '', reason: '', urgency: 'normal' });
    setShowRequestModal(false);
    
    // Show success message (in real app, this would be a toast notification)
    alert('Certificate request submitted successfully. You will be notified when it\'s ready for collection.');
  };

  const handleVerifyDocument = () => {
    if (!verifyFile) return;
    
    setVerificationResult('pending');
    
    // Simulate verification process
    setTimeout(() => {
      // 80% chance of valid document for demo
      const isValid = Math.random() > 0.2;
      setVerificationResult(isValid ? 'valid' : 'invalid');
    }, 2000);
  };

  const documentStats = [
    {
      title: 'Total Documents',
      value: documents.length.toString(),
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Documents',
      value: documents.filter(d => d.status === 'active').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Review',
      value: documents.filter(d => d.status === 'pending').length.toString(),
      icon: AlertTriangle,
      color: 'bg-yellow-500'
    },
    {
      title: 'Expired Documents',
      value: documents.filter(d => d.status === 'expired').length.toString(),
      icon: X,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--microsoft-gray-900)] mb-2">OFFICIAL DOCUMENTS</h1>
          <p className="text-[var(--microsoft-gray-700)]">
            Manage your official government documents and certificates
          </p>
        </div>
        <Button 
          onClick={() => setShowRequestModal(true)}
          className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          REQUEST CERTIFICATE
        </Button>
      </div>

      {/* Document Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--microsoft-gray-900)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--microsoft-gray-700)]">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <Card className="formal-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Card className="formal-card">
        <Table>
          <TableHeader className="bg-[var(--microsoft-gray-50)]">
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">DOCUMENT TYPE</TableHead>
              <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">DATE ISSUED</TableHead>
              <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">STATUS</TableHead>
              <TableHead className="text-right font-semibold text-[var(--microsoft-gray-900)]">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-[var(--microsoft-gray-50)]">
                <TableCell>
                  <div className="bg-[var(--microsoft-blue)]/10 p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-[var(--microsoft-blue)]" />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[var(--microsoft-gray-900)]">{doc.type}</TableCell>
                <TableCell className="text-[var(--microsoft-gray-700)]">{doc.dateIssued}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(doc.status)}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      // onClick={() => viewDocument(doc)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      VIEW
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      // onClick={() => downloadDocument(doc)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      DOWNLOAD
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredDocuments.length === 0 && (
        <Card className="formal-card p-12 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-2">No documents found</h3>
          <p className="text-[var(--microsoft-gray-700)] mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Request your first official document to get started'
            }
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <Button 
              onClick={() => setShowRequestModal(true)}
              className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              REQUEST CERTIFICATE
            </Button>
          )}
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card 
          className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setShowRequestModal(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-[var(--microsoft-gray-900)]">REQUEST CERTIFICATE</p>
              <p className="text-sm text-[var(--microsoft-gray-700)]">Apply for official documents</p>
            </div>
          </div>
        </Card>
        <Card 
          className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={bulkDownload}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 text-green-600 p-2 rounded-lg">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-[var(--microsoft-gray-900)]">BULK DOWNLOAD</p>
              <p className="text-sm text-[var(--microsoft-gray-700)]">Download all documents</p>
            </div>
          </div>
        </Card>
        <Card 
          className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => setShowVerifyModal(true)}
        >
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-[var(--microsoft-gray-900)]">VERIFY DOCUMENT</p>
              <p className="text-sm text-[var(--microsoft-gray-700)]">Check document authenticity</p>
            </div>
          </div>
        </Card>
      </div>

      {/* View Document Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              OFFICIAL DOCUMENT DETAILS
            </DialogTitle>
            <DialogDescription>
              View detailed information about your official government document.
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              {/* Document Header */}
              <div className="bg-[var(--microsoft-blue)] text-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg">{selectedDocument.type}</h3>
                <p className="text-sm text-blue-100">Document ID: {selectedDocument.documentNumber}</p>
              </div>

              {/* Document Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">ISSUING AUTHORITY</Label>
                    <p className="font-medium">{selectedDocument.issuingAuthority}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">DATE ISSUED</Label>
                    <p className="font-medium">{selectedDocument.dateIssued}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">VALID UNTIL</Label>
                    <p className="font-medium">{selectedDocument.validUntil}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">SECURITY LEVEL</Label>
                    <p className="font-medium">{selectedDocument.securityLevel}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">FILE SIZE</Label>
                    <p className="font-medium">{selectedDocument.fileSize}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">DOWNLOAD COUNT</Label>
                    <p className="font-medium">{selectedDocument.downloadCount} times</p>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div className="bg-[var(--microsoft-gray-50)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">SECURITY VERIFICATION</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Digital Signature:</span>
                    <code className="text-xs bg-white px-2 py-1 rounded">{selectedDocument.digitalSignature}</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Document verified and authentic</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => downloadDocument(selectedDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  DOWNLOAD
                </Button>
                <Button onClick={() => setShowViewModal(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Request Certificate Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              REQUEST OFFICIAL CERTIFICATE
            </DialogTitle>
            <DialogDescription>
              Submit a request for an official government certificate or document.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="documentType" className="text-[var(--microsoft-gray-900)]">
                DOCUMENT TYPE
              </Label>
              <Select 
                value={requestForm.documentType} 
                onValueChange={(value) => setRequestForm({...requestForm, documentType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                  <SelectItem value="marriage-certificate">Marriage Certificate</SelectItem>
                  <SelectItem value="police-clearance">Police Clearance Certificate</SelectItem>
                  <SelectItem value="tax-clearance">Tax Clearance Certificate</SelectItem>
                  <SelectItem value="educational-transcript">Educational Transcript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="reason" className="text-[var(--microsoft-gray-900)]">
                REASON FOR REQUEST
              </Label>
              <Textarea
                id="reason"
                value={requestForm.reason}
                onChange={(e) => setRequestForm({...requestForm, reason: e.target.value})}
                placeholder="Please specify the reason for requesting this document..."
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="urgency" className="text-[var(--microsoft-gray-900)]">
                URGENCY LEVEL
              </Label>
              <Select 
                value={requestForm.urgency} 
                onValueChange={(value) => setRequestForm({...requestForm, urgency: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal (5-7 business days)</SelectItem>
                  <SelectItem value="urgent">Urgent (2-3 business days)</SelectItem>
                  <SelectItem value="emergency">Emergency (24 hours)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> Emergency processing may incur additional fees. 
                You will be contacted for payment if applicable.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowRequestModal(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleRequestSubmit}
                disabled={!requestForm.documentType || !requestForm.reason}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                SUBMIT REQUEST
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Verify Document Modal */}
      <Dialog open={showVerifyModal} onOpenChange={setShowVerifyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              VERIFY DOCUMENT AUTHENTICITY
            </DialogTitle>
            <DialogDescription>
              Upload a document to verify its authenticity against government records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-[var(--microsoft-gray-900)]">
                UPLOAD DOCUMENT TO VERIFY
              </Label>
              <div className="border-2 border-dashed border-[var(--microsoft-gray-300)] rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">
                  Drop your document here or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setVerifyFile(file);
                      setVerificationResult(null);
                    }
                  }}
                  className="hidden"
                  id="verify-file"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="verify-file" className="cursor-pointer">
                    SELECT FILE
                  </label>
                </Button>
              </div>
              {verifyFile && (
                <p className="text-sm text-[var(--microsoft-gray-700)] mt-2">
                  Selected: {verifyFile.name}
                </p>
              )}
            </div>

            {verificationResult && (
              <div className={`p-4 rounded-lg ${
                verificationResult === 'valid' ? 'bg-green-50 border border-green-200' :
                verificationResult === 'invalid' ? 'bg-red-50 border border-red-200' :
                'bg-yellow-50 border border-yellow-200'
              }`}>
                {verificationResult === 'pending' && (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full" />
                    <span className="text-yellow-700">Verifying document...</span>
                  </div>
                )}
                {verificationResult === 'valid' && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">DOCUMENT VERIFIED</p>
                      <p className="text-sm text-green-700">This is an authentic government document.</p>
                    </div>
                  </div>
                )}
                {verificationResult === 'invalid' && (
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-semibold text-red-800">VERIFICATION FAILED</p>
                      <p className="text-sm text-red-700">This document could not be verified as authentic.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowVerifyModal(false)}>
                CLOSE
              </Button>
              <Button 
                onClick={handleVerifyDocument}
                disabled={!verifyFile || verificationResult === 'pending'}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                <FileCheck className="h-4 w-4 mr-2" />
                VERIFY DOCUMENT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}