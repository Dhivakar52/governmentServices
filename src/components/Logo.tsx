

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 'md', className = '', showText = true }: LogoProps) {
  // const sizeClasses = {
  //   sm: 'w-6 h-6',
  //   md: 'w-8 h-8',
  //   lg: 'w-12 h-12',
  //   xl: 'w-16 h-16'
  // };

  const textSizeClasses = {
    sm: 'text-body',
    md: 'text-subtitle',
    lg: 'text-title2',
    xl: 'text-title1'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`${textSizeClasses[size]} font-semibold text-d365-primary`}>
            eServices Portal
          </div>
          {size !== 'sm' && (
            <div className="text-caption text-d365-secondary">
              Government Platform
            </div>
          )}
        </div>
      )}
    </div>
  );
}