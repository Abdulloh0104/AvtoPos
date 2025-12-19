import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Shield, 
  Key, 
  Database,
  Bell,
  Palette,
  Save
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const [currency, setCurrency] = useState('UZS');
  const [language, setLanguage] = useState('uz');
  const [timezone, setTimezone] = useState('Asia/Tashkent');
  const [vat, setVat] = useState('12');
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tizim Sozlamalari</h1>
        <p className="text-muted-foreground mt-1">
          Tizim parametrlarini va integratsiyalarni boshqarish
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Umumiy
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Lokalizatsiya
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Xavfsizlik
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Key className="w-4 h-4" />
            Integratsiyalar
          </TabsTrigger>
          <TabsTrigger value="backup" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Zaxira nusxa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Umumiy sozlamalar</CardTitle>
              <CardDescription>Tizimning asosiy parametrlari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Kompaniya nomi</Label>
                <Input id="company-name" defaultValue="okam.uz" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-email">Qo'llab-quvvatlash email</Label>
                <Input id="support-email" type="email" defaultValue="support@okam.uz" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-phone">Qo'llab-quvvatlash telefon</Label>
                <Input id="support-phone" type="tel" defaultValue="+998 71 123 45 67" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email bildirishnomalari</Label>
                  <p className="text-sm text-muted-foreground">
                    Muhim hodisalar haqida email orqali xabar berish
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="space-y-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Lokalizatsiya sozlamalari</CardTitle>
              <CardDescription>Til, valyuta va vaqt mintaqasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Til</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uz">O'zbek tili</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Valyuta</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UZS">UZS - O'zbek so'm</SelectItem>
                    <SelectItem value="USD">USD - Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Yevro</SelectItem>
                    <SelectItem value="RUB">RUB - Rubl</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Vaqt mintaqasi</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Tashkent">Toshkent (GMT+5)</SelectItem>
                    <SelectItem value="Asia/Samarkand">Samarqand (GMT+5)</SelectItem>
                    <SelectItem value="Europe/Moscow">Moskva (GMT+3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat">QQS (VAT) %</Label>
                <Input
                  id="vat"
                  type="number"
                  value={vat}
                  onChange={(e) => setVat(e.target.value)}
                />
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Xavfsizlik sozlamalari</CardTitle>
              <CardDescription>Hisobni himoya qilish va autentifikatsiya</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Ikki bosqichli autentifikatsiya</Label>
                  <p className="text-sm text-muted-foreground">
                    Qo'shimcha xavfsizlik qatlami uchun 2FA ni yoqing
                  </p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Sessiya tugash vaqti (daqiqa)</Label>
                <Input id="session-timeout" type="number" defaultValue="30" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-policy">Parol murakkabligi</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="password-policy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Past</SelectItem>
                    <SelectItem value="medium">O'rta</SelectItem>
                    <SelectItem value="high">Yuqori</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-login-attempts">Maksimal kirish urinishlari</Label>
                <Input id="max-login-attempts" type="number" defaultValue="5" />
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Integratsiyalar</CardTitle>
              <CardDescription>Tashqi servislar bilan bog'lanish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="telegram-token">Telegram Bot Token</Label>
                <Input id="telegram-token" placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz" />
                <p className="text-sm text-muted-foreground">
                  Telegram orqali bildirishnomalar uchun
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="sms-api-key">SMS API kalit</Label>
                <Input id="sms-api-key" placeholder="your-sms-api-key" />
                <p className="text-sm text-muted-foreground">
                  SMS bildirishnomalar uchun
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="payment-gateway">To'lov tizimi API</Label>
                <Input id="payment-gateway" placeholder="payment-gateway-api-key" />
                <p className="text-sm text-muted-foreground">
                  Onlayn to'lovlar uchun
                </p>
              </div>

              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Saqlash
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4 mt-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Zaxira nusxa va tiklash</CardTitle>
              <CardDescription>Ma'lumotlar bazasi zaxirasini boshqarish</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Avtomatik zaxira nusxa</Label>
                  <p className="text-sm text-muted-foreground">
                    Har kuni avtomatik zaxira yaratish
                  </p>
                </div>
                <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-time">Zaxira vaqti</Label>
                <Input id="backup-time" type="time" defaultValue="02:00" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-retention">Zaxira saqlanish muddati (kun)</Label>
                <Input id="backup-retention" type="number" defaultValue="30" />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Zaxira yaratish
                </Button>
                <Button variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Tiklash
                </Button>
              </div>

              <div className="p-4 rounded-lg bg-muted border">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Oxirgi zaxira:</span>{' '}
                  11 Noyabr 2024, 02:00
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">Hajm:</span> 256 MB
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
