import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import {  Upload,  Image as ImageIcon, Type, QrCode, Printer } from 'lucide-react';

interface TemplateField {
  id: string;
  name: string;
  type: 'text' | 'image' | 'qr' | 'barcode';
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: string;
  required: boolean;
}

interface LicenseTemplate {
  id: string;
  name: string;
  licenseType: string;
  frontFields: TemplateField[];
  backFields: TemplateField[];
  watermark?: string;
  logo?: string;
  outputFormat: 'pdf' | 'card';
  languages: string[];
  status: 'active' | 'draft';
  lastModified: string;
}

const mockTemplates: LicenseTemplate[] = [
  {
    id: '1',
    name: 'Standard Driver License',
    licenseType: 'Private License',
    frontFields: [
      { id: 'f1', name: 'Full Name', type: 'text', x: 20, y: 50, width: 200, height: 30, fontSize: 16, fontWeight: 'bold', required: true },
      { id: 'f2', name: 'License Number', type: 'text', x: 20, y: 90, width: 150, height: 25, fontSize: 14, required: true },
      { id: 'f3', name: 'Date of Birth', type: 'text', x: 20, y: 120, width: 120, height: 20, fontSize: 12, required: true },
      { id: 'f4', name: 'Photo', type: 'image', x: 250, y: 20, width: 80, height: 100, required: true },
      { id: 'f5', name: 'QR Code', type: 'qr', x: 250, y: 130, width: 60, height: 60, required: true }
    ],
    backFields: [
      { id: 'b1', name: 'Address', type: 'text', x: 20, y: 30, width: 250, height: 60, fontSize: 12, required: true },
      { id: 'b2', name: 'Issue Date', type: 'text', x: 20, y: 100, width: 100, height: 20, fontSize: 10, required: true },
      { id: 'b3', name: 'Expiry Date', type: 'text', x: 140, y: 100, width: 100, height: 20, fontSize: 10, required: true }
    ],
    outputFormat: 'card',
    languages: ['en', 'sw'],
    status: 'active',
    lastModified: '2024-01-20'
  }
];

const defaultFields: TemplateField[] = [
  { id: 'name', name: 'Full Name', type: 'text', x: 0, y: 0, width: 200, height: 30, fontSize: 16, fontWeight: 'bold', required: true },
  { id: 'license_no', name: 'License Number', type: 'text', x: 0, y: 0, width: 150, height: 25, fontSize: 14, required: true },
  { id: 'dob', name: 'Date of Birth', type: 'text', x: 0, y: 0, width: 120, height: 20, fontSize: 12, required: true },
  { id: 'photo', name: 'Photo', type: 'image', x: 0, y: 0, width: 80, height: 100, required: true },
  { id: 'qr', name: 'QR Code', type: 'qr', x: 0, y: 0, width: 60, height: 60, required: true },
  { id: 'address', name: 'Address', type: 'text', x: 0, y: 0, width: 250, height: 60, fontSize: 12, required: true }
];

interface LicenseTemplateConfigurationProps {
  onBack: () => void;
}

export const LicenseTemplateConfiguration: React.FC<LicenseTemplateConfigurationProps> = ({ onBack }) => {
  const [templates, setTemplates] = useState<LicenseTemplate[]>(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<LicenseTemplate | null>(templates[0]);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [currentSide, _setCurrentSide] = useState<'front' | 'back'>('front');
  const [_draggedField, setDraggedField] = useState<TemplateField | null>(null);
  const [selectedField, setSelectedField] = useState<TemplateField | null>(null);
  const [isFieldEditorOpen, setIsFieldEditorOpen] = useState(false);
  const [isPrintTestOpen, setIsPrintTestOpen] = useState(false);
  const [printTestResult, setPrintTestResult] = useState<'pending' | 'success' | 'error' | null>(null);

  // const handleConfigureTemplate = () => {
  //   setIsConfiguring(true);
  // };

  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      setTemplates(templates.map(t => 
        t.id === selectedTemplate.id 
          ? { ...selectedTemplate, lastModified: new Date().toISOString().split('T')[0] }
          : t
      ));
    }
    setIsConfiguring(false);
  };

  const handleFieldMove = (fieldId: string, x: number, y: number) => {
    if (!selectedTemplate) return;

    const updatedTemplate = { ...selectedTemplate };
    const fields = currentSide === 'front' ? updatedTemplate.frontFields : updatedTemplate.backFields;
    const fieldIndex = fields.findIndex(f => f.id === fieldId);
    
    if (fieldIndex !== -1) {
      fields[fieldIndex] = { ...fields[fieldIndex], x, y };
      setSelectedTemplate(updatedTemplate);
    }
  };

  const handleAddField = (field: TemplateField) => {
    if (!selectedTemplate) return;

    const newField = { ...field, id: `${field.type}_${Date.now()}`, x: 50, y: 50 };
    const updatedTemplate = { ...selectedTemplate };
    
    if (currentSide === 'front') {
      updatedTemplate.frontFields.push(newField);
    } else {
      updatedTemplate.backFields.push(newField);
    }
    
    setSelectedTemplate(updatedTemplate);
  };

  const handleFieldClick = (field: TemplateField) => {
    if (isConfiguring) {
      setSelectedField(field);
      setIsFieldEditorOpen(true);
    }
  };

  const handleFieldUpdate = (updatedField: TemplateField) => {
    if (!selectedTemplate) return;

    const updatedTemplate = { ...selectedTemplate };
    const fields = currentSide === 'front' ? updatedTemplate.frontFields : updatedTemplate.backFields;
    const fieldIndex = fields.findIndex(f => f.id === updatedField.id);
    
    if (fieldIndex !== -1) {
      fields[fieldIndex] = updatedField;
      setSelectedTemplate(updatedTemplate);
      setSelectedField(updatedField);
    }
  };

  const handleDeleteField = (fieldId: string) => {
    if (!selectedTemplate) return;

    const updatedTemplate = { ...selectedTemplate };
    
    if (currentSide === 'front') {
      updatedTemplate.frontFields = updatedTemplate.frontFields.filter(f => f.id !== fieldId);
    } else {
      updatedTemplate.backFields = updatedTemplate.backFields.filter(f => f.id !== fieldId);
    }
    
    setSelectedTemplate(updatedTemplate);
    setIsFieldEditorOpen(false);
    setSelectedField(null);
  };

  const handlePrintTest = async () => {
    setIsPrintTestOpen(true);
    setPrintTestResult('pending');
    
    // Simulate print test process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate some print validation checks
      const hasRequiredFields = selectedTemplate?.frontFields.some(f => f.required) || 
                               selectedTemplate?.backFields.some(f => f.required);
      
      if (hasRequiredFields && Math.random() > 0.2) {
        setPrintTestResult('success');
      } else {
        setPrintTestResult('error');
      }
    } catch (error) {
      setPrintTestResult('error');
    }
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'image': return <ImageIcon className="w-4 h-4" />;
      case 'qr': return <QrCode className="w-4 h-4" />;
      default: return <Type className="w-4 h-4" />;
    }
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;

    const fields = currentSide === 'front' ? selectedTemplate.frontFields : selectedTemplate.backFields;

    return (
      <div className="relative bg-white border-2 border-d365-border rounded-lg shadow-lg overflow-hidden" style={{ width: '350px', height: '220px' }}>
        {/* Template Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
        
        {/* Watermark */}
        {selectedTemplate.watermark && (
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-6xl font-bold text-gray-400 rotate-45">CIVILITY</span>
          </div>
        )}

        {/* Fields */}
        {fields.map((field) => (
          <div
            key={field.id}
            className={`absolute border-2 cursor-move transition-all ${
              isConfiguring 
                ? 'border-dashed border-blue-400 bg-blue-50 bg-opacity-50 hover:bg-blue-100 hover:border-blue-500' 
                : 'border-transparent'
            } ${selectedField?.id === field.id ? 'border-solid border-blue-600 bg-blue-100' : ''}`}
            style={{
              left: field.x,
              top: field.y,
              width: field.width,
              height: field.height
            }}
            draggable={isConfiguring}
            onClick={() => handleFieldClick(field)}
            onDragStart={(e) => {
              setDraggedField(field);
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragEnd={(e) => {
              const rect = e.currentTarget.parentElement?.getBoundingClientRect();
              if (rect) {
                const x = Math.max(0, Math.min(e.clientX - rect.left - 25, 300));
                const y = Math.max(0, Math.min(e.clientY - rect.top - 15, 180));
                handleFieldMove(field.id, x, y);
              }
              setDraggedField(null);
            }}
          >
            <div className="p-1 text-xs text-blue-700 font-medium flex items-center gap-1">
              {getFieldIcon(field.type)}
              <span className="truncate">{field.name}</span>
            </div>
            
            {/* Sample content */}
            {field.type === 'text' && (
              <div className="p-1 text-xs text-gray-600">
                {field.name === 'Full Name' && 'John Doe Smith'}
                {field.name === 'License Number' && 'DL-2024-001234'}
                {field.name === 'Date of Birth' && '1990-01-15'}
                {field.name === 'Address' && '123 Main Street, City, State'}
                {field.name === 'Issue Date' && '2024-01-01'}
                {field.name === 'Expiry Date' && '2029-01-01'}
              </div>
            )}
            
            {field.type === 'image' && (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-gray-400" />
              </div>
            )}
            
            {field.type === 'qr' && (
              <div className="w-full h-full bg-black flex items-center justify-center">
                <QrCode className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
        ))}

        {/* Header */}
        <div className="absolute top-2 left-2 right-2">
          <div className="text-xs font-bold text-blue-900">REPUBLIC OF AFRICA</div>
          <div className="text-xs text-blue-800">TRANSPORT DEPARTMENT</div>
        </div>
      </div>
    );
  };

  return (
    <AdminPageLayout 
      title="License Template Configuration" 
      onBack={onBack}
      // action={
      //   <Button onClick={handleConfigureTemplate} className="d365-button-primary btn-with-icon">
      //     <Plus className="w-4 h-4" />
      //     Configure Template
      //   </Button>
      // }
    >
      <div className="space-y-6">
        {/* Template Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-title3 font-medium">Available Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id 
                      ? 'border-d365-primary bg-d365-hover' 
                      : 'border-d365-border hover:border-d365-primary'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-body font-medium">{template.name}</h3>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                  </div>
                  <p className="text-caption text-d365-text-secondary mb-2">{template.licenseType}</p>
                  <div className="flex items-center gap-2 text-caption text-d365-text-secondary">
                    <span>Languages: {template.languages.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {selectedTemplate && (
          <>
            {/* Configuration Panel */}
            {isConfiguring && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-title3 font-medium">Configuration Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Field Library */}
                    <div>
                      <h4 className="text-body font-medium mb-3">Field Library</h4>
                      <div className="space-y-2">
                        {defaultFields.map((field) => (
                          <Button
                            key={field.id}
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddField(field)}
                            className="w-full justify-start btn-with-icon"
                          >
                            {getFieldIcon(field.type)}
                            {field.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Template Settings */}
                    <div className="lg:col-span-3">
                      <h4 className="text-body font-medium mb-3">Template Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Template Name</Label>
                          <Input 
                            value={selectedTemplate.name}
                            onChange={(e) => setSelectedTemplate({...selectedTemplate, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label>Output Format</Label>
                          <Select 
                            value={selectedTemplate.outputFormat}
                            onValueChange={(value: 'pdf' | 'card') => setSelectedTemplate({...selectedTemplate, outputFormat: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pdf">PDF Document</SelectItem>
                              <SelectItem value="card">Physical Card</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>License Type</Label>
                          <Select 
                            value={selectedTemplate.licenseType}
                            onValueChange={(value) => setSelectedTemplate({...selectedTemplate, licenseType: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Private License">Private License</SelectItem>
                              <SelectItem value="Commercial License">Commercial License</SelectItem>
                              <SelectItem value="Motorcycle License">Motorcycle License</SelectItem>
                              <SelectItem value="Learner Permit">Learner Permit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="btn-with-icon">
                            <Upload className="w-4 h-4" />
                            Upload Logo
                          </Button>
                          <Button variant="outline" className="btn-with-icon">
                            <Upload className="w-4 h-4" />
                            Watermark
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preview Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-title3 font-medium">Template Preview</CardTitle>
                  <div className="flex items-center gap-3">
                    {isConfiguring && (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveTemplate} className="d365-button-primary">
                          Save Template
                        </Button>
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={handlePrintTest}
                      className="btn-with-icon"
                    >
                      <Printer className="w-4 h-4" />
                      Print Test
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={currentSide} 
                // onValueChange={(value: 'front' | 'back') => setCurrentSide(value)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="front">Front</TabsTrigger>
                      <TabsTrigger value="back">Back</TabsTrigger>
                    </TabsList>
                    
                    {/* Language Tabs */}
                    <div className="flex gap-2">
                      {selectedTemplate.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang.toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <TabsContent value="front" className="flex justify-center">
                    {renderPreview()}
                  </TabsContent>
                  
                  <TabsContent value="back" className="flex justify-center">
                    {renderPreview()}
                  </TabsContent>
                </Tabs>

                {isConfiguring && (
                  <div className="mt-4 space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-caption text-blue-700">
                        <strong>Tip:</strong> Drag fields to reposition them. Click on a field to edit its properties. Use the Field Library to add new elements.
                      </p>
                    </div>
                    
                    {selectedField && (
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-caption text-green-700">
                          <strong>Selected:</strong> {selectedField.name} - Click to open field editor
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Field Editor Dialog */}
            <Dialog open={isFieldEditorOpen} onOpenChange={setIsFieldEditorOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Field: {selectedField?.name}</DialogTitle>
                  <DialogDescription>
                    Configure the properties and appearance of this template field.
                  </DialogDescription>
                </DialogHeader>
                
                {selectedField && (
                  <div className="space-y-4">
                    <div>
                      <Label>Field Name</Label>
                      <Input
                        value={selectedField.name}
                        onChange={(e) => handleFieldUpdate({...selectedField, name: e.target.value})}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Width (px)</Label>
                        <Input
                          type="number"
                          value={selectedField.width}
                          onChange={(e) => handleFieldUpdate({...selectedField, width: parseInt(e.target.value) || 100})}
                          min="20"
                          max="300"
                        />
                      </div>
                      <div>
                        <Label>Height (px)</Label>
                        <Input
                          type="number"
                          value={selectedField.height}
                          onChange={(e) => handleFieldUpdate({...selectedField, height: parseInt(e.target.value) || 20})}
                          min="15"
                          max="200"
                        />
                      </div>
                    </div>

                    {selectedField.type === 'text' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Font Size</Label>
                          <Input
                            type="number"
                            value={selectedField.fontSize || 12}
                            onChange={(e) => handleFieldUpdate({...selectedField, fontSize: parseInt(e.target.value) || 12})}
                            min="8"
                            max="24"
                          />
                        </div>
                        <div>
                          <Label>Font Weight</Label>
                          <Select 
                            value={selectedField.fontWeight || 'normal'} 
                            onValueChange={(value) => handleFieldUpdate({...selectedField, fontWeight: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="bold">Bold</SelectItem>
                              <SelectItem value="600">Semi-bold</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>X Position</Label>
                        <Input
                          type="number"
                          value={selectedField.x}
                          onChange={(e) => handleFieldUpdate({...selectedField, x: parseInt(e.target.value) || 0})}
                          min="0"
                          max="300"
                        />
                      </div>
                      <div>
                        <Label>Y Position</Label>
                        <Input
                          type="number"
                          value={selectedField.y}
                          onChange={(e) => handleFieldUpdate({...selectedField, y: parseInt(e.target.value) || 0})}
                          min="0"
                          max="180"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Required Field</Label>
                      <Switch
                        checked={selectedField.required}
                        onCheckedChange={(checked) => handleFieldUpdate({...selectedField, required: checked})}
                      />
                    </div>

                    <div className="flex justify-between gap-3 pt-4">
                      <Button 
                        variant="destructive" 
                        onClick={() => handleDeleteField(selectedField.id)}
                      >
                        Delete Field
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsFieldEditorOpen(false)}>
                          Close
                        </Button>
                        <Button onClick={() => setIsFieldEditorOpen(false)} className="d365-button-primary">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Print Test Dialog */}
            <Dialog open={isPrintTestOpen} onOpenChange={setIsPrintTestOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Print Test Results</DialogTitle>
                  <DialogDescription>
                    Testing the template printing process and validating field arrangements.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  {printTestResult === 'pending' && (
                    <div className="flex items-center justify-center py-8">
                      <div className="text-center">
                        <div className="loading-spinner mx-auto mb-4"></div>
                        <p className="text-body text-d365-text-secondary">Running print test...</p>
                        <p className="text-caption text-d365-text-secondary mt-2">
                          Validating template layout and field positions
                        </p>
                      </div>
                    </div>
                  )}

                  {printTestResult === 'success' && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-body font-medium text-green-800 mb-2">Print Test Successful!</h3>
                      <p className="text-caption text-green-600 mb-4">
                        Template printed successfully with all fields properly positioned.
                      </p>
                      
                      <div className="bg-green-50 rounded-lg p-4 space-y-2 text-left">
                        <h4 className="text-caption font-medium text-green-800">Test Results:</h4>
                        <ul className="text-caption text-green-700 space-y-1">
                          <li>✓ All required fields present</li>
                          <li>✓ Field positioning accurate</li>
                          <li>✓ QR code generation successful</li>
                          <li>✓ Text formatting correct</li>
                          <li>✓ Output format: {selectedTemplate?.outputFormat?.toUpperCase()}</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {printTestResult === 'error' && (
                    <div className="text-center py-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <h3 className="text-body font-medium text-red-800 mb-2">Print Test Failed</h3>
                      <p className="text-caption text-red-600 mb-4">
                        Issues found during template printing process.
                      </p>
                      
                      <div className="bg-red-50 rounded-lg p-4 space-y-2 text-left">
                        <h4 className="text-caption font-medium text-red-800">Issues Detected:</h4>
                        <ul className="text-caption text-red-700 space-y-1">
                          <li>⚠ Field overlap detected</li>
                          <li>⚠ QR code positioning issue</li>
                          <li>⚠ Text size too small for card format</li>
                        </ul>
                        <p className="text-caption text-red-600 mt-3">
                          Please adjust field positions and try again.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsPrintTestOpen(false)}>
                      Close
                    </Button>
                    {printTestResult !== 'pending' && (
                      <Button 
                        onClick={handlePrintTest} 
                        className="d365-button-primary btn-with-icon"
                      >
                        <Printer className="w-4 h-4" />
                        Test Again
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </AdminPageLayout>
  );
};