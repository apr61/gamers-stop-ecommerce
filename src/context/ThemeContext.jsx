import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("gamers-stop-theme") || "light");
  function toggleTheme() {
    if(theme === "light"){
      setTheme("dark")
    }else{
      setTheme("light")
    }
  }
  useEffect(() => {
    theme === 'dark' ? document.body.classList.add("dark") : document.body.classList.remove("dark")
    localStorage.setItem('gamers-stop-theme', theme)
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
