import { Fragment } from "react";
import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
// import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import "./affiliate.css";
import UserList from "../../components/modules/Affiliate/UserList";
import ProfitLoss from "../../components/modules/Affiliate/ProfitLoss";
import Reports from "../../components/modules/Affiliate/Reports";
import Footer from "../../components/modules/Affiliate/Footer";
import { useLocation } from "react-router-dom";

const Affiliate = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tab = params.get("tab");

  return (
    <div className="center-container" style={{ width: "100%" }}>
      <div data-v-4c49d924 className="container">
        <Footer />
        {(tab === "dashboard" || !tab) && (
          <Fragment>
            <TodayStatusSection />
            <InviteSection />
            {/* <TopFiveLossUser /> */}
            <BonusInformation />
            <TodayProfitLoss />
          </Fragment>
        )}
        {tab === "user-list" && <UserList />}
        {tab === "pnl" && <ProfitLoss />}
        {tab === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default Affiliate;
