/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import AmountBox from "../../components/modules/Deposit/AmountBox";
import BankAccountUploadTransaction from "../../components/modules/Deposit/BankAccountUploadTransaction";
import DepositTransaction from "../../components/modules/Deposit/DepositTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/ApiProvider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Deposit = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { logo } = useContext(ApiContext);
  const [tab, setTab] = useState("amountBox");
  const [amount, setAmount] = useState(null);

  return (
    <div _nghost-swn-c87="">
      <div _ngcontent-swn-c87="" id="casino-frm">
        <div _ngcontent-swn-c87="" className="casino-detail-head">
          <button onClick={() => navigate("/")} _ngcontent-swn-c87="">
            <FontAwesomeIcon
              style={{ color: "white" }}
              icon={faHome}
              className="mr-1"
            />
            <img
              _ngcontent-swn-c87=""
              alt="Exchange"
              className="img-fluid logo"
              src={logo}
            />
          </button>
          <h4 _ngcontent-swn-c87=""></h4>
          <span _ngcontent-swn-c87="">
            <FontAwesomeIcon
              style={{ color: "white" }}
              icon={faUser}
              className="mr-1"
            />
            {user}
          </span>
        </div>
        <div className="col-md-10 featured-box">
          <div className="bankingUi">
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-12 text-center pt-3 logo-section"
                  style={{ display: "none" }}
                >
                  <img
                    className="img-fluid main-logo"
                    src="https://speedcdn.io/assets/logos/gold365.com.png"
                    style={{ width: "150px" }}
                  />
                  <h2>G51India53(387.2)</h2>
                </div>
                {tab === "amountBox" ? (
                  <AmountBox
                    amount={amount}
                    setAmount={setAmount}
                    setTab={setTab}
                  />
                ) : (
                  <BankAccountUploadTransaction
                    amount={amount}
                    setTab={setTab}
                  />
                )}

                <DepositTransaction />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
