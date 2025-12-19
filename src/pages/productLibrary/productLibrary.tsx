// import { useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Search, Plus, Upload, CheckCircle, XCircle, Edit, Trash2, Package, TrendingUp, Barcode } from 'lucide-react';
// import { mockProducts } from '@/lib/mockData';
// import { Product } from '@/types';
// import { AddProductModal } from '@/components/modals/AddProductModal';
// import { ConfirmDialog } from '@/components/modals/ConfirmDialog';
// import { toast } from 'sonner';
// import { useProduct } from '@hooks';

// export default function ProductLibrary() {
//   const { data } = useProduct();
//   const [products] = useState<Product[]>(mockProducts);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; productId: string | null }>({ open: false, productId: null });

//   console.log("products", data?.data?.results);
//   const handleDelete = () => {
//     if (deleteDialog.productId) {
//       toast.success('Mahsulot o\'chirildi');
//       setDeleteDialog({ open: false, productId: null });
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch =
//       product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.barcode.includes(searchQuery);
//     const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Mahsulotlar Kutubxonasi</h1>
//           <p className="text-muted-foreground mt-1">
//             Global mahsulotlar katalogi va boshqaruv
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" className="gap-2">
//             <Upload className="w-4 h-4" />
//             Ommaviy Yuklash
//           </Button>
//           <Button onClick={() => setShowAddModal(true)} className="gap-2">
//             <Plus className="w-4 h-4" />
//             Mahsulot Qo'shish
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Jami Mahsulotlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">{products.length}</h3>
//               <p className="text-xs text-muted-foreground mt-1">Katalogda</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
//               <Package className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {products.filter(p => p.verified).length}
//               </h3>
//               <p className="text-xs text-muted-foreground mt-1">Verified</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border-purple-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Kategoriyalar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">4</h3>
//               <p className="text-xs text-muted-foreground mt-1">Turlar</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-purple-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Brendlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {new Set(products.map(p => p.brand)).size}
//               </h3>
//               <p className="text-xs text-muted-foreground mt-1">Turli</p>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
//               <Barcode className="w-6 h-6 text-orange-500" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Brend, model yoki shtrix-kod bo'yicha qidirish..."
//                 className="pl-10"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Kategoriya bo'yicha filtr" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">Barcha kategoriyalar</SelectItem>
//                 <SelectItem value="Smartphone">Smartfonlar</SelectItem>
//                 <SelectItem value="Accessories">Aksessuarlar</SelectItem>
//                 <SelectItem value="Tablet">Planshetlar</SelectItem>
//                 <SelectItem value="Laptop">Noutbuklar</SelectItem>
//               </SelectContent>
//             </Select>
//         </div>
//       </Card>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
//             <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 relative">
//                   <img
//                     src={product.imageURL}
//                     alt={`${product.brand} ${product.model}`}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                   />
//               {product.verified && (
//                 <div className="absolute top-2 left-2">
//                   <Badge className="bg-green-500 text-white">
//                     <CheckCircle className="w-3 h-3 mr-1" />
//                     Verified
//                   </Badge>
//                 </div>
//               )}
//               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Button size="icon" variant="secondary" className="h-8 w-8 shadow-lg hover:bg-blue-500/10 hover:text-blue-500">
//                   <Edit className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="destructive"
//                   className="h-8 w-8 shadow-lg"
//                   onClick={() => setDeleteDialog({ open: true, productId: product.id })}
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-3">
//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     {product.brand} {product.model}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">{product.color}</p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <Badge variant="outline" className="text-xs">
//                     {product.category}
//                   </Badge>
//                   <p className="text-xl font-bold text-primary">${product.price}</p>
//                 </div>

//                 <div className="pt-2 border-t border-border space-y-1">
//                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                     <Barcode className="w-3 h-3" />
//                     {product.barcode}
//                   </div>
//                   <p className="text-xs text-muted-foreground truncate">
//                     Qo'shgan: {product.createdBy}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <Card className="p-12">
//           <div className="text-center">
//             <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
//             <p className="text-muted-foreground">Mezonlarga mos mahsulotlar topilmadi</p>
//           </div>
//         </Card>
//       )}

//       <AddProductModal
//         open={showAddModal}
//         onOpenChange={setShowAddModal}
//       />

//       <ConfirmDialog
//         open={deleteDialog.open}
//         onOpenChange={(open) => setDeleteDialog({ open, productId: null })}
//         title="Mahsulotni o'chirish"
//         description="Rostdan ham bu mahsulotni kutubxonadan o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
//         onConfirm={handleDelete}
//         confirmText="O'chirish"
//         variant="destructive"
//       />
//     </div>
//   );
// }
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
// import { useState, useMemo } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Search,
//   Plus,
//   Upload,
//   CheckCircle,
//   XCircle,
//   Edit,
//   Trash2,
//   Package,
//   TrendingUp,
//   Barcode,
// } from "lucide-react";
// import { AddProductModal } from "@/components/modals/AddProductModal";
// import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
// import { toast } from "sonner";
// import { useProduct } from "@/hooks";

// export default function ProductLibrary() {
//   const { data } = useProduct(); // backend data
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [deleteDialog, setDeleteDialog] = useState<{
//     open: boolean;
//     productId: string | null;
//   }>({ open: false, productId: null });

//   // Backend data mapping to frontend product format
//   const products = useMemo(() => {
//     if (!data?.data?.products) return [];
//     return data.data.products.map((p: any) => ({
//       id: p.id.toString(),
//       brand: p.name,
//       model: p.name,
//       barcode: p.barcode,
//       category: "Smartphone", // vaqtinchalik
//       color: "Natural Titanium", // vaqtinchalik
//       description: p.description || "No description",
//       price: parseFloat(p.selling_price),
//       imageURL: p.image || "https://via.placeholder.com/300",
//       verified: true, // default
//       createdBy: p.company.name,
//       createdAt: p.company.created_at,
//     }));
//   }, [data]);

//   const filteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const matchesSearch =
//         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.barcode.includes(searchQuery);
//       const matchesCategory =
//         categoryFilter === "all" || product.category === categoryFilter;
//       return matchesSearch && matchesCategory;
//     });
//   }, [products, searchQuery, categoryFilter]);

//   const handleDelete = () => {
//     if (deleteDialog.productId) {
//       toast.success("Mahsulot o'chirildi");
//       setDeleteDialog({ open: false, productId: null });
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">
//             Mahsulotlar Kutubxonasi
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Global mahsulotlar katalogi va boshqaruv
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button variant="outline" className="gap-2">
//             <Upload className="w-4 h-4" />
//             Ommaviy Yuklash
//           </Button>
//           <Button onClick={() => setShowAddModal(true)} className="gap-2">
//             <Plus className="w-4 h-4" />
//             Mahsulot Qo'shish
//           </Button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border-blue-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Jami Mahsulotlar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {data?.data?.stats?.total_products || 0}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
//               <Package className="w-6 h-6 text-blue-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">
//                 {products.filter((p) => p.verified).length}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
//               <CheckCircle className="w-6 h-6 text-green-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/5 border-purple-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Kategoriyalar</p>
//               <h3 className="text-3xl font-bold text-foreground mt-1">4</h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
//               <TrendingUp className="w-6 h-6 text-purple-500" />
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/20">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-muted-foreground">Brendlar</p>
//               <h3 className="text-3xl font-bold text-foreground">
//                 {new Set(products.map((p) => p.brand)).size}
//               </h3>
//             </div>
//             <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
//               <Barcode className="w-6 h-6 text-orange-500" />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//             <Input
//               placeholder="Brend, model yoki shtrix-kod bo'yicha qidirish..."
//               className="pl-10"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-[200px]">
//               <SelectValue placeholder="Kategoriya bo'yicha filtr" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">Barcha kategoriyalar</SelectItem>
//               <SelectItem value="Smartphone">Smartfonlar</SelectItem>
//               <SelectItem value="Accessories">Aksessuarlar</SelectItem>
//               <SelectItem value="Tablet">Planshetlar</SelectItem>
//               <SelectItem value="Laptop">Noutbuklar</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </Card>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <Card
//             key={product.id}
//             className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
//           >
//             <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 relative">
//               <img
//                 src={product.imageURL}
//                 alt={`${product.brand} ${product.model}`}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//               {product.verified && (
//                 <div className="absolute top-2 left-2">
//                   <Badge className="bg-green-500 text-white">
//                     <CheckCircle className="w-3 h-3 mr-1" />
//                     Verified
//                   </Badge>
//                 </div>
//               )}
//               <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <Button
//                   size="icon"
//                   variant="secondary"
//                   className="h-8 w-8 shadow-lg hover:bg-blue-500/10 hover:text-blue-500"
//                 >
//                   <Edit className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="destructive"
//                   className="h-8 w-8 shadow-lg"
//                   onClick={() =>
//                     setDeleteDialog({ open: true, productId: product.id })
//                   }
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-3">
//                 <div>
//                   <h3 className="font-semibold text-foreground">
//                     {product.brand} {product.model}
//                   </h3>
//                   <p className="text-sm text-muted-foreground">
//                     {product.color}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <Badge variant="outline" className="text-xs">
//                     {product.category}
//                   </Badge>
//                   <p className="text-xl font-bold text-primary">
//                     ${product.price}
//                   </p>
//                 </div>

//                 <div className="pt-2 border-t border-border space-y-1">
//                   <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                     <Barcode className="w-3 h-3" />
//                     {product.barcode}
//                   </div>
//                   <p className="text-xs text-muted-foreground truncate">
//                     Qo'shgan: {product.createdBy}
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {filteredProducts.length === 0 && (
//         <Card className="p-12">
//           <div className="text-center">
//             <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
//             <p className="text-muted-foreground">
//               Mezonlarga mos mahsulotlar topilmadi
//             </p>
//           </div>
//         </Card>
//       )}

//       <AddProductModal open={showAddModal} onOpenChange={setShowAddModal} />

//       <ConfirmDialog
//         open={deleteDialog.open}
//         onOpenChange={(open) => setDeleteDialog({ open, productId: null })}
//         title="Mahsulotni o'chirish"
//         description="Rostdan ham bu mahsulotni kutubxonadan o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
//         onConfirm={handleDelete}
//         confirmText="O'chirish"
//         variant="destructive"
//       />
//     </div>
//   );
// }
// =========================================================================================================
// =========================================================================================================
// =========================================================================================================
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Upload,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Package,
  TrendingUp,
  Barcode,
} from "lucide-react";
import { AddProductModal } from "@/components/modals/AddProductModal";
import { ConfirmDialog } from "@/components/modals/ConfirmDialog";
import { toast } from "sonner";
import { useProduct } from "@/hooks";
import ProductModal from "./model";
import { Product } from "@types";

export default function ProductLibrary() {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<Product | null>(null);

  const { data, useProductDelete } = useProduct(); // Backend data
  const { mutate: deleteFn, isPending: isDeleting } = useProductDelete();

  const productsFromBackend = data?.data?.results?.products || [];
  const stats = data?.data?.results?.stats || {};
  const toggle = () => {
    setOpen(!open);
    if (update) setUpdate(null);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    productId: number | null;
  }>({ open: false, productId: null });
  console.log("products", data?.data?.results);
  const filteredProducts = useMemo(() => {
    return productsFromBackend.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.barcode.includes(searchQuery);
      const matchesCategory =
        categoryFilter === "all" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [productsFromBackend, searchQuery, categoryFilter]);

  const handleDelete = () => {
    if (!deleteDialog.productId) return;

    deleteFn(deleteDialog.productId, {
      onSuccess: () => {
        toast.success("Mahsulot o‘chirildi");
        setDeleteDialog({ open: false, productId: null });
      },
    });
  };
  return (
    <div className="space-y-6">
      {open && <ProductModal open={open} toggle={toggle} update={update} />}{" "}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Mahsulotlar Kutubxonasi
          </h1>
          <p className="text-muted-foreground mt-1">
            Global mahsulotlar katalogi va boshqaruv
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Ommaviy Yuklash
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Mahsulot Qo'shish
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Jami Mahsulotlar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {stats.total_products || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasdiqlangan</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {productsFromBackend.filter((p) => p.verified).length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Kategoriyalar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {stats.total_categories || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Brendlar</p>
              <h3 className="text-3xl font-bold text-foreground mt-1">
                {stats.total_brands || 0}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Barcode className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>
      </div>
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Mahsulot nomi yoki barcode bo'yicha qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Kategoriya bo'yicha filtr" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha kategoriyalar</SelectItem>
              <SelectItem value="Smartphone">Smartfonlar</SelectItem>
              <SelectItem value="Accessories">Aksessuarlar</SelectItem>
              <SelectItem value="Tablet">Planshetlar</SelectItem>
              <SelectItem value="Laptop">Noutbuklar</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Mahsulot qo‘shish
          </Button>
        </div>
      </Card>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="aspect-square overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 relative">
              {product.image ? (
                <img
                  src={
                    product.image ||
                    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Rasm yo'q
                </div>
              )}
              {product.verified && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-green-500 text-white text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8"
                  onClick={() => {
                    setUpdate(product);
                    setOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={() =>
                    setDeleteDialog({ open: true, productId: product.id })
                  }
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {product.category || "Smartphone"}
                  </Badge>
                  <p className="text-sm font-bold text-primary">
                    {product.selling_price} UZS
                  </p>
                </div>
                <div className="pt-2 border-t border-border text-xs text-muted-foreground flex justify-between">
                  <span>
                    <Barcode className="w-3 h-3 inline-block mr-1" />
                    {product.barcode}
                  </span>
                  <span>Qo'shgan: {product.company?.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-muted-foreground">
            Mezonlarga mos mahsulotlar topilmadi
          </p>
        </Card>
      )}
      <AddProductModal open={showAddModal} onOpenChange={setShowAddModal} />
      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, productId: null })}
        title="Mahsulotni o'chirish"
        description="Rostdan ham bu mahsulotni kutubxonadan o'chirmoqchimisiz? Bu amalni qaytarib bo'lmaydi."
        onConfirm={handleDelete}
        confirmText="O'chirish"
        variant="destructive"
      />
    </div>
  );
}
