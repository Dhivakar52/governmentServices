import { 
  Shield, 
  Users, 
  Wallet,
  MessageSquare,
  Vote,
  Heart,
  Monitor,
  Key,
  UserCog,
  Bell,
  Settings,
  Download
} from 'lucide-react';

export const ADMIN_NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'DASHBOARD', icon: Shield },
  { id: 'citizens', label: 'CITIZENS & ID MANAGEMENT', icon: Users },
  { id: 'wallet', label: 'SMART WALLET', icon: Wallet },
  { id: 'govchat', label: 'GOVCHAT ASSISTANT', icon: MessageSquare },
  { id: 'voting', label: 'ONLINE VOTING (PILOT)', icon: Vote },
  { id: 'healthcare', label: 'HEALTHCARE SYNC', icon: Heart },
  { id: 'monitoring', label: 'SYSTEM MONITORING', icon: Monitor },
  { id: 'api', label: 'API ACCESS LOGS', icon: Key },
  { id: 'users', label: 'ADMIN USERS & ROLES', icon: UserCog },
  { id: 'alerts', label: 'SYSTEM ALERTS', icon: Bell },
  { id: 'reports', label: 'EXPORT REPORTS', icon: Download },
  { id: 'config', label: 'SYSTEM CONFIG', icon: Settings }
];

// Remove the old quick actions since they're now full navigation items
export const ADMIN_QUICK_ACTIONS = [
  // These are now integrated into main navigation
];

export type AdminPage = 'dashboard' | 'citizens' | 'wallet' | 'govchat' | 'voting' | 'healthcare' | 'monitoring' | 'api' | 'users' | 'alerts' | 'reports' | 'config';