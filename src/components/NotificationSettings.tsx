import { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2,
  Mail,
  MessageSquare,
  Bot,
  Bell,
  Settings,
  Globe,
  Smartphone,
  CheckCircle,
  AlertCircle,
  Clock,
  Send,
} from 'lucide-react';

interface NotificationSettingsProps {
  onBack: () => void;
}

interface NotificationTemplate {
  id: string;
  name: string;
  triggerEvent: string;
  channel: 'email' | 'sms' | 'chatbot';
  language: string;
  status: 'active' | 'inactive' | 'draft';
  subject?: string;
  messageBody: string;
  provider?: string;
  variables: string[];
  lastModified: string;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [activeTab, setActiveTab] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [isAddTemplateOpen, setIsAddTemplateOpen] = useState(false);
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock notification templates
  const templates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'Application Received Confirmation',
      triggerEvent: 'application.received',
      channel: 'email',
      language: 'English',
      status: 'active',
      subject: 'Application Received - Reference: {{reference_number}}',
      messageBody: 'Dear {{applicant_name}}, your application has been received and is being processed. Reference number: {{reference_number}}. Expected processing time: {{processing_time}} days.',
      provider: 'SendGrid',
      variables: ['applicant_name', 'reference_number', 'processing_time'],
      lastModified: '2025-01-10'
    },
    {
      id: '2',
      name: 'Payment Due Reminder',
      triggerEvent: 'payment.due',
      channel: 'sms',
      language: 'English',
      status: 'active',
      messageBody: 'Payment due for application {{reference_number}}. Amount: ${{amount}}. Pay at: {{payment_link}}',
      provider: 'Twilio',
      variables: ['reference_number', 'amount', 'payment_link'],
      lastModified: '2025-01-09'
    },
    {
      id: '3',
      name: 'Document Required Alert',
      triggerEvent: 'document.required',
      channel: 'email',
      language: 'Swahili',
      status: 'active',
      subject: 'Hujani - {{document_type}} inahitajika',
      messageBody: 'Habari {{applicant_name}}, unahitaji kutuma {{document_type}} ili kuendelea na ombi lako {{reference_number}}.',
      provider: 'SendGrid',
      variables: ['applicant_name', 'document_type', 'reference_number'],
      lastModified: '2025-01-08'
    },
    {
      id: '4',
      name: 'Application Status Update',
      triggerEvent: 'status.changed',
      channel: 'chatbot',
      language: 'English',
      status: 'draft',
      messageBody: 'Hi! Your application {{reference_number}} status has been updated to: {{new_status}}. {{additional_info}}',
      provider: 'WhatsApp Business',
      variables: ['reference_number', 'new_status', 'additional_info'],
      lastModified: '2025-01-07'
    },
    {
      id: '5',
      name: 'Service Completed',
      triggerEvent: 'service.completed',
      channel: 'sms',
      language: 'French',
      status: 'inactive',
      messageBody: 'Votre demande {{reference_number}} est terminée. Récupérez votre document à: {{pickup_location}}',
      provider: "Africa's Talking",
      variables: ['reference_number', 'pickup_location'],
      lastModified: '2025-01-06'
    }
  ];

  // Predefined message templates for quick use
  const messageTemplates = [
    {
      name: 'Application Approved',
      subject: 'Your application has been approved',
      content: 'Dear {applicant_name}, your application {application_id} has been approved...'
    },
    {
      name: 'Document Required',
      subject: 'Additional documents needed',
      content: 'Dear {applicant_name}, we need additional documents for your application...'
    },
    {
      name: 'Payment Reminder',
      subject: 'Payment reminder for your application',
      content: 'Dear {applicant_name}, this is a reminder that payment is due...'
    },
    {
      name: 'Application Rejected',
      subject: 'Application status update',
      content: 'Dear {applicant_name}, unfortunately your application has been rejected...'
    }
  ];

  const triggerEvents = [
    { value: 'application.received', label: 'Application Received' },
    { value: 'application.approved', label: 'Application Approved' },
    { value: 'application.rejected', label: 'Application Rejected' },
    { value: 'payment.due', label: 'Payment Due' },
    { value: 'payment.received', label: 'Payment Received' },
    { value: 'document.required', label: 'Document Required' },
    { value: 'status.changed', label: 'Status Changed' },
    { value: 'service.completed', label: 'Service Completed' },
    { value: 'reminder.sla', label: 'SLA Reminder' }
  ];

  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Swahili', label: 'Swahili' },
    { value: 'French', label: 'Français' },
    { value: 'Arabic', label: 'العربية' },
    { value: 'Portuguese', label: 'Português' }
  ];

  const providers = {
    email: [
      { value: 'SendGrid', label: 'SendGrid' },
      { value: 'AWS SES', label: 'AWS SES' },
      { value: 'Mailgun', label: 'Mailgun' }
    ],
    sms: [
      { value: 'Twilio', label: 'Twilio' },
      { value: "Africa's Talking", label: "Africa's Talking" },
      { value: 'AWS SNS', label: 'AWS SNS' }
    ],
    chatbot: [
      { value: 'WhatsApp Business', label: 'WhatsApp Business' },
      { value: 'Telegram Bot', label: 'Telegram Bot' },
      { value: 'Facebook Messenger', label: 'Facebook Messenger' }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      case 'draft':
        return <Badge className="d365-badge-warning"><Clock className="h-3 w-3 mr-1" />Draft</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      case 'chatbot':
        return <Bot className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.triggerEvent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const renderTemplateTable = () => (
    <Card className="d365-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Notification Templates ({filteredTemplates.length})</span>
        </CardTitle>
        <CardDescription>
          Manage automated notification templates for different events and channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template Name</TableHead>
              <TableHead>Trigger Event</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-caption text-d365-secondary">
                    Modified: {template.lastModified}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{template.triggerEvent}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getChannelIcon(template.channel)}
                    <span className="capitalize">{template.channel}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-3 w-3 text-d365-secondary" />
                    <span>{template.language}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(template.status)}</TableCell>
                <TableCell>
                  <span className="text-caption">{template.provider}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedTemplate(template);
                        setIsEditTemplateOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderComposeTab = () => (
    <Card className="d365-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Send className="h-5 w-5" />
          <span>Send Notification</span>
        </CardTitle>
        <CardDescription>Create and send notifications to users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientType">Recipient Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select recipient type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="citizens">Citizens Only</SelectItem>
                <SelectItem value="officers">Officers Only</SelectItem>
                <SelectItem value="department">Specific Department</SelectItem>
                <SelectItem value="individual">Individual User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notificationType">Notification Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select notification type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application">Application Update</SelectItem>
                <SelectItem value="system">System Alert</SelectItem>
                <SelectItem value="maintenance">Maintenance Notice</SelectItem>
                <SelectItem value="feature">Feature Update</SelectItem>
                <SelectItem value="general">General Announcement</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter notification subject" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            className="min-h-[120px]"
            placeholder="Enter your message here..."
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="email" className="rounded" />
            <Label htmlFor="email" className="text-sm">Send via Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="sms" className="rounded" />
            <Label htmlFor="sms" className="text-sm">Send via SMS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="inapp" className="rounded" defaultChecked />
            <Label htmlFor="inapp" className="text-sm">In-app Notification</Label>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button className="d365-button-primary btn-with-icon">
            <Send className="h-4 w-4" />
            Send Notification
          </Button>
          <Button variant="outline">Save as Draft</Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderQuickTemplatesTab = () => (
    <Card className="d365-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5" />
          <span>Quick Message Templates</span>
        </CardTitle>
        <CardDescription>Pre-defined templates for common notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {messageTemplates.map((template, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-d365-border rounded-lg">
              <div>
                <p className="font-medium text-d365-text-primary">{template.name}</p>
                <p className="text-body text-d365-text-secondary">{template.subject}</p>
                <p className="text-caption text-d365-text-secondary mt-1">{template.content.substring(0, 80)}...</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Use Template</Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full mt-4 d365-button-primary btn-with-icon">
          <Plus className="h-4 w-4" />
          Create New Template
        </Button>
      </CardContent>
    </Card>
  );

  const renderTemplateForm = (template?: NotificationTemplate) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="templateName">Template Name</Label>
        <Input 
          id="templateName" 
          placeholder="e.g., Application Confirmation Email"
          defaultValue={template?.name}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="triggerEvent">Trigger Event</Label>
        <Select defaultValue={template?.triggerEvent}>
          <SelectTrigger>
            <SelectValue placeholder="Select trigger event" />
          </SelectTrigger>
          <SelectContent>
            {triggerEvents.map((event) => (
              <SelectItem key={event.value} value={event.value}>
                {event.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="channel">Channel</Label>
        <Select defaultValue={template?.channel}>
          <SelectTrigger>
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
            </SelectItem>
            <SelectItem value="sms">
              <div className="flex items-center space-x-2">
                <Smartphone className="h-4 w-4" />
                <span>SMS</span>
              </div>
            </SelectItem>
            <SelectItem value="chatbot">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>Chatbot</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="language">Language</Label>
        <Select defaultValue={template?.language || 'English'}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {(template?.channel === 'email') && (
        <div className="space-y-2">
          <Label htmlFor="subject">Subject Line</Label>
          <Input 
            id="subject" 
            placeholder="e.g., Application Status Update - {{reference_number}}"
            defaultValue={template?.subject}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="messageBody">Message Body</Label>
        <Textarea 
          id="messageBody" 
          placeholder="Enter your message template with variables like {{applicant_name}}"
          className="min-h-[120px]"
          defaultValue={template?.messageBody}
        />
        <div className="text-caption text-d365-secondary">
          Use double curly braces for variables: {'{'}{'{'} variable_name {'}'}{'}'}</div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="provider">Integration Provider</Label>
        <Select defaultValue={template?.provider}>
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            {(providers[template?.channel as keyof typeof providers] || providers.email).map((provider) => (
              <SelectItem key={provider.value} value={provider.value}>
                {provider.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <AdminPageLayout
      title="Notification Settings"
      onBack={onBack}
      actionButton={{
        label: 'Add Template',
        onClick: () => setIsAddTemplateOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search templates..."
      onSearch={setSearchQuery}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose" className="flex items-center space-x-2">
            <Send className="h-4 w-4" />
            <span>Compose</span>
          </TabsTrigger>
          <TabsTrigger value="quick-templates" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Quick Templates</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Automated Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-4">
          {renderComposeTab()}
        </TabsContent>

        <TabsContent value="quick-templates" className="space-y-4">
          {renderQuickTemplatesTab()}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          {renderTemplateTable()}
        </TabsContent>
      </Tabs>

      {/* Add Template Dialog */}
      <Dialog open={isAddTemplateOpen} onOpenChange={setIsAddTemplateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Notification Template</DialogTitle>
            <DialogDescription>
              Create a new notification template for automated messages.
            </DialogDescription>
          </DialogHeader>
          {renderTemplateForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTemplateOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddTemplateOpen(false)} className="d365-button-primary">Create Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Template Dialog */}
      <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Notification Template</DialogTitle>
            <DialogDescription>
              Modify the notification template settings and content.
            </DialogDescription>
          </DialogHeader>
          {renderTemplateForm(selectedTemplate || undefined)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditTemplateOpen(false)} className="d365-button-primary">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}