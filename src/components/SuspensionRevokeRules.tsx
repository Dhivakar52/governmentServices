import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {  Edit, Trash2, AlertTriangle, Clock, FileText } from 'lucide-react';

interface SuspensionRule {
  id: string;
  trigger: string;
  condition: string;
  action: 'suspend' | 'deactivate' | 'notify';
  appliesTo: string;
  reinstatementRule: string;
  duration?: number;
  officerNotification: boolean;
  autoReinstate: boolean;
  appealAllowed: boolean;
  status: 'active' | 'inactive';
  createdDate: string;
  lastModified: string;
}

const mockRules: SuspensionRule[] = [
  {
    id: '1',
    trigger: 'No-shows',
    condition: '3 consecutive missed appointments',
    action: 'suspend',
    appliesTo: 'All License Types',
    reinstatementRule: 'After 30 days + successful appeal',
    duration: 30,
    officerNotification: true,
    autoReinstate: false,
    appealAllowed: true,
    status: 'active',
    createdDate: '2024-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: '2',
    trigger: 'Outstanding Penalties',
    condition: 'Total penalties > $100',
    action: 'deactivate',
    appliesTo: 'Commercial Licenses',
    reinstatementRule: 'Manual review only after payment',
    officerNotification: true,
    autoReinstate: false,
    appealAllowed: false,
    status: 'active',
    createdDate: '2024-01-10',
    lastModified: '2024-01-18'
  },
  {
    id: '3',
    trigger: 'Medical Review',
    condition: 'Failed medical examination',
    action: 'suspend',
    appliesTo: 'All License Types',
    reinstatementRule: 'Valid medical certificate required',
    duration: 60,
    officerNotification: true,
    autoReinstate: false,
    appealAllowed: true,
    status: 'active',
    createdDate: '2024-01-05',
    lastModified: '2024-01-12'
  }
];

interface SuspensionRevokeRulesProps {
  onBack: () => void;
}

export const SuspensionRevokeRules: React.FC<SuspensionRevokeRulesProps> = ({ onBack }) => {
  const [rules, setRules] = useState<SuspensionRule[]>(mockRules);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<SuspensionRule | null>(null);
  const [formData, setFormData] = useState({
    trigger: '',
    condition: '',
    conditionValue: '',
    conditionOperator: 'equals',
    action: 'suspend' as 'suspend' | 'deactivate' | 'notify',
    appliesTo: '',
    reinstatementRule: '',
    duration: 30,
    officerNotification: true,
    autoReinstate: false,
    appealAllowed: true,
    logBehavior: 'detailed' as 'detailed' | 'summary' | 'none',
    escalationLevel: 'standard' as 'standard' | 'urgent' | 'critical'
  });

  // const handleAddRule = () => {
  //   setEditingRule(null);
  //   setFormData({
  //     trigger: '',
  //     condition: '',
  //     conditionValue: '',
  //     conditionOperator: 'equals',
  //     action: 'suspend',
  //     appliesTo: '',
  //     reinstatementRule: '',
  //     duration: 30,
  //     officerNotification: true,
  //     autoReinstate: false,
  //     appealAllowed: true,
  //     logBehavior: 'detailed',
  //     escalationLevel: 'standard'
  //   });
  //   setIsDialogOpen(true);
  // };

  const handleEditRule = (rule: SuspensionRule) => {
    setEditingRule(rule);
    setFormData({
      trigger: rule.trigger,
      condition: rule.condition,
      conditionValue: rule.condition.split(' ')[rule.condition.split(' ').length - 1] || '',
      conditionOperator: 'equals',
      action: rule.action,
      appliesTo: rule.appliesTo,
      reinstatementRule: rule.reinstatementRule,
      duration: rule.duration || 30,
      officerNotification: rule.officerNotification,
      autoReinstate: rule.autoReinstate,
      appealAllowed: rule.appealAllowed,
      logBehavior: 'detailed',
      escalationLevel: 'standard'
    });
    setIsDialogOpen(true);
  };

  const handleSaveRule = () => {
    // Build the condition string from the builder
    const conditionString = `${formData.trigger} ${formData.conditionOperator.replace('_', ' ')} ${formData.conditionValue}`;
    
    const newRule: SuspensionRule = {
      id: editingRule?.id || Date.now().toString(),
      trigger: formData.trigger,
      condition: conditionString,
      action: formData.action,
      appliesTo: formData.appliesTo,
      reinstatementRule: formData.reinstatementRule,
      duration: formData.duration,
      officerNotification: formData.officerNotification,
      autoReinstate: formData.autoReinstate,
      appealAllowed: formData.appealAllowed,
      status: 'active',
      createdDate: editingRule?.createdDate || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
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

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'suspend':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Suspend</Badge>;
      case 'deactivate':
        return <Badge variant="destructive">Deactivate</Badge>;
      case 'notify':
        return <Badge className="bg-blue-100 text-blue-800">Notify</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge variant="outline">Inactive</Badge>;
  };

  return (
    <AdminPageLayout 
      title="Suspension/Revoke Rules" 
      onBack={onBack}
      // action={
      //   <Button onClick={handleAddRule} className="d365-button-primary btn-with-icon">
      //     <Plus className="w-4 h-4" />
      //     Add Rule
      //   </Button>
      // }
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Active Rules</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.filter(rule => rule.status === 'active').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Auto-Suspend Rules</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.filter(rule => rule.action === 'suspend').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Appeal-Enabled</p>
                  <p className="text-title2 font-semibold text-d365-text-primary">
                    {rules.filter(rule => rule.appealAllowed).length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title3 font-medium">Suspension & Revocation Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-d365-border">
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Trigger</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Action</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Applies To</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Reinstatement Rule</th>
                    <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Status</th>
                    <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-body font-medium text-d365-text-primary">{rule.trigger}</div>
                          <div className="text-caption text-d365-text-secondary">{rule.condition}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getActionBadge(rule.action)}
                      </td>
                      <td className="py-4 px-4 text-body text-d365-text-primary">
                        {rule.appliesTo}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-body text-d365-text-primary">{rule.reinstatementRule}</div>
                        {rule.duration && (
                          <div className="text-caption text-d365-text-secondary">Duration: {rule.duration} days</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(rule.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
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
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRule ? 'Edit Suspension Rule' : 'Add New Suspension Rule'}
              </DialogTitle>
              <DialogDescription>
                {editingRule 
                  ? 'Modify the suspension rule settings and conditions.'
                  : 'Create a new rule to automatically suspend or revoke licenses based on specific conditions.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="action">Action</Label>
                <Select value={formData.action} onValueChange={(value: 'suspend' | 'deactivate' | 'notify') => setFormData({...formData, action: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suspend">Suspend License</SelectItem>
                    <SelectItem value="deactivate">Deactivate License</SelectItem>
                    <SelectItem value="notify">Notify Only (No Action)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Condition Builder</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={formData.trigger} onValueChange={(value) => setFormData({...formData, trigger: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="No-shows">No-shows</SelectItem>
                      <SelectItem value="Outstanding Penalties">Outstanding Penalties</SelectItem>
                      <SelectItem value="Medical Review">Medical Review</SelectItem>
                      <SelectItem value="Failed Test">Failed Test</SelectItem>
                      <SelectItem value="Document Fraud">Document Fraud</SelectItem>
                      <SelectItem value="Traffic Violations">Traffic Violations</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={formData.conditionOperator} onValueChange={(value) => setFormData({...formData, conditionOperator: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equals">Equals</SelectItem>
                      <SelectItem value="greater_than">Greater than</SelectItem>
                      <SelectItem value="less_than">Less than</SelectItem>
                      <SelectItem value="contains">Contains</SelectItem>
                      <SelectItem value="between">Between</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input
                    value={formData.conditionValue}
                    onChange={(e) => setFormData({...formData, conditionValue: e.target.value})}
                    placeholder="Value"
                  />
                </div>
                <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-700">
                  Preview: {formData.trigger} {formData.conditionOperator.replace('_', ' ')} {formData.conditionValue}
                </div>
              </div>

              <div>
                <Label htmlFor="appliesTo">Applies To</Label>
                <Select value={formData.appliesTo} onValueChange={(value) => setFormData({...formData, appliesTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All License Types">All License Types</SelectItem>
                    <SelectItem value="Commercial Licenses">Commercial Licenses</SelectItem>
                    <SelectItem value="Private Licenses">Private Licenses</SelectItem>
                    <SelectItem value="Learner Permits">Learner Permits</SelectItem>
                    <SelectItem value="Motorcycle Licenses">Motorcycle Licenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="reinstatementRule">Reinstatement Policy</Label>
                <Textarea
                  id="reinstatementRule"
                  value={formData.reinstatementRule}
                  onChange={(e) => setFormData({...formData, reinstatementRule: e.target.value})}
                  placeholder="e.g., Valid medical certificate required, completion of safety course, payment of all outstanding fines..."
                  rows={4}
                />
                <div className="text-caption text-d365-text-secondary mt-1">
                  Define the specific requirements and conditions that must be met for license reinstatement.
                </div>
              </div>

              {formData.action === 'suspend' && (
                <div>
                  <Label htmlFor="duration">Suspension Duration (days)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 30})}
                    min="1"
                    max="365"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="officerNotification">Officer Notification</Label>
                  <Switch
                    id="officerNotification"
                    checked={formData.officerNotification}
                    onCheckedChange={(checked) => setFormData({...formData, officerNotification: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoReinstate">Auto-Reinstatement</Label>
                  <Switch
                    id="autoReinstate"
                    checked={formData.autoReinstate}
                    onCheckedChange={(checked) => setFormData({...formData, autoReinstate: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="appealAllowed">Appeal Allowed</Label>
                  <Switch
                    id="appealAllowed"
                    checked={formData.appealAllowed}
                    onCheckedChange={(checked) => setFormData({...formData, appealAllowed: checked})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="logBehavior">Logging Behavior</Label>
                  <Select value={formData.logBehavior} onValueChange={(value: 'detailed' | 'summary' | 'none') => setFormData({...formData, logBehavior: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="detailed">Detailed - Full audit trail</SelectItem>
                      <SelectItem value="summary">Summary - Key events only</SelectItem>
                      <SelectItem value="none">None - No logging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="escalationLevel">Escalation Level</Label>
                  <Select value={formData.escalationLevel} onValueChange={(value: 'standard' | 'urgent' | 'critical') => setFormData({...formData, escalationLevel: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
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