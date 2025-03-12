/* eslint-disable react/no-unknown-property */
/* NOTUSING */
const Score = ({ score }) => {
  const {
    recent,
    runRate,
    target,
    team1Name,
    team1Score,
    team2Name,
    team2Score,
    commentary,
  } = score[0] || {};

  return (
    <div _ngcontent-bym-c104 id="scoreboard-box">
      <div
        _ngcontent-bym-c104
        className="scorecard scorecard-mobile"
        style={{ marginBottom: "3px" }}
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <style
          dangerouslySetInnerHTML={{
            __html:
              '\n                                      .container-main {\n                                        font-family: Arial, Helvetica,\n                                          sans-serif;\n                                        padding: 0;\n                                        background: linear-gradient(\n                                            0deg,\n                                            rgb(0 0 0 / 39%),\n                                            rgb(0 0 0 / 30%)\n                                          ),\n                                          url(https://speedcdn.io/assets/score_card/desktop.webp);\n                                        background-repeat: no-repeat;\n                                        background-size: cover;\n                                        margin-right: auto;\n                                        margin-left: auto;\n                                        color: white;\n                                        height: 168px;\n                                        align-items: center;\n                                        display: grid;\n                                        background-position: bottom;\n                                        position: relative;\n                                      }\n\n                                      .row-ctm {\n                                        font-family: "Nunito", serif;\n                                        font-optical-sizing: auto;\n                                        font-weight: 200;\n                                        font-style: normal;\n                                        display: flex;\n                                        flex-wrap: wrap;\n                                        align-items: center;\n                                        /* Vertically centers content */\n                                        justify-content: center;\n                                        /* Horizontally centers content */\n                                        text-align: center;\n                                        /* Ensures text inside elements is centered */\n                                        padding: 0px;\n                                        width: 100%;\n                                        /* Ensures it takes the full available width */\n                                      }\n\n                                      .team {\n                                        flex: 0 0 10%;\n                                        max-width: 10%;\n                                        text-align: center;\n                                      }\n\n                                      .match_status {\n                                        flex: 0 0 45%;\n                                        max-width: 45%;\n                                        text-align: center;\n                                        align-items: center;\n                                        /* Vertically centers content */\n                                        justify-content: center;\n                                        /* Horizontally centers content */\n                                        text-align: center;\n                                        /* Ensures text inside elements is centered */\n                                        font-weight: 00;\n                                        font-size: 10px;\n                                        letter-spacing: 0px;\n                                        padding: 4px 0;\n                                      }\n\n                                      .inn1 {\n                                        font-size: 10px;\n                                        font-weight: 00;\n                                        font-style: italic;\n                                        color: #fff;\n                                        width: max-content;\n                                        margin: 0 auto;\n                                        padding: 5px;\n                                      }\n\n                                      .curr_inn {\n                                        font-size: 12px;\n                                        font-weight: 600;\n                                      }\n\n                                      .team_name {\n                                        text-transform: capitalize;\n                                        font-size: 14px;\n                                        margin: 0;\n                                        font-weight: 00;\n                                      }\n\n                                      .day {\n                                        width: 100%;\n                                        display: block;\n                                        text-transform: capitalize;\n                                        font-size: 10px;\n                                      }\n\n                                      .status {\n                                        width: 100%;\n                                      }\n\n                                      .day:before {\n                                        color: #fff;\n                                        margin: 0 5px;\n                                      }\n\n                                      .day:after {\n                                        color: #fff;\n                                        margin: 0 5px;\n                                      }\n\n                                      .team_name img {\n                                        padding-left: 5px;\n                                        vertical-align: middle;\n                                      }\n\n                                      .score-over ul {\n                                        padding: 0;\n                                        margin: 0;\n                                      }\n\n                                      .score-over ul li {\n                                        display: inline-block;\n                                        color: #fff;\n                                      }\n\n                                      .score-over ul li p {\n                                        margin: 0;\n                                      }\n\n                                      .six-balls {\n                                        padding: 2px;\n                                        font-size: 17px;\n                                        font-weight: 600 !important;\n                                      }\n\n                                      .target {\n                                        font-size: 10px;\n                                        margin: 0;\n                                      }\n\n                                      .commantry2 {\n                                        font-family: Arial, Helvetica,\n                                          sans-serif;\n                                        font-size: 16px;\n                                        display: block;\n                                      }\n\n                                      @-webkit-keyframes txt {\n                                        0% {\n                                          -webkit-transform: scale(1);\n                                          transform: scale(1);\n                                        }\n\n                                        50% {\n                                          -webkit-transform: scale(1.25);\n                                          transform: scale(1.25);\n                                        }\n\n                                        100% {\n                                          -webkit-transform: scale(1);\n                                          transform: scale(1);\n                                        }\n                                      }\n\n                                      @keyframes txt {\n                                        0% {\n                                          -webkit-transform: scale(1);\n                                          transform: scale(1);\n                                        }\n\n                                        50% {\n                                          -webkit-transform: scale(1.25);\n                                          transform: scale(1.25);\n                                        }\n\n                                        100% {\n                                          -webkit-transform: scale(1);\n                                          transform: scale(1);\n                                        }\n                                      }\n\n                                      .batsman-container {\n                                        text-transform: uppercase;\n                                        display: flex;\n                                        justify-content: space-between;\n                                        width: 50%;\n                                        display: flex;\n                                        flex-wrap: wrap;\n                                        align-items: center;\n                                        /* Vertically centers content */\n                                        justify-content: center;\n                                        /* Horizontally centers content */\n                                        text-align: center;\n                                        /* Ensures text inside elements is centered */\n                                        padding: 0px;\n                                        width: 100%;\n                                        /* Ensures it takes the full available width */\n                                        text-align: center !important;\n                                        /* Ensures space between striker and non-striker */\n                                        gap: 20%;\n                                        /* Optional: Adds space between items */\n                                        font-size: 12px;\n                                        font-weight: 600;\n                                      }\n\n                                      .requiredRunRate {\n                                        margin-top: 5px !important;\n                                        font-size: 12px !important;\n                                        font-weight: 100;\n                                      }\n\n                                      @media only screen and (max-width: 767px) {\n                                        .container-main {\n                                          font-family: Arial, Helvetica,\n                                            sans-serif;\n                                          height: 168px !important;\n                                          background: linear-gradient(\n                                              0deg,\n                                              rgba(0, 0, 0, 0.39),\n                                              rgba(0, 0, 0, 0.3)\n                                            ),\n                                            url(https://speedcdn.io/assets/score_card/mobile.webp);\n                                          /* Mobile background */\n                                          background-size: cover;\n                                          background-position: center;\n                                        }\n\n                                        .batsman-container {\n                                          flex-direction: column;\n                                          text-transform: uppercase;\n                                          align-items: center;\n                                          font-size: 10px !important;\n                                          width: 50%;\n                                          display: flex;\n                                          flex-wrap: wrap;\n                                          align-items: center;\n                                          /* Vertically centers content */\n                                          justify-content: center;\n                                          /* Horizontally centers content */\n                                          text-align: center;\n                                          /* Ensures text inside elements is centered */\n                                          padding: 0px;\n                                          width: 100%;\n                                          /* Ensures it takes the full available width */\n                                          text-align: center !important;\n                                          /* Ensures space between striker and non-striker */\n                                          gap: 20%;\n                                          /* Optional: Adds space between items */\n                                          font-weight: 600;\n                                        }\n\n                                        .bowler_svg,\n                                        .batsman_svg {\n                                          display: none !important;\n                                        }\n\n                                        .six-balls {\n                                          padding: 2px;\n                                          font-size: 12px;\n                                          font-weight: 600 !important;\n                                        }\n\n                                        .team {\n                                          flex: 0 0 20%;\n                                          max-width: 20%;\n                                          text-align: center;\n                                          font-size: 10px !important;\n                                        }\n\n                                        .match_status {\n                                          flex: 0 0 45%;\n                                          max-width: 45%;\n                                          text-align: center;\n                                          align-items: center;\n                                          /* Vertically centers content */\n                                          justify-content: center;\n                                          /* Horizontally centers content */\n                                          text-align: center;\n                                          /* Ensures text inside elements is centered */\n                                          font-weight: 00;\n                                          font-size: 10px !important;\n                                          letter-spacing: 0px;\n                                          padding: 4px 0;\n                                        }\n\n                                        .commantry2 {\n                                          font-family: Arial, Helvetica,\n                                            sans-serif;\n                                          font-size: 14px;\n                                          display: block;\n                                        }\n\n                                        .requiredRunRate {\n                                          margin-top: 5px !important;\n                                          font-size: 10px !important;\n                                          font-weight: 400;\n                                        }\n                                      }\n                                    ',
          }}
        />
        <div>
          <div style={{ marginBottom: "3px" }}>
            <div className="container-main">
              <div className="row-ctm">
                <div className="batsman_svg">
                  <img
                    src="https://speedcdn.io/assets/score_card/batsman-bold-outline.svg"
                    height="auto"
                    width="auto"
                    style={{
                      height: "100px !important",
                    }}
                  />
                </div>
                <div
                  className="team"
                  style={{
                    textAlign: "right",
                    marginRight: "10px",
                    lineHeight: 2,
                  }}
                >
                  <div className="curr_inn">
                    <div
                      style={{
                        lineHeight: "1.2",
                        fontWeight: 600,
                      }}
                    >
                      {team1Name}
                    </div>
                    <span className="run" style={{ fontWeight: 600 }}>
                      {team1Score}
                    </span>
                    {/* <span className="over" style={{ fontWeight: 600 }}>
                      (38.3)
                    </span> */}
                    <br />
                    <span className="over" style={{ fontWeight: 600 }}>
                      CRR :{" "}
                    </span>
                    {runRate}
                  </div>
                </div>
                <div
                  className="match_status"
                  style={{
                    border: "1px solid #fff !important",
                    borderRadius: "7px",
                    padding: "5px",
                  }}
                >
                  <span className="commantry2">{target}</span>
                  <p className="target" style={{ fontStyle: "italic" }} />
                  <span className="day">
                    <div className="score-over">
                      <ul>
                        {recent?.map((r, i) => (
                          <li key={i} className="six-balls">
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </span>
                  <div className="requiredRunRate" style={{ fontWeight: 600 }}>
                    <span style={{ fontWeight: 600 }} />
                  </div>
                  <div className="batsman-container">
                    <div>
                      <span>*Brydon Carse</span>
                      <span>4 (13)</span>
                    </div>
                    <div>
                      <span>Jacob Bethell</span>
                      <span>37 (52)</span>
                    </div>
                  </div>
                </div>
                <div
                  className="team"
                  style={{
                    textAlign: "left",
                    marginLeft: "10px",
                    lineHeight: 2,
                  }}
                >
                  <div className="curr_inn">
                    <div
                      style={{
                        lineHeight: "1.2",
                        fontWeight: 600,
                      }}
                    >
                      {team2Name}
                    </div>
                    <span className="run" style={{ fontWeight: 600 }}>
                      {team2Score}
                    </span>
                    {/* <span className="over" style={{ fontWeight: 600 }}>
                      (0.0)
                    </span> */}
                    <br />
                    <span style={{ fontWeight: 600 }}>CRR: </span>
                    {commentary}
                  </div>
                </div>
                <div className="bowler_svg">
                  <img
                    src="https://speedcdn.io/assets/score_card/baller-bold-outline.svg"
                    height="auto"
                    width="auto"
                    style={{
                      height: "90px !important",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
