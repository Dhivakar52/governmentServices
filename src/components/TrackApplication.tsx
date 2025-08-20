import  { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  FileText, 
  User, 
  AlertCircle,
  Eye,
  MessageSquare,
  Calendar,
} from 'lucide-react';

interface ApplicationStatus {
  id: string;
  type: string;
  applicantName: string;
  dateSubmitted: string;
  currentStage: string;
  stages: {
    name: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
    officer?: string;
    comments?: string;
    sla?: string;
  }[];
  nextAction?: string;
  estimatedCompletion: string;
}

export function TrackApplication() {
  const [applicationId, setApplicationId] = useState('');
  const [applicationStatus, setApplicationStatus] = useState<ApplicationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock application data
  const mockApplications: Record<string, ApplicationStatus> = {
    'DL-2024-001234': {
      id: 'DL-2024-001234',
      type: 'Driver\'s License Application',
      applicantName: 'John Doe',
      dateSubmitted: '2024-01-10',
      currentStage: 'Document Verification',
      stages: [
        {
          name: 'Application Submitted',
          status: 'completed',
          date: '2024-01-10 09:30 AM',
          officer: 'System',
          comments: 'Application received successfully. All required documents uploaded.'
        },
        {
          name: 'Document Verification',
          status: 'current',
          date: '2024-01-11 02:15 PM',
          officer: 'Officer Sarah Nakato',
          comments: 'Reviewing submitted documents for completeness and authenticity.',
          sla: '2 days remaining'
        },
        {
          name: 'Theory Test Scheduling',
          status: 'pending',
          sla: 'After document approval'
        },
        {
          name: 'Practical Test',
          status: 'pending',
          sla: 'After theory test pass'
        },
        {
          name: 'License Issuance',
          status: 'pending',
          sla: 'After practical test pass'
        }
      ],
      nextAction: 'Document verification in progress. You will be notified once approved.',
      estimatedCompletion: '2024-01-25'
    },
    'BC-2024-001234': {
      id: 'BC-2024-001234',
      type: 'Birth Certificate Application',
      applicantName: 'Mary Nakamya',
      dateSubmitted: '2024-01-08',
      currentStage: 'Registry Review',
      stages: [
        {
          name: 'Application Submitted',
          status: 'completed',
          date: '2024-01-08 11:20 AM',
          officer: 'System',
          comments: 'Birth registration application received with all required documents.'
        },
        {
          name: 'Initial Verification',
          status: 'completed',
          date: '2024-01-09 10:45 AM',
          officer: 'Officer Peter Musoke',
          comments: 'Hospital birth slip verified. Parent information confirmed.'
        },
        {
          name: 'Registry Review',
          status: 'current',
          date: '2024-01-12 08:30 AM',
          officer: 'Registrar Jane Apio',
          comments: 'Under final review for certificate issuance.',
          sla: '1 day remaining'
        },
        {
          name: 'Certificate Issuance',
          status: 'pending',
          sla: 'After registry approval'
        }
      ],
      nextAction: 'Application approved. Certificate will be available for collection tomorrow.',
      estimatedCompletion: '2024-01-15'
    },
    'DC-2024-001234': {
      id: 'DC-2024-001234',
      type: 'Death Certificate Application',
      applicantName: 'Robert Kiwanuka',
      dateSubmitted: '2024-01-05',
      currentStage: 'Medical Review',
      stages: [
        {
          name: 'Application Submitted',
          status: 'completed',
          date: '2024-01-05 14:15 PM',
          officer: 'System',
          comments: 'Death registration received with medical certificate and supporting documents.'
        },
        {
          name: 'Document Verification',
          status: 'completed',
          date: '2024-01-06 09:20 AM',
          officer: 'Officer Grace Nambi',
          comments: 'Hospital records and police report verified successfully.'
        },
        {
          name: 'Medical Review',
          status: 'current',
          date: '2024-01-08 11:00 AM',
          officer: 'Dr. Michael Ssebaggala',
          comments: 'Medical cause of death under review by qualified medical officer.',
          sla: '3 days remaining'
        },
        {
          name: 'Final Approval',
          status: 'pending',
          sla: 'After medical review'
        },
        {
          name: 'Certificate Issuance',
          status: 'pending',
          sla: 'After final approval'
        }
      ],
      nextAction: 'Medical review in progress. Additional documentation may be requested.',
      estimatedCompletion: '2024-01-18'
    }
  };

  const handleSearch = async () => {
    if (!applicationId.trim()) {
      setError('Please enter an application ID');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const found = mockApplications[applicationId.toUpperCase()];
    if (found) {
      setApplicationStatus(found);
    } else {
      setError('Application not found. Please check your application ID and try again.');
      setApplicationStatus(null);
    }
    
    setIsLoading(false);
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'current':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Track Application Status</h1>
          <p className="d365-page-subtitle">Enter your application ID to view current status and progress</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-d365-border p-8">
          <div className="text-center mb-6">
            <Search className="w-12 h-12 text-d365-primary mx-auto mb-4" />
            <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
              Enter Application ID
            </h2>
            <p className="text-body text-d365-text-secondary">
              Your application ID can be found in your confirmation email or receipt
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
                  Track Application
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
                DL-2024-001234 (Driver's License)
              </button>
              <button
                className="text-caption text-d365-primary hover:underline block"
                onClick={() => setApplicationId('BC-2024-001234')}
              >
                BC-2024-001234 (Birth Certificate)
              </button>
              <button
                className="text-caption text-d365-primary hover:underline block"
                onClick={() => setApplicationId('DC-2024-001234')}
              >
                DC-2024-001234 (Death Certificate)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Status Results */}
      {applicationStatus && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Application Overview */}
          <div className="bg-white rounded-lg border border-d365-border p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-title2 font-semibold text-d365-text-primary mb-2">
                  {applicationStatus.type}
                </h2>
                <div className="space-y-1 text-caption text-d365-text-secondary">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Applicant: {applicationStatus.applicantName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Submitted: {new Date(applicationStatus.dateSubmitted).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Expected Completion: {new Date(applicationStatus.estimatedCompletion).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-caption text-d365-text-secondary">Application ID</div>
                <div className="font-semibold text-d365-text-primary">{applicationStatus.id}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-caption font-medium mt-2 ${getStatusColor('current')}`}>
                  {applicationStatus.currentStage}
                </div>
              </div>
            </div>

            {/* Next Action */}
            {applicationStatus.nextAction && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-800 mb-1">Next Action</div>
                    <p className="text-body text-blue-700">{applicationStatus.nextAction}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Progress Tracker */}
          <div className="bg-white rounded-lg border border-d365-border p-6">
            <h3 className="font-semibold text-d365-text-primary mb-6">Application Progress</h3>
            
            <div className="space-y-6">
              {applicationStatus.stages.map((stage, index) => (
                <div key={index} className="flex items-start gap-4">
                  {/* Stage Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getStageIcon(stage.status)}
                  </div>

                  {/* Stage Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-d365-text-primary">{stage.name}</h4>
                      {stage.sla && (
                        <span className={`text-caption px-2 py-1 rounded ${
                          stage.status === 'current' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {stage.sla}
                        </span>
                      )}
                    </div>

                    {stage.date && (
                      <div className="text-caption text-d365-text-secondary mb-1">
                        {stage.date}
                      </div>
                    )}

                    {stage.officer && (
                      <div className="text-caption text-d365-text-secondary mb-2">
                        Officer: {stage.officer}
                      </div>
                    )}

                    {stage.comments && (
                      <div className="bg-d365-surface-secondary rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-d365-text-secondary mt-0.5" />
                          <p className="text-body text-d365-text-primary">{stage.comments}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Information */}
          <div className="bg-white rounded-lg border border-d365-border p-6">
            <h3 className="font-semibold text-d365-text-primary mb-4">Service Level Agreement (SLA)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-title2 font-semibold text-green-600">
                  {applicationStatus.stages.filter(s => s.status === 'completed').length}
                </div>
                <div className="text-caption text-green-700">Completed Stages</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-title2 font-semibold text-blue-600">1</div>
                <div className="text-caption text-blue-700">Current Stage</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-title2 font-semibold text-gray-600">
                  {applicationStatus.stages.filter(s => s.status === 'pending').length}
                </div>
                <div className="text-caption text-gray-700">Remaining Stages</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg border border-d365-border p-6">
            <div className="flex flex-wrap gap-4">
              <button className="d365-button-primary flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View Full Details
              </button>
              <button className="d365-button-secondary flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Download Status Report
              </button>
              <button className="d365-button-secondary flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact Officer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}