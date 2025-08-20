import { useState } from 'react';
import { 
  Truck, 
  User, 
  Upload, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Settings,
  Calculator,
  Smartphone,
  Building2,
  Eye,
  Download
} from 'lucide-react';

interface VehicleRegistrationForm {
  registrationType: string;
  vehicleDetails: {
    vehicleType: string;
    make: string;
    model: string;
    fuelType: string;
    engineNumber: string;
    chassisNumber: string;
    manufacturingYear: string;
    color: string;
    engineCapacity: string;
    seatingCapacity: string;
  };
  ownerDetails: {
    ownerName: string;
    nationalId: string;
    address: string;
    phone: string;
    email: string;
    district: string;
    isCompany: boolean;
    companyName: string;
    registrationNumber: string;
  };
  documents: {
    purchaseInvoice: File | null;
    insuranceCertificate: File | null;
    emissionTest: File | null;
    idProof: File | null;
    form20: File | null;
    form21: File | null;
    form22: File | null;
  };
  rtoRegion: string;
  fees: {
    baseFee: number;
    roadTax: number;
    environmentalCess: number;
    fastTag: number;
    total: number;
  };
  paymentMethod: string;
}

export function ApplyVehicleRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<VehicleRegistrationForm>({
    registrationType: '',
    vehicleDetails: {
      vehicleType: '',
      make: '',
      model: '',
      fuelType: '',
      engineNumber: '',
      chassisNumber: '',
      manufacturingYear: '',
      color: '',
      engineCapacity: '',
      seatingCapacity: ''
    },
    ownerDetails: {
      ownerName: '',
      nationalId: '',
      address: '',
      phone: '',
      email: '',
      district: '',
      isCompany: false,
      companyName: '',
      registrationNumber: ''
    },
    documents: {
      purchaseInvoice: null,
      insuranceCertificate: null,
      emissionTest: null,
      idProof: null,
      form20: null,
      form21: null,
      form22: null
    },
    rtoRegion: '',
    fees: {
      baseFee: 0,
      roadTax: 0,
      environmentalCess: 0,
      fastTag: 0,
      total: 0
    },
    paymentMethod: ''
  });

  const steps = [
    { number: 1, title: 'Registration Type', icon: Settings },
    { number: 2, title: 'Vehicle Details', icon: Truck },
    { number: 3, title: 'Owner Details', icon: User },
    { number: 4, title: 'Documents', icon: Upload },
    { number: 5, title: 'Fees & Payment', icon: CreditCard },
    { number: 6, title: 'Confirmation', icon: CheckCircle }
  ];

  const registrationTypes = [
    {
      id: 'new',
      title: 'New Vehicle Registration',
      description: 'Register a brand new vehicle for the first time',
      fee: 150000
    },
    {
      id: 'transfer',
      title: 'Ownership Transfer',
      description: 'Transfer vehicle ownership to a new owner',
      fee: 75000
    },
    {
      id: 'reregistration',
      title: 'Re-registration',
      description: 'Re-register an existing vehicle (duplicate RC)',
      fee: 50000
    },
    {
      id: 'temporary',
      title: 'Temporary Permit',
      description: 'Temporary registration for vehicle movement',
      fee: 25000
    }
  ];

  const vehicleTypes = [
    'Two Wheeler (Motorcycle/Scooter)',
    'Three Wheeler (Auto Rickshaw)',
    'Four Wheeler (Car)',
    'Light Commercial Vehicle',
    'Heavy Commercial Vehicle',
    'Bus',
    'Truck',
    'Other'
  ];

  const fuelTypes = [
    'Petrol',
    'Diesel',
    'Electric',
    'Hybrid (Petrol-Electric)',
    'Hybrid (Diesel-Electric)',
    'CNG',
    'LPG',
    'Other'
  ];

  const rtoRegions = [
    { id: 'UG01', name: 'Kampala Central' },
    { id: 'UG02', name: 'Wakiso' },
    { id: 'UG03', name: 'Mukono' },
    { id: 'UG04', name: 'Jinja' },
    { id: 'UG05', name: 'Entebbe' },
    { id: 'UG06', name: 'Masaka' },
    { id: 'UG07', name: 'Mbarara' },
    { id: 'UG08', name: 'Gulu' },
    { id: 'UG09', name: 'Lira' },
    { id: 'UG10', name: 'Arua' }
  ];

  const paymentMethods = [
    { id: 'mobile-money', name: 'Mobile Money', icon: Smartphone, fee: 1000 },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, fee: 2500 },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: Building2, fee: 2000 }
  ];

  const updateFormData = (section: keyof VehicleRegistrationForm, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        
        [field]: value
      }
    }));
  };

  const handleFileUpload = (documentType: keyof VehicleRegistrationForm['documents'], file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const calculateFees = () => {
    let baseFee = 0;
    let roadTax = 0;
    let environmentalCess = 5000;
    let fastTag = 10000;

    // Base fee based on registration type
    const regType = registrationTypes.find(type => type.id === formData.registrationType);
    if (regType) {
      baseFee = regType.fee;
    }

    // Road tax based on vehicle type and engine capacity
    if (formData.vehicleDetails.vehicleType.includes('Two Wheeler')) {
      roadTax = 15000;
    } else if (formData.vehicleDetails.vehicleType.includes('Four Wheeler')) {
      const capacity = parseInt(formData.vehicleDetails.engineCapacity) || 1000;
      roadTax = capacity < 1500 ? 50000 : 75000;
    } else if (formData.vehicleDetails.vehicleType.includes('Commercial')) {
      roadTax = 100000;
    } else {
      roadTax = 30000;
    }

    const total = baseFee + roadTax + environmentalCess + fastTag;

    setFormData(prev => ({
      ...prev,
      fees: {
        baseFee,
        roadTax,
        environmentalCess,
        fastTag,
        total
      }
    }));
  };

  const handleNext = () => {
    if (currentStep === 4) {
      calculateFees();
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Vehicle registration submitted:', formData);
    setIsSubmitted(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Select Registration Type
              </h2>
              <p className="text-body text-d365-text-secondary">
                Choose the type of vehicle registration you need
              </p>
            </div>

            <div className="grid gap-4">
              {registrationTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-6 border rounded-lg cursor-pointer transition-all ${
                    formData.registrationType === type.id
                      ? 'border-d365-primary bg-d365-hover'
                      : 'border-d365-border hover:border-d365-primary-light'
                  }`}
                  onClick={() => updateFormData('registrationType', '', type.id)}
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
                Vehicle Information
              </h2>
              <p className="text-body text-d365-text-secondary">
                Enter detailed information about your vehicle
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Vehicle Type *
                </label>
                <select
                  className="d365-input"
                  value={formData.vehicleDetails.vehicleType}
                  onChange={(e) => updateFormData('vehicleDetails', 'vehicleType', e.target.value)}
                >
                  <option value="">Select vehicle type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Make *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.vehicleDetails.make}
                  onChange={(e) => updateFormData('vehicleDetails', 'make', e.target.value)}
                  placeholder="e.g., Toyota, Honda, Bajaj"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.vehicleDetails.model}
                  onChange={(e) => updateFormData('vehicleDetails', 'model', e.target.value)}
                  placeholder="Vehicle model"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Fuel Type *
                </label>
                <select
                  className="d365-input"
                  value={formData.vehicleDetails.fuelType}
                  onChange={(e) => updateFormData('vehicleDetails', 'fuelType', e.target.value)}
                >
                  <option value="">Select fuel type</option>
                  {fuelTypes.map((fuel) => (
                    <option key={fuel} value={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Engine Number *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.vehicleDetails.engineNumber}
                  onChange={(e) => updateFormData('vehicleDetails', 'engineNumber', e.target.value)}
                  placeholder="Engine number from vehicle"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Chassis Number *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.vehicleDetails.chassisNumber}
                  onChange={(e) => updateFormData('vehicleDetails', 'chassisNumber', e.target.value)}
                  placeholder="Chassis/VIN number"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Manufacturing Year *
                </label>
                <input
                  type="number"
                  className="d365-input"
                  value={formData.vehicleDetails.manufacturingYear}
                  onChange={(e) => updateFormData('vehicleDetails', 'manufacturingYear', e.target.value)}
                  placeholder="e.g., 2023"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Vehicle Color *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.vehicleDetails.color}
                  onChange={(e) => updateFormData('vehicleDetails', 'color', e.target.value)}
                  placeholder="Primary color"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Engine Capacity (CC)
                </label>
                <input
                  type="number"
                  className="d365-input"
                  value={formData.vehicleDetails.engineCapacity}
                  onChange={(e) => updateFormData('vehicleDetails', 'engineCapacity', e.target.value)}
                  placeholder="e.g., 1500"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  className="d365-input"
                  value={formData.vehicleDetails.seatingCapacity}
                  onChange={(e) => updateFormData('vehicleDetails', 'seatingCapacity', e.target.value)}
                  placeholder="Number of seats"
                  min="1"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Owner Information
              </h2>
              <p className="text-body text-d365-text-secondary">
                Provide details of the vehicle owner
              </p>
            </div>

            <div className="space-y-6">
              {/* Owner Type */}
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!formData.ownerDetails.isCompany}
                    onChange={() => updateFormData('ownerDetails', 'isCompany', false)}
                  />
                  <span>Individual Owner</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={formData.ownerDetails.isCompany}
                    onChange={() => updateFormData('ownerDetails', 'isCompany', true)}
                  />
                  <span>Company/Organization</span>
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    {formData.ownerDetails.isCompany ? 'Authorized Person Name' : 'Owner Name'} *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.ownerDetails.ownerName}
                    onChange={(e) => updateFormData('ownerDetails', 'ownerName', e.target.value)}
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    National ID *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.ownerDetails.nationalId}
                    onChange={(e) => updateFormData('ownerDetails', 'nationalId', e.target.value)}
                    placeholder="CM12345678901234"
                  />
                </div>

                {formData.ownerDetails.isCompany && (
                  <>
                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.ownerDetails.companyName}
                        onChange={(e) => updateFormData('ownerDetails', 'companyName', e.target.value)}
                        placeholder="Company/Organization name"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Registration Number *
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.ownerDetails.registrationNumber}
                        onChange={(e) => updateFormData('ownerDetails', 'registrationNumber', e.target.value)}
                        placeholder="Company registration number"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="d365-input"
                    value={formData.ownerDetails.phone}
                    onChange={(e) => updateFormData('ownerDetails', 'phone', e.target.value)}
                    placeholder="+256 7XX XXX XXX"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="d365-input"
                    value={formData.ownerDetails.email}
                    onChange={(e) => updateFormData('ownerDetails', 'email', e.target.value)}
                    placeholder="owner@email.com"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.ownerDetails.district}
                    onChange={(e) => updateFormData('ownerDetails', 'district', e.target.value)}
                    placeholder="District of residence"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Address *
                  </label>
                  <textarea
                    className="d365-input min-h-20"
                    value={formData.ownerDetails.address}
                    onChange={(e) => updateFormData('ownerDetails', 'address', e.target.value)}
                    placeholder="Full address"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Required Documents
              </h2>
              <p className="text-body text-d365-text-secondary">
                Upload all required documents for vehicle registration
              </p>
            </div>

            <div className="grid gap-6">
              {[
                { key: 'purchaseInvoice', label: 'Purchase Invoice', required: true, description: 'Original vehicle purchase invoice' },
                { key: 'insuranceCertificate', label: 'Insurance Certificate', required: true, description: 'Valid vehicle insurance certificate' },
                { key: 'emissionTest', label: 'Emission Test Report', required: true, description: 'Pollution under control certificate' },
                { key: 'idProof', label: 'ID Proof', required: true, description: 'National ID or passport copy' },
                { key: 'form20', label: 'Form 20', required: false, description: 'Application for registration (auto-filled)' },
                { key: 'form21', label: 'Form 21', required: false, description: 'Sale certificate (auto-filled)' },
                { key: 'form22', label: 'Form 22', required: false, description: 'NOC from financier (if applicable)' }
              ].map((doc) => (
                <div key={doc.key} className="border border-d365-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-d365-text-primary">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      <p className="text-caption text-d365-text-secondary">{doc.description}</p>
                      <p className="text-caption text-d365-text-secondary mt-1">
                        Accepted formats: JPG, PNG, PDF (Max 5MB)
                      </p>
                    </div>
                    {formData.documents[doc.key as keyof typeof formData.documents] && (
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
                          handleFileUpload(doc.key as keyof typeof formData.documents, file);
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
                    {formData.documents[doc.key as keyof typeof formData.documents] && (
                      <p className="text-caption text-green-600 mt-2">
                        ✓ {formData.documents[doc.key as keyof typeof formData.documents]?.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Registration Fees & Payment
              </h2>
              <p className="text-body text-d365-text-secondary">
                Review fees and complete payment
              </p>
            </div>

            {/* RTO Selection */}
            <div className="mb-6">
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Select RTO / Region *
              </label>
              <select
                className="d365-input max-w-md"
                value={formData.rtoRegion}
                onChange={(e) => updateFormData('rtoRegion', '', e.target.value)}
              >
                <option value="">Select RTO region</option>
                {rtoRegions.map((rto) => (
                  <option key={rto.id} value={rto.id}>
                    {rto.id} - {rto.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Fee Breakdown */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-semibold text-d365-text-primary mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Fee Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Base Registration Fee</span>
                  <span>UGX {formData.fees.baseFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Road Tax</span>
                  <span>UGX {formData.fees.roadTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Environmental Cess</span>
                  <span>UGX {formData.fees.environmentalCess.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Fast Tag (Optional)</span>
                  <span>UGX {formData.fees.fastTag.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-d365-primary">UGX {formData.fees.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold text-d365-text-primary mb-4">Payment Method</h3>
              <div className="grid gap-4">
                {paymentMethods.map((method) => {
                  const IconComponent = method.icon;
                  return (
                    <div
                      key={method.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-d365-primary bg-d365-hover'
                          : 'border-d365-border hover:border-d365-primary-light'
                      }`}
                      onClick={() => updateFormData('paymentMethod', '', method.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5 text-d365-primary" />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-caption text-d365-text-secondary">
                              Processing fee: UGX {method.fee.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        {formData.paymentMethod === method.id && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                Review & Submit
              </h2>
              <p className="text-body text-d365-text-secondary">
                Please review all information before submitting
              </p>
            </div>

            {/* Application Summary */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-caption">
                <div>
                  <div className="text-d365-text-secondary">Registration Type:</div>
                  <div className="font-medium">
                    {registrationTypes.find(t => t.id === formData.registrationType)?.title}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Vehicle:</div>
                  <div className="font-medium">
                    {formData.vehicleDetails.make} {formData.vehicleDetails.model}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Owner:</div>
                  <div className="font-medium">{formData.ownerDetails.ownerName}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">RTO Region:</div>
                  <div className="font-medium">
                    {rtoRegions.find(r => r.id === formData.rtoRegion)?.name}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Total Fees:</div>
                  <div className="font-medium">UGX {formData.fees.total.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Payment Method:</div>
                  <div className="font-medium">
                    {paymentMethods.find(p => p.id === formData.paymentMethod)?.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border border-d365-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms-vehicle" className="mt-1" />
                <label htmlFor="terms-vehicle" className="text-body text-d365-text-secondary">
                  I certify that all information provided is true and accurate. I understand that providing false information is a criminal offense and that this vehicle registration is subject to verification by the transport authorities.
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="d365-page-header">
          <div>
            <h1 className="d365-page-title">Vehicle Registration Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
              Vehicle Registration Submitted!
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your vehicle registration application has been received and payment has been processed.
            </p>
          </div>

          <div className="bg-d365-surface-secondary rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Application ID:</span>
                <span className="font-semibold">VR-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="font-medium">
                  {formData.vehicleDetails.make} {formData.vehicleDetails.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Registration Number:</span>
                <span className="font-semibold text-d365-primary">
                  {formData.rtoRegion} 1234 AB
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Payment Confirmed</span>
              </div>
              <div className="flex justify-between">
                <span>RC Available:</span>
                <span>3-5 business days</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="d365-button-primary w-full">
              <Download className="w-4 h-4 mr-2" />
              Download e-RC (Available Soon)
            </button>
            <button className="d365-button-secondary w-full">
              <Eye className="w-4 h-4 mr-2" />
              Track Status
            </button>
            <button className="d365-button-secondary w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Apply for Vehicle Registration</h1>
          <p className="d365-page-subtitle">Register your vehicle and obtain official registration certificate</p>
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

          {currentStep < 6 ? (
            <button
              className="d365-button-primary flex items-center gap-2"
              onClick={handleNext}
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              className="d365-button-primary flex items-center gap-2"
              onClick={handleSubmit}
            >
              Submit & Pay
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}