import type { ReactNode } from 'react';
import { AdminBackButton } from './AdminBackButton';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search } from 'lucide-react';

interface AdminPageLayoutProps {
  title: string;
  onBack: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  filters?: Array<{
    id: string;
    placeholder: string;
    options: Array<{ value: string; label: string; }>;
    onSelect: (value: string) => void;
  }>;
  children: ReactNode;
  className?: string;
}

export function AdminPageLayout({
  title,
  onBack,
  actionButton,
  searchPlaceholder = "Search...",
  onSearch,
  filters = [],
  children,
  className = ''
}: AdminPageLayoutProps) {
  return (
    <div className={`max-w-full ${className}`}>
      {/* Header Section */}
      <div className="d365-page-header">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <AdminBackButton onClick={onBack} />
            <h1 className="d365-page-title">{title}</h1>
          </div>
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              className="d365-button d365-button-primary btn-with-icon"
            >
              {actionButton.icon}
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filters Section */}
      {(onSearch || filters.length > 0) && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            {onSearch && (
              <div className="flex-1 max-w-md">
                <div className="d365-input-with-icon">
                  <Search className="input-icon h-4 w-4" />
                  <Input
                    placeholder={searchPlaceholder}
                    onChange={(e) => onSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {/* Filter Dropdowns */}
            {filters.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {filters.map((filter) => (
                  <Select key={filter.id} onValueChange={filter.onSelect} defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder={filter.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}