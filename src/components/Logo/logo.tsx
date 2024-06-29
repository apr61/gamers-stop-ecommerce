import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

type LogoProps = {
	className?: string;
	to?: string;
};

const Logo = ({ className, to = "/" }: LogoProps) => {
	return (
		<Link to={to} className={cn("text-2xl", className)}>
			Gamers Stop
		</Link>
	);
};

export default Logo;
