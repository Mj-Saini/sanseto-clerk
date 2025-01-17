import { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "./common/Icons";

const ChangeParentPopup = () => {
  const [selectedOption, setSelectedOption] = useState("No Parent"); // Default selected option
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state
  const dropdownRef = useRef(null);

  const options = ["No Parent", "Parent 1", "Parent 2", "Parent 3"]; // Options list

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
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
      className="relative px-3 py-3 bg-white shadow-lg rounded-lg w-1/3"
    >
      <div>
        <h2 className="text-xl font-medium text-primary_clr">
          Change parent user
        </h2>
      </div>
      <div
        onClick={toggleDropdown}
        className="border p-2 rounded bg-white cursor-pointer flex justify-between items-center relative text-primary_clr"
      >
        <span>{selectedOption}</span>
        <span
          className={`transition-transform ${
            isOpen ? "rotate-90" : "-rotate-90"
          }`}
        >
          <DropdownIcon />
        </span>
        {/* Dropdown Options */}
        {isOpen && (
          <ul className="absolute w-full bg-white border rounded shadow mt-1 left-0 top-full z-10 p-0">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-hover_secondry_clr text-primary_clr cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end gap-3 mt-3">
        <button className="btn_light uppercase !text-sm">no</button>
        <button className="btn_dark uppercase text-sm">
          yes,change broker
        </button>
      </div>
    </div>
  );
};

export default ChangeParentPopup;
