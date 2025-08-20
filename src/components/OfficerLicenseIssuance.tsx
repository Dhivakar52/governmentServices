
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 

  Eye,
  Mail,

  Settings,
  User
} from 'lucide-react';

const mockApplications = [
  {
    id: 'LIC-7788',
    name: 'Sunil Kumar',
    docType: 'Driving License',
    status: 'Ready',
    approvedDate: '2025-01-15',
    expiryDate: '2030-01-15'
  },
  {
    id: 'LIC-7789',
    name: 'Priya Sharma',
    docType: 'Birth Certificate',
    status: 'Ready',
    approvedDate: '2025-01-14',
    expiryDate: 'N/A'
  }
];

export function OfficerLicenseIssuance() {
  const getStatusBadge = (status: string) => {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">License / Certificate Issuance</h1>
          <p className="d365-page-subtitle">Generate and download documents for approved applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            Issuance Settings
          </Button>
        </div>
      </div>

      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Ready for Issuance</CardTitle>
          <CardDescription>Applications approved and ready for document generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">App ID</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Name</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Doc Type</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                  <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockApplications.map((app) => (
                  <tr key={app.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                    <td className="py-4 px-4 font-medium text-d365-text-primary">{app.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-d365-text-secondary" />
                        {app.name}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-body text-d365-text-primary">{app.docType}</td>
                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline">Generate PDF</Button>
                        <Button size="sm" variant="outline"><Eye className="w-3 h-3" /> Preview</Button>
                        <Button size="sm" variant="outline"><Mail className="w-3 h-3" /> Email</Button>
                      </div>
                    </td>
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