import { RouterProvider } from "react-router-dom";
import Router from "./config/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

export default function App() {
  const client = new QueryClient()
  return (
    <div className="bg-fourth">
      <QueryClientProvider client={client}>
        <RouterProvider router={Router} />
        <ToastContainer />
      </QueryClientProvider>
    </div>
  )
}