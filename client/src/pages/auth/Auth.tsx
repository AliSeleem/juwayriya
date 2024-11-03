import Navbar from "@/components/NavBar"
import { Link, Outlet } from "react-router-dom"

const Auth = () => {
  return (
    <>
      <Navbar>
        <Link 
          to={"/"} 
          className="bg-fourth text-primary hover:text-fourth hover:bg-primary transition duration-300 rounded-lg py-1 p-2"
        >
          العودة
        </Link>
      </Navbar>
      <main className="h-screen place-content-center">
        <section className="bg-third p-10 w-fit max-h-[70vh] overflow-y-scroll scrollbar mx-auto rounded-3xl">
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default Auth