import Auth from "@/features/auth/Auth";
import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import Home from "@/features/home/Home";
import { createBrowserRouter } from "react-router-dom";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/auth",
		element: <Auth/>,
		children:[
			{
				path: "/auth/login",
				element: <Login />,
				index: true
			},
			{
				path: "/auth/signup",
				element: <Signup/>,
			}
		]
	}
]);

export default Router;
