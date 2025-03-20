/* eslint-disable react/no-unknown-property */
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { ApiContext } from "../../context/ApiProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import WithdrawConfirm from "./WithdrawConfirm";
import BankAccounts from "./BankAccounts";
import SelectAmount from "./SelectAmount";
import { useBankAccount } from "../../hooks/bankAccount";
import AddBank from "./AddBank";
import { setAddBank } from "../../redux/features/global/globalSlice";

const Withdraw = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { logo } = useContext(ApiContext);
  const [amount, setAmount] = useState("");
  const [showBankAccount, setShowBankAccount] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [bank, setBank] = useState("");
  const { addBank } = useSelector((state) => state.global);
  const payload = {
    type: "getBankAccounts",
    status: "1",
  };
  const { data: bankData, refetch: refetchBankData } = useBankAccount(payload);

  useEffect(() => {
    if (showBankAccount && bankData?.length < 1) {
      setShowBankAccount(false);
      dispatch(setAddBank(true));
    }
  }, [bankData, showBankAccount, dispatch]);

  return (
    <div _nghost-swn-c87="">
      <div _ngcontent-swn-c87="" id="casino-frm">
        <div _ngcontent-swn-c87="" className="casino-detail-head">
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => navigate("/")}
            _ngcontent-swn-c87=""
          >
            <FontAwesomeIcon
              style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
              icon={faHome}
              className="mr-1"
            />
            <img
              _ngcontent-swn-c87=""
              alt="Exchange"
              className="img-fluid logo"
              src={logo}
            />
          </button>
          <h4 _ngcontent-swn-c87=""></h4>
          <span _ngcontent-swn-c87="">
            <FontAwesomeIcon
              style={{ color: "white" }}
              icon={faUser}
              className="mr-1"
            />
            {user}
          </span>
        </div>
        <div className="col-md-10 featured-box">
          <div className="bankingUi">
            <div className="container-fluid">
              <div className="row">
                {!showBankAccount && !confirmWithdraw && (
                  <SelectAmount
                    setShowBankAccount={setShowBankAccount}
                    setAmount={setAmount}
                    amount={amount}
                  />
                )}
                {showBankAccount && bankData?.length > 0 && (
                  <BankAccounts
                    refetchBankData={refetchBankData}
                    setAmount={setAmount}
                    bankData={bankData}
                    setConfirmWithdraw={setConfirmWithdraw}
                    setShowBankAccount={setShowBankAccount}
                    bank={bank}
                    setBank={setBank}
                  />
                )}
                {addBank && bankData?.length == 0 && (
                  <AddBank refetchBankData={refetchBankData} />
                )}
                {confirmWithdraw && (
                  <WithdrawConfirm
                    amount={amount}
                    bank={bank}
                    setAmount={setAmount}
                    setShowBankAccount={setShowBankAccount}
                    setConfirmWithdraw={setConfirmWithdraw}
                    setBank={setBank}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
