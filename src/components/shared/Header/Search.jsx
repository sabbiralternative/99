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
      {showSearch && data?.result?.length > 0 && (
        <div
          className="dropdown open bottom ng-tns-c52-1 dropdown-menu ng-star-inserted"
          style={{
            position: "absolute",
            display: "block",
            visibility: "visible",
            willChange: "transform",
            top: "0px",
            left: "0px",
            transform: "translate3d(0px, 30px, 0px)",
          }}
          id="ngb-typeahead-1"
          role="listbox"
        >
          <ul className="ng-star-inserted">
            {data?.result?.map((event) => {
              return (
                <li key={event?.eventId} className="active ng-star-inserted">
                  <a onClick={() => handleNavigate(event)}>
                    <div>
                      <div className="search-game-name">
                        <b>{event?.eventType}</b>
                        <b />
                      </div>
                      <div className="game-date text-right ng-star-inserted">
                        {event?.openDate}
                      </div>
                      <div className="game-teams">{event?.name}</div>
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
