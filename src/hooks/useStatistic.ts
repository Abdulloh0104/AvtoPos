import { useQuery } from "@tanstack/react-query";
import type { ParamsType } from "@types";
import { statisticService } from "@service";

export const useStatistic = (params?: ParamsType, includeTopSales = false) => {
  // const statistic = useQuery({
  //   queryKey: ["statistic", params],
  //   queryFn: async () => statisticService.getStatistics(params),
  // });

  const { data: topSales } = useQuery({
    queryKey: ["topSales", params],
    queryFn: async () => statisticService.getStatisticsTopSales(params),
    enabled: includeTopSales,
  });

  const statisticsCount = useQuery({
    queryKey: ["statisticsCount"],
    queryFn: async () => statisticService.getStatisticsCount(),
    // enabled: includeTopSales,
  });
  const weeklySales = useQuery({
    queryKey: ["weeklySales"],
    queryFn: async () => statisticService.getWeeklySales(),
    // enabled: includeTopSales,
  });

  const analyticsStatistics = useQuery({
    queryKey: ["analyticsStatistics"],
    queryFn: async () => statisticService.getAnalyticsStatistics(),
    // enabled: includeTopSales,
  });
  const analyticsFinance = useQuery({
    queryKey: ["analyticsFinance"],
    queryFn: async () => statisticService.getAnalyticsFinance(),
    // enabled: includeTopSales,
  });
  const analyticsShops = useQuery({
    queryKey: ["analyticsShops"],
    queryFn: async () => statisticService.getAnalyticsShops(),
    // enabled: includeTopSales,
  });
  const analyticsTotal = useQuery({
    queryKey: ["analyticsTotal"],
    queryFn: async () => statisticService.getAnalyticsTotal(),
    // enabled: includeTopSales,
  });
  const analyticsTopProducts = useQuery({
    queryKey: ["analyticsTopProducts"],
    queryFn: async () => statisticService.getAnalyticsTopProducts(),
    // enabled: includeTopSales,
  });
  const analyticsTopEmployee = useQuery({
    queryKey: ["analyticsTopEmployee"],
    queryFn: async () => statisticService.getAnalyticsTopEmployee(),
    // enabled: includeTopSales,
  });
  return {
    // statistic,
    topSales,
    statisticsCount,
    weeklySales,
    analyticsStatistics,
    analyticsFinance,
    analyticsShops,
    analyticsTotal,
    analyticsTopProducts,
    analyticsTopEmployee,
  };
};
