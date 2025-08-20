
import { ArrowLeft } from 'lucide-react';

interface AdminBackButtonProps {
  onClick: () => void;
  className?: string;
}

export function AdminBackButton({ onClick, className = '' }: AdminBackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`d365-button d365-button-secondary btn-with-icon hover:bg-d365-hover transition-colors ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Back</span>
    </button>
  );
}