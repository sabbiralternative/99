import { Fragment, useState } from "react";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import "./affiliate.css";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import Footer from "../../components/modules/Affiliate/Footer";

const Affiliate = () => {
  const [tab, setTab] = useState("dashboard");
  return (
    <div className="center-container" style={{ width: "100%" }}>
      <div data-v-4c49d924 className="container">
        {tab === "dashboard" && (
          <Fragment>
            <TodayStatusSection />
            <InviteSection />
            <TopFiveLossUser />
            <BonusInformation />
            <TodayProfitLoss />
          </Fragment>
        )}
        {tab === "user-list" && <UserList />}
        {tab === "pnl" && <ProfitLoss />}
        {tab === "reports" && <Reports />}
        <Footer setTab={setTab} tab={tab} />
      </div>
    </div>
  );
};

export default Affiliate;
