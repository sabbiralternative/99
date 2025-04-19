import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosSecure } from "../../lib/AxiosSecure";
import toast from "react-hot-toast";
import { ApiContext } from "../../context/ApiProvider";
import { API } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faKey,
  // faMobile,
  faPhone,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import useWhatsApp from "../../hooks/whatsapp";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/authSlice";
const Register = () => {
  const dispatch = useDispatch();
  const referralCode = localStorage.getItem("referralCode");
  const { refetch } = useWhatsApp();
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
    mobileNo: "",
    otp: "",
    referralCode: "",
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
        password: userData?.password,
        confirmPassword: userData?.confirmPassword,
        mobile: userData?.mobileNo,
        otp: userData?.otp,
        referralCode: referralCode || userData.referralCode,
        orderId: order.orderId,
        otpMethod: order.otpMethod,
      };

      const { data } = await AxiosSecure.post(API.register, registerData);
      if (data?.success) {
        refetch();
        const token = data?.result?.token;
        const bonusToken = data?.result?.bonusToken;
        const user = data?.result?.loginName;
        const game = data?.result?.buttonValue?.game;
        const memberId = data?.result?.memberId;
        dispatch(setUser({ user, token }));
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
      setOrder({
        orderId: data?.result?.orderId,
        otpMethod: "sms",
      });
      toast.error(data?.result?.message);
    } else {
      toast.error(data?.error?.description);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-box">
          <div className="logo-login">
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
          <div className="login-form mt-4">
            <h4 className="text-center login-title">
              Register{" "}
              <FontAwesomeIcon icon={faHandPointDown} className="ml-2" />
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <!-- whatsapp start--> */}
              {/* {data?.result?.whatsapplink && Settings?.registrationWhatsapp && (
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

              <div className="mb-4 input-group position-relative username-text">
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
                <button
                  onClick={getOtp}
                  className="btn btn-primary btn-block"
                  type="button"
                >
                  Get OTP
                </button>
              </div>

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
                  type="number"
                  className="form-control PhoneInput"
                  placeholder="OTP"
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
                  Register{" "}
                  <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                </button>
              </div>
              <div className="mt-2 mb-1">
                <b>Already have User?</b>{" "}
                <Link to="/login" className="ms-1">
                  <b>Login here</b>
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
