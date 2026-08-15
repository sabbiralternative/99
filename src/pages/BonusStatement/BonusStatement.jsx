import toast from "react-hot-toast";
import moment from "moment";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const BonusStatement = () => {
  const { getLanguage } = useLanguage();
  const { data, refetch } = useBonusQuery({
    type: "viewStatement",
  });
  const { mutate: claimBonus } = useBonusMutation();

  const handleShowMessage = (item) => {
    if (item?.is_claimed == 1) {
      return (
        <span style={{ color: "green" }}>
          {" "}
          {getLanguage(LanguageKey.BONUS_CLAIMED)}
        </span>
      );
    } else if (item?.is_claimed == 2) {
      return (
        <span style={{ color: "orange" }}>
          {" "}
          {getLanguage(LanguageKey.CLAIM_PENDING)}
        </span>
      );
    } else if (item?.is_claimed == 3) {
      return (
        <span style={{ color: "red" }}>
          {" "}
          {getLanguage(LanguageKey.REJECTED)}
        </span>
      );
    } else if (item?.is_claimed == 0) {
      if (item?.is_wagering_complete == 1) {
        return (
          <button
            onClick={() => handleClaimBonus(item)}
            style={{
              backgroundColor: "var(--color-bg-primary)",
              padding: "4px 8px",
              borderRadius: "4px",
              color: "white",
            }}
          >
            {getLanguage(LanguageKey.CLAIM)}
          </button>
        );
      } else if (item?.is_wagering_complete === 0) {
        return (
          <span style={{ color: "red" }}>
            {" "}
            {getLanguage(LanguageKey.WAGERING_INCOMPLETE)}
          </span>
        );
      }
    }
  };

  const handleClaimBonus = async (item) => {
    const payload = {
      type: "claimBonus",
      bonus_statement_id: item?.bonus_statement_id,
    };
    claimBonus(payload, {
      onSuccess: (data) => {
        if (data?.success) {
          refetch();
          toast.success(data?.result);
        } else {
          toast.error(data?.result || "Something went wrong");
        }
      },
    });
  };

  const formateDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY, h:mm a") : "";
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transition: "all 0.1s ease-in-out",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              minHeight: "calc(-110px + 100dvh)",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {data?.result?.length > 0 ? (
                data?.result?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      width: "100%",
                      marginBottom: "8px",
                      padding: "4px",
                    }}
                  >
                    {item?.bonus_type === "wagering" ? (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "start",
                          gap: "4px",
                          backgroundColor: "#f4f4f4",
                          marginBottom: "8px",
                          boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px",
                            fontSize: "14px",
                            backgroundColor: "#eaeaea",
                          }}
                        >
                          <span
                            style={{
                              width: "50%",
                              borderRight: "1px solid #ccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {getLanguage(LanguageKey.BONUS_AMOUNT)}:{" "}
                            <strong style={{ color: "green" }}>
                              ₹ {item?.amount}
                            </strong>
                          </span>
                          <span
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {getLanguage(LanguageKey.WAGERING_REQUIRED)}:{" "}
                            <strong
                              style={{
                                color:
                                  item?.wagering_amount > 0 ? "green" : "red",
                              }}
                            >
                              ₹ {item?.wagering_amount}
                            </strong>
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px",
                            fontSize: "14px",
                            backgroundColor: "#eaeaea",
                          }}
                        >
                          <span
                            style={{
                              width: "50%",
                              borderRight: "1px solid #ccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {getLanguage(LanguageKey.WAGERING_COMPLETED_AMOUNT)}
                            :{" "}
                            <strong
                              style={{
                                color:
                                  item?.is_wagering_complete === 0
                                    ? "orange"
                                    : "green",
                              }}
                            >
                              ₹ {item?.wagering_complete_amount}
                            </strong>
                          </span>
                          <span
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {getLanguage(LanguageKey.DATE_ADDED)}:{" "}
                            <strong>{formateDate(item?.date_added)}</strong>
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px",
                            fontSize: "14px",
                            backgroundColor: "#eaeaea",
                          }}
                        >
                          <span
                            style={{
                              width: "50%",
                              borderRight: "1px solid #ccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {getLanguage(LanguageKey.EXPIRY_DATE)}:{" "}
                            <strong>{formateDate(item?.expiry_date)}</strong>
                          </span>
                          <span
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {handleShowMessage(item)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "start",
                          gap: "4px",
                          backgroundColor: "#f4f4f4",
                          marginBottom: "8px",
                          boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            padding: "8px",
                            fontSize: "14px",
                            backgroundColor: "#eaeaea",
                          }}
                        >
                          <span
                            style={{
                              width: "50%",
                              borderRight: "1px solid #ccc",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {getLanguage(LanguageKey.BONUS_AMOUNT)}:{" "}
                            <strong style={{ color: "green" }}>
                              ₹ {item?.amount}
                            </strong>
                          </span>
                          <span
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {getLanguage(LanguageKey.DATE_ADDED)}:{" "}
                            <strong>{formateDate(item?.date_added)}</strong>
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            width: "100%",
                            padding: "8px",
                            fontSize: "14px",
                            backgroundColor: "#eaeaea",
                          }}
                        >
                          <span
                            style={{
                              width: "50%",
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {handleShowMessage(item)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: "20px",
                  }}
                >
                  <h2 style={{ fontSize: "16px" }}>
                    {" "}
                    {getLanguage(LanguageKey.NO_BONUS_STATEMENT_YET)}!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusStatement;
