import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ApiContext } from "../../context/ApiProvider";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";

const ChangePasswordLogin = () => {
  const { logo } = useContext(ApiContext);
  const navigate = useNavigate();
  const [handleChangePassword] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* Change password login api */
  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const payload = {
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
    };
    const data = await handleChangePassword(payload).unwrap();

    if (data.success) {
      toast.success(data?.result?.message);
      localStorage.removeItem("changePassword");
      localStorage.clear();
      navigate("/login");
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-page">
        <div className="login-box">
          <Link to="/" className="logo-login">
            <img src={logo} />
          </Link>
          <div className="login-form mt-4">
            <h4 className="text-center login-title">
              Change Password{" "}
              <FontAwesomeIcon icon={faHandPointDown} className="ml-2" />
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="login-chage-pass"
            >
              <div className="row row10">
                <div
                  className="mb-3 position-relative "
                  style={{ width: "100%" }}
                >
                  <label className="form-label text-start w-100">
                    Current Password:
                  </label>
                  <input
                    {...register("password", { required: true })}
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter Current password"
                  />
                  {errors.password?.type === "required" && (
                    <p
                      style={{ marginLeft: "8px", color: "red" }}
                      className="error-form"
                    >
                      Current Password is required.
                    </p>
                  )}
                </div>
              </div>
              <div className="row row10">
                <div
                  className="mb-3 position-relative"
                  style={{ width: "100%" }}
                >
                  <label className="form-label text-start w-100">
                    New Password:
                  </label>
                  <input
                    {...register("newPassword", {
                      required: true,
                      pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                    })}
                    name="newPassword"
                    type="password"
                    className="form-control"
                    placeholder="Enter New Password"
                    aria-autocomplete="list"
                  />
                  {errors.newPassword?.type === "required" && (
                    <p
                      style={{ marginLeft: "8px", color: "red" }}
                      className="error-form"
                    >
                      New Password is required.
                    </p>
                  )}
                  {errors.newPassword?.type === "pattern" && (
                    <p
                      style={{ marginLeft: "8px", color: "red" }}
                      className="error-form"
                    >
                      New Password must contain at least: 1 uppercase letter, 1
                      lowercase letter, 1 number
                    </p>
                  )}
                </div>
              </div>
              <div className="row row10">
                <div
                  className="mb-4 position-relative"
                  style={{ width: "100%" }}
                >
                  <label className="form-label text-start w-100">
                    Confirm Password:
                  </label>
                  <input
                    {...register("newPasswordConfirm", {
                      required: true,
                      pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
                    })}
                    name="newPasswordConfirm"
                    type="password"
                    className="form-control"
                    placeholder="Confirm New Password"
                  />
                  {errors.newPasswordConfirm?.type === "required" && (
                    <p
                      style={{ marginLeft: "8px", color: "red" }}
                      className="error-form"
                    >
                      New Password Confirmation is required.
                    </p>
                  )}
                  {errors.newPasswordConfirm?.type === "pattern" && (
                    <p
                      style={{ marginLeft: "8px", color: "red" }}
                      className="error-form"
                    >
                      New Password Confirmation must contain at least: 1
                      uppercase letter, 1 lowercase letter, 1 number
                    </p>
                  )}
                </div>
              </div>
              <div className="row row10">
                <div className="mb-3" style={{ width: "100%" }}>
                  <button type="submit" className="btn btn-primary btn-block">
                    Change Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordLogin;
