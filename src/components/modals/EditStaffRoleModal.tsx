import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Staff {
  id: string;
  fullName: string;
  role: string;
  permissions: string[];
}

interface EditStaffRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Staff | null;
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

export function EditStaffRoleModal({ open, onOpenChange, staff, onSuccess }: EditStaffRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (staff) {
      setSelectedRole(staff.role);
      setSelectedPermissions(staff.permissions);
    }
  }, [staff]);

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
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

    if (!selectedRole) {
      toast.error('Iltimos, lavozimni tanlang');
      return;
    }

    setTimeout(() => {
      toast.success(`${staff?.fullName} rolini va ruxsatlari yangilandi!`);
      onOpenChange(false);
      onSuccess?.();
    }, 500);
  };

  if (!staff) return null;

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      owner: 'Egasi',
      manager: 'Menejer',
      cashier: 'Kassir',
      warehouse_keeper: 'Omborchi',
      seller: 'Sotuvchi',
    };
    return labels[role] || role;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>Rolni va ruxsatlarni tahrirlash</DialogTitle>
          <DialogDescription>
            {staff.fullName} uchun lavozim va ruxsatlarni o'zgartirish
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Joriy lavozim</p>
                  <p className="font-medium mt-1">{getRoleLabel(staff.role)}</p>
                </div>
                <Badge variant="outline">
                  {staff.permissions.length === 1 && staff.permissions[0] === 'all'
                    ? 'Barcha ruxsatlar'
                    : `${staff.permissions.length} ta ruxsat`}
                </Badge>
              </div>
            </div>

            {staff.role !== 'owner' && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="role">
                    Yangi lavozim <span className="text-destructive">*</span>
                  </Label>
                  <Select value={selectedRole} onValueChange={handleRoleChange} required>
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
                  <p className="text-xs text-muted-foreground">
                    Lavozimni o'zgartirsangiz, ruxsatlar avtomatik yangilanadi
                  </p>
                </div>

                <div className="border-t pt-4">
                  <Label className="mb-3 block">Maxsus ruxsatlar</Label>
                  <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <label
                          htmlFor={`edit-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Xodimga maxsus ruxsatlar berish mumkin
                  </p>
                </div>
              </>
            )}

            {staff.role === 'owner' && (
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  <strong>Diqqat:</strong> Do'kon egasining roli va ruxsatlarini o'zgartirish mumkin emas.
                  Bu xavfsizlik uchun zarur.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            {staff.role !== 'owner' && (
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                O'zgarishlarni saqlash
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
