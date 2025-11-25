/* eslint-disable react/no-unknown-property */

import toast from "react-hot-toast";
import useSBCashOut from "../../../hooks/sb_cashout";

const CurrentBets = ({ currentBet, sportsBook, refetchCurrentBets }) => {
  const { mutate: cashOut } = useSBCashOut();

  const sports =
    sportsBook &&
    sportsBook?.MarketGroups?.filter(
      (group) =>
        group?.Name !== "Bet Builder" &&
        group?.Name !== "Fast Markets" &&
        group?.Name !== "Player Specials"
    );

  const handleCashOut = ({ betHistory, sportsBook, price, cashout_value }) => {
    let item;
    sports?.forEach((group) => {
      group?.Items?.forEach((data) => {
        if (betHistory?.marketId == data?.Id) {
          item = data;
        }
      });
    });

    const column = item?.Items?.find(
      (col) => col?.Id === betHistory?.selectionId
    );

    const payload = {
      price,
      cashout_value,
      back: true,
      side: 0,
      selectionId: column?.Id,
      btype: "SPORTSBOOK",
      placeName: column?.Name,
      eventTypeId: sportsBook?.EventTypeId,
      betDelay: sportsBook?.betDelay,
      marketId: item?.Id,
      maxLiabilityPerMarket: item?.maxLiabilityPerMarket,
      maxLiabilityPerBet: item?.maxLiabilityPerBet,
      isBettable: sportsBook?.isBettable,
      isWeak: sportsBook?.isWeak,
      marketName: item?.Name,
      eventId: sportsBook?.eventId,
      betId: betHistory?.betId,
    };

    cashOut(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetchCurrentBets();
          toast.success(data?.result?.message);
        } else {
          toast.error(data?.error);
        }
      },
    });
  };

  return (
    <>
      {currentBet?.length > 0 && (
        <tab
          _ngcontent-nfu-c104=""
          role="tabpanel"
          aria-labelledby=""
          class="tab-pane active"
        >
          <div _ngcontent-nfu-c104="" _nghost-nfu-c64="">
            <table
              _ngcontent-nfu-c64=""
              class="coupon-table table table-borderedless"
            >
              <thead _ngcontent-nfu-c64="">
                <tr _ngcontent-nfu-c64="">
                  <th _ngcontent-nfu-c64="" style={{ width: "60%" }}>
                    {" "}
                    Nation{" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-right">
                    {" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-right">
                    {" "}
                    Odds{" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-center">
                    {" "}
                    Stake{" "}
                  </th>
                </tr>
              </thead>
              {currentBet?.map((bet) => {
                let column;
                sports?.forEach((group) => {
                  group?.Items?.forEach((data) => {
                    if (bet?.marketId == data?.Id) {
                      column = data?.Items?.find(
                        (col) => col?.Id === bet?.selectionId
                      );
                    }
                  });
                });

                const price = (
                  0.92 * bet?.amount * (bet?.userRate / column?.Price) -
                  bet?.amount
                )?.toFixed(2);
                return (
                  <tr
                    key={bet?.betId}
                    _ngcontent-nfu-c64=""
                    class={` ${bet?.betType === "Back" ? "back" : "lay"}`}
                  >
                    <td _ngcontent-nfu-c64="" style={{ width: "60%" }}>
                      {bet?.nation}
                    </td>
                    <td _ngcontent-nfu-c64="" class="text-right">
                      {bet?.cashout && column && (
                        <button
                          onClick={() =>
                            handleCashOut({
                              betHistory: bet,
                              sportsBook,
                              price: column?.Price,
                              cashout_value: price,
                            })
                          }
                          type="button"
                          className="btn_box "
                          style={{
                            width: "auto",
                            backgroundColor: "#f3f3f3ff",
                            display: "flex",
                            alignItems: "center",
                            cursor: `pointer`,
                            justifyContent: "center",
                            gap: "0px 2px",
                            borderRadius: "2px",
                            border: "none",
                            padding: "4px 4px",
                          }}
                        >
                          <span style={{ fontSize: "10px", color: "black" }}>
                            Cashout
                          </span>
                          {price && (
                            <span style={{ color: "black", fontSize: "10px" }}>
                              :
                            </span>
                          )}

                          {price && (
                            <span
                              style={{
                                color: `${price > 0 ? "green" : "red"}`,
                                fontSize: "10px",
                              }}
                            >
                              {price}
                            </span>
                          )}
                        </button>
                      )}
                    </td>
                    <td _ngcontent-nfu-c64="" class="text-right">
                      {bet?.userRate}
                    </td>
                    <td _ngcontent-nfu-c64="" class="text-center">
                      {bet?.amount}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </tab>
      )}

      {currentBet?.length === 0 && (
        <tab
          _ngcontent-nfu-c104=""
          role="tabpanel"
          aria-labelledby=""
          class="tab-pane active"
        >
          <div _ngcontent-nfu-c104="" _nghost-nfu-c64="">
            <table
              _ngcontent-nfu-c64=""
              class="coupon-table table table-borderedless"
            >
              <thead _ngcontent-nfu-c64="">
                <tr _ngcontent-nfu-c64="">
                  <th _ngcontent-nfu-c64="" style={{ width: "60%" }}>
                    {" "}
                    Nation{" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-right">
                    {" "}
                    Odds{" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-center">
                    {" "}
                    Stake{" "}
                  </th>
                </tr>
              </thead>
              <tr _ngcontent-nfu-c64="">
                <td _ngcontent-nfu-c64="" colspan="3" class="text-center">
                  No records Found
                </td>
              </tr>
            </table>
          </div>
        </tab>
      )}
    </>
  );
};

export default CurrentBets;
