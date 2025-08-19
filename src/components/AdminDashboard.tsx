import { useState } from 'react';
import { AdminSidebar } from './admin/AdminSidebar';
import { AdminHeader } from './admin/AdminHeader';
import { AdminOverview } from './admin/AdminOverview';
import { CitizenManagement } from './admin/CitizenManagement';
import { SmartWallet } from './admin/SmartWallet';
import { GovChat } from './admin/GovChat';
import { DiasporaVoting } from './admin/DiasporaVoting';
import { HealthcareSync } from './admin/HealthcareSync';
import { SystemMonitoring } from './admin/SystemMonitoring';
import { ApiAccessLogs } from './admin/ApiAccessLogs';
import { AdminUsers } from './admin/AdminUsers';
import { SystemAlerts } from './admin/SystemAlerts';
import { ExportReports } from './admin/ExportReports';
import { SystemConfig } from './admin/SystemConfig';
import { type AdminPage } from './admin/adminConstants';
import type { AdminUser } from '../App';

interface AdminDashboardProps {
  adminUser: AdminUser;
  onLogout: () => void;
}

export function AdminDashboard({ adminUser, onLogout }: AdminDashboardProps) {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminOverview />;
      case 'citizens':
        return <CitizenManagement />;
      case 'wallet':
        return <SmartWallet />;
      case 'govchat':
        return <GovChat />;
      case 'voting':
        return <DiasporaVoting />;
      case 'healthcare':
        return <HealthcareSync />;
      case 'monitoring':
        return <SystemMonitoring />;
      case 'api':
        return <ApiAccessLogs />;
      case 'users':
        return <AdminUsers />;
      case 'alerts':
        return <SystemAlerts />;
      case 'reports':
        return <ExportReports />;
      case 'config':
        return <SystemConfig />;
      default:
        return <AdminOverview />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Fixed Sidebar */}
      <div className={`fixed left-0 top-0 h-full z-10 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      }`}>
        <AdminSidebar
          adminUser={adminUser}
          currentPage={currentPage}
          sidebarCollapsed={sidebarCollapsed}
          onPageChange={setCurrentPage}
          onToggleSidebar={toggleSidebar}
          onLogout={onLogout}
        />
      </div>

      <main className={`flex-1 ${sidebarCollapsed ? 'ml-16' : 'ml-80'} transition-all duration-300`}>
        <AdminHeader currentPage={currentPage} />
        
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}