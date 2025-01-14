/* eslint-disable react/no-unescaped-entities */
const Settings = () => {
  return (
    <>
      <div className="w-full mx-auto ">
        {/* Platform Settings */}
        <div className=" bg-white p-6 rounded-lg shadow-sm mt-4 text_color_brown">
          <h2 className="text-base font-bold mb-2">Platform Settings</h2>
          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-normal mt-3" htmlFor="themeMode">
              Theme Mode
            </label>

            <div className="custom-select">
              <select
                id="themeMode"
                className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full  w_209px"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
          </div>
        </div>

        {/* 1Cliq Favourite Setting */}
        <div className=" bg-white p-6 rounded-lg shadow-sm mt-2 text_color_brown">
          <h2 className="text-base font-bold mb-2">1Cliq Favourite Setting</h2>
          <div className="grid custom-grid   mt-3 justify-between">
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Segment
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>None</option>
                  <option>Options</option>
                  <option>Futures</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Symbol
              </label>
              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>
                    {" "}
                    <option>None</option>
                  </option>
                  <option>BANKNIFTY</option>
                  <option>NIFTY</option>
                  <option>FINNYIFTY</option>
                  <option>MIDCPNIFTY</option>
                </select>
              </div>
            </div>

            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Product Type
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>Margin</option>
                  <option>Intraday</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Order Type
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>Market</option>
                  <option>Market Protection</option>
                  <option>Limit at LTP</option>
                  <option>Limit Order</option>
                </select>
              </div>
            </div>
            <div className=" d_none d_xl_flex"> </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Call Strike Price
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>None</option>
                  <option>ATM + 1 (ITM)</option>
                  <option>ATM + 2 (ITM)</option>
                  <option>ATM + 3 (ITM)</option>
                  <option>ATM + 4 (ITM)</option>
                  <option>ATM + 5 (ITM)</option>
                  <option>ATM + 6 (ITM)</option>
                  <option>ATM</option>
                  <option>ATM - 1 (ITM)</option>
                  <option>ATM - 2 (ITM)</option>
                  <option>ATM - 3 (ITM)</option>
                  <option>ATM - 4 (ITM)</option>
                  <option>ATM - 5 (ITM)</option>
                  <option>ATM - 6 (ITM)</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Put Strike Price
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>None</option>
                  <option>ATM + 1 (ITM)</option>
                  <option>ATM + 2 (ITM)</option>
                  <option>ATM + 3 (ITM)</option>
                  <option>ATM + 4 (ITM)</option>
                  <option>ATM + 5 (ITM)</option>
                  <option>ATM + 6 (ITM)</option>
                  <option>ATM</option>
                  <option>ATM - 1 (ITM)</option>
                  <option>ATM - 2 (ITM)</option>
                  <option>ATM - 3 (ITM)</option>
                  <option>ATM - 4 (ITM)</option>
                  <option>ATM - 5 (ITM)</option>
                  <option>ATM - 6 (ITM)</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Show Positions
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>All Positions</option>
                  <option>F&O positions only</option>
                  <option>Equity positions only</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Show LTP Graphical Details
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                  <option>Yes, Show Graphical View</option>
                  <option>No, DO not show</option>
                </select>
              </div>
            </div>
            <div className=" w-full">
              <label className=" text-[13px] font-normal block mb-1">
                Type LTP Graphical Details
              </label>

              <div className="custom-select">
                <select className="p-2 border border-gray-300 text-[13px] text-[#97514b]  rounded-md w-full">
                  <option>Range bar</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stoploss/Target */}
        <div className=" bg-white p-6 rounded-lg shadow-sm mt-2 text_color_brown">
          <h2 className="text-base font-bold mb-2">Stoploss / Target</h2>
          <div className="flex justify-between gap-3 mt">
            <div className=" d-flex gap-y-4 gap-lg-2 flex-wrap flex-lg-nowrap">
              <div className=" col-12 col-md-6 col-lg-3">
                <div className=" flex justify-between gap-3 flex-col flex-xxl-row items-end">
                  <div className="w_180px">
                    <label className="flex items-center space-x-2">
                      <span className=" text-[13px] font-normal mb-1">
                        Predefined Stoploss
                      </span>
                    </label>
                    <div className="flex gap-2 items-start w-full">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          className="input_checkbox form-checkbox c w-6"
                        />
                        <input
                          type="number"
                          className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md "
                          placeholder=""
                        />
                      </div>{" "}
                    </div>
                  </div>
                  <div className="w_109px">
                    <div className="custom-select">
                      <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                        <option>Points</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p className=" text-sm mt-2 mb-0">
                  If predefined stoploss is set, Whenever you refresh 1Cliq
                  window or open it again,{" "}
                  <span className=" font-bold">
                    all the open order will have predefined SL from it's latest
                    LTP.
                  </span>
                </p>
              </div>

              <div className="flex flex-col col-12 col-md-6 col-lg-3">
                <label className="flex items-center space-x-2">
                  <span className=" text-[13px] font-normal mb-1">
                    Type of Stoploss{" "}
                  </span>
                </label>
                <div className="w-full">
                  <div className="custom-select">
                    <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full">
                      <option>Static Stoploss</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className=" flex justify-between gap-3 flex-col flex-xxl-row items-end">
                  <div className="w_180px">
                    <label className="flex items-center space-x-2">
                      <span className=" text-[13px] font-normal mb-1">
                        Predefined Target
                      </span>
                    </label>
                    <div className="flex gap-2 items-start w-full">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          className="input_checkbox form-checkbox"
                        />
                        <input
                          type="number"
                          className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md "
                          placeholder=""
                        />
                      </div>{" "}
                    </div>
                  </div>
                  <div className="w_109px">
                    <div className="custom-select">
                      <select
                        disabled
                        className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md w-full"
                      >
                        <option>Points</option>
                      </select>
                    </div>
                  </div>
                </div>
                <p className=" text-sm mt-2 mb-0">
                  If predefined stoploss is set, Whenever you refresh 1Cliq
                  window or open it again,{" "}
                  <span className=" font-bold">
                    all the open order will have predefined SL from it's latest
                    LTP.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Position Setting */}
        <div className=" bg-white p-6 rounded-lg shadow-sm mt-2 text_color_brown">
          <h2 className="text-base font-bold mb-2">Close Position Setting</h2>
          <div>
            <label className=" text-[13px] font-normal block mb-1">
              Order type
            </label>

            <div className="custom-select col-12 col-md-4">
              <select className="p-2 border border-gray-300 text-[13px] text-[#97514b] rounded-md ">
                <option>Market</option>
              </select>
            </div>
          </div>
          <p className="mt-3 text-sm col-12 col-md-4 mb-0">
            Even though close position order type is selected as{" "}
            <span className=" font-bold">Market</span> type,
            <span className=" font-bold">
              {" "}
              closing order for Stock options are going to be Market Protection
              order with 15.00 %
            </span>{" "}
            as many broker does not allow market orders in stock options.
          </p>
        </div>
        <div className="flex justify-center flex-col gap-3  flex-md-row bg-white p-6 rounded-lg shadow-sm mt-2">
          <button className="px-4 py-2 text-sm font-bold hover:bg-[#F9F0EE] text-[#c42b1e] border-[1.5px] border-[#c42b1e] rounded-md">
            RESET DEFAULT SETTING
          </button>
          <button className="px-4 py-2 text-sm font-bold bg-[#c42b1e] hover:bg-[#C1594C] text-white rounded-md">
            SAVE FAVOURITE SETTING
          </button>
        </div>

        {/* Usage Note */}
        <div className=" bg-white p-6 rounded-lg shadow-sm mt-2 text_color_brown">
          <h2 className="text-lg font-bold mb-3">Usage Note</h2>
          <p className="text-base mb-3">
            <span className=" font-bold">Reset default Selection -</span> It
            will reset user selected settings and save default settings of 1Cliq
            trading page
          </p>
          <p className="text-base mb-0">
            <span className=" font-bold">Save favourite Selection -</span> It
            will save user selected settings of 1Cliq trading page
          </p>
        </div>

        {/* Buttons */}
      </div>
    </>
  );
};

export default Settings;
