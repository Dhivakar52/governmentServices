import  { useState } from 'react';
import { 
  User, 
  Mail, 

  Upload, 

  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Shield,

  Save
} from 'lucide-react';

interface ProfileData {
  personalInfo: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    maritalStatus: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    alternatePhone: string;
    address: string;
    district: string;
    region: string;
  };
  kycDocuments: {
    nationalId: {
      file: File | null;
      status: 'verified' | 'pending' | 'rejected';
      uploadDate?: string;
    };
    voterId: {
      file: File | null;
      status: 'verified' | 'pending' | 'rejected' | 'not-uploaded';
      uploadDate?: string;
    };
    passport: {
      file: File | null;
      status: 'verified' | 'pending' | 'rejected' | 'not-uploaded';
      uploadDate?: string;
    };
  };
  security: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    twoFactorEnabled: boolean;
  };
}

export function EditProfile() {
  const [activeSection, setActiveSection] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    personalInfo: {
      firstName: 'John',
      middleName: 'Robert',
      lastName: 'Doe',
      dateOfBirth: '1990-05-15',
      gender: 'male',
      nationalId: 'CM9012345678901234',
      maritalStatus: 'single'
    },
    contactInfo: {
      email: 'john.doe@email.com',
      phone: '+256701234567',
      alternatePhone: '',
      address: 'Plot 123, Kampala Road, Kampala',
      district: 'Kampala',
      region: 'Central Region'
    },
    kycDocuments: {
      nationalId: {
        file: null,
        status: 'verified',
        uploadDate: '2024-01-01'
      },
      voterId: {
        file: null,
        status: 'pending',
        uploadDate: '2024-01-10'
      },
      passport: {
        file: null,
        status: 'not-uploaded'
      }
    },
    security: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      twoFactorEnabled: false
    }
  });

  const sections = [
    { id: 'personal', title: 'Basic Information', icon: User },
    { id: 'contact', title: 'Contact Information', icon: Mail },
    { id: 'kyc', title: 'KYC Documents', icon: Shield },
    { id: 'security', title: 'Security Settings', icon: Lock }
  ];

  const districts = [
    'Kampala', 'Wakiso', 'Mukono', 'Jinja', 'Entebbe', 'Masaka', 'Mbarara', 'Gulu', 'Lira', 'Arua'
  ];

  const regions = [
    'Central Region', 'Eastern Region', 'Northern Region', 'Western Region'
  ];

  const maritalStatuses = [
    'single', 'married', 'divorced', 'widowed', 'separated'
  ];

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateContactInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const updateSecurity = (field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value
      }
    }));
  };

  const handleFileUpload = (documentType: keyof ProfileData['kycDocuments'], file: File) => {
    setProfileData(prev => ({
      ...prev,
      kycDocuments: {
        ...prev.kycDocuments,
        [documentType]: {
          ...prev.kycDocuments[documentType],
          file,
          status: 'pending',
          uploadDate: new Date().toISOString().split('T')[0]
        }
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    // Show success message or handle errors
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'not-uploaded':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            First Name *
          </label>
          <input
            type="text"
            className="d365-input"
            value={profileData.personalInfo.firstName}
            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Middle Name
          </label>
          <input
            type="text"
            className="d365-input"
            value={profileData.personalInfo.middleName}
            onChange={(e) => updatePersonalInfo('middleName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Last Name *
          </label>
          <input
            type="text"
            className="d365-input"
            value={profileData.personalInfo.lastName}
            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Date of Birth *
          </label>
          <input
            type="date"
            className="d365-input"
            value={profileData.personalInfo.dateOfBirth}
            onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Gender *
          </label>
          <select
            className="d365-input"
            value={profileData.personalInfo.gender}
            onChange={(e) => updatePersonalInfo('gender', e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            National ID *
          </label>
          <input
            type="text"
            className="d365-input"
            value={profileData.personalInfo.nationalId}
            onChange={(e) => updatePersonalInfo('nationalId', e.target.value)}
            placeholder="CM1234567890123456"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Marital Status
          </label>
          <select
            className="d365-input"
            value={profileData.personalInfo.maritalStatus}
            onChange={(e) => updatePersonalInfo('maritalStatus', e.target.value)}
          >
            <option value="">Select status</option>
            {maritalStatuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Email Address *
          </label>
          <input
            type="email"
            className="d365-input"
            value={profileData.contactInfo.email}
            onChange={(e) => updateContactInfo('email', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            className="d365-input"
            value={profileData.contactInfo.phone}
            onChange={(e) => updateContactInfo('phone', e.target.value)}
            placeholder="+256 7XX XXX XXX"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Alternate Phone
          </label>
          <input
            type="tel"
            className="d365-input"
            value={profileData.contactInfo.alternatePhone}
            onChange={(e) => updateContactInfo('alternatePhone', e.target.value)}
            placeholder="+256 7XX XXX XXX"
          />
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            District *
          </label>
          <select
            className="d365-input"
            value={profileData.contactInfo.district}
            onChange={(e) => updateContactInfo('district', e.target.value)}
          >
            <option value="">Select district</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Region *
          </label>
          <select
            className="d365-input"
            value={profileData.contactInfo.region}
            onChange={(e) => updateContactInfo('region', e.target.value)}
          >
            <option value="">Select region</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Address *
          </label>
          <textarea
            className="d365-input min-h-20"
            value={profileData.contactInfo.address}
            onChange={(e) => updateContactInfo('address', e.target.value)}
            placeholder="Enter your full address"
          />
        </div>
      </div>
    </div>
  );

  const renderKYCSection = () => (
    <div className="space-y-6">
      {Object.entries(profileData.kycDocuments).map(([key, doc]) => {
        const documentNames = {
          nationalId: 'National ID',
          voterId: 'Voter ID',
          passport: 'Passport'
        };

        return (
          <div key={key} className="border border-d365-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-d365-text-primary">
                  {documentNames[key as keyof typeof documentNames]}
                </h3>
                <p className="text-caption text-d365-text-secondary">
                  Upload a clear image of your {documentNames[key as keyof typeof documentNames].toLowerCase()}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-caption font-medium ${getStatusColor(doc.status)}`}>
                {doc.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            {doc.uploadDate && (
              <p className="text-caption text-d365-text-secondary mb-4">
                Last uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
              </p>
            )}

            <div className="border-2 border-dashed border-d365-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-d365-text-secondary mx-auto mb-3" />
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(key as keyof ProfileData['kycDocuments'], file);
                  }
                }}
                className="hidden"
                id={`upload-${key}`}
              />
              <label
                htmlFor={`upload-${key}`}
                className="d365-button-secondary cursor-pointer"
              >
                {doc.status === 'not-uploaded' ? 'Upload Document' : 'Replace Document'}
              </label>
              {doc.file && (
                <p className="text-caption text-green-600 mt-2">
                  ✓ {doc.file.name}
                </p>
              )}
            </div>

            {doc.status === 'rejected' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-800">Document Rejected</div>
                    <div className="text-caption text-red-700">
                      Your document was rejected due to poor quality or illegibility. Please upload a clearer image.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <div className="font-medium text-blue-800 mb-1">KYC Verification Status</div>
            <p className="text-body text-blue-700">
              Your identity verification helps us provide secure services. Verified documents enable faster application processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-d365-text-primary">Change Password</h3>
        
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Current Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="d365-input pr-12"
              value={profileData.security.currentPassword}
              onChange={(e) => updateSecurity('currentPassword', e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-d365-text-secondary" />
              ) : (
                <Eye className="w-5 h-5 text-d365-text-secondary" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            New Password *
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              className="d365-input pr-12"
              value={profileData.security.newPassword}
              onChange={(e) => updateSecurity('newPassword', e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="w-5 h-5 text-d365-text-secondary" />
              ) : (
                <Eye className="w-5 h-5 text-d365-text-secondary" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Confirm New Password *
          </label>
          <input
            type="password"
            className="d365-input"
            value={profileData.security.confirmPassword}
            onChange={(e) => updateSecurity('confirmPassword', e.target.value)}
          />
        </div>
      </div>

      <hr className="border-d365-border" />

      <div className="space-y-4">
        <h3 className="font-medium text-d365-text-primary">Two-Factor Authentication</h3>
        
        <div className="flex items-center justify-between p-4 border border-d365-border rounded-lg">
          <div>
            <div className="font-medium text-d365-text-primary">Enable Two-Factor Authentication</div>
            <div className="text-caption text-d365-text-secondary">
              Add an extra layer of security to your account
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={profileData.security.twoFactorEnabled}
              onChange={(e) => updateSecurity('twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-d365-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Edit Profile / KYC</h1>
          <p className="d365-page-subtitle">Manage your personal information and security settings</p>
        </div>
        <button
          className="d365-button-primary flex items-center gap-2"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <div
                    key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-d365-primary text-white'
                        : 'hover:bg-d365-surface-secondary text-d365-text-primary'
                    }`}
                    onClick={() => setActiveSection(section.id)}
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
                  {sections.find(s => s.id === activeSection)?.title}
                </h2>
                <div className="w-12 h-1 bg-d365-primary rounded"></div>
              </div>

              {activeSection === 'personal' && renderPersonalSection()}
              {activeSection === 'contact' && renderContactSection()}
              {activeSection === 'kyc' && renderKYCSection()}
              {activeSection === 'security' && renderSecuritySection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}