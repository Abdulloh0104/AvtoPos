import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const permissions = [
  { id: 'create_sales', label: 'Sotuv yaratish' },
  { id: 'view_sales', label: 'Sotuvlarni ko\'rish' },
  { id: 'manage_products', label: 'Mahsulotlarni boshqarish' },
  { id: 'view_products', label: 'Mahsulotlarni ko\'rish' },
  { id: 'manage_inventory', label: 'Omborni boshqarish' },
  { id: 'manage_staff', label: 'Xodimlarni boshqarish' },
  { id: 'view_reports', label: 'Hisobotlarni ko\'rish' },
  { id: 'manage_settings', label: 'Sozlamalarni boshqarish' },
];

const rolePermissions: Record<string, string[]> = {
  owner: ['all'],
  manager: ['create_sales', 'view_sales', 'manage_products', 'view_products', 'manage_staff', 'view_reports'],
  cashier: ['create_sales', 'view_products'],
  warehouse_keeper: ['manage_inventory', 'view_products'],
  seller: ['create_sales', 'view_products'],
};

export function AddStaffModal({ open, onOpenChange, onSuccess }: AddStaffModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    role: 'seller',
    password: '',
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role });
    setSelectedPermissions(rolePermissions[role] || []);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.role || !formData.password) {
      toast.error('Iltimos, barcha majburiy maydonlarni to\'ldiring');
      return;
    }

    setTimeout(() => {
      toast.success(`${formData.fullName} xodim sifatida qo'shildi!`);
      onOpenChange(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        role: 'seller',
        password: '',
      });
      setSelectedPermissions([]);
      onSuccess?.();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] animate-scale-in max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yangi xodim qo'shish</DialogTitle>
          <DialogDescription>
            Do'konga yangi xodim qo'shish va ruxsatlarni belgilash
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">
                F.I.O <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Masalan: Alisher Karimov"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone">
                  Telefon <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+998 XX XXX XX XX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.uz"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">
                Lavozim <span className="text-destructive">*</span>
              </Label>
              <Select value={formData.role} onValueChange={handleRoleChange} required>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Menejer</SelectItem>
                  <SelectItem value="cashier">Kassir</SelectItem>
                  <SelectItem value="warehouse_keeper">Omborchi</SelectItem>
                  <SelectItem value="seller">Sotuvchi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">
                Parol <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Kamida 8 ta belgi"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="border-t pt-4">
              <Label className="mb-3 block">Ruxsatlar</Label>
              <div className="grid grid-cols-2 gap-3">
                {permissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => handlePermissionToggle(permission.id)}
                    />
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {permission.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Xodim qo'shish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
