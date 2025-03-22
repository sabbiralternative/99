/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";

const LatestEvent = ({ latestEvent }) => {
  const navigate = useNavigate();
  return (
    <div _ngcontent-htq-c82 _nghost-htq-c80>
      <div
        _ngcontent-htq-c80
        className={`latest-event ${latestEvent?.length > 1 ? "row" : ""}`}
      >
        {latestEvent?.map((event) => {
          return (
            <div
              onClick={() =>
                navigate(
                  `/event-details/${event?.eventTypeId}/${event?.eventId}`
                )
              }
              style={{ width: "100%" }}
              key={event?.eventId}
              _ngcontent-htq-c80
              className="latest-event-item"
            >
              <a _ngcontent-htq-c80 className="new-launch-text">
                <img
                  _ngcontent-htq-c80
                  alt=""
                  src={`/m/src/assets/img/${event?.eventTypeId}.png`}
                />
                <span _ngcontent-htq-c80>{event?.eventName}</span>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestEvent;
