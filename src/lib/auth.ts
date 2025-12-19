// Authentication utilities

import { removeItem } from "../helpers";

export type UserRole = "super_admin" | "admin" | "moderator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  permissions: string[];
}

// Mock users for different roles
const mockUsers: Record<string, { password: string; user: User }> = {
  "superadmin@okam.uz": {
    password: "super123",
    user: {
      id: "1",
      name: "Super Admin",
      email: "superadmin@okam.uz",
      role: "super_admin",
      roleLabel: "Super Admin",
      permissions: ["all"],
    },
  },
  "admin@okam.uz": {
    password: "admin123",
    user: {
      id: "2",
      name: "Admin",
      email: "admin@okam.uz",
      role: "admin",
      roleLabel: "Admin",
      permissions: [
        "dashboard",
        "stores",
        "products",
        "analytics",
        "subscriptions",
        "support",
        "broadcast",
      ],
    },
  },
  "moderator@okam.uz": {
    password: "mod123",
    user: {
      id: "3",
      name: "Moderator",
      email: "moderator@okam.uz",
      role: "moderator",
      roleLabel: "Moderator",
      permissions: ["dashboard", "moderation", "stores", "products"],
    },
  },
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isAuthenticated") === "true";
};

export const login = (email: string, password: string): boolean => {
  const userRecord = mockUsers[email.toLowerCase()];

  if (userRecord && userRecord.password === password) {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(userRecord.user));
    return true;
  }

  return false;
};

export const logout = (): void => {
  removeItem("isAuthenticated");
  removeItem("access_token");
  removeItem("currentUser");
  removeItem("rememberMe");
};

export const getUser = (): User => {
  const userStr = localStorage.getItem("currentUser");

  if (userStr) {
    return JSON.parse(userStr);
  }

  // Default fallback
  return {
    id: "1",
    name: "Super Admin",
    email: "superadmin@okam.uz",
    role: "super_admin",
    roleLabel: "Super Admin",
    permissions: ["all"],
  };
};

export const hasPermission = (permission: string): boolean => {
  const user = getUser();

  // Super admin has all permissions
  if (user.role === "super_admin" || user.permissions.includes("all")) {
    return true;
  }

  return user.permissions.includes(permission);
};

export const canAccessPage = (page: string): boolean => {
  const user = getUser();

  // Super admin can access all pages
  if (user.role === "super_admin") {
    return true;
  }

  // Check specific permissions
  return user.permissions.includes(page);
};
