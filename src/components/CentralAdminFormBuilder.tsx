import  { useState } from 'react';
import { 
  FormInput, 
  Plus, 
  Trash2, 
  Settings, 
  Move,
  Type,
  Hash,
  Mail,
  Phone,
  Calendar,
  FileText,
  Upload,
  ChevronDown,
  CheckSquare,
  ToggleLeft,
  Eye,
  Play,
  Check,
  Clock,
  UserCheck,
  Save,
  Download,
  Copy,
  Edit
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'date' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    customMessage?: string;
  };
  options?: string[];
  conditionalLogic?: {
    showWhen?: {
      fieldId: string;
      operator: 'equals' | 'not_equals' | 'contains';
      value: string;
    }[];
  };
}

interface WorkflowStep {
  id: string;
  name: string;
  type: 'submit' | 'review' | 'approve' | 'reject' | 'complete';
  assignedRole?: string;
  slaHours?: number;
  automate?: boolean;
}

interface Form {
  id: string;
  name: string;
  description: string;
  category: string;
  fields: FormField[];
  workflow: WorkflowStep[];
  status: 'draft' | 'published' | 'archived';
  createdDate: string;
  lastModified: string;
}

const fieldTypes = [
  { type: 'text', icon: Type, label: 'Text Input', description: 'Single line text field' },
  { type: 'number', icon: Hash, label: 'Number', description: 'Numeric input field' },
  { type: 'email', icon: Mail, label: 'Email', description: 'Email address field' },
  { type: 'phone', icon: Phone, label: 'Phone', description: 'Phone number field' },
  { type: 'date', icon: Calendar, label: 'Date', description: 'Date picker field' },
  { type: 'textarea', icon: FileText, label: 'Text Area', description: 'Multi-line text field' },
  { type: 'select', icon: ChevronDown, label: 'Dropdown', description: 'Select from options' },
  { type: 'checkbox', icon: CheckSquare, label: 'Checkbox', description: 'Multiple choice options' },
  { type: 'radio', icon: ToggleLeft, label: 'Radio Button', description: 'Single choice options' },
  { type: 'file', icon: Upload, label: 'File Upload', description: 'Document upload field' }
];

const workflowStepTypes = [
  { type: 'submit', label: 'Submit', color: 'bg-blue-100 text-blue-700', icon: Play },
  { type: 'review', label: 'Review', color: 'bg-yellow-100 text-yellow-700', icon: Eye },
  { type: 'approve', label: 'Approve', color: 'bg-green-100 text-green-700', icon: Check },
  { type: 'reject', label: 'Reject', color: 'bg-red-100 text-red-700', icon: Clock },
  { type: 'complete', label: 'Complete', color: 'bg-purple-100 text-purple-700', icon: UserCheck }
];

export const CentralAdminFormBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'forms' | 'create' | 'workflow'>('forms');
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: '1', name: 'Submit Application', type: 'submit', slaHours: 0 },
    { id: '2', name: 'Review Documents', type: 'review', assignedRole: 'Officer', slaHours: 24 },
    { id: '3', name: 'Final Approval', type: 'approve', assignedRole: 'Supervisor', slaHours: 48 }
  ]);
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const [showFieldSettings, setShowFieldSettings] = useState<string | null>(null);

  // Sample existing forms
  const [existingForms] = useState<Form[]>([
    {
      id: '1',
      name: 'Driver\'s License Application',
      description: 'Standard application form for driver\'s license issuance',
      category: 'Transport',
      fields: [],
      workflow: [],
      status: 'published',
      createdDate: '2024-01-15',
      lastModified: '2024-02-10'
    },
    {
      id: '2',
      name: 'Birth Certificate Request',
      description: 'Form for requesting birth certificate copies',
      category: 'Civil Registration',
      fields: [],
      workflow: [],
      status: 'published',
      createdDate: '2024-01-20',
      lastModified: '2024-02-05'
    },
    {
      id: '3',
      name: 'Business License Application',
      description: 'Application form for new business license',
      category: 'Commerce',
      fields: [],
      workflow: [],
      status: 'draft',
      createdDate: '2024-02-01',
      lastModified: '2024-02-12'
    }
  ]);

  const handleDragStart = (e: React.DragEvent, fieldType: string) => {
    setDraggedField(fieldType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedField) {
      const newField: FormField = {
        id: `field_${Date.now()}`,
        type: draggedField as FormField['type'],
        label: `${fieldTypes.find(f => f.type === draggedField)?.label} Field`,
        required: false
      };
      setFormFields([...formFields, newField]);
      setDraggedField(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeField = (fieldId: string) => {
    setFormFields(formFields.filter(field => field.id !== fieldId));
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const addWorkflowStep = () => {
    const newStep: WorkflowStep = {
      id: `step_${Date.now()}`,
      name: 'New Step',
      type: 'review',
      assignedRole: 'Officer',
      slaHours: 24
    };
    setWorkflowSteps([...workflowSteps, newStep]);
  };

  const removeWorkflowStep = (stepId: string) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId));
  };

  const updateWorkflowStep = (stepId: string, updates: Partial<WorkflowStep>) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ));
  };

  const renderFieldSettings = (field: FormField) => {
    return (
      <div className="d365-card p-4 mt-4 border-l-4 border-l-indigo-500">
        <h4 className="text-subtitle font-semibold mb-3">Field Settings</h4>
        
        {/* Basic Settings */}
        <div className="space-y-4">
          <div>
            <label className="block text-caption font-medium mb-1">Label</label>
            <input
              type="text"
              value={field.label}
              onChange={(e) => updateField(field.id, { label: e.target.value })}
              className="d365-input"
              placeholder="Enter field label"
            />
          </div>
          
          <div>
            <label className="block text-caption font-medium mb-1">Placeholder</label>
            <input
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
              className="d365-input"
              placeholder="Enter placeholder text"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(field.id, { required: e.target.checked })}
              className="rounded border-d365-border"
            />
            <label className="text-caption">Required field</label>
          </div>
        </div>

        {/* Options for select/radio/checkbox */}
        {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
          <div className="mt-4">
            <label className="block text-caption font-medium mb-2">Options</label>
            <div className="space-y-2">
              {(field.options || []).map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(field.options || [])];
                      newOptions[index] = e.target.value;
                      updateField(field.id, { options: newOptions });
                    }}
                    className="d365-input flex-1"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newOptions = field.options?.filter((_, i) => i !== index);
                      updateField(field.id, { options: newOptions });
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newOptions = [...(field.options || []), ''];
                  updateField(field.id, { options: newOptions });
                }}
                className="d365-button-secondary btn-with-icon text-caption"
              >
                <Plus className="h-4 w-4" />
                Add Option
              </button>
            </div>
          </div>
        )}

        {/* Validation Settings */}
        <div className="mt-4">
          <h5 className="text-caption font-semibold mb-2">Validation Rules</h5>
          <div className="space-y-3">
            {(field.type === 'text' || field.type === 'textarea') && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-caption text-d365-secondary mb-1">Min Length</label>
                    <input
                      type="number"
                      value={field.validation?.minLength || ''}
                      onChange={(e) => updateField(field.id, {
                        validation: { ...field.validation, minLength: parseInt(e.target.value) || undefined }
                      })}
                      className="d365-input"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-caption text-d365-secondary mb-1">Max Length</label>
                    <input
                      type="number"
                      value={field.validation?.maxLength || ''}
                      onChange={(e) => updateField(field.id, {
                        validation: { ...field.validation, maxLength: parseInt(e.target.value) || undefined }
                      })}
                      className="d365-input"
                      placeholder="255"
                    />
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-caption text-d365-secondary mb-1">Custom Validation Message</label>
              <input
                type="text"
                value={field.validation?.customMessage || ''}
                onChange={(e) => updateField(field.id, {
                  validation: { ...field.validation, customMessage: e.target.value }
                })}
                className="d365-input"
                placeholder="Enter custom error message"
              />
            </div>
          </div>
        </div>

        {/* Conditional Logic */}
        <div className="mt-4">
          <h5 className="text-caption font-semibold mb-2">Conditional Logic</h5>
          <p className="text-caption text-d365-secondary mb-3">Show this field only when certain conditions are met</p>
          
          <div className="space-y-2">
            <select className="d365-input">
              <option value="">Select a field to depend on...</option>
              {formFields.filter(f => f.id !== field.id).map(f => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderFormsList = () => (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-title2 font-semibold">Existing Forms</h3>
          <p className="text-body text-d365-secondary mt-1">Manage and configure dynamic forms</p>
        </div>
        <button
          onClick={() => {
            setIsCreating(true);
            setActiveTab('create');
            setFormFields([]);
          }}
          className="d365-button-primary btn-with-icon"
        >
          <Plus className="h-4 w-4" />
          Create New Form
        </button>
      </div>

      {/* Forms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {existingForms.map((form) => (
          <div key={form.id} className="d365-card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="text-subtitle font-semibold">{form.name}</h4>
                <p className="text-caption text-d365-secondary mt-1 line-clamp-2">{form.description}</p>
              </div>
              <div className={`d365-badge ${
                form.status === 'published' ? 'd365-badge-success' : 
                form.status === 'draft' ? 'd365-badge-warning' : 'd365-badge-secondary'
              }`}>
                {form.status}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-caption text-d365-secondary">
                <span>Category:</span>
                <span className="font-medium">{form.category}</span>
              </div>
              <div className="flex items-center justify-between text-caption text-d365-secondary">
                <span>Last Modified:</span>
                <span>{form.lastModified}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setSelectedForm(form);
                  setActiveTab('create');
                }}
                className="d365-button-secondary btn-with-icon flex-1 text-caption"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>
              <button className="d365-button-secondary p-2">
                <Copy className="h-4 w-4" />
              </button>
              <button className="d365-button-secondary p-2">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFormCreator = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Field Palette */}
      <div className="lg:col-span-1">
        <div className="d365-card p-4 sticky top-4">
          <h4 className="text-subtitle font-semibold mb-4">Field Library</h4>
          <div className="space-y-2">
            {fieldTypes.map((fieldType) => {
              const IconComponent = fieldType.icon;
              return (
                <div
                  key={fieldType.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, fieldType.type)}
                  className="p-3 border border-d365-border rounded-lg cursor-move hover:bg-d365-surface-secondary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 rounded">
                      <IconComponent className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-body font-medium">{fieldType.label}</p>
                      <p className="text-caption text-d365-secondary">{fieldType.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Builder */}
      <div className="lg:col-span-2">
        <div className="d365-card p-6">
          {/* Form Header */}
          <div className="mb-6 pb-4 border-b border-d365-border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-subtitle font-semibold">
                {isCreating ? 'Create New Form' : `Edit: ${selectedForm?.name}`}
              </h4>
              <div className="flex items-center space-x-2">
                <button className="d365-button-secondary btn-with-icon">
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button className="d365-button-primary btn-with-icon">
                  <Save className="h-4 w-4" />
                  Save Form
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-caption font-medium mb-1">Form Name</label>
                <input
                  type="text"
                  className="d365-input"
                  placeholder="Enter form name"
                  defaultValue={selectedForm?.name || ''}
                />
              </div>
              <div>
                <label className="block text-caption font-medium mb-1">Category</label>
                <select className="d365-input">
                  <option value="">Select category</option>
                  <option value="transport">Transport</option>
                  <option value="civil-registration">Civil Registration</option>
                  <option value="commerce">Commerce</option>
                  <option value="health">Health</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-caption font-medium mb-1">Description</label>
              <textarea
                className="d365-input"
                rows={3}
                placeholder="Describe the purpose of this form"
                defaultValue={selectedForm?.description || ''}
              />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            className="min-h-64 border-2 border-dashed border-d365-border rounded-lg p-6"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {formFields.length === 0 ? (
              <div className="text-center py-12">
                <FormInput className="h-12 w-12 text-d365-secondary mx-auto mb-4" />
                <h5 className="text-subtitle font-medium text-d365-secondary mb-2">No fields added yet</h5>
                <p className="text-caption text-d365-secondary">
                  Drag fields from the library to build your form
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {formFields.map((field) => {
                  const fieldTypeConfig = fieldTypes.find(ft => ft.type === field.type);
                  const IconComponent = fieldTypeConfig?.icon || FormInput;
                  
                  return (
                    <div key={field.id} className="border border-d365-border rounded-lg p-4 bg-d365-surface">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-indigo-50 rounded">
                            <IconComponent className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-body font-medium">{field.label}</p>
                            <p className="text-caption text-d365-secondary">
                              {fieldTypeConfig?.label} {field.required && '(Required)'}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowFieldSettings(
                              showFieldSettings === field.id ? null : field.id
                            )}
                            className={`p-2 rounded transition-colors ${
                              showFieldSettings === field.id 
                                ? 'bg-indigo-100 text-indigo-600' 
                                : 'hover:bg-d365-surface-secondary'
                            }`}
                          >
                            <Settings className="h-4 w-4" />
                          </button>
                          <button className="p-2 hover:bg-d365-surface-secondary rounded transition-colors">
                            <Move className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeField(field.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Field Preview */}
                      <div className="ml-11">
                        {field.type === 'textarea' ? (
                          <textarea
                            className="d365-input"
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                            disabled
                            rows={3}
                          />
                        ) : field.type === 'select' ? (
                          <select className="d365-input" disabled>
                            <option>{field.placeholder || `Select ${field.label.toLowerCase()}`}</option>
                            {field.options?.map((option, idx) => (
                              <option key={idx}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'checkbox' || field.type === 'radio' ? (
                          <div className="space-y-2">
                            {field.options?.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <input
                                  type={field.type}
                                  disabled
                                  className="rounded border-d365-border"
                                />
                                <span className="text-body">{option}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <input
                            type={field.type === 'file' ? 'file' : field.type}
                            className="d365-input"
                            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                            disabled
                          />
                        )}
                      </div>
                      
                      {/* Field Settings Panel */}
                      {showFieldSettings === field.id && renderFieldSettings(field)}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflowConfiguration = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-title2 font-semibold">Workflow Configuration</h3>
          <p className="text-body text-d365-secondary mt-1">Define the approval process for form submissions</p>
        </div>
        <button
          onClick={addWorkflowStep}
          className="d365-button-primary btn-with-icon"
        >
          <Plus className="h-4 w-4" />
          Add Step
        </button>
      </div>

      {/* Workflow Visual Editor */}
      <div className="d365-card p-6">
        <h4 className="text-subtitle font-semibold mb-6">Workflow Path</h4>
        
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {workflowSteps.map((step, index) => {
            const stepConfig = workflowStepTypes.find(st => st.type === step.type);
            const IconComponent = stepConfig?.icon || Play;
            
            return (
              <div key={step.id} className="flex items-center space-x-4 flex-shrink-0">
                {/* Step Card */}
                <div className="relative">
                  <div className="d365-card p-4 min-w-48 border-2 border-transparent hover:border-indigo-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-2 py-1 rounded-full text-caption font-medium ${stepConfig?.color}`}>
                        <div className="flex items-center space-x-1">
                          <IconComponent className="h-3 w-3" />
                          <span>{stepConfig?.label}</span>
                        </div>
                      </div>
                      
                      {index > 0 && (
                        <button
                          onClick={() => removeWorkflowStep(step.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={step.name}
                        onChange={(e) => updateWorkflowStep(step.id, { name: e.target.value })}
                        className="d365-input text-caption"
                        placeholder="Step name"
                      />
                      
                      {step.type !== 'submit' && (
                        <>
                          <select
                            value={step.assignedRole || ''}
                            onChange={(e) => updateWorkflowStep(step.id, { assignedRole: e.target.value })}
                            className="d365-input text-caption"
                          >
                            <option value="">Assign to role</option>
                            <option value="Officer">Officer</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                          </select>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={step.slaHours || ''}
                              onChange={(e) => updateWorkflowStep(step.id, { slaHours: parseInt(e.target.value) || undefined })}
                              className="d365-input text-caption flex-1"
                              placeholder="SLA hours"
                            />
                            <span className="text-caption text-d365-secondary">hrs</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-caption font-medium">
                    {index + 1}
                  </div>
                </div>
                
                {/* Arrow Connector */}
                {index < workflowSteps.length - 1 && (
                  <div className="flex items-center">
                    <div className="w-8 h-0.5 bg-d365-border"></div>
                    <div className="w-0 h-0 border-l-4 border-l-d365-border border-y-2 border-y-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Advanced Workflow Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="d365-card p-6">
          <h4 className="text-subtitle font-semibold mb-4">Automation Rules</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-d365-surface-secondary rounded-lg">
              <div>
                <p className="text-body font-medium">Auto-approve simple applications</p>
                <p className="text-caption text-d365-secondary">Skip manual review for complete applications</p>
              </div>
              <input type="checkbox" className="rounded border-d365-border" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-d365-surface-secondary rounded-lg">
              <div>
                <p className="text-body font-medium">Send reminder notifications</p>
                <p className="text-caption text-d365-secondary">Remind officers about pending applications</p>
              </div>
              <input type="checkbox" className="rounded border-d365-border" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-d365-surface-secondary rounded-lg">
              <div>
                <p className="text-body font-medium">Escalate overdue applications</p>
                <p className="text-caption text-d365-secondary">Auto-escalate when SLA is breached</p>
              </div>
              <input type="checkbox" className="rounded border-d365-border" defaultChecked />
            </div>
          </div>
        </div>
        
        <div className="d365-card p-6">
          <h4 className="text-subtitle font-semibold mb-4">Notification Settings</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-caption font-medium mb-2">Email Template</label>
              <select className="d365-input">
                <option>Standard Application Update</option>
                <option>Urgent Review Required</option>
                <option>Application Approved</option>
                <option>Application Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-caption font-medium mb-2">SMS Notifications</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-d365-border" defaultChecked />
                  <span className="text-caption">Application received</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-d365-border" defaultChecked />
                  <span className="text-caption">Status updates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-d365-border" />
                  <span className="text-caption">Final decision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-d365-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('forms')}
            className={`py-4 px-1 border-b-2 font-medium text-body transition-colors ${
              activeTab === 'forms'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-d365-secondary hover:text-d365-text-primary'
            }`}
          >
            Existing Forms
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`py-4 px-1 border-b-2 font-medium text-body transition-colors ${
              activeTab === 'create'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-d365-secondary hover:text-d365-text-primary'
            }`}
          >
            Form Builder
          </button>
          <button
            onClick={() => setActiveTab('workflow')}
            className={`py-4 px-1 border-b-2 font-medium text-body transition-colors ${
              activeTab === 'workflow'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-d365-secondary hover:text-d365-text-primary'
            }`}
          >
            Workflow Configuration
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'forms' && renderFormsList()}
        {activeTab === 'create' && renderFormCreator()}
        {activeTab === 'workflow' && renderWorkflowConfiguration()}
      </div>
    </div>
  );
};