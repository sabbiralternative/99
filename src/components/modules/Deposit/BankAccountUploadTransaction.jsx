import { useEffect, useRef, useState } from "react";
import { FaQrcode } from "react-icons/fa";
import { CiBank } from "react-icons/ci";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API, Settings } from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useGetPGStatus from "../../../hooks/useGetPGStatus";
import BankAccount from "./BankAccount";
import PaymentProof from "./PaymentProof";
import UPI from "./UPI";
import QR from "./QR";
import USDT from "./USDT";
import PG from "./PG";
import { useBankMutation } from "../../../redux/features/deposit/deposit.api";
import images from "../../../assets/images";

const BankAccountUploadTransaction = ({ setTab, amount }) => {
  const paymentMethodRef = useRef();
  const [getPaymentMethod, { data }] = useBankMutation();
  const [paymentId, setPaymentId] = useState(null);
  const [methodType, setMethodType] = useState(null);
  // const [pgPaymentMethods, setPgPaymentMethods] = useState({});
  // const [qrcode, setQrcode] = useState("");
  const [orderId, setOrderId] = useState("");
  const [time, setTime] = useState(null);
  const [depositData, setDepositData] = useState({});
  const navigate = useNavigate();
  const { pgStatus } = useGetPGStatus(orderId, methodType);

  useEffect(() => {
    getPaymentMethod({
      type: "depositMethods",
      amount,
    });
  }, [amount, getPaymentMethod]);

  const handleVisibleBankMethod = async (method) => {
    setMethodType(method?.type);
    setPaymentId(method?.paymentId);

    if (method?.type === "pg") {
      const depositDetailForPg = {
        paymentId: method?.paymentId,
        amount,
      };
      const res = await AxiosSecure.post(API.pg, depositDetailForPg);
      const data = res?.data;

      if (data?.success) {
        if (Settings?.paymentIntent) {
          // setPgPaymentMethods(data?.result);
          setTime(60 * 20);
          // setQrcode(data?.result?.upi);
          setOrderId(data?.result?.orderId);
        } else {
          window.location.href = data?.result?.link;
        }
      } else {
        toast.error(data?.result?.message);
      }
    } else {
      const depositDetail = {
        type: "depositDetails",
        paymentId: method?.paymentId,
        amount,
      };

      const res = await AxiosSecure.post(API.bankAccount, depositDetail);

      const data = res?.data;

      if (data?.success) {
        if (method?.type === "whatsapp") {
          window.location.href = data?.result?.link;
        } else {
          setDepositData(data?.result);
        }
      }
    }
  };
  useEffect(() => {
    if (time && methodType === "pg") {
      const timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time, methodType]);

  useEffect(() => {
    if (time === 0) {
      navigate("/account");
    } else if (pgStatus?.success) {
      setMethodType("");
      setOrderId("");
      toast.success(pgStatus?.result?.message);
      navigate("/account");
    }
  }, [time, navigate, pgStatus]);

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${seconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  useEffect(() => {
    if (
      paymentMethodRef &&
      paymentMethodRef.current &&
      methodType &&
      methodType !== "pg"
    ) {
      paymentMethodRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [methodType]);

  return (
    <div className="col-md-8">
      <div className="row">
        <div className="col-md-12">
          <div>
            <div className="col-md-12 account-list">
              <nav>
                <button
                  onClick={() => setTab("amountBox")}
                  className="btn btn-primary back_to_amount"
                  data-original-title
                  title
                >
                  &lt; Back
                </button>
                <div
                  className="nav nav-tabs"
                  id="nav-tab"
                  role="tablist"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                    gap: "5px",
                    borderBottom: "none",
                  }}
                >
                  {data?.result?.length > 0 &&
                    [...data.result]
                      .sort((a, b) => a?.sort - b?.sort)
                      ?.map((method) => {
                        return (
                          <button
                            onClick={() => handleVisibleBankMethod(method)}
                            style={{
                              color:
                                method?.paymentId === paymentId
                                  ? "white"
                                  : "black",
                              borderColor: "#dee2e6",
                              backgroundColor:
                                method?.paymentId === paymentId
                                  ? "var(--theme2-bg)"
                                  : "transparent",
                              display: "flex",
                              flexDirection: "column",
                              gap: "5px",
                              alignItems: "center",
                              borderRadius: "5px",
                            }}
                            key={method?.paymentId}
                            className="nav-link active"
                            id="nav-imps-128375-tab"
                            data-id={128375}
                            data-toggle="tab"
                            data-target="#nav-imps-128375"
                            type="button"
                            role="tab"
                            aria-controls="nav-imps-128375"
                            aria-selected="false"
                            data-original-title
                            title
                          >
                            {method?.type == "qr" && (
                              <FaQrcode size={20} color="gray" />
                            )}
                            {method?.type == "bank" && (
                              <CiBank size={20} color="gray" />
                            )}
                            {method?.type == "upi" || method?.type == "pg" ? (
                              <img
                                style={{ height: "20px", width: "20px" }}
                                src={images.upi}
                              />
                            ) : null}
                            {method?.type == "usdt" ? (
                              <img
                                style={{ height: "20px", width: "20px" }}
                                src={"/icon/trc20.svg"}
                              />
                            ) : null}
                            {method?.type == "usdt_bep20" ? (
                              <img
                                style={{ height: "20px", width: "20px" }}
                                src={"/icon/bep20.svg"}
                              />
                            ) : null}
                            {method?.type == "whatsapp" ? (
                              <img
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  filter: "none",
                                }}
                                src={"/icon/whatsapp.png"}
                              />
                            ) : null}

                            {method?.title}
                          </button>
                        );
                      })}
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-imps-128375"
                  role="tabpanel"
                  aria-labelledby="nav-contact-tab"
                >
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h5
                            style={{ textTransform: "uppercase" }}
                            className="card-title"
                            data-min={300.0}
                            data-max={200000.0}
                            id="account-name-128375"
                          >
                            {methodType}
                          </h5>
                          <div className="row" ref={paymentMethodRef}>
                            {methodType === "bank" && (
                              <BankAccount depositData={depositData} />
                            )}
                            {methodType === "upi" && (
                              <UPI depositData={depositData} />
                            )}
                            {methodType === "qr" && (
                              <QR depositData={depositData} />
                            )}
                            {methodType === "usdt" ||
                            methodType === "usdt_bep20" ? (
                              <USDT depositData={depositData} />
                            ) : null}
                            {methodType === "pg" && (
                              <PG depositData={depositData} />
                            )}
                            {methodType && methodType !== "whatsapp" && (
                              <PaymentProof
                                methodType={methodType}
                                amount={amount}
                                paymentId={paymentId}
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className="loading-div loading-imps-128375"
                          style={{ display: "none" }}
                        >
                          <div className="loading" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div
                  className="card-body text-left"
                  style={{ fontSize: "10px !important", color: "red" }}
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

export default BankAccountUploadTransaction;
