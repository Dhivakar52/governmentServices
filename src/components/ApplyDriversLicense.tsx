import { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Car, 
  Upload, 
  Calendar, 
  CreditCard, 
  CheckCircle,
  MapPin,
  Eye
} from 'lucide-react';

interface FormData {
  licenseType: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    phone: string;
    email: string;
    address: string;
  };
  documents: {
    nationalId: File | null;
    medicalCertificate: File | null;
    passportPhoto: File | null;
    proofOfAddress: File | null;
  };
  appointment: {
    date: string;
    time: string;
    location: string;
  };
  payment: {
    method: string;
    amount: number;
  };
}

export function ApplyDriversLicense() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    licenseType: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationalId: '',
      phone: '',
      email: '',
      address: ''
    },
    documents: {
      nationalId: null,
      medicalCertificate: null,
      passportPhoto: null,
      proofOfAddress: null
    },
    appointment: {
      date: '',
      time: '',
      location: ''
    },
    payment: {
      method: '',
      amount: 0
    }
  });

  const steps = [
    { number: 1, title: 'License Type', icon: Car },
    { number: 2, title: 'Documents Upload', icon: Upload },
    { number: 3, title: 'Appointment', icon: Calendar },
    { number: 4, title: 'Payment', icon: CreditCard },
    { number: 5, title: 'Review & Submit', icon: CheckCircle }
  ];

  const licenseTypes = [
    { 
      id: 'learner', 
      title: 'Learner\'s License', 
      description: 'For first-time drivers learning to drive',
      fee: 50000,
      requirements: ['Age 16+ years', 'Medical certificate', 'Theory test']
    },
    { 
      id: 'provisional', 
      title: 'Provisional License', 
      description: 'Temporary license for new drivers',
      fee: 75000,
      requirements: ['Valid learner\'s license', 'Practical test passed', 'Age 18+ years']
    },
    { 
      id: 'full', 
      title: 'Full License', 
      description: 'Complete driving license',
      fee: 100000,
      requirements: ['Provisional license', '2+ years experience', 'Clean driving record']
    },
    { 
      id: 'commercial', 
      title: 'Commercial License', 
      description: 'For professional drivers and commercial vehicles',
      fee: 150000,
      requirements: ['Full license', 'Medical fitness', 'Professional training']
    },
    { 
      id: 'motorcycle', 
      title: 'Motorcycle License', 
      description: 'For motorcycles and scooters',
      fee: 60000,
      requirements: ['Age 16+ years', 'Motorcycle safety course', 'Practical test']
    }
  ];

  const appointmentSlots = [
    { date: '2024-01-15', times: ['09:00', '10:30', '14:00', '15:30'] },
    { date: '2024-01-16', times: ['09:00', '11:00', '14:30'] },
    { date: '2024-01-17', times: ['08:30', '10:00', '13:00', '16:00'] },
    { date: '2024-01-18', times: ['09:30', '11:30', '14:00'] }
  ];

  const locations = [
    { id: 'kampala', name: 'Kampala Central Office', address: 'Plot 1, Parliament Avenue' },
    { id: 'entebbe', name: 'Entebbe Branch', address: 'Entebbe Road, Industrial Area' },
    { id: 'jinja', name: 'Jinja Regional Office', address: 'Main Street, Jinja' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLicenseTypeSelect = (type: string) => {
    const selectedType = licenseTypes.find(t => t.id === type);
    setFormData({
      ...formData,
      licenseType: type,
      payment: { ...formData.payment, amount: selectedType?.fee || 0 }
    });
  };

  const handleFileUpload = (documentType: keyof FormData['documents'], file: File) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [documentType]: file
      }
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    setCurrentStep(6); // Success page
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Select License Type
              </h2>
              <p className="text-body text-d365-text-secondary">
                Choose the type of driver's license you want to apply for
              </p>
            </div>

            <div className="grid gap-4">
              {licenseTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    formData.licenseType === type.id
                      ? 'border-d365-primary bg-d365-hover'
                      : 'border-d365-border hover:border-d365-primary-light'
                  }`}
                  onClick={() => handleLicenseTypeSelect(type.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-d365-text-primary">{type.title}</h3>
                      <p className="text-body text-d365-text-secondary mt-1">{type.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-d365-primary">
                        UGX {type.fee.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-caption font-medium text-d365-text-primary">Requirements:</div>
                    {type.requirements.map((req, index) => (
                      <div key={index} className="text-caption text-d365-text-secondary flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Upload Required Documents
              </h2>
              <p className="text-body text-d365-text-secondary">
                Please upload clear, high-quality images of your documents
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { key: 'nationalId', label: 'National ID', required: true },
                { key: 'medicalCertificate', label: 'Medical Certificate', required: true },
                { key: 'passportPhoto', label: 'Passport Photo', required: true },
                { key: 'proofOfAddress', label: 'Proof of Address', required: false }
              ].map((doc) => (
                <div key={doc.key} className="border border-d365-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-d365-text-primary">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      <p className="text-caption text-d365-text-secondary">
                        Accepted formats: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                    {formData.documents[doc.key as keyof FormData['documents']] && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div className="border-2 border-dashed border-d365-border rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-d365-text-secondary mx-auto mb-3" />
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(doc.key as keyof FormData['documents'], file);
                        }
                      }}
                      className="hidden"
                      id={`upload-${doc.key}`}
                    />
                    <label
                      htmlFor={`upload-${doc.key}`}
                      className="d365-button-secondary cursor-pointer"
                    >
                      Choose File
                    </label>
                    {formData.documents[doc.key as keyof FormData['documents']] && (
                      <p className="text-caption text-green-600 mt-2">
                        ✓ {formData.documents[doc.key as keyof FormData['documents']]?.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Book Your Appointment
              </h2>
              <p className="text-body text-d365-text-secondary">
                Select a convenient date, time, and location for your test
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Location Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-d365-text-primary">Select Location</h3>
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.appointment.location === location.id
                        ? 'border-d365-primary bg-d365-hover'
                        : 'border-d365-border hover:border-d365-primary-light'
                    }`}
                    onClick={() => setFormData({
                      ...formData,
                      appointment: { ...formData.appointment, location: location.id }
                    })}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-d365-primary mt-0.5" />
                      <div>
                        <div className="font-medium text-d365-text-primary">{location.name}</div>
                        <div className="text-caption text-d365-text-secondary">{location.address}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Date and Time Selection */}
              <div className="space-y-4">
                <h3 className="font-medium text-d365-text-primary">Select Date & Time</h3>
                {appointmentSlots.map((slot) => (
                  <div key={slot.date} className="border border-d365-border rounded-lg p-4">
                    <div className="font-medium text-d365-text-primary mb-3">
                      {new Date(slot.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {slot.times.map((time) => (
                        <button
                          key={time}
                          className={`p-2 text-caption rounded border text-center ${
                            formData.appointment.date === slot.date && formData.appointment.time === time
                              ? 'border-d365-primary bg-d365-primary text-white'
                              : 'border-d365-border hover:border-d365-primary'
                          }`}
                          onClick={() => setFormData({
                            ...formData,
                            appointment: { 
                              ...formData.appointment, 
                              date: slot.date, 
                              time: time 
                            }
                          })}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Payment
              </h2>
              <p className="text-body text-d365-text-secondary">
                Complete your payment to finalize the application
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              {/* Payment Summary */}
              <div className="border border-d365-border rounded-lg p-6">
                <h3 className="font-medium text-d365-text-primary mb-4">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>License Type:</span>
                    <span className="font-medium">
                      {licenseTypes.find(t => t.id === formData.licenseType)?.title}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Application Fee:</span>
                    <span>UGX {formData.payment.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>UGX 10,000</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>UGX {(formData.payment.amount + 10000).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="font-medium text-d365-text-primary">Select Payment Method</h3>
                
                {[
                  { id: 'mobile-money', label: 'Mobile Money', description: 'MTN, Airtel' },
                  { id: 'card', label: 'Credit/Debit Card', description: 'Visa, Mastercard' },
                  { id: 'bank', label: 'Bank Transfer', description: 'Direct bank transfer' }
                ].map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg cursor-pointer ${
                      formData.payment.method === method.id
                        ? 'border-d365-primary bg-d365-hover'
                        : 'border-d365-border hover:border-d365-primary-light'
                    }`}
                    onClick={() => setFormData({
                      ...formData,
                      payment: { ...formData.payment, method: method.id }
                    })}
                  >
                    <div className="font-medium text-d365-text-primary">{method.label}</div>
                    <div className="text-caption text-d365-text-secondary">{method.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Review & Submit
              </h2>
              <p className="text-body text-d365-text-secondary">
                Please review your application details before submitting
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              {/* Application Summary */}
              <div className="border border-d365-border rounded-lg p-6">
                <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-caption text-d365-text-secondary">License Type</div>
                    <div className="font-medium">
                      {licenseTypes.find(t => t.id === formData.licenseType)?.title}
                    </div>
                  </div>
                  <div>
                    <div className="text-caption text-d365-text-secondary">Application Fee</div>
                    <div className="font-medium">UGX {formData.payment.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-caption text-d365-text-secondary">Test Date</div>
                    <div className="font-medium">
                      {formData.appointment.date} at {formData.appointment.time}
                    </div>
                  </div>
                  <div>
                    <div className="text-caption text-d365-text-secondary">Location</div>
                    <div className="font-medium">
                      {locations.find(l => l.id === formData.appointment.location)?.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              <div className="border border-d365-border rounded-lg p-6">
                <h3 className="font-medium text-d365-text-primary mb-4">Uploaded Documents</h3>
                <div className="space-y-2">
                  {[
                    { key: 'nationalId', label: 'National ID' },
                    { key: 'medicalCertificate', label: 'Medical Certificate' },
                    { key: 'passportPhoto', label: 'Passport Photo' },
                    { key: 'proofOfAddress', label: 'Proof of Address' }
                  ].map((doc) => (
                    <div key={doc.key} className="flex items-center justify-between">
                      <span>{doc.label}</span>
                      {formData.documents[doc.key as keyof FormData['documents']] ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-caption text-d365-text-secondary">Not uploaded</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="border border-d365-border rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-body text-d365-text-secondary">
                    I agree to the terms and conditions and confirm that all information provided is accurate and complete.
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
                Application Submitted Successfully!
              </h2>
              <p className="text-body text-d365-text-secondary">
                Your driver's license application has been submitted and is being processed.
              </p>
            </div>

            <div className="max-w-md mx-auto bg-d365-surface-secondary rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Application ID:</span>
                  <span className="font-semibold">DL-2024-001234</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-orange-600">Under Review</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Processing:</span>
                  <span>5-7 business days</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="d365-button-primary w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Timeline
              </button>
              <button className="d365-button-secondary w-full">
                Download Receipt
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 6) {
    return (
      <div className="space-y-6">
        <div className="d365-page-header">
          <div>
            <h1 className="d365-page-title">Driver's License Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Apply for Driver's License</h1>
          <p className="d365-page-subtitle">Complete the application process step by step</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                    ? 'bg-d365-primary border-d365-primary text-white' 
                    : 'border-d365-border text-d365-text-secondary'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <IconComponent className="w-5 h-5" />
                  )}
                </div>
                
                <div className="ml-3 hidden md:block">
                  <div className={`text-caption font-medium ${
                    isActive ? 'text-d365-primary' : 'text-d365-text-secondary'
                  }`}>
                    Step {step.number}
                  </div>
                  <div className={`text-body ${
                    isActive ? 'text-d365-text-primary' : 'text-d365-text-secondary'
                  }`}>
                    {step.title}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-d365-border'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg border border-d365-border p-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="d365-button-secondary flex items-center gap-2"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>

          {currentStep < 5 ? (
            <button
              className="d365-button-primary flex items-center gap-2"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.licenseType) ||
                (currentStep === 2 && (!formData.documents.nationalId || !formData.documents.medicalCertificate || !formData.documents.passportPhoto)) ||
                (currentStep === 3 && (!formData.appointment.date || !formData.appointment.time || !formData.appointment.location)) ||
                (currentStep === 4 && !formData.payment.method)
              }
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="d365-button-primary flex items-center gap-2"
              onClick={handleSubmit}
            >
              Submit Application
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}