import { useNavigate } from "react-router-dom";
import { useCurrentBets } from "../../hooks/currentBets";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const UnSettledBets = () => {
  const { getLanguage } = useLanguage();
  const { data } = useCurrentBets();
  const navigate = useNavigate();

  const navigateGameList = (item) => {
    navigate(`/event-details/${item?.eventTypeId}/${item?.eventId}`);
  };

  return (
    <div className="ng-star-inserted">
      <div className="ng-star-inserted">
        <div className="report-container">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                {" "}
                {getLanguage(LanguageKey.UNSETTLED_BETS)}
              </h4>
            </div>
            <div className="card-body container-fluid container-fluid-5">
              <div className="row row5 mt-2">
                <div className="col-12">
                  {data?.map((bet) => {
                    return (
                      <div
                        onClick={() => navigateGameList(bet)}
                        key={bet?.betId}
                        className={`bet-history back ng-star-inserted ${
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
                              <strong>
                                {" "}
                                {getLanguage(LanguageKey.NATION)}:{" "}
                              </strong>
                              {bet?.nation}
                            </div>
                            <div>
                              <strong>
                                {" "}
                                {getLanguage(LanguageKey.PLACED_DATE)}:{" "}
                              </strong>
                              {bet?.placeDate}
                            </div>
                            <div>
                              <strong>
                                {" "}
                                {getLanguage(LanguageKey.MATCH_DATE)}:{" "}
                              </strong>
                              N/A
                            </div>
                          </div>
                          <div className="col-2 text-right">
                            <div>
                              <b> {getLanguage(LanguageKey.USER_RATE)}</b>
                            </div>
                            <div>{bet?.userRate}</div>
                          </div>
                          <div className="col-2 text-right">
                            <div>
                              <b> {getLanguage(LanguageKey.AMOUNT)}</b>
                            </div>
                            <div>{bet?.amount}</div>
                          </div>
                          <div className="col-2 text-right">
                            <div>
                              <b>P&amp;L</b>
                            </div>
                            <div className="text-danger">N/A</div>
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
  );
};

export default UnSettledBets;
