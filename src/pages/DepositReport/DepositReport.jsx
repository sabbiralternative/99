import { useEffect, useState } from "react";
import Report from "./Report";

import { Settings } from "../../api";

const DepositReport = () => {
  const depositTab = [
    'If you face any issue with your deposit, click the "Report Issue" button next to your deposit details to let us know.',
    "यदि आपकी जमा राशि में कोई समस्या आती है, तो हमें बताने के लिए अपनी डिपॉज़िट विवरण के पास दिए गए Report Issue बटन पर क्लिक करें",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          const arrLength = depositTab.length;
          return (prev + 1) % arrLength;
        });
        setFade(true);
      }, 500); // fade out duration
    }, 10000); // 10s display time

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
        {Settings.complaint && (
          <div
            style={{
              backgroundColor: "#EAEAEA",
              textAlign: "start",
              marginTop: "10px",
              paddingLeft: "0.625rem", // px-2.5
              paddingRight: "0.625rem",
              paddingTop: "0.25rem", // py-1
              paddingBottom: "0.25rem",
              color: "var(--text_color_primary1)",
              borderRadius: "0.25rem", // rounded
              fontSize: "12px", // text-[12px]
              boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)", // shadow-sm
              marginLeft: "0.5rem", // mx-2
              marginRight: "0.5rem",
              display: "flex", // flex
              alignItems: "center", // items-center
              gap: "0.5rem", // gap-2
              transitionProperty: "opacity", // transition-opacity
              transitionDuration: "500ms", // duration-500
              opacity: fade ? 1 : 0,
              fontWeight: 500, // for font-medium in <span>
            }}
          >
            <img
              style={{ height: "15px" }}
              src="/icon/info-icon-svgrepo-com.svg"
              alt=""
            />
            <span>{depositTab[currentIndex]}</span>
          </div>
        )}

        <Report />
      </div>
    </div>
  );
};

export default DepositReport;
