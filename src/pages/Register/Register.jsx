import { Link, useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosSecure } from "../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { ApiContext } from "../../context/ApiProvider";
import { API, Settings } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faKey,
  // faMobile,
  faPhone,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
import images from "../../assets/images";
import { LanguageKey } from "../../const";
import useLanguage from "../../hooks/use-language";
import { FaMobileAlt, FaRegUser } from "react-icons/fa";
// import getOtpOnWhatsapp from "../../utils/getOtpOnWhatsapp";
const Register = () => {
  const [tab, setTab] = useState(
    Settings.registration_mobile ? "mobile" : "username",
  );
  const { getLanguage } = useLanguage();
  const affnook_token = localStorage.getItem("affnook_token");
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const referralCode = localStorage.getItem("referralCode");
  const [timer, setTimer] = useState(null);
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
    mobileNo: "",
    otp: "",
    referralCode: "",
    username: "",
  });
  const { logo } = useContext(ApiContext);
  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    orderId: "",
    otpMethod: "",
  });

  /* Handle register */
  const onSubmit = async () => {
    if (
      userData?.password !== userData?.confirmPassword &&
      userData?.confirmPassword?.length > 0
    ) {
      return toast.error("Password did not match !");
    } else if (userData?.password === "") {
      return toast.error("Password is required !");
    } else if (userData?.confirmPassword === "") {
      return toast.error("Confirm password is required !");
    } else if (userData?.mobileNo === "") {
      toast.error("Mobile no is required !");
    } else if (
      userData?.mobileNo?.length > 10 ||
      userData?.mobileNo?.length < 10
    ) {
      return toast.error("Enter ten digit mobile no !");
    } else if (userData?.otp === "") {
      return toast.error("OTP is required");
    } else if (userData?.otp?.length > 4 || userData?.otp?.length < 4) {
      return toast.error("Enter four digit OTP no");
    } else {
      const registerData = {
        username: userData?.username,
        password: userData?.password,
        confirmPassword: userData?.confirmPassword,
        mobile: userData?.mobileNo,
        otp: userData?.otp,
        referralCode: referralCode || userData.referralCode,
        orderId: order.orderId,
        otpMethod: order.otpMethod,
        affnook_token: affnook_token || null,
        registration_mobile: Settings.registration_mobile,
        registration_username: Settings.registration_username,
      };

      const { data } = await AxiosSecure.post(API.register, registerData);
      if (data?.success) {
        if (window?.fbq) {
          window.fbq("track", "CompleteRegistration", {
            content_name: "User Signup",
            status: "success",
          });
        }

        const token = data?.result?.token;
        const bonusToken = data?.result?.bonusToken;
        const user = data?.result?.loginName;
        const game = data?.result?.buttonValue?.game;
        const memberId = data?.result?.memberId;
        const modal = {
          banner: data?.result?.banner,
          bannerTitle: data?.result?.bannerTitle,
        };
        dispatch(setUser({ user, token }));
        if (modal?.banner) {
          localStorage.setItem("modal", JSON.stringify(modal));
        }
        localStorage.setItem("memberId", memberId);
        localStorage.setItem("buttonValue", JSON.stringify(game));
        localStorage.setItem("token", token);
        localStorage.setItem("bonusToken", bonusToken);
        localStorage.setItem("token", data.result.token);

        if (data?.result?.changePassword === true) {
          navigate("/change-password-login");
        } else {
          toast.success(data?.result?.message);
          navigate("/");
        }
      } else {
        toast.error(data?.error?.description);
      }
    }
  };

  /* Get whats app api */
  const getOtp = async () => {
    const otpData = {
      mobile: userData?.mobileNo,
    };
    const res = await AxiosSecure.post(API.otp, otpData);
    const data = res.data;
    if (data?.success) {
      setTimer(60);
      setOrder({
        orderId: data?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.description);
    }
  };
  const getOtpOnWhatsapp = async () => {
    const otpData = {
      mobile: userData?.mobileNo,
      type: "otpsend",
    };

    const res = await AxiosSecure.post(API.otpless, otpData);
    const data = res.data;

    if (data?.success) {
      setTimer(60);
      toast.success(data?.result?.message);
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };
  // const handleGetOtpOnWhatsapp = async () => {
  //   await getOtpOnWhatsapp(userData.mobileNo, setOrder);
  // };

  const getWhatsappOTP = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimer(null);
    }
  }, [timer]);
  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-box">
          <div
            className="logo-login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
          <div className="login-form mt-4">
            <h4 className="text-center login-title">
              {getLanguage(LanguageKey.REGISTER)}{" "}
              <FontAwesomeIcon icon={faHandPointDown} className="ml-2" />
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- whatsapp start--> */}
              {/* {data?.result?.whatsapplink && Settings?.registration_whatsapp && (
                <div className="whatsapp-box">
                  <div>
                    <span>Register as New User</span>
                    <h4>Get your instant ID from whatsapp</h4>
                  </div>
                  <Link
                    onClick={() =>
                      window.open(data?.result?.whatsapplink, "_blank")
                    }
                    className="create-whatsapp-link"
                  >
                    <div className="whatsapp-icon">
                      <FontAwesomeIcon icon={faMobile} className="ml-2" />
                    </div>
                    <div className="click-here">click here</div>
                  </Link>
                </div>
              )} */}
              {/* <!-- whatsapp end--> */}
              {Settings.registration_mobile &&
                Settings.registration_username && (
                  <div
                    style={{
                      width: "100%",
                      background:
                        "color-mix(in srgb, var(--theme1-bg) 30%, transparent)",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <div
                        onClick={() => setTab("mobile")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "5px",
                          width: "100%",
                          gap: "6px",
                          color: tab === "mobile" ? "white" : "black",
                          background:
                            tab === "mobile" ? "var(--theme1-bg)" : undefined,
                        }}
                      >
                        <FaMobileAlt />

                        <span>{getLanguage(LanguageKey.BY_PHONE)}</span>
                      </div>

                      <div
                        onClick={() => setTab("username")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "5px",
                          width: "100%",
                          gap: "6px",
                          color: tab === "username" ? "white" : "black",
                          background:
                            tab === "username" ? "var(--theme1-bg)" : undefined,
                        }}
                      >
                        <FaRegUser />

                        <span>{getLanguage(LanguageKey.BY_USERNAME)}</span>
                      </div>
                    </div>
                  </div>
                )}
              {tab === "mobile" && Settings.registration_mobile && (
                <Fragment>
                  <div className="mb-4 input-group position-relative username-text">
                    <select
                      style={{
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px",
                        padding: "10px 2px",
                        color: "black",
                      }}
                      id="dropdown-phone-button"
                      className="rounded-l-lg border py-1.5 bg-auth px-3"
                    >
                      {Settings.country_code?.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </select>
                    <input
                      name="mobileNo"
                      type="number"
                      className="form-control PhoneInput"
                      placeholder="Mobile No."
                      onChange={(e) =>
                        setUserData({ ...userData, mobileNo: e.target.value })
                      }
                    />
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} className="ml-2" />
                    </span>
                    {timer ? (
                      <button
                        style={{
                          marginTop: "10px",
                        }}
                        className="btn btn-primary btn-block"
                        type="button"
                      >
                        {getLanguage(LanguageKey.RETRY_IN)} {timer}
                      </button>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          marginTop: "10px",
                        }}
                      >
                        {Settings.otp_method?.includes("sms") && (
                          <button
                            onClick={getOtp}
                            className="btn btn-primary btn-block"
                            type="button"
                          >
                            {getLanguage(LanguageKey.GET_OTP_ON_MESSAGE)}
                          </button>
                        )}
                        {Settings.otp_method?.includes("whatsapp") && (
                          <button
                            style={{ marginTop: "0px" }}
                            onClick={getOtpOnWhatsapp}
                            className="btn btn-primary btn-block"
                            type="button"
                          >
                            {getLanguage(LanguageKey.GET_OTP_ON_WHATSAPP)}
                          </button>
                        )}
                      </div>
                    )}

                    {/* <button
                  onClick={handleGetOtpOnWhatsapp}
                  disabled={userData?.mobileNo?.length < 10}
                  className="btn btn-primary btn-block"
                  type="button"
                >
                  Get OTP on Whatsapp
                </button> */}
                  </div>
                </Fragment>
              )}
              {tab === "username" && Settings.registration_username && (
                <div className="mb-4 input-group position-relative username-text">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => {
                      setUserData({ ...userData, username: e.target.value });
                    }}
                  />
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faKey} className="ml-2" />
                  </span>
                </div>
              )}

              <div className="mb-4 input-group position-relative username-text">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} className="ml-2" />
                </span>
              </div>
              <div className="mb-4 input-group position-relative username-text">
                <input
                  name="passwordConfirm"
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} className="ml-2" />
                </span>
              </div>

              <div className="mb-4 input-group position-relative username-text">
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, otp: e.target.value })
                  }
                  name="otp"
                  type="text"
                  className="form-control PhoneInput"
                  placeholder="OTP"
                  maxLength={6}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} className="ml-2" />
                </span>
              </div>
              <div className="mb-4 input-group position-relative username-text">
                <input
                  onChange={(e) =>
                    setUserData({ ...userData, referralCode: e.target.value })
                  }
                  readOnly={referralCode}
                  name="referralCode"
                  type="text"
                  className="form-control PhoneInput"
                  placeholder="Referral Code"
                  defaultValue={referralCode}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} className="ml-2" />
                </span>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  {getLanguage(LanguageKey.REGISTER)}{" "}
                  <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                </button>
              </div>

              {!token &&
                Settings.whatsapplink &&
                Settings.registration_whatsapp && (
                  <Fragment>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <div
                        style={{
                          border: "1px solid gray",
                          width: "100%",
                          opacity: "0.5",
                        }}
                      />
                      <span
                        style={{
                          opacity: "0.5",
                        }}
                      >
                        {getLanguage(LanguageKey.OR)}
                      </span>
                      <div
                        style={{
                          border: "1px solid gray",
                          width: "100%",
                          opacity: "0.5",
                        }}
                      />
                    </div>
                    <button
                      onClick={() => getWhatsappOTP(Settings.whatsapplink)}
                      className="btn btn-primary btn-block"
                      type="button"
                    >
                      <img
                        style={{
                          height: "18px",
                          width: "18px",
                        }}
                        src={images.whatsapp2}
                        alt=""
                      />
                      <span style={{ marginLeft: "10px" }}>
                        {" "}
                        {getLanguage(LanguageKey.GET_ID_ON_WHATSAPP)}
                      </span>
                    </button>
                  </Fragment>
                )}

              <div className="mt-2 mb-1">
                <b>Already have User?</b>{" "}
                <Link to="/login" className="ms-1">
                  <b> {getLanguage(LanguageKey.LOGIN)}</b>
                </Link>
              </div>
              {/* <small className="recaptchaTerms mt-1">
                This site is protected by reCAPTCHA and the Google
                <Link to="https://policies.google.com/privacy">
                  Privacy Policy
                </Link>
                and
                <Link to="https://policies.google.com/terms">
                  Terms of Service
                </Link>
                apply.
              </small> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
