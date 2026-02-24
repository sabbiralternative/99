import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosSecure } from "../lib/AxiosSecure";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../api";
import { logout } from "../redux/features/auth/authSlice";

export const useBalance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  return useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const res = await AxiosSecure.post(API.balance);
      if (res?.data?.success === false && token) {
        dispatch(logout());
        navigate("/login");
      } else if (res?.data?.success && token) {
        const data = res.data?.result;
        return data;
      }
    },
  });
};

export default useBalance;
