// import { useEffect, useState } from "react";
import Header from "../../components/modules/Home/Header";
// import CasinoTab from "./CasinoTab/CasinoTab";
import IntCasino from "./InCasinoTab/IntCasino";
// import { useLocation } from "react-router-dom";
// import images from "../../assets/images";

const Casino = () => {
  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const category = params.get("category");
  // const [tab, setTab] = useState("casino");
  // useEffect(() => {
  //   if (category) {
  //     setTab("intCasino");
  //   }
  // }, [category]);

  return (
    <div>
      <div className="main-content">
        <div className="position-relative">
          <div type="tabs game-nav-bar" className="tab-container">
            <Header />
            <div className="tab-content">
              <div role="tabpanel" aria-labelledby className="tab-pane active">
                <div id="home" className="tab-pane sports">
                  <div type="tabs game-nav-bar" className="tab-container">
                    {/* <ul
                      role="tablist"
                      className="nav nav-tabs game-nav-bar"
                      aria-label="Tabs"
                    >
                      <li
                        style={{ color: "white" }}
                        onClick={() => setTab("casino")}
                        className={`nav-item ${
                          tab === "casino" ? "" : "active"
                        }`}
                      >
                        <a
                          role="tab"
                          className={`nav-link ${
                            tab === "casino" ? "" : "active"
                          }`}
                          aria-controls
                          aria-selected="true"
                          id
                        >
                          <span />
                          <div>
                            <img alt="" src={images.casino} />
                          </div>
                          <div>Casino</div>
                        </a>
                      </li>
                      <li
                        style={{ color: "white" }}
                        onClick={() => setTab("intCasino")}
                        className={`nav-item ${
                          tab === "intCasino" ? "" : "active"
                        }`}
                      >
                        <a
                          role="tab"
                          className={`nav-link ${
                            tab === "intCasino" ? "" : "active"
                          }`}
                          aria-controls
                          aria-selected="false"
                          id
                        >
                          <span />
                          <div>
                            <img alt="" src={images.int_casino} />
                          </div>
                          <div>Int Casino</div>
                        </a>
                      </li>
                    </ul> */}
                    {/*  */}
                    {/* {tab === "casino" ? <CasinoTab /> : <IntCasino />} */}
                    <IntCasino />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Casino;
