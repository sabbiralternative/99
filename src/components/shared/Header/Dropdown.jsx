/* eslint-disable react/no-unknown-property */

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const Dropdown = ({ showDropdown, setShowDropdown }) => {
  const { getLanguage } = useLanguage();
  const closePopupForForever = localStorage.getItem("closePopupForForever");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleOpenSocialLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <>
      <div
        _ngcontent-htq-c82
        className={`dropdown-menu  ${showDropdown ? "show" : ""}`}
      >
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/"
          className="dropdown-item router-link-exact-active router-link-active"
        >
          {getLanguage(LanguageKey.HOME)}
        </Link>
        {Settings.branchWhatsapplink && (
          <Link
            onClick={() => handleOpenSocialLink(Settings.branchWhatsapplink)}
            _ngcontent-htq-c82
            to="/"
            className="dropdown-item router-link-exact-active router-link-active"
          >
            {getLanguage(LanguageKey.CUSTOMER_SUPPORT)}
          </Link>
        )}

        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/account-statement"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.ACCOUNT_STATEMENT)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/bonus-statement"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.BONUS_STATEMENT)}
        </Link>
        {Settings.referral && (
          <Link
            to="/affiliate"
            onClick={closeDropdown}
            _ngcontent-htq-c82
            className="dropdown-item"
          >
            {getLanguage(LanguageKey.AFFILIATE)}
          </Link>
        )}
        <Link
          to="/promotions"
          onClick={closeDropdown}
          _ngcontent-htq-c82
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.PROMOTION_AND_BONUSES)}
        </Link>
        <Link
          to="/lossback-bonus"
          onClick={closeDropdown}
          _ngcontent-htq-c82
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.LOSSBACK_BONUS)}
        </Link>
        {closePopupForForever && (
          <Link
            to="/app-only-bonus"
            onClick={closeDropdown}
            _ngcontent-htq-c82
            className="dropdown-item"
          >
            {getLanguage(LanguageKey.APP_ONLY_BONUS)}
          </Link>
        )}

        {/* <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/referral-statement"
          className="dropdown-item"
        >
          Referral Statement
        </Link> */}
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/deposit-report"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.DEPOSIT_STATEMENT)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/withdraw-report"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.WITHDRAW_STATMENT)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/my-bank-details"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.MY_BANK_DETAILS)}
        </Link>

        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/unsettled-bets"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.UNSETTLED_BETS)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="change-btn-value"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.EDIT_STAKE)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/change-password"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.CHANGE_PASSWORD)}
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/rules"
          className="dropdown-item"
        >
          {getLanguage(LanguageKey.RULES)}
        </Link>
        {/* {Settings.whatsapplink && (
          <Link
            onClick={() =>
              handleOpenSocialLink(Settings.whatsapplink)
            }
            _ngcontent-htq-c82
            to="/"
            className="dropdown-item router-link-exact-active router-link-active"
          >
            All Support
          </Link>
        )} */}
        <Link
          _ngcontent-htq-c82
          onClick={handleLogout}
          className="dropdown-item mt-2 text-danger"
        >
          <b _ngcontent-htq-c82> {getLanguage(LanguageKey.LOGOUT)}</b>
        </Link>
      </div>
    </>
  );
};

export default Dropdown;
