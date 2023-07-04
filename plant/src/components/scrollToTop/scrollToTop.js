import { useEffect } from "react";
import { useLocation } from "react-router-dom";
  
export const ScrollToTop = () => {
  const routePath = useLocation();
  const onTop = () => {
    window.scrollTo(0,0,'auto');
  }
  useEffect(() => {
    onTop()
  }, [routePath]);
  
  return null;
}