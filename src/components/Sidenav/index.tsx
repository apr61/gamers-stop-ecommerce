import {
  BookOutlined,
  CloseOutlined,
  ClusterOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  ProductOutlined,
  ShopOutlined,
  ShoppingOutlined,
  TrademarkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactElement, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSideNav,
  selectUserSideNav,
  setSideNav,
  setUserSideNav,
} from "../../redux/slice/uiActionsSlice";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import useWindowSize from "../../hooks/useWindowSize";
import { cn } from "@/utils/cn";
import Logo from "../Logo/logo";
import Button from "../ui/Button";

export type NavItem = {
  href: string;
  text: string;
  Icon?: ReactElement;
};

type NavItemProps = NavItem;

const NavItem = ({ href, text, Icon }: NavItemProps) => {
  const checkForEnd = ["Products", "Orders"].indexOf(text) === -1; // Condition for nested routes active link
  return (
    <li className="w-full">
      <NavLink
        to={href}
        className={({ isActive }) =>
          `rounded-md p-2 flex gap-2 items-center transition-all ease-in-out duration-150 ${
            isActive ? "bg-primary text-white" : "hover:bg-muted"
          }`
        }
        end={checkForEnd}
      >
        <span className="text-xl">{Icon}</span>
        {text}
      </NavLink>
    </li>
  );
};

type CommonSideNavProps = {
  sideNavMobile?: boolean;
  sidenavOpen: boolean;
  navItems: NavItem[];
  handleClickOutside: () => void;
  className?: string;
};

const CommonSideNav = ({
  sidenavOpen,
  navItems,
  handleClickOutside,
  className,
}: CommonSideNavProps) => {
  const windowSize = useWindowSize();
  const sideNavMobile = windowSize.width > 0 && windowSize.width < 1024;

  const sideNavRef = useOnOutsideClick(handleClickOutside);

  return (
    <div
      className={cn(
        `${sideNavMobile && sidenavOpen ? "fixed top-0 bottom-0 left-0 right-0 bg-pop-over z-50" : ""}`,
      )}
    >
      <aside
        className={cn(
          `min-h-[calc(100vh-4rem)] flex flex-col w-[16rem] top-0 bottom-0 fixed z-50 bg-background border-r border-border lg:sticky overflow-y-auto transition-all ${
            !sidenavOpen ? "-ml-[100%]" : ""
          }`,
          className,
        )}
        ref={sideNavRef}
      >
        <div
          className={`${sidenavOpen ? "lg:hidden flex items-center justify-between w-full p-4 bg-muted" : "hidden"}`}
        >
          <Logo to="/" className="w-full" />
          <Button btnType="ghost" onClick={handleClickOutside}>
            <CloseOutlined />
          </Button>
        </div>
        <ul className="flex flex-col p-2 flex-grow">
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.href}
              href={navItem.href}
              text={navItem.text}
              Icon={navItem.Icon}
            />
          ))}
        </ul>
      </aside>
    </div>
  );
};

export const MainSideNav = () => {
  const dispatch = useAppDispatch();
  const sideNavOpen = useAppSelector(selectUserSideNav);
  const navItems: NavItem[] = [
    {
      href: "/store",
      text: "Store",
      Icon: <ShopOutlined />,
    },
    {
      href: "/account",
      text: "Account",
      Icon: <UserOutlined />,
    },
    {
      href: "/account/orders",
      text: "Orders",
      Icon: <ShoppingOutlined />,
    },
    {
      href: "/account/address",
      text: "Address",
      Icon: <EnvironmentOutlined />,
    },
  ];

  const handleClickOutside = () => {
    dispatch(setUserSideNav(false));
  };

  return (
    <CommonSideNav
      navItems={navItems}
      sidenavOpen={sideNavOpen}
      handleClickOutside={handleClickOutside}
      className="lg:hidden"
    />
  );
};

export const AdminSideNav = () => {
  const dispatch = useAppDispatch();
  const navItems: NavItem[] = [
    {
      href: "",
      text: "Dashboard",
      Icon: <DashboardOutlined />,
    },
    {
      href: "./users",
      text: "Users",
      Icon: <UserOutlined />,
    },
    {
      href: "./products",
      text: "Products",
      Icon: <ProductOutlined />,
    },
    {
      href: "./categories",
      text: "Categories",
      Icon: <ClusterOutlined />,
    },
    {
      href: "./orders",
      text: "Orders",
      Icon: <BookOutlined />,
    },
    {
      href: "./brands",
      text: "Brands",
      Icon: <TrademarkOutlined />,
    },
  ];
  const sideNavOpen = useAppSelector(selectSideNav);

  const windowSize = useWindowSize();
  const sideNavMobile = windowSize.width > 0 && windowSize.width < 1024;

  const handleClickOutside = () => {
    if (sideNavMobile) {
      dispatch(setSideNav(false));
    }
  };

  useEffect(() => {
    if (windowSize.width >= 1024) {
      dispatch(setSideNav(true));
    }
  }, [windowSize]);

  return (
    <CommonSideNav
      navItems={navItems}
      sidenavOpen={sideNavOpen}
      handleClickOutside={handleClickOutside}
    />
  );
};
