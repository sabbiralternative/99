import { useContext, useEffect, useRef, useState } from "react";
import { ApiContext } from "../../../context/ApiProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import LatestEvent from "./LatestEvent";
import { useLatestEvent } from "../../../hooks/latestEvent";
import Notification from "./Notification";
import useBalance from "../../../hooks/balance";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import images from "../../../assets/images";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import Search from "./Search";
import { Settings } from "../../../api";
import Referral from "../../modals/Referral/Referral";
import {
  setClosePopUpForForever,
  setShowAPKModal,
  setShowAppPopUp,
} from "../../../redux/features/global/globalSlice";
import AppPopup from "./AppPopUp";
// import DownloadAPK from "../../modals/DownloadAPK/DownloadAPK";
import BuildVersion from "../../modals/BuildVersion/BuildVersion";
import Error from "../../modals/Error/Error";

/* eslint-disable react/no-unknown-property */
const Header = () => {
  const [showBuildVersion, setShowBuildVersion] = useState(false);
  const stored_build_version = localStorage.getItem("build_version");
  const navigate = useNavigate();
  const { showAppPopUp, windowWidth, showAPKModal, closePopupForForever } =
    useSelector((state) => state?.global);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showReferral, setShowReferral] = useState(false);
  const dropdownRef = useRef();
  const { user, token } = useSelector((state) => state.auth);
  const { data: balance } = useBalance();
  const { logo } = useContext(ApiContext);
  const { data } = useLatestEvent();
  const [showDropdown, setShowDropdown] = useState(false);

  useCloseModalClickOutside(dropdownRef, () => {
    setShowDropdown(false);
  });

  useEffect(() => {
    const closePopupForForever = localStorage.getItem("closePopupForForever");
    dispatch(setClosePopUpForForever(closePopupForForever ? true : false));
    const apk_modal_shown = sessionStorage.getItem("apk_modal_shown");
    if (location?.state?.pathname === "/apk" || location.pathname === "/apk") {
      sessionStorage.setItem("apk_modal_shown", true);
      localStorage.setItem("closePopupForForever", true);
      dispatch(setClosePopUpForForever(true));
      localStorage.removeItem("installPromptExpiryTime");
    } else {
      if (!apk_modal_shown) {
        dispatch(setShowAPKModal(true));
      }
      if (!closePopupForForever) {
        const expiryTime = localStorage.getItem("installPromptExpiryTime");
        const currentTime = new Date().getTime();

        if ((!expiryTime || currentTime > expiryTime) && Settings.apk_link) {
          localStorage.removeItem("installPromptExpiryTime");

          dispatch(setShowAppPopUp(true));
        }
      }
    }
  }, [
    dispatch,
    windowWidth,
    showAppPopUp,
    location?.state?.pathname,
    location.pathname,
  ]);

  useEffect(() => {
    const newVersion = Settings.build_version;
    if (!stored_build_version) {
      if (newVersion) {
        localStorage.setItem("build_version", newVersion);
      }
    }
    if (stored_build_version && newVersion) {
      const parseVersion = JSON.parse(stored_build_version);
      if (newVersion > parseVersion) {
        setShowBuildVersion(true);
      }
    }
  }, [stored_build_version]);

  if (Settings.app_only && !closePopupForForever) {
    return <Error />;
  }
  return (
    <>
      {showReferral && <Referral setShowReferral={setShowReferral} />}
      {/* {Settings.apk_link && showAPKModal && <DownloadAPK />} */}
      {Settings.apk_link && showAppPopUp && windowWidth < 1040 && <AppPopup />}
      {showBuildVersion && !showAPKModal && (
        <BuildVersion
          build_version={Settings.build_version}
          setShowBuildVersion={setShowBuildVersion}
        />
      )}

      <div _ngcontent-htq-c85 _nghost-htq-c82>
        <header _ngcontent-htq-c82 className="header">
          <div _ngcontent-htq-c82 className="container-fluid">
            <div
              _ngcontent-htq-c82
              className="row row5 pt-1 pb-1 align-items-center"
              style={{ marginRight: "0px", marginLeft: "0px" }}
            >
              <div
                _ngcontent-htq-c82
                className="logo col-6"
                style={{ alignItems: "start" }}
              >
                <Link
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "3px",
                  }}
                  _ngcontent-htq-c82
                  to="/"
                  className="router-link-exact-active router-link-active"
                >
                  <FontAwesomeIcon
                    style={{
                      color: "white",
                      fontSize: "16px",
                      marginBottom: "5px",
                    }}
                    icon={faHome}
                    className="mr-1"
                  />

                  <img
                    _ngcontent-htq-c82
                    alt="Exchange"
                    className="img-fluid logo"
                    src={logo}
                  />
                </Link>
              </div>
              {!token && (
                <div
                  _ngcontent-htq-c82
                  className="col-6 text-right bal-expo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => navigate("/login")}
                    style={{ maxWidth: "80px" }}
                    _ngcontent-wjb-c42
                    type="submit"
                    className="btn btn-secondary"
                  >
                    Login
                    <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                  </button>
                  {Settings.registration && (
                    <button
                      onClick={() => navigate("/register")}
                      style={{ marginTop: "0px" }}
                      _ngcontent-wjb-c42
                      className="btn btn-secondary btn-block"
                    >
                      Register
                      <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                    </button>
                  )}
                </div>
              )}
              {token && (
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
                      _ngcontent-htq-c82
                      className="dropdown d-inline-block"
                    >
                      <a
                        onClick={() => setShowDropdown((prev) => !prev)}
                        _ngcontent-htq-c82
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="dropdown-toggle"
                      >
                        <u _ngcontent-htq-c82 data-v-3f4cf84d>
                          {user}
                        </u>
                      </a>
                      <Dropdown
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        setShowReferral={setShowReferral}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {token && (
              <div _ngcontent-uxw-c82="" className="btns__deposit_withdrawal">
                {Settings.deposit && (
                  <Link
                    _ngcontent-uxw-c82=""
                    className="btn_deposit"
                    to="/deposit"
                  >
                    <img
                      _ngcontent-uxw-c82=""
                      routerlink="/deposit"
                      src={images.deposit}
                      className="img-fluid"
                    />
                    deposit{" "}
                  </Link>
                )}

                {Settings.withdraw && (
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
                )}
              </div>
            )}

            <div
              _ngcontent-htq-c82
              className="row row5 header-bottom"
              style={{ marginRight: "0px", marginLeft: "0px" }}
            >
              <div _ngcontent-htq-c82 className="col-12">
                <Search />

                <Notification />
              </div>
            </div>
            {data && data?.length > 0 && <LatestEvent latestEvent={data} />}
            <div
              onClick={() => navigate(`/event-details/4/28127348`)}
              _ngcontent-yvd-c83
              className=" header-b-menu"
            >
              <div _ngcontent-yvd-c83 className="col election">
                <Link
                  _ngcontent-yvd-c83
                  to="/event-details/4/28127348"
                  className="text-link"
                >
                  IPL 2026
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
