/* eslint-disable react/no-unknown-property */

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Tab1 = ({ categories, selectedCategory }) => {
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
  }, [selectedCategory, categories]);
  return (
    <ul
      style={{ scrollBehavior: "smooth" }}
      _ngcontent-hot-c46
      role="tablist"
      className="nav nav-tabs"
      aria-label="Tabs"
    >
      <li
        ref={selectedCategory === "All" ? activeRef : null}
        style={{ color: "white" }}
        onClick={() => {
          navigate(`/casino?product=All&category=All`);
        }}
        _ngcontent-hot-c46
        className={` nav-item ${selectedCategory === "All" ? "active" : ""}`}
      >
        <a
          _ngcontent-hot-c46
          role="tab"
          className={`nav-link ${selectedCategory === "All" ? "active" : ""}`}
          aria-controls="goto-p-casino-0"
          aria-selected="true"
          id="goto-p-casino-0-link"
        >
          <span _ngcontent-hot-c46 />
          <span _ngcontent-hot-c96 tabIndex={0}>
            All
          </span>
        </a>
      </li>
      {categories?.map((category) => {
        return (
          <li
            ref={category === selectedCategory ? activeRef : null}
            style={{ color: "white" }}
            onClick={() => {
              navigate(`/casino?product=${category}&category=All`);
            }}
            key={category}
            _ngcontent-hot-c46
            className={` nav-item ${
              category === selectedCategory ? "active" : ""
            }`}
          >
            <a
              _ngcontent-hot-c46
              role="tab"
              className={`nav-link ${
                category === selectedCategory ? "active" : ""
              }`}
              aria-controls="goto-p-casino-0"
              aria-selected="true"
              id="goto-p-casino-0-link"
            >
              <span _ngcontent-hot-c46 />
              <span _ngcontent-hot-c96 tabIndex={0}>
                {category}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tab1;
