/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { DatePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import useGetReferralStatement from "../../hooks/useGetReferralStatement";

const ReferralStatement = () => {
  const [fetchData, setFetchData] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const [endDate, setEndDate] = useState(new Date());
  const { data } = useGetReferralStatement(
    startDate,
    endDate,
    fetchData,
    setFetchData
  );
  return (
    <div _ngcontent-htq-c97 className="main-content">
      <div className="center-container" style={{ width: "100%" }}>
        <div className="card">
          {" "}
          <div className="card-header">
            <h4 className="card-title">Referral Statement</h4>
          </div>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    marginBottom: "2px",
                    marginLeft: "4px",
                    fontSize: "12px",
                  }}
                >
                  From Date
                </p>
                <DatePicker
                  onChange={(date) => setStartDate(date)}
                  defaultValue={startDate}
                />
              </div>
              <div>
                <p
                  style={{
                    marginBottom: "2px",
                    marginLeft: "4px",
                    fontSize: "12px",
                  }}
                >
                  To Date
                </p>
                <DatePicker
                  onChange={(date) => setEndDate(date)}
                  defaultValue={endDate}
                />
              </div>

              <button
                onClick={() => setFetchData(true)}
                style={{
                  backgroundColor: "var(--theme1-bg)",
                  border: "none",
                  padding: "10px 20px",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "pointer",
                  height: "34px",
                  marginTop: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Submit
              </button>
            </div>
            {data && (
              <div style={{ marginTop: "20px" }}>
                <div
                  style={{
                    backgroundColor: "rgb(204 204 204)",
                    borderRadius: "10px",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <ul>
                      <li
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          fontSize: "11px",
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            flex: 1,
                          }}
                        >
                          Total Clients <span>{data?.total_clients}</span>
                        </p>
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            flex: 1,
                          }}
                        >
                          Total Deposit <span>{data?.total_deposit}</span>
                        </p>
                        <p
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "end",
                            width: "100%",
                            flex: 1,
                          }}
                        >
                          <span>Total Withdraw</span>
                          <span>{data?.total_withdraw}</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStatement;
