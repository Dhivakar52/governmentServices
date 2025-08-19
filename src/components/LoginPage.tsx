import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Shield, Smartphone, QrCode, Mail, AlertTriangle, CheckCircle, UserCog, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (emailOrMobile: string) => void;
  onBack: () => void;
  userType: 'citizen' | 'admin';
}

export function LoginPage({ onLogin, onBack, userType }: LoginPageProps) {
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = userType === 'admin';

  const sendOtp = () => {
    if (!emailOrMobile.trim()) return;
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setShowOtp(true);
      setOtpTimer(60);
      setIsLoading(false);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const handlePasswordLogin = () => {
    if (emailOrMobile && password) {
      onLogin(emailOrMobile);
    }
  };

  const verifyOtp = () => {
    if (otp === '123456' || otp.length === 6) {
      onLogin(emailOrMobile);
    }
  };

  const handleQrLogin = () => {
    // Simulate QR code login
    onLogin('qr-user@example.com');
  };

  return (
    <div className="min-h-screen bg-[var(--microsoft-gray-50)]">
      {/* Official Government Header */}
      <div className="bg-[var(--microsoft-blue)] text-white text-center py-2 px-4">
        <p className="text-xs font-medium">
          🔒 {isAdmin ? 'RESTRICTED ADMINISTRATIVE ACCESS' : 'OFFICIAL GOVERNMENT PORTAL'} - AUTHORIZED PERSONNEL ONLY 🔒
        </p>
      </div>

      <header className="microsoft-nav border-b border-[var(--microsoft-gray-200)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="mr-4 text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              RETURN TO PORTAL
            </Button>
            <div className="flex items-center space-x-3">
              <div className="bg-[var(--microsoft-blue)] w-10 h-10 rounded-md flex items-center justify-center">
                {isAdmin ? (
                  <UserCog className="h-6 w-6 text-white" />
                ) : (
                  <Shield className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[var(--microsoft-gray-900)]">
                  {isAdmin ? 'ADMINISTRATIVE AUTHENTICATION' : 'CITIZEN AUTHENTICATION'}
                </h1>
                <p className="text-xs text-[var(--microsoft-gray-700)]">Government Platform</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Security Notice */}
        <div className={`formal-card p-4 mb-8 border-l-4 ${
          isAdmin 
            ? 'bg-red-50 border-l-red-400' 
            : 'bg-blue-50 border-l-blue-400'
        }`}>
          <div className="flex">
            {isAdmin ? (
              <Lock className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
            ) : (
              <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5" />
            )}
            <div>
              <h4 className={`font-semibold ${
                isAdmin ? 'text-red-800' : 'text-blue-800'
              }`}>
                {isAdmin ? 'RESTRICTED ADMINISTRATIVE AREA' : 'SECURE ACCESS PORTAL'}
              </h4>
              <p className={`text-sm ${
                isAdmin ? 'text-red-700' : 'text-blue-700'
              }`}>
                {isAdmin 
                  ? 'This area is restricted to authorized government personnel only. All access is monitored and logged.'
                  : 'This is an official government authentication system protected by national security protocols.'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[var(--microsoft-gray-900)] mb-2">
            {isAdmin ? 'ADMINISTRATOR ACCESS' : 'WELCOME BACK, CITIZEN'}
          </h1>
          <p className="text-[var(--microsoft-gray-700)]">
            {isAdmin 
              ? 'Access the Digital Identity administrative console'
              : 'Access your official digital identity dashboard and government services'
            }
          </p>
        </div>

        {isAdmin ? (
          // Admin Login Form
          <Card className="formal-card p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="adminEmail" className="text-[var(--microsoft-gray-900)]">
                  ADMINISTRATOR EMAIL / USERNAME
                </Label>
                <Input
                  id="adminEmail"
                  type="text"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="Enter your administrator credentials"
                  className="h-12"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="adminPassword" className="text-[var(--microsoft-gray-900)]">
                  SECURE PASSWORD
                </Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secure password"
                  className="h-12"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-xs text-yellow-700 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  For demonstration: Use any email and password to access admin dashboard
                </p>
              </div>

              <Button 
                onClick={handlePasswordLogin} 
                className="w-full h-12 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                disabled={!emailOrMobile.trim() || !password.trim()}
              >
                <Lock className="h-4 w-4 mr-2" />
                ACCESS ADMIN CONSOLE
              </Button>
            </div>
          </Card>
        ) : (
          // Citizen Login Tabs
          <Tabs defaultValue="credentials" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-[var(--microsoft-gray-100)]">
              <TabsTrigger 
                value="credentials" 
                className="flex items-center space-x-2 data-[state=active]:bg-[var(--microsoft-blue)] data-[state=active]:text-white font-semibold"
              >
                <Smartphone className="h-4 w-4" />
                <span>OFFICIAL CREDENTIALS</span>
              </TabsTrigger>
              <TabsTrigger 
                value="qr" 
                className="flex items-center space-x-2 data-[state=active]:bg-[var(--microsoft-blue)] data-[state=active]:text-white font-semibold"
              >
                <QrCode className="h-4 w-4" />
                <span>MOBILE APP</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="credentials">
              <Card className="formal-card p-8">
                <div className="space-y-6">
                  {!showOtp ? (
                    <>
                      <div className="space-y-3">
                        <Label htmlFor="emailOrMobile" className="text-[var(--microsoft-gray-900)]">
                          REGISTERED EMAIL OR MOBILE NUMBER
                        </Label>
                        <Input
                          id="emailOrMobile"
                          type="text"
                          value={emailOrMobile}
                          onChange={(e) => setEmailOrMobile(e.target.value)}
                          placeholder="Enter your registered email or mobile number"
                          className="h-12"
                        />
                        <p className="text-xs text-[var(--microsoft-gray-500)]">
                          Use the email or mobile number registered with your Digital ID
                        </p>
                      </div>
                      <Button 
                        onClick={sendOtp} 
                        className="w-full h-12 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                        disabled={!emailOrMobile.trim() || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                            SENDING SECURE CODE...
                          </>
                        ) : (
                          <>
                            <Mail className="h-4 w-4 mr-2" />
                            SEND VERIFICATION CODE
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-center space-y-4">
                        <div className="bg-[var(--microsoft-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                          <Mail className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--microsoft-gray-900)]">VERIFICATION CODE SENT</h3>
                          <p className="text-sm text-[var(--microsoft-gray-700)] mt-2">
                            A secure 6-digit verification code has been sent to
                          </p>
                          <p className="font-medium text-[var(--microsoft-blue)]">{emailOrMobile}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-3">
                          <Label htmlFor="otp" className="text-[var(--microsoft-gray-900)]">
                            ENTER VERIFICATION CODE
                          </Label>
                          <Input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="Enter 6-digit code"
                            className="h-12 text-center text-2xl tracking-widest"
                            maxLength={6}
                          />
                          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                            <p className="text-xs text-yellow-700 flex items-center">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              For demonstration purposes, use code: <span className="font-semibold ml-1">123456</span>
                            </p>
                          </div>
                        </div>

                        <Button 
                          onClick={verifyOtp} 
                          className="w-full h-12 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                          disabled={otp.length !== 6}
                        >
                          VERIFY & ACCESS PORTAL
                        </Button>

                        <div className="text-center">
                          {otpTimer > 0 ? (
                            <p className="text-sm text-[var(--microsoft-gray-700)]">
                              Resend verification code in <span className="font-semibold">{otpTimer}s</span>
                            </p>
                          ) : (
                            <Button 
                              variant="link" 
                              onClick={sendOtp} 
                              className="text-sm text-[var(--microsoft-blue)]"
                            >
                              RESEND VERIFICATION CODE
                            </Button>
                          )}
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowOtp(false);
                          setOtp('');
                          setOtpTimer(0);
                        }}
                        className="w-full"
                      >
                        USE DIFFERENT CREDENTIALS
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="qr">
              <Card className="formal-card p-8">
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <div className="bg-[var(--microsoft-blue)] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <QrCode className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--microsoft-gray-900)]">MOBILE APP LOGIN</h3>
                      <p className="text-sm text-[var(--microsoft-gray-700)] mt-2">
                        Scan this QR code with the official Digital Identity mobile application
                      </p>
                    </div>
                  </div>

                  {/* QR Code Placeholder */}
                  <div className="bg-white border-4 border-[var(--microsoft-blue)] rounded-lg p-8 mx-auto max-w-xs">
                    <div className="w-48 h-48 bg-[var(--microsoft-gray-100)] rounded-lg flex items-center justify-center mx-auto border-2 border-dashed border-[var(--microsoft-gray-300)]">
                      <div className="grid grid-cols-8 gap-1 w-32 h-32">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-[var(--microsoft-blue)]' : 'bg-transparent'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--microsoft-gray-500)] mt-2 text-center">
                      Official Government QR Code
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-[var(--microsoft-gray-50)] border border-[var(--microsoft-gray-200)] rounded-md p-4">
                      <p className="text-xs text-[var(--microsoft-gray-700)]">
                        Don't have the official mobile app?
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        DOWNLOAD OFFICIAL APP
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleQrLogin} 
                    className="w-full bg-[var(--microsoft-blue-light)] text-[var(--microsoft-blue-dark)] hover:bg-[var(--microsoft-blue)] hover:text-white border border-[var(--microsoft-blue-light)]"
                  >
                    SIMULATE MOBILE APP LOGIN
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--microsoft-gray-700)]">
            {isAdmin ? (
              <>
                Not an administrator?{' '}
                <Button 
                  variant="link" 
                  onClick={onBack} 
                  className="p-0 h-auto text-[var(--microsoft-blue)] font-semibold"
                >
                  CITIZEN LOGIN
                </Button>
              </>
            ) : (
              <>
                New citizen registration required?{' '}
                <Button 
                  variant="link" 
                  onClick={onBack} 
                  className="p-0 h-auto text-[var(--microsoft-blue)] font-semibold"
                >
                  CREATE DIGITAL IDENTITY
                </Button>
              </>
            )}
          </p>
        </div>

        {/* Security Footer */}
        <div className="mt-8 formal-card p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-xs text-[var(--microsoft-gray-700)]">
                <strong>Security Notice:</strong> This portal uses government-grade encryption. 
                Never share your login credentials. Report suspicious activity to the 
                National Cybersecurity Authority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}