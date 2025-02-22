import { useRef } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/no-unknown-property */
const Ladder = ({ setLadderData, ladderData }) => {
  const ladderRef = useRef();

  useCloseModalClickOutside(ladderRef, () => {
    setLadderData([]);
  });
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
        <div role="document" focustrap className="modal-dialog">
          <div className="modal-content" ref={ladderRef}>
            <div _ngcontent-tsu-c102 className="modal-body">
              <button
                onClick={() => setLadderData([])}
                _ngcontent-tsu-c102
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
                <FontAwesomeIcon icon={faClose} className="ml-2" />
              </button>
              <div _ngcontent-tsu-c102 className="table-responsive">
                <table
                  _ngcontent-tsu-c102
                  id="btDataTable"
                  className="table table-bordered btDataTable mb-0"
                  style={{ width: "100%" }}
                >
                  <thead _ngcontent-tsu-c102>
                    <tr _ngcontent-tsu-c102>
                      <th _ngcontent-tsu-c102>RUN</th>
                      <th _ngcontent-tsu-c102>POSITION</th>
                    </tr>
                  </thead>
                  <tbody _ngcontent-tsu-c102>
                    {ladderData?.map((item, i) => {
                      return (
                        <tr
                          key={i}
                          _ngcontent-tsu-c102
                          id="goto-169"
                          className="ng-star-inserted"
                        >
                          <td _ngcontent-tsu-c102>
                            {" "}
                            {item?.start}-{item?.end}
                          </td>
                          <td
                            _ngcontent-tsu-c102
                            className={` ${
                              item?.exposure > 0 ? "text-green" : "text-red"
                            }`}
                          >
                            {item?.exposure}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ladder;
