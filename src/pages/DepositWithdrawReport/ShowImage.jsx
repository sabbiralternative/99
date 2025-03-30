import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/closeModal";

const ShowImage = ({ setShowImage, image }) => {
  const showImageRef = useRef();
  useCloseModalClickOutside(showImageRef, () => {
    setShowImage(false);
  });

  return (
    <>
      <div className="overlay-container" aria-live="polite">
        <div
          id="toast-container"
          className="toast-top-center toast-container"
        ></div>
      </div>
      <div className="modal-backdrop fade in show"></div>
      <div
        role="dialog"
        className="modal fade show"
        style={{ display: "block" }}
        aria-modal="true"
      >
        <div
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        ></div>
        <div role="document" className="modal-dialog">
          <div className="modal-content" ref={showImageRef}>
            <div className="modal-body">
              <button
                type="button"
                data-dismiss="modal"
                aria-label="Close"
                className="close"
                style={{
                  top: "-13px",
                  right: "-8px",
                  position: "relative",
                  fontSize: "15px",
                  opacity: 1,
                }}
              >
                <i className="fa fa-close"></i>
              </button>
              <div className="table-responsive">
                <img src={image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div
          className="cdk-visually-hidden cdk-focus-trap-anchor"
          aria-hidden="true"
        ></div>
      </div>
    </>
  );
};

export default ShowImage;
