import  { useState } from 'react';
import { 
  Baby, 
  Users, 
  Building2, 
  UserCheck, 
  FileSignature,
  Upload,
  Send,
  CheckCircle,
  Eye,
  Download
} from 'lucide-react';

interface BirthCertificateForm {
  childDetails: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    gender: string;
    placeOfBirth: string;
    weight: string;
  };
  parentInfo: {
    father: {
      firstName: string;
      lastName: string;
      nationalId: string;
      occupation: string;
      nationality: string;
    };
    mother: {
      firstName: string;
      lastName: string;
      nationalId: string;
      occupation: string;
      nationality: string;
    };
  };
  hospitalDetails: {
    hospital: string;
    attendant: string;
    registrationNumber: string;
    birthSlip: File | null;
  };
  witnessInfo: {
    hasWitness: boolean;
    witness1: {
      name: string;
      nationalId: string;
      relationship: string;
    };
    witness2: {
      name: string;
      nationalId: string;
      relationship: string;
    };
  };
  region: string;
  digitalSignature: string;
}

export function ApplyBirthCertificate() {
  const [currentSection, setCurrentSection] = useState('child');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<BirthCertificateForm>({
    childDetails: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      timeOfBirth: '',
      gender: '',
      placeOfBirth: '',
      weight: ''
    },
    parentInfo: {
      father: {
        firstName: '',
        lastName: '',
        nationalId: '',
        occupation: '',
        nationality: 'Ugandan'
      },
      mother: {
        firstName: '',
        lastName: '',
        nationalId: '',
        occupation: '',
        nationality: 'Ugandan'
      }
    },
    hospitalDetails: {
      hospital: '',
      attendant: '',
      registrationNumber: '',
      birthSlip: null
    },
    witnessInfo: {
      hasWitness: false,
      witness1: {
        name: '',
        nationalId: '',
        relationship: ''
      },
      witness2: {
        name: '',
        nationalId: '',
        relationship: ''
      }
    },
    region: '',
    digitalSignature: ''
  });

  const sections = [
    { id: 'child', title: 'Child Details', icon: Baby, completed: false },
    { id: 'parents', title: 'Parent Information', icon: Users, completed: false },
    { id: 'hospital', title: 'Hospital Details', icon: Building2, completed: false },
    { id: 'witness', title: 'Witness Information', icon: UserCheck, completed: false },
    { id: 'finalize', title: 'Finalize & Submit', icon: FileSignature, completed: false }
  ];

  const hospitals = [
    'Mulago National Referral Hospital',
    'Mengo Hospital',
    'International Hospital Kampala',
    'Nsambya Hospital',
    'Nakasero Hospital',
    'Kiruddu General Hospital',
    'Other (Home Birth/Private)'
  ];

  const regions = [
    'Central Region',
    'Eastern Region', 
    'Northern Region',
    'Western Region',
    'Kampala Capital City'
  ];

  const relationships = [
    'Grandparent',
    'Uncle/Aunt',
    'Sibling',
    'Family Friend',
    'Neighbor',
    'Religious Leader',
    'Community Leader'
  ];

  const updateFormData = (section: keyof BirthCertificateForm, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        // ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedFormData = (section: keyof BirthCertificateForm, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
      //   ...prev[section],
        [subsection]: {
          // ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Birth certificate application submitted:', formData);
    setIsSubmitted(true);
  };

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'child':
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
                  value={formData.childDetails.firstName}
                  onChange={(e) => updateFormData('childDetails', 'firstName', e.target.value)}
                  placeholder="Enter child's first name"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Middle Name
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.childDetails.middleName}
                  onChange={(e) => updateFormData('childDetails', 'middleName', e.target.value)}
                  placeholder="Enter middle name (optional)"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.childDetails.lastName}
                  onChange={(e) => updateFormData('childDetails', 'lastName', e.target.value)}
                  placeholder="Enter child's last name"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Gender *
                </label>
                <select
                  className="d365-input"
                  value={formData.childDetails.gender}
                  onChange={(e) => updateFormData('childDetails', 'gender', e.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className="d365-input"
                  value={formData.childDetails.dateOfBirth}
                  onChange={(e) => updateFormData('childDetails', 'dateOfBirth', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Time of Birth
                </label>
                <input
                  type="time"
                  className="d365-input"
                  value={formData.childDetails.timeOfBirth}
                  onChange={(e) => updateFormData('childDetails', 'timeOfBirth', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Place of Birth *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.childDetails.placeOfBirth}
                  onChange={(e) => updateFormData('childDetails', 'placeOfBirth', e.target.value)}
                  placeholder="Hospital/City where child was born"
                />
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Birth Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="d365-input"
                  value={formData.childDetails.weight}
                  onChange={(e) => updateFormData('childDetails', 'weight', e.target.value)}
                  placeholder="e.g., 3.2"
                />
              </div>
            </div>
          </div>
        );

      case 'parents':
        return (
          <div className="space-y-8">
            {/* Father's Information */}
            <div>
              <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Father's Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.father.firstName}
                    onChange={(e) => updateNestedFormData('parentInfo', 'father', 'firstName', e.target.value)}
                    placeholder="Father's first name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.father.lastName}
                    onChange={(e) => updateNestedFormData('parentInfo', 'father', 'lastName', e.target.value)}
                    placeholder="Father's last name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    National ID *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.father.nationalId}
                    onChange={(e) => updateNestedFormData('parentInfo', 'father', 'nationalId', e.target.value)}
                    placeholder="CM12345678901234"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.father.occupation}
                    onChange={(e) => updateNestedFormData('parentInfo', 'father', 'occupation', e.target.value)}
                    placeholder="Father's occupation"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Nationality *
                  </label>
                  <select
                    className="d365-input"
                    value={formData.parentInfo.father.nationality}
                    onChange={(e) => updateNestedFormData('parentInfo', 'father', 'nationality', e.target.value)}
                  >
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mother's Information */}
            <div>
              <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Mother's Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.mother.firstName}
                    onChange={(e) => updateNestedFormData('parentInfo', 'mother', 'firstName', e.target.value)}
                    placeholder="Mother's first name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.mother.lastName}
                    onChange={(e) => updateNestedFormData('parentInfo', 'mother', 'lastName', e.target.value)}
                    placeholder="Mother's last name"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    National ID *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.mother.nationalId}
                    onChange={(e) => updateNestedFormData('parentInfo', 'mother', 'nationalId', e.target.value)}
                    placeholder="CF12345678901234"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.parentInfo.mother.occupation}
                    onChange={(e) => updateNestedFormData('parentInfo', 'mother', 'occupation', e.target.value)}
                    placeholder="Mother's occupation"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Nationality *
                  </label>
                  <select
                    className="d365-input"
                    value={formData.parentInfo.mother.nationality}
                    onChange={(e) => updateNestedFormData('parentInfo', 'mother', 'nationality', e.target.value)}
                  >
                    <option value="Ugandan">Ugandan</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Tanzanian">Tanzanian</option>
                    <option value="Rwandan">Rwandan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'hospital':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Hospital/Health Facility *
                </label>
                <select
                  className="d365-input"
                  value={formData.hospitalDetails.hospital}
                  onChange={(e) => updateFormData('hospitalDetails', 'hospital', e.target.value)}
                >
                  <option value="">Select hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital} value={hospital}>{hospital}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Attending Medical Officer *
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.hospitalDetails.attendant}
                  onChange={(e) => updateFormData('hospitalDetails', 'attendant', e.target.value)}
                  placeholder="Name of doctor/midwife"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Hospital Registration Number
                </label>
                <input
                  type="text"
                  className="d365-input"
                  value={formData.hospitalDetails.registrationNumber}
                  onChange={(e) => updateFormData('hospitalDetails', 'registrationNumber', e.target.value)}
                  placeholder="Hospital's registration number (if available)"
                />
              </div>
            </div>

            {/* Birth Slip Upload */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4">Upload Birth Slip</h3>
              <div className="border-2 border-dashed border-d365-border rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 text-d365-text-secondary mx-auto mb-3" />
                <p className="text-body text-d365-text-secondary mb-4">
                  Upload the hospital birth slip or delivery note
                </p>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateFormData('hospitalDetails', 'birthSlip', file);
                    }
                  }}
                  className="hidden"
                  id="birth-slip-upload"
                />
                <label
                  htmlFor="birth-slip-upload"
                  className="d365-button-secondary cursor-pointer"
                >
                  Choose File
                </label>
                {formData.hospitalDetails.birthSlip && (
                  <p className="text-caption text-green-600 mt-2">
                    ✓ {formData.hospitalDetails.birthSlip.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 'witness':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                id="has-witness"
                checked={formData.witnessInfo.hasWitness}
                onChange={(e) => updateFormData('witnessInfo', 'hasWitness', e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="has-witness" className="text-body text-d365-text-primary">
                I have witnesses to the birth (Optional but recommended)
              </label>
            </div>

            {formData.witnessInfo.hasWitness && (
              <div className="space-y-8">
                {/* Witness 1 */}
                <div>
                  <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
                    Primary Witness
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.witnessInfo.witness1.name}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness1', 'name', e.target.value)}
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
                        value={formData.witnessInfo.witness1.nationalId}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness1', 'nationalId', e.target.value)}
                        placeholder="Witness national ID"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Relationship to Family *
                      </label>
                      <select
                        className="d365-input"
                        value={formData.witnessInfo.witness1.relationship}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness1', 'relationship', e.target.value)}
                      >
                        <option value="">Select relationship</option>
                        {relationships.map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Witness 2 */}
                <div>
                  <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
                    Secondary Witness (Optional)
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.witnessInfo.witness2.name}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness2', 'name', e.target.value)}
                        placeholder="Second witness full name"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        National ID
                      </label>
                      <input
                        type="text"
                        className="d365-input"
                        value={formData.witnessInfo.witness2.nationalId}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness2', 'nationalId', e.target.value)}
                        placeholder="Second witness national ID"
                      />
                    </div>

                    <div>
                      <label className="block text-body font-medium text-d365-text-primary mb-2">
                        Relationship to Family
                      </label>
                      <select
                        className="d365-input"
                        value={formData.witnessInfo.witness2.relationship}
                        onChange={(e) => updateNestedFormData('witnessInfo', 'witness2', 'relationship', e.target.value)}
                      >
                        <option value="">Select relationship</option>
                        {relationships.map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'finalize':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-body font-medium text-d365-text-primary mb-2">
                  Region *
                </label>
                <select
                  className="d365-input"
                  value={formData.region}
                  onChange={(e) => updateFormData('region', '', e.target.value)}
                >
                  <option value="">Select region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Digital Signature */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4 flex items-center gap-2">
                <FileSignature className="w-5 h-5" />
                Digital Signature
              </h3>
              <div className="space-y-4">
                <p className="text-body text-d365-text-secondary">
                  By typing your full name below, you are providing a digital signature confirming that all information is accurate.
                </p>
                <div>
                  <label className="block text-body font-medium text-d365-text-primary mb-2">
                    Type your full name as signature *
                  </label>
                  <input
                    type="text"
                    className="d365-input"
                    value={formData.digitalSignature}
                    onChange={(e) => updateFormData('digitalSignature', '', e.target.value)}
                    placeholder="Type your full legal name"
                  />
                </div>
              </div>
            </div>

            {/* Application Summary */}
            <div className="border border-d365-border rounded-lg p-6">
              <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-caption">
                <div>
                  <div className="text-d365-text-secondary">Child's Name:</div>
                  <div className="font-medium">
                    {formData.childDetails.firstName} {formData.childDetails.middleName} {formData.childDetails.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Date of Birth:</div>
                  <div className="font-medium">{formData.childDetails.dateOfBirth}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Father's Name:</div>
                  <div className="font-medium">
                    {formData.parentInfo.father.firstName} {formData.parentInfo.father.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Mother's Name:</div>
                  <div className="font-medium">
                    {formData.parentInfo.mother.firstName} {formData.parentInfo.mother.lastName}
                  </div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Hospital:</div>
                  <div className="font-medium">{formData.hospitalDetails.hospital}</div>
                </div>
                <div>
                  <div className="text-d365-text-secondary">Region:</div>
                  <div className="font-medium">{formData.region}</div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="border border-d365-border rounded-lg p-6">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms-birth" className="mt-1" />
                <label htmlFor="terms-birth" className="text-body text-d365-text-secondary">
                  I certify that all information provided is true and accurate. I understand that providing false information is a criminal offense.
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
            <h1 className="d365-page-title">Birth Certificate Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
              Birth Certificate Application Submitted!
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your application has been received and is being processed by the registry office.
            </p>
          </div>

          <div className="bg-d365-surface-secondary rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Application ID:</span>
                <span className="font-semibold">BC-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span>Child's Name:</span>
                <span className="font-medium">
                  {formData.childDetails.firstName} {formData.childDetails.middleName} {formData.childDetails.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-orange-600">Under Review</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Processing:</span>
                <span>7-14 business days</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="d365-button-primary w-full">
              <Eye className="w-4 h-4 mr-2" />
              View Timeline
            </button>
            <button className="d365-button-secondary w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Timeline
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
          <h1 className="d365-page-title">Apply for Birth Certificate</h1>
          <p className="d365-page-subtitle">Register a birth and apply for an official birth certificate</p>
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
                  disabled={currentSection === 'child'}
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