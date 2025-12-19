import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SystemAlerts() {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Tizim ogohlantirishlari</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Alert variant="destructive" className="bg-destructive/10">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-sm">3 ta do'kon obunasi muddati tugagan</span>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              Ko'rish
            </Button>
          </AlertDescription>
        </Alert>

        <Alert className="bg-warning/10 border-warning text-warning-foreground">
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-sm">5 ta to'lov hisob-fakturasi kutilmoqda</span>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              Ko'rish
            </Button>
          </AlertDescription>
        </Alert>

        <Alert className="bg-info/10 border-info text-info-foreground">
          <Info className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-sm">Tizim zahirasi yaratildi</span>
            <Button size="sm" variant="ghost" className="h-7 text-xs">
              Batafsil
            </Button>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
