import { ApiUrls } from "@api/api-urls";
import type { Product, ParamsType } from "@types";
import { apiConfig } from "../api/config";

export const productService = {
  async getProducts(params?:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.PRODUCTS,params);
    return res;
  },

  async createProduct(model: Product) {
    const res = await apiConfig().postRequest(ApiUrls.PRODUCTS, model);
    return res;
  },

  async updateProduct(id:number,model: Product) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.PRODUCTS}${id}`,
      model
    );
    return res;
  },

  async deleteProduct(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.PRODUCTS}${id}`);
    return res;
  },
};
