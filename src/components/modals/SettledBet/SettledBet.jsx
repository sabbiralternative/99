import { useRef } from "react";
import { useGetSettledBets } from "../../../hooks/settledBet";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const SettledBet = ({ setMarketId, marketId }) => {
  const settledBetRef = useRef();
  const { data } = useGetSettledBets(marketId);

  useCloseModalClickOutside(settledBetRef, () => {
    setMarketId(null);
  });

  return (
    <div>
      <div className="modal-backdrop fade in show" />
      <div
        role="dialog"
        tabIndex={-1}
        className="modal fade show"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
        <div role="document" className="modal-dialog modal-full">
          <div className="modal-content" ref={settledBetRef}>
            <div>
              <div className="report-container modal-cs">
                <div className="card">
                  <div className="card-header">
                    <h4 className="mb-0">Bet History</h4>
                    <button
                      onClick={() => setMarketId(null)}
                      type="button"
                      aria-label="Close"
                      className="close btn-close pull-right"
                    >
                      <span aria-hidden="true" className="visually-hidden">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="card-body container-fluid container-fluid-5">
                    <form
                      noValidate
                      className="ng-untouched ng-pristine ng-valid"
                    >
                      <div
                        id="match_unmatched_delete"
                        role="radiogroup"
                        tabIndex={-1}
                      >
                        <div className="custom-control custom-control-inline custom-radio">
                          <input
                            id="matched"
                            type="radio"
                            name="is_matched"
                            autoComplete="off"
                            className="custom-control-input ng-untouched ng-pristine ng-valid"
                          />
                          <label
                            htmlFor="matched"
                            className="custom-control-label"
                          >
                            <span>Matched</span>
                          </label>
                        </div>
                        <div className="custom-control custom-control-inline custom-radio">
                          <input
                            id="deleteed"
                            type="radio"
                            name="is_matched"
                            autoComplete="off"
                            className="custom-control-input ng-untouched ng-pristine ng-valid"
                          />
                          <label
                            htmlFor="deleteed"
                            className="custom-control-label"
                          >
                            <span>Deleted</span>
                          </label>
                        </div>
                      </div>
                    </form>

                    <div className="row row5 mt-2">
                      <div className="col-12">
                        {data?.map((bet) => {
                          return (
                            <div
                              key={bet?.betId}
                              className={`bet-history lay ${
                                bet?.betType === "Back" ? "back" : "lay"
                              }`}
                            >
                              <div className="row row5">
                                <div className="col-6">
                                  <div>
                                    <a>
                                      <b>{bet?.eventName}</b>
                                    </a>
                                  </div>
                                  <div>
                                    <strong>Nation: </strong>
                                    {bet?.nation}
                                  </div>
                                  <div>
                                    <strong>Place Date: </strong>
                                    {bet?.placeDate}
                                  </div>
                                  <div>
                                    <strong>Match Date: </strong>
                                    n/A
                                  </div>
                                </div>
                                <div className="col-2 text-right">
                                  <div>
                                    <b>Rate</b>
                                  </div>
                                  <div>{bet?.userRate} </div>
                                </div>
                                <div className="col-2 text-right">
                                  <div>
                                    <b>Amount</b>
                                  </div>
                                  <div>{bet?.amount}</div>
                                </div>
                                <div className="col-2 text-right">
                                  <div>
                                    <b>W&amp;L</b>
                                  </div>
                                  <div
                                    className={`${
                                      bet?.win > 0
                                        ? "text-success"
                                        : "text-danger"
                                    }`}
                                  >
                                    {" "}
                                    {bet?.win}{" "}
                                  </div>
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
  );
};

export default SettledBet;
