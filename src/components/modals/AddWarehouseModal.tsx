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

interface AddWarehouseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AddWarehouseModal({ open, onOpenChange, onSuccess }: AddWarehouseModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    responsiblePerson: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.location || !formData.capacity || !formData.responsiblePerson) {
      toast.error('Iltimos, barcha majburiy maydonlarni to\'ldiring');
      return;
    }

    setTimeout(() => {
      toast.success(`${formData.name} muvaffaqiyatli qo'shildi!`);
      onOpenChange(false);
      setFormData({
        name: '',
        location: '',
        capacity: '',
        responsiblePerson: '',
      });
      onSuccess?.();
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] animate-scale-in">
        <DialogHeader>
          <DialogTitle>Yangi ombor qo'shish</DialogTitle>
          <DialogDescription>
            Do'konga yangi ombor joyini qo'shish
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                Ombor nomi <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Masalan: Asosiy ombor"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">
                Manzil <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                placeholder="To'liq manzil"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="capacity">
                Sig'im (dona) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="capacity"
                type="number"
                placeholder="10000"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
              <p className="text-xs text-muted-foreground">
                Omborga sig'adigan maksimal mahsulot soni
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="responsible">
                Mas'ul shaxs <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.responsiblePerson}
                onValueChange={(value) => setFormData({ ...formData, responsiblePerson: value })}
                required
              >
                <SelectTrigger id="responsible">
                  <SelectValue placeholder="Xodimni tanlang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bobur Usmonov">Bobur Usmonov (Omborchi)</SelectItem>
                  <SelectItem value="Dilshod Rahimov">Dilshod Rahimov (Menejer)</SelectItem>
                  <SelectItem value="Alisher Karimov">Alisher Karimov (Egasi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Bekor qilish
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Ombor qo'shish
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
