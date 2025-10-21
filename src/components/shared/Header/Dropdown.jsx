/* eslint-disable react/no-unknown-property */

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";
import useWhatsApp from "../../../hooks/whatsapp";

const Dropdown = ({ showDropdown, setShowDropdown, setShowReferral }) => {
  const { data: socialLink } = useWhatsApp();
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

  console.log(socialLink);
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
          Home
        </Link>
        {socialLink?.result?.branchWhatsapplink && (
          <Link
            onClick={() =>
              handleOpenSocialLink(socialLink?.result?.branchWhatsapplink)
            }
            _ngcontent-htq-c82
            to="/"
            className="dropdown-item router-link-exact-active router-link-active"
          >
            Deposit Support
          </Link>
        )}

        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/account-statement"
          className="dropdown-item"
        >
          Account Statement
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/bonus-statement"
          className="dropdown-item"
        >
          Bonus Statement
        </Link>
        {Settings.referral && (
          <a
            onClick={() => {
              setShowDropdown(false);
              setShowReferral(true);
            }}
            _ngcontent-htq-c82
            className="dropdown-item"
          >
            Referral
          </a>
        )}

        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/referral-statement"
          className="dropdown-item"
        >
          Referral Statement
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/deposit-report"
          className="dropdown-item"
        >
          Deposit Report
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/withdraw-report"
          className="dropdown-item"
        >
          Withdraw Report
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/my-bank-details"
          className="dropdown-item"
        >
          My Bank Details
        </Link>

        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/unsettled-bets"
          className="dropdown-item"
        >
          Unsetteled Bet
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="change-btn-value"
          className="dropdown-item"
        >
          Set Button Values
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/change-password"
          className="dropdown-item"
        >
          Change Password
        </Link>
        <Link
          onClick={closeDropdown}
          _ngcontent-htq-c82
          to="/rules"
          className="dropdown-item"
        >
          Rule
        </Link>
        {socialLink?.result?.whatsapplink && (
          <Link
            onClick={() =>
              handleOpenSocialLink(socialLink?.result?.whatsapplink)
            }
            _ngcontent-htq-c82
            to="/"
            className="dropdown-item router-link-exact-active router-link-active"
          >
            All Support
          </Link>
        )}
        <Link
          _ngcontent-htq-c82
          onClick={handleLogout}
          className="dropdown-item mt-2 text-danger"
        >
          <b _ngcontent-htq-c82>Logout</b>
        </Link>
      </div>
    </>
  );
};

export default Dropdown;
