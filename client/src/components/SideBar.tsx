import { Link, NavLink, useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"
import { logout } from "@/services/auth"
import { useEffect, useState } from "react"

const SideBar = ({links}: {links: {name: string, link: string}[]}) => {
  // Collapse state
  const [collapsed, setCollapsed] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Logout hanler
  const Logout = () => {
    logout();
    navigate("/")
  }

  // Toggle collapse when screen is more than 768px
  const width = window.screen.width;
  useEffect(()=>{
    if (width > 768) {
      setCollapsed(false)
    }
  },[width])

  // Main JSX
  return (
    <aside className={`max-md:fixed max-md:border-primary max-md:border-l-2 top-0 ${collapsed? "-right-48":"right-0"} max-md:w-48  max-md:h-screen flex flex-col gap-5 bg-third p-5 md:rounded-3xl`}>
      {/* Toggle collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="md:hidden absolute top-5 -left-8 bg-primary text-fourth p-2 rounded-xl font-black"
      >
        {collapsed ? "☰" : "✕"}
      </button>
      {/* Logo */}
      <Link to={"/"} className="flex flex-col items-center border-primary border-b-2 pb-5">
        <img className="w-10" src={logo} alt="شعار مركز جويرية" />
        <h2 className="text-primary font-bold text-xl">مركز جويرية</h2>
      </Link>
      {/* Nav links */}
      <nav className="flex flex-col items-center gap-5 relative flex-1">
        {links && links.map((link, index) => (
          <NavLink to={link.link} className={({isActive})=>["text-lg font-bold text-fourth hover:text-primary", isActive? "text-primary": ""].join(" ")} key={index}>
            {link.name}
          </NavLink>
        ))}
        <button onClick={Logout} className="absolute bottom-5 text-primary font-black">تسجيل الخروج</button>
      </nav>
    </aside>
  )
}

export default SideBar