/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setHomeTab } from "../../../redux/features/global/globalSlice";
import useLanguage from "../../../hooks/use-language";
import { LanguageKey } from "../../../const";

const Header = () => {
  const { getLanguage } = useLanguage();
  const location = useLocation();
  const dispatch = useDispatch();
  const { homeTab } = useSelector((state) => state.global);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleNavigateToIFrame = (name, id) => {
    if (token) {
      navigate(`/casino/${name}/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <ul
      _ngcontent-htq-c46
      role="tablist"
      className="nav nav-tabs game-nav-bar"
      aria-label="Tabs"
    >
      <li _ngcontent-htq-c46 className="active nav-item">
        <Link
          onClick={() => dispatch(setHomeTab("inPlay"))}
          _ngcontent-htq-c46
          to="/"
          role="tab"
          className={`nav-link  ${
            location.pathname === "/" && homeTab === "inPlay" ? "active" : ""
          }`}
          aria-controls
          aria-selected="true"
          id
        >
          <span _ngcontent-htq-c46> {getLanguage(LanguageKey.IN_PLAY)}</span>
        </Link>
      </li>
      <li _ngcontent-htq-c46 className="nav-item">
        <Link
          onClick={() => dispatch(setHomeTab("sports"))}
          _ngcontent-htq-c46
          to="/"
          role="tab"
          className={`nav-link  ${
            location.pathname === "/" && homeTab === "sports" ? "active" : ""
          }`}
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46> {getLanguage(LanguageKey.SPORTS)}</span>
        </Link>
      </li>
      <li _ngcontent-htq-c46 className="nav-item">
        <Link
          _ngcontent-htq-c46
          to="/casino?product=All&category=All"
          role="tab"
          className={`nav-link  ${
            location.pathname === "/casino" ? "active" : ""
          }`}
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46> {getLanguage(LanguageKey.CASINO)}</span>
        </Link>
      </li>
      <li
        onClick={() => handleNavigateToIFrame("sportsbook", "550000")}
        _ngcontent-htq-c46
        className="nav-item customClass"
      >
        <a
          _ngcontent-htq-c46
          role="tab"
          className="nav-link"
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46 />
          <div
            style={{ color: "white" }}
            _ngcontent-htq-c97
            className="new-tag-menus-sb"
          >
            {getLanguage(LanguageKey.SPORTSBOOK)}
          </div>
        </a>
      </li>

      <li
        onClick={() => handleNavigateToIFrame("fantasy-11", "595001")}
        _ngcontent-htq-c46
        className="nav-item customClass"
      >
        <a
          _ngcontent-htq-c46
          role="tab"
          className="nav-link"
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46 />
          <div
            style={{ color: "white" }}
            _ngcontent-htq-c97
            className="new-tag-menus-sb"
          >
            {getLanguage(LanguageKey.FANTASY_11)}
          </div>
        </a>
      </li>
      <li _ngcontent-htq-c46 className="nav-item">
        <Link
          _ngcontent-htq-c46
          to="/other"
          role="tab"
          className={`nav-link  ${
            location.pathname === "/other" ? "active" : ""
          }`}
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46> {getLanguage(LanguageKey.OTHERS)}</span>
        </Link>
      </li>
    </ul>
  );
};

export default Header;
