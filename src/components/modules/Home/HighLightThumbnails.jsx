/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";

const HighLightThumbnails = () => {
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
  };
  return (
    <>
      <div _ngcontent-htq-c97 className="row mx-0 mt-1">
        <div
          onClick={() => handleNavigate("/casino?category=Aviator")}
          _ngcontent-htq-c97
          className="col-6 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
          tabIndex={0}
        >
          <img
            _ngcontent-htq-c97
            src="https://tezcdn.io/casino/casino-highlight/aviator-730-280.gif"
            className="img-fluid"
          />
        </div>
        <div
          onClick={() => handleNavigate("/casino?category=Mines")}
          _ngcontent-htq-c97
          className="col-6 position-relative"
          style={{ paddingLeft: "1px", paddingRight: "1px" }}
          tabIndex={0}
        >
          <img
            _ngcontent-htq-c97
            src="https://tezcdn.io/casino/casino-highlight/evoplay-730-280.gif"
            className="img-fluid"
          />
        </div>
      </div>
      <div _ngcontent-htq-c97 className="row mx-0" style={{ marginTop: "2px" }}>
        <div
          onClick={() => handleNavigate("/casino?category=Fun Games")}
          _ngcontent-htq-c97
          className="col-6 position-relative popularDiv"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
          tabIndex={0}
        >
          <img
            _ngcontent-htq-c97
            src="https://tezcdn.io/casino/casino-highlight/fungames-730_280.gif"
            className="img-fluid"
          />
        </div>
        <div
          onClick={() => handleNavigate("/casino?category=Color Prediction")}
          _ngcontent-htq-c97
          className="col-6 position-relative popularDiv"
          style={{ paddingLeft: "1px", paddingRight: "1px" }}
          tabIndex={0}
        >
          <img
            _ngcontent-htq-c97
            src="https://tezcdn.io/casino/casino-highlight/wingogames-730-280.gif"
            className="img-fluid"
          />
        </div>
      </div>
    </>
  );
};

export default HighLightThumbnails;
