import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { 
  Plus, 
  Edit, 
  X, 
  FileText, 
  AlertCircle,
  Upload,
  Calendar,

} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from './ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,

} from './ui/dialog';
import { Checkbox } from './ui/checkbox';
// import { Textarea } from './ui/textarea';

interface DocumentRule {
  id: string;
  licenseType: string;
  documentName: string;
  required: boolean;
  acceptedFormats: string[];
  maxSize: string;
  expirationRule: string;
  regionExceptions: string[];
}

interface DocumentRequirementsSettingsProps {
  onBack: () => void;
}

export function DocumentRequirementsSettings({ onBack }: DocumentRequirementsSettingsProps) {
  const [documentRules, setDocumentRules] = useState<DocumentRule[]>([
    {
      id: '1',
      licenseType: 'Learner',
      documentName: 'ID Proof',
      required: true,
      acceptedFormats: ['PDF', 'JPG'],
      maxSize: '2MB',
      expirationRule: 'No expiration',
      regionExceptions: []
    },
    {
      id: '2',
      licenseType: 'Commercial',
      documentName: 'Medical Certificate',
      required: true,
      acceptedFormats: ['PDF'],
      maxSize: '5MB',
      expirationRule: '≤ 1 year old',
      regionExceptions: ['District C']
    },
    {
      id: '3',
      licenseType: 'Heavy Vehicle',
      documentName: 'Training Certificate',
      required: true,
      acceptedFormats: ['PDF', 'JPG', 'PNG'],
      maxSize: '3MB',
      expirationRule: '≤ 2 years old',
      regionExceptions: []
    }
  ]);

  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<DocumentRule | null>(null);
  const [formData, setFormData] = useState({
    licenseType: '',
    documentName: '',
    required: true,
    acceptedFormats: [] as string[],
    maxSize: '',
    expirationRule: '',
    regionExceptions: [] as string[]
  });

  const licenseTypes = ['Learner', 'Full', 'Commercial', 'Heavy Vehicle', 'Motorcycle'];
  const fileFormats = ['PDF', 'JPG', 'PNG', 'DOCX'];
  const regions = ['District A', 'District B', 'District C', 'Zone Central', 'Zone North'];
  const expirationRules = [
    'No expiration',
    '≤ 6 months old',
    '≤ 1 year old',
    '≤ 2 years old',
    '≤ 5 years old'
  ];

  const handleAdd = () => {
    setEditingRule(null);
    setFormData({
      licenseType: '',
      documentName: '',
      required: true,
      acceptedFormats: [],
      maxSize: '',
      expirationRule: '',
      regionExceptions: []
    });
    setIsAddEditOpen(true);
  };

  const handleEdit = (rule: DocumentRule) => {
    setEditingRule(rule);
    setFormData({
      licenseType: rule.licenseType,
      documentName: rule.documentName,
      required: rule.required,
      acceptedFormats: rule.acceptedFormats,
      maxSize: rule.maxSize,
      expirationRule: rule.expirationRule,
      regionExceptions: rule.regionExceptions
    });
    setIsAddEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setDocumentRules(prev => prev.filter(rule => rule.id !== id));
  };

  const handleSave = () => {
    if (editingRule) {
      setDocumentRules(prev => prev.map(rule => 
        rule.id === editingRule.id 
          ? { ...rule, ...formData }
          : rule
      ));
    } else {
      const newRule: DocumentRule = {
        id: Date.now().toString(),
        ...formData
      };
      setDocumentRules(prev => [...prev, newRule]);
    }
    setIsAddEditOpen(false);
  };

  const handleFormatChange = (format: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      acceptedFormats: checked 
        ? [...prev.acceptedFormats, format]
        : prev.acceptedFormats.filter(f => f !== format)
    }));
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      regionExceptions: checked 
        ? [...prev.regionExceptions, region]
        : prev.regionExceptions.filter(r => r !== region)
    }));
  };

  return (
    <>
      <AdminPageLayout
        title="Document Requirements Settings"
        onBack={onBack}
        actionButton={{
          label: 'Add Document Rule',
          onClick: handleAdd,
          icon: <Plus className="h-4 w-4" />
        }}
      >
        {/* Rules Table */}
        <div className="d365-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-d365-border">
                  <th className="text-left p-4 font-medium text-d365-text-primary">License Type</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Document</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Required</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Format</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Max Size</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Expiration</th>
                  <th className="text-left p-4 font-medium text-d365-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documentRules.map((rule) => (
                  <tr key={rule.id} className="border-b border-d365-border hover:bg-d365-hover">
                    <td className="p-4">
                      <span className="d365-badge d365-badge-secondary">{rule.licenseType}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-d365-text-secondary" />
                        <span>{rule.documentName}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`d365-badge ${rule.required ? 'd365-badge-error' : 'd365-badge-secondary'}`}>
                        {rule.required ? 'Yes' : 'Optional'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-d365-text-secondary">{rule.acceptedFormats.join(', ')}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-d365-text-secondary">{rule.maxSize}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-d365-text-secondary">{rule.expirationRule}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(rule)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(rule.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">{documentRules.length}</p>
                <p className="text-caption text-d365-text-secondary">Total Rules</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {documentRules.filter(r => r.required).length}
                </p>
                <p className="text-caption text-d365-text-secondary">Mandatory Documents</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {documentRules.filter(r => !r.required).length}
                </p>
                <p className="text-caption text-d365-text-secondary">Optional Documents</p>
              </div>
            </div>
          </div>
          
          <div className="d365-card p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-title3 font-semibold">
                  {documentRules.filter(r => r.expirationRule !== 'No expiration').length}
                </p>
                <p className="text-caption text-d365-text-secondary">With Expiration</p>
              </div>
            </div>
          </div>
        </div>
      </AdminPageLayout>

      {/* Add/Edit Dialog */}
      <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'Edit Document Rule' : 'Add New Document Rule'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">License Type</Label>
                <Select 
                  value={formData.licenseType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, licenseType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    {licenseTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="documentName">Document Name</Label>
                <Input
                  id="documentName"
                  value={formData.documentName}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentName: e.target.value }))}
                  placeholder="e.g., ID Proof, Medical Certificate"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="required"
                checked={formData.required}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, required: checked }))}
              />
              <Label htmlFor="required">Mandatory Document</Label>
            </div>
            
            <div className="space-y-2">
              <Label>Accepted File Formats</Label>
              <div className="grid grid-cols-4 gap-2">
                {fileFormats.map(format => (
                  <div key={format} className="flex items-center space-x-2">
                    <Checkbox
                      id={format}
                      checked={formData.acceptedFormats.includes(format)}
                      onCheckedChange={(checked) => handleFormatChange(format, checked as boolean)}
                    />
                    <Label htmlFor={format} className="text-sm">{format}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxSize">Max Upload Size</Label>
                <Select 
                  value={formData.maxSize} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, maxSize: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select max size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1MB">1MB</SelectItem>
                    <SelectItem value="2MB">2MB</SelectItem>
                    <SelectItem value="5MB">5MB</SelectItem>
                    <SelectItem value="10MB">10MB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expirationRule">Expiration Rule</Label>
                <Select 
                  value={formData.expirationRule} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, expirationRule: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expiration rule" />
                  </SelectTrigger>
                  <SelectContent>
                    {expirationRules.map(rule => (
                      <SelectItem key={rule} value={rule}>{rule}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Region Exceptions</Label>
              <div className="grid grid-cols-2 gap-2">
                {regions.map(region => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox
                      id={region}
                      checked={formData.regionExceptions.includes(region)}
                      onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
                    />
                    <Label htmlFor={region} className="text-sm">{region}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="d365-button-primary">
                {editingRule ? 'Update Rule' : 'Add Rule'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}