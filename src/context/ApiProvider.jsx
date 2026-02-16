import { createContext, useContext, useEffect, useState } from "react";
import { getSetApis } from "../api/config";
import { Settings } from "../api";

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (!noticeLoaded) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded);
      };
      fetchAPI();
    }
  }, [noticeLoaded]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Dynamically append  theme css  */

      if (Settings.app_only && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = Settings.site_name;
      }
    }
  }, [noticeLoaded, closePopupForForever]);

  if (!noticeLoaded) {
    return;
  }

  const stateInfo = { logo, setLogo };
  return (
    <ApiContext.Provider value={stateInfo}>{children}</ApiContext.Provider>
  );
};
export const useLogo = () => {
  const context = useContext(ApiContext);
  return context;
};
export default ApiProvider;
