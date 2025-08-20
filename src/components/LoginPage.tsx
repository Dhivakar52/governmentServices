import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {  CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  Users, 
  Building2, 
  Mail, 
  Lock, 
  Phone, 
  CreditCard,
  Car,
  FileText,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import civilityLogo from '../assets/dummy_logo.jpg';
import xpLogo from '../assets/dummy_logo.jpg';

type UserRole = 'citizen' | 'officer' | 'admin' | null;

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nationalId: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-d365-primary via-blue-800 to-d365-primary flex items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex flex-col items-center space-y-4">
              <img 
                src={civilityLogo} 
                alt="Civility" 
                className="h-16 w-auto object-contain"
              />
              <div className="text-center">
                <p className="text-subtitle text-white/80">
                  Republic of Utopia Government Services
                </p>
              </div>
            </div>
          </div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Secure Digital Government Services for the Republic of Utopia
          </p>
          <div className="flex items-center justify-center space-x-8 mt-6 text-white/70">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Secure</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Efficient</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Accessible</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features Panel */}
          <div className="space-y-6">
            <div className="d365-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-d365-primary/10 rounded-xl">
                  <Shield className="w-8 h-8 text-d365-primary" />
                </div>
                <div>
                  <h3 className="text-title2 font-semibold text-d365-primary">
                    Enterprise-Grade Security
                  </h3>
                  <p className="text-body text-d365-secondary">
                    Advanced encryption and multi-factor authentication
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="d365-card p-6">
                <div className="p-3 bg-blue-50 rounded-lg w-fit mb-4">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-subtitle font-semibold text-d365-primary mb-2">Transport Services</h4>
                <p className="text-body text-d365-secondary">
                  Driver's License, Vehicle Registration &amp; Permits
                </p>
              </div>
              
              <div className="d365-card p-6">
                <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-subtitle font-semibold text-d365-primary mb-2">Civil Registry</h4>
                <p className="text-body text-d365-secondary">
                  Birth/Death Certificates &amp; Marriage Records
                </p>
              </div>
              
              <div className="d365-card p-6">
                <div className="p-3 bg-purple-50 rounded-lg w-fit mb-4">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-subtitle font-semibold text-d365-primary mb-2">Business Services</h4>
                <p className="text-body text-d365-secondary">
                  Company Registration &amp; Trade Permits
                </p>
              </div>
              
              <div className="d365-card p-6">
                <div className="p-3 bg-orange-50 rounded-lg w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-subtitle font-semibold text-d365-primary mb-2">Tax Services</h4>
                <p className="text-body text-d365-secondary">
                  Tax Filing, Compliance &amp; Refunds
                </p>
              </div>
            </div>

            <Alert className="border-blue-200 bg-blue-50">
              <Shield className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Security Notice:</strong> Your data is protected with end-to-end encryption and follows international security standards (ISO 27001, SOC 2).
              </AlertDescription>
            </Alert>
          </div>

          {/* Login Panel */}
          <div className="d365-card shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-title1 font-semibold text-d365-primary">Sign In</CardTitle>
              <CardDescription className="text-subtitle text-d365-secondary">
                Access your government services account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="citizen" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="citizen" className="text-body">
                    <Users className="h-4 w-4 mr-2" />
                    Citizen
                  </TabsTrigger>
                  <TabsTrigger value="officer" className="text-body">
                    <Shield className="h-4 w-4 mr-2" />
                    Officer
                  </TabsTrigger>
                  <TabsTrigger value="admin" className="text-body">
                    <Building2 className="h-4 w-4 mr-2" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="citizen" className="space-y-6 mt-8">
                  <div className="space-y-3">
                    <Label htmlFor="nationalId" className="text-body font-medium text-d365-primary">
                      National ID Number
                    </Label>
                    <div className="d365-input-with-icon">
                      <CreditCard className="input-icon w-5 h-5" />
                      <input
                        id="nationalId"
                        type="text"
                        placeholder="Enter your National ID number"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-body font-medium text-d365-primary">
                      Phone Number
                    </Label>
                    <div className="d365-input-with-icon">
                      <Phone className="input-icon w-5 h-5" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    className="d365-button d365-button-primary w-full h-12 text-subtitle font-medium"
                    onClick={() => handleLogin('citizen')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Verifying Identity...' : 'Sign In as Citizen'}
                  </Button>
                  
                  <p className="text-center text-body text-d365-secondary">
                    Don't have an account? <button className="text-d365-primary hover:underline font-medium">Register here</button>
                  </p>
                </TabsContent>

                <TabsContent value="officer" className="space-y-6 mt-8">
                  <div className="space-y-3">
                    <Label htmlFor="officerEmail" className="text-body font-medium text-d365-primary">
                      Official Email Address
                    </Label>
                    <div className="d365-input-with-icon">
                      <Mail className="input-icon w-5 h-5" />
                      <input
                        id="officerEmail"
                        type="email"
                        placeholder="Enter your government email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="officerPassword" className="text-body font-medium text-d365-primary">
                      Password
                    </Label>
                    <div className="d365-input-with-icon">
                      <Lock className="input-icon w-5 h-5" />
                      <input
                        id="officerPassword"
                        type="password"
                        placeholder="Enter your secure password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    className="d365-button d365-button-primary w-full h-12 text-subtitle font-medium"
                    onClick={() => handleLogin('officer')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Authenticating...' : 'Sign In as Officer'}
                  </Button>
                  
                  <p className="text-center text-body text-d365-secondary">
                    <button className="text-d365-primary hover:underline font-medium">Forgot your password?</button>
                  </p>
                </TabsContent>

                <TabsContent value="admin" className="space-y-6 mt-8">
                  <div className="space-y-3">
                    <Label htmlFor="adminEmail" className="text-body font-medium text-d365-primary">
                      Administrator Email
                    </Label>
                    <div className="d365-input-with-icon">
                      <Mail className="input-icon w-5 h-5" />
                      <input
                        id="adminEmail"
                        type="email"
                        placeholder="Enter administrator email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="adminPassword" className="text-body font-medium text-d365-primary">
                      Administrator Password
                    </Label>
                    <div className="d365-input-with-icon">
                      <Lock className="input-icon w-5 h-5" />
                      <input
                        id="adminPassword"
                        type="password"
                        placeholder="Enter administrator password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button 
                    className="d365-button d365-button-primary w-full h-12 text-subtitle font-medium"
                    onClick={() => handleLogin('admin')}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Authenticating...' : 'Sign In as Administrator'}
                  </Button>
                  
                  <p className="text-center text-body text-d365-secondary">
                    <button className="text-d365-primary hover:underline font-medium">Need access? Contact IT Support</button>
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/60">
          <div className="flex items-center justify-center space-x-6 text-sm mb-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Accessibility</span>
            <span className="hover:text-white cursor-pointer">Contact Support</span>
          </div>
          <p className="text-sm mb-4">
            © 2025 Government of the Republic of Utopia. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-2 opacity-75">
            <span className="text-xs">Powered by</span>
            <img 
              src={xpLogo} 
              alt="Xnterprise" 
              className="h-4 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}