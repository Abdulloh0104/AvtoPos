// hooks/useAdminProfile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService, userService } from "@service";
import { getUserIdFromToken } from "@helpers";
import type { Password, User } from "@types";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const id = getUserIdFromToken();
  const { data: admin } = useQuery({
    enabled: !!id, // faqat ID bor bo‘lsa fetch qilinsin
    queryKey: ["admins", id],
    queryFn: () => adminService.getAdminById(id!),
  });

  //Mutations
  const usePasswordUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Password }) =>
        adminService.updatePassword(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["password"] });
      },
    });
  };
  const { data } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => userService.getAdmins(),
  });

  // Mutations
  const useAdminCreate = () => {
    return useMutation({
      mutationFn: async (data: User) => userService.createUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admins"] });
      },
    });
  };

  const useAdminUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: User }) =>
        userService.updateUser(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admins"] });
      },
    });
  };

  const useAdminDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => userService.deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admins"] });
      },
    });
  };
  return {
    admin,
    data,
    usePasswordUpdate,
    useAdminCreate,
    useAdminUpdate,
    useAdminDelete,
  };
};
