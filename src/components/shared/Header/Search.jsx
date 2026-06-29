import { useEffect, useRef, useState } from "react";
import useCloseModalClickOutside from "../../../hooks/closeModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchEventMutation } from "../../../redux/features/events/events";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchEvent, { data }] = useSearchEventMutation();
  const searchRef = useRef();
  useCloseModalClickOutside(searchRef, () => {
    setShowSearch(false);
  });

  useEffect(() => {
    const getSearchData = async () => {
      if (searchTerm.length > 2) {
        await searchEvent({ name: searchTerm }).unwrap();
      }
    };
    getSearchData();
  }, [searchEvent, searchTerm]);

  const handleNavigate = (event) => {
    setSearchTerm("");
    setShowSearch(false);
    navigate(`/event-details/${event?.eventTypeId}/${event?.eventId}`);
  };

  return (
    <div ref={searchRef} className="search-box-container">
      <div className="search-box float-left">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className={`search_input ng-untouched ng-pristine ng-valid  
            
             ${showSearch ? "search_input-hover" : ""}`}
          aria-expanded="false"
          aria-autocomplete="list"
        />
        <a href="javascript:void(0)" className="search_icon">
          <FontAwesomeIcon
            onClick={() => setShowSearch(true)}
            style={{ color: "black" }}
            icon={faSearch}
            size="20"
          />
        </a>
      </div>
      {showSearch && data?.result?.length > 0 && searchTerm.length > 2 && (
        <div
          className="dropdown open bottom ng-tns-c52-1  ng-star-inserted"
          style={{
            position: "absolute",
            display: "block",
            visibility: "visible",
            willChange: "transform",
            top: "10px",
            left: "0px",
            width: "100%",
            maxWidth: "300px",
            transform: "translate3d(0px, 30px, 0px)",
          }}
          id="ngb-typeahead-1"
          role="listbox"
        >
          <ul
            style={{ display: "flex", flexDirection: "column" }}
            className="ng-star-inserted"
          >
            {data?.result?.map((event) => {
              return (
                <li key={event?.eventId} className="active ng-star-inserted">
                  <a
                    style={{ width: "100%" }}
                    onClick={() => handleNavigate(event)}
                  >
                    <div
                      className="search-game-name"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p>{event?.name}</p>
                      <p> {event?.openDate}</p>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
