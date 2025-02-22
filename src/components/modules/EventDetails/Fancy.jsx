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
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import { useState } from "react";
import Ladder from "../../modals/Ladder/Ladder";

const Fancy = ({ fancy }) => {
  const [ladderData, setLadderData] = useState([]);
  const [getLadder] = useGetLadderMutation();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { runnerId } = useSelector((state) => state.event);
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
        const pnl = pnlBySelection?.find((p) => p?.RunnerId === games?.id);
        if (pnl) {
          updatedPnl.push(pnl?.pnl);
        }
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
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
        pnl: updatedPnl,
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

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (marketId) => {
    const res = await getLadder({ marketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };

  return (
    <>
      {ladderData?.length > 0 && (
        <Ladder ladderData={ladderData} setLadderData={setLadderData} />
      )}
      <div
        _ngcontent-bym-c104
        className="newtab_collect tab-container"
        _nghost-bym-c46
      >
        <ul
          _ngcontent-bym-c46
          role="tablist"
          className="nav nav-tabs"
          aria-label="Tabs"
        >
          <li _ngcontent-bym-c46 className="active nav-item">
            <a
              _ngcontent-bym-c46
              role="tab"
              className="nav-link active"
              aria-controls
              aria-selected="true"
              id
            >
              <span _ngcontent-bym-c46 />
              <span _ngcontent-bym-c104>Fancy</span>
            </a>
          </li>
          <li _ngcontent-bym-c46 className="nav-item">
            <a
              _ngcontent-bym-c46
              role="tab"
              className="nav-link"
              aria-controls
              aria-selected="false"
              id
            >
              <span _ngcontent-bym-c46 />
              <span _ngcontent-bym-c104>Premium</span>
              <em _ngcontent-bym-c104 className="blink-soft">
                new
              </em>
            </a>
          </li>
        </ul>
        <div _ngcontent-bym-c46 className="tab-content">
          <div
            _ngcontent-bym-c104
            role="tabpanel"
            aria-labelledby
            className="tab-pane active"
          >
            <div _ngcontent-bym-c104 className="fancy-markets">
              <div
                _ngcontent-bym-c104
                type="tabs mt-2 fancy-nav"
                _nghost-bym-c46
                className="tab-container"
              >
                <ul
                  _ngcontent-bym-c46
                  role="tablist"
                  className="nav nav-tabs mt-2 fancy-nav"
                  aria-label="Tabs"
                >
                  <li _ngcontent-bym-c46 className="active nav-item">
                    <a
                      _ngcontent-bym-c46
                      role="tab"
                      className="nav-link active"
                      aria-controls
                      aria-selected="true"
                      id
                    >
                      <span _ngcontent-bym-c46 />
                      <span
                        _ngcontent-bym-c104
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        all
                      </span>
                    </a>
                  </li>
                  <li _ngcontent-bym-c46 className="nav-item">
                    <a
                      _ngcontent-bym-c46
                      role="tab"
                      className="nav-link"
                      aria-controls
                      aria-selected="false"
                      id
                    >
                      <span _ngcontent-bym-c46 />
                      <span
                        _ngcontent-bym-c104
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        sessions
                      </span>
                    </a>
                  </li>
                  <li _ngcontent-bym-c46 className="nav-item">
                    <a
                      _ngcontent-bym-c46
                      role="tab"
                      className="nav-link"
                      aria-controls
                      aria-selected="false"
                      id
                    >
                      <span _ngcontent-bym-c46 />
                      <span
                        _ngcontent-bym-c104
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        w/p market
                      </span>
                    </a>
                  </li>
                  <li _ngcontent-bym-c46 className="nav-item">
                    <a
                      _ngcontent-bym-c46
                      role="tab"
                      className="nav-link"
                      aria-controls
                      aria-selected="false"
                      id
                    >
                      <span _ngcontent-bym-c46 />
                      <span
                        _ngcontent-bym-c104
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        odd/even
                      </span>
                    </a>
                  </li>
                  <li _ngcontent-bym-c46 className="nav-item">
                    <a
                      _ngcontent-bym-c46
                      role="tab"
                      className="nav-link"
                      aria-controls
                      aria-selected="false"
                      id
                    >
                      <span _ngcontent-bym-c46 />
                      <span
                        _ngcontent-bym-c104
                        style={{
                          textTransform: "uppercase",
                        }}
                      >
                        xtra market
                      </span>
                    </a>
                  </li>
                </ul>

                {/* Above not using */}
                <div _ngcontent-bym-c46 className="tab-content">
                  <div
                    _ngcontent-bym-c104
                    role="tabpanel"
                    aria-labelledby
                    className="tab-pane active"
                  >
                    <div _ngcontent-bym-c104>
                      <div _ngcontent-bym-c104 className="fancy-market">
                        <div _ngcontent-bym-c104 />
                        <div _ngcontent-bym-c104>
                          <div _ngcontent-bym-c104>
                            <div _ngcontent-bym-c104 className="table-header">
                              <div
                                _ngcontent-bym-c104
                                className="market-title float-left country-name box-4"
                              >
                                <span
                                  _ngcontent-bym-c104
                                  className="text-uppercase mr-1"
                                >
                                  Fancy
                                </span>
                                <p
                                  _ngcontent-bym-c104
                                  className="float-right mb-0"
                                >
                                  <i
                                    _ngcontent-bym-c104
                                    data-toggle="modal"
                                    data-target="#Fancy_Rules"
                                    className="fas fa-info-circle"
                                  />
                                </p>
                              </div>
                              <div
                                _ngcontent-bym-c104
                                className="box-1 float-left lay text-center"
                              >
                                <b _ngcontent-bym-c104>No</b>
                              </div>
                              <div
                                _ngcontent-bym-c104
                                className="back box-1 float-left back text-center"
                              >
                                <b _ngcontent-bym-c104>Yes</b>
                              </div>
                            </div>
                            <div _ngcontent-bym-c104 _nghost-bym-c102>
                              <div _ngcontent-bym-c102>
                                <div _ngcontent-bym-c102 className="table-body">
                                  {fancy?.map((games) => {
                                    const pnl =
                                      pnlBySelection?.find(
                                        (pnl) => pnl?.MarketId === games?.id
                                      ) || {};

                                    return (
                                      <div key={games?.id} _ngcontent-bym-c102>
                                        <div _ngcontent-bym-c102>
                                          <div
                                            _ngcontent-bym-c102
                                            className="fancy-tripple"
                                          >
                                            <div
                                              _ngcontent-bym-c102
                                              className={`table-row ${
                                                games?.status ===
                                                Status.SUSPENDED
                                                  ? "suspended"
                                                  : ""
                                              } `}
                                              data-title={` ${
                                                games?.status ===
                                                Status.SUSPENDED
                                                  ? "suspended"
                                                  : ""
                                              }`}
                                            >
                                              <div
                                                _ngcontent-bym-c102
                                                className="float-left country-name box-4"
                                              >
                                                <span _ngcontent-bym-c102>
                                                  <b _ngcontent-bym-c102>
                                                    {games?.name}
                                                  </b>
                                                  {pnl && (
                                                    <em _ngcontent-tsu-c102="">
                                                      <span
                                                        _ngcontent-tsu-c102=""
                                                        class={`float-left ${
                                                          pnl?.pnl > 0
                                                            ? "text-green"
                                                            : "text-red"
                                                        } ng-star-inserted`}
                                                      >
                                                        {" "}
                                                        {pnl?.pnl}{" "}
                                                      </span>
                                                    </em>
                                                  )}
                                                </span>
                                                <div
                                                  _ngcontent-bym-c102
                                                  className="info-block"
                                                >
                                                  {pnl?.pnl && (
                                                    <a
                                                      onClick={() =>
                                                        handleGetLadder(
                                                          pnl?.MarketId
                                                        )
                                                      }
                                                      _ngcontent-bym-c102
                                                      data-bs-toggle="collapse"
                                                      data-bs-target
                                                      aria-expanded="false"
                                                      className="info-icon collapsed"
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faInfoCircle}
                                                        className="m-l-10"
                                                      />
                                                    </a>
                                                  )}

                                                  <div
                                                    _ngcontent-bym-c102
                                                    className="min-max-info collapse"
                                                    id="min-max-info6250"
                                                  >
                                                    <span _ngcontent-bym-c102>
                                                      <b _ngcontent-bym-c102>
                                                        Min:
                                                      </b>
                                                      100
                                                    </span>
                                                    <span _ngcontent-bym-c102>
                                                      <b _ngcontent-bym-c102>
                                                        Max:
                                                      </b>
                                                      {
                                                        games?.maxLiabilityPerBet
                                                      }
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              <div
                                                _ngcontent-bym-c102
                                                className="custom-odds-new"
                                              >
                                                <div
                                                  _ngcontent-bym-c102
                                                  className="con-boxes"
                                                >
                                                  <div
                                                    _ngcontent-bym-c102
                                                    className="box-1 float-left lay text-center"
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        handleBetSlip(
                                                          "lay",
                                                          games,
                                                          games?.runners?.[0],
                                                          games?.runners?.[0]
                                                            ?.lay?.[0]?.line
                                                        )
                                                      }
                                                      _ngcontent-bym-c102
                                                    >
                                                      <span
                                                        _ngcontent-bym-c102
                                                        className="odd d-block"
                                                      >
                                                        {
                                                          games?.runners?.[0]
                                                            ?.lay?.[0]?.line
                                                        }
                                                      </span>
                                                      <span
                                                        _ngcontent-bym-c102
                                                        className="d-block"
                                                      >
                                                        {
                                                          games?.runners?.[0]
                                                            ?.lay?.[0]?.price
                                                        }
                                                      </span>
                                                    </button>
                                                  </div>
                                                  <div
                                                    _ngcontent-bym-c102
                                                    className="back box-1 float-left text-center"
                                                  >
                                                    <button
                                                      onClick={() =>
                                                        handleBetSlip(
                                                          "back",
                                                          games,
                                                          games?.runners?.[0],
                                                          games?.runners?.[0]
                                                            ?.back?.[0]?.line
                                                        )
                                                      }
                                                      _ngcontent-bym-c102
                                                    >
                                                      <span
                                                        _ngcontent-bym-c102
                                                        className="odd d-block"
                                                      >
                                                        {
                                                          games?.runners?.[0]
                                                            ?.back?.[0]?.line
                                                        }
                                                      </span>
                                                      <span
                                                        _ngcontent-bym-c102
                                                        className="d-block"
                                                      >
                                                        {
                                                          games?.runners?.[0]
                                                            ?.back?.[0]?.price
                                                        }
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            {runnerId === games?.id && (
                                              <BetSlip
                                                setRunnerId={setRunnerId}
                                              />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fancy;
