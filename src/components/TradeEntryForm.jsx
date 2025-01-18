/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db, realtimeDb } from "./firebase";
import { push, set, ref, onValue, update, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../context/ContextProvider";
import "../index.css";
import { DeleteIcon } from "./common/Icons";
import axios from "axios";
import ConfirmationPopup from "./ConfirmationPopup";

const TradeEntryForm = () => {
  const checkedInput = useRef(null);
  const [isChanged, setIsChanged] = useState(false);
  const { setAddBroker, updateBroker, setUpdateBroker } =
    useContextProvider();
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
  let messageId;

  const id = updateBroker;
  const navigate = useNavigate();
  const [symbols, setSymbols] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [filterSymbol, setFilterSymbol] = useState([]);
  const [finalSymbol, setFinalSymbol] = useState("");
  const [addPosition, setAddPosition] = useState(false);
  const [comformationPopup, setComformationPopup] = useState(false);
  const [actionType, setActionType] = useState(null); // 'update' or 'delete'
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
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
    messageId: "",
    uuid: "",
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
              // showToast();
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
    setIsChanged(true);
  };
  const sendMessage = async () => {
    const botToken1 = "7775810841:AAHC-3a43B3jK_lskNdSWiASWXTE9CKi2SM"; // Replace with your bot token

    const apiUrl = `https://api.telegram.org/bot${botToken1}/sendMessage`;

    try {
      const res = await axios.post(apiUrl, {
        chat_id: "-1002437061530",
        text: `TRADE CALL ALERT 📢
  🔹 Action: ${formData.position}
  🔹 Symbol: ${formData.symbol}
  🔹 Entry Zone: ${formData.entryPriceFrom} to ${formData.entryPriceTo}
  🔹 Stop Loss: ${formData.stopLoss}
  🎯 Targets:
  ✅ T1: ${formData.target1}
  ✅ T2:  ${formData.target2}
  ✅ T3:  ${formData.target3}
  ✅ T4:  ${formData.target4}
  📝 Note: ${formData.comment}`,
      });
      return res.data.result.message_id;
    } catch (error) {
      console.error("Error sending Telegram message: ", error);
    }
  };
  const UpdateTelegramMessage = async () => {
    const botToken1 = "7775810841:AAHC-3a43B3jK_lskNdSWiASWXTE9CKi2SM"; // Replace with your bot token
    const apiUrl = `https://api.telegram.org/bot${botToken1}/sendMessage`;

    try {
      const res = await axios.post(apiUrl, {
        chat_id: "-1002437061530",
        text: `TRADE CALL ALERT 📢
  🔹 Action: ${formData.position}
  🔹 Symbol: ${formData.symbol}
  🔹 Entry Zone: ${formData.entryPriceFrom} to ${formData.entryPriceTo}
  🔹 Stop Loss: ${formData.stopLoss}
  🎯 Targets:
  ✅ T1: ${formData.target1}
  ✅ T2:  ${formData.target2}
  ✅ T3:  ${formData.target3}
  ✅ T4:  ${formData.target4}
  📝 Note: ${formData.comment}`,
        reply_to_message_id: formData.messageId,
      });

      return messageId;
    } catch (error) {
      console.error("Error sending Telegram message: ", error);
    }
  };
  const updateDataInRealtimeDB = async (data) => {
    // UpdateTelegramMessage();

    try {
      const tradeRef = ref(realtimeDb, `trades/${id}`);
      await update(tradeRef, data);
      console.log("Data updated in Realtime Database for ID:", id);
    } catch (e) {
      console.error("Error updating data in Realtime Database: ", e);
    }
  };

  const saveDataToRealtimeDB = async (data) => {
    // const first = await sendMessage();
    // data.messageId = first;
    // data.uniqueId = uuidv4();
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
    setLoading(true);
  
    try {
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
        if (isChanged) {
          await updateDataInRealtimeDB(dataToSave);
          setAddBroker(false);
          navigate(`/admin-dashboard`);
          setUpdateBroker(null);
          setIsChanged(false);
        }
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
        uuid: "",
        massage_Id: "",
        stopLossEnabled: false,
        completed: false,
        targetsChecked: {
          target1: "",
          target2: "",
          target3: "",
          target4: "",
        },
      });
    } catch (error) {
      console.error("Error during data save:", error);
    } finally {
      // Set loading to false when the operation is complete
      setLoading(false);
      console.log("After operation - Loading state:", loading);
    }
  };

  const handleFocus = (field) => {
    setAddPosition(false);
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
        setShowTable(false);
        setFilterSymbol([]);
      } catch (e) {
        console.error("Error adding symbol: ", e);
      }
    }
  };

  // confirmnation popup
  const UpdateUserData = (id) => {
    setUpdateBroker(id);
    setAddBroker(true);
  };
  const handleDeleteClick = (id) => {
    setCurrentId(id);
    setActionType("delete");
    setComformationPopup(true);
  };

  const handleConfirm = () => {
    if (actionType === "update") {
      UpdateUserData(currentId);
    } else if (actionType === "delete") {
      removeSymbol(currentId);
    }
    setComformationPopup(false);
  };

  const handleCancel = () => {
    setComformationPopup(false);
  };

  const handleLabelClick = () => {
    setFormData((prev) => ({
      ...prev,
      completed: !prev.completed,
    }));
  };

  return (
    <>
      <div
        id="TradeForm"
        className="w-full md:w-2/3 lg:w-2/5 mx-auto px-[20px] pb-[20px] pt-2.5 bg-white shadow-lg rounded-lg z-[50] relative "
      >
        {loading && (
          <div className="fixed top-0 left-0 w-full h-screen z-[100] bg-black/50 flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        )}
        {comformationPopup && (
          <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black/50 flex justify-center items-center">
            <div
              onClick={() => {
                setComformationPopup(false);
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
        <div
          onClick={() => {
            handleFocus(false);
            setAddPosition(false);
          }}
          className="fixed top-0 left-0 h-screen w-full flex justify-center items-center z-0"
        ></div>

        <span className="font-bold text-lg lg:text-xl text-black mb-0 relative z-[1] ">
          {" "}
          Add Broker
        </span>

        <span
          onClick={() => {
            setAddBroker(false);
            setUpdateBroker(null);
          }}
          className="text-3xl text-primary_clr cursor-pointer absolute top-2 right-4"
        >
          {" "}
          &times;
        </span>

        <form onSubmit={handleSubmit} className="relative pt-2">
          <div className="overflow-auto h-[400px] py-2">
            <div className="mb-3 relative">
              <label
                onClick={() => handleFocus("symbol")}
                className={`mb-1 text-primary_clr  absolute left-2 duration-300 ${
                  isFocused.symbol || updateBroker
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5  z-[15] "
                    : " top-1/2 -translate-y-1/2 opacity-0 z-0"
                }`}
                htmlFor="symbol"
              >
                Choose Symbol
              </label>
              <div className="relative">
                {showTable && (
                  <div className="absolute top-full left-0 w-full max-h-[200px] bg-white z-20 mt-1 rounded-lg !border !border-primary_clr overflow-auto">
                    {filterSymbol.length === 0 && (
                      <div className="w-full">
                        <div className="flex items-center justify-between  gap-4 px-2 py-1 !border-b border-[#C42B1E45] text-primary_clr hover:bg-[#C42B1E1f] relative group h-10 uppercase w-full">
                          <div
                            onClick={() =>
                              alert("Please Add This Entry In Database First")
                            }
                            className="w-full text-xs"
                          >
                            {formData.symbol}
                          </div>
                          <div className="hidden justify-start p-0 group-hover:flex">
                            <span
                              onClick={() => handleAddSymbol()}
                              className="text-[10px] cursor-pointer whitespace-nowrap"
                            >
                              Click Here To Add
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {filterSymbol.map((symbol) => (
                      <div key={symbol.id} className="w-full">
                        <div
                          onClick={() => {
                            setFinalSymbol(symbol.value);
                            setShowTable(false);
                            setFormData({ ...formData, symbol: symbol.value });
                            
                          }}
                          className="flex items-center justify-between !border-b border-[#C42B1E45] hover:bg-[#C42B1E1f] gap-4 px-2 py-1 text-primary_clr relative group h-10 uppercase w-full text-xs"
                        >
                          <span>{symbol.value}</span>
                          <div className="hidden justify-start p-0 group-hover:flex">
                            <span
                              onClick={() => handleDeleteClick(symbol.id)}
                              className="ml-2 text-[#6b3e37] flex items-center cursor-pointer"
                            >
                              <DeleteIcon />
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
                  onFocus={(e) => {
                    handleFocus("symbol");
                    e.target.placeholder = "";
                  }}
                  value={formData.symbol}
                  onChange={handleChange}
                  type="text"
                  placeholder={`${isFocused.symbol ? " " : "choose symbol"}`}
                  className="w-full p-2 py-3 border-2 border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none  focus:border-tertiary_clr uppercase "
                />
              </div>
            </div>
            <div className="mb-3 relative z-1">
              <label
                id="dateTime"
                onClick={() => handleFocus("dateTime")}
                className={`mb-1 text-primary_clr absolute left-2 duration-300 ${
                  isFocused.dateTime || updateBroker
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5  z-10 "
                    : " top-1/2 -translate-y-1/2 opacity-0"
                }`}
              >
                Date & Time
              </label>
              <input
                // required
                type="date"
                id="dateTime"
                name="dateTime"
                onFocus={() => handleFocus("dateTime")}
                value={formData.dateTime}
                onChange={handleChange}
                className="w-full p-2 py-3 border-2 border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none  focus:border-tertiary_clr relative z-[9] "
              />
            </div>
            <div
              onClick={() => setAddPosition(true)}
              className="mb-3 relative z-[11]"
            >
              <label
                onClick={() => handleFocus("position")}
                className={`mb-1 text-primary_clr  absolute left-2  duration-300 ${
                  isFocused.position || updateBroker
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5 z-20 "
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
                readOnly

                name="position"
                value={formData.position}
                onChange={handleChange}
                onFocus={() => handleFocus("position")}
                placeholder={`${isFocused.position ? " " : "choose Position"}`}
                className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none uppercase"
              />
              {addPosition && (
                <div className="border border-primary_clr absolute top-full mt-1 w-full bg-white rounded-md overflow-hidden z-[11]">
                  <p
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents event from reaching parent
                      setAddPosition(false);
                      setFormData({ ...formData, position: "sell" });
                    }}
                    className="text-primary_clr text-sm hover:bg-[#C42B1E1F] mb-0 p-2 capitalize"
                  >
                    sell
                  </p>
                  <p
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents event from reaching parent
                      setAddPosition(false);
                      setFormData({ ...formData, position: "buy" });
                    }}
                    className="text-primary_clr text-sm hover:bg-[#C42B1E1F] mb-0 p-2 capitalize "
                  >
                    buy
                  </p>
                </div>
              )}
            </div>

            <div
             className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3 ">
              <div className="relative">
                <label
                  htmlFor="entryPriceFrom"
                  onClick={() => handleFocus("entryPriceFrom")}
                  className={`mb-1 text-primary_clr  absolute left-2 duration-300 ${
                    isFocused.entryPriceFrom || updateBroker
                      ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5 z-10"
                      : " top-1/2 -translate-y-1/2 opacity-0"
                  }`}
                >
                  Entry Price From
                </label>
                <input
                  required
                  onWheel={formData.entryPriceFrom}
                  type="number"
                  id="entryPriceFrom"
                  name="entryPriceFrom"
                  value={formData.entryPriceFrom}
                  onChange={handleChange}
                  onFocus={() => handleFocus("entryPriceFrom")}
                  placeholder={`${
                    isFocused.entryPriceFrom ? " " : " Entry Price From"
                  }`}
                  className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none z-[9] relative"
                />
              </div>
              <div className="relative">
                <label
                  onClick={() => handleFocus("entryPriceTo")}
                  className={`mb-1 text-primary_clr  absolute left-2 duration-300 ${
                    isFocused.entryPriceTo || updateBroker
                      ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5 z-10 "
                      : " top-1/2 -translate-y-1/2 opacity-0"
                  }`}
                  htmlFor="entryPriceTo"
                >
                  Entry Price To
                </label>
                <input
                  required
                  type="number"
                  id="entryPriceTo"
                  name="entryPriceTo"
                  value={formData.entryPriceTo}
                  onFocus={() => handleFocus("entryPriceTo")}
                  onChange={handleChange}
                  placeholder={`${
                    isFocused.entryPriceTo ? " " : "Entry Price To"
                  }`}
                  className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none relative z-[9]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
              <div className="relative">
                <label
                  onClick={() => handleFocus("stopLoss")}
                  className={`mb-1 text-primary_clr absolute left-2 duration-300 ${
                    isFocused.stopLoss || updateBroker
                      ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5  z-10"
                      : " top-1/2 -translate-y-1/2 opacity-0"
                  }`}
                  htmlFor="stopLoss"
                >
                  Stop Loss
                </label>
                <div className="d-flex align-items-center gap-2 relative text-[#97514b] formInput rounded-md">
                  <input
                    required
                    type="number"
                    id="stopLoss"
                    name="stopLoss"
                    value={formData.stopLoss}
                    onChange={handleChange}
                    onFocus={() => handleFocus("stopLoss")}
                    placeholder={`${isFocused.stopLoss ? " " : "Stop Loss"}`}
                    className="w-full p-2 border-0 text-[#97514b] formInput rounded-md outline-none pe-2 relative z-[9]"
                  />{" "}
                  <input
                    className="w-[14px] h-[14px] absolute top-1/2 -translate-y-1/2 right-3 z-10"
                    type="checkbox"
                    name="stopLossEnabled"
                    checked={formData.stopLossEnabled}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-end z-[5]">
                <label
                  onClick={handleLabelClick}
                  htmlFor="completed"
                  className="w-full flex items-center text-primary_clr !border border-primary_clr  bg-[#C42B1E0A] px-3 rounded-md gap-2 cursor-default z-[5]"
                >
                  <input
                    ref={checkedInput}
                    className="w-[14px] h-[14px] "
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

            <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-4">
              {[1, 2, 3, 4].map((target) => (
                <div key={target} className="relative">
                  <label
                    onClick={() => handleFocus(`target${target}`)}
                    className={`mb-1 text-primary_clr absolute left-2 duration-300 ${
                      isFocused.targetsChecked[`target${target}`] ||
                      updateBroker ||
                      formData[`target${target}`]
                        ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5 z-10"
                        : " top-1/2 -translate-y-1/2 opacity-0"
                    }`}
                    htmlFor={`target${target}`}
                  >
                    Target {target}
                  </label>
                  <div className="d-flex align-items-center gap-2 text-[#97514b] formInput rounded-md target_box1 relative">
                    <input
                      required={target === 1}
                      type="number"
                      id={`target${target}`}
                      name={`target${target}`}
                      value={formData[`target${target}`]}
                      onChange={handleChange}
                      onFocus={() => handleFocus(`target${target}`)}
                      placeholder={`${
                        isFocused.targetsChecked[`target${target}`]
                          ? " "
                          : `target${target}`
                      }`}
                      className="w-full p-2 border border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none pe-2 realtive z-[9]"
                    />
                    <input
                      className="w-[14px] h-[14px] absolute top-1/2 -translate-y-1/2 right-3  z-10"
                      type="checkbox"
                      // checked={!!formData.targetsChecked[target${target}]}
                      onChange={(e) =>
                        handleCheckboxChange(
                          `target${target}`,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mb-3 relative">
              <label
                onClick={() => handleFocus("comment")}
                className={`mb-1 text-primary_clr  absolute left-2  duration-300 ${
                  isFocused.comment || updateBroker
                    ? "text-xs top-0 -translate-y-1/2 bg-white text-primary_clr opacity-100 px-1.5 z-10"
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
                placeholder={`${isFocused.comment ? " " : "comment"}`}
                rows="4"
                className="w-full h-[80px] relative z-[9] p-2 !border !border-[#C42B1E1F] text-[#97514b] formInput rounded-md outline-none resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-4 relative z-10">
            <button
              onClick={() => {
                setAddBroker(false);
                setUpdateBroker(null);
              }}
              type="button"
              className="btn_light text-tertiary_clr py-2 px-4 rounded-md  transition duration-300"
            >
              cancel
            </button>
            <button
              disabled={!isChanged}
              type="submit"
              className={`btn_dark text-white py-2 px-4 rounded-md  transition duration-300 ${
                !isChanged ? "pointer-events-none !bg-[gray]" : "opacity-100"
              }`}
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
