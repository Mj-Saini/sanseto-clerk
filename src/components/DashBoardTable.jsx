/* eslint-disable no-unused-vars */
import { Button, Dropdown, Pagination, Table } from "react-bootstrap";
import { useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import NewForm from "./NewForm";
import { useEffect, useState } from "react";
import { NextPageIcon, PrevArrowIcon, PrevPageIcon } from "./common/Icons";
import dittoPlan from "../assets/images/png/ditto-plan-img.png";
import { onValue, ref, remove } from "firebase/database";
import { realtimeDb } from "./firebase";
import TradeEntryForm from "./TradeEntryForm";
import CustomToast from "./CustomToast";
import CommonTable from "./common/CommonTable";
import { useContextProvider } from "../context/ContextProvider";

const DashboardTable = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data,
    setData,
    itemsPerPage,
    currentPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,isToastVisible
  } = useContextProvider();
  const [show, setShow] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  const [previousData, setPreviousData] = useState([]);
  const [addBroker, setAddBroker] = useState(false);
  const [activePopupIndex, setActivePopupIndex] = useState(null);
  if (addBroker) {
    document.body.style.overflow = "clip";
  } else {
    document.body.style.overflow = "auto";
  }






  return (
    <div className="">
      <CustomToast message={"Table is Updated."} show={isToastVisible} />
      {addBroker && (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-[20] ">
          <div
            onClick={() => setAddBroker(false)}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50"
          ></div>

          <TradeEntryForm setAddBroker={setAddBroker} />
        </div>
      )}
      {location.pathname.endsWith("/dashboard/user-profile") && (
        <div className="flex justify-center items-center h-screen w-full top-0 left-0 fixed z-20">
          <div
            onClick={() => navigate("/dashboard")}
            className="fixed top-0 left-0 h-full w-full bg-black/50 flex justify-center items-center"
          ></div>
          <div className="z-10">
            <Outlet />
          </div>
        </div>
      )}

      <div className="h-full">
        <div className="flex justify-between items-center mb-4">
          <div className=" py-3 w-full mt-1">
            {/* Table */}
            {/* Action Buttons */}
            <div
              style={{ display: "flex", justifyContent: "space-between" }}
              className="mb-3 bg-white shadow-sm p-3 rounded-lg flex flex-col sm:!flex-row gap-3"
            >
              <div className="d-flex gap-2">
                <button
                  onClick={() => setAddBroker(true)}
                  className="btn_dark shadow-sm max-sm:w-full text-xs px-[14px] uppercase"
                >
                  Add broker
                </button>
                <button
                  onClick={handleRefresh}
                  className="btn_light max-sm:w-full text-xs px-[14px]"
                >
                  Refresh
                </button>
              </div>
              <div>
                <button className="btn_dark shadow-sm w-full text-xs px-[14px] uppercase">
                  Open 1Cliq Window
                </button>
              </div>
            </div>
            {[0, 0].map((item, index) => (
              <div key={index} className="mt-3">
                {index === 0 ? (
                  <h2 className="text-red-500 tracking-wide text-base md:text-lg font-medium  bg-white inline-block p-2 shadow-sm  rounded-md">
                    Progress Table
                  </h2>
                ) : (
                  <h2 className="text-red-500 tracking-wide text-base md:text-lg font-medium  bg-white inline-block p-2 shadow-sm  rounded-md">
                    Completed Table
                  </h2>
                )}

                <div className="  box_shadow_tabel bg-white rounded-lg">
                  <div
                    className={`overflow-auto ${
                      isAdminDashboard ? "pb-[120px]" : ""
                    }`}
                  >
                    <CommonTable />
                  </div>
                  {/* Pagination Controls */}
                  <div className="d-flex flex-col sm:flex-row justify-end items-end sm:items-center gap-3 py-3 px-3">
                    <Dropdown>
                      <span
                        style={{
                          textAlign: "start",
                          color: "#6e3b37",
                          fontSize: "14px",
                        }}
                        className="me-4 "
                      >
                        Items per page:
                      </span>{" "}
                      <Dropdown.Toggle  variant="secondary" id="dropdown-basic">
                        {itemsPerPage}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {[1, 5, 10, 15, 20].map((num) => (
                          <Dropdown.Item
                            key={num}
                           
                            onClick={() => handleItemsPerPageChange(num)}
                          >
                            {num}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>

                    <span
                      style={{
                        textAlign: "start",
                        color: "#6e3b37",
                        fontSize: "14px",
                      }}
                    >
                      {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                        currentPage * itemsPerPage,
                        data.length
                      )} of ${data.length}`}
                    </span>

                    <ul className="d-flex mb-0 gap-3 align-items-center">
                      <li>
                        <button
                          type="button"
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                        >
                          <PrevPageIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <PrevArrowIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className=" rotate-180"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <PrevArrowIcon />
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                        >
                          <NextPageIcon />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
