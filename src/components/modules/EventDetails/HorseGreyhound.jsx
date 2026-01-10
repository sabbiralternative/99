/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Status } from "../../../const";
import BetSlip from "../../shared/BetSlip/BetSlip";
import MarketRule from "../../modals/MarketRule/MarketRule";

const HorseGreyhound = ({ data }) => {
  const [showRule, setShowRule] = useState(false);
  const { eventId } = useParams();
  const { data: exposure } = useExposure(eventId);
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timeDiff, setTimeDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    if (!data?.[0]?.openDate) return;

    const targetDateStr = data[0].openDate;
    const [date, time] = targetDateStr.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    const targetDate = new Date(year, month - 1, day, hour, minute, second);

    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        const currentDate = new Date();
        const diffInMs = targetDate - currentDate;

        if (diffInMs <= 0) {
          clearInterval(interval);
          setTimeDiff({ day: 0, hour: 0, minute: 0, second: 0 });
          return;
        }

        const day = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const hour = Math.floor(
          (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((diffInMs % (1000 * 60)) / 1000);

        setTimeDiff({ day, hour, minute, second });
      }, 1000);

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const handleBetSlip = (betType, games, runner, price) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.horse_name,
        name: games.runners.map((runner) => runner.horse_name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
      };

      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.id));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      {showRule && <MarketRule setShowRule={setShowRule} />}
      <div className="horse-banner">
        <img
          src="https://g1ver.sprintstaticdata.com/v42/static/front/img/10.png"
          className="img-fluid"
        />
        <div className="horse-banner-detail">
          <div className="text-success">OPEN</div>
          {timeDiff?.day ||
          timeDiff?.hour ||
          timeDiff?.minute ||
          timeDiff?.second ? (
            <div className="horse-timer">
              <span style={{ display: "flex", gap: "5px" }}>
                {timeDiff?.day > 0 && (
                  <span>
                    {timeDiff?.day} <small>Day</small>
                  </span>
                )}
                {timeDiff?.hour > 0 && (
                  <span>
                    {timeDiff?.hour} <small>Hour</small>
                  </span>
                )}
                {timeDiff?.minute > 0 && (
                  <span>
                    {timeDiff?.minute} <small>Minutes</small>
                  </span>
                )}
                {timeDiff?.hour === 0 && timeDiff?.minute < 60 && (
                  <span>
                    {timeDiff?.second} <small>Seconds</small>
                  </span>
                )}
              </span>
              <span>Remaining</span>
            </div>
          ) : null}

          <div className="time-detail">
            <p>{data?.[0]?.eventName}</p>
            <h5>
              <span>{data?.[0]?.openDate}</span>
              <span>| {data?.[0]?.raceType}</span>
            </h5>
          </div>
        </div>
      </div>
      {data?.map((games) => {
        return (
          <div key={games?.id} _ngcontent-bym-c104>
            <div _ngcontent-bym-c104 _nghost-bym-c100>
              <div _ngcontent-bym-c100>
                <div
                  _ngcontent-bym-c100
                  className="market-title mt-1"
                  style={{ height: "25px" }}
                >
                  <p _ngcontent-bym-c100 className="float-right mb-0">
                    <FontAwesomeIcon
                      onClick={() => setShowRule(true)}
                      icon={faInfoCircle}
                    />
                  </p>
                </div>
                <div _ngcontent-bym-c100 className="main-market">
                  <div
                    _ngcontent-bym-c100
                    className="table-header"
                    style={{ width: "100%" }}
                  >
                    <div
                      _ngcontent-bym-c100
                      className="float-left country-name box-6 min-max"
                    >
                      <b _ngcontent-bym-c100>
                        Min:100 Max:{games?.maxLiabilityPerBet}
                      </b>
                    </div>
                    <div
                      _ngcontent-bym-c100
                      className="back box-1 float-left text-center"
                    >
                      <b _ngcontent-bym-c100>BACK</b>
                    </div>
                    <div
                      _ngcontent-bym-c100
                      className="lay box-1 float-left text-center"
                    >
                      <b _ngcontent-bym-c100>LAY</b>
                    </div>
                  </div>
                  <div _ngcontent-bym-c100 className="table-body">
                    {games?.runners?.map((runner, idx) => {
                      return (
                        <>
                          <div
                            style={{ height: "37px" }}
                            key={runner?.id}
                            _ngcontent-bym-c100
                            className={`table-row ${
                              games?.status === Status.SUSPENDED
                                ? "suspended"
                                : ""
                            } `}
                            data-title={` ${
                              games?.status === Status.SUSPENDED
                                ? "suspended"
                                : ""
                            }`}
                          >
                            <div
                              style={{ display: "flex", gap: "10px" }}
                              _ngcontent-bym-c100
                              className="float-left country-name box-4"
                            >
                              <input
                                className=""
                                type="checkbox"
                                name="checkbox-runner-0"
                                id="checkbox-runner-0"
                              />
                              <div
                                style={{
                                  textAlign: "center",
                                }}
                              >
                                <div className="">
                                  {idx + 1}
                                  <br />({idx + 1})
                                </div>
                              </div>
                              <div>
                                <img src={runner?.image_id} />
                              </div>
                              <span _ngcontent-bym-c100 className="team-name">
                                <b _ngcontent-bym-c100> {runner?.horse_name}</b>
                              </span>
                            </div>

                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  games,
                                  runner,
                                  runner?.back[2]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="back-1 back1 blink box-1 float-left hidden-portrait text-center"
                            >
                              <button _ngcontent-bym-c100>
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.back[2]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.back[2]?.size}
                                </span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  games,
                                  runner,
                                  runner?.back[1]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="back-2 back2 blink box-1 float-left hidden-portrait text-center"
                            >
                              <button _ngcontent-bym-c100>
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.back?.[1]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.back?.[1]?.size}
                                </span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "back",
                                  games,
                                  runner,
                                  runner?.back[0]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="back blink box-1 float-left lock text-center"
                            >
                              <button
                                _ngcontent-bym-c100
                                data-toggle="modal"
                                data-target="#Placebet"
                              >
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.back?.[0]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.back?.[0]?.size}
                                </span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  games,
                                  runner,
                                  runner?.lay[0]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="blink box-1 float-left lay text-center"
                            >
                              <button _ngcontent-bym-c100>
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.lay?.[0]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.lay?.[0]?.size}
                                </span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  games,
                                  runner,
                                  runner?.lay?.[1]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="blink box-1 float-left hidden-portrait lay-2 text-center"
                            >
                              <button _ngcontent-bym-c100>
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.lay?.[1]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.lay?.[1]?.size}
                                </span>
                              </button>
                            </div>
                            <div
                              onClick={() =>
                                handleBetSlip(
                                  "lay",
                                  games,
                                  runner,
                                  runner?.lay?.[2]?.price
                                )
                              }
                              _ngcontent-bym-c100
                              className="blink box-1 float-left hidden-portrait lay-1 text-center"
                            >
                              <button _ngcontent-bym-c100>
                                <span
                                  _ngcontent-bym-c100
                                  className="odd d-block"
                                >
                                  {runner?.lay?.[2]?.price}
                                </span>
                                <span _ngcontent-bym-c100 className="d-block">
                                  {runner?.lay?.[2]?.size}
                                </span>
                              </button>
                            </div>
                          </div>
                          {runnerId === runner?.id && (
                            <BetSlip currentPlacedBetEvent={games} />
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div _ngcontent-bym-c104 />
          </div>
        );
      })}
    </>
  );
};

export default HorseGreyhound;
