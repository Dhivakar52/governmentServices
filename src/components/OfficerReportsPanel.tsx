import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  BarChart3,
  Plus,
  Download,
  Calendar,
  Settings
} from 'lucide-react';

const mockReports = [
  {
    id: 'RPT-001',
    name: 'SLA Compliance',
    type: 'SLA',
    generatedOn: '2025-08-05',
    download: 'PDF / Excel',
    schedule: 'Weekly'
  },
  {
    id: 'RPT-002',
    name: 'Application Statistics',
    type: 'Statistics',
    generatedOn: '2025-08-04',
    download: 'PDF / Excel',
    schedule: 'Daily'
  }
];

export function OfficerReportsPanel() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Reports Panel</h1>
          <p className="d365-page-subtitle">Report generation with scheduling capabilities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="d365-button-primary btn-with-icon">
            <Plus className="w-4 h-4" />
            Create Report
          </Button>
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Calendar className="w-4 h-4" />
            Schedule Report
          </Button>
        </div>
      </div>

      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Generated Reports</CardTitle>
          <CardDescription>Available reports with download and scheduling options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Report Name</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Type</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Generated On</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Download</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Schedule</th>
                </tr>
              </thead>
              <tbody>
                {mockReports.map((report) => (
                  <tr key={report.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                    <td className="py-4 px-4 font-medium text-d365-text-primary">{report.name}</td>
                    <td className="py-4 px-4"><Badge variant="outline">{report.type}</Badge></td>
                    <td className="py-4 px-4">{report.generatedOn}</td>
                    <td className="py-4 px-4">{report.download}</td>
                    <td className="py-4 px-4">{report.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}