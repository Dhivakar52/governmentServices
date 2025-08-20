import  { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Shield,
  Building2,
  Key,
  Mail
} from 'lucide-react';

const mockUsers = [
  {
    id: 'USR-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gov.ng',
    role: 'Officer',
    department: 'Transport',
    status: 'Active',
    lastLogin: '2025-01-16 10:30 AM',
    permissions: ['View Applications', 'Process Applications', 'Generate Reports']
  },
  {
    id: 'USR-002',
    name: 'Mike Wilson',
    email: 'mike.wilson@gov.ng',
    role: 'Senior Officer',
    department: 'Transport',
    status: 'Active',
    lastLogin: '2025-01-16 09:15 AM',
    permissions: ['View Applications', 'Process Applications', 'Approve Applications', 'Generate Reports']
  },
  {
    id: 'USR-003',
    name: 'Dr. Emily Carter',
    email: 'emily.carter@gov.ng',
    role: 'Department Head',
    department: 'Civil Registry',
    status: 'Active',
    lastLogin: '2025-01-15 04:45 PM',
    permissions: ['Full Access']
  },
  {
    id: 'USR-004',
    name: 'John Administrator',
    email: 'admin@gov.ng',
    role: 'System Admin',
    department: 'IT Department',
    status: 'Active',
    lastLogin: '2025-01-16 08:00 AM',
    permissions: ['System Administration', 'User Management', 'Full Access']
  }
];

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

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    case 'Inactive':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Inactive</Badge>;
    case 'Suspended':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Suspended</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getRoleBadge = (role: string) => {
  switch (role) {
    case 'System Admin':
      return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">System Admin</Badge>;
    case 'Department Head':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Department Head</Badge>;
    case 'Senior Officer':
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Senior Officer</Badge>;
    case 'Officer':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Officer</Badge>;
    default:
      return <Badge variant="secondary">{role}</Badge>;
  }
};

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [_selectedUser, _setSelectedUser] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and organizational structure</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Bulk Actions
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="organization">Organization Tree</TabsTrigger>
          <TabsTrigger value="roles">Roles &amp; Permissions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users by name, email, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>Manage all registered users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium">{user.name}</p>
                          {getRoleBadge(user.role)}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">{user.department} • Last login: {user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(user.status)}
                      <div className="flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organizational Structure</CardTitle>
              <CardDescription>View and manage department hierarchy and user assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orgStructure.map((dept, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-semibold">{dept.name}</h3>
                          <p className="text-sm text-muted-foreground">Head: {dept.head} • {dept.users} users</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                    <div className="ml-9 space-y-2">
                      {dept.subdepartments.map((subDept, subIndex) => (
                        <div key={subIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm font-medium">{subDept.name}</span>
                          <span className="text-sm text-muted-foreground">{subDept.users} users</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Roles</CardTitle>
                <CardDescription>Manage user roles and their permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">System Administrator</p>
                      <p className="text-sm text-muted-foreground">Full system access and control</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Department Head</p>
                      <p className="text-sm text-muted-foreground">Department-level management access</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Senior Officer</p>
                      <p className="text-sm text-muted-foreground">Application processing and approval</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Officer</p>
                      <p className="text-sm text-muted-foreground">Basic application processing</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Role
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Permission Matrix</CardTitle>
                <CardDescription>Configure role-based access control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm font-medium">System Permissions:</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>View Applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Process Applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>Approve Applications</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>User Management</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>System Configuration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Generate Reports</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Update Permissions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Account Settings</CardTitle>
                <CardDescription>Configure user account policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Policy</label>
                  <select className="w-full border rounded-md px-3 py-2">
                    <option>Strong (8+ chars, mixed case, numbers, symbols)</option>
                    <option>Medium (8+ chars, mixed case, numbers)</option>
                    <option>Basic (6+ chars)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Input type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maximum Login Attempts</label>
                  <Input type="number" defaultValue="3" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure user notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Email notifications for new users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">SMS notifications for critical alerts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Weekly user activity reports</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm">Login failure alerts</span>
                  </div>
                </div>
                <Button>Update Notification Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}