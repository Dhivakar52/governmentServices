import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Download,
  RefreshCw,
  Smartphone,
  Building2
} from 'lucide-react';

interface FeeInfo {
  applicationId: string;
  applicationType: string;
  applicantName: string;
  baseFee: number;
  penalty: number;
  totalDue: number;
  dueDate: string;
  status: 'pending' | 'overdue' | 'paid';
  lateDays?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  processingTime: string;
  fees: string;
}

export function PayFees() {
  const [applicationId, setApplicationId] = useState('');
  const [feeInfo, setFeeInfo] = useState<FeeInfo | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentStep, setPaymentStep] = useState<'search' | 'payment' | 'success' | 'retry'>('search');
  const [paymentReference, setPaymentReference] = useState('');

  // Mock fee data
  const mockFees: Record<string, FeeInfo> = {
    'DL-2024-001234': {
      applicationId: 'DL-2024-001234',
      applicationType: 'Driver\'s License Application',
      applicantName: 'John Doe',
      baseFee: 100000,
      penalty: 0,
      totalDue: 100000,
      dueDate: '2024-01-25',
      status: 'pending'
    },
    'BC-2024-001234': {
      applicationId: 'BC-2024-001234',
      applicationType: 'Birth Certificate Application',
      applicantName: 'Mary Nakamya',
      baseFee: 50000,
      penalty: 0,
      totalDue: 50000,
      dueDate: '2024-01-20',
      status: 'pending'
    },
    'DL-2024-000999': {
      applicationId: 'DL-2024-000999',
      applicationType: 'Driver\'s License Renewal',
      applicantName: 'Peter Musoke',
      baseFee: 75000,
      penalty: 25000,
      totalDue: 100000,
      dueDate: '2024-01-10',
      status: 'overdue',
      lateDays: 5
    }
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'mobile-money',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'MTN Mobile Money, Airtel Money',
      processingTime: 'Instant',
      fees: 'UGX 500'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      processingTime: '1-2 minutes',
      fees: '2.5% of amount'
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank transfer',
      processingTime: '2-24 hours',
      fees: 'UGX 2,000'
    }
  ];

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setIsLoading(true);
    setError('');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const found = mockFees[applicationId.toUpperCase()];
    if (found) {
      setFeeInfo(found);
      setPaymentStep('payment');
    } else {
      setError('Application not found or no fees due. Please check your application ID.');
      setFeeInfo(null);
    }
    
    setIsLoading(false);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 20% chance of payment failure for demo
    const paymentSuccess = Math.random() > 0.2;
    
    if (paymentSuccess) {
      setPaymentReference(`PAY-${Date.now()}`);
      setPaymentStep('success');
    } else {
      setPaymentStep('retry');
    }
    
    setIsLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'overdue':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'paid':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderSearchStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg border border-d365-border p-8">
        <div className="text-center mb-6">
          <CreditCard className="w-12 h-12 text-d365-primary mx-auto mb-4" />
          <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
            Pay Application Fees
          </h2>
          <p className="text-body text-d365-text-secondary">
            Enter your application ID to view and pay outstanding fees
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Application ID *
            </label>
            <div className="relative">
              <input
                type="text"
                className="d365-input pr-12"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="e.g., DL-2024-001234, BC-2024-001234"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-d365-text-secondary" />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-body text-red-700">{error}</p>
              </div>
            </div>
          )}

          <button
            className="d365-button-primary w-full flex items-center justify-center gap-2"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Check Fees
              </>
            )}
          </button>
        </div>

        {/* Sample IDs for Testing */}
        <div className="mt-6 p-4 bg-d365-surface-secondary rounded-lg">
          <p className="text-caption font-medium text-d365-text-primary mb-2">Sample Application IDs for Testing:</p>
          <div className="space-y-1">
            <button
              className="text-caption text-d365-primary hover:underline block"
              onClick={() => setApplicationId('DL-2024-001234')}
            >
              DL-2024-001234 (No penalties)
            </button>
            <button
              className="text-caption text-d365-primary hover:underline block"
              onClick={() => setApplicationId('BC-2024-001234')}
            >
              BC-2024-001234 (Birth Certificate)
            </button>
            <button
              className="text-caption text-d365-primary hover:underline block"
              onClick={() => setApplicationId('DL-2024-000999')}
            >
              DL-2024-000999 (With penalty - overdue)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Application Info Summary */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <h2 className="text-title2 font-semibold text-d365-text-primary mb-4">Application Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-caption text-d365-text-secondary">Application ID</div>
            <div className="font-medium text-d365-text-primary">{feeInfo?.applicationId}</div>
          </div>
          <div>
            <div className="text-caption text-d365-text-secondary">Application Type</div>
            <div className="font-medium text-d365-text-primary">{feeInfo?.applicationType}</div>
          </div>
          <div>
            <div className="text-caption text-d365-text-secondary">Applicant Name</div>
            <div className="font-medium text-d365-text-primary">{feeInfo?.applicantName}</div>
          </div>
          <div>
            <div className="text-caption text-d365-text-secondary">Status</div>
            <div className={`inline-block px-2 py-1 rounded border text-caption font-medium ${getStatusColor(feeInfo?.status || '')}`}>
              {feeInfo?.status?.toUpperCase()}
              {feeInfo?.lateDays && ` (${feeInfo.lateDays} days overdue)`}
            </div>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <h3 className="font-semibold text-d365-text-primary mb-4">Fee Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-body">Base Application Fee</span>
            <span className="font-medium">UGX {feeInfo?.baseFee.toLocaleString()}</span>
          </div>
          
          {feeInfo?.penalty && feeInfo.penalty > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-body text-red-600">Late Payment Penalty</span>
              <span className="font-medium text-red-600">UGX {feeInfo.penalty.toLocaleString()}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-body">Processing Fee</span>
            <span className="font-medium">UGX 5,000</span>
          </div>
          
          <hr className="my-3" />
          
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total Amount Due</span>
            <span className="font-semibold text-d365-primary">
              UGX {((feeInfo?.totalDue || 0) + 5000).toLocaleString()}
            </span>
          </div>
        </div>

        {feeInfo?.status === 'overdue' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <div className="font-medium text-red-800">Payment Overdue</div>
                <div className="text-caption text-red-700">
                  This payment was due on {new Date(feeInfo.dueDate).toLocaleDateString()}. 
                  Additional penalties may apply for further delays.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <h3 className="font-semibold text-d365-text-primary mb-4">Select Payment Method</h3>
        
        <div className="grid gap-4">
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <div
                key={method.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'border-d365-primary bg-d365-hover'
                    : 'border-d365-border hover:border-d365-primary-light'
                }`}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <div className="flex items-start gap-4">
                  <IconComponent className="w-6 h-6 text-d365-primary mt-1" />
                  <div className="flex-1">
                    <div className="font-medium text-d365-text-primary">{method.name}</div>
                    <div className="text-caption text-d365-text-secondary mb-2">{method.description}</div>
                    <div className="flex gap-4 text-caption text-d365-text-secondary">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {method.processingTime}
                      </div>
                      <div>Fee: {method.fees}</div>
                    </div>
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-body text-red-700">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <button
            className="d365-button-secondary"
            onClick={() => {
              setPaymentStep('search');
              setFeeInfo(null);
              setSelectedPaymentMethod('');
              setError('');
            }}
          >
            Back to Search
          </button>
          <button
            className="d365-button-primary flex items-center gap-2"
            onClick={handlePayment}
            disabled={isLoading || !selectedPaymentMethod}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pay UGX {((feeInfo?.totalDue || 0) + 5000).toLocaleString()}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
      <div>
        <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
          Payment Successful!
        </h2>
        <p className="text-body text-d365-text-secondary">
          Your payment has been processed successfully. A confirmation email has been sent to your registered email address.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Payment Reference:</span>
            <span className="font-semibold">{paymentReference}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span className="font-semibold">UGX {((feeInfo?.totalDue || 0) + 5000).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="font-medium">
              {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Date & Time:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button className="d365-button-primary w-full">
          <Download className="w-4 h-4 mr-2" />
          Download Receipt
        </button>
        <button 
          className="d365-button-secondary w-full"
          onClick={() => {
            setPaymentStep('search');
            setFeeInfo(null);
            setSelectedPaymentMethod('');
            setApplicationId('');
            setError('');
            setPaymentReference('');
          }}
        >
          Pay Another Fee
        </button>
      </div>
    </div>
  );

  const renderRetryStep = () => (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
      <div>
        <h2 className="text-title1 font-semibold text-d365-text-primary mb-2">
          Payment Failed
        </h2>
        <p className="text-body text-d365-text-secondary">
          We were unable to process your payment. This could be due to insufficient funds, network issues, or other technical problems.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="space-y-2">
          <div className="font-medium text-red-800">Common Solutions:</div>
          <ul className="text-caption text-red-700 text-left space-y-1">
            <li>• Check your account balance</li>
            <li>• Verify your payment details</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank if the issue persists</li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          className="d365-button-primary w-full flex items-center justify-center gap-2"
          onClick={() => setPaymentStep('payment')}
        >
          <RefreshCw className="w-4 h-4" />
          Retry Payment
        </button>
        <button 
          className="d365-button-secondary w-full"
          onClick={() => {
            setPaymentStep('search');
            setFeeInfo(null);
            setSelectedPaymentMethod('');
            setApplicationId('');
            setError('');
          }}
        >
          Start Over
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Pay Fees / Penalties</h1>
          <p className="d365-page-subtitle">
            {paymentStep === 'search' && 'Pay outstanding application fees and penalties'}
            {paymentStep === 'payment' && 'Complete your payment securely'}
            {paymentStep === 'success' && 'Payment completed successfully'}
            {paymentStep === 'retry' && 'Payment failed - please try again'}
          </p>
        </div>
      </div>

      {/* Step Content */}
      {paymentStep === 'search' && renderSearchStep()}
      {paymentStep === 'payment' && renderPaymentStep()}
      {paymentStep === 'success' && renderSuccessStep()}
      {paymentStep === 'retry' && renderRetryStep()}
    </div>
  );
}