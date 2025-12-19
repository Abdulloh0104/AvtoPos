import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Building2,
  Users,
  Package,
  Settings,
  Plus,
  Edit,
  Trash2,
  Shield,
  Lock,
  Unlock,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from 'lucide-react';
import { AddStaffModal } from '@/components/modals/AddStaffModal';
import { EditStaffRoleModal } from '@/components/modals/EditStaffRoleModal';
import { AddWarehouseModal } from '@/components/modals/AddWarehouseModal';
import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
import { toast } from 'sonner';

interface Staff {
  id: string;
  fullName: string;
  role: 'owner' | 'manager' | 'cashier' | 'warehouse_keeper' | 'seller';
  phone: string;
  email: string;
  permissions: string[];
  active: boolean;
  joinedDate: string;
  lastLogin?: string;
}

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  productsCount: number;
  responsiblePerson: string;
  status: 'active' | 'inactive';
}

const mockStaff: Staff[] = [
  {
    id: 'STF001',
    fullName: 'Alisher Karimov',
    role: 'owner',
    phone: '+998 90 123 45 67',
    email: 'alisher@techshop.uz',
    permissions: ['all'],
    active: true,
    joinedDate: '2024-01-01',
    lastLogin: '2024-11-11T10:30:00',
  },
  {
    id: 'STF002',
    fullName: 'Dilshod Rahimov',
    role: 'manager',
    phone: '+998 91 234 56 78',
    email: 'dilshod@techshop.uz',
    permissions: ['manage_products', 'view_sales', 'manage_staff'],
    active: true,
    joinedDate: '2024-02-15',
    lastLogin: '2024-11-11T09:15:00',
  },
  {
    id: 'STF003',
    fullName: 'Nasiba Tursunova',
    role: 'cashier',
    phone: '+998 93 345 67 89',
    email: 'nasiba@techshop.uz',
    permissions: ['create_sales', 'view_products'],
    active: true,
    joinedDate: '2024-03-20',
    lastLogin: '2024-11-11T08:00:00',
  },
  {
    id: 'STF004',
    fullName: 'Bobur Usmonov',
    role: 'warehouse_keeper',
    phone: '+998 94 456 78 90',
    email: 'bobur@techshop.uz',
    permissions: ['manage_inventory', 'view_products'],
    active: true,
    joinedDate: '2024-04-10',
    lastLogin: '2024-11-10T16:45:00',
  },
  {
    id: 'STF005',
    fullName: 'Zarina Abdullayeva',
    role: 'seller',
    phone: '+998 95 567 89 01',
    email: 'zarina@techshop.uz',
    permissions: ['create_sales', 'view_products'],
    active: false,
    joinedDate: '2024-05-01',
  },
];

const mockWarehouses: Warehouse[] = [
  {
    id: 'WH001',
    name: 'Asosiy ombor',
    location: 'Chilonzor, Toshkent',
    capacity: 10000,
    currentStock: 7845,
    productsCount: 342,
    responsiblePerson: 'Bobur Usmonov',
    status: 'active',
  },
  {
    id: 'WH002',
    name: 'Savdo zali ombori',
    location: 'Do\'kon ichida',
    capacity: 2000,
    currentStock: 1650,
    productsCount: 156,
    responsiblePerson: 'Dilshod Rahimov',
    status: 'active',
  },
];

export default function StoreDetails() {
  const navigate = useNavigate();
  const { storeId } = useParams();
  
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [warehouses] = useState<Warehouse[]>(mockWarehouses);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; staffId: string | null }>({ 
    open: false, 
    staffId: null 
  });

  const handleEditRole = (staffMember: Staff) => {
    setSelectedStaff(staffMember);
    setShowEditRoleModal(true);
  };

  const handleToggleActive = (staffId: string) => {
    setStaff(staff.map(s => 
      s.id === staffId ? { ...s, active: !s.active } : s
    ));
    toast.success('Xodim holati o\'zgartirildi');
  };

  const handleDeleteStaff = () => {
    if (deleteDialog.staffId) {
      setStaff(staff.filter(s => s.id !== deleteDialog.staffId));
      toast.success('Xodim o\'chirildi');
      setDeleteDialog({ open: false, staffId: null });
    }
  };

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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'manager':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'cashier':
        return 'bg-info/10 text-info border-info/20';
      case 'warehouse_keeper':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'seller':
        return 'bg-success/10 text-success border-success/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/stores')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">TechShop Toshkent</h2>
          <p className="text-muted-foreground mt-1">Do'kon ma'lumotlari va boshqaruv</p>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Faol
        </Badge>
      </div>

      {/* Store Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{staff.length}</p>
                <p className="text-sm text-muted-foreground">Xodimlar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Package className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{warehouses.length}</p>
                <p className="text-sm text-muted-foreground">Omborlar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Building2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">498</p>
                <p className="text-sm text-muted-foreground">Mahsulotlar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">Enterprise</p>
                <p className="text-sm text-muted-foreground">Obuna rejasi</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">
            <Building2 className="w-4 h-4 mr-2" />
            Umumiy
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="w-4 h-4 mr-2" />
            Xodimlar
          </TabsTrigger>
          <TabsTrigger value="warehouse">
            <Package className="w-4 h-4 mr-2" />
            Omborlar
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Sozlamalar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Do'kon ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Manzil</p>
                    <p className="font-medium">Chilonzor ko'chasi 12-uy, Toshkent</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">+998 71 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">info@techshop.uz</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ro'yxatdan o'tgan</p>
                    <p className="font-medium">01.01.2024</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Oylik statistika</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Jami sotuv</span>
                  <span className="font-bold">$45,230</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Tranzaksiyalar</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">O'rtacha chek</span>
                  <span className="font-bold">$36.68</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Obuna ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Reja</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    Enterprise
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Narx</span>
                  <span className="font-bold">$999/oy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Keyingi to'lov</span>
                  <span className="font-bold">01.01.2025</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Xodimlar ro'yxati</CardTitle>
                <Button onClick={() => setShowAddStaffModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Xodim qo'shish
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>F.I.O</TableHead>
                      <TableHead>Lavozim</TableHead>
                      <TableHead>Telefon</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ruxsatlar</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Oxirgi kirish</TableHead>
                      <TableHead className="text-right">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.fullName}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            {getRoleLabel(member.role)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{member.phone}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {member.email}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Shield className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{member.permissions.length}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={member.active ? 'default' : 'secondary'}
                            className={member.active ? 'bg-success/10 text-success border-success/20' : ''}
                          >
                            {member.active ? 'Faol' : 'Nofaol'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {member.lastLogin
                            ? new Date(member.lastLogin).toLocaleString('uz-UZ')
                            : 'Hech qachon'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditRole(member)}
                              title="Rolni o'zgartirish"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleActive(member.id)}
                              title={member.active ? 'Bloklash' : 'Faollashtirish'}
                            >
                              {member.active ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                            </Button>
                            {member.role !== 'owner' && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteDialog({ open: true, staffId: member.id })}
                                title="O'chirish"
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Permissions Legend */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Lavozimlar va ruxsatlar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border">
                  <Badge variant="outline" className={`${getRoleColor('owner')} mb-2`}>
                    Egasi
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Barcha huquqlar: do'konni to'liq boshqarish, xodimlar va sozlamalar
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <Badge variant="outline" className={`${getRoleColor('manager')} mb-2`}>
                    Menejer
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Mahsulotlar, sotuvlar va xodimlarni boshqarish
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <Badge variant="outline" className={`${getRoleColor('cashier')} mb-2`}>
                    Kassir
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Sotuvlarni amalga oshirish va to'lovlarni qabul qilish
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <Badge variant="outline" className={`${getRoleColor('warehouse_keeper')} mb-2`}>
                    Omborchi
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Ombor va inventarizatsiyani boshqarish
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <Badge variant="outline" className={`${getRoleColor('seller')} mb-2`}>
                    Sotuvchi
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Mijozlarga xizmat ko'rsatish va sotuvlar
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warehouse" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Omborlar</CardTitle>
                <Button onClick={() => setShowAddWarehouseModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ombor qo'shish
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {warehouses.map((warehouse) => (
                  <Card key={warehouse.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{warehouse.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {warehouse.location}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            warehouse.status === 'active'
                              ? 'bg-success/10 text-success border-success/20'
                              : 'bg-muted text-muted-foreground'
                          }
                        >
                          {warehouse.status === 'active' ? 'Faol' : 'Nofaol'}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sig'im</span>
                          <span className="font-medium">{warehouse.capacity.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Joriy zaxira</span>
                          <span className="font-medium">{warehouse.currentStock.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Mahsulotlar</span>
                          <span className="font-medium">{warehouse.productsCount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Mas'ul</span>
                          <span className="font-medium text-sm">{warehouse.responsiblePerson}</span>
                        </div>

                        {/* Progress bar */}
                        <div className="pt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>To'lganlik</span>
                            <span>
                              {Math.round((warehouse.currentStock / warehouse.capacity) * 100)}%
                            </span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: `${(warehouse.currentStock / warehouse.capacity) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Tahrirlash
                        </Button>
                        <Button variant="ghost" size="sm">
                          Batafsil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Do'kon sozlamalari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Asosiy sozlamalar</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ish vaqti</label>
                    <p className="text-sm text-muted-foreground">09:00 - 21:00</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dam olish kunlari</label>
                    <p className="text-sm text-muted-foreground">Yakshanba</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Valyuta</label>
                    <p className="text-sm text-muted-foreground">UZS (So'm)</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">QQS</label>
                    <p className="text-sm text-muted-foreground">12%</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Integratsiyalar</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Telegram Bot</p>
                      <p className="text-sm text-muted-foreground">Bildirishnomalar uchun</p>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      Ulangan
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">To'lov tizimi</p>
                      <p className="text-sm text-muted-foreground">Click, Payme</p>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success">
                      Faol
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-destructive">Xavfli zona</h3>
                    <p className="text-sm text-muted-foreground">
                      Do'konni to'xtatish yoki o'chirish
                    </p>
                  </div>
                  <Button variant="destructive">
                    Do'konni to'xtatish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddStaffModal open={showAddStaffModal} onOpenChange={setShowAddStaffModal} />
      
      <EditStaffRoleModal
        open={showEditRoleModal}
        onOpenChange={setShowEditRoleModal}
        staff={selectedStaff}
      />

      <AddWarehouseModal open={showAddWarehouseModal} onOpenChange={setShowAddWarehouseModal} />

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, staffId: null })}
        title="Xodimni o'chirish"
        description="Rostdan ham bu xodimni tizimdan o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
        onConfirm={handleDeleteStaff}
        confirmText="O'chirish"
        variant="destructive"
      />
    </div>
  );
}
