import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../../api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useDepositStatement } from "../../../hooks/accountStatement";
import { useBankMutation } from "../../../redux/features/deposit/deposit.api";
import useUTR from "../../../hooks/utr";

const PaymentProof = ({ paymentId, amount }) => {
  const { mutate: getUTR } = useUTR();
  const { refetch } = useDepositStatement();
  const [handlePayment] = useBankMutation();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [utr, setUtr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [filePath, setFilePath] = useState(null);

  useEffect(() => {
    if (image) {
      setLoading(true);
      const handleSubmitImage = async () => {
        const formData = new FormData();
        formData.append("image", image);

        const res = await axios.post(API.uploadScreenshot, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        if (data?.success) {
          getUTR(data?.filePath, {
            onSuccess: (data) => {
              if (data?.success) {
                if (data?.utr !== null) {
                  setUtr(data?.utr);
                }
              }
            },
          });
          setLoading(false);
          setUploadedImage(data?.fileName);

          setFilePath(data?.filePath);
          setImage(null);
        } else {
          setLoading(false);
          setUtr(null);
          setImage(null);
          setFilePath("");
          setUploadedImage(null);
          toast.error(data?.error);
        }
      };
      handleSubmitImage();
    }
  }, [image, token, getUTR]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    e.target.value = null;
  };

  const handleDepositSubmit = async (e) => {
    e.preventDefault();
    if (!filePath || !utr) {
      return;
    }
    if (uploadedImage || utr) {
      const screenshotPostData = {
        type: "depositSubmit",
        paymentId,
        amount: amount,
        fileName: uploadedImage,
        utr: String(utr),
      };

      const result = await handlePayment(screenshotPostData).unwrap();

      if (result?.success) {
        refetch();
        setUtr(null);
        setImage(null);
        toast.success(result?.result?.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setUtr("");
        setImage(null);
        setFilePath("");
        setUploadedImage(null);
        toast.error(result?.error?.errorMessage || result?.result?.message);
      }
    }
  };
  const handleUTRChange = (e) => {
    const value = e.target.value;
    if (/^[0-9]*$/.test(value)) {
      setUtr(value);
    }
  };
  const handleKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }
  };

  return (
    <div className="col-md-6">
      <form onSubmit={handleDepositSubmit}>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="transactionId">
              Unique Transaction Reference{" "}
              <small style={{ color: "red" }}>*</small>
            </label>
            <input
              onChange={handleUTRChange}
              onKeyDown={handleKeyDown}
              type="text"
              className="form-control"
              name="transaction_id"
              id="transactionId"
              placeholder="6 to 12 Digit UTR Number"
              value={utr !== null ? utr : null}
            />
          </div>
          {!filePath && !loading && (
            <div className="form-group">
              <label htmlFor="proofOfDeposit128375">
                Upload Your Payment Proof{" "}
                <small style={{ color: "red" }}>[Required]</small>
              </label>
              <input
                onChange={(e) => handleImageChange(e)}
                type="file"
                className="form-control"
                name="deposit_proof"
                id="proofOfDeposit128375"
              />
            </div>
          )}

          {filePath && !loading && (
            <div
              className="form-group"
              style={{
                position: "relative",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <button
                style={{ position: "absolute", top: "0px", right: "0px" }}
                onClick={() => {
                  setFilePath("");
                  setUploadedImage(null);
                  setImage(null);
                }}
              >
                X
              </button>
              <img style={{ width: "100%" }} src={filePath} alt="" />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">
              Amount
              <small style={{ color: "red" }}>*</small>
            </label>
            <input
              type="number"
              className="form-control"
              name="amount"
              readOnly
              value={amount}
              id="amount128375Input"
              placeholder="Enter amount"
            />
          </div>

          <div
            className="custom-control custom-checkbox"
            style={{ marginTop: "10px" }}
          >
            <input
              type="checkbox"
              className="custom-control-input"
              name="terms_condition"
              id="termsCheck128375"
              defaultChecked
            />
            <label className="custom-control-label" htmlFor="termsCheck128375">
              I have read and agree with{" "}
              <a
                data-toggle="modal"
                data-target="#termsAndCondition"
                className="terms-condition"
              >
                the terms of payment and withdrawal policy.
              </a>
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button
            disabled={!filePath || !utr ? true : false}
            style={{
              cursor: `${!filePath || !utr ? "not-allowed" : "pointer"}`,
            }}
            type="submit"
            className="btn btn-info depositBtn"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentProof;
