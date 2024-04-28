import { selectCurrentUser } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";
import { NavLink, Outlet } from "react-router-dom";
import "./accountLayout.css";

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
        <aside className="account_aside">
          <ul className="account_list">
            <li className="account_list-item">
              <NavLink
                to="/account/dashboard"
                className={({ isActive }) =>
                  isActive ? "account__active" : ""
                }
              >
                Overview
              </NavLink>
            </li>
            <li className="account_list-item">
              <h4 className="account__sub-title">Orders</h4>
              <div className="account__sub-container">
                <NavLink
                  to="/account/orders"
                  className={({ isActive }) =>
                    isActive ? "account__active" : ""
                  }
                >
                  Orders & returns
                </NavLink>
              </div>
            </li>
            <li className="account_list-item">
              <h4 className="account__sub-title">Account</h4>
              <div className="account__sub-container">
                <NavLink
                  to="/account/profile"
                  className={({ isActive }) =>
                    isActive ? "account__active" : ""
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/account/addresses"
                  className={({ isActive }) =>
                    isActive ? "account__active" : ""
                  }
                >
                  Addresses
                </NavLink>
              </div>
            </li>
          </ul>
        </aside>
        <div className="account_layout">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
