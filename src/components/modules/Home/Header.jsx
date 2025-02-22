/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setHomeTab } from "../../../redux/features/global/globalSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { homeTab } = useSelector((state) => state.global);
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
          <span _ngcontent-htq-c46>Inplay</span>
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
          <span _ngcontent-htq-c46>Sports</span>
        </Link>
      </li>
      <li _ngcontent-htq-c46 className="nav-item">
        <Link
          _ngcontent-htq-c46
          to="/casino"
          role="tab"
          className={`nav-link  ${
            location.pathname === "/casino" ? "active" : ""
          }`}
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46>Casino</span>
        </Link>
      </li>
      <li _ngcontent-htq-c46 className="nav-item customClass">
        <Link
          _ngcontent-htq-c46
          to="/sports-book"
          role="tab"
          className="nav-link"
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-htq-c46 />
          <div _ngcontent-htq-c97 className="new-tag-menus-sb">
            Sports book
          </div>
        </Link>
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
          <span _ngcontent-htq-c46>Others</span>
        </Link>
      </li>
    </ul>
  );
};

export default Header;
