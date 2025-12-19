import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users,
  CheckCircle2,
  Edit,
  Plus
} from 'lucide-react';
import { AddRoleModal } from '@/components/modals/AddRoleModal';
import { toast } from 'sonner';

interface RolePermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  color: string;
  permissions: Record<string, RolePermissions>;
}

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Barcha tizim huquqlari - to\'liq nazorat',
    usersCount: 2,
    color: 'from-purple-500 to-pink-500',
    permissions: {
      dashboard: { create: true, read: true, update: true, delete: true },
      moderation: { create: true, read: true, update: true, delete: true },
      stores: { create: true, read: true, update: true, delete: true },
      products: { create: true, read: true, update: true, delete: true },
      analytics: { create: true, read: true, update: true, delete: true },
      subscriptions: { create: true, read: true, update: true, delete: true },
      support: { create: true, read: true, update: true, delete: true },
      roles: { create: true, read: true, update: true, delete: true },
      broadcast: { create: true, read: true, update: true, delete: true },
      settings: { create: true, read: true, update: true, delete: true },
    },
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Asosiy boshqaruv huquqlari - moderatsiya va rollardan tashqari',
    usersCount: 5,
    color: 'from-blue-500 to-cyan-500',
    permissions: {
      dashboard: { create: true, read: true, update: true, delete: true },
      moderation: { create: false, read: false, update: false, delete: false },
      stores: { create: true, read: true, update: true, delete: true },
      products: { create: true, read: true, update: true, delete: true },
      analytics: { create: false, read: true, update: false, delete: false },
      subscriptions: { create: true, read: true, update: true, delete: false },
      support: { create: true, read: true, update: true, delete: true },
      roles: { create: false, read: false, update: false, delete: false },
      broadcast: { create: true, read: true, update: true, delete: true },
      settings: { create: false, read: true, update: true, delete: false },
    },
  },
  {
    id: '3',
    name: 'Moderator',
    description: 'Faqat moderatsiya va ko\'rish huquqlari',
    usersCount: 8,
    color: 'from-green-500 to-emerald-500',
    permissions: {
      dashboard: { create: false, read: true, update: false, delete: false },
      moderation: { create: true, read: true, update: true, delete: false },
      stores: { create: false, read: true, update: false, delete: false },
      products: { create: false, read: true, update: false, delete: false },
      analytics: { create: false, read: false, update: false, delete: false },
      subscriptions: { create: false, read: false, update: false, delete: false },
      support: { create: false, read: false, update: false, delete: false },
      roles: { create: false, read: false, update: false, delete: false },
      broadcast: { create: false, read: false, update: false, delete: false },
      settings: { create: false, read: false, update: false, delete: false },
    },
  },
];

export default function RolesPermissions() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setShowEditModal(true);
  };

  const handleAddRole = (roleData: any) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      usersCount: 0,
      color: roleData.color,
      permissions: roleData.permissions,
    };
    setRoles([...roles, newRole]);
    toast.success('Yangi rol muvaffaqiyatli qo\'shildi');
  };

  const handleUpdateRole = (roleData: any) => {
    if (!editingRole) return;
    setRoles(roles.map(r => 
      r.id === editingRole.id 
        ? { ...r, ...roleData } 
        : r
    ));
    toast.success('Rol muvaffaqiyatli yangilandi');
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rollar va Ruxsatlar</h1>
          <p className="text-muted-foreground mt-1">
            Foydalanuvchi rollarini va kirish huquqlarini boshqarish
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4" />
          Yangi Rol Qo'shish
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami Rollar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{roles.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami Foydalanuvchilar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {roles.reduce((sum, r) => sum + r.usersCount, 0)}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faol Super Adminlar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {roles.find(r => r.name === 'Super Admin')?.usersCount || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faol Adminlar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {roles.find(r => r.name === 'Admin')?.usersCount || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Roles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card key={role.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden group">
            <div className={`h-2 bg-gradient-to-r ${role.color}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg`}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{role.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{role.usersCount} foydalanuvchi</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEdit(role)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500/10 hover:text-blue-500"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {Object.entries(role.permissions).map(([module, perms]) => (
                  <div key={module} className="flex items-center justify-between py-2 border-t border-border">
                    <span className="text-sm capitalize font-medium text-foreground">{module}</span>
                    <div className="flex gap-1 flex-wrap justify-end">
                      {perms.read && <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">Ko'rish</Badge>}
                      {perms.create && <Badge variant="outline" className="text-xs bg-green-500/10 text-green-500 border-green-500/20">Yaratish</Badge>}
                      {perms.update && <Badge variant="outline" className="text-xs bg-orange-500/10 text-orange-500 border-orange-500/20">Tahrirlash</Badge>}
                      {perms.delete && <Badge variant="outline" className="text-xs bg-red-500/10 text-red-500 border-red-500/20">O'chirish</Badge>}
                      {!perms.read && !perms.create && !perms.update && !perms.delete && (
                        <Badge variant="outline" className="text-xs bg-gray-500/10 text-gray-500">Yo'q</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Role Modal */}
      {showAddModal && (
        <AddRoleModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddRole}
        />
      )}

      {/* Edit Role Modal */}
      {showEditModal && editingRole && (
        <AddRoleModal
          onClose={() => {
            setShowEditModal(false);
            setEditingRole(null);
          }}
          onSave={handleUpdateRole}
          initialData={{
            name: editingRole.name,
            description: editingRole.description,
            color: editingRole.color,
            permissions: editingRole.permissions,
          }}
          isEdit={true}
        />
      )}
    </div>
  );
}
