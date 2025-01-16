/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { useContextProvider } from "../../context/ContextProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const CommonTable = ({ tabledata }) => {
  const { formatDate, deleteData } = useContextProvider();

  const [activePopupIndex, setActivePopupIndex] = useState(null);
  const togglePopup = (index) => {
    setActivePopupIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="py-3 ">
      {/* Table Section */}

      <div className="w-[1100px] h-[325px] xl:w-full px-3">
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
                      className="ps-3"
                    >
                      <div
                        onClick={() => togglePopup(index)}
                        className="d-flex flex-col gap-1 cursor-pointer mx-auto justify-items-center"
                        style={{ width: "10px" }}
                      >
                        <span
                          style={{
                            display: "block",
                            width: "4px",
                            height: "4px",
                            borderRadius: "20px",
                            background: "black",
                          }}
                        ></span>
                        <span
                          style={{
                            display: "block",
                            width: "4px",
                            height: "4px",
                            borderRadius: "20px",
                            background: "black",
                          }}
                        ></span>
                        <span
                          style={{
                            display: "block",
                            width: "4px",
                            height: "4px",
                            borderRadius: "20px",
                            background: "black",
                          }}
                        ></span>
                      </div>
                      {activePopupIndex === index && (
                        <div className="absolute top-10 right-5 bg-[#fff] shadow-lg rounded w-28 z-40 overflow-hidden">
                          <Link
                            to={`/admin-dashboard/trade-call-form/${item.id}`}
                            className="w-full px-3 py-2 text-left text-sm text-[#6e3b37] hover:text-[#c42b1e] hover:bg-secondry_clr flex"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => {
                              deleteData(item.id);
                              togglePopup(index);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-[#6e3b37] hover:text-[#c42b1e] hover:bg-secondry_clr"
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
