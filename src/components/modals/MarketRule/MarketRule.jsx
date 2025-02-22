import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const MarketRule = ({ setShowRule }) => {
  const showRuleRef = useRef();
  useCloseModalClickOutside(showRuleRef, () => {
    setShowRule(true);
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
        <div role="document" className="modal-dialog modal-xl">
          <div className="modal-content" ref={showRuleRef}>
            <div>
              <header id="BVID60_BV_modal_header" className="modal-header">
                <h5 id="BVID60_BV_modal_title" className="modal-title">
                  Match Rules
                </h5>
                <button
                  onClick={() => setShowRule(false)}
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </header>
              <div id="BVID60_BV_modal_body" className="modal-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <span>
                            CRICKET Match Odds :- In the event of match not
                            being completed or tied all bets will be void.
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            TENNIS Match Odds :- If 1st set has been not
                            completed at the time of the retirement or
                            disqualification, then all bets relating to that
                            individual match will be void.
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            FOOTBALL Match Odds :- All bets apply to the
                            relevant full regular time period including stoppage
                            time. Any extra-time and/or penalty shoot-out is not
                            included. For the cancellation of a goal, due to
                            VAR, bets matched between the time of the goal being
                            scored and the time at which the video assistant
                            referee finishes the review will be voided. For the
                            cancellation of a red card, due to VAR, bets matched
                            after the time at which the video assistant referee
                            commences the review will be voided.
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>
                            FOOTBALL Under_Over Goals :- In the event of a match
                            starting but not being completed, all bets will be
                            void, unless the specific market outcome is already
                            determined,
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/**/}
                {/**/}
                {/**/}
              </div>
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default MarketRule;
