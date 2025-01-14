/* eslint-disable react/prop-types */
import { onValue, ref } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { realtimeDb } from "../components/firebase";

// Create the context
const MyContext = createContext();
export const useContextProvider = () => {
  return useContext(MyContext);
};

// Create the provider component
export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [isToastVisible, setIsToastVisible] = useState(false);



  const showToast = () => {
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false); // Hide the toast after 2 seconds
    }, 2000);
  };
  //   GET DATA FROM REALTIME DB
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
            showToast()
            setData(tradeData);
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
  }, []);

  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1); // Reset to the first page when items per page changes
  };
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const value = {
    data,
    setData,
    itemsPerPage, setItemsPerPage,currentPage, setCurrentPage,isToastVisible,
    formatDate,
    handlePageChange,
    handleItemsPerPageChange,
    currentData,
    totalPages,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
