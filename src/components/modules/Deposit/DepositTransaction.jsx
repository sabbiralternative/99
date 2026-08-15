import { LanguageKey } from "../../../const";
import { useAccountStatement } from "../../../hooks/accountStatement";
import useLanguage from "../../../hooks/use-language";

const DepositTransaction = () => {
  const { getLanguage } = useLanguage();
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];

  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "DEPOSIT",
    status: "ALL",
  };
  const { data } = useAccountStatement(payload);

  return (
    <div className="col-md-12">
      <div className="account-table">
        <table
          className="table table-bordered account-table-new"
          id="depositTable"
        >
          <thead>
            <tr>
              <th>{getLanguage(LanguageKey.TRANSACTION_NO)}</th>
              <th> {getLanguage(LanguageKey.AMOUNT)}</th>
              <th> {getLanguage(LanguageKey.STATUS)}</th>
              <th> {getLanguage(LanguageKey.DATE)}</th>
              <th> {getLanguage(LanguageKey.REASON)}</th>
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
