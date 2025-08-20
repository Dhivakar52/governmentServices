import  { useState } from 'react';
import { 
  Download, 
  FileText, 
  Eye, 
  Mail, 
  QrCode,
  Shield,

  Search,

  Printer
} from 'lucide-react';

interface Document {
  id: string;
  type: string;
  applicationId: string;
  applicantName: string;
  issueDate: string;
  status: 'issued' | 'processing' | 'expired';
  validUntil?: string;
  downloadCount: number;
  hasQrCode: boolean;
  isDigitallySigned: boolean;
}

export function DownloadDocuments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock document data
  const documents: Document[] = [
    {
      id: 'DL-2024-001234',
      type: 'Driver\'s License',
      applicationId: 'DL-2024-001234',
      applicantName: 'John Doe',
      issueDate: '2024-01-15',
      status: 'issued',
      validUntil: '2029-01-15',
      downloadCount: 3,
      hasQrCode: true,
      isDigitallySigned: true
    },
    {
      id: 'BC-2024-001234',
      type: 'Birth Certificate',
      applicationId: 'BC-2024-001234',
      applicantName: 'Baby Nakamya',
      issueDate: '2024-01-12',
      status: 'issued',
      downloadCount: 1,
      hasQrCode: true,
      isDigitallySigned: true
    },
    {
      id: 'DL-2023-005678',
      type: 'Driver\'s License',
      applicationId: 'DL-2023-005678',
      applicantName: 'John Doe',
      issueDate: '2019-01-15',
      status: 'expired',
      validUntil: '2024-01-15',
      downloadCount: 12,
      hasQrCode: false,
      isDigitallySigned: false
    }
  ];

  const documentTypes = [
    { value: 'all', label: 'All Documents' },
    { value: 'drivers-license', label: 'Driver\'s License' },
    { value: 'birth-certificate', label: 'Birth Certificate' },
    { value: 'death-certificate', label: 'Death Certificate' },
    { value: 'marriage-certificate', label: 'Marriage Certificate' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'issued':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'expired':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         doc.type.toLowerCase().replace(/\s+/g, '-').includes(filterType.replace('all', ''));
    
    return matchesSearch && matchesFilter;
  });

  const handleDownload = (document: Document) => {
    // Simulate download
    console.log(`Downloading ${document.type} for ${document.applicantName}`);
    // In real implementation, this would trigger a PDF download
  };

  const handleEmail = (document: Document) => {
    // Simulate email sending
    console.log(`Emailing ${document.type} to registered email`);
  };

  const renderDocumentCard = (document: Document) => (
    <div key={document.id} className="bg-white rounded-lg border border-d365-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-d365-primary-light bg-opacity-10 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-d365-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-d365-text-primary">{document.type}</h3>
            <p className="text-caption text-d365-text-secondary">{document.applicationId}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded border text-caption font-medium ${getStatusColor(document.status)}`}>
          {document.status.toUpperCase()}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-caption">
          <span className="text-d365-text-secondary">Applicant:</span>
          <span className="font-medium">{document.applicantName}</span>
        </div>
        <div className="flex justify-between text-caption">
          <span className="text-d365-text-secondary">Issue Date:</span>
          <span>{new Date(document.issueDate).toLocaleDateString()}</span>
        </div>
        {document.validUntil && (
          <div className="flex justify-between text-caption">
            <span className="text-d365-text-secondary">Valid Until:</span>
            <span>{new Date(document.validUntil).toLocaleDateString()}</span>
          </div>
        )}
        <div className="flex justify-between text-caption">
          <span className="text-d365-text-secondary">Downloads:</span>
          <span>{document.downloadCount}</span>
        </div>
      </div>

      {/* Security Features */}
      <div className="flex items-center gap-4 mb-4 text-caption text-d365-text-secondary">
        {document.hasQrCode && (
          <div className="flex items-center gap-1">
            <QrCode className="w-3 h-3" />
            <span>QR Code</span>
          </div>
        )}
        {document.isDigitallySigned && (
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Digital Signature</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            className="d365-button-primary flex items-center justify-center gap-2 text-caption"
            onClick={() => handleDownload(document)}
            disabled={document.status === 'processing'}
          >
            <Download className="w-3 h-3" />
            Download PDF
          </button>
          <button className="d365-button-secondary flex items-center justify-center gap-2 text-caption">
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className="d365-button-secondary flex items-center justify-center gap-2 text-caption"
            onClick={() => handleEmail(document)}
            disabled={document.status === 'processing'}
          >
            <Mail className="w-3 h-3" />
            Email
          </button>
          <button className="d365-button-secondary flex items-center justify-center gap-2 text-caption">
            <Printer className="w-3 h-3" />
            Print
          </button>
        </div>
      </div>
    </div>
  );

  const renderDocumentList = (document: Document) => (
    <div key={document.id} className="bg-white rounded-lg border border-d365-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-d365-primary-light bg-opacity-10 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-d365-primary" />
          </div>
          <div>
            <h3 className="font-medium text-d365-text-primary">{document.type}</h3>
            <p className="text-caption text-d365-text-secondary">{document.applicationId} • {document.applicantName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-caption text-d365-text-secondary">Issued</div>
            <div className="text-caption">{new Date(document.issueDate).toLocaleDateString()}</div>
          </div>
          
          <div className={`px-2 py-1 rounded border text-caption font-medium ${getStatusColor(document.status)}`}>
            {document.status.toUpperCase()}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="d365-button-primary p-2"
              onClick={() => handleDownload(document)}
              disabled={document.status === 'processing'}
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            <button className="d365-button-secondary p-2" title="Preview">
              <Eye className="w-4 h-4" />
            </button>
            <button 
              className="d365-button-secondary p-2" 
              onClick={() => handleEmail(document)}
              title="Email Document"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Download Documents</h1>
          <p className="d365-page-subtitle">Access and download your issued certificates and licenses</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="d365-input pl-10"
                placeholder="Search by document type, application ID, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-d365-text-secondary" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              className="d365-input min-w-48"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>

            <div className="flex border border-d365-border rounded">
              <button
                className={`px-3 py-2 text-caption ${viewMode === 'grid' ? 'bg-d365-primary text-white' : 'text-d365-text-secondary'}`}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
              <button
                className={`px-3 py-2 text-caption ${viewMode === 'list' ? 'bg-d365-primary text-white' : 'text-d365-text-secondary'}`}
                onClick={() => setViewMode('list')}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Display */}
      {filteredDocuments.length === 0 ? (
        <div className="bg-white rounded-lg border border-d365-border p-12 text-center">
          <FileText className="w-12 h-12 text-d365-text-secondary mx-auto mb-4" />
          <h3 className="font-medium text-d365-text-primary mb-2">No Documents Found</h3>
          <p className="text-body text-d365-text-secondary">
            {searchQuery || filterType !== 'all' 
              ? 'No documents match your search criteria. Try adjusting your filters.'
              : 'You don\'t have any issued documents yet. Documents will appear here once your applications are approved.'
            }
          </p>
        </div>
      ) : (
        <div>
          {viewMode === 'grid' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map(renderDocumentCard)}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDocuments.map(renderDocumentList)}
            </div>
          )}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <div className="font-medium text-blue-800 mb-1">Security Notice</div>
            <p className="text-body text-blue-700">
              All documents are digitally signed and include QR codes for verification. 
              Do not share your documents with unauthorized parties. For verification, 
              use the QR code or contact the issuing office directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}