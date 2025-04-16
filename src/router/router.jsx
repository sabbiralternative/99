import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import EventDetails from "../pages/EventDetails/EventDetails";
import Login from "../pages/Login/Login";
import Casino from "../pages/Casino/Casino";
import CasinoIFrame from "../pages/CasinoIFrame/CasinoIFrame";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Deposit from "../pages/Deposit/Deposit";
import ChangePasswordLogin from "../pages/ChangePasswordLogin/ChangePasswordLogin";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import ChangeButtonValue from "../pages/ChangeButtonValue/ChangeButtonValue";
import AccountStatement from "../pages/AccountStatement/AccountStatement";
import UnSettledBets from "../pages/UnSettledBets/UnSettledBets";
import Rules from "../pages/Rules/Rules";
import SportsBook from "../pages/SportsBook/SportsBook";
import Other from "../pages/Other/Other";
import PrivateRoute from "./PrivateRoute";
import Withdraw from "../pages/Withdraw/Withdraw";
import BonusStatement from "../pages/BonusStatement/BonusStatement";
import DepositWithdrawReport from "../pages/DepositWithdrawReport/DepositWithdrawReport";
import ReferralStatement from "../pages/ReferralStatement/ReferralStatement";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <App />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "/event-details/:eventTypeId/:eventId",
          element: <EventDetails />,
        },
        {
          path: "/casino",
          element: <Casino />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/change-btn-value",
          element: <ChangeButtonValue />,
        },
        {
          path: "/account-statement",
          element: <AccountStatement />,
        },
        {
          path: "/unsettled-bets",
          element: <UnSettledBets />,
        },
        {
          path: "/rules",
          element: <Rules />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/bonus-statement",
          element: <BonusStatement />,
        },
        {
          path: "/referral-statement",
          element: <ReferralStatement />,
        },
        {
          path: "/deposit-withdraw-report",
          element: <DepositWithdrawReport />,
        },
        {
          path: "/other",
          element: <Other />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/change-password-login",
      element: <ChangePasswordLogin />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/casino/:name/:gameId",
      element: <CasinoIFrame />,
    },
    {
      path: "/deposit",
      element: <Deposit />,
    },
    {
      path: "/withdraw",
      element: <Withdraw />,
    },
    {
      path: "/sports-book",
      element: <SportsBook />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL ?? "/",
  }
);
