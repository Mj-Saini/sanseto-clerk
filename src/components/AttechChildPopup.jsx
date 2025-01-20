import { useState, useRef, useEffect } from "react";
import { DropdownIcon } from "./common/Icons";

const AttechChildPopup = ({setShow}) => {
  const [parentInput, setParentInput] = useState(""); 
  const [filteredParentOptions, setFilteredParentOptions] = useState([]); 
  const [isParentDropdownOpen, setIsParentDropdownOpen] = useState(false);

  const [childInput, setChildInput] = useState("");
  const [filteredChildOptions, setFilteredChildOptions] = useState([]); 
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);

  const parentDropdownRef = useRef(null);
  const childDropdownRef = useRef(null);

  const parentOptions = ["No Parent", "Parent 1", "Parent 2", "Parent 3"];
  const childOptions = ["No Child", "Child 1", "Child 2", "Child 3"];

  // Handle Parent Input Change
  const handleParentInputChange = (e) => {
    const value = e.target.value;
    setParentInput(value);
    setFilteredParentOptions(
      parentOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsParentDropdownOpen(true); // Keep dropdown open when typing
  };

  // Handle Child Input Change
  const handleChildInputChange = (e) => {
    const value = e.target.value;
    setChildInput(value);
    setFilteredChildOptions(
      childOptions.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsChildDropdownOpen(true); // Keep dropdown open when typing
  };

  // Handle Parent Option Select
  const handleParentSelect = (option) => {
    setParentInput(option);
    setIsParentDropdownOpen(false);
  };

  // Handle Child Option Select
  const handleChildSelect = (option) => {
    setChildInput(option);
    setIsChildDropdownOpen(false);
  };

  // Handle clicks outside both dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        parentDropdownRef.current &&
        !parentDropdownRef.current.contains(event.target)
      ) {
        setIsParentDropdownOpen(false);
      }
      if (
        childDropdownRef.current &&
        !childDropdownRef.current.contains(event.target)
      ) {
        setIsChildDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative px-3 py-3 bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-1/2 xl:w-1/3">
      <h2 className="text-xl font-medium text-primary_clr">
      Attach child
      </h2>

      {/* Parent Dropdown */}
      <div
        ref={parentDropdownRef}
        className={`relative border px-2 rounded bg-white flex flex-col items-start mt-3 focus-within:border-tertiary_clr`}
      >
        <label
          className={`absolute top-0 left-2 text-xs text-tertiary_clr bg-white px-1 z-10 transform -translate-y-1/2`}
          htmlFor="parentDropdownInput"
        >
          Select Child Broker
        </label>
        <input
          id="parentDropdownInput"
          type="text"
          value={parentInput}
          onChange={handleParentInputChange}
          onClick={() => setIsParentDropdownOpen(true)}
          placeholder="Select Child Broker"
          className="w-full px-1 py-1 border-none outline-none bg-transparent cursor-pointer text-primary_clr  placeholder:text-xs"
        />
        <span
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform ${
            isParentDropdownOpen ? "rotate-90" : "-rotate-90"
          }`}
        >
          <DropdownIcon />
        </span>
        {isParentDropdownOpen && (
          <ul className="absolute w-full bg-white border rounded shadow mt-1 left-0 top-full z-10 p-0">
            {(filteredParentOptions.length ? filteredParentOptions : parentOptions).map(
              (option, index) => (
                <li
                  key={index}
                  onClick={() => handleParentSelect(option)}
                  className="px-4 py-2 hover:bg-hover_secondry_clr text-primary_clr cursor-pointer"
                >
                  {option}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      {/* Child Dropdown */}
      <div
        ref={childDropdownRef}
        className="relative border border-primary_clr px-2 rounded bg-white flex flex-col items-start mt-3 focus-within:border-tertiary_clr"
      >
        <label
          className={`absolute top-0 left-2 text-xs text-tertiary_clr bg-white px-1 z-1 transform -translate-y-1/2`}
          htmlFor="childDropdownInput"
        >
          Multiplier
        </label>
        <input
          id="childDropdownInput"
          type="text"
          value={childInput}
          onChange={handleChildInputChange}
          onClick={() => setIsChildDropdownOpen(true)}
           placeholder=" Multiplier"
          className="w-full px-1 py-1 border-none outline-none bg-transparent cursor-pointer text-primary_clr placeholder:text-xs"
        />
        <span
          className={`absolute top-1/2 right-2 transform -translate-y-1/2 transition-transform ${
            isChildDropdownOpen ? "rotate-90" : "-rotate-90"
          }`}
        >
          <DropdownIcon />
        </span>
        {isChildDropdownOpen && (
          <ul className="absolute w-full bg-white border rounded shadow mt-1 left-0 top-full z-10 p-0">
            {(filteredChildOptions.length ? filteredChildOptions : childOptions).map(
              (option, index) => (
                <li
                  key={index}
                  onClick={() => handleChildSelect(option)}
                  className="px-4 py-2 hover:bg-hover_secondry_clr text-primary_clr cursor-pointer"
                >
                  {option}
                </li>
              )
            )}
          </ul>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-3">
        <button  onClick={() => setShow(false)} className="btn_light uppercase !text-sm w-full">cancel</button>
        <button className="btn_dark uppercase text-sm w-full">
          Attach Child
        </button>
      </div>
    </div>
  );
};

export default AttechChildPopup;
