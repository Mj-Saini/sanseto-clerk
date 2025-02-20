/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { onValue, ref, remove } from "firebase/database";
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
  const [completedata, setCompleteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCompletePage, setCurrentCompletePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerCompletePage, setItemsPerCompletePage] = useState(10);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const totalCompletePages = Math.ceil(completedata.length / itemsPerCompletePage);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [addBroker, setAddBroker] = useState(false);
  const [updateBroker, setUpdateBroker] = useState(null);
 const [loading,setLoading]=useState(true)


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
            showToast();
            // const filterprogressdata = tradeData.filter(
            //   (v) => v.completed !== true
            // );
            // const filtercompletedata = tradeData.filter(
            //   (v) => v.completed === true
            // );
            setData(tradeData);
            setLoading(false)
            // setCompleteData(filtercompletedata);
          } else {
            console.log("No data available");
            setData([]);

            // setCompleteData([]);
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
    if (isNaN(date.getTime())) return "Invalid Date";
  
    // Format date as DD-MM-YY
    const formattedDate = date
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
      .replace(/\//g, "-");
  
    // Custom time formatting (24-hour format)
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
  
    return `${formattedDate}, ${formattedTime}`;
  };
  
 
  // // progress table
  const handleItemsPerPageChange = (num) => {
    setItemsPerPage(num);
    setCurrentPage(1);
  };

  const currentProgressData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


   const handlePageChange = (page) => {
     if (page >= 1 && page <= totalPages) {
       setCurrentPage(page);
     }
   };

  // // Complete table
  const handleItemsPerCompletePageChange = (num) => {
    setItemsPerCompletePage(num);
    setCurrentCompletePage(1);
  };

     const handleCompletePageChange = (page) => {
       if (page >= 1 && page <= totalCompletePages) {
         setCurrentCompletePage(page);
       }
     };



  const deleteData = async (id) => {
    const entryRef = ref(realtimeDb, `trades/${id}`);
    try {
      await remove(entryRef);
      console.log(`Entry with ID: ${id} deleted successfully.`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  const value = {
    data,
    completedata,
    setData,
    itemsPerPage,
    itemsPerCompletePage,
    handleItemsPerCompletePageChange,
    handleCompletePageChange,
    handlePageChange,
    currentCompletePage,
    totalCompletePages,
    setItemsPerPage,
    setItemsPerCompletePage,handleItemsPerPageChange,
    updateBroker, setUpdateBroker,
    currentPage,
    setCurrentPage,
    isToastVisible,
    formatDate,
    totalPages,
    deleteData,loading, setLoading,
    addBroker, setAddBroker,currentProgressData
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
