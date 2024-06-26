import { NavLink, Outlet } from "react-router-dom";
import "@/index.css";
import { useAuth } from "@/hooks/useAuth";
import { NavItem } from "../Sidenav";

const AccountLayout = () => {
	document.title = "Account | Gamers Stop";
	const { user } = useAuth();
	return (
		<div className="max-w-[70rem] my-4 mx-auto px-4">
			<header className="border-b border-border">
				<h3 className="text-xl">Account</h3>
				<p className="text-lg">{user?.user_metadata.full_name}</p>
			</header>
			<div className="grid grid-cols-1 lg:grid-cols-[.25fr_1fr]">
				<SideNav />
				<div className="p-4 min-h-[60vh]">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AccountLayout;

const SideNav = () => {
	const navItems: NavItem[] = [
		{
			href: "/account",
			text: "Dashboard",
		},
		{
			href: "/account/orders",
			text: "Orders",
		},
		{
			href: "/account/addresses",
			text: "Address",
		},
	];
	return (
		<ul className="hidden lg:flex flex-col flex-[1] border-r border-border w-full pr-4 ">
			{navItems.map((navItem) => (
				<Item
					key={navItem.href}
					href={navItem.href}
					text={navItem.text}
					Icon={navItem.Icon}
				/>
			))}
		</ul>
	);
};

type NavItemProps = NavItem;

const Item = ({ href, text, Icon }: NavItemProps) => {
	const checkForEnd = ["Orders"].indexOf(text) === -1; // Condition for nested routes active link
	return (
		<li className="w-full border-b border-border w-full py-4 last-of-type:border-none">
			<NavLink
				to={href}
				className={({ isActive }) =>
					`${isActive ? "text-primary" : "hover:text-primary"}`
				}
				end={checkForEnd}
			>
				<span className="text-xl">{Icon}</span>
				{text}
			</NavLink>
		</li>
	);
};
