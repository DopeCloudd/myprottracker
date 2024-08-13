import { useGetStatisticsQuery } from "@/infrastructure/api/statistics.api";

const useStats = () => {
  const { data: stats } = useGetStatisticsQuery();

  return {
    stats,
  };
};

export default useStats;
