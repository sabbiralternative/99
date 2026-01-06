import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { useEffect } from "react";
import { Settings } from "./api";
import disableDevtool from "disable-devtool";
import { useDispatch } from "react-redux";
import { logout } from "./redux/features/auth/authSlice";
import useWhatsApp from "./hooks/whatsapp";

function App() {
  const { data } = useWhatsApp();
  const disabledDevtool = Settings.disabledDevtool;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (disabledDevtool) {
      disableDevtool({
        ondevtoolopen: (type) => {
          const info = "devtool opened!; type =" + type;
          if (info) {
            dispatch(logout());
            window.location.href = "https://www.google.com/";
          }
        },
      });
    }
  }, [navigate, disabledDevtool, dispatch]);

  useEffect(() => {
    const changePassword = localStorage.getItem("changePassword");
    if (changePassword) {
      navigate("/change-password-login");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (data?.result?.pixel) {
      // Create fb pixel main script
      const script = document.createElement("script");
      script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${data?.result?.pixel});
      fbq('track', 'PageView');
    `;
      document.head.appendChild(script);

      // Create noscript + img
      const noscript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${data?.result?.pixel}&ev=PageView&noscript=1`;
      noscript.appendChild(img);

      document.body.appendChild(noscript);

      return () => {
        // cleanup when component unmounts
        script.remove();
        noscript.remove();
      };
    }
    if (data?.result?.pixel2) {
      // Create fb pixel main script
      const script = document.createElement("script");
      script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', ${data?.result?.pixel2});
      fbq('track', 'PageView');
    `;
      document.head.appendChild(script);

      // Create noscript + img
      const noscript = document.createElement("noscript");
      const img = document.createElement("img");
      img.height = 1;
      img.width = 1;
      img.style.display = "none";
      img.src = `https://www.facebook.com/tr?id=${data?.result?.pixel2}&ev=PageView&noscript=1`;
      noscript.appendChild(img);

      document.body.appendChild(noscript);

      return () => {
        // cleanup when component unmounts
        script.remove();
        noscript.remove();
      };
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(data);
  //   if (!data?.result?.pixel && !data?.result?.pixel2) return;

  //   if (!window.fbq) {
  //     const script = document.createElement("script");
  //     script.async = true;
  //     script.src = "https://connect.facebook.net/en_US/fbevents.js";
  //     document.head.appendChild(script);

  //     window.fbq = function () {
  //       window.fbq.callMethod
  //         ? window.fbq.callMethod.apply(window.fbq, arguments)
  //         : window.fbq.queue.push(arguments);
  //     };
  //     window.fbq.queue = [];
  //     window.fbq.loaded = true;
  //     window.fbq.version = "2.0";
  //   }

  //   if (data.result.pixel) {
  //     window.fbq("init", data.result.pixel);
  //   }

  //   if (data.result.pixel2) {
  //     window.fbq("init", data.result.pixel2);
  //   }

  //   window.fbq("track", "PageView");
  // }, [data?.result?.pixel, data?.result?.pixel2]);

  return <MainLayout />;
}

export default App;
