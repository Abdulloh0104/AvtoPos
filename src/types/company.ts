import { User } from "./user";

export interface Company {
  id?: number;
  name: string;
  owner: User;
  // ownerId: number;
  // owner?: { id: number; title: string };
  region: string;
  address: string;
  created_at: string;
}
