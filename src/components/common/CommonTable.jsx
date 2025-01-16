/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { useContextProvider } from "../../context/ContextProvider";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon } from "./Icons";

const CommonTable = ({ tabledata }) => {
  console.log(tabledata, "datadatatable");
  const { formatDate, deleteData } = useContextProvider();

  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="py-3 ">
      {/* Table Section */}

      <div className="w-[1100px] xl:w-full px-3">
        <Table responsive="sm" className="mb-0">
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                S.No
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Date & Time
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Symbol
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Position
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Entry Price From
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Entry Price to
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Stop Loss
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Target1
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Target2
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Target3
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Target4
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Status
              </th>
              <th
                style={{
                  textAlign: "start",
                  color: "#6e3b37",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                Comment
              </th>
              {isAdminDashboard && (
                <th
                  style={{
                    textAlign: "start",
                    color: "#6e3b37",
                    fontSize: "12px",
                    fontWeight: "normal",
                  }}
                  className="sticky right-0"
                  scope="col"
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tabledata) && tabledata.length > 0 ? (
              tabledata?.map((item, index) => (
                <tr key={index} className="position-relative">
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {index + 1}
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {formatDate(item.dateTime)}
                    &nbsp;
                    {new Date(item.dateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.symbol}
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.position}
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.entryPriceFrom}
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.entryPriceTo}
                  </td>
                  <td
                    className={` ${
                      item?.stopLossEnabled ? "!bg-secondry_clr" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.stopLoss}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target1 ? "!bg-[#4caf5029]" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.target1}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target2 ? "!bg-[#4caf5029]" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.target2}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target3 ? "!bg-[#4caf5029]" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.target3}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target4 ? "!bg-[#4caf5029]" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.target4}
                  </td>
                  <td
                    className={ `  ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                 <div className="flex items-center">
                 <span
                      className={` px-2 py-1.5 rounded-md w-24 text-xs text-center ${
                        item.completed ? "bg-[#f4433729] text-[#f44337]" : "bg-[#8592a3] text-white"
                      } `}
                    >
                      {" "}
                      {item.completed ? "COMPLETED" : "PROGRESS"}
                    </span>
                 </div>
                  </td>
                  <td
                    className={` ${
                      index === item.length - 1 ? "!border-0" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "10px",
                    }}
                  >
                    {item.comment}
                  </td>
                  {isAdminDashboard && (
                    <td
                      style={{
                        textAlign: "start",
                        color: "#6e3b37",
                        fontSize: "14px",
                      }}
                      className="ps-3 sticky right-0"
                    >
                      <div className="d-flex gap-1 cursor-pointer mx-auto justify-items-center">
                        <Link
                          to={`/admin-dashboard/trade-call-form/${item.id}`}
                          className="w-full px-2 py-2 text-left text-sm text-[#6e3b37] flex"
                        >
                          <EditIcon />
                        </Link>

                        <button
                          onClick={() => {
                            deleteData(item.id);
                          }}
                          className="w-full px-2 py-2 text-left text-sm text-[#6e3b37]"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "start",
                    color: "#6e3b37",
                    fontSize: "14px",
                  }}
                  className="text-center border-0"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CommonTable;
