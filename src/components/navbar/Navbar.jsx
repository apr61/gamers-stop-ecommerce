import "./navbar.css";
import Search from "../search/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useCartState } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { FaUserAlt, FaStore, FaRegSun, FaRegMoon } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
  const { totalItems } = useCartState();
  const { currentUser } = useAuthContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__link navbar__link--logo">
        Gamers Stop
      </Link>
      <Search />
      <ul className="navbar__list" title="Store">
        <li className="navbar__list-item">
          <NavLink to="/store" className="navbar__link">
            <FaStore />
          </NavLink>
        </li>
        <li className="navbar__list">
          <button className="navbar__theme-btn" onClick={() => toggleTheme()}>
            {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
          </button>
        </li>
        <li className="navbar__list-item" title="Cart">
          <Link className="navbar__link navbar__link--cart" to={"/cart"}>
            <span className="navbar__cart-icon" data-cart-items={totalItems}>
              <AiOutlineShoppingCart />
            </span>
          </Link>
        </li>
        <li
          className="navbar__list-item"
          title={currentUser ? "Account" : "Login"}
        >
          <Link className="navbar__link" to={"/account"}>
            {currentUser ? <FaUserAlt /> : <MdLogin />}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
