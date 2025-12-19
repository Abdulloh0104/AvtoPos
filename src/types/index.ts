import { Company } from "./company.ts";

export * from "./auth.ts";
export * from "./general.ts";
export * from "./product.ts";
export * from "./user.ts";
export * from "./company.ts";
export * from "./depot.ts";
export * from "./statistic.ts";

export interface Store {
  id: string;
  name: string;
  address: string;
  region: string;
  contact: string;
  subscriptionType: "basic" | "premium" | "enterprise";
  status: "active" | "inactive" | "suspended";
  createdAt: string;
  totalSales?: number;
  staffCount?: number;
}

export interface Product {
  id: string;
  name: string;
  model: string;
  barcode: string;
  selling_price: number;
  cost_price: number;
  unit:number;
  company: Company;
  image: string;
  // category: string;
  // color: string;
}
      

export interface Staff {
  id: string;
  storeId: string;
  fullName: string;
  role: string;
  phone: string;
  active: boolean;
}

export interface Ticket {
  id: string;
  storeId: string;
  storeName: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  storeId: string;
  planType: "basic" | "premium" | "enterprise";
  startDate: string;
  endDate: string;
  paymentStatus: "paid" | "pending" | "overdue";
  autoRenew: boolean;
  amount: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "support";
  permissions: string[];
  lastLogin: string;
  active: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ipAddress: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  icon: React.ReactNode;
}
