import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Plus, Download, DollarSign, CreditCard, Calendar, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Subscription {
  id: string;
  storeName: string;
  planType: 'basic' | 'premium' | 'enterprise';
  startDate: string;
  endDate: string;
  paymentStatus: 'paid' | 'pending' | 'overdue';
  amount: number;
  autoRenew: boolean;
}

const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB001',
    storeName: 'TechShop Toshkent',
    planType: 'enterprise',
    startDate: '2024-01-01',
    endDate: '2025-01-01',
    paymentStatus: 'paid',
    amount: 999,
    autoRenew: true,
  },
  {
    id: 'SUB002',
    storeName: 'Mobile World Samarqand',
    planType: 'premium',
    startDate: '2024-03-15',
    endDate: '2024-12-15',
    paymentStatus: 'pending',
    amount: 599,
    autoRenew: true,
  },
  {
    id: 'SUB003',
    storeName: 'Gadget Zone Buxoro',
    planType: 'basic',
    startDate: '2024-02-01',
    endDate: '2024-11-01',
    paymentStatus: 'overdue',
    amount: 299,
    autoRenew: false,
  },
];

export default function Subscriptions() {
  const [subscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscriptions = subscriptions.filter((sub) =>
    sub.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'premium':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'basic':
        return 'bg-muted text-muted-foreground';
      default:
        return '';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'overdue':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return '';
    }
  };

  const totalRevenue = subscriptions
    .filter(s => s.paymentStatus === 'paid')
    .reduce((sum, s) => sum + s.amount, 0);

  const pendingPayments = subscriptions
    .filter(s => s.paymentStatus === 'pending')
    .reduce((sum, s) => sum + s.amount, 0);

  const overdueCount = subscriptions.filter(s => s.paymentStatus === 'overdue').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Obunalar va To'lovlar</h1>
          <p className="text-muted-foreground mt-1">
            Do'konlar obunalari va to'lov tarixini boshqarish
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast.success('Eksport funksiyasi')}>
            <Download className="w-4 h-4" />
            Eksport
          </Button>
          <Button className="gap-2" onClick={() => toast.success('Yangi reja qo\'shish')}>
            <Plus className="w-4 h-4" />
            Yangi Reja
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami Daromad</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">${totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                <TrendingUp className="w-3 h-3" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Kutilmoqda</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">${pendingPayments.toLocaleString()}</h3>
              <p className="text-xs text-muted-foreground mt-1">Bajarilishi kerak</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Muddati O'tgan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{overdueCount}</h3>
              <p className="text-xs text-muted-foreground mt-1">Shoshilinch</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faol Obunalar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{subscriptions.length}</h3>
              <p className="text-xs text-muted-foreground mt-1">Jami</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Do'kon nomi yoki ID bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Subscriptions Table */}
      <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Do'kon</TableHead>
                  <TableHead>Reja turi</TableHead>
                  <TableHead>Boshlanish</TableHead>
                  <TableHead>Tugash</TableHead>
                  <TableHead>Summa</TableHead>
                  <TableHead>To'lov holati</TableHead>
                  <TableHead>Avto yangilash</TableHead>
                  <TableHead className="text-right">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-mono text-sm">{subscription.id}</TableCell>
                    <TableCell className="font-medium">{subscription.storeName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPlanColor(subscription.planType)}>
                        {subscription.planType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(subscription.startDate).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(subscription.endDate).toLocaleDateString('uz-UZ')}
                    </TableCell>
                    <TableCell className="font-medium">${subscription.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPaymentStatusColor(subscription.paymentStatus)}>
                        {subscription.paymentStatus === 'paid' ? 'To\'landi' :
                         subscription.paymentStatus === 'pending' ? 'Kutilmoqda' : 'Muddati o\'tgan'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={subscription.autoRenew ? 'default' : 'secondary'}>
                        {subscription.autoRenew ? 'Ha' : 'Yo\'q'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Batafsil
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
        </Table>
      </Card>
    </div>
  );
}
