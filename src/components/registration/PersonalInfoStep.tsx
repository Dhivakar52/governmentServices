import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobile: string;

}

export interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange:   (data: PersonalInfo) => void;
  onValidation: (isValid: boolean) => void;
}

export function PersonalInfoStep({ data, onChange, onValidation }: PersonalInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'dateOfBirth':
        if (!value) return 'Date of birth is required';
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < 16) return 'Must be at least 16 years old';
        if (age > 120) return 'Please enter a valid date of birth';
        return '';
      case 'gender':
        if (!value) return 'Gender selection is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required';
        const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) return 'Please enter a valid mobile number';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    const newData = { ...data, [field]: value };
    onChange(newData);

    // Validate the field
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  useEffect(() => {
    // Check if all fields are valid
    const allFieldsValid = Object.entries(data).every(([field, value]) => {
      const error = validateField(field, value);
      return !error && value.trim() !== '';
    });
    onValidation(allFieldsValid);
  }, [data, onValidation]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            className={errors.fullName ? 'border-destructive' : ''}
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className={errors.dateOfBirth ? 'border-destructive' : ''}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={data.gender} onValueChange={(value) => handleInputChange('gender', value)}>
            <SelectTrigger className={errors.gender ? 'border-destructive' : ''}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-sm text-destructive">{errors.gender}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your.email@example.com"
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile Number *</Label>
          <Input
            id="mobile"
            type="tel"
            value={data.mobile}
            onChange={(e) => handleInputChange('mobile', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={errors.mobile ? 'border-destructive' : ''}
          />
          {errors.mobile && (
            <p className="text-sm text-destructive">{errors.mobile}</p>
          )}
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Privacy Notice:</strong> Your personal information is encrypted and securely stored. 
          We only use this data for identity verification and will never share it with third parties 
          without your explicit consent.
        </p>
      </div>
    </div>
  );
}