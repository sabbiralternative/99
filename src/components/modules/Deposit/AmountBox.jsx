import toast from "react-hot-toast";
import useDepositBreakdown from "../../../hooks/depositBreakdown";

const AmountBox = ({ setTab, setAmount, amount }) => {
  const { mutate: handleDepositBreakdown } = useDepositBreakdown();

  const handleShowPaymentMethods = () => {
    if (amount) {
      handleDepositBreakdown(
        { amount },
        {
          onSuccess: (data) => {
            if (data?.minimumDeposit && amount < data?.minimumDeposit) {
              toast.error(`Minimum deposit amount is ${data?.minimumDeposit}`);
            } else {
              setTab("bankAccount");
            }
          },
        }
      );
    } else {
      return toast.error("Amount is required");
    }
  };

  return (
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-12">
          <div>
            <div
              className="col-md-12 card amount-div"
              style={{ marginTop: "10px" }}
            >
              <div className="card-body">
                <form id="amountForm" method="post">
                  <input
                    type="hidden"
                    name="_token"
                    defaultValue="UyyVAHBHaqYFcyWmX8uPuo1iw9C6q5woWtYSzycO"
                  />{" "}
                  <div className="form-group">
                    <label>Amount</label>
                    <div className="input-group">
                      <input
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        type="number"
                        className="form-control"
                        name="amount"
                        id="amount"
                        placeholder="Enter amount"
                      />
                      <div className="input-group-append">
                        <button
                          onClick={handleShowPaymentMethods}
                          type="button"
                          className="input-group-text amountBtn"
                          data-wp-add
                          id="basic-addon2"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-12 account-list"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div
                  className="card-body text-left"
                  style={{
                    fontSize: "10px !important",
                    color: "red",
                  }}
                >
                  <p>
                    1. Deposit money only in the below available accounts to get
                    the fastest credits and avoid possible delays.
                  </p>
                  <p>
                    2. Deposits made 45 minutes after the account removal from
                    the site are valid &amp; will be added to their wallets.
                  </p>
                  <p>
                    3. Site is not responsible for money deposited to Old,
                    Inactive or Closed accounts.
                  </p>
                  <p>
                    4. After deposit, add your UTR and amount to receive
                    balance.{" "}
                  </p>
                  <p>
                    5. NEFT receiving time varies from 40 minutes to 2 hours.{" "}
                  </p>
                  <p>
                    6. In case of account modification: payment valid for 1 hour
                    after changing account details in deposit page.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountBox;
