import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiContext } from "../../context/ApiProvider";
import { API, Settings } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faKey,
  faPhone,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../redux/features/auth/authApi";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";
import { AxiosSecure } from "../../lib/AxiosSecure";
const Register = () => {
  const { getLanguage } = useLanguage();
  const navigate = useNavigate();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
  const { register, handleSubmit } = useForm();
  const { logo } = useContext(ApiContext);
  const [timer, setTimer] = useState(null);

  const handleMobileInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };
  const handleOTP = async () => {
    if (mobile.length > 0) {
      const res = await getOTP({ mobile }).unwrap();

      if (res?.success) {
        setTimer(60);
        setOTP({
          orderId: res?.result?.orderId,
          otpMethod: "sms",
        });
        toast.success(res?.result?.message);
      } else {
        toast.error(res?.error?.errorMessage);
      }
    }
  };
  const getOtpOnWhatsapp = async () => {
    const otpData = {
      mobile,
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
  const onSubmit = async (data) => {
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      otp: data?.otp,
      isOtpAvailable: Settings.otp,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();
    if (result.success) {
      toast.success(result?.message);
      navigate("/login");
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
    }
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
              {getLanguage(LanguageKey.FORGOT_PASSWORD)}
              <FontAwesomeIcon icon={faHandPointDown} className="ml-2" />
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={(e) => handleMobileInputChange(e)}
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
                        disabled={!mobile}
                        onClick={handleOTP}
                        className="btn btn-primary btn-block"
                        type="button"
                      >
                        {getLanguage(LanguageKey.GET_OTP_ON_MESSAGE)}
                      </button>
                    )}
                    {Settings.otp_method?.includes("whatsapp") && (
                      <button
                        style={{ marginTop: "0px" }}
                        disabled={!mobile}
                        onClick={getOtpOnWhatsapp}
                        className="btn btn-primary btn-block"
                        type="button"
                      >
                        {getLanguage(LanguageKey.GET_OTP_ON_WHATSAPP)}
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="mb-4 input-group position-relative username-text">
                <input
                  {...register("otp", { required: true })}
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
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", { required: true })}
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
                  {...register("confirmPassword", { required: true })}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} className="ml-2" />
                </span>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  {getLanguage(LanguageKey.CHANGE_PASSWORD)}
                  <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                </button>
              </div>

              <small className="recaptchaTerms mt-1">
                This site is protected by reCAPTCHA and the Google
                <Link to="https://policies.google.com/privacy">
                  Privacy Policy
                </Link>
                and
                <Link to="https://policies.google.com/terms">
                  Terms of Service
                </Link>
                apply.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
