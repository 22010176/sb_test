import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const ScrollToTopButton = ({ targetRef }) => {
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // const toggleVisibility = () => {
    //   setIsVisible(window.scrollY > 300);
    // };

    // window.addEventListener("scroll", toggleVisibility);
    // return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300">
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  );
};

export default ScrollToTopButton;
