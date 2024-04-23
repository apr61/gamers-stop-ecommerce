import "./accountPage.css";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../services/auth";

function AccountPage() {
  const navigate = useNavigate();
  document.title = "Account | Gamers Stop";
  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };
  return (
    <>
      <section className="account-sec">
        <h2 className="account-sec__title">My Account</h2>
        <div className="account-sec__container">
          <Link to="/account/profile" className="account-sec__link">
            <div className="account-sec__card">
              <h3 className="account-sec__sub-title">My Profile</h3>
              <p className="account-sec__desc">
                Edit login, name & mobile number.
              </p>
            </div>
          </Link>
          <Link to="/account/orders" className="account-sec__link">
            <div className="account-sec__card">
              <h3 className="account-sec__sub-title">My Orders</h3>
              <p className="account-sec__desc">
                Track your orders, returns & cancelled orders.
              </p>
            </div>
          </Link>
          <Link to="/account/addresses" className="account-sec__link">
            <div className="account-sec__card">
              <h3 className="account-sec__sub-title">My Addresses</h3>
              <p className="account-sec__desc">
                Edit or add addresses for orders.
              </p>
            </div>
          </Link>
        </div>
        <div className="account-sec__logout">
          <button className="account-sec__logout-btn" onClick={handleLogOut}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </section>
    </>
  );
}

export default AccountPage;
