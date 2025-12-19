import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, AlertCircle, CheckCircle, Package } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'new_store',
    message: 'Yangi do\'kon ro\'yxatdan o\'tdi: Mobile World Farg\'ona',
    time: '2 soat oldin',
    icon: Store,
    color: 'text-success',
  },
  {
    id: 2,
    type: 'ticket',
    message: 'TechnoCity tomonidan muhim murojaat ochildi',
    time: '4 soat oldin',
    icon: AlertCircle,
    color: 'text-warning',
  },
  {
    id: 3,
    type: 'resolved',
    message: '#1247 murojaat hal qilindi',
    time: '6 soat oldin',
    icon: CheckCircle,
    color: 'text-success',
  },
  {
    id: 4,
    type: 'product',
    message: 'Yangi mahsulot tasdiqlandi: Samsung Galaxy S24',
    time: '8 soat oldin',
    icon: Package,
    color: 'text-info',
  },
];

export function ActivityFeed() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>So'nggi faoliyat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className={`p-2 rounded-lg bg-muted ${activity.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
