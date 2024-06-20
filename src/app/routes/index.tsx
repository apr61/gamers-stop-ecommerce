import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Store from "./app/store/store";
import MainLayout from "../../components/layouts/MainLayout";
import Cart from "./app/cart";
import Login from "./auth/login"
import SignUp from "./auth/signup"
import { NotFoundRoute } from "./not-found";
import Unautorized from "./unauthorized";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: "/store",
				element: <Store />,
			},
		],
	},
	{
		path: "/cart",
		element: <Cart />,
	},
	{
		path: "/auth/login",
		element: <Login />,
	},
	{
		path: "/auth/signup",
		element: <SignUp />,
	},
	{
		path: "/unauthorized",
		element: <Unautorized />,
	},
	{
		path: "*",
		element: <NotFoundRoute />,
	},
]);

export default router;
