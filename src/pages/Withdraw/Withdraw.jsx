/* eslint-disable react/no-unknown-property */
import { useContext, useState } from "react";
import ChooseAmount from "./ChoseAmount";
import BankAccount from "./BankAccount";
import "./withdraw.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/ApiProvider";
import { useSelector } from "react-redux";

const Withdraw = () => {
  const navigate = useNavigate();
  const { logo } = useContext(ApiContext);
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState("");
  const [tab, setTab] = useState("choseAmount");
  return (
    <div _nghost-swn-c87="">
      <div _ngcontent-swn-c87="" id="casino-frm">
        <div _ngcontent-swn-c87="" className="casino-detail-head">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/")}
            _ngcontent-swn-c87=""
          >
            <FontAwesomeIcon
              style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
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
        <div
          className="col-md-10 featured-box"
          // style={{ paddingLeft: "0px", paddingRight: "0px" }}
        >
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
                <div
                  className=" withdraw-main-wrapper"
                  style={{ width: "100%" }}
                >
                  {tab === "choseAmount" && (
                    <ChooseAmount
                      amount={amount}
                      setAmount={setAmount}
                      setTab={setTab}
                    />
                  )}
                  {tab === "bank" && <BankAccount amount={amount} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
