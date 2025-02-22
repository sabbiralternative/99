import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useGetSettledBets = (marketId) => {
  return useQuery({
    queryKey: ["settledBets"],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.settledBets}/${marketId}`);

      if (data.success) {
        return data.result;
      }
    },
    gcTime: 0,
  });
};
