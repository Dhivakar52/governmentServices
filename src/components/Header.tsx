import  { useState } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown,
  HelpCircle,
  MessageSquare,

} from 'lucide-react';


type UserRole = 'citizen' | 'officer' | 'admin' | null;

interface HeaderProps {
  currentUser: UserRole;
  sidebarCollapsed: boolean;
  onLogout: () => void;
}

export function Header({ currentUser, sidebarCollapsed, onLogout }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getUserDisplayName = () => {
    switch (currentUser) {
      case 'citizen':
        return { name: 'John Doe', email: 'john.doe@email.com', role: 'Citizen' };
      case 'officer':
        return { name: 'Sarah Johnson', email: 'sarah.j@gov.utopia', role: 'Government Officer' };
      case 'admin':
        return { name: 'Admin User', email: 'admin@gov.utopia', role: 'System Administrator' };
      default:
        return { name: 'User', email: '', role: '' };
    }
  };

  const user = getUserDisplayName();



  return (
    <header className={`d365-header ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Left Section - Search */}
      <div className="flex items-center flex-1 max-w-2xl">
        <div className="d365-input-with-icon flex-1 max-w-md">
          <Search className="input-icon w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications, services, and more..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      {/* Right Section - User & Notifications */}
      <div className="flex items-center space-x-2">
        {/* Help */}
        <button 
          className="p-2 hover:bg-d365-hover rounded-md transition-colors icon-text"
          title="Help & Support"
        >
          <HelpCircle className="w-5 h-5 text-d365-secondary" />
        </button>

        {/* Support */}
        <button 
          className="p-2 hover:bg-d365-hover rounded-md transition-colors icon-text"
          title="Contact Support"
        >
          <MessageSquare className="w-5 h-5 text-d365-secondary" />
        </button>

        {/* Notifications */}
        <button 
          className="p-2 hover:bg-d365-hover rounded-md transition-colors relative icon-text"
          title="Notifications"
        >
          <Bell className="w-5 h-5 text-d365-secondary" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-caption font-medium">3</span>
          </span>
        </button>

        {/* Settings */}
        <button 
          className="p-2 hover:bg-d365-hover rounded-md transition-colors icon-text"
          title="Settings"
        >
          <Settings className="w-5 h-5 text-d365-secondary" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-3 px-3 py-2 hover:bg-d365-hover rounded-md transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-body font-medium text-d365-primary">{user.name}</div>
              <div className="text-caption text-d365-secondary">{user.role}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-d365-secondary" />
          </button>

          {/* User Dropdown */}
          {userMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-card rounded-lg shadow-xl border border-d365 z-50 slide-in-left">
              {/* User Info Header */}
              <div className="p-4 border-b border-d365">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-subtitle font-medium text-d365-primary">{user.name}</div>
                    <div className="text-body text-d365-secondary">{user.email}</div>
                    <div className="text-caption text-d365-secondary">{user.role}</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-body text-d365-primary hover:bg-d365-hover rounded-md transition-colors icon-text">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-body text-d365-primary hover:bg-d365-hover rounded-md transition-colors icon-text">
                  <Settings className="w-4 h-4" />
                  <span>Account Settings</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-body text-d365-primary hover:bg-d365-hover rounded-md transition-colors icon-text">
                  <Bell className="w-4 h-4" />
                  <span>Notifications</span>
                </button>
                <button className="w-full text-left px-3 py-2 text-body text-d365-primary hover:bg-d365-hover rounded-md transition-colors icon-text">
                  <HelpCircle className="w-4 h-4" />
                  <span>Help &amp; Support</span>
                </button>
                
                <div className="border-t border-d365 my-2"></div>
                
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full text-left px-3 py-2 text-body text-destructive hover:bg-destructive/10 rounded-md transition-colors icon-text"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}