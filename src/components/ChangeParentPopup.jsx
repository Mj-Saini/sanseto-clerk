/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "./common/Icons";

const ChangeParentPopup = ({setShow}) => {
  const [selectedOption, setSelectedOption] = useState("No Parent");
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const dropdownRef = useRef(null);

  const options = ["No Parent", "Parent 1", "Parent 2", "Parent 3"];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchQuery(""); 
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative px-3 py-3 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-1/2 xl:w-1/3"
    >
      <h2 className="text-xl font-medium text-primary_clr">Change parent user</h2>

      <div
        className="border p-2 rounded bg-white cursor-pointer flex justify-between items-center relative text-primary_clr mt-3"
      >
        <label
          className="mb-1 text-tertiary_clr absolute left-2 duration-300 top-0 -translate-y-1/2 z-10 text-xs bg-white px-1"
          htmlFor="symbol"
        >
          Select Parent Broker
        </label>
        <input
          type="text"
          id="symbol"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={toggleDropdown}
          placeholder="Search for parent"
          className="w-full bg-transparent border-none outline-none text-primary_clr px-2 py-1"
        />
        <span
          className={`transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          } absolute right-2 top-1/2 transform -translate-y-1/2`}
        >
          <DropdownIcon />
        </span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-[93%] bg-white border rounded shadow mt-1 left-1/2 -translate-x-1/2 top-[60%] z-10 p-0">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-hover_secondry_clr text-primary_clr cursor-pointer"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No matches found</li>
          )}
        </ul>
      )}

      <div className="flex justify-end gap-3 mt-3">
        <button  onClick={() => setShow(false)} className="btn_light uppercase !text-sm">no</button>
        <button className="btn_dark uppercase text-sm">
          yes, change broker
        </button>
      </div>
    </div>
  );
};

export default ChangeParentPopup;
