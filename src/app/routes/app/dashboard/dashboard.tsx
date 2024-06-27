import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { LoginOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/useAuth";

function Dashboard() {
	document.title = "Account | Gamers Stop";
	const { logOutFn, status } = useAuth();
	const handleLogout = () => {
		logOutFn();
	};
	return (
		<section className="w-full">
			<div className="md:grid md:grid-cols-3 gap-4 flex flex-col">
				<Link to="/account/profile">
					<div className="border border-border hover:bg-muted p-4 rounded-md max-h-40 h-full">
						<h3 className="text-xl">My Profile</h3>
						<p className="text-sm font-medium">Edit login & name.</p>
					</div>
				</Link>
				<Link to="/account/orders">
					<div className="border border-border hover:bg-muted p-4 rounded-md max-h-40 h-full">
						<h3 className="text-xl">My Orders</h3>
						<p className="text-sm font-medium">
							Track your orders, returns & cancelled orders.
						</p>
					</div>
				</Link>
				<Link to="/account/addresses">
					<div className="border border-border hover:bg-muted p-4 rounded-md max-h-40 h-full">
						<h3 className="text-xl">My Addresses</h3>
						<p className="text-sm font-medium">
							Edit or add addresses for orders.
						</p>
					</div>
				</Link>
			</div>
			<div className="w-full mt-8 flex items-center justify-center">
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
