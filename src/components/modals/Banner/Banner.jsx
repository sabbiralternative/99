import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useCloseModalClickOutside from "../../../hooks/closeModal";

const Banner = () => {
  const modalRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const modal = JSON.parse(localStorage.getItem("modal"));

  useEffect(() => {
    const hasModalBeenShown = localStorage.getItem("hasModalBeenShown");
    if (!hasModalBeenShown) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem("hasModalBeenShown", "true");
  };

  useCloseModalClickOutside(modalRef, () => {
    closeModal();
  });
  return (
    <>
      {token && showModal && modal && modal?.banner && (
        <div
          ref={modalRef}
          onClick={closeModal}
          tabIndex={-1}
          role="dialog"
          aria-labelledby
          className="modal fade force-change-password-popup in show"
          aria-hidden="false"
          aria-modal="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog bookModal app_version">
            <div className="modal-content">
              <div className="modal-body p-0">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  className="close"
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: 0,
                    color: "#fff",
                    fontSize: "21px",
                    opacity: 1,
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
                <a>
                  <img src={modal && modal.banner} style={{ width: "100%" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
