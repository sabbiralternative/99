import { useState } from "react";
import DepositReport from "./DepositReport";
import WithdrawReport from "./WithdrawReport";

const DepositWithdrawReport = () => {
  const [activeTab, setActiveTab] = useState("deposit");

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

        {activeTab === "deposit" && <DepositReport />}
        {activeTab === "withdraw" && <WithdrawReport />}
      </div>
    </div>
  );
};

export default DepositWithdrawReport;
