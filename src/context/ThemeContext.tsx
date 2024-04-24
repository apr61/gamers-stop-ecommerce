import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContextInit: ThemeContextType = {
  theme: localStorage.getItem("gamers-stop-theme") || "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(ThemeContextInit);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

function ThemeProvider({ children }: ChildrenType) {
  const [theme, setTheme] = useState(
    localStorage.getItem("gamers-stop-theme") || "light"
  );
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    theme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
    localStorage.setItem("gamers-stop-theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);
