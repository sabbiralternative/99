/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";
import { homeTab } from "../../../static/group";

const Tab = () => {
  const { group } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <ul
      _ngcontent-htq-c46
      role="tablist"
      className="nav nav-tabs game-nav-bar"
      aria-label="Tabs"
    >
      {homeTab.map((item) => {
        return (
          <li
            key={item.id}
            _ngcontent-htq-c46
            className={` nav-item ${group === item.group ? "active" : ""}`}
          >
            <a
              style={{ color: "white" }}
              onClick={() => dispatch(setGroup(item.group))}
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
