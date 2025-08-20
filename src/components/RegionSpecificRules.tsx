import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Plus, Edit, Trash2, MapPin, Settings, Globe, AlertTriangle } from 'lucide-react';

interface RegionRule {
  id: string;
  regions: string[];
  ruleType: 'override' | 'disable' | 'translate' | 'modify';
  affectedElement: string;
  elementType: 'license' | 'fee' | 'document' | 'test' | 'process';
  description: string;
  implementation: string;
  localLanguageSupport: boolean;
  customValues?: Record<string, any>;
  status: 'active' | 'inactive' | 'pending';
  priority: number;
  createdDate: string;
  lastModified: string;
  createdBy: string;
}

const availableRegions = [
  { id: 'zone-a', name: 'Zone A (Metropolitan)', type: 'zone' },
  { id: 'zone-b', name: 'Zone B (Urban)', type: 'zone' },
  { id: 'zone-c', name: 'Zone C (Rural)', type: 'zone' },
  { id: 'district-north', name: 'Northern District', type: 'district' },
  { id: 'district-south', name: 'Southern District', type: 'district' },
  { id: 'district-east', name: 'Eastern District', type: 'district' },
  { id: 'district-west', name: 'Western District', type: 'district' },
  { id: 'city-capital', name: 'Capital City', type: 'city' },
  { id: 'city-port', name: 'Port City', type: 'city' },
  { id: 'province-central', name: 'Central Province', type: 'province' },
  { id: 'province-coastal', name: 'Coastal Province', type: 'province' }
];

const mockRules: RegionRule[] = [
  {
    id: '1',
    regions: ['zone-b', 'district-north'],
    ruleType: 'override',
    affectedElement: 'Commercial License Fee',
    elementType: 'fee',
    description: 'Reduced commercial license fees for rural development incentive',
    implementation: 'Fee reduced by 30% for commercial licenses in designated rural zones',
    localLanguageSupport: true,
    customValues: { feeMultiplier: 0.7, currency: 'USD' },
    status: 'active',
    priority: 1,
    createdDate: '2024-01-15',
    lastModified: '2024-01-20',
    createdBy: 'Admin User'
  },
  {
    id: '2',
    regions: ['district-east'],
    ruleType: 'disable',
    affectedElement: 'Learner License',
    elementType: 'license',
    description: 'Temporary suspension of learner licenses due to testing facility maintenance',
    implementation: 'Learner license applications disabled until testing center repairs complete',
    localLanguageSupport: false,
    status: 'inactive',
    priority: 2,
    createdDate: '2024-01-10',
    lastModified: '2024-01-18',
    createdBy: 'Regional Manager'
  },
  {
    id: '3',
    regions: ['province-coastal'],
    ruleType: 'translate',
    affectedElement: 'License Application Form',
    elementType: 'document',
    description: 'Multilingual support for coastal province with tourism industry',
    implementation: 'Forms available in English, Swahili, and French',
    localLanguageSupport: true,
    customValues: { languages: ['en', 'sw', 'fr'] },
    status: 'active',
    priority: 3,
    createdDate: '2024-01-05',
    lastModified: '2024-01-12',
    createdBy: 'Language Coordinator'
  },
  {
    id: '4',
    regions: ['city-capital'],
    ruleType: 'modify',
    affectedElement: 'Driving Test Requirements',
    elementType: 'test',
    description: 'Enhanced testing requirements for capital city due to traffic density',
    implementation: 'Additional parallel parking and city driving tests required',
    localLanguageSupport: false,
    customValues: { additionalTests: ['parallel_parking', 'city_navigation'] },
    status: 'active',
    priority: 1,
    createdDate: '2023-12-20',
    lastModified: '2024-01-08',
    createdBy: 'Traffic Authority'
  }
];

interface RegionSpecificRulesProps {
  onBack: () => void;
}

export const RegionSpecificRules: React.FC<RegionSpecificRulesProps> = ({ onBack }) => {
  const [rules, setRules] = useState<RegionRule[]>(mockRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RegionRule | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    ruleType: 'override' as RegionRule['ruleType'],
    affectedElement: '',
    elementType: 'license' as RegionRule['elementType'],
    description: '',
    implementation: '',
    localLanguageSupport: false,
    priority: 1
  });

  const handleAddRule = () => {
    setEditingRule(null);
    setSelectedRegions([]);
    setFormData({
      ruleType: 'override',
      affectedElement: '',
      elementType: 'license',
      description: '',
      implementation: '',
      localLanguageSupport: false,
      priority: 1
    });
    setIsDialogOpen(true);
  };

  const handleEditRule = (rule: RegionRule) => {
    setEditingRule(rule);
    setSelectedRegions(rule.regions);
    setFormData({
      ruleType: rule.ruleType,
      affectedElement: rule.affectedElement,
      elementType: rule.elementType,
      description: rule.description,
      implementation: rule.implementation,
      localLanguageSupport: rule.localLanguageSupport,
      priority: rule.priority
    });
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    if (selectedRegions.length === 0 || !formData.affectedElement.trim()) {
      return; // Basic validation
    }

    const newRule: RegionRule = {
      id: editingRule?.id || Date.now().toString(),
      regions: selectedRegions,
      ...formData,
      status: 'active',
      createdDate: editingRule?.createdDate || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      createdBy: editingRule?.createdBy || 'Current User'
    };

    if (editingRule) {
      setRules(rules.map(rule => rule.id === editingRule.id ? newRule : rule));
    } else {
      setRules([...rules, newRule]);
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleToggleRuleStatus = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
        : rule
    ));
  };

  const handleRegionToggle = (regionId: string, checked: boolean) => {
    if (checked) {
      setSelectedRegions([...selectedRegions, regionId]);
    } else {
      setSelectedRegions(selectedRegions.filter(id => id !== regionId));
    }
  };

  const getRuleTypeBadge = (ruleType: string) => {
    switch (ruleType) {
      case 'override':
        return <Badge className="bg-blue-100 text-blue-800">Override</Badge>;
      case 'disable':
        return <Badge variant="destructive">Disable</Badge>;
      case 'translate':
        return <Badge className="bg-green-100 text-green-800">Translate</Badge>;
      case 'modify':
        return <Badge className="bg-purple-100 text-purple-800">Modify</Badge>;
      default:
        return <Badge variant="outline">{ruleType}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getElementTypeIcon = (elementType: string) => {
    switch (elementType) {
      case 'license': return '🗂️';
      case 'fee': return '💰';
      case 'document': return '📄';
      case 'test': return '📝';
      case 'process': return '⚙️';
      default: return '📋';
    }
  };

  const getRegionName = (regionId: string) => {
    const region = availableRegions.find(r => r.id === regionId);
    return region ? region.name : regionId;
  };

  const groupRegionsByType = () => {
    return availableRegions.reduce((groups, region) => {
      if (!groups[region.type]) {
        groups[region.type] = [];
      }
      groups[region.type].push(region);
      return groups;
    }, {} as Record<string, typeof availableRegions>);
  };

  return (
    <AdminPageLayout 
      title="Region-Specific Rules" 
      onBack={onBack}
      action={
        <Button onClick={handleAddRule} className="d365-button-primary btn-with-icon">
          <Plus className="w-4 h-4" />
          Add Region Rule
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Total Rules</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.length}
                  </p>
                </div>
                <Settings className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Active Rules</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.filter(rule => rule.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Regions Covered</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {new Set(rules.flatMap(rule => rule.regions)).size}
                  </p>
                </div>
                <MapPin className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Multilingual</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.filter(rule => rule.localLanguageSupport).length}
                  </p>
                </div>
                <Globe className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title3 font-medium">Regional Rules Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-d365-border">
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Region</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Rule Type</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Affected Element</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Description</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                    <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {rule.regions.slice(0, 2).map((regionId) => (
                            <div key={regionId} className="text-caption text-d365-text-primary">
                              {getRegionName(regionId)}
                            </div>
                          ))}
                          {rule.regions.length > 2 && (
                            <div className="text-caption text-d365-text-secondary">
                              +{rule.regions.length - 2} more
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getRuleTypeBadge(rule.ruleType)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getElementTypeIcon(rule.elementType)}</span>
                          <div>
                            <div className="text-body font-medium text-d365-text-primary">{rule.affectedElement}</div>
                            <div className="text-caption text-d365-text-secondary capitalize">{rule.elementType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="max-w-xs">
                          <div className="text-body text-d365-text-primary line-clamp-2">{rule.description}</div>
                          {rule.localLanguageSupport && (
                            <div className="flex items-center gap-1 mt-1">
                              <Globe className="w-3 h-3 text-blue-500" />
                              <span className="text-caption text-blue-600">Multilingual</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          {getStatusBadge(rule.status)}
                          <div className="text-caption text-d365-text-secondary">Priority: {rule.priority}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleRuleStatus(rule.id)}
                            className={rule.status === 'active' ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}
                          >
                            {rule.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditRule(rule)}
                            className="text-d365-primary hover:bg-d365-hover"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit Rule Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRule ? 'Edit Regional Rule' : 'Add New Regional Rule'}
              </DialogTitle>
              <DialogDescription>
                {editingRule 
                  ? 'Modify the regional rule configuration and affected regions.'
                  : 'Create a new region-specific rule to customize functionality for different areas.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Region Selection */}
              <div>
                <Label className="text-body font-medium mb-3 block">Select Regions</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto border rounded-lg p-4">
                  {Object.entries(groupRegionsByType()).map(([type, regions]) => (
                    <div key={type}>
                      <h4 className="text-caption font-medium text-d365-text-secondary uppercase mb-2">
                        {type}s
                      </h4>
                      <div className="space-y-2">
                        {regions.map((region) => (
                          <div key={region.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={region.id}
                              checked={selectedRegions.includes(region.id)}
                              onCheckedChange={(checked) => handleRegionToggle(region.id, checked as boolean)}
                            />
                            <Label htmlFor={region.id} className="text-caption">
                              {region.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule Configuration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ruleType">Rule Type</Label>
                  <Select value={formData.ruleType} onValueChange={(value: RegionRule['ruleType']) => setFormData({...formData, ruleType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="override">Override - Modify existing settings</SelectItem>
                      <SelectItem value="disable">Disable - Turn off functionality</SelectItem>
                      <SelectItem value="translate">Translate - Add language support</SelectItem>
                      <SelectItem value="modify">Modify - Change requirements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="elementType">Element Type</Label>
                  <Select value={formData.elementType} onValueChange={(value: RegionRule['elementType']) => setFormData({...formData, elementType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="license">License Type</SelectItem>
                      <SelectItem value="fee">Fee Structure</SelectItem>
                      <SelectItem value="document">Document Requirements</SelectItem>
                      <SelectItem value="test">Testing Requirements</SelectItem>
                      <SelectItem value="process">Process Workflow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="affectedElement">Affected Element</Label>
                <Input
                  id="affectedElement"
                  value={formData.affectedElement}
                  onChange={(e) => setFormData({...formData, affectedElement: e.target.value})}
                  placeholder="e.g., Commercial License Fee, Driving Test Requirements"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe what this rule does and why it's needed..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="implementation">Implementation Details</Label>
                <Textarea
                  id="implementation"
                  value={formData.implementation}
                  onChange={(e) => setFormData({...formData, implementation: e.target.value})}
                  placeholder="Describe how this rule is implemented and any technical details..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority (1-5)</Label>
                  <Select value={formData.priority.toString()} onValueChange={(value) => setFormData({...formData, priority: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Highest</SelectItem>
                      <SelectItem value="2">2 - High</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="4">4 - Low</SelectItem>
                      <SelectItem value="5">5 - Lowest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <Label htmlFor="localLanguageSupport">Local Language Support</Label>
                  <Switch
                    id="localLanguageSupport"
                    checked={formData.localLanguageSupport}
                    onCheckedChange={(checked) => setFormData({...formData, localLanguageSupport: checked})}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveRule} className="d365-button-primary">
                  {editingRule ? 'Update Rule' : 'Add Rule'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminPageLayout>
  );
};