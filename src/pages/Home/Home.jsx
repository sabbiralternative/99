/* eslint-disable react/no-unknown-property */

import { useSelector } from "react-redux";
import Events from "../../components/modules/Home/Events";
import Header from "../../components/modules/Home/Header";
import HighLightThumbnails from "../../components/modules/Home/HighLightThumbnails";
// import HomeThumbnails from "../../components/modules/Home/HomeThumbnails";
// import NotUsing from "../../components/modules/Home/NotUsing";
import Tab from "../../components/modules/Home/Tab";
import { useGetIndex } from "../../hooks";
import NewLaunch from "../../components/modules/Home/NewLaunch";
import OurProviders from "../../components/modules/Home/OurProviders";
import { Fragment } from "react";

const Home = () => {
  const { data } = useGetIndex({
    type: "99_casino_dashboard",
  });
  const { homeTab } = useSelector((state) => state.global);

  console.log(data);

  return (
    <div _ngcontent-htq-c97 className="main-content">
      <div _ngcontent-htq-c97 className="position-relative">
        <div
          _ngcontent-htq-c97
          type="tabs game-nav-bar"
          _nghost-htq-c46
          className="tab-container"
        >
          <Header />
          <div _ngcontent-htq-c46 className="tab-content">
            <div
              _ngcontent-htq-c97
              heading="Inplay"
              role="tabpanel"
              aria-labelledby
              className="tab-pane active"
            >
              <div
                _ngcontent-htq-c97
                id="home"
                className="tab-pane sports scrollHeight"
              >
                <div
                  _ngcontent-htq-c97
                  type="tabs game-nav-bar"
                  _nghost-htq-c46
                  className="tab-container"
                >
                  <Tab />
                  <Events homeTab={homeTab} />
                </div>
              </div>
            </div>
            <div
              _ngcontent-htq-c97
              heading="Sports"
              role="tabpanel"
              aria-labelledby
              className="tab-pane"
            />
            {/* <NotUsing /> */}
          </div>
        </div>
        {homeTab === "inPlay" && (
          <Fragment>
            <HighLightThumbnails highlight_casino={data?.highlight_casino} />
            <NewLaunch new_launch={data?.new_launch} />
            <OurProviders our_provider={data?.our_provider} />
          </Fragment>
        )}

        {/* {homeTab === "inPlay" && <HomeThumbnails />} */}
      </div>
    </div>
  );
};

export default Home;
