import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, Shield, AlertTriangle } from 'lucide-react';
import { PersonalInfoStep } from './registration/PersonalInfoStep';
import { IdentityProofStep } from './registration/IdentityProofStep';
import { AddressInfoStep } from './registration/AddressInfoStep';
import { BiometricStep } from './registration/BiometricStep';
import { ConfirmationStep } from './registration/ConfirmationStep';
import type { RegistrationData } from '../App';

interface RegistrationWizardProps {
  data: RegistrationData;
  onDataChange: (data: RegistrationData) => void;
  onComplete: (civId: string) => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: 'PERSONAL INFORMATION', description: 'Official citizen details and contact information' },
  { id: 2, title: 'IDENTITY VERIFICATION', description: 'Government ID documents and photo verification' },
  { id: 3, title: 'ADDRESS CONFIRMATION', description: 'Official residential address verification' },
  { id: 4, title: 'BIOMETRIC ENROLLMENT', description: 'Secure biometric data capture and verification' },
  { id: 5, title: 'OFFICIAL CONFIRMATION', description: 'Review and complete registration process' }
];

export function RegistrationWizard({ data, onDataChange, onComplete, onBack }: RegistrationWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const progress = (currentStep / steps.length) * 100;

  const updateData = useCallback((field: keyof RegistrationData, value: any) => {
    const newData = {
      ...data,
      [field]: value
    };
    onDataChange(newData);
  }, [data, onDataChange]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepValidation = useCallback((step: number, isValid: boolean) => {
    setStepValidation(prev => ({
      ...prev,
      [step]: isValid
    }));
  }, []);

  const handlePersonalInfoChange = useCallback((personalInfo: RegistrationData['personalInfo']) => {
    updateData('personalInfo', personalInfo);
  }, [updateData]);

  const handleIdentityProofChange = useCallback((identityProof: RegistrationData['identityProof']) => {
    updateData('identityProof', identityProof);
  }, [updateData]);

  const handleAddressChange = useCallback((address: RegistrationData['address']) => {
    updateData('address', address);
  }, [updateData]);

  const handleBiometricChange = useCallback((biometric: RegistrationData['biometric']) => {
    updateData('biometric', biometric);
  }, [updateData]);

  const handlePersonalInfoValidation = useCallback((isValid: boolean) => {
    handleStepValidation(1, isValid);
  }, [handleStepValidation]);

  const handleIdentityProofValidation = useCallback((isValid: boolean) => {
    handleStepValidation(2, isValid);
  }, [handleStepValidation]);

  const handleAddressValidation = useCallback((isValid: boolean) => {
    handleStepValidation(3, isValid);
  }, [handleStepValidation]);

  const handleBiometricValidation = useCallback((isValid: boolean) => {
    handleStepValidation(4, isValid);
  }, [handleStepValidation]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={data.personalInfo}
            onChange={handlePersonalInfoChange}
            onValidation={handlePersonalInfoValidation}
          />
        );
      case 2:
        return (
          <IdentityProofStep
            data={data.identityProof}
            onChange={handleIdentityProofChange}
            onValidation={handleIdentityProofValidation}
          />
        );
      case 3:
        return (
          <AddressInfoStep
            data={data.address}
            onChange={handleAddressChange}
            onValidation={handleAddressValidation}
          />
        );
      case 4:
        return (
          <BiometricStep
            data={data.biometric}
            onChange={handleBiometricChange}
            onValidation={handleBiometricValidation}
          />
        );
      case 5:
        return (
          <ConfirmationStep
            data={data}
            onComplete={onComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Official Government Header */}
      <div className="official-banner text-center py-2 px-4">
        <p>Official Government Registration Portal - Secure Digital Identity</p>
      </div>

      <header className="government-header text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="mr-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              RETURN TO PORTAL
            </Button>
            <div className="flex items-center space-x-3">
              <div className="government-seal w-10 h-10">
                <Shield className="h-6 w-6 text-[var(--government-green)]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">OFFICIAL CITIZEN REGISTRATION</h1>
                <p className="text-xs text-gray-200">National Digital Identity System</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
            <div>
              <h4 className="font-bold text-yellow-800">OFFICIAL SECURITY NOTICE</h4>
              <p className="text-sm text-yellow-700">
                This is an official government registration process. All information provided will be verified 
                against national databases and is subject to government security protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-[var(--government-green)]">
              REGISTRATION STEP {currentStep} OF {steps.length}
            </h2>
            <span className="text-sm text-gray-600 font-medium">
              {Math.round(progress)}% COMPLETE
            </span>
          </div>
          <Progress value={progress} className="mb-6 h-3" />
          
          {/* Step Indicator */}
          <div className="bg-white border border-[var(--government-green)] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-shrink-0 min-w-0"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors mb-2 ${
                      currentStep === step.id
                        ? 'bg-[var(--government-green)] text-white'
                        : currentStep > step.id
                        ? 'bg-[var(--government-gold)] text-[var(--government-green)]'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.id}
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-bold ${
                      currentStep >= step.id ? 'text-[var(--government-green)]' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 max-w-20">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute h-px bg-gray-300 w-20 top-5 left-16"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <Card className="formal-card p-8 mb-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-[var(--government-green)] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {currentStep}
              </div>
              <h3 className="text-2xl font-bold text-[var(--government-green)]">
                {steps[currentStep - 1].title}
              </h3>
            </div>
            <p className="text-gray-600 border-l-4 border-[var(--government-gold)] pl-4">
              {steps[currentStep - 1].description}
            </p>
          </div>
          
          {renderStep()}
        </Card>

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-[var(--government-green)] text-[var(--government-green)] hover:bg-[var(--government-green)] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              PREVIOUS STEP
            </Button>
            <Button
              onClick={handleNext}
              disabled={!stepValidation[currentStep]}
              className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
            >
              PROCEED TO NEXT STEP
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}