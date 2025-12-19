import { apiConfig } from "@api/config";
import { ApiUrls } from "../api/api-urls";
import type { ParamsType } from "@types";

export const statisticService = {
  // async getStatistics(params?: ParamsType) {
  //   const res = await apiConfig().getRequest(ApiUrls.STATISTICS, params);
  //   return res;
  // },

  async getStatisticsTopSales(params?: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TOP_SALES, params);
    return res;
  },

  async getStatisticsCount() {
    const res = await apiConfig().getRequest(ApiUrls.STATISTICS_COUNT);
    return res;
  },
  async getWeeklySales() {
    const res = await apiConfig().getRequest(ApiUrls.WEEKLY_SALES);
    return res;
  },

  async getAnalyticsStatistics() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_STATISTICS);
    return res;
  },
  async getAnalyticsFinance() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_FINANCE);
    return res;
  },
  async getAnalyticsShops() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_SHOPS);
    return res;
  },
  async getAnalyticsTotal() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_TOTAL);
    return res;
  },
  async getAnalyticsTopProducts() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_TOP_PRODUCTS);
    return res;
  },
  async getAnalyticsTopEmployee() {
    const res = await apiConfig().getRequest(ApiUrls.ANALYTICS_TOP_EMPLOYEE);
    return res;
  },
};

