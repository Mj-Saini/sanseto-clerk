/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/png/logo.png";
import logoFull from "../../assets/images/png/full-logo.png";
import { DashBoardIcon, DittoSettings, Settings, ShareIcon } from "./Icons";

const Sidebar = ({ sideMenu, sidebarFixed }) => {
  const location = useLocation();
  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");
  return (
    <div className="top-0 sticky overflow-hidden bg-[#fff] h-full">
      <div className="pt-6 flex justify-between relative z-30">
        <div className="px-3 relative z-50">
          {/* {sidebarFixed ? */}
          <img
            className={` hidden group-hover:lg:hidden lg:flex ${
              sidebarFixed ? "!hidden" : "flex"
            }`}
            width={40}
            height={40}
            src={logo}
            alt="logo"
          />
          <img
            className={`flex lg:hidden group-hover:lg:flex ${
              sidebarFixed ? "lg:!flex" : "lg:hidden"
            }`}
            width={150}
            height={70}
            src={logoFull}
            alt="logo"
          />

          {/* } */}
        </div>
        <span
          onClick={sideMenu}
          className="text-3xl cursor-pointer text-[#C42B1E] block lg:hidden "
        >
          &times;
        </span>
      </div>
      <nav className="mt-6">
        <div className="flex flex-col gap-1">
          {isAdminDashboard ? (
            <>
              <div
                className={` px-3 ${
                  location.pathname === "/admin-dashboard"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={""}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/admin-dashboard"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <DashBoardIcon />
                  </span>{" "}
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    DashBoard
                  </span>
                </Link>
              </div>
              <div
                className={` px-3 ${
                  location.pathname === "/admin-dashboard/pricing"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={"pricing"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/admin-dashboard/pricing"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <ShareIcon />
                  </span>
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    1Cliq Plan
                  </span>
                </Link>
              </div>
              <div
                className={` px-3 ${
                  location.pathname === "/admin-dashboard/detto-settings"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={"detto-settings"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/dashboard/detto-settings"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <DittoSettings />
                  </span>{" "}
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    ditto setting
                  </span>
                </Link>
              </div>

              <div
                className={` px-3 ${
                  location.pathname === "/dashboard/settings"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                <Link
                  onClick={sideMenu}
                  to={"settings"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/dashboard/settings"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <Settings />
                  </span>{" "}
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    favourite setting
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div
                className={` px-3 ${
                  location.pathname === "/dashboard"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={""}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] group-hover: hover:text-[#C42B1E] ${
                    sidebarFixed ? "" : ""
                  }  ${
                    location.pathname === "/dashboard"
                      ? "bg-[#B5392A29] text-[#B5392A] hover:!bg-[#B5392A30]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <DashBoardIcon />
                  </span>
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    {" "}
                    Brokers
                  </span>
                </Link>
              </div>
              <div
                className={` px-3 ${
                  location.pathname === "/dashboard/pricing"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={"pricing"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/dashboard/pricing"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <ShareIcon />
                  </span>
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    1Cliq Plan
                  </span>
                </Link>
              </div>
              <div
                className={` px-3 ${
                  location.pathname === "/dashboard/detto-settings"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                {" "}
                <Link
                  onClick={sideMenu}
                  to={"detto-settings"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/dashboard/detto-settings"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <DittoSettings />
                  </span>{" "}
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    ditto setting
                  </span>
                </Link>
              </div>

              <div
                className={` px-3 ${
                  location.pathname === "/dashboard/settings"
                    ? "relative after:absolute after:bg-[#c42b1e] after:rounded-md after:-right-3 after:top-0 after:h-full after:w-4 z-10"
                    : ""
                }`}
              >
                <Link
                  onClick={sideMenu}
                  to={"settings"}
                  className={`flex items-center py-2.5 text-primary_clr font-medium rounded-lg no-underline whitespace-nowrap capitalize px-2 hover:bg-[#C42B1E09] hover:text-[#C42B1E] ${
                    location.pathname === "/dashboard/settings"
                      ? "bg-secondry_clr hover:!bg-[#C42B1E30] text-[#C42B1E]"
                      : ""
                  }`}
                >
                  <span className="ms-1.5 mr-6">
                    <Settings />
                  </span>{" "}
                  <span
                    className={` duration-200 group-hover:lg:-translate-x-3 ${
                      sidebarFixed ? "-translate-x-3" : "lg:translate-x-3"
                    }`}
                  >
                    favourite setting
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
