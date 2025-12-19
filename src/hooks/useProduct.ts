import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, ParamsType } from "@types";
import { productService } from "../service/product.service";

export const useProduct = (params?: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["products", params],
    queryFn: async () => productService.getProducts(params),
  });

  //Mutations
  const useProductCreate = () => {
    return useMutation({
      mutationFn: async (data: Product) => productService.createProduct(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };

  const useProductUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Product }) =>
        productService.updateProduct(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };

  const useProductDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => productService.deleteProduct(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
      },
    });
  };
  return {
    data,
    useProductCreate,
    useProductUpdate,
    useProductDelete,
  };
};
