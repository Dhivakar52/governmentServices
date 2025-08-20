import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Plus,
} from 'lucide-react';

const mockNotifications = [
  {
    id: 'NOT-001',
    title: 'SLA Reminder',
    channel: 'Email',
    roleTarget: 'Officers',
    status: 'Sent',
    sentOn: '2025-08-01'
  },
  {
    id: 'NOT-002',
    title: 'System Maintenance',
    channel: 'SMS',
    roleTarget: 'All Users',
    status: 'Scheduled',
    sentOn: '2025-08-05'
  }
];

export function OfficerNotificationManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Notification Manager</h1>
          <p className="d365-page-subtitle">Manage past messages and create new notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setIsDialogOpen(true)} className="d365-button-primary btn-with-icon">
            <Plus className="w-4 h-4" />
            New Notification
          </Button>
        </div>
      </div>

      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>Past messages and notification history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Message Title</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Channel</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Role Target</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                  <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Sent On</th>
                </tr>
              </thead>
              <tbody>
                {mockNotifications.map((notification) => (
                  <tr key={notification.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                    <td className="py-4 px-4 font-medium text-d365-text-primary">{notification.title}</td>
                    <td className="py-4 px-4">{notification.channel}</td>
                    <td className="py-4 px-4">{notification.roleTarget}</td>
                    <td className="py-4 px-4">
                      <Badge className={notification.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {notification.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">{notification.sentOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Notification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Message Title</Label>
              <Input id="title" placeholder="Enter notification title" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message">Message Content</Label>
              <Textarea id="message" placeholder="Enter your message..." rows={4} className="mt-1" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsDialogOpen(false)} className="d365-button-primary">Send Notification</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}