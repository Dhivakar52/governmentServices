import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { RegistrationWizard } from './components/RegistrationWizard';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { AdminDashboard } from './components/AdminDashboard';

export interface User {
  civId: string;
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
  gender: string;
  address: {
    line1: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    state: string;
  };
  documents: Array<{
    id: string;
    type: string;
    dateIssued: string;
    status: 'active' | 'expired' | 'pending';
  }>;
}

export interface AdminUser {
  adminId: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
  permissions: string[];
}

export interface RegistrationData {
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    mobile: string;
  };
  identityProof: {
    governmentId: File | null;
    selfie: File | null;
    matchSuccess: boolean;
  };
  address: {
    line1: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
    state: string;
  };
  biometric: {
    completed: boolean;
    scanType: 'fingerprint' | 'face';
  };
}

type Page = 'landing' | 'registration' | 'login' | 'dashboard' | 'admin-login' | 'admin-dashboard';
type UserType = 'citizen' | 'admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [_userType, setUserType] = useState<UserType>('citizen');
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      gender: '',
      email: '',
      mobile: ''
    },
    identityProof: {
      governmentId: null,
      selfie: null,
      matchSuccess: false
    },
    address: {
      line1: '',
      city: '',
      district: '',
      postalCode: '',
      country: '',
      state: ''
    },
    biometric: {
      completed: false,
      scanType: 'fingerprint'
    }
  });

  const handleRegistrationComplete = (civId: string) => {
    const newUser: User = {
      civId,
      fullName: registrationData.personalInfo.fullName,
      email: registrationData.personalInfo.email,
      mobile: registrationData.personalInfo.mobile,
      dateOfBirth: registrationData.personalInfo.dateOfBirth,
      gender: registrationData.personalInfo.gender,
      address: registrationData.address,
      documents: [
        {
          id: '1',
          type: 'Birth Certificate',
          dateIssued: 'Jan 15, 2025',
          status: 'active'
        },
        {
          id: '2',
          type: 'National ID',
          dateIssued: 'Dec 10, 2024',
          status: 'active'
        },
        {
          id: '3',
          type: 'Address Proof',
          dateIssued: 'Nov 20, 2024',
          status: 'pending'
        }
      ]
    };
    setUser(newUser);
    setCurrentPage('dashboard');
  };

  const handleLogin = (emailOrMobile: string) => {
    // Simulate citizen login
    const mockUser: User = {
      civId: 'CIV-2025-001234',
      fullName: 'John Doe',
      email: emailOrMobile.includes('@') ? emailOrMobile : 'john.doe@email.com',
      mobile: emailOrMobile.includes('@') ? '+1234567890' : emailOrMobile,
      dateOfBirth: '1990-01-15',
      gender: 'male',
      address: {
        line1: '123 Main Street',
        city: 'Springfield',
        district: 'Central',
        postalCode: '12345',
        country: 'United States',
        state: 'Illinois'
      },
      documents: [
        {
          id: '1',
          type: 'Birth Certificate',
          dateIssued: 'Jan 15, 2025',
          status: 'active'
        },
        {
          id: '2',
          type: 'National ID',
          dateIssued: 'Dec 10, 2024',
          status: 'active'
        },
        {
          id: '3',
          type: 'Address Proof',
          dateIssued: 'Nov 20, 2024',
          status: 'pending'
        }
      ]
    };
    setUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleAdminLogin = (emailOrUsername: string) => {
    // Simulate admin login
    const mockAdminUser: AdminUser = {
      adminId: 'ADM-2025-001',
      fullName: 'Sarah Al-Mansouri',
      email: emailOrUsername.includes('@') ? emailOrUsername : 'sarah.almansouri@digitalservices.gov',
      role: 'Senior Digital Services Administrator',
      department: 'Ministry of Digital Services',
      permissions: ['dashboard', 'citizen_management', 'smart_wallet', 'govchat', 'voting', 'healthcare', 'system_monitoring', 'api_access', 'admin_users']
    };
    setAdminUser(mockAdminUser);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setAdminUser(null);
    setUserType('citizen');
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage
            onGetStarted={() => setCurrentPage('registration')}
            onLogin={() => {
              setUserType('citizen');
              setCurrentPage('login');
            }}
            onAdminLogin={() => {
              setUserType('admin');
              setCurrentPage('admin-login');
            }}
          />
        );
      case 'registration':
        return (
          <RegistrationWizard
            data={registrationData}
            onDataChange={setRegistrationData}
            onComplete={handleRegistrationComplete}
            onBack={() => setCurrentPage('landing')}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('landing')}
            userType="citizen"
          />
        );
      case 'admin-login':
        return (
          <LoginPage
            onLogin={handleAdminLogin}
            onBack={() => setCurrentPage('landing')}
            userType="admin"
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            user={user!}
            onLogout={handleLogout}
          />
        );
      case 'admin-dashboard':
        return (
          <AdminDashboard
            adminUser={adminUser!}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <LandingPage 
            onGetStarted={() => setCurrentPage('registration')} 
            onLogin={() => setCurrentPage('login')}
            onAdminLogin={() => setCurrentPage('admin-login')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
}