import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Depot, ParamsType } from "@types";
import { depotService } from "../service/depot.service";

export const useDepot = (params?: ParamsType, id?: number) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    enabled: !id,
    queryKey: ["depots", params],
    queryFn: async () => depotService.getDepots(params),
  });

  //Mutations
  const useDepotCreate = () => {
    return useMutation({
      mutationFn: async (data: Depot) => depotService.createDepot(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["depots"] });
      },
    });
  };

  const useDepotUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Depot }) =>
        depotService.updateDepot(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["depots"] });
      },
    });
  };

  const useDepotDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => depotService.deleteDepot(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["depots"] });
      },
    });
  };
  return {
    data,
    useDepotCreate,
    useDepotUpdate,
    useDepotDelete,
  };
};
