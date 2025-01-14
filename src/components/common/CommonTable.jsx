/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { useContextProvider } from "../../context/ContextProvider";

const CommonTable = () => {
  const {  formatDate,  currentData, } = useContextProvider();

  return (
    <div className="py-2">
      {/* Table Section */}
   
          <div className="w-[1100px] xl:w-full px-3">
            <Table responsive="sm" className="mb-4">
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
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentData) && currentData.length > 0 ? (
                  currentData?.map((item, index) => (
                    <tr key={index} className="">
                      <td
                        className={` ${
                          index === item.length - 1 ? "!border-0" : ""
                        }`}
                        style={{
                          textAlign: "start",
                          color: "#6e3b37",
                          fontSize: "14px",
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
                        }}
                      >
                        {item.entryPriceTo}
                      </td>
                      <td
                        className={` ${
                          index === item.length - 1 ? "!border-0" : ""
                        }`}
                        style={{
                          textAlign: "start",
                          color: "#6e3b37",
                          fontSize: "14px",
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
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
                          fontWeight: "500",
                        }}
                      >
                        {item.comment}
                      </td>
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
