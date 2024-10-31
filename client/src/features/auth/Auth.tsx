import Navbar from "@/components/Navbar";
import { Link, Outlet } from "react-router-dom";
import { memo } from "react";

const Auth = () => {
  return (
    <>
      <Navbar>
        <Link to="/" className="text-primary hover:underline">
          العودة
        </Link>
      </Navbar>
      <main className="min-h-screen bg-fourth flex items-center justify-center">
        <section className="container mx-auto p-8 md:p-16 bg-third rounded-lg shadow-lg flex flex-col items-center">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default memo(Auth);
