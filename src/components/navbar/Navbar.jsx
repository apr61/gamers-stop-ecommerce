import "./navbar.css";
import Search from "../search/Search";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCartState } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { logOut } from "../../services/auth";
import { FaUserAlt, FaStore } from "react-icons/fa";
import { MdLogin } from "react-icons/md";

function Navbar() {
  const { getTotalItems } = useCartState();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  function handleSignOut() {
    try {
      logOut().then(navigate((to = "/signin")));
    } catch {
      (error) => console.error(error);
    }
  }

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
        <li className="navbar__list-item" title="Cart">
          <Link className="navbar__link navbar__link--cart" to={"/cart"}>
            <span
              className="navbar__cart-icon"
              data-cart-items={getTotalItems()}
            >
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
