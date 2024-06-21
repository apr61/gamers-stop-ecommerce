import { Outlet } from "react-router-dom";
import "@/index.css";
import SideNav from "../sidenav-app/SideNav";
import { useAuth } from "@/hooks/useAuth";

const AccountLayout = () => {
	document.title = "Account | Gamers Stop";
	const { user } = useAuth();
	return (
		<div className="account">
			<header className="account__header">
				<h3>Account</h3>
				<p className="account__name">{user?.user_metadata.full_name}</p>
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
