import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { ParamsType } from "@types";

export const statisticService = {
  async getStatistics(params?: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.STATISTICS, params);
    return res;
  },

  async getStatisticsTopSales(params?: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TOP_SALES, params);
    return res;
  },
};
