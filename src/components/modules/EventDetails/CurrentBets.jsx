/* eslint-disable react/no-unknown-property */

const CurrentBets = ({ currentBet }) => {
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
                    Odds{" "}
                  </th>
                  <th _ngcontent-nfu-c64="" class="text-center">
                    {" "}
                    Stake{" "}
                  </th>
                </tr>
              </thead>
              {currentBet?.map((bet) => {
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
