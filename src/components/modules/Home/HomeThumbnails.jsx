/* eslint-disable react/no-unknown-property */

import { useNavigate } from "react-router-dom";
import { useMac88Query } from "../../../redux/features/events/events";

const HomeThumbnails = () => {
  const navigate = useNavigate();
  const { data } = useMac88Query();

  const handleNavigateToIFrame = (casino) => {
    navigate(
      `/casino/${casino?.game_name?.replace(/ /g, "")}/${casino?.game_id}`
    );
  };

  return (
    <div _ngcontent-htq-c97 className="row mx-0 mt-1">
      {data?.data?.map((casino) => {
        return (
          <div
            onClick={() => handleNavigateToIFrame(casino)}
            key={casino?.game_id}
            _ngcontent-htq-c97
            className="col-3 px-1 casinoicons"
            tabIndex={0}
          >
            <img _ngcontent-htq-c97 className="img-fluid" src={casino?.img} />
            <div _ngcontent-htq-c97 className="casino-name">
              {casino?.game_name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomeThumbnails;
