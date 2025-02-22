/* eslint-disable react/no-unknown-property */

import { Link } from "react-router-dom";

const LatestEvent = ({ latestEvent }) => {
  return (
    <div _ngcontent-htq-c82 _nghost-htq-c80>
      <div _ngcontent-htq-c80 className="latest-event row">
        {latestEvent?.map((event) => {
          return (
            <div
              style={{ width: "100%" }}
              key={event?.eventId}
              _ngcontent-htq-c80
              className="latest-event-item"
            >
              <Link
                _ngcontent-htq-c80
                to={`/event-details/${event?.eventTypeId}/${event?.eventId}`}
                className="new-launch-text"
              >
                <img
                  _ngcontent-htq-c80
                  alt=""
                  src={`/m/src/assets/img/${event?.eventTypeId}.png`}
                />
                <span _ngcontent-htq-c80>{event?.eventName}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestEvent;
