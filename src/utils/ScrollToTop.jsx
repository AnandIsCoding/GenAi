import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // extract pathname from useLocation hook
  const { pathname } = useLocation();

  // whenever pathname changes scroll to Top
  useEffect(() => {
    // Scroll to top when the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;