import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Edit,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CreditCard,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

interface StoreRequest {
  id: string;
  companyName: string;
  ownerName: string;
  phone: string;
  email: string;
  address: string;
  region: string;
  subscriptionType: 'Basic' | 'Standard' | 'Premium';
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

interface ModerationDetailsModalProps {
  request: StoreRequest;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string, notes: string) => void;
  onUpdate: (requestId: string, updatedData: Partial<StoreRequest>) => void;
}

export function ModerationDetailsModal({
  request,
  onClose,
  onApprove,
  onReject,
  onUpdate,
}: ModerationDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectNotes, setRejectNotes] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: request.companyName,
    ownerName: request.ownerName,
    phone: request.phone,
    email: request.email,
    address: request.address,
    region: request.region,
    subscriptionType: request.subscriptionType,
  });

  const handleSave = () => {
    onUpdate(request.id, formData);
    setIsEditing(false);
  };

  const handleApprove = () => {
    onApprove(request.id);
  };

  const handleReject = () => {
    if (!rejectNotes.trim()) {
      toast.error('Rad etish sababini kiriting');
      return;
    }
    onReject(request.id, rejectNotes);
    setShowRejectForm(false);
  };

  const getStatusBadge = () => {
    switch (request.status) {
      case 'pending':
        return (
          <Badge className="bg-orange-500/10 text-orange-500 gap-1">
            <Clock className="w-3 h-3" />
            Kutilmoqda
          </Badge>
        );
      case 'approved':
        return (
          <Badge className="bg-green-500/10 text-green-500 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Tasdiqlangan
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-500/10 text-red-500 gap-1">
            <XCircle className="w-3 h-3" />
            Rad etilgan
          </Badge>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {request.companyName.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{request.companyName}</h2>
              <div className="flex items-center gap-2 mt-1">
                {getStatusBadge()}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Edit Toggle */}
          {request.status === 'pending' && !showRejectForm && (
            <div className="flex justify-end">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Bekor qilish
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Saqlash
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="w-4 h-4" />
                  Tahrirlash
                </Button>
              )}
            </div>
          )}

          {/* Request Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Info */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Kompaniya Ma'lumotlari</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Kompaniya Nomi</Label>
                  {isEditing ? (
                    <Input
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground mt-1">{request.companyName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Manzil</Label>
                  {isEditing ? (
                    <Textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={2}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-foreground mt-1">{request.address}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Mintaqa</Label>
                  {isEditing ? (
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Toshkent">Toshkent</SelectItem>
                        <SelectItem value="Samarqand">Samarqand</SelectItem>
                        <SelectItem value="Buxoro">Buxoro</SelectItem>
                        <SelectItem value="Andijon">Andijon</SelectItem>
                        <SelectItem value="Farg'ona">Farg'ona</SelectItem>
                        <SelectItem value="Namangan">Namangan</SelectItem>
                        <SelectItem value="Qo'qon">Qo'qon</SelectItem>
                        <SelectItem value="Urganch">Urganch</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-sm text-foreground mt-1">{request.region}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Owner Info */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Egasi Ma'lumotlari</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">To'liq Ism</Label>
                  {isEditing ? (
                    <Input
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground mt-1">{request.ownerName}</p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Telefon</Label>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {request.phone}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Email</Label>
                  {isEditing ? (
                    <Input
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      type="email"
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-foreground mt-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {request.email}
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Subscription Info */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Obuna Ma'lumotlari</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">So'ralgan Obuna Turi</Label>
                  {isEditing ? (
                    <Select
                      value={formData.subscriptionType}
                      onValueChange={(value: any) => setFormData({ ...formData, subscriptionType: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1">
                      <Badge
                        className={
                          request.subscriptionType === 'Premium'
                            ? 'bg-green-500/10 text-green-500'
                            : request.subscriptionType === 'Standard'
                            ? 'bg-blue-500/10 text-blue-500'
                            : 'bg-gray-500/10 text-gray-500'
                        }
                      >
                        {request.subscriptionType}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Vaqt Ma'lumotlari</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">So'rov Vaqti</Label>
                  <p className="text-sm text-foreground mt-1">
                    {new Date(request.requestedAt).toLocaleString('uz-UZ')}
                  </p>
                </div>
                {request.reviewedAt && (
                  <>
                    <div>
                      <Label className="text-xs text-muted-foreground">Ko'rib Chiqilgan Vaqt</Label>
                      <p className="text-sm text-foreground mt-1">
                        {new Date(request.reviewedAt).toLocaleString('uz-UZ')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Ko'rib Chiqgan Admin</Label>
                      <p className="text-sm text-foreground mt-1">{request.reviewedBy}</p>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Rejection Notes */}
          {request.status === 'rejected' && request.notes && (
            <Card className="p-4 bg-red-500/5 border-red-500/20">
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Rad Etish Sababi</h4>
                  <p className="text-sm text-muted-foreground">{request.notes}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Reject Form */}
          {showRejectForm && (
            <Card className="p-4 bg-red-500/5 border-red-500/20">
              <div className="space-y-3">
                <Label>Rad Etish Sababi</Label>
                <Textarea
                  value={rejectNotes}
                  onChange={(e) => setRejectNotes(e.target.value)}
                  placeholder="Sabab yoki tafsilotlarni kiriting..."
                  rows={4}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRejectForm(false);
                      setRejectNotes('');
                    }}
                  >
                    Bekor qilish
                  </Button>
                  <Button variant="destructive" onClick={handleReject} className="gap-2">
                    <XCircle className="w-4 h-4" />
                    Tasdiqlash
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Actions */}
          {request.status === 'pending' && !showRejectForm && !isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setShowRejectForm(true)}
                className="gap-2 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
              >
                <XCircle className="w-4 h-4" />
                Rad Etish
              </Button>
              <Button onClick={handleApprove} className="gap-2 bg-green-500 hover:bg-green-600">
                <CheckCircle2 className="w-4 h-4" />
                Tasdiqlash va Do'kon Yaratish
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
