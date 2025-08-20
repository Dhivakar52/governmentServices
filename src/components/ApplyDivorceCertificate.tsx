import  { useState } from 'react';
import { 

  Users, 
  FileText, 
 
  Upload,
  Send,
  CheckCircle,
  Eye,
  Download,
  AlertTriangle,
  Gavel
} from 'lucide-react';

interface DivorceCertificateForm {
  spouseDetails: {
    petitioner: {
      firstName: string;
      lastName: string;
      nationalId: string;
      currentAddress: string;
      phone: string;
      email: string;
    };
    respondent: {
      firstName: string;
      lastName: string;
      nationalId: string;
      currentAddress: string;
      phone: string;
      email: string;
    };
  };
  marriageInfo: {
    marriageCertificateNumber: string;
    marriageDate: string;
    marriagePlace: string;
    durationOfMarriage: string;
  };
  divorceDetails: {
    courtName: string;
    courtLocation: string;
    caseNumber: string;
    divorceDecreeDate: string;
    divorceGrounds: string;
    finalDecreeDate: string;
    judgeName: string;
  };
  legalDocs: {
    divorceDecree: File | null;
    marriageCertificate: File | null;
    courtOrder: File | null;
    notarizedAffidavit: File | null;
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

export function ApplyDivorceCertificate() {
  const [currentSection, setCurrentSection] = useState('spouses');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'pending' | 'verified' | 'approved'>('pending');
  const [formData, setFormData] = useState<DivorceCertificateForm>({
    spouseDetails: {
      petitioner: {
        firstName: '',
        lastName: '',
        nationalId: '',
        currentAddress: '',
        phone: '',
        email: ''
      },
      respondent: {
        firstName: '',
        lastName: '',
        nationalId: '',
        currentAddress: '',
        phone: '',
        email: ''
      }
    },
    marriageInfo: {
      marriageCertificateNumber: '',
      marriageDate: '',
      marriagePlace: '',
      durationOfMarriage: ''
    },
    divorceDetails: {
      courtName: '',
      courtLocation: '',
      caseNumber: '',
      divorceDecreeDate: '',
      divorceGrounds: '',
      finalDecreeDate: '',
      judgeName: ''
    },
    legalDocs: {
      divorceDecree: null,
      marriageCertificate: null,
      courtOrder: null,
      notarizedAffidavit: null
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
    { id: 'spouses', title: 'Spouse Details', icon: Users },
    { id: 'marriage', title: 'Marriage Information', icon: FileText },
    { id: 'divorce', title: 'Divorce Details', icon: Gavel },
    { id: 'documents', title: 'Legal Documents', icon: Upload },
    { id: 'witness', title: 'Witness Information', icon: AlertTriangle },
    { id: 'finalize', title: 'Review & Submit', icon: CheckCircle }
  ];

  const divorceGrounds = [
    'Irreconcilable Differences',
    'Adultery',
    'Abandonment',
    'Mental Cruelty',
    'Physical Cruelty',
    'Substance Abuse',
    'Imprisonment',
    'Mental Incapacity',
    'Other'
  ];

  const courts = [
    'High Court of Uganda - Kampala',
    'High Court of Uganda - Jinja',
    'High Court of Uganda - Mbale',
    'High Court of Uganda - Gulu',
    'High Court of Uganda - Mbarara',
    'High Court of Uganda - Fort Portal',
    'Magistrates Court - Kampala',
    'Other'
  ];

  const regions = [
    'Central Region',
    'Eastern Region', 
    'Northern Region',
    'Western Region',
    'Kampala Capital City'
  ];

  const relationships = [
    'Family Member',
    'Friend',
    'Legal Representative',
    'Colleague',
    'Neighbor',
    'Other'
  ];

  const updateSpouseData = (spouse: 'petitioner' | 'respondent', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      spouseDetails: {
        ...prev.spouseDetails,
        [spouse]: {
          ...prev.spouseDetails[spouse],
          [field]: value
        }
      }
    }));
  };

  const updateMarriageInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      marriageInfo: {
        ...prev.marriageInfo,
        [field]: value
      }
    }));
    
    // Auto-calculate marriage duration
    if (field === 'marriageDate' && formData.divorceDetails.divorceDecreeDate) {
      calculateMarriageDuration(value, formData.divorceDetails.divorceDecreeDate);
    }
  };

  const updateDivorceDetails = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      divorceDetails: {
        ...prev.divorceDetails,
        [field]: value
      }
    }));
    
    // Auto-calculate marriage duration
    if (field === 'divorceDecreeDate' && formData.marriageInfo.marriageDate) {
      calculateMarriageDuration(formData.marriageInfo.marriageDate, value);
    }
  };

  const updateLegalDocs = (docType: keyof DivorceCertificateForm['legalDocs'], file: File) => {
    setFormData(prev => ({
      ...prev,
      legalDocs: {
        ...prev.legalDocs,
        [docType]: file
      }
    }));
  };

  const updateWitness = (field: string, value: string | boolean) => {
    if (field === 'hasWitness') {
      setFormData(prev => ({
        ...prev,
        witnessInfo: {
          ...prev.witnessInfo,
          hasWitness: value as boolean
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        witnessInfo: {
          ...prev.witnessInfo,
          witness: {
            ...prev.witnessInfo.witness,
            [field]: value
          }
        }
      }));
    }
  };

  const calculateMarriageDuration = (marriageDate: string, divorceDate: string) => {
    if (marriageDate && divorceDate) {
      const startDate = new Date(marriageDate);
      const endDate = new Date(divorceDate);
      const years = endDate.getFullYear() - startDate.getFullYear();
      const months = endDate.getMonth() - startDate.getMonth();
      
      let totalMonths = years * 12 + months;
      if (endDate.getDate() < startDate.getDate()) {
        totalMonths--;
      }
      
      const resultYears = Math.floor(totalMonths / 12);
      const resultMonths = totalMonths % 12;
      
      const duration = resultYears > 0 
        ? `${resultYears} year${resultYears > 1 ? 's' : ''} ${resultMonths} month${resultMonths !== 1 ? 's' : ''}`
        : `${resultMonths} month${resultMonths !== 1 ? 's' : ''}`;
        
      setFormData(prev => ({
        ...prev,
        marriageInfo: {
          ...prev.marriageInfo,
          durationOfMarriage: duration
        }
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Divorce certificate application submitted:', formData);
    setIsSubmitted(true);
    // Simulate approval workflow
    setTimeout(() => setApplicationStatus('verified'), 3000);
    setTimeout(() => setApplicationStatus('approved'), 8000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'verified':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderSpousesSection = () => (
    <div className="space-y-8">
      {/* Petitioner */}
      <div>
        <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
          Petitioner (Person Filing for Divorce)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              First Name *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.petitioner.firstName}
              onChange={(e) => updateSpouseData('petitioner', 'firstName', e.target.value)}
              placeholder="Petitioner's first name"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Last Name *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.petitioner.lastName}
              onChange={(e) => updateSpouseData('petitioner', 'lastName', e.target.value)}
              placeholder="Petitioner's last name"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              National ID *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.petitioner.nationalId}
              onChange={(e) => updateSpouseData('petitioner', 'nationalId', e.target.value)}
              placeholder="CM12345678901234"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              className="d365-input"
              value={formData.spouseDetails.petitioner.phone}
              onChange={(e) => updateSpouseData('petitioner', 'phone', e.target.value)}
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
              value={formData.spouseDetails.petitioner.email}
              onChange={(e) => updateSpouseData('petitioner', 'email', e.target.value)}
              placeholder="petitioner@email.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Current Address *
            </label>
            <textarea
              className="d365-input min-h-20"
              value={formData.spouseDetails.petitioner.currentAddress}
              onChange={(e) => updateSpouseData('petitioner', 'currentAddress', e.target.value)}
              placeholder="Current residential address"
            />
          </div>
        </div>
      </div>

      {/* Respondent */}
      <div>
        <h3 className="text-subtitle font-semibold text-d365-text-primary mb-4">
          Respondent (Other Spouse)
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              First Name *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.respondent.firstName}
              onChange={(e) => updateSpouseData('respondent', 'firstName', e.target.value)}
              placeholder="Respondent's first name"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Last Name *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.respondent.lastName}
              onChange={(e) => updateSpouseData('respondent', 'lastName', e.target.value)}
              placeholder="Respondent's last name"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              National ID *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.spouseDetails.respondent.nationalId}
              onChange={(e) => updateSpouseData('respondent', 'nationalId', e.target.value)}
              placeholder="CF12345678901234"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="d365-input"
              value={formData.spouseDetails.respondent.phone}
              onChange={(e) => updateSpouseData('respondent', 'phone', e.target.value)}
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
              value={formData.spouseDetails.respondent.email}
              onChange={(e) => updateSpouseData('respondent', 'email', e.target.value)}
              placeholder="respondent@email.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Current Address
            </label>
            <textarea
              className="d365-input min-h-20"
              value={formData.spouseDetails.respondent.currentAddress}
              onChange={(e) => updateSpouseData('respondent', 'currentAddress', e.target.value)}
              placeholder="Current residential address (if known)"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarriageSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Certificate Number *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.marriageInfo.marriageCertificateNumber}
            onChange={(e) => updateMarriageInfo('marriageCertificateNumber', e.target.value)}
            placeholder="MC-2020-001234"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Date *
          </label>
          <input
            type="date"
            className="d365-input"
            value={formData.marriageInfo.marriageDate}
            onChange={(e) => updateMarriageInfo('marriageDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marriage Place *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.marriageInfo.marriagePlace}
            onChange={(e) => updateMarriageInfo('marriagePlace', e.target.value)}
            placeholder="City/Town where marriage took place"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Duration of Marriage
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.marriageInfo.durationOfMarriage}
            readOnly
            placeholder="Auto-calculated"
          />
        </div>
      </div>
    </div>
  );

  const renderDivorceSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Court Name *
          </label>
          <select
            className="d365-input"
            value={formData.divorceDetails.courtName}
            onChange={(e) => updateDivorceDetails('courtName', e.target.value)}
          >
            <option value="">Select court</option>
            {courts.map((court) => (
              <option key={court} value={court}>{court}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Court Location *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.divorceDetails.courtLocation}
            onChange={(e) => updateDivorceDetails('courtLocation', e.target.value)}
            placeholder="City/District where court is located"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Case Number *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.divorceDetails.caseNumber}
            onChange={(e) => updateDivorceDetails('caseNumber', e.target.value)}
            placeholder="e.g., DIV/2024/001"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Divorce Decree Date *
          </label>
          <input
            type="date"
            className="d365-input"
            value={formData.divorceDetails.divorceDecreeDate}
            onChange={(e) => updateDivorceDetails('divorceDecreeDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Final Decree Date
          </label>
          <input
            type="date"
            className="d365-input"
            value={formData.divorceDetails.finalDecreeDate}
            onChange={(e) => updateDivorceDetails('finalDecreeDate', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Presiding Judge *
          </label>
          <input
            type="text"
            className="d365-input"
            value={formData.divorceDetails.judgeName}
            onChange={(e) => updateDivorceDetails('judgeName', e.target.value)}
            placeholder="Hon. Justice [Name]"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Grounds for Divorce *
          </label>
          <select
            className="d365-input"
            value={formData.divorceDetails.divorceGrounds}
            onChange={(e) => updateDivorceDetails('divorceGrounds', e.target.value)}
          >
            <option value="">Select grounds</option>
            {divorceGrounds.map((ground) => (
              <option key={ground} value={ground}>{ground}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderDocumentsSection = () => (
    <div className="space-y-6">
      {[
        { key: 'divorceDecree', label: 'Divorce Decree', required: true, description: 'Official court decree granting the divorce' },
        { key: 'marriageCertificate', label: 'Original Marriage Certificate', required: true, description: 'Copy of the original marriage certificate' },
        { key: 'courtOrder', label: 'Court Order/Judgment', required: false, description: 'Additional court orders if applicable' },
        { key: 'notarizedAffidavit', label: 'Notarized Affidavit', required: false, description: 'Sworn statement if required by court' }
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
            {formData.legalDocs[doc.key as keyof typeof formData.legalDocs] && (
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
                  updateLegalDocs(doc.key as keyof typeof formData.legalDocs, file);
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
            {formData.legalDocs[doc.key as keyof typeof formData.legalDocs] && (
              <p className="text-caption text-green-600 mt-2">
                ✓ {formData.legalDocs[doc.key as keyof typeof formData.legalDocs]?.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWitnessSection = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="text-body text-yellow-800">
              <strong>Important:</strong> A witness may be required for certain types of divorce proceedings. 
              This is typically someone who can attest to the validity of the divorce or the circumstances.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          id="has-witness-divorce"
          checked={formData.witnessInfo.hasWitness}
          onChange={(e) => updateWitness('hasWitness', e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="has-witness-divorce" className="text-body text-d365-text-primary">
          I have a witness to the divorce proceedings (Optional)
        </label>
      </div>

      {formData.witnessInfo.hasWitness && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Full Name *
            </label>
            <input
              type="text"
              className="d365-input"
              value={formData.witnessInfo.witness.name}
              onChange={(e) => updateWitness('name', e.target.value)}
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
              onChange={(e) => updateWitness('nationalId', e.target.value)}
              placeholder="Witness national ID"
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Relationship to Parties
            </label>
            <select
              className="d365-input"
              value={formData.witnessInfo.witness.relationship}
              onChange={(e) => updateWitness('relationship', e.target.value)}
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
              onChange={(e) => updateWitness('phone', e.target.value)}
              placeholder="+256 7XX XXX XXX"
            />
          </div>
        </div>
      )}
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

      {/* Application Summary */}
      <div className="border border-d365-border rounded-lg p-6">
        <h3 className="font-medium text-d365-text-primary mb-4">Application Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 text-caption">
          <div>
            <div className="text-d365-text-secondary">Petitioner:</div>
            <div className="font-medium">
              {formData.spouseDetails.petitioner.firstName} {formData.spouseDetails.petitioner.lastName}
            </div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Respondent:</div>
            <div className="font-medium">
              {formData.spouseDetails.respondent.firstName} {formData.spouseDetails.respondent.lastName}
            </div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Marriage Certificate #:</div>
            <div className="font-medium">{formData.marriageInfo.marriageCertificateNumber}</div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Divorce Decree Date:</div>
            <div className="font-medium">{formData.divorceDetails.divorceDecreeDate}</div>
          </div>
          <div>
            <div className="text-d365-text-secondary">Court:</div>
            <div className="font-medium">{formData.divorceDetails.courtName}</div>
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
          <input type="checkbox" id="terms-divorce" className="mt-1" />
          <label htmlFor="terms-divorce" className="text-body text-d365-text-secondary">
            I certify that all information provided is true and accurate. I understand that providing false information is a criminal offense and that this divorce certificate application is subject to verification by the appropriate authorities.
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
            <h1 className="d365-page-title">Divorce Certificate Application</h1>
            <p className="d365-page-subtitle">Application submitted successfully</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
              Divorce Certificate Application Submitted!
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your application has been received and is being processed through our verification workflow.
            </p>
          </div>

          <div className="bg-d365-surface-secondary rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Application ID:</span>
                <span className="font-semibold">DC-2024-001234</span>
              </div>
              <div className="flex justify-between">
                <span>Petitioner:</span>
                <span className="font-medium">
                  {formData.spouseDetails.petitioner.firstName} {formData.spouseDetails.petitioner.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className={`font-medium px-2 py-1 rounded border text-caption ${getStatusColor(applicationStatus)}`}>
                  {applicationStatus.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Processing:</span>
                <span>21-30 business days</span>
              </div>
            </div>
          </div>

          {/* Approval Workflow */}
          <div className="bg-white border border-d365-border rounded-lg p-6">
            <h3 className="font-medium text-d365-text-primary mb-4">Approval Workflow</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption font-medium ${
                  applicationStatus === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  ✓
                </div>
                <div>
                  <div className="font-medium">Pending Review</div>
                  <div className="text-caption text-d365-text-secondary">Initial document verification</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption font-medium ${
                  applicationStatus === 'verified' || applicationStatus === 'approved' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {applicationStatus === 'verified' || applicationStatus === 'approved' ? '✓' : '2'}
                </div>
                <div>
                  <div className="font-medium">Verified</div>
                  <div className="text-caption text-d365-text-secondary">Legal documents authenticated</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-caption font-medium ${
                  applicationStatus === 'approved' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {applicationStatus === 'approved' ? '✓' : '3'}
                </div>
                <div>
                  <div className="font-medium">Approved</div>
                  <div className="text-caption text-d365-text-secondary">Certificate ready for download</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {applicationStatus === 'approved' && (
              <button className="d365-button-primary w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </button>
            )}
            <button className="d365-button-secondary w-full">
              <Eye className="w-4 h-4 mr-2" />
              Track Status
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
          <h1 className="d365-page-title">Apply for Divorce Certificate</h1>
          <p className="d365-page-subtitle">Apply for an official divorce certificate with court documentation</p>
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

              {currentSection === 'spouses' && renderSpousesSection()}
              {currentSection === 'marriage' && renderMarriageSection()}
              {currentSection === 'divorce' && renderDivorceSection()}
              {currentSection === 'documents' && renderDocumentsSection()}
              {currentSection === 'witness' && renderWitnessSection()}
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
                  disabled={currentSection === 'spouses'}
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