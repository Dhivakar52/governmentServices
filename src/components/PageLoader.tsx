
import civilityLogo from '../assets/dummy_logo.jpg';
import xpLogo from '../assets/dummy_logo.jpg';

interface PageLoaderProps {
  message?: string;
  fullScreen?: boolean;
  compact?: boolean;
}

export function PageLoader({ message = 'Loading...', fullScreen = false, compact = false }: PageLoaderProps) {
  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-d365-background z-50' 
    : 'w-full h-full min-h-[400px] bg-d365-background';

  const contentClasses = compact 
    ? 'space-y-4'
    : 'space-y-6';

  const logoHeight = compact ? 'h-12' : 'h-16';

  return (
    <div className={`${containerClasses} flex items-center justify-center`}>
      <div className={`flex flex-col items-center ${contentClasses}`}>
        {/* Logo with pulse animation */}
        <div className="logo-loader">
          <img 
            src={civilityLogo} 
            alt="Civility" 
            className={`${logoHeight} w-auto object-contain animate-pulse`}
          />
        </div>
        
        {/* Loading spinner */}
        <div className="relative">
          <div className="loading-spinner"></div>
          <div className="loading-spinner-inner"></div>
        </div>
        
        {/* Loading message */}
        <div className="text-center space-y-2">
          <div className={`${compact ? 'text-title3' : 'text-title2'} font-semibold text-d365-primary`}>
            {message}
          </div>
          {!compact && (
            <div className="text-body text-d365-secondary">
              Please wait while we prepare your experience
            </div>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="w-48 h-1 bg-d365-border rounded-full overflow-hidden">
          <div className="progress-bar h-full bg-gradient-to-r from-d365-primary to-d365-accent rounded-full"></div>
        </div>
        
        {/* Government branding - only show in fullscreen mode */}
        {fullScreen && (
          <div className="text-center text-caption text-d365-secondary mt-8 space-y-2">
            <div className="font-medium">Republic of Utopia</div>
            <div className="opacity-75">Department of Social Development</div>
            <div className="flex items-center justify-center space-x-2 opacity-60 mt-4">
              <span className="text-caption">Powered by</span>
              <img 
                src={xpLogo} 
                alt="Xnterprise" 
                className="h-3 w-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}