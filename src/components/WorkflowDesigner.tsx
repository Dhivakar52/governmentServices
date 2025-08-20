import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
// import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  Save, 
  Play,
  Plus,
  Settings,
  Clock,
  Users,
  GitBranch,
  FileText,
  CreditCard,
  CheckCircle,

  Timer,
  UserCheck,

} from 'lucide-react';

interface WorkflowDesignerProps {
  onBack: () => void;
}

interface WorkflowStage {
  id: string;
  name: string;
  type: 'submission' | 'verification' | 'payment' | 'approval' | 'conditional' | 'timer';
  position: { x: number; y: number };
  slaHours?: number;
  assignedRoles?: string[];
  conditions?: string[];
  status: 'draft' | 'active' | 'inactive';
}

interface ToolboxItem {
  id: string;
  name: string;
  type: WorkflowStage['type'];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

export function WorkflowDesigner({ onBack }: WorkflowDesignerProps) {
  const [selectedStage, setSelectedStage] = useState<WorkflowStage | null>(null);
  const [workflowStages, setWorkflowStages] = useState<WorkflowStage[]>([
    {
      id: '1',
      name: 'Application Submission',
      type: 'submission',
      position: { x: 100, y: 100 },
      slaHours: 24,
      assignedRoles: ['citizen'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Document Verification',
      type: 'verification',
      position: { x: 300, y: 100 },
      slaHours: 48,
      assignedRoles: ['officer'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Payment Processing',
      type: 'payment',
      position: { x: 500, y: 100 },
      slaHours: 2,
      assignedRoles: ['system'],
      status: 'active'
    }
  ]);

  const toolboxItems: ToolboxItem[] = [
    {
      id: 'submission',
      name: 'Submission',
      type: 'submission',
      icon: FileText,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      description: 'Application submission stage'
    },
    {
      id: 'verification',
      name: 'Verification',
      type: 'verification',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      description: 'Document verification stage'
    },
    {
      id: 'payment',
      name: 'Payment',
      type: 'payment',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      description: 'Payment processing stage'
    },
    {
      id: 'approval',
      name: 'Approval',
      type: 'approval',
      icon: UserCheck,
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      description: 'Manual approval stage'
    },
    {
      id: 'conditional',
      name: 'Conditional Logic',
      type: 'conditional',
      icon: GitBranch,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      description: 'Conditional routing logic'
    },
    {
      id: 'timer',
      name: 'SLA Timer',
      type: 'timer',
      icon: Timer,
      color: 'bg-red-100 text-red-800 border-red-200',
      description: 'Time-based triggers'
    }
  ];

  const availableRoles = [
    { value: 'citizen', label: 'Citizen' },
    { value: 'officer', label: 'Officer' },
    { value: 'admin', label: 'Administrator' },
    { value: 'transport-officer', label: 'Transport Officer' },
    { value: 'birth-registrar', label: 'Birth Registrar' },
    { value: 'system', label: 'System (Automated)' }
  ];

  const getStageIcon = (type: string) => {
    const item = toolboxItems.find(t => t.type === type);
    if (!item) return FileText;
    return item.icon;
  };

  const getStageColor = (type: string) => {
    const item = toolboxItems.find(t => t.type === type);
    return item?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleStageClick = (stage: WorkflowStage) => {
    setSelectedStage(stage);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedStage(null);
    }
  };

  const renderWorkflowStage = (stage: WorkflowStage) => {
    const StageIcon = getStageIcon(stage.type);
    const isSelected = selectedStage?.id === stage.id;

    return (
      <div
        key={stage.id}
        className={`absolute p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
          getStageColor(stage.type)
        } ${isSelected ? 'ring-2 ring-d365-primary' : ''}`}
        style={{
          left: stage.position.x,
          top: stage.position.y,
          width: '180px'
        }}
        onClick={() => handleStageClick(stage)}
      >
        <div className="flex items-center space-x-2 mb-2">
          <StageIcon className="h-4 w-4" />
          <span className="font-medium text-body truncate">{stage.name}</span>
        </div>
        <div className="space-y-1">
          {stage.slaHours && (
            <div className="flex items-center space-x-1 text-caption">
              <Clock className="h-3 w-3" />
              <span>{stage.slaHours}h SLA</span>
            </div>
          )}
          {stage.assignedRoles && stage.assignedRoles.length > 0 && (
            <div className="flex items-center space-x-1 text-caption">
              <Users className="h-3 w-3" />
              <span>{stage.assignedRoles.join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminPageLayout
      title="Workflow Designer"
      onBack={onBack}
      actionButton={{
        label: 'Save & Deploy',
        onClick: () => {},
        icon: <Play className="h-4 w-4" />
      }}
    >
      <div className="grid grid-cols-12 gap-4 h-[700px]">
        {/* Left Panel - Toolbox */}
        <div className="col-span-3">
          <Card className="d365-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Toolbox</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {toolboxItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border-2 border-dashed cursor-move transition-all hover:shadow-sm ${item.color}`}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/json', JSON.stringify(item));
                    }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <ItemIcon className="h-4 w-4" />
                      <span className="font-medium text-body">{item.name}</span>
                    </div>
                    <p className="text-caption opacity-80">{item.description}</p>
                  </div>
                );
              })}
              
              <div className="pt-4 border-t border-d365">
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-1" />
                    New Workflow
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Save className="h-4 w-4 mr-1" />
                    Save Draft
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Panel - Canvas */}
        <div className="col-span-6">
          <Card className="d365-card h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>Workflow Canvas</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm">
                  <Play className="h-4 w-4 mr-1" />
                  Deploy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 relative h-full">
              <div
                className="w-full h-full bg-gray-50 relative overflow-auto"
                onClick={handleCanvasClick}
                onDrop={(e) => {
                  e.preventDefault();
                  const data = JSON.parse(e.dataTransfer.getData('application/json'));
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  
                  const newStage: WorkflowStage = {
                    id: Date.now().toString(),
                    name: `New ${data.name}`,
                    type: data.type,
                    position: { x: x - 90, y: y - 30 },
                    slaHours: 24,
                    assignedRoles: ['officer'],
                    status: 'draft'
                  };
                  
                  setWorkflowStages([...workflowStages, newStage]);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                {/* Grid background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Workflow stages */}
                {workflowStages.map(renderWorkflowStage)}
                
                {/* Connectors (simplified) */}
                <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                  {workflowStages.slice(0, -1).map((stage, index) => {
                    const nextStage = workflowStages[index + 1];
                    if (!nextStage) return null;
                    
                    return (
                      <line
                        key={`connector-${stage.id}`}
                        x1={stage.position.x + 180}
                        y1={stage.position.y + 30}
                        x2={nextStage.position.x}
                        y2={nextStage.position.y + 30}
                        stroke="#6b7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    );
                  })}
                  
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="10"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#6b7280"
                      />
                    </marker>
                  </defs>
                </svg>
                
                {workflowStages.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-d365-secondary">
                    <div className="text-center">
                      <GitBranch className="h-16 w-16 mx-auto mb-4 opacity-30" />
                      <p>Drag stages from the toolbox to start building your workflow</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Properties */}
        <div className="col-span-3">
          <Card className="d365-card h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Properties</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto">
              {selectedStage ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="stageName">Stage Name</Label>
                    <Input 
                      id="stageName" 
                      value={selectedStage.name}
                      onChange={(e) => {
                        const updated = { ...selectedStage, name: e.target.value };
                        setSelectedStage(updated);
                        setWorkflowStages(stages => 
                          stages.map(s => s.id === updated.id ? updated : s)
                        );
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stageType">Stage Type</Label>
                    <Select value={selectedStage.type} disabled>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {toolboxItems.map((item) => (
                          <SelectItem key={item.type} value={item.type}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slaHours">SLA (Hours)</Label>
                    <Input 
                      id="slaHours" 
                      type="number"
                      value={selectedStage.slaHours || ''}
                      onChange={(e) => {
                        const updated = { ...selectedStage, slaHours: parseInt(e.target.value) || 0 };
                        setSelectedStage(updated);
                        setWorkflowStages(stages => 
                          stages.map(s => s.id === updated.id ? updated : s)
                        );
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Assigned Roles</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {availableRoles.map((role) => (
                        <div key={role.value} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={role.value}
                            checked={selectedStage.assignedRoles?.includes(role.value) || false}
                            onChange={(e) => {
                              const currentRoles = selectedStage.assignedRoles || [];
                              const newRoles = e.target.checked
                                ? [...currentRoles, role.value]
                                : currentRoles.filter(r => r !== role.value);
                              
                              const updated = { ...selectedStage, assignedRoles: newRoles };
                              setSelectedStage(updated);
                              setWorkflowStages(stages => 
                                stages.map(s => s.id === updated.id ? updated : s)
                              );
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={role.value} className="text-caption">
                            {role.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {selectedStage.type === 'conditional' && (
                    <div className="space-y-2">
                      <Label htmlFor="conditions">Routing Conditions</Label>
                      <Textarea 
                        id="conditions" 
                        placeholder="Enter routing conditions..."
                        className="min-h-[80px]"
                      />
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-d365">
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setWorkflowStages(stages => 
                            stages.filter(s => s.id !== selectedStage.id)
                          );
                          setSelectedStage(null);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-d365-secondary py-8">
                  <Settings className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a stage to view properties</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
}