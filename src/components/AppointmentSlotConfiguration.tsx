import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { 
  Plus, 
  Edit, 
  X, 
  Clock, 
  MapPin,
  Users,
  Calendar,
  BarChart3,
  Globe,

} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from './ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from './ui/dialog';
import { Badge } from './ui/badge';

interface AppointmentSlot {
  id: string;
  centerName: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  capacity: number;
  status: 'Available' | 'Blocked' | 'Full';
  excludedDates: string[];
  allowOnlineBooking: boolean;
  utilization: number; // percentage
  currentBookings: number;
}

interface AppointmentSlotConfigurationProps {
  onBack: () => void;
}

export function AppointmentSlotConfiguration({ onBack }: AppointmentSlotConfigurationProps) {
  const [appointmentSlots, setAppointmentSlots] = useState<AppointmentSlot[]>([
    {
      id: '1',
      centerName: 'Zone A Center',
      startTime: '10:00',
      endTime: '12:00',
      duration: 120,
      capacity: 20,
      status: 'Available',
      excludedDates: ['2024-12-25', '2024-01-01'],
      allowOnlineBooking: true,
      utilization: 75,
      currentBookings: 15
    },
    {
      id: '2',
      centerName: 'HQ',
      startTime: '14:00',
      endTime: '15:00',
      duration: 60,
      capacity: 10,
      status: 'Blocked',
      excludedDates: ['2024-12-24', '2024-12-25'],
      allowOnlineBooking: false,
      utilization: 0,
      currentBookings: 0
    },
    {
      id: '3',
      centerName: 'Zone B Center',
      startTime: '09:00',
      endTime: '11:30',
      duration: 150,
      capacity: 25,
      status: 'Available',
      excludedDates: [],
      allowOnlineBooking: true,
      utilization: 92,
      currentBookings: 23
    },
    {
      id: '4',
      centerName: 'District C Office',
      startTime: '13:00',
      endTime: '16:00',
      duration: 180,
      capacity: 30,
      status: 'Full',
      excludedDates: ['2024-12-31'],
      allowOnlineBooking: true,
      utilization: 100,
      currentBookings: 30
    }
  ]);

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<AppointmentSlot | null>(null);
  const [formData, setFormData] = useState({
    centerName: '',
    startTime: '',
    endTime: '',
    duration: 60,
    capacity: 10,
    status: 'Available' as 'Available' | 'Blocked' | 'Full',
    excludedDates: [] as string[],
    allowOnlineBooking: true
  });

  const centers = [
    'Zone A Center',
    'Zone B Center', 
    'Zone C Center',
    'HQ',
    'District A Office',
    'District B Office',
    'District C Office'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleAdd = () => {
    setEditingSlot(null);
    setFormData({
      centerName: '',
      startTime: '',
      endTime: '',
      duration: 60,
      capacity: 10,
      status: 'Available',
      excludedDates: [],
      allowOnlineBooking: true
    });
    setIsAddEditOpen(true);
  };

  const handleEdit = (slot: AppointmentSlot) => {
    setEditingSlot(slot);
    setFormData({
      centerName: slot.centerName,
      startTime: slot.startTime,
      endTime: slot.endTime,
      duration: slot.duration,
      capacity: slot.capacity,
      status: slot.status,
      excludedDates: slot.excludedDates,
      allowOnlineBooking: slot.allowOnlineBooking
    });
    setIsAddEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setAppointmentSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const handleSave = () => {
    if (editingSlot) {
      setAppointmentSlots(prev => prev.map(slot => 
        slot.id === editingSlot.id 
          ? { 
              ...slot, 
              ...formData,
              utilization: editingSlot.utilization,
              currentBookings: editingSlot.currentBookings
            }
          : slot
      ));
    } else {
      const newSlot: AppointmentSlot = {
        id: Date.now().toString(),
        ...formData,
        utilization: 0,
        currentBookings: 0
      };
      setAppointmentSlots(prev => [...prev, newSlot]);
    }
    setIsAddEditOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case 'Blocked':
        return <Badge className="bg-red-100 text-red-800">Blocked</Badge>;
      case 'Full':
        return <Badge className="bg-orange-100 text-orange-800">Full</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-red-600';
    if (utilization >= 70) return 'text-orange-600';
    if (utilization >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <AdminPageLayout
      title="Appointment Slot Configuration"
      onBack={onBack}
      actionButton={{
        label: 'Configure Slot',
        onClick: handleAdd,
        icon: <Plus className="h-4 w-4" />
      }}
    >
      <div className="space-y-6">

        {/* Slots Table */}
        <div className="d365-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left p-4 font-medium text-d365-text-primary">Center Name</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Slot Time</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Duration</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Capacity</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Utilization</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Status</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Online Booking</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointmentSlots.map((slot) => (
                  <tr key={slot.id} className="border-b border-d365-border hover:bg-d365-hover">
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-d365-text-secondary" />
                        <span className="font-medium">{slot.centerName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-d365-text-secondary" />
                        <span>{slot.startTime} – {slot.endTime}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-d365-text-secondary">
                        {Math.floor(slot.duration / 60)}h {slot.duration % 60 > 0 ? `${slot.duration % 60}m` : ''}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-d365-text-secondary" />
                        <span>{slot.currentBookings}/{slot.capacity}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              slot.utilization >= 90 ? 'bg-red-500' :
                              slot.utilization >= 70 ? 'bg-orange-500' :
                              slot.utilization >= 50 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${slot.utilization}%` }}
                          />
                        </div>
                        <span className={`text-sm font-medium ${getUtilizationColor(slot.utilization)}`}>
                          {slot.utilization}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(slot.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Globe className={`h-4 w-4 ${slot.allowOnlineBooking ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`text-sm ${slot.allowOnlineBooking ? 'text-green-600' : 'text-gray-500'}`}>
                          {slot.allowOnlineBooking ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(slot)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(slot.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">{appointmentSlots.length}</p>
                <p className="text-caption text-d365-text-secondary">Total Slots</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {appointmentSlots.reduce((sum, slot) => sum + slot.capacity, 0)}
                </p>
                <p className="text-caption text-d365-text-secondary">Total Capacity</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {appointmentSlots.reduce((sum, slot) => sum + slot.currentBookings, 0)}
                </p>
                <p className="text-caption text-d365-text-secondary">Current Bookings</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {appointmentSlots.filter(slot => slot.allowOnlineBooking).length}
                </p>
                <p className="text-caption text-d365-text-secondary">Online Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingSlot ? 'Edit Appointment Slot' : 'Configure New Slot'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="centerName">Center Name</Label>
              <Select 
                value={formData.centerName} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, centerName: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent>
                  {centers.map(center => (
                    <SelectItem key={center} value={center}>{center}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select 
                  value={formData.startTime} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, startTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select 
                  value={formData.endTime} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, endTime: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  placeholder="60"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Daily Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                  placeholder="20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value: 'Available' | 'Blocked' | 'Full') => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                    <SelectItem value="Full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="allowOnlineBooking"
                checked={formData.allowOnlineBooking}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, allowOnlineBooking: checked }))}
              />
              <Label htmlFor="allowOnlineBooking">Allow Online Booking</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excludedDates">Excluded Dates (comma-separated)</Label>
              <Input
                id="excludedDates"
                value={formData.excludedDates.join(', ')}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  excludedDates: e.target.value.split(',').map(date => date.trim()).filter(date => date)
                }))}
                placeholder="2024-12-25, 2024-01-01"
              />
              <p className="text-caption text-d365-text-secondary">
                Enter dates in YYYY-MM-DD format, separated by commas
              </p>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="d365-button-primary">
                {editingSlot ? 'Update Slot' : 'Configure Slot'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}