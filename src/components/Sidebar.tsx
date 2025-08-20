import React, { useState } from 'react';
import { Logo } from './Logo';
import { 
  Home, 
  FileText, 
  BarChart3, 
  Bell, 
  Settings,
  Car,
  ChevronRight,
  Menu,
  X,
  Building2,
  LifeBuoy,
  Shield,
  CreditCard,
  Download,
  MessageSquare,
  UserCheck,
  Search,
  Baby,
  Heart,
  HeartHandshake,
  Scale,
  Truck,
  Calendar,
  Edit,
  Database
} from 'lucide-react';

interface SidebarProps {
  currentUser: 'citizen' | 'officer' | 'admin';
  activeView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: ('citizen' | 'officer' | 'admin')[];
  submenu?: NavItem[];
}

// Help Modal Component
const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center help-modal-content">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-d365-border">
          <div className="flex items-center gap-3">
            <LifeBuoy className="h-6 w-6 text-d365-primary" />
            <h2 className="text-title2 font-semibold text-d365-text-primary">Help & Support Center</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded hover:bg-d365-surface-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 help-contact-grid">
            {/* Contact Support */}
            <div className="help-contact-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600">📞</span>
                </div>
                <h3 className="font-semibold text-d365-text-primary">Contact Support</h3>
              </div>
              <p className="text-body text-d365-text-secondary mb-3">
                For technical assistance and general inquiries
              </p>
              <div className="space-y-2 text-caption text-d365-text-secondary">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">📧</span>
                  <span>support@civility.gov.uto</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">📞</span>
                  <span>+256-800-CIVILITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">🕒</span>
                  <span>Mon-Fri 8:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Emergency Support */}
            <div className="help-contact-card help-emergency-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-600">🚨</span>
                </div>
                <h3 className="font-semibold text-red-700">Emergency Support</h3>
              </div>
              <p className="text-body text-red-600 mb-3">
                For urgent system issues and critical problems
              </p>
              <div className="space-y-2 text-caption text-red-600">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">🔴</span>
                  <span>+256-911-URGENT</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 text-center">⚡</span>
                  <span>Available 24/7 for critical issues</span>
                </div>
              </div>
            </div>

            {/* Documentation */}
            <div className="help-contact-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600">📚</span>
                </div>
                <h3 className="font-semibold text-d365-text-primary">Documentation</h3>
              </div>
              <p className="text-body text-d365-text-secondary mb-3">
                Access user guides and system documentation
              </p>
              <div className="space-y-1">
                <div className="help-resource-link text-caption">
                  • Getting Started Guide
                </div>
                <div className="help-resource-link text-caption">
                  • Application Process Manual
                </div>
                <div className="help-resource-link text-caption">
                  • Troubleshooting Guide
                </div>
                <div className="help-resource-link text-caption">
                  • API Documentation
                </div>
              </div>
            </div>

            {/* Training Resources */}
            <div className="help-contact-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600">🎓</span>
                </div>
                <h3 className="font-semibold text-d365-text-primary">Training Resources</h3>
              </div>
              <p className="text-body text-d365-text-secondary mb-3">
                Educational materials and video tutorials
              </p>
              <div className="space-y-1">
                <div className="help-resource-link text-caption">
                  • Video Tutorials
                </div>
                <div className="help-resource-link text-caption">
                  • Webinar Recordings
                </div>
                <div className="help-resource-link text-caption">
                  • Best Practices Guide
                </div>
                <div className="help-resource-link text-caption">
                  • Officer Training Modules
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 p-4 bg-d365-surface-secondary rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-medium text-d365-text-primary">System Status: Operational</span>
            </div>
            <p className="text-caption text-d365-text-secondary">
              All services are running normally. Last updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-d365-surface-secondary border-t border-d365-border rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-caption text-d365-text-secondary">
              <Shield className="w-4 h-4" />
              <span>Republic of Utopia - Department of Social Development</span>
            </div>
            <button
              onClick={onClose}
              className="d365-button-primary px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export function Sidebar({ currentUser, activeView, onNavigate, collapsed, onToggleCollapse }: SidebarProps) {
  const [_expandedMenus, _setExpandedMenus] = useState<string[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      roles: ['citizen', 'officer', 'admin']
    },
    // Citizen Portal Items
    {
      id: 'apply-drivers-license',
      label: 'Apply for Driver\'s License',
      icon: Car,
      roles: ['citizen']
    },
    {
      id: 'apply-birth-certificate',
      label: 'Apply for Birth Certificate',
      icon: Baby,
      roles: ['citizen']
    },
    {
      id: 'apply-death-certificate',
      label: 'Apply for Death Certificate',
      icon: Heart,
      roles: ['citizen']
    },
    {
      id: 'apply-marriage-certificate',
      label: 'Apply for Marriage Certificate',
      icon: HeartHandshake,
      roles: ['citizen']
    },
    {
      id: 'apply-divorce-certificate',
      label: 'Apply for Divorce Certificate',
      icon: Scale,
      roles: ['citizen']
    },
    {
      id: 'apply-vehicle-registration',
      label: 'Apply for Vehicle Registration',
      icon: Truck,
      roles: ['citizen']
    },
    {
      id: 'track-application',
      label: 'Track Application',
      icon: Search,
      roles: ['citizen']
    },
    {
      id: 'pay-fees',
      label: 'Pay Fees / Penalties',
      icon: CreditCard,
      roles: ['citizen']
    },
    {
      id: 'download-documents',
      label: 'Download Documents',
      icon: Download,
      roles: ['citizen']
    },
    {
      id: 'feedback-support',
      label: 'Feedback & Support',
      icon: MessageSquare,
      roles: ['citizen']
    },
    {
      id: 'notifications-center',
      label: 'Notifications',
      icon: Bell,
      roles: ['citizen']
    },
    {
      id: 'edit-profile',
      label: 'Edit Profile / KYC',
      icon: UserCheck,
      roles: ['citizen']
    },
    // Officer Portal Items
    {
      id: 'officer-application-verification',
      label: 'Application Verification',
      icon: UserCheck,
      roles: ['officer']
    },
    {
      id: 'officer-document-review',
      label: 'Document Review Interface',
      icon: FileText,
      roles: ['officer']
    },
    {
      id: 'officer-approval-workflow',
      label: 'Approval Workflow',
      icon: Settings,
      roles: ['officer']
    },
    {
      id: 'officer-appointment-scheduling',
      label: 'Appointment Scheduling',
      icon: Calendar,
      roles: ['officer']
    },
    {
      id: 'officer-license-issuance',
      label: 'License Issuance',
      icon: Download,
      roles: ['officer']
    },
    {
      id: 'officer-notification-manager',
      label: 'Notification Manager',
      icon: Bell,
      roles: ['officer']
    },
    {
      id: 'officer-audit-trail',
      label: 'Audit Trail',
      icon: Shield,
      roles: ['officer']
    },
    {
      id: 'officer-reports-panel',
      label: 'Reports Panel',
      icon: BarChart3,
      roles: ['officer']
    },
    {
      id: 'officer-form-builder',
      label: 'Form Builder',
      icon: Edit,
      roles: ['officer']
    },
    {
      id: 'officer-data-export',
      label: 'Data Export',
      icon: Database,
      roles: ['officer']
    },
    // Admin Portal Items - Reordered per requirements
    {
      id: 'admin-notifications',
      label: 'Notifications',
      icon: Bell,
      roles: ['admin']
    },
    {
      id: 'central-admin',
      label: 'Central Admin Settings',
      icon: Settings,
      roles: ['admin']
    },
    {
      id: 'transport-admin',
      label: 'Transport Admin Settings',
      icon: Car,
      roles: ['admin']
    },
    {
      id: 'civil-registration-admin',
      label: 'Civil Registration Admin Settings',
      icon: Building2,
      roles: ['admin']
    }
  ];

  // const toggleMenu = (menuId: string) => {
  //   setExpandedMenus(prev => 
  //     prev.includes(menuId) 
  //       ? prev.filter(id => id !== menuId)
  //       : [...prev, menuId]
  //   );
  // };

  const handleNavClick = (itemId: string) => {
    if (itemId === 'dashboard') {
      if (currentUser === 'citizen') onNavigate('citizen-dashboard');
      else if (currentUser === 'officer') onNavigate('officer-dashboard');
      else if (currentUser === 'admin') onNavigate('admin-dashboard');
    } else if (itemId === 'central-admin') {
      onNavigate('central-admin');
    } else if (itemId === 'transport-admin') {
      onNavigate('transport-admin');
    } else if (itemId === 'civil-registration-admin') {
      onNavigate('civil-registration-admin');
    } else if (itemId === 'admin-notifications') {
      onNavigate('admin-notifications');
    } else if (itemId === 'help-support') {
      setIsHelpModalOpen(true);
    } else {
      onNavigate(itemId);
    }
    
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const isTransportAdminActive = () => {
    return activeView === 'transport-admin' || 
           activeView.startsWith('transport-admin-');
  };

  const isCentralAdminActive = () => {
    return activeView === 'central-admin' || activeView.startsWith('central-admin-');
  };

  const isCivilRegistrationAdminActive = () => {
    return activeView === 'civil-registration-admin';
  };

  const filteredNavItems = navItems.filter(item => item.roles.includes(currentUser));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-d365-surface border border-d365-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        d365-sidebar 
        ${collapsed ? 'collapsed' : ''} 
        ${isMobileOpen ? 'mobile-open' : ''}
        lg:translate-x-0 z-50
      `}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Logo className="h-8 w-8 flex-shrink-0" showText={false} />
            {!collapsed && (
              <div>
                <h1 className="font-semibold text-d365-primary">Civility</h1>
                <p className="text-caption text-d365-secondary">KOAN</p>
              </div>
            )}
          </div>
          
          {/* Collapse Button - Hidden on mobile */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1 rounded hover:bg-sidebar-item-hover transition-colors"
          >
            <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = 
              (item.id === 'dashboard' && (
                activeView === 'citizen-dashboard' || 
                activeView === 'officer-dashboard' || 
                activeView === 'admin-dashboard'
              )) ||
              (item.id === 'central-admin' && isCentralAdminActive()) ||
              (item.id === 'transport-admin' && isTransportAdminActive()) ||
              (item.id === 'civil-registration-admin' && isCivilRegistrationAdminActive()) ||
              (item.id === 'admin-notifications' && activeView === 'admin-notifications') ||
              activeView === item.id;

            return (
              <div key={item.id}>
                <div
                  className={`d365-sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="flex-1 font-medium">{item.label}</span>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom Fixed Elements */}
        <div className="mt-auto">
          {/* Help & Support */}
          <div className="px-4 pb-3">
            <div
              className={`d365-sidebar-item cursor-pointer ${collapsed ? 'justify-center' : ''}`}
              onClick={() => handleNavClick('help-support')}
              title={collapsed ? 'Help & Support' : ''}
            >
              <LifeBuoy className="h-5 w-5 flex-shrink-0 text-d365-primary" />
              {!collapsed && (
                <span className="flex-1 font-medium text-d365-primary">Help & Support</span>
              )}
            </div>
          </div>

          {/* Government Identity Section */}
          {!collapsed && (
            <div className="px-4 pb-4 border-t border-sidebar-border pt-4">
              <div className="text-center space-y-1">
                {/* Republic of Utopia */}
                <div className="text-caption font-medium text-d365-text-primary">
                  Republic of Utopia
                </div>
                
                {/* Department */}
                <div className="text-caption text-d365-text-secondary">
                  Dept. of Social Development
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Help Modal */}
      <HelpModal 
        isOpen={isHelpModalOpen} 
        onClose={() => setIsHelpModalOpen(false)} 
      />
    </>
  );
}