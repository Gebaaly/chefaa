import { createContext, useEffect, useState } from "react";

export const windowSizeContext = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <windowSizeContext.Provider value={windowSize}>
      {children}
    </windowSizeContext.Provider>
  );
}
