export enum Unit {
  DONA = "dona",
  G = "g",
  KG = "kg",
  ML = "ml",
  L = "l",
  SM = "sm",
  M = "m",
}

export interface Product {
  id?: number;
  manufacture_date: Date;
  expiration_date: Date;
  barcode?: string;
  title?: string;
  unit?: Unit;
  quantity?: number;
  cost_price: number;
  selling_price: number;
  profit_margin?: number;
  additional_notes?: string;
  image?: string;
  user?: number;
  company?: number;
  warehouse: number;
  category: number;
  supplier: number;
  created_at: string;
  updated_at: string;
  // created_at: Date;
  // updated_at: Date;
}
