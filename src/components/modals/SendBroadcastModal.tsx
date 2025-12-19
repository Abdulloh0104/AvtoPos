import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Send, Clock, Bell, Mail, Smartphone } from 'lucide-react';

interface SendBroadcastModalProps {
  onClose: () => void;
  onSend: (data: any) => void;
  segments: { value: string; label: string }[];
}

export function SendBroadcastModal({ onClose, onSend, segments }: SendBroadcastModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'push' as 'push' | 'sms' | 'email' | 'all',
    segment: 'all',
    scheduledAt: '',
  });

  const [sendNow, setSendNow] = useState(true);

  // Mock recipient count based on segment
  const getRecipientCount = (segment: string) => {
    const counts: Record<string, number> = {
      all: 150,
      active: 145,
      inactive: 5,
      subscription_ending: 23,
      tashkent: 45,
      samarkand: 32,
      bukhara: 28,
      new_stores: 15,
    };
    return counts[segment] || 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({
      ...formData,
      scheduledAt: sendNow ? null : formData.scheduledAt,
      recipientCount: getRecipientCount(formData.segment),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <h2 className="text-xl font-bold text-foreground">Yangi Xabar Yuborish</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Message Type */}
          <div className="space-y-2">
            <Label>Xabar Turi</Label>
            <div className="grid grid-cols-4 gap-3">
              <Button
                type="button"
                variant={formData.type === 'push' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, type: 'push' })}
                className="gap-2"
              >
                <Bell className="w-4 h-4" />
                Push
              </Button>
              <Button
                type="button"
                variant={formData.type === 'sms' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, type: 'sms' })}
                className="gap-2"
              >
                <Smartphone className="w-4 h-4" />
                SMS
              </Button>
              <Button
                type="button"
                variant={formData.type === 'email' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, type: 'email' })}
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </Button>
              <Button
                type="button"
                variant={formData.type === 'all' ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, type: 'all' })}
                className="gap-2"
              >
                <Send className="w-4 h-4" />
                Hammasi
              </Button>
            </div>
          </div>

          {/* Segment */}
          <div className="space-y-2">
            <Label>Segment</Label>
            <Select
              value={formData.segment}
              onValueChange={(value) => setFormData({ ...formData, segment: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {segments.map(seg => (
                  <SelectItem key={seg.value} value={seg.value}>
                    {seg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Qabul qiluvchilar: <span className="font-semibold text-foreground">
                {getRecipientCount(formData.segment)} ta do'kon
              </span>
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Sarlavha</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Xabar sarlavhasi..."
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label>Xabar Matni</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Xabar mazmuni..."
              rows={5}
              required
            />
            <p className="text-xs text-muted-foreground">
              {formData.content.length} belgi
            </p>
          </div>

          {/* Scheduling */}
          <Card className="p-4 bg-muted/50">
            <div className="flex items-center gap-3 mb-3">
              <Checkbox
                checked={sendNow}
                onCheckedChange={(checked) => setSendNow(checked as boolean)}
              />
              <Label className="cursor-pointer" onClick={() => setSendNow(!sendNow)}>
                Hozir yuborish
              </Label>
            </div>

            {!sendNow && (
              <div className="space-y-2 pl-7">
                <Label>Rejalashtirilgan Vaqt</Label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                  required={!sendNow}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
            )}
          </Card>

          {/* Preview */}
          <Card className="p-4 bg-muted/30">
            <p className="text-sm font-medium text-muted-foreground mb-3">Ko'rinish:</p>
            <div className="bg-card p-4 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground mb-1">
                {formData.title || 'Xabar sarlavhasi'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {formData.content || 'Xabar mazmuni bu yerda ko\'rinadi...'}
              </p>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>
              Bekor qilish
            </Button>
            <Button type="submit" className="gap-2">
              {sendNow ? (
                <>
                  <Send className="w-4 h-4" />
                  Yuborish
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  Rejalashtirish
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
