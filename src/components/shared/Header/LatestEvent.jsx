/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";

const LatestEvent = ({ latestEvent }) => {
  const navigate = useNavigate();
  return (
    <div _ngcontent-htq-c82 _nghost-htq-c80>
      <div
        _ngcontent-htq-c80
        style={{ margin: "2px" }}
        className={`latest-event ${latestEvent?.length > 1 ? "row" : ""}`}
      >
        {latestEvent?.map((event) => {
          return (
            <div
              onClick={() =>
                navigate(
                  `/event-details/${event?.eventTypeId}/${event?.eventId}`,
                )
              }
              // style={{ width: "100%" }}
              key={event?.eventId}
              _ngcontent-htq-c80
              className="latest-event-item"
            >
              <a _ngcontent-htq-c80 className="new-launch-text">
                <img
                  _ngcontent-htq-c80
                  alt=""
                  src={`/src/assets/img/${event?.eventTypeId}.png`}
                />

                <div _ngcontent-yta-c80="">
                  <span _ngcontent-yta-c80="">Afghanistan v West Indies</span>
                  <b _ngcontent-yta-c80="">19/01/2026 20:30</b>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestEvent;
