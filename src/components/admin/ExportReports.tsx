import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { Progress } from '../ui/progress';
import { 
  Download, 
  FileText, 
  Table,
  BarChart3,
  Users,
  Shield,
  Database,
  Clock,
  Calendar,
  Settings,
  Play,
  Pause,
  Eye,
  Trash2,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function ExportReports() {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showCreateReport, setShowCreateReport] = useState(false);
  const [showScheduleReport, setShowScheduleReport] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [customQuery, setCustomQuery] = useState('');
  const [exportProgress, setExportProgress] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const reportStats = [
    {
      title: 'Reports Generated',
      value: '1,247',
      icon: FileText,
      color: 'bg-blue-500',
      change: '+89',
      period: 'this month'
    },
    {
      title: 'Scheduled Reports',
      value: '23',
      icon: Calendar,
      color: 'bg-green-500',
      change: '+3',
      period: 'active schedules'
    },
    {
      title: 'Data Exported',
      value: '45.2GB',
      icon: Database,
      color: 'bg-purple-500',
      change: '+12.1GB',
      period: 'total volume'
    },
    {
      title: 'Export Queue',
      value: '7',
      icon: Clock,
      color: 'bg-orange-500',
      change: '+2',
      period: 'pending exports'
    }
  ];

  const reportTemplates = [
    {
      id: 'citizen-summary',
      name: 'Citizen Registration Summary',
      description: 'Comprehensive overview of citizen registrations, verification status, and demographics',
      category: 'citizens',
      icon: Users,
      fields: ['Registration Date', 'Citizen ID', 'Full Name', 'Status', 'Location', 'Documents Count'],
      estimatedRows: '7,834,456',
      lastGenerated: '2025-01-08 09:30',
      popular: true
    },
    {
      id: 'security-audit',
      name: 'Security Audit Report',
      description: 'Detailed security events, failed login attempts, and suspicious activities',
      category: 'security',
      icon: Shield,
      fields: ['Event Time', 'Event Type', 'User ID', 'IP Address', 'Status', 'Risk Level'],
      estimatedRows: '234,890',
      lastGenerated: '2025-01-08 14:00',
      popular: true
    },
    {
      id: 'api-usage',
      name: 'API Usage Analytics',
      description: 'API endpoint usage statistics, response times, and error rates',
      category: 'technical',
      icon: BarChart3,
      fields: ['Endpoint', 'Request Count', 'Avg Response Time', 'Success Rate', 'Error Count'],
      estimatedRows: '2,456,789',
      lastGenerated: '2025-01-08 12:15',
      popular: false
    },
    {
      id: 'financial-transactions',
      name: 'Financial Transaction Report',
      description: 'Wallet transactions, payment methods, and financial analytics',
      category: 'financial',
      icon: Table,
      fields: ['Transaction ID', 'User ID', 'Amount', 'Payment Method', 'Status', 'Timestamp'],
      estimatedRows: '890,234',
      lastGenerated: '2025-01-07 16:45',
      popular: true
    },
    {
      id: 'healthcare-sync',
      name: 'Healthcare Synchronization Log',
      description: 'Healthcare ID linkage status and medical record synchronization data',
      category: 'healthcare',
      icon: FileText,
      fields: ['Citizen ID', 'Health ID', 'Sync Status', 'Last Update', 'Provider', 'Records Count'],
      estimatedRows: '456,123',
      lastGenerated: '2025-01-08 08:20',
      popular: false
    },
    {
      id: 'voting-statistics',
      name: 'Diaspora Voting Statistics',
      description: 'Voting participation, registration statistics, and geographical distribution',
      category: 'voting',
      icon: BarChart3,
      fields: ['Voter ID', 'Registration Country', 'Voting Status', 'Election ID', 'Timestamp'],
      estimatedRows: '123,567',
      lastGenerated: '2025-01-06 10:30',
      popular: false
    }
  ];

  const scheduledReports = [
    {
      id: 'SCHED-001',
      name: 'Daily Security Summary',
      template: 'Security Audit Report',
      frequency: 'daily',
      nextRun: '2025-01-09 06:00',
      recipients: ['security@gov.ma', 'admin@digitalid.gov'],
      format: 'pdf',
      status: 'active',
      lastRun: '2025-01-08 06:00',
      success: true
    },
    {
      id: 'SCHED-002',
      name: 'Weekly Citizen Registration Stats',
      template: 'Citizen Registration Summary',
      frequency: 'weekly',
      nextRun: '2025-01-13 09:00',
      recipients: ['ministry@digitalservices.gov'],
      format: 'xlsx',
      status: 'active',
      lastRun: '2025-01-06 09:00',
      success: true
    },
    {
      id: 'SCHED-003',
      name: 'Monthly Financial Report',
      template: 'Financial Transaction Report',
      frequency: 'monthly',
      nextRun: '2025-02-01 12:00',
      recipients: ['finance@gov.ma', 'treasury@finance.gov'],
      format: 'csv',
      status: 'paused',
      lastRun: '2025-01-01 12:00',
      success: false
    }
  ];

  const exportQueue = [
    {
      id: 'EXP-001',
      reportName: 'Citizen Registration Summary',
      requestedBy: 'Sarah Al-Mansouri',
      requestTime: '2025-01-08 14:30',
      estimatedRows: '7,834,456',
      format: 'csv',
      status: 'processing',
      progress: 45,
      estimatedCompletion: '2025-01-08 14:45'
    },
    {
      id: 'EXP-002',
      reportName: 'API Usage Analytics',
      requestedBy: 'Ahmed Benali',
      requestTime: '2025-01-08 14:25',
      estimatedRows: '2,456,789',
      format: 'xlsx',
      status: 'queued',
      progress: 0,
      estimatedCompletion: '2025-01-08 15:00'
    },
    {
      id: 'EXP-003',
      reportName: 'Security Audit Report',
      requestedBy: 'Omar Rachid',
      requestTime: '2025-01-08 14:20',
      estimatedRows: '234,890',
      format: 'pdf',
      status: 'completed',
      progress: 100,
      estimatedCompletion: '2025-01-08 14:35'
    }
  ];

  const availableColumns = [
    'Citizen ID', 'Full Name', 'Email', 'Mobile', 'Registration Date', 
    'Status', 'Location', 'Documents Count', 'Last Login', 'Risk Score'
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'citizens': return 'bg-blue-100 text-blue-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'healthcare': return 'bg-orange-100 text-orange-800';
      case 'voting': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      case 'queued': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleQuickExport = (template: any) => {
    setIsExporting(true);
    setExportProgress(0);
    
    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          alert(`${template.name} exported successfully!`);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleCustomExport = () => {
    if (!selectedReportType) {
      alert('Please select a report type');
      return;
    }
    
    console.log('Custom export:', {
      reportType: selectedReportType,
      dateRange,
      columns: selectedColumns,
      customQuery
    });
    
    alert('Custom export started! You will receive an email when it\'s ready.');
  };

  const handleScheduleReport = () => {
    console.log('Scheduling report...');
    setShowScheduleReport(false);
    alert('Report scheduled successfully!');
  };

  const toggleColumn = (column: string) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const downloadReport = (exportId: string) => {
    console.log('Downloading report:', exportId);
    // Simulate file download
    const link = document.createElement('a');
    link.download = `report_${exportId}_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = 'data:text/csv;charset=utf-8,Sample,Data,Export\n1,2,3\n4,5,6';
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--microsoft-gray-900)] mb-2">
            EXPORT REPORTS
          </h1>
          <p className="text-[var(--microsoft-gray-700)]">
            Generate, schedule, and manage data exports and comprehensive system reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            REFRESH QUEUE
          </Button>
          <Button 
            onClick={() => setShowCreateReport(true)}
            className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            CUSTOM EXPORT
          </Button>
        </div>
      </div>

      {/* Export Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
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

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">REPORT TEMPLATES</TabsTrigger>
          <TabsTrigger value="scheduled">SCHEDULED REPORTS</TabsTrigger>
          <TabsTrigger value="queue">EXPORT QUEUE</TabsTrigger>
          <TabsTrigger value="history">EXPORT HISTORY</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="formal-card p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-[var(--microsoft-blue)]/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-[var(--microsoft-blue)]" />
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getCategoryColor(template.category)}>
                        {template.category.toUpperCase()}
                      </Badge>
                      {template.popular && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          POPULAR
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-[var(--microsoft-gray-700)] mb-4">
                    {template.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="text-sm text-[var(--microsoft-gray-500)]">
                      <span className="font-medium">Estimated Rows:</span> {template.estimatedRows}
                    </div>
                    <div className="text-sm text-[var(--microsoft-gray-500)]">
                      <span className="font-medium">Last Generated:</span> {template.lastGenerated}
                    </div>
                    <div>
                      <p className="text-xs text-[var(--microsoft-gray-500)] mb-2">Available Fields:</p>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.slice(0, 3).map((field, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                        {template.fields.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.fields.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                      onClick={() => handleQuickExport(template)}
                      disabled={isExporting}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      QUICK EXPORT
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowScheduleReport(true)}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card className="formal-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">SCHEDULED REPORTS</h3>
              <Button 
                onClick={() => setShowScheduleReport(true)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-2" />
                SCHEDULE REPORT
              </Button>
            </div>
            
            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <div key={report.id} className="border border-[var(--microsoft-gray-200)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-[var(--microsoft-gray-900)]">{report.name}</h4>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {report.frequency.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.success ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <Button variant="outline" size="sm">
                        {report.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--microsoft-gray-500)]">
                    <div>
                      <span className="font-medium">Template:</span> {report.template}
                    </div>
                    <div>
                      <span className="font-medium">Next Run:</span> {report.nextRun}
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> {report.format.toUpperCase()}
                    </div>
                    <div>
                      <span className="font-medium">Recipients:</span> {report.recipients.length} users
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="queue" className="space-y-6">
          {isExporting && (
            <Card className="formal-card p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--microsoft-gray-900)]">
                      Exporting Report...
                    </span>
                    <span className="text-sm text-[var(--microsoft-gray-500)]">
                      {exportProgress}%
                    </span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
                <Button variant="outline" size="sm" disabled>
                  <Pause className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          )}

          <Card className="formal-card p-6">
            <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-6">EXPORT QUEUE</h3>
            <div className="space-y-4">
              {exportQueue.map((item) => (
                <div key={item.id} className="border border-[var(--microsoft-gray-200)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <h4 className="font-semibold text-[var(--microsoft-gray-900)]">{item.reportName}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {item.format.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.status === 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => downloadReport(item.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {item.status === 'processing' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--microsoft-gray-700)]">Processing...</span>
                        <span className="text-sm text-[var(--microsoft-gray-500)]">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-[var(--microsoft-gray-500)]">
                    <div>
                      <span className="font-medium">Requested By:</span> {item.requestedBy}
                    </div>
                    <div>
                      <span className="font-medium">Request Time:</span> {item.requestTime}
                    </div>
                    <div>
                      <span className="font-medium">Estimated Rows:</span> {item.estimatedRows}
                    </div>
                    <div>
                      <span className="font-medium">ETA:</span> {item.estimatedCompletion}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="formal-card p-4">
            <div className="flex items-center space-x-4 mb-4">
              <Input placeholder="Search export history..." className="flex-1" />
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          <Card className="formal-card p-6">
            <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)] mb-4">EXPORT HISTORY</h3>
            <p className="text-[var(--microsoft-gray-700)]">
              Complete export history will be displayed here with filtering and search capabilities.
              This includes all past exports, their status, download links, and metadata.
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Custom Export Modal */}
      <Dialog open={showCreateReport} onOpenChange={setShowCreateReport}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)]">
              CREATE CUSTOM EXPORT
            </DialogTitle>
            <DialogDescription>
              Configure and generate a custom data export with specific parameters and filters.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>REPORT TYPE</Label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizens">Citizen Data</SelectItem>
                    <SelectItem value="security">Security Events</SelectItem>
                    <SelectItem value="api">API Usage</SelectItem>
                    <SelectItem value="financial">Financial Transactions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>EXPORT FORMAT</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="pdf">PDF Report</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>FROM DATE</Label>
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                />
              </div>
              <div>
                <Label>TO DATE</Label>
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label className="text-[var(--microsoft-gray-900)] mb-3">SELECT COLUMNS TO EXPORT</Label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {availableColumns.map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={column}
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => toggleColumn(column)}
                    />
                    <Label htmlFor={column} className="text-sm">
                      {column}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>CUSTOM FILTER QUERY (OPTIONAL)</Label>
              <Textarea
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Enter custom SQL-like filter conditions..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCreateReport(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleCustomExport}
                className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                START EXPORT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Modal */}
      <Dialog open={showScheduleReport} onOpenChange={setShowScheduleReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)]">
              SCHEDULE REPORT
            </DialogTitle>
            <DialogDescription>
              Set up automated report generation and distribution.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>SCHEDULE NAME</Label>
              <Input placeholder="Enter schedule name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>REPORT TEMPLATE</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen-summary">Citizen Registration Summary</SelectItem>
                    <SelectItem value="security-audit">Security Audit Report</SelectItem>
                    <SelectItem value="api-usage">API Usage Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>FREQUENCY</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>EMAIL RECIPIENTS</Label>
              <Textarea placeholder="Enter email addresses, separated by commas" rows={3} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowScheduleReport(false)}>
                CANCEL
              </Button>
              <Button onClick={handleScheduleReport} className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white">
                <Calendar className="h-4 w-4 mr-2" />
                SCHEDULE REPORT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}