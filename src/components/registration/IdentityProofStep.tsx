import { useEffect, useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Upload, Camera, CheckCircle, AlertCircle, FileText } from 'lucide-react';

interface IdentityProof {
  governmentId ?: File | null;
  selfie ?: File | null;
  matchSuccess ?: boolean;
  type: string;
  number: string;

}

interface IdentityProofStepProps {
  data: IdentityProof;
  onChange: (data: IdentityProof) => void;
  onValidation: (isValid: boolean) => void;
}

export function IdentityProofStep({ data, onChange, onValidation }: IdentityProofStepProps) {
  const [uploadProgress, setUploadProgress] = useState({ id: 0, selfie: 0 });
  const [isMatching, setIsMatching] = useState(false);

  const simulateFaceMatch = useCallback((currentData: IdentityProof) => {
    setIsMatching(true);
    // Simulate matching process
    setTimeout(() => {
      const matchSuccess = Math.random() > 0.2; // 80% success rate
      onChange({ ...currentData, matchSuccess });
      setIsMatching(false);
    }, 2000);
  }, [onChange]);

  const handleFileUpload = (type: 'governmentId' | 'selfie', file: File) => {
    const newData = { ...data, [type]: file };
    onChange(newData);

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [type === 'governmentId' ? 'id' : 'selfie']: 0 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[type === 'governmentId' ? 'id' : 'selfie'];
        if (currentProgress >= 100) {
          clearInterval(interval);
          // Simulate face matching if both files are uploaded
          if (newData.governmentId && newData.selfie && !newData.matchSuccess) {
            simulateFaceMatch(newData);
          }
          return prev;
        }
        return { ...prev, [type === 'governmentId' ? 'id' : 'selfie']: currentProgress + 10 };
      });
    }, 100);
  };

  const capturePhoto = () => {
    // Simulate camera capture
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw a simple placeholder
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = '#666';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Camera Capture', 150, 150);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
          handleFileUpload('selfie', file);
        }
      });
    }
  };

  const retryVerification = useCallback(() => {
    simulateFaceMatch(data);
  }, [simulateFaceMatch, data]);

  useEffect(() => {
    const isValid = !!(data.governmentId && data.selfie && data.matchSuccess);
    onValidation(isValid);
  }, [data.governmentId, data.selfie, data.matchSuccess, onValidation]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Government ID Upload */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <Label className="text-base">Government ID Document</Label>
            </div>
            
            {!data.governmentId ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload your government-issued ID
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Accepted: Driver's License, Passport, National ID (PDF, JPG, PNG)
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload('governmentId', file);
                  }}
                  className="hidden"
                  id="govId"
                />
                <Button asChild>
                  <label htmlFor="govId" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">{data.governmentId.name}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress.id}%` }}
                  />
                </div>
                {uploadProgress.id === 100 && (
                  <p className="text-sm text-green-600">✓ Document uploaded successfully</p>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Selfie Capture */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-primary" />
              <Label className="text-base">Selfie Photo</Label>
            </div>
            
            {!data.selfie ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Take a clear selfie photo
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Look directly at the camera with good lighting
                </p>
                <div className="space-y-2">
                  <Button onClick={capturePhoto}>
                    Capture Photo
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('selfie', file);
                    }}
                    className="hidden"
                    id="selfie"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="selfie" className="cursor-pointer">
                      Upload Photo
                    </label>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Selfie captured</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress.selfie}%` }}
                  />
                </div>
                {uploadProgress.selfie === 100 && (
                  <p className="text-sm text-green-600">✓ Photo uploaded successfully</p>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Face Matching */}
      {data.governmentId && data.selfie && (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-medium">Identity Verification</h3>
            
            {isMatching ? (
              <div className="space-y-4">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="text-sm text-muted-foreground">
                  Verifying identity match between your photo and ID document...
                </p>
              </div>
            ) : data.matchSuccess ? (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-green-600">Verification Successful!</p>
                  <p className="text-sm text-muted-foreground">
                    Your identity has been successfully verified
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
                <div>
                  <p className="text-lg font-medium text-destructive">Verification Failed</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Unable to match your selfie with the ID document. Please try again.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={retryVerification}
                    size="sm"
                  >
                    Retry Verification
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Security:</strong> All uploaded documents are encrypted and stored securely. 
          Photos are only used for identity verification and are not shared with third parties.
        </p>
      </div>
    </div>
  );
}