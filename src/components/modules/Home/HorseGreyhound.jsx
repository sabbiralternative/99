import "../../../assets/css/mobile/horseGreyhound.css";
import moment from "moment-timezone";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const HorseGreyhound = ({ data, eventTypeId }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(
    data?.[0]?.childs?.[0]?.countryCode
  );

  useEffect(() => {
    if (data) {
      setSelectedCategory(data?.[0]?.childs?.[0]?.countryCode);
    }
  }, [data]);

  const findChildByCountryCode =
    selectedCategory &&
    data &&
    data?.[0]?.childs?.find((child) => child?.countryCode === selectedCategory);

  const convertToIST = (utc) => {
    return moment(utc).tz("Asia/Kolkata").format("HH:mm");
  };

  return (
    <>
      <div className="tab-content mt-1">
        <div className="tab-pane active">
          <div className="nav nav-pills" role="tablist">
            {data?.map((item) =>
              item?.childs?.map((child) => {
                return (
                  <div
                    onClick={() => setSelectedCategory(child?.countryCode)}
                    key={child?.countryCode}
                    className="nav-item"
                  >
                    <a
                      role="tab"
                      data-rr-ui-event-key="0"
                      id="horse-tabs-tab-0"
                      aria-controls="horse-tabs-tabpane-0"
                      aria-selected="true"
                      className={`nav-link ${
                        child?.countryCode === selectedCategory ? "active" : ""
                      } `}
                    >
                      {child?.countryCode}
                    </a>
                  </div>
                );
              })
            )}
          </div>
          <div className="tab-content">
            {findChildByCountryCode?.childs?.map((child) => {
              return (
                <div
                  key={child?.trackName}
                  role="tabpanel"
                  id="horse-tabs-tabpane-0"
                  aria-labelledby="horse-tabs-tab-0"
                  className="fade tab-pane active show"
                >
                  <div className="bet-table position-relative horse-table">
                    <div className="bet-table-body">
                      <div className="bet-table-row">
                        <div className="bet-nation-name">
                          <div className="game-icon">
                            <i className="fas fa-tv icon-tv"></i>
                          </div>
                          <div className="bet-nation-game-name">
                            <span>{child?.trackName}</span>
                          </div>
                        </div>
                        <div className="horse-time-detail">
                          {child?.childs?.map((children) => {
                            return (
                              <a
                                key={children?.eventId}
                                onClick={() =>
                                  navigate(
                                    `/event-details/${eventTypeId}/${children?.eventId}`
                                  )
                                }
                              >
                                <span>
                                  {" "}
                                  {convertToIST(children?.startTime)}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HorseGreyhound;
