import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Download, QrCode, ArrowRight } from 'lucide-react';
import type { RegistrationData } from '../../App';

interface ConfirmationStepProps {
  data: RegistrationData;
  onComplete: (civId: string) => void;
}
// interface PersonalInfo {
//   fullName: string;
//   dateOfBirth: string;
//   gender: string;
// }

// interface UserData {
//   civId: string;
//   personalInfo: PersonalInfo;
//   address: {
//     line1: string;
//     city: string;
//     state: string;
//   };
// }


export function ConfirmationStep({ data, onComplete }: ConfirmationStepProps) {
  const [civId] = useState(() => `CIV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleComplete = () => {
    setIsGenerating(true);
    // Simulate ID generation
    setTimeout(() => {
      setIsGenerating(false);
      onComplete(civId);
    }, 2000);
  };

  const downloadQRCode = () => {
    // Simulate QR code download
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw QR code placeholder
      ctx.fillStyle = '#000';
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * 10, j * 10, 10, 10);
          }
        }
      }
      
      const link = document.createElement('a');
      link.download = `${civId}-qr-code.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const downloadDigitalID = () => {
    // Simulate digital ID card download
    const idData = {
      civId,
      fullName: data.personalInfo.fullName,
      dateOfBirth: data.personalInfo.dateOfBirth,
      gender: data.personalInfo.gender,
      address: `${data.address.line1}, ${data.address.city}, ${data.address.state}`,
      issuedDate: new Date().toLocaleDateString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5).toLocaleDateString() // 5 years
    };
    
    const blob = new Blob([JSON.stringify(idData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `${civId}-digital-id.json`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Registration Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Registration Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">{data.personalInfo.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{data.personalInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mobile</p>
              <p className="font-medium">{data.personalInfo.mobile}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">
                {data.address.line1}, {data.address.city}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Verification Status</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Identity Verified
                </Badge>
                <Badge variant="secondary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Biometric Captured
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Digital ID */}
      <Card className="p-8 text-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-medium">Your Digital ID is Ready!</h3>
            <p className="text-muted-foreground">
              Your unique CivicID has been generated and is ready for use
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg max-w-sm mx-auto">
            <div className="space-y-4">
              <div className="text-left">
                <p className="text-xs opacity-90">CIVIC DIGITAL ID</p>
                <p className="text-2xl font-medium">{civId}</p>
              </div>
              <div className="text-left space-y-1">
                <p className="text-sm opacity-90">{data.personalInfo.fullName}</p>
                <p className="text-xs opacity-75">
                  Issued: {new Date().toLocaleDateString()}
                </p>
                <p className="text-xs opacity-75">
                  Expires: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000 * 5).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={downloadQRCode}>
              <QrCode className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
            <Button variant="outline" onClick={downloadDigitalID}>
              <Download className="h-4 w-4 mr-2" />
              Download Digital ID
            </Button>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">What's Next?</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
              1
            </div>
            <div>
              <p className="font-medium">Access Your Dashboard</p>
              <p className="text-sm text-muted-foreground">
                View and manage your digital documents, update information, and access services
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
              2
            </div>
            <div>
              <p className="font-medium">Link Services</p>
              <p className="text-sm text-muted-foreground">
                Connect your CivicID to government services, banking, and other platforms
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
              3
            </div>
            <div>
              <p className="font-medium">Digital Signatures</p>
              <p className="text-sm text-muted-foreground">
                Use your verified identity to digitally sign documents and contracts
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Button 
          size="lg" 
          onClick={handleComplete}
          disabled={isGenerating}
          className="px-8"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
              Generating ID...
            </>
          ) : (
            <>
              Go to Dashboard
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}