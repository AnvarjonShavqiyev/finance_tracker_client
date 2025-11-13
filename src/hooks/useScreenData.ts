import { useEffect, useState } from "react";
import { MOBILE_SCREEN_SIZE } from "@constants";

export const useScreenData = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= MOBILE_SCREEN_SIZE;

  return { width, isMobile };
};
