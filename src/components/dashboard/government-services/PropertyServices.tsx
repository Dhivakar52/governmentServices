import { useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  Home, 
  FileText, 
  DollarSign, 
  CheckCircle,
  ArrowLeft,
  Search,
  Download,
  Plus,
  Building,
  TrendingUp,
  Calculator,
  Gavel
} from 'lucide-react';

interface PropertyServicesProps {
  onBack: () => void;
}

export function PropertyServices({ onBack }: PropertyServicesProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchProperty, setSearchProperty] = useState('');

  // Mock property data
  const ownedProperties = [
    {
      id: 1,
      address: '123 Main Street, Springfield, IL 62701',
      type: 'Single Family Home',
      purchaseDate: '2018-05-15',
      purchasePrice: 285000,
      currentValue: 325000,
      taxAssessedValue: 310000,
      annualTax: 4650,
      lastTaxPayment: '2024-12-15',
      status: 'Current'
    },
    {
      id: 2,
      address: '456 Oak Avenue, Unit 2B, Springfield, IL 62702',
      type: 'Condominium',
      purchaseDate: '2020-09-22',
      purchasePrice: 175000,
      currentValue: 190000,
      taxAssessedValue: 185000,
      annualTax: 2775,
      lastTaxPayment: '2024-12-15',
      status: 'Current'
    }
  ];

  const propertyTransactions = [
    {
      date: '2024-12-15',
      type: 'Tax Payment',
      property: '123 Main Street',
      amount: 4650,
      status: 'Completed',
      reference: 'TX-2024-001234'
    },
    {
      date: '2024-12-15',
      type: 'Tax Payment',
      property: '456 Oak Avenue, Unit 2B',
      amount: 2775,
      status: 'Completed',
      reference: 'TX-2024-001235'
    },
    {
      date: '2024-06-01',
      type: 'Assessment Update',
      property: '123 Main Street',
      amount: 0,
      status: 'Processed',
      reference: 'AS-2024-005678'
    }
  ];

  const assessmentHistory = [
    { year: '2024', property: '123 Main Street', assessedValue: 310000, taxAmount: 4650, change: '+3.2%' },
    { year: '2023', property: '123 Main Street', assessedValue: 300000, taxAmount: 4500, change: '+2.1%' },
    { year: '2022', property: '123 Main Street', assessedValue: 294000, taxAmount: 4410, change: '+1.8%' },
    { year: '2024', property: '456 Oak Avenue, Unit 2B', assessedValue: 185000, taxAmount: 2775, change: '+2.8%' },
    { year: '2023', property: '456 Oak Avenue, Unit 2B', assessedValue: 180000, taxAmount: 2700, change: '+2.3%' }
  ];

  const upcomingDeadlines = [
    { task: 'Property Tax Payment Q2', date: '2025-06-01', property: 'All Properties', amount: 3712.50 },
    { task: 'Property Assessment Review', date: '2025-04-15', property: '123 Main Street', amount: 0 },
    { task: 'Homestead Exemption Renewal', date: '2025-03-31', property: 'All Properties', amount: 0 }
  ];

  const totalPropertyValue = ownedProperties.reduce((sum, prop) => sum + prop.currentValue, 0);
  const totalAnnualTax = ownedProperties.reduce((sum, prop) => sum + prop.annualTax, 0);

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
              <div className="bg-orange-500 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">PROPERTY SERVICES</h1>
                <p className="text-sm text-[var(--microsoft-gray-700)]">Manage property records, taxes, and transactions</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="microsoft-badge-success">
              TAXES CURRENT
            </Badge>
            <Button className="microsoft-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              ADD PROPERTY
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
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Owned Properties</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">{ownedProperties.length}</p>
                  <p className="text-xs text-blue-600">Active</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Total Property Value</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">${totalPropertyValue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">Current Market</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Calculator className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Annual Tax Bill</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">${totalAnnualTax.toLocaleString()}</p>
                  <p className="text-xs text-orange-600">2024 Year</p>
                </div>
              </div>
            </Card>

            <Card className="microsoft-card">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">Portfolio Growth</p>
                  <p className="text-xl font-semibold text-[var(--microsoft-gray-900)]">+8.4%</p>
                  <p className="text-xs text-purple-600">Last Year</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
              <TabsTrigger value="properties">PROPERTIES</TabsTrigger>
              <TabsTrigger value="taxes">TAXES</TabsTrigger>
              <TabsTrigger value="transactions">TRANSACTIONS</TabsTrigger>
              <TabsTrigger value="assessments">ASSESSMENTS</TabsTrigger>
              <TabsTrigger value="search">SEARCH</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Property Portfolio */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">PROPERTY PORTFOLIO</h3>
                    </div>
                    <div className="space-y-4">
                      {ownedProperties.map((property, index) => (
                        <div key={index} className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="bg-orange-100 p-2 rounded-lg">
                                <Home className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                <p className="font-medium text-[var(--microsoft-gray-900)]">{property.address}</p>
                                <p className="text-sm text-[var(--microsoft-gray-700)]">{property.type}</p>
                              </div>
                            </div>
                            <Badge className="microsoft-badge-success">
                              {property.status}
                            </Badge>
                          </div>
                          <div className="grid md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">Current Value</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">${property.currentValue.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">Annual Tax</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">${property.annualTax.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[var(--microsoft-gray-700)]">Last Payment</p>
                              <p className="font-medium text-[var(--microsoft-gray-900)]">{property.lastTaxPayment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
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
                          <DollarSign className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Pay Property Taxes</p>
                            <p className="text-xs opacity-80">Make tax payments online</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">View Tax Records</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Download tax documents</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <Search className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">Property Search</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Search public records</p>
                          </div>
                        </div>
                      </Button>
                      <Button variant="outline" className="justify-start h-auto p-4">
                        <div className="flex items-center space-x-3">
                          <Gavel className="h-5 w-5" />
                          <div className="text-left">
                            <p className="font-medium">File Appeal</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">Contest property assessment</p>
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
                        <div key={index} className="p-3 bg-[var(--microsoft-gray-100)] rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-[var(--microsoft-gray-900)] text-sm">{deadline.task}</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">{deadline.date}</p>
                          </div>
                          <p className="text-xs text-[var(--microsoft-gray-700)] mb-1">{deadline.property}</p>
                          {deadline.amount > 0 && (
                            <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">${deadline.amount.toLocaleString()}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Recent Transactions */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">RECENT ACTIVITY</h3>
                    </div>
                    <div className="space-y-3">
                      {propertyTransactions.slice(0, 3).map((transaction, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">{transaction.type}</p>
                            <p className="text-xs text-[var(--microsoft-gray-700)]">{transaction.date}</p>
                          </div>
                          {transaction.amount > 0 && (
                            <p className="text-sm font-medium text-[var(--microsoft-gray-900)]">${transaction.amount.toLocaleString()}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Property Values Trend */}
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">VALUE SUMMARY</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--microsoft-gray-700)]">Purchase Price</span>
                        <span className="font-medium text-[var(--microsoft-gray-900)]">${(ownedProperties.reduce((sum, prop) => sum + prop.purchasePrice, 0)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--microsoft-gray-700)]">Current Value</span>
                        <span className="font-medium text-[var(--microsoft-gray-900)]">${totalPropertyValue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-[var(--microsoft-gray-700)]">Total Appreciation</span>
                        <span className="font-medium text-green-600">+${(totalPropertyValue - ownedProperties.reduce((sum, prop) => sum + prop.purchasePrice, 0)).toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="properties" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">OWNED PROPERTIES</h3>
                <Button className="microsoft-button-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  ADD PROPERTY
                </Button>
              </div>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>PROPERTY ADDRESS</TableHead>
                      <TableHead>TYPE</TableHead>
                      <TableHead>PURCHASE DATE</TableHead>
                      <TableHead>PURCHASE PRICE</TableHead>
                      <TableHead>CURRENT VALUE</TableHead>
                      <TableHead>ANNUAL TAX</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ownedProperties.map((property, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{property.address}</p>
                            <p className="text-sm text-[var(--microsoft-gray-700)]">ID: {property.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{property.type}</TableCell>
                        <TableCell>{new Date(property.purchaseDate).toLocaleDateString()}</TableCell>
                        <TableCell>${property.purchasePrice.toLocaleString()}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">${property.currentValue.toLocaleString()}</p>
                            <p className="text-xs text-green-600">
                              +{(((property.currentValue - property.purchasePrice) / property.purchasePrice) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>${property.annualTax.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className="microsoft-badge-success">
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              VIEW DETAILS
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="taxes" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">PROPERTY TAX BILLS</h3>
                    </div>
                    <Table className="microsoft-table">
                      <TableHeader>
                        <TableRow>
                          <TableHead>PROPERTY</TableHead>
                          <TableHead>TAX YEAR</TableHead>
                          <TableHead>ASSESSED VALUE</TableHead>
                          <TableHead>TAX AMOUNT</TableHead>
                          <TableHead>DUE DATE</TableHead>
                          <TableHead>STATUS</TableHead>
                          <TableHead>ACTIONS</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ownedProperties.map((property, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <p className="font-medium">{property.address.split(',')[0]}</p>
                            </TableCell>
                            <TableCell>2024</TableCell>
                            <TableCell>${property.taxAssessedValue.toLocaleString()}</TableCell>
                            <TableCell>${property.annualTax.toLocaleString()}</TableCell>
                            <TableCell>June 1, 2025</TableCell>
                            <TableCell>
                              <Badge className="microsoft-badge-success">
                                Paid
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-3 w-3 mr-1" />
                                  RECEIPT
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </div>
                
                <div>
                  <Card className="microsoft-card">
                    <div className="microsoft-card-header">
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">PAYMENT CENTER</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>SELECT PROPERTY</Label>
                        <select className="microsoft-form-input">
                          <option>123 Main Street</option>
                          <option>456 Oak Avenue, Unit 2B</option>
                        </select>
                      </div>
                      <div>
                        <Label>PAYMENT AMOUNT</Label>
                        <Input type="number" placeholder="Enter amount" className="microsoft-form-input" />
                      </div>
                      <Button className="microsoft-button-primary w-full">
                        <DollarSign className="h-4 w-4 mr-2" />
                        PAY NOW
                      </Button>
                      <div className="text-center">
                        <p className="text-xs text-[var(--microsoft-gray-700)]">Secure payment processing</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">TRANSACTION HISTORY</h3>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>DATE</TableHead>
                      <TableHead>TRANSACTION TYPE</TableHead>
                      <TableHead>PROPERTY</TableHead>
                      <TableHead>AMOUNT</TableHead>
                      <TableHead>STATUS</TableHead>
                      <TableHead>REFERENCE</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propertyTransactions.map((transaction, index) => (
                      <TableRow key={index}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.property}</TableCell>
                        <TableCell>
                          {transaction.amount > 0 ? `$${transaction.amount.toLocaleString()}` : '-'}
                        </TableCell>
                        <TableCell>
                          <Badge className="microsoft-badge-success">
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{transaction.reference}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            RECEIPT
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-6">
              <h3 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">ASSESSMENT HISTORY</h3>
              
              <Card className="microsoft-card">
                <Table className="microsoft-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>TAX YEAR</TableHead>
                      <TableHead>PROPERTY</TableHead>
                      <TableHead>ASSESSED VALUE</TableHead>
                      <TableHead>TAX AMOUNT</TableHead>
                      <TableHead>CHANGE</TableHead>
                      <TableHead>ACTIONS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessmentHistory.map((assessment, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{assessment.year}</TableCell>
                        <TableCell>{assessment.property.split(',')[0]}</TableCell>
                        <TableCell>${assessment.assessedValue.toLocaleString()}</TableCell>
                        <TableCell>${assessment.taxAmount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={assessment.change.includes('+') ? 'microsoft-badge-warning' : 'microsoft-badge-success'}>
                            {assessment.change}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              VIEW DETAILS
                            </Button>
                            <Button variant="outline" size="sm">
                              FILE APPEAL
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            <TabsContent value="search" className="space-y-6">
              <Card className="microsoft-card">
                <div className="microsoft-card-header">
                  <h3 className="font-semibold text-[var(--microsoft-gray-900)]">PROPERTY SEARCH</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Label>SEARCH BY ADDRESS</Label>
                      <Input 
                        placeholder="Enter property address..."
                        value={searchProperty}
                        onChange={(e) => setSearchProperty(e.target.value)}
                        className="microsoft-form-input"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button className="microsoft-button-primary">
                        <Search className="h-4 w-4 mr-2" />
                        SEARCH
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label>PROPERTY TYPE</Label>
                      <select className="microsoft-form-input">
                        <option>All Types</option>
                        <option>Single Family Home</option>
                        <option>Condominium</option>
                        <option>Townhouse</option>
                        <option>Commercial</option>
                      </select>
                    </div>
                    <div>
                      <Label>VALUE RANGE</Label>
                      <select className="microsoft-form-input">
                        <option>Any Value</option>
                        <option>Under $200K</option>
                        <option>$200K - $400K</option>
                        <option>$400K - $600K</option>
                        <option>Over $600K</option>
                      </select>
                    </div>
                    <div>
                      <Label>NEIGHBORHOOD</Label>
                      <select className="microsoft-form-input">
                        <option>All Areas</option>
                        <option>Downtown</option>
                        <option>North Side</option>
                        <option>South Side</option>
                        <option>West End</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {searchProperty && (
                <Card className="microsoft-card">
                  <div className="microsoft-card-header">
                    <h3 className="font-semibold text-[var(--microsoft-gray-900)]">SEARCH RESULTS</h3>
                  </div>
                  <div className="text-center py-8">
                    <p className="text-[var(--microsoft-gray-700)]">Enter a search term to find property records</p>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}