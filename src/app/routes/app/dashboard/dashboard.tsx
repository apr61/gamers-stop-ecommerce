import { Link } from "react-router-dom";
import "./dashboard.css";
import Button from "@/components/ui/Button";
import { LoginOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

function Dashboard() {
	document.title = "Account | Gamers Stop";
	const { logOutFn, status } = useAuth();
	const handleLogout = () => {
		logOutFn()
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
					btnType="danger"
					className="w-fit flex gap-2 justify-center items-center px-4 py-2"
					onClick={handleLogout}
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
			</div>
		</section>
	);
}

export default Dashboard;
