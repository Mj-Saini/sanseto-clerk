/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { db, realtimeDb } from "./firebase";
import { push, set, ref, onValue, update, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Select from "react-select";
import { useContextProvider } from "../context/ContextProvider";
import "../index.css";
import { Placeholder } from 'react-bootstrap';

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
                // Format dateTime if it's available
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
      try {
        const symbolsRef = ref(realtimeDb, "symbols");
        const snapshot = await get(symbolsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();

          const symbolsData = Object.values(data).map((item) => ({
            value: item.name,
            label: item.name,
          }));
          setSymbols(symbolsData);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching symbols: ", error);
      }
    };

    fetchSymbols();
  }, [db]);
  const handleSymbolChange = (selectedOption) => {
    setFormData({
      ...formData,
      symbol: selectedOption ? selectedOption.value : "",
    });
  };

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
          acc[key] = false;
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

  return (
    <>
      <div
        id="TradeForm"
        className="w-full md:w-1/2 mx-auto p-[20px] bg-white shadow-lg rounded-lg z-[20] relative overflow-auto h-[600px]"
      >
        <div
          onClick={() => handleFocus(false)}
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
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
                  : " top-1/2 -translate-y-1/2 opacity-0"
              }`}
              htmlFor="symbol"
            >
              Choose Symbol
            </label>
            <Select
              options={symbols}
              onFocus={() => handleFocus("symbol")}
              value={symbols.find((symbol) => symbol.value === formData.symbol)}
              placeholder=""
              onChange={handleSymbolChange}
              className="w-full outline-none z-[9] relative"
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  display: "flex",
                  alignContent: "center",
                  height: "40px",
                  minHeight: "40px",
                  borderRadius: "0.375rem",
                  outline: "none",
                  boxShadow: "none",
                  borderColor: state.isFocused ? "#6b3e37" : "#6b3e37",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "#6b3e37",
                  outline: "none",
                  boxShadow: "none",
                }),
                menu: (provided) => ({
                  ...provided,
                  color: "#6b3e37",
                  outline: "none",
                  boxShadow: "none",
                }),
                valueContainer: (provided) => ({
                  ...provided,
                  boxShadow: "none",
                }),

                indicatorsContainer: (provided) => ({
                  ...provided,
                  boxShadow: "none",
                }),
              }}
            />
          </div>
          <div className="mb-4 relative z-1">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.dateTime
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
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
              className="w-full p-2 py-3 border border-[#C42B1E1F] text-[#97514b] rounded-md outline-none "
            />
          </div>
          <div className="mb-4 relative z-1">
            <label
              className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                isFocused.position
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
                  : " top-1/2 -translate-y-1/2 opacity-0"
              }`}
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
              className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] rounded-md outline-none "
            />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                  isFocused.entryPriceFrom
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
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
                className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] rounded-md outline-none "
              />
            </div>
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                  isFocused.entryPriceTo
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
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
                className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] rounded-md outline-none "
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
            <div className="relative">
              <label
                className={`mb-1 text-[#6e3b37]  absolute left-2 z-10 duration-300 ${
                  isFocused.stopLoss
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
                    : " top-1/2 -translate-y-1/2 opacity-0"
                }`}
                htmlFor="stopLoss"
              >
                Stop Loss
              </label>
              <div className="d-flex align-items-center gap-2  !border !border-[#C42B1E1F] text-[#97514b] rounded-md pe-2">
                <input
                  required
                  type="text"
                  id="stopLoss"
                  name="stopLoss"
                  value={formData.stopLoss}
                  onChange={handleChange}
                  onFocus={() => handleFocus("stopLoss")}
                  placeholder="stop loss"
                  className="w-full p-2 border-0 text-[#97514b] rounded-md outline-none "
                />{" "}
                <input
                  className="w-[14px] h-[14px]"
                  type="checkbox"
                  name="stopLossEnabled"
                  checked={formData.stopLossEnabled}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-end relative z-10">
              <button className="w-full flex items-center text-black/50 bg-[#C42B1E0A] px-3 rounded-md gap-2">
                <input
                  className="w-[14px] h-[14px]"
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                Completed
              </button>
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-4">
            {[1, 2, 3, 4].map((target) => (
              <div key={target} className="relative">
                <label
                  className={`mb-1 text-[#6e3b37] absolute left-2 z-10 duration-300 ${
                    isFocused.targetsChecked[`target${target}`]
                      ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
                      : " top-1/2 -translate-y-1/2 opacity-0"
                  }`}
                  htmlFor={`target${target}`}
                >
                  Target {target}
                </label>
                <div className="d-flex align-items-center gap-2 !border !border-[#C42B1E1F] text-[#97514b] rounded-md pe-2">
                  <input
                    required={target === 1}
                    type="text"
                    id={`target${target}`}
                    name={`target${target}`}
                    value={formData[`target${target}`]}
                    onChange={handleChange}
                    onFocus={() => handleFocus(`target${target}`)}
                    placeholder="type here"
                    className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] rounded-md outline-none"
                  />
                  <input
                    className="w-[14px] h-[14px]"
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
                  ? "text-xs top-0 -translate-y-1/2 bg-white text-[#6e3b37] opacity-100"
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
              className="w-full h-[80px] p-2 !border !border-[#C42B1E1F] text-[#97514b] rounded-md outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end mt-4 relative z-10">
            <button
              onClick={() => setAddBroker(false)}
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
