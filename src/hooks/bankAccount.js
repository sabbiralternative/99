import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useBankAccount = (payload) => {
  return useQuery({
    queryKey: ["bankAccount", payload],

    queryFn: async () => {
      const res = await AxiosSecure.post(API.bankAccount, payload);
      const data = res.data;

      if (data?.success) {
        return data?.result;
      }
    },
  });
};

export const useBankMutation = () => {
  return useMutation({
    mutationKey: ["bank-account"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.bankAccount}`, payload);
      return data;
    },
  });
};
