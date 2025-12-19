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
import { toast } from 'sonner';

interface AddStoreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddStoreModal({ open, onOpenChange, onSuccess }: AddStoreModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    region: '',
    phone: '',
    email: '',
    subscription: 'basic',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.address || !formData.region || !formData.phone) {
      toast.error('Iltimos, barcha majburiy maydonlarni to\'ldiring');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success(`${formData.name} do'koni muvaffaqiyatli qo'shildi!`);
      onOpenChange(false);
      setFormData({
        name: '',
        address: '',
        region: '',
        phone: '',
        email: '',
        subscription: 'basic',
      });
      onSuccess?.();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>Yangi do'kon qo'shish</DialogTitle>
          <DialogDescription>
            Tizimga yangi do'kon qo'shish uchun ma'lumotlarni kiriting
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Do'kon nomi <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Masalan: TechShop Toshkent"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="region">
                Viloyat <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.region}
                onValueChange={(value) => setFormData({ ...formData, region: value })}
                required
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Viloyatni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tashkent">Toshkent</SelectItem>
                  <SelectItem value="samarkand">Samarqand</SelectItem>
                  <SelectItem value="bukhara">Buxoro</SelectItem>
                  <SelectItem value="andijan">Andijon</SelectItem>
                  <SelectItem value="fergana">Farg'ona</SelectItem>
                  <SelectItem value="namangan">Namangan</SelectItem>
                  <SelectItem value="kashkadarya">Qashqadaryo</SelectItem>
                  <SelectItem value="surkhandarya">Surxondaryo</SelectItem>
                  <SelectItem value="karakalpakstan">Qoraqalpog'iston</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">
                Manzil <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                placeholder="To'liq manzil"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

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
                placeholder="info@dokon.uz"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="subscription">Obuna rejasi</Label>
              <Select
                value={formData.subscription}
                onValueChange={(value) => setFormData({ ...formData, subscription: value })}
              >
                <SelectTrigger id="subscription">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - $299/oy</SelectItem>
                  <SelectItem value="premium">Premium - $599/oy</SelectItem>
                  <SelectItem value="enterprise">Enterprise - $999/oy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Saqlash
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
