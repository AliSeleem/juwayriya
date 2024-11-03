import About from "@/components/About"
import Features from "@/components/Features"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import NavBar from "@/components/NavBar"
import { Link } from "react-router-dom"

const Home = () => {

  const tab = "hover:bg-fourth hover:text-primary py-1 px-2 text-fourth hover:rounded-full"
  const navDiv = "flex md:flex-row flex-col justify-between gap-5 items-center"
  const btn = "py-1 px-2 text-fourth hover:text-primary"

  return (
    <>  
      <NavBar>
        <div className={navDiv}>
          <a href="#hero" className={tab}>الرئيسية</a>
          <a href="#about" className={tab}>الدكتورة</a>
          <a href="#features" className={tab}>الجلسات</a>
        </div>
        <div className={`${navDiv} md:border-fourth md:border-r-2`}>
          <Link to={"/auth/login"} className={btn}>تسجيل الدخول</Link>
          <Link to={"/auth/signup"} className={btn}>إنشاء حساب</Link>
        </div>
      </NavBar>
      <Hero />
      <About />
      <Features />
      <Footer  />
    </>
  )
}

export default Home