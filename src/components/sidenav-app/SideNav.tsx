import { NavLink } from "react-router-dom";
import "./sideNav.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  closeSideNav,
  selectSideNavOpen,
} from "../../features-app/theme/themeSlice";
import { ReactElement } from "react";

type SideNavItemProps = {
  children: ReactElement | ReactElement[];
  className?: string;
};

const SideNav = () => {
  const isSideNav = useAppSelector(selectSideNavOpen);
  const dispatch = useAppDispatch();
  return (
    <div
      className={`menu__backdrop ${isSideNav ? "menu_aside--open" : ""}`}
      onClick={() => dispatch(closeSideNav())}
    >
      <aside className={`menu_aside ${isSideNav ? "menu_aside--open" : ""}`}>
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
              className={({ isActive }) =>
                isActive ? "menu__active" : "menu__link"
              }
            >
              Store
            </NavLink>
          </SideNavItem>
          <SideNavItem>
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "menu__active" : "menu__link"
              }
              end
            >
              Dashboard
            </NavLink>
          </SideNavItem>
          <SideNavItem>
            <h4 className="menu__sub-title">Orders</h4>
            <div className="menu__sub-container">
              <NavLink
                to="/account/orders"
                className={({ isActive }) =>
                  isActive ? "menu__active" : "menu__link"
                }
                end
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
                className={({ isActive }) =>
                  isActive ? "menu__active" : "menu__link"
                }
                end
              >
                Profile
              </NavLink>
              <NavLink
                to="/account/addresses"
                className={({ isActive }) =>
                  isActive ? "menu__active" : "menu__link"
                }
                end
              >
                Addresses
              </NavLink>
            </div>
          </SideNavItem>
        </ul>
      </aside>
    </div>
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
