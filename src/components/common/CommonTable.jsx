/* eslint-disable react/prop-types */

import { Table } from "react-bootstrap";
import { useContextProvider } from "../../context/ContextProvider";
import { DeleteIcon, EditIcon } from "./Icons";
import TradeEntryForm from "../TradeEntryForm";
import { useState } from "react";
import ConfirmationPopup from "../ConfirmationPopup";

const CommonTable = ({ tabledata }) => {
  const { formatDate,addBroker,setAddBroker, deleteData, setUpdateBroker } = useContextProvider();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [actionType, setActionType] = useState(null); // 'update' or 'delete'
  const [currentId, setCurrentId] = useState(null); 


  const UpdateUserData = (id) => {
    setUpdateBroker(id);
    setAddBroker(true);
  };
  // const handleUpdateClick = (id) => {
  //   setCurrentId(id);
  //   setActionType('update');
  //   setIsPopupVisible(true);
  // };

  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setActionType('delete');
    setIsPopupVisible(true);
  };
  

  const handleConfirm = () => {
    if (actionType === 'update') {
      // UpdateUserData(currentId);
    } else if (actionType === 'delete') {
      deleteData(currentId);
    }
    setIsPopupVisible(false); 
  };

  const handleCancel = () => {
    setIsPopupVisible(false); 
  };

  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

 


  return (
    <div className="py-3 ">
      {/* Table Section */}
      {isPopupVisible && (
       <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black/50 flex justify-center items-center">
         <div
          onClick={() => {
            setIsPopupVisible(false);
          }}
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-0"
        ></div>
         <ConfirmationPopup
          actionType={actionType}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
       </div>
      )}
      {addBroker && (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[20] ">
          <div
            onClick={() => setAddBroker(false)}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50"
          ></div>

          <TradeEntryForm setAddBroker={setAddBroker} />
        </div>
      )}

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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
                      
                    }}
                  >
                    {formatDate(item.dateTime)}

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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc",
                      textTransform:"uppercase",

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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc ",
                      textTransform:"uppercase",
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
                    }}
                  >
                    {item.stopLoss}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target1 ? "!bg-light_success_clr" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
                    }}
                  >
                    {item.target1}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target2 ? "!bg-light_success_clr" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
                    }}
                  >
                    {item.target2}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target3 ? "!bg-light_success_clr" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
                    }}
                  >
                    {item.target3}
                  </td>
                  <td
                    className={` ${
                      item?.targetsChecked?.target4 ? "!bg-light_success_clr" : ""
                    }`}
                    style={{
                      textAlign: "start",
                      color: "#6e3b37",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                      padding: "5px 10px",
                      borderRight:"1px solid #ccc"
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
                        <button
                           onClick={() => UpdateUserData(item.id)}
                          className="w-full px-2 pt-2 text-left text-sm text-primary_clr flex"
                        >
                          <EditIcon />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="w-full px-2 pt-2 text-left text-sm text-primary_clr"
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
                  colSpan="14"
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
