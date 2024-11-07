import Loader from "@/components/Loader";
import SideBar from "@/components/SideBar";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Admin = () => {
  // Hooks
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate()

  // Navigation links
  const navLinks = [
    {
      name: "الداشبورد", 
      link: "/admin/home"
    },
    {
      name: "الججوزات", 
      link: "/admin/appointments"
    },
    {
      name: "الاعدادات", 
      link: "/admin/settings"
    },
  ]

  // Token check
  const t = localStorage.getItem("token");
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [t])

  // authorization check
  useEffect(()=> {
    const decoded: any = token && jwtDecode(token);
    if (token && decoded.role === "admin") {
      setAuthorized(true)
    } else {
      navigate("/")
    }
  }, [token, authorized, navigate])

  
  // Suspense
  if (!authorized) {
    return (<Loader/>)
  }

  // Main JSX
  return (
    <>
      <main className="h-screen flex justify-evenly p-10 gap-5 container mx-auto">
        <SideBar links={navLinks}/>
        <section className="flex-1 text-center bg-third rounded-3xl flex flex-col items-center justify-center">
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default Admin