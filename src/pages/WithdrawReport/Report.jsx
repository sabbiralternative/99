import { useEffect, useState } from "react";
import { useAccountStatement } from "../../hooks/accountStatement";
import ShowImage from "./ShowImage";
import Complaint from "../../components/modals/Complaint/Complaint";
import { Settings } from "../../api";
import { useBankMutation } from "../../redux/features/deposit/deposit.api";
import toast from "react-hot-toast";

const WithdrawReport = () => {
  const [deleteWithdraw] = useBankMutation();
  const [complaintId, setComplaintId] = useState(null);
  const [image, setImage] = useState("");
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "WITHDRAW",
    status: "ALL",
  };
  const { data, refetch } = useAccountStatement(payload);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const categories = Array.from(
        new Set(data?.map((item) => item?.date?.split(" ")?.[0])),
      );
      setCategory(categories);
    }
  }, [data]);

  const handleDeleteWithdraw = async (withdraw_id) => {
    const payload = {
      type: "withdrawDelete",
      withdraw_id,
    };
    const res = await deleteWithdraw(payload).unwrap();

    if (res?.success) {
      refetch();
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  return (
    <>
      {complaintId && (
        <Complaint
          setComplaintId={setComplaintId}
          complaintId={complaintId}
          method="withdraw"
        />
      )}
      {image && <ShowImage image={image} setShowImage={setImage} />}
      <div
        style={{
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "8px",
          overflow: "hidden",
          marginTop: "8px",
        }}
      >
        {data?.length > 0 ? (
          <>
            {category?.map((category) => (
              <div key={category}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "sticky",
                    marginBottom: "3px",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      backgroundColor: "#EAEAEA",
                      padding: "4px 10px",
                      fontWeight: "bold",
                      borderRadius: "4px",
                      fontSize: "10px",
                      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {category}
                  </div>
                </div>
                {data
                  ?.filter((item) => item?.date?.split(" ")?.[0] === category)
                  ?.map((data, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #ddd",
                        backgroundColor: "#F8F8F8",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        marginBottom: "3px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          fontSize: "10px",
                          fontWeight: "bold",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "16px",
                            padding: "8px 12px",
                          }}
                        >
                          Withdraw
                        </div>
                        <div
                          style={{
                            padding: "4px 6px",
                            fontSize: "12px",
                            fontWeight: "600",
                            borderRadius: "0px 0px 0px 4px",
                            height: "100%",
                            backgroundColor:
                              data?.status === "APPROVED"
                                ? "#3fae52"
                                : data?.status === "REJECTED"
                                  ? "#e7234e"
                                  : data?.status === "PENDING"
                                    ? "#FFD700"
                                    : "#FFF",
                          }}
                        >
                          {data?.status}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "normal",
                            }}
                          >
                            {data?.remark}
                          </span>
                        </span>
                        {data?.image && (
                          <span
                            onClick={() => setImage(data?.image)}
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "end",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              style={{
                                width: "48px",
                                height: "48px",
                              }}
                              src={data?.image}
                              alt=""
                            />
                          </span>
                        )}
                        <span
                          style={{
                            textAlign: "start",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "end",
                            justifyContent: "end",
                            fontWeight: "bold",
                            flex: 1,
                            flexDirection: "column",
                          }}
                        >
                          <span style={{ paddingRight: "6px" }}>
                            {" "}
                            ₹ {data?.amount}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0px 5px",
                            }}
                          >
                            {data.status === "PENDING" &&
                              data?.reject_request === 0 && (
                                <button
                                  style={{
                                    backgroundColor: "rgb(255 131 46)",
                                    padding: "4px 6px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    borderRadius: "4px 4px 0px 0px",
                                  }}
                                  onClick={() =>
                                    handleDeleteWithdraw(data?.withdraw_id)
                                  }
                                  className="px-2 py-1  text-white   "
                                >
                                  Delete Withdraw
                                </button>
                              )}

                            {data.status === "PENDING" &&
                              data?.reject_request === 1 && (
                                <p
                                  style={{
                                    fontSize: "11px",
                                    margin: "0px",
                                    fontWeight: "500",
                                  }}
                                  className="px-2 py-1  text-black   "
                                >
                                  Withdraw delete request sent.
                                </p>
                              )}
                            {Settings.complaint && (
                              <div
                                style={{
                                  backgroundColor: "rgb(255 131 46)",
                                  padding: "4px 6px",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  borderRadius: "4px 0px 0px 0px",
                                }}
                                onClick={() =>
                                  setComplaintId(data?.referenceNo)
                                }
                                className="px-2 py-1  text-white   "
                              >
                                Report Issue
                              </div>
                            )}
                          </div>
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          padding: "4px 0",
                          textAlign: "center",
                          color: "#555",
                          width: "100%",
                          borderTop: "1px solid #ddd",
                          backgroundColor: "#EAEAEA",
                        }}
                      >
                        {data?.date}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "80px",
            }}
          >
            <p>No transaction yet!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WithdrawReport;
