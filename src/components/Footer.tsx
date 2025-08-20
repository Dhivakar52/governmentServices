
import xpLogo from '../assets/dummy_logo.jpg';

interface FooterProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function Footer({ variant = 'default', className = '' }: FooterProps) {
  return (
    <footer className={`text-center ${className}`}>
      {variant === 'default' && (
        <div className="border-t border-d365-border pt-6 pb-4">
          <div className="flex items-center justify-center space-x-6 text-caption text-d365-secondary mb-4">
            <span className="hover:text-d365-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-d365-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-d365-primary cursor-pointer transition-colors">Accessibility</span>
            <span className="hover:text-d365-primary cursor-pointer transition-colors">Contact Support</span>
          </div>
          <p className="text-caption text-d365-secondary mb-4">
            © 2025 Government of the Republic of Utopia. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-2 opacity-75">
            <span className="text-caption text-d365-secondary">Powered by</span>
            <img 
              src={xpLogo} 
              alt="Xnterprise" 
              className="h-4 w-auto object-contain"
            />
          </div>
        </div>
      )}
      
      {variant === 'minimal' && (
        <div className="pt-4 pb-2">
          <div className="flex items-center justify-center space-x-2 opacity-75">
            <span className="text-caption text-d365-secondary">Powered by</span>
            <img 
              src={xpLogo} 
              alt="Xnterprise" 
              className="h-3 w-auto object-contain"
            />
          </div>
        </div>
      )}
    </footer>
  );
}