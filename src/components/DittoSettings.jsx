/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import ChangeParentPopup from "./ChangeParentPopup";
import { NextPageIcon, PrevArrowIcon, PrevPageIcon } from "./common/Icons";
import CommonTable from "./common/CommonTable";
import { useContextProvider } from "../context/ContextProvider";
import AttechChildPopup from "./AttechChildPopup";

const DittoSettings = () => {
  const {
    data,
    itemsPerPage,
    currentPage,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
  } = useContextProvider();
  const [show, setShow] = useState(false);
  const [attachChildPopup, setAttachChildPopup] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <div className="py-2">
      {show && (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-50">
          <div
            onClick={() => setShow(false)}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50 "
          ></div>

          <ChangeParentPopup setShow={setShow} show={show} />
        </div>
      )}
      {attachChildPopup && (
        <div className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-50">
          <div
            onClick={() => setAttachChildPopup(false)}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50 "
          ></div>

          <AttechChildPopup
            setShow={setAttachChildPopup}
            show={attachChildPopup}
          />
        </div>
      )}
      {/* Parent Broker Section */}

      <div className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-xs rounded-lg p-3 mb-2 mt-3">
        {/* Parent Broker Section */}
        <div className="flex flex-col lg:items-center lg:flex-row gap-2 w-full lg:w-4/5 ">
          <div className="flex flex-col mb-1 sm:mb-0 text-base text-primary_clr">
            <span className="mr-2 whitespace-nowrap font-extrabold">
              Parent Broker:
            </span>
            <span className="font-normal">No Parent</span>
          </div>{" "}
          <div className="flex flex-wrap lg:flex-nowrap w-full items-center">
            <div className="w-[135px] p-[6px]">
              <button
                className=" text-[#C6B6B4] border whitespace-nowrap border-[#E9E3E2] px-2 py-2 rounded cursor-not-allowed w-full"
                disabled
              >
                Max Allowed...
              </button>
            </div>
            <div className="w-[135px] p-[6px]">
              <button
                className=" text-[#C6B6B4] border whitespace-nowrap border-[#E9E3E2] px-2 py-2 rounded cursor-not-allowed w-full"
                disabled
              >
                Max multiple...
              </button>
            </div>
            {/* Functional Buttons */}
            <div className=" p-[6px]">
              <button
                onClick={() => setShow(true)}
                className="bg-[#F6E7E5] hover:bg-[#F1DAD6] uppercase text-tertiary_clr  font-bold whitespace-nowrap border-red-400 px-4 py-[10px] rounded  w-full text-sm"
              >
                Change Parent
              </button>
            </div>
            <div className=" p-[6px]">
              <button
                onClick={() => setAttachChildPopup(true)}
                className="bg-[#F6E7E5] hover:bg-[#F1DAD6] uppercase text-tertiary_clr text-sm  font-bold whitespace-nowrap border-red-400 px-4 py-[10px] rounded  w-full"
              >
                Attach Child
              </button>
            </div>
            <div className="w-full sm:w-1/2 p-[6px] block lg:hidden">
              <button
                onClick={handleRefresh}
                className="bg-white text-tertiary_clr uppercase font-bold border border-[c42b1e] px-4 py-2 rounded hover:bg-[#F1DAD6] w-full"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        <div className="space-x-2 hidden lg:flex">
          <button
            onClick={handleRefresh}
            className="bg-white text-tertiary_clr uppercase font-bold  font-sm border-1 !border-tertiary_clr px-4 py-2 rounded hover:bg-[#F1DAD6]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="  shadow-sm pe-3 bg-white rounded-lg">
        <div
          className={`overflow-auto ${isAdminDashboard ? "pb-[120px]" : ""}`}
        >
          <CommonTable />
        </div>
        {/* Pagination Controls */}
        <div className="d-flex flex-col sm:flex-row justify-end items-end sm:items-center gap-3 mt-3 pb-3">
          <Dropdown>
            <span
              style={{
                textAlign: "start",
                color: "#6e3b37",
                fontSize: "14px",
              }}
              className="me-4"
            >
              Items per page:
            </span>{" "}
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
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
                className="!-scale-110"
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
  );
};

export default DittoSettings;
