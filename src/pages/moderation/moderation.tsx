// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Input } from '@/components/ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { 
//   FileCheck, 
//   Search, 
//   Eye,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   Building2,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   User
// } from 'lucide-react';
// import { ModerationDetailsModal } from '@/components/modals/ModerationDetailsModal';
// import { toast } from 'sonner';
// // import { useCompany } from '../../hooks/useCompany';


// interface StoreRequest {
//   id: string;
//   companyName: string;
//   ownerName: string;
//   phone: string;
//   email: string;
//   address: string;
//   region: string;
//   subscriptionType: 'Basic' | 'Standard' | 'Premium';
//   status: 'pending' | 'approved' | 'rejected';
//   requestedAt: string;
//   reviewedAt?: string;
//   reviewedBy?: string;
//   notes?: string;
// }

// const mockRequests: StoreRequest[] = [
//   {
//     id: '1',
//     companyName: 'TechMart Electronics',
//     ownerName: 'Aziz Karimov',
//     phone: '+998 90 123 45 67',
//     email: 'aziz@techmart.uz',
//     address: 'Amir Temur ko\'chasi 45, Yunusobod tumani',
//     region: 'Toshkent',
//     subscriptionType: 'Premium',
//     status: 'pending',
//     requestedAt: '2024-11-10T10:30:00',
//   },
//   {
//     id: '2',
//     companyName: 'Digital World',
//     ownerName: 'Nodira Sharipova',
//     phone: '+998 91 234 56 78',
//     email: 'info@digitalworld.uz',
//     address: 'Registon ko\'chasi 23, Samarqand',
//     region: 'Samarqand',
//     subscriptionType: 'Standard',
//     status: 'pending',
//     requestedAt: '2024-11-10T14:15:00',
//   },
//   {
//     id: '3',
//     companyName: 'Smart Gadgets',
//     ownerName: 'Jamshid Tursunov',
//     phone: '+998 92 345 67 89',
//     email: 'jamshid@smartgadgets.uz',
//     address: 'Alpomish ko\'chasi 12, Buxoro',
//     region: 'Buxoro',
//     subscriptionType: 'Premium',
//     status: 'approved',
//     requestedAt: '2024-11-09T09:00:00',
//     reviewedAt: '2024-11-09T15:30:00',
//     reviewedBy: 'Super Admin',
//   },
//   {
//     id: '4',
//     companyName: 'Mobile Plus',
//     ownerName: 'Malika Abdullayeva',
//     phone: '+998 93 456 78 90',
//     email: 'contact@mobileplus.uz',
//     address: 'Navoi ko\'chasi 67, Andijon',
//     region: 'Andijon',
//     subscriptionType: 'Basic',
//     status: 'rejected',
//     requestedAt: '2024-11-08T11:20:00',
//     reviewedAt: '2024-11-08T16:45:00',
//     reviewedBy: 'Admin',
//     notes: 'Noto\'liq hujjatlar taqdim etilgan',
//   },
//   {
//     id: '5',
//     companyName: 'Electro Zone',
//     ownerName: 'Sardor Rahimov',
//     phone: '+998 94 567 89 01',
//     email: 'sardor@electrozone.uz',
//     address: 'Amir Temur ko\'chasi 89, Farg\'ona',
//     region: 'Farg\'ona',
//     subscriptionType: 'Standard',
//     status: 'pending',
//     requestedAt: '2024-11-11T08:45:00',
//   },
//   {
//     id: '6',
//     companyName: 'GadgetHub Pro',
//     ownerName: 'Dilnoza Yusupova',
//     phone: '+998 95 678 90 12',
//     email: 'dilnoza@gadgethub.uz',
//     address: 'Akhunbabaev ko\'chasi 34, Namangan',
//     region: 'Namangan',
//     subscriptionType: 'Premium',
//     status: 'approved',
//     requestedAt: '2024-11-07T12:00:00',
//     reviewedAt: '2024-11-07T18:20:00',
//     reviewedBy: 'Super Admin',
//   },
// ];

// export function Moderation() {
//   const [requests, setRequests] = useState<StoreRequest[]>(mockRequests);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [viewingRequest, setViewingRequest] = useState<StoreRequest | null>(null);
// //  const { data: company, useCompanyDelete } = useCompany();
// //  console.log("Company", company?.data);
//   const filteredRequests = requests.filter(req => {
//     const matchesSearch = 
//       req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       req.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       req.email.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const handleApprove = (requestId: string) => {
//     setRequests(requests.map(r =>
//       r.id === requestId
//         ? {
//             ...r,
//             status: 'approved',
//             reviewedAt: new Date().toISOString(),
//             reviewedBy: 'Super Admin',
//           }
//         : r
//     ));
//     toast.success('So\'rov tasdiqlandi va do\'kon yaratildi');
//     setViewingRequest(null);
//   };

//   const handleReject = (requestId: string, notes: string) => {
//     setRequests(requests.map(r =>
//       r.id === requestId
//         ? {
//             ...r,
//             status: 'rejected',
//             reviewedAt: new Date().toISOString(),
//             reviewedBy: 'Super Admin',
//             notes,
//           }
//         : r
//     ));
//     toast.success('So\'rov rad etildi');
//     setViewingRequest(null);
//   };

//   const handleUpdate = (requestId: string, updatedData: Partial<StoreRequest>) => {
//     setRequests(requests.map(r =>
//       r.id === requestId ? { ...r, ...updatedData } : r
//     ));
//     toast.success('So\'rov ma\'lumotlari yangilandi');
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'pending':
//         return (
//           <Badge className="bg-orange-500/10 text-orange-500 gap-1">
//             <Clock className="w-3 h-3" />
//             Kutilmoqda
//           </Badge>
//         );
//       case 'approved':
//         return (
//           <Badge className="bg-green-500/10 text-green-500 gap-1">
//             <CheckCircle2 className="w-3 h-3" />
//             Tasdiqlangan
//           </Badge>
//         );
//       case 'rejected':
//         return (
//           <Badge className="bg-red-500/10 text-red-500 gap-1">
//             <XCircle className="w-3 h-3" />
//             Rad etilgan
//           </Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   const pendingCount = requests.filter(r => r.status === 'pending').length;
//   const approvedCount = requests.filter(r => r.status === 'approved').length;
//   const rejectedCount = requests.filter(r => r.status === 'rejected').length;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Moderatiya</h1>
//           <p className="text-muted-foreground mt-1">
//             Tadbirkorlarning do'kon ochish so'rovlarini ko'rish va boshqarish
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Kutilmoqda</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">{pendingCount}</h3>
//               <p className="text-xs text-muted-foreground mt-1">Ko'rib chiqish kerak</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
//               <Clock className="w-6 h-6 text-orange-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">{approvedCount}</h3>
//               <p className="text-xs text-muted-foreground mt-1">Faol do'konlar</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
//               <CheckCircle2 className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-red-500/10 to-rose-500/5 border-red-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Rad etilgan</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">{rejectedCount}</h3>
//               <p className="text-xs text-muted-foreground mt-1">Tasdiqlanmagan</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
//               <XCircle className="w-6 h-6 text-red-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Jami So'rovlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">{requests.length}</h3>
//               <p className="text-xs text-muted-foreground mt-1">Barcha vaqt</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
//               <FileCheck className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//             <Input
//               placeholder="So'rov qidirish (kompaniya, egasi, email)..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barcha holat</SelectItem>
//               <SelectItem value="pending">Kutilmoqda</SelectItem>
//               <SelectItem value="approved">Tasdiqlangan</SelectItem>
//               <SelectItem value="rejected">Rad etilgan</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </Card>

//       {/* Requests Table */}
//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Kompaniya</TableHead>
//               <TableHead>Egasi</TableHead>
//               <TableHead>Aloqa</TableHead>
//               <TableHead>Manzil</TableHead>
//               <TableHead>Obuna Turi</TableHead>
//               <TableHead>Holat</TableHead>
//               <TableHead>So'rov Vaqti</TableHead>
//               <TableHead className="text-right">Amallar</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredRequests.map((request) => (
//               <TableRow 
//                 key={request.id} 
//                 className={`hover:bg-muted/50 transition-colors ${
//                   request.status === 'pending' ? 'bg-orange-500/5' : ''
//                 }`}
//               >
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                       {request.companyName.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-medium text-foreground">{request.companyName}</p>
//                       <div className="flex items-center gap-1 text-xs text-muted-foreground">
//                         <MapPin className="w-3 h-3" />
//                         {request.region}
//                       </div>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4 text-muted-foreground" />
//                     <span className="text-foreground">{request.ownerName}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2 text-sm">
//                       <Phone className="w-3 h-3 text-muted-foreground" />
//                       <span className="text-muted-foreground">{request.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-sm">
//                       <Mail className="w-3 h-3 text-muted-foreground" />
//                       <span className="text-muted-foreground">{request.email}</span>
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-start gap-2 max-w-xs">
//                     <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
//                     <span className="text-sm text-muted-foreground">{request.address}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge
//                     className={
//                       request.subscriptionType === 'Premium'
//                         ? 'bg-green-500/10 text-green-500'
//                         : request.subscriptionType === 'Standard'
//                         ? 'bg-blue-500/10 text-blue-500'
//                         : 'bg-gray-500/10 text-gray-500'
//                     }
//                   >
//                     {request.subscriptionType}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   {getStatusBadge(request.status)}
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                     <Calendar className="w-3 h-3" />
//                     {new Date(request.requestedAt).toLocaleString('uz-UZ')}
//                   </div>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setViewingRequest(request)}
//                     className="gap-2 hover:bg-blue-500/10 hover:text-blue-500"
//                   >
//                     <Eye className="w-4 h-4" />
//                     Ko'rish
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>

//       {/* Details Modal */}
//       {viewingRequest && (
//         <ModerationDetailsModal
//           request={viewingRequest}
//           onClose={() => setViewingRequest(null)}
//           onApprove={handleApprove}
//           onReject={handleReject}
//           onUpdate={handleUpdate}
//         />
//       )}
//     </div>
//   );
// }
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table } from "antd";
import "antd/dist/reset.css";
import { useCompany } from "@/hooks/useCompany";

/* ================= TYPES ================= */

type Owner = {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
};

type Company = {
  id: number;
  name: string;
  owner: Owner;
  region: string;
  address: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at?: string;
};

type Stats = {
  companies_pending: number;
  companies_approved: number;
  companies_rejected: number;
};

/* ================= HELPERS ================= */

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

const getStatusLabel = (status: Company["status"]) => {
  switch (status) {
    case "approved":
      return "Tasdiqlangan";
    case "rejected":
      return "Rad etilgan";
    default:
      return "Kutilmoqda";
  }
};

const getStatusColor = (status: Company["status"]) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    default:
      return "bg-yellow-500";
  }
};

/* ================= COMPONENT ================= */

export default function Moderation() {
  const { company } = useCompany();

  const companies: Company[] = company?.data?.companies ?? [];
  const stats: Stats | undefined = company?.data?.stats;

  const isLoading = !company;

  /* ===== Stats Cards ===== */
  const statCards = [
    {
      title: "Kutilmoqda",
      value: stats?.companies_pending ?? 0,
      color: "text-yellow-500",
    },
    {
      title: "Tasdiqlangan",
      value: stats?.companies_approved ?? 0,
      color: "text-green-500",
    },
    {
      title: "Rad etilgan",
      value: stats?.companies_rejected ?? 0,
      color: "text-red-500",
    },
    {
      title: "Barcha holat",
      value:
        (stats?.companies_pending ?? 0) +
        (stats?.companies_approved ?? 0) +
        (stats?.companies_rejected ?? 0),
      color: "text-blue-500",
    },
  ];

  /* ===== Table ===== */
  const tableData = companies.map((company) => ({
    key: company.id,
    name: company.name,
    phone: company.owner?.phone_number || "N/A",
    subscription: "Standard",
    status: company.status,
    requestTime: company.updated_at || company.created_at,
  }));

  const columns = [
    {
      title: "Kompaniya nomi",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Obuna turi",
      dataIndex: "subscription",
      key: "subscription",
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: Company["status"]) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-xs ${getStatusColor(
            status
          )}`}
        >
          {getStatusLabel(status)}
        </span>
      ),
    },
    {
      title: "So‘rov vaqti",
      dataIndex: "requestTime",
      key: "requestTime",
      render: (text: string) => formatDate(text),
    },
  ];

  /* ================= RENDER ================= */

  return (
    <div className="space-y-6 p-6">
      {/* ===== Stats ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))
          : statCards.map((card, i) => (
              <Card key={i} className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-2xl font-semibold ${card.color}`}>
                    {card.value}
                  </p>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* ===== Table ===== */}
      <div className="shadow-card rounded-lg p-4 bg-white">
        {isLoading ? (
          <Skeleton className="h-[400px] w-full rounded-lg" />
        ) : tableData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-muted-foreground">
            Kompaniya maʼlumotlari mavjud emas
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={{ pageSize: 5 }}
          />
        )}
      </div>
    </div>
  );
}
