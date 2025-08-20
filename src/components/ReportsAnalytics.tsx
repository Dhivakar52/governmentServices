// import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
// import { Progress } from './ui/progress';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Filter,

} from 'lucide-react';

interface ReportsAnalyticsProps {
  userRole: 'citizen' | 'officer' | 'admin' | null;
}

const reportTemplates = [
  {
    name: 'Application Processing Report',
    description: 'Monthly summary of application processing times',
    type: 'Operational',
    frequency: 'Monthly'
  },
  {
    name: 'Department Performance Report',
    description: 'Performance metrics across all departments',
    type: 'Performance',
    frequency: 'Weekly'
  },
  {
    name: 'User Activity Report',
    description: 'System usage and user engagement statistics',
    type: 'Analytics',
    frequency: 'Daily'
  },
  {
    name: 'Revenue Report',
    description: 'Fee collection and payment processing summary',
    type: 'Financial',
    frequency: 'Monthly'
  }
];

export function ReportsAnalytics({ userRole }: ReportsAnalyticsProps) {
  // const [selectedPeriod, setSelectedPeriod] = useState('month');

  const isAdmin = userRole === 'admin';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Reports &amp; Analytics</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Comprehensive analytics and custom reports' : 'View operational reports and statistics'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList>
          <TabsTrigger value="dashboard">Analytics Dashboard</TabsTrigger>
          <TabsTrigger value="reports">Custom Reports</TabsTrigger>
          {isAdmin && <TabsTrigger value="templates">Report Templates</TabsTrigger>}
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Total Applications</p>
                    <p className="text-2xl font-bold">24,680</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">Approval Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1% from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Avg. Processing Time</p>
                    <p className="text-2xl font-bold">4.8 days</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -8.3% from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Active Users</p>
                    <p className="text-2xl font-bold">15,840</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +5.7% from last month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-600">Interactive Analytics Dashboard</p>
                  <p className="text-sm text-gray-500">Real-time charts and data visualization</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
              <CardDescription>Create detailed reports with custom parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Report Type</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>Application Processing</option>
                    <option>Department Performance</option>
                    <option>Revenue Analysis</option>
                    <option>User Activity</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
              </div>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {reportTemplates.map((template, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{template.frequency}</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        <TabsContent value="export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Export System Data</CardTitle>
              <CardDescription>Download system data for backup or external analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <Download className="h-6 w-6 mb-2" />
                  Export Applications Data
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Export User Data
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Export Documents
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  Export Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}