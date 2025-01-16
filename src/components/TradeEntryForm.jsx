/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db, realtimeDb } from "./firebase";
import {
  push,
  set,
  ref,
  onValue,
  update,
  get,
  remove,
} from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";
import "../index.css";
import { DeleteIcon } from "./common/Icons";

const TradeEntryForm = ({ showToast }) => {
  const { setAddBroker } = useContextProvider();
  const [isFocused, setIsFocused] = useState({
    symbol: false,
    dataTime: false,
    position: false,
    entryPriceFrom: false,
    entryPriceTo: false,
    stopLoss: false,
    comment: false,
    targetsChecked: {
      target1: false,
      target2: false,
      target3: false,
      target4: false,
    },
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [filterSymbol, setFilterSymbol] = useState([]);
  const [finalSymbol, setFinalSymbol] = useState("");

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    symbol: "",
    dateTime: "",
    entryPriceFrom: "",
    entryPriceTo: "",
    stopLoss: "",
    target1: "",
    target2: "",
    target3: "",
    target4: "",
    comment: "",
    position: "",
    stopLossEnabled: false,
    completed: false,
    targetsChecked: {
      target1: false,
      target2: false,
      target3: false,
      target4: false,
    },
  });
  useEffect(() => {
    const fetchData = () => {
      const tradesRef = ref(realtimeDb, "trades");

      onValue(
        tradesRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const tradeData = Object.entries(snapshot.val()).map(
              ([id, value]) => ({
                id,
                ...value,
              })
            );
            setData(tradeData);
            if (id) {
              const matchedData = tradeData.find((trade) => trade.id === id);
              if (matchedData) {
                const formattedDateTime = matchedData.dateTime
                  ? new Date(matchedData.dateTime).toISOString().slice(0, 16)
                  : ""; // Format to 'YYYY-MM-DDTHH:mm'
                setFormData({
                  ...matchedData,
                  dateTime: formattedDateTime,
                });
              }
              showToast();
            }
          } else {
            console.log("No data available");
            setData([]);
          }
        },
        (error) => {
          console.error("Error fetching data from Realtime Database: ", error);
        }
      );
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const symbolsRef = ref(realtimeDb, "symbols");

      onValue(
        symbolsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();

            const symbolsData = Object.keys(data).map((item) => ({
              id: item,
              value: data[item].name,
            }));

            console.log(symbolsData, "symbolsData");
            setSymbols(symbolsData);
          } else {
            console.log("No data available");
            setData([]);
          }
        },
        (error) => {
          console.error("Error fetching data from Realtime Database: ", error);
        }
      );
    };

    fetchSymbols();
  }, [db]);

  const handleCheckboxChange = (target, isChecked) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      targetsChecked: {
        ...prevFormData.targetsChecked,
        [target]: isChecked,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox and text input
    }));
    if (name === "symbol") {
      if (value.length > 0) {
        setShowTable(true);
      } else setShowTable(false);
      const allSymbols = symbols.filter((items) =>
        items.value.includes(e.target.value)
      );
      if (allSymbols.length > 0) {
        setFilterSymbol(allSymbols);
        console.log(allSymbols, "all symbols");
      } else {
        setFilterSymbol([]);
      }
    }
  };

  const updateDataInRealtimeDB = async (data) => {
    try {
      const tradeRef = ref(realtimeDb, `trades/${id}`);
      await update(tradeRef, data);
      console.log("Data updated in Realtime Database for ID:", id);
    } catch (e) {
      console.error("Error updating data in Realtime Database: ", e);
    }
  };

  const saveDataToRealtimeDB = async (data) => {
    try {
      const newTradeRef = push(ref(realtimeDb, "trades"));
      await set(newTradeRef, data);
      console.log("Data saved to Realtime Database with key:", newTradeRef.key);
    } catch (e) {
      console.error("Error saving data to Realtime Database: ", e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.dateTime) {
      const currentDateTime = new Date();
      const formattedDateTime = currentDateTime.toISOString();
      setFormData((prev) => ({
        ...prev,
        dateTime: formattedDateTime,
      }));
      console.log(
        "Formatted DateTime with Timezone:",
        currentDateTime.toLocaleString()
      );
    }

    const dataToSave = {
      ...formData,
      dateTime: formData.dateTime || new Date().toISOString(),
    };

    if (id) {
      await updateDataInRealtimeDB(dataToSave);
      setAddBroker(false);
      navigate(`/admin-dashboard`);
    } else {
      await saveDataToRealtimeDB(dataToSave);
      setAddBroker(false);
    }
    setFormData({
      symbol: "XAUUSD",
      dateTime: "",
      entryPriceFrom: "",
      entryPriceTo: "",
      stopLoss: "",
      target1: "",
      target2: "",
      target3: "",
      target4: "",
      comment: "",
      position: "",
      stopLossEnabled: false,
      completed: false,
      targetsChecked: {
        target1: "",
        target2: "",
        target3: "",
        target4: "",
      },
    });
  };

  const handleFocus = (field) => {
    setIsFocused((prevState) => {
      const resetFields = Object.keys(prevState).reduce((acc, key) => {
        if (key !== "targetsChecked") {
          acc[key] = formData[key] ? prevState[key] : false;
        } else {
          acc[key] = prevState[key];
        }
        return acc;
      }, {});

      const updatedTargetsChecked = Object.keys(
        prevState.targetsChecked
      ).reduce((acc, key) => {
        acc[key] = key === field ? true : false;
        return acc;
      }, {});

      return {
        ...resetFields,
        [field]: true,
        targetsChecked: updatedTargetsChecked,
      };
    });
  };

  const removeSymbol = async (symbolId) => {
    try {
      const symbolRef = ref(realtimeDb, `symbols/${symbolId}`);
      const revomeData = await remove(symbolRef);
      console.log(revomeData, "removedata");
    } catch (e) {
      console.error("Error deleting symbol: ", e);
    }
  };

  const handleAddSymbol = async () => {
    if (
      formData.symbol.trim() &&
      !symbols.some((symbol) => symbol.name === formData.symbol.trim())
    ) {
      const newSymbol = formData.symbol.trim();
      try {
        // Add to Realtime Database
        const symbolsRef = ref(realtimeDb, "symbols");
        const newSymbolRef = push(symbolsRef);
        await set(newSymbolRef, { name: newSymbol });
        setFormData({ symbol: "" });
        setFilterSymbol([]);
      } catch (e) {
        console.error("Error adding symbol: ", e);
      }
    }
  };

  return (
    <>
      <div
        onClick={() => {

          window.history.back();
        }}
        className="fixed top-0 left-0 h-screen w-full flex justify-center bg-black/60 items-center z-40"
      ></div>
      <div
        id="TradeForm"
        className="w-full md:w-1/2 mx-auto p-[20px] bg-white shadow-lg rounded-lg z-[50] relative overflow-auto h-[600px] "
      >
        <div
          onClick={() =>{ handleFocus(false); }}
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-0"
        ></div>
        <h2 className="font-bold text-lg lg:text-xl text-black mb-6 z-10 relative">
          Add Broker
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.symbol
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                  : " top-1/2 -translate-y-1/2 opacity-0"
              }`}
              htmlFor="symbol"
            >
              Choose Symbol
            </label>
            <div className="relative">
              {showTable && (
                <div className="absolute top-full left-0 w-full h-[200px] bg-white z-20 mt-1 rounded-lg !border-2 !border-[#C42B1E] overflow-auto p-2">
                  {filterSymbol.length === 0 && (
                    <div className="w-full mt-3">
                      <div className="flex items-center justify-between bg-secondry_clr gap-4 rounded px-3 py-1 text-[#C42B1E] relative group h-10 uppercase w-full">
                        <span>{formData.symbol}</span>
                        <div className="hidden justify-start p-0 group-hover:flex">
                          <span
                            onClick={() => handleAddSymbol()}
                            className="ml-2 text-[#6b3e37] flex items-center"
                          >
                            <span className="text-3xl cursor-pointer"> +</span>
                            
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {filterSymbol.map((symbol) => (
                    <div key={symbol.id} className="w-full mt-3">
                      <div
                        onClick={() => {
                          setFinalSymbol(symbol.value);
                          setShowTable(false);
                          setFormData({ ...formData, symbol: symbol.value });
                          console.log(formData, "formdata");
                        }}
                        className="flex items-center justify-between bg-secondry_clr gap-4 rounded px-3 py-1 text-[#C42B1E] relative group h-10 uppercase w-full"
                      >
                        <span>{symbol.value}</span>
                        <div className="hidden justify-start p-0 group-hover:flex">
                          <span
                            onClick={() => removeSymbol(symbol.id)}
                            className="ml-2 text-[#6b3e37] flex items-center cursor-pointer"
                          >
                            
                            <DeleteIcon/>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <input
                id="symbol"
                name="symbol"
                onFocus={() => handleFocus("symbol")}
                value={formData.symbol}
                onChange={handleChange}
                type="text"
                placeholder="enter symbol"
                className="w-full p-2 py-3 border-2 border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none  focus:border-[#C42B1E]"
              />
            </div>
          </div>
          <div className="mb-4 relative z-1">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.dateTime
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                  : " top-1/2 -translate-y-1/2 opacity-0"
              }`}
            >
              Date & Time
            </label>
            <input
              // required
              type="datetime-local"
              id="dateTime"
              name="dateTime"
              onFocus={() => handleFocus("dateTime")}
              value={formData.dateTime}
              onChange={handleChange}
              className="w-full p-2 py-3 border-2 border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none  focus:border-[#C42B1E]"
            />
          </div>
          <div className="mb-4 relative z-1">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.position
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                  : " top-1/2 -translate-y-1/2 opacity-0"
              } `}
              htmlFor="positon"
            >
              Position
            </label>
            <input
              required
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              onFocus={() => handleFocus("position")}
              placeholder="position"
              className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none "
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                  isFocused.entryPriceFrom
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                    : " top-1/2 -translate-y-1/2 opacity-0"
                }`}
                htmlFor="entryPriceFrom"
              >
                Entry Price From
              </label>
              <input
                required
                type="text"
                id="entryPriceFrom"
                name="entryPriceFrom"
                value={formData.entryPriceFrom}
                onChange={handleChange}
                onFocus={() => handleFocus("entryPriceFrom")}
                placeholder="price"
                className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none "
              />
            </div>
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                  isFocused.entryPriceTo
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                    : " top-1/2 -translate-y-1/2 opacity-0"
                }`}
                htmlFor="entryPriceTo"
              >
                Entry Price To
              </label>
              <input
                required
                type="text"
                id="entryPriceTo"
                name="entryPriceTo"
                value={formData.entryPriceTo}
                onFocus={() => handleFocus("entryPriceTo")}
                onChange={handleChange}
                placeholder="price"
                className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37] absolute left-2 z-10 duration-300 ${
                  isFocused.stopLoss
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                    : " top-1/2 -translate-y-1/2 opacity-0"
                }`}
                htmlFor="stopLoss"
              >
                Stop Loss
              </label>
              <div className="d-flex align-items-center gap-2 relative !border !border-[#C42B1E1F] text-[#97514b] formInput rounded-md">
                <input
                  required
                  type="text"
                  id="stopLoss"
                  name="stopLoss"
                  value={formData.stopLoss}
                  onChange={handleChange}
                  onFocus={() => handleFocus("stopLoss")}
                  placeholder="stop loss"
                  className="w-full p-2 border-0 text-[#97514b] formInput rounded-md outline-none pe-2"
                />{" "}
                <input
                  className="w-[14px] h-[14px] absolute top-1/2 -translate-y-1/2 right-3"
                  type="checkbox"
                  name="stopLossEnabled"
                  checked={formData.stopLossEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-end relative z-10">
              <label
                for="completed"
                className="w-full flex items-center text-black/50 bg-[#C42B1E0A] px-3 rounded-md gap-2 cursor-default"
              >
                <input
                  className="w-[14px] h-[14px]"
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                Completed
              </label>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-4">
            {[1, 2, 3, 4].map((target) => (
              <div key={target} className="relative">
                <label
                  className={`mb-1 text-[#6e3b37] absolute left-2 z-10 duration-300 ${
                    isFocused.targetsChecked[`target${target}`]
                      ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5 "
                      : " top-1/2 -translate-y-1/2 opacity-0"
                  }`}
                  htmlFor={`target${target}`}
                >
                  Target {target}
                </label>
                <div className="d-flex align-items-center gap-2 !border !border-[#C42B1E1F] text-[#97514b] formInput rounded-md target_box1 relative">
                  <input
                    required={target === 1}
                    type="text"
                    id={`target${target}`}
                    name={`target${target}`}
                    value={formData[`target${target}`]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(`target${target}`)}
                    placeholder="type here"
                    className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none pe-2"
                  />
                  <input
                    className="w-[14px] h-[14px] absolute top-1/2 -translate-y-1/2 right-3"
                    type="checkbox"
                    // checked={!!formData.targetsChecked[target${target}]}
                    onChange={(e) =>
                      handleCheckboxChange(`target${target}`, e.target.checked)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mb-4 relative">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.comment
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100 px-1.5"
                  : " top-0 translate-y-1/2 opacity-0"
              }`}
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onFocus={() => handleFocus("comment")}
              onChange={handleChange}
              placeholder="comments"
              rows="4"
              className="w-full h-[80px] p-2 !border !border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end mt-4 relative z-10">
            <button
              onClick={() => window.history.back()}
              type="button"
              className="btn_light text-[#c42b1e] py-2 px-4 rounded-md  transition duration-300"
            >
              cencel
            </button>
            <button
              type="submit"
              className="btn_dark text-white py-2 px-4 rounded-md  transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TradeEntryForm;
