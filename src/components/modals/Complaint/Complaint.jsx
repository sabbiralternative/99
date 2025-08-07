import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { useForm } from "react-hook-form";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import toast from "react-hot-toast";

const Complaint = ({ setComplaintId, method, complaintId }) => {
  const complaintRef = useRef();
  const { register, handleSubmit } = useForm();

  const closeModal = () => {
    setComplaintId(null);
  };

  useCloseModalClickOutside(complaintRef, () => {
    closeModal();
  });

  const onSubmit = async ({ message }) => {
    const payload = {
      message,
      statement_id: complaintId,
      method,
      type: "raise_complaint",
    };

    const { data } = await AxiosSecure.post(API.index, payload);

    if (data?.success) {
      closeModal();
      toast.success(data?.result?.message);
    }
  };

  return (
    <div>
      <div className="modal-backdrop fade in show" />
      <div
        role="dialog"
        tabIndex={-1}
        className="modal fade show"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div
          tabIndex={0}
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        />
        <div role="document" className="modal-dialog modal-full">
          <div className="modal-content" ref={complaintRef}>
            <div>
              <div className="report-container modal-cs">
                <div className="card">
                  <div className="card-header">
                    <h4 className="mb-0">Raised Complaint</h4>
                    <button
                      onClick={closeModal}
                      type="button"
                      aria-label="Close"
                      className="close btn-close pull-right"
                    >
                      <span aria-hidden="true" className="visually-hidden">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="card-body container-fluid container-fluid-5">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="ng-untouched ng-pristine ng-valid"
                    >
                      <div
                        id="match_unmatched_delete"
                        role="radiogroup"
                        tabIndex={-1}
                      >
                        <textarea
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "5px",
                          }}
                          {...register("message", { required: true })}
                          placeholder="Write your complaint"
                        />
                        <div className="form-group mb-1">
                          <button
                            type="submit"
                            className="btn btn-primary btn-block"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaint;
