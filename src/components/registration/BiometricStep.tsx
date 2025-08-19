import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Fingerprint, ScanFace, CheckCircle, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

interface Biometric {
  completed: boolean;
  scanType: 'fingerprint' | 'face';
}

interface BiometricStepProps {
  data: Biometric;
  onChange: (data: Biometric) => void;
  onValidation: (isValid: boolean) => void;
}

export function BiometricStep({ data, onChange, onValidation }: BiometricStepProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanAttempts, setScanAttempts] = useState(0);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanAttempts(prev => prev + 1);

    // Simulate biometric scanning
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          // 90% success rate for simulation
          const success = Math.random() > 0.1;
          onChange({ ...data, completed: success });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  useEffect(() => {
    onValidation(data.completed);
  }, [data.completed, onValidation]);

  const getScanIcon = () => {
    return data.scanType === 'fingerprint' ? Fingerprint : ScanFace;
  };

  const getScanDescription = () => {
    return data.scanType === 'fingerprint' 
      ? 'Place your finger on the scanner' 
      : 'Look directly at the camera';
  };

  const Icon = getScanIcon();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Biometric Type</Label>
          <Select 
            value={data.scanType} 
            onValueChange={(value: 'fingerprint' | 'face') => 
              onChange({ ...data, scanType: value, completed: false })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fingerprint">
                <div className="flex items-center space-x-2">
                  <Fingerprint className="h-4 w-4" />
                  <span>Fingerprint Scan</span>
                </div>
              </SelectItem>
              <SelectItem value="face">
                <div className="flex items-center space-x-2">
                  <ScanFace className="h-4 w-4" />
                  <span>Face Recognition</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="p-8">
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className={`w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center transition-all ${
              isScanning 
                ? 'border-primary bg-primary/10 animate-pulse' 
                : data.completed 
                ? 'border-green-500 bg-green-50' 
                : 'border-muted bg-muted/20'
            }`}>
              {data.completed ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <Icon className={`h-16 w-16 ${isScanning ? 'text-primary' : 'text-muted-foreground'}`} />
              )}
            </div>

            <div>
              {isScanning ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Scanning in progress...</h3>
                  <p className="text-sm text-muted-foreground">{getScanDescription()}</p>
                  <div className="w-full bg-muted rounded-full h-2 max-w-xs mx-auto">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{scanProgress}% complete</p>
                </div>
              ) : data.completed ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-green-600">Biometric Captured Successfully!</h3>
                  <p className="text-sm text-muted-foreground">
                    Your {data.scanType} scan has been securely recorded
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    {data.scanType === 'fingerprint' ? 'Fingerprint' : 'Face'} Verification
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {getScanDescription()} when ready to start scanning
                  </p>
                  {scanAttempts > 0 && !data.completed && (
                    <div className="flex items-center justify-center space-x-2 text-destructive">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">Scan failed. Please try again.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {!data.completed && (
            <Button 
              onClick={startScan} 
              disabled={isScanning}
              size="lg"
              className="w-full max-w-xs"
            >
              {isScanning ? 'Scanning...' : `Start ${data.scanType === 'fingerprint' ? 'Fingerprint' : 'Face'} Scan`}
            </Button>
          )}

          {data.completed && (
            <Button 
              variant="outline" 
              onClick={() => onChange({ ...data, completed: false })}
              size="sm"
            >
              Scan Again
            </Button>
          )}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Fingerprint Scanning</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Ensure your finger is clean and dry</li>
            <li>• Press firmly on the scanner</li>
            <li>• Hold still during the scan</li>
          </ul>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Face Recognition</h4>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Look directly at the camera</li>
            <li>• Ensure good lighting</li>
            <li>• Remove glasses if needed</li>
          </ul>
        </div>
      </div>

      <div className="bg-primary/10 p-4 rounded-lg">
        <p className="text-sm text-primary">
          <strong>Security:</strong> Your biometric data is encrypted using military-grade encryption 
          and stored securely. It is only used for identity verification and cannot be reverse-engineered.
        </p>
      </div>
    </div>
  );
}