/* eslint-disable react/no-unknown-property */

import { useContext } from "react";
import { ApiContext } from "../../context/ApiProvider";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Settings } from "../../api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import useWhatsApp from "../../hooks/whatsapp";

const Login = () => {
  const { token } = useSelector((state) => state.auth);
  const { data: socialLink } = useWhatsApp();
  const navigate = useNavigate();
  const { logo } = useContext(ApiContext);
  const dispatch = useDispatch();
  const [handleLogin] = useLoginMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ username, password }) => {
    const loginData = {
      username: username,
      password: password,
      b2c: Settings.b2c,
    };
    const data = await handleLogin(loginData).unwrap();

    if (data.success) {
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
      localStorage.setItem("memberId", memberId);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      localStorage.setItem("bonusToken", bonusToken);
      if (modal?.banner) {
        localStorage.setItem("modal", JSON.stringify(modal));
      }
      if (data?.result?.changePassword) {
        localStorage.setItem("changePassword", true);
        navigate("/change-password-login");
      } else {
        navigate("/");
        toast.success("Login Successful");
      }
    } else {
      toast.error(data?.error);
    }
  };

  /* handle login demo user */
  const loginWithDemo = async () => {
    /* Random token generator */
    /* Encrypted the post data */
    const loginData = {
      username: "demo",
      password: "",
      b2c: Settings.b2c,
    };
    const result = await handleLogin(loginData).unwrap();

    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      const modal = {
        banner: result?.result?.banner,
        bannerTitle: result?.result?.bannerTitle,
      };

      dispatch(setUser({ user, token }));
      localStorage.setItem("buttonValue", JSON.stringify(game));
      localStorage.setItem("token", token);
      if (modal?.banner) {
        localStorage.setItem("modal", JSON.stringify(modal));
      }
      localStorage.setItem("bonusToken", bonusToken);
      if (token && user) {
        navigate("/");
        toast.success("Login successful");
      }
    } else {
      toast.error(result?.error);
    }
  };

  // const openWhatsapp = () => {
  //   if (socialLink?.result?.whatsapplink) {
  //     window.open(socialLink?.result?.whatsapplink, "_blank");
  //   }
  // };

  const handleOpenSocialLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  const handleOpenWhatsapp = () => {
    if (token && socialLink?.result?.branchWhatsapplink) {
      window.open(socialLink?.result?.branchWhatsapplink, "_blank");
    } else {
      window.open(socialLink?.result?.whatsapplink, "_blank");
    }
  };

  return (
    <div _nghost-wjb-c42>
      <div
        _ngcontent-wjb-c42
        className="login-wrapper"
        style={{ flexWrap: "nowrap" }}
      >
        <div _ngcontent-wjb-c42 className="text-center logo-login mb-3">
          <img
            onClick={() => navigate("/")}
            _ngcontent-wjb-c42
            alt="logo"
            src={logo}
          />
        </div>
        <div _ngcontent-wjb-c42 className="login-form">
          <form
            onSubmit={handleSubmit(onSubmit)}
            _ngcontent-wjb-c42
            noValidate
            autoComplete="off"
            className="ng-untouched ng-pristine ng-invalid"
          >
            <div _ngcontent-wjb-c42 className="form-group mb-4">
              <input
                {...register("username", { required: true })}
                _ngcontent-wjb-c42
                formcontrolname="username"
                type="text"
                aria-required="true"
                aria-invalid="false"
                className="form-control ng-untouched ng-pristine ng-invalid"
                placeholder="Username/Mobile"
              />
            </div>
            <div _ngcontent-wjb-c42 className="form-group mb-4">
              <input
                {...register("password", { required: true })}
                _ngcontent-wjb-c42
                formcontrolname="password"
                type="password"
                placeholder="Password"
                aria-required="true"
                aria-invalid="false"
                className="form-control ng-untouched ng-pristine ng-invalid"
              />
            </div>
            <div _ngcontent-wjb-c42 className="form-group mb-1">
              <button
                _ngcontent-wjb-c42
                type="submit"
                className="btn btn-primary btn-block"
              >
                Login
                <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
              </button>
            </div>
            {Settings.demoLogin && (
              <div _ngcontent-wjb-c42 className="form-group mb-0">
                <button
                  onClick={loginWithDemo}
                  _ngcontent-wjb-c42
                  type="button"
                  className="btn btn-primary btn-block"
                >
                  Login with Demo ID
                  <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                </button>
              </div>
            )}

            {Settings.registration && (
              <div _ngcontent-wjb-c42 className="form-group mt-1">
                <button
                  onClick={() => navigate("/register")}
                  _ngcontent-wjb-c42
                  type="button"
                  className="btn btn-primary btn-block"
                >
                  Registration
                  <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                </button>
              </div>
            )}
            {/* {Settings.registrationWhatsapp &&
              socialLink?.result?.whatsapplink && (
                <div _ngcontent-wjb-c42 className="form-group mt-1">
                  <button
                    onClick={openWhatsapp}
                    _ngcontent-wjb-c42
                    type="button"
                    className="btn btn-primary btn-block"
                  >
                    Get ID on Whatsapp
                    <FontAwesomeIcon icon={faSignInAlt} className="ml-2" />
                  </button>
                </div>
              )} */}
            {Settings.registration && (
              <div _ngcontent-kfy-c42="" class="form-group text-center">
                <Link
                  to="/forgot-password"
                  _ngcontent-kfy-c42=""
                  style={{ color: "#193ba0" }}
                  class="fp "
                >
                  Forgot Password
                </Link>
              </div>
            )}

            {socialLink?.result?.whatsapplink ||
            socialLink?.result?.instagramLink ||
            socialLink?.result?.telegramLink ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                <span style={{ marginBottom: "5px" }}>Contact Us</span>
                <div>
                  {socialLink?.result?.whatsapplink ||
                  socialLink?.result?.branchWhatsapplink ? (
                    <a
                      onClick={handleOpenWhatsapp}
                      title="whatsapp"
                      target="_blank"
                      style={{ marginRight: "3px" }}
                      className="flex items-center justify-center gap-1 w-10 h-10 cursor-pointer"
                    >
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        fill="var(--theme1-bg)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="45"
                          height="45"
                          rx="6"
                          fill="var(--theme1-bg)"
                          fillOpacity="0.2"
                        ></rect>
                        <g clipPath="url(#clip0_1217_680)">
                          <path
                            d="M22.503 10H22.497C15.8805 10 10.5 15.382 10.5 22C10.5 24.625 11.346 27.058 12.7845 29.0335L11.289 33.4915L15.9015 32.017C17.799 33.274 20.0625 34 22.503 34C29.1195 34 34.5 28.6165 34.5 22C34.5 15.3835 29.1195 10 22.503 10ZM29.4855 26.9455C29.196 27.763 28.047 28.441 27.1305 28.639C26.5035 28.7725 25.6845 28.879 22.9275 27.736C19.401 26.275 17.13 22.6915 16.953 22.459C16.7835 22.2265 15.528 20.5615 15.528 18.8395C15.528 17.1175 16.4025 16.279 16.755 15.919C17.0445 15.6235 17.523 15.4885 17.982 15.4885C18.1305 15.4885 18.264 15.496 18.384 15.502C18.7365 15.517 18.9135 15.538 19.146 16.0945C19.4355 16.792 20.1405 18.514 20.2245 18.691C20.31 18.868 20.3955 19.108 20.2755 19.3405C20.163 19.5805 20.064 19.687 19.887 19.891C19.71 20.095 19.542 20.251 19.365 20.47C19.203 20.6605 19.02 20.8645 19.224 21.217C19.428 21.562 20.133 22.7125 21.171 23.6365C22.5105 24.829 23.5965 25.21 23.985 25.372C24.2745 25.492 24.6195 25.4635 24.831 25.2385C25.0995 24.949 25.431 24.469 25.7685 23.9965C26.0085 23.6575 26.3115 23.6155 26.6295 23.7355C26.9535 23.848 28.668 24.6955 29.0205 24.871C29.373 25.048 29.6055 25.132 29.691 25.2805C29.775 25.429 29.775 26.1265 29.4855 26.9455Z"
                            fill="var(--theme1-bg)"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1217_680">
                            <rect
                              width="24"
                              height="24"
                              fill="var(--theme1-bg)"
                              transform="translate(10.5 10)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  ) : null}

                  {socialLink?.result?.instagramLink && (
                    <a
                      style={{ marginRight: "3px" }}
                      onClick={() =>
                        handleOpenSocialLink(socialLink?.result?.instagramLink)
                      }
                      title="Instagram"
                      target="_blank"
                      className="flex items-center justify-center gap-1 w-10 h-10 cursor-pointer"
                    >
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        fill="var(--theme1-bg)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="45"
                          height="45"
                          rx="6"
                          fill="var(--theme1-bg)"
                          fillOpacity="0.2"
                        ></rect>
                        <g clipPath="url(#clip0_1217_692)">
                          <path
                            d="M28.3503 10H18.6497C14.7074 10 11.5 13.2074 11.5 17.1497V26.8503C11.5 30.7926 14.7074 34 18.6497 34H28.3503C32.2926 34 35.5 30.7926 35.5 26.8503V17.1497C35.5 13.2074 32.2926 10 28.3503 10ZM33.0856 26.8503C33.0856 29.4655 30.9655 31.5856 28.3503 31.5856H18.6497C16.0345 31.5856 13.9144 29.4655 13.9144 26.8503V17.1497C13.9144 14.5345 16.0345 12.4144 18.6497 12.4144H28.3503C30.9655 12.4144 33.0856 14.5345 33.0856 17.1497V26.8503Z"
                            fill="var(--theme1-bg)"
                          ></path>
                          <path
                            d="M23.5002 15.7927C20.0775 15.7927 17.293 18.5773 17.293 21.9999C17.293 25.4226 20.0775 28.2072 23.5002 28.2072C26.9229 28.2072 29.7075 25.4226 29.7075 21.9999C29.7075 18.5773 26.9229 15.7927 23.5002 15.7927ZM23.5002 25.7928C21.4055 25.7928 19.7074 24.0947 19.7074 22C19.7074 19.9052 21.4055 18.2071 23.5002 18.2071C25.595 18.2071 27.2931 19.9052 27.2931 22C27.2931 24.0947 25.5949 25.7928 23.5002 25.7928Z"
                            fill="var(--theme1-bg)"
                          ></path>
                          <path
                            d="M29.7193 17.3267C30.5408 17.3267 31.2067 16.6608 31.2067 15.8393C31.2067 15.0179 30.5408 14.352 29.7193 14.352C28.8979 14.352 28.2319 15.0179 28.2319 15.8393C28.2319 16.6608 28.8979 17.3267 29.7193 17.3267Z"
                            fill="var(--theme1-bg)"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1217_692">
                            <rect
                              width="24"
                              height="24"
                              fill="var(--theme1-bg)"
                              transform="translate(11.5 10)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  )}

                  {socialLink?.result?.telegramLink && (
                    <a
                      style={{ marginRight: "3px" }}
                      onClick={() =>
                        handleOpenSocialLink(socialLink?.result?.telegramLink)
                      }
                      title="Telegram"
                      target="_blank"
                      className="flex items-center justify-center gap-1 w-10 h-10 cursor-pointer"
                    >
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 45 45"
                        fill="var(--theme1-bg)"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="45"
                          height="45"
                          rx="6"
                          fill="var(--theme1-bg)"
                          fillOpacity="0.2"
                        ></rect>
                        <g clipPath="url(#clip0_1217_675)">
                          <path
                            d="M18.4172 25.181L18.0202 30.765C18.5882 30.765 18.8342 30.521 19.1292 30.228L21.7922 27.683L27.3102 31.724C28.3222 32.288 29.0352 31.991 29.3082 30.793L32.9302 13.821L32.9312 13.82C33.2522 12.324 32.3902 11.739 31.4042 12.106L10.1142 20.257C8.66118 20.821 8.68318 21.631 9.86718 21.998L15.3102 23.691L27.9532 15.78C28.5482 15.386 29.0892 15.604 28.6442 15.998L18.4172 25.181Z"
                            fill="var(--theme1-bg)"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_1217_675">
                            <rect
                              width="24"
                              height="24"
                              fill="var(--theme1-bg)"
                              transform="translate(9 10)"
                            ></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ) : null}

            <small _ngcontent-wjb-c42 className="recaptchaTerms">
              This site is protected by reCAPTCHA and the Google{" "}
              <a _ngcontent-wjb-c42>Privacy Policy </a>
              and <a _ngcontent-wjb-c42>Terms of Service </a>
              apply.
            </small>
            <div _ngcontent-wjb-c42 className="form-group mt-1" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
