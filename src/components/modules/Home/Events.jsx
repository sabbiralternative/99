import { useSelector } from "react-redux";
import { useGroupQuery } from "../../../redux/features/events/events";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import images from "../../../assets/images";

const Events = ({ homeTab }) => {
  const navigate = useNavigate();
  const { group } = useSelector((state) => state.global);
  const { data } = useGroupQuery(
    { sportsType: group },
    {
      pollingInterval: 1000,
    }
  );

  const filterSports =
    data &&
    Object.keys(data)?.filter((key) => {
      if (homeTab === "inPlay") {
        return data?.[key]?.visible === true && data?.[key]?.inPlay === 1;
      } else {
        return data?.[key]?.visible;
      }
    });

  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  return (
    <div className="tab-content">
      <div role="tabpanel" aria-labelledby className="tab-pane active">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            position: "relative",
          }}
        >
          <ul className="live_virtual" style={{ display: "flex" }}>
            <li>
              <input
                type="checkbox"
                defaultValue="Order one"
                id="checkboxOne4-inplay"
                className="ng-untouched ng-pristine ng-valid"
              />
              <label htmlFor="checkboxOne4-inplay">LIVE</label>
            </li>
            <li>
              <input
                type="checkbox"
                defaultValue="Order Two"
                id="checkboxTwo4-inplay"
                className="ng-untouched ng-pristine ng-valid"
              />
              <label htmlFor="checkboxTwo4-inplay">VIRTUAL</label>
            </li>
          </ul>
          <div className="filter-ct">
            <label>View by:</label>
            <select className="form-control-sm ng-untouched ng-pristine ng-valid">
              <option value="c">Competitions</option>
              <option value="t">Time</option>
            </select>
          </div>
        </div>
        <div>
          <div>
            <div
              className="game-listing-container"
              style={{
                maxHeight: homeTab === "inPlay" ? "230px" : "100%",
              }}
            >
              <div>
                {data && Object.values(data).length > 0 ? (
                  filterSports
                    ?.sort((keyA, keyB) => {
                      return data[keyA].sort - data[keyB].sort;
                    })
                    ?.sort((keyA, keyB) => {
                      if (
                        data[keyA].timeStatus === "Suspended" &&
                        data[keyB].timeStatus !== "Suspended"
                      ) {
                        return 1;
                      }
                      if (
                        data[keyA].timeStatus !== "Suspended" &&
                        data[keyB].timeStatus === "Suspended"
                      ) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((key, index) => {
                      return (
                        <div
                          key={index}
                          className="game-list pt-1 pb-1 container-fluid"
                        >
                          <a onClick={() => navigateGameList(key)}>
                            <div className="row row5">
                              <div className="col-8">
                                <p className="mb-0 game-name">
                                  <strong>{data?.[key]?.eventName}</strong>
                                </p>
                                <p className="mb-0">{data?.[key]?.date}</p>
                              </div>
                              <div className="col-4 text-right">
                                <div className="game-icons">
                                  {data[key]?.inPlay === 1 && (
                                    <span className="game-icon">
                                      <span
                                        className="active-icon"
                                        style={{
                                          verticalAlign: "bottom",
                                        }}
                                      />
                                    </span>
                                  )}
                                  {data[key]?.isTv === 1 && (
                                    <span className="game-icon">
                                      {/* <i
                                        
                                        className="fas fa-tv"
                                      /> */}
                                      <FontAwesomeIcon
                                        style={{
                                          color: "black",
                                          fontSize: "10px",
                                        }}
                                        icon={faTv}
                                      />
                                    </span>
                                  )}
                                  {data[key]?.isFancy === 1 && (
                                    <span className="game-icon">
                                      <img src={images.ic_fancy} />
                                    </span>
                                  )}
                                  {data[key]?.isBookmaker === 1 && (
                                    <span className="game-icon">
                                      <img
                                        src={images.ic_bm}
                                        className="bm-icon"
                                      />
                                    </span>
                                  )}

                                  <span className="game-icon" />
                                </div>
                              </div>
                            </div>
                          </a>
                          <div className="row row5">
                            <div className="col-12">
                              <div className="text-center game-col game-home">
                                <b>1</b>
                              </div>
                              <div className="text-center game-col game-home">
                                <b>X</b>
                              </div>
                              <div className="text-center game-col game-home">
                                <b>2</b>
                              </div>
                            </div>
                          </div>
                          <div className="row row5">
                            <div className="col-12">
                              <div className="text-center game-col game-home">
                                <a className="btn-back">
                                  {data[key]?.[0]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </a>
                                <a className="btn-lay">
                                  {data[key]?.[0]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </a>
                              </div>
                              <div className="text-center game-col game-home">
                                <a className="btn-back">
                                  {data[key]?.[2]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </a>
                                <a className="btn-lay">
                                  {data[key]?.[2]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </a>
                              </div>
                              <div className="text-center game-col game-home">
                                <a className="btn-back">
                                  {data[key]?.[1]?.ex?.availableToBack[0]
                                    ?.price ?? "-"}
                                </a>
                                <a className="btn-lay">
                                  {data[key]?.[1]?.ex?.availableToLay[0]
                                    ?.price ?? "-"}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>
                    <div>
                      <span> No events available right now</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
