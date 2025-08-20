import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Save, 
  Upload,
  Palette,
  Globe,
  Plus,
  Edit,
  Trash2,
  Image,
  FileImage,
  Monitor,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';

interface ThemeLanguageSettingsProps {
  onBack: () => void;
}

interface LanguageKey {
  id: string;
  key: string;
  english: string;
  swahili: string;
  arabic: string;
  french?: string;
  portuguese?: string;
}

interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  sidebarTheme: 'light' | 'dark' | 'auto';
  governmentLogo: string | null;
  favicon: string | null;
  loginBanner: string | null;
}

export function ThemeLanguageSettings({ onBack }: ThemeLanguageSettingsProps) {
  const [activeTab, setActiveTab] = useState('theme');
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    primaryColor: '#003366',
    accentColor: '#ffcb47',
    sidebarTheme: 'light',
    governmentLogo: null,
    favicon: null,
    loginBanner: null
  });
  const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [isEditKeyOpen, setIsEditKeyOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<LanguageKey | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock language keys data
  const [languageKeys, _setLanguageKeys] = useState<LanguageKey[]>([
    {
      id: '1',
      key: 'Login_Title',
      english: 'Welcome',
      swahili: 'Karibu',
      arabic: 'أهلا بك'
    },
    {
      id: '2',
      key: 'Submit_Button',
      english: 'Submit',
      swahili: 'Tuma',
      arabic: 'إرسال'
    },
    {
      id: '3',
      key: 'Cancel_Button',
      english: 'Cancel',
      swahili: 'Ghairi',
      arabic: 'إلغاء'
    },
    {
      id: '4',
      key: 'Dashboard_Title',
      english: 'Dashboard',
      swahili: 'Dashibodi',
      arabic: 'لوحة التحكم'
    },
    {
      id: '5',
      key: 'Applications_Title',
      english: 'Applications',
      swahili: 'Maombi',
      arabic: 'الطلبات'
    },
    {
      id: '6',
      key: 'Status_Pending',
      english: 'Pending',
      swahili: 'Inasubiri',
      arabic: 'قيد الانتظار'
    },
    {
      id: '7',
      key: 'Status_Approved',
      english: 'Approved',
      swahili: 'Imeidhinishwa',
      arabic: 'موافق عليه'
    },
    {
      id: '8',
      key: 'Status_Rejected',
      english: 'Rejected',
      swahili: 'Imekataliwa',
      arabic: 'مرفوض'
    }
  ]);

  const availableLanguages = [
    { code: 'en', name: 'English', key: 'english' },
    { code: 'sw', name: 'Swahili', key: 'swahili' },
    { code: 'ar', name: 'Arabic', key: 'arabic' },
    { code: 'fr', name: 'French', key: 'french' },
    { code: 'pt', name: 'Portuguese', key: 'portuguese' }
  ];

  const [activeLanguages, setActiveLanguages] = useState(['english', 'swahili', 'arabic']);

  const handleFileUpload = (field: keyof Pick<ThemeConfig, 'governmentLogo' | 'favicon' | 'loginBanner'>, file: File) => {
    // In a real implementation, this would upload to storage and return URL
    const fakeUrl = URL.createObjectURL(file);
    setThemeConfig(prev => ({ ...prev, [field]: fakeUrl }));
    setHasUnsavedChanges(true);
  };

  const handleColorChange = (field: 'primaryColor' | 'accentColor', color: string) => {
    setThemeConfig(prev => ({ ...prev, [field]: color }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    console.log('Saving theme and language settings:', { themeConfig, languageKeys });
    setHasUnsavedChanges(false);
    alert('Settings saved successfully!');
  };

  const addNewLanguage = (languageKey: string) => {
    if (!activeLanguages.includes(languageKey)) {
      setActiveLanguages([...activeLanguages, languageKey]);
      setHasUnsavedChanges(true);
    }
  };

  const removeLanguage = (languageKey: string) => {
    if (languageKey !== 'english') { // Prevent removing English as it's required
      setActiveLanguages(activeLanguages.filter(lang => lang !== languageKey));
      setHasUnsavedChanges(true);
    }
  };

  const filteredKeys = languageKeys.filter(key =>
    key.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    key.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportLanguageKeys = () => {
    const data = languageKeys.map(key => {
      const row: any = { key: key.key };
      activeLanguages.forEach(lang => {
        row[lang] = key[lang as keyof LanguageKey] || '';
      });
      return row;
    });
    
    const csv = [
      ['Key', ...activeLanguages.map(lang => 
        availableLanguages.find(l => l.key === lang)?.name || lang
      )],
      ...data.map(row => [row.key, ...activeLanguages.map(lang => row[lang])])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'language-keys.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderFileUpload = (
    title: string,
    field: keyof Pick<ThemeConfig, 'governmentLogo' | 'favicon' | 'loginBanner'>,
    description: string,
    icon: React.ComponentType<{ className?: string }>,
    acceptedFormats: string
  ) => {
    const IconComponent = icon;
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <IconComponent className="h-5 w-5 text-d365-primary" />
          <Label className="text-body font-medium">{title}</Label>
        </div>
        <div className="border-2 border-dashed border-d365 rounded-lg p-6 text-center">
          {themeConfig[field] ? (
            <div className="space-y-3">
              <div className="mx-auto w-20 h-20 bg-d365-surface-secondary rounded-lg flex items-center justify-center overflow-hidden">
                <img 
                  src={themeConfig[field]!} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setThemeConfig(prev => ({ ...prev, [field]: null }))}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <IconComponent className="h-12 w-12 mx-auto text-d365-secondary opacity-50" />
              <div>
                <p className="font-medium">{description}</p>
                <p className="text-caption text-d365-secondary mt-1">
                  Accepted formats: {acceptedFormats}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = acceptedFormats;
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleFileUpload(field, file);
                  };
                  input.click();
                }}
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload {title}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <AdminPageLayout
      title="Theme & Language Settings"
      onBack={onBack}
      actionButton={{
        label: 'Save Settings',
        onClick: handleSaveSettings,
        icon: <Save className="h-4 w-4" />,
        // disabled: !hasUnsavedChanges
      }}
      searchPlaceholder={activeTab === 'language' ? "Search language keys..." : undefined}
      onSearch={activeTab === 'language' ? setSearchQuery : undefined}
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-d365-surface-secondary p-1 rounded-lg w-fit">
          <button
            className={`px-4 py-2 rounded-md text-body font-medium transition-all ${
              activeTab === 'theme' 
                ? 'bg-d365-surface text-d365-primary shadow-sm' 
                : 'text-d365-secondary hover:text-d365-primary'
            }`}
            onClick={() => setActiveTab('theme')}
          >
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Theme & Branding</span>
            </div>
          </button>
          <button
            className={`px-4 py-2 rounded-md text-body font-medium transition-all ${
              activeTab === 'language' 
                ? 'bg-d365-surface text-d365-primary shadow-sm' 
                : 'text-d365-secondary hover:text-d365-primary'
            }`}
            onClick={() => setActiveTab('language')}
          >
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Language Editor</span>
            </div>
          </button>
        </div>

        {activeTab === 'theme' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Uploads */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5" />
                  <span>Brand Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderFileUpload(
                  'Government Logo',
                  'governmentLogo',
                  'Upload your government logo for headers and navigation',
                  Image,
                  '.png,.jpg,.jpeg,.svg'
                )}
                
                {renderFileUpload(
                  'Favicon',
                  'favicon',
                  'Small icon displayed in browser tabs',
                  FileImage,
                  '.ico,.png'
                )}
                
                {renderFileUpload(
                  'Login Page Banner',
                  'loginBanner',
                  'Background image for the login page',
                  Monitor,
                  '.png,.jpg,.jpeg'
                )}
              </CardContent>
            </Card>

            {/* Color Configuration */}
            <Card className="d365-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Color Scheme</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="primaryColor"
                      value={themeConfig.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="w-12 h-12 rounded border border-d365 cursor-pointer"
                    />
                    <Input
                      value={themeConfig.primaryColor}
                      onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                      className="flex-1"
                      placeholder="#003366"
                    />
                  </div>
                  <p className="text-caption text-d365-secondary">
                    Used for buttons, links, and primary interface elements
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      id="accentColor"
                      value={themeConfig.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="w-12 h-12 rounded border border-d365 cursor-pointer"
                    />
                    <Input
                      value={themeConfig.accentColor}
                      onChange={(e) => handleColorChange('accentColor', e.target.value)}
                      className="flex-1"
                      placeholder="#ffcb47"
                    />
                  </div>
                  <p className="text-caption text-d365-secondary">
                    Used for highlights, notifications, and secondary elements
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="sidebarTheme">Sidebar Theme</Label>
                  <Select 
                    value={themeConfig.sidebarTheme} 
                    onValueChange={(value: 'light' | 'dark' | 'auto') => {
                      setThemeConfig(prev => ({ ...prev, sidebarTheme: value }));
                      setHasUnsavedChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Theme</SelectItem>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="auto">Auto (System)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-caption text-d365-secondary">
                    Controls the appearance of the navigation sidebar
                  </p>
                </div>

                {/* Color Preview */}
                <div className="p-4 bg-d365-surface-secondary rounded-lg">
                  <h4 className="font-medium mb-3">Preview</h4>
                  <div className="space-y-2">
                    <div 
                      className="h-8 rounded text-white flex items-center justify-center text-caption font-medium"
                      style={{ backgroundColor: themeConfig.primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div 
                      className="h-8 rounded text-white flex items-center justify-center text-caption font-medium"
                      style={{ backgroundColor: themeConfig.accentColor }}
                    >
                      Accent Element
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="space-y-6">
            {/* Language Management */}
            <Card className="d365-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Language Keys ({filteredKeys.length})</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={exportLanguageKeys}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddLanguageOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Language
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setIsEditKeyOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Key
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Active Languages */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-body font-medium">Active Languages:</Label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLanguages.map(langKey => {
                      const lang = availableLanguages.find(l => l.key === langKey);
                      return (
                        <Badge 
                          key={langKey} 
                          className="d365-badge-secondary flex items-center space-x-1"
                        >
                          <span>{lang?.name || langKey}</span>
                          {langKey !== 'english' && (
                            <button
                              onClick={() => removeLanguage(langKey)}
                              className="ml-1 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* Language Keys Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Label Key</TableHead>
                      {activeLanguages.map(langKey => {
                        const lang = availableLanguages.find(l => l.key === langKey);
                        return (
                          <TableHead key={langKey}>{lang?.name || langKey}</TableHead>
                        );
                      })}
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeys.map((key) => (
                      <TableRow key={key.id}>
                        <TableCell>
                          <code className="bg-d365-surface-secondary px-2 py-1 rounded text-caption">
                            {key.key}
                          </code>
                        </TableCell>
                        {activeLanguages.map(langKey => (
                          <TableCell key={langKey}>
                            <span className="text-body">
                              {key[langKey as keyof LanguageKey] || '-'}
                            </span>
                          </TableCell>
                        ))}
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedKey(key);
                                setIsEditKeyOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Add Language Dialog */}
      <Dialog open={isAddLanguageOpen} onOpenChange={setIsAddLanguageOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Language</DialogTitle>
            <DialogDescription>
              Add a new language to the translation system.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Available Languages</Label>
              <div className="space-y-2">
                {availableLanguages
                  .filter(lang => !activeLanguages.includes(lang.key))
                  .map(lang => (
                    <Button
                      key={lang.key}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => {
                        addNewLanguage(lang.key);
                        setIsAddLanguageOpen(false);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {lang.name}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddLanguageOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Language Key Dialog */}
      <Dialog open={isEditKeyOpen} onOpenChange={setIsEditKeyOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedKey ? 'Edit' : 'Add'} Language Key</DialogTitle>
            <DialogDescription>
              {selectedKey ? 'Update' : 'Create'} translations for this interface element.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyName">Key Name</Label>
              <Input 
                id="keyName" 
                placeholder="e.g., Login_Title"
                defaultValue={selectedKey?.key}
              />
            </div>
            
            {activeLanguages.map(langKey => {
              const lang = availableLanguages.find(l => l.key === langKey);
              return (
                <div key={langKey} className="space-y-2">
                  <Label htmlFor={langKey}>{lang?.name || langKey}</Label>
                  <Input 
                    id={langKey}
                    placeholder={`Enter ${lang?.name || langKey} translation`}
                    defaultValue={selectedKey?.[langKey as keyof LanguageKey] || ''}
                  />
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditKeyOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsEditKeyOpen(false)}>
              {selectedKey ? 'Save Changes' : 'Add Key'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsaved Changes Indicator */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-3">
            <RefreshCw className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-900">Unsaved Changes</p>
              <p className="text-caption text-yellow-700">
                Your theme and language changes haven't been saved
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={handleSaveSettings}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Save Now
            </Button>
          </div>
        </div>
      )}
    </AdminPageLayout>
  );
}