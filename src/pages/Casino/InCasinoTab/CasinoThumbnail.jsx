/* eslint-disable react/no-unknown-property */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CasinoThumbnail = ({ casinoData }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
  };
  return (
    <div _ngcontent-hot-c46 className="tab-content">
      <div
        _ngcontent-hot-c96
        id="goto-c-casino-0"
        role="tabpanel"
        aria-labelledby="goto-c-casino-0-link"
        className="tab-pane active"
      >
        <div
          _ngcontent-hot-c96
          className="row row5 mt-2"
          style={{ marginLeft: "0px", marginRight: "10px" }}
        >
          {casinoData?.map((casino) => {
            return (
              <div
                onClick={() => handleNavigateToIFrame(casino)}
                key={casino?.id}
                _ngcontent-hot-c96
                className="col-3 text-center"
                style={{ padding: "0px" }}
              >
                <div _ngcontent-hot-c96 className="casinoicons">
                  <a _ngcontent-hot-c96>
                    <img
                      _ngcontent-hot-c96
                      className="img-fluid"
                      src={casino?.url_thumb}
                    />
                    <div _ngcontent-hot-c96 className="casino-name">
                      {casino?.name}
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CasinoThumbnail;
