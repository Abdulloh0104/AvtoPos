import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Send, 
  Plus, 
  Search, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Eye,
  Users,
  Mail,
  Smartphone,
  Bell
} from 'lucide-react';
import { SendBroadcastModal } from '@/components/modals/SendBroadcastModal';
import { toast } from 'sonner';

interface BroadcastMessage {
  id: string;
  title: string;
  content: string;
  type: 'push' | 'sms' | 'email' | 'all';
  segment: string;
  recipientCount: number;
  sentCount: number;
  readCount: number;
  status: 'sent' | 'scheduled' | 'draft';
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

const mockMessages: BroadcastMessage[] = [
  {
    id: '1',
    title: 'Yangi Funksiyalar E\'lon Qilindi',
    content: 'Sizning POS tizimingizga yangi funksiyalar qo\'shildi. Hoziroq ko\'rib chiqing!',
    type: 'all',
    segment: 'Barcha do\'konlar',
    recipientCount: 150,
    sentCount: 150,
    readCount: 127,
    status: 'sent',
    sentAt: '2024-11-10T10:00:00',
    createdAt: '2024-11-10T09:30:00',
  },
  {
    id: '2',
    title: 'Obuna Yangilanishi Kerak',
    content: 'Sizning obunangiz 7 kundan keyin tugaydi. Iltimos, obunani yangilang.',
    type: 'email',
    segment: 'Obuna tugashi yaqin do\'konlar',
    recipientCount: 23,
    sentCount: 23,
    readCount: 18,
    status: 'sent',
    sentAt: '2024-11-09T15:00:00',
    createdAt: '2024-11-09T14:30:00',
  },
  {
    id: '3',
    title: 'Tizim Yangilanishi',
    content: 'Ertaga tizim yangilanadi. Tizim 2 soat ishlamaydi.',
    type: 'push',
    segment: 'Barcha faol do\'konlar',
    recipientCount: 145,
    sentCount: 0,
    readCount: 0,
    status: 'scheduled',
    scheduledAt: '2024-11-12T02:00:00',
    createdAt: '2024-11-11T10:00:00',
  },
  {
    id: '4',
    title: 'Yangi Mahsulotlar Kutubxonasi',
    content: 'Global mahsulotlar kutubxonasiga 500+ yangi mahsulotlar qo\'shildi.',
    type: 'sms',
    segment: 'Toshkent mintaqasi',
    recipientCount: 45,
    sentCount: 45,
    readCount: 32,
    status: 'sent',
    sentAt: '2024-11-08T12:00:00',
    createdAt: '2024-11-08T11:30:00',
  },
];

const SEGMENTS = [
  { value: 'all', label: 'Barcha do\'konlar' },
  { value: 'active', label: 'Faol do\'konlar' },
  { value: 'inactive', label: 'Nofaol do\'konlar' },
  { value: 'subscription_ending', label: 'Obuna tugashi yaqin' },
  { value: 'tashkent', label: 'Toshkent mintaqasi' },
  { value: 'samarkand', label: 'Samarqand mintaqasi' },
  { value: 'bukhara', label: 'Buxoro mintaqasi' },
  { value: 'new_stores', label: 'Yangi do\'konlar' },
];

export default function BroadcastMessages() {
  const [messages, setMessages] = useState<BroadcastMessage[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSendModal, setShowSendModal] = useState(false);

  const filteredMessages = messages.filter(msg =>
    msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (messageData: any) => {
    const newMessage: BroadcastMessage = {
      id: Date.now().toString(),
      title: messageData.title,
      content: messageData.content,
      type: messageData.type,
      segment: messageData.segment,
      recipientCount: messageData.recipientCount,
      sentCount: messageData.scheduledAt ? 0 : messageData.recipientCount,
      readCount: 0,
      status: messageData.scheduledAt ? 'scheduled' : 'sent',
      scheduledAt: messageData.scheduledAt,
      sentAt: messageData.scheduledAt ? undefined : new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setMessages([newMessage, ...messages]);
    toast.success(messageData.scheduledAt ? 'Xabar rejalashtirildi' : 'Xabar yuborildi');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'push':
        return <Bell className="w-4 h-4" />;
      case 'sms':
        return <Smartphone className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      default:
        return <Send className="w-4 h-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      push: 'bg-blue-500/10 text-blue-500',
      sms: 'bg-green-500/10 text-green-500',
      email: 'bg-purple-500/10 text-purple-500',
      all: 'bg-orange-500/10 text-orange-500',
    };
    const labels = {
      push: 'Push',
      sms: 'SMS',
      email: 'Email',
      all: 'Hammasi',
    };
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {getTypeIcon(type)}
        <span className="ml-1">{labels[type as keyof typeof labels]}</span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge className="bg-green-500/10 text-green-500">Yuborildi</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/10 text-blue-500">Rejalashtirilgan</Badge>;
      case 'draft':
        return <Badge className="bg-gray-500/10 text-gray-500">Qoralama</Badge>;
      default:
        return null;
    }
  };

  const totalSent = messages.reduce((sum, m) => sum + m.sentCount, 0);
  const totalRead = messages.reduce((sum, m) => sum + m.readCount, 0);
  const scheduledCount = messages.filter(m => m.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Broadcast Xabarlar</h1>
          <p className="text-muted-foreground mt-1">
            Barcha foydalanuvchilarga yoki segmentlarga xabar yuborish
          </p>
        </div>
        <Button onClick={() => setShowSendModal(true)} className="gap-2">
          <Send className="w-4 h-4" />
          Yangi Xabar Yuborish
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami Xabarlar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{messages.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Yuborilgan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{totalSent}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">O'qilgan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{totalRead}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejalashtirilgan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{scheduledCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Xabar qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Messages Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sarlavha</TableHead>
              <TableHead>Turi</TableHead>
              <TableHead>Segment</TableHead>
              <TableHead>Qabul Qiluvchilar</TableHead>
              <TableHead>O'qilgan</TableHead>
              <TableHead>Holat</TableHead>
              <TableHead>Yuborilgan Vaqt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id} className="hover:bg-muted/50 transition-colors">
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{message.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {message.content}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {getTypeBadge(message.type)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {message.segment}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">
                      {message.sentCount}/{message.recipientCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{message.readCount}</span>
                    <span className="text-xs text-muted-foreground">
                      ({message.sentCount > 0 ? Math.round((message.readCount / message.sentCount) * 100) : 0}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(message.status)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {message.status === 'scheduled' && message.scheduledAt ? (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {new Date(message.scheduledAt).toLocaleString('uz-UZ')}
                    </div>
                  ) : message.sentAt ? (
                    new Date(message.sentAt).toLocaleString('uz-UZ')
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Send Modal */}
      {showSendModal && (
        <SendBroadcastModal
          onClose={() => setShowSendModal(false)}
          onSend={handleSendMessage}
          segments={SEGMENTS}
        />
      )}
    </div>
  );
}
