import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  CreditCard,
  Heart,
  Home,
  Briefcase,
  Car,
  GraduationCap,
  Building
} from 'lucide-react';
import { TaxPortal } from './government-services/TaxPortal';
import { HealthcareServices } from './government-services/HealthcareServices';
import { PropertyServices } from './government-services/PropertyServices';
import { BusinessLicensing } from './government-services/BusinessLicensing';

interface ServicesPageProps {
  onServiceClick: (service: any) => void;
}

export function ServicesPage({ onServiceClick }: ServicesPageProps) {
  const [activeService, setActiveService] = useState<string | null>(null);

  const services = [
    {
      category: 'Essential Services',
      items: [
        { name: 'Tax Portal', desc: 'File taxes and view statements', icon: CreditCard, status: 'Available', serviceKey: 'tax' },
        { name: 'Healthcare Services', desc: 'Medical records and appointments', icon: Heart, status: 'Available', serviceKey: 'healthcare' },
        { name: 'Property Services', desc: 'Property registration and transfers', icon: Home, status: 'Available', serviceKey: 'property' },
        { name: 'Business Licensing', desc: 'Business registration and permits', icon: Briefcase, status: 'Available', serviceKey: 'business' }
      ]
    },
    {
      category: 'Transportation',
      items: [
        { name: 'Driver License Renewal', desc: 'Renew your driving license online', icon: Car, status: 'Available' },
        { name: 'Vehicle Registration', desc: 'Register and transfer vehicles', icon: Car, status: 'Available' }
      ]
    },
    {
      category: 'Education & Career',
      items: [
        { name: 'Educational Certificates', desc: 'Request transcripts and certificates', icon: GraduationCap, status: 'Available' },
        { name: 'Professional Licensing', desc: 'Professional certifications', icon: Building, status: 'Coming Soon' }
      ]
    }
  ];

  const handleServiceClick = (service: any) => {
    if (service.serviceKey) {
      setActiveService(service.serviceKey);
    } else {
      onServiceClick(service);
    }
  };

  const renderActiveService = () => {
    switch (activeService) {
      case 'tax':
        return <TaxPortal onBack={() => setActiveService(null)} />;
      case 'healthcare':
        return <HealthcareServices onBack={() => setActiveService(null)} />;
      case 'property':
        return <PropertyServices onBack={() => setActiveService(null)} />;
      case 'business':
        return <BusinessLicensing onBack={() => setActiveService(null)} />;
      default:
        return null;
    }
  };

  if (activeService) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        <div className="animate-in slide-in-from-right duration-300 h-full">
          {renderActiveService()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--microsoft-gray-900)] mb-2">GOVERNMENT SERVICES</h2>
        <p className="text-[var(--microsoft-gray-700)]">
          Access all available government services through your digital identity
        </p>
      </div>

      {services.map((category, index) => (
        <Card key={index} className="formal-card p-6">
          <h3 className="font-semibold text-[var(--microsoft-gray-900)] mb-4">{category.category}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.items.map((service, serviceIndex) => {
              const Icon = service.icon;
              return (
                <div
                  key={serviceIndex}
                  className="p-4 border border-[var(--microsoft-gray-200)] rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="bg-[var(--microsoft-blue)]/10 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-[var(--microsoft-blue)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-[var(--microsoft-gray-900)]">{service.name}</h4>
                        <Badge className={service.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {service.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--microsoft-gray-700)]">{service.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}