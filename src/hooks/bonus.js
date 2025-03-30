import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useGetBonusStatement = () => {
  return useQuery({
    queryKey: ["get-bonus-statement"],

    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.bonus, {
        type: "viewStatement",
      });
      return data;
    },
  });
};
export const useBonusStatement = () => {
  return useMutation({
    mutationKey: ["bonus-statement"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
  });
};
