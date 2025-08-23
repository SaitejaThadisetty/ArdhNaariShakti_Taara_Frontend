import { useState, useEffect } from "react";
import "./goToTopButton.css"
import { FaArrowUp } from "react-icons/fa";

export function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="goToTopButton"
      >
       <FaArrowUp size={25} style={{ strokeWidth: 4 }} /> 
      </button>
    )
  );
}
