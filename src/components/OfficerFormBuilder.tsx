import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Switch } from './ui/switch';
import { 
  Plus,
  Settings,
  ArrowUp,
  ArrowDown,
  Play,
  FileText,
  CheckCircle,

  AlertTriangle,
  Bell,
  Square,
  Save,
  Trash2,
  Copy,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Grid,
  MousePointer,
  Move
} from 'lucide-react';

// Workflow node types
const WORKFLOW_STEPS = [
  { id: 'start', label: 'Start', icon: Play, color: 'bg-green-500', description: 'Workflow starting point' },
  { id: 'submission', label: 'Submission', icon: FileText, color: 'bg-blue-500', description: 'Application submission step' },
  { id: 'review', label: 'Review', icon: CheckCircle, color: 'bg-purple-500', description: 'Document review process' },
  { id: 'approval', label: 'Approval', icon: CheckCircle, color: 'bg-green-600', description: 'Approval decision point' },
  { id: 'clarification', label: 'Clarification', icon: AlertTriangle, color: 'bg-yellow-500', description: 'Request clarification step' },
  { id: 'notification', label: 'Notification', icon: Bell, color: 'bg-orange-500', description: 'Send notification to user' },
  { id: 'end', label: 'End', icon: Square, color: 'bg-red-500', description: 'Workflow completion point' }
];

// Mock form fields
const mockFormFields = [
  { id: 'field-1', name: 'Full Name', type: 'Text Input', required: true, condition: 'Always Visible', order: 1 },
  { id: 'field-2', name: 'Guardian Name', type: 'Text Input', required: false, condition: 'If Minor', order: 2 },
  { id: 'field-3', name: 'Date of Birth', type: 'Date Picker', required: true, condition: 'Always Visible', order: 3 },
  { id: 'field-4', name: 'National ID', type: 'Text Input', required: true, condition: 'Always Visible', order: 4 }
];

// Mock workflow nodes on canvas
interface WorkflowNode {
  id: string;
  type: string;
  label: string;
  x: number;
  y: number;
  config: {
    title: string;
    description: string;
    assignedRole?: string;
    slaHours?: number;
    escalationRule?: string;
    mandatory: boolean;
  };
}

const mockCanvasNodes: WorkflowNode[] = [
  {
    id: 'node-1',
    type: 'start',
    label: 'Start',
    x: 100,
    y: 200,
    config: { title: 'Application Start', description: 'Begin application process', mandatory: true }
  },
  {
    id: 'node-2', 
    type: 'submission',
    label: 'Submission',
    x: 300,
    y: 200,
    config: { title: 'Submit Application', description: 'Citizen submits application', mandatory: true }
  },
  {
    id: 'node-3',
    type: 'review',
    label: 'Review',
    x: 500,
    y: 200,
    config: { title: 'Officer Review', description: 'Review documents and application', assignedRole: 'Officer', slaHours: 24, mandatory: true }
  },
  {
    id: 'node-4',
    type: 'approval',
    label: 'Approval',
    x: 700,
    y: 200, 
    config: { title: 'Final Approval', description: 'Approve or reject application', assignedRole: 'Senior Officer', slaHours: 48, mandatory: true }
  },
  {
    id: 'node-5',
    type: 'end',
    label: 'End',
    x: 900,
    y: 200,
    config: { title: 'Process Complete', description: 'Workflow completed', mandatory: true }
  }
];

export function OfficerFormBuilder() {
  const [selectedTab, setSelectedTab] = useState<'form' | 'workflow'>('workflow');
  const [canvasNodes, setCanvasNodes] = useState<WorkflowNode[]>(mockCanvasNodes);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [draggedStepType, setDraggedStepType] = useState<string | null>(null);
  const [canvasZoom, setCanvasZoom] = useState(100);
  const [canvasMode, setCanvasMode] = useState<'select' | 'move'>('select');

  const handleNodeSelect = (node: WorkflowNode) => {
    setSelectedNode(node);
  };

  const handleNodeDoubleClick = (node: WorkflowNode) => {
    setSelectedNode(node);
    setIsConfigDialogOpen(true);
  };

  const handleDragStart = (stepType: string) => {
    setDraggedStepType(stepType);
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedStepType) return;

    const canvas = e.currentTarget as HTMLElement;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const stepConfig = WORKFLOW_STEPS.find(step => step.id === draggedStepType);
    if (stepConfig) {
      const newNode: WorkflowNode = {
        id: `node-${Date.now()}`,
        type: draggedStepType,
        label: stepConfig.label,
        x: x - 50, // Center the node
        y: y - 25,
        config: {
          title: stepConfig.label,
          description: stepConfig.description,
          mandatory: true
        }
      };

      setCanvasNodes(prev => [...prev, newNode]);
    }
    setDraggedStepType(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const getStepIcon = (stepType: string) => {
    const step = WORKFLOW_STEPS.find(s => s.id === stepType);
    return step ? step.icon : Square;
  };

  const getStepColor = (stepType: string) => {
    const step = WORKFLOW_STEPS.find(s => s.id === stepType);
    return step ? step.color : 'bg-gray-500';
  };

  // Render workflow connections/arrows
  const renderConnections = () => {
    const connections = [];
    for (let i = 0; i < canvasNodes.length - 1; i++) {
      const currentNode = canvasNodes[i];
      const nextNode = canvasNodes[i + 1];
      
      connections.push(
        <svg
          key={`connection-${currentNode.id}-${nextNode.id}`}
          className="absolute pointer-events-none"
          style={{
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        >
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
                fill="#6b7280"
              />
            </marker>
          </defs>
          <line
            x1={currentNode.x + 100}
            y1={currentNode.y + 25}
            x2={nextNode.x}
            y2={nextNode.y + 25}
            stroke="#6b7280"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      );
    }
    return connections;
  };

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto">
      {/* Page Header */}
      <div className="d365-page-header">
        <div>
          <h1 className="d365-page-title">Form Builder & Workflow Editor</h1>
          <p className="d365-page-subtitle">
            Visual drag-and-drop workflow design interface with form configuration
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="d365-button-secondary btn-with-icon">
            <Save className="w-4 h-4" />
            Save Workflow
          </Button>
          <Button className="d365-button-primary btn-with-icon">
            <Plus className="w-4 h-4" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-d365-surface-secondary p-1 rounded-lg w-fit">
        <button
          onClick={() => setSelectedTab('workflow')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedTab === 'workflow'
              ? 'bg-white text-d365-primary shadow-sm'
              : 'text-d365-text-secondary hover:text-d365-text-primary'
          }`}
        >
          Workflow Editor
        </button>
        <button
          onClick={() => setSelectedTab('form')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            selectedTab === 'form'
              ? 'bg-white text-d365-primary shadow-sm'
              : 'text-d365-text-secondary hover:text-d365-text-primary'
          }`}
        >
          Form Builder
        </button>
      </div>

      {selectedTab === 'workflow' && (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
          {/* Left Toolbar - Step Types */}
          <div className="col-span-2">
            <Card className="d365-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-title3">Workflow Steps</CardTitle>
                <CardDescription>Drag steps to the canvas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {WORKFLOW_STEPS.map((step) => {
                  const IconComponent = step.icon;
                  return (
                    <div
                      key={step.id}
                      draggable
                      onDragStart={() => handleDragStart(step.id)}
                      className="flex items-center gap-3 p-3 border border-d365-border rounded-lg cursor-grab hover:bg-d365-surface-secondary transition-colors active:cursor-grabbing"
                    >
                      <div className={`w-8 h-8 rounded-lg ${step.color} flex items-center justify-center text-white`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-d365-text-primary text-caption">{step.label}</div>
                        <div className="text-caption text-d365-text-secondary text-xs">{step.description}</div>
                      </div>
                    </div>
                  );
                })}

                {/* Canvas Controls */}
                <div className="pt-4 border-t border-d365-border mt-4 space-y-2">
                  <h4 className="font-medium text-d365-text-primary text-caption">Canvas Tools</h4>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={canvasMode === 'select' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCanvasMode('select')}
                      className="justify-start btn-with-icon"
                    >
                      <MousePointer className="w-3 h-3" />
                      Select
                    </Button>
                    <Button
                      variant={canvasMode === 'move' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCanvasMode('move')}
                      className="justify-start btn-with-icon"
                    >
                      <Move className="w-3 h-3" />
                      Move
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-1 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCanvasZoom(Math.max(50, canvasZoom - 10))}
                      disabled={canvasZoom <= 50}
                    >
                      <ZoomOut className="w-3 h-3" />
                    </Button>
                    <span className="text-caption text-d365-text-secondary min-w-12 text-center">
                      {canvasZoom}%
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCanvasZoom(Math.min(200, canvasZoom + 10))}
                      disabled={canvasZoom >= 200}
                    >
                      <ZoomIn className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Central Canvas */}
          <div className="col-span-7">
            <Card className="d365-card h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-title3">Workflow Canvas</CardTitle>
                    <CardDescription>Design your workflow by dragging and connecting steps</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="btn-with-icon">
                      <Grid className="w-3 h-3" />
                      Grid
                    </Button>
                    <Button variant="outline" size="sm" className="btn-with-icon">
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <div 
                  className="relative bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden h-full"
                  onDrop={handleCanvasDrop}
                  onDragOver={handleCanvasDragOver}
                  style={{ 
                    backgroundImage: `radial-gradient(circle, #e5e7eb 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    transform: `scale(${canvasZoom / 100})`,
                    transformOrigin: 'top left',
                    minHeight: '500px'
                  }}
                >
                  {/* Render connections first (behind nodes) */}
                  {renderConnections()}

                  {/* Render workflow nodes */}
                  {canvasNodes.map((node) => {
                    const IconComponent = getStepIcon(node.type);
                    const stepColor = getStepColor(node.type);
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <div
                        key={node.id}
                        className={`absolute bg-white rounded-lg border-2 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? 'border-d365-primary ring-2 ring-d365-primary ring-opacity-20' : 'border-gray-300'
                        }`}
                        style={{
                          left: node.x,
                          top: node.y,
                          width: '100px',
                          height: '50px',
                          zIndex: 10
                        }}
                        onClick={() => handleNodeSelect(node)}
                        onDoubleClick={() => handleNodeDoubleClick(node)}
                      >
                        <div className="flex items-center justify-center h-full p-2">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-6 h-6 rounded ${stepColor} flex items-center justify-center text-white`}>
                              <IconComponent className="w-3 h-3" />
                            </div>
                            <span className="text-xs font-medium text-center leading-tight">{node.label}</span>
                          </div>
                        </div>
                        
                        {/* Node controls */}
                        {isSelected && (
                          <div className="absolute -top-8 left-0 flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsConfigDialogOpen(true);
                              }}
                            >
                              <Settings className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 w-6 p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCanvasNodes(prev => prev.filter(n => n.id !== node.id));
                                setSelectedNode(null);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Drop zone hint */}
                  {draggedStepType && (
                    <div className="absolute inset-0 bg-blue-50 bg-opacity-50 flex items-center justify-center pointer-events-none">
                      <div className="text-blue-600 font-medium">Drop here to add workflow step</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Configuration Panel */}
          <div className="col-span-3">
            <Card className="d365-card h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-title3">
                  {selectedNode ? 'Step Configuration' : 'Canvas Properties'}
                </CardTitle>
                <CardDescription>
                  {selectedNode ? 'Configure the selected workflow step' : 'No step selected'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedNode ? (
                  <>
                    <div>
                      <Label htmlFor="step-title">Step Title</Label>
                      <Input 
                        id="step-title" 
                        value={selectedNode.config.title}
                        className="mt-1"
                        onChange={(e) => {
                          const updatedNode = {
                            ...selectedNode,
                            config: { ...selectedNode.config, title: e.target.value }
                          };
                          setSelectedNode(updatedNode);
                          setCanvasNodes(prev => prev.map(n => n.id === selectedNode.id ? updatedNode : n));
                        }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="step-description">Description</Label>
                      <Textarea 
                        id="step-description" 
                        value={selectedNode.config.description}
                        className="mt-1"
                        rows={3}
                        onChange={(e) => {
                          const updatedNode = {
                            ...selectedNode,
                            config: { ...selectedNode.config, description: e.target.value }
                          };
                          setSelectedNode(updatedNode);
                          setCanvasNodes(prev => prev.map(n => n.id === selectedNode.id ? updatedNode : n));
                        }}
                      />
                    </div>

                    {(selectedNode.type === 'review' || selectedNode.type === 'approval') && (
                      <>
                        <div>
                          <Label htmlFor="assigned-role">Assigned Role</Label>
                          <Select value={selectedNode.config.assignedRole || ''}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Officer">Officer</SelectItem>
                              <SelectItem value="Senior Officer">Senior Officer</SelectItem>
                              <SelectItem value="Manager">Manager</SelectItem>
                              <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="sla-hours">SLA (Hours)</Label>
                          <Input 
                            id="sla-hours" 
                            type="number"
                            value={selectedNode.config.slaHours || ''}
                            className="mt-1"
                            placeholder="24"
                          />
                        </div>

                        <div>
                          <Label htmlFor="escalation-rule">Escalation Rule</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select escalation" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="auto-escalate">Auto-escalate to Manager</SelectItem>
                              <SelectItem value="email-notification">Email Notification Only</SelectItem>
                              <SelectItem value="manual-escalation">Manual Escalation Required</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="mandatory-step" 
                        checked={selectedNode.config.mandatory}
                        onCheckedChange={(checked) => {
                          const updatedNode = {
                            ...selectedNode,
                            config: { ...selectedNode.config, mandatory: checked }
                          };
                          setSelectedNode(updatedNode);
                          setCanvasNodes(prev => prev.map(n => n.id === selectedNode.id ? updatedNode : n));
                        }}
                      />
                      <Label htmlFor="mandatory-step">Mandatory Step</Label>
                    </div>

                    <div className="pt-4 border-t border-d365-border">
                      <h4 className="font-medium text-d365-text-primary mb-2">Actions</h4>
                      <div className="flex flex-col gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start btn-with-icon"
                          onClick={() => {
                            // Duplicate node logic
                            const newNode = {
                              ...selectedNode,
                              id: `node-${Date.now()}`,
                              x: selectedNode.x + 120,
                              y: selectedNode.y + 60
                            };
                            setCanvasNodes(prev => [...prev, newNode]);
                          }}
                        >
                          <Copy className="w-3 h-3" />
                          Duplicate Step
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start btn-with-icon text-red-600 hover:text-red-700"
                          onClick={() => {
                            setCanvasNodes(prev => prev.filter(n => n.id !== selectedNode.id));
                            setSelectedNode(null);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete Step
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-d365-surface-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MousePointer className="w-8 h-8 text-d365-text-secondary" />
                    </div>
                    <h3 className="text-title3 font-semibold text-d365-text-primary mb-2">Select a Workflow Step</h3>
                    <p className="text-body text-d365-text-secondary">
                      Click on a workflow step in the canvas to configure its properties and settings.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {selectedTab === 'form' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Builder Section */}
          <Card className="d365-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Form Builder</CardTitle>
                  <CardDescription>Configure form fields and validation rules</CardDescription>
                </div>
                <Button className="d365-button-primary btn-with-icon">
                  <Plus className="w-4 h-4" />
                  Add Field
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-d365-border">
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Field Name</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Type</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Required</th>
                      <th className="text-left py-3 px-4 text-caption font-medium text-d365-text-secondary">Condition</th>
                      <th className="text-center py-3 px-4 text-caption font-medium text-d365-text-secondary">Reorder</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFormFields.map((field) => (
                      <tr key={field.id} className="border-b border-d365-border hover:bg-d365-surface-secondary">
                        <td className="py-4 px-4 font-medium text-d365-text-primary">{field.name}</td>
                        <td className="py-4 px-4">{field.type}</td>
                        <td className="py-4 px-4">{field.required ? 'Yes' : 'No'}</td>
                        <td className="py-4 px-4">{field.condition}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                              <ArrowDown className="w-3 h-3" />
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

          {/* Form Preview */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>Live preview of the configured form</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockFormFields.map((field) => (
                  <div key={field.id}>
                    <Label htmlFor={field.id} className="flex items-center gap-1">
                      {field.name}
                      {field.required && <span className="text-red-500">*</span>}
                    </Label>
                    {field.type === 'Text Input' && (
                      <Input 
                        id={field.id} 
                        placeholder={`Enter ${field.name.toLowerCase()}`}
                        className="mt-1"
                      />
                    )}
                    {field.type === 'Date Picker' && (
                      <Input 
                        id={field.id} 
                        type="date"
                        className="mt-1"
                      />
                    )}
                    {field.condition !== 'Always Visible' && (
                      <p className="text-caption text-d365-text-secondary mt-1">
                        Condition: {field.condition}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Node Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure Workflow Step</DialogTitle>
            <DialogDescription>
              Set up the properties and behavior for this workflow step
            </DialogDescription>
          </DialogHeader>
          
          {selectedNode && (
            <div className="space-y-4">
              <div className="bg-d365-surface-secondary p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${getStepColor(selectedNode.type)} flex items-center justify-center text-white`}>
                    {React.createElement(getStepIcon(selectedNode.type), { className: 'w-5 h-5' })}
                  </div>
                  <div>
                    <h3 className="font-medium text-d365-text-primary">{selectedNode.config.title}</h3>
                    <p className="text-caption text-d365-text-secondary">{selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Step</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dialog-title">Step Title</Label>
                  <Input 
                    id="dialog-title" 
                    value={selectedNode.config.title}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dialog-sla">SLA (Hours)</Label>
                  <Input 
                    id="dialog-sla" 
                    type="number"
                    value={selectedNode.config.slaHours || ''}
                    className="mt-1"
                    placeholder="24"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="dialog-description">Description</Label>
                <Textarea 
                  id="dialog-description" 
                  value={selectedNode.config.description}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="dialog-mandatory" 
                  checked={selectedNode.config.mandatory}
                />
                <Label htmlFor="dialog-mandatory">This step is mandatory</Label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsConfigDialogOpen(false)} className="d365-button-primary">
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}