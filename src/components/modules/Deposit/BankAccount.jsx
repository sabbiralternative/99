import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";

const BankAccount = ({ depositData }) => {
  return (
    <div className="col-md-6">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="account-data">
            <p className="card-text">
              <b>Bank Name</b>: {depositData?.bankName}
              <button
                onClick={() => handleCopyToClipBoard(depositData?.bankName)}
                className="btn btn-sm btn-success"
                data-clipboard-text="Guddu Kumar"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
            </p>
            <p className="card-text">
              <b>A/C No</b>: {depositData?.accountNumber}
              <button
                onClick={() =>
                  handleCopyToClipBoard(depositData?.accountNumber)
                }
                className="btn btn-sm btn-success"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
              <br />
            </p>
            <p className="card-text">
              <b>IFSC Code</b>: {depositData?.ifsc}
              <button
                onClick={() => handleCopyToClipBoard(depositData?.ifsc)}
                className="btn btn-sm btn-success"
                data-clipboard-text="Psib0000890"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
              <br />
            </p>
            <p className="card-text">
              <b>Account Name</b>: {depositData?.accountName}
              <button
                onClick={() => handleCopyToClipBoard(depositData?.accountName)}
                className="btn btn-sm btn-success"
                data-clipboard-text="Guddu Kumar"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
            </p>
            <p className="card-text">
              <b> Min Amount </b>: 300
              <button
                className="btn btn-sm btn-success"
                data-clipboard-text={300}
                data-original-title
                title
              ></button>
              <br />
            </p>
            <p className="card-text">
              <b> Max Amount </b>: 200000
              <button
                className="btn btn-sm btn-success"
                data-clipboard-text={200000}
                data-original-title
                title
              ></button>
              <br />
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

export default BankAccount;
