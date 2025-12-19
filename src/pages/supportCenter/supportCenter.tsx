import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  MessageSquare, 
  Search, 
  Send,
  Paperclip,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Store,
  Phone,
  Mail,
  Calendar,
  Filter,
  MoreVertical,
  X,
  Archive,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'admin' | 'store';
  message: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
}

interface Conversation {
  id: string;
  storeId: string;
  storeName: string;
  storeOwner: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'resolved' | 'pending';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'general' | 'feature';
  assignedTo?: string;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    storeId: '1',
    storeName: 'TechStore Toshkent',
    storeOwner: 'Aziz Karimov',
    lastMessage: 'Obuna to\'lovini amalga oshirishda muammo bor',
    lastMessageTime: '2024-11-12T10:30:00',
    unreadCount: 3,
    status: 'pending',
    priority: 'high',
    category: 'billing',
    assignedTo: 'Admin',
  },
  {
    id: '2',
    storeId: '2',
    storeName: 'GadgetHub Samarqand',
    storeOwner: 'Nodira Sharipova',
    lastMessage: 'Mahsulot qo\'shishda xatolik chiqyapti',
    lastMessageTime: '2024-11-12T09:15:00',
    unreadCount: 1,
    status: 'active',
    priority: 'medium',
    category: 'technical',
  },
  {
    id: '3',
    storeId: '3',
    storeName: 'MobileWorld Buxoro',
    storeOwner: 'Jamshid Tursunov',
    lastMessage: 'Rahmat, muammo hal bo\'ldi!',
    lastMessageTime: '2024-11-11T16:45:00',
    unreadCount: 0,
    status: 'resolved',
    priority: 'low',
    category: 'technical',
  },
  {
    id: '4',
    storeId: '4',
    storeName: 'SmartShop Andijon',
    storeOwner: 'Malika Abdullayeva',
    lastMessage: 'Premium obunaga o\'tish haqida ma\'lumot',
    lastMessageTime: '2024-11-11T14:20:00',
    unreadCount: 0,
    status: 'active',
    priority: 'medium',
    category: 'general',
  },
  {
    id: '5',
    storeId: '5',
    storeName: 'PhoneZone Farg\'ona',
    storeOwner: 'Sardor Rahimov',
    lastMessage: 'Barcode scanner funksiyasini qanday ishlatish mumkin?',
    lastMessageTime: '2024-11-11T11:30:00',
    unreadCount: 2,
    status: 'pending',
    priority: 'low',
    category: 'feature',
  },
];

const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      senderId: '1',
      senderName: 'Aziz Karimov',
      senderType: 'store',
      message: 'Assalomu alaykum, yordam kerak',
      timestamp: '2024-11-12T10:00:00',
      read: true,
    },
    {
      id: '2',
      senderId: 'admin',
      senderName: 'Admin',
      senderType: 'admin',
      message: 'Vaalaykum assalom! Albatta yordam beraman. Qanday muammo bor?',
      timestamp: '2024-11-12T10:02:00',
      read: true,
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Aziz Karimov',
      senderType: 'store',
      message: 'Obuna to\'lovini amalga oshirishda muammo bor. Karta raqamini kiritganimda xatolik chiqyapti.',
      timestamp: '2024-11-12T10:05:00',
      read: true,
    },
    {
      id: '4',
      senderId: 'admin',
      senderName: 'Admin',
      senderType: 'admin',
      message: 'Tushundim. Qaysi karta turini ishlatyapsiz? Visa yoki MasterCard?',
      timestamp: '2024-11-12T10:10:00',
      read: true,
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Aziz Karimov',
      senderType: 'store',
      message: 'Humo kartasini ishlatyapman. Visa kartamni ham sinab ko\'rdim, lekin natija bir xil.',
      timestamp: '2024-11-12T10:30:00',
      read: false,
    },
  ],
  '2': [
    {
      id: '1',
      senderId: '2',
      senderName: 'Nodira Sharipova',
      senderType: 'store',
      message: 'Salom, mahsulot qo\'shishda xatolik bor',
      timestamp: '2024-11-12T09:00:00',
      read: true,
    },
    {
      id: '2',
      senderId: 'admin',
      senderName: 'Admin',
      senderType: 'admin',
      message: 'Salom! Qanday xatolik chiqyapti?',
      timestamp: '2024-11-12T09:05:00',
      read: true,
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Nodira Sharipova',
      senderType: 'store',
      message: 'Mahsulot rasmini yuklashda "File size too large" deb chiqyapti',
      timestamp: '2024-11-12T09:15:00',
      read: false,
    },
  ],
};

export default function SupportCenter() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.storeOwner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || conv.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || conv.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedConversation(conv);
    setMessages(mockMessages[conv.id] || []);
    
    // Mark as read
    setConversations(conversations.map(c =>
      c.id === conv.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'admin',
      senderName: 'Admin',
      senderType: 'admin',
      message: messageText,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, newMessage]);
    
    // Update conversation
    setConversations(conversations.map(c =>
      c.id === selectedConversation.id
        ? { ...c, lastMessage: messageText, lastMessageTime: new Date().toISOString() }
        : c
    ));

    setMessageText('');
    toast.success('Xabar yuborildi');
  };

  const handleChangeStatus = (status: 'active' | 'resolved' | 'pending') => {
    if (!selectedConversation) return;

    setConversations(conversations.map(c =>
      c.id === selectedConversation.id ? { ...c, status } : c
    ));
    setSelectedConversation({ ...selectedConversation, status });
    toast.success('Status yangilandi');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500/10 text-red-500">Yuqori</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500/10 text-orange-500">O'rta</Badge>;
      case 'low':
        return <Badge className="bg-blue-500/10 text-blue-500">Past</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 gap-1"><CheckCircle2 className="w-3 h-3" />Faol</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500/10 text-orange-500 gap-1"><Clock className="w-3 h-3" />Kutilmoqda</Badge>;
      case 'resolved':
        return <Badge className="bg-gray-500/10 text-gray-500 gap-1"><Archive className="w-3 h-3" />Yechilgan</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'billing':
        return <Clock className="w-4 h-4 text-orange-500" />;
      case 'general':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'feature':
        return <Star className="w-4 h-4 text-purple-500" />;
    }
  };

  const totalUnread = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);
  const activeCases = conversations.filter(c => c.status === 'active').length;
  const pendingCases = conversations.filter(c => c.status === 'pending').length;
  const resolvedToday = conversations.filter(c => 
    c.status === 'resolved' && 
    new Date(c.lastMessageTime).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chat / Support Markazi</h1>
          <p className="text-muted-foreground mt-1">
            Do'konlar bilan real-time suhbatlar va support boshqaruvi
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">O'qilmagan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{totalUnread}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faol Murojaat</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{activeCases}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Kutilmoqda</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{pendingCases}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bugun Yechilgan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">{resolvedToday}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Archive className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-400px)]">
        {/* Conversations List */}
        <Card className="flex flex-col">
          {/* Search & Filters */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Qidiruv..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="flex-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha</SelectItem>
                  <SelectItem value="active">Faol</SelectItem>
                  <SelectItem value="pending">Kutilmoqda</SelectItem>
                  <SelectItem value="resolved">Yechilgan</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="flex-1 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Barcha</SelectItem>
                  <SelectItem value="high">Yuqori</SelectItem>
                  <SelectItem value="medium">O'rta</SelectItem>
                  <SelectItem value="low">Past</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleSelectConversation(conv)}
                className={`p-4 border-b border-border cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                  selectedConversation?.id === conv.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {conv.storeName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm truncate">{conv.storeName}</h4>
                        <p className="text-xs text-muted-foreground">{conv.storeOwner}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0">
                          {conv.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-2">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(conv.category)}
                        {getPriorityBadge(conv.priority)}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.lastMessageTime).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {selectedConversation.storeName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{selectedConversation.storeName}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        {selectedConversation.storeOwner}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedConversation.status)}
                    {getPriorityBadge(selectedConversation.priority)}
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus('active')}
                    className="text-xs"
                  >
                    Faol
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus('pending')}
                    className="text-xs"
                  >
                    Kutilmoqda
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleChangeStatus('resolved')}
                    className="text-xs"
                  >
                    Yechish
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.senderType === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.senderType === 'admin' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">{msg.senderName}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          msg.senderType === 'admin'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Xabar yozing..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="gap-2 flex-shrink-0">
                    <Send className="w-4 h-4" />
                    Yuborish
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Suhbatni tanlang</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
