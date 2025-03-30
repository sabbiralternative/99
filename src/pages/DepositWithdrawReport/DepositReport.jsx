import { useEffect, useState } from "react";
import { useAccountStatement } from "../../hooks/accountStatement";
import ShowImage from "./ShowImage";

const DepositReport = () => {
  const [image, setImage] = useState("");
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "DEPOSIT",
    status: "ALL",
  };
  const { data } = useAccountStatement(payload);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (data?.length > 0) {
      const categories = Array.from(
        new Set(data?.map((item) => item?.date?.split(" ")?.[0]))
      );
      setCategory(categories);
    }
  }, [data]);

  console.log(data);

  return (
    <>
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
                        gap: "8px",
                        border: "1px solid #ddd",
                        backgroundColor: "#F8F8F8",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                        padding: "8px",
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
                          Deposit
                        </div>
                        <div
                          style={{
                            padding: "8px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            borderRadius: "0px 0px 0px 8px",
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
                          padding: "8px 12px",
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
                          }}
                        >
                          ₹ {data?.amount}
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

export default DepositReport;
