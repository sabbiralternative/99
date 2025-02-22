import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccountStatementMutation } from "../../redux/features/events/events";
import toast from "react-hot-toast";
import SettledBet from "../../components/modals/SettledBet/SettledBet";

const AccountStatement = () => {
  const [marketId, setMarketId] = useState(null);
  const [getAccountStatement, { data }] = useAccountStatementMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit = ({ toDate, fromDate, reportType }) => {
    if (reportType == "none") {
      return toast.error("Select Report Type !");
    }
    const payload = {
      from: fromDate,
      to: toDate,
      type: reportType,
    };
    getAccountStatement(payload);
  };
  return (
    <>
      {marketId && <SettledBet marketId={marketId} setMarketId={setMarketId} />}
      <div>
        <div>
          <div className="report-container">
            <div className="card">
              <div className="card-header">
                <h4 className="mb-0">Account Statement</h4>
              </div>
              <div className="card-body container-fluid container-fluid-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="ng-pristine ng-valid ng-submitted ng-touched"
                >
                  <div className="row row5">
                    <div className="col-6">
                      <div className="form-group mb-0">
                        <div
                          className="mx-datepicker"
                          style={{ width: "auto" }}
                        >
                          <div className="mx-input-wrapper">
                            <input
                              {...register("from", { required: true })}
                              defaultValue={
                                new Date(
                                  new Date().setDate(new Date().getDate() - 7)
                                )
                                  .toISOString()
                                  .split("T")[0]
                              }
                              name="date"
                              type="date"
                              autoComplete="off"
                              placeholder="Select Date"
                              className="mx-input ng-pristine ng-valid ng-touched"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-0">
                        <div
                          className="mx-datepicker"
                          style={{ width: "auto" }}
                        >
                          <div className="mx-input-wrapper">
                            <input
                              {...register("to", { required: true })}
                              defaultValue={
                                new Date().toISOString().split("T")[0]
                              }
                              name="date"
                              type="date"
                              autoComplete="off"
                              placeholder="Select Date"
                              className="mx-input ng-pristine ng-valid ng-touched"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <div className="form-group mb-0">
                        <select
                          {...register("reportType", { required: true })}
                          name="reportType"
                          className="custom-select ng-pristine ng-valid ng-touched"
                        >
                          <option value="ALL">All Reports</option>
                          <option value="DW">Deposit/Withdraw Reports</option>
                          <option value="GR">Game Reports</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row row5 mt-2">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block btn-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
                <div className="row row5 mt-2">
                  <div className="col-6" />
                  <div className="col-6" />
                </div>
                <div>
                  <div className="row row5">
                    <div className="col-12">
                      <div className="table-responsive">
                        <table
                          role="table"
                          aria-busy="false"
                          aria-colcount={6}
                          id="__BVID__36"
                          className="table b-table table-bordered"
                        >
                          <thead role="rowgroup">
                            <tr role="row">
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Sr No
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Date
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Credit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Debit
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Balance
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Sports
                              </th>
                              <th
                                role="columnheader"
                                scope="col"
                                aria-colindex={1}
                                className="text-center"
                              >
                                Remark
                              </th>
                            </tr>
                          </thead>
                          <tbody role="rowgroup">
                            {data?.result?.map((statement, idx) => {
                              return (
                                <tr
                                  key={idx}
                                  role="row"
                                  tabIndex={0}
                                  aria-rowindex={1}
                                >
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span>{idx + 1}</span>
                                  </td>
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span>{statement?.settledTime}</span>
                                  </td>
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span
                                      className={`${
                                        statement?.memberWin > 0
                                          ? "text-success"
                                          : "text-danger"
                                      } `}
                                    >
                                      {" "}
                                      {statement?.memberWin > 0
                                        ? statement?.memberWin
                                        : null}
                                    </span>
                                  </td>
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span className="text-danger">
                                      {" "}
                                      {statement?.memberWin < 0
                                        ? statement?.memberWin
                                        : null}
                                    </span>
                                  </td>
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span
                                      className={` ${
                                        statement?.balance > 0
                                          ? "text-success"
                                          : "text-danger"
                                      }`}
                                    >
                                      {statement?.balance}
                                    </span>
                                  </td>
                                  <td
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span>N/A</span>
                                  </td>
                                  <td
                                    onClick={() =>
                                      setMarketId(statement?.marketId)
                                    }
                                    aria-colindex={1}
                                    role="cell"
                                    className="text-center"
                                  >
                                    <span>
                                      <a>{statement?.narration}</a>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {data?.result?.length > 0 && (
                    <div className="row row5 mt-2">
                      <div className="col-12">
                        <ul
                          role="menubar"
                          aria-disabled="false"
                          aria-label="Pagination"
                          className="pagination mb-0 b-pagination justify-content-center"
                        >
                          <li
                            role="presentation"
                            className="page-item disabled"
                          >
                            <a
                              role="menuitemradio"
                              href="javascript:void(0)"
                              className="page-link"
                            >
                              « Previous
                            </a>
                          </li>
                          <li role="presentation" className="page-item active">
                            <a
                              role="menuitemradio"
                              href="javascript:void(0)"
                              className="page-link"
                            >
                              1
                            </a>
                          </li>
                          <li
                            role="presentation"
                            className="page-item disabled"
                          >
                            <a
                              role="menuitemradio"
                              href="javascript:void(0)"
                              className="page-link"
                            >
                              Next »
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountStatement;
