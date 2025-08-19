
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  Receipt, 
  Download, 
  FileText, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Calculator,
  TrendingUp
} from 'lucide-react';

interface TaxPortalProps {
  onBack: () => void;
}

export function TaxPortal({ onBack }: TaxPortalProps) {
  // const [selectedYear, _setSelectedYear] = useState('2024');

  // Mock tax data
  const taxReturns = [
    {
      year: '2024',
      status: 'Filed',
      filedDate: '2024-04-10',
      refundAmount: 1250.00,
      refundStatus: 'Processed',
      dueDate: '2024-04-15'
    },
    {
      year: '2023',
      status: 'Filed',
      filedDate: '2023-04-08',
      refundAmount: 980.00,
      refundStatus: 'Received',
      dueDate: '2023-04-15'
    },
    {
      year: '2022',
      status: 'Filed',
      filedDate: '2022-04-12',
      refundAmount: 0,
      refundStatus: 'No Refund',
      dueDate: '2022-04-15'
    }
  ];

  const taxDocuments = [
    { name: 'W-2 Form 2024', type: 'Income Statement', date: '2025-01-15', available: true },
    { name: '1099-INT 2024', type: 'Interest Income', date: '2025-01-20', available: true },
    { name: 'Property Tax Statement 2024', type: 'Deduction', date: '2024-12-31', available: true },
    { name: 'Charitable Donations 2024', type: 'Deduction', date: '2024-12-31', available: false }
  ];

  const upcomingDeadlines = [
    { task: 'File 2024 Tax Return', date: '2025-04-15', priority: 'High' },
    { task: 'Quarterly Estimated Payment Q1', date: '2025-04-15', priority: 'Medium' },
    { task: 'Property Tax Payment', date: '2025-06-01', priority: 'Medium' }
  ];

  // const currentYearData = taxReturns.find(tr => tr.year === selectedYear);

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
              <div className="bg-[var(--microsoft-blue)] p-2 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">TAX PORTAL</h1>
                <p className="text-sm text-[var(--microsoft-gray-700)]">Manage your tax filings and payments</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="microsoft-badge-success">
              TAX SEASON ACTIVE
            </Badge>
            <Button className="microsoft-button-primary">
              <FileText className="h-4 w-4 mr-2" />
              START NEW FILING
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
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">2024 Refund</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">$1,250.00</p>
                  <p className="text-xs text-green-600">Processed</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calculator className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Filing Status</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">2024 Filed</p>
                  <p className="text-xs text-blue-600">On Time</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Next Deadline</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">Apr 15, 2025</p>
                  <p className="text-xs text-orange-600">Q1 Payment</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">3-Year Avg</p>
                  <p className="text-lg font-semibold text-[var(--microsoft-gray-900)]">$743</p>
                  <p className="text-xs text-purple-600">Refund</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="filings">TAX FILINGS</TabsTrigger>
              <TabsTrigger value="documents">DOCUMENTS</TabsTrigger>
              <TabsTrigger value="payments">PAYMENTS</TabsTrigger>
              <TabsTrigger value="deadlines">DEADLINES</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Current Year Summary */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">2024 TAX YEAR SUMMARY</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs text-[var(--microsoft-gray-700)]">FILING STATUS</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-[var(--microsoft-gray-900)]">Filed Successfully</span>
                          </div>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">Filed on April 10, 2024</p>
                        </div>
                        <div>
                          <Label className="text-xs text-[var(--microsoft-gray-700)]">REFUND STATUS</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-[var(--microsoft-gray-900)]">$1,250.00 Processed</span>
                          </div>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">Direct deposited</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          DOWNLOAD RETURN
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          VIEW TRANSCRIPT
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">QUICK ACTIONS</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button className="microsoft-button-primary justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">File 2025 Return</p>
                            <p className="text-xs opacity-80">Start your tax filing process</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Make Payment</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Pay taxes or estimated amounts</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <Calculator className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Tax Calculator</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Estimate your tax liability</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <Download className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Download Forms</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Get tax forms and documents</p>
                          </div>
                        </div>
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Upcoming Deadlines */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">UPCOMING DEADLINES</h3>
                    </div>
                    <div className="space-y-3">
                      {upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[var(--microsoft-gray-100)] rounded-lg">
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)] text-sm">{deadline.task}</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">{deadline.date}</p>
                          </div>
                          <Badge className={deadline.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                            {deadline.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">RECENT ACTIVITY</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">Refund processed</p>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">January 15, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">W-2 form available</p>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">January 15, 2025</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="bg-orange-100 p-2 rounded-full">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">Q4 payment reminder</p>
                          <p className="text-xs text-[var(--microsoft-gray-700)]">December 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="filings" className="space-y-6">
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)]">TAX FILING HISTORY</h3>
                </div>
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>TAX YEAR</TableHead>
                      <TableHead>FILING STATUS</TableHead>
                      <TableHead>FILED DATE</TableHead>
                      <TableHead>REFUND AMOUNT</TableHead>
                      <TableHead>REFUND STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxReturns.map((taxReturn, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{taxReturn.year}</TableCell>
                        <TableCell>
                          <Badge className="microsoft-badge-success">
                            {taxReturn.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(taxReturn.filedDate).toLocaleDateString()}</TableCell>
                        <TableCell>${taxReturn.refundAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={
                            taxReturn.refundStatus === 'Received' ? 'microsoft-badge-success' :
                            taxReturn.refundStatus === 'Processed' ? 'microsoft-badge-primary' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {taxReturn.refundStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3 mr-1" />
                              DOWNLOAD
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="h-3 w-3 mr-1" />
                              VIEW
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)]">TAX DOCUMENTS</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {taxDocuments.map((doc, index) => (
                    <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-[var(--microsoft-blue)]" />
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">{doc.name}</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">{doc.type}</p>
                          </div>
                        </div>
                        <Badge className={doc.available ? 'microsoft-badge-success' : 'bg-gray-100 text-gray-800'}>
                          {doc.available ? 'Available' : 'Pending'}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--microsoft-gray-700)] mb-3">Available: {doc.date}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        disabled={!doc.available}
                      >
                        <Download className="h-3 w-3 mr-2" />
                        DOWNLOAD
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)]">PAYMENT CENTER</h3>
                </div>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-[var(--microsoft-gray-900)]">MAKE A PAYMENT</h4>
                    <div className="space-y-3">
                      <div>
                        <Label>PAYMENT TYPE</Label>
                        <select className="microsoft-form-input">
                          <option>Estimated Tax Payment</option>
                          <option>Balance Due</option>
                          <option>Extension Payment</option>
                        </select>
                      </div>
                      <div>
                        <Label>TAX YEAR</Label>
                        <select className="microsoft-form-input">
                          <option>2024</option>
                          <option>2025</option>
                        </select>
                      </div>
                      <div>
                        <Label>AMOUNT</Label>
                        <Input type="number" placeholder="Enter amount" className="microsoft-form-input" />
                      </div>
                      <Button className="microsoft-button-primary w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        PROCEED TO PAYMENT
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-[var(--microsoft-gray-900)]">PAYMENT HISTORY</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-[var(--microsoft-gray-100)] rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">Q4 2024 Estimated</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">January 15, 2025</p>
                          </div>
                          <p className="font-medium text-[var(--microsoft-gray-900)]">$2,500.00</p>
                        </div>
                      </div>
                      <div className="p-3 bg-[var(--microsoft-gray-100)] rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">Q3 2024 Estimated</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">September 16, 2024</p>
                          </div>
                          <p className="font-medium text-[var(--microsoft-gray-900)]">$2,500.00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="deadlines" className="space-y-6">
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)]">TAX CALENDAR & DEADLINES</h3>
                </div>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            deadline.priority === 'High' ? 'bg-red-100' : 'bg-orange-100'
                          }`}>
                            <Calendar className={`h-5 w-5 ${
                              deadline.priority === 'High' ? 'text-red-600' : 'text-orange-600'
                            }`} />
                          </div>
                          <div>
                            <p className="font-medium text-[var(--microsoft-gray-900)]">{deadline.task}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">Due: {deadline.date}</p>
                          </div>
                        </div>
                        <Badge className={deadline.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                          {deadline.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}