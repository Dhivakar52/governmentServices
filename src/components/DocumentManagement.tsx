import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  FileText, 
  Upload, 
  Download, 
  Edit, 

  Copy,
  Search,
  Filter,
  Eye,
  
  Workflow,
  Layout,
} from 'lucide-react';

interface DocumentManagementProps {
  userRole: 'citizen' | 'officer' | 'admin' | null;
}

const documentTemplates = [
  {
    id: 'DL-TEMPLATE-001',
    name: 'Driver\'s License Template',
    type: 'License Document',
    status: 'Active',
    lastModified: '2025-01-10',
    version: '2.1',
    usage: 234
  },
  {
    id: 'BC-TEMPLATE-001',
    name: 'Birth Certificate Template',
    type: 'Civil Registry',
    status: 'Active',
    lastModified: '2025-01-08',
    version: '1.5',
    usage: 189
  },
  {
    id: 'VR-TEMPLATE-001',
    name: 'Vehicle Registration Template',
    type: 'Transport Document',
    status: 'Draft',
    lastModified: '2025-01-12',
    version: '1.0',
    usage: 0
  }
];

const workflows = [
  {
    id: 'WF-DL-001',
    name: 'Driver License Processing',
    steps: 5,
    averageTime: '7 days',
    status: 'Active',
    completionRate: 89
  },
  {
    id: 'WF-BC-001',
    name: 'Birth Certificate Processing',
    steps: 3,
    averageTime: '3 days',
    status: 'Active',
    completionRate: 95
  },
  {
    id: 'WF-VR-001',
    name: 'Vehicle Registration',
    steps: 6,
    averageTime: '10 days',
    status: 'Under Review',
    completionRate: 76
  }
];

const documents = [
  {
    id: 'DOC-001',
    name: 'Driver License - John Doe',
    type: 'Generated Document',
    status: 'Completed',
    created: '2025-01-15',
    size: '2.3 MB'
  },
  {
    id: 'DOC-002',
    name: 'Birth Certificate - Jane Smith',
    type: 'Generated Document',
    status: 'Pending Approval',
    created: '2025-01-14',
    size: '1.8 MB'
  },
  {
    id: 'DOC-003',
    name: 'Vehicle Registration - Mike Wilson',
    type: 'Generated Document',
    status: 'In Progress',
    created: '2025-01-13',
    size: '3.1 MB'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
    case 'Completed':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
    case 'Draft':
    case 'In Progress':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{status}</Badge>;
    case 'Under Review':
    case 'Pending Approval':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function DocumentManagement({ userRole }: DocumentManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const isAdmin = userRole === 'admin';
  const isOfficer = userRole === 'officer' || userRole === 'admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage templates, workflows, and document processing' : 'View and manage documents'}
          </p>
        </div>
        {isAdmin && (
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Template
            </Button>
            <Button>
              <Layout className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue={isAdmin ? "templates" : "documents"} className="w-full">
        <TabsList>
          {isAdmin && <TabsTrigger value="templates">Document Templates</TabsTrigger>}
          {isOfficer && <TabsTrigger value="workflows">Workflow Management</TabsTrigger>}
          <TabsTrigger value="documents">Documents</TabsTrigger>
          {isAdmin && <TabsTrigger value="settings">Settings</TabsTrigger>}
        </TabsList>

        {isAdmin && (
          <TabsContent value="templates" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {documentTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {getStatusBadge(template.status)}
                    </div>
                    <CardDescription>{template.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Version</p>
                        <p className="font-medium">v{template.version}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Usage</p>
                        <p className="font-medium">{template.usage}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-muted-foreground">Last Modified</p>
                        <p className="font-medium">{template.lastModified}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Template Editor */}
            <Card>
              <CardHeader>
                <CardTitle>Template Editor</CardTitle>
                <CardDescription>Create and modify document templates using the built-in editor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">Template Name</Label>
                      <Input id="templateName" placeholder="Enter template name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="templateType">Document Type</Label>
                      <select className="w-full border rounded-md px-3 py-2">
                        <option>Select document type</option>
                        <option>Driver's License</option>
                        <option>Birth Certificate</option>
                        <option>Vehicle Registration</option>
                        <option>Death Certificate</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Template Content</Label>
                    <div className="border rounded-lg p-4 min-h-[300px] bg-gray-50">
                      <p className="text-center text-muted-foreground">FCK Editor Interface</p>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        Rich text editor with template variables, formatting options, and document layout tools
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <Layout className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isOfficer && (
          <TabsContent value="workflows" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Process Workflows</CardTitle>
                <CardDescription>Design and manage application processing workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Workflow className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{workflow.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {workflow.steps} steps • Avg. {workflow.averageTime} • {workflow.completionRate}% completion rate
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(workflow.status)}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workflow Builder */}
            <Card>
              <CardHeader>
                <CardTitle>Workflow Builder</CardTitle>
                <CardDescription>Drag and drop workflow designer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Workflow className="mx-auto h-16 w-16 text-gray-400" />
                  <p className="text-lg font-medium text-gray-600 mt-4">Visual Workflow Designer</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Drag and drop interface for creating custom approval workflows with conditions, routing, and notifications
                  </p>
                  <Button className="mt-4">
                    <Workflow className="h-4 w-4 mr-2" />
                    Open Workflow Designer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="documents" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Documents</CardTitle>
              <CardDescription>View and manage processed documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.type} • Created {doc.created} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Document Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Settings</CardTitle>
                  <CardDescription>Configure document generation and processing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Document Format</Label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>PDF</option>
                      <option>Word Document</option>
                      <option>HTML</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Digital Signature</Label>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Enable digital signatures for all documents</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Document Retention (Days)</Label>
                    <Input type="number" defaultValue="2555" />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>

              {/* Backup Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Backup &amp; Security</CardTitle>
                  <CardDescription>Document backup and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Automatic Backup Frequency</Label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Encryption Level</Label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>AES-256</option>
                      <option>AES-128</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Access Control</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Role-based access control</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-sm">Audit trail logging</span>
                      </div>
                    </div>
                  </div>
                  <Button>Update Security Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}