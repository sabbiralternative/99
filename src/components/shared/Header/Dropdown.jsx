/* eslint-disable react/no-unknown-property */

import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Dropdown = ({ showDropdown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div
      _ngcontent-htq-c82
      className={`dropdown-menu  ${showDropdown ? "show" : ""}`}
    >
      <Link
        _ngcontent-htq-c82
        to="/"
        className="dropdown-item router-link-exact-active router-link-active"
      >
        Home
      </Link>
      <Link
        _ngcontent-htq-c82
        to="/account-statement"
        className="dropdown-item"
      >
        Account Statement
      </Link>

      <Link _ngcontent-htq-c82 to="/unsettled-bets" className="dropdown-item">
        Unsetteled Bet
      </Link>
      <Link _ngcontent-htq-c82 to="change-btn-value" className="dropdown-item">
        Set Button Values
      </Link>
      <Link _ngcontent-htq-c82 to="/change-password" className="dropdown-item">
        Change Password
      </Link>
      <Link _ngcontent-htq-c82 to="/rules" className="dropdown-item">
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
  );
};

export default Dropdown;
