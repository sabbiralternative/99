import { useDepositStatement } from "../../../hooks/accountStatement";

const DepositTransaction = () => {
  const { data } = useDepositStatement();

  return (
    <div className="col-md-4">
      <div className="account-table">
        <table
          className="table table-bordered account-table-new"
          id="depositTable"
        >
          <thead>
            <tr>
              <th>Transaction No</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody id="depositTableData">
            {data?.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item?.referenceNo}</td>
                  <td>{item?.amount}</td>
                  <td>
                    <span
                      className={`badge  ${
                        item?.status === "PENDING"
                          ? "badge-warning"
                          : item?.status === "REJECTED"
                          ? "badge-danger"
                          : item?.status === "APPROVED"
                          ? "badge-success"
                          : ""
                      }`}
                    >
                      {item?.status}
                    </span>
                  </td>
                  <td>{item?.date}</td>
                  <td>-</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepositTransaction;
