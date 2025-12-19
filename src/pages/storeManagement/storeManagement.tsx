// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Store as StoreIcon,
//   Plus,
//   Search,
//   MapPin,
//   Phone,
//   Edit,
//   Eye,
//   Ban,
//   Users,
//   Package,
//   TrendingUp,
//   Warehouse,
//   DollarSign,
//   Calendar,
//   LayoutGrid,
//   List,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AddStoreModal } from "@/components/modals/AddStoreModal";
// import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
// import { toast } from "sonner";
// import { useCompany } from "@/hooks/useCompany";

// const mockStores = [
//   {
//     id: "1",
//     name: "TechStore Toshkent",
//     address: "Mustaqillik ko'chasi 45, Yunusobod tumani",
//     region: "Toshkent",
//     contact: "+998 90 123 45 67",
//     subscriptionType: "Premium",
//     status: "active",
//     createdAt: "2024-01-15",
//   },
//   {
//     id: "2",
//     name: "GadgetHub Samarqand",
//     address: "Registon ko'chasi 12, Samarqand",
//     region: "Samarqand",
//     contact: "+998 91 234 56 78",
//     subscriptionType: "Standard",
//     status: "active",
//     createdAt: "2024-02-20",
//   },
//   {
//     id: "3",
//     name: "MobileWorld Buxoro",
//     address: "Alpomish ko'chasi 8, Buxoro",
//     region: "Buxoro",
//     contact: "+998 92 345 67 89",
//     subscriptionType: "Premium",
//     status: "active",
//     createdAt: "2024-01-28",
//   },
//   {
//     id: "4",
//     name: "SmartShop Andijon",
//     address: "Navoi ko'chasi 23, Andijon",
//     region: "Andijon",
//     contact: "+998 93 456 78 90",
//     subscriptionType: "Basic",
//     status: "inactive",
//     createdAt: "2024-03-10",
//   },
//   {
//     id: "5",
//     name: "PhoneZone Farg'ona",
//     address: "Amir Temur ko'chasi 67, Farg'ona",
//     region: "Farg'ona",
//     contact: "+998 94 567 89 01",
//     subscriptionType: "Standard",
//     status: "active",
//     createdAt: "2024-02-05",
//   },
//   {
//     id: "6",
//     name: "ElectroMarket Namangan",
//     address: "Akhunbabaev ko'chasi 34, Namangan",
//     region: "Namangan",
//     contact: "+998 95 678 90 12",
//     subscriptionType: "Premium",
//     status: "suspended",
//     createdAt: "2024-01-20",
//   },
// ];

// export default function StoreManagement() {
//   const [stores, setStores] = useState(mockStores);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [regionFilter, setRegionFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [suspendingStore, setSuspendingStore] = useState<
//     (typeof mockStores)[0] | null
//   >(null);
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
//   const navigate = useNavigate();
//   const { companiesList } = useCompany();
//   console.log("companiesList",companiesList.data);
//   const filteredStores = stores.filter((store) => {
//     const matchesSearch =
//       store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       store.address.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesRegion =
//       regionFilter === "all" || store.region === regionFilter;
//     const matchesStatus =
//       statusFilter === "all" || store.status === statusFilter;
//     return matchesSearch && matchesRegion && matchesStatus;
//   });

//   const handleAddStore = (storeData: any) => {
//     const newStore = {
//       id: Date.now().toString(),
//       ...storeData,
//       createdAt: new Date().toISOString(),
//     };
//     setStores([...stores, newStore]);
//     toast.success("Do'kon muvaffaqiyatli qo'shildi");
//   };

//   const handleSuspendStore = () => {
//     if (suspendingStore) {
//       setStores(
//         stores.map((s) =>
//           s.id === suspendingStore.id
//             ? {
//                 ...s,
//                 status: s.status === "suspended" ? "active" : "suspended",
//               }
//             : s
//         )
//       );
//       toast.success(
//         suspendingStore.status === "suspended"
//           ? "Do'kon faollashtirildi"
//           : "Do'kon to'xtatildi"
//       );
//       setSuspendingStore(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">
//             Do'konlarni Boshqarish
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Barcha ro'yxatdan o'tgan do'konlar va ularning faoliyatini
//             boshqarish
//           </p>
//         </div>
//         <Button onClick={() => setShowAddModal(true)} className="gap-2">
//           <Plus className="w-4 h-4" />
//           Yangi Do'kon
//         </Button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="p-6 hover:shadow-lg transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Jami Do'konlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {stores.length}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
//               <StoreIcon className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Faol Do'konlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {stores.filter((s) => s.status === "active").length}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Premium Obunalar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {stores.filter((s) => s.subscriptionType === "Premium").length}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
//               <DollarSign className="w-6 h-6 text-purple-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">To'xtatilgan</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {stores.filter((s) => s.status === "suspended").length}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
//               <Ban className="w-6 h-6 text-red-500" />
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
//               placeholder="Do'kon qidirish..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//           <Select value={regionFilter} onValueChange={setRegionFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barcha mintaqalar</SelectItem>
//               <SelectItem value="Toshkent">Toshkent</SelectItem>
//               <SelectItem value="Samarqand">Samarqand</SelectItem>
//               <SelectItem value="Buxoro">Buxoro</SelectItem>
//               <SelectItem value="Andijon">Andijon</SelectItem>
//             </SelectContent>
//           </Select>
//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-full md:w-[200px]">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barcha holat</SelectItem>
//               <SelectItem value="active">Faol</SelectItem>
//               <SelectItem value="inactive">Nofaol</SelectItem>
//               <SelectItem value="suspended">To'xtatilgan</SelectItem>
//             </SelectContent>
//           </Select>
//           <div className="flex gap-2">
//             <Button
//               variant={viewMode === "grid" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("grid")}
//             >
//               <LayoutGrid className="w-4 h-4" />
//             </Button>
//             <Button
//               variant={viewMode === "list" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("list")}
//             >
//               <List className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Stores Display */}
//       {viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredStores.map((store) => (
//             <Card
//               key={store.id}
//               className="hover:shadow-xl transition-all duration-300 overflow-hidden group"
//             >
//               {/* Card Header */}
//               <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-xl">
//                       {store.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-lg">{store.name}</h3>
//                       <div className="flex items-center gap-1 text-white/80 text-xs">
//                         <MapPin className="w-3 h-3" />
//                         {store.region}
//                       </div>
//                     </div>
//                   </div>
//                   <Badge
//                     className={
//                       store.status === "active"
//                         ? "bg-green-500 text-white"
//                         : store.status === "inactive"
//                         ? "bg-gray-500 text-white"
//                         : "bg-red-500 text-white"
//                     }
//                   >
//                     {store.status === "active"
//                       ? "Faol"
//                       : store.status === "inactive"
//                       ? "Nofaol"
//                       : "To'xtatilgan"}
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2 text-white/90 text-sm">
//                   <Phone className="w-4 h-4" />
//                   {store.contact}
//                 </div>
//               </div>

//               {/* Card Body */}
//               <div className="p-6 space-y-4">
//                 {/* Address */}
//                 <div className="flex items-start gap-2 text-muted-foreground text-sm">
//                   <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                   <span>{store.address}</span>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="grid grid-cols-2 gap-3">
//                   <div className="bg-blue-500/5 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-blue-500 mb-1">
//                       <Users className="w-4 h-4" />
//                       <span className="text-xs font-medium">Xodimlar</span>
//                     </div>
//                     <p className="text-2xl font-bold text-foreground">12</p>
//                   </div>

//                   <div className="bg-green-500/5 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-green-500 mb-1">
//                       <Package className="w-4 h-4" />
//                       <span className="text-xs font-medium">Mahsulotlar</span>
//                     </div>
//                     <p className="text-2xl font-bold text-foreground">458</p>
//                   </div>

//                   <div className="bg-purple-500/5 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-purple-500 mb-1">
//                       <Warehouse className="w-4 h-4" />
//                       <span className="text-xs font-medium">Omborlar</span>
//                     </div>
//                     <p className="text-2xl font-bold text-foreground">3</p>
//                   </div>

//                   <div className="bg-orange-500/5 rounded-lg p-3">
//                     <div className="flex items-center gap-2 text-orange-500 mb-1">
//                       <DollarSign className="w-4 h-4" />
//                       <span className="text-xs font-medium">Savdo</span>
//                     </div>
//                     <p className="text-2xl font-bold text-foreground">₸2.5M</p>
//                   </div>
//                 </div>

//                 {/* Subscription & Date */}
//                 <div className="flex items-center justify-between pt-3 border-t border-border">
//                   <div>
//                     <p className="text-xs text-muted-foreground mb-1">Obuna</p>
//                     <Badge
//                       className={
//                         store.subscriptionType === "Premium"
//                           ? "bg-green-500/10 text-green-500"
//                           : store.subscriptionType === "Standard"
//                           ? "bg-blue-500/10 text-blue-500"
//                           : "bg-gray-500/10 text-gray-500"
//                       }
//                     >
//                       {store.subscriptionType}
//                     </Badge>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-muted-foreground mb-1">
//                       Yaratilgan
//                     </p>
//                     <div className="flex items-center gap-1 text-xs text-foreground">
//                       <Calendar className="w-3 h-3" />
//                       {new Date(store.createdAt).toLocaleDateString("uz-UZ")}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2 pt-2">
//                   <Button
//                     variant="outline"
//                     className="flex-1 gap-2 hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500"
//                     onClick={() => navigate(`/stores/${store.id}`)}
//                   >
//                     <Eye className="w-4 h-4" />
//                     Batafsil
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="hover:bg-green-500/10 hover:text-green-500 hover:border-green-500"
//                     onClick={() => toast.success("Tahrirlash funksiyasi")}
//                   >
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
//                     onClick={() => setSuspendingStore(store)}
//                   >
//                     <Ban className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </div>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <Card>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-border">
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Do'kon
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Manzil
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Telefon
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Xodimlar
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Mahsulotlar
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Obuna
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-muted-foreground">
//                     Holat
//                   </th>
//                   <th className="text-right p-4 text-sm font-medium text-muted-foreground">
//                     Amallar
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStores.map((store) => (
//                   <tr
//                     key={store.id}
//                     className="border-b border-border hover:bg-muted/50 transition-colors"
//                   >
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
//                           {store.name.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-medium text-foreground">
//                             {store.name}
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             {store.region}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2 text-muted-foreground text-sm">
//                         <MapPin className="w-4 h-4" />
//                         {store.address}
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2 text-muted-foreground text-sm">
//                         <Phone className="w-4 h-4" />
//                         {store.contact}
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <Users className="w-4 h-4 text-blue-500" />
//                         <span className="font-medium text-foreground">12</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <Package className="w-4 h-4 text-green-500" />
//                         <span className="font-medium text-foreground">458</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <Badge
//                         className={
//                           store.subscriptionType === "Premium"
//                             ? "bg-green-500/10 text-green-500"
//                             : store.subscriptionType === "Standard"
//                             ? "bg-blue-500/10 text-blue-500"
//                             : "bg-gray-500/10 text-gray-500"
//                         }
//                       >
//                         {store.subscriptionType}
//                       </Badge>
//                     </td>
//                     <td className="p-4">
//                       <Badge
//                         className={
//                           store.status === "active"
//                             ? "bg-green-500/10 text-green-500"
//                             : store.status === "inactive"
//                             ? "bg-gray-500/10 text-gray-500"
//                             : "bg-red-500/10 text-red-500"
//                         }
//                       >
//                         {store.status === "active"
//                           ? "Faol"
//                           : store.status === "inactive"
//                           ? "Nofaol"
//                           : "To'xtatilgan"}
//                       </Badge>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => navigate(`/stores/${store.id}`)}
//                           className="hover:bg-blue-500/10 hover:text-blue-500"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => toast.success("Tahrirlash funksiyasi")}
//                           className="hover:bg-green-500/10 hover:text-green-500"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => setSuspendingStore(store)}
//                           className="hover:bg-red-500/10 hover:text-red-500"
//                         >
//                           <Ban className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {/* Modals */}
//       {showAddModal && (
//         <AddStoreModal
//           onClose={() => setShowAddModal(false)}
//           onSave={handleAddStore}
//         />
//       )}

//       {suspendingStore && (
//         <ConfirmDialog
//           title={
//             suspendingStore.status === "suspended"
//               ? "Do'konni faollashtirish"
//               : "Do'konni to'xtatish"
//           }
//           description={
//             suspendingStore.status === "suspended"
//               ? `"${suspendingStore.name}" do'konini faollashtirmoqchimisiz?`
//               : `"${suspendingStore.name}" do'konini to'xtatmoqchimisiz? Foydalanuvchilar tizimga kira olmaydi.`
//           }
//           onConfirm={handleSuspendStore}
//           onCancel={() => setSuspendingStore(null)}
//         />
//       )}
//     </div>
//   );
// }
// ====================================================================================================================
// ====================================================================================================================
// ====================================================================================================================
// import { useMemo, useState } from "react";
// import { Search, Grid, List } from "lucide-react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { useCompany } from "@/hooks/useCompany";

// type ViewMode = "grid" | "list";
// type StatusFilter = "all" | "active" | "inactive";

// export default function StoreManagement() {
//   const { companiesList } = useCompany();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");
//   const [regionFilter, setRegionFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

//   /* =======================
//      BACKEND DATA
//   ======================= */
//   const apiCompanies = companiesList?.data?.companies?.results ?? [];

//   const stats = companiesList?.data?.stats;

//   /* =======================
//      UI GA MOS DATA
//   ======================= */
//   const stores = useMemo(() => {
//     return apiCompanies.map((company: any) => ({
//       id: company.id.toString(),
//       name: company.name,
//       address: company.address,
//       region: company.region,
//       contact: company.owner_phone,
//       subscriptionType: "Standard",
//       status: company.is_active ? "active" : "inactive",
//       createdAt: company.created_at,

//       employees_count: company.employees_count,
//       products_count: company.products_count,
//       warehouses_count: company.warehouses_count,
//       today_sales_sum: company.today_sales_sum,
//     }));
//   }, [apiCompanies]);

//   /* =======================
//      FILTER
//   ======================= */
//   const filteredStores = stores.filter((store) => {
//     const matchesSearch =
//       store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       store.address.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesRegion =
//       regionFilter === "all" || store.region === regionFilter;

//     const matchesStatus =
//       statusFilter === "all" || store.status === statusFilter;

//     return matchesSearch && matchesRegion && matchesStatus;
//   });

//   /* =======================
//      STATUS BADGE
//   ======================= */
//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "active":
//         return <Badge className="bg-green-500">Faol</Badge>;
//       case "inactive":
//         return <Badge variant="secondary">Nofaol</Badge>;
//       default:
//         return <Badge>—</Badge>;
//     }
//   };

//   /* =======================
//      RENDER
//   ======================= */
//   return (
//     <div className="space-y-6">
//       {/* ===== HEADER ===== */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Do‘konlar</h1>
//       </div>

//       {/* ===== STATS ===== */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Jami</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats?.total_companies ?? 0}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Faol</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats?.active_companies ?? 0}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Tasdiqlangan</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats?.approved ?? 0}</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Rad etilgan</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">{stats?.rejected ?? 0}</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ===== FILTERS ===== */}
//       <div className="flex flex-wrap gap-4 items-center">
//         <div className="relative flex-1 min-w-[240px]">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input
//             placeholder="Qidirish..."
//             className="pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <Select value={regionFilter} onValueChange={setRegionFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Hudud" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">Barchasi</SelectItem>
//             <SelectItem value="toshkent">Toshkent</SelectItem>
//             <SelectItem value="samarqand">Samarqand</SelectItem>
//             <SelectItem value="buxoro">Buxoro</SelectItem>
//             <SelectItem value="navoiy">Navoiy</SelectItem>
//           </SelectContent>
//         </Select>

//         <Select
//           value={statusFilter}
//           onValueChange={(v) => setStatusFilter(v as StatusFilter)}
//         >
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Holat" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">Barchasi</SelectItem>
//             <SelectItem value="active">Faol</SelectItem>
//             <SelectItem value="inactive">Nofaol</SelectItem>
//           </SelectContent>
//         </Select>

//         <div className="flex gap-2">
//           <Button
//             variant={viewMode === "grid" ? "default" : "outline"}
//             size="icon"
//             onClick={() => setViewMode("grid")}
//           >
//             <Grid className="h-4 w-4" />
//           </Button>
//           <Button
//             variant={viewMode === "list" ? "default" : "outline"}
//             size="icon"
//             onClick={() => setViewMode("list")}
//           >
//             <List className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* ===== LIST / GRID ===== */}
//       <div
//         className={
//           viewMode === "grid"
//             ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             : "space-y-4"
//         }
//       >
//         {filteredStores.map((store) => (
//           <Card key={store.id}>
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle>{store.name}</CardTitle>
//                   <p className="text-sm text-muted-foreground">
//                     {store.address}
//                   </p>
//                 </div>
//                 {getStatusBadge(store.status)}
//               </div>
//             </CardHeader>

//             <CardContent className="space-y-3">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-muted-foreground">Hudud</p>
//                   <p>{store.region}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Telefon</p>
//                   <p>{store.contact}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">Obuna</p>
//                   <p>{store.subscriptionType}</p>
//                 </div>
//                 <div>
//                   <p className="text-muted-foreground">So‘rov vaqti</p>
//                   <p>{new Date(store.createdAt).toLocaleDateString("uz-UZ")}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-4 gap-2 text-center text-sm">
//                 <div>
//                   <p className="font-bold">{store.employees_count}</p>
//                   <p className="text-muted-foreground">Xodim</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">{store.products_count}</p>
//                   <p className="text-muted-foreground">Mahsulot</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">{store.warehouses_count}</p>
//                   <p className="text-muted-foreground">Ombor</p>
//                 </div>
//                 <div>
//                   <p className="font-bold">{store.today_sales_sum}</p>
//                   <p className="text-muted-foreground">Savdo</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
//==============================================================================================================
//==============================================================================================================
//==============================================================================================================
// src/pages/storeManagement/storeManagement.tsx
// ⚠️ UI 100% SAQLANADI, faqat mock data o'rniga BACKEND ulanadi
// import { useMemo, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Store as StoreIcon,
//   Plus,
//   Search,
//   MapPin,
//   Phone,
//   Edit,
//   Eye,
//   Ban,
//   Users,
//   Package,
//   TrendingUp,
//   Warehouse,
//   DollarSign,
//   Calendar,
//   LayoutGrid,
//   List,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { AddStoreModal } from "@/components/modals/AddStoreModal";
// import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
// import { toast } from "sonner";
// import { useCompany } from "@/hooks/useCompany";

// type ViewMode = "grid" | "list";
// type StoreStatus = "active" | "inactive" | "suspended";

// export default function StoreManagement() {
//   const navigate = useNavigate();
//   const { companiesList } = useCompany();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [regionFilter, setRegionFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [suspendingStore, setSuspendingStore] = useState<any>(null);

//   /* ================= BACKEND ================= */
//   const apiCompanies = companiesList?.data?.companies?.results ?? [];
//   const stats = companiesList?.data?.stats;

//   /* ============ BACKEND → OLD UI ============= */
//   const stores = useMemo(() => {
//     return apiCompanies.map((c: any) => ({
//       id: c.id.toString(),
//       name: c.name,
//       address: c.address,
//       region: c.region,
//       contact: c.owner_phone,
//       subscriptionType: c.subscription_type ?? "Standard",
//       status: c.is_active ? "active" : "inactive",
//       createdAt: c.created_at,
//       employees: c.employees_count ?? 0,
//       products: c.products_count ?? 0,
//       warehouses: c.warehouses_count ?? 0,
//       sales: c.today_sales_sum ?? 0,
//     }));
//   }, [apiCompanies]);

//   /* ================= FILTER ================= */
//   const filteredStores = stores.filter((s) => {
//     const search =
//       s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       s.address.toLowerCase().includes(searchQuery.toLowerCase());

//     const region = regionFilter === "all" || s.region === regionFilter;

//     const status = statusFilter === "all" || s.status === statusFilter;

//     return search && region && status;
//   });

//   /* ================= ACTION ================= */
//   const handleSuspendStore = () => {
//     toast.success("Do‘kon holati o‘zgartirildi");
//     setSuspendingStore(null);
//   };

//   /* ================= RENDER ================= */
//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Do‘konlarni boshqarish</h1>
//           <p className="text-muted-foreground">
//             Barcha do‘konlar va ularning faoliyati
//           </p>
//         </div>
//         <Button onClick={() => setShowAddModal(true)} className="gap-2">
//           <Plus className="w-4 h-4" />
//           Yangi do‘kon
//         </Button>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard
//           title="Jami"
//           value={stats?.total_companies ?? stores.length}
//           color="blue"
//           icon={StoreIcon}
//         />
//         <StatCard
//           title="Faol"
//           value={
//             stats?.active_companies ??
//             stores.filter((s) => s.status === "active").length
//           }
//           color="green"
//           icon={TrendingUp}
//         />
//         <StatCard
//           title="Premium"
//           value={stores.filter((s) => s.subscriptionType === "Premium").length}
//           color="purple"
//           icon={DollarSign}
//         />
//         <StatCard
//           title="To‘xtatilgan"
//           value={stores.filter((s) => s.status === "suspended").length}
//           color="red"
//           icon={Ban}
//         />
//       </div>

//       {/* FILTERS */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
//             <Input
//               placeholder="Qidirish..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10"
//             />
//           </div>

//           <Select value={regionFilter} onValueChange={setRegionFilter}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Hudud" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barchasi</SelectItem>
//               {[...new Set(stores.map((s) => s.region))].map((r) => (
//                 <SelectItem key={r} value={r}>
//                   {r}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>

//           <Select value={statusFilter} onValueChange={setStatusFilter}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Holat" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barchasi</SelectItem>
//               <SelectItem value="active">Faol</SelectItem>
//               <SelectItem value="inactive">Nofaol</SelectItem>
//               <SelectItem value="suspended">To‘xtatilgan</SelectItem>
//             </SelectContent>
//           </Select>

//           <div className="flex gap-2">
//             <Button
//               size="icon"
//               variant={viewMode === "grid" ? "default" : "outline"}
//               onClick={() => setViewMode("grid")}
//             >
//               <LayoutGrid />
//             </Button>
//             <Button
//               size="icon"
//               variant={viewMode === "list" ? "default" : "outline"}
//               onClick={() => setViewMode("list")}
//             >
//               <List />
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredStores.map((store) => (
//           <Card key={store.id} className="overflow-hidden">
//             <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
//               <h3 className="font-bold text-lg">{store.name}</h3>
//               <p className="text-sm opacity-80">{store.region}</p>
//             </div>

//             <div className="p-6 space-y-3">
//               <div className="flex gap-2 text-sm">
//                 <MapPin /> {store.address}
//               </div>
//               <div className="flex gap-2 text-sm">
//                 <Phone /> {store.contact}
//               </div>

//               <div className="grid grid-cols-4 gap-2 text-center">
//                 <Stat icon={Users} value={store.employees} />
//                 <Stat icon={Package} value={store.products} />
//                 <Stat icon={Warehouse} value={store.warehouses} />
//                 <Stat icon={DollarSign} value={store.sales} />
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   className="flex-1"
//                   variant="outline"
//                   onClick={() => navigate(`/stores/${store.id}`)}
//                 >
//                   <Eye />
//                 </Button>
//                 <Button variant="outline">
//                   <Edit />
//                 </Button>
//                 <Button
//                   variant="outline"
//                   onClick={() => setSuspendingStore(store)}
//                 >
//                   <Ban />
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {showAddModal && (
//         <AddStoreModal
//           onClose={() => setShowAddModal(false)}
//           onSave={() => toast.success("Qo‘shildi")}
//         />
//       )}
//       {suspendingStore && (
//         <ConfirmDialog
//           title="Tasdiqlash"
//           description="Holat o‘zgartirilsinmi?"
//           onConfirm={handleSuspendStore}
//           onCancel={() => setSuspendingStore(null)}
//         />
//       )}
//     </div>
//   );
// }

// /* ================== HELPERS ================== */

// function Stat({ icon: Icon, value }: any) {
//   return (
//     <div>
//       <Icon className="mx-auto mb-1 w-4 h-4" />
//       <p className="font-bold">{value}</p>
//     </div>
//   );
// }

// function StatCard({ title, value, icon: Icon, color }: any) {
//   const colors: any = {
//     blue: "bg-blue-500/10 text-blue-500",
//     green: "bg-green-500/10 text-green-500",
//     purple: "bg-purple-500/10 text-purple-500",
//     red: "bg-red-500/10 text-red-500",
//   };

//   return (
//     <Card className="p-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="text-sm text-muted-foreground">{title}</p>
//           <h3 className="text-3xl font-bold">{value}</h3>
//         </div>
//         <div
//           className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}
//         >
//           <Icon />
//         </div>
//       </div>
//     </Card>
//   );
// }

// ==================================================================================================
// ==================================================================================================
// ==================================================================================================
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store as StoreIcon,
  Plus,
  Search,
  MapPin,
  Phone,
  Edit,
  Eye,
  Ban,
  Users,
  Package,
  TrendingUp,
  Warehouse,
  DollarSign,
  Calendar,
  LayoutGrid,
  List,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddStoreModal } from "@/components/modals/AddStoreModal";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import { toast } from "sonner";
import { useCompany } from "@/hooks/useCompany";

export default function CompanyManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [suspendingCompany, setSuspendingCompany] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const navigate = useNavigate();
  const { companiesList } = useCompany();

  if (!companiesList?.data) return null; // Loading yoki fallback

  const companies = companiesList?.data?.companies?.results;

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company?.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      regionFilter === "all" || company.region === regionFilter;
    const matchesStatus =
      statusFilter === "all" ||
      company.is_active === (statusFilter === "active");
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const handleSuspendCompany = () => {
    if (suspendingCompany) {
      toast.success(
        suspendingCompany?.is_active
          ? "Kompaniya to‘xtatildi"
          : "Kompaniya faollashtirildi"
      );
      setSuspendingCompany(null);
    }
  };

  /* ===== Stats Card ===== */
  const stats = companiesList?.data?.stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Kompaniyalarni Boshqarish
          </h1>
          <p className="text-muted-foreground mt-1">
            Barcha ro‘yxatdan o‘tgan kompaniyalar va ularning faoliyatini
            boshqarish
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Yangi Kompaniya
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami kompaniyalar</p>
              <h3 className="text-3xl font-bold mt-1">
                {stats.total_companies}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <StoreIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faol kompaniyalar</p>
              <h3 className="text-3xl font-bold mt-1">
                {stats.active_companies}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
              <h3 className="text-3xl font-bold mt-1">{stats.approved}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rad etilgan</p>
              <h3 className="text-3xl font-bold mt-1">{stats.rejected}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <Ban className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Kompaniya qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha mintaqalar</SelectItem>
              <SelectItem value="toshkent">Toshkent</SelectItem>
              <SelectItem value="samarqand">Samarqand</SelectItem>
              <SelectItem value="buxoro">Buxoro</SelectItem>
              <SelectItem value="navoiy">Navoiy</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha holat</SelectItem>
              <SelectItem value="active">Faol</SelectItem>
              <SelectItem value="inactive">Nofaol</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Companies Grid */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card
              key={company?.id}
              className="hover:shadow-xl transition-all overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center font-bold text-xl">
                      {company?.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{company?.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-xs">
                        <MapPin className="w-3 h-3" />
                        {company?.region}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      company?.is_active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }
                  >
                    {company?.is_active ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <Phone className="w-4 h-4" />
                  {company?.owner_phone}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{company?.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-500/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-500 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">Xodimlar</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {company?.employees_count}
                    </p>
                  </div>

                  <div className="bg-green-500/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-500 mb-1">
                      <Package className="w-4 h-4" />
                      <span className="text-xs font-medium">Mahsulotlar</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {company?.products_count}
                    </p>
                  </div>

                  <div className="bg-purple-500/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-purple-500 mb-1">
                      <Warehouse className="w-4 h-4" />
                      <span className="text-xs font-medium">Omborlar</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {company?.warehouses_count}
                    </p>
                  </div>

                  <div className="bg-orange-500/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-orange-500 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium">Savdo</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      ₸{company?.today_sales_sum}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Yaratilgan
                    </p>
                    <div className="flex items-center gap-1 text-xs text-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(company?.created_at).toLocaleDateString("uz-UZ")}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500"
                    onClick={() => navigate(`/companies/${company?.id}`)}
                  >
                    <Eye className="w-4 h-4" />
                    Batafsil
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-green-500/10 hover:text-green-500 hover:border-green-500"
                    onClick={() => toast.success("Tahrirlash funksiyasi")}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500"
                    onClick={() => setSuspendingCompany(company)}
                  >
                    <Ban className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddStoreModal
          onClose={() => setShowAddModal(false)}
          onSave={() => toast.success("Kompaniya qo'shildi")}
        />
      )}

      {suspendingCompany && (
        <ConfirmDialog
          title={
            suspendingCompany?.is_active
              ? "Kompaniyani to‘xtatish"
              : "Kompaniyani faollashtirish"
          }
          description={
            suspendingCompany.is_active
              ? `"${suspendingCompany?.name}" kompaniyasini to‘xtatmoqchimisiz?`
              : `"${suspendingCompany?.name}" kompaniyasini faollashtirmoqchimisiz?`
          }
          onConfirm={handleSuspendCompany}
          onCancel={() => setSuspendingCompany(null)}
        />
      )}
    </div>
  );
}
