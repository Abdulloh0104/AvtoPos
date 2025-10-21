import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { companyService } from "@service";
import type { Company} from "@types";
// paramsni ko'rib chiqishim kerak
export const useCompany = (id?: number) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    enabled: !id,
    queryKey: ["companies"], //,params
    queryFn: async () => companyService.getCompanies(), // params
  });
  
  //Mutations
  const useCompanyCreate = () => {
    return useMutation({
      mutationFn: async (data: Company) => companyService.createCompany(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["companies"] });
      },
    });
  };

  const useCompanyUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Company }) =>
        companyService.updateCompany(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["companies"] });
      },
    });
  };

  const useCompanyDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => companyService.deleteCompany(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["companies"] });
      },
    });
  };
  return {
    data,
    useCompanyCreate,
    useCompanyUpdate,
    useCompanyDelete,
  };
};
