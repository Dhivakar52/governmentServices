import  { useState } from 'react';
import { 
  User, 
  FileText, 
  Upload,
  Send,
  CheckCircle,
  Eye,
  Download,
  Users,
  AlertTriangle
} from 'lucide-react';

interface DeathCertificateForm {
  deceasedInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    nationalId: string;
    dateOfBirth: string;
    dateOfDeath: string;
    timeOfDeath: string;
    gender: string;
    occupation: string;
    maritalStatus: string;
    placeOfDeath: string;
  };
  causeOfDeath: {
    primaryCause: string;
    secondaryCause: string;
    manner: string;
    certifyingPhysician: string;
    hospitalName: string;
  };
  supportingDocs: {
    medicalCertificate: File | null;
    hospitalRecord: File | null;
    policeReport: File | null;
    deathSlip: File | null;
  };
  familyDetails: {
    reportedBy: string;
    relationToDeceased: string;
    reporterNationalId: string;
    reporterPhone: string;
    reporterAddress: string;
  };
  witnessInfo: {
    hasWitness: boolean;
    witness: {
      name: string;
      nationalId: string;
      relationship: string;
      phone: string;
    };
  };
  region: string;
}

export function ApplyDeathCertificate() {
  const [currentSection, setCurrentSection] = useState('deceased');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<DeathCertificateForm>({
    deceasedInfo: {
      firstName: '',
      middleName: '',
      lastName: '',
      nationalId: '',
      dateOfBirth: '',
      dateOfDeath: '',
      timeOfDeath: '',
      gender: '',
      occupation: '',
      maritalStatus: '',
      placeOfDeath: ''
    },
    causeOfDeath: {
      primaryCause: '',
      secondaryCause: '',
      manner: '',
      certifyingPhysician: '',
      hospitalName: ''
    },
    supportingDocs: {
      medicalCertificate: null,
      hospitalRecord: null,
      policeReport: null,
      deathSlip: null
    },
    familyDetails: {
      reportedBy: '',
      relationToDeceased: '',
      reporterNationalId: '',
      reporterPhone: '',
      reporterAddress: ''
    },
    witnessInfo: {
      hasWitness: false,
      witness: {
        name: '',
        nationalId: '',
        relationship: '',
        phone: ''
      }
    },
    region: ''
  });

  const sections = [
    { id: 'deceased', title: 'Deceased Information', icon: User },
    { id: 'cause', title: 'Cause of Death', icon: FileText },
    { id: 'documents', title: 'Supporting Documents', icon: Upload },
    { id: 'family', title: 'Family/Reporter Details', icon: Users },
    { id: 'finalize', title: 'Review & Submit', icon: CheckCircle }
  ];

  const causesOfDeath = [
    'Natural Death',
    'Heart Attack/Cardiac Arrest',
    'Stroke/Cerebrovascular Accident',
    'Cancer/Malignant Neoplasm',
    'Respiratory Failure',
    'Kidney Failure',
    'Diabetes Complications',
    'Infectious Disease',
    'Accidental Death',
    'Road Traffic Accident',
    'Other'
  ];

  const mannerOfDeath = [
    'Natural',
    'Accident',
    'Suicide',
    'Homicide',
    'Undetermined',
    'Pending Investigation'
  ];

  const maritalStatuses = [
    'Single',
    'Married',
    'Divorced',
    'Widowed',
    'Separated'
  ];

  const relationships = [
    'Spouse',
    'Child',
    'Parent',
    'Sibling',
    'Grandchild',
    'Grandparent',
    'Uncle/Aunt',
    'Nephew/Niece',
    'Cousin',
    'Friend',
    'Other'
  ];

  const regions = [
    'Central Region',
    'Eastern Region', 
    'Northern Region',
    'Western Region',
    'Kampala Capital City'
  ];

  const updateFormData = (section: keyof DeathCertificateForm, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        // ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedFormData = (section: keyof DeathCertificateForm, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        // ...prev[section],
        [subsection]: {
          // ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Death certificate application submitted:', formData);
    setIsSubmitted(true);
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'deceased':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.firstName}
                  onChange={(e) => updateFormData('deceasedInfo', 'firstName', e.target.value)}
                  placeholder="Deceased's first name"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.middleName}
                  onChange={(e) => updateFormData('deceasedInfo', 'middleName', e.target.value)}
                  placeholder="Middle name (optional)"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.lastName}
                  onChange={(e) => updateFormData('deceasedInfo', 'lastName', e.target.value)}
                  placeholder="Deceased's last name"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  National ID *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.nationalId}
                  onChange={(e) => updateFormData('deceasedInfo', 'nationalId', e.target.value)}
                  placeholder="CM12345678901234"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className="d365-input"
                  value={formData.deceasedInfo.dateOfBirth}
                  onChange={(e) => updateFormData('deceasedInfo', 'dateOfBirth', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Gender *
                </label>
                <select
                  className="d365-input"
                  value={formData.deceasedInfo.gender}
                  onChange={(e) => updateFormData('deceasedInfo', 'gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Date of Death *
                </label>
                <input
                  type="date"
                  className="d365-input"
                  value={formData.deceasedInfo.dateOfDeath}
                  onChange={(e) => updateFormData('deceasedInfo', 'dateOfDeath', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Time of Death
                </label>
                <input
                  type="time"
                  className="d365-input"
                  value={formData.deceasedInfo.timeOfDeath}
                  onChange={(e) => updateFormData('deceasedInfo', 'timeOfDeath', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.occupation}
                  onChange={(e) => updateFormData('deceasedInfo', 'occupation', e.target.value)}
                  placeholder="Deceased's occupation"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Marital Status
                </label>
                <select
                  className="d365-input"
                  value={formData.deceasedInfo.maritalStatus}
                  onChange={(e) => updateFormData('deceasedInfo', 'maritalStatus', e.target.value)}
                >
                  <option value="">Select status</option>
                  {maritalStatuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Place of Death *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.deceasedInfo.placeOfDeath}
                  onChange={(e) => updateFormData('deceasedInfo', 'placeOfDeath', e.target.value)}
                  placeholder="Hospital, home address, or location where death occurred"
                />
              </div>
            </div>
          </div>
        );

      case 'cause':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-body text-yellow-800">
                    <strong>Important:</strong> This information must be certified by a qualified medical practitioner. 
                    Providing false information is a criminal offense.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Primary Cause of Death *
                </label>
                <select
                  className="d365-input"
                  value={formData.causeOfDeath.primaryCause}
                  onChange={(e) => updateFormData('causeOfDeath', 'primaryCause', e.target.value)}
                >
                  <option value="">Select primary cause</option>
                  {causesOfDeath.map((cause) => (
                    <option key={cause} value={cause}>{cause}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Secondary/Contributing Cause
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.causeOfDeath.secondaryCause}
                  onChange={(e) => updateFormData('causeOfDeath', 'secondaryCause', e.target.value)}
                  placeholder="Additional contributing factors"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Manner of Death *
                </label>
                <select
                  className="d365-input"
                  value={formData.causeOfDeath.manner}
                  onChange={(e) => updateFormData('causeOfDeath', 'manner', e.target.value)}
                >
                  <option value="">Select manner</option>
                  {mannerOfDeath.map((manner) => (
                    <option key={manner} value={manner}>{manner}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Certifying Physician *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.causeOfDeath.certifyingPhysician}
                  onChange={(e) => updateFormData('causeOfDeath', 'certifyingPhysician', e.target.value)}
                  placeholder="Dr. Full Name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Hospital/Institution Name
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.causeOfDeath.hospitalName}
                  onChange={(e) => updateFormData('causeOfDeath', 'hospitalName', e.target.value)}
                  placeholder="Hospital or medical institution name"
                />
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <p className="text-body text-d365-text-secondary mb-6">
              Upload the required supporting documents. At least one document is required.
            </p>

            <div className="grid gap-6">
              {[
                { 
                  key: 'medicalCertificate', 
                  label: 'Medical Certificate of Death', 
                  description: 'Official medical certificate from attending physician',
                  required: true 
                },
                { 
                  key: 'hospitalRecord', 
                  label: 'Hospital/Clinical Records', 
                  description: 'Hospital discharge summary or medical records',
                  required: false 
                },
                { 
                  key: 'policeReport', 
                  label: 'Police Report', 
                  description: 'Required for accidental deaths, homicides, or suicides',
                  required: false 
                },
                { 
                  key: 'deathSlip', 
                  label: 'Death Slip/Notification', 
                  description: 'Hospital or mortuary death notification slip',
                  required: false 
                }
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
                    {formData.supportingDocs[doc.key as keyof typeof formData.supportingDocs] && (
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
                          updateFormData('supportingDocs', doc.key, file);
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
                    {formData.supportingDocs[doc.key as keyof typeof formData.supportingDocs] && (
                      <p className="text-caption text-green-600 mt-2">
                        ✓ {formData.supportingDocs[doc.key as keyof typeof formData.supportingDocs]?.name}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'family':
        return (
          <div className="space-y-8">
            {/* Reporter Information */}
            <div>
              <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
                Person Reporting the Death
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.familyDetails.reportedBy}
                    onChange={(e) => updateFormData('familyDetails', 'reportedBy', e.target.value)}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Relationship to Deceased *
                  </label>
                  <select
                    className="d365-input"
                    value={formData.familyDetails.relationToDeceased}
                    onChange={(e) => updateFormData('familyDetails', 'relationToDeceased', e.target.value)}
                  >
                    <option value="">Select relationship</option>
                    {relationships.map((rel) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    National ID *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.familyDetails.reporterNationalId}
                    onChange={(e) => updateFormData('familyDetails', 'reporterNationalId', e.target.value)}
                    placeholder="Your national ID"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="d365-input"
                    value={formData.familyDetails.reporterPhone}
                    onChange={(e) => updateFormData('familyDetails', 'reporterPhone', e.target.value)}
                    placeholder="+256 7XX XXX XXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Address *
                  </label>
                  <textarea
                    className="d365-input min-h-20"
                    value={formData.familyDetails.reporterAddress}
                    onChange={(e) => updateFormData('familyDetails', 'reporterAddress', e.target.value)}
                    placeholder="Your current address"
                  />
                </div>
              </div>
            </div>

            {/* Witness Information */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  id="has-witness-death"
                  checked={formData.witnessInfo.hasWitness}
                  onChange={(e) => updateFormData('witnessInfo', 'hasWitness', e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="has-witness-death" className="text-body text-d365-text-primary">
                  I have a witness to confirm the death (Optional but recommended)
                </label>
              </div>

              {formData.witnessInfo.hasWitness && (
                <div>
                  <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
                    Witness Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.witnessInfo.witness.name}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness', 'name', e.target.value)}
                        placeholder="Witness full name"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        National ID *
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.witnessInfo.witness.nationalId}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness', 'nationalId', e.target.value)}
                        placeholder="Witness national ID"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Relationship to Deceased
                      </label>
                      <select
                        className="d365-input"
                        value={formData.witnessInfo.witness.relationship}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness', 'relationship', e.target.value)}
                      >
                        <option value="">Select relationship</option>
                        {relationships.map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="d365-input"
                        value={formData.witnessInfo.witness.phone}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness', 'phone', e.target.value)}
                        placeholder="+256 7XX XXX XXX"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'finalize':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Region *
              </label>
              <select
                className="d365-input max-w-md"
                value={formData.region}
                onChange={(e) => updateFormData('region', '', e.target.value)}
              >
                <option value="">Select region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Application Summary */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-caption">
                <div>
                  <div className="text-d365-text-secondary">Deceased Name:</div>
                  <div className="font-medium">
                    {formData.deceasedInfo.firstName} {formData.deceasedInfo.middleName} {formData.deceasedInfo.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Date of Death:</div>
                  <div className="font-medium">{formData.deceasedInfo.dateOfDeath}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">National ID:</div>
                  <div className="font-medium">{formData.deceasedInfo.nationalId}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Primary Cause:</div>
                  <div className="font-medium">{formData.causeOfDeath.primaryCause}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Reported By:</div>
                  <div className="font-medium">{formData.familyDetails.reportedBy}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Region:</div>
                  <div className="font-medium">{formData.region}</div>
                </div>
              </div>
            </div>

            {/* Approval Workflow Summary */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4">Approval Workflow</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-caption font-medium">1</div>
                  <div>
                    <div className="font-medium">Initial Review</div>
                    <div className="text-caption text-d365-text-secondary">Registry office verifies submitted documents</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-caption font-medium">2</div>
                  <div>
                    <div className="font-medium">Medical Verification</div>
                    <div className="text-caption text-d365-text-secondary">Medical officer confirms cause of death details</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-caption font-medium">3</div>
                  <div>
                    <div className="font-medium">Final Approval</div>
                    <div className="text-caption text-d365-text-secondary">Registrar approves and issues death certificate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border border-d365-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms-death" className="mt-1" />
                <label htmlFor="terms-death" className="text-body text-d365-text-secondary">
                  I certify that all information provided is true and accurate. I understand that providing false information about a death is a serious criminal offense. I also understand that this application will be reviewed by medical and registry officials.
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
            <h1 className="d365-page-title">Death Certificate Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
              Death Certificate Application Submitted!
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your application has been received and is being processed by the registry office.
            </p>
          </div>

          <div className="bg-d365-surface-secondary rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Application ID:</span>
                <span className="font-semibold">DC-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span>Deceased Name:</span>
                <span className="font-medium">
                  {formData.deceasedInfo.firstName} {formData.deceasedInfo.middleName} {formData.deceasedInfo.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-orange-600">Under Medical Review</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Processing:</span>
                <span>10-14 business days</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="d365-button-primary w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Approval Workflow
            </button>
            <button className="d365-button-secondary w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Confirmation
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
          <h1 className="d365-page-title">Apply for Death Certificate</h1>
          <p className="d365-page-subtitle">Register a death and apply for an official death certificate</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                const isActive = currentSection === section.id;
                
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-d365-primary text-white'
                        : 'hover:bg-d365-surface-secondary text-d365-text-primary'
                    }`}
                    onClick={() => setCurrentSection(section.id)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-d365-border p-8">
              <div className="mb-6">
                <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                  {sections.find(s => s.id === currentSection)?.title}
                </h2>
                <div className="w-12 h-1 bg-d365-primary rounded"></div>
              </div>

              {renderSectionContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-d365-border">
                <button
                  className="d365-button-secondary"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === currentSection);
                    if (currentIndex > 0) {
                      setCurrentSection(sections[currentIndex - 1].id);
                    }
                  }}
                  disabled={currentSection === 'deceased'}
                >
                  Previous
                </button>

                {currentSection === 'finalize' ? (
                  <button
                    className="d365-button-primary flex items-center gap-2"
                    onClick={handleSubmit}
                  >
                    <Send className="w-4 h-4" />
                    Submit Application
                  </button>
                ) : (
                  <button
                    className="d365-button-primary"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === currentSection);
                      if (currentIndex < sections.length - 1) {
                        setCurrentSection(sections[currentIndex + 1].id);
                      }
                    }}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}