import { 
  Shield, 
  FileText, 
  PenTool, 
  Link
} from 'lucide-react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: string;
  read: boolean;
  category: string;
}

export const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'MY DIGITAL ID', icon: Shield },
  { id: 'documents', label: 'OFFICIAL DOCUMENTS', icon: FileText },
  { id: 'signature', label: 'DIGITAL SIGNATURES', icon: PenTool },
  { id: 'services', label: 'GOVERNMENT SERVICES', icon: Link },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Digital ID Verification Complete',
    message: 'Your digital identity has been successfully verified by the Ministry of Digital Services.',
    type: 'success',
    date: '2025-01-08',
    read: false,
    category: 'Identity'
  },
  {
    id: '2',
    title: 'Document Expiry Warning',
    message: 'Your driving license will expire in 30 days. Please renew to avoid service interruption.',
    type: 'warning',
    date: '2025-01-07',
    read: false,
    category: 'Documents'
  },
  {
    id: '3',
    title: 'New Government Service Available',
    message: 'Online property registration is now available through the Digital Services Portal.',
    type: 'info',
    date: '2025-01-06',
    read: true,
    category: 'Services'
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'Successful login detected from new device. If this wasn\'t you, please contact support.',
    type: 'error',
    date: '2025-01-05',
    read: true,
    category: 'Security'
  }
];

export const INITIAL_ACCOUNT_SETTINGS = {
  emailNotifications: true,
  smsNotifications: true,
  securityAlerts: true,
  marketingEmails: false,
  twoFactorAuth: true,
  biometricLogin: true
};

export const INITIAL_FEEDBACK_FORM = {
  type: 'General Feedback',
  message: ''
};

export const FAQ_ITEMS = [
  {
    question: "How do I verify my digital identity?",
    answer: "Your digital identity is automatically verified during registration through biometric scanning and document verification by our government systems."
  },
  {
    question: "What documents can I store in my digital vault?",
    answer: "You can store all official government documents including birth certificates, passports, driving licenses, tax documents, and educational certificates."
  },
  {
    question: "How secure is my personal information?",
    answer: "We use military-grade encryption and multi-layer security protocols approved by the National Cybersecurity Authority to protect your data."
  },
  {
    question: "Can I access services from multiple devices?",
    answer: "Yes, you can securely access your digital ID from any device using your registered credentials and biometric verification."
  }
];

export const HELP_GUIDES = [
  { title: "Getting Started Guide", icon: 'BookOpen', desc: "Complete guide to setting up your digital ID" },
  { title: "Document Management", icon: 'FileText', desc: "How to upload and manage your documents" },
  { title: "Digital Signatures", icon: 'PenTool', desc: "Using digital signatures for official documents" },
  { title: "Security Best Practices", icon: 'Shield', desc: "Keep your account secure and protected" }
];

export const CONTACT_INFO = [
  { type: 'phone', icon: 'Phone', text: 'Support Hotline: +1-800-DIGITAL-ID' },
  { type: 'email', icon: 'Mail', text: 'Email: support@digitalid.gov' },
  { type: 'office', icon: 'Building', text: 'Visit: Digital Services Centers nationwide' }
];

export const FEEDBACK_TYPES = [
  'General Feedback',
  'Bug Report',
  'Feature Request',
  'Service Complaint'
];

export type DashboardPage = 'overview' | 'documents' | 'signature' | 'services';