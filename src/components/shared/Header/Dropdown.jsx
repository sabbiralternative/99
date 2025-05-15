/* eslint-disable react/no-unknown-property */

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../../api";

const Dropdown = ({ showDropdown, setShowDropdown, setShowReferral }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeDropdown = () => {
    setShowDropdown(false);
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
          Home
        </Link>
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
          to="/deposit-withdraw-report"
          className="dropdown-item"
        >
          Deposit Withdraw Report
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
