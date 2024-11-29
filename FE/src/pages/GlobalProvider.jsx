import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [reload, setReload] = useState(false);
  return (
    <ThemeContext.Provider value={{ reload, setReload }}>
      {children}
    </ThemeContext.Provider>
  );
};
