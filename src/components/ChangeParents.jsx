
const BrokerLogin = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-[400px] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#703C3B]">
              Broker login form: Finvasia
            </h2>
            <button className="text-gray-400 hover:text-gray-600">
              &times;
            </button>
          </div>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="brokerId"
                className="block text-sm font-medium text-[#703C3B]"
              >
                Broker User ID
              </label>
              <input
                type="text"
                id="brokerId"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703C3B] focus:outline-none"
                placeholder="FA281444"
              />
            </div>
            <div>
              <label
                htmlFor="brokerPassword"
                className="block text-sm font-medium text-[#703C3B]"
              >
                Broker User Password
              </label>
              <input
                type="password"
                id="brokerPassword"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703C3B] focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <div>
              <label
                htmlFor="totpPin"
                className="block text-sm font-medium text-[#703C3B]"
              >
                TOTP Pin
              </label>
              <input
                type="text"
                id="totpPin"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703C3B] focus:outline-none"
                placeholder="Enter your TOTP Pin"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-[#F44336] text-white rounded-md hover:bg-red-600"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default BrokerLogin;
  