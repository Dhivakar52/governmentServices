import  { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2,  
  Shield, 
  Users, 
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Key,
  Eye,
  Building2,
  Settings2,
} from 'lucide-react';

interface UserRoleManagementProps {
  onBack: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  region: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  mfaEnabled: boolean;
  avatar?: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  color: string;
  status: 'active' | 'inactive';
  createdDate: string;
  lastModified: string;
}

export function UserRoleManagement({ onBack }: UserRoleManagementProps) {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  // Mock data for organization structure
  const orgStructure = [
    {
      name: 'Transport Department',
      head: 'Dr. David Miller',
      users: 45,
      subdepartments: [
        { name: 'Driver Licensing Unit', users: 18 },
        { name: 'Vehicle Registration Unit', users: 15 },
        { name: 'Traffic Management Unit', users: 12 }
      ]
    },
    {
      name: 'Civil Registry Department',
      head: 'Dr. Emily Carter',
      users: 32,
      subdepartments: [
        { name: 'Birth Registration Unit', users: 15 },
        { name: 'Death Registration Unit', users: 10 },
        { name: 'Marriage Registration Unit', users: 7 }
      ]
    },
    {
      name: 'Health Department',
      head: 'Dr. Michael Brown',
      users: 28,
      subdepartments: [
        { name: 'Medical Licensing Unit', users: 12 },
        { name: 'Health Records Unit', users: 16 }
      ]
    }
  ];

  // Mock data
  const users: User[] = [
    {
      id: '1',
      name: 'Jane Doe',
      email: 'jane.doe@gov.utopia',
      role: 'System Admin',
      department: 'IT Services',
      region: 'National HQ',
      status: 'active',
      lastLogin: '2025-01-10',
      mfaEnabled: true,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b156c4d1?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'John Smith',
      email: 'john.smith@gov.utopia',
      role: 'Transport Officer',
      department: 'Transport',
      region: 'District A',
      status: 'active',
      lastLogin: '2025-01-09',
      mfaEnabled: false
    },
    {
      id: '3',
      name: 'Amina Bello',
      email: 'amina.bello@gov.utopia',
      role: 'Birth Registrar',
      department: 'Civil Registry',
      region: 'State - West Zone',
      status: 'pending',
      lastLogin: 'Never',
      mfaEnabled: false
    },
    {
      id: '4',
      name: 'David Wilson',
      email: 'david.wilson@gov.utopia',
      role: 'Regional Admin',
      department: 'Administration',
      region: 'State - North Zone',
      status: 'inactive',
      lastLogin: '2024-12-15',
      mfaEnabled: true
    }
  ];

  const roles: Role[] = [
    {
      id: '1',
      name: 'System Admin',
      description: 'Full system access and configuration privileges',
      userCount: 3,
      permissions: ['users.manage', 'system.configure', 'audit.view', 'reports.all', 'roles.manage', 'security.manage'],
      color: 'bg-red-100 text-red-800',
      status: 'active',
      createdDate: '2024-01-15',
      lastModified: '2024-12-10'
    },
    {
      id: '2',
      name: 'Regional Admin',
      description: 'Administrative access within assigned regions',
      userCount: 8,
      permissions: ['users.view', 'applications.manage', 'reports.regional', 'documents.approve'],
      color: 'bg-blue-100 text-blue-800',
      status: 'active',
      createdDate: '2024-01-20',
      lastModified: '2024-11-25'
    },
    {
      id: '3',
      name: 'Transport Officer',
      description: 'Process transport-related applications and documents',
      userCount: 45,
      permissions: ['transport.process', 'documents.view', 'applications.review', 'licenses.issue'],
      color: 'bg-green-100 text-green-800',
      status: 'active',
      createdDate: '2024-02-01',
      lastModified: '2024-12-05'
    },
    {
      id: '4',
      name: 'Birth Registrar',
      description: 'Handle birth certificate applications and registrations',
      userCount: 32,
      permissions: ['birth.register', 'certificates.issue', 'records.update', 'documents.verify'],
      color: 'bg-purple-100 text-purple-800',
      status: 'active',
      createdDate: '2024-02-05',
      lastModified: '2024-11-30'
    },
    {
      id: '5',
      name: 'Citizen',
      description: 'Standard citizen access to submit applications',
      userCount: 15742,
      permissions: ['applications.submit', 'documents.upload', 'status.check', 'profile.manage'],
      color: 'bg-gray-100 text-gray-800',
      status: 'active',
      createdDate: '2024-01-01',
      lastModified: '2024-10-15'
    },
    {
      id: '6',
      name: 'Death Registrar',
      description: 'Process death certificates and related documentation',
      userCount: 18,
      permissions: ['death.register', 'certificates.issue', 'records.archive'],
      color: 'bg-orange-100 text-orange-800',
      status: 'inactive',
      createdDate: '2024-03-10',
      lastModified: '2024-09-20'
    }
  ];

  const departments = [
    { value: 'all', label: 'All Departments' },
    { value: 'transport', label: 'Transport Department' },
    { value: 'civil-registry', label: 'Civil Registry' },
    { value: 'administration', label: 'Administration' },
    { value: 'it-services', label: 'IT Services' }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'system-admin', label: 'System Admin' },
    { value: 'regional-admin', label: 'Regional Admin' },
    { value: 'transport-officer', label: 'Transport Officer' },
    { value: 'birth-registrar', label: 'Birth Registrar' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="d365-badge-success"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'inactive':
        return <Badge className="d365-badge-error"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      case 'pending':
        return <Badge className="d365-badge-warning"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge className="d365-badge-secondary">{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Map role display names to filter values
    const roleMapping: Record<string, string> = {
      'System Admin': 'system-admin',
      'Regional Admin': 'regional-admin', 
      'Transport Officer': 'transport-officer',
      'Birth Registrar': 'birth-registrar'
    };
    
    const userRoleValue = roleMapping[user.role] || user.role;
    const matchesRole = !selectedRole || selectedRole === 'all' || userRoleValue === selectedRole;
    
    // Map department display names to filter values  
    const departmentMapping: Record<string, string> = {
      'IT Services': 'it-services',
      'Transport': 'transport',
      'Civil Registry': 'civil-registry',
      'Administration': 'administration'
    };
    
    const userDepartmentValue = departmentMapping[user.department] || user.department;
    const matchesDepartment = !selectedDepartment || selectedDepartment === 'all' || userDepartmentValue === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const filteredRoles = roles.filter(role => {
    return role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           role.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AdminPageLayout
      title="User & Role Management"
      onBack={onBack}
      actionButton={{
        label: activeTab === 'users' ? 'Add New User' : activeTab === 'roles' ? 'Create Role' : 'Add Department',
        onClick: () => activeTab === 'users' ? setIsAddUserOpen(true) : setIsAddRoleOpen(true),
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder={activeTab === 'users' ? "Search by name, email, or role..." : activeTab === 'roles' ? "Search roles..." : "Search departments..."}
      onSearch={setSearchQuery}
      filters={activeTab === 'users' ? [
        {
          id: 'role',
          placeholder: 'Filter by Role',
          options: roleOptions,
          onSelect: setSelectedRole
        },
        {
          id: 'department',
          placeholder: 'Filter by Department',
          options: departments,
          onSelect: setSelectedDepartment
        }
      ] : []}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Roles</span>
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center space-x-2">
            <Building2 className="h-4 w-4" />
            <span>Organization</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings2 className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Users Table */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Directory ({filteredUsers.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department/Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>MFA</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-caption text-d365-secondary">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="d365-badge-secondary">{user.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.department}</p>
                          <p className="text-caption text-d365-secondary">{user.region}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-caption">{user.lastLogin}</TableCell>
                      <TableCell>
                        {user.mfaEnabled ? (
                          <Badge className="d365-badge-success">
                            <UserCheck className="h-3 w-3 mr-1" />Enabled
                          </Badge>
                        ) : (
                          <Badge className="d365-badge-warning">Disabled</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
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
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          {/* Roles Table */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Role Management ({filteredRoles.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Shield className="h-5 w-5 text-d365-primary" />
                          <div>
                            <Badge className={role.color + " mb-1"}>{role.name}</Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-body max-w-xs line-clamp-2">{role.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-d365-secondary" />
                          <span className="font-medium">{role.userCount.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {role.permissions.slice(0, 2).map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              <Key className="h-2 w-2 mr-1" />
                              {permission}
                            </Badge>
                          ))}
                          {role.permissions.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.permissions.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(role.status)}</TableCell>
                      <TableCell className="text-caption text-d365-secondary">
                        {role.lastModified}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" title="Edit Role">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive"
                            title="Delete Role"
                            disabled={role.userCount > 0}
                          >
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
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          {/* Organization Tree */}
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Organizational Structure</span>
              </CardTitle>
              <CardDescription>View and manage department hierarchy and user assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orgStructure.map((dept, index) => (
                  <div key={index} className="border border-d365-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-6 w-6 text-d365-primary" />
                        <div>
                          <h3 className="font-semibold text-d365-text-primary">{dept.name}</h3>
                          <p className="text-caption text-d365-text-secondary">Head: {dept.head} • {dept.users} users</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="btn-with-icon">
                        <Edit className="h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                    <div className="ml-9 space-y-2">
                      {dept.subdepartments.map((subDept, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between p-2 bg-d365-surface-secondary rounded">
                          <span className="text-body font-medium">{subDept.name}</span>
                          <span className="text-caption text-d365-text-secondary">{subDept.users} users</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* User Management Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="d365-card">
              <CardHeader>
                <CardTitle>User Account Settings</CardTitle>
                <CardDescription>Configure user account policies and security requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-body font-medium">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strong">Strong (8+ chars, mixed case, numbers, symbols)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case, numbers)</SelectItem>
                      <SelectItem value="basic">Basic (6+ chars)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout" className="text-body font-medium">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-attempts" className="text-body font-medium">Maximum Login Attempts</Label>
                  <Input id="max-attempts" type="number" defaultValue="3" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="require-mfa" defaultChecked />
                  <Label htmlFor="require-mfa">Require MFA for all admin accounts</Label>
                </div>
                <Button className="d365-button-primary">Save Settings</Button>
              </CardContent>
            </Card>

            <Card className="d365-card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure user notification preferences and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-new-users" defaultChecked />
                    <Label htmlFor="email-new-users" className="text-body">Email notifications for new users</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-alerts" defaultChecked />
                    <Label htmlFor="sms-alerts" className="text-body">SMS notifications for critical alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="weekly-reports" />
                    <Label htmlFor="weekly-reports" className="text-body">Weekly user activity reports</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="login-failure-alerts" defaultChecked />
                    <Label htmlFor="login-failure-alerts" className="text-body">Login failure alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="permission-changes" defaultChecked />
                    <Label htmlFor="permission-changes" className="text-body">Role and permission change notifications</Label>
                  </div>
                </div>
                <Button className="d365-button-primary">Update Notification Settings</Button>
              </CardContent>
            </Card>

            <Card className="d365-card">
              <CardHeader>
                <CardTitle>Access Control Settings</CardTitle>
                <CardDescription>Configure system-wide access control policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-body font-medium">Default User Role</Label>
                  <Select defaultValue="citizen">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">Citizen</SelectItem>
                      <SelectItem value="officer">Officer</SelectItem>
                      <SelectItem value="regional-admin">Regional Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-approval" />
                  <Label htmlFor="auto-approval">Auto-approve new user registrations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="role-inheritance" defaultChecked />
                  <Label htmlFor="role-inheritance">Enable role inheritance in organization tree</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bulk-actions" className="text-body font-medium">Bulk Action Limit</Label>
                  <Input id="bulk-actions" type="number" defaultValue="100" />
                </div>
                <Button className="d365-button-primary">Save Access Settings</Button>
              </CardContent>
            </Card>

            <Card className="d365-card">
              <CardHeader>
                <CardTitle>Data Retention Settings</CardTitle>
                <CardDescription>Configure how long user data and activity logs are retained</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inactive-users" className="text-body font-medium">Inactive User Cleanup (days)</Label>
                  <Input id="inactive-users" type="number" defaultValue="365" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-logs" className="text-body font-medium">Audit Log Retention (days)</Label>
                  <Input id="audit-logs" type="number" defaultValue="2555" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-history" className="text-body font-medium">Login History Retention (days)</Label>
                  <Input id="login-history" type="number" defaultValue="90" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-archive" defaultChecked />
                  <Label htmlFor="auto-archive">Automatically archive old records</Label>
                </div>
                <Button className="d365-button-primary">Save Retention Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with role and department assignment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="user@gov.utopia" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.filter(role => role.value !== 'all').map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.filter(dept => dept.value !== 'all').map((dept) => (
                    <SelectItem key={dept.value} value={dept.value}>
                      {dept.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="mfa" />
              <Label htmlFor="mfa">Require Multi-Factor Authentication</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddUserOpen(false)}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Define a new role with specific permissions and access levels.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roleName">Role Name</Label>
              <Input id="roleName" placeholder="Enter role name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleDescription">Description</Label>
              <Input id="roleDescription" placeholder="Brief description of role" />
            </div>
            <div className="space-y-2">
              <Label>Permissions</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {['users.manage', 'applications.process', 'reports.view', 'documents.access', 'system.configure'].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Switch id={permission} />
                    <Label htmlFor={permission} className="text-caption">{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsAddRoleOpen(false)}>Create Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageLayout>
  );
}