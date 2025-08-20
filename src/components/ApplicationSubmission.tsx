import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Car, 
  Upload, 
  FileText, 
  CreditCard, 
  Camera,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

type ApplicationStep = 1 | 2 | 3 | 4;

export function ApplicationSubmission() {
  const [currentStep, setCurrentStep] = useState<ApplicationStep>(1);
  const [formData, setFormData] = useState({
    applicationType: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationalId: '',
      phoneNumber: '',
      email: '',
      address: ''
    },
    licenseInfo: {
      licenseType: '',
      previousLicense: '',
      medicalCertificate: null,
      eyeTestCertificate: null
    },
    documents: {
      photo: null,
      signature: null,
      proofOfResidence: null,
      birthCertificate: null
    },
    fees: {
      applicationFee: 5000,
      processingFee: 2000,
      total: 7000
    }
  });

  const steps = [
    { number: 1, title: 'Application Type', description: 'Select service' },
    { number: 2, title: 'Personal Information', description: 'Your details' },
    { number: 3, title: 'Documents Upload', description: 'Required documents' },
    { number: 4, title: 'Payment & Submit', description: 'Review and pay' }
  ];

  const getStepProgress = () => (currentStep / 4) * 100;

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        // ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => (prev + 1) as ApplicationStep);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => (prev - 1) as ApplicationStep);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Application Type</h3>
              <Tabs defaultValue="transport" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transport">Transport Services</TabsTrigger>
                  <TabsTrigger value="civil">Civil Registry</TabsTrigger>
                </TabsList>
                <TabsContent value="transport" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={`cursor-pointer border-2 ${formData.applicationType === 'new-license' ? 'border-primary' : 'border-border'}`}
                          onClick={() => handleInputChange('', 'applicationType', 'new-license')}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <Car className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">New Driver's License</h4>
                            <p className="text-sm text-muted-foreground">Apply for first-time license</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦7,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className={`cursor-pointer border-2 ${formData.applicationType === 'renewal-license' ? 'border-primary' : 'border-border'}`}
                          onClick={() => handleInputChange('', 'applicationType', 'renewal-license')}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Car className="h-6 w-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">License Renewal</h4>
                            <p className="text-sm text-muted-foreground">Renew existing license</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦5,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer border-2 ${formData.applicationType === 'vehicle-registration' ? 'border-primary' : 'border-border'}`}
                          onClick={() => handleInputChange('', 'applicationType', 'vehicle-registration')}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-full">
                            <Car className="h-6 w-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Vehicle Registration</h4>
                            <p className="text-sm text-muted-foreground">Register new vehicle</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦15,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`cursor-pointer border-2 ${formData.applicationType === 'duplicate-license' ? 'border-primary' : 'border-border'}`}
                          onClick={() => handleInputChange('', 'applicationType', 'duplicate-license')}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-100 rounded-full">
                            <FileText className="h-6 w-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Duplicate License</h4>
                            <p className="text-sm text-muted-foreground">Replace lost/damaged license</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦4,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="civil" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="cursor-pointer border-2 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <FileText className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Birth Certificate</h4>
                            <p className="text-sm text-muted-foreground">Request birth certificate</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦3,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="cursor-pointer border-2 border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gray-100 rounded-full">
                            <FileText className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">Death Certificate</h4>
                            <p className="text-sm text-muted-foreground">Request death certificate</p>
                            <p className="text-sm font-medium text-green-600">Fee: ₦3,000</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {formData.applicationType && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Selected: {formData.applicationType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}. 
                  Processing time: 5-10 business days.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationalId">National ID Number</Label>
                <Input
                  id="nationalId"
                  value={formData.personalInfo.nationalId}
                  onChange={(e) => handleInputChange('personalInfo', 'nationalId', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  value={formData.personalInfo.phoneNumber}
                  onChange={(e) => handleInputChange('personalInfo', 'phoneNumber', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Residential Address</Label>
              <Textarea
                id="address"
                value={formData.personalInfo.address}
                onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
              />
            </div>
            
            {formData.applicationType?.includes('license') && (
              <div className="space-y-4">
                <h4 className="font-semibold">License Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>License Type</Label>
                    <Select onValueChange={(value) => handleInputChange('licenseInfo', 'licenseType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class-a">Class A - Motorcycle</SelectItem>
                        <SelectItem value="class-b">Class B - Private Car</SelectItem>
                        <SelectItem value="class-c">Class C - Commercial</SelectItem>
                        <SelectItem value="class-d">Class D - Heavy Duty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.applicationType === 'renewal-license' && (
                    <div className="space-y-2">
                      <Label htmlFor="previousLicense">Previous License Number</Label>
                      <Input
                        id="previousLicense"
                        value={formData.licenseInfo.previousLicense}
                        onChange={(e) => handleInputChange('licenseInfo', 'previousLicense', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Document Upload</h3>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please upload clear, high-quality images. All documents must be valid and current.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label className="cursor-pointer">
                      <span className="font-medium text-primary">Upload Passport Photo</span>
                      <input type="file" className="hidden" accept="image/*" />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label className="cursor-pointer">
                      <span className="font-medium text-primary">Upload Signature</span>
                      <input type="file" className="hidden" accept="image/*" />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Clear signature on white paper</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label className="cursor-pointer">
                      <span className="font-medium text-primary">Birth Certificate</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">PDF or Image format</p>
                  </div>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label className="cursor-pointer">
                      <span className="font-medium text-primary">Proof of Residence</span>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">Utility bill or bank statement</p>
                  </div>
                </div>
              </div>
            </div>

            {formData.applicationType?.includes('license') && (
              <div className="space-y-4">
                <h4 className="font-semibold">Medical Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label className="cursor-pointer">
                        <span className="font-medium text-primary">Medical Certificate</span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">From registered medical center</p>
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label className="cursor-pointer">
                        <span className="font-medium text-primary">Eye Test Certificate</span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Valid eye test result</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review &amp; Payment</h3>
            
            <Card>
              <CardHeader>
                <CardTitle>Application Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Application Type:</span>
                  <span className="font-medium">{formData.applicationType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Applicant Name:</span>
                  <span className="font-medium">{formData.personalInfo.firstName} {formData.personalInfo.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span>National ID:</span>
                  <span className="font-medium">{formData.personalInfo.nationalId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{formData.personalInfo.email}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Application Fee:</span>
                  <span>₦{formData.fees.applicationFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span>₦{formData.fees.processingFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Amount:</span>
                    <span>₦{formData.fees.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <CreditCard className="h-6 w-6" />
                    <span>Debit/Credit Card</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Bank Transfer</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Mobile Money</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and confirm that all information provided is accurate.
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">New Application</h1>
        <p className="text-muted-foreground">Complete your government service application</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of 4</span>
          <span className="text-sm text-muted-foreground">{Math.round(getStepProgress())}% Complete</span>
        </div>
        <Progress value={getStepProgress()} className="mb-4" />
        
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.number 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="space-x-2">
          {currentStep < 4 ? (
            <Button onClick={nextStep} disabled={!formData.applicationType}>
              Next
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              Submit Application &amp; Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}