import { selectCurrentUser } from "../features/auth/authSlice";
import { useAppSelector } from "../app/hooks";
import { Outlet } from "react-router-dom";
import "../index.css";
import SideNav from "../components/sidenav/SideNav";

const AccountLayout = () => {
  document.title = "Account | Gamers Stop";
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div className="account">
      <header className="account__header">
        <h3>Account</h3>
        <p className="account__name">{currentUser?.displayName}</p>
      </header>
      <div className="account__container">
        <SideNav />
        <div className="account_layout">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
