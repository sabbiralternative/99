/* eslint-disable react/no-unknown-property */

import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../../const";
import BetSlip from "../../shared/BetSlip/BetSlip";
import { useDispatch, useSelector } from "react-redux";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { useEffect, useState } from "react";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import { Settings } from "../../../api";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarketRule from "../../modals/MarketRule/MarketRule";
import SpeedCashOut from "../../modals/SpeedCashOut/SpeedCashOut";
import { isGameSuspended } from "../../../utils/isOddSuspended";

const Bookmaker = ({ bookmaker }) => {
  const [speedCashOut, setSpeedCashOut] = useState(null);
  const [showRule, setShowRule] = useState(false);
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

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
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
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
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      navigate("/login");
    }
  };

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId,
  ) => {
    let runner,
      largerExposure,
      layValue,
      oppositeLayValue,
      lowerExposure,
      speedCashOut;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = 1 + Number(runner2?.lay?.[0]?.price) / 100;
      oppositeLayValue = 1 + Number(runner1?.lay?.[0]?.price) / 100;
      lowerExposure = exposureA;
    }

    if (exposureA > 0 && exposureB > 0) {
      const difference = Math.abs(exposureA - exposureB);
      if (difference <= 10) {
        speedCashOut = true;
      }
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
      exposureA,
      exposureB,
      runner1,
      runner2,
      speedCashOut,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      bookmaker?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      bookmaker.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id,
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id,
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id,
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmaker, eventId]);
  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  return (
    <>
      {speedCashOut && (
        <SpeedCashOut
          speedCashOut={speedCashOut}
          setSpeedCashOut={setSpeedCashOut}
        />
      )}
      {showRule && <MarketRule setShowRule={setShowRule} />}
      {bookmaker?.map((games) => {
        const teamProfitForGame = teamProfit?.find(
          (profit) =>
            profit?.gameId === games?.id && profit?.isOnePositiveExposure,
        );
        const speedCashOut = teamProfit?.find(
          (profit) => profit?.gameId === games?.id && profit?.speedCashOut,
        );

        return (
          <div key={games?.id} _ngcontent-bym-c104>
            <div _ngcontent-bym-c104>
              <div _ngcontent-bym-c104>
                <div _ngcontent-bym-c104 _nghost-bym-c101>
                  <div _ngcontent-bym-c101>
                    <div _ngcontent-bym-c101 className="market-title mt-1">
                      {games?.name?.toUpperCase()}
                      {Settings.betFairCashOut &&
                        games?.runners?.length !== 3 &&
                        games?.status === "OPEN" &&
                        games?.name !== "toss" &&
                        !speedCashOut && (
                          <button
                            onClick={() =>
                              handleCashOutPlaceBet(
                                games,
                                "lay",
                                dispatch,
                                pnlBySelection,
                                token,
                                navigate,
                                teamProfitForGame,
                              )
                            }
                            style={{
                              cursor: `${
                                !teamProfitForGame ? "not-allowed" : "pointer"
                              }`,
                              opacity: `${!teamProfitForGame ? "0.6" : "1"}`,
                            }}
                            disabled={!teamProfitForGame}
                            _ngcontent-gdr-c100=""
                            class="btn-cashout"
                          >
                            cashout{" "}
                            {teamProfitForGame?.profit &&
                              teamProfitForGame?.profit?.toFixed(2)}
                          </button>
                        )}

                      {Settings.betFairCashOut &&
                        games?.runners?.length !== 3 &&
                        games?.status === "OPEN" &&
                        games?.name !== "toss" &&
                        speedCashOut && (
                          <button
                            style={{
                              backgroundColor: "#82371b",
                              color: "#fff",
                              border: "none",
                            }}
                            onClick={() =>
                              setSpeedCashOut({
                                ...speedCashOut,
                                market_name: games?.name,
                                event_name: games?.eventName,
                              })
                            }
                            disabled={isGameSuspended(games)}
                            _ngcontent-gdr-c100=""
                            class="btn-cashout"
                          >
                            {" "}
                            Speed Cashout
                          </button>
                        )}
                      <p _ngcontent-bym-c101 className="float-right mb-0">
                        <FontAwesomeIcon
                          onClick={() => setShowRule(true)}
                          icon={faInfoCircle}
                        />
                      </p>
                    </div>
                    <div _ngcontent-bym-c101 className="bookmaker-market">
                      <div _ngcontent-bym-c101 className="table-header">
                        <div
                          _ngcontent-bym-c101
                          className="float-left country-name box-6 min-max"
                        >
                          <b _ngcontent-bym-c101>
                            Min:100 Max:{games?.maxLiabilityPerBet}
                          </b>
                        </div>
                        <div
                          _ngcontent-bym-c101
                          className="back box-1 float-left text-center"
                        >
                          <b _ngcontent-bym-c101>BACK</b>
                        </div>
                        <div
                          _ngcontent-bym-c101
                          className="lay box-1 float-left text-center"
                        >
                          <b _ngcontent-bym-c101>LAY</b>
                        </div>
                      </div>
                      <div _ngcontent-bym-c101 className="table-body">
                        {games?.runners?.map((runner) => {
                          const pnl = pnlBySelection?.find(
                            (pnl) => pnl?.RunnerId === runner?.id,
                          );
                          const predictOddValues = predictOdd?.find(
                            (val) => val?.id === runner?.id,
                          );
                          return (
                            <>
                              <div
                                style={{ height: "37px" }}
                                key={runner?.id}
                                _ngcontent-bym-c101
                                className={`table-row ${
                                  runner?.status === Status.SUSPENDED
                                    ? "suspended"
                                    : ""
                                } `}
                                data-title={` ${
                                  runner?.status === Status.SUSPENDED
                                    ? "suspended"
                                    : ""
                                }`}
                              >
                                <div
                                  _ngcontent-bym-c101
                                  className="float-left country-name box-4"
                                >
                                  <span
                                    _ngcontent-bym-c101
                                    className="team-name"
                                  >
                                    <b _ngcontent-bym-c101>{runner?.name}</b>
                                  </span>
                                  {pnl && (
                                    <p
                                      _ngcontent-gdr-c100=""
                                      class="mob-expo-cs"
                                    >
                                      <span
                                        _ngcontent-gdr-c100=""
                                        class="float-left"
                                      >
                                        <span
                                          _ngcontent-gdr-c100=""
                                          class={` ${
                                            pnl?.pnl > 0
                                              ? "text-green"
                                              : "text-red"
                                          }`}
                                        >
                                          {" "}
                                          {pnl?.pnl}
                                        </span>
                                      </span>
                                    </p>
                                  )}
                                  {stake && runnerId && predictOddValues && (
                                    <p
                                      key={predictOddValues?.id}
                                      _ngcontent-gdr-c100=""
                                      class="mob-expo-cs"
                                    >
                                      <span
                                        _ngcontent-gdr-c100=""
                                        class="float-left"
                                      >
                                        <b
                                          _ngcontent-gdr-c100=""
                                          class={` ${
                                            predictOddValues?.exposure > 0
                                              ? "text-green"
                                              : "text-red"
                                          }`}
                                        >
                                          &nbsp;({predictOddValues?.exposure})
                                        </b>
                                      </span>
                                    </p>
                                  )}
                                </div>

                                <div
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      games,
                                      runner,
                                      runner?.back[2]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="back-1 back1 box-1 float-left text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.back?.[2]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
                                      {runner?.back?.[2]?.size}
                                    </span>
                                  </button>
                                </div>
                                <div
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      games,
                                      runner,
                                      runner?.back[1]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="back-2 back2 box-1 float-left text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.back?.[1]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
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
                                      runner?.back[0]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="back box-1 float-left lock text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.back?.[0]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
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
                                      runner?.lay?.[0]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="box-1 float-left lay text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.lay?.[0]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
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
                                      runner?.lay?.[1]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="box-1 float-left lay-2 text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.lay?.[1]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
                                      {runner?.lay?.[1]?.price}
                                    </span>
                                  </button>
                                </div>
                                <div
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      games,
                                      runner,
                                      runner?.lay?.[0]?.price,
                                    )
                                  }
                                  _ngcontent-bym-c101
                                  className="box-1 float-left lay-1 text-center"
                                >
                                  <button _ngcontent-bym-c101>
                                    <span
                                      _ngcontent-bym-c101
                                      className="odd d-block"
                                    >
                                      {runner?.lay?.[2]?.price}
                                    </span>
                                    <span
                                      _ngcontent-bym-c101
                                      className="d-block"
                                    >
                                      {runner?.lay?.[2]?.size}
                                    </span>
                                  </button>
                                </div>
                              </div>
                              {runnerId === runner?.id && (
                                <BetSlip
                                  currentPlacedBetEvent={games}
                                  setRunnerId={setRunnerId}
                                />
                              )}
                            </>
                          );
                        })}
                      </div>
                    </div>
                    {/* <div
                      _ngcontent-bym-c101
                      className="table-remark text-right remark"
                    >
                      <marquee _ngcontent-bym-c101>
                        Zimbabwe v Ireland : Match Bets Started in our Exchange
                        🏏
                      </marquee>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Bookmaker;
