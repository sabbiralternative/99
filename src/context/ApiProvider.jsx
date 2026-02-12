import { createContext, useContext, useEffect, useState } from "react";
import { getSetApis } from "../api/config";
import { Settings } from "../api";
import notice from "../../notice.json";

export const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const closePopupForForever = localStorage.getItem("closePopupForForever");
  const [noticeLoaded, setNoticeLoaded] = useState(false);
  const [logo, setLogo] = useState("");
  const baseUrl = notice?.result?.settings?.baseUrl;

  useEffect(() => {
    if (!noticeLoaded) {
      const fetchAPI = () => {
        getSetApis(setNoticeLoaded, baseUrl);
      };
      fetchAPI();
    }
  }, [noticeLoaded, baseUrl]);

  useEffect(() => {
    if (noticeLoaded) {
      /* Dynamically append  theme css  */

      if (Settings.appOnly && !closePopupForForever) {
        document.title = window.location.hostname;
      } else {
        document.title = Settings.siteTitle;
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
