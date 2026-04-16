/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewLaunch = ({ data, title }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino/${casino?.name?.replace(/ /g, "")}/${casino?.id}`);
  };

  return (
    <div className="row mx-0 mt-1 newlaunch">
      <h2 className="newheading">
        <span>{title}</span>
      </h2>

      <div _ngcontent-htq-c97 className="row mx-0 mt-1">
        {data?.map((casino) => {
          return (
            <div
              onClick={() => handleNavigateToIFrame(casino)}
              key={casino?.id}
              _ngcontent-htq-c97
              className="col-3 px-1 casinoicons"
              tabIndex={0}
            >
              <img
                _ngcontent-htq-c97
                className="img-fluid"
                src={casino?.url_thumb}
              />
              <div _ngcontent-htq-c97 className="casino-name">
                {casino?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewLaunch;
