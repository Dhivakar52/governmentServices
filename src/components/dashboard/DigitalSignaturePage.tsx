import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  PenTool, 
  Upload, 
  Download, 
  Eye, 
  Search, 
  Filter, 
  Shield,
  CheckCircle,
  Clock,
  Calendar,
  Signature,
  RefreshCw,
  Plus
} from 'lucide-react';
import type { User as OverViewUser } from '../../App';

interface DigitalSignaturePageProps {
  user: OverViewUser;
}

interface SignatureRecord {
  id: string;
  documentName: string;
  documentType: string;
  signedDate: string;
  status: 'completed' | 'pending' | 'expired';
  recipient: string;
  validUntil: string;
  signatureHash: string;
}

export function DigitalSignaturePage({ user }: DigitalSignaturePageProps) {
  const [activeTab, setActiveTab] = useState('sign');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSignModal, setShowSignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSignature, setSelectedSignature] = useState<SignatureRecord | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureType, setSignatureType] = useState('draw');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signatureForm, setSignatureForm] = useState({
    documentTitle: '',
    recipientEmail: '',
    message: '',
    validityPeriod: '1year'
  });

  // Mock signature records
  const signatureRecords: SignatureRecord[] = [
    {
      id: 'SIG-001',
      documentName: 'Property Purchase Agreement',
      documentType: 'Legal Contract',
      signedDate: '2025-01-08',
      status: 'completed',
      recipient: 'john.doe@email.com',
      validUntil: '2026-01-08',
      signatureHash: 'SHA256:A1B2C3D4E5F6'
    },
    {
      id: 'SIG-002',
      documentName: 'Employment Contract',
      documentType: 'HR Document',
      signedDate: '2025-01-07',
      status: 'completed',
      recipient: 'hr@company.com',
      validUntil: '2026-01-07',
      signatureHash: 'SHA256:F6E5D4C3B2A1'
    },
    {
      id: 'SIG-003',
      documentName: 'Tax Declaration Form',
      documentType: 'Government Form',
      signedDate: '2025-01-06',
      status: 'pending',
      recipient: 'tax@government.gov',
      validUntil: '2025-04-15',
      signatureHash: 'SHA256:123456789ABC'
    }
  ];

  const filteredSignatures = signatureRecords.filter(sig => {
    const matchesSearch = sig.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sig.documentType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sig.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const signatureStats = [
    {
      title: 'Total Signatures',
      value: signatureRecords.length.toString(),
      icon: PenTool,
      color: 'bg-blue-500'
    },
    {
      title: 'Completed',
      value: signatureRecords.filter(s => s.status === 'completed').length.toString(),
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Pending',
      value: signatureRecords.filter(s => s.status === 'pending').length.toString(),
      icon: Clock,
      color: 'bg-yellow-500'
    },
    {
      title: 'This Month',
      value: signatureRecords.filter(s => 
        new Date(s.signedDate).getMonth() === new Date().getMonth()
      ).length.toString(),
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  // Canvas drawing functions
  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSignDocument = () => {
    if (!uploadedFile && signatureType === 'draw') {
      alert('Please upload a document to sign');
      return;
    }
    
    console.log('Signing document:', {
      file: uploadedFile?.name,
      signatureType,
      form: signatureForm
    });
    
    // Simulate signing process
    alert('Document signed successfully! The signed document will be sent to all parties.');
    setShowSignModal(false);
    setUploadedFile(null);
    clearCanvas();
    setSignatureForm({
      documentTitle: '',
      recipientEmail: '',
      message: '',
      validityPeriod: '1year'
    });
  };

  const viewSignature = (signature: SignatureRecord) => {
    setSelectedSignature(signature);
    setShowViewModal(true);
  };

  const downloadSignature = (signature: SignatureRecord) => {
    // Simulate download
    const blob = new Blob([`Digital Signature Record
Document: ${signature.documentName}
Type: ${signature.documentType}
Signed: ${signature.signedDate}
Status: ${signature.status}
Hash: ${signature.signatureHash}
Signer: ${user.fullName}
Citizen ID: ${user.civId}

This is an official digital signature record.`], { type: 'text/plain' });
    
    const link = document.createElement('a');
    link.download = `signature_${signature.id}.txt`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--microsoft-gray-900)] mb-2">DIGITAL SIGNATURES</h1>
          <p className="text-[var(--microsoft-gray-700)]">
            Create and manage your official digital signatures for government documents
          </p>
        </div>
        <Button 
          onClick={() => setShowSignModal(true)}
          className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          SIGN DOCUMENT
        </Button>
      </div>

      {/* Signature Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {signatureStats.map((stat, index) => {
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sign">SIGN DOCUMENTS</TabsTrigger>
          <TabsTrigger value="history">SIGNATURE HISTORY</TabsTrigger>
          <TabsTrigger value="verify">VERIFY SIGNATURES</TabsTrigger>
        </TabsList>

        <TabsContent value="sign" className="space-y-6">
          {/* Quick Sign Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card 
              className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setShowSignModal(true)}
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <PenTool className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--microsoft-gray-900)]">SIGN NEW DOCUMENT</p>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Upload and sign a document</p>
                </div>
              </div>
            </Card>
            <Card className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--microsoft-gray-900)]">BULK SIGN</p>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Sign multiple documents</p>
                </div>
              </div>
            </Card>
            <Card className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--microsoft-gray-900)]">SIGNATURE SETTINGS</p>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Manage signature preferences</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Signature Information */}
          <Card className="formal-card p-6">
            <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              YOUR DIGITAL SIGNATURE PROFILE
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Full Name</Label>
                  <p className="font-medium text-[var(--microsoft-gray-900)]">{user.fullName}</p>
                </div>
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Citizen ID</Label>
                  <p className="font-medium text-[var(--microsoft-gray-900)]">{user.civId}</p>
                </div>
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Email Address</Label>
                  <p className="font-medium text-[var(--microsoft-gray-900)]">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Signature Status</Label>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-green-600">VERIFIED & ACTIVE</span>
                  </div>
                </div>
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Certificate Valid Until</Label>
                  <p className="font-medium text-[var(--microsoft-gray-900)]">December 31, 2025</p>
                </div>
                <div>
                  <Label className="text-[var(--microsoft-gray-500)] text-xs uppercase">Security Level</Label>
                  <Badge className="bg-green-100 text-green-800">GOVERNMENT GRADE</Badge>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Filters */}
          <Card className="formal-card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search signatures..."
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
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Signatures Table */}
          <Card className="formal-card">
            <Table>
              <TableHeader className="bg-[var(--microsoft-gray-50)]">
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">DOCUMENT NAME</TableHead>
                  <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">TYPE</TableHead>
                  <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">SIGNED DATE</TableHead>
                  <TableHead className="font-semibold text-[var(--microsoft-gray-900)]">STATUS</TableHead>
                  <TableHead className="text-right font-semibold text-[var(--microsoft-gray-900)]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSignatures.map((signature) => (
                  <TableRow key={signature.id} className="hover:bg-[var(--microsoft-gray-50)]">
                    <TableCell>
                      <div className="bg-[var(--microsoft-blue)]/10 p-2 rounded-lg w-10 h-10 flex items-center justify-center">
                        <Signature className="h-4 w-4 text-[var(--microsoft-blue)]" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-[var(--microsoft-gray-900)]">{signature.documentName}</TableCell>
                    <TableCell className="text-[var(--microsoft-gray-700)]">{signature.documentType}</TableCell>
                    <TableCell className="text-[var(--microsoft-gray-700)]">{signature.signedDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(signature.status)}>
                        {signature.status.charAt(0).toUpperCase() + signature.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewSignature(signature)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          VIEW
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadSignature(signature)}
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
        </TabsContent>

        <TabsContent value="verify" className="space-y-6">
          <Card className="formal-card p-8 text-center">
            <div className="space-y-6">
              <div>
                <Shield className="h-16 w-16 text-[var(--microsoft-blue)] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[var(--microsoft-gray-900)] mb-2">VERIFY DIGITAL SIGNATURE</h3>
                <p className="text-[var(--microsoft-gray-700)]">
                  Upload a signed document to verify its authenticity and signature validity
                </p>
              </div>
              
              <div className="border-2 border-dashed border-[var(--microsoft-gray-300)] rounded-lg p-8">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-[var(--microsoft-gray-700)] mb-4">
                  Drop a signed document here or click to browse
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  id="verify-upload"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="verify-upload" className="cursor-pointer">
                    SELECT DOCUMENT
                  </label>
                </Button>
              </div>

              <div className="bg-[var(--microsoft-gray-50)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">VERIFICATION PROCESS</h4>
                <div className="text-left space-y-2 text-sm text-[var(--microsoft-gray-700)]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Document integrity check</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Signature authenticity verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Timestamp validation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Certificate status check</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sign Document Modal */}
      <Dialog open={showSignModal} onOpenChange={setShowSignModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <PenTool className="h-5 w-5 mr-2" />
              SIGN DIGITAL DOCUMENT
            </DialogTitle>
            <DialogDescription>
              Upload a document and create your official digital signature.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Document Upload */}
            <div>
              <Label className="text-[var(--microsoft-gray-900)]">DOCUMENT TO SIGN</Label>
              <div className="border-2 border-dashed border-[var(--microsoft-gray-300)] rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">
                  Upload the document you want to sign
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="document-upload"
                />
                <Button variant="outline" asChild>
                  <label htmlFor="document-upload" className="cursor-pointer">
                    SELECT DOCUMENT
                  </label>
                </Button>
                {uploadedFile && (
                  <p className="text-sm text-[var(--microsoft-gray-700)] mt-2">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Signature Creation */}
            <div>
              <Label className="text-[var(--microsoft-gray-900)]">CREATE SIGNATURE</Label>
              <Tabs value={signatureType} onValueChange={setSignatureType} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="draw">DRAW</TabsTrigger>
                  <TabsTrigger value="type">TYPE</TabsTrigger>
                  <TabsTrigger value="upload">UPLOAD</TabsTrigger>
                </TabsList>
                
                <TabsContent value="draw" className="space-y-4">
                  <div className="border border-[var(--microsoft-gray-300)] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm">Draw your signature below:</Label>
                      <Button variant="outline" size="sm" onClick={clearCanvas}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        CLEAR
                      </Button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={200}
                      className="w-full border border-[var(--microsoft-gray-200)] rounded cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      style={{ touchAction: 'none' }}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="type" className="space-y-4">
                  <div>
                    <Label>TYPE YOUR NAME</Label>
                    <Input 
                      placeholder="Enter your full name"
                      className="text-2xl font-script"
                      style={{ fontFamily: 'cursive' }}
                    />
                    <p className="text-xs text-[var(--microsoft-gray-500)] mt-1">
                      This will be converted to a signature-style font
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-[var(--microsoft-gray-300)] rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">
                      Upload an image of your handwritten signature
                    </p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      id="signature-upload"
                    />
                    <Button variant="outline" asChild>
                      <label htmlFor="signature-upload" className="cursor-pointer">
                        SELECT IMAGE
                      </label>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Document Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>DOCUMENT TITLE</Label>
                <Input
                  value={signatureForm.documentTitle}
                  onChange={(e) => setSignatureForm(prev => ({ ...prev, documentTitle: e.target.value }))}
                  placeholder="Enter document title"
                />
              </div>
              <div>
                <Label>RECIPIENT EMAIL</Label>
                <Input
                  type="email"
                  value={signatureForm.recipientEmail}
                  onChange={(e) => setSignatureForm(prev => ({ ...prev, recipientEmail: e.target.value }))}
                  placeholder="Enter recipient email"
                />
              </div>
            </div>

            <div>
              <Label>MESSAGE (OPTIONAL)</Label>
              <Textarea
                value={signatureForm.message}
                onChange={(e) => setSignatureForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Add a message for the recipient..."
                rows={3}
              />
            </div>

            <div>
              <Label>SIGNATURE VALIDITY PERIOD</Label>
              <Select 
                value={signatureForm.validityPeriod} 
                onValueChange={(value) => setSignatureForm(prev => ({ ...prev, validityPeriod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSignModal(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleSignDocument}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                <PenTool className="h-4 w-4 mr-2" />
                SIGN DOCUMENT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Signature Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <Signature className="h-5 w-5 mr-2" />
              SIGNATURE DETAILS
            </DialogTitle>
            <DialogDescription>
              View detailed information about this digital signature.
            </DialogDescription>
          </DialogHeader>
          {selectedSignature && (
            <div className="space-y-6">
              {/* Signature Header */}
              <div className="bg-[var(--microsoft-blue)] text-white p-4 rounded-lg">
                <h3 className="font-semibold text-lg">{selectedSignature.documentName}</h3>
                <p className="text-sm text-blue-100">Signature ID: {selectedSignature.id}</p>
              </div>

              {/* Signature Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">DOCUMENT TYPE</Label>
                    <p className="font-medium">{selectedSignature.documentType}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">SIGNED DATE</Label>
                    <p className="font-medium">{selectedSignature.signedDate}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">STATUS</Label>
                    <Badge className={getStatusColor(selectedSignature.status)}>
                      {selectedSignature.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">RECIPIENT</Label>
                    <p className="font-medium">{selectedSignature.recipient}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">VALID UNTIL</Label>
                    <p className="font-medium">{selectedSignature.validUntil}</p>
                  </div>
                  <div>
                    <Label className="text-[var(--microsoft-gray-900)]">SIGNER</Label>
                    <p className="font-medium">{user.fullName}</p>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div className="bg-[var(--microsoft-gray-50)] p-4 rounded-lg">
                <h4 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">SECURITY VERIFICATION</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Signature Hash:</span>
                    <code className="text-xs bg-white px-2 py-1 rounded">{selectedSignature.signatureHash}</code>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Signature verified and authentic</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => downloadSignature(selectedSignature)}
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
    </div>
  );
}