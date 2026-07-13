/* eslint-disable react/no-unknown-property */

import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";
import { useNavigate } from "react-router-dom";
import images from "../../../assets/images";
import useLanguage from "../../../hooks/useLanguage";
import { languageValue } from "../../../utils/language";
import { LanguageKey } from "../../../const";
import { latestEvent } from "../../../static/latest-event";

const Tab = () => {
  const { valueByLanguage } = useLanguage();
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

  const homeTab = [
    {
      id: 1,
      name: languageValue(valueByLanguage, LanguageKey.CRICKET),
      image: images.cricket,
      group: 4,
    },
    {
      id: 2,
      name: languageValue(valueByLanguage, LanguageKey.FOOTBALL),
      image: images.football,
      group: 1,
    },
    {
      id: 3,
      name: languageValue(valueByLanguage, LanguageKey.TENNIS),
      image: images.tennis,
      group: 2,
    },
    {
      id: 3,
      name: "Cock Fight",
      eventId: 400332,
      image: images.cockFight,
    },
    {
      id: 4,
      name: languageValue(valueByLanguage, LanguageKey.HORSE),
      image: images.horseRacing,
      group: 7,
    },
    {
      id: 5,
      name: languageValue(valueByLanguage, LanguageKey.GREYHOUND),
      image: images.greyhoundRacing,
      group: 4339,
    },
    // {
    //   id: 6,
    //   name: "Binary",
    //   image: images.binary,
    //   group: 5444,
    // },
    {
      id: 7,
      name: languageValue(valueByLanguage, LanguageKey.KABADDI),
      image: images.kabbadi,
      group: 5,
    },
    {
      id: 8,
      name: "Politics",
      image: images.politicks,
      group: 6,
    },
    {
      id: 9,
      name: "Basketball",
      image: images.basketBall,
      group: 7522,
    },
    {
      id: 10,
      name: "Baseball",
      image: images.baseBall,
      group: 7511,
    },
    {
      id: 11,
      name: "Table Tennis",
      image: images.tableTennis,
      group: 20,
    },
    {
      id: 12,
      name: "Volleyball",
      image: images.voleyBall,
      group: 998917,
    },
    {
      id: 13,
      name: "Ice Hockey",
      image: images.icehocky,
      group: 7524,
    },
    {
      id: 14,
      name: "Rugby",
      image: images.rugby,
      group: 5,
    },
    {
      id: 15,
      name: "Mixed Martial Arts",
      image: images.martial,
      group: 26420387,
    },
    {
      id: 16,
      name: "Darts",
      image: images.darts,
      group: 3503,
    },
    {
      id: 17,
      name: "Futsal",
      image: images.fustal,
      group: 29,
    },
  ];

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
