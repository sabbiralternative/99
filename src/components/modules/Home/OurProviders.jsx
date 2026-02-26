import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OurProviders = ({ our_provider }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    if (!token) return navigate("/login");
    navigate(`/casino?product=${casino?.product}&category=${casino?.category}`);
  };

  return (
    <div className="row mx-0 mt-0">
      <h2 className="newheading">
        <span>our providers</span>
      </h2>

      <div className="csn_div">
        {our_provider?.map((item) => {
          return (
            <div
              onClick={() => handleNavigateToIFrame(item)}
              key={item?.id}
              className="csn_thumb"
            >
              <img className="img-fluid" src={`/${item?.url_thumb}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurProviders;
