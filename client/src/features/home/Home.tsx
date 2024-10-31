// import Button from "@/components/Button";
// import Navbar from "@/components/Navbar";
// import Banar from "./Components/Banar";
// import Data from "./Components/Data";
// import Appointments from "./Components/Appointments";
// import Footer from "./Components/Footer";
// import { useNavigate } from "react-router-dom";

import { Layout, Menu, MenuProps, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import logo from "../../assets/logo.png";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Banar from "./Components/Banar";

// const Home = () => {
//   const navigate = useNavigate()
//   return (
//     <>
//       {/* Navbar */}
//       <Navbar>
//         <a onClick={() => navigate("/auth/login")} className="text-lg text-primary cursor-pointer">تسجيل الدخول</a>
//         <Button click={() => navigate("/auth/signup")}>
//           إنشاء حساب
//         </Button>
//       </Navbar>
//       {/* Hero section */}
//       <Banar/>
//       {/* Clinic data section */}
//       <Data/>
//       {/* Appointments categories */}
//       <Appointments/>
//       {/* Footer */}
//       <Footer/>
//     </>
//   )
// }

const Home = ()=>{
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();

  const navLinks: MenuProps["items"] = [
    {
      key: "1",
      label: "تسجيل الدخول",
      icon: <Link to={"/auth/login"}><LoginOutlined/></Link>
    },
    {
      key: "2",
      label: "انشاء حساب",
      icon: <Link to={"/auth/signup"}><UserAddOutlined/></Link>
    }
  ]
  
  return(
    <Layout>
      <Header style={{ backgroundColor: colorPrimaryBg, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img className="w-16" src={logo} alt="شعار مركز جويرية" />
          <h2 className="text-fourth font-bold text-2xl">مركز جويرية</h2>
        </div>
        {/* Nav links */}
        <Menu
          mode="horizontal"
          items={navLinks}
          style={{ flex: 1, justifyContent: "end" , backgroundColor:"transparent" }}
          theme="dark"
        />
      </Header>
      <Content>
        <Banar/>
        سنيب
      </Content>
    </Layout>
  ) 
}

export default Home;