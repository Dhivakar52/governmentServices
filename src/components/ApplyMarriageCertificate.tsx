import  { useState } from 'react';
import { 

  Users, 
  Calendar, 
  
  UserCheck, 
  Upload,
  Send,
  CheckCircle,
  Eye,
  Download,
  FileSignature,

} from 'lucide-react';

interface MarriageCertificateForm {
  partnerA: {
    firstName: string;
    middleName: string;
    lastName: string;
    nationalId: string;
    dateOfBirth: string;
    age: string;
    occupation: string;
    address: string;
    nationality: string;
    maritalStatus: string;
  };
  partnerB: {
    firstName: string;
    middleName: string;
    lastName: string;
    nationalId: string;
    dateOfBirth: string;
    age: string;
    occupation: string;
    address: string;
    nationality: string;
    maritalStatus: string;
  };
  marriageDetails: {
    marriageDate: string;
    marriageTime: string;
    venue: string;
    venueAddress: string;
    marriageType: string;
    officiant: string;
    religion: string;
  };
  witnessInfo: {
    witness1: {
      name: string;
      nationalId: string;
      relationship: string;
      phone: string;
      signature: File | null;
    };
    witness2: {
      name: string;
      nationalId: string;
      relationship: string;
      phone: string;
      signature: File | null;
    };
  };
  supportingDocs: {
    partnerAId: File | null;
    partnerBId: File | null;
    marriageProof: File | null;
    medicalCertificates: File | null;
    venuePermit: File | null;
  };
  region: string;
  digitalSignatureA: string;
  digitalSignatureB: string;
}

export function ApplyMarriageCertificate() {
  const [currentSection, setCurrentSection] = useState('partnerA');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<MarriageCertificateForm>({
    partnerA: {
      firstName: '',
      middleName: '',
      lastName: '',
      nationalId: '',
      dateOfBirth: '',
      age: '',
      occupation: '',
      address: '',
      nationality: 'Ugandan',
      maritalStatus: 'single'
    },
    partnerB: {
      firstName: '',
      middleName: '',
      lastName: '',
      nationalId: '',
      dateOfBirth: '',
      age: '',
      occupation: '',
      address: '',
      nationality: 'Ugandan',
      maritalStatus: 'single'
    },
    marriageDetails: {
      marriageDate: '',
      marriageTime: '',
      venue: '',
      venueAddress: '',
      marriageType: 'civil',
      officiant: '',
      religion: ''
    },
    witnessInfo: {
      witness1: {
        name: '',
        nationalId: '',
        relationship: '',
        phone: '',
        signature: null
      },
      witness2: {
        name: '',
        nationalId: '',
        relationship: '',
        phone: '',
        signature: null
      }
    },
    supportingDocs: {
      partnerAId: null,
      partnerBId: null,
      marriageProof: null,
      medicalCertificates: null,
      venuePermit: null
    },
    region: '',
    digitalSignatureA: '',
    digitalSignatureB: ''
  });

  const sections = [
    { id: 'partnerA', title: 'Partner A Details', icon: Users },
    { id: 'partnerB', title: 'Partner B Details', icon: Users },
    { id: 'marriage', title: 'Marriage Details', icon: Calendar },
    { id: 'witnesses', title: 'Witness Information', icon: UserCheck },
    { id: 'documents', title: 'Supporting Documents', icon: Upload },
    { id: 'finalize', title: 'Review & Submit', icon: FileSignature }
  ];

  const marriageTypes = [
    'Civil Marriage',
    'Religious Marriage',
    'Customary Marriage',
    'Islamic Marriage'
  ];

  const religions = [
    'Christianity',
    'Islam',
    'Hindu',
    'Buddhism',
    'Traditional',
    'Other',
    'None'
  ];

  const relationships = [
    'Parent',
    'Sibling',
    'Friend',
    'Relative',
    'Colleague',
    'Religious Leader',
    'Community Leader'
  ];

  const regions = [
    'Central Region',
    'Eastern Region', 
    'Northern Region',
    'Western Region',
    'Kampala Capital City'
  ];

  const maritalStatuses = [
    'single',
    'divorced',
    'widowed'
  ];

  const updatePartnerData = (partner: 'partnerA' | 'partnerB', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        [field]: value
      }
    }));
  };

  const updateMarriageDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      marriageDetails: {
        ...prev.marriageDetails,
        [field]: value
      }
    }));
  };

  const updateWitnessData = (witness: 'witness1' | 'witness2', field: string, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      witnessInfo: {
        ...prev.witnessInfo,
        [witness]: {
          ...prev.witnessInfo[witness],
          [field]: value
        }
      }
    }));
  };

  const updateSupportingDocs = (docType: keyof MarriageCertificateForm['supportingDocs'], file: File) => {
    setFormData(prev => ({
      ...prev,
      supportingDocs: {
        ...prev.supportingDocs,
        [docType]: file
      }
    }));
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleSubmit = () => {
    console.log('Marriage certificate application submitted:', formData);
    setIsSubmitted(true);
  };

  const renderPartnerSection = (partner: 'partnerA' | 'partnerB') => {
    const partnerData = formData[partner];
    const partnerLabel = partner === 'partnerA' ? 'Partner A' : 'Partner B';

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
              value={partnerData.firstName}
              onChange={(e) => updatePartnerData(partner, 'firstName', e.target.value)}
              placeholder={`${partnerLabel} first name`}
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Middle Name
            </label>
            <input
              type="text"
              className="d365-input"
              value={partnerData.middleName}
              onChange={(e) => updatePartnerData(partner, 'middleName', e.target.value)}
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
              value={partnerData.lastName}
              onChange={(e) => updatePartnerData(partner, 'lastName', e.target.value)}
              placeholder={`${partnerLabel} last name`}
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              National ID *
            </label>
            <input
              type="text"
              className="d365-input"
              value={partnerData.nationalId}
              onChange={(e) => updatePartnerData(partner, 'nationalId', e.target.value)}
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
              value={partnerData.dateOfBirth}
              onChange={(e) => {
                updatePartnerData(partner, 'dateOfBirth', e.target.value);
                if (e.target.value) {
                  updatePartnerData(partner, 'age', calculateAge(e.target.value));
                }
              }}
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Age
            </label>
            <input
              type="text"
              className="d365-input"
              value={partnerData.age}
              readOnly
              placeholder="Auto-calculated"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Occupation
            </label>
            <input
              type="text"
              className="d365-input"
              value={partnerData.occupation}
              onChange={(e) => updatePartnerData(partner, 'occupation', e.target.value)}
              placeholder={`${partnerLabel} occupation`}
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Nationality *
            </label>
            <select
              className="d365-input"
              value={partnerData.nationality}
              onChange={(e) => updatePartnerData(partner, 'nationality', e.target.value)}
            >
              <option value="Ugandan">Ugandan</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Tanzanian">Tanzanian</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Previous Marital Status *
            </label>
            <select
              className="d365-input"
              value={partnerData.maritalStatus}
              onChange={(e) => updatePartnerData(partner, 'maritalStatus', e.target.value)}
            >
              <option value="">Select status</option>
              {maritalStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Address *
            </label>
            <textarea
              className="d365-input min-h-20"
              value={partnerData.address}
              onChange={(e) => updatePartnerData(partner, 'address', e.target.value)}
              placeholder={`${partnerLabel} full address`}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderMarriageSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Date *
          </label>
          <input
            type="date"
            className="d365-input"
            value={formData.marriageDetails.marriageDate}
            onChange={(e) => updateMarriageDetails('marriageDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Time
          </label>
          <input
            type="time"
            className="d365-input"
            value={formData.marriageDetails.marriageTime}
            onChange={(e) => updateMarriageDetails('marriageTime', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Type *
          </label>
          <select
            className="d365-input"
            value={formData.marriageDetails.marriageType}
            onChange={(e) => updateMarriageDetails('marriageType', e.target.value)}
          >
            <option value="">Select marriage type</option>
            {marriageTypes.map((type) => (
              <option key={type} value={type.toLowerCase().replace(' ', '-')}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Religion (if applicable)
          </label>
          <select
            className="d365-input"
            value={formData.marriageDetails.religion}
            onChange={(e) => updateMarriageDetails('religion', e.target.value)}
          >
            <option value="">Select religion</option>
            {religions.map((religion) => (
              <option key={religion} value={religion.toLowerCase()}>{religion}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Venue *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.marriageDetails.venue}
            onChange={(e) => updateMarriageDetails('venue', e.target.value)}
            placeholder="Church, mosque, registry office, etc."
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Officiant Name *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.marriageDetails.officiant}
            onChange={(e) => updateMarriageDetails('officiant', e.target.value)}
            placeholder="Pastor, Imam, Registrar, etc."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Venue Address *
          </label>
          <textarea
            className="d365-input min-h-20"
            value={formData.marriageDetails.venueAddress}
            onChange={(e) => updateMarriageDetails('venueAddress', e.target.value)}
            placeholder="Full address of marriage venue"
          />
        </div>
      </div>
    </div>
  );

  const renderWitnessesSection = () => (
    <div className="space-y-8">
      {[
        { key: 'witness1', title: 'Primary Witness' },
        { key: 'witness2', title: 'Secondary Witness' }
      ].map((witness) => (
        <div key={witness.key}>
          <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
            {witness.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                className="d365-input"
                value={formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].name}
                onChange={(e) => updateWitnessData(witness.key as 'witness1' | 'witness2', 'name', e.target.value)}
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
                value={formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].nationalId}
                onChange={(e) => updateWitnessData(witness.key as 'witness1' | 'witness2', 'nationalId', e.target.value)}
                placeholder="Witness national ID"
              />
            </div>

            <div>
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Relationship to Couple
              </label>
              <select
                className="d365-input"
                value={formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].relationship}
                onChange={(e) => updateWitnessData(witness.key as 'witness1' | 'witness2', 'relationship', e.target.value)}
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
                value={formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].phone}
                onChange={(e) => updateWitnessData(witness.key as 'witness1' | 'witness2', 'phone', e.target.value)}
                placeholder="+256 7XX XXX XXX"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Digital Signature Upload
              </label>
              <div className="border-2 border-dashed border-d365-border rounded-lg p-4 text-center">
                <Upload className="w-6 h-6 text-d365-text-secondary mx-auto mb-2" />
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateWitnessData(witness.key as 'witness1' | 'witness2', 'signature', file);
                    }
                  }}
                  className="hidden"
                  id={`${witness.key}-signature`}
                />
                <label
                  htmlFor={`${witness.key}-signature`}
                  className="d365-button-secondary cursor-pointer text-caption"
                >
                  Upload Signature
                </label>
                {formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].signature && (
                  <p className="text-caption text-green-600 mt-2">
                    ✓ {formData.witnessInfo[witness.key as keyof typeof formData.witnessInfo].signature?.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDocumentsSection = () => (
    <div className="space-y-6">
      {[
        { key: 'partnerAId', label: 'Partner A National ID', required: true },
        { key: 'partnerBId', label: 'Partner B National ID', required: true },
        { key: 'marriageProof', label: 'Marriage Proof/Certificate', required: true },
        { key: 'medicalCertificates', label: 'Medical Certificates', required: false },
        { key: 'venuePermit', label: 'Venue Permit (if required)', required: false }
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
                  updateSupportingDocs(doc.key as keyof typeof formData.supportingDocs, file);
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
  );

  const renderFinalizeSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-body font-medium text-d365-text-primary mb-2">
          Region *
        </label>
        <select
          className="d365-input max-w-md"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      {/* Digital Signatures */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-d365-border rounded-lg p-6">
          <h3 className="font-medium text-d365-text-primary mb-4 flex items-center gap-2">
            <FileSignature className="w-5 h-5" />
            Partner A Digital Signature
          </h3>
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Type your full name as signature *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.digitalSignatureA}
              onChange={(e) => setFormData({ ...formData, digitalSignatureA: e.target.value })}
              placeholder="Partner A full legal name"
            />
          </div>
        </div>

        <div className="border border-d365-border rounded-lg p-6">
          <h3 className="font-medium text-d365-text-primary mb-4 flex items-center gap-2">
            <FileSignature className="w-5 h-5" />
            Partner B Digital Signature
          </h3>
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Type your full name as signature *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.digitalSignatureB}
              onChange={(e) => setFormData({ ...formData, digitalSignatureB: e.target.value })}
              placeholder="Partner B full legal name"
            />
          </div>
        </div>
      </div>

      {/* Application Summary */}
      <div className="border border-d365-border rounded-lg p-6">
        <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-caption">
          <div>
            <div className="text-d365-text-secondary">Partner A:</div>
            <div className="font-medium">
              {formData.partnerA.firstName} {formData.partnerA.middleName} {formData.partnerA.lastName}
            </div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Partner B:</div>
            <div className="font-medium">
              {formData.partnerB.firstName} {formData.partnerB.middleName} {formData.partnerB.lastName}
            </div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Marriage Date:</div>
            <div className="font-medium">{formData.marriageDetails.marriageDate}</div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Marriage Venue:</div>
            <div className="font-medium">{formData.marriageDetails.venue}</div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Marriage Type:</div>
            <div className="font-medium">{formData.marriageDetails.marriageType}</div>
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
          <input type="checkbox" id="terms-marriage" className="mt-1" />
          <label htmlFor="terms-marriage" className="text-body text-d365-text-secondary">
            We certify that all information provided is true and accurate. We understand that providing false information is a criminal offense and that this marriage registration is binding under the laws of Uganda.
          </label>
        </div>
      </div>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="space-y-6">
        <div className="d365-page-header">
          <div>
            <h1 className="d365-page-title">Marriage Certificate Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
              Marriage Certificate Application Submitted!
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your marriage registration has been received and is being processed by the registry office.
            </p>
          </div>

          <div className="bg-d365-surface-secondary rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Application ID:</span>
                <span className="font-semibold">MC-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span>Partners:</span>
                <span className="font-medium">
                  {formData.partnerA.firstName} {formData.partnerA.lastName} & {formData.partnerB.firstName} {formData.partnerB.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-orange-600">Under Review</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Processing:</span>
                <span>14-21 business days</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button className="d365-button-primary w-full">
              <Eye className="w-4 h-4 mr-2" />
              Track Status
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
          <h1 className="d365-page-title">Apply for Marriage Certificate</h1>
          <p className="d365-page-subtitle">Register your marriage and apply for an official marriage certificate</p>
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

              {currentSection === 'partnerA' && renderPartnerSection('partnerA')}
              {currentSection === 'partnerB' && renderPartnerSection('partnerB')}
              {currentSection === 'marriage' && renderMarriageSection()}
              {currentSection === 'witnesses' && renderWitnessesSection()}
              {currentSection === 'documents' && renderDocumentsSection()}
              {currentSection === 'finalize' && renderFinalizeSection()}

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
                  disabled={currentSection === 'partnerA'}
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