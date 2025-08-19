import { Button } from '../ui/button';
import { 
  Shield, 
  UserCog,
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { ADMIN_NAVIGATION_ITEMS, type AdminPage } from './adminConstants';
import type { AdminUser } from '../../App';

interface AdminSidebarProps {
  adminUser: AdminUser;
  currentPage: AdminPage;
  sidebarCollapsed: boolean;
  onPageChange: (page: AdminPage) => void;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export function AdminSidebar({
  adminUser,
  currentPage,
  sidebarCollapsed,
  onPageChange,
  onToggleSidebar,
  onLogout
}: AdminSidebarProps) {
  return (
    <div className="microsoft-sidebar h-full flex flex-col">
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
                  <h2 className="font-semibold text-xs">ADMIN CONSOLE</h2>
                  <p className="text-xs opacity-80">Government Platform</p>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="text-[var(--microsoft-gray-700)] hover:bg-[var(--microsoft-gray-200)] p-2"
          >
            {sidebarCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Admin Info */}
        {!sidebarCollapsed && (
          <div className="microsoft-card bg-white border border-[var(--microsoft-gray-200)] mb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="bg-[var(--microsoft-blue)] w-8 h-8 rounded-md flex items-center justify-center">
                  <UserCog className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[var(--microsoft-gray-500)] uppercase tracking-wide">ADMINISTRATOR</p>
                  <p className="font-semibold text-[var(--microsoft-gray-900)] text-sm">{adminUser.fullName}</p>
                </div>
              </div>
              <p className="text-xs text-[var(--microsoft-gray-700)]">{adminUser.role}</p>
              <div className="microsoft-badge microsoft-badge-primary">
                ID: {adminUser.adminId}
              </div>
              <p className="text-xs text-[var(--microsoft-green)] flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                AUTHORIZED ACCESS
              </p>
            </div>
          </div>
        )}

        {/* Collapsed Admin Info */}
        {sidebarCollapsed && (
          <div className="mb-6 text-center">
            <div className="bg-[var(--microsoft-blue)] w-10 h-10 rounded-md flex items-center justify-center mx-auto mb-2">
              <UserCog className="h-5 w-5 text-white" />
            </div>
            <div className="bg-[var(--microsoft-green)] w-3 h-3 rounded-full mx-auto" title="Authorized Access" />
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {!sidebarCollapsed && (
            <p className="text-xs text-[var(--microsoft-gray-500)] uppercase tracking-wide mb-3 px-2">ADMIN MODULES</p>
          )}
          <div className="space-y-1">
            {ADMIN_NAVIGATION_ITEMS.map((item) => {
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
                  onClick={() => onPageChange(item.id as AdminPage)}
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

        {/* Logout - Always at bottom */}
        <div className="mt-auto pt-4">
          <Button
            variant="ghost"
            className={`w-full ${
              sidebarCollapsed ? 'justify-center p-3' : 'justify-start px-3 py-2'
            } text-xs text-[var(--microsoft-red)] hover:text-[var(--microsoft-red)] hover:bg-red-50`}
            onClick={onLogout}
            title={sidebarCollapsed ? "Sign Out" : undefined}
          >
            <LogOut className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && "SIGN OUT"}
          </Button>
        </div>
      </div>
    </div>
  );
}