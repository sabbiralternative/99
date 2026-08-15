import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const UPI = ({ depositData }) => {
  const { getLanguage } = useLanguage();
  return (
    <div className="col-md-6">
      <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="account-data">
            <p className="card-text">
              <b> {getLanguage(LanguageKey.DISPLAY_NAME)}</b>:{" "}
              {depositData?.upiAccountName}
              <button
                onClick={() =>
                  handleCopyToClipBoard(depositData?.upiAccountName)
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
              <b> {getLanguage(LanguageKey.UPI_DETAILS)}</b>:{" "}
              {depositData?.upiId}
              <button
                onClick={() => handleCopyToClipBoard(depositData?.upiId)}
                className="btn btn-sm btn-success"
                data-original-title
                title
              >
                <FontAwesomeIcon color="var(--theme2-bg)" icon={faCopy} />
              </button>
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

export default UPI;
