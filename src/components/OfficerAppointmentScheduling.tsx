import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar,
  Clock,
  Plus,
  User,
  MapPin,
  Settings,
  CheckCircle
} from 'lucide-react';

const mockSlots = [
  {
    id: 'SLOT-001',
    date: '2025-08-10',
    time: '10:00 AM',
    center: 'Center A',
    officer: 'Officer Raj',
    status: 'Available',
    applicationType: 'Driver\'s License Test'
  },
  {
    id: 'SLOT-002',
    date: '2025-08-10',
    time: '11:00 AM',
    center: 'Center A',
    officer: 'Officer Priya',
    status: 'Booked',
    applicationType: 'Birth Certificate Review'
  },
  {
    id: 'SLOT-003',
    date: '2025-08-10',
    time: '02:00 PM',
    center: 'Center B',
    officer: 'Officer Kumar',
    status: 'Available',
    applicationType: 'Marriage Registration'
  }
];

export function OfficerAppointmentScheduling() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<any>(null);

  const openDialog = (dialogType: string, slot?: any) => {
    setCurrentDialog(dialogType);
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setCurrentDialog('');
    setSelectedSlot(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>;
      case 'Booked':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Booked</Badge>;
      case 'Cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Appointment Scheduling Panel</h1>
          <p className="d365-page-subtitle">
            Calendar layout with slot management grid for citizen appointments
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => openDialog('create-slot')} 
            className="d365-button-primary btn-with-icon"
          >
            <Plus className="w-4 h-4" />
            Create Slot
          </Button>
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Settings className="w-4 h-4" />
            Schedule Settings
          </Button>
        </div>
      </div>

      {/* Calendar Layout */}
      <Card className="d365-card">
        <CardHeader>
          <CardTitle>Appointment Calendar</CardTitle>
          <CardDescription>Manage appointment slots across different centers and officers</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Date</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Time</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Center</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Officer</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Service Type</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSlots.map((slot) => (
                      <tr key={slot.id} className="border-b border-d365-border hover:bg-d365-surface-secondary transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-d365-text-secondary" />
                            <span className="font-medium text-d365-text-primary">{slot.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-d365-text-secondary" />
                            <span className="text-body text-d365-text-primary">{slot.time}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-d365-text-secondary" />
                            <span className="text-body text-d365-text-primary">{slot.center}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-d365-text-secondary" />
                            <span className="text-body text-d365-text-primary">{slot.officer}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">{getStatusBadge(slot.status)}</td>
                        <td className="py-4 px-4 text-body text-d365-text-primary">{slot.applicationType}</td>
                        <td className="py-4 px-4 text-center">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openDialog('assign-slot', slot)}
                            disabled={slot.status === 'Booked'}
                            className="btn-with-icon"
                          >
                            {slot.status === 'Available' ? 'Assign ➤' : 'View Details'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-6">
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-d365-text-secondary mx-auto mb-4" />
                <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">Weekly View</h3>
                <p className="text-body text-d365-text-secondary">Weekly calendar interface would be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="mt-6">
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-d365-text-secondary mx-auto mb-4" />
                <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">Monthly View</h3>
                <p className="text-body text-d365-text-secondary">Monthly calendar interface would be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Slot Management Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentDialog === 'create-slot' && 'Create New Appointment Slot'}
              {currentDialog === 'assign-slot' && `Assign Appointment Slot - ${selectedSlot?.id}`}
            </DialogTitle>
            <DialogDescription>
              {currentDialog === 'create-slot' && 'Configure a new appointment slot for citizen services'}
              {currentDialog === 'assign-slot' && 'Assign this appointment slot to a citizen'}
            </DialogDescription>
          </DialogHeader>
          
          {currentDialog === 'create-slot' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="slot-date">Date</Label>
                  <Input id="slot-date" type="date" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="slot-time">Time</Label>
                  <Input id="slot-time" type="time" className="mt-1" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="center">Service Center</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select service center" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center-a">Center A</SelectItem>
                    <SelectItem value="center-b">Center B</SelectItem>
                    <SelectItem value="center-c">Center C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="officer">Assigned Officer</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select officer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="officer-raj">Officer Raj</SelectItem>
                    <SelectItem value="officer-priya">Officer Priya</SelectItem>
                    <SelectItem value="officer-kumar">Officer Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="service-type">Service Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drivers-license">Driver's License Test</SelectItem>
                    <SelectItem value="birth-certificate">Birth Certificate Review</SelectItem>
                    <SelectItem value="marriage-registration">Marriage Registration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button onClick={closeDialog} className="d365-button-primary btn-with-icon">
                  <CheckCircle className="w-4 h-4" />
                  Create Slot
                </Button>
              </div>
            </div>
          )}

          {currentDialog === 'assign-slot' && selectedSlot && (
            <div className="space-y-4">
              <div className="bg-d365-surface-secondary p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="font-medium">Date:</span> {selectedSlot.date}</div>
                  <div><span className="font-medium">Time:</span> {selectedSlot.time}</div>
                  <div><span className="font-medium">Center:</span> {selectedSlot.center}</div>
                  <div><span className="font-medium">Officer:</span> {selectedSlot.officer}</div>
                </div>
              </div>

              <div>
                <Label htmlFor="citizen-search">Search Citizen</Label>
                <Input 
                  id="citizen-search" 
                  placeholder="Search by name, ID, or application number..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="appointment-notes">Appointment Notes</Label>
                <textarea 
                  id="appointment-notes"
                  className="w-full mt-1 p-2 border border-d365-border rounded-md"
                  placeholder="Add any special notes for this appointment..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={closeDialog}>
                  Cancel
                </Button>
                <Button onClick={closeDialog} className="d365-button-primary btn-with-icon">
                  <CheckCircle className="w-4 h-4" />
                  Assign Appointment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}