import toast from "react-hot-toast";
import moment from "moment";
import { useBonusMutation, useBonusQuery } from "../../hooks/bonus";

const BonusStatement = () => {
  const { data, refetch } = useBonusQuery({
    type: "viewStatement",
  });
  const { mutate: claimBonus } = useBonusMutation();

  const handleShowMessage = (item) => {
    if (item?.is_claimed === 1) {
      return <span style={{ color: "green" }}>Bonus Claimed</span>;
    } else if (item?.is_claimed === 2) {
      return <span style={{ color: "orange" }}>Claim Pending</span>;
    } else if (item?.is_claimed === 3) {
      return <span style={{ color: "red" }}>Rejected</span>;
    } else if (item?.is_claimed === 0) {
      if (item?.is_wagering_complete === 1) {
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
            Claim
          </button>
        );
      } else if (item?.is_wagering_complete === 0) {
        return <span style={{ color: "red" }}>Wagering Incomplete</span>;
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
                          Bonus Amount:{" "}
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
                          Wagering Required:{" "}
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
                          Wagering Complete Amount:{" "}
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
                          Date Added:{" "}
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
                          Expiry Date:{" "}
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
                  <h2 style={{ fontSize: "16px" }}>No bonus statement yet!</h2>
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
