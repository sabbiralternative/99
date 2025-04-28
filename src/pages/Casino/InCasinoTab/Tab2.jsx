/* eslint-disable react/no-unknown-property */

const Tab2 = ({ categories, setSelectedSubCategory, selectedSubCategory }) => {
  return (
    <ul
      _ngcontent-hot-c46
      role="tablist"
      className="nav nav-tabs"
      aria-label="Tabs"
    >
      <li
        onClick={() => setSelectedSubCategory("All")}
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
      {categories?.map((category) => {
        return (
          <li
            onClick={() => setSelectedSubCategory(category)}
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
                    } else {
                      // If webp fails, do nothing (leave broken img)
                      e.target.onerror = null;
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
