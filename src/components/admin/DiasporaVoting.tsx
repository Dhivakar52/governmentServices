import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Vote, 
  Users, 
  Shield,
  CheckCircle,
  MapPin,
  BarChart3,
  UserCheck,
  Fingerprint,
  Download,
  Plus,
  Eye,
  AlertTriangle,
  Zap
} from 'lucide-react';

export function DiasporaVoting() {
  const [showNewReferendum, setShowNewReferendum] = useState(false);
  const [showVoterDetails, setShowVoterDetails] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState<any>(null);
  const [newReferendum, setNewReferendum] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    eligibilityCriteria: ''
  });

  const votingStats = [
    {
      title: 'Eligible Diaspora Voters',
      value: '110,000',
      icon: Users,
      color: 'bg-blue-500',
      change: '+2,150',
      period: 'new registrations'
    },
    {
      title: 'Votes Cast (Ongoing)',
      value: '13,582',
      icon: Vote,
      color: 'bg-green-500',
      change: '+1,205',
      period: 'in last 24h'
    },
    {
      title: 'Verification Success Rate',
      value: '99.3%',
      icon: Shield,
      color: 'bg-purple-500',
      change: '+0.2%',
      period: 'improvement'
    },
    {
      title: 'Active Polling Stations',
      value: '47',
      icon: MapPin,
      color: 'bg-orange-500',
      change: '12 countries',
      period: 'worldwide'
    }
  ];

  const countryData = [
    { country: 'France', flag: '🇫🇷', voters: '41,800', percentage: '38%', votes: '5,156', stations: '8' },
    { country: 'UAE', flag: '🇦🇪', voters: '23,100', percentage: '21%', votes: '2,851', stations: '4' },
    { country: 'Canada', flag: '🇨🇦', voters: '16,500', percentage: '15%', votes: '2,038', stations: '6' },
    { country: 'Spain', flag: '🇪🇸', voters: '12,100', percentage: '11%', votes: '1,493', stations: '5' },
    { country: 'Germany', flag: '🇩🇪', voters: '8,800', percentage: '8%', votes: '1,085', stations: '3' },
    { country: 'Italy', flag: '🇮🇹', voters: '4,400', percentage: '4%', votes: '543', stations: '2' },
    { country: 'Belgium', flag: '🇧🇪', voters: '3,300', percentage: '3%', votes: '407', stations: '2' }
  ];

  const demographicsData = [
    { category: 'Age 18-30', percentage: '28%', count: '30,800', engagement: '85%' },
    { category: 'Age 31-45', percentage: '35%', count: '38,500', engagement: '92%' },
    { category: 'Age 46-60', percentage: '25%', count: '27,500', engagement: '89%' },
    { category: 'Age 60+', percentage: '12%', count: '13,200', engagement: '78%' },
  ];

  const genderData = [
    { gender: 'Male', percentage: '52%', count: '57,200', engagement: '87%' },
    { gender: 'Female', percentage: '48%', count: '52,800', engagement: '91%' }
  ];

  const recentVerifications = [
    {
      id: 'VOTE-2025-013582',
      citizenId: 'CIV-2025-001234',
      name: 'Ahmed Ben Ali',
      country: 'France',
      verificationMethod: '2FA + Facial + PIN',
      status: 'verified',
      timestamp: '2 min ago',
      voteStatus: 'cast'
    },
    {
      id: 'VOTE-2025-013581',
      citizenId: 'CIV-2025-005678',
      name: 'Fatima El Mansouri',
      country: 'UAE',
      verificationMethod: '2FA + Facial + PIN',
      status: 'verified',
      timestamp: '5 min ago',
      voteStatus: 'cast'
    },
    {
      id: 'VOTE-2025-013580',
      citizenId: 'CIV-2025-009012',
      name: 'Omar Benali',
      country: 'Canada',
      verificationMethod: '2FA + Facial + PIN',
      status: 'failed',
      timestamp: '8 min ago',
      voteStatus: 'rejected'
    },
    {
      id: 'VOTE-2025-013579',
      citizenId: 'CIV-2025-003456',
      name: 'Aicha Amrani',
      country: 'Spain',
      verificationMethod: '2FA + Facial + PIN',
      status: 'verified',
      timestamp: '12 min ago',
      voteStatus: 'cast'
    },
    {
      id: 'VOTE-2025-013578',
      citizenId: 'CIV-2025-007890',
      name: 'Youssef Idrissi',
      country: 'Germany',
      verificationMethod: '2FA + Facial + PIN',
      status: 'verified',
      timestamp: '15 min ago',
      voteStatus: 'cast'
    }
  ];

  const activeReferendums = [
    {
      id: 'REF-2025-001',
      title: 'Digital Services Expansion Initiative',
      description: 'Proposal to expand digital government services for diaspora citizens',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      totalVotes: '13,582',
      participationRate: '12.3%',
      status: 'active'
    },
    {
      id: 'REF-2025-002',
      title: 'Diaspora Representation Council',
      description: 'Establishment of official diaspora representation in national affairs',
      startDate: '2025-02-01',
      endDate: '2025-02-28',
      totalVotes: '0',
      participationRate: '0%',
      status: 'scheduled'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVoteStatusColor = (status: string) => {
    switch (status) {
      case 'cast': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewReferendum = () => {
    console.log('Creating new referendum:', newReferendum);
    setNewReferendum({ title: '', description: '', startDate: '', endDate: '', eligibilityCriteria: '' });
    setShowNewReferendum(false);
    alert('New referendum launched successfully!');
  };

  const viewVoterDetails = (voter: any) => {
    setSelectedVoter(voter);
    setShowVoterDetails(true);
  };

  const exportResults = () => {
    const csvData = [
      ['Referendum ID', 'Title', 'Total Votes', 'Participation Rate', 'Status'],
      ...activeReferendums.map(ref => [ref.id, ref.title, ref.totalVotes, ref.participationRate, ref.status])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `diaspora_voting_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            DIASPORA VOTING (PILOT PROGRAM)
          </h1>
          <p className="text-gray-600">
            Secure online voting system for citizens living abroad - Pilot Implementation
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowNewReferendum(true)}
            className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            LAUNCH NEW REFERENDUM
          </Button>
          <Button variant="outline" onClick={exportResults}>
            <Download className="h-4 w-4 mr-2" />
            EXPORT RESULT CSV
          </Button>
        </div>
      </div>

      {/* Voting Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {votingStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                {stat.change.includes('+') && (
                  <Badge className="bg-green-100 text-green-800 text-xs">INCREASING</Badge>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">
                  {stat.change} {stat.period}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Verification Method Info */}
      <Card className="formal-card p-6">
        <h3 className="text-lg font-bold text-[var(--government-green)] mb-4">
          MULTI-LAYER VERIFICATION SYSTEM
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Zap className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">TWO-FACTOR AUTHENTICATION</h4>
            <p className="text-sm text-gray-600">SMS + Email verification for initial access</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 text-green-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <UserCheck className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">FACIAL RECOGNITION MATCH</h4>
            <p className="text-sm text-gray-600">Real-time facial verification against government records</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Fingerprint className="h-8 w-8" />
            </div>
            <h4 className="font-bold text-[var(--government-green)] mb-2">DIGITAL ID PIN</h4>
            <p className="text-sm text-gray-600">Secure PIN verification with encrypted digital identity</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Voting by Region */}
        <Card className="formal-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[var(--government-green)]">VOTING BY REGION</h3>
            <Badge className="bg-blue-100 text-blue-800">
              {countryData.length} COUNTRIES
            </Badge>
          </div>
          <div className="space-y-4">
            {countryData.map((country, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h4 className="font-bold text-[var(--government-green)]">{country.country}</h4>
                      <p className="text-sm text-gray-600">{country.stations} polling stations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[var(--government-green)]">{country.percentage}</p>
                    <p className="text-xs text-gray-500">of total voters</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Eligible Voters:</span>
                    <span className="font-medium ml-2">{country.voters}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Votes Cast:</span>
                    <span className="font-medium ml-2">{country.votes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Voter Demographics */}
        <Card className="formal-card p-6">
          <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">VOTER DEMOGRAPHICS</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-[var(--government-green)] mb-3">AGE DISTRIBUTION</h4>
              <div className="space-y-3">
                {demographicsData.map((demo, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{demo.category}</span>
                      <span>{demo.percentage} ({demo.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[var(--government-green)] h-2 rounded-full" 
                        style={{ width: demo.percentage }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Engagement: {demo.engagement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-[var(--government-green)] mb-3">GENDER DISTRIBUTION</h4>
              <div className="space-y-3">
                {genderData.map((gender, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{gender.gender}</span>
                      <span>{gender.percentage} ({gender.count})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[var(--government-gold)] h-2 rounded-full" 
                        style={{ width: gender.percentage }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500">Engagement: {gender.engagement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Referendums */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">ACTIVE & SCHEDULED REFERENDUMS</h3>
          <Badge className="bg-green-100 text-green-800">
            {activeReferendums.filter(r => r.status === 'active').length} ACTIVE
          </Badge>
        </div>
        
        <div className="space-y-4">
          {activeReferendums.map((referendum) => (
            <div key={referendum.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-[var(--government-green)]">{referendum.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{referendum.description}</p>
                </div>
                <Badge className={referendum.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {referendum.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Start Date:</span>
                  <p className="font-medium">{new Date(referendum.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">End Date:</span>
                  <p className="font-medium">{new Date(referendum.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Total Votes:</span>
                  <p className="font-medium">{referendum.totalVotes}</p>
                </div>
                <div>
                  <span className="text-gray-500">Participation:</span>
                  <p className="font-medium">{referendum.participationRate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Voter Verifications */}
      <Card className="formal-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[var(--government-green)]">RECENT VOTER VERIFICATIONS</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              VOTING ANALYTICS
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              AUDIT LOG
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>VOTER ID</TableHead>
              <TableHead>CITIZEN NAME</TableHead>
              <TableHead>COUNTRY</TableHead>
              <TableHead>VERIFICATION METHOD</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>VOTE STATUS</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentVerifications.map((verification) => (
              <TableRow key={verification.id}>
                <TableCell className="font-medium">{verification.id}</TableCell>
                <TableCell>{verification.name}</TableCell>
                <TableCell>{verification.country}</TableCell>
                <TableCell className="text-xs">{verification.verificationMethod}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(verification.status)}>
                    {verification.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getVoteStatusColor(verification.voteStatus)}>
                    {verification.voteStatus.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{verification.timestamp}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => viewVoterDetails(verification)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* New Referendum Modal */}
      <Dialog open={showNewReferendum} onOpenChange={setShowNewReferendum}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              LAUNCH NEW REFERENDUM
            </DialogTitle>
            <DialogDescription>
              Create a new referendum for diaspora citizens to vote on.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>REFERENDUM TITLE</Label>
              <Input
                value={newReferendum.title}
                onChange={(e) => setNewReferendum(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter referendum title"
              />
            </div>
            <div>
              <Label>DESCRIPTION</Label>
              <Textarea
                value={newReferendum.description}
                onChange={(e) => setNewReferendum(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the referendum..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>START DATE</Label>
                <Input
                  type="date"
                  value={newReferendum.startDate}
                  onChange={(e) => setNewReferendum(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label>END DATE</Label>
                <Input
                  type="date"
                  value={newReferendum.endDate}
                  onChange={(e) => setNewReferendum(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label>ELIGIBILITY CRITERIA</Label>
              <Textarea
                value={newReferendum.eligibilityCriteria}
                onChange={(e) => setNewReferendum(prev => ({ ...prev, eligibilityCriteria: e.target.value }))}
                placeholder="Specify who is eligible to vote in this referendum..."
                rows={2}
              />
            </div>
            <div className="bg-red-50 border border-red-200 p-3 rounded">
              <p className="text-sm text-red-700">
                <AlertTriangle className="h-4 w-4 inline mr-2" />
                <strong>Security Notice:</strong> All referendum launches require additional security clearance and will be logged for audit purposes.
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewReferendum(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleNewReferendum}
                disabled={!newReferendum.title || !newReferendum.description || !newReferendum.startDate || !newReferendum.endDate}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                LAUNCH REFERENDUM
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voter Details Modal */}
      <Dialog open={showVoterDetails} onOpenChange={setShowVoterDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              VOTER VERIFICATION DETAILS
            </DialogTitle>
            <DialogDescription>
              Detailed verification and voting information for this citizen.
            </DialogDescription>
          </DialogHeader>
          {selectedVoter && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>VOTER ID</Label>
                  <p className="font-medium">{selectedVoter.id}</p>
                </div>
                <div>
                  <Label>CITIZEN ID</Label>
                  <p className="font-medium">{selectedVoter.citizenId}</p>
                </div>
                <div>
                  <Label>FULL NAME</Label>
                  <p className="font-medium">{selectedVoter.name}</p>
                </div>
                <div>
                  <Label>COUNTRY OF RESIDENCE</Label>
                  <p className="font-medium">{selectedVoter.country}</p>
                </div>
                <div>
                  <Label>VERIFICATION STATUS</Label>
                  <Badge className={getStatusColor(selectedVoter.status)}>
                    {selectedVoter.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>VOTE STATUS</Label>
                  <Badge className={getVoteStatusColor(selectedVoter.voteStatus)}>
                    {selectedVoter.voteStatus.toUpperCase()}
                  </Badge>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-[var(--government-green)]">VERIFICATION METHOD DETAILS</Label>
                <p className="mt-2 font-medium">{selectedVoter.verificationMethod}</p>
                <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p>2FA Verified</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p>Facial Match</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <p>PIN Confirmed</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  VIEW AUDIT TRAIL
                </Button>
                <Button variant="outline">
                  EXPORT DETAILS
                </Button>
                <Button onClick={() => setShowVoterDetails(false)}>
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