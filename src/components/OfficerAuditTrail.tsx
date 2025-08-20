
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { 
  Download,
} from 'lucide-react';

const mockAuditLogs = [
  {
    timestamp: '2025-08-07 11:22 AM',
    user: 'Officer123',
    action: 'Approved App #456',
    module: 'Birth Registration'
  },
  {
    timestamp: '2025-08-07 10:15 AM', 
    user: 'Officer456',
    action: 'Rejected App #789',
    module: 'Driver License'
  }
];

export function OfficerAuditTrail() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Audit Trail Viewer</h1>
          <p className="d365-page-subtitle">Timestamp-based action tracking with export functionality</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Download className="w-4 h-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <Card className="d365-card">
        <CardHeader>
          <CardTitle>System Audit Trail</CardTitle>
          <CardDescription>Complete log of all system actions and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Timestamp</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">User</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Module</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLogs.map((log, index) => (
                  <tr key={index} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                    <td className="py-4 px-4 font-medium text-d365-text-primary">{log.timestamp}</td>
                    <td className="py-4 px-4">{log.user}</td>
                    <td className="py-4 px-4">{log.action}</td>
                    <td className="py-4 px-4">{log.module}</td>
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