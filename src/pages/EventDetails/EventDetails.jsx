/* eslint-disable react/no-unknown-property */

import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import Score from "../../components/modules/EventDetails/Score";
import MatchOdds from "../../components/modules/EventDetails/MatchOdds";
import Bookmaker from "../../components/modules/EventDetails/Bookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import { useAccessTokenMutation } from "../../redux/features/casino/casino.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPredictOdd,
  setStake,
} from "../../redux/features/events/eventSlice";
import Tab from "../../components/modules/EventDetails/Tab";
import { useCurrentBets } from "../../hooks/currentBets";
import CurrentBets from "../../components/modules/EventDetails/CurrentBets";
import ScoreCard from "../../components/modules/EventDetails/ScoreCard";

const EventDetails = () => {
  const { eventTypeId, eventId } = useParams();
  const { data: currentBet } = useCurrentBets(eventId);

  const [tab, setTab] = useState("odd");
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);
  const [showIFrame, setShowIFrame] = useState(false);
  const [getIFrame, { data: IFrame }] = useAccessTokenMutation();
  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
  );

  const matchOdds = data?.result?.filter(
    (match_odd) =>
      match_odd.btype === "MATCH_ODDS" && match_odd?.visible == true
  );

  const bookmaker = data?.result?.filter(
    (bookmaker) => bookmaker.btype === "BOOKMAKER" && bookmaker?.visible == true
  );

  const fancyData = data?.result?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );

  useEffect(() => {
    if (showIFrame) {
      const payload = {
        eventTypeId,
        eventId,
        type: "video",
      };
      getIFrame(payload);
    }
  }, [eventId, eventTypeId, getIFrame, showIFrame]);

  useEffect(() => {
    if (placeBetValues?.totalSize) {
      dispatch(setStake(placeBetValues?.totalSize?.toFixed(2)));
    }
  }, [placeBetValues, dispatch]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  return (
    <div _ngcontent-bym-c104 className="main-content">
      <div
        _ngcontent-bym-c104
        className="game-page"
        style={{ position: "relative" }}
      >
        <div _ngcontent-bym-c104 _nghost-bym-c46 className="tab-container">
          <Tab currentBet={currentBet} tab={tab} setTab={setTab} />
          {tab === "odd" && (
            <div _ngcontent-bym-c46 className="tab-content">
              <div
                _ngcontent-bym-c104
                heading="ODDS"
                role="tabpanel"
                aria-labelledby
                className="tab-pane active"
              >
                <div _ngcontent-bym-c104>
                  <div _ngcontent-bym-c104 className="tab-content">
                    <div
                      _ngcontent-bym-c104
                      id="odds"
                      className="tab-pane active"
                    >
                      <div _ngcontent-bym-c104 className="match-title">
                        <span _ngcontent-bym-c104 className="match-name">
                          {data?.result?.[0]?.eventName}
                        </span>
                        <span _ngcontent-bym-c104 className="float-right">
                          <span _ngcontent-bym-c104>
                            {" "}
                            {data?.result?.[0]?.openDate}
                          </span>
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          position: "relative",
                          height: "auto",
                          paddingBottom: "56.25%",
                        }}
                        _ngcontent-bym-c104
                        id="collapseBasic"
                        aria-hidden="true"
                        className={`collapse  ${
                          showIFrame && IFrame?.result?.url ? "show" : ""
                        }`}
                      >
                        <iframe
                          _ngcontent-bym-c104
                          id="tvStr"
                          allowFullScreen
                          width="100%"
                          className="LiveStream-video-col"
                          src={IFrame?.result?.url}
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            left: "0",
                            top: "0",
                            // bottom: "0",
                            // right: "0",
                          }}
                        />
                      </div>
                      {data?.score?.tracker && (
                        <div
                          style={{
                            width: "100%",
                            height: "125px",
                            overflow: "hidden",
                          }}
                          _ngcontent-bym-c104
                          id="collapseBasic"
                          aria-hidden="true"
                          className={`collapse  show`}
                        >
                          <iframe
                            _ngcontent-bym-c104
                            id="tvStr"
                            allowFullScreen
                            width="100%"
                            className="LiveStream-video-col"
                            src={data?.score?.tracker}
                            style={{
                              width: "100%",
                              height: "125px",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                      )}

                      <div _ngcontent-bym-c104>
                        {eventTypeId == 4 &&
                          data?.result?.[0]?.score?.length > 0 && (
                            <Score score={data?.result?.[0]?.score} />
                          )}

                        <div _ngcontent-bym-c104 className="sr-widget-1" />

                        {eventTypeId == 4 &&
                          data?.result?.[0]?.score2?.length !== 0 &&
                          !Array.isArray(data?.result?.[0]?.score2) && (
                            <ScoreCard score2={data?.result?.[0]?.score2} />
                          )}
                        {matchOdds && matchOdds?.length > 0 && (
                          <MatchOdds matchOdds={matchOdds} />
                        )}
                        {bookmaker && bookmaker?.length > 0 && (
                          <Bookmaker bookmaker={bookmaker} />
                        )}
                        {fancyData && fancyData?.length > 0 && (
                          <Fancy fancy={fancyData} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab === "matchedBet" && <CurrentBets currentBet={currentBet} />}
        </div>
        {data?.score?.hasVideo && (
          <div _ngcontent-bym-c104 className="tv-icon">
            <p _ngcontent-bym-c104 className="mb-0">
              <a
                _ngcontent-bym-c104
                aria-controls="collapseBasic"
                aria-expanded="false"
              >
                <FontAwesomeIcon
                  onClick={() => setShowIFrame((prev) => !prev)}
                  style={{ color: "white", fontSize: "10px" }}
                  icon={faTv}
                  className="mr-1"
                />
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
