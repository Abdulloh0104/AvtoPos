import { Store, Product, Ticket, Subscription } from "@/types";

export const mockStores: Store[] = [
  {
    id: "1",
    name: "TechnoCity Tashkent",
    address: "Amir Temur 15, Tashkent",
    region: "Tashkent",
    contact: "+998901234567",
    subscriptionType: "enterprise",
    status: "active",
    createdAt: "2024-01-15",
    totalSales: 125000,
    staffCount: 12,
  },
  {
    id: "2",
    name: "Gadget Hub Samarkand",
    address: "Registan Square 8, Samarkand",
    region: "Samarkand",
    contact: "+998902345678",
    subscriptionType: "premium",
    status: "active",
    createdAt: "2024-02-20",
    totalSales: 89000,
    staffCount: 8,
  },
  {
    id: "3",
    name: "iStore Bukhara",
    address: "Lyabi-Hauz 3, Bukhara",
    region: "Bukhara",
    contact: "+998903456789",
    subscriptionType: "basic",
    status: "active",
    createdAt: "2024-03-10",
    totalSales: 45000,
    staffCount: 5,
  },
  {
    id: "4",
    name: "Smart Electronics Andijan",
    address: "Navoi Street 25, Andijan",
    region: "Andijan",
    contact: "+998904567890",
    subscriptionType: "premium",
    status: "inactive",
    createdAt: "2024-04-05",
    totalSales: 67000,
    staffCount: 6,
  },
  {
    id: "5",
    name: "Mobile World Fergana",
    address: "Al-Fergani 12, Fergana",
    region: "Fergana",
    contact: "+998905678901",
    subscriptionType: "basic",
    status: "suspended",
    createdAt: "2024-05-18",
    totalSales: 23000,
    staffCount: 4,
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    barcode: "8806094935523",
    category: "Smartphone",
    color: "Titanium Black",
    description: "Latest flagship with AI features",
    price: 1299,
    imageURL:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop",
    verified: true,
    createdBy: "TechnoCity Tashkent",
    createdAt: "2024-01-20",
  },

  {
    id: "2",
    brand: "Apple", //name
    model: "iPhone 15 Pro Max", //name
    barcode: "194253433385", //barcode
    category: "Smartphone", // default Smartphone vaqtinchalik
    color: "Natural Titanium", // default oq vaqtinchalik
    description: "Premium iPhone with titanium design",
    price: 1499, //selling_price
    imageURL:
      "https://images.unsplash.com/photo-1696446702907-a1508c75a4e7?w=300&h=300&fit=crop", //image vaqtinchalik "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&h=300&fit=crop" dan foyda
    verified: true, // default
    createdBy: "iStore Bukhara", //company.name
    createdAt: "2024-02-15", //company.created_at vaqtinchalik
  },
  {
    id: "3",
    brand: "Xiaomi",
    model: "14 Pro",
    barcode: "6941812752937",
    category: "Smartphone",
    color: "White",
    description: "Leica camera system flagship",
    price: 899,
    imageURL:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&h=300&fit=crop",
    verified: true,
    createdBy: "Gadget Hub Samarkand",
    createdAt: "2024-03-01",
  },
  {
    id: "4",
    brand: "AirPods",
    model: "AirPods Pro 2",
    barcode: "194253406891",
    category: "Accessories",
    color: "White",
    description: "Active noise cancellation",
    price: 249,
    imageURL:
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=300&h=300&fit=crop",
    verified: true,
    createdBy: "TechnoCity Tashkent",
    createdAt: "2024-01-25",
  },
];

export const mockTickets: Ticket[] = [
  {
    id: "1",
    storeId: "1",
    storeName: "TechnoCity Tashkent",
    title: "Payment terminal not connecting",
    description: "The card reader has been offline for 2 hours",
    status: "open",
    priority: "high",
    assignedTo: "Support Team A",
    createdAt: "2024-11-11T10:30:00",
    updatedAt: "2024-11-11T10:30:00",
  },
  {
    id: "2",
    storeId: "3",
    storeName: "iStore Bukhara",
    title: "Inventory sync issue",
    description: "Products added yesterday not showing in system",
    status: "in_progress",
    priority: "medium",
    assignedTo: "Support Team B",
    createdAt: "2024-11-10T14:20:00",
    updatedAt: "2024-11-11T09:15:00",
  },
  {
    id: "3",
    storeId: "2",
    storeName: "Gadget Hub Samarkand",
    title: "Receipt printer jamming",
    description: "Need technical support for printer repair",
    status: "resolved",
    priority: "low",
    assignedTo: "Support Team A",
    createdAt: "2024-11-09T11:00:00",
    updatedAt: "2024-11-10T16:30:00",
  },
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    storeId: "1",
    planType: "enterprise",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    paymentStatus: "paid",
    autoRenew: true,
    amount: 299,
  },
  {
    id: "2",
    storeId: "2",
    planType: "premium",
    startDate: "2024-02-20",
    endDate: "2025-02-20",
    paymentStatus: "paid",
    autoRenew: true,
    amount: 149,
  },
  {
    id: "3",
    storeId: "3",
    planType: "basic",
    startDate: "2024-03-10",
    endDate: "2025-03-10",
    paymentStatus: "pending",
    autoRenew: false,
    amount: 49,
  },
];

export const regionData = [
  { region: "Tashkent", stores: 45, sales: 2500000 },
  { region: "Samarkand", stores: 18, sales: 980000 },
  { region: "Bukhara", stores: 12, sales: 650000 },
  { region: "Andijan", stores: 15, sales: 720000 },
  { region: "Fergana", stores: 14, sales: 680000 },
  { region: "Namangan", stores: 10, sales: 520000 },
  { region: "Kashkadarya", stores: 8, sales: 410000 },
  { region: "Khorezm", stores: 6, sales: 320000 },
];

export const salesTrendData = [
  { date: "Week 1", sales: 45000, stores: 98 },
  { date: "Week 2", sales: 52000, stores: 102 },
  { date: "Week 3", sales: 48000, stores: 105 },
  { date: "Week 4", sales: 61000, stores: 110 },
  { date: "Week 5", sales: 55000, stores: 112 },
  { date: "Week 6", sales: 67000, stores: 118 },
  { date: "Week 7", sales: 72000, stores: 122 },
];
