/* eslint-disable react/no-unknown-property */
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../context/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";

const SportsBook = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { logo } = useContext(ApiContext);

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
        <iframe
          _ngcontent-swn-c87=""
          allowFullScreen
          title="game"
          id="casino-link"
          className="embed-responsive-item"
          src="https://sports-v3.mysportsfeed.io/auth?token=af9b6742-7e75-4b72-aa81-d08ea97a61a4&operatorId=21exch&partnerId=ECPID01&providerId=SportRadar&lobby=SportBook&currency=INR"
        ></iframe>
      </div>
    </div>
  );
};

export default SportsBook;
