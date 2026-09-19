/* eslint-disable react/no-unknown-property */

import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Banner from "../components/modals/Banner/Banner";
import { Settings } from "../api";

const MainLayout = () => {
  return (
    <div _nghost-htq-c9 ng-version="12.1.5">
      {Settings.metaDescription && (
        <meta name="description" content={Settings.metaDescription} />
      )}
      {Settings.metaKeywords && (
        <meta name="keywords" content={Settings.metaKeywords} />
      )}
      {Settings.gscTag && (
        <meta name="google-site-verification" content={Settings.gscTag} />
      )}
      {Settings.metaTitle && <title>{Settings.metaTitle}</title>}
      <meta name="robots" content="index, follow" />
      <div _nghost-htq-c85>
        <div _ngcontent-htq-c85 id="app">
          <Header />
          <div _ngcontent-htq-c85 />
          <div>
            <div _nghost-htq-c97>
              <Outlet />
            </div>
          </div>
          <div _ngcontent-htq-c85 _nghost-htq-c84 />
          <Banner />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
