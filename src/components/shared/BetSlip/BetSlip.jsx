/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import {
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import useBalance from "../../../hooks/balance";
import { useCurrentBets } from "../../../hooks/currentBets";
import { useOrderMutation } from "../../../redux/features/events/events";
import { Settings } from "../../../api";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";

const BetSlip = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchExposure } = useExposure(eventId);
  const { placeBetValues, price, stake } = useSelector((state) => state?.event);
  const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  const [betDelay, setBetDelay] = useState("");

  useEffect(() => {
    dispatch(setPrice(placeBetValues?.price));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null
      )
    );
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ];
    setLoading(true);
    setBetDelay(placeBetValues?.betDelay);
    const delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    // Introduce a delay before calling the API
    setTimeout(async () => {
      const res = await createOrder(payloadData).unwrap();
      if (res?.success) {
        setLoading(false);
        refetchExposure();
        refetchBalance();
        dispatch(setRunnerId(null));
        refetchCurrentBets();
        setBetDelay("");
        toast.success(res?.result?.result?.placed?.[0]?.message);
      } else {
        setLoading(false);
        toast.error(
          res?.error?.status?.[0]?.description || res?.error?.errorMessage
        );
        setBetDelay("");
      }
    }, delay);
  };

  const closeBetSlip = () => {
    dispatch(setRunnerId(null));
  };

  useEffect(() => {
    if (betDelay > 0) {
      setTimeout(() => {
        setBetDelay((prev) => prev - 1);
      }, 1000);
    } else {
      setBetDelay(null);
    }
  }, [setBetDelay, betDelay]);
  return (
    <div _ngcontent-ukj-c100="" style={{ zIndex: "999" }}>
      <div _ngcontent-ukj-c100="" _nghost-ukj-c63="">
        <div
          _ngcontent-ukj-c63=""
          class={`new-betslip ${placeBetValues?.back ? "back" : "lay"}`}
        >
          <div _ngcontent-ukj-c63="" id="goto-1.238886397-1006">
            {loading && (
              <div
                style={{ position: "absolute" }}
                _ngcontent-ukj-c63=""
                id="loadInner"
                class="ng-star-inserted"
              >
                <div _ngcontent-ukj-c63="" id="load-inner">
                  <FontAwesomeIcon
                    style={{ fontSize: "23px" }}
                    icon={faSpinner}
                    className=" fa-spin"
                  />
                  <span
                    style={{ position: "absolute", left: "10px", top: "3px" }}
                  >
                    {" "}
                    {betDelay}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div _ngcontent-ukj-c63="" class="row mx-0">
            <div _ngcontent-ukj-c63="" class="col-6">
              <div _ngcontent-ukj-c63="" class="input-group">
                {!placeBetValues?.isWeak && (
                  <div
                    onClick={() =>
                      handleDecreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice
                      )
                    }
                    _ngcontent-ukj-c63=""
                    class="input-group-prepend"
                  >
                    <span _ngcontent-ukj-c63="" class="input-group-text">
                      -
                    </span>
                  </div>
                )}

                <input
                  onChange={(e) => dispatch(setPrice(e.target.value))}
                  _ngcontent-ukj-c63=""
                  type="number"
                  min="1.01"
                  max="999.99"
                  class="form-control ng-untouched ng-pristine ng-valid"
                  value={price}
                />
                {!placeBetValues?.isWeak && (
                  <div
                    onClick={() =>
                      handleIncreasePrice(
                        price,
                        placeBetValues,
                        dispatch,
                        setPrice
                      )
                    }
                    _ngcontent-ukj-c63=""
                    class="input-group-append"
                  >
                    <span _ngcontent-ukj-c63="" class="input-group-text">
                      +
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div _ngcontent-ukj-c63="" class="col-6">
              <input
                onChange={(e) => dispatch(setStake(e.target.value))}
                _ngcontent-ukj-c63=""
                type="number"
                value={stake !== null && stake}
                placeholder="00"
                class="form-control ng-untouched ng-pristine ng-valid"
              />
            </div>
          </div>
          <div _ngcontent-ukj-c63="" class="row mx-0">
            <div _ngcontent-ukj-c63="" class="new-stakes mb-0 col-12 px-0">
              {parseButtonValues?.map((button, i) => {
                return (
                  <button
                    onClick={() => dispatch(setStake(button?.value))}
                    key={i}
                    _ngcontent-ukj-c63=""
                    class="ot-stake"
                  >
                    <FontAwesomeIcon icon={faPlus} /> {button?.value}
                  </button>
                );
              })}

              <button
                onClick={() => dispatch(setStake(100))}
                _ngcontent-ukj-c63=""
                class="min-stake"
              >
                min stake
              </button>
              <button
                onClick={() =>
                  dispatch(
                    setStake(
                      parseButtonValues[parseButtonValues?.length - 1]?.value
                    )
                  )
                }
                _ngcontent-ukj-c63=""
                class="max-stake"
              >
                max stake
              </button>
              <button _ngcontent-ukj-c63="" class="all-in-stake">
                Edit Stake
              </button>
              <button
                onClick={() => {
                  dispatch(setStake(null));
                }}
                _ngcontent-ukj-c63=""
                class="clear-stake"
              >
                clear
              </button>
            </div>
          </div>
          <div _ngcontent-ukj-c63="" class="row mx-0">
            <div _ngcontent-ukj-c63="" class="col-6 px-0">
              <button
                onClick={closeBetSlip}
                _ngcontent-ukj-c63=""
                class="new-cancel-button"
              >
                cancel
              </button>
            </div>
            <div _ngcontent-ukj-c63="" class="col-6 px-0">
              <button
                _ngcontent-ukj-c63=""
                class="new-placebet-button"
                onClick={handleOrderBets}
              >
                place bet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;
