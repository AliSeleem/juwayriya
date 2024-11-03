import Navbar from "@/components/NavBar"
import { Outlet, useNavigate } from "react-router-dom"

const Auth = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-fourth text-primary hover:text-fourth hover:bg-primary transition duration-300 rounded-lg py-1 p-2"
        >
          العودة
        </button>
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