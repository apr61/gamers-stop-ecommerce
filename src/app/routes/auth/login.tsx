import { UserNavbar } from "@/components/navbar/Navbar";
import LoginForm from "@/features/auth/components/LoginForm";

const Login = () => {
	return (
		<>
			<UserNavbar />
			<main className="max-w-md mx-auto w-full min-h-screen flex flex-col items-center justify-center">
				<LoginForm />
			</main>
		</>
	);
};

export default Login;
