import  { useState, useEffect } from "react";
import { ScrollTopIcon } from "./Icons";

const ScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`flex items-center justify-center rounded-full fixed bottom-4 right-4 p-1.5 z-10 h-[38px] w-[38px] bg-tertiary_clr duration-500 ${
            isVisible ? "scale-100" : "scale-50"
          }`}
        >
      
        <ScrollTopIcon />
    
        </button>
      )}
    </>
  );
};


export default ScrollTop