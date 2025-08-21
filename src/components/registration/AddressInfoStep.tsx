import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export interface Address {
  line1: string;
  city: string;
  state: string;
  district?: string;
  postalCode?: string;
  country?: string;
  street?: string;
  zip?: string;
}


interface AddressInfoStepProps {
  data: Address;
  onChange: (data: Address) => void;
  onValidation: (isValid: boolean) => void;
}

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

const states = {
  us: [
    { value: 'ca', label: 'California' },
    { value: 'ny', label: 'New York' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
    { value: 'il', label: 'Illinois' },
  ],
  ca: [
    { value: 'on', label: 'Ontario' },
    { value: 'qc', label: 'Quebec' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'ab', label: 'Alberta' },
  ],
};

export function AddressInfoStep({ data, onChange, onValidation }: AddressInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'line1':
        if (!value.trim()) return 'Address line 1 is required';
        if (value.trim().length < 5) return 'Please enter a complete address';
        return '';
      case 'city':
        if (!value.trim()) return 'City is required';
        if (value.trim().length < 2) return 'Please enter a valid city name';
        return '';
      case 'district':
        if (!value.trim()) return 'District is required';
        return '';
      case 'postalCode':
        if (!value.trim()) return 'Postal code is required';
        const postalRegex = /^[A-Za-z0-9\s\-]{3,10}$/;
        if (!postalRegex.test(value)) return 'Please enter a valid postal code';
        return '';
      case 'country':
        if (!value) return 'Country selection is required';
        return '';
      case 'state':
        if (!value) return 'State/Province selection is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (field: keyof Address, value: string) => {
    let newData = { ...data, [field]: value };
    
    // Reset state when country changes
    if (field === 'country') {
      newData = { ...newData, state: '' };
    }
    
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

  const availableStates = data.country ? states[data.country as keyof typeof states] || [] : [];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="line1">Address Line 1 *</Label>
          <Input
            id="line1"
            value={data.line1}
            onChange={(e) => handleInputChange('line1', e.target.value)}
            placeholder="Street number and name"
            className={errors.line1 ? 'border-destructive' : ''}
          />
          {errors.line1 && (
            <p className="text-sm text-destructive">{errors.line1}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              placeholder="Enter city name"
              className={errors.city ? 'border-destructive' : ''}
            />
            {errors.city && (
              <p className="text-sm text-destructive">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">District *</Label>
            <Input
              id="district"
              value={data.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
              placeholder="Enter district name"
              className={errors.district ? 'border-destructive' : ''}
            />
            {errors.district && (
              <p className="text-sm text-destructive">{errors.district}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country *</Label>
            <Select value={data.country} onValueChange={(value) => handleInputChange('country', value)}>
              <SelectTrigger className={errors.country ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Province *</Label>
            <Select 
              value={data.state} 
              onValueChange={(value) => handleInputChange('state', value)}
              disabled={!data.country}
            >
              <SelectTrigger className={errors.state ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select state/province" />
              </SelectTrigger>
              <SelectContent>
                {availableStates.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-sm text-destructive">{errors.state}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code *</Label>
            <Input
              id="postalCode"
              value={data.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              placeholder="ZIP/Postal code"
              className={errors.postalCode ? 'border-destructive' : ''}
            />
            {errors.postalCode && (
              <p className="text-sm text-destructive">{errors.postalCode}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Address Verification:</strong> This address will be used for official correspondence 
          and document delivery. Please ensure all details are accurate and up to date.
        </p>
      </div>
    </div>
  );
}