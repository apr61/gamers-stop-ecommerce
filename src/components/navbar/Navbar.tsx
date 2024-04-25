import "./navbar.css";
import Search from "../search/Search";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import { useAppSelector } from "../../app/hooks";
import { getTotalItems } from "../../features/cart/cartSlice";

function Navbar() {
  const { currentUser } = useAuthContext();
  const { theme, toggleTheme } = useTheme();
  const totalItems = useAppSelector(getTotalItems);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link navbar__link--logo">
        Gamers Stop
      </Link>
      <Search />
      <ul className="navbar__list">
        <li className="navbar__list-item" title="Store">
          <Link to="/store" className="navbar__link">
            <StoreIcon />
          </Link>
        </li>
        <li
          className="navbar__list"
          title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
        >
          <button className="navbar__theme-btn" onClick={toggleTheme}>
            {theme === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
          </button>
        </li>
        <li className="navbar__list-item" title="Cart">
          <Link className="navbar__link navbar__link--cart" to={"/cart"}>
            <span className="navbar__cart-icon" data-cart-items={totalItems}>
              <ShoppingCartIcon />
            </span>
          </Link>
        </li>
        <li
          className="navbar__list-item"
          title={currentUser ? "Account" : "Login"}
        >
          <Link className="navbar__link" to={"/account"}>
            {currentUser ? <PersonIcon /> : <LoginIcon />}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
