/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";
import { homeTab } from "../../../static/group";
import { useNavigate } from "react-router-dom";
import { latestEvent } from "../../../../../../10sports/10sports/src/static/latest-event";
import images from "../../../assets/images";

const Tab = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { group } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const handleGroupType = (item) => {
    if (item?.group) {
      dispatch(setGroup(item?.group));
    }
    if (item?.eventId) {
      if (token) {
        navigate(`/casino/cock-fight/${item?.eventId}`);
      } else {
        navigate("/login");
      }
    }
  };
  return (
    <ul
      _ngcontent-htq-c46
      role="tablist"
      className="nav nav-tabs game-nav-bar"
      aria-label="Tabs"
    >
      {latestEvent.map((item) => {
        return (
          <li key={item.eventName} _ngcontent-htq-c46 className={` nav-item `}>
            <a
              style={{ color: "white" }}
              onClick={() => navigate(item.pathname)}
              _ngcontent-htq-c46
              role="tab"
              className={`nav-link `}
              aria-controls
              aria-selected="true"
              id
            >
              <span _ngcontent-htq-c46 />
              <div _ngcontent-htq-c97>
                <img _ngcontent-htq-c97 alt="" src={images.cricket} />
              </div>
              <div _ngcontent-htq-c97>{item.eventName}</div>
            </a>
          </li>
        );
      })}
      {homeTab.map((item) => {
        return (
          <li
            key={item.id}
            _ngcontent-htq-c46
            className={` nav-item ${group === item.group ? "active" : ""}`}
          >
            <a
              style={{ color: "white" }}
              onClick={() => handleGroupType(item)}
              _ngcontent-htq-c46
              role="tab"
              className={`nav-link ${group === item.group ? "active" : ""}`}
              aria-controls
              aria-selected="true"
              id
            >
              <span _ngcontent-htq-c46 />
              <div _ngcontent-htq-c97>
                <img _ngcontent-htq-c97 alt="" src={item.image} />
              </div>
              <div
                _ngcontent-htq-c97
                className={item?.id === 6 ? "new-tag-menus" : ""}
              >
                {item.name}
                <em _ngcontent-htq-c97>new</em>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab;
