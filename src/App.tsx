import  { useState} from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginPage } from './components/LoginPage';
import { PageLoader } from './components/PageLoader';
import { CitizenDashboard } from './components/CitizenDashboard';
import { OfficerDashboard } from './components/OfficerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplicationSubmission } from './components/ApplicationSubmission';
import { DocumentManagement } from './components/DocumentManagement';


import { Footer } from './components/Footer';
import { CentralAdminSettings } from './components/CentralAdminSettings';
import { UserRoleManagement } from './components/UserRoleManagement';
import { OrganizationHierarchy } from './components/OrganizationHierarchy';
import { WorkflowDesigner } from './components/WorkflowDesigner';
import { NotificationSettings } from './components/NotificationSettings';
import { KYCIntegration } from './components/KYCIntegration';
import { AuditLogsTracking } from './components/AuditLogsTracking';
import { PaymentGatewaySetup } from './components/PaymentGatewaySetup';
import { SystemConfiguration } from './components/SystemConfiguration';
import { APIAccessManagement } from './components/APIAccessManagement';
import { ThemeLanguageSettings } from './components/ThemeLanguageSettings';

import { DashboardConfiguration } from './components/DashboardConfiguration';
import { DataExportSettings } from './components/DataExportSettings';
import { TransportAdminSettings } from './components/TransportAdminSettings';
import { LicenseTypeManagement } from './components/LicenseTypeManagement';
import { FeePenaltyConfiguration } from './components/FeePenaltyConfiguration';
import { DocumentRequirementsSettings } from './components/DocumentRequirementsSettings';
import { OfficerRoleMapping } from './components/OfficerRoleMapping';
import { AppointmentSlotConfiguration } from './components/AppointmentSlotConfiguration';
import { DrivingSchoolIntegration } from './components/DrivingSchoolIntegration';
import { SuspensionRevokeRules } from './components/SuspensionRevokeRules';
import { LicenseTemplateConfiguration } from './components/LicenseTemplateConfiguration';
import { LicenseWorkflowSetup } from './components/LicenseWorkflowSetup';
import { RegionSpecificRules } from './components/RegionSpecificRules';
import { CivilRegistrationAdminSettings } from './components/CivilRegistrationAdminSettings';
import { ApplyDriversLicense } from './components/ApplyDriversLicense';
import { ApplyBirthCertificate } from './components/ApplyBirthCertificate';
import { ApplyDeathCertificate } from './components/ApplyDeathCertificate';
import { TrackApplication } from './components/TrackApplication';
import { PayFees } from './components/PayFees';
import { DownloadDocuments } from './components/DownloadDocuments';
import { FeedbackSupport } from './components/FeedbackSupport';
import { NotificationsCenter } from './components/NotificationsCenter';
import { EditProfile } from './components/EditProfile';
import { ApplyMarriageCertificate } from './components/ApplyMarriageCertificate';
import { ApplyDivorceCertificate } from './components/ApplyDivorceCertificate';
import { ApplyVehicleRegistration } from './components/ApplyVehicleRegistration';
import { OfficerApplicationVerification } from './components/OfficerApplicationVerification';
import { OfficerDocumentReview } from './components/OfficerDocumentReview';
import { OfficerApprovalWorkflow } from './components/OfficerApprovalWorkflow';
import { OfficerAppointmentScheduling } from './components/OfficerAppointmentScheduling';
import { OfficerLicenseIssuance } from './components/OfficerLicenseIssuance';
import { OfficerNotificationManager } from './components/OfficerNotificationManager';
import { OfficerAuditTrail } from './components/OfficerAuditTrail';
import { OfficerReportsPanel } from './components/OfficerReportsPanel';
import { OfficerFormBuilder } from './components/OfficerFormBuilder';
import { OfficerDataExport } from './components/OfficerDataExport';
import { BarChart3, Activity, UserCheck, Map, Settings, ArrowLeft } from 'lucide-react';
import { CentralAdminFormBuilder } from './components/CentralAdminFormBuilder';
import { NotificationManagement } from './components/NotificationManagement';

type UserRole = 'citizen' | 'officer' | 'admin' | null;
type ActiveView = 
  | 'login' 
  | 'citizen-dashboard' 
  | 'officer-dashboard' 
  | 'admin-dashboard'
  | 'application-submission'

  | 'central-admin'
  | 'central-admin-user-role'
  | 'central-admin-org-hierarchy'
  | 'central-admin-workflow'
  | 'central-admin-notifications'
  | 'central-admin-kyc'
  | 'central-admin-audit'
  | 'central-admin-payment'
  | 'central-admin-system'
  | 'central-admin-api'
  | 'central-admin-theme'
  | 'central-admin-dashboard-config'
  | 'central-admin-data-export'
  | 'central-admin-document-center'
  | 'central-admin-civility-dashboard-data-bi-center'
  | 'central-admin-form-builder'
  | 'admin-notifications'
  | 'transport-admin'
  | 'transport-admin-license-type-management'
  | 'transport-admin-fee-penalty-configuration'
  | 'transport-admin-document-requirements'
  | 'transport-admin-officer-role-mapping'
  | 'transport-admin-appointment-slots'
  | 'transport-admin-driving-school-integration'
  | 'transport-admin-suspension-revoke-rules'
  | 'transport-admin-license-template'
  | 'transport-admin-license-workflow'
  | 'transport-admin-region-specific-rules'
  | 'civil-registration-admin'
  | 'civil-registration-birth-certificate-templates'
  | 'civil-registration-birth-hospital-management'
  | 'civil-registration-birth-registrar-assignment'
  | 'civil-registration-birth-field-settings'
  | 'civil-registration-birth-correction-rules'
  | 'civil-registration-birth-sla-settings'
  | 'civil-registration-birth-visibility-settings'
  | 'civil-registration-birth-language-configuration'
  | 'civil-registration-death-certificate-templates'
  | 'civil-registration-death-verification-configuration'
  | 'civil-registration-death-hospital-management'
  | 'civil-registration-death-registrar-assignment'
  | 'civil-registration-death-sla-settings'
  | 'civil-registration-marriage-certificate-templates'
  | 'civil-registration-marriage-officer-mapping'
  | 'civil-registration-marriage-type-management'
  | 'civil-registration-marriage-document-requirements'
  | 'civil-registration-marriage-appointment-slots'
  | 'civil-registration-divorce-certificate-templates'
  | 'civil-registration-divorce-court-mapping'
  | 'civil-registration-divorce-registrar-assignment'
  | 'civil-registration-divorce-visibility-settings'
  | 'civil-registration-divorce-regional-rules'
  | 'help-support'
  | 'apply-drivers-license'
  | 'apply-birth-certificate'
  | 'apply-death-certificate'
  | 'apply-marriage-certificate'
  | 'apply-divorce-certificate'
  | 'apply-vehicle-registration'
  | 'track-application'
  | 'pay-fees'
  | 'download-documents'
  | 'feedback-support'
  | 'notifications-center'
  | 'edit-profile'
  | 'officer-application-verification'
  | 'officer-document-review'
  | 'officer-approval-workflow'
  | 'officer-appointment-scheduling'
  | 'officer-license-issuance'
  | 'officer-notification-manager'
  | 'officer-audit-trail'
  | 'officer-reports-panel'
  | 'officer-form-builder'
  | 'officer-data-export';


  export type AdminUser = {
  id: string;
  name: string;
  role: string;
  adminId: number;
  fullName: string;

};
export interface UserDocument {
  id: string;
  type: string;
  dateIssued: string;
  status: string;
}
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  fullName: string;
  civId: string;
  mobile: string;
  address: {
    line1: string;
    city: string;
    state: string;
  };
  documents: UserDocument[];
  dateOfBirth: number;
  gender: string;
};
export interface RegistrationData {

  personalInfo: {
    name: string;
    age: number;
    email: string;
    fullName: string;
  dateOfBirth: string;
  gender: string;
  mobile : string;
  
  };
  identityProof: {
    type: string;
    number: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    line1: string;
  };
  biometric: {
    fingerprint: string;
    photo: string;
  };
}
export default function App() {
  const [currentUser, setCurrentUser] = useState<UserRole>(null);
  const [activeView, setActiveView] = useState<ActiveView>('login');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true);
    setLoadingMessage('Authenticating...');
    
    // Simulate authentication process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoadingMessage('Setting up your workspace...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setCurrentUser(role);
    if (role === 'citizen') setActiveView('citizen-dashboard');
    else if (role === 'officer') setActiveView('officer-dashboard');
    else if (role === 'admin') setActiveView('admin-dashboard');
    
    setIsLoading(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    setLoadingMessage('Signing out...');
    
    // Simulate logout process
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentUser(null);
    setActiveView('login');
    setSidebarCollapsed(false);
    setIsLoading(false);
  };

  const handleNavigate = async (view: ActiveView): Promise<void> => {
    if (view === activeView) return;
    
    setIsNavigating(true);
    
    // Set appropriate loading message based on destination
    const loadingMessages: Record<ActiveView, string> = {
      'login': 'Loading...',
      'citizen-dashboard': 'Loading dashboard...',
      'officer-dashboard': 'Loading officer dashboard...',
      'admin-dashboard': 'Loading admin dashboard...',
      'application-submission': 'Preparing application form...',


      'central-admin': 'Loading central admin settings...',
      'central-admin-user-role': 'Loading user & role management...',
      'central-admin-org-hierarchy': 'Loading organization hierarchy...',
      'central-admin-workflow': 'Loading workflow designer...',
      'central-admin-notifications': 'Loading notification settings...',
      'central-admin-kyc': 'Loading KYC integration...',
      'central-admin-audit': 'Loading audit logs...',
      'central-admin-payment': 'Loading payment gateway setup...',
      'central-admin-system': 'Loading system configuration...',
      'central-admin-api': 'Loading API access management...',
      'central-admin-theme': 'Loading theme & language settings...',
      'central-admin-dashboard-config': 'Loading dashboard configuration...',
      'central-admin-data-export': 'Loading data export settings...',
      'central-admin-document-center': 'Loading document center...',
      'central-admin-civility-dashboard-data-bi-center': 'Loading Civility Dashboard & BI Center...',
      'central-admin-form-builder': 'Loading form builder interface...',
      'admin-notifications': 'Loading notification management...',
      'transport-admin': 'Loading transport admin settings...',
      'transport-admin-license-type-management': 'Loading license type management...',
      'transport-admin-fee-penalty-configuration': 'Loading fee & penalty configuration...',
      'transport-admin-document-requirements': 'Loading document requirements...',
      'transport-admin-officer-role-mapping': 'Loading officer role mapping...',
      'transport-admin-appointment-slots': 'Loading appointment slots...',
      'transport-admin-driving-school-integration': 'Loading driving school integration...',
      'transport-admin-suspension-revoke-rules': 'Loading suspension rules...',
      'transport-admin-license-template': 'Loading license template configuration...',
      'transport-admin-license-workflow': 'Loading license workflow setup...',
      'transport-admin-region-specific-rules': 'Loading region-specific rules...',
      'civil-registration-admin': 'Loading civil registration settings...',
      'civil-registration-birth-certificate-templates': 'Loading birth certificate templates...',
      'civil-registration-birth-hospital-management': 'Loading hospital management...',
      'civil-registration-birth-registrar-assignment': 'Loading registrar assignment...',
      'civil-registration-birth-field-settings': 'Loading field settings...',
      'civil-registration-birth-correction-rules': 'Loading correction rules...',
      'civil-registration-birth-sla-settings': 'Loading SLA settings...',
      'civil-registration-birth-visibility-settings': 'Loading visibility settings...',
      'civil-registration-birth-language-configuration': 'Loading language configuration...',
      'civil-registration-death-certificate-templates': 'Loading death certificate templates...',
      'civil-registration-death-verification-configuration': 'Loading death verification configuration...',
      'civil-registration-death-hospital-management': 'Loading death hospital management...',
      'civil-registration-death-registrar-assignment': 'Loading death registrar assignment...',
      'civil-registration-death-sla-settings': 'Loading death SLA settings...',
      'civil-registration-marriage-certificate-templates': 'Loading marriage certificate templates...',
      'civil-registration-marriage-officer-mapping': 'Loading marriage officer mapping...',
      'civil-registration-marriage-type-management': 'Loading marriage type management...',
      'civil-registration-marriage-document-requirements': 'Loading marriage document requirements...',
      'civil-registration-marriage-appointment-slots': 'Loading marriage appointment slots...',
      'civil-registration-divorce-certificate-templates': 'Loading divorce certificate templates...',
      'civil-registration-divorce-court-mapping': 'Loading divorce court mapping...',
      'civil-registration-divorce-registrar-assignment': 'Loading divorce registrar assignment...',
      'civil-registration-divorce-visibility-settings': 'Loading divorce visibility settings...',
      'civil-registration-divorce-regional-rules': 'Loading divorce regional rules...',
      'help-support': 'Loading help & support...',
      'apply-drivers-license': 'Loading driver\'s license application...',
      'apply-birth-certificate': 'Loading birth certificate application...',
      'apply-death-certificate': 'Loading death certificate application...',
      'apply-marriage-certificate': 'Loading marriage certificate application...',
      'apply-divorce-certificate': 'Loading divorce certificate application...',
      'apply-vehicle-registration': 'Loading vehicle registration application...',
      'track-application': 'Loading application tracker...',
      'pay-fees': 'Loading payment portal...',
      'download-documents': 'Loading document center...',
      'feedback-support': 'Loading feedback portal...',
      'notifications-center': 'Loading notifications...',
      'edit-profile': 'Loading profile settings...',
      'officer-application-verification': 'Loading application verification...',
      'officer-document-review': 'Loading document review interface...',
      'officer-approval-workflow': 'Loading approval workflow...',
      'officer-appointment-scheduling': 'Loading appointment scheduling...',
      'officer-license-issuance': 'Loading license issuance...',
      'officer-notification-manager': 'Loading notification manager...',
      'officer-audit-trail': 'Loading audit trail...',
      'officer-reports-panel': 'Loading reports panel...',
      'officer-form-builder': 'Loading form builder...',
      'officer-data-export': 'Loading data export interface...'
    };
    
    setLoadingMessage(loadingMessages[view] || 'Loading...');
    
    // Simulate navigation loading with realistic timing
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setActiveView(view);
    setIsNavigating(false);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleCentralAdminNavigation = (submenu: string) => {
    const submenuToView: Record<string, ActiveView> = {
      'user-role-management': 'central-admin-user-role',
      'organization-hierarchy': 'central-admin-org-hierarchy',
      'workflow-designer': 'central-admin-workflow',
      'notification-settings': 'central-admin-notifications',
      'kyc-integration': 'central-admin-kyc',
      'audit-logs': 'central-admin-audit',
      'payment-gateway': 'central-admin-payment',
      'system-configuration': 'central-admin-system',
      'api-access': 'central-admin-api',
      'theme-language': 'central-admin-theme',
      'dashboard-configuration': 'central-admin-dashboard-config',
      'data-export': 'central-admin-data-export',
      'document-center': 'central-admin-document-center',
      'civility-dashboard-data-bi-center': 'central-admin-civility-dashboard-data-bi-center',
      'form-builder': 'central-admin-form-builder'
    };
    
    const targetView = submenuToView[submenu];
    if (targetView) {
      handleNavigate(targetView);
    }
  };

  const handleTransportAdminNavigation = (submenu: string) => {
    const submenuToView: Record<string, ActiveView> = {
      'license-type-management': 'transport-admin-license-type-management',
      'fee-penalty-configuration': 'transport-admin-fee-penalty-configuration',
      'document-requirements': 'transport-admin-document-requirements',
      'officer-role-mapping': 'transport-admin-officer-role-mapping',
      'appointment-slots': 'transport-admin-appointment-slots',
      'driving-school-integration': 'transport-admin-driving-school-integration',
      'suspension-revoke-rules': 'transport-admin-suspension-revoke-rules',
      'license-template': 'transport-admin-license-template',
      'license-workflow': 'transport-admin-license-workflow',
      'region-specific-rules': 'transport-admin-region-specific-rules'
    };
    
    const targetView = submenuToView[submenu];
    if (targetView) {
      handleNavigate(targetView);
    }
  };

  const handleBackToCentralAdmin = () => {
    handleNavigate('central-admin');
  };

  const handleBackToTransportAdmin = () => {
    handleNavigate('transport-admin');
  };

  const handleCivilRegistrationAdminNavigation = (submenu: string) => {
    const submenuToView: Record<string, ActiveView> = {
      'birth-certificate-templates': 'civil-registration-birth-certificate-templates',
      'birth-hospital-management': 'civil-registration-birth-hospital-management',
      'birth-registrar-assignment': 'civil-registration-birth-registrar-assignment',
      'birth-field-settings': 'civil-registration-birth-field-settings',
      'birth-correction-rules': 'civil-registration-birth-correction-rules',
      'birth-sla-settings': 'civil-registration-birth-sla-settings',
      'birth-visibility-settings': 'civil-registration-birth-visibility-settings',
      'birth-language-configuration': 'civil-registration-birth-language-configuration',
      'death-certificate-templates': 'civil-registration-death-certificate-templates',
      'death-verification-configuration': 'civil-registration-death-verification-configuration',
      'death-hospital-management': 'civil-registration-death-hospital-management',
      'death-registrar-assignment': 'civil-registration-death-registrar-assignment',
      'death-sla-settings': 'civil-registration-death-sla-settings',
      'marriage-certificate-templates': 'civil-registration-marriage-certificate-templates',
      'marriage-officer-mapping': 'civil-registration-marriage-officer-mapping',
      'marriage-type-management': 'civil-registration-marriage-type-management',
      'marriage-document-requirements': 'civil-registration-marriage-document-requirements',
      'marriage-appointment-slots': 'civil-registration-marriage-appointment-slots',
      'divorce-certificate-templates': 'civil-registration-divorce-certificate-templates',
      'divorce-court-mapping': 'civil-registration-divorce-court-mapping',
      'divorce-registrar-assignment': 'civil-registration-divorce-registrar-assignment',
      'divorce-visibility-settings': 'civil-registration-divorce-visibility-settings',
      'divorce-regional-rules': 'civil-registration-divorce-regional-rules'
    };
    
    const targetView = submenuToView[submenu];
    if (targetView) {
      handleNavigate(targetView);
    }
  };

  const handleBackToCivilRegistrationAdmin = () => {
    handleNavigate('civil-registration-admin');
  };

  const handleOfficerPortalNavigation = (submenu: string) => {
    const submenuToView: Record<string, ActiveView> = {
      'application-verification': 'officer-application-verification',
      'document-review': 'officer-document-review',
      'approval-workflow': 'officer-approval-workflow',
      'appointment-scheduling': 'officer-appointment-scheduling',
      'license-issuance': 'officer-license-issuance',
      'notification-manager': 'officer-notification-manager',
      'audit-trail': 'officer-audit-trail',
      'reports-panel': 'officer-reports-panel',
      'form-builder': 'officer-form-builder',
      'data-export': 'officer-data-export'
    };
    
    const targetView = submenuToView[submenu];
    if (targetView) {
      handleNavigate(targetView);
    }
  };

  // const handleBackToOfficerDashboard = () => {
  //   handleNavigate('officer-dashboard');
  // };

  const renderMainContent = () => {
    // Show loading spinner in main content area during navigation
    if (isNavigating) {
      return <PageLoader message={loadingMessage} />;
    }

    switch (activeView) {
      case 'citizen-dashboard':
        return <CitizenDashboard  />;
      case 'officer-dashboard':
        return <OfficerDashboard onNavigateToSubmenu={handleOfficerPortalNavigation} />;
      case 'officer-application-verification':
        return <OfficerApplicationVerification />;
      case 'officer-document-review':
        return <OfficerDocumentReview />;
      case 'officer-approval-workflow':
        return <OfficerApprovalWorkflow />;
      case 'officer-appointment-scheduling':
        return <OfficerAppointmentScheduling />;
      case 'officer-license-issuance':
        return <OfficerLicenseIssuance />;
      case 'officer-notification-manager':
        return <OfficerNotificationManager />;
      case 'officer-audit-trail':
        return <OfficerAuditTrail />;
      case 'officer-reports-panel':
        return <OfficerReportsPanel />;
      case 'officer-form-builder':
        return <OfficerFormBuilder />;
      case 'officer-data-export':
        return <OfficerDataExport />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'application-submission':
        return <ApplicationSubmission />;

      case 'central-admin':
        return <CentralAdminSettings onNavigateToSubmenu={handleCentralAdminNavigation} />;
      case 'central-admin-user-role':
        return <UserRoleManagement onBack={handleBackToCentralAdmin} />;
      case 'central-admin-org-hierarchy':
        return <OrganizationHierarchy onBack={handleBackToCentralAdmin} />;
      case 'central-admin-workflow':
        return <WorkflowDesigner onBack={handleBackToCentralAdmin} />;
      case 'central-admin-notifications':
        return <NotificationSettings onBack={handleBackToCentralAdmin} />;
      case 'central-admin-kyc':
        return <KYCIntegration onBack={handleBackToCentralAdmin} />;
      case 'central-admin-audit':
        return <AuditLogsTracking onBack={handleBackToCentralAdmin} />;
      case 'central-admin-payment':
        return <PaymentGatewaySetup onBack={handleBackToCentralAdmin} />;
      case 'central-admin-system':
        return <SystemConfiguration onBack={handleBackToCentralAdmin} />;
      case 'central-admin-api':
        return <APIAccessManagement onBack={handleBackToCentralAdmin} />;
      case 'central-admin-theme':
        return <ThemeLanguageSettings onBack={handleBackToCentralAdmin} />;
      case 'central-admin-dashboard-config':
        return <DashboardConfiguration onBack={handleBackToCentralAdmin} />;
      case 'central-admin-data-export':
        return <DataExportSettings onBack={handleBackToCentralAdmin} />;
      case 'central-admin-document-center':
        return (
          <div className="max-w-full">
            <div className="d365-page-header">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToCentralAdmin}
                    className="d365-button d365-button-secondary btn-with-icon hover:bg-d365-hover transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h1 className="d365-page-title">Document Center</h1>
                </div>
              </div>
              <p className="d365-page-subtitle">
                Manage documents, templates, and file storage settings
              </p>
            </div>
            <DocumentManagement userRole={currentUser} />
          </div>
        );
      case 'central-admin-civility-dashboard-data-bi-center':
        return (
          <div className="max-w-full">
            <div className="d365-page-header">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToCentralAdmin}
                    className="d365-button d365-button-secondary btn-with-icon hover:bg-d365-hover transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h1 className="d365-page-title">Civility Dashboard – Data & BI Center</h1>
                </div>
              </div>
              <p className="d365-page-subtitle">
                Business intelligence, reporting, and analytics dashboard with real-time insights
              </p>
            </div>
            
            {/* BI Center Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="d365-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-caption text-d365-secondary">Applications Today</p>
                    <p className="text-title2 font-semibold">247</p>
                  </div>
                </div>
              </div>
              
              <div className="d365-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-caption text-d365-secondary">This Week</p>
                    <p className="text-title2 font-semibold">1,124</p>
                  </div>
                </div>
              </div>
              
              <div className="d365-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-orange-50">
                    <Settings className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-caption text-d365-secondary">SLA Alerts</p>
                    <p className="text-title2 font-semibold text-orange-600">5</p>
                  </div>
                </div>
              </div>
              
              <div className="d365-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-purple-50">
                    <UserCheck className="h-8 w-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-caption text-d365-secondary">Active Officers</p>
                    <p className="text-title2 font-semibold">23</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: Real-Time Application Overview */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-teal-50">
                  <Activity className="h-6 w-6 text-teal-600" />
                </div>
                <h2 className="text-title2 font-semibold">Real-Time Application Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="d365-card p-6">
                  <h3 className="text-subtitle font-semibold mb-4">Service-wise Distribution</h3>
                  <div className="h-64 flex items-center justify-center bg-d365-surface-secondary rounded-lg">
                    <p className="text-d365-secondary">Pie Chart Placeholder</p>
                  </div>
                </div>
                
                <div className="d365-card p-6">
                  <h3 className="text-subtitle font-semibold mb-4">SLA Breach Risks</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <span className="text-body">Driver's License Applications</span>
                      <span className="text-caption text-red-600 font-medium">3 at risk</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <span className="text-body">Birth Certificate Applications</span>
                      <span className="text-caption text-yellow-600 font-medium">2 at risk</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-body">Marriage Certificate Applications</span>
                      <span className="text-caption text-green-600 font-medium">All on track</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Officer Productivity Tracker */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-amber-50">
                  <UserCheck className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-title2 font-semibold">Officer Productivity Tracker</h2>
              </div>
              
              <div className="d365-card">
                <div className="p-6 border-b border-d365-border">
                  <h3 className="text-subtitle font-semibold">Officer Performance Overview</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-d365-surface-secondary">
                      <tr>
                        <th className="px-6 py-4 text-left text-caption font-semibold text-d365-text-secondary">Officer Name</th>
                        <th className="px-6 py-4 text-left text-caption font-semibold text-d365-text-secondary">Applications Handled</th>
                        <th className="px-6 py-4 text-left text-caption font-semibold text-d365-text-secondary">Avg. SLA Time</th>
                        <th className="px-6 py-4 text-left text-caption font-semibold text-d365-text-secondary">Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-d365-border">
                      <tr>
                        <td className="px-6 py-4 text-body">Officer Sarah Johnson</td>
                        <td className="px-6 py-4 text-body">124</td>
                        <td className="px-6 py-4 text-body">2.1 days</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span>★★★★☆</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-body">Officer Michael Chen</td>
                        <td className="px-6 py-4 text-body">98</td>
                        <td className="px-6 py-4 text-body">3.8 days</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span>★★★☆☆</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-body">Officer Alice Williams</td>
                        <td className="px-6 py-4 text-body">156</td>
                        <td className="px-6 py-4 text-body">1.8 days</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span>★★★★★</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-body">Officer David Brown</td>
                        <td className="px-6 py-4 text-body">87</td>
                        <td className="px-6 py-4 text-body">4.2 days</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span>★★☆☆☆</span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-body">Officer Emma Davis</td>
                        <td className="px-6 py-4 text-body">132</td>
                        <td className="px-6 py-4 text-body">2.6 days</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <span>★★★★☆</span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 3: Zone/District Heatmap Viewer */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-50">
                  <Map className="h-6 w-6 text-emerald-600" />
                </div>
                <h2 className="text-title2 font-semibold">Zone/District Heatmap Viewer</h2>
              </div>
              
              {/* Map Controls */}
              <div className="d365-card p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-caption text-d365-secondary">View:</span>
                      <select className="d365-input px-3 py-1 text-caption">
                        <option>Application Density</option>
                        <option>SLA Performance</option>
                        <option>Both</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-caption text-d365-secondary">Time Period:</span>
                      <select className="d365-input px-3 py-1 text-caption">
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded"></div>
                      <span className="text-caption">Good Performance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                      <span className="text-caption">Moderate</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <span className="text-caption">Needs Attention</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map View */}
              <div className="d365-card p-6 mb-6">
                <div className="h-96 bg-d365-surface-secondary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-16 w-16 text-d365-secondary mx-auto mb-4" />
                    <p className="text-d365-secondary">Interactive Map Visualization</p>
                    <p className="text-caption text-d365-secondary mt-2">
                      Heatmap showing application density and SLA performance by district
                    </p>
                  </div>
                </div>
              </div>

              {/* Zone Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="d365-card p-6">
                  <h4 className="text-subtitle font-semibold mb-3">Top Performing Zones</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-body">Central District</span>
                      <span className="text-caption text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">North Zone</span>
                      <span className="text-caption text-green-600">96.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">East District</span>
                      <span className="text-caption text-green-600">94.8%</span>
                    </div>
                  </div>
                </div>
                
                <div className="d365-card p-6">
                  <h4 className="text-subtitle font-semibold mb-3">High Volume Zones</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-body">Downtown Core</span>
                      <span className="text-caption">342 apps</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">Commercial District</span>
                      <span className="text-caption">289 apps</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">South Zone</span>
                      <span className="text-caption">256 apps</span>
                    </div>
                  </div>
                </div>
                
                <div className="d365-card p-6">
                  <h4 className="text-subtitle font-semibold mb-3">Attention Needed</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-body">West District</span>
                      <span className="text-caption text-red-600">78.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">Rural North</span>
                      <span className="text-caption text-yellow-600">85.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body">Suburban East</span>
                      <span className="text-caption text-yellow-600">87.6%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'central-admin-form-builder':
        return (
          <div className="max-w-full">
            <div className="d365-page-header">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleBackToCentralAdmin}
                    className="d365-button d365-button-secondary btn-with-icon hover:bg-d365-hover transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <h1 className="d365-page-title">Form Builder</h1>
                </div>
              </div>
              <p className="d365-page-subtitle">
                Create and manage dynamic forms with drag-and-drop interface and workflow configuration
              </p>
            </div>
            <CentralAdminFormBuilder />
          </div>
        );
      case 'admin-notifications':
        return <NotificationManagement />;
      case 'transport-admin':
        return <TransportAdminSettings onNavigateToSubmenu={handleTransportAdminNavigation} />;
      case 'transport-admin-license-type-management':
        return <LicenseTypeManagement onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-fee-penalty-configuration':
        return <FeePenaltyConfiguration onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-document-requirements':
        return <DocumentRequirementsSettings onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-officer-role-mapping':
        return <OfficerRoleMapping onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-appointment-slots':
        return <AppointmentSlotConfiguration onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-driving-school-integration':
        return <DrivingSchoolIntegration onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-suspension-revoke-rules':
        return <SuspensionRevokeRules onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-license-template':
        return <LicenseTemplateConfiguration onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-license-workflow':
        return <LicenseWorkflowSetup onBack={handleBackToTransportAdmin} />;
      case 'transport-admin-region-specific-rules':
        return <RegionSpecificRules onBack={handleBackToTransportAdmin} />;
      case 'civil-registration-admin':
        return <CivilRegistrationAdminSettings onNavigateToSubmenu={handleCivilRegistrationAdminNavigation} />;
      case 'civil-registration-birth-certificate-templates':
      case 'civil-registration-birth-hospital-management':
      case 'civil-registration-birth-registrar-assignment':
      case 'civil-registration-birth-field-settings':
      case 'civil-registration-birth-correction-rules':
      case 'civil-registration-birth-sla-settings':
      case 'civil-registration-birth-visibility-settings':
      case 'civil-registration-birth-language-configuration':
      case 'civil-registration-death-certificate-templates':
      case 'civil-registration-death-verification-configuration':
      case 'civil-registration-death-hospital-management':
      case 'civil-registration-death-registrar-assignment':
      case 'civil-registration-death-sla-settings':
      case 'civil-registration-marriage-certificate-templates':
      case 'civil-registration-marriage-officer-mapping':
      case 'civil-registration-marriage-type-management':
      case 'civil-registration-marriage-document-requirements':
      case 'civil-registration-marriage-appointment-slots':
      case 'civil-registration-divorce-certificate-templates':
      case 'civil-registration-divorce-court-mapping':
      case 'civil-registration-divorce-registrar-assignment':
      case 'civil-registration-divorce-visibility-settings':
      case 'civil-registration-divorce-regional-rules':
        return <CivilRegistrationAdminSettings 
          onNavigateToSubmenu={handleCivilRegistrationAdminNavigation} 
          currentSubmenu={activeView}
          onBack={handleBackToCivilRegistrationAdmin}
        />;
      case 'apply-drivers-license':
        return <ApplyDriversLicense />;
      case 'apply-birth-certificate':
        return <ApplyBirthCertificate />;
      case 'apply-death-certificate':
        return <ApplyDeathCertificate />;
      case 'apply-marriage-certificate':
        return <ApplyMarriageCertificate />;
      case 'apply-divorce-certificate':
        return <ApplyDivorceCertificate />;
      case 'apply-vehicle-registration':
        return <ApplyVehicleRegistration />;
      case 'track-application':
        return <TrackApplication />;
      case 'pay-fees':
        return <PayFees />;
      case 'download-documents':
        return <DownloadDocuments />;
      case 'feedback-support':
        return <FeedbackSupport />;
      case 'notifications-center':
        return <NotificationsCenter />;
      case 'edit-profile':
        return <EditProfile />;
      default:
        return <div>Page not found</div>;
    }
  };

  // Show full screen loading during initial authentication or logout
  if (isLoading) {
    return <PageLoader message={loadingMessage} fullScreen={true} />;
  }

  // Show login page if no user is authenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-d365-background">
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  // Main application layout with Dynamics 365 structure
  return (
    <div className="min-h-screen bg-d365-background">
      {/* Sidebar Navigation */}
      <Sidebar
        currentUser={currentUser}
        activeView={activeView}
       onNavigate={(view) => handleNavigate(view as ActiveView)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Top Header */}
      <Header
        currentUser={currentUser}
        sidebarCollapsed={sidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className={`d365-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className={`content-transition ${isNavigating ? 'loading' : 'loaded'}`}>
          {renderMainContent()}
        </div>
        <Footer variant="minimal" className="mt-8" />
      </main>
    </div>
  );
}