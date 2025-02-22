/* eslint-disable react/no-unknown-property */

const Tab1 = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <ul
      _ngcontent-hot-c46
      role="tablist"
      className="nav nav-tabs"
      aria-label="Tabs"
    >
      {categories?.map((category) => {
        return (
          <li
            style={{ color: "white" }}
            onClick={() => setSelectedCategory(category)}
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
