import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { 
  UserCog, 
  Users, 
  Shield,
  Key,
  Plus,
  Edit,
  Eye,
  Lock,
  Unlock,
  Search,
  Filter,
  Download,
  Settings,
  TrendingUp
} from 'lucide-react';

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showAddRole, setShowAddRole] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    department: '',
    role: '',
    permissions: [] as string[]
  });
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });

  const adminStats = [
    {
      title: 'Total Admin Users',
      value: '127',
      icon: Users,
      color: 'bg-blue-500',
      change: '+3',
      period: 'this month'
    },
    {
      title: 'Active Sessions',
      value: '45',
      icon: UserCog,
      color: 'bg-green-500',
      change: '+12',
      period: 'currently online'
    },
    {
      title: 'Security Roles',
      value: '8',
      icon: Shield,
      color: 'bg-purple-500',
      change: '+1',
      period: 'role created'
    },
    {
      title: 'Permission Groups',
      value: '24',
      icon: Key,
      color: 'bg-orange-500',
      change: 'Stable',
      period: 'configurations'
    }
  ];

  const adminUsers = [
    {
      id: 'ADM-2025-001',
      fullName: 'Sarah Al-Mansouri',
      email: 'sarah.almansouri@digitalservices.gov',
      department: 'Ministry of Digital Services',
      role: 'Super Administrator',
      status: 'active',
      lastLogin: '2025-01-08 14:30',
      created: '2024-06-15',
      loginCount: 1247,
      permissions: ['all']
    },
    {
      id: 'ADM-2025-002',
      fullName: 'Ahmed Benali',
      email: 'ahmed.benali@digitalservices.gov',
      department: 'Ministry of Digital Services',
      role: 'System Administrator',
      status: 'active',
      lastLogin: '2025-01-08 13:45',
      created: '2024-08-20',
      loginCount: 892,
      permissions: ['system_monitoring', 'api_access', 'user_management']
    },
    {
      id: 'ADM-2025-003',
      fullName: 'Fatima El Khoury',
      email: 'fatima.elkhoury@health.gov',
      department: 'Ministry of Health',
      role: 'Health Data Manager',
      status: 'active',
      lastLogin: '2025-01-08 11:20',
      created: '2024-09-10',
      loginCount: 456,
      permissions: ['healthcare_sync', 'citizen_management']
    },
    {
      id: 'ADM-2025-004',
      fullName: 'Omar Rachid',
      email: 'omar.rachid@finance.gov',
      department: 'Ministry of Finance',
      role: 'Financial Administrator',
      status: 'active',
      lastLogin: '2025-01-08 09:15',
      created: '2024-07-05',
      loginCount: 678,
      permissions: ['smart_wallet', 'citizen_management']
    },
    {
      id: 'ADM-2025-005',
      fullName: 'Aicha Amrani',
      email: 'aicha.amrani@interior.gov',
      department: 'Ministry of Interior',
      role: 'Security Auditor',
      status: 'suspended',
      lastLogin: '2025-01-06 16:30',
      created: '2024-05-12',
      loginCount: 234,
      permissions: ['system_monitoring', 'api_access']
    }
  ];

  const roles = [
    {
      id: 'role-001',
      name: 'Super Administrator',
      description: 'Full system access with all administrative privileges',
      userCount: 2,
      permissions: ['all'],
      created: '2024-06-01',
      lastModified: '2024-12-15'
    },
    {
      id: 'role-002',
      name: 'System Administrator',
      description: 'System monitoring and infrastructure management',
      userCount: 8,
      permissions: ['system_monitoring', 'api_access', 'user_management', 'dashboard'],
      created: '2024-06-01',
      lastModified: '2024-11-20'
    },
    {
      id: 'role-003',
      name: 'Health Data Manager',
      description: 'Healthcare data synchronization and citizen health records',
      userCount: 12,
      permissions: ['healthcare_sync', 'citizen_management', 'dashboard'],
      created: '2024-07-15',
      lastModified: '2024-10-30'
    },
    {
      id: 'role-004',
      name: 'Financial Administrator',
      description: 'Smart wallet and financial transaction oversight',
      userCount: 6,
      permissions: ['smart_wallet', 'citizen_management', 'dashboard'],
      created: '2024-08-01',
      lastModified: '2024-12-05'
    },
    {
      id: 'role-005',
      name: 'Security Auditor',
      description: 'Security monitoring and audit trail access',
      userCount: 15,
      permissions: ['system_monitoring', 'api_access', 'dashboard'],
      created: '2024-06-20',
      lastModified: '2024-11-10'
    },
    {
      id: 'role-006',
      name: 'Citizen Support Manager',
      description: 'Citizen registration and verification management',
      userCount: 25,
      permissions: ['citizen_management', 'govchat', 'dashboard'],
      created: '2024-09-01',
      lastModified: '2024-12-20'
    }
  ];

  const availablePermissions = [
    { id: 'dashboard', name: 'Dashboard Access', description: 'Access to main dashboard' },
    { id: 'citizen_management', name: 'Citizen Management', description: 'Manage citizen accounts and verification' },
    { id: 'smart_wallet', name: 'Smart Wallet', description: 'Wallet provider and transaction management' },
    { id: 'govchat', name: 'GovChat Assistant', description: 'AI chatbot management and analytics' },
    { id: 'voting', name: 'Diaspora Voting', description: 'Voting system and diaspora management' },
    { id: 'healthcare_sync', name: 'Healthcare Sync', description: 'Health ID linkage and medical records' },
    { id: 'system_monitoring', name: 'System Monitoring', description: 'Infrastructure and performance monitoring' },
    { id: 'api_access', name: 'API Access Logs', description: 'API usage and security monitoring' },
    { id: 'user_management', name: 'Admin User Management', description: 'Manage admin users and roles' }
  ];

  const recentActivity = [
    {
      id: 'ACT-001',
      user: 'Sarah Al-Mansouri',
      action: 'Created new admin user',
      target: 'Youssef Bennani',
      timestamp: '2025-01-08 14:25:30',
      type: 'user_created'
    },
    {
      id: 'ACT-002',
      user: 'Ahmed Benali',
      action: 'Modified role permissions',
      target: 'Security Auditor',
      timestamp: '2025-01-08 13:15:45',
      type: 'role_modified'
    },
    {
      id: 'ACT-003',
      user: 'Sarah Al-Mansouri',
      action: 'Suspended user account',
      target: 'Aicha Amrani',
      timestamp: '2025-01-08 11:30:22',
      type: 'user_suspended'
    },
    {
      id: 'ACT-004',
      user: 'Omar Rachid',
      action: 'Password reset requested',
      target: 'Self',
      timestamp: '2025-01-08 09:45:15',
      type: 'password_reset'
    }
  ];

  const filteredUsers = adminUsers.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const viewUserDetails = (user: any) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };

  const editUser = (user: any) => {
    setSelectedUser(user);
    setNewUser({
      fullName: user.fullName,
      email: user.email,
      department: user.department,
      role: user.role,
      permissions: user.permissions
    });
    setShowEditUser(true);
  };

  const handleAddUser = () => {
    console.log('Adding new user:', newUser);
    setNewUser({ fullName: '', email: '', department: '', role: '', permissions: [] });
    setShowAddUser(false);
    alert('Admin user created successfully!');
  };

  const handleEditUser = () => {
    console.log('Updating user:', selectedUser?.id, newUser);
    setShowEditUser(false);
    alert('User updated successfully!');
  };

  const handleAddRole = () => {
    console.log('Adding new role:', newRole);
    setNewRole({ name: '', description: '', permissions: [] });
    setShowAddRole(false);
    alert('Role created successfully!');
  };

  const togglePermission = (permissionId: string, isRole = false) => {
    if (isRole) {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    } else {
      setNewUser(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    }
  };

  const exportUserData = () => {
    const csvData = [
      ['Admin ID', 'Full Name', 'Email', 'Department', 'Role', 'Status', 'Last Login'],
      ...filteredUsers.map(user => [
        user.id, user.fullName, user.email, user.department, user.role, user.status, user.lastLogin
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.download = `admin_users_export_${new Date().toISOString().split('T')[0]}.csv`;
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--government-green)] mb-2">
            ADMIN USERS & ROLES
          </h1>
          <p className="text-gray-600">
            Manage administrative users, roles, and permissions for the digital identity system
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportUserData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            EXPORT DATA
          </Button>
          <Button 
            onClick={() => setShowAddUser(true)}
            className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            ADD ADMIN USER
          </Button>
        </div>
      </div>

      {/* Admin Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="formal-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--government-green)] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {stat.change} {stat.period}
                </Badge>
              </div>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">ADMIN USERS</TabsTrigger>
          <TabsTrigger value="roles">ROLES & PERMISSIONS</TabsTrigger>
          <TabsTrigger value="activity">ACTIVITY LOG</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card className="formal-card p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-[var(--government-green)]/30 focus:border-[var(--government-green)]"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="border-[var(--government-green)]/30 focus:border-[var(--government-green)]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="formal-card">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-bold text-[var(--government-green)]">ADMIN ID</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">FULL NAME</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">EMAIL</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">DEPARTMENT</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">ROLE</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">STATUS</TableHead>
                  <TableHead className="font-bold text-[var(--government-green)]">LAST LOGIN</TableHead>
                  <TableHead className="text-right font-bold text-[var(--government-green)]">ACTIONS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewUserDetails(user)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => editUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {user.status === 'active' ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[var(--government-green)]">SECURITY ROLES</h3>
            <Button 
              onClick={() => setShowAddRole(true)}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              CREATE ROLE
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="formal-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-[var(--government-green)]" />
                  </div>
                  <Badge variant="outline">
                    {role.userCount} users
                  </Badge>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--government-green)] mb-2">{role.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission === 'all' ? 'ALL PERMISSIONS' : permission.replace('_', ' ').toUpperCase()}
                        </Badge>
                      ))}
                      {role.permissions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Created: {role.created}</span>
                      <span>Modified: {role.lastModified}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="formal-card p-6">
            <h3 className="text-lg font-bold text-[var(--government-green)] mb-6">RECENT ADMIN ACTIVITY</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="bg-[var(--government-green)]/10 p-2 rounded-lg">
                    {activity.type === 'user_created' && <UserCog className="h-5 w-5 text-[var(--government-green)]" />}
                    {activity.type === 'role_modified' && <Shield className="h-5 w-5 text-[var(--government-green)]" />}
                    {activity.type === 'user_suspended' && <Lock className="h-5 w-5 text-red-500" />}
                    {activity.type === 'password_reset' && <Key className="h-5 w-5 text-yellow-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[var(--government-green)]">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{activity.user}</span> → {activity.target}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add User Modal */}
      <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              ADD NEW ADMIN USER
            </DialogTitle>
            <DialogDescription>
              Create a new administrative user account with appropriate permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>FULL NAME</Label>
                <Input
                  value={newUser.fullName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label>EMAIL ADDRESS</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="user@ministry.gov"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>DEPARTMENT</Label>
                <Input
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Ministry/Department"
                />
              </div>
              <div>
                <Label>ROLE</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-[var(--government-green)]">PERMISSIONS</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={newUser.permissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <Label htmlFor={permission.id} className="text-sm">
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleAddUser}
                disabled={!newUser.fullName || !newUser.email || !newUser.role}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                CREATE USER
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditUser} onOpenChange={setShowEditUser}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              EDIT ADMIN USER
            </DialogTitle>
            <DialogDescription>
              Modify user information and permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>FULL NAME</Label>
                <Input
                  value={newUser.fullName}
                  onChange={(e) => setNewUser(prev => ({ ...prev, fullName: e.target.value }))}
                />
              </div>
              <div>
                <Label>EMAIL ADDRESS</Label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>DEPARTMENT</Label>
                <Input
                  value={newUser.department}
                  onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                />
              </div>
              <div>
                <Label>ROLE</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-[var(--government-green)]">PERMISSIONS</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${permission.id}`}
                      checked={newUser.permissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                    <Label htmlFor={`edit-${permission.id}`} className="text-sm">
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowEditUser(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleEditUser}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                UPDATE USER
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Role Modal */}
      <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              CREATE NEW ROLE
            </DialogTitle>
            <DialogDescription>
              Define a new security role with specific permissions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>ROLE NAME</Label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label>DESCRIPTION</Label>
              <Textarea
                value={newRole.description}
                onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role's purpose and responsibilities..."
                rows={3}
              />
            </div>
            <div>
              <Label className="text-[var(--government-green)]">PERMISSIONS</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-48 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${permission.id}`}
                      checked={newRole.permissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id, true)}
                    />
                    <div>
                      <Label htmlFor={`role-${permission.id}`} className="text-sm font-medium">
                        {permission.name}
                      </Label>
                      <p className="text-xs text-gray-500">{permission.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddRole(false)}>
                CANCEL
              </Button>
              <Button 
                onClick={handleAddRole}
                disabled={!newRole.name || !newRole.description || newRole.permissions.length === 0}
                className="bg-[var(--government-green)] hover:bg-[var(--government-header)] text-white"
              >
                CREATE ROLE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Modal */}
      <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[var(--government-green)]">
              USER DETAILS: {selectedUser?.fullName}
            </DialogTitle>
            <DialogDescription>
              Complete profile and activity information for this admin user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ADMIN ID</Label>
                  <p className="font-medium">{selectedUser.id}</p>
                </div>
                <div>
                  <Label>STATUS</Label>
                  <Badge className={getStatusColor(selectedUser.status)}>
                    {selectedUser.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>EMAIL</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label>DEPARTMENT</Label>
                  <p className="font-medium">{selectedUser.department}</p>
                </div>
                <div>
                  <Label>ROLE</Label>
                  <p className="font-medium">{selectedUser.role}</p>
                </div>
                <div>
                  <Label>CREATED</Label>
                  <p className="font-medium">{selectedUser.created}</p>
                </div>
                <div>
                  <Label>LAST LOGIN</Label>
                  <p className="font-medium">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <Label>LOGIN COUNT</Label>
                  <p className="font-medium">{selectedUser.loginCount} times</p>
                </div>
              </div>
              
              <div>
                <Label className="text-[var(--government-green)]">ASSIGNED PERMISSIONS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedUser.permissions?.map((permission: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {permission === 'all' ? 'ALL PERMISSIONS' : permission.replace('_', ' ').toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  RESET PASSWORD
                </Button>
                <Button variant="outline">
                  VIEW ACTIVITY LOG
                </Button>
                <Button onClick={() => setShowUserDetails(false)}>
                  CLOSE
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}