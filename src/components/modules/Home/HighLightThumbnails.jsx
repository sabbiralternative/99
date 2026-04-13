/* eslint-disable react/no-unknown-property */

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HighLightThumbnails = ({ highlight_casino }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino?product=${casino?.product}&category=${casino?.category}`);
  };
  return (
    <>
      {/* <div _ngcontent-htq-c97 className="row mx-0 mt-1">
        {highlight_casino?.slice(0, 2)?.map((item) => {
          return (
            <div
              onClick={() => handleNavigateToIFrame(item)}
              key={item?.id}
              _ngcontent-htq-c97
              className="col-6 position-relative"
              style={{ paddingRight: "1px", paddingLeft: "1px" }}
              tabIndex={0}
            >
              <img
                _ngcontent-htq-c97
                src={`/${item?.url_thumb}`}
                className="img-fluid"
              />
            </div>
          );
        })}
      </div>
      <div _ngcontent-htq-c97 className="row mx-0" style={{ marginTop: "2px" }}>
        {highlight_casino?.slice(2, 4)?.map((item) => {
          return (
            <div
              onClick={() => handleNavigateToIFrame(item)}
              key={item?.id}
              _ngcontent-htq-c97
              className="col-6 position-relative"
              style={{ paddingRight: "1px", paddingLeft: "1px" }}
              tabIndex={0}
            >
              <img
                _ngcontent-htq-c97
                src={`/${item?.url_thumb}`}
                className="img-fluid"
              />
            </div>
          );
        })}
      </div> */}

      <div _ngcontent-gkq-c98 className="row mx-0 mt-1 highlight-casino">
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17741821545376191.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17721055468085952.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17753225505208026.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17721055626412579.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px", marginTop: "2px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17721055725370388.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px", marginTop: "2px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17721055808070945.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px", marginTop: "2px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17753845197295887.gif"
          />
        </div>
        <div
          _ngcontent-gkq-c98
          className="col-3 position-relative"
          style={{ paddingRight: "1px", paddingLeft: "1px", marginTop: "2px" }}
        >
          <img
            _ngcontent-gkq-c98
            className="img-fluid"
            src="https://pulseedge.io/frontend_config/diam/images/17721055992383369.gif"
          />
        </div>
        {/**/}
      </div>
    </>
  );
};

export default HighLightThumbnails;
