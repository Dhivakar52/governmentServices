import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
Settings, Clock, Users,
  FileText, CheckCircle, User, Bell, 
  GitBranch, Timer, Workflow
} from 'lucide-react';

interface WorkflowStage {
  id: string;
  name: string;
  type: 'submit' | 'document-check' | 'test' | 'approval' | 'issue' | 'conditional' | 'timer';
  x: number;
  y: number;
  assignedRole?: string;
  slaHours?: number;
  notifications: boolean;
  skipLogic: boolean;
  conditions?: string;
  description?: string;
}

interface WorkflowConnection {
  id: string;
  fromStageId: string;
  toStageId: string;
  condition?: string;
}

interface LicenseWorkflow {
  id: string;
  name: string;
  licenseType: string;
  stages: WorkflowStage[];
  connections: WorkflowConnection[];
  status: 'draft' | 'active' | 'archived';
  version: number;
  lastModified: string;
}

const defaultStageTemplates = [
  {
    id: 'submit',
    name: 'Submit Application',
    type: 'submit' as const,
    icon: FileText,
    description: 'Initial application submission',
    defaultSLA: 1
  },
  {
    id: 'document-check',
    name: 'Document Verification',
    type: 'document-check' as const,
    icon: CheckCircle,
    description: 'Verify required documents',
    defaultSLA: 24
  },
  {
    id: 'test',
    name: 'Driving Test',
    type: 'test' as const,
    icon: Users,
    description: 'Practical driving examination',
    defaultSLA: 72
  },
  {
    id: 'approval',
    name: 'Final Approval',
    type: 'approval' as const,
    icon: User,
    description: 'Officer final approval',
    defaultSLA: 12
  },
  {
    id: 'issue',
    name: 'Issue License',
    type: 'issue' as const,
    icon: Badge,
    description: 'Generate and issue license',
    defaultSLA: 2
  }
];

const conditionalLogicTemplates = [
  {
    id: 'branch-renewal',
    name: 'Skip Test if Renewal',
    type: 'conditional' as const,
    icon: GitBranch,
    description: 'Conditional branching logic',
    defaultSLA: 0
  },
  {
    id: 'sla-timer',
    name: 'SLA Timer',
    type: 'timer' as const,
    icon: Timer,
    description: 'Set time-based triggers',
    defaultSLA: 24
  }
];

const mockWorkflow: LicenseWorkflow = {
  id: '1',
  name: 'Standard Driver License Workflow',
  licenseType: 'Private License',
  stages: [
    {
      id: 'stage-1',
      name: 'Submit Application',
      type: 'submit',
      x: 50,
      y: 100,
      assignedRole: 'System',
      slaHours: 1,
      notifications: true,
      skipLogic: false,
      description: 'Citizen submits initial application'
    },
    {
      id: 'stage-2',
      name: 'Document Verification',
      type: 'document-check',
      x: 300,
      y: 100,
      assignedRole: 'Document Officer',
      slaHours: 24,
      notifications: true,
      skipLogic: false,
      description: 'Officer verifies submitted documents'
    },
    {
      id: 'stage-3',
      name: 'Driving Test',
      type: 'test',
      x: 550,
      y: 100,
      assignedRole: 'Test Officer',
      slaHours: 72,
      notifications: true,
      skipLogic: true,
      conditions: 'Skip if renewal application',
      description: 'Practical driving examination'
    },
    {
      id: 'stage-4',
      name: 'Final Approval',
      type: 'approval',
      x: 800,
      y: 100,
      assignedRole: 'Senior Officer',
      slaHours: 12,
      notifications: true,
      skipLogic: false,
      description: 'Final review and approval'
    }
  ],
  connections: [
    { id: 'conn-1', fromStageId: 'stage-1', toStageId: 'stage-2' },
    { id: 'conn-2', fromStageId: 'stage-2', toStageId: 'stage-3' },
    { id: 'conn-3', fromStageId: 'stage-3', toStageId: 'stage-4' }
  ],
  status: 'active',
  version: 1,
  lastModified: '2024-01-20'
};

interface LicenseWorkflowSetupProps {
  onBack: () => void;
}

export const LicenseWorkflowSetup: React.FC<LicenseWorkflowSetupProps> = ({ onBack }) => {
  const [workflow, setWorkflow] = useState<LicenseWorkflow>(mockWorkflow);
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draggedTemplate, setDraggedTemplate] = useState<any>(null);

  // const handleSaveWorkflow = () => {
  //   // Save workflow logic
  //   setIsEditing(false);
  // };

  // const handleDeployWorkflow = () => {
  //   // Deploy workflow logic
  //   console.log('Deploying workflow:', workflow.name);
  // };

  const handleStageClick = (stage: WorkflowStage) => {
    setSelectedStage(stage);
  };

  const handleAddStageToCanvas = (template: any, x: number, y: number) => {
    const newStage: WorkflowStage = {
      id: `stage-${Date.now()}`,
      name: template.name,
      type: template.type,
      x: x - 50, // Offset for center positioning
      y: y - 25,
      assignedRole: '',
      slaHours: template.defaultSLA,
      notifications: true,
      skipLogic: false,
      description: template.description
    };

    setWorkflow({
      ...workflow,
      stages: [...workflow.stages, newStage]
    });
  };

  const handleStageUpdate = (updatedStage: WorkflowStage) => {
    setWorkflow({
      ...workflow,
      stages: workflow.stages.map(stage => 
        stage.id === updatedStage.id ? updatedStage : stage
      )
    });
    setSelectedStage(updatedStage);
  };

  const handleStageMove = (stageId: string, x: number, y: number) => {
    setWorkflow({
      ...workflow,
      stages: workflow.stages.map(stage => 
        stage.id === stageId ? { ...stage, x, y } : stage
      )
    });
  };

  const getStageIcon = (type: string) => {
    const template = [...defaultStageTemplates, ...conditionalLogicTemplates]
      .find(t => t.type === type);
    return template?.icon || FileText;
  };

  const getStageColor = (type: string) => {
    switch (type) {
      case 'submit': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'document-check': return 'bg-green-100 border-green-300 text-green-800';
      case 'test': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'approval': return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'issue': return 'bg-indigo-100 border-indigo-300 text-indigo-800';
      case 'conditional': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'timer': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const renderWorkflowCanvas = () => (
    <div 
      className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden"
      style={{ height: '500px' }}
      onDrop={(e) => {
        e.preventDefault();
        if (draggedTemplate) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          handleAddStageToCanvas(draggedTemplate, x, y);
          setDraggedTemplate(null);
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Grid Background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }} />

      {/* Workflow Stages */}
      {workflow.stages.map((stage) => {
        const StageIcon = getStageIcon(stage.type);
        return (
          <div
            key={stage.id}
            className={`absolute border-2 rounded-lg p-3 cursor-pointer transition-all shadow-sm hover:shadow-md ${
              getStageColor(stage.type)
            } ${selectedStage?.id === stage.id ? 'ring-2 ring-blue-500' : ''}`}
            style={{
              left: stage.x,
              top: stage.y,
              width: '140px',
              minHeight: '80px'
            }}
            draggable={isEditing}
            onClick={() => handleStageClick(stage)}
            onDragEnd={(e) => {
              if (isEditing) {
                const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                if (rect) {
                  const x = Math.max(0, e.clientX - rect.left - 70);
                  const y = Math.max(0, e.clientY - rect.top - 40);
                  handleStageMove(stage.id, x, y);
                }
              }
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <StageIcon className="w-4 h-4" />
              <span className="font-medium text-xs truncate">{stage.name}</span>
            </div>
            <div className="text-xs opacity-75 mb-1">{stage.assignedRole}</div>
            <div className="flex items-center gap-1 text-xs">
              <Clock className="w-3 h-3" />
              <span>{stage.slaHours}h SLA</span>
            </div>
            {stage.skipLogic && (
              <div className="mt-1">
                <Badge variant="outline" className="text-xs">Skip Logic</Badge>
              </div>
            )}
          </div>
        );
      })}

      {/* Connections */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {workflow.connections.map((connection) => {
          const fromStage = workflow.stages.find(s => s.id === connection.fromStageId);
          const toStage = workflow.stages.find(s => s.id === connection.toStageId);
          
          if (!fromStage || !toStage) return null;

          const startX = fromStage.x + 140;
          const startY = fromStage.y + 40;
          const endX = toStage.x;
          const endY = toStage.y + 40;

          return (
            <g key={connection.id}>
              <line
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#666"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </g>
          );
        })}
        
        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#666"
            />
          </marker>
        </defs>
      </svg>

      {/* Drop zone overlay when dragging */}
      {draggedTemplate && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-20 flex items-center justify-center pointer-events-none">
          <div className="text-blue-600 font-medium">Drop here to add stage</div>
        </div>
      )}
    </div>
  );

  const renderPropertiesPanel = () => {
    if (!selectedStage) {
      return (
        <div className="text-center py-8 text-d365-text-secondary">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Select a stage to configure properties</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <Label htmlFor="stageName">Stage Name</Label>
          <Input
            id="stageName"
            value={selectedStage.name}
            onChange={(e) => handleStageUpdate({...selectedStage, name: e.target.value})}
          />
        </div>

        <div>
          <Label htmlFor="assignRole">Assign Role</Label>
          <Select 
            value={selectedStage.assignedRole || ''} 
            onValueChange={(value) => handleStageUpdate({...selectedStage, assignedRole: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="System">System (Automated)</SelectItem>
              <SelectItem value="Document Officer">Document Officer</SelectItem>
              <SelectItem value="Test Officer">Test Officer</SelectItem>
              <SelectItem value="Senior Officer">Senior Officer</SelectItem>
              <SelectItem value="License Administrator">License Administrator</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="stageSLA">Stage SLA (hours)</Label>
          <Input
            id="stageSLA"
            type="number"
            value={selectedStage.slaHours || 24}
            onChange={(e) => handleStageUpdate({...selectedStage, slaHours: parseInt(e.target.value) || 24})}
            min="1"
            max="720"
          />
        </div>

        <div>
          <Label htmlFor="stageDescription">Description</Label>
          <Textarea
            id="stageDescription"
            value={selectedStage.description || ''}
            onChange={(e) => handleStageUpdate({...selectedStage, description: e.target.value})}
            placeholder="Describe what happens in this stage..."
            rows={3}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Notifications</Label>
            <Switch
              id="notifications"
              checked={selectedStage.notifications}
              onCheckedChange={(checked) => handleStageUpdate({...selectedStage, notifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="skipLogic">Enable Skip/Branch Logic</Label>
            <Switch
              id="skipLogic"
              checked={selectedStage.skipLogic}
              onCheckedChange={(checked) => handleStageUpdate({...selectedStage, skipLogic: checked})}
            />
          </div>
        </div>

        {selectedStage.skipLogic && (
          <div>
            <Label htmlFor="skipConditions">Skip Conditions</Label>
            <Textarea
              id="skipConditions"
              value={selectedStage.conditions || ''}
              onChange={(e) => handleStageUpdate({...selectedStage, conditions: e.target.value})}
              placeholder="e.g., Skip if application type = 'renewal'"
              rows={2}
            />
          </div>
        )}

        <div className="pt-4 border-t">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => {
              setWorkflow({
                ...workflow,
                stages: workflow.stages.filter(s => s.id !== selectedStage.id)
              });
              setSelectedStage(null);
            }}
          >
            Delete Stage
          </Button>
        </div>
      </div>
    );
  };

  return (
    <AdminPageLayout 
      title="License Workflow Setup" 
      onBack={onBack}
      // action={
      //   <div className="flex gap-2">
      //     <Button onClick={handleSaveWorkflow} className="d365-button-primary btn-with-icon">
      //       <Save className="w-4 h-4" />
      //       Save Flow
      //     </Button>
      //     <Button onClick={handleDeployWorkflow} className="d365-button-primary btn-with-icon">
      //       <Play className="w-4 h-4" />
      //       Deploy
      //     </Button>
      //   </div>
      // }
    >
      <div className="space-y-6">
        {/* Workflow Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-title3 font-medium">{workflow.name}</CardTitle>
                <p className="text-caption text-d365-text-secondary mt-1">
                  License Type: {workflow.licenseType} • Version {workflow.version} • {workflow.status}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                  {workflow.status}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-with-icon"
                >
                  <Settings className="w-4 h-4" />
                  {isEditing ? 'Exit Edit' : 'Edit Mode'}
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Workflow Builder */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Toolbox */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-body font-medium">Toolbox</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Core Stages */}
                <div>
                  <h4 className="text-caption font-medium text-d365-text-secondary mb-3 uppercase tracking-wide">
                    Stages
                  </h4>
                  <div className="space-y-2">
                    {defaultStageTemplates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-d365-border cursor-move hover:bg-d365-hover transition-colors"
                          draggable
                          onDragStart={() => setDraggedTemplate(template)}
                          onDragEnd={() => setDraggedTemplate(null)}
                        >
                          <Icon className="w-4 h-4 text-d365-text-secondary" />
                          <div className="flex-1">
                            <div className="text-caption font-medium">{template.name}</div>
                            <div className="text-xs text-d365-text-secondary">{template.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Conditional Logic */}
                <div>
                  <h4 className="text-caption font-medium text-d365-text-secondary mb-3 uppercase tracking-wide">
                    Logic & Flow
                  </h4>
                  <div className="space-y-2">
                    {conditionalLogicTemplates.map((template) => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.id}
                          className="flex items-center gap-3 p-3 rounded-lg border border-d365-border cursor-move hover:bg-d365-hover transition-colors"
                          draggable
                          onDragStart={() => setDraggedTemplate(template)}
                          onDragEnd={() => setDraggedTemplate(null)}
                        >
                          <Icon className="w-4 h-4 text-d365-text-secondary" />
                          <div className="flex-1">
                            <div className="text-caption font-medium">{template.name}</div>
                            <div className="text-xs text-d365-text-secondary">{template.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Utilities */}
                <div>
                  <h4 className="text-caption font-medium text-d365-text-secondary mb-3 uppercase tracking-wide">
                    Utilities
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-d365-border cursor-move hover:bg-d365-hover transition-colors">
                      <Bell className="w-4 h-4 text-d365-text-secondary" />
                      <div className="flex-1">
                        <div className="text-caption font-medium">Notification</div>
                        <div className="text-xs text-d365-text-secondary">Send alerts</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-d365-border cursor-move hover:bg-d365-hover transition-colors">
                      <Workflow className="w-4 h-4 text-d365-text-secondary" />
                      <div className="flex-1">
                        <div className="text-caption font-medium">Sub-Workflow</div>
                        <div className="text-xs text-d365-text-secondary">Embed workflow</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Canvas */}
          <div className="col-span-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-body font-medium">Workflow Canvas</CardTitle>
                {isEditing && (
                  <p className="text-caption text-d365-text-secondary">
                    Drag stages from toolbox to canvas. Click stages to configure properties.
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {renderWorkflowCanvas()}
              </CardContent>
            </Card>
          </div>

          {/* Right Properties Panel */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-body font-medium">Properties Panel</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPropertiesPanel()}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Workflow Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Total Stages</p>
                  <p className="text-title2 font-semibold">{workflow.stages.length}</p>
                </div>
                <Workflow className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Avg. SLA</p>
                  <p className="text-title2 font-semibold">
                    {Math.round(workflow.stages.reduce((acc, stage) => acc + (stage.slaHours || 0), 0) / workflow.stages.length)}h
                  </p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Skip Logic</p>
                  <p className="text-title2 font-semibold">
                    {workflow.stages.filter(s => s.skipLogic).length}
                  </p>
                </div>
                <GitBranch className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-caption text-d365-text-secondary">Notifications</p>
                  <p className="text-title2 font-semibold">
                    {workflow.stages.filter(s => s.notifications).length}
                  </p>
                </div>
                <Bell className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
};