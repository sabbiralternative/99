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
import { Fragment, useState } from "react";
import { Settings } from "../../api";
import images from "../../assets/images";
import MiniGames from "../../components/modals/MiniGames/MiniGames";

const Home = () => {
  const [showMiniGamesModal, setShowMiniGamesModal] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { data } = useGetIndex({
    type: "99_casino_dashboard",
  });
  const { homeTab } = useSelector((state) => state.global);
  const navigateWhatsApp = () => {
    if (token && Settings.branchWhatsapplink) {
      window.open(Settings.branchWhatsapplink, "_blank");
    } else {
      window.open(Settings.whatsapplink, "_blank");
    }
  };
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
            <NewLaunch data={data?.new_launch} title="New Launch" />
            <NewLaunch data={data?.my_favourites} title="My Favourites" />
            <OurProviders our_provider={data?.our_provider} />
          </Fragment>
        )}

        {/* {homeTab === "inPlay" && <HomeThumbnails />} */}
      </div>

      <Fragment>
        <a
          className="whatsapp_link"
          style={{
            position: "fixed",
            bottom: "6%",
            right: "7.5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {Settings.instagramLink ? (
            <a onClick={() => window.open(Settings.instagramLink, "_blank")}>
              <img
                style={{ height: "50px", width: "50px" }}
                src={images.instagram}
              />
            </a>
          ) : null}
          {Settings.telegramLink ? (
            <a onClick={() => window.open(Settings.telegramLink, "_blank")}>
              <img
                style={{ height: "50px", width: "50px" }}
                src={images.telegram}
              />
            </a>
          ) : null}
          {Settings.whatsapplink || Settings.branchWhatsapplink ? (
            <a onClick={navigateWhatsApp}>
              <img src={images.whatsApp} />
            </a>
          ) : null}

          <a onClick={() => setShowMiniGamesModal(true)}>
            <img
              style={{
                height: "70px",
              }}
              src="/icon/uv_games-CkYT1PYz.gif"
            />
          </a>
        </a>
      </Fragment>
      {showMiniGamesModal && (
        <MiniGames setShowMiniGamesModal={setShowMiniGamesModal} />
      )}
    </div>
  );
};

export default Home;
