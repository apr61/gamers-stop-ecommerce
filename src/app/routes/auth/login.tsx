import LoginForm from "@/features/auth/components/LoginForm";
import Navbar from "@/components/navbarApp/Navbar";

const Login = () => {
	return (
		<>
			<Navbar />
			<main className="max-w-md mx-auto w-full min-h-screen flex flex-col items-center justify-center">
				<LoginForm />
			</main>
		</>
	);
};

export default Login;
