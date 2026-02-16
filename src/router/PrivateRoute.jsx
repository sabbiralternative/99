import { Navigate } from "react-router-dom";
import { Settings } from "../api";
import { logout } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { isDesktop } from "react-device-detect";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  if (isDesktop && Settings.build === "production") {
    window.location.href = "/d/";
  }

  const dispatch = useDispatch();
  if (Settings.force_login) {
    if (!token) {
      dispatch(logout());
      return <Navigate to="/login"></Navigate>;
    }
  }
  return children;
};

export default PrivateRoute;
