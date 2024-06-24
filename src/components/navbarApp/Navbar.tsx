import "./navbar.css";
import Search from "../../features-app/products/search/Search";
import { Link } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import LoginIcon from "@mui/icons-material/Login";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getTheme,
  openSideNav,
  selectSearchBarOpen,
  toggleTheme,
} from "../../features/theme/themeSlice";
import { ReactElement, useEffect, useState } from "react";
import SideNav from "../sidenav-app/SideNav";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/hooks/useAuth";
import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import Button from "@/components/ui/Button";
import {
  DropDownList,
  DropDownMenu,
  DropDownSeparator,
  DropDownItem,
} from "../ui/Dropdown";
import { LoginOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getTotalItems } from "@/features/cart/cartSlice";

type NavItemProps = {
  children: ReactElement;
  title: string;
  className?: string;
};

function Navbar() {
  const dispatch = useAppDispatch();
  const isSearchBarOpen = useAppSelector(selectSearchBarOpen);
  const { user } = useAuth();
  const totalItems = useAppSelector(getTotalItems);
  const theme = useAppSelector(getTheme);

  const handleThemeClick = () => {
    const selectedTheme = theme === "dark" ? "light" : "dark";
    dispatch(toggleTheme(selectedTheme));
  };

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
            <button className="navbar__theme-btn" onClick={handleThemeClick}>
              {theme === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
            </button>
          </NavItem>
          <NavItem title="Store" className="navbar__list--store">
            <Link to="/cart" className="navbar__link relative">
              <span className="text-sm absolute bg-red-500 w-4 h-4 rounded-full -top-2 -right-2 grid place-content-center">
                {totalItems}
              </span>
              <ShoppingCartOutlined className="text-2xl" />
            </Link>
          </NavItem>
          {user ? (
            <UserProfile />
          ) : (
            <NavItem className="navbar__list--account" title={"Login"}>
              <Link className="navbar__link" to={"/auth/login"}>
                <LoginIcon />
              </Link>
            </NavItem>
          )}
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

const UserProfile = () => {
  const { user } = useAuth();
  const [dropDown, setDropDown] = useState(false);
  const handleClose = () => {
    setDropDown(false);
  };
  const dropDownRef = useOnOutsideClick(handleClose);

  if (user === null) {
    return;
  }
  const userData = user.user_metadata;
  const userProfilePic = userData.avatar_url
    ? userData.avatar_url
    : BlankUserProfile;

  return (
    <div ref={dropDownRef} className="relative">
      <Button
        btnType="icon"
        className="w-8 h-8 overflow-hidden rounded-full p-0 focus:outline-gray-400"
        title={userData.full_name}
        onClick={() => setDropDown((prev) => !prev)}
      >
        <img
          src={userProfilePic}
          alt={userData.full_name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Button>
      <UserProfileDropDown dropDown={dropDown} />
    </div>
  );
};

type UserProfileDropDownProps = {
  dropDown: boolean;
};

const UserProfileDropDown = ({ dropDown }: UserProfileDropDownProps) => {
  const { user, logOutFn, status, user_role } = useAuth();
  const userData = user?.user_metadata;
  const userProfilePic = userData?.avatar_url
    ? userData?.avatar_url
    : BlankUserProfile;

  return (
    <DropDownMenu
      className={`top-14 right-0 min-w-[10rem] bg-dimBlack dark:shadow-custom-dark ${
        dropDown ? "max-h-96 p-1" : "max-h-0"
      }`}
    >
      <DropDownList>
        <DropDownItem>
          <div className="flex gap-2 items-center">
            <img
              src={userProfilePic}
              alt={userData?.full_name}
              loading="lazy"
              className="w-6 h-6 object-cover rounded-full"
            />
            <p>{userData?.full_name}</p>
          </div>
        </DropDownItem>
        <DropDownSeparator />
        {user_role === "admin" ? <AdminDropDownList /> : <UserDropDownList />}
        <DropDownItem>
          <Button
            btnType="danger"
            className="w-full flex gap-2 justify-center items-center py-1"
            onClick={logOutFn}
            loading={status === "pending"}
            disabled={status === "pending"}
          >
            <>
              <span className="text-xl">
                <LoginOutlined />
              </span>
              Logout
            </>
          </Button>
        </DropDownItem>
      </DropDownList>
    </DropDownMenu>
  );
};

const UserDropDownList = () => {
  return (
    <>
      <DropDownItem>
        <Link to="/account">Account</Link>
      </DropDownItem>
      <DropDownItem>
        <Link to="/account/orders">Orders</Link>
      </DropDownItem>
      <DropDownItem>
        <Link to="/account/addresses">Addresses</Link>
      </DropDownItem>
    </>
  );
};

const AdminDropDownList = () => {
  return (
    <>
      <DropDownItem>
        <Link to="/admin">Dashboard</Link>
      </DropDownItem>
    </>
  );
};
