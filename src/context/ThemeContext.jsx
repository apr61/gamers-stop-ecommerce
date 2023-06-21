import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  function toggleTheme() {
    setTheme((oldTheme) => (oldTheme === "light" ? "light" : "dark"));
    document.body.classList.toggle("dark");
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
