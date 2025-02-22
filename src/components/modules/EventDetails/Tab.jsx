/* eslint-disable react/no-unknown-property */

const Tab = ({ tab, setTab, currentBet }) => {
  return (
    <ul
      _ngcontent-bym-c46
      role="tablist"
      className="nav nav-tabs"
      aria-label="Tabs"
    >
      <li
        onClick={() => setTab("odd")}
        _ngcontent-bym-c46
        className={`${tab === "odd" ? "active" : ""} nav-item`}
      >
        <a
          style={{ color: "white" }}
          _ngcontent-bym-c46
          role="tab"
          className={`nav-link ${tab === "odd" ? "active" : ""}`}
          aria-controls
          aria-selected="true"
          id
        >
          <span _ngcontent-bym-c46>ODDS</span>
        </a>
      </li>
      <li
        onClick={() => setTab("matchedBet")}
        _ngcontent-bym-c46
        className={`${tab === "matchedBet" ? "active" : ""} nav-item`}
      >
        <a
          style={{ color: "white" }}
          _ngcontent-bym-c46
          role="tab"
          className={`nav-link ${tab === "matchedBet" ? "active" : ""}`}
          aria-controls
          aria-selected="false"
          id
        >
          <span _ngcontent-bym-c46>MATCHED BET ({currentBet?.length})</span>
        </a>
      </li>
    </ul>
  );
};

export default Tab;
