import "./navbar.css";
import Search from "../../features-app/products/search/Search";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LoginIcon from "@mui/icons-material/Login";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTotalItems } from "../../features-app/cart/cartSlice";
import {
  getTheme,
  openSideNav,
  selectSearchBarOpen,
  toggleTheme,
} from "../../features-app/theme/themeSlice";
import { ReactElement } from "react";
import SideNav from "../sidenav-app/SideNav";
import MenuIcon from "@mui/icons-material/Menu";

type NavItemProps = {
  children: ReactElement;
  title: string;
  className?: string;
};

function Navbar() {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const totalItems = useAppSelector(getTotalItems);
  const isSearchBarOpen = useAppSelector(selectSearchBarOpen);

  return (
    <>
      <nav className={`navbar ${isSearchBarOpen ? "navbar--search-box" : ""}`}>
        <button
          className="navbar_hamburger"
          onClick={() => dispatch(openSideNav())}
        >
          <MenuIcon />
        </button>
        <Link to="/" className="navbar__link navbar__link--logo">
          Gamers Stop
        </Link>
        <Search />
        <ul className="navbar__list">
          <NavItem title="Store" className="navbar__list--store">
            <Link to="/store" className="navbar__link">
              <StoreIcon />
            </Link>
          </NavItem>
          <NavItem
            title={theme === "light" ? "Switch to Dark" : "Switch to Light"}
          >
            <button
              className="navbar__theme-btn"
              onClick={() =>
                dispatch(toggleTheme(theme === "dark" ? "light" : "dark"))
              }
            >
              {theme === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
            </button>
          </NavItem>
          <NavItem title="Cart">
            <Link className="navbar__link navbar__link--cart" to={"/cart"}>
              <span className="navbar__cart-icon" data-cart-items={totalItems}>
                <ShoppingCartIcon />
              </span>
            </Link>
          </NavItem>
          <NavItem className="navbar__list--account" title={"Login"}>
            <Link className="navbar__link" to={"/auth/login"}>
              <LoginIcon />
            </Link>
          </NavItem>
        </ul>
      </nav>
      <div className="navbar__sidenav">
        <SideNav />
      </div>
    </>
  );
}

export default Navbar;

function NavItem({ children, title, className = "" }: NavItemProps) {
  return (
    <li className={`navbar__list-item ${className}`} title={title}>
      {children}
    </li>
  );
}
