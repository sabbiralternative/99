import { Settings } from "../../../api";
import { useLiveCasinoIFrame } from "../../../hooks/liveCasinoIframe";

const Premium = ({ premium }) => {
  const payload = {
    gameId: premium?.gameId,
    provider: premium?.provider,
    eventId: premium?.eventId,
    isHome: false,
    mobileOnly: true,
    casinoCurrency: Settings.casino_currency,
  };

  const { data } = useLiveCasinoIFrame(payload);

  return (
    <>
      <button
        className="btn"
        style={{
          background: "var(--theme1-bg)",
          padding: "6px 0px",
          fontSize: "14px",
          fontWeight: "600",
          width: "100%",
          margin: "3px 0px",
          color: "white",
        }}
      >
        Premium
      </button>
      {premium && (
        <div
          className="w-full h-full min-h-screen"
          style={{ height: "100%", minHeight: "100vh" }}
        >
          <iframe
            id="videoComponent"
            style={{ height: "100%", minHeight: "100vh" }}
            className="w-full h-full min-h-screen relative    bg-transparent"
            src={data?.gameUrl}
            width="100%"
            allowfullscreen=""
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Premium;
