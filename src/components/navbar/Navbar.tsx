import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTheme, toggleTheme } from "../../features/theme/themeSlice";
import { useState } from "react";
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
import {
  LoginOutlined,
  MoonOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SunOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { getTotalItems } from "@/features/cart/cartSlice";
import ProductSearch from "@/features/products/components/ProductSearch";
import { MainSideNav } from "../Sidenav";
import { useDisclosure } from "@/hooks/useDisclosure";

function Navbar() {
  const dispatch = useAppDispatch();
  const { isOpen, close, open } = useDisclosure();
  const { user } = useAuth();
  const totalItems = useAppSelector(getTotalItems);
  const theme = useAppSelector(getTheme);

  const handleTheme = () => {
    const selectedTheme = theme === "dark" ? "light" : "dark";
    dispatch(toggleTheme(selectedTheme));
  };

  return (
    <nav className="flex p-2 items-center w-full border-b border-border h-[4rem] sticky top-0 bg-background">
      <MainSideNav isOpen={isOpen} close={close} />
      <Button
        btnType="ghost"
        className="block lg:hidden text-center mr-2"
        onClick={open}
      >
        <MenuOutlined className="text-xl" />
      </Button>
      <Link to="/" className={`text-2xl hidden lg:block`}>
        Gamers Stop
      </Link>
      <ProductSearch />
      <ul className="hidden lg:flex items-center gap-4 lg:gap-[2rem]">
        <li>
          <Link to="/store" className="flex items-center gap-2">
            <ShopOutlined className="text-xl" />
            Store
          </Link>
        </li>
        {user ? (
          <UserProfile />
        ) : (
          <Link className="flex items-center gap-2" to={"/auth/login"}>
            <LoginOutlined className="text-xl" />
            Login
          </Link>
        )}
      </ul>
      <div className="mx-1 md:mx-2 lg:mx-4 flex items-center gap-2 lg:gap-4">
        <Button type="button" btnType="ghost" onClick={handleTheme}>
          {theme === "dark" ? (
            <SunOutlined className="text-lg sm:text-xl" />
          ) : (
            <MoonOutlined className="text-lg sm:text-xl" />
          )}
        </Button>
        <Link to="/cart" className="relative">
          <span className="text-sm absolute bg-red-500 w-4 h-4 rounded-full -top-3 -right-2 grid place-content-center text-white">
            {totalItems}
          </span>
          <ShoppingCartOutlined className="text-lg sm:text-xl" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

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
        btnType="ghost"
        className="w-8 h-8 overflow-hidden rounded-full p-0"
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
      className={`top-14 right-0 min-w-[10rem] bg-background ${
        dropDown ? "max-h-96 p-1 border border-border" : "max-h-0"
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
