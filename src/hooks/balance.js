import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosSecure } from "../lib/AxiosSecure";
import { useSelector } from "react-redux";
import { API } from "../api";

export const useBalance = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);
      if (res?.data?.success === false && token) {
        localStorage.clear();
        navigate("/login");
      } else if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
    refetchInterval: 6000,
  });
};

export default useBalance;
