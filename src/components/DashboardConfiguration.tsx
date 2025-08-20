import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Save, 
  Download,
  Monitor,
  Plus,
  Edit,
  Trash2,
  GripVertical,
  BarChart3,
  Clock,
  Users,
  FileText,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Settings,
  Mail
} from 'lucide-react';

interface DashboardConfigurationProps {
  onBack: () => void;
}

interface Widget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'progress' | 'alert';
  size: 'small' | 'medium' | 'large';
  position: { row: number; col: number };
  color: string;
  data: any;
  userTypes: ('admin' | 'officer' | 'citizen')[];
}

interface DashboardLayout {
  id: string;
  userType: 'admin' | 'officer' | 'citizen';
  widgets: Widget[];
  lastModified: string;
}

export function DashboardConfiguration({ onBack }: DashboardConfigurationProps) {
  const [selectedUserType, setSelectedUserType] = useState<'admin' | 'officer' | 'citizen'>('admin');
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null);
  const [isEditWidgetOpen, setIsEditWidgetOpen] = useState(false);
  const [isScheduleReportOpen, setIsScheduleReportOpen] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);

  // Available widget types
  const availableWidgets = [
    {
      id: 'applications-today',
      title: 'Applications Today',
      type: 'metric' as const,
      icon: FileText,
      description: 'Total applications submitted today',
      defaultData: { value: 147, change: '+12%' }
    },
    {
      id: 'sla-breaches',
      title: 'SLA Breaches',
      type: 'alert' as const,
      icon: AlertTriangle,
      description: 'Applications exceeding SLA timelines',
      defaultData: { value: 8, status: 'warning' }
    },
    {
      id: 'pending-approvals',
      title: 'Pending Approvals',
      type: 'metric' as const,
      icon: Clock,
      description: 'Applications awaiting approval',
      defaultData: { value: 23, change: '-5%' }
    },
    {
      id: 'active-users',
      title: 'Active Users',
      type: 'metric' as const,
      icon: Users,
      description: 'Currently active system users',
      defaultData: { value: 342, change: '+8%' }
    },
    {
      id: 'completion-rate',
      title: 'Completion Rate',
      type: 'progress' as const,
      icon: TrendingUp,
      description: 'Application processing completion rate',
      defaultData: { percentage: 87, target: 95 }
    },
    {
      id: 'monthly-trend',
      title: 'Monthly Trend',
      type: 'chart' as const,
      icon: BarChart3,
      description: 'Application volume over time',
      defaultData: { chartType: 'line' }
    }
  ];

  // Mock dashboard layouts
  const [dashboardLayouts, setDashboardLayouts] = useState<DashboardLayout[]>([
    {
      id: 'admin',
      userType: 'admin',
      lastModified: '2025-01-10 14:30',
      widgets: [
        {
          id: 'w1',
          title: 'Applications Today',
          type: 'metric',
          size: 'small',
          position: { row: 0, col: 0 },
          color: '#003366',
          data: { value: 147, change: '+12%' },
          userTypes: ['admin']
        },
        {
          id: 'w2',
          title: 'SLA Breaches',
          type: 'alert',
          size: 'small',
          position: { row: 0, col: 1 },
          color: '#d13438',
          data: { value: 8, status: 'warning' },
          userTypes: ['admin']
        },
        {
          id: 'w3',
          title: 'Active Users',
          type: 'metric',
          size: 'small',
          position: { row: 0, col: 2 },
          color: '#107c10',
          data: { value: 342, change: '+8%' },
          userTypes: ['admin']
        },
        {
          id: 'w4',
          title: 'Monthly Trend',
          type: 'chart',
          size: 'large',
          position: { row: 1, col: 0 },
          color: '#0078d4',
          data: { chartType: 'line' },
          userTypes: ['admin']
        }
      ]
    },
    {
      id: 'officer',
      userType: 'officer',
      lastModified: '2025-01-09 16:20',
      widgets: [
        {
          id: 'o1',
          title: 'Pending Approvals',
          type: 'metric',
          size: 'medium',
          position: { row: 0, col: 0 },
          color: '#ff8c00',
          data: { value: 23, change: '-5%' },
          userTypes: ['officer']
        },
        {
          id: 'o2',
          title: 'Completion Rate',
          type: 'progress',
          size: 'medium',
          position: { row: 0, col: 1 },
          color: '#107c10',
          data: { percentage: 87, target: 95 },
          userTypes: ['officer']
        }
      ]
    },
    {
      id: 'citizen',
      userType: 'citizen',
      lastModified: '2025-01-08 10:15',
      widgets: [
        {
          id: 'c1',
          title: 'My Applications',
          type: 'table',
          size: 'large',
          position: { row: 0, col: 0 },
          color: '#003366',
          data: { type: 'applications' },
          userTypes: ['citizen']
        }
      ]
    }
  ]);

  const currentLayout = dashboardLayouts.find(layout => layout.userType === selectedUserType);

  const userTypes = [
    { value: 'admin', label: 'Administrator' },
    { value: 'officer', label: 'Officer' },
    { value: 'citizen', label: 'Citizen' }
  ];

  const widgetSizes = [
    { value: 'small', label: 'Small (1x1)' },
    { value: 'medium', label: 'Medium (2x1)' },
    { value: 'large', label: 'Large (3x2)' }
  ];

  const colors = [
    '#003366', '#0078d4', '#107c10', '#ff8c00', '#d13438', 
    '#8764b8', '#00bcf2', '#00a4ef', '#8f6c95', '#e74c3c'
  ];

  const handleAddWidget = (widgetTemplate: typeof availableWidgets[0]) => {
    if (!currentLayout) return;

    const newWidget: Widget = {
      id: `w${Date.now()}`,
      title: widgetTemplate.title,
      type: widgetTemplate.type,
      size: 'small',
      position: { row: Math.floor(currentLayout.widgets.length / 3), col: currentLayout.widgets.length % 3 },
      color: colors[0],
      data: widgetTemplate.defaultData,
      userTypes: [selectedUserType]
    };

    const updatedLayouts = dashboardLayouts.map(layout => 
      layout.userType === selectedUserType 
        ? { ...layout, widgets: [...layout.widgets, newWidget], lastModified: new Date().toISOString() }
        : layout
    );

    setDashboardLayouts(updatedLayouts);
  };

  const handleRemoveWidget = (widgetId: string) => {
    const updatedLayouts = dashboardLayouts.map(layout => 
      layout.userType === selectedUserType 
        ? { 
            ...layout, 
            widgets: layout.widgets.filter(w => w.id !== widgetId),
            lastModified: new Date().toISOString()
          }
        : layout
    );

    setDashboardLayouts(updatedLayouts);
  };

  const handleEditWidget = (widget: Widget) => {
    setSelectedWidget(widget);
    setIsEditWidgetOpen(true);
  };

  const handleDragStart = (widget: Widget) => {
    setDraggedWidget(widget);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetPosition: { row: number; col: number }) => {
    e.preventDefault();
    if (!draggedWidget || !currentLayout) return;

    const updatedLayouts = dashboardLayouts.map(layout => 
      layout.userType === selectedUserType 
        ? { 
            ...layout, 
            widgets: layout.widgets.map(w => 
              w.id === draggedWidget.id 
                ? { ...w, position: targetPosition }
                : w
            ),
            lastModified: new Date().toISOString()
          }
        : layout
    );

    setDashboardLayouts(updatedLayouts);
    setDraggedWidget(null);
  };

  const renderWidget = (widget: Widget) => {
    const sizeClasses = {
      small: 'h-32',
      medium: 'h-32 col-span-2',
      large: 'h-64 col-span-3'
    };

    return (
      <div
        key={widget.id}
        className={`${sizeClasses[widget.size]} border-2 border-dashed border-d365 rounded-lg p-4 relative group cursor-move`}
        draggable
        onDragStart={() => handleDragStart(widget)}
        style={{ borderColor: widget.color }}
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-body truncate" style={{ color: widget.color }}>
            {widget.title}
          </h4>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleEditWidget(widget)}
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleRemoveWidget(widget.id)}
              className="text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          {widget.type === 'metric' && (
            <div>
              <p className="text-title1 font-semibold" style={{ color: widget.color }}>
                {widget.data.value}
              </p>
              <p className="text-caption text-d365-secondary">{widget.data.change}</p>
            </div>
          )}
          {widget.type === 'alert' && (
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="h-8 w-8" style={{ color: widget.color }} />
              <span className="text-title2 font-semibold">{widget.data.value}</span>
            </div>
          )}
          {widget.type === 'progress' && (
            <div>
              <div className="w-full bg-d365-surface-secondary rounded-full h-2 mb-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${widget.data.percentage}%`,
                    backgroundColor: widget.color 
                  }}
                />
              </div>
              <p className="text-caption">{widget.data.percentage}% of {widget.data.target}%</p>
            </div>
          )}
          {widget.type === 'chart' && (
            <div className="flex items-center justify-center h-full">
              <BarChart3 className="h-12 w-12" style={{ color: widget.color }} />
            </div>
          )}
        </div>
        
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-d365-secondary" />
        </div>
      </div>
    );
  };

  return (
    <AdminPageLayout
      title="Dashboard Configuration"
      onBack={onBack}
      actionButton={{
        label: 'Save Layout',
        onClick: () => alert('Dashboard layout saved!'),
        icon: <Save className="h-4 w-4" />
      }}
    >
      <div className="space-y-6">
        {/* User Type Selection */}
        <Card className="d365-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5" />
              <span>Dashboard Layout Builder</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Label htmlFor="userType">Configure Dashboard For</Label>
                <Select value={selectedUserType} onValueChange={(value: any) => setSelectedUserType(value)}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => alert('PDF export would be generated here')}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsScheduleReportOpen(true)}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Available Widgets */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Available Widgets</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {availableWidgets.map((widget) => {
                const WidgetIcon = widget.icon;
                return (
                  <div
                    key={widget.id}
                    className="p-3 border border-d365 rounded-lg cursor-pointer hover:bg-d365-hover transition-colors"
                    onClick={() => handleAddWidget(widget)}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <WidgetIcon className="h-4 w-4 text-d365-primary" />
                      <span className="font-medium text-body">{widget.title}</span>
                    </div>
                    <p className="text-caption text-d365-secondary">{widget.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Widget Layout Grid */}
          <div className="lg:col-span-3">
            <Card className="d365-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>{userTypes.find(t => t.value === selectedUserType)?.label} Dashboard</span>
                  </CardTitle>
                  {currentLayout && (
                    <Badge className="d365-badge-secondary">
                      Last modified: {currentLayout.lastModified}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div 
                  className="grid grid-cols-3 gap-4 min-h-96"
                  onDragOver={handleDragOver}
                >
                  {currentLayout?.widgets.map((widget) => renderWidget(widget))}
                  
                  {/* Empty drop zones */}
                  {Array.from({ length: Math.max(6 - (currentLayout?.widgets.length || 0), 0) }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="h-32 border-2 border-dashed border-d365-border rounded-lg flex items-center justify-center text-d365-secondary opacity-50"
                      onDrop={(e) => handleDrop(e, { 
                        row: Math.floor((currentLayout?.widgets.length || 0) + index / 3), 
                        col: (currentLayout?.widgets.length || 0) + index % 3 
                      })}
                      onDragOver={handleDragOver}
                    >
                      <div className="text-center">
                        <Plus className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-caption">Drop widget here</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {(!currentLayout?.widgets || currentLayout.widgets.length === 0) && (
                  <div className="text-center py-12">
                    <Monitor className="h-16 w-16 mx-auto mb-4 text-d365-secondary opacity-50" />
                    <p className="text-d365-secondary">No widgets configured for this user type</p>
                    <p className="text-caption text-d365-secondary mt-1">
                      Select widgets from the left panel to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Widget Dialog */}
      <Dialog open={isEditWidgetOpen} onOpenChange={setIsEditWidgetOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Widget</DialogTitle>
            <DialogDescription>
              Customize widget appearance and settings.
            </DialogDescription>
          </DialogHeader>
          {selectedWidget && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="widgetTitle">Widget Title</Label>
                <Input 
                  id="widgetTitle" 
                  defaultValue={selectedWidget.title}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="widgetSize">Size</Label>
                <Select defaultValue={selectedWidget.size}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {widgetSizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-d365"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        if (selectedWidget) {
                          setSelectedWidget({ ...selectedWidget, color });
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditWidgetOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditWidgetOpen(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Report Dialog */}
      <Dialog open={isScheduleReportOpen} onOpenChange={setIsScheduleReportOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule Report</DialogTitle>
            <DialogDescription>
              Set up automated dashboard reports via email.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="html">HTML Email</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="recipients">Email Recipients</Label>
              <Input 
                id="recipients" 
                placeholder="admin@gov.utopia, manager@gov.utopia"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleReportOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsScheduleReportOpen(false)}>
              <Mail className="h-4 w-4 mr-1" />
              Schedule Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}