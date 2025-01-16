/* eslint-disable no-unused-vars */

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/common/Sidebar";
import {
  BillingIcon,
  HeartIcon,
  MenuIcon,
  RedArrowIcon,
  SignOutIcon,
  UserIcon,
  UserProfileIcon,
} from "../../components/common/Icons";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

const DashBoard = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, isLoaded } = useAuth();
  const [openSideBar, setOpenSideBar] = useState(false);
  const { user } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [sidebarFixed, setSidebarFixed] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 1024) {
      setSidebarFixed(false);
    }
  }, [windowWidth]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      alert("Logged out successfully");
      navigate("/sign-in");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const updatesRef = ref(db, "trades");

    const unsubscribe = onValue(updatesRef, (snapshot) => {
      if (snapshot.exists()) {
        const updates = snapshot.val();
        const count = Object.keys(updates).length;
        setUpdateCount(count);
      }
    });

    return () => unsubscribe();
  }, []);

  const isAdminDashboard = location.pathname.startsWith("/admin-dashboard");

  return (
    <>
      <div className="bg-[#F5F5F9] w-full flex justify-end px-3 lg:pe-3 relative min-h-screen">
        <div
          className={` w-[260px]  group lg:hover:w-1/5 duration-300 bg-white fixed left-0 top-0 h-full z-20 
        ${openSideBar ? "left-0" : "max-lg:-left-full"}
        ${sidebarFixed ? "lg:w-1/5 " : "lg:w-[84px] "}
          `}
        >
          <div
            onClick={toggleSideBar}
            className={`fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50 lg:hidden ${
              openSideBar ? "left-0" : "max-lg:-left-full "
            }`}
          ></div>
          <span
            onClick={() => setSidebarFixed(!sidebarFixed)}
            className={`w-[36px] h-[36px] rounded-full bg-[#F5F5F9] justify-center items-center absolute top-6 -right-3 lg:group-hover:flex duration-300 z-10 ${
              sidebarFixed ? "flex" : "hidden"
            }`}
          >
            <RedArrowIcon sidebarFixed={sidebarFixed} />
          </span>
          <span
            onClick={toggleSideBar}
            className={`w-[36px] h-[36px] rounded-full bg-[#F5F5F9] flex justify-center items-center absolute top-6 -right-3 duration-300 z-10 lg:hidden`}
          >
            <RedArrowIcon />
          </span>
          <Sidebar
            className="z-30 relative "
            sidebarFixed={sidebarFixed}
            sideMenu={toggleSideBar}
          />
        </div>
        {/* Main Content */}
        <div
          className={` pb-3 duration-300 flex flex-col justify-between ${
            sidebarFixed ? "w-full lg:w-4/5 ps-2" : "w-full lg:w-[calc(100%-84px)]"
          }`}
        >
          <div>
            
              <div className="flex justify-between rounded-lg backdrop_blur sticky top-3 bg-white/90 shadow-sm lg:justify-end items-center p-2 !z-10">
                <div
                  onClick={toggleSideBar}
                  className="cursor-pointer lg:hidden"
                >
                  <MenuIcon />
                </div>
                <div className="relative p-2">
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    {isAdminDashboard ? (
                      <button
                        className="block w-full text-left px-4 py-1 text-lg btn_light"
                        onClick={() => {
                          localStorage.clear();
                          navigate("/admin-login");
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={toggleDropdown}
                          className="block w-full text-center whitespace-nowrap ps-2 sm:ps-4 py-1.5 text-base text-gray-700 "
                        >
                          {isLoaded && user ? (
                            <img
                              width={40}
                              height={40}
                              className="rounded-full"
                              src={user.imageUrl}
                              alt="use-profile"
                            />
                          ) : (
                            <UserProfileIcon />
                          )}
                        </button>
                      </>
                    )}
                  </div>
                  {/* {isDropdownOpen && ( */}
                  <div
                    className={`absolute right-0 mt-6 top-14  bg-white  shadow-md rounded-lg  duration-300 overflow-hidden ${
                      isDropdownOpen ? "w-56" : "w-[1px] h-[1px]"
                    }`}
                  >
                    <ul className={`p-0 mb-0`}>
                      {isAdminDashboard ? (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-[#6b3e37] hover:bg-gray-100"
                          onClick={() => {
                            localStorage.clear();
                            navigate("/admin-login");
                          }}
                        >
                          Admin Logout
                        </button>
                      ) : (
                        <>
                          <button className="w-full text-center whitespace-nowrap ps-3  py-2 pe-4 text-base uppercase text-[#6b3e37] flex items-center font-medium gap-2 border-b ">
                            {isLoaded && user ? (
                              <img
                                width={40}
                                height={40}
                                className="rounded-full"
                                src={user.imageUrl}
                                alt="use-profile"
                              />
                            ) : (
                              <UserProfileIcon />
                            )}
                            {isLoaded && user ? user.firstName : "thomas"}
                          </button>
                          <Link
                            onClick={toggleDropdown}
                            to={`user-profile`}
                            className="flex items-center gap-3 w-full text-left ps-3 pe-4 py-[12px] text-sm text-[#6b3e37] hover:bg-gray-100 no-underline"
                          >
                            <UserIcon /> Profile
                          </Link>
                          <Link
                            onClick={toggleDropdown}
                            to={`billing`}
                            className="flex items-center gap-3 w-full text-left ps-3 pe-4 py-[12px] text-sm text-[#6b3e37] hover:bg-gray-100 no-underline"
                          >
                            <BillingIcon /> Billings
                          </Link>
                          <button
                            className="flex items-center gap-3 w-full text-left ps-3 pe-4 py-[12px] text-sm text-[#6b3e37] hover:bg-gray-100 no-underline border-t"
                            onClick={handleLogout}
                          >
                            <SignOutIcon /> Logout
                          </button>
                        </>
                      )}
                    </ul>
                  </div>
                  {/* )} */}
                </div>
              </div>
            
            <div className="flex flex-col justify-between">
              <Outlet />
            </div>
          </div>
          <footer>
            <div className="d-flex align-center justify-space-between">
              <span className="d-flex gap-1 align-center text-[#6e3b37] pt-3">
                {" "}
                © {currentYear} Made With
                <span>
                  <HeartIcon />
                </span>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
