/* eslint-disable react/no-unknown-property */

import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header/Header";
import Banner from "../components/modals/Banner/Banner";

const MainLayout = () => {
  return (
    <div _nghost-htq-c9 ng-version="12.1.5">
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
