import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  Heart, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  ArrowLeft,
  Clock,
  MapPin,
  User,
  Stethoscope,
  Download,
  Plus
} from 'lucide-react';

interface HealthcareServicesProps {
  onBack: () => void;
}

export function HealthcareServices({ onBack }: HealthcareServicesProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock healthcare data
  const appointments = [
    {
      id: 1,
      type: 'Annual Physical',
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Family Medicine',
      date: '2025-01-25',
      time: '10:00 AM',
      location: 'Downtown Medical Center',
      status: 'Confirmed'
    },
    {
      id: 2,
      type: 'Dental Cleaning',
      doctor: 'Dr. Michael Chen',
      specialty: 'Dentistry',
      date: '2025-02-10',
      time: '2:30 PM',
      location: 'Smile Dental Clinic',
      status: 'Confirmed'
    },
    {
      id: 3,
      type: 'Eye Exam',
      doctor: 'Dr. Emily Johnson',
      specialty: 'Ophthalmology',
      date: '2025-03-05',
      time: '11:15 AM',
      location: 'Vision Care Center',
      status: 'Pending'
    }
  ];

  const medicalRecords = [
    {
      date: '2025-01-10',
      provider: 'Dr. Sarah Wilson',
      type: 'Physical Exam',
      diagnosis: 'Routine checkup - Healthy',
      prescription: 'None',
      notes: 'All vitals normal. Continue current lifestyle.'
    },
    {
      date: '2024-12-15',
      provider: 'Dr. James Rodriguez',
      type: 'Blood Work',
      diagnosis: 'Vitamin D deficiency',
      prescription: 'Vitamin D3 supplement',
      notes: 'Cholesterol levels normal. Increase sun exposure.'
    },
    {
      date: '2024-11-20',
      provider: 'Dr. Lisa Martinez',
      type: 'Consultation',
      diagnosis: 'Seasonal allergies',
      prescription: 'Antihistamine as needed',
      notes: 'Symptoms improved with treatment.'
    }
  ];

  const prescriptions = [
    {
      medication: 'Vitamin D3',
      dosage: '2000 IU daily',
      prescribed: '2024-12-15',
      prescriber: 'Dr. James Rodriguez',
      refills: 2,
      status: 'Active'
    },
    {
      medication: 'Cetirizine',
      dosage: '10mg as needed',
      prescribed: '2024-11-20',
      prescriber: 'Dr. Lisa Martinez',
      refills: 0,
      status: 'Expired'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'Normal', lastUpdated: '2025-01-10' },
    { label: 'Cholesterol', value: '180 mg/dL', status: 'Normal', lastUpdated: '2024-12-15' },
    { label: 'BMI', value: '23.5', status: 'Normal', lastUpdated: '2025-01-10' },
    { label: 'Blood Sugar', value: '95 mg/dL', status: 'Normal', lastUpdated: '2024-12-15' }
  ];

  const insuranceInfo = {
    provider: 'HealthFirst Insurance',
    policyNumber: 'HF-2025-987654',
    groupNumber: 'GRP-12345',
    copay: '$25',
    deductible: '$1,500',
    deductibleMet: '$420'
  };

  return (
    <div className="h-full flex flex-col bg-[var(--microsoft-gray-50)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--microsoft-gray-200)] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              BACK TO SERVICES
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className="bg-red-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">HEALTHCARE SERVICES</h1>
                <p className="text-sm text-[var(--microsoft-gray-700)]">Manage your health records and appointments</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="microsoft-badge-success">
              INSURANCE ACTIVE
            </Badge>
            <Button className="microsoft-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              BOOK APPOINTMENT
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-6">
            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Next Appointment</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">Jan 25</p>
                  <p className="text-xs text-blue-600">Physical Exam</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Health Score</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">Excellent</p>
                  <p className="text-xs text-green-600">All Normal</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Pill className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Active Prescriptions</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">1</p>
                  <p className="text-xs text-purple-600">Vitamin D3</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Recent Records</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">3</p>
                  <p className="text-xs text-orange-600">Last 90 days</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="appointments">APPOINTMENTS</TabsTrigger>
              <TabsTrigger value="records">RECORDS</TabsTrigger>
              <TabsTrigger value="prescriptions">PRESCRIPTIONS</TabsTrigger>
              <TabsTrigger value="metrics">HEALTH METRICS</TabsTrigger>
              <TabsTrigger value="insurance">INSURANCE</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Upcoming Appointments */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">UPCOMING APPOINTMENTS</h3>
                    </div>
                    <div className="space-y-4">
                      {appointments.slice(0, 2).map((appointment, index) => (
                        <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <Stethoscope className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--microsoft-gray-900)]">{appointment.type}</p>
                                <p className="text-sm text-[var(--microsoft-gray-700)]">{appointment.doctor}</p>
                              </div>
                            </div>
                            <Badge className="microsoft-badge-success">
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-2 text-sm text-[var(--microsoft-gray-700)]">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(appointment.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {appointment.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Recent Health Records */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">RECENT HEALTH RECORDS</h3>
                    </div>
                    <div className="space-y-3">
                      {medicalRecords.slice(0, 2).map((record, index) => (
                        <div key={index} className="p-4 bg-[var(--microsoft-gray-100)] rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">{record.type}</p>
                              <p className="text-sm text-[var(--microsoft-gray-700)]">{record.provider}</p>
                            </div>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">{record.date}</p>
                          </div>
                          <p className="text-sm text-[var(--microsoft-gray-900)] mb-1">
                            <strong>Diagnosis:</strong> {record.diagnosis}
                          </p>
                          <p className="text-sm text-[var(--microsoft-gray-700)]">{record.notes}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Health Status */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">HEALTH STATUS</h3>
                    </div>
                    <div className="space-y-3">
                      {healthMetrics.slice(0, 3).map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">{metric.label}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">{metric.value}</p>
                          </div>
                          <Badge className="microsoft-badge-success">
                            {metric.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Insurance Info */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">INSURANCE SUMMARY</h3>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-[var(--microsoft-gray-700)]">Provider</p>
                        <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.provider}</p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--microsoft-gray-700)]">Deductible Progress</p>
                        <p className="font-medium text-[var(--microsoft-gray-900)]">
                          ${insuranceInfo.deductibleMet} / ${insuranceInfo.deductible}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--microsoft-gray-700)]">Copay</p>
                        <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.copay}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">QUICK ACTIONS</h3>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Request Records
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Pill className="h-4 w-4 mr-2" />
                        Prescription Refill
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">APPOINTMENT SCHEDULE</h3>
                <Button className="microsoft-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  SCHEDULE NEW
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>APPOINTMENT TYPE</TableHead>
                      <TableHead>HEALTHCARE PROVIDER</TableHead>
                      <TableHead>DATE & TIME</TableHead>
                      <TableHead>LOCATION</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((appointment, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{appointment.type}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">{appointment.specialty}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-[var(--microsoft-gray-500)]" />
                            <span>{appointment.doctor}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">{appointment.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4 text-[var(--microsoft-gray-500)]" />
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            appointment.status === 'Confirmed' ? 'microsoft-badge-success' :
                            appointment.status === 'Pending' ? 'microsoft-badge-warning' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              RESCHEDULE
                            </Button>
                            <Button variant="outline" size="sm">
                              CANCEL
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="records" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">MEDICAL RECORDS</h3>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  EXPORT ALL
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <div className="space-y-4">
                  {medicalRecords.map((record, index) => (
                    <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">{record.type}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">{record.provider}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">{record.date}</p>
                          <Button variant="outline" size="sm" className="mt-1">
                            <Download className="h-3 w-3 mr-1" />
                            DOWNLOAD
                          </Button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-[var(--microsoft-gray-700)]">DIAGNOSIS</Label>
                          <p className="text-sm text-[var(--microsoft-gray-900)]">{record.diagnosis}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-[var(--microsoft-gray-700)]">PRESCRIPTION</Label>
                          <p className="text-sm text-[var(--microsoft-gray-900)]">{record.prescription}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label className="text-xs text-[var(--microsoft-gray-700)]">NOTES</Label>
                        <p className="text-sm text-[var(--microsoft-gray-900)]">{record.notes}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">PRESCRIPTION MANAGEMENT</h3>
                <Button className="microsoft-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  REQUEST REFILL
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>MEDICATION</TableHead>
                      <TableHead>DOSAGE</TableHead>
                      <TableHead>PRESCRIBED BY</TableHead>
                      <TableHead>DATE PRESCRIBED</TableHead>
                      <TableHead>REFILLS LEFT</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptions.map((prescription, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{prescription.medication}</TableCell>
                        <TableCell>{prescription.dosage}</TableCell>
                        <TableCell>{prescription.prescriber}</TableCell>
                        <TableCell>{prescription.prescribed}</TableCell>
                        <TableCell>{prescription.refills}</TableCell>
                        <TableCell>
                          <Badge className={
                            prescription.status === 'Active' ? 'microsoft-badge-success' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {prescription.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={prescription.status === 'Expired'}
                          >
                            REFILL
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">HEALTH METRICS & VITAL SIGNS</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {healthMetrics.map((metric, index) => (
                  <Card key={index} className="microsoft-card">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Activity className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--microsoft-gray-900)]">{metric.label}</p>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">Last updated: {metric.lastUpdated}</p>
                        </div>
                      </div>
                      <Badge className="microsoft-badge-success">
                        {metric.status}
                      </Badge>
                    </div>
                    <p className="text-2xl font-semibold text-[var(--microsoft-gray-900)]">{metric.value}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="insurance" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">INSURANCE INFORMATION</h3>
              
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h4 className="font-semibold text-[var(--microsoft-gray-900)]">CURRENT PLAN DETAILS</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">INSURANCE PROVIDER</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.provider}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">POLICY NUMBER</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.policyNumber}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">GROUP NUMBER</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.groupNumber}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">OFFICE VISIT COPAY</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.copay}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">ANNUAL DEDUCTIBLE</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">{insuranceInfo.deductible}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-[var(--microsoft-gray-700)]">DEDUCTIBLE MET</Label>
                      <p className="font-medium text-[var(--microsoft-gray-900)]">${insuranceInfo.deductibleMet}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(parseInt(insuranceInfo.deductibleMet.replace('$', '').replace(',', '')) / parseInt(insuranceInfo.deductible.replace('$', '').replace(',', ''))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}