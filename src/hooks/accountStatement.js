import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useDepositStatement = () => {
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];

  const toDate = new Date().toISOString().split("T")[0];

  return useQuery({
    queryKey: ["deposit-statement"],

    queryFn: async () => {
      const payload = {
        from: fromDate,
        to: toDate,
        type: "DEPOSIT",
        status: "ALL",
      };
      const { data } = await AxiosSecure.post(API.accountStatement, payload);

      if (data?.success) {
        return data?.result;
      }
    },
    gcTime: 0,
  });
};
