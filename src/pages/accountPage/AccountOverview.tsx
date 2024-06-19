import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { logOut } from "../../services/auth";
import "./accountPage.css";
import Button from "../../components/ui/button/Button";

function AccountOverview() {
  const navigate = useNavigate();
  document.title = "Account | Gamers Stop";
  const handleLogOut = async () => {
    await logOut();
    navigate("/");
  };
  return (
    <section className="account-overview">
      <div className="account-overview__container">
        <Link to="/account/profile" className="account-overview__link">
          <div className="account-overview__card">
            <h3 className="account-overview__sub-title">My Profile</h3>
            <p className="account-overview__desc">
              Edit login, name & mobile number.
            </p>
          </div>
        </Link>
        <Link to="/account/orders" className="account-overview__link">
          <div className="account-overview__card">
            <h3 className="account-overview__sub-title">My Orders</h3>
            <p className="account-overview__desc">
              Track your orders, returns & cancelled orders.
            </p>
          </div>
        </Link>
        <Link to="/account/addresses" className="account-overview__link">
          <div className="account-overview__card">
            <h3 className="account-overview__sub-title">My Addresses</h3>
            <p className="account-overview__desc">
              Edit or add addresses for orders.
            </p>
          </div>
        </Link>
      </div>
      <div className="account-overview__logout">
        <Button
          text={
            <>
              <LogoutIcon /> Log Out
            </>
          }
          onClick={handleLogOut}
          btnType="danger"
        />
      </div>
    </section>
  );
}

export default AccountOverview;
