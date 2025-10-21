import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "@service";
import type { User } from "@types";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => userService.getUsers(),
  });

  const { data:users } = useQuery({
    queryKey: ["all"],
    queryFn: async () => userService.getAllUsers(),
  });


  //Mutations
  const useUserCreate = () => {
    return useMutation({
      mutationFn: async (data: User) => userService.createUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };

  const useUserUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: User }) =>
        userService.updateUser(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };

  const useUserDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => userService.deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };
  return {
    data,
    users,
    useUserCreate,
    useUserUpdate,
    useUserDelete,
  };
};
