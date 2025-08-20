
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { 

  Plus,
  Download,

} from 'lucide-react';

const mockExports = [
  {
    id: 'EXP-001',
    service: 'Birth Cert.',
    fields: 'Name, DOB, ID',
    format: 'Excel',
    download: '[Download]',
    createdBy: 'Admin_Jaya'
  },
  {
    id: 'EXP-002', 
    service: 'Driver License',
    fields: 'Name, License No., Expiry',
    format: 'PDF',
    download: '[Download]',
    createdBy: 'Officer_Raj'
  }
];

export function OfficerDataExport() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Data Export Interface</h1>
          <p className="d365-page-subtitle">Service-based data export with field selection</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="d365-button-primary btn-with-icon">
            <Plus className="w-4 h-4" />
            New Export
          </Button>
        </div>
      </div>

      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>Previously generated data exports with download options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Export ID</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Service</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Fields</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Format</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Download</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Created By</th>
                </tr>
              </thead>
              <tbody>
                {mockExports.map((exportItem) => (
                  <tr key={exportItem.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                    <td className="py-4 px-4 font-medium text-d365-text-primary">{exportItem.id}</td>
                    <td className="py-4 px-4">{exportItem.service}</td>
                    <td className="py-4 px-4">{exportItem.fields}</td>
                    <td className="py-4 px-4">{exportItem.format}</td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline" className="btn-with-icon">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </td>
                    <td className="py-4 px-4">{exportItem.createdBy}</td>
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