import AdminAppointments from "@/pages/admin/AdminAppointments";
import Home from "../pages/Home";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Admin from "@/pages/admin/Admin";
import AdminBills from "@/pages/admin/AdminBills";
import AdminPatients from "@/pages/admin/AdminPatients";
import AdminSettings from "@/pages/admin/AdminSettings";
import Patient from "@/pages/patient/Patient";
import PatientHome from "@/pages/patient/PatientHome";
import PatientAppointments from "@/pages/patient/PatientAppointments";
import PatientSettings from "@/pages/patient/PatientSettings";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import VerifyCode from "@/pages/auth/VerifyCode";
import ResetPassword from "@/pages/auth/ResetPassword";

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
			},
			{
				path: "/auth/forgetpassword",
				element: <ForgetPassword />,
			},
			{
				path: "/auth/verifycode",
				element: <VerifyCode />,
			},
			{
				path: "/auth/resetpassword",
				element: <ResetPassword />,
			},
		]
	},
	{
		path: "/patient",
		element: <Patient />,
		children: [
			{
				index: true,
				element: <PatientHome />
			},
			{
				path: "/patient/appointments",
				element: <PatientAppointments />
			},
			{
				path: "/patient/settings",
				element: <PatientSettings />
			}
		]
	},
	{
		path: "/admin",
		element: <Admin />,
		children: [
			{
				index: true,
				element: <AdminDashboard />
			},
			{
				path: "/admin/appointments",
				element: <AdminAppointments />
			},
			{
				path: "/admin/bills",
				element: <AdminBills />
			},
			{
				path: "/admin/patients",
				element: <AdminPatients />
			},
			{
				path: "/admin/settings",
				element: <AdminSettings />
			}
		]
	}
]);

export default Router;
