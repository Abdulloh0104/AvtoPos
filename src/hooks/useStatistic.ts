import { useQuery } from "@tanstack/react-query";
import type { ParamsType } from "@types";
import { statisticService } from "@service";

export const useStatistic = (params?: ParamsType, includeTopSales = false) => {
  const { data } = useQuery({
    queryKey: ["statistic", params],
    queryFn: async () => statisticService.getStatistics(params),
  });

  const { data: topSales } = useQuery({
    queryKey: ["topSales", params],
    queryFn: async () => statisticService.getStatisticsTopSales(params),
    enabled: includeTopSales,
  });

  return {
    data,
    topSales,
  };
};
