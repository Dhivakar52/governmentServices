import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Languages,
  Star,
  Plus,

  Eye,
  MessageCircle,
  BarChart3,
  Clock,

  Brain,

} from 'lucide-react';

export function GovChat() {
  const [showAddFAQ, setShowAddFAQ] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: '',
    language: 'ar'
  });

  const chatStats = [
    {
      title: 'Daily Active Users',
      value: '21,500',
      icon: Users,
      color: 'bg-blue-500',
      change: '+8.2%',
      period: 'vs yesterday'
    },
    {
      title: 'Total Inquiries (30 Days)',
      value: '95,102',
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+15.3%',
      period: 'vs last month'
    },
    {
      title: 'Average Response Time',
      value: '1.2s',
      icon: Clock,
      color: 'bg-orange-500',
      change: '-0.3s',
      period: 'improvement'
    },
    {
      title: 'Satisfaction Score',
      value: '4.3/5',
      icon: Star,
      color: 'bg-purple-500',
      change: '+0.2',
      period: 'this month'
    }
  ];

  const topicData = [
    { topic: 'Renew ID', percentage: '35%', count: '33,286', trend: 'up' },
    { topic: 'Check Document Status', percentage: '20%', count: '19,020', trend: 'stable' },
    { topic: 'Voting Information', percentage: '12%', count: '11,412', trend: 'up' },
    { topic: 'Address Change', percentage: '10%', count: '9,510', trend: 'down' },
    { topic: 'Digital Signature', percentage: '8%', count: '7,608', trend: 'up' },
    { topic: 'Wallet Services', percentage: '7%', count: '6,657', trend: 'up' },
    { topic: 'Other Inquiries', percentage: '8%', count: '7,609', trend: 'stable' }
  ];

  const languageData = [
    { language: 'Arabic', code: 'ar', percentage: '58%', users: '55,159', flag: '🇲🇦' },
    { language: 'French', code: 'fr', percentage: '40%', users: '38,041', flag: '🇫🇷' },
    { language: 'Amazigh', code: 'zgh', percentage: '2%', users: '1,902', flag: 'ⵣ' }
  ];

  const recentConversations = [
    {
      id: 'CONV-001',
      citizenId: 'CIV-2025-001234',
      query: 'Comment renouveler mon ID numérique?',
      language: 'fr',
      status: 'resolved',
      satisfaction: 5,
      responseTime: '1.1s',
      timestamp: '2 min ago'
    },
    {
      id: 'CONV-002',
      citizenId: 'CIV-2025-005678',
      query: 'كيف يمكنني التحقق من حالة وثيقتي؟',
      language: 'ar',
      status: 'resolved',
      satisfaction: 4,
      responseTime: '0.9s',
      timestamp: '5 min ago'
    },
    {
      id: 'CONV-003',
      citizenId: 'CIV-2025-009012',
      query: 'ⵎⴰⵏⵎⴽ ⴰⴷ ⵙⵏⴼⵍ ⵜⴰⵎⴰⴳⵏⵓⵜ ⵏⵓ?',
      language: 'zgh',
      status: 'escalated',
      satisfaction: null,
      responseTime: '2.3s',
      timestamp: '8 min ago'
    },
    {
      id: 'CONV-004',
      citizenId: 'CIV-2025-003456',
      query: 'Where can I vote in the diaspora election?',
      language: 'en',
      status: 'resolved',
      satisfaction: 5,
      responseTime: '1.5s',
      timestamp: '12 min ago'
    },
    {
      id: 'CONV-005',
      citizenId: 'CIV-2025-007890',
      query: 'مشكلة في المحفظة الذكية، لا أستطيع الدفع',
      language: 'ar',
      status: 'in_progress',
      satisfaction: null,
      responseTime: '1.0s',
      timestamp: '15 min ago'
    }
  ];

  const systemMetrics = [
    { metric: 'Model Accuracy', value: '94.7%', status: 'excellent', change: '+2.1%' },
    { metric: 'Training Data Size', value: '2.3M', status: 'good', change: '+50K' },
    { metric: 'Active Models', value: '3', status: 'operational', change: 'Stable' },
    { metric: 'API Uptime', value: '99.8%', status: 'excellent', change: '+0.1%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'escalated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddFAQ = () => {
    console.log('Adding new FAQ:', newFAQ);
    setNewFAQ({ question: '', answer: '', category: '', language: 'ar' });
    setShowAddFAQ(false);
    alert('FAQ added successfully to the training dataset!');
  };

  const viewConversation = (conversation: any) => {
    setSelectedConversation(conversation);
    setShowConversation(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            GOVCHAT AI ASSISTANT
          </h1>
          <p className="text-gray-600">
            Multilingual AI chatbot analytics and management for citizen support
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowAddFAQ(true)}
            className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            ADD NEW FAQ
          </Button>
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            TRAIN CHATBOT
          </Button>
        </div>
      </div>

      {/* Chat Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chatStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Topics Handled */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--government-green)]">TOPICS HANDLED</h3>
            <Badge className="bg-blue-100 text-blue-800">
              TOP 7 CATEGORIES
            </Badge>
          </div>
          <div className="space-y-4">
            {topicData.map((topic, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{topic.topic}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{topic.percentage}</span>
                    {topic.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                    {topic.trend === 'down' && <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[var(--government-green)] h-2 rounded-full" 
                    style={{ width: topic.percentage }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{topic.count} inquiries</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Languages Used */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--government-green)]">LANGUAGES USED</h3>
            <Badge className="bg-purple-100 text-purple-800">
              MULTILINGUAL SUPPORT
            </Badge>
          </div>
          <div className="space-y-4">
            {languageData.map((lang, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.language}</span>
                  </div>
                  <span className="text-sm text-gray-600">{lang.percentage}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[var(--government-gold)] h-2 rounded-full" 
                    style={{ width: lang.percentage }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{lang.users} users</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Languages className="h-4 w-4 mr-2" />
            LANGUAGE SETTINGS
          </Button>
        </Card>

        {/* System Performance */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--government-green)]">AI SYSTEM METRICS</h3>
            <Badge className="bg-green-100 text-green-800">
              OPERATIONAL
            </Badge>
          </div>
          <div className="space-y-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="text-sm font-medium">{metric.metric}</p>
                  <p className="text-xs text-gray-500">{metric.change}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[var(--government-green)]">{metric.value}</p>
                  <Badge 
                    className={`text-xs ${
                      metric.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <BarChart3 className="h-4 w-4 mr-2" />
            DETAILED ANALYTICS
          </Button>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">RECENT CONVERSATIONS</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              VIEW SAMPLE CONVERSATIONS
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              CONVERSATION LOGS
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CONVERSATION ID</TableHead>
              <TableHead>CITIZEN ID</TableHead>
              <TableHead>QUERY</TableHead>
              <TableHead>LANGUAGE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>SATISFACTION</TableHead>
              <TableHead>RESPONSE TIME</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentConversations.map((conv) => (
              <TableRow key={conv.id}>
                <TableCell className="font-medium">{conv.id}</TableCell>
                <TableCell>{conv.citizenId}</TableCell>
                <TableCell className="max-w-xs truncate">{conv.query}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {conv.language.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(conv.status)}>
                    {conv.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  {conv.satisfaction ? (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{conv.satisfaction}/5</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">Pending</span>
                  )}
                </TableCell>
                <TableCell>{conv.responseTime}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewConversation(conv)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add FAQ Modal */}
      <Dialog open={showAddFAQ} onOpenChange={setShowAddFAQ}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              ADD NEW FAQ ENTRY
            </DialogTitle>
            <DialogDescription>
              Add new frequently asked questions to improve the AI chatbot's knowledge base.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>LANGUAGE</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newFAQ.language}
                  onChange={(e) => setNewFAQ(prev => ({ ...prev, language: e.target.value }))}
                >
                  <option value="ar">🇲🇦 Arabic</option>
                  <option value="fr">🇫🇷 French</option>
                  <option value="zgh">ⵣ Amazigh</option>
                  <option value="en">🇺🇸 English</option>
                </select>
              </div>
              <div>
                <Label>CATEGORY</Label>
                <select 
                  className="w-full p-2 border rounded"
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Select category</option>
                  <option value="id_renewal">ID Renewal</option>
                  <option value="document_status">Document Status</option>
                  <option value="voting">Voting Information</option>
                  <option value="address_change">Address Change</option>
                  <option value="digital_signature">Digital Signature</option>
                  <option value="wallet_services">Wallet Services</option>
                  <option value="general">General Inquiries</option>
                </select>
              </div>
            </div>
            <div>
              <Label>QUESTION</Label>
              <Textarea
                value={newFAQ.question}
                onChange={(e) => setNewFAQ(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Enter the frequently asked question..."
                rows={2}
              />
            </div>
            <div>
              <Label>ANSWER</Label>
              <Textarea
                value={newFAQ.answer}
                onChange={(e) => setNewFAQ(prev => ({ ...prev, answer: e.target.value }))}
                placeholder="Enter the detailed answer that the AI should provide..."
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddFAQ(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleAddFAQ}
                disabled={!newFAQ.question || !newFAQ.answer || !newFAQ.category}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                ADD TO TRAINING DATA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Conversation Details Modal */}
      <Dialog open={showConversation} onOpenChange={setShowConversation}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              CONVERSATION DETAILS: {selectedConversation?.id}
            </DialogTitle>
            <DialogDescription>
              Full conversation thread and analysis details.
            </DialogDescription>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>CITIZEN ID</Label>
                  <p className="font-medium">{selectedConversation.citizenId}</p>
                </div>
                <div>
                  <Label>LANGUAGE</Label>
                  <Badge variant="outline">{selectedConversation.language.toUpperCase()}</Badge>
                </div>
                <div>
                  <Label>STATUS</Label>
                  <Badge className={getStatusColor(selectedConversation.status)}>
                    {selectedConversation.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>RESPONSE TIME</Label>
                  <p className="font-medium">{selectedConversation.responseTime}</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-[var(--government-green)]">ORIGINAL QUERY</Label>
                <p className="mt-2 font-medium">{selectedConversation.query}</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <Label className="text-[var(--government-green)]">AI RESPONSE</Label>
                <p className="mt-2">
                  {selectedConversation.language === 'ar' && "تم معالجة استفسارك بنجاح. يمكنك تجديد هويتك الرقمية من خلال البوابة الإلكترونية الرسمية."}
                  {selectedConversation.language === 'fr' && "Votre demande a été traitée avec succès. Vous pouvez renouveler votre ID numérique via le portail officiel."}
                  {selectedConversation.language === 'zgh' && "ⵜⵏⵏⴰ ⵜⵙⵓⵍⵜ ⵏⵏⴽ ⵙ ⵓⵎⵢⴰⵖ. ⵜⵖⵉⴷ ⴰⴷ ⵜⵙⵎⴰⵢⵏⵓⴷ ⵜⴰⵎⴰⴳⵏⵓⵜ ⵏⵏⴽ ⵜⴰⴷⵉⵊⵉⵜⴰⵍⵜ."}
                  {selectedConversation.language === 'en' && "Your inquiry has been processed successfully. You can access diaspora voting information through the official portal."}
                </p>
              </div>

              {selectedConversation.satisfaction && (
                <div className="flex items-center space-x-2">
                  <Label>CITIZEN SATISFACTION:</Label>
                  <div className="flex items-center space-x-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star}
                        className={`h-4 w-4 ${
                          star <= selectedConversation.satisfaction 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  ESCALATE TO HUMAN
                </Button>
                <Button variant="outline">
                  EXPORT CONVERSATION
                </Button>
                <Button onClick={() => setShowConversation(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}