import { selectCart } from "@/features/cart/cartSlice";
import { getTheme } from "@/features/theme/themeSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export const useTheme = () => {
  const theme = useAppSelector(getTheme);
  const { setLocal } = useLocalStorage("gamers-stop-theme", "light");
  useEffect(() => {
    theme === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
      setLocal(theme)
  }, [theme]);
};

export const useCart = () => {
  const cart = useAppSelector(selectCart);
  const { setLocal } = useLocalStorage("gamers-stop-cart", []);

  useEffect(() => {
    setLocal(cart);
  }, [cart]);
};
