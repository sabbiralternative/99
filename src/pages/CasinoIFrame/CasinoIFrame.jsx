/* eslint-disable react/no-unknown-property */

import { useNavigate, useParams } from "react-router-dom";
import { useLiveCasinoIframeMutation } from "../../redux/features/casino/casino.api";
import { useContext, useEffect } from "react";
import { ApiContext } from "../../context/ApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { Settings } from "../../api";
import Loader from "../../components/shared/Loader/Loader";

const CasinoIFrame = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { logo } = useContext(ApiContext);
  const [handleGetIFrame, { data, isLoading, isSuccess }] =
    useLiveCasinoIframeMutation();
  const { gameId } = useParams();

  useEffect(() => {
    const payload = {
      gameId: gameId,
      isHome: false,
      mobileOnly: true,
      casino_currency: Settings.casino_currency,
    };

    handleGetIFrame(payload);
  }, [handleGetIFrame, gameId]);

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
        {isLoading && !isSuccess && <Loader />}
        <iframe
          _ngcontent-swn-c87=""
          allowFullScreen
          title="game"
          id="casino-link"
          className="embed-responsive-item"
          src={data?.gameUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default CasinoIFrame;
