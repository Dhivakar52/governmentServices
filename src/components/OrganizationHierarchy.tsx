import React, { useState } from 'react';
import { AdminPageLayout } from './AdminPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  UserCheck,
  ChevronRight,
  ChevronDown,
  Building2,
  MapPin,
  Users,
  Flag,
  Home
} from 'lucide-react';

interface OrganizationHierarchyProps {
  onBack: () => void;
}

interface HierarchyNode {
  id: string;
  name: string;
  type: 'country' | 'state' | 'district' | 'facility';
  parentId?: string;
  assignedOfficer?: string;
  status: 'active' | 'inactive';
  children?: HierarchyNode[];
  expanded?: boolean;
  userCount?: number;
  code?: string;
}

export function OrganizationHierarchy({ onBack }: OrganizationHierarchyProps) {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['1']));

  // Mock hierarchy data
  const hierarchyData: HierarchyNode[] = [
    {
      id: '1',
      name: 'Republic of Utopia',
      type: 'country',
      status: 'active',
      userCount: 15847,
      code: 'UTO',
      children: [
        {
          id: '2',
          name: 'Northern State',
          type: 'state',
          parentId: '1',
          assignedOfficer: 'David Wilson',
          status: 'active',
          userCount: 8924,
          code: 'NS',
          children: [
            {
              id: '3',
              name: 'Metro District',
              type: 'district',
              parentId: '2',
              assignedOfficer: 'Sarah Johnson',
              status: 'active',
              userCount: 4512,
              code: 'MD',
              children: [
                {
                  id: '4',
                  name: 'Central Registry Office',
                  type: 'facility',
                  parentId: '3',
                  assignedOfficer: 'Michael Chen',
                  status: 'active',
                  userCount: 234,
                  code: 'CRO-001'
                },
                {
                  id: '5',
                  name: 'Transport Services Center',
                  type: 'facility',
                  parentId: '3',
                  assignedOfficer: 'Lisa Rodriguez',
                  status: 'active',
                  userCount: 189,
                  code: 'TSC-001'
                }
              ]
            },
            {
              id: '6',
              name: 'Rural District',
              type: 'district',
              parentId: '2',
              assignedOfficer: 'James Anderson',
              status: 'active',
              userCount: 2156,
              code: 'RD',
              children: [
                {
                  id: '7',
                  name: 'Community Service Point',
                  type: 'facility',
                  parentId: '6',
                  assignedOfficer: 'Patricia Williams',
                  status: 'inactive',
                  userCount: 89,
                  code: 'CSP-001'
                }
              ]
            }
          ]
        },
        {
          id: '8',
          name: 'Southern State',
          type: 'state',
          parentId: '1',
          assignedOfficer: 'Robert Brown',
          status: 'active',
          userCount: 6923,
          code: 'SS',
          children: [
            {
              id: '9',
              name: 'Coastal District',
              type: 'district',
              parentId: '8',
              assignedOfficer: 'Maria Garcia',
              status: 'active',
              userCount: 3456,
              code: 'CD'
            }
          ]
        }
      ]
    }
  ];

  const officers = [
    { value: 'david.wilson', label: 'David Wilson - Regional Admin' },
    { value: 'sarah.johnson', label: 'Sarah Johnson - District Manager' },
    { value: 'michael.chen', label: 'Michael Chen - Registry Officer' },
    { value: 'lisa.rodriguez', label: 'Lisa Rodriguez - Transport Officer' },
    { value: 'james.anderson', label: 'James Anderson - Rural Coordinator' },
    { value: 'patricia.williams', label: 'Patricia Williams - Community Officer' },
    { value: 'robert.brown', label: 'Robert Brown - State Director' },
    { value: 'maria.garcia', label: 'Maria Garcia - Coastal Manager' }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'country':
        return <Flag className="h-4 w-4" />;
      case 'state':
        return <Building2 className="h-4 w-4" />;
      case 'district':
        return <MapPin className="h-4 w-4" />;
      case 'facility':
        return <Home className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="d365-badge-success">Active</Badge>
    ) : (
      <Badge className="d365-badge-error">Inactive</Badge>
    );
  };

  const toggleExpanded = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderTreeNode = (node: HierarchyNode, level: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="admin-tree-node">
        <div 
          className={`flex items-center p-3 rounded-lg cursor-pointer transition-all hover:bg-d365-hover ${
            isSelected ? 'bg-d365-selected border border-d365-primary' : ''
          }`}
          style={{ marginLeft: `${level * 24}px` }}
          onClick={() => setSelectedNode(node)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(node.id);
              }}
              className="mr-2 p-1 hover:bg-d365-surface-secondary rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}
          
          {!hasChildren && <div className="w-6 mr-2" />}
          
          <div className="mr-3 text-d365-primary">
            {getNodeIcon(node.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className="font-medium truncate">{node.name}</span>
              {node.code && (
                <Badge variant="outline" className="text-xs">{node.code}</Badge>
              )}
              {getStatusBadge(node.status)}
            </div>
            <div className="text-caption text-d365-secondary">
              {node.assignedOfficer && `Officer: ${node.assignedOfficer}`}
              {node.userCount && ` • ${node.userCount.toLocaleString()} users`}
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              <Edit className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              <Trash2 className="h-3 w-3" />
            </Button>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              <UserCheck className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div>
            {node.children!.map(child => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getParentName = (parentId?: string): string => {
    if (!parentId) return 'None (Root Level)';
    
    const findNode = (nodes: HierarchyNode[], id: string): HierarchyNode | null => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findNode(node.children, id);
          if (found) return found;
        }
      }
      return null;
    };
    
    const parent = findNode(hierarchyData, parentId);
    return parent?.name || 'Unknown';
  };

  return (
    <AdminPageLayout
      title="Organization Hierarchy Mapping"
      onBack={onBack}
      actionButton={{
        label: 'Add Region',
        onClick: () => {},
        icon: <Plus className="h-4 w-4" />
      }}
      searchPlaceholder="Search hierarchy..."
      onSearch={setSearchQuery}
      filters={[]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Tree View */}
        <div className="lg:col-span-2">
          <Card className="d365-card h-[700px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Organization Structure</span>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Office
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              <div className="space-y-2">
                {hierarchyData.map(node => renderTreeNode(node))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Node Details */}
        <div className="space-y-4">
          <Card className="d365-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Node Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedNode ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="regionName">Region Name</Label>
                    <Input 
                      id="regionName" 
                      value={selectedNode.name} 
                      readOnly 
                      className="bg-d365-surface-secondary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentRegion">Parent Region</Label>
                    <Input 
                      id="parentRegion" 
                      value={getParentName(selectedNode.parentId)} 
                      readOnly 
                      className="bg-d365-surface-secondary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="regionType">Region Type</Label>
                    <Select value={selectedNode.type} disabled>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="country">Country</SelectItem>
                        <SelectItem value="state">State</SelectItem>
                        <SelectItem value="district">District</SelectItem>
                        <SelectItem value="facility">Facility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="assignedOfficer">Assigned Officer</Label>
                    <Select value={selectedNode.assignedOfficer || ''}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select officer" />
                      </SelectTrigger>
                      <SelectContent>
                        {officers.map((officer) => (
                          <SelectItem key={officer.value} value={officer.value}>
                            {officer.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Current Status</Label>
                    <div>{getStatusBadge(selectedNode.status)}</div>
                  </div>
                  
                  {selectedNode.userCount && (
                    <div className="space-y-2">
                      <Label>User Count</Label>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-d365-secondary" />
                        <span className="font-medium">{selectedNode.userCount.toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-4 border-t border-d365">
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <UserCheck className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-d365-secondary py-8">
                  <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a node from the hierarchy to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageLayout>
  );
}