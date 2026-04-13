/* eslint-disable react/no-unknown-property */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Tab2 = ({ subCategories, product, selectedSubCategory }) => {
  const activeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center", // key part
        block: "nearest",
      });
    }
  }, [selectedSubCategory, subCategories, product]);
  return (
    <ul
      style={{ scrollBehavior: "smooth" }}
      _ngcontent-hot-c46
      role="tablist"
      className="nav nav-tabs"
      aria-label="Tabs"
    >
      <li
        ref={selectedSubCategory === "All" ? activeRef : null}
        onClick={() => {
          navigate(`/casino?product=${product}&category=All`);
        }}
        _ngcontent-hot-c46
        className={` nav-item ${
          selectedSubCategory === "All" ? "active " : ""
        }`}
      >
        <a
          _ngcontent-hot-c46
          href="javascript:void(0);"
          role="tab"
          className={`nav-link ${
            selectedSubCategory === "All" ? "active " : ""
          }`}
          aria-controls="goto-c-casino-0"
          aria-selected="true"
          id="goto-c-casino-0-link"
        >
          <span _ngcontent-hot-c46 />
          <span _ngcontent-hot-c96 tabIndex={0} id="childCasino-0-0">
            <img
              _ngcontent-hot-c96
              className="img-fluid"
              src="https://tezcdn.io/casino/int-casino-icon/all.webp"
            />
            All
          </span>
        </a>
      </li>
      {subCategories?.map((category) => {
        return (
          <li
            ref={category === selectedSubCategory ? activeRef : null}
            onClick={() => {
              navigate(`/casino?product=${product}&category=${category}`);
            }}
            key={category}
            _ngcontent-hot-c46
            className={` nav-item ${
              selectedSubCategory === category ? "active" : ""
            }`}
          >
            <a
              _ngcontent-hot-c46
              href="javascript:void(0);"
              role="tab"
              className={`nav-link ${
                selectedSubCategory === category ? "active " : ""
              }`}
              aria-controls="goto-c-casino-0"
              aria-selected="true"
              id="goto-c-casino-0-link"
            >
              <span _ngcontent-hot-c46 />
              <span _ngcontent-hot-c96 tabIndex={0} id="childCasino-0-0">
                <img
                  _ngcontent-hot-c96
                  className="img-fluid"
                  src={`/icon/${category
                    ?.split(" ")
                    .join("")
                    .toLowerCase()}.svg`}
                  onError={(e) => {
                    if (e.target.src.endsWith(".svg")) {
                      // Try webp only once after svg fails
                      e.target.src = `/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.webp`;
                    } else if (e.target.src.endsWith(".webp")) {
                      // Try webp only once after svg fails
                      e.target.src = `/icon/${category
                        ?.split(" ")
                        .join("")
                        .toLowerCase()}.png`;
                    } else {
                      // If webp fails, do nothing (leave broken img)
                      // e.target.onerror = null;
                      e.target.src = `/icon/all.svg`;
                    }
                  }}
                />
                {category}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab2;
