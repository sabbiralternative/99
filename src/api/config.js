import axios from "axios";
import { Settings } from "./index";

export const getSetApis = async (setNoticeLoaded) => {
  const url = "/notice.json";
  const { data: settingsResponse } = await axios.get(url);

  if (settingsResponse?.result) {
    // Destructure API endpoints and Settings
    const { settings = {} } = settingsResponse.result;
    // Dynamically update Settings object
    Object.keys(settings).forEach((key) => {
      if (key === "logo") {
        Settings.logo_height = settings?.["logo"]?.height;
        Settings.logo_width = settings?.["logo"]?.width;
        Settings.logo_format = settings?.["logo"]?.format;
      } else {
        Settings[key] = settings[key];
      }
    });

    setNoticeLoaded(true);
  }
};
