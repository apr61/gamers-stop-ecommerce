import { NavLink } from "react-router-dom";
import "./sideNav.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  closeSideNav,
  selectSideNavOpen,
} from "../../features/theme/themeSlice";
import { ReactElement } from "react";

type SideNavItemProps = {
  children: ReactElement | ReactElement[];
  className?: string;
};

const SideNav = () => {
  const isSideNav = useAppSelector(selectSideNavOpen);
  const dispatch = useAppDispatch();
  return (
    <aside className={`menu_aside ${isSideNav ? "menu_aside--open" : ""}`}>
      <div
        className="menu__backdrop"
        onClick={() => dispatch(closeSideNav())}
      ></div>
      <button
        className="menu__close-btn"
        onClick={() => dispatch(closeSideNav())}
      >
        &times;
      </button>
      <ul className="menu__list">
        <SideNavItem className="menu__list-item--stote">
          <NavLink
            to="/store"
            className={({ isActive }) => (isActive ? "menu__active" : "")}
          >
            Store
          </NavLink>
        </SideNavItem>
        <SideNavItem>
          <NavLink
            to="/account/dashboard"
            className={({ isActive }) => (isActive ? "menu__active" : "")}
          >
            Dashboard
          </NavLink>
        </SideNavItem>
        <SideNavItem>
          <h4 className="menu__sub-title">Orders</h4>
          <div className="menu__sub-container">
            <NavLink
              to="/account/orders"
              className={({ isActive }) => (isActive ? "menu__active" : "")}
            >
              Orders & returns
            </NavLink>
          </div>
        </SideNavItem>
        <SideNavItem>
          <h4 className="menu__sub-title">Account</h4>
          <div className="menu__sub-container">
            <NavLink
              to="/account/profile"
              className={({ isActive }) => (isActive ? "menu__active" : "")}
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/addresses"
              className={({ isActive }) => (isActive ? "menu__active" : "")}
            >
              Addresses
            </NavLink>
          </div>
        </SideNavItem>
      </ul>
    </aside>
  );
};

export default SideNav;

function SideNavItem({ children, className = "" }: SideNavItemProps) {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(closeSideNav());
  };
  return (
    <li className={`menu__list-item ${className}`} onClick={handleClick}>
      {children}
    </li>
  );
}
