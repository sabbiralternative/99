import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";

const PG = ({ depositData }) => {
  return (
    <div className="col-md-6">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="account-data">
            <p className="card-text">
              <b> Wallet Address</b>: {depositData?.token}
              <button
                onClick={() => handleCopyToClipBoard(depositData?.token)}
                className="btn btn-sm btn-success"
                data-clipboard-text="Guddu Kumar"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
            </p>
            <p className="card-text">
              <b> Amount</b>: USDT {depositData?.depositAmount}
              <button
                onClick={() =>
                  handleCopyToClipBoard(depositData?.depositAmount?.toString())
                }
                className="btn btn-sm btn-success"
                data-clipboard-text="Guddu Kumar"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
            </p>

            <p className="card-text">
              <img
                style={{ width: "100%", height: "100%" }}
                src={depositData?.qrCodeLink}
                alt=""
              />
            </p>
          </div>
        </div>
        <div className="col-md-11">
          <a href="https://upitobank.info" target="_blank">
            <div className="card">
              <div className="card-body upi-bank">
                <p>
                  <b>
                    How To Transfer Upi To Bank
                    <br />
                    CLICK HERE WWW.UPITOBANK.INFO
                  </b>
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PG;
