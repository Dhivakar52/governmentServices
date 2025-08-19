import { Button } from './ui/button';
import { Shield, Users, Lock, FileText, CheckCircle, Star, Globe, UserCog } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onAdminLogin?: () => void;
}

export function LandingPage({ onGetStarted, onLogin, onAdminLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Official Header */}
      <div className="official-banner text-center py-2 px-4">
        <p>Digital Identity Platform</p>
      </div>

      {/* Main Header */}
      <header className="government-header text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="government-seal">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">DIGITAL IDENTITY PLATFORM</h1>
                <p className="text-sm text-blue-100">Government Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={onLogin}
                className="border-2 border-white text-white font-semibold bg-transparent hover:bg-white hover:text-[var(--microsoft-blue)] transition-all duration-200 px-6 py-2"
                style={{
                  borderColor: '#ffffff',
                  color: '#ffffff',
                  fontWeight: '600'
                }}
              >
                SIGN IN
              </Button>
              {onAdminLogin && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={onAdminLogin}
                  className="bg-[var(--microsoft-blue-light)] text-[var(--microsoft-blue-dark)] hover:bg-white hover:text-[var(--microsoft-blue)] border border-[var(--microsoft-blue-light)] font-semibold transition-all duration-200 px-4 py-2"
                  style={{
                    backgroundColor: '#deecf9',
                    color: '#106ebe',
                    borderColor: '#deecf9',
                    fontWeight: '600'
                  }}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  ADMIN
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[var(--microsoft-gray-50)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-[var(--microsoft-blue-light)] text-[var(--microsoft-blue-dark)] rounded-md text-sm font-semibold">
                <Star className="h-4 w-4 mr-2" />
                Enterprise-Grade Security
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--microsoft-gray-900)] mb-6">
              SECURE DIGITAL IDENTITY
              <span className="block text-[var(--microsoft-blue)]">FOR MODERN ORGANIZATIONS</span>
            </h1>
            <p className="text-xl text-[var(--microsoft-gray-700)] mb-8 leading-relaxed">
              Comprehensive digital identity management platform with enterprise-grade security. 
              Secure authentication, document management, and seamless integration across your enterprise ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted} 
                className="px-8 py-4 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white font-semibold border-none"
                style={{
                  backgroundColor: 'var(--microsoft-blue)',
                  color: '#ffffff',
                  fontWeight: '600'
                }}
              >
                GET STARTED
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={onLogin} 
                className="px-8 py-4 border-2 border-[var(--microsoft-blue)] text-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue)] hover:text-white font-semibold transition-all duration-200"
                style={{
                  borderColor: 'var(--microsoft-blue)',
                  color: 'var(--microsoft-blue)',
                  fontWeight: '600'
                }}
              >
                SIGN IN TO PORTAL
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[var(--microsoft-gray-900)] mb-4">
              ENTERPRISE IDENTITY FEATURES
            </h2>
            <p className="text-xl text-[var(--microsoft-gray-700)] max-w-3xl mx-auto">
              Built with enterprise-grade security and compliance standards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="microsoft-card text-center hover:shadow-lg transition-shadow">
              <div className="bg-[var(--microsoft-blue)] w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--microsoft-gray-900)]">ENTERPRISE SECURITY</h3>
              <p className="text-[var(--microsoft-gray-700)]">
                Multi-factor authentication and biometric verification with industry-leading security protocols
              </p>
            </div>

            <div className="microsoft-card text-center hover:shadow-lg transition-shadow">
              <div className="bg-[var(--microsoft-blue)] w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--microsoft-gray-900)]">GLOBAL INTEGRATION</h3>
              <p className="text-[var(--microsoft-gray-700)]">
                Seamless integration with enterprise applications and identity providers worldwide
              </p>
            </div>

            <div className="microsoft-card text-center hover:shadow-lg transition-shadow">
              <div className="bg-[var(--microsoft-blue)] w-16 h-16 rounded-md flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[var(--microsoft-gray-900)]">DOCUMENT MANAGEMENT</h3>
              <p className="text-[var(--microsoft-gray-700)]">
                Secure document storage and digital signatures with enterprise-grade encryption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Process */}
      <section className="py-16 bg-[var(--microsoft-gray-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-[var(--microsoft-gray-900)] mb-4">
              STREAMLINED ONBOARDING PROCESS
            </h2>
            <p className="text-xl text-[var(--microsoft-gray-700)]">
              Quick and secure identity verification in five simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { step: 1, title: 'Personal Information', icon: Users, desc: 'Enter basic profile details' },
              { step: 2, title: 'Identity Verification', icon: FileText, desc: 'Upload identity documents' },
              { step: 3, title: 'Address Details', icon: Users, desc: 'Confirm address information' },
              { step: 4, title: 'Biometric Setup', icon: Shield, desc: 'Secure biometric enrollment' },
              { step: 5, title: 'Account Activation', icon: CheckCircle, desc: 'Activate your digital identity' }
            ].map(({ step, title, icon: Icon, desc }) => (
              <div key={step} className="text-center">
                <div className="microsoft-card mb-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-[var(--microsoft-blue-light)] text-[var(--microsoft-blue-dark)] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-semibold">
                    {step}
                  </div>
                  <Icon className="h-8 w-8 text-[var(--microsoft-blue)] mx-auto mb-3" />
                  <h4 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">{title}</h4>
                  <p className="text-sm text-[var(--microsoft-gray-700)]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[var(--microsoft-blue)] text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold mb-4">
            START YOUR DIGITAL TRANSFORMATION
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of organizations using our secure digital identity platform
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-[var(--microsoft-blue)] hover:bg-[var(--microsoft-gray-100)] font-semibold border-none"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--microsoft-blue)',
              fontWeight: '600'
            }}
          >
            BEGIN REGISTRATION
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--microsoft-gray-900)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="government-seal">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Digital Identity Platform</h3>
                  <p className="text-sm text-gray-300">Enterprise Identity Solution</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Enterprise-grade digital identity management solution with trusted security infrastructure.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">PLATFORM FEATURES</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Single Sign-On Integration</li>
                <li>• Multi-Factor Authentication</li>
                <li>• Digital Document Management</li>
                <li>• Biometric Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">SUPPORT & RESOURCES</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Help Center: 1-800-IDENTITY</li>
                <li>• Technical Support: 24/7 Available</li>
                <li>• Documentation Portal</li>
                <li>• Community Forums</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-sm text-gray-300">
              © 2025 Digital Identity Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}