import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import disableDevtool from "disable-devtool";

import MainLayout from "./layout/MainLayout";
import { logout } from "./redux/features/auth/authSlice";
import { Settings } from "./api";

/**
 * GLOBAL META PIXEL GUARD
 * Must live outside React
 */
let metaPixelInitialized = false;

function App() {
  const disabledDevtool = Settings.disabledDevtool;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Disable devtools
  useEffect(() => {
    if (window.location.hostname === "localhost") return;
    if (!disabledDevtool) return;

    disableDevtool({
      ondevtoolopen: () => {
        dispatch(logout());
        window.location.href = "https://www.google.com/";
      },
    });
  }, [disabledDevtool, dispatch]);

  // Force password change
  useEffect(() => {
    const changePassword = localStorage.getItem("changePassword");
    if (changePassword) {
      navigate("/change-password-login");
    }
  }, [location.pathname, navigate]);

  // ---------------- META PIXEL (META-CORRECT WAY) ----------------
  useEffect(() => {
    if (!Settings?.pixel) return;
    if (metaPixelInitialized) return;

    // META OFFICIAL BOOTSTRAP (DO NOT TOUCH)
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js",
    );

    window.fbq("init", Settings.pixel);
    window.fbq("track", "PageView");

    metaPixelInitialized = true;
  }, []);

  return <MainLayout />;
}

export default App;
