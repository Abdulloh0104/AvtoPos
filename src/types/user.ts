
export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number: string;
  is_active: boolean;
  is_staff: boolean;
  is_admin: boolean;
  active_company?: number;
  created_at: Date;
  updated_at: Date;
  // branchId?: number[];
  // branches: Branch[];
}
