
import { ADMIN_NAVIGATION_ITEMS, type AdminPage } from './adminConstants';

interface AdminHeaderProps {
  currentPage: AdminPage;
}

export function AdminHeader({ currentPage }: AdminHeaderProps) {
  return (
    <>
      {/* Government Admin Header */}
      <div className="bg-[var(--microsoft-blue)] text-white text-center py-1 px-4">
        <p className="text-xs font-medium">🔒 RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY 🔒</p>
      </div>
      
      <header className="microsoft-nav sticky top-0 z-5">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-[var(--microsoft-gray-900)]">
                {ADMIN_NAVIGATION_ITEMS.find(item => item.id === currentPage)?.label || 'ADMIN DASHBOARD'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="microsoft-badge microsoft-badge-error">
                ADMIN SESSION ACTIVE
              </div>
              <div className="microsoft-badge microsoft-badge-success">
                SYSTEM STATUS: OPERATIONAL
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}