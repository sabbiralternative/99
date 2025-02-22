import { useContext, useRef, useState } from "react";
import { ApiContext } from "../../../context/ApiProvider";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import LatestEvent from "./LatestEvent";
import { useLatestEvent } from "../../../hooks/latestEvent";
import Notification from "./Notification";
import useBalance from "../../../hooks/balance";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import images from "../../../assets/images";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import Search from "./Search";

/* eslint-disable react/no-unknown-property */
const Header = () => {
  const dropdownRef = useRef();

  const { user } = useSelector((state) => state.auth);
  const { data: balance } = useBalance();
  const { logo } = useContext(ApiContext);
  const { data } = useLatestEvent();
  const [showDropdown, setShowDropdown] = useState(false);

  useCloseModalClickOutside(dropdownRef, () => {
    setShowDropdown(false);
  });

  return (
    <div _ngcontent-htq-c85 _nghost-htq-c82>
      <header _ngcontent-htq-c82 className="header">
        <div _ngcontent-htq-c82 className="container-fluid">
          <div
            _ngcontent-htq-c82
            className="row row5 pt-1 pb-1 align-items-center"
          >
            <div _ngcontent-htq-c82 className="logo col-6">
              <Link
                _ngcontent-htq-c82
                to="/"
                className="router-link-exact-active router-link-active"
              >
                <FontAwesomeIcon
                  style={{ color: "white" }}
                  icon={faHome}
                  className="mr-1"
                />
                {/* <i _ngcontent-htq-c82 className="fas fa-home mr-1" /> */}
                <img
                  _ngcontent-htq-c82
                  alt="Exchange"
                  className="img-fluid logo"
                  src={logo}
                />
              </Link>
            </div>
            <div _ngcontent-htq-c82 className="col-6 text-right bal-expo">
              <p _ngcontent-htq-c82 className="mb-0">
                <img
                  _ngcontent-htq-c82
                  src={images.landMark}
                  alt="Exchange"
                  className="img-fluid pr-1"
                />
                <b _ngcontent-htq-c82>{balance?.availBalance}</b>
              </p>
              <div _ngcontent-htq-c82>
                <span _ngcontent-htq-c82 className="mr-1">
                  <u _ngcontent-htq-c82>Exp: {balance?.deductedExposure}</u>
                </span>
                <div
                  ref={dropdownRef}
                  onClick={() => setShowDropdown((prev) => !prev)}
                  _ngcontent-htq-c82
                  className="dropdown d-inline-block"
                >
                  <a
                    _ngcontent-htq-c82
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="dropdown-toggle"
                  >
                    <u _ngcontent-htq-c82 data-v-3f4cf84d>
                      {user}
                    </u>
                  </a>
                  <Dropdown showDropdown={showDropdown} />
                </div>
              </div>
            </div>
          </div>
          <div _ngcontent-uxw-c82="" className="btns__deposit_withdrawal">
            <Link _ngcontent-uxw-c82="" className="btn_deposit" to="/deposit">
              <img
                _ngcontent-uxw-c82=""
                routerlink="/deposit"
                src={images.deposit}
                className="img-fluid"
              />
              deposit{" "}
            </Link>
            <Link
              _ngcontent-uxw-c82=""
              routerlink="/withdraw"
              className="btn_withdrawal"
              to="/withdraw"
            >
              <img
                _ngcontent-uxw-c82=""
                src={images.withdraw}
                className="img-fluid"
              />
              withdrawal
            </Link>
          </div>
          <div _ngcontent-htq-c82 className="row row5 header-bottom">
            <div _ngcontent-htq-c82 className="col-12">
              <Search />

              <Notification />
            </div>
          </div>
          {data && data?.length > 0 && <LatestEvent latestEvent={data} />}
        </div>
      </header>
      {/* <a
    _ngcontent-htq-c82
    target="_blank"
    className="whatsapp_link"
    href="https://wa.link/allsitelink1"
  >
    <img _ngcontent-htq-c82 src="/src/assets/img/wp_support.webp" />
  </a> */}
      <div
        _ngcontent-htq-c82
        bsmodal
        tabIndex={-1}
        role="dialog"
        aria-labelledby
        className="modal fade force-change-password-popup"
      >
        <div _ngcontent-htq-c82 className="modal-dialog bookModal app_version">
          <div _ngcontent-htq-c82 className="modal-content">
            <div _ngcontent-htq-c82 className="modal-body p-0">
              <button
                _ngcontent-htq-c82
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
                <span _ngcontent-htq-c82 aria-hidden="true">
                  ×
                </span>
              </button>
              <a _ngcontent-htq-c82>
                <img
                  _ngcontent-htq-c82
                  src="https://tezcdn.io/casino/casino-highlight/poster-login-popup.webp"
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Header;
