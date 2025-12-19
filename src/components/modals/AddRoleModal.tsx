import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Shield, Save } from 'lucide-react';
import { toast } from 'sonner';

interface RolePermissions {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

interface RoleFormData {
  name: string;
  description: string;
  color: string;
  permissions: Record<string, RolePermissions>;
}

interface AddRoleModalProps {
  onClose: () => void;
  onSave: (role: RoleFormData) => void;
  initialData?: RoleFormData;
  isEdit?: boolean;
}

const MODULES = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'moderation', label: 'Moderatiya' },
  { id: 'stores', label: 'Do\'konlar' },
  { id: 'products', label: 'Mahsulotlar' },
  { id: 'analytics', label: 'Analitika' },
  { id: 'subscriptions', label: 'Obunalar' },
  { id: 'support', label: 'Support' },
  { id: 'roles', label: 'Rollar' },
  { id: 'broadcast', label: 'Broadcast' },
  { id: 'settings', label: 'Sozlamalar' },
];

const GRADIENT_COLORS = [
  { value: 'from-purple-500 to-pink-500', label: 'Purple-Pink' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue-Cyan' },
  { value: 'from-green-500 to-emerald-500', label: 'Green-Emerald' },
  { value: 'from-red-500 to-rose-500', label: 'Red-Rose' },
  { value: 'from-orange-500 to-amber-500', label: 'Orange-Amber' },
  { value: 'from-indigo-500 to-purple-500', label: 'Indigo-Purple' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow-Orange' },
  { value: 'from-teal-500 to-green-500', label: 'Teal-Green' },
];

const defaultPermissions: Record<string, RolePermissions> = {
  dashboard: { create: false, read: false, update: false, delete: false },
  moderation: { create: false, read: false, update: false, delete: false },
  stores: { create: false, read: false, update: false, delete: false },
  products: { create: false, read: false, update: false, delete: false },
  analytics: { create: false, read: false, update: false, delete: false },
  subscriptions: { create: false, read: false, update: false, delete: false },
  support: { create: false, read: false, update: false, delete: false },
  roles: { create: false, read: false, update: false, delete: false },
  broadcast: { create: false, read: false, update: false, delete: false },
  settings: { create: false, read: false, update: false, delete: false },
};

export function AddRoleModal({ onClose, onSave, initialData, isEdit = false }: AddRoleModalProps) {
  const [formData, setFormData] = useState<RoleFormData>(
    initialData || {
      name: '',
      description: '',
      color: 'from-blue-500 to-cyan-500',
      permissions: defaultPermissions,
    }
  );

  const handlePermissionChange = (
    module: string,
    permissionType: keyof RolePermissions,
    checked: boolean
  ) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          ...formData.permissions[module],
          [permissionType]: checked,
        },
      },
    });
  };

  const handleSelectAll = (module: string) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      },
    });
  };

  const handleDeselectAll = (module: string) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [module]: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error('Rol nomini kiriting');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Tavsifni kiriting');
      return;
    }

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {isEdit ? 'Rolni Tahrirlash' : 'Yangi Rol Qo\'shish'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Rol nomi, tavsifi va ruxsatlarini sozlang
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Rol Nomi *</Label>
                <Input
                  id="name"
                  placeholder="Masalan: Manager, Editor, Viewer"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif *</Label>
                <Textarea
                  id="description"
                  placeholder="Bu rolning vazifalarini qisqacha tavsiflang..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label>Rang Tanlash</Label>
                <div className="grid grid-cols-4 gap-3">
                  {GRADIENT_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`h-12 rounded-lg bg-gradient-to-r ${color.value} hover:scale-105 transition-transform ${
                        formData.color === color.value
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base">Ruxsatlar (Permissions)</Label>
                <p className="text-sm text-muted-foreground">
                  Har bir modul uchun ruxsatlarni belgilang
                </p>
              </div>

              <div className="space-y-3">
                {MODULES.map((module) => {
                  const perms = formData.permissions[module.id];
                  const allSelected = perms?.create && perms?.read && perms?.update && perms?.delete;
                  const noneSelected = !perms?.create && !perms?.read && !perms?.update && !perms?.delete;

                  return (
                    <div
                      key={module.id}
                      className="p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Label className="font-semibold text-foreground">{module.label}</Label>
                        <div className="flex gap-2">
                          {!allSelected && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleSelectAll(module.id)}
                              className="h-7 text-xs"
                            >
                              Barchasini tanlash
                            </Button>
                          )}
                          {!noneSelected && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeselectAll(module.id)}
                              className="h-7 text-xs"
                            >
                              Tozalash
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-read`}
                            checked={perms?.read || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, 'read', checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.id}-read`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Ko'rish (Read)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-create`}
                            checked={perms?.create || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, 'create', checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.id}-create`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Yaratish (Create)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-update`}
                            checked={perms?.update || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, 'update', checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.id}-update`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            Tahrirlash (Update)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`${module.id}-delete`}
                            checked={perms?.delete || false}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(module.id, 'delete', checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${module.id}-delete`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            O'chirish (Delete)
                          </Label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button type="submit" className="gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Save className="w-4 h-4" />
              {isEdit ? 'Saqlash' : 'Rol Qo\'shish'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
