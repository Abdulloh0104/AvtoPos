import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  nameUz: string;
  description: string;
  permissions: string[];
  color: string;
}

interface EditRoleModalProps {
  role: Role;
  onClose: () => void;
  onSave: (data: any) => void;
  permissions: Permission[];
}

const COLORS = [
  { value: 'red', label: 'Qizil', class: 'bg-red-500' },
  { value: 'blue', label: 'Ko\'k', class: 'bg-blue-500' },
  { value: 'green', label: 'Yashil', class: 'bg-green-500' },
  { value: 'purple', label: 'Binafsha', class: 'bg-purple-500' },
  { value: 'orange', label: 'To\'q sariq', class: 'bg-orange-500' },
  { value: 'pink', label: 'Pushti', class: 'bg-pink-500' },
];

export function EditRoleModal({ role, onClose, onSave, permissions }: EditRoleModalProps) {
  const [formData, setFormData] = useState({
    name: role.name,
    nameUz: role.nameUz,
    description: role.description,
    color: role.color,
    permissions: role.permissions,
  });

  const categories = Array.from(new Set(permissions.map(p => p.category)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(id => id !== permId)
        : [...prev.permissions, permId]
    }));
  };

  const toggleCategory = (category: string) => {
    const categoryPerms = permissions.filter(p => p.category === category).map(p => p.id);
    const allSelected = categoryPerms.every(id => formData.permissions.includes(id));
    
    if (allSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(id => !categoryPerms.includes(id))
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: Array.from(new Set([...prev.permissions, ...categoryPerms]))
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold text-foreground">Rolni Tahrirlash</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Rol Nomi (Inglizcha)</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Admin"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Rol Nomi (O'zbekcha)</Label>
              <Input
                value={formData.nameUz}
                onChange={(e) => setFormData({ ...formData, nameUz: e.target.value })}
                placeholder="Administrator"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tavsif</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Rol haqida qisqacha ma'lumot..."
              rows={3}
              required
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Rang</Label>
            <div className="flex gap-3">
              {COLORS.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-8 h-8 rounded-full ${color.class} transition-all ${
                    formData.color === color.value 
                      ? 'ring-4 ring-primary ring-offset-2' 
                      : 'hover:scale-110'
                  }`}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <Label className="text-lg">Ruxsatlar</Label>
            <div className="space-y-4">
              {categories.map(category => {
                const categoryPerms = permissions.filter(p => p.category === category);
                const allSelected = categoryPerms.every(p => formData.permissions.includes(p.id));
                const someSelected = categoryPerms.some(p => formData.permissions.includes(p.id));

                return (
                  <Card key={category} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={() => toggleCategory(category)}
                        className={someSelected && !allSelected ? 'opacity-50' : ''}
                      />
                      <Label className="text-base font-semibold cursor-pointer" onClick={() => toggleCategory(category)}>
                        {category}
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pl-8">
                      {categoryPerms.map(perm => (
                        <div key={perm.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={formData.permissions.includes(perm.id)}
                            onCheckedChange={() => togglePermission(perm.id)}
                          />
                          <Label className="text-sm cursor-pointer" onClick={() => togglePermission(perm.id)}>
                            {perm.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button type="submit">
              Saqlash
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
