import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { Depot, ParamsType } from "@types";

export const depotService = {
  async getDepots(params?:ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.WAREHOUSES,params);
    return res;
  },

  async createDepot(model: Depot) {
    const res = await apiConfig().postRequest(ApiUrls.WAREHOUSES, model);
    return res;
  },

  async updateDepot(id:number,model: Depot) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.WAREHOUSES}${id}`,
      model
    );
    return res;
  },

  async deleteDepot(id: number) {
    const res = await apiConfig().removeRequest(`${ApiUrls.WAREHOUSES}${id}`);
    return res;
  },
};
