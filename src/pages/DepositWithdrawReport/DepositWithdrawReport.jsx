import { useEffect, useState } from "react";
import DepositReport from "./DepositReport";
import WithdrawReport from "./WithdrawReport";
import { Settings } from "../../api";

const DepositWithdrawReport = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const depositTab = [
    'If you face any issue with your deposit, click the "Report Issue" button next to your deposit details to let us know.',
    "यदि आपकी जमा राशि में कोई समस्या आती है, तो हमें बताने के लिए अपनी डिपॉज़िट विवरण के पास दिए गए Report Issue बटन पर क्लिक करें",
  ];
  const withdrawTab = [
    'If you face any issue with your withdraw, click the "Report Issue" button next to your withdraw details to let us know.',
    "यदि आपको अपने निकासी (Withdrawal) में कोई समस्या आती है, तो हमें बताने के लिए अपनी निकासी विवरण के पास दिए गए  Report Issue बटन पर क्लिक करें",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => {
          const arrLength =
            activeTab === "deposit" ? depositTab.length : withdrawTab.length;
          return (prev + 1) % arrLength;
        });
        setFade(true);
      }, 500); // fade out duration
    }, 10000); // 10s display time

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div>
      <div style={{ width: "100%", margin: "auto", textAlign: "center" }}>
        <div style={{ padding: "0 8px", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
              gap: "24px",
              position: "relative",
            }}
          >
            <div
              onClick={() => setActiveTab("deposit")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  padding: "8px 25px",
                  fontSize: "13px",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  lineHeight: "1rem",
                  display: "block",
                  zIndex: 10,
                  transform: "scale(1)",
                  transition: "transform 0.1s ease-in-out",
                  backgroundColor:
                    activeTab === "deposit" ? "var(--theme1-bg)" : "",
                  color: activeTab === "deposit" ? "white" : "black",
                }}
                className={`active:scale-95 md:text-sm lg:text-base `}
              >
                Deposit
              </span>
            </div>
            <div
              onClick={() => setActiveTab("withdraw")}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  padding: "8px 25px",
                  fontSize: "13px",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  lineHeight: "1rem",
                  display: "block",
                  zIndex: 10,
                  transform: "scale(1)",
                  transition: "transform 0.1s ease-in-out",
                  backgroundColor:
                    activeTab === "withdraw" ? "var(--theme1-bg)" : "",
                  color: activeTab === "withdraw" ? "white" : "black",
                }}
                className={`text-text_Ternary active:scale-95 md:text-sm lg:text-base `}
              >
                Withdrawal
              </span>
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                width: "110.234px",
                height: "100%",
                transition: "all 150ms ease-in-out",
                borderRadius: "9999px",
                left: activeTab === "deposit" ? "0" : "125px",
              }}
              className="bg-bg_Primary"
            ></div>
          </div>
        </div>
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
            <span>
              {activeTab === "deposit"
                ? depositTab[currentIndex]
                : withdrawTab[currentIndex]}
            </span>
          </div>
        )}

        {activeTab === "deposit" && <DepositReport />}
        {activeTab === "withdraw" && <WithdrawReport />}
      </div>
    </div>
  );
};

export default DepositWithdrawReport;
