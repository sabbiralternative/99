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
        {highlight_casino?.map((item) => {
          return (
            <div
              onClick={() => handleNavigateToIFrame(item)}
              key={item?.id}
              _ngcontent-gkq-c98
              className="col-3 position-relative"
              style={{ paddingRight: "1px", paddingLeft: "1px" }}
            >
              <img
                _ngcontent-gkq-c98
                className="img-fluid"
                src={`${item?.url_thumb}`}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HighLightThumbnails;
