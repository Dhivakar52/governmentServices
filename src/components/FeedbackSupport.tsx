import React, { useState } from 'react';
import { 
  
  Star, 
  Send, 
  Upload, 
  Bot, 
  Phone, 
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  
} from 'lucide-react';

interface FeedbackForm {
  service: string;
  rating: number;
  category: string;
  subject: string;
  description: string;
  screenshot: File | null;
  contactMethod: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export function FeedbackSupport() {
  const [activeTab, setActiveTab] = useState<'complaint' | 'chatbot' | 'feedback'>('complaint');
  const [feedbackForm, setFeedbackForm] = useState<FeedbackForm>({
    service: '',
    rating: 0,
    category: '',
    subject: '',
    description: '',
    screenshot: null,
    contactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Chatbot state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      message: 'Hello! I\'m here to help you with your eServices questions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const services = [
    'Driver\'s License Application',
    'Birth Certificate Application',
    'Death Certificate Application',
    'Marriage Certificate Application',
    'Divorce Certificate Application',
    'General Service Inquiry'
  ];

  const complaintCategories = [
    'Application Processing Delay',
    'Payment Issues',
    'Document Problems',
    'Officer Conduct',
    'System Technical Issues',
    'Appointment Scheduling',
    'Other'
  ];

  const predefinedQuestions = [
    'How long does it take to process a driver\'s license?',
    'What documents do I need for a birth certificate?',
    'How can I track my application status?',
    'What are the fees for different services?',
    'How do I book an appointment?'
  ];

  const handleRatingClick = (rating: number) => {
    setFeedbackForm({ ...feedbackForm, rating });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChatSubmit = (message?: string) => {
    const messageToSend = message || chatInput;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: messageToSend,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        message: getBotResponse(messageToSend),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('driver') || message.includes('license')) {
      return 'Driver\'s license applications typically take 5-7 business days to process. You\'ll need a medical certificate, national ID, and passport photos. Would you like more specific information about any step?';
    }
    
    if (message.includes('birth') || message.includes('certificate')) {
      return 'Birth certificate applications require hospital birth slip, parent\'s national IDs, and witness information. Processing time is usually 7-14 business days. Do you have all the required documents?';
    }
    
    if (message.includes('track') || message.includes('status')) {
      return 'You can track your application using the "Track Application" feature. Just enter your application ID (e.g., DL-2024-001234) to see the current status and progress.';
    }
    
    if (message.includes('fee') || message.includes('cost') || message.includes('payment')) {
      return 'Fees vary by service: Driver\'s License (UGX 100,000), Birth Certificate (UGX 50,000), Death Certificate (UGX 75,000). Additional processing fees may apply. You can pay via mobile money, card, or bank transfer.';
    }
    
    if (message.includes('appointment') || message.includes('book')) {
      return 'Appointments can be booked during the application process. You\'ll select your preferred date, time, and location from available slots. Some services require testing appointments.';
    }
    
    return 'I understand your question. For detailed assistance, you might want to contact our support team directly at +256-800-CIVILITY or submit a support ticket. Is there anything specific I can help clarify?';
  };

  const renderComplaintTab = () => (
    <div className="space-y-6">
      {isSubmitted ? (
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          <div>
            <h3 className="text-title2 font-semibold text-d365-text-primary mb-2">
              Complaint Submitted Successfully
            </h3>
            <p className="text-body text-d365-text-secondary">
              Your complaint has been recorded with reference number <strong>COMP-2024-{Date.now().toString().slice(-6)}</strong>. 
              Our support team will contact you within 24 hours.
            </p>
          </div>
          <button 
            className="d365-button-secondary"
            onClick={() => {
              setIsSubmitted(false);
              setFeedbackForm({
                service: '',
                rating: 0,
                category: '',
                subject: '',
                description: '',
                screenshot: null,
                contactMethod: 'email'
              });
            }}
          >
            Submit Another Complaint
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Service Related To *
              </label>
              <select
                className="d365-input"
                value={feedbackForm.service}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, service: e.target.value })}
                required
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-body font-medium text-d365-text-primary mb-2">
                Complaint Category *
              </label>
              <select
                className="d365-input"
                value={feedbackForm.category}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                {complaintCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Subject *
            </label>
            <input
              type="text"
              className="d365-input"
              value={feedbackForm.subject}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Detailed Description *
            </label>
            <textarea
              className="d365-input min-h-32"
              value={feedbackForm.description}
              onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
              placeholder="Please provide as much detail as possible about your complaint..."
              required
            />
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Attach Screenshot (Optional)
            </label>
            <div className="border-2 border-dashed border-d365-border rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-d365-text-secondary mx-auto mb-3" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFeedbackForm({ ...feedbackForm, screenshot: file });
                }}
                className="hidden"
                id="screenshot-upload"
              />
              <label
                htmlFor="screenshot-upload"
                className="d365-button-secondary cursor-pointer"
              >
                Choose Screenshot
              </label>
              {feedbackForm.screenshot && (
                <p className="text-caption text-green-600 mt-2">
                  ✓ {feedbackForm.screenshot.name}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-body font-medium text-d365-text-primary mb-2">
              Preferred Contact Method *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="email"
                  checked={feedbackForm.contactMethod === 'email'}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, contactMethod: e.target.value })}
                />
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="phone"
                  checked={feedbackForm.contactMethod === 'phone'}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, contactMethod: e.target.value })}
                />
                <Phone className="w-4 h-4" />
                <span>Phone</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="d365-button-primary w-full flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting Complaint...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Complaint
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );

  const renderChatbotTab = () => (
    <div className="space-y-4">
      {/* Chat Messages */}
      <div className="bg-d365-surface-secondary rounded-lg p-4 h-96 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-d365-primary text-white'
                    : 'bg-white border border-d365-border'
                }`}
              >
                <p className="text-body">{message.message}</p>
                <p className={`text-caption mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-d365-text-secondary'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Questions */}
      <div>
        <p className="text-caption font-medium text-d365-text-primary mb-2">Quick Questions:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-caption px-3 py-1 bg-d365-surface-secondary rounded-full hover:bg-d365-hover transition-colors"
              onClick={() => handleChatSubmit(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="d365-input flex-1"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Type your question here..."
          onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
        />
        <button
          className="d365-button-primary px-4"
          onClick={() => handleChatSubmit()}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderFeedbackTab = () => (
    <div className="space-y-6">
      <form className="space-y-6">
        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Service to Rate *
          </label>
          <select
            className="d365-input"
            value={feedbackForm.service}
            onChange={(e) => setFeedbackForm({ ...feedbackForm, service: e.target.value })}
            required
          >
            <option value="">Select service to rate</option>
            {services.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Rating *
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`p-1 ${feedbackForm.rating >= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleRatingClick(rating)}
              >
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
          <p className="text-caption text-d365-text-secondary mt-1">
            {feedbackForm.rating === 0 && 'Please select a rating'}
            {feedbackForm.rating === 1 && 'Very Poor'}
            {feedbackForm.rating === 2 && 'Poor'}
            {feedbackForm.rating === 3 && 'Average'}
            {feedbackForm.rating === 4 && 'Good'}
            {feedbackForm.rating === 5 && 'Excellent'}
          </p>
        </div>

        <div>
          <label className="block text-body font-medium text-d365-text-primary mb-2">
            Your Feedback
          </label>
          <textarea
            className="d365-input min-h-24"
            value={feedbackForm.description}
            onChange={(e) => setFeedbackForm({ ...feedbackForm, description: e.target.value })}
            placeholder="Tell us about your experience with this service..."
          />
        </div>

        <button
          type="submit"
          className="d365-button-primary w-full flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          Submit Feedback
        </button>
      </form>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Feedback & Support</h1>
          <p className="d365-page-subtitle">Get help, submit complaints, or share your feedback</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-d365-border p-6">
        <h3 className="font-semibold text-d365-text-primary mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-d365-primary" />
            <div>
              <div className="font-medium">Phone Support</div>
              <div className="text-caption text-d365-text-secondary">+256-800-CIVILITY</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-d365-primary" />
            <div>
              <div className="font-medium">Email Support</div>
              <div className="text-caption text-d365-text-secondary">support@civility.gov.uto</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-d365-primary" />
            <div>
              <div className="font-medium">Office Hours</div>
              <div className="text-caption text-d365-text-secondary">Mon-Fri 8:00 AM - 6:00 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-d365-border">
        {/* Tab Navigation */}
        <div className="border-b border-d365-border">
          <div className="flex">
            {[
              { id: 'complaint', label: 'Raise Complaint', icon: AlertCircle },
              { id: 'chatbot', label: 'Chatbot', icon: Bot },
              { id: 'feedback', label: 'Service Feedback', icon: Star }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-d365-primary border-b-2 border-d365-primary'
                      : 'text-d365-text-secondary hover:text-d365-text-primary'
                  }`}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'complaint' && renderComplaintTab()}
          {activeTab === 'chatbot' && renderChatbotTab()}
          {activeTab === 'feedback' && renderFeedbackTab()}
        </div>
      </div>
    </div>
  );
}