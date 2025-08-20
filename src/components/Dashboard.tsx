import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  LogOut, 
  Download, 
  User ,
  Bell,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  Building,
  BookOpen,
  FileText,
  PenTool
} from 'lucide-react';
import { DocumentsPage } from './dashboard/DocumentsPage';
import { DigitalSignaturePage } from './dashboard/DigitalSignaturePage';
import { OverviewPage } from './dashboard/OverviewPage';
import { ServicesPage } from './dashboard/ServicesPage';
import { 
  SIDEBAR_ITEMS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_ACCOUNT_SETTINGS, 
  INITIAL_FEEDBACK_FORM,
  FAQ_ITEMS,
  HELP_GUIDES,
  CONTACT_INFO,
  FEEDBACK_TYPES,
  type Notification,
  type DashboardPage
} from './dashboard/dashboardConstants';
import type { User as AppUser  } from '../App';


interface DashboardProps {
  user: AppUser;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showHelpSupport, setShowHelpSupport] = useState(false);
  const [_showServiceModal, setShowServiceModal] = useState(false);
  const [_selectedService, setSelectedService] = useState<any>(null);
  
  // State management
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [accountSettings, setAccountSettings] = useState(INITIAL_ACCOUNT_SETTINGS);
  const [profileForm, setProfileForm] = useState({
    email: user.email,
    mobile: user.mobile,
    address: `${user.address.line1}, ${user.address.city}, ${user.address.state}`
  });
  const [feedbackForm, setFeedbackForm] = useState(INITIAL_FEEDBACK_FORM);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Event handlers
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const handleProfileUpdate = () => {
    console.log('Profile update:', profileForm);
    alert('Profile updated successfully!');
  };

  const handleFeedbackSubmit = () => {
    console.log('Feedback submitted:', feedbackForm);
    setFeedbackForm(INITIAL_FEEDBACK_FORM);
    alert('Feedback submitted successfully!');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage user={user} />;
      case 'documents':
        return <DocumentsPage documents={user.documents} />;
      case 'signature':
        return <DigitalSignaturePage user={user} />;
      case 'services':
        return <ServicesPage onServiceClick={handleServiceClick} />;
      default:
        return <OverviewPage user={user} />;
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      BookOpen, FileText, PenTool, Shield, Phone, Mail, Building
    };
    return icons[iconName] || FileText;
  };

  return (
    <div className="min-h-screen flex w-full bg-[var(--microsoft-gray-50)]">
      {/* Sidebar */}
      <div className={`microsoft-sidebar transition-all duration-300 flex flex-col ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      } fixed left-0 top-0 h-full z-10`}>
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {!sidebarCollapsed && (
              <div className="microsoft-card bg-[var(--microsoft-blue-light)] text-[var(--microsoft-blue-dark)] flex-1 mr-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-[var(--microsoft-blue)] w-8 h-8 rounded-md flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-xs">DIGITAL IDENTITY</h2>
                    <p className="text-xs opacity-80">Government Platform</p>
                  </div>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] p-2"
            >
              {sidebarCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="microsoft-card bg-white border border-[var(--microsoft-gray-200)] mb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="bg-[var(--microsoft-blue)] w-8 h-8 rounded-md flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--microsoft-gray-500)] uppercase tracking-wide">CITIZEN</p>
                    <p className="font-semibold text-[var(--microsoft-gray-900)] text-sm">{user.fullName}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--microsoft-gray-700)]">ID: {user.civId}</p>
                <div className="microsoft-badge microsoft-badge-success">
                  VERIFIED CITIZEN
                </div>
                <p className="text-xs text-[var(--microsoft-green)] flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  AUTHORIZED ACCESS
                </p>
              </div>
            </div>
          )}

          {/* Collapsed User Info */}
          {sidebarCollapsed && (
            <div className="mb-6 text-center">
              <div className="bg-[var(--microsoft-blue)] w-10 h-10 rounded-md flex items-center justify-center mx-auto mb-2">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="bg-[var(--microsoft-green)] w-3 h-3 rounded-full mx-auto" title="Verified Citizen" />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {!sidebarCollapsed && (
              <p className="text-xs text-[var(--microsoft-gray-500)] uppercase tracking-wide mb-3 px-2">CITIZEN SERVICES</p>
            )}
            <div className="space-y-1">
              {SIDEBAR_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full ${
                      sidebarCollapsed ? 'justify-center p-3' : 'justify-start px-3 py-2'
                    } text-xs font-semibold transition-all ${
                      isActive 
                        ? "bg-[var(--microsoft-blue)] text-white hover:bg-[var(--microsoft-blue-secondary)]" 
                        : "text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)]"
                    }`}
                    onClick={() => setCurrentPage(item.id as DashboardPage)}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                    {!sidebarCollapsed && (
                      <span className={sidebarCollapsed ? 'sr-only' : ''}>{item.label}</span>
                    )}
                  </Button>
                );
              })}
            </div>
          </nav>

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div className="space-y-1 mb-6">
              <p className="text-xs text-[var(--microsoft-gray-500)] uppercase tracking-wide mb-3 px-2">QUICK ACTIONS</p>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] relative px-3 py-2"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-4 w-4 mr-3" />
                NOTIFICATIONS
                {unreadCount > 0 && (
                  <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 h-5">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] px-3 py-2"
                onClick={() => setShowAccountSettings(true)}
              >
                <Settings className="h-4 w-4 mr-3" />
                ACCOUNT SETTINGS
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-xs text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] px-3 py-2"
                onClick={() => setShowHelpSupport(true)}
              >
                <HelpCircle className="h-4 w-4 mr-3" />
                HELP & SUPPORT
              </Button>
            </div>
          )}

          {/* Collapsed Quick Actions */}
          {sidebarCollapsed && (
            <div className="space-y-1 mb-6">
              {[
                { icon: Bell, title: "Notifications", onClick: () => setShowNotifications(true), badge: unreadCount },
                { icon: Settings, title: "Settings", onClick: () => setShowAccountSettings(true) },
                { icon: HelpCircle, title: "Help", onClick: () => setShowHelpSupport(true) }
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-center p-3 text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] relative"
                  title={item.title}
                  onClick={item.onClick}
                >
                  <item.icon className="h-4 w-4" />
                  {item.badge && item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </div>
                  )}
                </Button>
              ))}
            </div>
          )}

          {/* Logout */}
          <div className="mt-auto pt-4">
            <Button
              variant="ghost"
              className={`w-full ${
                sidebarCollapsed ? 'justify-center p-3' : 'justify-start px-3 py-2'
              } text-xs text-[var(--microsoft-red)] hover:text-[var(--microsoft-red)] hover:bg-red-50`}
              onClick={onLogout}
              title={sidebarCollapsed ? "Secure Logout" : undefined}
            >
              <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
              {!sidebarCollapsed && "SECURE LOGOUT"}
            </Button>
          </div>
        </div>
      </div>

      <main className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-80'} transition-all duration-300`}>
        {/* Official Header */}
        <div className="bg-[var(--microsoft-blue)] text-white text-center py-1 px-4">
          <p className="text-xs font-medium">🔒 OFFICIAL GOVERNMENT PORTAL - AUTHORIZED ACCESS ONLY 🔒</p>
        </div>
        
        <header className="microsoft-nav sticky top-0 z-5">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">
                  {SIDEBAR_ITEMS.find(item => item.id === currentPage)?.label || 'CITIZEN DASHBOARD'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="microsoft-badge microsoft-badge-success">
                  SESSION ACTIVE
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  EXPORT DATA
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {renderContent()}
        </div>
      </main>

      {/* Notifications Modal */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                GOVERNMENT NOTIFICATIONS
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  MARK ALL READ
                </Button>
              )}
            </DialogTitle>
            <DialogDescription>
              View and manage your official government notifications and alerts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`formal-card p-4 cursor-pointer transition-colors ${
                  !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'bg-gray-50'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-100 text-green-600' :
                    notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    notification.type === 'error' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'success' && <CheckCircle className="h-4 w-4" />}
                    {notification.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                    {notification.type === 'error' && <X className="h-4 w-4" />}
                    {notification.type === 'info' && <Info className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-[var(--microsoft-gray-900)]">{notification.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {notification.category}
                        </Badge>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[var(--microsoft-gray-700)] mb-2">{notification.message}</p>
                    <p className="text-xs text-[var(--microsoft-gray-500)]">{new Date(notification.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Account Settings Modal */}
      <Dialog open={showAccountSettings} onOpenChange={setShowAccountSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              ACCOUNT SETTINGS
            </DialogTitle>
            <DialogDescription>
              Manage your account profile, security settings, and notification preferences.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">PROFILE</TabsTrigger>
              <TabsTrigger value="security">SECURITY</TabsTrigger>
              <TabsTrigger value="notifications">NOTIFICATIONS</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <Card className="formal-card p-4">
                <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">PERSONAL INFORMATION</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>FULL NAME</Label>
                    <Input value={user.fullName} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>CITIZEN ID</Label>
                    <Input value={user.civId} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>EMAIL ADDRESS</Label>
                    <Input 
                      value={profileForm.email}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>MOBILE NUMBER</Label>
                    <Input 
                      value={profileForm.mobile}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, mobile: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label>ADDRESS</Label>
                    <Textarea 
                      value={profileForm.address}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                    />
                  </div>
                </div>
                <Button 
                  className="mt-4 bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                  onClick={handleProfileUpdate}
                >
                  UPDATE PROFILE
                </Button>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4">
              <Card className="formal-card p-4">
                <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">SECURITY SETTINGS</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">Add an extra layer of security</p>
                    </div>
                    <Switch 
                      checked={accountSettings.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, twoFactorAuth: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Biometric Login</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">Use fingerprint or face recognition</p>
                    </div>
                    <Switch 
                      checked={accountSettings.biometricLogin}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, biometricLogin: checked }))
                      }
                    />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full mb-2">
                      CHANGE PASSWORD
                    </Button>
                    <Button variant="outline" className="w-full">
                      VIEW LOGIN HISTORY
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4">
              <Card className="formal-card p-4">
                <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">NOTIFICATION PREFERENCES</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={accountSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">Receive updates via SMS</p>
                    </div>
                    <Switch 
                      checked={accountSettings.smsNotifications}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, smsNotifications: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">Important security notifications</p>
                    </div>
                    <Switch 
                      checked={accountSettings.securityAlerts}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, securityAlerts: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Service Updates</p>
                      <p className="text-sm text-[var(--microsoft-gray-700)]">New government services and features</p>
                    </div>
                    <Switch 
                      checked={accountSettings.marketingEmails}
                      onCheckedChange={(checked) => 
                        setAccountSettings(prev => ({ ...prev, marketingEmails: checked }))
                      }
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Help & Support Modal */}
      <Dialog open={showHelpSupport} onOpenChange={setShowHelpSupport}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[var(--microsoft-gray-900)] flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              HELP & SUPPORT CENTER
            </DialogTitle>
            <DialogDescription>
              Find answers to common questions, access user guides, and get assistance with your digital identity services.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="faq" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">GUIDES</TabsTrigger>
              <TabsTrigger value="contact">CONTACT</TabsTrigger>
              <TabsTrigger value="feedback">FEEDBACK</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-4">
                {FAQ_ITEMS.map((faq, index) => (
                  <Card key={index} className="formal-card p-4">
                    <h4 className="font-semibold text-[var(--microsoft-gray-900)] mb-2">{faq.question}</h4>
                    <p className="text-sm text-[var(--microsoft-gray-700)]">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="guides" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {HELP_GUIDES.map((guide, index) => {
                  const Icon = getIconComponent(guide.icon);
                  return (
                    <Card key={index} className="formal-card p-4 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[var(--microsoft-blue)]/10 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-[var(--microsoft-blue)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-[var(--microsoft-gray-900)]">{guide.title}</p>
                          <p className="text-sm text-[var(--microsoft-gray-700)]">{guide.desc}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="contact" className="space-y-4">
              <Card className="formal-card p-4">
                <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">CONTACT INFORMATION</h3>
                <div className="space-y-3">
                  {CONTACT_INFO.map((contact, index) => {
                    const Icon = getIconComponent(contact.icon);
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className="h-4 w-4 text-[var(--microsoft-blue)]" />
                        <span>{contact.text}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="feedback" className="space-y-4">
              <Card className="formal-card p-4">
                <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">SUBMIT FEEDBACK</h3>
                <div className="space-y-4">
                  <div>
                    <Label>FEEDBACK TYPE</Label>
                    <select
                      className="w-full p-2 border border-[var(--microsoft-gray-300)] rounded-md"
                      value={feedbackForm.type}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, type: e.target.value }))}
                    >
                      {FEEDBACK_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label>MESSAGE</Label>
                    <Textarea
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please share your feedback..."
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={handleFeedbackSubmit}
                    disabled={!feedbackForm.message}
                    className="bg-[var(--microsoft-blue)] hover:bg-[var(--microsoft-blue-secondary)] text-white"
                  >
                    SUBMIT FEEDBACK
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}