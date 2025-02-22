import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [handleChangePassword] = useChangePasswordMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ password, oldPassword, passVerify }) => {
    const payload = {
      oldPassword,
      password,
      passVerify,
    };
    const data = await handleChangePassword(payload).unwrap();
    if (data.success) {
      toast.success(data?.result?.message);
      localStorage.clear();
      navigate("/login");
    } else {
      toast.error(data?.error?.errorMessage);
    }
  };

  return (
    <div className="ng-star-inserted">
      <div className="ng-star-inserted">
        <div className="report-container">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Change Password</h4>
            </div>
            <div className="card-body container-fluid container-fluid-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="ng-untouched ng-pristine ng-invalid"
              >
                <div className="row row5 mt-2">
                  <div className="col-12">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        {...register("oldPassword", { required: true })}
                        type="password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        type="password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        {...register("passVerify", {
                          required: true,
                        })}
                        type="password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                      />
                    </div>
                  </div>
                </div>
                <div className="row row5 mt-2">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-sm"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
