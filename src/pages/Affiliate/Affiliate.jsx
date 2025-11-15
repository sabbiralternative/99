import BonusInformation from "../../components/modules/Affiliate/BonusInformation";
import InviteSection from "../../components/modules/Affiliate/InviteSection";
import TodayProfitLoss from "../../components/modules/Affiliate/TodayProfitLoss";
import TodayStatusSection from "../../components/modules/Affiliate/TodayStatusSection";
import TopFiveLossUser from "../../components/modules/Affiliate/TopFiveLossUser";
import "./affiliate.css";

const Affiliate = () => {
  return (
    <div className="center-container" style={{ width: "100%" }}>
      <div data-v-4c49d924 className="container">
        <TodayStatusSection />
        <InviteSection />
        <TopFiveLossUser />
        <BonusInformation />
        <TodayProfitLoss />
      </div>
    </div>
  );
};

export default Affiliate;
